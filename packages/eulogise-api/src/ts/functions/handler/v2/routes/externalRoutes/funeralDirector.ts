import {
  V2RouteContext,
  V2RoutePostRequestEvent,
} from '../../../../../types/routes.types'

import { getExternalV2APIPartnerNameByAPIKey } from '../../../../../config/ExternalAPIConfig'
import { IntegrationAPIHelper } from '../../../../../utils/IntegrationAPIHelper'
import { Lambdur } from 'lambdur'
import * as Errors from '../../../../error'
import { clientModel, userModel } from '../../../../../database'
import { EXTERNAL_API, NewFuneralDirectorDetails } from '../utils/type'
import {
  createFuneralDirectorFn,
  sendInviteEmailToFuneralDirectorFn,
} from './client'

const stage = process.env.STAGE

// Add Funeral Director
export interface AddFuneralDirectorRequestPayloadBody {
  clientId: string
  newFuneralDirectorName: string
  newFuneralDirectorEmail: string
}

interface AddFuneralDirectorResponsePayloadBody {
  addedNewFuneralDirectorStatus: AddedNewFuneralDirectorStatus
  funeralDirectorAccessLink: string
  hasFuneralDirectorInviteSent: boolean
}

enum AddedNewFuneralDirectorStatus {
  NEW_FUNERAL_DIRECTOR_CREATED = 'new_funeral_director_created',
  NEW_FUNERAL_DIRECTOR_FAILED = 'new_funeral_director_create_failed',
}

export const funeralDirector = async (
  request: V2RoutePostRequestEvent<AddFuneralDirectorRequestPayloadBody>,
  context: V2RouteContext,
): Promise<AddFuneralDirectorResponsePayloadBody> => {
  const {
    headers: { 'api-key': apiKey },
    body: { clientId, newFuneralDirectorName, newFuneralDirectorEmail },
  } = request
  console.log(
    'apiKey',
    apiKey,
    'input variables - request?.body',
    request?.body,
    'adjusted variables',
    {
      clientId,
      newFuneralDirectorName,
      newFuneralDirectorEmail,
    },
    'partner',
    getExternalV2APIPartnerNameByAPIKey({
      stage,
      apiKey,
    }),
  )

  let hasFuneralDirectorInviteSent = false
  let funeralDirectorAccessLink: string

  // Check required variables:
  const isAllRequiredFieldValid = IntegrationAPIHelper.isAllRequiredFieldValid({
    payload: {
      clientId,
      newFuneralDirectorName,
      newFuneralDirectorEmail,
    },
    schemaName: EXTERNAL_API.ADD_FUNERAL_DIRECTOR,
  })

  if (!isAllRequiredFieldValid) {
    throw new Lambdur.Error(Errors.externalAPIErrors.create.invalidParameter())
  }

  const isEmailInputValid = IntegrationAPIHelper.isEmailInputValid({
    email: newFuneralDirectorEmail,
  })

  if (!isEmailInputValid) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.invalidFuneralDirectorEmail(),
    )
  }

  const client = await clientModel.findById(clientId)
  const foundClientId = client?.id

  if (!foundClientId) {
    throw new Lambdur.Error(Errors.externalAPIErrors.create.clientNotFound())
  }

  const isInputEmailTaken: boolean = await userModel.isExists({
    email: newFuneralDirectorEmail,
  })

  console.log('isInputEmailTaken', isInputEmailTaken)

  if (isInputEmailTaken) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.funeralDirectorEmailExisted(),
    )
  }

  const isFuneralDirectorInputValid =
    IntegrationAPIHelper.isFuneralDirectorCreateDetailValid({
      details: {
        email: newFuneralDirectorEmail,
        name: newFuneralDirectorName,
      },
    })

  if (!isFuneralDirectorInputValid) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.invalidFuneralDirectorEmail(),
    )
  }

  try {
    // create a new funeral director user
    const {
      isFuneralDirectorCreated,
      funeralDirectorEmail,
      funeralDirectorUserId,
      funeralDirectorShadowToken,
    } = await createFuneralDirectorFn({
      funeralDirectorDetails: {
        email: newFuneralDirectorEmail,
        name: newFuneralDirectorName,
      },
    })

    if (!funeralDirectorUserId) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.failedToCreateNewFuneralDirectorUser(),
      )
    }

    funeralDirectorAccessLink =
      IntegrationAPIHelper.getFuneralDirectorLoginLink({
        shadowToken: funeralDirectorShadowToken,
      })

    console.log(
      '[Debug] - funeralDirector - funeralDirectorAccessLink',
      funeralDirectorAccessLink,
    )

    // send an invite email to the funeral director's email
    if (
      isFuneralDirectorCreated &&
      funeralDirectorEmail &&
      funeralDirectorUserId
    ) {
      console.log('sendInviteEmailToFuneralDirectorFn')
      const { hasInviteSent } = await sendInviteEmailToFuneralDirectorFn({
        clientId,
        email: newFuneralDirectorEmail,
        fullName: newFuneralDirectorName,
        funeralDirectorAccessLink,
      })
      console.log('[Debug] - funeralDirector - hasInviteSent', hasInviteSent)

      if (hasInviteSent) {
        hasFuneralDirectorInviteSent = true
      }
    }

    // Append the userId to the client with the new funeral director
    const updatedClient = await appendFuneralDirectorToNewClient({
      newFuenralDirectorUserId: funeralDirectorUserId,
      clientId,
    })

    console.log('[Debug] - funeralDirector - updatedClient', updatedClient)
    const hasClientUserListUpdated = Array.from(
      updatedClient?.users ?? [],
    )?.includes(funeralDirectorUserId)

    if (!hasClientUserListUpdated) {
      throw new Lambdur.Error(
        Errors.externalAPIErrors.create.failedToAssignNewFuneralDirectorToClient(),
      )
    }

    // return create client result with a message
    console.log('[Debug] - funeralDirector - return values', {
      addedNewFuneralDirectorStatus:
        AddedNewFuneralDirectorStatus.NEW_FUNERAL_DIRECTOR_CREATED,
    })

    return {
      addedNewFuneralDirectorStatus:
        AddedNewFuneralDirectorStatus.NEW_FUNERAL_DIRECTOR_CREATED,
      funeralDirectorAccessLink,
      hasFuneralDirectorInviteSent,
    }
  } catch (error) {
    console.log(
      `[Error] - funeralDirector failed to assign funeral director - ${JSON.stringify(
        error,
      )}`,
    )
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.failedToAssignNewFuneralDirectorToClient(),
    )
  }
}

const appendFuneralDirectorToNewClient = async ({
  newFuenralDirectorUserId,
  clientId,
}: {
  newFuenralDirectorUserId: string
  clientId: string
}) => {
  if (!newFuenralDirectorUserId || !clientId) {
    return
  }
  try {
    const clientObj = await clientModel.findById(clientId)
    if (!clientObj?.id) {
      return
    }

    const existingFuneralDirectorIds = clientObj.users ?? []

    const newClient = await clientModel.update({
      ...clientObj,
      users: [...existingFuneralDirectorIds, newFuenralDirectorUserId],
    })
    return newClient
  } catch (error) {
    console.log(
      `Error - append funeral director id to a new client - appendFuneralDirectorToNewClient - ${JSON.stringify(
        error,
      )}`,
    )
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.failedToAssignNewFuneralDirectorToClient(),
    )
  }
}

export { NewFuneralDirectorDetails }
