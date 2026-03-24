import { Item } from 'dynamoose/dist/Item'

export namespace ITransactionModel {
  export type Schema = {
    id?: string
    stripePaymentIntentId: string
    stripePaymentIntentData: any
    customer: string
    createdAt?: number
    updatedAt?: number
  }

  export type Model = Item & Schema
}
