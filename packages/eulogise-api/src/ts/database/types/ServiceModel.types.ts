import { Item } from 'dynamoose/dist/Item'

export namespace IServiceModel {
  export interface PublicSchema {
    id?: string
    title: string
    createdAt?: number
    updatedAt?: number
  }
  export interface Schema {
    id?: string
    title: string
    accessKey: string
    secretKey: string
    createdAt?: number
    updatedAt?: number
  }

  export type Model = Item & Schema
}
