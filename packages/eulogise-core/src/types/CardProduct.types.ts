import {
  AlignmentType,
  AlignmentTypeText,
  ICardProductPageMarginsType,
  IPageStyle,
  IResourceRowContent,
  IRowStyle,
  MarginType,
  ResourceFileStatus,
} from './Resource.types'
import {
  BackgroundRestrictions,
  CardProductBackgroundImageName,
  EulogiseProduct,
  EulogiseProductThemeMap,
  EulogiseRegion,
  EulogiseResource,
} from './Eulogise.types'
import {
  IFilestackImageEnhancePreset,
  IImageAssetContent,
  IImageSizeAndPosition,
} from './Assets.types'
import { ICardProductFrameLayout } from './EulogiseCardProductFrame.types'
import { IThemeCommon } from './Theme.types'
import { ISlideshowStates } from './Slideshow.types'
import { EulogisePhotobookCoverType } from '../constants'
import { PhotobookActionTypes } from './Photobook.types'
import { ConnectionActionTypes } from './Connection.types'

export enum CardProductDynamicDataKey {
  deceasedName = 'deceasedName',
  dateOfBirth = 'dateOfBirth',
  dateOfDeath = 'dateOfDeath',
  dobToDod = 'dobToDod',
  dateOfService = 'dateOfService',
  serviceStartTime = 'serviceStartTime',
  serviceDateAtServiceTime = 'serviceDateAtServiceTime',
  location = 'location',
  primaryImage = 'primaryImage',
}

export enum BookmarkActionTypes {
  FETCH_BOOKMARKS_BY_CASE_ID_SUCCESS = 'FETCH_BOOKMARKS_BY_CASE_ID_SUCCESS',
}

export enum SidedCardActionTypes {
  FETCH_SIDED_CARDS_BY_CASE_ID_SUCCESS = 'FETCH_SIDED_CARDS_BY_CASE_ID_SUCCESS',
}

export enum ThankYouCardActionTypes {
  FETCH_THANK_YOU_CARDS_BY_CASE_ID_SUCCESS = 'FETCH_THANK_YOU_CARDS_BY_CASE_ID_SUCCESS',
}

