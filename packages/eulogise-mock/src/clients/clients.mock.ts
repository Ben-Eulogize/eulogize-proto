import { IEulogiseClient } from '@eulogise/core'

export const MOCK_CLIENT_1: IEulogiseClient = {
  id: '2796d1fb-2040-478a-9588-ff8d0062e3d2',
  title: 'Flamingo mock client',
  directors: [],
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  users: ['35ea415f-041a-4195-97c3-a3d9cacb024a'],
  logo: 'logo1.jpg',
  apikey: 'apikey-1',
}

export const MOCK_CLIENT_2: IEulogiseClient = {
  id: '2796d1fb-2040-478a-9588-ff8d0062e3d2',
  title: 'Another client',
  directors: [],
  createdAt: '2021-04-15T09:48:41.470Z',
  updatedAt: '2021-04-15T10:45:48.246Z',
  primaryAddress: ['3, 81 Oakley Road'],
  additionalAddress: [],
  users: [
    '35ea415f-041a-4195-97c3-a3d9cacb024a',
    'd83ee2c2-6d40-4b47-88b7-85d49ed0905f',
  ],
  logo: 'logo2.jpg',
  apikey: 'apikey-2',
}

export const MOCK_CLIENTS: Array<IEulogiseClient> = [
  MOCK_CLIENT_1,
  MOCK_CLIENT_2,
]
