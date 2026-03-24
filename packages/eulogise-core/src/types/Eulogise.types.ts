import React from 'react'
import { IModalState } from './Modals.types'
import { IAssetState } from './Assets.types'
import { IAuthState } from './Auth.types'
import {
  ICardProductState,
  IGenericCardProductsState,
} from './CardProduct.types'
import { ICaseState } from './Case.types'
import { IClientState } from './Client.types'
import { IConnectionState } from './Connection.types'
import { IInviteState } from './Invite.types'
import { IInvoiceState } from './Invoice.types'
import { IDrawerState } from './Drawers.types'
import { IMobileMenuState } from './MobileMenu.types'
import { ISlideshowState } from './Slideshow.types'
import { IAdminState } from './Admin.types'
import { IGuideWalkThroughState } from './GuideWalkThrough.types'
import { ICheckoutsState } from './Checkouts.types'
import { IThemeState } from './Theme.types'
import { ISiderMenuState } from './SiderMenu.types'
import { IBackgroundImageState } from './BackgroundImage.types'
import { IUserSettingsState } from './UserSettings.types'
import { IGlobalState } from './Global.types'
import { ICustomerInfoState } from './CustomerInfo.types'
import { IGenericCardProductTypeState } from './GenericCardProductType.types'

export type IEulogizeAccountType = 'user' | 'service' | 'shadow' | 'invite'

export enum EulogisePhotoLibraryEditMode {
  BACKGROUND_IMAGE_LIBRARY = 'BACKGROUND_IMAGE_LIBRARY',
  PHOTO_LIBRARY = 'PHOTO_LIBRARY',
}

export enum EulogiseRegion {
  AU = 'AU',
  USA = 'USA',
}

export enum BackgroundRestrictions {
  CUSTOMER_BASE = 'CUSTOMER_BASE',
  CLIENT_BASE = 'CLIENT_BASE',
}

export type EulogiseImageSize = {
  width: number
  height: number
}

export enum EulogiseCountry {
  AUSTRALIA = 'Australia',
  CANADA = 'Canada',
  EUROPEAN_UNION = 'European Union',
  UNITED_KINGDOM = 'United Kingdom',
  UNITED_STATES = 'United States',
  CHILE = 'Chile',
  COLOMBIA = 'Colombia',
  COSTA_RICA = 'Costa Rica',
  MEXICO = 'Mexico',
  NEW_ZEALAND = 'New Zealand',
  PANAMA = 'Panama',
  GUATEMALA = 'Guatemala',
  THE_DOMINICAN_REPUBLIC = 'The Dominican Republic',
  THE_PHILIPPINES = 'The Philippines',
  REST_OF_THE_WOLRD = 'Rest of The World',
}

export const EulogiseISOStripeCurrencyCode = {
  [EulogiseCountry.AUSTRALIA]: 'aud',
  [EulogiseCountry.CANADA]: 'cad',
  [EulogiseCountry.EUROPEAN_UNION]: 'eur',
  [EulogiseCountry.UNITED_KINGDOM]: 'gbp',
  [EulogiseCountry.UNITED_STATES]: 'usd',
  [EulogiseCountry.CHILE]: 'usd',
  [EulogiseCountry.COLOMBIA]: 'usd',
  [EulogiseCountry.COSTA_RICA]: 'usd',
  [EulogiseCountry.MEXICO]: 'usd',
  [EulogiseCountry.NEW_ZEALAND]: 'nzd',
  [EulogiseCountry.PANAMA]: 'usd',
  [EulogiseCountry.GUATEMALA]: 'usd',
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: 'usd',
  [EulogiseCountry.THE_PHILIPPINES]: 'usd',
  [EulogiseCountry.REST_OF_THE_WOLRD]: 'aud',
}

export const EulogiseCountryArray = Object.values(EulogiseCountry)