export enum UpdateBackgroundImageMode {
  UPDATE_ALL_PAGES = 'UPDATE_ALL_PAGES',
  UPDATE_FRONT_PAGE_ONLY = 'UPDATE_FRONT_PAGE_ONLY',
  UPDATE_COVER_PAGES_ONLY = 'UPDATE_COVER_PAGES_ONLY',
  UPDATE_ALL_SLIDES = 'UPDATE_ALL_SLIDES',
  UPDATE_ALL_PRODUCTS_ALL_PAGES = 'UPDATE_ALL_PRODUCTS_ALL_PAGES',
  UPDATE_ALL_PRODUCTS_COVER_PAGES_ONLY = 'UPDATE_ALL_PRODUCTS_COVER_PAGES_ONLY',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export enum TvWelcomeScreenActionTypes {
  FETCH_TV_WELCOME_SCREEN_BY_CASE_ID_SUCCESS = 'FETCH_TV_WELCOME_SCREEN_BY_CASE_ID_SUCCESS',
}

export enum SlideshowTitleSlideActionTypes {
  FETCH_SLIDESHOW_TITLE_SLIDE_BY_CASE_ID_SUCCESS = 'FETCH_SLIDESHOW_TITLE_SLIDE_BY_CASE_ID_SUCCESS',
}

export type IAllActiveCardProductStates = {
  [key: string | EulogiseProduct]: ICardProductState
}

export interface IAllCardProductStates {
  [EulogiseProduct.BOOKLET]: ICardProductState | null
  [EulogiseProduct.SIDED_CARD]: ICardProductState | null
  [EulogiseProduct.BOOKMARK]: ICardProductState | null
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: ICardProductState | null
  [EulogiseProduct.THANK_YOU_CARD]: ICardProductState | null
  [EulogiseProduct.TV_WELCOME_SCREEN]: ICardProductState | null
  [EulogiseProduct.PHOTOBOOK]: ICardProductState | null
  [key: string]: ICardProductState | null
}

export type IAllProductStates = IAllCardProductStates | ISlideshowStates

export enum CardProductActionTypes {
  UPDATE_CARD_PRODUCT_PAGE_BY_INDEX = 'UPDATE_CARD_PRODUCT_PAGE_BY_INDEX',
  CHANGE_TO_FRAME_LAYOUT_FROM_PAGE_LAYOUT = 'CHANGE_TO_FRAME_LAYOUT_FROM_PAGE_LAYOUT',
  CLEAN_CARD_PRODUCT_PAGE_BY_INDEX = 'CLEAN_CARD_PRODUCT_PAGE_BY_INDEX',
  REPLACE_CARD_PRODUCT_PAGE_ROWS = 'REPLACE_CARD_PRODUCT_PAGE_ROWS',
  TOGGLE_TEXT_CARD_PRODUCT_ROW = 'TOGGLE_TEXT_CARD_PRODUCT_ROW',
  TOGGLE_CARD_PRODUCT_OVERLAY = 'TOGGLE_CARD_PRODUCT_OVERLAY',
  ENABLE_CARD_PRODUCT_OVERLAY = 'ENABLE_CARD_PRODUCT_OVERLAY',
  UPDATE_PAGE_BACKGROUND_OVERLAY = 'UPDATE_PAGE_BACKGROUND_OVERLAY',
  UPDATE_CARD_PRODUCT_BACKGROUND_PAGES_IMAGE = 'UPDATE_CARD_PRODUCT_BACKGROUND_PAGES_IMAGE',
  DOWNLOAD_CARD_PRODUCT_BY_CASE_ID = 'DOWNLOAD_CARD_PRODUCT_BY_CASE_ID',
  UPSERT_CARD_PRODUCT_BY_CASE_ID = 'UPSERT_CARD_PRODUCT_BY_CASE_ID',
  CHANGE_FRAME_BY_ROW_ID = 'CHANGE_FRAME_BY_ROW_ID',
  UPDATE_CARD_PRODUCT_BY_IMAGE_ID = 'UPDATE_CARD_PRODUCT_BY_IMAGE_ID',
  UPDATE_CARD_PRODUCT_PAGES = 'UPDATE_CARD_PRODUCT_PAGES',
  UPDATE_CARD_PRODUCT_CONTENT = 'UPDATE_CARD_PRODUCT_CONTENT',
  UPDATE_CARD_PRODUCT_CONTENT_BY_CONTENT_ITEM = 'UPDATE_CARD_PRODUCT_CONTENT_BY_CONTENT_ITEM',
  UPDATE_BORDER_SETTINGS = 'UPDATE_BORDER_SETTINGS',
  UPDATE_CARD_PRODUCT_OVERLAY = 'UPDATE_CARD_PRODUCT_OVERLAY',
  CLEAN_UP_CARD_PRODUCT_UNDO_HISTORY = 'CLEAN_UP_CARD_PRODUCT_UNDO_HISTORY',
  UNDO_CARD_PRODUCT_CONTENT = 'UNDO_CARD_PRODUCT_CONTENT',
  REDO_CARD_PRODUCT_CONTENT = 'REDO_CARD_PRODUCT_CONTENT',
  RESET_CARD_PRODUCT_STATE = 'RESET_CARD_PRODUCT_STATE',
  SET_ACTIVE_PRODUCT_THEME = 'SET_ACTIVE_PRODUCT_THEME',
  FETCH_CARD_PRODUCTS_BY_CASE_ID = 'FETCH_CARD_PRODUCTS_BY_CASE_ID',
  FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS = 'FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS',
  FETCH_CARD_PRODUCTS_BY_CASE_ID_FAILED = 'FETCH_CARD_PRODUCTS_BY_CASE_ID_FAILED',
  UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID = 'UPDATE_CARD_PRODUCT_SPACE_ASSET_BY_ROW_ID',
  UPDATE_CARD_PRODUCT_ICON_ASSET_BY_ROW_ID = 'UPDATE_CARD_PRODUCT_ICON_ASSET_BY_ROW_ID',
  UPDATE_CARD_PRODUCT_DIVIDER_ASSET_BY_ROW_ID = 'UPDATE_CARD_PRODUCT_DIVIDER_ASSET_BY_ROW_ID',
  ADD_CARD_PRODUCT_PAGE_ROW = 'ADD_CARD_PRODUCT_PAGE_ROW',
  ADD_CARD_PRODUCT_PAGE_ROW_SUCCESS = 'ADD_CARD_PRODUCT_PAGE_ROW_SUCCESS',
  CLEANUP_CARD_PRODUCT_EMPTY_ROWS = 'CLEANUP_CARD_PRODUCT_EMPTY_ROWS',
  DELETE_CARD_PRODUCT_ROW = 'DELETE_CARD_PRODUCT_ROW',
  MOVE_CARD_PRODUCT_CONTENT_TO_PAGE = 'MOVE_CARD_PRODUCT_CONTENT_TO_PAGE',
  REORDER_CARD_PRODUCT_PAGE_ROWS = 'REORDER_CARD_PRODUCT_PAGE_ROWS',
  RESET_ALL_CARD_PRODUCT_STATE = 'RESET_ALL_CARD_PRODUCT_STATE',
  DUPLICATE_CARD_PRODUCT_ROW = 'DUPLICATE_CARD_PRODUCT_ROW',
  APPLY_THEME_TO_PRODUCT = 'APPLY_THEME_TO_PRODUCT',
  APPLY_THEME_TO_ALL_PRODUCTS = 'APPLY_THEME_TO_ALL_PRODUCTS',
  UPDATE_CARD_PRODUCT_IMAGE = 'UPDATE_CARD_PRODUCT_IMAGE',
  UPDATE_CARD_PRODUCT_IMAGES = 'UPDATE_CARD_PRODUCT_IMAGES',
  GENERATE_CARD_PRODUCT = 'GENERATE_CARD_PRODUCT',
  GENERATE_CARD_PRODUCT_SUCCESS = 'GENERATE_CARD_PRODUCT_SUCCESS',
  GENERATE_CARD_PRODUCT_FAILED = 'GENERATE_CARD_PRODUCT_FAILED',
  UPDATE_CARD_PRODUCT_CONTENT_SUCCESS = 'UPDATE_CARD_PRODUCT_CONTENT_SUCCESS',
  UPDATE_CARD_PRODUCT_CONTENT_SUCCESS_COMPLETE = 'UPDATE_CARD_PRODUCT_CONTENT_SUCCESS_COMPLETE',
  FETCH_ALL_PRODUCTS_BY_CASE_ID = 'FETCH_ALL_PRODUCTS_BY_CASE_ID',
  FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS = 'FETCH_ALL_PRODUCTS_BY_CASE_ID_SUCCESS',
  FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED = 'FETCH_ALL_PRODUCTS_BY_CASE_ID_FAILED',
  CLEAR_PAGES_CONTENT_BY_PAGE_INDEXES = 'CLEAR_PAGES_CONTENT_BY_PAGE_INDEXES',
  UPDATE_CARD_PRODUCT_PAGE_SIZE = 'UPDATE_CARD_PRODUCT_PAGE_SIZE',
  UPDATE_CARD_PRODUCT_PAGE_MARGIN = 'UPDATE_CARD_PRODUCT_PAGE_MARGIN',
  CARD_PRODUCT_CONTENT_LOAD_SUCCESS = 'CARD_PRODUCT_CONTENT_LOAD_SUCCESS',
  CARD_PRODUCT_CONTENT_LOAD_FAIL = 'CARD_PRODUCT_CONTENT_LOAD_FAIL',
  CREATE_CARD_PRODUCT_BY_CASE_ID = 'CREATE_CARD_PRODUCT_BY_CASE_ID',
  CREATE_CARD_PRODUCT_BY_CASE_ID_SUCCESS = 'CREATE_CARD_PRODUCT_BY_CASE_ID_SUCCESS',
  CREATE_CARD_PRODUCT_BY_CASE_ID_FAILED = 'CREATE_CARD_PRODUCT_BY_CASE_ID_FAILED',
  SAVE_CARD_PRODUCT = 'SAVE_CARD_PRODUCT',
  SAVE_CARD_PRODUCT_SUCCESS = 'SAVE_CARD_PRODUCT_SUCCESS',
  SAVE_CARD_PRODUCT_FAIL = 'SAVE_CARD_PRODUCT_FAIL',
  LOAD_CARD_PRODUCT_FONTS_SUCCESS = 'LOAD_CARD_PRODUCT_FONTS_SUCCESS',
  ADD_CARD_PRODUCT_PAGES = 'ADD_CARD_PRODUCT_PAGES',
  REMOVE_CARD_PRODUCT_PAGES = 'REMOVE_CARD_PRODUCT_PAGES',
  UPDATE_CARD_PRODUCT_BACKGROUND = 'UPDATE_CARD_PRODUCT_BACKGROUND',
  REPOPULATE_PRIMARY_IMAGE = 'REPOPULATE_PRIMARY_IMAGE',
  UPDATE_SELECTED_DIMENSION = 'UPDATE_SELECTED_DIMENSION',
}

export enum ApplyButtonPageIconEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  NOT_APPLICABLE = 'n/a',
}

