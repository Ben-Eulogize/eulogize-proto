import {
  V2RouteContext,
  V2RoutePostRequestEvent,
} from '../../../../../types/routes.types'

import { getExternalV2APIPartnerNameByAPIKey } from '../../../../../config/ExternalAPIConfig'
import {
  EulogiseCountry,
  EulogiseProduct,
  IEulogiseProductAvailabilityStatus,
  IClientFamilyInviteOptions,
  EulogiseUserRole,
} from '@eulogise/core'
import { IntegrationAPIHelper } from '../../../../../utils/IntegrationAPIHelper'
import { Lambdur } from 'lambdur'
import * as Errors from '../../../../error'
import { clientModel, inviteModel, userModel } from '../../../../../database'
import uuid from 'uuid'
import {
  ApiLambdaHelper,
  ApiLambdaJobTypes,
} from '../../../../../utils/ApiLambdaHelper'
import { IUserModel } from '../../../../../database/types/UserModel.types'
import { InviteResourceController } from '../../../../controller'
import { NewFuneralDirectorDetails } from './funeralDirector'
import { EXTERNAL_API } from '../utils/type'

const reindexRedisDb = async () => {
  await ApiLambdaHelper.invokeJob(
    ApiLambdaJobTypes.REINDEX_REDIS_DB,
    {
      redisIndexes: ['users'],
    },
    true,
  )
}

const stage = process.env.STAGE

// Create Client
export interface CreateClientRequestPayloadBody {
  // Required:
  newClientName: string
  country: EulogiseCountry
  funeralDirectors: Array<NewFuneralDirectorDetails>

  // Optional:
  primaryAddress?: Array<string>
  additionalAddress: Array<Array<string>>
  createCaseFamilyInviteOptions?: Array<string>
  isDemoClient?: boolean
  defaultProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
}

const DEFAULT_NEW_CLIENT_PRODUCTS = {
  [EulogiseProduct.BOOKLET]: true,
  [EulogiseProduct.BOOKMARK]: true,
  [EulogiseProduct.SIDED_CARD]: true,
  [EulogiseProduct.SLIDESHOW]: true,
  [EulogiseProduct.THANK_YOU_CARD]: true,
  [EulogiseProduct.TV_WELCOME_SCREEN]: true,
  [EulogiseProduct.PHOTOBOOK]: false,
}

const DEFAULT_NEW_CLIENT_CASE_INVITE_FAMILY_OPTIONS = [
  IClientFamilyInviteOptions.EDITOR,
  IClientFamilyInviteOptions.COEDITOR,
  IClientFamilyInviteOptions.CONTRIBUTOR,
  IClientFamilyInviteOptions.DO_NOT_SEND_EMAIL,
]

interface CreateClientResponsePayloadBody {
  clientId: string
  clientName: string
  clientStatus: CreateClientStatus
  message?: string
  createdFuneralDirectorUserEmails: Array<string>
  failedFuneralDirectorUserEmails: Array<string>
}

enum CreateClientStatus {
  CLIENT_CREATED = 'client_created',
  CLIENT_CREATED_FAILED = 'client_creted_failed',
}

