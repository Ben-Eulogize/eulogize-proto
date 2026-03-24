import { ICreatCaseFormFields } from '@eulogise/client-components'
import {
  AuthActionTypes,
  EulogiseCountry,
  EulogiseEditorPaymentConfig,
  EulogisePage,
  EulogiseRegion,
  EulogiseUserRole,
  IAuthAccount,
  IAuthAction,
  IAuthState,
  IEulogiseProductAvailabilityStatus,
  IForgotPasswordRequestBody,
  ILoginRequestBody,
  IPersonalDetailFields,
  ISignUpAsClientData,
  ISignUpRequestBody,
} from '@eulogise/core'

type LoginPayload = {
  body: ILoginRequestBody
  redirectTo?: EulogisePage
  callback?: () => void
  success?: (account: IAuthAccount) => void
}

export type LoginAction = {
  type: AuthActionTypes.LOGIN
  payload: LoginPayload
}

export const login = (payload: LoginPayload) => ({
  type: AuthActionTypes.LOGIN,
  payload,
})

export const loginFailed = (ex: Error) => ({
  type: AuthActionTypes.LOGIN_FAILED,
  payload: {
    ex,
    account: null,
  },
})

type VerifyEmailPayload = {
  token: string
  onSuccess: () => void
  onFailed: () => void
}

export type VerifyEmailAction = {
  type: AuthActionTypes.VERIFY_EMAIL
  payload: VerifyEmailPayload
}

export const verifyEmail = (
  payload: VerifyEmailPayload,
): VerifyEmailAction => ({
  type: AuthActionTypes.VERIFY_EMAIL,
  payload,
})

type LoginSuccessPayload = IAuthState & {
  isMagicLogin?: boolean
  redirectTo?: EulogisePage
  complete?: () => void
}

export type LoginSuccessAction = {
  type: AuthActionTypes.LOGIN_SUCCESS
  payload: LoginSuccessPayload
}

export const loginSuccess = (
  payload: LoginSuccessPayload,
): LoginSuccessAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload,
})

type MemoriseShadowTokenPayload = { shadowToken: string }
export type MemoriseShadowTokenAction = {
  type: AuthActionTypes.SHADOW_INVITE_TOKEN
  payload: MemoriseShadowTokenPayload
}

export const memoriseInviteToken = ({
  inviteToken,
}: {
  inviteToken: string
}) => ({
  type: AuthActionTypes.MEMORISE_INVITE_TOKEN,
  payload: {
    inviteToken,
  },
})

export const memoriseShadowToken = ({
  shadowToken,
}: MemoriseShadowTokenPayload): MemoriseShadowTokenAction => ({
  type: AuthActionTypes.SHADOW_INVITE_TOKEN,
  payload: {
    shadowToken,
  },
})

type SignUpCoEditorPayload = {
  email: string
  fullName: string
  role: EulogiseUserRole
  success: () => void
  complete: () => void
}

export type SignUpCoEditorAction = {
  type: AuthActionTypes.SIGN_UP_CO_EDITOR
  payload: SignUpCoEditorPayload
}

export const signUpCoEditor = (payload: SignUpCoEditorPayload) => ({
  type: AuthActionTypes.SIGN_UP_CO_EDITOR,
  payload,
})

type CreateNewCaseFromCreateCaseFormPayload = {
  fields: ICreatCaseFormFields
  clientUser?: string
  funeralHome?: string
  onCreating: () => void
  onCreated: () => void
  onFailed: () => void
}

export type CreateNewCaseFromCreateCaseFormAction = {
  type: AuthActionTypes.CREATE_NEW_CASE_FROM_CREATE_CASE_FORM
  payload: CreateNewCaseFromCreateCaseFormPayload
}

export const createNewCaseFromCreateCaseForm = (
  payload: CreateNewCaseFromCreateCaseFormPayload,
): CreateNewCaseFromCreateCaseFormAction => ({
  type: AuthActionTypes.CREATE_NEW_CASE_FROM_CREATE_CASE_FORM,
  payload,
})

type SignUpCustomerAsClientPayload = {
  signUpData: ISignUpAsClientData
  isShouldSendEmail?: boolean
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  success?: () => void
  failed?: () => void
}

export type SignUpCustomerAsClientAction = {
  type: AuthActionTypes.SIGN_UP_AS_CLIENT
  payload: SignUpCustomerAsClientPayload
}