export interface IApplyButtonContext {
  show: boolean
  mode: UpdateBackgroundImageMode | null
  text: string
  pageIcons: {
    frontPage: {
      amount: number
      iconType: ApplyButtonPageIconEnum
    }
    lastPage: {
      amount: number
      iconType: ApplyButtonPageIconEnum
    }
    centrePages: {
      amount: number
      iconType: ApplyButtonPageIconEnum
    }
  }
}

export type ICardProductActionPayload = {
  overlay?: ICardProductOverlayUpdateOptions
  slug?: string
  productType?: EulogiseProduct
  productData?: ICardProductData
  product?: ICardProductData
  products?: Array<ICardProductData>
  resources?: Record<EulogiseResource, Array<ICardProductData>>
  cardProductTheme?: ICardProductTheme
  items?: Array<ICardProductData>
  pages?: Array<ICardProductPage>
  page?: ICardProductPage
  pageSize?: CardProductPageSize
  pageMargin?: ICardProductPageMarginsType
  asset?: ICardProductDivider
  image?: IImageAssetContent
  images?: Array<IImageAssetContent>
  primaryImage?: IImageAssetContent
  type?: CardProductContentItemType
  row?: ICardProductRow
  rowId?: string
  frameContentItemId?: string
  pageIndex?: number
  pageIndexes?: Array<number>
  isAddToUndoList?: boolean
  columnIndex?: number
  borderSettings?: IBorderSettingsModalFormFields
  region?: EulogiseRegion
  activeProductTheme?: ICardProductTheme
  ex?: Error
  error?: Error
  isUpdateActiveItemOnSuccess?: boolean
  removePages?: number
}

export interface ICardProductAction {
  type:
    | CardProductActionTypes
    | TvWelcomeScreenActionTypes
    | SlideshowTitleSlideActionTypes
    | ThankYouCardActionTypes
    | SidedCardActionTypes
    | BookmarkActionTypes
    | PhotobookActionTypes
    | ConnectionActionTypes
  error?: any
  payload?: ICardProductActionPayload
}

export enum CardProductPageOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export enum MemorialVisualStatus {
  NOT_STARTED = 'not_started',
  THEME_SELECTED = 'theme_selected',
  EDITED = 'edited',
  COMPLETE = 'complete',
  DOWNLOAD = 'download',

