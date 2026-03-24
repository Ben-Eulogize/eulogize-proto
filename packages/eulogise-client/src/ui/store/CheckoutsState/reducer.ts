import {
  ICheckoutsState,
  ICheckoutsStateAction,
  CheckoutsActionTypes,
  LeatherVideoTributeMaterial,
  LeatherVideoTributeMaterialColor,
  EulogiseLeatherVideoTributeBookOptions,
  CHECKOUTS_SHIPPING_METHOD,
  ADDRESS_INPUT_MODE,
  CHECKOUT_PAYMENT_METHODS,
  EulogizePrintingDetailsOrderedProductsDetailsInitialState,
  EulogisePhotoBookCheckoutOptions,
} from '@eulogise/core'

const initialState: ICheckoutsState = {
  packageOption: null,
  isComingFromPaymentPage: false,
  willOpenThemeDrawer: false,
  isSlideshowGenerating: false,
  keepsakesDetails: {
    leatherVideoTributeBook: {
      option: null,
      metaData: {
        material: null,
        color: null,
        copyAmount: 0,
      },
      shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
      shippingAddressDetails: {
        formattedAddress: null,
        isValidAddress: false,
        portalAddressMetaData: null,
        addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
      },
    },
    photoBook: {
      option: null,
      shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
      metaData: {
        bookStyle: {
          style: null,
          size: null,
          numberOfPages: 0,
        },
        coverStyle: {
          design: null,
          coverMaterial: null,
        },
        copyAmount: 0,
      },
      shippingAddressDetails: {
        formattedAddress: null,
        isValidAddress: false,
        portalAddressMetaData: null,
        addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
      },
    },
  },
  billingAddressDetails: {
    formattedAddress: null,
    addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
  },
  // @ts-ignore
  paymentDetails: {
    method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
  },
  printingDetails: {
    printingMethod: null,
    orderedProductsDetails:
      EulogizePrintingDetailsOrderedProductsDetailsInitialState,
    printingAddressDetails: {
      formattedAddress: null,
      isValidAddress: false,
      portalAddressMetaData: null,
      addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
    },
    printingShippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
  },
  isPrintingOptionDrawerOpened: false,
  printingOptionDrawerActiveProduct: null,
  isReviewDesignDrawerOpened: false,
  reviewDesignDrawerActiveProduct: null,
  isKeepsakesDrawerOpened: false,
  keepsakesDrawerActiveProduct: null,
  pendingKeepsakesDrawerProduct: null,
}

