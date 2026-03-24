import { Item } from 'dynamoose/dist/Item'

export namespace IAssetModel {
  export type Type = 'image' | 'audio' | 'brand'

  export interface Schema {
    id?: string
    type: IAssetModel.Type
    owner: string /** IUserModel.Schema.id or InviteModel.id */
    case: string
    content: any
    createdAt?: number
    updatedAt?: number
    client?: string
  }

  export type Model = Item & Schema
}
