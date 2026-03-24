import {
  IAccountCheckRequestBody,
  IAccountCheckRequestResponse,
  IAccountCheckResponse,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users/users.mock'

// Mock Account Check data
export const MOCK_ACCOUNT_CHECK_REQUEST_BODY_1: IAccountCheckRequestBody = {}

export const MOCK_ACCOUNT_CHECK_REQUEST_BODY_2: IAccountCheckRequestBody = {}

export const MOCK_ACCOUNT_CHECK_REQUEST_BODY_3: IAccountCheckRequestBody = {}

export const MOCK_ACCOUNT_CHECK_RESPONSE_1: IAccountCheckResponse = {
  account: MOCK_USER_1,
  ref: '5140f0db87d77',
}

export const MOCK_ACCOUNT_CHECK_RESPONSE_2: IAccountCheckResponse = {
  account: MOCK_USER_2,
  ref: '5140f0db87d77',
}

export const MOCK_ACCOUNT_CHECK_RESPONSE_3: IAccountCheckResponse = {
  account: MOCK_USER_3,
  ref: '5140f0db87d77',
}

export const MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_1: IAccountCheckRequestResponse =
  {
    request: { body: MOCK_ACCOUNT_CHECK_REQUEST_BODY_1 },
    response: MOCK_ACCOUNT_CHECK_RESPONSE_1,
  }

export const MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_2: IAccountCheckRequestResponse =
  {
    request: { body: MOCK_ACCOUNT_CHECK_REQUEST_BODY_2 },
    response: MOCK_ACCOUNT_CHECK_RESPONSE_2,
  }

export const MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_3: IAccountCheckRequestResponse =
  {
    request: { body: MOCK_ACCOUNT_CHECK_REQUEST_BODY_3 },
    response: MOCK_ACCOUNT_CHECK_RESPONSE_3,
  }

export const MOCK_ACCOUNT_CHECK_REQUEST_RESPONSES: Array<IAccountCheckRequestResponse> =
  [
    MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_1,
    MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_2,
    MOCK_ACCOUNT_CHECK_REQUEST_RESPONSE_3,
  ]