  // DEPRECATED
  INCOMPLETE = 'incomplete',
}

export const MemorialVisualStatusLevelOrder: Array<MemorialVisualStatus> = [
  MemorialVisualStatus.NOT_STARTED,
  MemorialVisualStatus.INCOMPLETE,
  MemorialVisualStatus.THEME_SELECTED,
  MemorialVisualStatus.EDITED,
  MemorialVisualStatus.COMPLETE,
  MemorialVisualStatus.DOWNLOAD,
]

export const MemorialVisualStatusProps: {
  [key: string]: { label: string; color: string }
} = {
  [MemorialVisualStatus.NOT_STARTED]: {
    label: 'Not Started',
    color: '#C2C2C2',
  },
  [MemorialVisualStatus.INCOMPLETE]: { label: 'Not started', color: '#C2C2C2' },
  [MemorialVisualStatus.THEME_SELECTED]: {
    label: 'Theme Selected',
    color: '#BED6E9',
  },
  [MemorialVisualStatus.EDITED]: { label: 'Edited', color: '#60B1F1' },
  [MemorialVisualStatus.COMPLETE]: { label: 'Completed', color: '#41BCC8' },
  [MemorialVisualStatus.DOWNLOAD]: { label: 'Downloaded', color: '#7A79F9' },
  undefined: { label: 'Not Started', color: '#C2C2C2' },
}

export enum CardProductViewDisplayMode {
  EDIT = 'EDIT',
  PREVIEW = 'PREVIEW',
  PRINT = 'PRINT',
  TEMPLATE = 'TEMPLATE',
  THUMBNAIL = 'THUMBNAIL',
  GENERATE_VIDEO = 'GENERATE_VIDEO',
  SPREAD_VIEW = 'SPREAD_VIEW',
}

export type IContentItemOnChangeEvent = {
  event:
    | 'resize'
    | 'measure-resize'
    | 'resize-no-recording'
    | 'space-asset-confirm'
    | 'color-change'
}

export enum CardProductContentItemType {
  FRAME = 'frame',
  TEXT = 'text',
  IMAGE = 'image',
  SPACE = 'space',
  ICON = 'icon',
  COLUMNS = 'columns',
}

export type CardProductContentItemTypeText =
  | 'text'
  | 'image'
  | 'space'
  | 'columns'

export type ICardPopulatedTextDataPrimaryImage = Partial<IImageAssetContent> & {
  borderRadius?: string
  lockAspectRatio?: boolean
  enableBorder?: boolean
  type?: CardProductContentItemType
}

export interface ICardPopulatedTextData {
  deceasedName?: string
  dateOfService?: string
  dateOfBirth?: string
  dateOfDeath?: string
  location?: string
  serviceStartTime?: string
  primaryImage?: ICardPopulatedTextDataPrimaryImage
  deceasedNameFontType?: any
  region?: EulogiseRegion
}

export interface ICardProductNewPageStyles {
  header: string
  paragraph: string
  headerHeight: number
  paragraphHeight: number
}

export interface ICardProductThemeThumbnail {
  images?: Array<string>
  video?: string
}

export interface IBaseProductTheme {
  metadata?: IThemeCommon // this field only assigned by ThemeHelper, not store in the database. Also avoid ITheme massive data passing to the Redux store
  id?: string
  name: string
  thumbnail: ICardProductThemeThumbnail
}

export interface ICardProductTheme extends IBaseProductTheme {
  themeDefaultImageFilter?: string
  defaultStyle: IRowStyle
  isPrimaryImageFullWidth?: boolean
  newPageStyles: ICardProductNewPageStyles
  styles: Record<string, IRowStyle>
  defaultContent?: Array<ICardProductPage>
  defaultThemeLayoutColumns?: number
  // defaultContent: [IThemePageContent, IThemePageContent, IThemePageContent, IThemePageContent]
  blockRenderMap?: object
}

export interface GetImageObject {
  filestackHandle?: string
  url?: string
  filepath?: string
  preset?: IFilestackImageEnhancePreset
  isRemovedBackgroundImage?: boolean

  // Deprecated
  filename?: string
}

export interface GetImageUrlOption {
  width?: number
  height?: number
  useProdS3BucketUrl?: boolean
  isFormatToJpg?: boolean
  resizeMethod?: 'fit:max' | ''

  // Deprecated
  caseId?: string
}

export type ICardProductBackgroundStatus =
  | 'draft'
  | 'created'
  | 'deleted'
  | 'published'

export type ICardProductBackgroundImageBase = {
  id: string
  name: string
  categoryIds?: Array<string>
  clientId?: string
  customerId?: string
  image?: GetImageObject
  status?: ICardProductBackgroundStatus
  restrictions?: BackgroundRestrictions
  productProperties?: Record<EulogiseProductThemeMap, IImageSizeAndPosition>
}

// Change background images
export type ICardProductBackgroundImage = ICardProductBackgroundImageBase & {
  thumbnail: string
  cardProducts: Record<
    Exclude<
      EulogiseProduct,
      | EulogiseProduct.ALL
      | EulogiseProduct.GENERIC_CARD_PRODUCT
      | EulogiseProduct.SLIDESHOW
      | EulogiseProduct.PHOTOBOOK
    >,
    Record<CardProductBackgroundImageName, string>
  >
  slideshow: ISlideshowBackgroundImage
}

