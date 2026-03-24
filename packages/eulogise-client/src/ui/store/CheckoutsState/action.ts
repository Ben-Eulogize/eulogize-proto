import {
  CHECKOUTS_SHIPPING_METHOD,
  CheckoutsActionTypes,
  EulogiseCardProducts,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePhotoBookCheckoutOptions,
  EulogiseProduct,
  EulogizePrintingProductsPaperTypes,
  IAddressDetails,
  ICheckoutsState,
  ILeatherVideoTributeBookMetaData,
  IPaymentDetails,
  IPhotoBookMetaData,
  IPrintingDetails,
  KEEPSAKE_PRODUCTS,
} from '@eulogise/core'

export const updatePaymentOption = (
  packageOption: EulogisePackageOptions | null,
) => ({
  type: CheckoutsActionTypes.UPDATE_PAYMENT_OPTION,
  payload: {
    packageOption,
  },
})

export const updateProductPaperType = (
  product: EulogiseProduct,
  paperType: EulogizePrintingProductsPaperTypes,
) => ({
  type: CheckoutsActionTypes.UPDATE_PRODUCT_PAPER_TYPE,
  payload: {
    product,
    paperType,
  },
})

export const updateProductCopiesAmount = (
  product: EulogiseProduct,
  copiesAmount: number,
) => ({
  type: CheckoutsActionTypes.UPDATE_PRODUCT_COPIES_AMOUNT,
  payload: {
    product,
    copiesAmount,
  },
})

export const updateIsComingFromPaymentPage = (
  isComingFromPaymentPage: boolean,
) => ({
  type: CheckoutsActionTypes.UPDATE_IS_COMING_FROM_PAYMENT_PAGE,
  payload: {
    isComingFromPaymentPage,
  },
})

export const updateWillOpenThemeDrawer = (willOpenThemeDrawer: boolean) => ({
  type: CheckoutsActionTypes.UPDATE_WILL_OPEN_THEME_DRAWER,
  payload: {
    willOpenThemeDrawer,
  },
})

export const updateIsPrintingOptionDrawerOpen = ({
  isPrintingOptionDrawerOpened,
  printingOptionDrawerActiveProduct,
}: {
  isPrintingOptionDrawerOpened: boolean
  printingOptionDrawerActiveProduct: EulogiseCardProducts | null
}) => ({
  type: CheckoutsActionTypes.UPDATE_IS_PRINTING_OPTION_DRAWER_OPENED,
  payload: {
    isPrintingOptionDrawerOpened,
    printingOptionDrawerActiveProduct,
  },
})

export const updateIsReviewDesignDrawerOpened = ({
  isReviewDesignDrawerOpened,
  reviewDesignDrawerActiveProduct,
}: {
  isReviewDesignDrawerOpened: boolean
  reviewDesignDrawerActiveProduct: EulogiseCardProducts | null
}) => ({
  type: CheckoutsActionTypes.UPDATE_IS_REVIEW_DESIGN_DRAWER_OPENED,
  payload: {
    isReviewDesignDrawerOpened,
    reviewDesignDrawerActiveProduct,
  },
})

export const updateIsKeepsakesDrawerOpened = ({
  isKeepsakesDrawerOpened,
  keepsakesDrawerActiveProduct,
}: {
  isKeepsakesDrawerOpened: boolean
  keepsakesDrawerActiveProduct: KEEPSAKE_PRODUCTS | null
}) => ({
  type: CheckoutsActionTypes.UPDATE_IS_KEEPSAKES_DRAWER_OPENED,
  payload: {
    isKeepsakesDrawerOpened,
    keepsakesDrawerActiveProduct,
  },
})

export const updatePendingKeepsakesDrawerProduct = (
  pendingKeepsakesDrawerProduct: KEEPSAKE_PRODUCTS | null,
) => ({
  type: CheckoutsActionTypes.UPDATE_PENDING_KEEPSAKES_DRAWER_PRODUCT,
  payload: {
    pendingKeepsakesDrawerProduct,
  },
})

export const updateIsSlideshowGenerating = (
  isSlideshowGenerating: boolean,
) => ({
  type: CheckoutsActionTypes.UPDATE_IS_SLIDESHOW_GENERATING,
  payload: {
    isSlideshowGenerating,
  },
})