export const EulogiseCountryTimeZone = {
  [EulogiseCountry.AUSTRALIA]: 'Australia/Sydney',
  [EulogiseCountry.CANADA]: 'America/Vancouver',
  [EulogiseCountry.EUROPEAN_UNION]: 'Europe/London',
  [EulogiseCountry.UNITED_KINGDOM]: 'Europe/London',
  [EulogiseCountry.UNITED_STATES]: 'America/New_York',
  [EulogiseCountry.CHILE]: 'America/Sandiago',
  [EulogiseCountry.COLOMBIA]: 'America/Bogota',
  [EulogiseCountry.COSTA_RICA]: 'America/Costa_Rica',
  [EulogiseCountry.MEXICO]: 'America/Mexico_City',
  [EulogiseCountry.NEW_ZEALAND]: 'Pacific/Auckland',
  [EulogiseCountry.PANAMA]: 'America/Panama',
  [EulogiseCountry.GUATEMALA]: 'America/Guatemala',
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: 'America/Dominica',
  [EulogiseCountry.THE_PHILIPPINES]: 'Asia/Manila',
  [EulogiseCountry.REST_OF_THE_WOLRD]: 'America/New_York',
}

export const EulogiseCountryTimeZoneDisplayName = {
  [EulogiseCountry.AUSTRALIA]: 'Australia/Sydney',
  [EulogiseCountry.CANADA]: 'America/Vancouver',
  [EulogiseCountry.EUROPEAN_UNION]: 'Europe/London',
  [EulogiseCountry.UNITED_KINGDOM]: 'Europe/London',
  [EulogiseCountry.UNITED_STATES]: 'ET',
  [EulogiseCountry.CHILE]: 'America/Sandiago',
  [EulogiseCountry.COLOMBIA]: 'America/Bogota',
  [EulogiseCountry.COSTA_RICA]: 'America/Costa Rica',
  [EulogiseCountry.MEXICO]: 'America/Mexico City',
  [EulogiseCountry.NEW_ZEALAND]: 'Pacific/Auckland',
  [EulogiseCountry.PANAMA]: 'America/Panama',
  [EulogiseCountry.GUATEMALA]: 'America/Guatemala',
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: 'America/Dominica',
  [EulogiseCountry.THE_PHILIPPINES]: 'Asia/Manila',
  [EulogiseCountry.REST_OF_THE_WOLRD]: 'ET',
}

export enum EulogiseCardProducts {
  BOOKLET = 'BOOKLET',
  BOOKMARK = 'BOOKMARK',
  SIDED_CARD = 'SIDED_CARD',
  SLIDESHOW_TITLE_SLIDE = 'SLIDESHOW_TITLE_SLIDE',
  THANK_YOU_CARD = 'THANK_YOU_CARD',
  TV_WELCOME_SCREEN = 'TV_WELCOME_SCREEN',
  PHOTOBOOK = 'PHOTOBOOK',
}

export type EulogiseResourceName =
  | 'asset'
  | 'backgroundImage'
  | 'booklet'
  | 'bookmark'
  | 'case'
  | 'caseReport'
  | 'connection'
  | 'user'
  | 'client'
  | 'photobook'
  | 'sidedCard'
  | 'slideshow'
  | 'slideshowTitleSlide'
  | 'service'
  | 'thankyouCard'
  | 'invite'
  | 'invoice'
  | 'transaction'
  | 'tvWelcomeScreen'
  | 'theme'
  | 'share'
  | 'genericCardProductType'
  | 'genericCardProduct'

export enum EulogiseResource {
  ASSET = 'asset',
  BOOKLET = 'booklet',
  BOOKMARK = 'bookmark',

  PHOTOBOOK = 'photobook',
  CASE = 'case',
  USER = 'user',
  CLIENT = 'client',
  SIDED_CARD = 'sidedCard',
  SLIDESHOW = 'slideshow',
  SLIDESHOW_TITLE_SLIDE = 'slideshowTitleSlide',
  THANK_YOU_CARD = 'thankyouCard',
  INVITE = 'invite',
  INVOICE = 'invoice',
  TRANSACTION = 'transaction',
  TV_WELCOME_SCREEN = 'tvWelcomeScreen',
  THEME = 'theme',
  GENERIC_CARD_PRODUCT = 'genericCardProduct',
}

