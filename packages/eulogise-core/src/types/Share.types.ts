import { IEulogiseUser } from './Resource.types'

export enum ShareActionTypes {
  UPSERT_SHARE = 'UPSERT_SHARE',
  UPSERT_SHARE_SUCCESS = 'UPSERT_SHARE_SUCCESS',
  UPSERT_SHARE_FAILED = 'UPSERT_SHARE_FAILED',
  FETCH_SHARES_BY_CASE_ID = 'FETCH_SHARES_BY_CASE_ID',
  FETCH_SHARES_BY_CASE_ID_SUCCESS = 'FETCH_SHARES_BY_CASE_ID_SUCCESS',
  FETCH_SHARES_BY_CASE_ID_FAILED = 'FETCH_SHARES_BY_CASE_ID_FAILED',
}

export type ShareRecipientStatus =
  | 'pending'
  | 'sent'
  | 'error'
  | 'accepted'
  | 'expired'

export interface IShareRecipient {
  email: string
  fullName?: string
  status: ShareRecipientStatus
  sentAt?: number
  acceptedAt?: number
  selected?: boolean
}

export interface IShare {
  id?: string
  case: string
  recipients: Array<IShareRecipient>
  tributeIds: Array<string>
  allowDownload: boolean
  invitationMessage?: any
  replyEmail: string
  createdBy?: string | IEulogiseUser
  expiresAt?: number
  createdAt?: number
  updatedAt?: number
}

export interface IShareAction {
  type: ShareActionTypes
  payload?: {
    share?: IShare
    shares?: Array<IShare>
    caseId?: string
    error?: string
  }
}

export interface IShareState {
  isUpserting: boolean
  isFetching: boolean
  share: IShare | null
  shares: Array<IShare>
  error: string | null
}
