import {
  EulogiseCardProducts,
  EulogisePackageOptions,
  EulogisePurchaseInformationPackageName,
  EulogizePrintingProductDisplayNames,
} from '@eulogise/core'

interface StripeEulogizeProductMetaData {
  productName: string
  originalProductName: string
  currencyISOCode: string
  category: STRIPE_EULOGIZE_PRODUCT_CATEGORIES
}

interface StripeEulogizePackagesProducts {
  package: EulogisePurchaseInformationPackageName
  displayName: string
}

// Product display names for Stripe
const STRIPE_PACKAGE_DISPLAY_NAMES: Record<EulogisePackageOptions, string> = {
  // First time checkout
  [EulogisePackageOptions.ALL_TRIBUTES_BUNDLE]:
    'Eulogize Print and Screen Tributes Bundle',
  [EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY]:
    'Video Tributes Suite',
  [EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY]:
    'Printed Tribute Suite',
  [EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY]:
    'Printed Tribute Suite',
  // Upgrade (second time) checkout
  [EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES]: 'Video Tributes Upgrade',
  [EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY]:
    'Print Tributes Upgrade - PDF Only',
  [EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY]:
    'Print Tributes Upgrade - With Print and Delivery',
  // Keepsakes
  [EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK]:
    'Leather Video Book Purchase',
  [EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING]: 'Printing and Delivery',
  [EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK]:
    'Premium Photo Books and Albums',
} as const

// Optimized package products mapping
const STRIPE_EULOGIZE_PACKAGES_PRODUCTS: Record<
  EulogisePackageOptions,
  StripeEulogizePackagesProducts
> = Object.fromEntries(
  Object.entries(EulogisePackageOptions).map(([key, value]) => [
    value,
    {
      package:
        EulogisePurchaseInformationPackageName[value as EulogisePackageOptions],
      displayName:
        STRIPE_PACKAGE_DISPLAY_NAMES[value as EulogisePackageOptions],
    },
  ]),
) as Record<EulogisePackageOptions, StripeEulogizePackagesProducts>

// Keepsakes product names
const STRIPE_KEEPSAKES_PRODUCT_NAMES = {
  KEEPSAKES_LEATHER_VIDEO_TRIBUTE_BOOKS: 'Leather Video Book Purchase',
  KEEPSAKES_PHOTO_BOOKS: 'Premium Photo Book Purchase',
  KEEPSAKES_PERSONALISED_USB: 'N/A',
} as const

// Printing product names with template literals
const STRIPE_PRINTING_PRODUCT_NAMES = {
  PRINTING_BOOKLET: `Printing Tributes - ${EulogizePrintingProductDisplayNames.BOOKLET_US}`,
  PRINTING_SIDED_CARD: `Printing Tributes - ${EulogizePrintingProductDisplayNames.SIDED_CARD_US}`,
  PRINTING_BOOKMARK: `Printing Tributes - ${EulogizePrintingProductDisplayNames.BOOKMARK}`,
  PRINTING_THANK_YOU_CARD: `Printing Tributes - ${EulogizePrintingProductDisplayNames.THANK_YOU_CARD}`,
} as const

// Optimized printing products mapping
// @ts-ignore
const STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES: Record<
  EulogiseCardProducts,
  string
> = {
  [EulogiseCardProducts.BOOKLET]:
    STRIPE_PRINTING_PRODUCT_NAMES.PRINTING_BOOKLET,
  [EulogiseCardProducts.SIDED_CARD]:
    STRIPE_PRINTING_PRODUCT_NAMES.PRINTING_SIDED_CARD,
  [EulogiseCardProducts.BOOKMARK]:
    STRIPE_PRINTING_PRODUCT_NAMES.PRINTING_BOOKMARK,
  [EulogiseCardProducts.THANK_YOU_CARD]:
    STRIPE_PRINTING_PRODUCT_NAMES.PRINTING_THANK_YOU_CARD,
  [EulogiseCardProducts.TV_WELCOME_SCREEN]: 'N/A',
  [EulogiseCardProducts.PHOTOBOOK]: 'N/A',
}

// Reverse mapping for display name to product
const STRIPE_EULOGIZE_PRINTING_PRODUCTS_DISPLAY_NAME_MAPPING: Record<
  string,
  EulogiseCardProducts
> = Object.fromEntries(
  Object.entries(STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES).map(
    ([key, value]) => [value, key as EulogiseCardProducts],
  ),
)

// Shipping product names
const STRIPE_SHIPPING_PRODUCT_NAMES = {
  KEEPSAKES_SHIPPING: 'Keepsakes Shipping Service',
  PRINTING_SHIPPING: 'Printing Tributes Shipping Service',
  PHOTOBOOK_SHIPPING: 'Photo Book Shipping',
} as const

// Product categories
enum STRIPE_EULOGIZE_PRODUCT_CATEGORIES {
  PACKAGE = 'package',
  KEEPSAKES = 'keepsakes',
  PRINTING = 'printing',
  SHIPPING = 'shipping',
}

// Type exports for better type safety
export type StripePackageDisplayName =
  (typeof STRIPE_PACKAGE_DISPLAY_NAMES)[EulogisePackageOptions]
export type StripeKeepsakesProductName =
  (typeof STRIPE_KEEPSAKES_PRODUCT_NAMES)[keyof typeof STRIPE_KEEPSAKES_PRODUCT_NAMES]
export type StripePrintingProductName =
  (typeof STRIPE_PRINTING_PRODUCT_NAMES)[keyof typeof STRIPE_PRINTING_PRODUCT_NAMES]
export type StripeShippingProductName =
  (typeof STRIPE_SHIPPING_PRODUCT_NAMES)[keyof typeof STRIPE_SHIPPING_PRODUCT_NAMES]

export {
  STRIPE_EULOGIZE_PACKAGES_PRODUCTS,
  STRIPE_KEEPSAKES_PRODUCT_NAMES,
  STRIPE_PRINTING_PRODUCT_NAMES,
  STRIPE_EULOGIZE_PRINTING_PRODUCTS_NAMES,
  STRIPE_SHIPPING_PRODUCT_NAMES,
  STRIPE_EULOGIZE_PRODUCT_CATEGORIES,
  StripeEulogizeProductMetaData,
  STRIPE_EULOGIZE_PRINTING_PRODUCTS_DISPLAY_NAME_MAPPING,
  STRIPE_PACKAGE_DISPLAY_NAMES,
}
