import {
  ClientResourceController,
  UserResourceController,
} from '../../../../controller'
import { userModel } from '../../../../../database'
import {
  V2RouteContext,
  V2RouteGetRequestEvent,
  V2RoutePostRequestEvent,
} from '../../../../../types/routes.types'
import * as Errors from '../../../../error'

import { getExternalV2APIPartnerNameByAPIKey } from '../../../../../config/ExternalAPIConfig'
import { Lambdur } from 'lambdur'
import { IntegrationController } from '../../../../controller/IntegrationController'
import {
  CaseStatus,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { IntegrationAPIHelper } from '../../../../../utils/IntegrationAPIHelper'
import { EXTERNAL_API } from '../utils/type'

const stage = process.env.STAGE

// Create Case
enum CreateCaseStatus {
  CASE_CREATED = 'case_created',
  CASE_FAILED_TO_CREATE = 'case_failed_to_create',
}

export interface CreateCaseRequestPayloadBody {
  deceasedName: string
  familyFirstAndLastName: string
  clientId: string
  email?: string
  dateOfBirth?: string
  dateOfDeath?: string
  title?: string | null
  suffix?: string | null
  nickName?: string | null
  education?: string | null
  occupation?: string | null
  militaryServiceBranch?: string | null
  militaryServiceRank?: string | null
  militaryServiceDateEntered?: string | null
  militaryServiceDateDischarged?: string | null
  militaryServiceNotes?: string | null
  spouseName?: string | null
  childrenNames?: string | null
  fathersName?: string | null
  mothersName?: string | null
  obituary?: string | null
  serviceAddress?: string
  serviceLocation?: string | null
  viewingLocation?: string | null
  viewingAddress?: string | null
  viewingDate?: string | null
  viewingTime?: string | null
  wakeLocation?: string | null
  wakeAddrfess?: string | null
  wakeDate?: string | null
  wakeTime?: string | null
  serviceConductedBy?: string | null
  serviceNotes?: string | null
  pallbearers?: string | null
  placeOfDisposition?: string | null
  serviceStartTime?: string
  serviceDate?: string
  arrangerId?: string
  inviteFamilyAs?: EulogiseUserRole
  enabledProducts?: IEulogiseProductAvailabilityStatus
}

interface CreateCaseResponsePayload {
  caseId: string
  caseStatus: CreateCaseStatus
  accessUrl: null | string
  message?: string
}

export interface CreateCasePayload {
  deceasedName: string
  enabledProducts: IEulogiseProductAvailabilityStatus
  email?: string
  dateOfBirth?: string
  dateOfDeath?: string
  title?: string | null
  suffix?: string | null
  nickName?: string | null
  education?: string | null
  occupation?: string | null
  militaryServiceBranch?: string | null
  militaryServiceRank?: string | null
  militaryServiceDateEntered?: string | null
  militaryServiceDateDischarged?: string | null
  militaryServiceNotes?: string | null
  spouseName?: string | null
  childrenNames?: string | null
  fathersName?: string | null
  mothersName?: string | null
  obituary?: string | null
  serviceAddress?: string
  serviceLocation?: string | null
  viewingLocation?: string | null
  viewingAddress?: string | null
  viewingDate?: string | null
  viewingTime?: string | null
  wakeLocation?: string | null
  wakeAddrfess?: string | null
  wakeDate?: string | null
  wakeTime?: string | null
  serviceConductedBy?: string | null
  serviceNotes?: string | null
  pallbearers?: string | null
  placeOfDisposition?: string | null
  serviceStartTime?: string
  serviceDate?: string
  status?: CaseStatus
  newUserRole: EulogiseUserRole
  newInviteRole: EulogiseUserRole
}
export interface UpsertNewCasePayload extends CreateCasePayload {
  familyFirstAndLastName: string
}

export const syncCase = async (
  request: V2RouteGetRequestEvent<{
    externalCaseId: string
    clientId: string
  }>,
  context: V2RouteContext,
) => {
  const { queryStringParameters } = request
  console.log('queryStringParameters', queryStringParameters)
  const { externalCaseId, clientId } = queryStringParameters
  console.log('requestBody', {
    clientId,
    externalCaseId,
  })
  if (!externalCaseId) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.get.externalCaseIdMissing(),
    )
  }
  if (!clientId) {
    throw new Lambdur.Error(Errors.externalAPIErrors.get.clientIdMissing())
  }
  try {
    await IntegrationController.syncByCaseId({
      externalCaseId,
      clientId,
    })
    return {
      code: 200,
      status: 'success',
      message: 'Synced successfully',
    }
  } catch (ex) {
    console.error(ex)
    throw new Lambdur.Error(Errors.externalAPIErrors.get.syncError())
  }
}

