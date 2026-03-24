import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users/users.mock'
import {
  IForgotPasswordRequestBody,
  IForgotPasswordRequestResponse,
  IForgotPasswordResponse,
} from '@eulogise/core'

// Mock Forgot Password data
export const MOCK_FORGOT_PASSWORD_REQUEST_BODY_1: IForgotPasswordRequestBody = {
  email: MOCK_USER_1.email,
}

export const MOCK_FORGOT_PASSWORD_REQUEST_BODY_2: IForgotPasswordRequestBody = {
  email: MOCK_USER_2.email,
}

export const MOCK_FORGOT_PASSWORD_REQUEST_BODY_3: IForgotPasswordRequestBody = {
  email: MOCK_USER_3.email,
}

export const MOCK_FORGOT_PASSWORD_RESPONSE_1: IForgotPasswordResponse = {
  ref: '5140f0db87d77',
}

export const MOCK_FORGOT_PASSWORD_RESPONSE_2: IForgotPasswordResponse = {
  ref: '5140f0db87d78',
}

export const MOCK_FORGOT_PASSWORD_RESPONSE_3: IForgotPasswordResponse = {
  ref: '5140f0db87d79',
}

export const MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_1: IForgotPasswordRequestResponse =
  {
    request: { body: MOCK_FORGOT_PASSWORD_REQUEST_BODY_1 },
    response: MOCK_FORGOT_PASSWORD_RESPONSE_1,
  }

export const MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_2: IForgotPasswordRequestResponse =
  {
    request: { body: MOCK_FORGOT_PASSWORD_REQUEST_BODY_2 },
    response: MOCK_FORGOT_PASSWORD_RESPONSE_2,
  }

export const MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_3: IForgotPasswordRequestResponse =
  {
    request: { body: MOCK_FORGOT_PASSWORD_REQUEST_BODY_3 },
    response: MOCK_FORGOT_PASSWORD_RESPONSE_3,
  }

export const MOCK_FORGOT_PASSWORD_REQUEST_RESPONSES: Array<IForgotPasswordRequestResponse> =
  [
    MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_1,
    MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_2,
    MOCK_FORGOT_PASSWORD_REQUEST_RESPONSE_3,
  ]
