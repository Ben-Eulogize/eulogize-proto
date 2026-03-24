import { EulogiseUserRole, IEulogiseUser } from './Resource.types'

export enum InviteActionTypes {
  SEND_WELCOME_EMAIL = 'SEND_WELCOME_EMAIL',
  SEND_WELCOME_EMAIL_SUCCESS = 'SEND_WELCOME_EMAIL_SUCCESS',
  SEND_WELCOME_EMAIL_FAILED = 'SEND_WELCOME_EMAIL_FAILED',
  GENERATE_SHARABLE_LINK = 'GENERATE_SHARABLE_LINK',
  GENERATE_SHARABLE_LINK_SUCCESS = 'GENERATE_SHARABLE_LINK_SUCCESS',
  GENERATE_SHARABLE_LINK_FAILED = 'GENERATE_SHARABLE_LINK_FAILED',
  SHARE_WITH_CONTACT = 'SHARE_WITH_CONTACT',
  SHARE_WITH_CONTACT_SUCCESS = 'SHARE_WITH_CONTACT_SUCCESS',
  SHARE_WITH_CONTACT_FAILED = 'SHARE_WITH_CONTACT_FAILED',
  CREATE_INVITE = 'CREATE_INVITE',
  CREATE_INVITE_SUCCESS = 'CREATE_INVITE_SUCCESS',
  CREATE_INVITE_FAILED = 'CREATE_INVITE_FAILED',
  FETCH_INVITES_BY_CASE_ID = 'FETCH_INVITES_BY_CASE_ID',
  FETCH_INVITES_BY_CASE_ID_SUCCESS = 'FETCH_INVITES_BY_CASE_ID_SUCCESS',
  FETCH_INVITES_BY_CASE_ID_FAILED = 'FETCH_INVITES_BY_CASE_ID_FAILED',
  SEND_INVITE = 'SEND_INVITE',
  SEND_INVITE_SUCCESS = 'SEND_INVITE_SUCCESS',
  SEND_INVITE_FAILED = 'SEND_INVITE_FAILED',
  REMOVE_INVITE = 'REMOVE_INVITE',
  REMOVE_INVITE_SUCCESS = 'REMOVE_INVITE_SUCCESS',
  REMOVE_INVITE_FAILED = 'REMOVE_INVITE_FAILED',
}

export interface IInviteAction {
  type: InviteActionTypes
  payload?: {
    invite?: IInvite
    inviteId?: string
    shareLink?: string
    inviteRole?: EulogiseUserRole
    invites?: Array<IInvite>
  }
}
export type InviteStatus = 'pending' | 'sent' | 'error' | 'accepted'

export interface IInviteUserData {
  email: string
  fullName: string
}

export interface IInviteData {
  role: EulogiseUserRole
  client?: string
  case?: string
  fullName: string
  email: string
  status?: InviteStatus
}

export interface IInviteFields {
  fullName: string
  email: string
}

export interface IInvite {
  id: string
  fullName: string
  invitor: string
  email?: string
  case?: string
  client?: string
  hasClientUserResetPassword: Boolean
  role: EulogiseUserRole
  status: InviteStatus
  createdAt?: string
  updatedAt?: string
  token?: string
}

export type IFuneralDirector =
  | Pick<IEulogiseUser, keyof IFuneralDirectorProps>
  | { clientId: string }

export interface IFuneralDirectorProps {
  id: string
  fullName: string
  email: string
}

export interface IInviteState {
  isGenerating: boolean
  isSharing: boolean
  isCreating: boolean
  shareLinks: { [key: string]: string }
  items: Array<IInvite>
  isFetching: boolean
}