export const createCase = async (
  request: V2RoutePostRequestEvent<CreateCaseRequestPayloadBody>,
  context: V2RouteContext,
): Promise<CreateCaseResponsePayload> => {
  const {
    headers: { 'api-key': apiKey },
    body: {
      clientId,
      email = NO_REPLY_EULOGISE_EMAIL,
      deceasedName,
      familyFirstAndLastName,
      dateOfBirth,
      dateOfDeath,
      title,
      suffix,
      nickName,
      education,
      occupation,
      militaryServiceBranch,
      militaryServiceRank,
      militaryServiceDateEntered,
      militaryServiceDateDischarged,
      militaryServiceNotes,
      spouseName,
      childrenNames,
      fathersName,
      mothersName,
      obituary,
      serviceAddress,
      serviceLocation,
      viewingLocation,
      viewingAddress,
      viewingDate,
      viewingTime,
      wakeLocation,
      wakeAddrfess,
      wakeDate,
      wakeTime,
      serviceConductedBy,
      serviceNotes,
      pallbearers,
      placeOfDisposition,
      serviceStartTime,
      serviceDate,
      arrangerId,
      inviteFamilyAs,
      enabledProducts,
    },
  } = request
  console.log(
    'apiKey',
    apiKey,
    'input variables - request?.body',
    {
      clientId,
      email,
      deceasedName,
      familyFirstAndLastName,
      dateOfBirth,
      dateOfDeath,
      title,
      suffix,
      nickName,
      education,
      occupation,
      militaryServiceBranch,
      militaryServiceRank,
      militaryServiceDateEntered,
      militaryServiceDateDischarged,
      militaryServiceNotes,
      spouseName,
      childrenNames,
      fathersName,
      mothersName,
      obituary,
      serviceAddress,
      serviceLocation,
      viewingLocation,
      viewingAddress,
      viewingDate,
      viewingTime,
      wakeLocation,
      wakeAddrfess,
      wakeDate,
      wakeTime,
      serviceConductedBy,
      serviceNotes,
      pallbearers,
      placeOfDisposition,
      serviceStartTime,
      serviceDate,
      arrangerId,
      inviteFamilyAs,
      enabledProducts,
    },
    'partner',
    getExternalV2APIPartnerNameByAPIKey({
      stage,
      apiKey,
    }),
  )

  const isAllRequiredFieldValid = IntegrationAPIHelper.isAllRequiredFieldValid({
    payload: {
      clientId,
      email,
      deceasedName,
      familyFirstAndLastName,
      dateOfBirth,
      dateOfDeath,
      title,
      suffix,
      nickName,
      education,
      occupation,
      militaryServiceBranch,
      militaryServiceRank,
      militaryServiceDateEntered,
      militaryServiceDateDischarged,
      militaryServiceNotes,
      spouseName,
      childrenNames,
      fathersName,
      mothersName,
      obituary,
      serviceAddress,
      serviceLocation,
      viewingLocation,
      viewingAddress,
      viewingDate,
      viewingTime,
      wakeLocation,
      wakeAddrfess,
      wakeDate,
      wakeTime,
      serviceConductedBy,
      serviceNotes,
      pallbearers,
      placeOfDisposition,
      serviceStartTime,
      serviceDate,
      inviteFamilyAs,
      enabledProducts,
    },
    schemaName: EXTERNAL_API.CREATE_CASE,
  })

  if (!isAllRequiredFieldValid) {
    throw new Lambdur.Error(Errors.externalAPIErrors.create.invalidParameter())
  }

  const optionalDateInputs: Array<{
    fieldName: string
    dateString: string | null | undefined
  }> = [
    { fieldName: 'dateOfBirth', dateString: dateOfBirth },
    { fieldName: 'dateOfDeath', dateString: dateOfDeath },
    { fieldName: 'serviceDate', dateString: serviceDate },
    {
      fieldName: 'militaryServiceDateEntered',
      dateString: militaryServiceDateEntered,
    },
    {
      fieldName: 'militaryServiceDateDischarged',
      dateString: militaryServiceDateDischarged,
    },
    { fieldName: 'viewingDate', dateString: viewingDate },
    { fieldName: 'wakeDate', dateString: wakeDate },
  ]

  const invalidDateInput = optionalDateInputs.find(
    ({ dateString }) =>
      dateString !== undefined &&
      dateString !== null &&
      !IntegrationAPIHelper.isDateInputValidISO({
        dateString: dateString ?? undefined,
      }),
  )

  if (invalidDateInput) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.invalidDateInput({
        fieldName: invalidDateInput.fieldName,
      }),
    )
  }

  const foundClient = await ClientResourceController.findById(clientId)
  if (!foundClient) {
    throw new Lambdur.Error(Errors.externalAPIErrors.create.clientNotFound())
  }
  const arrangers = Array.from(foundClient?.users ?? [])

  if (!arrangers.length || (arrangers.length === 1 && !arrangers?.[0])) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.create.clientHasNoArranger(),
    )
  }

  const isArrangerIdValid: boolean =
    await ClientResourceController.isArrangerIdValid({
      arrangerId,
      clientId: foundClient.id!,
    })

  const backupArrangerId = arrangers?.filter((arrangerId) => arrangerId)?.[0]

  let isInputEmailTaken: boolean = await userModel.isExists({ email })

  let modifiedEmail

  if (isInputEmailTaken) {
    modifiedEmail =
      await IntegrationAPIHelper.incrementEmailNumberSuffixRecursion({
        isEmailTaken: isInputEmailTaken,
        checkIsTakenFn: async (email: string) =>
          await userModel.isExists({ email }),
        email,
        recursionMax: 10,
      })
  }

  const newUserRole: EulogiseUserRole =
    IntegrationAPIHelper.getOverwriteInviteAsFamilyRoleForNewAccount({
      inviteFamilyAs,
    })

  const newInviteRole: EulogiseUserRole =
    IntegrationAPIHelper.getOverwriteInviteAsFamilyRoleForInvite({
      inviteFamilyAs,
    })

  const clientDefaultProducts: IEulogiseProductAvailabilityStatus | undefined =
    foundClient?.defaultProducts
  let overwriteEnabledProducts

  const isValidEnableProducts =
    IntegrationAPIHelper.isValidEnableProducts(enabledProducts)

  if (!isValidEnableProducts) {
    if (!clientDefaultProducts) {
      overwriteEnabledProducts =
        IntegrationAPIHelper.getAllDefaultEnabledProducts()
    } else {
      overwriteEnabledProducts = clientDefaultProducts
    }
  } else {
    overwriteEnabledProducts = IntegrationAPIHelper.getOverwriteEnabledProducts(
      {
        defaultClientProducts: foundClient?.defaultProducts,
        enabledProducts: enabledProducts as IEulogiseProductAvailabilityStatus,
      },
    )
  }

  const createdRecord =
    await UserResourceController.createUserAndCaseByClientArrangerId(
      apiKey as string,
      foundClient,
      isArrangerIdValid && arrangerId ? arrangerId : backupArrangerId,
      {
        email: isInputEmailTaken ? modifiedEmail : email,
        deceasedName,
        familyFirstAndLastName,
        newUserRole,
        newInviteRole,
        status: IntegrationAPIHelper.getCaseStatusByInviteFamilyAsRole({
          inviteFamilyAs,
        }),
        enabledProducts: overwriteEnabledProducts,
        dateOfBirth,
        dateOfDeath,
        title,
        suffix,
        nickName,
        education,
        occupation,
        militaryServiceBranch,
        militaryServiceRank,
        militaryServiceDateEntered,
        militaryServiceDateDischarged,
        militaryServiceNotes,
        spouseName,
        childrenNames,
        fathersName,
        mothersName,
        obituary,
        serviceAddress,
        serviceLocation,
        viewingLocation,
        viewingAddress,
        viewingDate,
        viewingTime,
        wakeLocation,
        wakeAddrfess,
        wakeDate,
        wakeTime,
        serviceConductedBy,
        serviceNotes,
        pallbearers,
        placeOfDisposition,
        serviceStartTime,
        serviceDate,
      },
    )
  const token = createdRecord?.token
  const caseId = createdRecord?.caseId!

  if (token) {
    if (isInputEmailTaken) {
      return {
        caseId,
        caseStatus: CreateCaseStatus.CASE_CREATED,
        accessUrl: IntegrationAPIHelper.getLoginOrInviteLinkByInviteAsFamily({
          newInviteRole,
          token,
        }),
        message: `Case created successfully, however, the input email address has been used, so we've linked this case with a new email address: ${modifiedEmail}`,
      }
    }

    return {
      caseId,
      caseStatus: CreateCaseStatus.CASE_CREATED,
      accessUrl: IntegrationAPIHelper.getLoginOrInviteLinkByInviteAsFamily({
        newInviteRole,
        token,
      }),
      message: 'Case created successfully.',
    }
  }
  return {
    caseId,
    caseStatus: CreateCaseStatus.CASE_FAILED_TO_CREATE,
    accessUrl: null,
    message: `Failed to create case, please contact with Eulogize admin`,
  }
}
