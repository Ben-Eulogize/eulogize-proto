import { Item } from 'dynamoose/dist/Item'
import { IShareRecipient } from '@eulogise/core'

export namespace IShareModel {
  export type Status = 'pending' | 'sent' | 'error' | 'accepted' | 'expired'

  export type Recipient = IShareRecipient

  export interface Schema {
    id?: string
    case: string
    recipients: Array<IShareModel.Recipient>
    tributeIds: Array<string>
    allowDownload: boolean
    invitationMessage?: any
    replyEmail: string
    createdBy: string
    expiresAt?: number
    createdAt?: number
    updatedAt?: number
  }

  export interface PublicSchema {
    id?: string
    case: string
    recipients: Array<IShareModel.Recipient>
    tributeIds: Array<string>
    allowDownload: boolean
    invitationMessage?: string
    replyEmail: string
    expiresAt?: number
    createdAt?: number
    updatedAt?: number
  }

  export type Model = Item & Schema
}