export interface ISlideshowBackgroundImage {
  slideBackgroundImageUrl: string
}

export interface ICardProductOverlayUpdateOptions {
  overlayEnabled?: boolean

  // DEPRECATED: following fields will be depreciated by global overlay variable in the Product Content
  overlayColor?: string
  overlayOpacity?: number
  overlayMargin?: [number, number]
  overlayEndPosition?: {
    top: number // percentage
    bottom: number // percentage
  }
  overlayFadePosition?: {
    top: number // percentage
    bottom: number // percentage
  }
  borderRadius?: string
}

export const CARD_PRODUCT_OVERLAY_CORNER_OPTIONS = [
  { label: '0', value: '0' },
  { label: '1', value: '0.25rem' },
  { label: '2', value: '0.5rem' },
  { label: '3', value: '1rem' },
  { label: '4', value: '2rem' },
  { label: '5', value: '5rem' },
  { label: '6', value: '10rem' },
]

export interface ICardProductDivider {
  id: number | null | ICardProductDividerName
  name?: string
  filepath?: string | null
}

export type ICardProductDividerName =
  | 'divider-01'
  | 'divider-02'
  | 'divider-03'
  | 'divider-04'
  | 'divider-05'
  | 'divider-06'
  | 'divider-07'
  | 'divider-08'
  | 'divider-09'
  | 'divider-10'
  | 'divider-11'
  | 'divider-12'
  | 'divider-13'
  | 'divider-14'
  | 'divider-15'
  | 'divider-16'
  | 'divider-17'
  | 'divider-18'
  | 'divider-19'

export type ICardProductIconName =
  | 'Christian'
  | 'ChristianCross'
  | 'Cross'
  | 'Cross2'
  | 'Cross3'
  | 'Dove'
  | 'Dove2'
  | 'Fish'
  | 'Flower'
  | 'GolfFlag'
  | 'Heart'
  | 'Heart2'
  | 'Ichthus'
  | 'Jewish'
  | 'Jewish2'
  | 'Leaf'
  | 'Leaf2'
  | 'Leaf3'
  | 'MusicNote'
  | 'MusicNote2'
  | 'Muslim'
  | 'Ribbon'
  | 'Ribbon2'
  | 'SailBoat'
  | 'Star'
  | 'Star2'
  | 'Star3'
  | 'Tree'
  | 'Tree2'
  | 'YingYang'

export type ICardProductIcon = {
  id: ICardProductIconName
}

export enum CardProductPageSize {
  A5 = 'A5',
  HALF_LETTER_A5 = 'HALF_LETTER_A5',
  THANKYOUCARD_2_COLS = 'THANKYOUCARD_2_COLS',
  THANKYOUCARD = 'THANKYOUCARD',
  BOOKMARK = 'BOOKMARK',
  SLIDESHOW_TITLE_SLIDE = 'SLIDESHOW_TITLE_SLIDE',
  SLIDESHOW_TITLE_SLIDE_2_COLS = 'SLIDESHOW_TITLE_SLIDE_2_COLS',
  TV_WELCOME_SCREEN = 'TV_WELCOME_SCREEN',
  TV_WELCOME_SCREEN_2_COLS = 'TV_WELCOME_SCREEN_2_COLS',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM = 'PHOTOBOOK_MILK_CLASSIC_MEDIUM',
  PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER = 'PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER',
  PHOTOBOOK_MILK_CLASSIC_LARGE = 'PHOTOBOOK_MILK_CLASSIC_LARGE',
  PHOTOBOOK_MILK_CLASSIC_LARGE_COVER = 'PHOTOBOOK_MILK_CLASSIC_LARGE_COVER',
  PHOTOBOOK_MILK_PREMIUM_MEDIUM = 'PHOTOBOOK_MILK_PREMIUM_MEDIUM',
  PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER = 'PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER',
  PHOTOBOOK_MILK_PREMIUM_LARGE = 'PHOTOBOOK_MILK_PREMIUM_LARGE',
  PHOTOBOOK_MILK_PREMIUM_LARGE_COVER = 'PHOTOBOOK_MILK_PREMIUM_LARGE_COVER',
  PHOTOBOOK_LARGE_PORTRAIT = 'PHOTOBOOK_LARGE_PORTRAIT',
  PHOTOBOOK_THUMBNAIL = 'PHOTOBOOK_THUMBNAIL',
  GENERIC_CARD_PRODUCT = 'GENERIC_CARD_PRODUCT',
}

export interface IPageContentWidthAndHeight {
  width: number
  height: number
}

export interface ICardProductContent {
  pageMargins: ICardProductPageMarginsType
  pageSize: CardProductPageSize
  theme: string
  pageOrientation: CardProductPageOrientation
  pageOverlay?: ICardProductOverlayUpdateOptions
  pages: Array<ICardProductPage>
}

export interface ICardProductPageStyle {
  width: number
  height: number
  paddingTop: number
  paddingBottom: number
  backgroundImage?: string
  backgroundSize?: string
  backgroundColor?: string
  bleedBackground?: string
  backgroundPosition?: string
}

