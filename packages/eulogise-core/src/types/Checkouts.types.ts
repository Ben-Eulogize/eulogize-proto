import { EulogisePhotobookCoverType } from '../constants'
import { CardProductPageSize, MemorialVisualStatus } from './CardProduct.types'
import {
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseProduct,
  EulogiseProductDownloadProductName,
} from './Eulogise.types'
import { PhotobookBookStyle } from './Photobook.types'
import { ResourceFileStatus } from './Resource.types'

export type ShippingFeeMatrix = {
  [K in (typeof CHECKOUTS_SHIPPING_PRODUCTS)[keyof typeof CHECKOUTS_SHIPPING_PRODUCTS]]: Partial<
    Record<EulogiseCountry, Record<CHECKOUTS_SHIPPING_METHOD, number>>
  >
}

const NON_APPLICTABLE_SHIPPING_PRICE = 0

export const EulogizeNonShippingAvailableCountries = [
  EulogiseCountry.AUSTRALIA,
  EulogiseCountry.CANADA,
  EulogiseCountry.EUROPEAN_UNION,
  EulogiseCountry.UNITED_KINGDOM,
  EulogiseCountry.CHILE,
  EulogiseCountry.COLOMBIA,
  EulogiseCountry.COSTA_RICA,
  EulogiseCountry.MEXICO,
  EulogiseCountry.NEW_ZEALAND,
  EulogiseCountry.PANAMA,
  EulogiseCountry.GUATEMALA,
  EulogiseCountry.THE_DOMINICAN_REPUBLIC,
  EulogiseCountry.THE_PHILIPPINES,
  EulogiseCountry.REST_OF_THE_WOLRD,
]

export const EulogizeShippingAvailableCountries = [
  EulogiseCountry.UNITED_STATES,
  EulogiseCountry.AUSTRALIA,
  EulogiseCountry.CANADA,
]

// PhotoBook only available for US now
export const PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES = [
  EulogiseCountry.UNITED_STATES,
]

export enum ADDRESS_INPUT_MODE {
  NO_INPUT = 'NO_INPUT',
  AUTO_COMPLETE = 'AUTO_COMPLETE',
  MANUAL_INPUT = 'MANUAL_INPUT',
}

export interface ICheckoutTributeMetaDataPayload {
  fileStatus: ResourceFileStatus
  status: MemorialVisualStatus
  id: string | null
}

export interface IAddressDetails {
  formattedAddress: string | null
  isValidAddress?: boolean
  portalAddressMetaData?: any
  addressInputMode: ADDRESS_INPUT_MODE
}

export interface IPaymentDetails {
  method: CHECKOUT_PAYMENT_METHODS
  cardHolderName: string
}

export interface IPrintingDetails {
  printingMethod: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD | null
  orderedProductsDetails: Partial<
    Record<EulogiseProduct, IPrintingProductDetails>
  >
  printingAddressDetails: IAddressDetails
  printingShippingMethod: CHECKOUTS_SHIPPING_METHOD
}

export interface IOrderSummaryDetails {
  digitalDownloadFee: number
  leatherVideoTributeBookFee: number
  photoBookTributeFee: number
  shippingFee: number
  printingFee: number
  subtotalFee: number
}

export interface IOrderDetails {
  packageOption: EulogisePackageOptions
  country: EulogiseCountry
  orderSummary: IOrderSummaryDetails
  paymentDetails: IPaymentDetails
  keepsakesDetails: IKeepsakesDetails
  billingAddressDetails: IAddressDetails | null
  currency: string
  printingDetails: IPrintingDetails
}

export type ICheckoutTributeMetaData = Partial<
  Record<EulogiseProduct, ICheckoutTributeMetaDataPayload>
>

export interface IPrintingPerUnitPriceByCopies {
  0: number
  20: number
  40: number
  60: number
  80: number
  100: number
  120: number
  140: number
  160: number
  180: number
  200: number
}

export interface IPrintingPerUnitPriceByProduct {
  [EulogiseCardProducts.BOOKLET]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.BOOKMARK]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.SIDED_CARD]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.THANK_YOU_CARD]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.SLIDESHOW_TITLE_SLIDE]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.TV_WELCOME_SCREEN]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
  [EulogiseCardProducts.PHOTOBOOK]: Record<
    EulogiseCountry,
    IPrintingPerUnitPriceByCopies
  >
}

export interface IPrintingPaperDefinition {
  key: EulogizePrintingProductsPaperTypes
  displayName: EulogizePrintingProductsPaperTypes
  description: string
  weight: number
  weightUnit: string
  thickness: string
  perPaperUnitPrice: IPrintingPerUnitPriceByProduct
  imageUrl: string
  appliedProducts: Array<EulogiseCardProducts>
}

export enum EulogizePrintingProductsPaperTypes {
  SMOOTH_MATTE = 'Smooth Matte',
  SHINY_GLOSS = 'Shiny Gloss',
  PREMIUM_LINEN = 'Premium Linen',
}

