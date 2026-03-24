import {
  IEulogiseUser,
  EulogiseUserRole,
  EulogiseUserType,
} from '@eulogise/core'

export const MOCK_ADMIN_EMAIL_1 = 'eulogise+admin@gmail.com'
export const MOCK_CLIENT_ADMIN_US_EMAIL_1 = 'eulogise+clientAdminUS@gmail.com'

export const MOCK_CLIENT_ADMIN_EMAIL_1 = 'eulogise+clientAdmin@gmail.com'
export const MOCK_CUSTOMER_EMAIL_1 = 'eulogise+customer@gmail.com'
export const MOCK_CLIENT_CUSTOMER_EMAIL_1 = 'eulogise+clientCustomer@gmail.com'
export const MOCK_CUSTOMER_EDITOR_EMAIL_1 = 'eulogise+customerEditor@gmail.com'
export const MOCK_CLIENT_EDITOR_EMAIL_1 = 'eulogise+clientEditor@gmail.com'
export const MOCK_CUSTOMER_COEDITOR_EMAIL_1 =
  'eulogise+customerCoEditor@gmail.com'
export const MOCK_CLIENT_COEDITOR_EMAIL_1 = 'eulogise+clientCoEditor@gmail.com'

export const MOCK_US_CUSTOMER_EMAIL_1 = 'eulogise+customerUS@gmail.com'
export const MOCK_CUSTOMER_ID_1 = 'customer-id-1'
export const MOCK_US_CUSTOMER_ID_1 = 'us-customer-id-1'
export const MOCK_CLIENT_CUSTOMER_ID_1 = 'client-customer-id'
export const MOCK_CLIENT_ID_1 = 'mock-client-id'

type SignInRequestBody = { email: string; password: string }
export const MOCK_PASSWORD = '123123'
export const AVAILABLE_SIGN_IN_USERS: { [key: string]: SignInRequestBody } = {
  [EulogiseUserRole.ADMIN]: {
    email: MOCK_ADMIN_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  [EulogiseUserRole.CLIENT]: {
    email: MOCK_CLIENT_ADMIN_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  [EulogiseUserRole.CUSTOMER]: {
    email: MOCK_CUSTOMER_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  CUSTOMER_EDITOR: {
    email: MOCK_CUSTOMER_EDITOR_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  CUSTOMER_COEDITOR: {
    email: MOCK_CUSTOMER_COEDITOR_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  US_CLIENT: {
    email: MOCK_CLIENT_ADMIN_US_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  CLIENT_CUSTOMER: {
    email: MOCK_CLIENT_CUSTOMER_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  CLIENT_EDITOR: {
    email: MOCK_CLIENT_EDITOR_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  CLIENT_COEDITOR: {
    email: MOCK_CLIENT_COEDITOR_EMAIL_1,
    password: MOCK_PASSWORD,
  },
  US_CUSTOMER: {
    email: MOCK_US_CUSTOMER_EMAIL_1,
    password: MOCK_PASSWORD,
  },
}

export const MOCK_USER_1: IEulogiseUser = {
  id: '78522eca-5a18-41b4-b61e-e087fe20da3f',
  fullName: 'Stephen W',
  email: 'stephen@wildpalms.com.au',
  password: '123123',
  deceasedName: 'Test User 1',
  deceasedDate: '2020-10-10',
  webtoken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiI3ODUyMmVjYS01YTE4LTQxYjQtYjYxZS1lMDg3ZmUyMGRhM2YiLCJyb2xlIjoiY2xpZW50IiwidHlwZSI6InVzZXIiLCJpYXQiOjE2MzQwOTQ5Mzh9.rXbHPQnOrkd9Nq3T62-J1QozdkXMuiqxvR1YT0hSnek',
  verified: false,
  role: EulogiseUserRole.CLIENT,
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  showOnBoardingHelperEveryTime: false,
  type: EulogiseUserType.USER,
}

export const MOCK_USER_2: IEulogiseUser = {
  id: '78522eca-5a18-41b4-b61e-e087fe20da3e',
  fullName: 'Eric C',
  email: 'kakchan@gmail.com',
  password: '123123',
  deceasedName: 'Test User 2',
  deceasedDate: '2020-10-10',
  webtoken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiI0ZGI1ZTFmNi1hODgyLTRmNDctOGQ2OS0zZDk0OWRmZTFiZDgiLCJyb2xlIjoiY3VzdG9tZXIiLCJ0eXBlIjoidXNlciIsImlhdCI6MTYzNDYxNTMwNX0.wekzyHBHhfGo5kASCHP2AVeMYIKEotaCIBp5ExM1MJ4',
  verified: false,
  role: EulogiseUserRole.CLIENT,
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  showOnBoardingHelperEveryTime: false,
  type: EulogiseUserType.USER,
}

export const MOCK_USER_3: IEulogiseUser = {
  id: '78522eca-5a18-41b4-b61e-e087fe20da3d',
  fullName: 'Normal Customer',
  email: 'normal@eulogise.com',
  password: '123123',
  deceasedName: 'Test User 3',
  deceasedDate: '2020-10-10',
  webtoken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiI0ZGI1ZTFmNi1hODgyLTRmNDctOGQ2OS0zZDk0OWRmZTFiZDgiLCJyb2xlIjoiY3VzdG9tZXIiLCJ0eXBlIjoidXNlciIsImlhdCI6MTYzNDYxNTMwNX0.wekzyHBHhfGo5kASCHP2AVeMYIKEotaCIBp5ExM1MJ5',
  verified: false,
  role: EulogiseUserRole.CUSTOMER,
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  showOnBoardingHelperEveryTime: false,
  type: EulogiseUserType.USER,
}

export const MOCK_ADMIN_USER_1: IEulogiseUser = {
  id: '78522eca-5a18-41b4-456e-e087fe20da3d',
  fullName: 'Admin Wildpalms',
  email: 'admin@wildpalms.com',
  password: '123123',
  deceasedName: 'Admin Test User 1',
  deceasedDate: '2020-10-10',
  webtoken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiI0ZGI1ZTFmNi1hODgyLTRmNDctOGQ2OS0zZDk0OWRmZTFiZDgiLCJyb2xlIjoiY3VzdG9tZXIiLCJ0eXBlIjoidXNlciIsImlhdCI6MTYzNDYxNTMwNX0.wekzyHBHhfGo5kASCHP2AVeMYIKEotaCIBp5ExM1MJ5',
  verified: false,
  role: EulogiseUserRole.ADMIN,
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  showOnBoardingHelperEveryTime: false,
  type: EulogiseUserType.USER,
}

export const MOCK_USERS: Array<IEulogiseUser> = [MOCK_USER_1, MOCK_USER_2]