export enum ResourceFileStatusKey {
  BLEED = 'BLEED',
  NON_BLEED = 'NON_BLEED',
  SINGLE_PAGE_BLEED = 'SINGLE_PAGE_BLEED',
  EMBEDDED_IMAGES = 'EMBEDDED_IMAGES',
}

export interface ICardProductData {
  id?: string
  case: string
  content: ICardProductContent
  updatedAt?: string
  createdAt?: string
  status: MemorialVisualStatus
  fileStatus?: ResourceFileStatus
  fileStatuses?: Record<ResourceFileStatusKey, ResourceFileStatus>
  hasGeneratedBefore?: boolean
}

export enum CardProductBorderCategory {
  CLASSIC = 'CLASSIC',
  GRAPHIC = 'GRAPHIC',
}

export enum CardProductBorderType {
  SINGLE_SOLID = 'SINGLE_SOLID',
  SINGLE_DASHED = 'SINGLE_DASHED',
  SINGLE_DOTTED = 'SINGLE_DOTTED',
  DOUBLE_SOLID = 'DOUBLE_SOLID',
  DOUBLE_DASHED = 'DOUBLE_DASHED',
  DOUBLE_DOTTED = 'DOUBLE_DOTTED',
  TOP_AND_BOTTOM_SOLID = 'TOP_AND_BOTTOM_SOLID',
  TOP_AND_BOTTOM_DASHED = 'TOP_AND_BOTTOM_DASHED',
  TOP_AND_BOTTOM_DOTTED = 'TOP_AND_BOTTOM_DOTTED',
  BLANK_MID_BOTTOM_SOLID = 'BLANK_MID_BOTTOM_SOLID',
  BLANK_MID_BOTTOM_DASHED = 'BLANK_MID_BOTTOM_DASHED',
  BLANK_MID_BOTTOM_DOTTED = 'BLANK_MID_BOTTOM_DOTTED',
  NONE = 'NONE',

  // Graphics
  SOSSAMON = 'SOSSAMON',
}

export const getCardProductBorderCategoryOptions = (): Array<{
  label: string
  value: CardProductBorderCategory
}> => [
  { label: 'Classic', value: CardProductBorderCategory.CLASSIC },
  { label: 'Graphic', value: CardProductBorderCategory.GRAPHIC },
]

export const getCardProductBorderOptions = ({
  product,
  borderCategory = CardProductBorderCategory.CLASSIC,
}: {
  product: EulogiseProduct
  borderCategory: CardProductBorderCategory
}): Array<{
  label: string
  value: CardProductBorderType
}> => {
  return borderCategory === CardProductBorderCategory.CLASSIC
    ? [
        { label: 'None', value: CardProductBorderType.NONE },
        { label: 'Single Solid', value: CardProductBorderType.SINGLE_SOLID },
        { label: 'Single Dashed', value: CardProductBorderType.SINGLE_DASHED },
        { label: 'Single Dotted', value: CardProductBorderType.SINGLE_DOTTED },
        { label: 'Double Solid', value: CardProductBorderType.DOUBLE_SOLID },
        { label: 'Double Dashed', value: CardProductBorderType.DOUBLE_DASHED },
        { label: 'Double Dotted', value: CardProductBorderType.DOUBLE_DOTTED },
        {
          label: 'Top/Bottom Solid',
          value: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
        },
        {
          label: 'Top/Bottom Dashed',
          value: CardProductBorderType.TOP_AND_BOTTOM_DASHED,
        },
        {
          label: 'Top/Bottom Dotted',
          value: CardProductBorderType.TOP_AND_BOTTOM_DOTTED,
        },
        ...(product === EulogiseProduct.THANK_YOU_CARD
          ? [
              {
                label: 'Mid-Bottom Blank Solid',
                value: CardProductBorderType.BLANK_MID_BOTTOM_SOLID,
              },
              {
                label: 'Mid-Bottom Blank Dashed',
                value: CardProductBorderType.BLANK_MID_BOTTOM_DASHED,
              },
              {
                label: 'Mid-Bottom Blank Dotted',
                value: CardProductBorderType.BLANK_MID_BOTTOM_DOTTED,
              },
            ]
          : []),
      ]
    : [
        {
          label: 'Sossamon',
          value: CardProductBorderType.SOSSAMON,
        },
      ]
}

export enum CardProductBorderThicknessType {
  THIN = 'THIN',
  MEDIUM = 'MEDIUM',
  THICK = 'THICK',
}

export enum CardProductBorderPageType {
  FRONT_PAGE = 'FRONT_PAGE',
  MIDDLE_PAGES = 'MIDDLE_PAGES',
  BACK_PAGE = 'BACK_PAGE',
}

export type CardProductBorderPagesOptions = {
  [CardProductBorderPageType.MIDDLE_PAGES]: boolean
  [CardProductBorderPageType.FRONT_PAGE]: boolean
  [CardProductBorderPageType.BACK_PAGE]: boolean
}

export const CardProductBorderThicknessOptions: Array<{
  label: string
  value: CardProductBorderThicknessType
}> = [
  {
    label: 'Thin',
    value: CardProductBorderThicknessType.THIN,
  },
  { label: 'Medium', value: CardProductBorderThicknessType.MEDIUM },
  { label: 'Thick', value: CardProductBorderThicknessType.THICK },
]

