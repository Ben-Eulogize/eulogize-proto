import {
  EulogiseCountry,
  ExtractedPartialIClient,
  IClientCreateOrEditRequestBody,
} from '@eulogise/core'

export const ADMIN_EXTRACTED_MOCK_CLIENT_1: ExtractedPartialIClient = {
  key: '1',
  id: '2796d1fb-2040-478a-9588-ff8d0062e3d2',
  brand: 'Flamingo mock client',
  createdAt: '2021-04-15T09:48:41.470Z',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  stringifyUsers: '35ea415f-041a-4195-97c3-a3d9cacb024a',
  logo: 'logo1.jpg',
  apikey: 'apikey-1',
}

export const ADMIN_EXTRACTED_MOCK_CLIENT_2: ExtractedPartialIClient = {
  key: '2',
  id: '2796d1fb-2040-478a-9588-ff8d0062e3d2',
  brand: 'Another client',
  directors: [],
  createdAt: '2021-04-15T09:48:41.470Z',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  stringifyUsers:
    '35ea415f-041a-4195-97c3-a3d9cacb024a, d83ee2c2-6d40-4b47-88b7-85d49ed0905f',
  logo: 'logo2.jpg',
  apikey: 'apikey-2',
}

export const ADMIN_CREATE_CLIENT_MOCK_REQUEST_BODY_1 = {
  clientId: '123',
  title: 'Client 1',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  newLogoUrl: 'url 1',
  invitedFuneralDirectorIds: ['123, 456'],
  signUpNewFuneralDirectorIDs: ['789'],
  originLogoUrl: 'url 2',
}

export const ADMIN_CREATE_CLIENT_MOCK_REQUEST_BODY_2 = {
  title: 'Client 2',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  newLogoUrl: 'url 3',
  invitedFuneralDirectorIds: ['123, 456'],
  signUpNewFuneralDirectorIDs: ['789'],
  originLogoUrl: 'url 4',
  country: EulogiseCountry.AUSTRALIA,
}

export const ADMIN_CREATE_CLIENT_MOCK_REQUEST_BODY_BUILDER_1: IClientCreateOrEditRequestBody =
  {
    id: '123',
    title: 'Client 1',
    primaryAddress: ['3, 81 Oakley Road'],
    additionalAddress: [],
    logo: 'url 1',
    users: ['123, 456', '789'],
    country: EulogiseCountry.AUSTRALIA,
  }

export const ADMIN_CREATE_CLIENT_MOCK_REQUEST_BODY_BUILDER_2: IClientCreateOrEditRequestBody =
  {
    title: 'Client 2',
    primaryAddress: ['3, 81 Oakley Road'],
    additionalAddress: [],
    logo: 'url 3',
    users: ['789'],
    country: EulogiseCountry.UNITED_STATES,
  }

export const ADMIN_EXTRACTED_MOCK_CLIENTS: Array<ExtractedPartialIClient> = [
  ADMIN_EXTRACTED_MOCK_CLIENT_1,
  ADMIN_EXTRACTED_MOCK_CLIENT_2,
]
