import { EulogiseProduct } from './Eulogise.types'
import { ICardProductBackgroundImageBase } from './CardProduct.types'
import { IGenericCardProductTypeData } from './GenericCardProductType.types'

export enum DrawerActionTypes {
  CLOSE_DRAWER = 'CLOSE_DRAWER',
  OPEN_DRAWER = 'OPEN_DRAWER',
}

export interface IDrawerAction {
  type: DrawerActionTypes
  payload?: {
    id: DrawerId
    drawerOptions?: DrawerOptions
  }
}

export interface ThemeDrawerOptions {
  productType: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  isNavigateToProductWhenApplyTheme: boolean
}

export interface ChangeBackgroundImageDrawerOptions {
  productType: EulogiseProduct
  slug?: string
  productId?: string
  isShowConfirmation?: boolean
  selectedBackgroundImage?: ICardProductBackgroundImageBase
}
export interface CopyLibraryDrawerOptions {
  productType: EulogiseProduct
}

export interface EditBackgroundImageDrawerOptions {
  product?: EulogiseProduct
  backgroundImage?: ICardProductBackgroundImageBase
  genericProductType?: IGenericCardProductTypeData
  isEditing?: boolean
  isGenerating?: boolean
}

export enum DrawerId {
  THEME_SELECTION_DRAWER = 'THEME_SELECTION_DRAWER',
  IMAGE_LIBRARY_DRAWER = 'IMAGE_LIBRARY_DRAWER',
  CHANGE_BACKGROUND_IMAGE_DRAWER = 'CHANGE_BACKGROUND_IMAGE_DRAWER',
  HYMNS_PRAYERS_DRAWER = 'HYMNS_PRAYERS_DRAWER',
  EDIT_BACKGROUND_DRAWER = 'EDIT_BACKGROUND_DRAWER',
  DELETE_BACKGROUND_DRAWER = 'DELETE_BACKGROUND_DRAWER',
  PHOTOBOOK_DRAWER = 'PHOTOBOOK_DRAWER',
  SHARE_TRIBUTE_DRAWER = 'SHARE_TRIBUTE_DRAWER',
}

export type DrawerOptions =
  | ThemeDrawerOptions
  | ChangeBackgroundImageDrawerOptions
  | CopyLibraryDrawerOptions
  | EditBackgroundImageDrawerOptions

export interface IDrawerState {
  openDrawerId?: DrawerId | null
  drawerOptions?: DrawerOptions | {}
}
