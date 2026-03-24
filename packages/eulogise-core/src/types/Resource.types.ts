import { IAllowPurchasingOption } from './Client.types'
import {
  EulogiseCountry,
  EulogiseProduct,
  IEulogiseEmbeddedIframeSettings,
  IEulogiseProductAvailabilityStatus,
  IEulogizeFeatureAvailabilityStatus,
} from './Eulogise.types'

export enum EulogiseUserRole {
  CLIENT = 'client',
  CUSTOMER = 'customer',
  CONTRIBUTOR = 'contributor',
  // FUNERAL_DIRECTOR = 'funeralDirector', - no such role
  ADMIN = 'admin',
  COEDITOR = 'co-editor',
  EDITOR = 'editor',
  INTERNAL = 'internal',
  VISITOR = 'visitor',
  VISITOR_BOOKLET = 'visitor-booklet',
  VISITOR_SLIDESHOW = 'visitor-slideshow',
  VISITOR_SLIDESHOW_TITLE_SLIDE = 'visitor-slideshowTitleSlide',
  VISITOR_SIDED_CARD = 'visitor-sided-card',
  VISITOR_BOOKMARK = 'visitor-bookmark',
  VISITOR_THANKYOUCARD = 'visitor-thankyouCard',
  VISITOR_TV_WELCOME_SCREEN = 'visitor-tvWelcomeScreen',
  VISITOR_PHOTOBOOK = 'visitor-photobook',
}

export enum EulogiseEditorPaymentConfig {
  EDITOR_HAS_TO_PAY = 'EDITOR_HAS_TO_PAY',
  EDITOR_DOES_NOT_NEED_TO_PAY = 'EDITOR_DOES_NOT_NEED_TO_PAY',
}

export const EULOGIZE_LOGGED_IN_USER_ROLES: Array<EulogiseUserRole> = [
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.CUSTOMER,
  EulogiseUserRole.CONTRIBUTOR,
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.COEDITOR,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.VISITOR,
  EulogiseUserRole.VISITOR_BOOKLET,
  EulogiseUserRole.VISITOR_SLIDESHOW,
  EulogiseUserRole.VISITOR_SLIDESHOW_TITLE_SLIDE,
  EulogiseUserRole.VISITOR_SIDED_CARD,
  EulogiseUserRole.VISITOR_BOOKMARK,
  EulogiseUserRole.VISITOR_THANKYOUCARD,
  EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN,
  EulogiseUserRole.VISITOR_PHOTOBOOK,
]

export type TestUserRole =
  | EulogiseUserRole
  | 'CUSTOMER_EDITOR'
  | 'CUSTOMER_COEDITOR'
  | 'CLIENT_CUSTOMER'
  | 'CLIENT_EDITOR'
  | 'CLIENT_COEDITOR'
  | 'US_CUSTOMER'

export enum EulogiseUserType {
  USER = 'user',
  INVITE = 'invite',
  SHADOW = 'shadow',
  SERVICE = 'service',
}

export enum IClientRole {
  ADMIN = 'ADMIN', // will receive all notifications (user sign up)
  OPERATOR = 'OPERATOR', // default role if Admin is not selected in Client Edit page
}

export interface IEulogiseUser {
  id: string
  fullName: string
  email: string
  password: string
  deceasedName: string
  deceasedDate: string
  webtoken: string
  clientRole?: IClientRole // OPERATOR will be the default role
  verified: boolean
  role: EulogiseUserRole
  createdAt: string
  updatedAt: string
  showOnBoardingHelperEveryTime: boolean
  type: EulogiseUserType
}

export type UserWithIdOnly = string

export interface IEulogiseClient {
  id: string
  title: string
  handle?: string
  // TODO: attribute directors not in the backend at the moment, we need to update this after refactor backend
  directors?: Array<UserWithIdOnly>
  createdAt: string
  updatedAt: string
  primaryAddress?: Array<string>
  additionalAddress: Array<Array<string>>
  country?: EulogiseCountry
  users: Array<UserWithIdOnly>
  apikey?: string
  defaultProducts?: IEulogiseProductAvailabilityStatus
  availableProducts?: IEulogiseProductAvailabilityStatus
  embeddedIframes?: IEulogiseEmbeddedIframeSettings
  features?: IEulogizeFeatureAvailabilityStatus
  logo?: string
  clientBrandHandles?: Array<string>
  clientEmailAsset?: string
  clientSignUpDefaultUserRole?: EulogiseUserRole
  createCaseFamilyInviteOptions?: Array<string>
  defaultClientSignUpText?: string
  allowPurchasing?: IAllowPurchasingOption
  editorPaymentConfig?: EulogiseEditorPaymentConfig | null
}