export enum EulogisePackageOptions {
  // First time checkout
  ALL_TRIBUTES_BUNDLE = 'ALL_TRIBUTES_BUNDLE',
  VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY = 'VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY',
  PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY = 'PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY',
  PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY = 'PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY',
  // Upgrade (second time) checkout
  UPGRADE_VIDEO_TRIBUTES = 'UPGRADE_VIDEO_TRIBUTES',
  UPGRADE_PRINTABLE_PDF_ONLY = 'UPGRADE_PRINTABLE_PDF_ONLY',
  UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY = 'UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY',
  // Add-ons: Keepsakes
  ADD_ON_LEATHER_VIDEO_BOOK = 'ADD_ON_LEATHER_VIDEO_BOOK',
  ADD_ON_PREMIUM_PRINTING = 'ADD_ON_PREMIUM_PRINTING',
  ADD_ON_PREMIUM_PHOTO_BOOK = 'ADD_ON_PREMIUM_PHOTO_BOOK',
}

export enum EulogisePurchaseInformationPackageName {
  ALL_TRIBUTES_BUNDLE = 'Eulogize Print & Screen Tributes Bundle',
  VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY = 'Video Tributes Suite',
  PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY = 'Printed Tribute Suite',
  PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY = 'Printed Tribute Suite',
  UPGRADE_VIDEO_TRIBUTES = 'Video Tributes Upgrade',
  UPGRADE_PRINTABLE_PDF_ONLY = 'Printed Tributes Upgrade',
  UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY = 'Printed Tribute Suite',
  ADD_ON_LEATHER_VIDEO_BOOK = 'Leather Video Book Purchase',
  ADD_ON_PREMIUM_PRINTING = 'Printing & Delivery',
  ADD_ON_PREMIUM_PHOTO_BOOK = 'Premium Photo Books',
  // ADD_ON_PERSONALIZED_USB = 'None',
}

export enum EulogisePurchaseInformationShippingMethodName {
  NO_SHIPPING = 'None',
  FREE_SHIPPING = 'Free',
  EXPRESS_SHIPPING = 'Express',
  STANDARD_SHIPPING = 'Standard',
  PRIORITY_SHIPPING = 'Priority',
  PHOTO_BOOK_MEDIUM_SIZE_SHIPPING = 'Express',
  PHOTO_BOOK_LARGE_SIZE_SHIPPING = 'Express',
}

export enum EulogisePackageOptionTypes {
  FIRST_TIME_CHECKOUT_PACKAGE = 'FIRST_TIME_CHECKOUT_PACKAGE',
  UPGRADE_CHECKOUT_PACKAGE = 'UPGRADE_CHECKOUT_PACKAGE',
  KEEPSAKES = 'KEEPSAKES',
  EXCEPTIONAL_DISPLAYED_ALL_TIME = 'EXCEPTIONAL_DISPLAYED_ALL_TIME',
}

export enum CheckoutsActionTypes {
  UPDATE_PAYMENT_OPTION = 'UPDATE_PAYMENT_OPTION',
  UPDATE_PRODUCT_PAPER_TYPE = 'UPDATE_PRODUCT_PAPER_TYPE',
  UPDATE_PRODUCT_COPIES_AMOUNT = 'UPDATE_PRODUCT_COPIES_AMOUNT',
  RESTORE_CHECKOUT_INITIAL_STATE = 'RESTORE_CHECKOUT_INITIAL_STATE',
  UPDATE_IS_COMING_FROM_PAYMENT_PAGE = 'UPDATE_IS_COMING_FROM_PAYMENT_PAGE',
  UPDATE_WILL_OPEN_THEME_DRAWER = 'UPDATE_WILL_OPEN_THEME_DRAWER',
  UPDATE_IS_PRINTING_OPTION_DRAWER_OPENED = 'UPDATE_IS_PRINTING_OPTION_DRAWER_OPENED',
  UPDATE_IS_REVIEW_DESIGN_DRAWER_OPENED = 'UPDATE_IS_REVIEW_DESIGN_DRAWER_OPENED',
  UPDATE_IS_KEEPSAKES_DRAWER_OPENED = 'UPDATE_IS_KEEPSAKES_DRAWER_OPENED',
  UPDATE_PENDING_KEEPSAKES_DRAWER_PRODUCT = 'UPDATE_PENDING_KEEPSAKES_DRAWER_PRODUCT',
  UPDATE_IS_SLIDESHOW_GENERATING = 'UPDATE_IS_SLIDESHOW_GENERATING',
  UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_ORDER_SELECTION = 'UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_ORDER_SELECTION',
  UPDATE_LEATHER_TRIBUTE_SHIPPING_METHOD = 'UPDATE_LEATHER_TRIBUTE_SHIPPING_METHOD',
  UPDATE_PHOTO_BOOK_ORDER_SELECTION = 'UPDATE_PHOTO_BOOK_ORDER_SELECTION',
  UPDATE_PHOTO_BOOK_SHIPPING_METHOD = 'UPDATE_PHOTO_BOOK_SHIPPING_METHOD',
  UPDATE_KEEPSAKES_SHIPPING_ADDRESS_DETAILS = 'UPDATE_KEEPSAKES_SHIPPING_ADDRESS_DETAILS',
  UPDATE_PHOTO_BOOK_SHIPPING_ADDRESS_DETAILS = 'UPDATE_PHOTO_BOOK_SHIPPING_ADDRESS_DETAILS',
  UPDATE_PRINTING_ADDRESS_DETAILS = 'UPDATE_PRINTING_ADDRESS_DETAILS',
  UPDATE_BILLING_ADDRESS_DETAILS = 'UPDATE_BILLING_ADDRESS_DETAILS',
  UPDATE_PAYMENT_DETAILS = 'UPDATE_PAYMENT_DETAILS',
  UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_DETAILS = 'UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_DETAILS',
  UPDATE_PHOTO_BOOK_DETAILS = 'UPDATE_PHOTO_BOOK_DETAILS',
  UPDATE_PRINTING_DETAILS = 'UPDATE_PRINTING_DETAILS',
  SAVE_TEMPORARY_CHECKOUT_STATE = 'SAVE_TEMPORARY_CHECKOUT_STATE',
  RESTORE_TEMPORARY_CHECKOUT_STATE = 'RESTORE_TEMPORARY_CHECKOUT_STATE',
}

