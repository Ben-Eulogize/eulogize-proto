import { Item } from 'dynamoose/dist/Item'
import { MemorialVisualStatus } from '@eulogise/core'

export namespace IMemorialProductModel {
  export type Status = MemorialVisualStatus
  export type FileStatus = 'not_started' | 'processing' | 'generated' | 'failed'
  export type Schema = {
    id?: string
    case: string
    content: any
    status?: IMemorialProductModel.Status
    fileStatus?: IMemorialProductModel.FileStatus
    createdAt?: number
    updatedAt?: number
    generateUserId?: string
    hasGeneratedBefore?: boolean
  }

  export type Model = Item & Schema
}
