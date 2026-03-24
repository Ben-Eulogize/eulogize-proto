import { IOrderDetails } from '@eulogise/core'
import { Item } from 'dynamoose/dist/Item'

export namespace IInvoiceModel {
  export type Status = 'pending' | 'failed' | 'complete'
  export type Details = IOrderDetails
  export interface Schema {
    id?: string
    case: string
    customer: string
    transactions?: string[]
    details?: IInvoiceModel.Details
    status: IInvoiceModel.Status
    error?: {
      message: string
      timestamp: number
      details?: any
    }
    createdAt?: number
    updatedAt?: number
  }

  export type Model = Item & Schema
}