export const CheckoutsReducer = (
  state: ICheckoutsState = initialState,
  action: ICheckoutsStateAction,
): ICheckoutsState => {
  switch (action.type) {
    case CheckoutsActionTypes.UPDATE_PAYMENT_OPTION: {
      const { packageOption } = action.payload!
      return {
        ...state,
        packageOption: packageOption!,
      }
    }
    case CheckoutsActionTypes.UPDATE_WILL_OPEN_THEME_DRAWER: {
      const { willOpenThemeDrawer } = action.payload!
      return {
        ...state,
        willOpenThemeDrawer: willOpenThemeDrawer!,
      }
    }
    case CheckoutsActionTypes.UPDATE_IS_PRINTING_OPTION_DRAWER_OPENED: {
      const {
        isPrintingOptionDrawerOpened,
        printingOptionDrawerActiveProduct,
      } = action.payload!
      return {
        ...state,
        isPrintingOptionDrawerOpened: isPrintingOptionDrawerOpened!,
        printingOptionDrawerActiveProduct,
      }
    }
    case CheckoutsActionTypes.UPDATE_IS_REVIEW_DESIGN_DRAWER_OPENED: {
      const { isReviewDesignDrawerOpened, reviewDesignDrawerActiveProduct } =
        action.payload!
      return {
        ...state,
        isReviewDesignDrawerOpened: isReviewDesignDrawerOpened!,
        reviewDesignDrawerActiveProduct,
      }
    }
    case CheckoutsActionTypes.UPDATE_IS_KEEPSAKES_DRAWER_OPENED: {
      const { isKeepsakesDrawerOpened, keepsakesDrawerActiveProduct } =
        action.payload!
      return {
        ...state,
        isKeepsakesDrawerOpened: isKeepsakesDrawerOpened!,
        keepsakesDrawerActiveProduct,
      }
    }
    case CheckoutsActionTypes.UPDATE_PENDING_KEEPSAKES_DRAWER_PRODUCT: {
      const { pendingKeepsakesDrawerProduct = null } = action.payload!
      return {
        ...state,
        pendingKeepsakesDrawerProduct,
      }
    }
    case CheckoutsActionTypes.RESTORE_CHECKOUT_INITIAL_STATE: {
      return initialState
    }
    case CheckoutsActionTypes.UPDATE_IS_SLIDESHOW_GENERATING: {
      const { isSlideshowGenerating } = action.payload!
      return {
        ...state,
        isSlideshowGenerating: isSlideshowGenerating!,
      }
    }
    case CheckoutsActionTypes.UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_ORDER_SELECTION: {
      const { leatherVideoTributeBookOrderSelection = null } = action.payload!
      if (
        leatherVideoTributeBookOrderSelection ===
        EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK
      ) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            leatherVideoTributeBook: {
              ...state.keepsakesDetails.leatherVideoTributeBook,
              option:
                EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
              metaData: {
                ...state.keepsakesDetails.leatherVideoTributeBook.metaData,
                material: LeatherVideoTributeMaterial.LEATHER,
                color: LeatherVideoTributeMaterialColor.WHITE,
                copyAmount: 1,
              },
            },
          },
        }
      } else {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            leatherVideoTributeBook: {
              ...initialState.keepsakesDetails.leatherVideoTributeBook,
              metaData: {
                ...initialState.keepsakesDetails.leatherVideoTributeBook
                  .metaData,
              },
              option: leatherVideoTributeBookOrderSelection,
            },
          },
        }
      }
    }
    case CheckoutsActionTypes.UPDATE_PHOTO_BOOK_ORDER_SELECTION: {
      const { photoBookOrderSelection = null } = action.payload!
      if (
        photoBookOrderSelection ===
        EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK
      ) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            photoBook: {
              ...state.keepsakesDetails.photoBook,
              option: photoBookOrderSelection,
            },
          },
        }
      } else {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            photoBook: initialState.keepsakesDetails.photoBook,
          },
        }
      }
    }
    case CheckoutsActionTypes.UPDATE_LEATHER_TRIBUTE_SHIPPING_METHOD: {
      const { shippingMethod } = action.payload!
      if (shippingMethod) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            leatherVideoTributeBook: {
              ...state.keepsakesDetails.leatherVideoTributeBook,
              shippingMethod,
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PHOTO_BOOK_SHIPPING_METHOD: {
      const { shippingMethod } = action.payload!
      if (shippingMethod) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            photoBook: {
              ...state.keepsakesDetails.photoBook,
              shippingMethod,
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_KEEPSAKES_SHIPPING_ADDRESS_DETAILS: {
      const { keepsakesShippingAddressDetails } = action.payload!
      if (keepsakesShippingAddressDetails) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            leatherVideoTributeBook: {
              ...state.keepsakesDetails.leatherVideoTributeBook,
              shippingAddressDetails: keepsakesShippingAddressDetails,
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PHOTO_BOOK_SHIPPING_ADDRESS_DETAILS: {
      const { photoBookShippingAddressDetails } = action.payload!
      if (photoBookShippingAddressDetails) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            photoBook: {
              ...state.keepsakesDetails.photoBook,
              shippingAddressDetails: photoBookShippingAddressDetails,
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_BILLING_ADDRESS_DETAILS: {
      const { billingAddressDetails } = action.payload!
      if (billingAddressDetails) {
        return {
          ...state,
          billingAddressDetails,
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PRINTING_ADDRESS_DETAILS: {
      const { printingAddressDetails } = action.payload!
      if (printingAddressDetails) {
        return {
          ...state,
          printingDetails: {
            ...state.printingDetails,
            printingAddressDetails: printingAddressDetails,
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_LEATHER_VIDEO_TRIBUTE_BOOK_DETAILS: {
      const { leatherVideoTributeBookDetails } = action.payload!
      if (leatherVideoTributeBookDetails) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            leatherVideoTributeBook: {
              ...state.keepsakesDetails.leatherVideoTributeBook,
              metaData: {
                ...state.keepsakesDetails.leatherVideoTributeBook.metaData,
                ...leatherVideoTributeBookDetails,
              },
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PHOTO_BOOK_DETAILS: {
      const { photoBookDetails } = action.payload!
      if (photoBookDetails) {
        return {
          ...state,
          keepsakesDetails: {
            ...state.keepsakesDetails,
            photoBook: {
              ...state.keepsakesDetails.photoBook,
              metaData: {
                ...state.keepsakesDetails.photoBook.metaData,
                ...photoBookDetails,
              },
            },
          },
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PAYMENT_DETAILS: {
      const { paymentDetails } = action.payload!
      if (paymentDetails) {
        return {
          ...state,
          paymentDetails,
        }
      }
      return state
    }
    case CheckoutsActionTypes.UPDATE_PRINTING_DETAILS: {
      const { printingDetails } = action.payload!
      if (printingDetails) {
        return {
          ...state,
          printingDetails,
        }
      }
      return state
    }
    case CheckoutsActionTypes.SAVE_TEMPORARY_CHECKOUT_STATE: {
      const { temporaryCheckoutState } = action.payload!
      return {
        ...state,
        temporaryCheckoutState,
      }
    }
    case CheckoutsActionTypes.RESTORE_TEMPORARY_CHECKOUT_STATE: {
      if (state.temporaryCheckoutState) {
        return {
          ...state,
          ...state.temporaryCheckoutState,
          temporaryCheckoutState: null,
        }
      }
      return state
    }
    default:
      return state
  }
}

export const CheckoutsInitialState = initialState