export const createClient = async (
  request: V2RoutePostRequestEvent<CreateClientRequestPayloadBody>,
  context: V2RouteContext,
): Promise<CreateClientResponsePayloadBody> => {
  const {
    headers: { 'api-key': apiKey },
    body: {
      newClientName,
      country,
      funeralDirectors = [],
      primaryAddress = ['', '', ''],
      additionalAddress = [],
      createCaseFamilyInviteOptions = DEFAULT_NEW_CLIENT_CASE_INVITE_FAMILY_OPTIONS,
      isDemoClient = true,
      defaultProducts = DEFAULT_NEW_CLIENT_PRODUCTS,
      availableProducts: availableProductsInput,
    },
  } = request
  const availableProducts = availableProductsInput ?? defaultProducts
  console.log(
    'apiKey',
    apiKey,
    'input variables - request?.body',
    request?.body,
    'adjusted variables',
    {
      newClientName,
      country,
      funeralDirectors,
      primaryAddress,
      additionalAddress,
      createCaseFamilyInviteOptions,
      isDemoClient,
      defaultProducts,
      availableProducts,
    },
    'partner',
    getExternalV2APIPartnerNameByAPIKey({
      stage,
      apiKey,
    }),
  )

  // Check required variables:
  const isAllRequiredFieldValid = IntegrationAPIHelper.isAllRequiredFieldValid({
    payload: {
      newClientName,
      country,
      funeralDirectors,
      primaryAddress,
      additionalAddress,
      createCaseFamilyInviteOptions,
      isDemoClient,
      defaultProducts,
      availableProducts,
    },
    schemaName: EXTERNAL_API.CREATE_CLIENT,
  })

  if (!isAllRequiredFieldValid) {
    throw new Lambdur.Error(Errors.externalAPIErrors.create.invalidParameter())
  }

  if (funeralDirectors?.length <= 0) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.missingFuneralDirectorInput(),
    )
  }

  const emails = funeralDirectors?.map((fd) => fd.email)
  if (!IntegrationAPIHelper.isAllEmailInputsValid({ emails })) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.invalidFuneralDirectorEmail(),
    )
  }

  if (!country || !IntegrationAPIHelper.isCountryInputValid({ country })) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.invalidCountryInput(),
    )
  }

  const { clientId, clientName } = await createClientFn({
    newClientName,
    isDemoClient,
    country,
    primaryAddress,
    additionalAddress,
    createCaseFamilyInviteOptions,
    defaultProducts,
    availableProducts,
  })

  console.log(
    `[Debug] - after createClientFn - clientId: ${clientId}, clientName: ${clientName}`,
  )

  // Sign up new users for funeral directors:
  let createdFuneralDirectorUserIds: Array<string> = []
  let createdFuneralDirectorUserEmails: Array<string> = []
  let failedFuneralDirectorUserEmails: Array<string> = []

  for (const details of funeralDirectors) {
    const isFuneralDirectorInputValid =
      IntegrationAPIHelper.isFuneralDirectorCreateDetailValid({ details })

    if (!isFuneralDirectorInputValid) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.invalidFuneralDirectorDetailsInput(),
      )
    }

    const { email, name } = details
    const isInputEmailTaken: boolean = await userModel.isExists({ email })
    if (isInputEmailTaken) {
      failedFuneralDirectorUserEmails.push(email)
    } else {
      // create a new funeral director user
      const {
        isFuneralDirectorCreated,
        funeralDirectorEmail,
        funeralDirectorUserId,
        funeralDirectorShadowToken,
      } = await createFuneralDirectorFn({
        funeralDirectorDetails: details,
      })

      if (
        !isFuneralDirectorCreated &&
        !failedFuneralDirectorUserEmails.includes(email)
      ) {
        failedFuneralDirectorUserEmails.push(email)
      }

      // send an invite email to the funeral director's email
      if (
        isFuneralDirectorCreated &&
        funeralDirectorEmail &&
        funeralDirectorUserId
      ) {
        const funeralDirectorAccessLink =
          IntegrationAPIHelper.getFuneralDirectorLoginLink({
            shadowToken: funeralDirectorShadowToken,
          })
        const { hasInviteSent } = await sendInviteEmailToFuneralDirectorFn({
          clientId,
          email: email,
          fullName: name,
          funeralDirectorAccessLink,
        })

        if (
          !hasInviteSent &&
          !failedFuneralDirectorUserEmails.includes(email)
        ) {
          failedFuneralDirectorUserEmails.push(email)
        } else {
          createdFuneralDirectorUserIds.push(funeralDirectorUserId)
          createdFuneralDirectorUserEmails.push(email)
        }
      }
    }
  }

  console.log(
    `[Debug] - createClient - createdFuneralDirectorUserIds: ${createdFuneralDirectorUserIds}, createdFuneralDirectorUserEmails: ${createdFuneralDirectorUserEmails}, failedFuneralDirectorUserEmails, ${failedFuneralDirectorUserEmails}`,
  )

  // Update client with new funeral directors
  const updatedClient = await updateFuneralDirectorsToNewClient({
    newFuneralDirectorIds: createdFuneralDirectorUserIds,
    clientId,
  })

  // return create client result with a message
  console.log(
    'r[Debug] - createClient - return values',
    {
      clientId,
      clientName,
      clientStatus: CreateClientStatus.CLIENT_CREATED,
      message: 'Client created.',
      createdFuneralDirectorUserEmails: updatedClient?.users ?? [],
      failedFuneralDirectorUserEmails,
    },
    'updatedClient',
    updatedClient,
  )

  return {
    clientId,
    clientName,
    clientStatus: CreateClientStatus.CLIENT_CREATED,
    message: 'Client created.',
    createdFuneralDirectorUserEmails,
    failedFuneralDirectorUserEmails,
  }
}

const updateFuneralDirectorsToNewClient = async ({
  newFuneralDirectorIds,
  clientId,
}: {
  newFuneralDirectorIds: Array<string>
  clientId: string
}) => {
  if (
    !newFuneralDirectorIds ||
    newFuneralDirectorIds?.length <= 0 ||
    !clientId
  ) {
    return
  }
  try {
    const clientObj = await clientModel.findById(clientId)
    if (!clientObj?.id) {
      return
    }
    const newClient = await clientModel.update({
      ...clientObj,
      users: newFuneralDirectorIds,
    })
    return newClient
  } catch (error) {
    console.log(
      `Error - assign funeral director ids to a new client - updateFuneralDirectorsToNewClient - ${error}`,
    )
    return
  }
}

