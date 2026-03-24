import moment from 'moment'
import { Lambdur } from 'lambdur'

import { caseModel } from '../../../../../database'
import { ICaseModel } from '../../../../../database/types/CaseModel.types'
import { getExternalV2APIPartnerNameByAPIKey } from '../../../../../config/ExternalAPIConfig'
import { IntegrationAPIHelper } from '../../../../../utils/IntegrationAPIHelper'
import { isDefined } from '../../../../../utils/typeGuards'
import {
  V2RouteContext,
  V2RoutePutRequestEvent,
} from '../../../../../types/routes.types'
import { CaseResourceController } from '../../../../controller/resource/case'
import * as Errors from '../../../../error'

const stage = process.env.STAGE

export interface UpdateCaseRequestPayloadBody {
  title?: string | null
  fullName?: string
  suffix?: string | null
  nickName?: string | null
  dateOfBirth?: string
  dateOfDeath?: string
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
  serviceLocation?: string | null
  serviceAddress?: string | null
  serviceDate?: string
  serviceTime?: string | null
  viewingLocation?: string | null
  viewingAddress?: string | null
  viewingDate?: string | null
  viewingTime?: string | null
  wakeLocation?: string | null
  wakeAddress?: string | null
  wakeDate?: string | null
  wakeTime?: string | null
  serviceConductedBy?: string | null
  serviceNotes?: string | null
  pallbearers?: string | null
  placeOfDisposition?: string | null
  obituary?: string | null
}

interface UpdateCaseResponsePayload {
  message: string
  case: ICaseModel.Schema
}

const toISODateTimestamp = (dateString: string): number =>
  moment(dateString, 'YYYY-MM-DD').valueOf()

const isDateInputProvided = (dateString: string | null | undefined): boolean =>
  dateString !== undefined && dateString !== null

const isDateInputInvalid = (dateString: string | null | undefined): boolean => {
  if (!isDateInputProvided(dateString)) {
    return false
  }

  if (typeof dateString !== 'string' || dateString.trim() === '') {
    return true
  }

  return !IntegrationAPIHelper.isDateInputValidISO({
    dateString,
  })
}

const getUpdatedCasePayload = ({
  foundCase,
  updates,
}: {
  foundCase: ICaseModel.Model
  updates: UpdateCaseRequestPayloadBody
}): ICaseModel.Schema => {
  const {
    title,
    fullName,
    suffix,
    nickName,
    dateOfBirth,
    dateOfDeath,
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
    serviceLocation,
    serviceAddress,
    serviceDate,
    serviceTime,
    viewingLocation,
    viewingAddress,
    viewingDate,
    viewingTime,
    wakeLocation,
    wakeAddress,
    wakeDate,
    wakeTime,
    serviceConductedBy,
    serviceNotes,
    pallbearers,
    placeOfDisposition,
    obituary,
  } = updates

  const militaryService = {
    ...((foundCase.deceased?.militaryService ??
      {}) as ICaseModel.Deceased['militaryService']),
    ...(isDefined(militaryServiceBranch) && { branch: militaryServiceBranch }),
    ...(isDefined(militaryServiceRank) && { rank: militaryServiceRank }),
    ...(isDefined(militaryServiceDateEntered) && {
      dateEntered: militaryServiceDateEntered,
      dateEnteredDisplay: militaryServiceDateEntered
        ? toISODateTimestamp(militaryServiceDateEntered)
        : null,
    }),
    ...(isDefined(militaryServiceDateDischarged) && {
      dateDischarged: militaryServiceDateDischarged,
      dateDischargedDisplay: militaryServiceDateDischarged
        ? toISODateTimestamp(militaryServiceDateDischarged)
        : null,
    }),
    ...(isDefined(militaryServiceNotes) && { notes: militaryServiceNotes }),
  }

  const deceased = {
    ...(foundCase.deceased ?? {}),
    ...(isDefined(fullName) && { fullName }),
    ...(isDefined(title) && { title }),
    ...(isDefined(suffix) && { suffix }),
    ...(isDefined(nickName) && { nickName }),
    ...(isDefined(education) && { education }),
    ...(isDefined(occupation) && { occupation }),
    ...(isDefined(dateOfBirth) && {
      dateOfBirth: toISODateTimestamp(dateOfBirth),
      dateOfBirthDisplay: dateOfBirth,
    }),
    ...(isDefined(dateOfDeath) && {
      dateOfDeath: toISODateTimestamp(dateOfDeath),
      dateOfDeathDisplay: dateOfDeath,
    }),
    ...((isDefined(militaryServiceBranch) ||
      isDefined(militaryServiceRank) ||
      isDefined(militaryServiceDateEntered) ||
      isDefined(militaryServiceDateDischarged) ||
      isDefined(militaryServiceNotes)) && {
      militaryService,
    }),
  }

  const familyDetails = {
    ...(foundCase.familyDetails ?? {}),
    ...(isDefined(spouseName) && { spouseName }),
    ...(isDefined(childrenNames) && { childrenNames }),
    ...(isDefined(fathersName) && { fathersName }),
    ...(isDefined(mothersName) && { mothersName }),
  }

  const service = {
    ...(foundCase.service ?? {}),
    ...(isDefined(serviceLocation) && { serviceLocation }),
    ...(isDefined(serviceAddress) && { serviceAddress }),
    ...(isDefined(serviceDate) && {
      timeStart: toISODateTimestamp(serviceDate),
      timeStartDisplay: serviceDate,
    }),
    ...(isDefined(serviceTime) && { serviceStartTime: serviceTime }),
    ...(isDefined(viewingLocation) && { viewingLocation }),
    ...(isDefined(viewingAddress) && { viewingAddress }),
    ...(isDefined(viewingDate) && {
      viewingDate,
      viewingDateDisplay: viewingDate ? toISODateTimestamp(viewingDate) : null,
    }),
    ...(isDefined(viewingTime) && { viewingTime }),
    ...(isDefined(wakeLocation) && { wakeLocation }),
    ...(isDefined(wakeAddress) && { wakeAddrfess: wakeAddress }),
    ...(isDefined(wakeDate) && {
      wakeDate,
      wakeDateDisplay: wakeDate ? toISODateTimestamp(wakeDate) : null,
    }),
    ...(isDefined(wakeTime) && { wakeTime }),
    ...(isDefined(serviceConductedBy) && { serviceConductedBy }),
    ...(isDefined(serviceNotes) && { serviceNotes }),
    ...(isDefined(pallbearers) && { pallbearers }),
    ...(isDefined(placeOfDisposition) && { placeOfDisposition }),
  }

  const hasDeceasedUpdates =
    isDefined(fullName) ||
    isDefined(title) ||
    isDefined(suffix) ||
    isDefined(nickName) ||
    isDefined(dateOfBirth) ||
    isDefined(dateOfDeath) ||
    isDefined(education) ||
    isDefined(occupation) ||
    isDefined(militaryServiceBranch) ||
    isDefined(militaryServiceRank) ||
    isDefined(militaryServiceDateEntered) ||
    isDefined(militaryServiceDateDischarged) ||
    isDefined(militaryServiceNotes)

  const hasFamilyDetailsUpdates =
    isDefined(spouseName) ||
    isDefined(childrenNames) ||
    isDefined(fathersName) ||
    isDefined(mothersName)

  const hasServiceUpdates =
    isDefined(serviceLocation) ||
    isDefined(serviceAddress) ||
    isDefined(serviceDate) ||
    isDefined(serviceTime) ||
    isDefined(viewingLocation) ||
    isDefined(viewingAddress) ||
    isDefined(viewingDate) ||
    isDefined(viewingTime) ||
    isDefined(wakeLocation) ||
    isDefined(wakeAddress) ||
    isDefined(wakeDate) ||
    isDefined(wakeTime) ||
    isDefined(serviceConductedBy) ||
    isDefined(serviceNotes) ||
    isDefined(pallbearers) ||
    isDefined(placeOfDisposition)

  return {
    ...foundCase,
    ...(hasDeceasedUpdates && {
      deceased,
    }),
    ...(hasFamilyDetailsUpdates && {
      familyDetails,
    }),
    ...(hasServiceUpdates && {
      service,
    }),
    ...(isDefined(obituary) && {
      obituary,
    }),
  }
}

