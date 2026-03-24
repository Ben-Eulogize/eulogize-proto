import { EulogiseUserRole, IInvite } from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2 } from '../users'

export const MOCK_INVITE_1: IInvite = {
  token: 'token-1',
  role: EulogiseUserRole.CONTRIBUTOR,
  invitor: MOCK_USER_1.id,
  client: 'client-1',
  updatedAt: '2021-03-05T06:37:26.118Z',
  status: 'sent',
  createdAt: '2021-03-05T06:37:24.786Z',
  fullName: 'Test User 1',
  id: 'invite-1',
  email: 'invite+2@karlsson.com.au',
  case: '1938302e-2630-4b29-bb0f-adbcbb56c369',
  hasClientUserResetPassword: false,
}

export const MOCK_INVITE_2: IInvite = {
  invitor: MOCK_USER_2.id,
  token: 'token-2',
  role: EulogiseUserRole.CONTRIBUTOR,
  client: 'client-2',
  updatedAt: '2021-03-05T06:37:26.118Z',
  status: 'sent',
  createdAt: '2021-03-05T06:37:24.786Z',
  fullName: 'Test User 2',
  id: 'invite-2',
  email: 'invite+2@karlsson.com.au',
  case: '1938302e-2630-4b29-bb0f-adbcbb56c369',
  hasClientUserResetPassword: false,
}

export const MOCK_INVITES: Array<IInvite> = [MOCK_INVITE_1, MOCK_INVITE_2]

export const MOCK_INVITES_RESPONSE = {
  items: MOCK_INVITES,
  count: 1,
  ref: 'a3339b62996eb',
}
