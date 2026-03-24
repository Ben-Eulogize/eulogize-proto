import {
  EulogiseUserRole,
  ExtractedPartialIUser,
  PartialIUser,
} from '@eulogise/core'

export const ADMIN_EXTRACTED_PORTAL_MOCK_USER_1: PartialIUser<ExtractedPartialIUser> =
  {
    id: '78522eca-5a18-41b4-b61e-e087fe20da3f',
    name: 'Stephen W',
    email: 'stephen@wildpalms.com.au',
    role: EulogiseUserRole.CUSTOMER,
    createdAt: '2021-04-15T09:48:41.470Z',
  }

export const ADMIN_EXTRACTED_PORTAL_MOCK_USER_2: PartialIUser<ExtractedPartialIUser> =
  {
    id: '78522eca-5a18-41b4-b61e-e087fe20da3e',
    name: 'Eric C',
    email: 'kakchan@gmail.com',
    role: EulogiseUserRole.CUSTOMER,
    createdAt: '2021-04-15T09:48:41.470Z',
  }

export const ADMIN_EXTRACTED_PORTAL_MOCK_USERS: Array<
  PartialIUser<ExtractedPartialIUser>
> = [ADMIN_EXTRACTED_PORTAL_MOCK_USER_1, ADMIN_EXTRACTED_PORTAL_MOCK_USER_2]