export const EULOGISE_PRINTING_PRODUCT_PAGE_PER_MAPS: Record<
  EulogiseProduct,
  string
> = {
  [EulogiseProduct.BOOKLET]: 'booklet',
  [EulogiseProduct.BOOKMARK]: 'bookmark',
  [EulogiseProduct.SIDED_CARD]: 'sided card',
  [EulogiseProduct.SLIDESHOW]: 'slideshow',
  [EulogiseProduct.THANK_YOU_CARD]: 'thank you card',
  [EulogiseProduct.TV_WELCOME_SCREEN]: 'tv screen',
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'slideshow title slide',
  [EulogiseProduct.PHOTOBOOK]: 'photobook',
  [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'generic card product',
  [EulogiseProduct.ALL]: 'N/A',
}

export const EULOGISE_TRIBUTES_FOR_DOWNLOAD_TEXT: Record<
  EulogiseProduct,
  string
> = {
  [EulogiseProduct.BOOKLET]: `${EulogiseProductDownloadProductName.BOOKLET} - pdf`,
  [EulogiseProduct.BOOKMARK]: `${EulogiseProductDownloadProductName.BOOKMARK} - pdf`,
  [EulogiseProduct.SIDED_CARD]: `${EulogiseProductDownloadProductName.SIDED_CARD} - pdf`,
  [EulogiseProduct.SLIDESHOW]: `${EulogiseProductDownloadProductName.SLIDESHOW} - mp4`,
  [EulogiseProduct.THANK_YOU_CARD]: `${EulogiseProductDownloadProductName.THANK_YOU_CARD} - pdf`,
  [EulogiseProduct.TV_WELCOME_SCREEN]: `${EulogiseProductDownloadProductName.TV_WELCOME_SCREEN} - jpg`,
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: `${EulogiseProductDownloadProductName.SLIDESHOW_TITLE_SLIDE} - jpg`,
  [EulogiseProduct.PHOTOBOOK]: `${EulogiseProductDownloadProductName.PHOTOBOOK} - pdf`,
  [EulogiseProduct.GENERIC_CARD_PRODUCT]: `${EulogiseProductDownloadProductName.GENERIC_CARD_PRODUCT} - pdf`,
  [EulogiseProduct.ALL]: '',
}

export interface IPhotoBookCheckoutData {
  option: EulogisePhotoBookCheckoutOptions | null
  shippingMethod: CHECKOUTS_SHIPPING_METHOD
  metaData: IPhotoBookMetaData
  shippingAddressDetails: IAddressDetails
}

export enum EulogisePhotoBookCheckoutOptions {
  ORDER_PHOTO_BOOK = 'ORDER_PHOTO_BOOK',
  SKIP_PHOTO_BOOK = 'SKIP_PHOTO_BOOK',
}

const ValidPhotobookCheckoutSizes = {
  CLASSIC_MEDIUM: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
  CLASSIC_LARGE: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
  PREMIUM_MEDIUM: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  PREMIUM_LARGE: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
} as const

export type ValidPhotobookCheckoutSize =
  (typeof ValidPhotobookCheckoutSizes)[keyof typeof ValidPhotobookCheckoutSizes]
export interface IPhotoBookMetaData {
  bookStyle: {
    style: PhotobookBookStyle | null
    size: ValidPhotobookCheckoutSize | null
    numberOfPages: number
  }
  coverStyle: {
    design: string | null
    coverMaterial: EulogisePhotobookCoverType | null
  }
  copyAmount: number
}

export interface ILeatherVideoTributeBookData {
  option: EulogiseLeatherVideoTributeBookOptions | null
  shippingMethod: CHECKOUTS_SHIPPING_METHOD
  metaData: ILeatherVideoTributeBookMetaData
  shippingAddressDetails: IAddressDetails
}

export interface ILeatherVideoTributeBookMetaData {
  material: LeatherVideoTributeMaterial | null
  color: LeatherVideoTributeMaterialColor | null
  copyAmount: number
}

export enum LeatherVideoTributeMaterial {
  LEATHER = 'leather',
}

export enum LeatherVideoTributeMaterialColor {
  BLACK = 'Black',
  WHITE = 'White',
}

export enum EulogiseLeatherVideoTributeBookOptions {
  ORDER_LEATHER_VIDEO_TRIBUTE_BOOK = 'ORDER_LEATHER_VIDEO_TRIBUTE_BOOK',
  SKIP_LEATHER_VIDEO_TRIBUTE_BOOK = 'SKIP_LEATHER_VIDEO_TRIBUTE_BOOK',
}

export interface ITributesForDeliveryProductsMetaData {
  product: EulogiseProduct
  metaData: IPrintingProductDetails
}

export interface IPrintingProductDetails {
  isProductOrderedForPrinting: boolean
  productPageAmount: number
  paperType: EulogizePrintingProductsPaperTypes | null
  copiesAmount: number
}

export interface IKeepsakesDetails {
  leatherVideoTributeBook: ILeatherVideoTributeBookData
  photoBook: IPhotoBookCheckoutData
}

export interface ICheckoutsState {
  packageOption: EulogisePackageOptions | null
  isComingFromPaymentPage: boolean
  willOpenThemeDrawer: boolean
  isSlideshowGenerating: boolean
  keepsakesDetails: IKeepsakesDetails
  billingAddressDetails: IAddressDetails
  paymentDetails: IPaymentDetails
  printingDetails: IPrintingDetails
  isPrintingOptionDrawerOpened: boolean
  isKeepsakesDrawerOpened: boolean
  isReviewDesignDrawerOpened: boolean
  reviewDesignDrawerActiveProduct: EulogiseCardProducts | null
  printingOptionDrawerActiveProduct?: EulogiseCardProducts | null
  keepsakesDrawerActiveProduct?: KEEPSAKE_PRODUCTS | null
  pendingKeepsakesDrawerProduct?: KEEPSAKE_PRODUCTS | null
  temporaryCheckoutState?: Partial<ICheckoutsState> | null
}

export interface ICheckoutsStateAction {
  type: CheckoutsActionTypes
  payload?: ICheckoutsStateActionPayload
}

export interface ICheckoutsStateActionPayload {
  packageOption?: EulogisePackageOptions
  product?: EulogiseProduct
  paperType?: EulogizePrintingProductsPaperTypes
  copiesAmount?: number
  isComingFromPaymentPage?: boolean
  willOpenThemeDrawer?: boolean
  isPrintingOptionDrawerOpened?: boolean
  printingOptionDrawerActiveProduct?: EulogiseCardProducts | null
  isReviewDesignDrawerOpened?: boolean
  reviewDesignDrawerActiveProduct?: EulogiseCardProducts | null
  isKeepsakesDrawerOpened?: boolean
  keepsakesDrawerActiveProduct?: KEEPSAKE_PRODUCTS | null
  pendingKeepsakesDrawerProduct?: KEEPSAKE_PRODUCTS | null
  isSlideshowGenerating?: boolean
  leatherVideoTributeBookOrderSelection?: EulogiseLeatherVideoTributeBookOptions | null
  photoBookOrderSelection?: EulogisePhotoBookCheckoutOptions | null
  shippingMethod?: CHECKOUTS_SHIPPING_METHOD
  shippingProduct?: typeof CHECKOUTS_SHIPPING_PRODUCTS
  keepsakesShippingAddressDetails?: IAddressDetails
  photoBookShippingAddressDetails?: IAddressDetails
  billingAddressDetails?: IAddressDetails
  paymentDetails?: IPaymentDetails
  leatherVideoTributeBookDetails?: ILeatherVideoTributeBookMetaData
  photoBookDetails?: IPhotoBookMetaData
  printingDetails?: IPrintingDetails
  printingAddressDetails?: IAddressDetails
  temporaryCheckoutState?: Partial<ICheckoutsState> | null
}

export enum KEEPSAKES_ALLOWING_PURCHASE_KEY {
  VIDEO_BOOKS = 'videoBooks',
  PRINTING = 'printing',
  PHOTO_BOOKS = 'photoBooks',
}

export interface ICheckoutPackage {
  type: EulogisePackageOptionTypes
  title: string
  value: EulogisePackageOptions
  packageProducts: EulogiseProduct[]
  appliedCountries: EulogiseCountry[]
  isKeepsake: boolean
  allowPurchsingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY | null
  displayInPackagePage: boolean
}

export enum CHECKOUTS_SHIPPING_METHOD {
  NO_SHIPPING = 'NO_SHIPPING',
  FREE_SHIPPING = 'FREE_SHIPPING',
  EXPRESS_SHIPPING = 'EXPRESS_SHIPPING',
  STANDARD_SHIPPING = 'STANDARD_SHIPPING',
  PRIORITY_SHIPPING = 'PRIORITY_SHIPPING',
  PHOTO_BOOK_MEDIUM_SIZE_SHIPPING = 'PHOTO_BOOK_MEDIUM_SIZE_SHIPPING',
  PHOTO_BOOK_LARGE_SIZE_SHIPPING = 'PHOTO_BOOK_LARGE_SIZE_SHIPPING',
}

export enum CHECKOUT_PAYMENT_METHODS {
  CREDIT_DEBIT_CARD = 'CREDIT_DEBIT_CARD',
  PAYPAL = 'PAYPAL',
}

export enum CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD {
  PRINTING_ORDERED = 'PRINTING_ORDERED',
  NO_PRINTING_ORDERED = 'NO_PRINTING_ORDERED',
}

export enum KEEPSAKE_PRODUCTS {
  VIDEO_BOOKS = 'VIDEO_BOOKS',
  PHOTO_BOOKS = 'PHOTO_BOOKS',
  PERSONALISED_USB = 'PERSONALISED_USB',
  PHOTO_PRINT_BOXES = 'PHOTO_PRINT_BOXES',
  REGISTER_SIGNING_BOOKS = 'REGISTER_SIGNING_BOOKS',
  PRAYER_CARDS = 'PRAYER_CARDS',
  TRIBUTE_CANDLES = 'TRIBUTE_CANDLES',
}

export const KEEPSAKE_PRODUCTS_DISPLAY_NAMES: Record<
  KEEPSAKE_PRODUCTS,
  string
> = {
  [KEEPSAKE_PRODUCTS.VIDEO_BOOKS]: 'Video Book',
  [KEEPSAKE_PRODUCTS.PHOTO_BOOKS]: 'Photo Book',
  [KEEPSAKE_PRODUCTS.PERSONALISED_USB]: 'Personalised USB',
  [KEEPSAKE_PRODUCTS.PHOTO_PRINT_BOXES]: 'Photo Print Boxes',
  [KEEPSAKE_PRODUCTS.REGISTER_SIGNING_BOOKS]: 'Register Signing Books',
  [KEEPSAKE_PRODUCTS.PRAYER_CARDS]: 'Prayer Cards',
  [KEEPSAKE_PRODUCTS.TRIBUTE_CANDLES]: 'Tributes Candles',
}

export const CHECKOUTS_SHIPPING_PRODUCTS = {
  [KEEPSAKE_PRODUCTS.VIDEO_BOOKS]: 'Video Book',
  [KEEPSAKE_PRODUCTS.PHOTO_BOOKS]: 'Photo Book',
  PRINTED_TRIBUTES: 'Printed Tributes',
}

export const CHECKOUTS_SHIPPING_PRODUCTS_ORDER_SUMMARY_NAMES = {
  [CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS]]: 'Video Book',
  [CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS]]: 'Photo Books',
  [CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES]: 'Printing',
}

