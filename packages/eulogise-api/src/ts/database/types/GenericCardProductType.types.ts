import { Item } from 'dynamoose/dist/Item'
import { IGenericCardProductTypeData } from '@eulogise/core'

export namespace IGenericCardProductTypeModel {
  export type Schema = IGenericCardProductTypeData

  export type Model = Item & Schema
}