export type IClientData = Partial<
  Pick<IEulogiseClient, 'id' | 'title' | 'logo' | 'users'>
>

// TODO: This is for legacy backend for now, should be decomposed after refactor backend
export type IEulogiseFuneralDirectorInvite = Pick<
  IEulogiseUser,
  'fullName' | 'email'
>

export interface IResourceBlock {
  depth: number
  data: object
  inlineStyleRanges: Array<{
    offset?: number
    length?: number
    // style is color (e.g. 'white', 'tan')
    style?: string
  }>
  text: string
  type: string
  key: string
  entityRanges: Array<any>
}

export interface IResourceRowContent {
  blocks: Array<IResourceBlock>
  entityMap: object
}

export enum IResourceStyle {
  UNSTYLED = 'unstyled',
}

export enum ResourceFileStatus {
  GENERATED = 'generated',
  PROCESSING = 'processing',
  FAILED = 'failed',
  NOT_STARTED = 'not_started',
}

// Shared types, enums and interfaces for booklet series products

export type pageOrientationType = 'portrait' | 'landscape'
export type ICardProductPageMarginsType = Array<number> | number

export const MM_TO_PAGE_SIZE_SCALE = 2.834639559

// reference: https://www.brother.co.uk/support/answers/is-a3-bigger-than-a4
export const PAGE_SIZES_IN_MM: { [key: string]: any } = {
  A0: [841, 1188],
  A1: [594, 841],
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  A5: [148.5, 210],
  HALF_LETTER_A5: [139.5, 216], // 216,279 - https://www.swiftpublisher.com/useful-articles/paper-sizes-and-formats-explained
  A6: [105, 148.5],
  A7: [74, 105],
  A8: [52, 74],
  // BOOKMARK: [160.0, 702.0],
  // THANKYOUCARD: [419.53, 297.64],
  // THANKYOUCARD_2_COLS: [209.765, 297.64],
}

export enum EulogiseViewPort {
  BOOKLET = 'BOOKLET',
  BOOKLET_LETTER = 'BOOKLET_LETTER',
  SIDED_CARD = 'SIDED_CARD',
  SIDED_CARD_LETTER = 'SIDED_CARD_LETTER',
  BOOKMARK = 'BOOKMARK',
  THANK_YOU_CARD = 'THANK_YOU_CARD',
  TV_WELCOME_SCREEN = 'TV_WELCOME_SCREEN',
  GENERIC_CARD_PRODUCT = 'GENERIC_CARD_PRODUCT',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM_SINGLE_PAGE = 'PHOTOBOOK_MILK_CLASSIC_MEDIUM_SINGLE_PAGE',
  PHOTOBOOK_MILK_CLASSIC_LARGE_SINGLE_PAGE = 'PHOTOBOOK_MILK_CLASSIC_LARGE_SINGLE_PAGE',
  PHOTOBOOK_MILK_PREMIUM_MEDIUM_SINGLE_PAGE = 'PHOTOBOOK_MILK_PREMIUM_MEDIUM_SINGLE_PAGE',
  PHOTOBOOK_MILK_PREMIUM_LARGE_SINGLE_PAGE = 'PHOTOBOOK_MILK_PREMIUM_LARGE_SINGLE_PAGE',
  PHOTOBOOK_LARGE_PORTRAIT_SINGLE_PAGE = 'PHOTOBOOK_LARGE_PORTRAIT_SINGLE_PAGE',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM = 'PHOTOBOOK_MILK_CLASSIC_MEDIUM',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER = 'PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER',
  PHOTOBOOK_MILK_CLASSIC_LARGE = 'PHOTOBOOK_MILK_CLASSIC_LARGE',
  PHOTOBOOK_MILK_CLASSIC_LARGE_COVER = 'PHOTOBOOK_MILK_CLASSIC_LARGE_COVER',
  PHOTOBOOK_MILK_PREMIUM_MEDIUM = 'PHOTOBOOK_MILK_PREMIUM_MEDIUM',
  PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER = 'PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER',
  PHOTOBOOK_MILK_PREMIUM_LARGE = 'PHOTOBOOK_MILK_PREMIUM_LARGE',
  PHOTOBOOK_MILK_PREMIUM_LARGE_COVER = 'PHOTOBOOK_MILK_PREMIUM_LARGE_COVER',
  PHOTOBOOK_LARGE_PORTRAIT = 'PHOTOBOOK_LARGE_PORTRAIT',
}