export const EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS = {
  [KEEPSAKE_PRODUCTS.VIDEO_BOOKS]: [
    {
      isShipping: false,
      value: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
      displayName: 'N/A',
      transitTimeText: 'N/A',
      availablePackageOptions: [],
    },
    {
      isShipping: true,
      value: CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING,
      displayName: 'Standard shipping',
      transitTimeText: '7 - 12 business days - production & delivery',
      availablePackageOptions: [
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
      ],
    },
    {
      isShipping: true,
      value: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
      displayName: 'Express shipping',
      transitTimeText: '3 - 6 business days - production & delivery',
      availablePackageOptions: [
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
      ],
    },
  ],
  [KEEPSAKE_PRODUCTS.PHOTO_BOOKS]: [
    {
      isShipping: false,
      value: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
      displayName: 'N/A',
      transitTimeText: 'N/A',
      availablePackageOptions: [],
    },
    {
      isShipping: true,
      value: CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING,
      displayName: 'Express shipping',
      transitTimeText: '10 - 18 business days - production & delivery',
      availablePackageOptions: [
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
        EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ],
    },
    {
      isShipping: true,
      value: CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING,
      displayName: 'Express shipping',
      transitTimeText: '17 - 25 business days - production & delivery',
      availablePackageOptions: [
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
        EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      ],
    },
  ],
}