export enum EulogiseProduct {
  BOOKLET = 'BOOKLET',
  BOOKMARK = 'BOOKMARK',
  SIDED_CARD = 'SIDED_CARD',
  SLIDESHOW = 'SLIDESHOW',
  SLIDESHOW_TITLE_SLIDE = 'SLIDESHOW_TITLE_SLIDE',
  THANK_YOU_CARD = 'THANK_YOU_CARD',
  TV_WELCOME_SCREEN = 'TV_WELCOME_SCREEN',
  PHOTOBOOK = 'PHOTOBOOK',
  GENERIC_CARD_PRODUCT = 'GENERIC_CARD_PRODUCT',
  ALL = 'ALL',
}

export enum EulogizeFeature {
  SLIDESHOW_VB = 'SLIDESHOW_VB',
}

export enum EulogizeFeatureName {
  SLIDESHOW_VB = 'Slideshow VB',
}

export type IEulogizeFeatureAvailabilityStatus = {
  [key in EulogizeFeature]?: boolean
}

export enum EulogiseProductThemeMap {
  BOOKLET = 'booklet',
  BOOKLET_US = 'bookletUS',
  BOOKMARK = 'bookmark',
  SIDED_CARD = 'sidedCard',
  SIDED_CARD_US = 'sidedCardUS',
  SLIDESHOW = 'slideshow',
  // use tvWelcomeScreen themes for title slide themes
  SLIDESHOW_TITLE_SLIDE = 'tvWelcomeScreen',
  THANK_YOU_CARD = 'thankYouCard',
  TV_WELCOME_SCREEN = 'tvWelcomeScreen',
  PHOTOBOOK = 'photobook',
}

export enum EulogiseExportProductName {
  BOOKLET = 'Booklet',
  BOOKLET_US = 'Program',
  SLIDESHOW = 'Slideshow',
  SLIDESHOW_TITLE_SLIDE = 'SlideshowTitleSlide',
  SIDED_CARD = 'A5 CARD',
  SIDED_CARD_US = 'Memorial Card',
  BOOKMARK = 'Bookmark',
  THANK_YOU_CARD = 'ThankyouCard',
  PHOTOBOOK = 'Photobook',
  TV_WELCOME_SCREEN = 'TvWelcomeScreen',

  // Photobook
  PHOTOBOOK_MILK_PREMIUM_MEDIUM = 'Premium Medium Photo Book',
  PHOTOBOOK_MILK_PREMIUM_LARGE = 'Premium Large Photo Book',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM = 'Classic Medium Photo Book',
  PHOTOBOOK_MILK_CLASSIC_LARGE = 'Classic Large Photo Book',
}

export enum CardProductPageMode {
  NORMAL = 'NORMAL',
  TWO_PAGES = 'TWO_PAGES',
  SINGLE_PAGE = 'SINGLE_PAGE',
  COVER_PAGE = 'COVER_PAGE',
}

export enum CardProductPageColMode {
  ONE_COL = 'ONE_COL',
  TWO_COLS = 'TWO_COLS',
}

export enum EulogiseProductPageCursors {
  // BOOKLET = 3,   - not exist implied multi pages
  // PHOTOBOOK      - not exist implied multi pages
  BOOKMARK = 2,
  SIDED_CARD = 2,
  SLIDESHOW_TITLE_SLIDE = 1,
  THANK_YOU_CARD = 1,
  TV_WELCOME_SCREEN = 1,
}

export enum EulogiseProductName {
  BOOKLET = 'Order Of Service Booklet',
  BOOKLET_US = 'Folded Funeral Program',
  BOOKMARK = 'Bookmark',
  PHOTOBOOK = 'Photobook',
  SIDED_CARD = 'Memorial Card',
  SIDED_CARD_US = 'Memorial Card',
  SLIDESHOW = 'Memorial Tribute Video',
  SLIDESHOW_TITLE_SLIDE = 'Slideshow Title Slide',
  THANK_YOU_CARD = 'Thank-you Card',
  TV_WELCOME_SCREEN = 'TV Welcome Screen',
}

