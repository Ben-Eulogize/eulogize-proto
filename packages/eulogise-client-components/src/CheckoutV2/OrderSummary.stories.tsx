import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import {
  CHECKOUTS_SHIPPING_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogisePackageOptions,
  EulogizePrintingProductsPaperTypes,
  LeatherVideoTributeMaterial,
  LeatherVideoTributeMaterialColor,
  OrderSummaryPrintingProductDetailsSummary,
  OrderSummaryShippingProductDetailsSummary,
} from '@eulogise/core'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import { OrderSummary } from './OrderSummary'

const printingProductDetailsSummary: Array<OrderSummaryPrintingProductDetailsSummary> =
  [
    {
      printingProduct: EulogiseCardProducts.BOOKLET,
      isProductOrderedForPrinting: true,
      paperType: EulogizePrintingProductsPaperTypes.PREMIUM_LINEN,
      copiesAmount: 60,
      productPageAmount: 0,
    },
  ]

const shippingProductDetailsSummary: Array<OrderSummaryShippingProductDetailsSummary> =
  [
    {
      shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
      shippingFee: 24.95,
      shippingMethod: CHECKOUTS_SHIPPING_METHOD.STANDARD_SHIPPING,
    },
  ]

const meta: Meta<typeof OrderSummary> = {
  title: 'Checkout V2/Order Summary',
  component: OrderSummary,
  args: {
    packageOption: EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    showPrintingFee: true,
    showShippingFee: true,
    showShippingCalculatedNext: false,
    showPrintPriceCalculatedNext: false,
    showLeatherVideoTributeBookFee: true,
    showPhotoBookFee: true,
    photoBookFee: 129.99,
    leatherVideoTributeBookFee: 199.0,
    leatherVideoTributeBookAmount: 1,
    leatherVideoTributeBookColour: LeatherVideoTributeMaterialColor.WHITE,
    leatherVideoTributeBookMaterial: LeatherVideoTributeMaterial.LEATHER,
    printingFee: 150,
    shippingFee: 24.95,
    digitalProductFee: 99,
    countryCurrencySymbol: '$',
    shouldShowTotal: true,
    shippingProductDetailsSummary,
    printingProductDetailsSummary,
    country: EulogiseCountry.UNITED_STATES,
    shouldShowPrintingActions: true,
    shouldShowKeepsakeActions: true,
    shouldExpandByDefault: true,
    onRemovePrintingProduct: fn(),
    onEditPrintingProduct: fn(),
    onRemoveKeepsake: fn(),
    onEditKeepsake: fn(),
    photoBookDescription: 'Premium Linen | 11x14 | 30 Pages',
    photoBookAmount: 2,
  },
}

export default meta

type Story = StoryObj<typeof OrderSummary>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const createOrderSummaryStory = (
  viewportKey: CheckoutViewportKey,
  label: string = getViewportLabel(viewportKey),
  extraArgs: Partial<Story['args']> = {},
): Story => ({
  name: `CheckoutProductPreview/OrderSummary/${label}`,
  args: {
    ...extraArgs,
  },
  globals: withViewportGlobals(viewportKey),
})

const collaposedArgs: Partial<Story['args']> = {
  shouldExpandByDefault: false,
  showPrintingFee: false,
  showLeatherVideoTributeBookFee: false,
  showPhotoBookFee: false,
  printingProductDetailsSummary: [],
  shippingProductDetailsSummary: [],
}

export const OrderSummaryXS375 = createOrderSummaryStory('XS')

export const OrderSummarySM768 = createOrderSummaryStory('SM')

export const OrderSummaryMD1024 = createOrderSummaryStory('MD')

export const OrderSummaryLG1440 = createOrderSummaryStory('LG')

export const OrderSummaryXL1920 = createOrderSummaryStory('XL')

export const CollapsedSummaryXS375 = createOrderSummaryStory(
  'XS',
  `Collapsed – ${getViewportLabel('XS')}`,
  collaposedArgs,
)

export const CollapsedSummarySM768 = createOrderSummaryStory(
  'SM',
  `Collapsed – ${getViewportLabel('SM')}`,
  collaposedArgs,
)

export const CollapsedSummaryMD1024 = createOrderSummaryStory(
  'MD',
  `Collapsed – ${getViewportLabel('MD')}`,
  collaposedArgs,
)

export const CollapsedSummaryLG1440 = createOrderSummaryStory(
  'LG',
  `Collapsed – ${getViewportLabel('LG')}`,
  collaposedArgs,
)

export const CollapsedSummaryXL1920 = createOrderSummaryStory(
  'XL',
  `Collapsed – ${getViewportLabel('XL')}`,
  collaposedArgs,
)
