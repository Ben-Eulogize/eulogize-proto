import { Item } from 'dynamoose/dist/Item'
import { EulogiseUserRole } from '@eulogise/core'

export namespace IInviteModel {
  export type Status = 'pending' | 'sent' | 'error' | 'accepted'
  export interface Schema {
    id?: string
    /** Details */
    fullName?: string
    email?: string
    case?: string
    client?: string
    hasClientUserResetPassword?: boolean
    role: EulogiseUserRole
    invitorFullName?: string
    /** Meta */
    status: IInviteModel.Status
    token: string // will be created by uuid.v4() on case creation
    createdAt?: number
    updatedAt?: number
  }
  export interface PublicSchema {
    id?: string
    fullName?: string
    invitorFullName?: string
    email?: string
    case?: string
    client?: string
    hasClientUserResetPassword: boolean
    role: EulogiseUserRole
    status: IInviteModel.Status
    createdAt?: number
    updatedAt?: number
  }

  export type Model = Item & Schema
}
