import {
  ADDRESS_INPUT_MODE,
  CardProductPageSize,
  CHECKOUT_PAYMENT_METHODS,
  CHECKOUTS_SHIPPING_METHOD,
  EulogiseCountry,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePhotoBookCheckoutOptions,
  EulogisePhotobookCoverType,
  EulogizePrintingDetailsOrderedProductsDetailsInitialState,
  IInvoice,
  LeatherVideoTributeMaterial,
  LeatherVideoTributeMaterialColor,
  PhotobookBookStyle,
} from '@eulogise/core'

export const MOCK_INVOICE_1: IInvoice = {
  updatedAt: '2022-01-20T00:41:01.134Z',
  status: 'complete',
  createdAt: '2022-01-20T00:40:59.879Z',
  customer: 'customer-1',
  // @ts-ignore
  transactions: ['transaction-1'],
  details: {
    packageOption:
      EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
    country: EulogiseCountry.UNITED_STATES,
    orderSummary: {
      digitalDownloadFee: 69,
      leatherVideoTributeBookFee: 150,
      photoBookTributeFee: 0,
      shippingFee: 34,
      printingFee: 0,
      subtotalFee: 253,
    },
    paymentDetails: {
      method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
      cardHolderName: 'SW',
    },
    keepsakesDetails: {
      leatherVideoTributeBook: {
        option:
          EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
        metaData: {
          material: LeatherVideoTributeMaterial.LEATHER,
          color: LeatherVideoTributeMaterialColor.WHITE,
          copyAmount: 1,
        },
        shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
        shippingAddressDetails: {
          formattedAddress: '68 Heathfield Park, Long Lake, NY 12847, USA',
          isValidAddress: true,
          portalAddressMetaData: {
            regionCode: 'US',
            languageCode: 'en',
            postalCode: '12847',
            administrativeArea: 'NY',
            locality: 'Long Lake',
            addressLines: ['68 Heathfield Park'],
          },
          addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
        },
      },
      photoBook: {
        option: EulogisePhotoBookCheckoutOptions.SKIP_PHOTO_BOOK,
        shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
        metaData: {
          bookStyle: {
            style: PhotobookBookStyle.CLASSIC_PHOTOBOOK,
            size: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
            numberOfPages: 0,
          },
          coverStyle: {
            design: '',
            coverMaterial: EulogisePhotobookCoverType.SAND,
          },
          copyAmount: 1,
        },
        shippingAddressDetails: {
          formattedAddress: '68 Heathfield Park, Long Lake, NY 12847, USA',
          isValidAddress: true,
          portalAddressMetaData: {
            regionCode: 'US',
            languageCode: 'en',
            postalCode: '12847',
            administrativeArea: 'NY',
            locality: 'Long Lake',
            addressLines: ['68 Heathfield Park'],
          },
          addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
        },
      },
    },
    billingAddressDetails: {
      formattedAddress: '68A Heathfield Park, Long Lake, NY 12847, USA',
      addressInputMode: ADDRESS_INPUT_MODE.MANUAL_INPUT,
    },
    currency: 'USD',
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
  },
  id: 'invoice-1',
  case: 'case-1',
}

export const MOCK_INVOICE_2: IInvoice = {
  updatedAt: '2022-01-20T00:41:01.134Z',
  status: 'complete',
  createdAt: '2022-01-20T00:40:59.879Z',
  customer: 'customer-2',
  // @ts-ignore
  transactions: ['transaction-2'],
  details: {
    packageOption:
      EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
    country: EulogiseCountry.UNITED_STATES,
    orderSummary: {
      digitalDownloadFee: 69,
      leatherVideoTributeBookFee: 150,
      photoBookTributeFee: 0,
      shippingFee: 34,
      printingFee: 0,
      subtotalFee: 253,
    },
    paymentDetails: {
      method: CHECKOUT_PAYMENT_METHODS.CREDIT_DEBIT_CARD,
      cardHolderName: 'SW',
    },
    keepsakesDetails: {
      leatherVideoTributeBook: {
        option:
          EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK,
        metaData: {
          material: LeatherVideoTributeMaterial.LEATHER,
          color: LeatherVideoTributeMaterialColor.WHITE,
          copyAmount: 1,
        },
        shippingMethod: CHECKOUTS_SHIPPING_METHOD.EXPRESS_SHIPPING,
        shippingAddressDetails: {
          formattedAddress: '68 Heathfield Park, Long Lake, NY 12847, USA',
          isValidAddress: true,
          portalAddressMetaData: {
            regionCode: 'US',
            languageCode: 'en',
            postalCode: '12847',
            administrativeArea: 'NY',
            locality: 'Long Lake',
            addressLines: ['68 Heathfield Park'],
          },
          addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
        },
      },
      photoBook: {
        option: EulogisePhotoBookCheckoutOptions.SKIP_PHOTO_BOOK,
        shippingMethod: CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
        metaData: {
          bookStyle: {
            style: PhotobookBookStyle.CLASSIC_PHOTOBOOK,
            size: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
            numberOfPages: 0,
          },
          coverStyle: {
            design: '',
            coverMaterial: EulogisePhotobookCoverType.SAND,
          },
          copyAmount: 1,
        },
        shippingAddressDetails: {
          formattedAddress: '68 Heathfield Park, Long Lake, NY 12847, USA',
          isValidAddress: true,
          portalAddressMetaData: {
            regionCode: 'US',
            languageCode: 'en',
            postalCode: '12847',
            administrativeArea: 'NY',
            locality: 'Long Lake',
            addressLines: ['68 Heathfield Park'],
          },
          addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
        },
      },
    },
    billingAddressDetails: {
      formattedAddress: '68 Heathfield Park, Long Lake, NY 12847, USA',
      addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
    },
    currency: 'USD',
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
  },
  id: 'invoice-2',
  case: 'case-2',
}

export const MOCK_INVOICES = [MOCK_INVOICE_1, MOCK_INVOICE_2]

export const MOCK_INVOICE_RESPONSE = {
  items: MOCK_INVOICES,
  count: MOCK_INVOICES.length,
  ref: '5d470e5bce0c2',
}
