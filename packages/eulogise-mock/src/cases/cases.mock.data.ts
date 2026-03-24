import {
  EulogiseResource,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  CaseStatus,
  ICase,
  EulogiseRegion,
  EulogiseUserRole,
  EulogiseCountry,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users/users.mock'

export const MOCK_CASE_1: ICase = {
  service: { timeStart: 1619568023412 },
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  updatedAt: '2021-04-28T12:36:29.063Z',
  status: CaseStatus.PAID,
  createdAt: '2021-04-28T12:36:29.063Z',
  deceased: { fullName: 'whoami' },
  customer: {
    id: 'ee14274a-b251-4f65-9236-15a67d51c43a',
    fullName: 'Stephen Tester',
    email: 'paradoxstephen@gmail.com',
  },
  id: 'mock-case-1',
  editors: [],
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
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
  hasAccessedDownloadPage: false,
  customisedImagesOrderIds: [],
}

export const MOCK_CASE_2: ICase = {
  service: { timeStart: 1623283241628 },
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  updatedAt: '2021-06-10T11:15:43.859Z',
  status: CaseStatus.PAID,
  createdAt: '2021-06-10T11:15:43.859Z',
  deceased: { fullName: 'Flamingo User 3' },
  customer: {
    id: 'ee14274a-b251-4f65-9236-15a67d51c43a',
    fullName: 'Stephen Tester',
    email: 'paradoxstephen@gmail.com',
  },
  id: '1e6e0733-4a6e-45b1-8fa5-42843edc47ab',
  editors: [],
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
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
  hasAccessedDownloadPage: false,
  customisedImagesOrderIds: [],
}

export const MOCK_CASE_3: ICase = {
  service: { timeStart: 1623110407668 },
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  updatedAt: '2021-06-08T03:03:11.432Z',
  status: CaseStatus.PAID,
  createdAt: '2021-06-08T03:03:11.432Z',
  deceased: { fullName: 'Flamingo Customer Name' },
  customer: {
    id: 'ee14274a-b251-4f65-9236-15a67d51c43a',
    fullName: 'Stephen Tester',
    email: 'paradoxstephen@gmail.com',
  },
  id: 'b565d16d-5567-4971-9250-4990cf6f16b2',
  editors: [],
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
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
  hasAccessedDownloadPage: false,
  customisedImagesOrderIds: [],
}

export const MOCK_CASE_4: ICase = {
  service: { timeStart: 1623110449477 },
  client: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
  updatedAt: '2021-06-08T03:04:53.361Z',
  status: CaseStatus.PAID,
  createdAt: '2021-06-08T03:04:53.361Z',
  deceased: { fullName: 'Flamingo Customer User 2' },
  customer: {
    id: '6ad84442-372b-430f-968c-92d19466a99d',
    fullName: 'Flamingo Customer User 2',
    email: 'wwtlove1993@163.com',
  },
  id: '5712eddd-7154-48d5-81e0-14cccb85f0b2',
  editors: [],
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
  region: EulogiseRegion.AU,
  country: EulogiseCountry.AUSTRALIA,
  hasAccessedDownloadPage: false,
  customisedImagesOrderIds: [],
}

export const MOCK_CASES: Array<ICase> = [
  MOCK_CASE_1,
  MOCK_CASE_2,
  MOCK_CASE_3,
  MOCK_CASE_4,
]

export const MOCK_CASE_FIND_RESPONSE_1: IFindResponse = {
  items: [MOCK_CASE_1, MOCK_CASE_2, MOCK_CASE_3, MOCK_CASE_4],
  count: MOCK_CASES.length,
  ref: 'd2582abb18805',
}

export const MOCK_CASE_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.CASE,
  search: {},
}

export const MOCK_CASE_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_CASE_FIND_REQUEST_BODY_1 },
  response: MOCK_CASE_FIND_RESPONSE_1,
}

export const MOCK_CASE_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_CASE_FIND_REQUEST_BODY_1 },
  response: MOCK_CASE_FIND_RESPONSE_1,
}

export const MOCK_CASE_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_3.webtoken,
  request: { body: MOCK_CASE_FIND_REQUEST_BODY_1 },
  response: MOCK_CASE_FIND_RESPONSE_1,
}

export const MOCK_CASE_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> = [
  MOCK_CASE_FIND_REQUEST_RESPONSE_1,
  MOCK_CASE_FIND_REQUEST_RESPONSE_2,
  MOCK_CASE_FIND_REQUEST_RESPONSE_3,
]
