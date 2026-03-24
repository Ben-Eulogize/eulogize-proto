import { Item } from 'dynamoose/dist/Item'

export namespace IConnectionModel {
  export interface Schema {
    id?: string
    case?: string
    user: string
    client?: string
  }

  export type Model = Item & Schema
}
