import {
  ISignUpRequestBody,
  ISignUpRequestResponse,
  ISignUpResponse,
  EulogiseUserRole,
  EulogiseRegion,
  EulogiseCountry,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users/users.mock'

// Mock Auth data
export const MOCK_SIGN_UP_REQUEST_BODY_1: ISignUpRequestBody = {
  fullName: MOCK_USER_1.fullName,
  email: MOCK_USER_1.email,
  password: MOCK_USER_1.password,
  deceasedName: MOCK_USER_1.deceasedName,
  deceasedDate: MOCK_USER_1.deceasedDate,
  type: EulogiseUserRole.CLIENT,
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
}

export const MOCK_SIGN_UP_REQUEST_BODY_2: ISignUpRequestBody = {
  fullName: MOCK_USER_2.fullName,
  email: MOCK_USER_2.email,
  password: MOCK_USER_2.password,
  deceasedName: MOCK_USER_2.deceasedName,
  deceasedDate: MOCK_USER_2.deceasedDate,
  type: EulogiseUserRole.CLIENT,
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
}

export const MOCK_SIGN_UP_REQUEST_BODY_3: ISignUpRequestBody = {
  fullName: MOCK_USER_3.fullName,
  email: MOCK_USER_3.email,
  password: MOCK_USER_3.password,
  deceasedName: MOCK_USER_3.deceasedName,
  deceasedDate: MOCK_USER_3.deceasedDate,
  type: EulogiseUserRole.CUSTOMER,
  region: EulogiseRegion.USA,
  country: EulogiseCountry.AUSTRALIA,
}

export const MOCK_SIGN_UP_RESPONSE_1: ISignUpResponse = {
  ref: '5140f0db87d77',
  webtoken: MOCK_USER_1.webtoken,
}

export const MOCK_SIGN_UP_RESPONSE_2: ISignUpResponse = {
  ref: '5140f0db87d77',
  webtoken: MOCK_USER_2.webtoken,
}

export const MOCK_SIGN_UP_RESPONSE_3: ISignUpResponse = {
  ref: '5140f0db87d77',
  webtoken: MOCK_USER_3.webtoken,
}

export const MOCK_SIGNUP_REQUEST_RESPONSE_1: ISignUpRequestResponse = {
  request: { body: MOCK_SIGN_UP_REQUEST_BODY_1 },
  response: MOCK_SIGN_UP_RESPONSE_1,
}

export const MOCK_SIGNUP_REQUEST_RESPONSE_2: ISignUpRequestResponse = {
  request: { body: MOCK_SIGN_UP_REQUEST_BODY_2 },
  response: MOCK_SIGN_UP_RESPONSE_2,
}

export const MOCK_SIGNUP_REQUEST_RESPONSE_3: ISignUpRequestResponse = {
  request: { body: MOCK_SIGN_UP_REQUEST_BODY_3 },
  response: MOCK_SIGN_UP_RESPONSE_3,
}

export const MOCK_SIGN_UP_REQUEST_RESPONSES: Array<ISignUpRequestResponse> = [
  MOCK_SIGNUP_REQUEST_RESPONSE_1,
  MOCK_SIGNUP_REQUEST_RESPONSE_2,
  MOCK_SIGNUP_REQUEST_RESPONSE_3,
]
