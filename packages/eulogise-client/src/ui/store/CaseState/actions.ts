import {
  CaseActionTypes,
  EulogiseEditorPaymentConfig,
  EulogiseRegion,
  EulogiseUserRole,
  ICase,
  ICaseAction,
  ICaseData,
  ICaseEditFields,
  IEulogiseProductAvailabilityStatus,
  IOrderDetails,
} from '@eulogise/core'
import { PaymentMethod } from '@stripe/stripe-js'

type CreateCasePayload = {
  deceasedName: string
  enabledProducts?: IEulogiseProductAvailabilityStatus
  region: EulogiseRegion
  country: string
  timeStartAndEnd: number
  clientId?: string
  callback?: () => void
  viaClientHandle?: string
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
}

export type CreateCaseAction = {
  type: CaseActionTypes.CREATE_CASE
  payload: CreateCasePayload
}

export const createCase = (payload: CreateCasePayload) => ({
  type: CaseActionTypes.CREATE_CASE,
  payload,
})

type FetchCasesPayload = { callback?: () => void }
export type FetchCasesAction = {
  type: CaseActionTypes.FETCH_CASES
  payload: FetchCasesPayload
}

export const fetchCases = (payload: FetchCasesPayload): FetchCasesAction => ({
  type: CaseActionTypes.FETCH_CASES,
  payload,
})

type CreatePaymentPayload = {
  paymentMethod: PaymentMethod
  caseId: string
  orderDetails: IOrderDetails
  success?: () => void
  failed?: () => void
}

export type CreatePaymentAction = {
  type: CaseActionTypes.CREATE_PAYMENT
  payload: CreatePaymentPayload
}

export const createPayment = (
  payload: CreatePaymentPayload,
): CreatePaymentAction => ({
  type: CaseActionTypes.CREATE_PAYMENT,
  payload,
})

type FetchCaseByIdPayload = {
  caseId: string
  success?: (fetchedCase: ICase) => void
  isShareFlow?: boolean
  onComplete?: () => void
}

export type FetchCasesByIdAction = {
  type: CaseActionTypes.FETCH_CASE_BY_ID
  payload: FetchCaseByIdPayload
}

export const fetchCaseById = (
  payload: FetchCaseByIdPayload,
): FetchCasesByIdAction => ({
  type: CaseActionTypes.FETCH_CASE_BY_ID,
  payload,
})

export const resetCaseState = (): ICaseAction => ({
  type: CaseActionTypes.RESET_CASE_STATE,
})

type SetActiveCaseByIdPayload = { caseId: string; success: () => void }
export type SetActiveCaseByIdAction = {
  type: CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID
  payload: SetActiveCaseByIdPayload
}

export const setActiveCaseByCaseId = (
  payload: SetActiveCaseByIdPayload,
): SetActiveCaseByIdAction => {
  return {
    type: CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID,
    payload,
  }
}

export const clearActiveCase = (): ICaseAction => ({
  type: CaseActionTypes.CLEAR_ACTIVE_CASE,
})

type UpdateCaseEmailInviteByIdPayload = {
  caseId: string
  existingCaseData: ICase
  success?: () => void
}
export type UpdateCaseEmailInviteByIdAction = {
  type: CaseActionTypes.UPDATE_CASE_EMAIL_INVITE_BY_ID
  payload: UpdateCaseEmailInviteByIdPayload
}

export const updateCaseEmailInviteById = (
  payload: UpdateCaseEmailInviteByIdPayload,
) => ({
  type: CaseActionTypes.UPDATE_CASE_EMAIL_INVITE_BY_ID,
  payload,
})

type UpdateCaseByIdPayload = {
  caseId: string
  caseFields: ICaseEditFields
  success?: () => void
  isShowNotification?: boolean
}

export type UpdateCaseByIdAction = {
  type: CaseActionTypes.UPDATE_CASE_BY_ID
  payload: UpdateCaseByIdPayload
}

export const updateCaseById = (payload: UpdateCaseByIdPayload) => ({
  type: CaseActionTypes.UPDATE_CASE_BY_ID,
  payload,
})

type CreateCaseAsClientPayload = {
  caseData: ICaseData
  role: EulogiseUserRole
  hasEmail?: boolean
  email?: string
  fullName: string
  isShouldSendEmail?: boolean
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  success?: () => void
}

export type CreateCaseAsClientAction = {
  type: CaseActionTypes.CREATE_CASE_AS_CLIENT
  payload: CreateCaseAsClientPayload
}

export const createCaseAsClient = (
  payload: CreateCaseAsClientPayload,
): CreateCaseAsClientAction => ({
  type: CaseActionTypes.CREATE_CASE_AS_CLIENT,
  payload,
})

export const markHasSkippedOrFilledMemorialFormAsTrue = (): ICaseAction => ({
  type: CaseActionTypes.UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS,
})

export const markHasAccessedDownloadPageTrue = () => ({
  type: CaseActionTypes.UPDATE_HAS_ACCESSED_DOWNLOAD_PAGE_STATUS_AFTER_VISTIED_DOWNLOAD_PAGE,
})