// Print size
export const VIEW_PORT_IN_MM: { [key: string]: any } = {
  [EulogiseViewPort.BOOKLET]: [297, 210],
  [EulogiseViewPort.BOOKLET_LETTER]: [279, 216], // only used by getPdfPageViewport
  [EulogiseViewPort.SIDED_CARD]: [148.5, 210],
  [EulogiseViewPort.SIDED_CARD_LETTER]: [139.5, 216],
  [EulogiseViewPort.BOOKMARK]: [56.45, 247.65],
  [EulogiseViewPort.THANK_YOU_CARD]: [148, 105],
  [EulogiseViewPort.TV_WELCOME_SCREEN]: [225.78, 127.35],
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER]: [211, 166], // 21.1cm x 16.6cm - cover pages
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM]: [235 * 2, 188], // 23.5cm x 18.8cm - spread pages
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE_COVER]: [299, 250], // 29.9cm x 25.0cm - cover pages
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE]: [330 * 2, 279], // 33.0cm x 27.9cm - spread pages
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM]: [218 * 2, 162], // 21.8cm x 16.2cm - spread pages
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER]: [96, 72], // 9.6cm x 7.2cm - cover pages
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE]: [323 * 2, 241], // 32.3cm x 24.1cm - spread pages
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE_COVER]: [135, 100], // 13.5cm x 10.0cm - cover page
  [EulogiseViewPort.PHOTOBOOK_LARGE_PORTRAIT]: [241 * 2, 323], // 24.1cm x 32.3cm - spread pages
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM_SINGLE_PAGE]: [235, 188], // 23.5cm x 18.8cm - single page
  [EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE_SINGLE_PAGE]: [330, 279], // 33.0cm x 27.9cm - single page
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM_SINGLE_PAGE]: [218, 162], // 21.8cm x 16.2cm - single page
  [EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE_SINGLE_PAGE]: [323, 241], // 32.3cm x 24.1cm - single page
  [EulogiseViewPort.PHOTOBOOK_LARGE_PORTRAIT_SINGLE_PAGE]: [241, 323], // 24.1cm x 32.3cm - single page
}

export const PRODUCT_THUMBNAIL_SIZE = [536, 352] // [268, 176]
export const SLIDESHOW_THUMBNAIL_SIZE = [544, 306]

// The following number were calculated based on the page size (in mm) to MM_TO_PAGE_SIZE_SCALE
// e.g. A4 210mmx297mm = 595.28 x 841.89. 595.28 === 210 x 2.834639559
export const PAGE_SIZES: { [key: string]: any } = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [420.945, 595.28],
  HALF_LETTER_A5: [395.432, 612.282],
  /*
  A5: [148.5, 210],
  HALF_LETTER_A5: [139.5, 216], // 216,279
*/
  A6: [297.64, 420.945],
  A7: [210.47, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0],
  BOOKMARK: [160.0, 702.0],
  THANKYOUCARD: [419.53, 297.64],
  THANKYOUCARD_2_COLS: [209.765, 297.64],
  TV_WELCOME_SCREEN: [640, 360],
  TV_WELCOME_SCREEN_2_COLS: [320, 360],
  SLIDESHOW_TITLE_SLIDE: [640, 360],
  SLIDESHOW_TITLE_SLIDE_2_COLS: [320, 360],
  PHOTOBOOK: [566.93, 425.2], // not needed

  // refer to Column B of https://docs.google.com/spreadsheets/d/1YjhcMlG7KHIlgq-Q2IJGeGxyJ4dsbir16gBHEywP1xQ/edit?gid=1670863392#gid=1670863392
  PHOTOBOOK_THUMBNAIL: [140, 120], // only for thumbnail preview
  PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER: [598.11, 470.55], // 21.1cm x 16.6cm - cover pages
  PHOTOBOOK_MILK_CLASSIC_MEDIUM: [666.14, 532.91], // 23.5cm x 18.8cm
  PHOTOBOOK_MILK_CLASSIC_LARGE_COVER: [847.56, 708.66], // 29.9cm x 25.0cm - cover pages
  PHOTOBOOK_MILK_CLASSIC_LARGE: [952.44, 807.87], // 33.6cm x 28.5cm
  PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER: [272.13, 204.09], // 9.6cm x 7.2cm - cover pages
  PHOTOBOOK_MILK_PREMIUM_MEDIUM: [617.95, 459.21], // 21.8cm x 16.2cm
  PHOTOBOOK_MILK_PREMIUM_LARGE_COVER: [382.68, 283.46], // 13.5cm x 10.0cm - cover page
  PHOTOBOOK_MILK_PREMIUM_LARGE: [915.59, 683.15], // 32.3cm x 24.1cm
  PHOTOBOOK_LARGE_PORTRAIT: [683.15, 915.59], // 24.1cm x 32.3cm
}