export enum EulogiseProductDownloadProductName {
  BOOKLET = 'Folded Funeral Program',
  BOOKLET_US = 'Folded Funeral Program',
  PHOTOBOOK = 'Photobook',
  SLIDESHOW = 'Memorial Tribute Video',
  SLIDESHOW_TITLE_SLIDE = 'Slideshow Title Slide',
  SIDED_CARD = 'Funeral Service Card',
  SIDED_CARD_US = 'Funeral Service Card',
  THANK_YOU_CARD = 'Funeral Thank You Card',
  BOOKMARK = 'Remembrance Bookmark',
  TV_WELCOME_SCREEN = 'TV Welcome Screen',
  GENERIC_CARD_PRODUCT = 'Generic Card Product',
  ALL = 'N/A',
}

export enum EulogiseProductDownloadProductFileTypes {
  BOOKLET = 'Printable PDF',
  BOOKLET_US = 'Printable PDF',
  PHOTOBOOK = 'Purchase Only',
  SLIDESHOW = 'MP4 Video File',
  SLIDESHOW_TITLE_SLIDE = 'Screen ready JPEG',
  SIDED_CARD = 'Printable PDF',
  SIDED_CARD_US = 'Printable PDF',
  THANK_YOU_CARD = 'Printable PDF',
  BOOKMARK = 'Printable PDF',
  TV_WELCOME_SCREEN = 'Screen ready JPEG',
}

export enum EulogiseProductFileTypes {
  BOOKLET = 'PDF Files',
  BOOKLET_US = 'PDF Files',
  PHOTOBOOK = 'PDF Files',
  SLIDESHOW = 'MP4 Video File',
  SLIDESHOW_TITLE_SLIDE = 'Screen ready JPEG',
  SIDED_CARD = 'PDF Files',
  SIDED_CARD_US = 'PDF Files',
  THANK_YOU_CARD = 'PDF Files',
  BOOKMARK = 'PDF Files',
  TV_WELCOME_SCREEN = 'Screen ready JPEG',
}

export enum EulogiseProductAverageGenerationTimeText {
  BOOKLET = '1-2 minutes',
  BOOKLET_US = '1-2 minutes',
  PHOTOBOOK = '4-6 minutes',
  SLIDESHOW = '10-15 minutes',
  SLIDESHOW_TITLE_SLIDE = '1-2 minutes',
  SIDED_CARD = '1-2 minutes',
  SIDED_CARD_US = '1-2 minutes',
  THANK_YOU_CARD = '1-2 minutes',
  BOOKMARK = '1-2 minutes',
  TV_WELCOME_SCREEN = '1-2 minutes',
}

export type IEulogiseProductAvailabilityStatus = {
  [key in EulogiseProduct | string]?: boolean
}

export type IEulogiseEmbeddedIframeSettings = {
  showWhiteBottomBar?: boolean
  allowPurchaseButton?: boolean
  purchaseUrl?: string
  customButtonCopy?: string
  showEulogizeBranding?: boolean
}

export enum EulogiseProductShortName {
  BOOKLET = 'Booklet',
  BOOKLET_US = 'Program',
  BOOKMARK = 'Bookmark',
  PHOTOBOOK = 'Photobook',
  SIDED_CARD = 'Card',
  SIDED_CARD_US = 'Card',
  SLIDESHOW = 'Slideshow',
  SLIDESHOW_TITLE_SLIDE = 'Slideshow Title Slide',
  THANK_YOU_CARD = 'Thankyou Card',
  TV_WELCOME_SCREEN = 'TV Welcome Screen',
}

export enum TitleBackgroundOption {
  BACKGROUND_IMAGE = 'Image',
  BACKGROUND_COLOR = 'Colour',
}

export enum CardProductBackgroundImageName {
  FRONT = 'front',
  LEFT = 'left',
  RIGHT = 'right',
  BACK = 'back',
}

