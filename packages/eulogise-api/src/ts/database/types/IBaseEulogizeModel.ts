import { Item } from 'dynamoose/dist/Item'

export namespace IBaseEulogizeModel {
  export type Schema = {}

  export type Model = Item & Schema
}
