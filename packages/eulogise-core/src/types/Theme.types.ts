import { ICardProductTheme } from './CardProduct.types'
import { ISlideshowTheme } from './Slideshow.types'
import { EulogiseProduct, EulogiseProductThemeMap } from './Eulogise.types'

export interface IProductThemeThumbnail {
  id?: string
  name?: string
  thumbnail: string
}

export type ProductThemeType =
  | IProductThemeThumbnail
  | ICardProductTheme
  | ISlideshowTheme

export interface IThemeCommon {
  id: string
  name: string
  categories: Array<string>
  baseFont: string
  dateFormat: string
  dateFormatUS: string
}

export type TemplateDesignDetailsFormFields = Partial<
  IThemeCommon & { overwriteThumbnail: boolean }
>

export interface ITheme extends IThemeCommon {
  clientId: string
  products: Record<EulogiseProductThemeMap, ICardProductTheme | ISlideshowTheme>
  deleted?: boolean
}

export interface IThemeState {
  isCreating: boolean
  isUpdating: boolean
  isFetching: boolean
  isAdding: boolean
  themes: Array<ITheme>
}

export enum ThemeActionTypes {
  // fetch all the available themes
  // do not return the theme content, to much data. Only return the IProductThemeThumbnail
  FETCH_THEMES = 'FETCH_THEMES',
  FETCH_THEMES_SUCCESS = 'FETCH_THEMES_SUCCESS',
  FETCH_THEMES_FAILED = 'FETCH_THEMES_FAILED',
  // fetch a single theme, with the content
  FETCH_THEME = 'FETCH_THEME',
  FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS',
  FETCH_THEME_FAILED = 'FETCH_THEME__FAILED',
  // create a theme
  CREATE_THEME = 'CREATE_THEME',
  CREATE_THEME_SUCCESS = 'CREATE_THEME_SUCCESS',
  CREATE_THEME_FAILED = 'CREATE_THEME_FAILED',
  // update a theme
  UPDATE_THEME = 'UPDATE_THEME',
  UPDATE_THEME_SUCCESS = 'UPDATE_THEME_SUCCESS',
  UPDATE_THEME_FAILED = 'UPDATE_THEME_FAILED',
  UPSERT_THEME = 'UPSERT_THEME',
  DELETE_THEME_BY_ID = 'DELETE_THEME_BY_ID',
  DELETE_THEME_BY_ID_SUCCESS = 'DELETE_THEME_BY_ID_SUCCESS',
  DELETE_THEME_BY_ID_FAILED = 'DELETE_THEME_BY_ID_FAILED',
}

export interface IThemeAction {
  type: ThemeActionTypes
  payload?: {
    theme?: ITheme
    themes?: Array<ITheme>
  }
}
export interface IDynamicThemeFontSizeAdaptionObject {
  DECEASED_NAME: {
    ORIGIN_FONT_TYPE: Record<EulogiseProduct, string>
    ONE_LEVEL_SMALLER_FONT_TYPE: Record<EulogiseProduct, string>
    TWO_LEVEL_SMALLER_FONT_TYPE: Record<EulogiseProduct, string>
    ONE_LEVEL_STRING_LENGTH_THRESHOLD: Record<EulogiseProduct, number>
    TWO_LEVEL_STRING_LENGTH_THRESHOLD: Record<EulogiseProduct, number>
  }
}