const createClientFn = async ({
  newClientName,
  isDemoClient,
  country,
  primaryAddress,
  additionalAddress,
  createCaseFamilyInviteOptions,
  defaultProducts,
  availableProducts,
}: {
  newClientName: string
  isDemoClient: boolean
  country: EulogiseCountry
  primaryAddress: Array<string>
  additionalAddress: Array<Array<string>>
  createCaseFamilyInviteOptions: Array<string>
  defaultProducts: IEulogiseProductAvailabilityStatus
  availableProducts: IEulogiseProductAvailabilityStatus
}): Promise<{ clientId: string; clientName: string }> => {
  // Adding a `- demo` suffix if the `isDemoClient` is marked as a true
  const demoClientName = `${newClientName} - Demo`

  try {
    // Create a new client without any funeral directors
    const client = await clientModel.create({
      title: isDemoClient ? demoClientName : newClientName,
      country,
      users: [''],
      primaryAddress,
      additionalAddress,
      createCaseFamilyInviteOptions,
      defaultProducts,
      availableProducts,
      logo: '',
      clientEmailAsset: '',
      clientBrandHandles: [],
      isDemoClient,
    })
    if (!client?.id) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.failedToCreateNewClient(),
      )
    }
    return { clientId: client.id, clientName: client?.title }
  } catch (error) {
    console.log(`Error - create client - createClientFragment - ${error}`)
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.failedToCreateNewClient(),
    )
  }
}

export const createFuneralDirectorFn = async ({
  funeralDirectorDetails,
}: {
  funeralDirectorDetails: NewFuneralDirectorDetails
}): Promise<{
  isFuneralDirectorCreated: boolean
  funeralDirectorEmail?: string | null
  funeralDirectorUserId?: string | null
  funeralDirectorShadowToken?: string | null
}> => {
  const { name, email } = funeralDirectorDetails
  const isInputEmailTaken: boolean = await userModel.isExists({ email })
  if (isInputEmailTaken) {
    return {
      isFuneralDirectorCreated: false,
      funeralDirectorEmail: null,
      funeralDirectorUserId: null,
      funeralDirectorShadowToken: null,
    }
  } else {
    try {
      // create a new user for specfic funeral director
      const saveQuery: IUserModel.Schema = {
        fullName: name,
        email,
        phone: '',
        firstStreetAddress: '',
        secondStreetAddress: '',
        city: '',
        state: '',
        postcode: '',
        password: await userModel.hashPassword(uuid.v4()),
        token: uuid.v4(),
        shadowToken: uuid.v4(),
        verified: true,
        role: EulogiseUserRole.CLIENT,
        showOnBoardingHelperEveryTime: false,
      }

      const user: IUserModel.Schema = await userModel.save(saveQuery)
      await reindexRedisDb()

      return {
        isFuneralDirectorCreated: true,
        funeralDirectorEmail: user.email,
        funeralDirectorUserId: user.id,
        funeralDirectorShadowToken: user.shadowToken,
      }
    } catch (error) {
      console.log(
        `Error - create client - createFuneralDirectorFragment - ${error}`,
      )
      return {
        isFuneralDirectorCreated: false,
        funeralDirectorEmail: null,
        funeralDirectorUserId: null,
        funeralDirectorShadowToken: null,
      }
    }
  }
}

export const sendInviteEmailToFuneralDirectorFn = async ({
  clientId,
  email,
  fullName,
  funeralDirectorAccessLink,
}: {
  clientId: string
  email: string
  fullName: string
  funeralDirectorAccessLink: string
}): Promise<{ hasInviteSent: boolean }> => {
  try {
    console.log('[Debug] - sendInviteEmailToFuneralDirectorFn', {
      clientId,
      email,
      fullName,
      funeralDirectorAccessLink,
    })
    const inviteSaveResult = await inviteModel.save({
      role: EulogiseUserRole.CLIENT,
      client: clientId,
      fullName,
      email,
      status: 'sent',
      invitorFullName: 'Admin Wildpalms',
      token: uuid.v4(),
    })
    console.log('[Debug] - sendInviteEmailToFuneralDirectorFn', {
      inviteSaveResult,
    })
    if (!inviteSaveResult?.id) {
      return { hasInviteSent: false }
    }

    await InviteResourceController.inviteFuneralDirectorViaAPI({
      clientId,
      inviteeName: fullName,
      inviteeEmail: email,
      funeralDirectorAccessLink,
    })
    return { hasInviteSent: true }
  } catch (error) {
    return { hasInviteSent: false }
  }
}
