import { Item } from 'dynamoose/dist/Item'
import { ICardProductTheme, ISlideshowTheme } from '@eulogise/core'

export namespace IThemeModel {
  export interface Schema {
    id?: string
    name: string
    categories: Array<string>
    baseFont: string
    dateFormat: string
    clientId: string
    deleted?: boolean
    products: {
      booklet?: ICardProductTheme
      bookletUS?: ICardProductTheme
      sidedCard?: ICardProductTheme
      sidedCardUS?: ICardProductTheme
      bookmark?: ICardProductTheme
      slideshow?: ISlideshowTheme
      tvWelcomeScreen?: ICardProductTheme
      thankYouCard?: ICardProductTheme
      photobook?: ICardProductTheme
    }
  }

  export type Model = Item & Schema
}