export type ICardProductBorderSettings = {
  borderCategory?: CardProductBorderCategory
  borderStyle?: CardProductBorderType
  color?: string
  thickness?: CardProductBorderThicknessType
}

export type IBorderSettingFormFields = ICardProductBorderSettings

export type IBorderSettingsModalFormFields = {
  [CardProductBorderPageType.FRONT_PAGE]: IBorderSettingFormFields
  [CardProductBorderPageType.MIDDLE_PAGES]: IBorderSettingFormFields
  [CardProductBorderPageType.BACK_PAGE]: IBorderSettingFormFields
}

export interface ICardProductPageSize {
  width: number
  height: number
}

export interface ICardProductContentSize {
  width: number
  height: number
}

// Single Page State
export interface ICardProductPage {
  layoutId?: string // only for photobook title page
  pageWidth?: number
  pageHeight?: number
  contentHeight?: number
  contentBoundaries?: {
    width: number
    height: number
  }
  pageNumber?: number
  pageStyle?: ICardProductPageStyle
  pageActionsStyle?: IPageStyle
  contentIsFull?: boolean
  showPageActions?: boolean
  rows: Array<ICardProductRow>
  editable?: boolean
  border?: ICardProductBorderSettings
  background?: ICardProductBackground
  bleedPageBackground?: string
  isTitlePageLayout?: boolean
  coverType?: EulogisePhotobookCoverType
}

export enum EulogiseImageOrientation {
  LANDSCAPE = 'LANDSCAPE',
  PORTRAIT = 'PORTRAIT',
  SQUARE = 'SQUARE',
}

export type IFrameLayoutMetadata = {
  useOnPhotobookCreation?: boolean
  frameOrientations: Array<EulogiseImageOrientation>
  pageSize?: CardProductPageSize // only for cover page
}

export type IPhotobookPageLayout = ICardProductPage & {
  layoutId: string
  metadata: IFrameLayoutMetadata
}

export enum BleedPageMode {
  LEFT_SIDE_BLEED = 'LEFT_SIDE_BLEED',
  RIGHT_SIDE_BLEED = 'RIGHT_SIDE_BLEED',
  FULL_BLEED = 'FULL_BLEED',
  NO_BLEED = 'NO_BLEED',
}

export type ICardProductBorderSize = {
  width?: string
  height?: string
}

export type ICardProductBorderPosition = {
  top?: string
  left?: string
  bottom?: string
  right?: string
}

export type ICardProductBorderStyle =
  | 'dashed'
  | 'dotted'
  | 'solid'
  | 'double'
  | 'none'

export interface ICardProductSingleBorder {
  borderStyle?: ICardProductBorderStyle
  size?: ICardProductBorderSize
  thickness?: string
  color?: string
  alignTo?: 'right' | 'center' | 'left'
  padding?: string
  thicknessTemplate?: string
  isGraphic?: boolean
}

export type ICardProductBackground = ICardProductOverlayUpdateOptions & {
  image: GetImageObject
  color?: string
}

export interface ICardProductDataResponse {
  data: { item: ICardProductData }
}

// Shared Content Item Types
export type ICardProductRowData =
  | ICardProductTextRowData
  | ICardProductColumnRowData
  | ICardProductImageRowData
  | ICardProductSpaceRowData
  | ICardProductFrameRowData
  | ICardProductIconRowData

export type ICardProductRow =
  | ICardProductTextRow
  | ICardProductImageRow
  | ICardProductIconRow
  | ICardProductSpaceRow
  | ICardProductColumnsRow
  | ICardProductFrameRow

export interface ICardProductTextRowData {
  height?: number
  width?: number
  style?: 'unstyled'
  content: IResourceRowContent
  rowStyle?: IRowStyle
  fontSize?: number
  margin?: MarginType
  alignment?: AlignmentType | AlignmentTypeText
}

export interface ICardProductBaseRow {
  id: string
  childRowIds?: Array<string>
  data: ICardProductRowData
  dynamicDataId?: CardProductDynamicDataKey // this field is used by the theme editor to populate the dropdown (DynamicDataSelector)
}

export interface ICardProductTextRow extends ICardProductBaseRow {
  type: CardProductContentItemType.TEXT | 'text'
  // TODO: Might need to specific this later
  data: ICardProductTextRowData
  height?: number
}

export enum ICardProductImageType {
  PRIMARY_IMAGE = 'PRIMARY_IMAGE',
  CURRENT_IMAGE = 'CURRENT_IMAGE',
  DEFAULT_THEME_IMAGE = 'DEFAULT_THEME_IMAGE',
}

export enum ICardProductViewType {
  EDITOR_VIEW = 'EDITOR_VIEW',
  SPREAD_VIEW = 'SPREAD_VIEW',
}

export interface ICardProductImageRowData {
  margin?: MarginType
  filename?: string
  filepath?: string
  filestackHandle?: string
  url?: string
  alignment?: AlignmentType | AlignmentTypeText
  width?: number
  height?: number
  imageType?: ICardProductImageType
  enableBorder?: boolean
  enableFadeImage?: boolean
  isClientBrandImage?: boolean
  preset?: IFilestackImageEnhancePreset
}

