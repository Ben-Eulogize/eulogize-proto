import {
  AllowPurchasingProductOptionKey,
  CardProductPageSize,
  CheckoutProductPreviewType,
  CHECKOUTS_SHIPPING_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EULOGISE_PRINTING_AVAILABLE_PRODUCTS,
  EULOGISE_PRINTING_PRODUCT_DISPLAYABLE_MEMORIAL_VISUAL_STATUS,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogiseISOStripeCurrencyCode,
  EulogiseLeatherVideoTributeBookOptions,
  EulogisePackageOptions,
  EulogisePackageOptionTypes,
  EulogisePage,
  EulogisePhotoBookCheckoutOptions,
  EulogiseProduct,
  EulogisePurchaseInformationPackageName,
  EulogisePurchaseInformationShippingMethodName,
  EulogiseRegion,
  EulogiseUserRole,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  EULOGIZE_SHIPPING_FEE_MATRIX,
  EulogizePrintingProductDisplayNames,
  EulogizePrintingProductDisplaySideInformationUS,
  EulogizePrintingProductDisplaySizesUS,
  EulogizePrintingProductOrderSummaryDisplaySizesUS,
  EulogizePrintingProductsPaperTypes,
  EulogizeShippingAvailableCountries,
  IAllowPurchasingOption,
  ICardProductData,
  ICheckoutPackage,
  ICheckoutTributeMetaData,
  ICheckoutTributeMetaDataPayload,
  IInvoice,
  IKeepsakesDefinition,
  IKeepsakesDetails,
  IKeepsakesMementosDetails,
  IPrintingDetails,
  IPrintingPaperDefinition,
  IPrintingPerUnitPriceByCopies,
  IPrintingProductDetails,
  ISlideshowData,
  ITributesForDeliveryProductsMetaData,
  KEEPSAKE_PRODUCTS,
  KEEPSAKES_ALLOWING_PURCHASE_KEY,
  MemorialVisualStatus,
  OrderSummaryPrintingProductDetailsSummary,
  OrderSummaryShippingProductDetailsSummary,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
  ResourceFileStatus,
  ValidPhotobookCheckoutSize,
  KEEPSAKES_PRODUCTS_DETAILS,
  ICase,
  EulogiseEditorPaymentConfig,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'

import { NavigationHelper } from './NavigationHelper'
import {
  EulogiseClientConfig,
  EulogizePrintingProductsPaperTypeDefinition,
  NON_APPLICTABLE_PAPER_PRICE,
  PHOTOBOOK_PRICING,
} from '@eulogise/client-core'
import { CaseHelper } from './CaseHelper'
import {
  EulogizePrintingProductDisplaySideInformationAU,
  EulogizePrintingProductDisplaySizesAU,
  EulogizePrintingProductOrderSummaryDisplaySizesAU,
} from '@eulogise/core/src'
import { PhotobookHelper } from './PhotobookHelper'

type PrintingProductOrderSummaryDisplaySizes = Partial<
  Record<EulogiseCardProducts, string>
>

export class CheckoutHelper {
  public static getCheckoutPreviewBaseUrl({
    product,
    pageSize,
    type = CheckoutProductPreviewType.FRONT_AND_LAST,
  }: {
    product: EulogiseProduct
    pageSize: CardProductPageSize
    type?: CheckoutProductPreviewType
  }) {
    return `${EulogiseClientConfig.AWS_S3_URL}/assets/checkouts/product-photos/base/${product}-${pageSize}-${type}.jpg`
  }

  public static getPackagePriceByCountry({
    country,
    packageOption,
  }: {
    country: EulogiseCountry
    packageOption: EulogisePackageOptions | null
  }) {
    switch (country) {
      // Charge with AUD $149
      case EulogiseCountry.AUSTRALIA:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 149
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 99
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 50
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 50
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with GBP £79
      case EulogiseCountry.UNITED_KINGDOM:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 79
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 54
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 54
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 25
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 25
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with EURO €94
      case EulogiseCountry.EUROPEAN_UNION:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 94
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 64
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 64
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with CAD $149
      case EulogiseCountry.CANADA:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 149
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 99
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with NZD $169
      case EulogiseCountry.NEW_ZEALAND:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 169
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 119
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 119
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 50
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 50
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with USD:
      case EulogiseCountry.UNITED_STATES:
      case EulogiseCountry.CHILE:
      case EulogiseCountry.COLOMBIA:
      case EulogiseCountry.COSTA_RICA:
      case EulogiseCountry.MEXICO:
      case EulogiseCountry.PANAMA:
      case EulogiseCountry.GUATEMALA:
      case EulogiseCountry.THE_DOMINICAN_REPUBLIC:
      case EulogiseCountry.THE_PHILIPPINES:
      case EulogiseCountry.REST_OF_THE_WOLRD:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 69
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 69
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      default:
        return 0
    }
  }

  public static getDiscountPackagePriceByCountry({
    country,
    packageOption,
  }: {
    country: EulogiseCountry
    packageOption: EulogisePackageOptions | null
  }) {
    switch (country) {
      // Charge with AUD
      case EulogiseCountry.AUSTRALIA:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 99
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 50
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 50
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with GBP
      case EulogiseCountry.UNITED_KINGDOM:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 54
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 54
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 54
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 25
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 25
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with EURO
      case EulogiseCountry.EUROPEAN_UNION:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 64
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 64
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 64
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with CAD
      case EulogiseCountry.CANADA:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 99
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 99
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with NZD
      case EulogiseCountry.NEW_ZEALAND:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 119
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 119
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 119
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 50
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 50
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
          // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
          //   return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      // Charge with USD:
      case EulogiseCountry.UNITED_STATES:
      case EulogiseCountry.CHILE:
      case EulogiseCountry.COLOMBIA:
      case EulogiseCountry.COSTA_RICA:
      case EulogiseCountry.MEXICO:
      case EulogiseCountry.PANAMA:
      case EulogiseCountry.GUATEMALA:
      case EulogiseCountry.THE_DOMINICAN_REPUBLIC:
      case EulogiseCountry.THE_PHILIPPINES:
      case EulogiseCountry.REST_OF_THE_WOLRD:
        switch (packageOption) {
          case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
            return 69
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
            return 69
          case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
            return 69
          case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
            return 30
          case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
            return 0
          case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
            return 30
          case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
            return 0
            // case EulogisePackageOptions.ADD_ON_PERSONALIZED_USB:
            return 0
          case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
            return 0
        }
      default:
        return 0
    }
  }

  public static getShippingFeeByShippingProducts({
    country,
    shippingMethod,
    shippingProduct,
  }: {
    country: EulogiseCountry
    shippingMethod: CHECKOUTS_SHIPPING_METHOD
    shippingProduct: keyof typeof EULOGIZE_SHIPPING_FEE_MATRIX
  }): number {
    if (!shippingProduct) {
      return 0
    }
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return 0
    }
    return (
      Number(
        EULOGIZE_SHIPPING_FEE_MATRIX?.[shippingProduct]?.[country]?.[
          shippingMethod
        ]?.toFixed(2),
      ) ?? 0
    )
  }

  public static getPrintingFeeByOrdedProductsDetails({
    country,
    orderedProductsDetails,
  }: {
    country: EulogiseCountry
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }): number {
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return 0
    }

    let totalPrintingPrice = 0

    for (const [product, productDetails] of Object.entries(
      orderedProductsDetails,
    )) {
      const { paperType, copiesAmount, isProductOrderedForPrinting } =
        productDetails
      if (!paperType || copiesAmount === 0 || !isProductOrderedForPrinting) {
        continue
      }
      const localPaperPricePerCopy =
        (EulogizePrintingProductsPaperTypeDefinition[paperType] as any)
          .perPaperUnitPrice?.[product as EulogiseCardProducts]?.[country]?.[
          copiesAmount as keyof IPrintingPerUnitPriceByCopies
        ] ?? NON_APPLICTABLE_PAPER_PRICE
      const paperPricing = localPaperPricePerCopy
      const productTotalPrice = Number(
        (paperPricing * Number(copiesAmount)).toFixed(2),
      )
      totalPrintingPrice = totalPrintingPrice + productTotalPrice
    }

    return totalPrintingPrice
  }

  public static getTotalPrice({
    packageFee = 0,
    leatherVideoTributeBookFee = 0,
    shippingFee = 0,
    printingFee = 0,
    photoBookFee = 0,
  }: {
    packageFee: number
    leatherVideoTributeBookFee: number
    shippingFee: number
    printingFee: number
    photoBookFee: number
  }) {
    return (
      packageFee +
      leatherVideoTributeBookFee +
      shippingFee +
      printingFee +
      photoBookFee
    )
  }

  public static getCurrencySymbolByCountry({
    country,
  }: {
    country: EulogiseCountry
  }) {
    switch (country) {
      // US region based countries
      case EulogiseCountry.UNITED_STATES:
      case EulogiseCountry.CHILE:
      case EulogiseCountry.COLOMBIA:
      case EulogiseCountry.COSTA_RICA:
      case EulogiseCountry.MEXICO:
      case EulogiseCountry.PANAMA:
      case EulogiseCountry.GUATEMALA:
      case EulogiseCountry.THE_DOMINICAN_REPUBLIC:
      case EulogiseCountry.THE_PHILIPPINES:
      case EulogiseCountry.REST_OF_THE_WOLRD:
        return '$'
      case EulogiseCountry.CANADA:
        return '$'
      // AU Region based countries
      case EulogiseCountry.AUSTRALIA:
        return '$'
      case EulogiseCountry.NEW_ZEALAND:
        return '$'
      case EulogiseCountry.EUROPEAN_UNION:
        return '€'
      case EulogiseCountry.UNITED_KINGDOM:
        return '£'
      default:
        return '$'
    }
  }

  public static getCurrencyISOCodeByCountry({
    country,
  }: {
    country: EulogiseCountry
  }) {
    switch (country) {
      // US region based countries
      case EulogiseCountry.UNITED_STATES:
      case EulogiseCountry.CHILE:
      case EulogiseCountry.COLOMBIA:
      case EulogiseCountry.COSTA_RICA:
      case EulogiseCountry.MEXICO:
      case EulogiseCountry.PANAMA:
      case EulogiseCountry.GUATEMALA:
      case EulogiseCountry.THE_DOMINICAN_REPUBLIC:
      case EulogiseCountry.THE_PHILIPPINES:
      case EulogiseCountry.REST_OF_THE_WOLRD:
        return 'USD'
      case EulogiseCountry.CANADA:
        return 'CAD'
      // AU Region based countries
      case EulogiseCountry.AUSTRALIA:
        return 'AUD'
      case EulogiseCountry.NEW_ZEALAND:
        return 'NZD'
      case EulogiseCountry.EUROPEAN_UNION:
        return 'EUR'
      case EulogiseCountry.UNITED_KINGDOM:
        return 'GBR'
      default:
        return 'AUD'
    }
  }

  public static getStripeCurrencyCodeByCountry({
    country,
  }: {
    country: EulogiseCountry
  }) {
    return (
      EulogiseISOStripeCurrencyCode[country] ??
      EulogiseISOStripeCurrencyCode[EulogiseCountry.REST_OF_THE_WOLRD]
    )
  }

  public static getOnContinueFnInPackagePage({
    country,
    packageOption,
  }: {
    country: EulogiseCountry
    packageOption: EulogisePackageOptions | null
  }) {
    if (!country || !packageOption) {
      return () => null
    }
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return () => NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
    }

    // Packages-based
    switch (packageOption) {
      // First-time checkout packages
      case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      // Add-on checkout packages
      case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      // Keepsakes
      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        return () => null
      case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      default:
        return () => null
    }
  }

  public static getHasToPayRoleConfigKeyForEditorOrFuneralHome({
    role,
    allowPurchasing,
  }: {
    role: EulogiseUserRole | null
    allowPurchasing: IAllowPurchasingOption | undefined
  }) {
    if (!role || !allowPurchasing) {
      return null
    }

    const roleConfigKey =
      role === EulogiseUserRole.CLIENT
        ? AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
        : AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER

    return roleConfigKey
  }

  public static getIsHasToPayPrintingForEditorOrFuneralHome = ({
    role,
    activeCase,
    allowPurchasing,
  }: {
    role: EulogiseUserRole | null
    activeCase: ICase | null
    allowPurchasing: IAllowPurchasingOption | undefined
  }) => {
    if (!role || !activeCase || !allowPurchasing) {
      return () => null
    }
    return (
      [EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) &&
      activeCase?.editorPaymentConfig ===
        EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
    )
  }

  public static getIfAnyItemsAvaialbleInKeepsakesForHasToPayFuneralHomeOrEditorBasedOnAllowPurchasing =
    ({
      roleConfigKey,
      allowPurchasing,
    }: {
      roleConfigKey: AllowPurchasingProductOptionKey | null
      allowPurchasing: IAllowPurchasingOption | undefined
    }) => {
      if (!allowPurchasing || !roleConfigKey) {
        return false
      }
      if (
        allowPurchasing?.photoBooks?.[roleConfigKey] ||
        allowPurchasing?.videoBooks?.[roleConfigKey]
      ) {
        return true
      }
      return false
    }

  public static getOnContinueFnInPackagePageV2FuneralClientsOrEditors({
    country,
    packageOption,
    role,
    allowPurchasing,
    activeCase,
  }: {
    country: EulogiseCountry
    packageOption: EulogisePackageOptions | null
    role: EulogiseUserRole | null
    allowPurchasing: IAllowPurchasingOption | undefined
    activeCase: ICase | null
  }) {
    if (!country || !packageOption || !activeCase) {
      return () => null
    }
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return () => NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
    }

    // Packages-based
    switch (packageOption) {
      // First-time checkout packages
      case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
        if (
          this.getIsHasToPayPrintingForEditorOrFuneralHome({
            role,
            activeCase,
            allowPurchasing,
          })
        ) {
          const roleConfigKey =
            this.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
              role,
              allowPurchasing,
            })
          if (
            !roleConfigKey ||
            (!allowPurchasing?.printing?.[roleConfigKey] &&
              !allowPurchasing?.photoBooks?.[roleConfigKey] &&
              !allowPurchasing?.videoBooks?.[roleConfigKey])
          ) {
            return () =>
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
          } else if (
            !allowPurchasing?.printing?.[roleConfigKey] &&
            this.getIfAnyItemsAvaialbleInKeepsakesForHasToPayFuneralHomeOrEditorBasedOnAllowPurchasing(
              { roleConfigKey, allowPurchasing },
            )
          ) {
            return () =>
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
          } else if (allowPurchasing?.printing?.[roleConfigKey]) {
            return () =>
              NavigationHelper.navigate(
                EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS,
              )
          }
          return () =>
            NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
        }
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
        if (
          this.getIsHasToPayPrintingForEditorOrFuneralHome({
            role,
            activeCase,
            allowPurchasing,
          })
        ) {
          const roleConfigKey =
            this.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
              role,
              allowPurchasing,
            })
          if (
            !roleConfigKey ||
            !this.getIfAnyItemsAvaialbleInKeepsakesForHasToPayFuneralHomeOrEditorBasedOnAllowPurchasing(
              { roleConfigKey, allowPurchasing },
            )
          ) {
            return () =>
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
          }
        }
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      // Add-on checkout packages
      case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
        if (
          this.getIsHasToPayPrintingForEditorOrFuneralHome({
            role,
            activeCase,
            allowPurchasing,
          })
        ) {
          const roleConfigKey =
            this.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
              role,
              allowPurchasing,
            })
          if (!roleConfigKey) {
            return () =>
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
          }
          if (
            !this.getIfAnyItemsAvaialbleInKeepsakesForHasToPayFuneralHomeOrEditorBasedOnAllowPurchasing(
              { roleConfigKey, allowPurchasing },
            )
          ) {
            return () =>
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
          }
        }
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      // Keepsakes
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      default:
        return () => null
    }
  }

  public static getOnContinueFnInPackagePageV2Customers({
    country,
    packageOption,
  }: {
    country: EulogiseCountry
    packageOption: EulogisePackageOptions | null
  }) {
    if (!country || !packageOption) {
      return () => null
    }
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return () => NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
    }

    // Packages-based
    switch (packageOption) {
      // First-time checkout packages
      case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      // Add-on checkout packages
      case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
      case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      // Keepsakes
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
        return () =>
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_DETAILS)
      default:
        return () => null
    }
  }

  public static getOnContinueFnInOptionsPage({
    country,
    leatherVideoTributeBookOption,
  }: {
    country: EulogiseCountry
    leatherVideoTributeBookOption: EulogiseLeatherVideoTributeBookOptions | null
  }) {
    if (!country || !leatherVideoTributeBookOption) {
      return () => null
    }
    if (
      leatherVideoTributeBookOption ===
      EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK
    ) {
      return () => NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_SHIPPING)
    }
    return () => NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
  }
  public static getLeatherVideoTributeBookFeeByCountry({
    isLeatherVideoTributeBookAdded,
    country,
  }: {
    isLeatherVideoTributeBookAdded: boolean
    country: EulogiseCountry
  }) {
    if (!isLeatherVideoTributeBookAdded || !country) {
      return 0
    }
    return 149
  }

  public static getTributeMetaData({
    allActiveCardProducts,
    slideshowData,
  }: {
    allActiveCardProducts: Record<EulogiseCardProducts, ICardProductData>
    slideshowData: ISlideshowData | undefined
  }) {
    let tributesMetaData: ICheckoutTributeMetaData = {
      [EulogiseProduct.SLIDESHOW]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.BOOKLET]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.BOOKMARK]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.SIDED_CARD]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.TV_WELCOME_SCREEN]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.THANK_YOU_CARD]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
      [EulogiseProduct.PHOTOBOOK]: {
        status: MemorialVisualStatus.NOT_STARTED,
        fileStatus: ResourceFileStatus.NOT_STARTED,
        id: null,
      },
    }

    let cardProduct: EulogiseCardProducts
    let cardProductData: ICardProductData

    // Card Products
    // @ts-ignore:next-line
    for ([cardProduct, cardProductData] of Object.entries(
      allActiveCardProducts,
    )) {
      if (cardProduct && cardProductData) {
        const productStatus = cardProductData?.status
        for (const [_, value] of Object.entries(MemorialVisualStatus)) {
          if (value === productStatus) {
            const tributeCardProductData: ICheckoutTributeMetaDataPayload =
              tributesMetaData?.[cardProduct]!
            tributeCardProductData.status = value
            if (cardProductData?.id) {
              tributeCardProductData.id = cardProductData?.id
            }
            if (cardProductData?.fileStatus) {
              tributeCardProductData.fileStatus = cardProductData?.fileStatus
            }
          }
        }
      }
    }

    // Slideshow
    const slideshowTributeData =
      tributesMetaData.SLIDESHOW as ICheckoutTributeMetaDataPayload

    if (slideshowData && slideshowData?.id && slideshowData?.fileStatus) {
      slideshowTributeData.id = slideshowData?.id
      slideshowTributeData.status = slideshowData.status
      slideshowTributeData.fileStatus = slideshowData.fileStatus
    }
    return tributesMetaData
  }
  public static getDownloadableProducts({
    isClientCase,
    packageOption,
  }: {
    isClientCase: boolean
    packageOption: EulogisePackageOptions | null
  }): Array<EulogiseProduct> {
    const allProducts = [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.PHOTOBOOK,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.SLIDESHOW,
      EulogiseProduct.THANK_YOU_CARD,
      EulogiseProduct.TV_WELCOME_SCREEN,
    ]
    if (
      isClientCase ||
      !packageOption ||
      packageOption === EulogisePackageOptions.ALL_TRIBUTES_BUNDLE
    ) {
      return allProducts
    }
    if (
      packageOption ===
      EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY
    ) {
      return (
        EULOGIZE_CHECKOUT_PACKAGE_OPTION.find(
          (p: ICheckoutPackage) =>
            p.value ===
            EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
        )?.packageProducts ?? []
      )
    }
    if (
      packageOption ===
      EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY
    ) {
      return (
        EULOGIZE_CHECKOUT_PACKAGE_OPTION.find(
          (p: ICheckoutPackage) =>
            p.value ===
            EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        )?.packageProducts ?? []
      )
    }
    return allProducts
  }

  public static getClientCaseEulogizeCardAvailableForDownload = () => {
    return [
      EulogiseCardProducts.BOOKLET,
      EulogiseCardProducts.BOOKMARK,
      EulogiseCardProducts.SIDED_CARD,
      EulogiseCardProducts.THANK_YOU_CARD,
      EulogiseCardProducts.TV_WELCOME_SCREEN,
      EulogiseCardProducts.PHOTOBOOK,
    ]
  }

  public static getAvailableCardProductsForDownloadProductsByInvoices = (
    invoices: Array<IInvoice>,
  ) => {
    if (!invoices || invoices?.length === 0) {
      return []
    }
    const purchasedPackages: Array<EulogisePackageOptions> = invoices
      ?.filter((i) => i.status === 'complete')
      ?.map((i) => i.details.packageOption)
    if (
      purchasedPackages.includes(EulogisePackageOptions.ALL_TRIBUTES_BUNDLE)
    ) {
      return [
        EulogiseCardProducts.BOOKLET,
        EulogiseCardProducts.BOOKMARK,
        EulogiseCardProducts.SIDED_CARD,
        EulogiseCardProducts.THANK_YOU_CARD,
        EulogiseCardProducts.TV_WELCOME_SCREEN,
        // DISABLED PHOTOBOOK
        EulogiseCardProducts.PHOTOBOOK,
      ]
    }
    let availableCardProducts: Array<EulogiseCardProducts> = []
    if (
      purchasedPackages.includes(
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      ) ||
      purchasedPackages.includes(
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      )
    ) {
      availableCardProducts = [
        ...availableCardProducts,
        EulogiseCardProducts.BOOKLET,
        EulogiseCardProducts.BOOKMARK,
        EulogiseCardProducts.SIDED_CARD,
        EulogiseCardProducts.THANK_YOU_CARD,
        // DISABLED PHOTOBOOK
        EulogiseCardProducts.PHOTOBOOK,
      ]
    }
    if (
      purchasedPackages.includes(
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
      )
    ) {
      availableCardProducts = [
        ...availableCardProducts,
        EulogiseCardProducts.TV_WELCOME_SCREEN,
      ]
    }
    if (
      purchasedPackages.includes(
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      ) ||
      purchasedPackages.includes(
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      )
    ) {
      availableCardProducts = [
        ...availableCardProducts,
        EulogiseCardProducts.BOOKLET,
        EulogiseCardProducts.BOOKMARK,
        EulogiseCardProducts.SIDED_CARD,
        EulogiseCardProducts.THANK_YOU_CARD,
        // DISABLED PHOTOBOOK
        EulogiseCardProducts.PHOTOBOOK,
      ]
    }
    if (
      purchasedPackages.includes(EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES)
    ) {
      availableCardProducts = [
        ...availableCardProducts,
        EulogiseCardProducts.TV_WELCOME_SCREEN,
      ]
    }
    return availableCardProducts
  }

  public static getOtherTributesAvailableToPurchaseCardProductsByInvoices = (
    invoices: Array<IInvoice>,
  ) => {
    const allCardProducts = [
      EulogiseCardProducts.BOOKLET,
      EulogiseCardProducts.BOOKMARK,
      EulogiseCardProducts.SIDED_CARD,
      EulogiseCardProducts.THANK_YOU_CARD,
      EulogiseCardProducts.TV_WELCOME_SCREEN,
      // DISABLED PHOTOBOOK
      EulogiseCardProducts.PHOTOBOOK,
    ]
    if (!invoices || invoices?.length === 0) {
      return allCardProducts
    }

    const availableCardProductsForDownload =
      this.getAvailableCardProductsForDownloadProductsByInvoices(invoices)

    const otherTributesAvailableToCreateAndPurchase = allCardProducts.filter(
      (p) => !availableCardProductsForDownload.includes(p),
    )
    return otherTributesAvailableToCreateAndPurchase
  }

  public static isSlideshowGeneratable = (invoices: Array<IInvoice>) => {
    if (!invoices || invoices?.length === 0) {
      return false
    }
    const purchasedPackages: Array<EulogisePackageOptions> = invoices
      ?.filter((i) => i.status === 'complete')
      ?.map((i) => i.details.packageOption)
    if (
      purchasedPackages.includes(EulogisePackageOptions.ALL_TRIBUTES_BUNDLE) ||
      purchasedPackages.includes(
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
      ) ||
      purchasedPackages.includes(EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES)
    ) {
      return true
    }
    return false
  }

  // TODO: refactor, this is being used in checkout v1
  public static getCustomerDisplayedPackages({
    invoices,
    packageOptionType,
    country,
  }: {
    invoices: Array<IInvoice>
    packageOptionType: EulogisePackageOptionTypes
    country: EulogiseCountry
  }): ICheckoutPackage[] {
    const availableCountryPackages = country
      ? EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter((p: ICheckoutPackage) =>
          p?.appliedCountries?.includes(country),
        )
      : EULOGIZE_CHECKOUT_PACKAGE_OPTION

    if (
      !invoices ||
      invoices.length === 0 ||
      packageOptionType ===
        EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE
    ) {
      return availableCountryPackages.filter(
        (p: ICheckoutPackage) =>
          p.type === EulogisePackageOptionTypes.FIRST_TIME_CHECKOUT_PACKAGE,
      )
    } else if (
      packageOptionType === EulogisePackageOptionTypes.UPGRADE_CHECKOUT_PACKAGE
    ) {
      const addOnPackages = availableCountryPackages.filter(
        (p: ICheckoutPackage) =>
          p.type === EulogisePackageOptionTypes.UPGRADE_CHECKOUT_PACKAGE,
      )
      const purchasedPackages: Array<EulogisePackageOptions> = invoices
        ?.filter((i) => i.status === 'complete')
        ?.map((i: IInvoice) => i.details.packageOption)

      let updatedAddOnPackages: ICheckoutPackage[] = addOnPackages
      let keepSakesProductPackages = [
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
        // EulogisePackageOptions.ADD_ON_PERSONALIZED_USB,
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      ]
      if (
        purchasedPackages.includes(EulogisePackageOptions.ALL_TRIBUTES_BUNDLE)
      ) {
        return updatedAddOnPackages.filter(
          (checkoutPackage: ICheckoutPackage) =>
            keepSakesProductPackages.includes(checkoutPackage.value),
        )
      } else {
        if (
          purchasedPackages.includes(
            EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
          ) ||
          purchasedPackages.includes(
            EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
          )
        ) {
          updatedAddOnPackages = updatedAddOnPackages.filter(
            (addOnPackage) =>
              addOnPackage.value !==
              EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
          )
        }
        if (
          purchasedPackages.includes(
            EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
          ) ||
          purchasedPackages.includes(
            EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
          ) ||
          purchasedPackages.includes(
            EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
          )
        ) {
          updatedAddOnPackages = updatedAddOnPackages.filter(
            (addOnPackage) =>
              addOnPackage.value !==
                EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY &&
              addOnPackage.value !==
                EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
          )
        }
      }
      return updatedAddOnPackages
    }
    return []
  }

  public static overwritePackageOptionsBasedOnEnabledProducts({
    enabledProducts,
    packageOptions,
  }: {
    enabledProducts?: IEulogiseProductAvailabilityStatus
    packageOptions: EulogisePackageOptions[]
  }) {
    if (!enabledProducts) {
      return packageOptions
    }
    let updatedPackages = packageOptions
    if (enabledProducts?.PHOTOBOOK === false) {
      updatedPackages = updatedPackages.filter(
        (pkg) => pkg !== EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      )
    }
    return updatedPackages
  }

  public static getPaidCaseFuneralHomeOrEditorDisplayedKeepsakesPackages({
    role,
    country,
    allowPurchasing,
    enabledProducts,
  }: {
    role: EulogiseUserRole | undefined
    country: EulogiseCountry
    allowPurchasing: IAllowPurchasingOption | undefined
    enabledProducts?: IEulogiseProductAvailabilityStatus
  }): EulogisePackageOptions[] {
    if (
      !role ||
      ![EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) ||
      !country ||
      !allowPurchasing
    ) {
      return []
    }
    let displayedPackages: EulogisePackageOptions[] =
      EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
        (pkg: ICheckoutPackage) => pkg.isKeepsake === true,
      )
        .filter((pkg: ICheckoutPackage) => pkg.displayInPackagePage)
        .filter((keepSakePackage: ICheckoutPackage) => {
          const allowPurchasingKey = keepSakePackage?.allowPurchsingKey
          if (!allowPurchasingKey) {
            return false
          }

          const roleConfigKey =
            role === EulogiseUserRole.CLIENT
              ? AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
              : AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
          const isAvaialble: boolean =
            allowPurchasing?.[allowPurchasingKey]?.[roleConfigKey]
          return isAvaialble
        })
        .map((p: ICheckoutPackage) => p.value)

    const adjustedPackages = this.overwritePackageOptionsBasedOnEnabledProducts(
      {
        enabledProducts,
        packageOptions: displayedPackages,
      },
    )

    return adjustedPackages
  }

  public static getHasToPayCaseFuneralHomeOrEditorDisplayedFirstTimePurchasePackages({
    role,
    country,
    allowPurchasing,
    preDisplayedPackages,
    enabledProducts,
  }: {
    role: EulogiseUserRole | undefined
    country: EulogiseCountry
    allowPurchasing: IAllowPurchasingOption | undefined
    preDisplayedPackages: EulogisePackageOptions[]
    enabledProducts?: IEulogiseProductAvailabilityStatus
  }): EulogisePackageOptions[] {
    if (
      !role ||
      ![EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) ||
      !country ||
      !allowPurchasing
    ) {
      return []
    }
    const displayedKeepsakes =
      this.getPaidCaseFuneralHomeOrEditorDisplayedKeepsakesPackages({
        role,
        country,
        allowPurchasing,
      })
    const nonKeepsakesDisplayedPackages =
      EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
        (pkg) => !pkg?.isKeepsake && preDisplayedPackages.includes(pkg.value),
      ).map((pkg) => pkg.value)

    const combinedDisplayedPackages = [
      ...nonKeepsakesDisplayedPackages,
      ...displayedKeepsakes,
    ]

    let filteredDisplayedPackages =
      this.adjustPackagesBasedOnAllowingPurchasing({
        hasToPayCaseFuneralHomeOrEditorDisplayedPackages:
          combinedDisplayedPackages,
      })

    const adjustedPackages = this.overwritePackageOptionsBasedOnEnabledProducts(
      {
        enabledProducts,
        packageOptions: filteredDisplayedPackages,
      },
    )

    return adjustedPackages
  }

  public static getHasToPayCaseFuneralHomeOrEditorDisplayedPostPurchasePackages({
    role,
    country,
    allowPurchasing,
    postPurchasedPackages,
    enabledProducts,
  }: {
    role: EulogiseUserRole | undefined
    country: EulogiseCountry
    allowPurchasing: IAllowPurchasingOption | undefined
    postPurchasedPackages: EulogisePackageOptions[]
    enabledProducts?: IEulogiseProductAvailabilityStatus
  }): EulogisePackageOptions[] {
    if (
      !role ||
      ![EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) ||
      !country ||
      !allowPurchasing
    ) {
      return []
    }
    let updatedPackages = postPurchasedPackages
    const roleConfigKey = this.getHasToPayRoleConfigKeyForEditorOrFuneralHome({
      role,
      allowPurchasing,
    })
    if (!roleConfigKey) {
      return []
    }
    if (!allowPurchasing?.printing?.[roleConfigKey]) {
      updatedPackages = updatedPackages.filter(
        (pkg) =>
          pkg !==
            EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY &&
          pkg !== EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      )
    }

    if (!allowPurchasing?.photoBooks?.[roleConfigKey]) {
      updatedPackages = updatedPackages.filter(
        (pkg) => pkg !== EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      )
    }

    const adjustedPackages = this.overwritePackageOptionsBasedOnEnabledProducts(
      {
        enabledProducts,
        packageOptions: updatedPackages,
      },
    )

    return adjustedPackages
  }

  public static adjustPackagesBasedOnAllowingPurchasing({
    hasToPayCaseFuneralHomeOrEditorDisplayedPackages,
  }: {
    hasToPayCaseFuneralHomeOrEditorDisplayedPackages: EulogisePackageOptions[]
  }): EulogisePackageOptions[] {
    if (!hasToPayCaseFuneralHomeOrEditorDisplayedPackages) {
      return hasToPayCaseFuneralHomeOrEditorDisplayedPackages
    }
    let updatedPackages = hasToPayCaseFuneralHomeOrEditorDisplayedPackages
    if (
      !hasToPayCaseFuneralHomeOrEditorDisplayedPackages.includes(
        EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      )
    ) {
      updatedPackages = updatedPackages.filter(
        (pkg) =>
          ![
            EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
            EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
          ].includes(pkg),
      )
    }
    if (
      updatedPackages.includes(
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      ) ||
      updatedPackages.includes(
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      )
    ) {
      updatedPackages = updatedPackages.filter(
        (pkg) => pkg !== EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
      )
    }
    return updatedPackages
  }

  public static getFuneralHomeOrEditorKeepsakes({
    role,
    country,
    allowPurchasing,
    enabledProducts,
  }: {
    role: EulogiseUserRole | undefined
    country: EulogiseCountry
    allowPurchasing: IAllowPurchasingOption | undefined
    enabledProducts?: IEulogiseProductAvailabilityStatus
  }): IKeepsakesMementosDetails[] {
    if (
      !role ||
      ![EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) ||
      !country ||
      !allowPurchasing
    ) {
      return []
    }
    const displayedPackages: EulogisePackageOptions[] =
      EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
        (pkg: ICheckoutPackage) => pkg.isKeepsake === true,
      )
        .filter((keepSakePackage: ICheckoutPackage) => {
          if (
            keepSakePackage.value ===
              EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
            !PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
          ) {
            return false
          }
          const allowPurchasingKey = keepSakePackage?.allowPurchsingKey
          if (!allowPurchasingKey) {
            return false
          }
          const roleConfigKey =
            role === EulogiseUserRole.CLIENT
              ? AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
              : AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
          const isAvaialble: boolean =
            allowPurchasing?.[allowPurchasingKey]?.[roleConfigKey]
          return isAvaialble
        })
        .map((p: ICheckoutPackage) => p.value)

    let keepsakesDefinitions: IKeepsakesMementosDetails[] = []
    const photoBookDetails = KEEPSAKES_PRODUCTS_DETAILS.find(
      (item) => item.product === KEEPSAKE_PRODUCTS.PHOTO_BOOKS,
    )
    const videoBookDetails = KEEPSAKES_PRODUCTS_DETAILS.find(
      (item) => item.product === KEEPSAKE_PRODUCTS.VIDEO_BOOKS,
    )
    displayedPackages.map((packageOption) => {
      if (
        packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
        photoBookDetails &&
        enabledProducts?.PHOTOBOOK === true
      ) {
        keepsakesDefinitions.push(photoBookDetails)
      }
      if (
        packageOption === EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK &&
        videoBookDetails
      ) {
        keepsakesDefinitions.push(videoBookDetails)
      }
    })
    return keepsakesDefinitions
  }

  public static getPurchasePackageNameByPackageOption({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions
  }) {
    return EulogisePurchaseInformationPackageName?.[packageOption]
  }

  public static getPurchaseShippingNameByShippingMethod({
    shippingMethod = CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING,
  }: {
    shippingMethod: CHECKOUTS_SHIPPING_METHOD
  }) {
    return EulogisePurchaseInformationShippingMethodName[shippingMethod]
  }

  public static getHeaderShouldShowOption({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions | null
  }) {
    if (!packageOption) {
      return false
    }
    if (
      [
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
      ].includes(packageOption)
    ) {
      return true
    }
    return false
  }

  public static getHeadershouldShowShipping({
    packageOption,
    skipShipping = false,
  }: {
    packageOption: EulogisePackageOptions | null
    skipShipping: Boolean
  }) {
    if (!packageOption) {
      return false
    }
    if (
      [
        EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
        EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
        EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
      ].includes(packageOption)
    ) {
      if (!skipShipping) {
        return true
      }
      return false
    }
    return false
  }

  public static getEulogizeForeverMemorialsKeepsakes({
    onViewProductVideoBook,
    onViewProductPhotoBook,
    onViewProductPremiumPrinting,
    country,
  }: {
    onViewProductVideoBook: Function
    onViewProductPhotoBook: Function
    onViewProductPremiumPrinting: Function
    country: EulogiseCountry
  }): IKeepsakesDefinition[] {
    if (!PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)) {
      return [
        {
          thumbnailSrc: `${`${EulogiseClientConfig.AWS_S3_URL}/assets/eulogize-tribute-sample-image-4.jpeg`}`,
          title: 'Leather Video Book',
          description: 'View product',
          isDescriptionClickable: true,
          onViewProduct: onViewProductVideoBook,
          allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.VIDEO_BOOKS,
        },
        {
          thumbnailSrc: `${`${EulogiseClientConfig.AWS_S3_URL}/assets/eulogize-tribute-sample-image-6.jpeg`}`,
          title: 'Printing & Delivery',
          description: 'View options',
          isDescriptionClickable: true,
          onViewProduct: onViewProductPremiumPrinting,
          allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.PRINTING,
        },
      ]
    }
    return [
      {
        thumbnailSrc: `${`${EulogiseClientConfig.AWS_S3_URL}/assets/eulogize-tribute-sample-image-4.jpeg`}`,
        title: 'Leather Video Book',
        description: 'View product',
        isDescriptionClickable: true,
        onViewProduct: onViewProductVideoBook,
        allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.VIDEO_BOOKS,
      },
      {
        thumbnailSrc: `${`${EulogiseClientConfig.AWS_S3_URL}/assets/checkouts/product-photos/photo-books/photo-books-2.avif`}`,
        title: 'Premium Photo Book',
        description: 'View options',
        isDescriptionClickable: true,
        onViewProduct: onViewProductPhotoBook,
        allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS,
      },
      {
        thumbnailSrc: `${`${EulogiseClientConfig.AWS_S3_URL}/assets/eulogize-tribute-sample-image-6.jpeg`}`,
        title: 'Printing & Delivery',
        description: 'View options',
        isDescriptionClickable: true,
        onViewProduct: onViewProductPremiumPrinting,
        allowPurchasingKey: KEEPSAKES_ALLOWING_PURCHASE_KEY.PRINTING,
      },
    ]
  }

  public static getEulogizeForeverMemorialsKeepsakesByRole({
    allowPurchasing,
    keepsakesDefinitions,
    role,
    isPhotoBookAvailableToOrder,
  }: {
    allowPurchasing: IAllowPurchasingOption | undefined
    keepsakesDefinitions: IKeepsakesDefinition[]
    role: EulogiseUserRole | undefined
    isPhotoBookAvailableToOrder: boolean
  }): IKeepsakesDefinition[] {
    if (
      !role ||
      ![
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
      ].includes(role)
    ) {
      return []
    }

    if (role === EulogiseUserRole.CUSTOMER) {
      if (!isPhotoBookAvailableToOrder) {
        return keepsakesDefinitions.filter(
          (keepsakesDefinition: IKeepsakesDefinition) =>
            keepsakesDefinition?.allowPurchasingKey !==
            KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS,
        )
      }
      return keepsakesDefinitions
    }

    if (
      [EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) &&
      !allowPurchasing
    ) {
      return []
    }

    const allowPurchasingConfigsRoleKey = this.getAllowPurchasingConfigByRole({
      role,
    })

    if (!allowPurchasingConfigsRoleKey) {
      return []
    }

    return keepsakesDefinitions.filter(
      (keepsakesDefinition: IKeepsakesDefinition) => {
        if (
          keepsakesDefinition?.allowPurchasingKey ===
          KEEPSAKES_ALLOWING_PURCHASE_KEY.PHOTO_BOOKS
        ) {
          if (!isPhotoBookAvailableToOrder) {
            return false
          }
        }
        const productKey = keepsakesDefinition?.allowPurchasingKey
        return allowPurchasing?.[productKey]?.[allowPurchasingConfigsRoleKey]
      },
    )
  }

  public static getAllowPurchasingConfigByRole({
    role,
  }: {
    role: EulogiseUserRole
  }): AllowPurchasingProductOptionKey | null {
    switch (role) {
      case EulogiseUserRole.CLIENT:
        return AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      case EulogiseUserRole.EDITOR:
        return AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
      default:
        return null
    }
  }

  public static getReadyToOrderPrintingProducts({
    tributesMetaData,
  }: {
    tributesMetaData: Partial<
      Record<EulogiseProduct, ICheckoutTributeMetaDataPayload>
    >
  }) {
    const checkoutCardProducts = [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
    ]
    const readyToOrderPrintingProducts = checkoutCardProducts.filter(
      (cardProduct) => {
        if (
          !EULOGISE_PRINTING_AVAILABLE_PRODUCTS.includes(
            cardProduct as unknown as EulogiseCardProducts,
          )
        ) {
          return false
        }
        if (!tributesMetaData?.[cardProduct]?.status) {
          return false
        }
        const status = tributesMetaData?.[cardProduct]
          ?.status as MemorialVisualStatus
        if (
          EULOGISE_PRINTING_PRODUCT_DISPLAYABLE_MEMORIAL_VISUAL_STATUS.includes(
            status,
          )
        ) {
          return true
        }
        return false
      },
    )
    return readyToOrderPrintingProducts
  }

  public static formatPriceDecimals({ price }: { price: number }): string {
    let formattedNumber = price.toFixed(2)

    if (formattedNumber.endsWith('.00')) {
      return formattedNumber.slice(0, -3)
    }
    return formattedNumber
  }

  public static getPagePerProductByProduct({
    product,
    allActiveCardProducts,
  }: {
    product: EulogiseCardProducts
    allActiveCardProducts: Record<EulogiseCardProducts, ICardProductData>
  }): number {
    const fixedPagesAmountProducts = [
      EulogiseCardProducts.BOOKMARK,
      EulogiseCardProducts.SIDED_CARD,
      EulogiseCardProducts.THANK_YOU_CARD,
      EulogiseCardProducts.TV_WELCOME_SCREEN,
    ]
    if (fixedPagesAmountProducts.includes(product)) {
      return 2
    }
    return allActiveCardProducts?.[product]?.content?.pages?.length ?? 0
  }

  public static getIsAnyPrintingProductSelected({
    orderedProductsDetails,
  }: {
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }) {
    let isAnyPrintingProductSelected = false

    for (const [, productDetails] of Object.entries(orderedProductsDetails)) {
      if (!!productDetails?.isProductOrderedForPrinting) {
        isAnyPrintingProductSelected = true
      }
    }

    return isAnyPrintingProductSelected
  }

  public static getOrderedPrintingTributes({
    orderedProductsDetails,
  }: {
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }) {
    let orderedPrintingTributes = []

    for (const [product, productDetails] of Object.entries(
      orderedProductsDetails,
    )) {
      if (!!productDetails?.isProductOrderedForPrinting) {
        const productDisplayedText =
          EulogizePrintingProductDisplayNames?.[
            product as EulogiseCardProducts
          ] ?? undefined
        if (productDisplayedText) {
          orderedPrintingTributes.push(productDisplayedText)
        }
      }
    }

    return orderedPrintingTributes
  }

  public static getIsEveryActivatedPrintingProductPaperTypeAndQuantitySelected({
    orderedProductsDetails,
  }: {
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }) {
    let isEveryActivatedPrintingProductPaperTypeAndQuantitySelected = true

    for (const [, productDetails] of Object.entries(orderedProductsDetails)) {
      const { isProductOrderedForPrinting, copiesAmount, paperType } =
        productDetails
      if (isProductOrderedForPrinting) {
        if (!copiesAmount || !paperType) {
          isEveryActivatedPrintingProductPaperTypeAndQuantitySelected = false
          break
        }
      }
    }

    return isEveryActivatedPrintingProductPaperTypeAndQuantitySelected
  }

  public static getShippingProductsOrderSummaryByDetails({
    printingDetails,
    keepsakesDetails,
    country,
  }: {
    printingDetails: IPrintingDetails
    keepsakesDetails: IKeepsakesDetails
    country: EulogiseCountry
  }): Array<OrderSummaryShippingProductDetailsSummary> {
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return []
    }

    const shippingCountry = country as
      | EulogiseCountry.AUSTRALIA
      | EulogiseCountry.UNITED_STATES

    let shippingProductsOrderSummaryDetails = []

    if (
      printingDetails?.printingShippingMethod !==
      CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
    ) {
      shippingProductsOrderSummaryDetails.push({
        shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
        shippingMethod: printingDetails?.printingShippingMethod,
        shippingFee:
          EULOGIZE_SHIPPING_FEE_MATRIX?.[
            CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES
          ]?.[shippingCountry]?.[printingDetails?.printingShippingMethod] ?? 0,
      })
    }

    if (
      keepsakesDetails?.leatherVideoTributeBook?.shippingMethod !==
      CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
    ) {
      shippingProductsOrderSummaryDetails.push({
        shippingProduct:
          CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS],
        shippingMethod:
          keepsakesDetails?.leatherVideoTributeBook?.shippingMethod,
        shippingFee:
          EULOGIZE_SHIPPING_FEE_MATRIX?.[
            CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.VIDEO_BOOKS]
          ]?.[shippingCountry]?.[
            keepsakesDetails?.leatherVideoTributeBook?.shippingMethod
          ] ?? 0,
      })
    }

    if (
      keepsakesDetails?.photoBook?.shippingMethod !==
      CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
    ) {
      shippingProductsOrderSummaryDetails.push({
        shippingProduct:
          CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS],
        shippingMethod: keepsakesDetails?.photoBook?.shippingMethod,
        shippingFee:
          EULOGIZE_SHIPPING_FEE_MATRIX?.[
            CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS]
          ]?.[shippingCountry]?.[keepsakesDetails?.photoBook?.shippingMethod] ??
          0,
      })
    }

    return shippingProductsOrderSummaryDetails
  }

  public static getPrintingProductOrderSummaryByOrderedProductsDetails({
    orderedProductsDetails,
  }: {
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }): Array<OrderSummaryPrintingProductDetailsSummary> {
    if (!orderedProductsDetails) {
      return []
    }

    let printingProductsOrderSummaryDetails = []

    for (const [product, printingProductDetails] of Object.entries(
      orderedProductsDetails,
    )) {
      const {
        isProductOrderedForPrinting,
        paperType,
        copiesAmount,
        productPageAmount,
      } = printingProductDetails
      if (isProductOrderedForPrinting && paperType && copiesAmount > 0) {
        printingProductsOrderSummaryDetails.push({
          printingProduct: product as EulogiseCardProducts,
          isProductOrderedForPrinting,
          paperType,
          copiesAmount,
          productPageAmount,
        })
      }
    }

    return printingProductsOrderSummaryDetails
  }

  public static getOrderedPrintingProducts({
    orderedProductsDetails,
  }: {
    orderedProductsDetails: Partial<
      Record<EulogiseProduct, IPrintingProductDetails>
    >
  }): Array<EulogiseProduct> {
    if (!orderedProductsDetails) {
      return []
    }

    let orderedPrintingProducts = []

    for (const [product, printingProductDetails] of Object.entries(
      orderedProductsDetails,
    )) {
      const { isProductOrderedForPrinting, paperType, copiesAmount } =
        printingProductDetails
      if (isProductOrderedForPrinting && paperType && copiesAmount > 0) {
        orderedPrintingProducts.push(product as EulogiseProduct)
      }
    }

    return orderedPrintingProducts
  }

  public static getAvailablePrintingPaperTypesByProduct({
    product,
  }: {
    product: EulogiseCardProducts
  }): IPrintingPaperDefinition[] {
    if (!product) {
      return []
    }
    const paperTypesArray: IPrintingPaperDefinition[] = Object.values(
      EulogizePrintingProductsPaperTypeDefinition,
    )
    const availablePrintingTypes = paperTypesArray.filter(
      (paperTypeDefinition: IPrintingPaperDefinition) => {
        if (!paperTypeDefinition.appliedProducts.includes(product)) {
          return false
        }
        return true
      },
    )

    return availablePrintingTypes
  }

  public static getAvailablePrintingPaperTypesOptions({
    product,
  }: {
    product: EulogiseCardProducts
  }): Array<{
    label: EulogizePrintingProductsPaperTypes
    value: EulogizePrintingProductsPaperTypes
  }> {
    const paperTypesDefinitionArray: IPrintingPaperDefinition[] =
      this.getAvailablePrintingPaperTypesByProduct({ product })

    const availablePrintingPaperTypeOptions = paperTypesDefinitionArray.map(
      (paperTypeDefinition: IPrintingPaperDefinition) => {
        return {
          label: paperTypeDefinition.key,
          value: paperTypeDefinition.key,
        }
      },
    )

    return availablePrintingPaperTypeOptions
  }

  public static getAvailablePrintingPaperQuantityOptions(): Array<{
    label: string
    value: string
  }> {
    return [
      {
        label: '20',
        value: '20',
      },
      {
        label: '40',
        value: '40',
      },
      {
        label: '60',
        value: '60',
      },
      {
        label: '80',
        value: '80',
      },
      {
        label: '100',
        value: '100',
      },
      {
        label: '120',
        value: '120',
      },
      {
        label: '140',
        value: '140',
      },
      {
        label: '160',
        value: '160',
      },
      {
        label: '180',
        value: '180',
      },
      {
        label: '200',
        value: '200',
      },
    ]
  }

  public static getTributesForDeliveryPrintingProductsInformation({
    printingDetails,
  }: {
    printingDetails: IPrintingDetails
  }): Array<ITributesForDeliveryProductsMetaData> {
    let orderedProductsDetailsArray = []
    for (const [product, ordereSingleProductDetails] of Object.entries(
      printingDetails.orderedProductsDetails,
    )) {
      const {
        paperType,
        copiesAmount,
        isProductOrderedForPrinting,
        productPageAmount,
      } = ordereSingleProductDetails
      orderedProductsDetailsArray.push({
        product: product as EulogiseProduct,
        metaData: {
          productPageAmount,
          paperType,
          copiesAmount,
          isProductOrderedForPrinting,
        },
      })
    }
    return orderedProductsDetailsArray
  }

  public static getPrintingProductStartingPriceByProduct({
    product,
    country,
  }: {
    product: EulogiseCardProducts
    country: EulogiseCountry
  }): number {
    if (!product || !country) {
      return NON_APPLICTABLE_PAPER_PRICE
    }
    const productPrintingPaperDefinition: IPrintingPaperDefinition[] =
      CheckoutHelper.getAvailablePrintingPaperTypesByProduct({ product })
    const pricesArray: Array<number> = productPrintingPaperDefinition.map(
      (definition) => {
        const localPaperPricePerCopyPriceSet =
          (
            definition.perPaperUnitPrice?.[
              product as EulogiseCardProducts
            ] as any
          )?.[country] ?? {}

        const minStartingPriceArray = Object.values(
          localPaperPricePerCopyPriceSet,
        ).filter((num) => num !== 0)

        const minStartingPrice =
          Math.min(...(minStartingPriceArray as any)) ??
          NON_APPLICTABLE_PAPER_PRICE

        return minStartingPrice
      },
    )
    return Math.min(...pricesArray)
  }

  public static getMinPrintingProductsStartingPriceByPrintingProduct({
    products,
    country,
  }: {
    products: Array<EulogiseCardProducts>
    country: EulogiseCountry
  }): number {
    if (!products || !country) {
      return NON_APPLICTABLE_PAPER_PRICE
    }
    const prices = products.map((product: EulogiseCardProducts) =>
      this.getPrintingProductStartingPriceByProduct({ product, country }),
    )
    return Math.min(...prices)
  }

  public static getMinPhotoBookStartingPriceByPrintingProduct({
    country,
    size,
  }: {
    country: EulogiseCountry
    size:
      | CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM
      | CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE
  }): number {
    if (!country) {
      return NON_APPLICTABLE_PAPER_PRICE
    }
    const minPrice = PHOTOBOOK_PRICING?.[size]?.[country]?.BASE_PRICE
    return minPrice
  }

  public static getIsPrintingProductReadyForSale({
    product,
    pageAmount,
  }: {
    product: EulogiseCardProducts
    pageAmount: number
  }): {
    isAvailable: boolean
    message: string | null
  } {
    if (EULOGISE_PRINTING_AVAILABLE_PRODUCTS.includes(product)) {
      if (product === EulogiseCardProducts.BOOKLET && pageAmount !== 4) {
        return {
          isAvailable: false,
          message: 'Printing not available for programs with more than 4 pages',
        }
      }
      return {
        isAvailable: true,
        message: null,
      }
    } else {
      return {
        isAvailable: false,
        message: 'Printing not currently available',
      }
    }
  }

  public static getHasFuneralHomeCanOrder({
    allowPurchasing,
  }: {
    allowPurchasing: IAllowPurchasingOption | undefined
  }): boolean {
    if (!allowPurchasing) {
      return false
    }
    const allowPurchasingConfigs = Object.values(allowPurchasing)

    return allowPurchasingConfigs.some(
      (allowPurchasingConfigs) =>
        allowPurchasingConfigs.funeralHomeCanOrder === true,
    )
  }

  public static getHasFamilyCanOrder({
    allowPurchasing,
  }: {
    allowPurchasing: IAllowPurchasingOption | undefined
  }): boolean {
    if (!allowPurchasing) {
      return false
    }
    const allowPurchasingConfigs = Object.values(allowPurchasing)

    return allowPurchasingConfigs.some(
      (allowPurchasingConfigs) =>
        allowPurchasingConfigs.familyCanOrder === true,
    )
  }

  public static getShouldShowPrintingDetailsBreadcrumbs({
    packageOption,
    country,
    role,
    allowPurchasing,
  }: {
    packageOption: EulogisePackageOptions | null
    country: EulogiseCountry
    role: EulogiseUserRole | null
    allowPurchasing: IAllowPurchasingOption | undefined
  }): boolean {
    if (!EulogizeShippingAvailableCountries.includes(country) || !role) {
      return false
    }
    switch (packageOption) {
      case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
        if (
          [EulogiseUserRole.CLIENT, EulogiseUserRole.EDITOR].includes(role) &&
          allowPurchasing
        ) {
          const roleConfigKey =
            role === EulogiseUserRole.CLIENT
              ? AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
              : AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
          const isAvailable: boolean =
            allowPurchasing?.printing?.[roleConfigKey] ?? false
          if (!isAvailable) {
            return false
          }
          return true
        }
        return true
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
      case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
      case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
        return true

      case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
      case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
      case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        return false
      default:
        return false
    }
  }

  public static getShouldShowShippingBreadcrumbs({
    isAnyKeepsakeProductAdded,
    isPrintingDeliveryOrdered,
    isPhotoBookAdded,
    packageOption,
    country,
  }: {
    isAnyKeepsakeProductAdded: boolean
    isPrintingDeliveryOrdered: boolean
    isPhotoBookAdded: boolean
    packageOption: EulogisePackageOptions | null
    country: EulogiseCountry
  }): boolean {
    if (!EulogizeShippingAvailableCountries.includes(country)) {
      return false
    }

    if (!packageOption) {
      return false
    }

    const alwaysShowShippingBreadcrumbPackages = [
      EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
      EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
    ]

    if (alwaysShowShippingBreadcrumbPackages.includes(packageOption)) {
      return true
    }

    if (
      isAnyKeepsakeProductAdded ||
      isPrintingDeliveryOrdered ||
      isPhotoBookAdded
    ) {
      return true
    }
    return false
  }

  public static getPurchasedPackagesDetailsBasedOnInvoices({
    invoices,
  }: {
    invoices: Array<IInvoice>
  }) {
    const purchasedPackages: Array<EulogisePackageOptions> = invoices
      .filter((i) => i.status === 'complete')
      ?.map((i) => i.details.packageOption)
    const isBundlePurchased = purchasedPackages.includes(
      EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    )
    const isPrintingDeliveryPackagePurchased =
      purchasedPackages.includes(
        EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
      ) ||
      purchasedPackages.includes(
        EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
      ) ||
      purchasedPackages.includes(
        EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      ) ||
      purchasedPackages.includes(
        EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
      )
    const isVideoScreenAndSlideshowPackagePurchased =
      purchasedPackages.includes(
        EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
      ) ||
      purchasedPackages.includes(EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES)
    if (!invoices || invoices?.length === 0) {
      return {
        isBundlePurchased: false,
        isPrintingDeliveryPackagePurchased: false,
        isVideoScreenAndSlideshowPackagePurchased: false,
      }
    }
    return {
      isBundlePurchased,
      isPrintingDeliveryPackagePurchased,
      isVideoScreenAndSlideshowPackagePurchased,
    }
  }

  public static getHasUserPurchasedAnyFirstTimeCheckoutPackages({
    invoices,
  }: {
    invoices: Array<IInvoice>
  }): boolean {
    const {
      isBundlePurchased,
      isPrintingDeliveryPackagePurchased,
      isVideoScreenAndSlideshowPackagePurchased,
    } = this.getPurchasedPackagesDetailsBasedOnInvoices({ invoices })
    if (
      isBundlePurchased ||
      isPrintingDeliveryPackagePurchased ||
      isVideoScreenAndSlideshowPackagePurchased
    ) {
      return true
    }
    return false
  }

  // Do not add photobook here as it requires another shipping address
  public static getIsAnyKeepsakeProductAdded({
    isVideoBookAdded,
  }: {
    isVideoBookAdded: boolean
  }): boolean {
    if (isVideoBookAdded) {
      return true
    }
    return false
  }

  public static getPrintingTributesDisplayedSizeByCountry({
    country,
  }: {
    country: EulogiseCountry
  }) {
    const region = CaseHelper.getRegionByCountry({ country })
    switch (region) {
      case EulogiseRegion.AU:
        return EulogizePrintingProductDisplaySizesAU
      default:
        return EulogizePrintingProductDisplaySizesUS
    }
  }

  public static getPrintingProductOrderSummaryDisplaySizesByCountry({
    country,
  }: {
    country: EulogiseCountry
  }): PrintingProductOrderSummaryDisplaySizes {
    const region = CaseHelper.getRegionByCountry({ country })
    switch (region) {
      case EulogiseRegion.AU:
        return EulogizePrintingProductOrderSummaryDisplaySizesAU as PrintingProductOrderSummaryDisplaySizes
      default:
        return EulogizePrintingProductOrderSummaryDisplaySizesUS as PrintingProductOrderSummaryDisplaySizes
    }
  }

  public static getPrintingProductDisplaySideInformationByCountry({
    country,
  }: {
    country: EulogiseCountry
  }): PrintingProductOrderSummaryDisplaySizes {
    const region = CaseHelper.getRegionByCountry({ country })
    switch (region) {
      case EulogiseRegion.AU:
        return EulogizePrintingProductDisplaySideInformationAU as PrintingProductOrderSummaryDisplaySizes
      default:
        return EulogizePrintingProductDisplaySideInformationUS as PrintingProductOrderSummaryDisplaySizes
    }
  }

  public static getIsPhotoBookReadyToOrder({
    activePhotoBookData,
    country,
  }: {
    activePhotoBookData: ICardProductData | undefined | null
    country: EulogiseCountry
  }) {
    if (!activePhotoBookData || !country) {
      return false
    }
    if (!PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)) {
      return false
    }
    const isPhotoBookStatusReadyToOrder =
      !!activePhotoBookData?.status &&
      [
        MemorialVisualStatus.EDITED,
        MemorialVisualStatus.COMPLETE,
        MemorialVisualStatus.DOWNLOAD,
      ].includes(activePhotoBookData.status as MemorialVisualStatus)

    const isPhotoBookContentReadyToOrder =
      !!((activePhotoBookData?.content?.pages?.length ?? 0) > 0) &&
      !!activePhotoBookData?.content?.pageSize
    const isPhotoBookAvailableToOrder =
      isPhotoBookStatusReadyToOrder && isPhotoBookContentReadyToOrder

    return isPhotoBookAvailableToOrder
  }

  public static getPhotoBookTotalPrice({
    keepsakesDetails,
    activePhotoBookData,
    country,
  }: {
    keepsakesDetails: IKeepsakesDetails
    activePhotoBookData: ICardProductData | undefined | null
    country: EulogiseCountry
  }) {
    const isPhotoBookAdded =
      keepsakesDetails.photoBook.option ===
        EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
      keepsakesDetails.photoBook.metaData.copyAmount > 0

    if (
      !activePhotoBookData ||
      !country ||
      !activePhotoBookData ||
      !isPhotoBookAdded
    ) {
      return 0
    }
    const photoBookCheckoutData = keepsakesDetails?.photoBook
    const coverType = PhotobookHelper.getCoverType(activePhotoBookData)
    const pageSize = activePhotoBookData?.content
      ?.pageSize as ValidPhotobookCheckoutSize

    const photoBookMetaData = photoBookCheckoutData?.metaData
    const photoBookNumberOfPages = photoBookMetaData?.bookStyle?.numberOfPages
    const photoBookAmount = photoBookMetaData?.copyAmount

    const photoBookUnitPrice = coverType
      ? PhotobookHelper.calculatePhotobookPrice({
          noOfPages: photoBookNumberOfPages,
          coverType,
          pageSize,
          country,
        })
      : 0

    return photoBookUnitPrice * photoBookAmount
  }

  public static getShouldShowShippingFeeInOrderSummary({
    printingShippingMethod,
    leatherVideoTributeBookShippingMethod,
    photoBookShippingMethod,
  }: {
    printingShippingMethod: CHECKOUTS_SHIPPING_METHOD
    leatherVideoTributeBookShippingMethod: CHECKOUTS_SHIPPING_METHOD
    photoBookShippingMethod: CHECKOUTS_SHIPPING_METHOD
  }) {
    if (printingShippingMethod !== CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING) {
      return true
    }
    if (
      leatherVideoTributeBookShippingMethod !==
      CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
    ) {
      return true
    }
    if (photoBookShippingMethod !== CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING) {
      return true
    }
    return false
  }

  public static getPhotoBookCheckoutDisplayedSizeText({
    photoBookSize,
  }: {
    photoBookSize: ValidPhotobookCheckoutSize | null
  }) {
    if (!photoBookSize) {
      return 'Unknown'
    }
    switch (photoBookSize) {
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM:
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM:
        return 'Medium'
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE:
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE:
        return 'Large'

      default:
        return 'Unknown'
    }
  }

  public static getPhotoBookShippingMethodByPageSize({
    photoBookSize,
  }: {
    photoBookSize: ValidPhotobookCheckoutSize | null
  }) {
    if (!photoBookSize) {
      return 'Unknown'
    }
    switch (photoBookSize) {
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM:
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM:
        return CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_MEDIUM_SIZE_SHIPPING
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE:
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE:
        return CHECKOUTS_SHIPPING_METHOD.PHOTO_BOOK_LARGE_SIZE_SHIPPING

      default:
        return 'Unknown'
    }
  }

  public static getPhotoBookLiveUnitPrice({
    activePhotoBook,
    country,
  }: {
    activePhotoBook: ICardProductData | null | undefined
    country: EulogiseCountry
  }) {
    if (!activePhotoBook) {
      return 999
    }
    const noOfPages = (activePhotoBook?.content?.pages?.length ?? 0) - 2
    const coverType = PhotobookHelper.getCoverType(activePhotoBook!)!
    const pageSize = activePhotoBook?.content
      ?.pageSize as ValidPhotobookCheckoutSize

    if (noOfPages <= 0 || !coverType || !pageSize) {
      return 999
    }
    return PhotobookHelper.calculatePhotobookPrice({
      noOfPages,
      coverType,
      pageSize: pageSize,
      country,
    })
  }

  public static getIsPhotoBookPurchasedByInvoices({
    invoices,
  }: {
    invoices: Array<IInvoice>
  }) {
    if (!invoices || invoices?.length === 0) {
      return false
    }
    return invoices.some((invoice: IInvoice) => {
      const isPaidInvoice = invoice.status === 'complete'
      if (!isPaidInvoice) return false
      return (
        invoice?.details?.keepsakesDetails?.photoBook?.option ===
          EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
        invoice?.details?.keepsakesDetails?.photoBook?.metaData?.copyAmount > 0
      )
    })
  }
}
