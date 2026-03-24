import { Item } from 'dynamoose/dist/Item'
import { ICardProductBackgroundImageBase } from '@eulogise/core'

export namespace IBackgroundImageModel {
  export interface Schema extends ICardProductBackgroundImageBase {}

  export type Model = Item & Schema
}