export const EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS = [
  {
    isShipping: false,
    value: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
    displayName: 'N/A',
    transitTimeText: 'N/A',
    availablePackageOptions: [],
  },
  {
    isShipping: true,
    value: CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING,
    displayName: 'Free shipping',
    transitTimeText: '5 - 7 business days - printing & delivery',
    availablePackageOptions: [
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ],
  },
  {
    isShipping: true,
    value: CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING,
    displayName: 'Priority shipping',
    transitTimeText: '4 - 6 business days - printing & delivery',
    availablePackageOptions: [
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ],
  },
  {
    isShipping: true,
    value: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
    displayName: 'Express shipping',
    transitTimeText: '2 - 4 business days - printing & delivery',
    availablePackageOptions: [
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ],
  },
]

export const EULOGIZE_PRINTING_DELIVERY_AVAILABILITY = [
  {
    value: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
    title: `Yes, I'm ready to order printing`,
    subTitle: null,
  },
  {
    value: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED,
    title: `No, just the download files`,
    subTitle:
      'You can return to purchase printing at a later date, if you change your mind',
  },
]

export const EULOGIZE_CHECKOUT_PACKAGE_OPTION: Array<ICheckoutPackage> = [
  {
    type: EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
    title: 'All Tributes Bundle',
    value: EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    packageProducts: [
      EulogiseProduct.SLIDESHOW,
      EulogiseProduct.TV_WELCOME_SCREEN,
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
    title: 'Video Slideshow & Welcome Screen Only',
    value: EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
    packageProducts: [
      EulogiseProduct.SLIDESHOW,
      EulogiseProduct.TV_WELCOME_SCREEN,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
    title: 'Printable Tributes Only',
    value: EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
    packageProducts: [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
    title: 'Printable Tributes Only',
    value: EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
    packageProducts: [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ],
    appliedCountries: [...EulogizeShippingAvailableCountries],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.UPGRADE_CHECKOUT_PACKAGE,
    title: 'Video and Screen Tribtues',
    value: EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
    packageProducts: [
      EulogiseProduct.SLIDESHOW,
      EulogiseProduct.TV_WELCOME_SCREEN,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.UPGRADE_CHECKOUT_PACKAGE,
    title: 'Printing & Delivery',
    value: EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
    packageProducts: [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.UPGRADE_CHECKOUT_PACKAGE,
    title: 'Printing & Delivery',
    value: EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
    packageProducts: [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ],
    appliedCountries: [
      ...EulogizeShippingAvailableCountries,
      ...EulogizeNonShippingAvailableCountries,
    ],
    isKeepsake: false,
    allowPurchsingKey: null,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.KEEPSAKES,
    title: 'Add leather video book',
    value: EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
    packageProducts: [],
    appliedCountries: EulogizeShippingAvailableCountries,
    isKeepsake: true,
    allowPurchsingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.VIDEO_BOOKS,
    displayInPackagePage: false,
  },
  {
    type: EulogisePackageOptionTypes.KEEPSAKES,
    title: 'Premium Photobook',
    value: EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
    packageProducts: [],
    appliedCountries: EulogizeShippingAvailableCountries,
    isKeepsake: true,
    allowPurchsingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS,
    displayInPackagePage: true,
  },
  {
    type: EulogisePackageOptionTypes.KEEPSAKES,
    title: 'Printing & Delivery',
    value: EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    packageProducts: [],
    appliedCountries: EulogizeShippingAvailableCountries,
    isKeepsake: true,
    allowPurchsingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.PRINTING,
    displayInPackagePage: true,
  },
]

export const GooglePlaceAPIRegionCode: Record<EulogiseCountry, string> = {
  [EulogiseCountry.AUSTRALIA]: 'AU',
  [EulogiseCountry.UNITED_STATES]: 'US',
  [EulogiseCountry.CANADA]: 'CA',
  [EulogiseCountry.EUROPEAN_UNION]: 'N/A',
  [EulogiseCountry.UNITED_KINGDOM]: 'N/A',
  [EulogiseCountry.CHILE]: 'N/A',
  [EulogiseCountry.COLOMBIA]: 'N/A',
  [EulogiseCountry.COSTA_RICA]: 'N/A',
  [EulogiseCountry.MEXICO]: 'N/A',
  [EulogiseCountry.NEW_ZEALAND]: 'N/A',
  [EulogiseCountry.PANAMA]: 'N/A',
  [EulogiseCountry.GUATEMALA]: 'N/A',
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: 'N/A',
  [EulogiseCountry.THE_PHILIPPINES]: 'N/A',
  [EulogiseCountry.REST_OF_THE_WOLRD]: 'N/A',
}

export const EULOGIZE_SHIPPING_FEE_MATRIX: ShippingFeeMatrix = {
  [CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS]]: {
    [EulogiseCountry.AUSTRALIA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]: 9.99,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 19.99,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
    [EulogiseCountry.UNITED_STATES]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]: 9.99,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 19.99,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
    [EulogiseCountry.CANADA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]: 9.99,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 19.99,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
  },
  [CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS]]: {
    [EulogiseCountry.AUSTRALIA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]: 22.99,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]: 24.99,
    },
    [EulogiseCountry.UNITED_STATES]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]: 22.99,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]: 24.99,
    },
    [EulogiseCountry.CANADA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]: 22.99,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]: 24.99,
    },
  },
  [CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES]: {
    [EulogiseCountry.AUSTRALIA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]: 15.95,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 31.95,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
    [EulogiseCountry.UNITED_STATES]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]: 15.95,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 31.95,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
    [EulogiseCountry.CANADA]: {
      [CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.FREE_SHIPPING]: 0,
      [CHECKOUTS_SHIPPING_METHOD.PRIORITY_SHIPPING]: 15.95,
      [CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING]: 31.95,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
      [CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING]:
        NON_APPLICTABLE_SHIPPING_PRICE,
    },
  },
}

