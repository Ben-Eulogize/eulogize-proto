import { Item } from 'dynamoose/dist/Item'
import { IGenericCardProductData, MemorialVisualStatus } from '@eulogise/core'

export namespace IGenericCardProductModel {
  export type Status = MemorialVisualStatus
  export type Schema = IGenericCardProductData

  export type Model = Item & Schema
}
