import { EulogiseCountry } from '@eulogise/core'
import { IClientModel } from '../src/ts/database/types/ClientModel.types'
import { MOCK_CLIENT_ID_1 } from '@eulogise/mock'

export default [
  {
    createdAt: 1622896588081,
    primaryAddress: ['3, 81 Oakley Road'],
    handle: 'stephen',
    additionalAddress: [],
    id: '5fe3f73b-4123-4932-99cf-bdfef9a5f96d',
    users: ['78522eca-5a18-41b4-b61e-e087fe20da3f'],
    updatedAt: 1622896588081,
    title: 'Stephen Client Debugger',
    apiKey: '78522eca-5a18-41b4-b61e-e087fe20da3f',
    createCaseFamilyInviteOptions: [],
    embeddedIframes: {
      showWhiteBottomBar: true,
      allowPurchaseButton: true,
      purchaseUrl: 'https://www.eulogise.com/purchase',
      customButtonCopy: 'Purchase',
      showEulogizeBranding: true,
    },
    allowPurchasing: {
      printing: {
        funeralHomeCanOrder: false,
        familyCanOrder: false,
      },
    },
  },
  {
    createdAt: 1622896588081,
    handle: 'eric',
    primaryAddress: ['3, 81 Oakley Road'],
    additionalAddress: [],
    id: MOCK_CLIENT_ID_1,
    users: ['88522eca-5a18-41b4-b61e-e087fe20da3f'],
    updatedAt: 1622896588081,
    title: 'Eric Chan Client Debugger',
    apiKey: '88522eca-5a18-41b4-b61e-e087fe20da3f',
    createCaseFamilyInviteOptions: [],
  },
  {
    createdAt: 1622896588081,
    handle: 'eric-us',
    primaryAddress: ['3, 81 Oakley Road'],
    additionalAddress: [],
    id: '7fe3f73b-4123-4932-99cf-bdfef9a5f96d',
    users: ['98522eca-5a18-41b4-b61e-e087fe20da3f'],
    updatedAt: 1622896588081,
    title: 'Eric Chan US Client Debugger',
    country: EulogiseCountry.UNITED_STATES,
    apiKey: '98522eca-5a18-41b4-b61e-e087fe20da3f',
    createCaseFamilyInviteOptions: [],
  },
] as unknown as Array<IClientModel.Schema>