// The minimum editor size based on Eulogise Product, 0 means no limit.
export const EULOGISE_EDITOR_MIN_WIDTH: Record<EulogiseProduct, number> = {
  [EulogiseProduct.BOOKLET]: 0,
  [EulogiseProduct.BOOKMARK]: 330,
  [EulogiseProduct.SIDED_CARD]: 0,
  [EulogiseProduct.SLIDESHOW]: 0,
  [EulogiseProduct.THANK_YOU_CARD]: 0,
  [EulogiseProduct.TV_WELCOME_SCREEN]: 0,
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 0,
  [EulogiseProduct.PHOTOBOOK]: 0,
  [EulogiseProduct.GENERIC_CARD_PRODUCT]: 0,
  [EulogiseProduct.ALL]: 0,
}

export const CM_TO_PIXEL = 3.77952 // Not needed as we are using MM_TO_PAGE_SIZE_SCALE
export const BLEED = 8.503918677 // 3mm * MM_TO_PAGE_SIZE_SCALE // 3mm
export const BLEED_IN_MM = 3
export const BLEED_IN_MM_72_DPI = 2.25

export const BOOKMARK_A6_BLEED = 7.37

export const BOOKLET_BLOCK_TYPES = [
  { label: 'Unstyled', value: 'unstyled', hidden: true },
  { label: 'Heading 1', value: 'header-one' },
  { label: 'Heading 2', value: 'header-two' },
  { label: 'Heading 3', value: 'header-three' },
  { label: 'Heading 4', value: 'header-four' },
  { label: 'Heading 5', value: 'header-five' },
  { label: 'Heading 6', value: 'header-six' },
  { label: 'Paragraph 1', value: 'paragraph-one' },
  { label: 'Paragraph 2', value: 'paragraph-two' },
]

// Note: hex color does not work on Puppeteer, has to use rgb format
export const BOOKLET_EDITOR_COLORS = [
  { label: 'Pastel Pink', value: 'pastel-pink', color: '#ffdef5' },
  { label: 'Lavender', value: 'lavender', color: 'rgb(197, 154, 199)' },
  { label: 'Magenta', value: 'magenta', color: 'rgb(186, 52, 111)' },
  { label: 'Mint Green', value: 'mint-green', color: '#daffe7' },
  { label: 'Teal', value: 'teal', color: 'rgb(0, 167, 157)' },
  { label: 'Pastel Yellow', value: 'pastel-yellow', color: '#FDFD96' },
  { label: 'Tan', value: 'tan', color: 'rgb(191, 113, 62)' },
  { label: 'Pastel Blue', value: 'pastel-blue', color: '#EDE0F0' },
  { label: 'Blue', value: 'blue', color: 'rgb(0, 143, 193)' },
  { label: 'Mavy', value: 'mavy', color: 'rgb(0, 65, 107)' },
  { label: 'Gold', value: 'gold', color: 'rgb(202, 140, 49)' },
  { label: 'Light Grey', value: 'light-grey', color: 'rgb(154, 159, 165)' },
  { label: 'Dark Grey', value: 'dark-grey', color: 'rgb(79, 83, 89)' },
  { label: 'Black', value: 'black', color: 'rgb(0, 0, 0)' },
  { label: 'White', value: 'white', color: 'rgb(255, 255, 255)' },
]

export enum PageTypes {
  LEFT = 'left',
  RIGHT = 'right',
  COVER = 'cover',
  BACK = 'back',
}

export enum InlineStyleValueEnum {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
}

export enum AlignmentType {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum ColorPickerAlignmentType {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export type AlignmentTypeText = 'left' | 'center' | 'right'

export interface IAlignment {
  label: string
  value: AlignmentType
  icon: string
}

export interface IRowStyle {
  font?: string
  fontSize?: number
  color?: string
  letterSpacing?: number
}

export enum PageActionPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export type MarginType = Array<number> | number
export interface IBoundariesType {
  width: number
  height: number
}

export interface IPageStyle {
  marginTop: number
  marginBottom: number
}
