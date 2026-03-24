import {
  CaseStatus,
  EulogiseUserRole,
  ExtractedPartialICase,
  PartialIClient,
} from '@eulogise/core'

export const MOCK_CUSTOMER_CASE_ID_1 = 'customer-f7bf-46e7-9226-c74bfc28d531'
export const MOCK_US_CUSTOMER_CASE_ID_1 = 'customer-usbf-46e7-9226-c74bfc28d531'
export const MOCK_CLIENT_CUSTOMER_CASE_ID_1 =
  'client00-cust-omer-9226-c74bfc28d531'
export const MOCK_CUSTOMER_CASE_ID_2 = 'customer-b251-23vz-9236-15a67d51bc73'
export const MOCK_CUSTOMER_CASE_ID_3 = 'customer-c251-23vz-9236-15a67d51bc73'
export const MOCK_CLIENT_CASE_ID_1 = 'client00-f7bf-46e7-9226-c74bfc28d531'

export const ADMIN_EXTRACTED_MOCK_CASE_1: PartialIClient<ExtractedPartialICase> =
  {
    key: '1',
    id: '75c93d2d-f7bf-46e7-9226-c74bfc28d531',
    status: CaseStatus.PAID,
    deceasedName: 'Stephen Tester',
    client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
    createdAt: '2021-04-28T12:36:29.063Z',
    updatedAt: '2021-06-10T11:15:43.859Z',
    funeralDirector: {
      password: '$2a$10$pNON/EPMxku9GwkmO9zEI.r5PIJdMk2DbnYRAvnN2ffZ7w1QpSVrK',
      token: '19b7f251-afff-4613-80cf-0af1beae8af2',
      role: EulogiseUserRole.CLIENT,
      showOnBoardingHelperEveryTime: false,
      updatedAt: '2021-04-15T10:45:48.246Z',
      createdAt: '2021-04-15T09:48:41.470Z',
      fullName: 'Stephen Wang',
      id: '78522eca-5a18-41b4-b61e-e087fe20da3f',
      email: 'stephen@wildpalms.com.au',
      verified: false,
    },
  }

export const ADMIN_EXTRACTED_MOCK_CASE_2: ExtractedPartialICase = {
  key: '1',
  id: '75c93d2d-f7bf-46e7-9226-c74bfc28d531',
  status: CaseStatus.PAID,
  deceasedName: 'Eric Chan',
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  createdAt: '2021-04-28T12:36:29.063Z',
  updatedAt: '2021-06-10T11:15:43.859Z',
  funeralDirector: {
    password: '$2a$10$pNON/EPMxku9GwkmO9zEI.r5PIJdMk2DbnYRAvnN2ffZ7w1QpSVrK',
    token: '19b7f251-afff-4613-80cf-0af1beae8af2',
    role: EulogiseUserRole.CLIENT,
    showOnBoardingHelperEveryTime: false,
    updatedAt: '2021-04-15T10:45:48.246Z',
    createdAt: '2021-04-15T09:48:41.470Z',
    fullName: 'Eric Chan',
    id: '78522eca-5a18-41b4-b61e-e087fe20da3f',
    email: 'stephen@wildpalms.com.au',
    verified: false,
  },
}

export const ADMIN_EXTRACTED_MOCK_CASE_3: ExtractedPartialICase = {
  key: '1',
  id: '75c93d2d-f7bf-46e7-9226-c74bfc28d531',
  status: CaseStatus.PAID,
  deceasedName: 'Another Person',
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  createdAt: '2021-04-28T12:36:29.063Z',
  updatedAt: '2021-06-10T11:15:43.859Z',
  funeralDirector: {
    password: '$2a$10$pNON/EPMxku9GwkmO9zEI.r5PIJdMk2DbnYRAvnN2ffZ7w1QpSVrK',
    token: '19b7f251-afff-4613-80cf-0af1beae8af2',
    role: EulogiseUserRole.CLIENT,
    showOnBoardingHelperEveryTime: false,
    updatedAt: '2021-04-15T10:45:48.246Z',
    createdAt: '2021-04-15T09:48:41.470Z',
    fullName: 'Another Person',
    id: '78522eca-5a18-41b4-b61e-e087fe20da3f',
    email: 'stephen@wildpalms.com.au',
    verified: false,
  },
}

export const ADMIN_EXTRACTED_MOCK_CASES: Array<
  PartialIClient<ExtractedPartialICase>
> = [
  ADMIN_EXTRACTED_MOCK_CASE_1,
  ADMIN_EXTRACTED_MOCK_CASE_2,
  ADMIN_EXTRACTED_MOCK_CASE_3,
]
