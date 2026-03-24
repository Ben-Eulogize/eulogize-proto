import { EulogiseUserRole, EulogiseUserType } from './Resource.types'
import {
  EulogiseCountry,
  EulogiseRegion,
  IEulogizeAccountType,
  IEulogiseProductAvailabilityStatus,
  IEulogizeFeatureAvailabilityStatus,
  IRequestResponse,
} from './Eulogise.types'
import { ICaseDeceased, ICaseService } from './Case.types'

export enum AuthActionTypes {
  UPDATE_SIGNUP_STATUS = 'UPDATE_SIGNUP_STATUS',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  MEMORISE_INVITE_TOKEN = 'MEMORISE_INVITE_TOKEN',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS',
  VERIFY_EMAIL_FAILED = 'VERIFY_EMAIL_FAILED',
  CREATE_NEW_CASE_FROM_CREATE_CASE_FORM = 'CREATE_NEW_CASE_FROM_CREATE_CASE_FORM',
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILED = 'SIGN_UP_FAILED',
  SIGN_UP_CO_EDITOR = 'SIGN_UP_CO_EDITOR',
  SIGN_UP_CO_EDITOR_SUCCESS = 'SIGN_UP_CO_EDITOR_SUCCESS',
  SIGN_UP_CO_EDITOR_FAILED = 'SIGN_UP_CO_EDITOR_FAILED',
  SIGN_UP_AS_CLIENT = 'SIGN_UP_AS_CLIENT',
  SIGN_UP_AS_CLIENT_SUCCESS = 'SIGN_UP_AS_CLIENT_SUCCESS',
  SIGN_UP_AS_CLIENT_FAILED = 'SIGN_UP_AS_CLIENT_FAILED',
  LOGOUT = 'LOGOUT',
  FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS',
  UPDATE_PERSONAL_DATA = 'UPDATE_PERSONAL_DATA',
  UPDATE_PERSONAL_DATA_SUCCESS = 'UPDATE_PERSONAL_DATA_SUCCESS',
  UPDATE_PERSONAL_DATA_FAILED = 'UPDATE_PERSONAL_DATA_FAILED',
  CHECK_ACCOUNT = 'CHECK_ACCOUNT',
  CHECK_ACCOUNT_SUCCESS = 'CHECK_ACCOUNT_SUCCESS',
  CHECK_ACCOUNT_FAILED = 'CHECK_ACCOUNT_FAILED',
  SHADOW_INVITE_TOKEN = 'SHADOW_INVITE_TOKEN',
  RESET_AUTH_STATE = 'RESET_AUTH_STATE',
}

export interface IAuthAction {
  type: AuthActionTypes
  payload?: {
    webtoken?: string
    account?: IAuthAccount
    inviteToken?: string
    shadowToken?: string
    isSigningUp?: boolean
  }
}

export interface IPersonalDetailFields {
  email?: string
  fullName?: string
  password?: string
  acceptTerms?: boolean
  acceptMarketing?: boolean
  userGuideHelperConfig?: IUserGuideHelperConfig
}

export interface IUpdatePasswordFields {
  password: string
}

export type EulogizeIntegrationCase = {
  externalCaseId: string
  user: IPersonalDetailFields // mainly fullName and email
  deceased: ICaseDeceased // mainly deceased name, dob, dod
  service?: ICaseService // mainly service start time
}

export interface ISignUpAsClientData {
  clientUser?: string
  deceasedName: string
  email: string
  fullName: string
  funeralHome?: string
  password: string
  type: EulogiseUserRole
  serviceTimeStart?: number
  dateOfBirth?: number
  dateOfDeath?: number
  location?: string
  hasSkippedOrFilledMemorialDataPullForm?: boolean
  isShouldSendEmail?: boolean
  deceased: ICaseDeceased
  service: ICaseService
  country?: EulogiseCountry
  enabledProducts?: IEulogiseProductAvailabilityStatus
}

export interface IUserGuideHelperConfig {
  hasViewedClientDashboardPartOne?: boolean
  hasViewedClientDashboardPartTwo?: boolean
  hasViewedMemorialDashboard?: boolean
  hasViewedBooklet?: boolean
  hasViewedSlideshow?: boolean
}

export interface IAuthAccount {
  id: string
  invitorFullName?: string
  fullName: string
  email: string
  verified: boolean
  role: EulogiseUserRole
  createdAt: string
  updatedAt: string
  showOnBoardingHelperEveryTime: boolean
  type: EulogiseUserType
  acceptTerms?: boolean
  acceptMarketing?: boolean
  userGuideHelperConfig?: IUserGuideHelperConfig
}

export interface ILogin {
  webtoken: string
  account: IAuthAccount
}

export interface IAccountCheck {
  account: IAuthAccount
}
export interface ILoginResponse {
  webtoken: string
  account: IAuthAccount
  ref: string
}

export interface IAccountCheckResponse {
  account: IAuthAccount
  ref: string
}

export interface IForgotPasswordResponse {
  ref: string
}

export interface ISignUpResponse {
  webtoken: string
  ref: string
}

export interface ILoginRequestBody {
  email?: string
  password?: string
  type?: EulogiseUserType
  token?: string
}

export interface IForgotPasswordRequestBody {
  email: string
}

export interface IAccountCheckRequestBody {}

export interface ISignUpRequestBody {
  fullName: string
  email: string
  password: string
  deceasedName: string
  deceasedDate: string
  type?: EulogiseUserRole
  acceptTerms?: boolean
  acceptMarketing?: boolean
  country: string
  region: EulogiseRegion
  clientId?: string
  enabledProducts?: IEulogiseProductAvailabilityStatus
}

export interface ILoginRequestResponse extends IRequestResponse {
  request: { body: ILoginRequestBody }
  response: ILoginResponse
}

export interface IAccountCheckRequestResponse extends IRequestResponse {
  request: { body: IAccountCheckRequestBody }
  response: IAccountCheckResponse
}

export interface IForgotPasswordRequestResponse extends IRequestResponse {
  request: { body: IForgotPasswordRequestBody }
  response: IForgotPasswordResponse
}

export interface ISignUpRequestResponse extends IRequestResponse {
  request: { body: ISignUpRequestBody }
  response: ISignUpResponse
}

export type IEulogizeAuthTokenPayload = {
  ref: string
  type: IEulogizeAccountType
  role: EulogiseUserRole
  features?: IEulogizeFeatureAvailabilityStatus
  clientId?: string
  clientTitle?: string
  meta?: {
    case: string
    client: string
  }
  iat?: number
}

export interface IAuthState {
  webtoken?: string | null
  webtokenPayload: IEulogizeAuthTokenPayload | null
  account?: IAuthAccount | null
  inviteToken?: string | null
  shadowToken?: string | null
  isSigningUp: boolean
}