export const updateLeatherVideoTributeBookOrderSelection = (
  leatherVideoTributeBookOrderSelection: EulogiseLeatherVideoTributeBookOptions,
) => ({
  type: CheckoutsActionTypes.UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_ORDER_SELECTION,
  payload: {
    leatherVideoTributeBookOrderSelection,
  },
})

export const updateLeatherVideoTributeBookShippingMethod = (
  shippingMethod: CHECKOUTS_SHIPPING_METHOD,
) => ({
  type: CheckoutsActionTypes.UPDATE_LEATHER_TRIBUTE_SHIPPING_METHOD,
  payload: {
    shippingMethod,
  },
})

export const updatePhotoBookOrderSelection = (
  photoBookOrderSelection: EulogisePhotoBookCheckoutOptions,
) => ({
  type: CheckoutsActionTypes.UPDATE_PHOTO_BOOK_ORDER_SELECTION,
  payload: {
    photoBookOrderSelection,
  },
})

export const updatePhotoBookShippingMethod = (
  shippingMethod: CHECKOUTS_SHIPPING_METHOD,
) => ({
  type: CheckoutsActionTypes.UPDATE_PHOTO_BOOK_SHIPPING_METHOD,
  payload: {
    shippingMethod,
  },
})

export const updatePhotoBookShippingAddressDetails = (
  photoBookShippingAddressDetails: IAddressDetails,
) => ({
  type: CheckoutsActionTypes.UPDATE_PHOTO_BOOK_SHIPPING_ADDRESS_DETAILS,
  payload: {
    photoBookShippingAddressDetails,
  },
})

export const updateKeepsakesShippingAddressDetails = (
  keepsakesShippingAddressDetails: IAddressDetails,
) => ({
  type: CheckoutsActionTypes.UPDATE_KEEPSAKES_SHIPPING_ADDRESS_DETAILS,
  payload: {
    keepsakesShippingAddressDetails,
  },
})

export const updatePrintingAddressDetails = (
  printingAddressDetails: IAddressDetails,
) => ({
  type: CheckoutsActionTypes.UPDATE_PRINTING_ADDRESS_DETAILS,
  payload: {
    printingAddressDetails,
  },
})

export const updateBillingAddressDetails = (
  billingAddressDetails: IAddressDetails,
) => ({
  type: CheckoutsActionTypes.UPDATE_BILLING_ADDRESS_DETAILS,
  payload: {
    billingAddressDetails,
  },
})

export const updatePaymentDetails = (paymentDetails: IPaymentDetails) => ({
  type: CheckoutsActionTypes.UPDATE_PAYMENT_DETAILS,
  payload: {
    paymentDetails,
  },
})

export const updatePhotoBookDetails = (
  photoBookDetails: IPhotoBookMetaData,
) => ({
  type: CheckoutsActionTypes.UPDATE_PHOTO_BOOK_DETAILS,
  payload: {
    photoBookDetails,
  },
})

export const updateLeatherVideoTributeBookDetails = (
  leatherVideoTributeBookDetails: ILeatherVideoTributeBookMetaData,
) => ({
  type: CheckoutsActionTypes.UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_DETAILS,
  payload: {
    leatherVideoTributeBookDetails,
  },
})

export const updatePrintingDetails = (printingDetails: IPrintingDetails) => ({
  type: CheckoutsActionTypes.UPDATE_PRINTING_DETAILS,
  payload: {
    printingDetails,
  },
})

export const restoreCheckoutsState = () => ({
  type: CheckoutsActionTypes.RESTORE_CHECKOUT_INITIAL_STATE,
  payload: {},
})

export const saveTemporaryCheckoutState = (
  temporaryCheckoutState: Partial<ICheckoutsState> | null,
) => ({
  type: CheckoutsActionTypes.SAVE_TEMPORARY_CHECKOUT_STATE,
  payload: {
    temporaryCheckoutState,
  },
})

export const restoreTemporaryCheckoutState = () => ({
  type: CheckoutsActionTypes.RESTORE_TEMPORARY_CHECKOUT_STATE,
  payload: {},
})