export const updateCase = async (
  request: V2RoutePutRequestEvent<UpdateCaseRequestPayloadBody>,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<UpdateCaseResponsePayload> => {
  const apiKey = request?.headers?.['api-key']
  const requestBody: UpdateCaseRequestPayloadBody = request?.body ?? {}
  const {
    dateOfBirth,
    dateOfDeath,
    serviceDate,
    militaryServiceDateEntered,
    militaryServiceDateDischarged,
    viewingDate,
    wakeDate,
  } = requestBody
  const { caseId } = pathParams

  console.log(
    'apiKey',
    apiKey,
    'input variables - request?.body',
    requestBody,
    'pathParams',
    pathParams,
    'partner',
    getExternalV2APIPartnerNameByAPIKey({
      stage,
      apiKey,
    }),
  )
  if (!caseId) {
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

  const invalidDateInput = optionalDateInputs.find(({ dateString }) =>
    isDateInputInvalid(dateString),
  )

  if (invalidDateInput) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.update.invalidDateInput({
        fieldName: invalidDateInput.fieldName,
      }),
    )
  }

  const foundCase = await caseModel.findById(caseId)
  if (!foundCase?.id) {
    throw new Lambdur.Error(Errors.externalAPIErrors.update.caseNotFound())
  }

  const hasAtLeastOneOptionalUpdateField = Object.keys(requestBody).length > 0

  if (!hasAtLeastOneOptionalUpdateField) {
    throw new Lambdur.Error(Errors.externalAPIErrors.update.noUpdatableFields())
  }

  const originalCase = JSON.parse(
    JSON.stringify(foundCase),
  ) as ICaseModel.Schema
  const saveQuery = getUpdatedCasePayload({
    foundCase,
    updates: requestBody,
  })

  let updatedCase: ICaseModel.Schema | undefined

  try {
    updatedCase = await caseModel.save(saveQuery)
    await CaseResourceController.postSaveHook(updatedCase)
  } catch (error) {
    console.error('updateCase failed', error)
    if (updatedCase?.id) {
      try {
        await caseModel.save(originalCase)
      } catch (rollbackError) {
        console.error('updateCase rollback failed', rollbackError)
        throw new Lambdur.Error(
          Errors.externalAPIErrors.update.failedToRollbackCase(),
        )
      }
    }
    throw new Lambdur.Error(
      Errors.externalAPIErrors.update.failedToUpdateCase(),
    )
  }

  if (!updatedCase) {
    throw new Lambdur.Error(
      Errors.externalAPIErrors.update.failedToUpdateCase(),
    )
  }

  return {
    message: 'Case updated successfully.',
    case: updatedCase,
  }
}