export type ICardProductFrameRowData = {
  height?: number
  width?: number
  prevWidth?: number
  prevAlignment?: AlignmentType
  alignment?: AlignmentType
  isFullWidth?: boolean
  content: ICardProductFrameLayout
  enableBorder?: boolean
  enableFadeImage?: boolean
  opacity?: number
}

export interface ICardProductImageRow extends ICardProductBaseRow {
  type?: CardProductContentItemType.IMAGE | 'image'
  data: ICardProductImageRowData
  height?: number
}

export interface ICardProductFrameRow extends ICardProductBaseRow {
  type?: CardProductContentItemType.FRAME
  data: ICardProductFrameRowData // string is for <<&primaryImage>>
}

export interface ICardProductSpaceRowData {
  height?: number
  divider?: {
    asset: ICardProductDivider & {
      filename?: string
    }
    color?: string
    width?: number
    height?: number
    alignment?: AlignmentType
  }
}

export interface ICardProductIconRowData {
  height?: number
  width?: number
  alignment?: AlignmentType
  icon?: {
    icon: ICardProductIconName
    color: string
  }
}

export interface ICardProductColumnRowData {
  items: Array<ICardProductImageRow>
}

export interface ICardProductSpaceRow extends ICardProductBaseRow {
  type: CardProductContentItemType.SPACE | 'space'
  data: ICardProductSpaceRowData
  height?: number
}

export interface ICardProductIconRow extends ICardProductBaseRow {
  type: CardProductContentItemType.ICON | 'icon'
  data: ICardProductIconRowData
  height?: number
}

export interface ICardProductColumnsRow extends ICardProductBaseRow {
  type: CardProductContentItemType.COLUMNS | 'columns'
  data: ICardProductColumnRowData
}

export interface ICardProductState {
  items?: Array<ICardProductData>
  activeItem?: ICardProductData | null
  activeProductTheme?: ICardProductTheme
  undoContentList: Array<ICardProductContent>
  redoContentList: Array<ICardProductContent>
  isFetching: boolean
  fontsLoading: boolean
  leftPageIndex: number
  rightPageIndex: number
  leftPageContent: Array<any>
  rightPageContent: Array<any>
  currentPageIndex: number
  displayedModal: boolean
  error: any
  dirty: boolean
  isUpdating: boolean
}

export interface IGenericCardProductsState {
  productsState: {
    [slug: string]: ICardProductState
  }
  isFetching: boolean
  hasInitialised: boolean
}

export enum APPLY_BUTTON {
  FIRST_BUTTON = 'firstButton',
  SECOND_BUTTON = 'secondButton',
}

export const APPLY_BUTTON_CONTEXT: Record<
  EulogiseProduct,
  Record<APPLY_BUTTON, IApplyButtonContext>
> = {
  // @ts-ignore
  [EulogiseProduct.PHOTOBOOK]: {},
  [EulogiseProduct.BOOKLET]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_ALL_PAGES,
      text: 'Apply to all pages',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
      text: 'Apply to cover pages only',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.INACTIVE,
        },
      },
    },
  },
  [EulogiseProduct.SIDED_CARD]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
      text: 'Apply to both sides',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
      text: 'Apply to front only',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.INACTIVE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.BOOKMARK]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
      text: 'Apply to both sides',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
      text: 'Apply to front only',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.INACTIVE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.THANK_YOU_CARD]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_FRONT_PAGE_ONLY,
      text: 'Apply background',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: false,
      mode: UpdateBackgroundImageMode.NOT_APPLICABLE,
      text: 'N/A',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.SLIDESHOW]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_ALL_SLIDES,
      text: 'Apply background',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: false,
      mode: UpdateBackgroundImageMode.NOT_APPLICABLE,
      text: 'N/A',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.TV_WELCOME_SCREEN]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
      text: 'Apply background',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: false,
      mode: UpdateBackgroundImageMode.NOT_APPLICABLE,
      text: 'N/A',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_COVER_PAGES_ONLY,
      text: 'Apply background',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: false,
      mode: UpdateBackgroundImageMode.NOT_APPLICABLE,
      text: 'N/A',
      pageIcons: {
        frontPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        lastPage: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
        centrePages: {
          amount: 0,
          iconType: ApplyButtonPageIconEnum.NOT_APPLICABLE,
        },
      },
    },
  },
  [EulogiseProduct.ALL]: {
    [APPLY_BUTTON.FIRST_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_ALL_PRODUCTS_ALL_PAGES,
      text: 'Apply to all pages',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
      },
    },
    [APPLY_BUTTON.SECOND_BUTTON]: {
      show: true,
      mode: UpdateBackgroundImageMode.UPDATE_ALL_PRODUCTS_COVER_PAGES_ONLY,
      text: 'Apply to cover pages only',
      pageIcons: {
        frontPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        lastPage: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.ACTIVE,
        },
        centrePages: {
          amount: 1,
          iconType: ApplyButtonPageIconEnum.INACTIVE,
        },
      },
    },
  },
}

export type INavigateToProductQueryString = {
  applyThemeTo: EulogiseProduct
}

export const BOOKLET_CONTENT_WIDTH = {
  US: 360,
  AU: 335,
}