export const signUpCustomerAsClient = (
  payload: SignUpCustomerAsClientPayload,
) => ({
  type: AuthActionTypes.SIGN_UP_AS_CLIENT,
  payload,
})

type SignUpPayload = ISignUpRequestBody & {
  complete?: () => void
  viaClientHandle?: string
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
}

export type SignUpAction = {
  type: AuthActionTypes.SIGN_UP
  payload: SignUpPayload
}

export const signUp = (payload: SignUpPayload): SignUpAction => ({
  type: AuthActionTypes.SIGN_UP,
  payload,
})

type SignUpSuccessPayload = {
  account: any
  webtoken: any
  deceasedDate: any
  deceasedName: any
  region: EulogiseRegion
  country: EulogiseCountry | string
  clientId?: string
  enabledProducts?: IEulogiseProductAvailabilityStatus
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
  complete?: () => void
  viaClientHandle?: string
}

export type SignUpSuccessAction = {
  type: AuthActionTypes.SIGN_UP_SUCCESS
  payload: SignUpSuccessPayload
}

export const signUpSuccess = (
  payload: SignUpSuccessPayload,
): SignUpSuccessAction => ({
  type: AuthActionTypes.SIGN_UP_SUCCESS,
  payload,
})

export const signUpFailed = (ex: any) => ({
  type: AuthActionTypes.SIGN_UP_FAILED,
  payload: ex,
})

/* Update Signing up status - Action */
type UpdateSignUpStatusPayload = {
  isSigningUp: boolean
}

export type UpdateIsSigningUpStatusAction = {
  type: AuthActionTypes.UPDATE_SIGNUP_STATUS
  payload: UpdateSignUpStatusPayload
}

export const updateIsSigningUpStatus = (
  payload: UpdateSignUpStatusPayload,
): UpdateIsSigningUpStatusAction => ({
  type: AuthActionTypes.UPDATE_SIGNUP_STATUS,
  payload,
})

type LogoutPayload = { success?: () => void }
export type LogoutAction = {
  type: AuthActionTypes.LOGOUT
  payload: LogoutPayload
}
export const logout = (payload: LogoutPayload): LogoutAction => ({
  type: AuthActionTypes.LOGOUT,
  payload,
})

type ResetStatePayload = { success?: () => void }
export type ResetStatePayloadAction = {
  type: AuthActionTypes.RESET_AUTH_STATE
  payload: ResetStatePayload
}
export const resetAuthState = (
  payload: ResetStatePayload,
): ResetStatePayloadAction => ({
  type: AuthActionTypes.RESET_AUTH_STATE,
  payload,
})

export const forgotPasswordSuccess = (): IAuthAction => ({
  type: AuthActionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS,
})

type ForgotPasswordPayload = {
  requestBody: IForgotPasswordRequestBody
  success: () => void
}
export type ForgotPasswordAction = {
  type: AuthActionTypes.FORGOT_PASSWORD
  payload: ForgotPasswordPayload
}

export const forgotPassword = (payload: ForgotPasswordPayload) => ({
  type: AuthActionTypes.FORGOT_PASSWORD,
  payload,
})

type ResetPasswordPayload = {
  password: string
  token: string
  complete?: () => void
}

export type ResetPasswordAction = {
  type: AuthActionTypes.RESET_PASSWORD
  payload: ResetPasswordPayload
}

export const resetPassword = (
  payload: ResetPasswordPayload,
): ResetPasswordAction => ({
  type: AuthActionTypes.RESET_PASSWORD,
  payload,
})

export const checkAccount = () => ({
  type: AuthActionTypes.CHECK_ACCOUNT,
})

type UpdatePersonalDetailByIdPayload = {
  userId: string
  personalDetailsFields: IPersonalDetailFields
  success?: () => void
  failed?: () => void
}

export type UpdatePersonalDetailByIdAction = {
  type: AuthActionTypes.UPDATE_PERSONAL_DATA
  payload: UpdatePersonalDetailByIdPayload
}

export const updatePersonalDetailById = (
  payload: UpdatePersonalDetailByIdPayload,
): UpdatePersonalDetailByIdAction => ({
  type: AuthActionTypes.UPDATE_PERSONAL_DATA,
  payload,
})