export const EULOGIZE_CHECKOUT_PACKAGE_OPTION_DISCOUNT_SALE_TEXT =
  'January Sale'

export const EULOGIZE_CHECKOUT_GOOGLE_AUTO_COMPLETE_COUNTRY_RESTRICTION_CODE: Record<
  EulogiseCountry,
  string | null
> = {
  [EulogiseCountry.AUSTRALIA]: 'au',
  [EulogiseCountry.UNITED_STATES]: 'us',
  [EulogiseCountry.EUROPEAN_UNION]: null,
  [EulogiseCountry.UNITED_KINGDOM]: 'uk',
  [EulogiseCountry.CHILE]: 'cl',
  [EulogiseCountry.COLOMBIA]: 'co',
  [EulogiseCountry.COSTA_RICA]: 'cr',
  [EulogiseCountry.MEXICO]: 'mx',
  [EulogiseCountry.NEW_ZEALAND]: 'nz',
  [EulogiseCountry.PANAMA]: 'pa',
  [EulogiseCountry.GUATEMALA]: 'gt',
  [EulogiseCountry.THE_DOMINICAN_REPUBLIC]: 'do',
  [EulogiseCountry.THE_PHILIPPINES]: 'ph',
  [EulogiseCountry.CANADA]: 'ca',
  [EulogiseCountry.REST_OF_THE_WOLRD]: null,
}
export enum EulogizePrintingProductDisplayNames {
  BOOKLET = 'Folded Funeral Programs',
  BOOKLET_US = 'Folded Funeral Programs',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SIDED_CARD = 'Funeral Service Card',
  SIDED_CARD_US = 'Funeral Service Card',
  THANK_YOU_CARD = 'Funeral Thank You Cards',
  BOOKMARK = 'Remberance Bookmarks',
  TV_WELCOME_SCREEN = 'N/A',
  SLIDESHOW_TITLE_SLIDE = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductDisplaySizesUS {
  BOOKLET = '5.5 x 8.5" - (Open 8.5x11")',
  BOOKLET_US = '5.5 x 8.5" - (Open 8.5x11")',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SIDED_CARD = '5.5 x 8.5" - Double Sided',
  SIDED_CARD_US = '5.5 x 8.5" - Double Sided',
  THANK_YOU_CARD = '4.125 x 5.81" - Single Sided',
  BOOKMARK = '2.25 x 9.75" - Double Sided',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductDisplaySizesAU {
  BOOKLET = 'A5 - (Open A4)',
  BOOKLET_US = 'A5 - (Open A4)',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SIDED_CARD = 'A5 - Double Sided',
  SIDED_CARD_US = 'A5 - Double Sided',
  THANK_YOU_CARD = 'A6 - Single Sided',
  BOOKMARK = '5.7 x 25cm - Double Sided',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductOrderSummaryDisplaySizesUS {
  BOOKLET = '5.5 x 8.5"',
  BOOKLET_US = '5.5 x 8.5"',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SLIDESHOW_TITLE_SLIDE = 'N/A',
  SIDED_CARD = '5.5 x 8.5"',
  SIDED_CARD_US = '5.5 x 8.5"',
  THANK_YOU_CARD = '4.125 x 5.81',
  BOOKMARK = '2.25 x 9.75"',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductOrderSummaryDisplaySizesAU {
  BOOKLET = 'A5',
  BOOKLET_US = 'A5',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SLIDESHOW_TITLE_SLIDE = 'N/A',
  SIDED_CARD = 'A5',
  SIDED_CARD_US = 'A5',
  THANK_YOU_CARD = 'A6',
  BOOKMARK = '5.7 x 25cm',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductDisplaySideInformationUS {
  BOOKLET = 'N/A',
  BOOKLET_US = 'N/A',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SLIDESHOW_TITLE_SLIDE = 'N/A',
  SIDED_CARD = 'double - sided',
  SIDED_CARD_US = 'double - sided',
  THANK_YOU_CARD = 'single - sided',
  BOOKMARK = 'double - sided',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export enum EulogizePrintingProductDisplaySideInformationAU {
  BOOKLET = 'N/A',
  BOOKLET_US = 'N/A',
  PHOTOBOOK = 'N/A',
  SLIDESHOW = 'N/A',
  SLIDESHOW_TITLE_SLIDE = 'N/A',
  SIDED_CARD = 'double - sided',
  SIDED_CARD_US = 'double - sided',
  THANK_YOU_CARD = 'single - sided',
  BOOKMARK = 'double - sided',
  TV_WELCOME_SCREEN = 'N/A',
  ALL = 'N/A',
}

export const EulogizePrintingDetailsOrderedProductsDetailsInitialState = {
  [EulogiseProduct.BOOKLET]: {
    isProductOrderedForPrinting: false,
    productPageAmount: 0,
    paperType: null,
    copiesAmount: 0,
  },
  [EulogiseProduct.BOOKMARK]: {
    isProductOrderedForPrinting: false,
    productPageAmount: 0,
    paperType: null,
    copiesAmount: 0,
  },
  [EulogiseProduct.SIDED_CARD]: {
    isProductOrderedForPrinting: false,
    productPageAmount: 0,
    paperType: null,
    copiesAmount: 0,
  },
  [EulogiseProduct.THANK_YOU_CARD]: {
    isProductOrderedForPrinting: false,
    productPageAmount: 0,
    paperType: null,
    copiesAmount: 0,
  },
}

export const EULOGISE_PRINTING_PRODUCT_DISPLAYABLE_MEMORIAL_VISUAL_STATUS = [
  MemorialVisualStatus.EDITED,
  MemorialVisualStatus.COMPLETE,
  MemorialVisualStatus.DOWNLOAD,
]

export interface OrderSummaryShippingProductDetailsSummary {
  shippingProduct: (typeof CHECKOUTS_SHIPPING_PRODUCTS)[keyof typeof CHECKOUTS_SHIPPING_PRODUCTS]
  shippingMethod: CHECKOUTS_SHIPPING_METHOD
  shippingFee: number
}

export interface OrderSummaryPrintingProductDetailsSummary
  extends IPrintingProductDetails {
  printingProduct: EulogiseCardProducts
}

export const EULOGISE_PRINTING_AVAILABLE_PRODUCTS = [
  EulogiseCardProducts.BOOKLET,
  EulogiseCardProducts.SIDED_CARD,
  EulogiseCardProducts.PHOTOBOOK,
]

// TODO: deprecate this
export interface IKeepsakesDefinition {
  thumbnailSrc: string
  title: string
  description: string
  isDescriptionClickable: boolean
  onViewProduct: Function
  allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY
}

export interface IKeepsakesMementosDetails {
  product: KEEPSAKE_PRODUCTS
  thumbnailSrc: string
  displayName: string
  isAvailable: boolean
  shouldShowInKeepsakesStore: boolean
}

export const ICheckoutEntrySource: Record<EulogiseProduct, string> = {
  [EulogiseProduct.BOOKLET]: 'booklet',
  [EulogiseProduct.BOOKMARK]: 'bookmark',
  [EulogiseProduct.SIDED_CARD]: 'sided-card',
  [EulogiseProduct.PHOTOBOOK]: 'photobook',
  [EulogiseProduct.THANK_YOU_CARD]: 'thank-you-card',
  [EulogiseProduct.TV_WELCOME_SCREEN]: 'tv-welcome-screen',
  [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'slideshow-title-slide',
  [EulogiseProduct.SLIDESHOW]: 'slideshow',
  [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'generic-card-product',
  [EulogiseProduct.ALL]: 'null',
}

export enum CheckoutProductPreviewType {
  FRONT_AND_LAST = 'front_and_last',
  FRONT_AND_LAST_WITH_INTERNALS = 'front_and_last_with_internals',
  FRONT_AND_THIRD = 'front_and_third',
}

export const KEEPSAKES_PRODUCTS_DETAILS: Array<IKeepsakesMementosDetails> = [
  {
    product: KEEPSAKE_PRODUCTS.VIDEO_BOOKS,
    displayName: 'Video Books',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/video_motion_books.avif`,
    isAvailable: true,
    shouldShowInKeepsakesStore: true,
  },
  {
    product: KEEPSAKE_PRODUCTS.PHOTO_BOOKS,
    displayName: 'Printed Photo Albums',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/photo-books-3.avif`,
    isAvailable: true,
    shouldShowInKeepsakesStore: true,
  },
  {
    product: KEEPSAKE_PRODUCTS.PERSONALISED_USB,
    displayName: 'Personalized USBs',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/personalized_usbs.png`,
    isAvailable: false,
    shouldShowInKeepsakesStore: false,
  },
  {
    product: KEEPSAKE_PRODUCTS.PHOTO_PRINT_BOXES,
    displayName: 'Photo Printed & Boxes',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/photo_print_boxes.png`,
    isAvailable: false,
    shouldShowInKeepsakesStore: false,
  },
  {
    product: KEEPSAKE_PRODUCTS.REGISTER_SIGNING_BOOKS,
    displayName: 'Register & Signing Books',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/register_signing_books.png`,
    isAvailable: false,
    shouldShowInKeepsakesStore: false,
  },
  {
    product: KEEPSAKE_PRODUCTS.PRAYER_CARDS,
    displayName: 'Prayer Cards',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/prayer_cards.png`,
    isAvailable: false,
    shouldShowInKeepsakesStore: false,
  },
  {
    product: KEEPSAKE_PRODUCTS.TRIBUTE_CANDLES,
    displayName: 'Tribute Candles',
    thumbnailSrc: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/keepsakes/video_motion_books.avif`,
    isAvailable: false,
    shouldShowInKeepsakesStore: false,
  },
]
