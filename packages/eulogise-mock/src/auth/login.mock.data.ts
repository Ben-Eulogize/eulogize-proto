import {
  ILogin,
  ILoginRequestBody,
  ILoginRequestResponse,
  ILoginResponse,
  EulogiseUserType,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users/users.mock'

// Mock Auth data
export const MOCK_LOGIN_1: ILogin = {
  webtoken: MOCK_USER_1.webtoken,
  account: MOCK_USER_1,
}

export const MOCK_LOGIN_2: ILogin = {
  webtoken: MOCK_USER_2.webtoken,
  account: MOCK_USER_2,
}

export const MOCK_LOGIN_3: ILogin = {
  webtoken: MOCK_USER_3.webtoken,
  account: MOCK_USER_3,
}

export const MOCK_LOGIN_REQUEST_BODY_1: ILoginRequestBody = {
  email: MOCK_USER_1.email,
  password: MOCK_USER_1.password,
  type: EulogiseUserType.USER,
}

export const MOCK_LOGIN_REQUEST_BODY_2: ILoginRequestBody = {
  email: MOCK_USER_2.email,
  password: MOCK_USER_2.password,
  type: EulogiseUserType.USER,
}

export const MOCK_LOGIN_REQUEST_BODY_3: ILoginRequestBody = {
  email: MOCK_USER_3.email,
  password: MOCK_USER_3.password,
  type: EulogiseUserType.USER,
}

export const MOCK_LOGIN_RESPONSE_1: ILoginResponse = {
  ...MOCK_LOGIN_1,
  ref: '5140f0db87d77',
}

export const MOCK_LOGIN_RESPONSE_2: ILoginResponse = {
  ...MOCK_LOGIN_2,
  ref: '5140f0db87d77',
}

export const MOCK_LOGIN_RESPONSE_3: ILoginResponse = {
  ...MOCK_LOGIN_3,
  ref: '5140f0db87d77',
}

export const MOCK_LOGIN_REQUEST_RESPONSE_1: ILoginRequestResponse = {
  request: { body: MOCK_LOGIN_REQUEST_BODY_1 },
  response: MOCK_LOGIN_RESPONSE_1,
}

export const MOCK_LOGIN_REQUEST_RESPONSE_2: ILoginRequestResponse = {
  request: { body: MOCK_LOGIN_REQUEST_BODY_2 },
  response: MOCK_LOGIN_RESPONSE_2,
}

export const MOCK_LOGIN_REQUEST_RESPONSE_3: ILoginRequestResponse = {
  request: { body: MOCK_LOGIN_REQUEST_BODY_3 },
  response: MOCK_LOGIN_RESPONSE_3,
}

export const MOCK_LOGIN_REQUEST_RESPONSES: Array<ILoginRequestResponse> = [
  MOCK_LOGIN_REQUEST_RESPONSE_1,
  MOCK_LOGIN_REQUEST_RESPONSE_2,
  MOCK_LOGIN_REQUEST_RESPONSE_3,
]