export interface IFindResponse {
  items: Array<any>
  count: number
  ref: string
}

export interface IRequestResponse {
  webtoken?: string
  request: {
    body: any
  }
  response: any
}

export interface IFindRequestBody {
  resource: EulogiseResource
  search?: {
    case?: string
    type?: string
    id?: string
  }
}

export interface IFindRequestResponse extends IRequestResponse {
  request: {
    body: IFindRequestBody
  }
  response: IFindResponse
}

export interface IFont {
  id: string
  name: string
  googleFont: string
}

export interface IEulogiseState {
  assets: IAssetState
  auth: IAuthState
  backgroundImages: IBackgroundImageState
  booklets: ICardProductState
  bookmarks: ICardProductState
  cases: ICaseState
  customerInfo: ICustomerInfoState
  client: IClientState
  connections: IConnectionState
  global: IGlobalState
  invites: IInviteState
  invoices: IInvoiceState
  drawers: IDrawerState
  modals: IModalState
  mobileMenu: IMobileMenuState
  sidedCards: ICardProductState
  slideshows: ISlideshowState
  slideshowTitleSlides: ICardProductState
  thankYouCards: ICardProductState
  photobooks: ICardProductState
  siderMenu: ISiderMenuState
  genericCardProducts: IGenericCardProductsState
  genericCardProductTypes: IGenericCardProductTypeState

  tvWelcomeScreens: ICardProductState
  admin: IAdminState
  guideWalkThrough: IGuideWalkThroughState
  checkouts: ICheckoutsState
  themes: IThemeState

  userSettings: IUserSettingsState
}

export interface IEulogiseCategory {
  id: string
  name: string
  description?: string
  thumbnail?: string
  backgroundType?: BackgroundRestrictions
}

export interface IEulogisePersistentState {
  auth: IAuthState
  case: ICaseState
}

export interface IAssetType {
  id: number | string
  name: string
  filename: string
  url: string
}

export interface ISubAction {
  content: React.ReactNode
  onClick: (...args: any) => any
}

export interface IActionType<T> {
  content: React.ReactNode
  onClick: (...args: any) => any
  subActions?: Array<ISubAction>
  disable?: boolean
  buttonType?: T
  title: string
  isCustomContent?: boolean
}

export const ALL_EULOGIZE_PRODUCTS = [
  EulogiseProduct.BOOKLET,
  EulogiseProduct.SLIDESHOW,
  EulogiseProduct.SIDED_CARD,
  EulogiseProduct.BOOKMARK,
  EulogiseProduct.THANK_YOU_CARD,
  EulogiseProduct.TV_WELCOME_SCREEN,
  EulogiseProduct.PHOTOBOOK,
]

// AU Theme products map
export const AU_PRODUCTS_THEME_MAP = [
  EulogiseProductThemeMap.BOOKLET,
  EulogiseProductThemeMap.BOOKMARK,
  EulogiseProductThemeMap.SLIDESHOW,
  EulogiseProductThemeMap.SLIDESHOW_TITLE_SLIDE,
  EulogiseProductThemeMap.SIDED_CARD,
  EulogiseProductThemeMap.PHOTOBOOK,
  EulogiseProductThemeMap.THANK_YOU_CARD,
  EulogiseProductThemeMap.TV_WELCOME_SCREEN,
]

// US Theme products map
export const US_PRODUCTS_THEME_MAP = [
  EulogiseProductThemeMap.BOOKLET_US,
  EulogiseProductThemeMap.BOOKMARK,
  EulogiseProductThemeMap.SLIDESHOW,
  EulogiseProductThemeMap.SLIDESHOW_TITLE_SLIDE,
  EulogiseProductThemeMap.SIDED_CARD_US,
  EulogiseProductThemeMap.PHOTOBOOK,
  EulogiseProductThemeMap.THANK_YOU_CARD,
  EulogiseProductThemeMap.TV_WELCOME_SCREEN,
]

export type OnSortEndType = {
  oldIndex: number
  newIndex: number
}
