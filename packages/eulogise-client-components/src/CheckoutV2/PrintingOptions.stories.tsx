import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import {
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  EulogiseCountry,
} from '@eulogise/core'
import { PrintingOptions } from './PrintingOptions'
import {
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
  CHECKOUT_BREAKPOINT,
} from '@eulogise/client-core'

const meta: Meta<typeof PrintingOptions> = {
  title: 'Checkout V2/Printing Options',
  component: PrintingOptions,
  args: {
    id: 'printing-ordered',
    method: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
    headerText: 'Add printing and delivery',
    description: ['Printed on premium stock and delivered to your door.'],
    showAddressInput: false,
    thumbnailSrc: `https://staging.media.eulogisememorials.com/assets/checkouts/printing-options/printing-and-deliver-option-thumbnail.png`,
    country: EulogiseCountry.UNITED_STATES,
    printingAddressDetails: null,
    isPrintingDeliverySkipped: false,
    onChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof PrintingOptions>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const createPrintingOrderedStory = (
  viewportKey: CheckoutViewportKey,
  label: string = getViewportLabel(viewportKey),
): Story => ({
  name: `CheckoutProductPreview/PrintingOrdered/${label}`,
  globals: withViewportGlobals(viewportKey),
  args: {
    selectedPrintingDeliveryMethod:
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED,
  },
})

const createNoPrintingStory = (
  viewportKey: CheckoutViewportKey,
  label: string = getViewportLabel(viewportKey),
): Story => ({
  name: `CheckoutProductPreview/NoPrinting/${label}`,
  args: {
    method: CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED,
    headerText: 'No, I will skip printing',
    selectedPrintingDeliveryMethod:
      CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.NO_PRINTING_ORDERED,
    isPrintingDeliverySkipped: true,
    thumbnailSrc: null,
  },
  globals: withViewportGlobals(viewportKey),
})

export const PrintingOrderedXS375 = createPrintingOrderedStory('XS')

export const PrintingOrderedSM768 = createPrintingOrderedStory('SM')

export const PrintingOrderedMD1024 = createPrintingOrderedStory('MD')

export const PrintingOrderedLG1440 = createPrintingOrderedStory('LG')

export const PrintingOrderedXL1920 = createPrintingOrderedStory('XL')

export const NoPrintingXS375 = createNoPrintingStory('XS')

export const NoPrintingSM768 = createNoPrintingStory('SM')

export const NoPrintingMD1024 = createNoPrintingStory('MD')

export const NoPrintingLG1440 = createNoPrintingStory('LG')

export const NoPrintingXL1920 = createNoPrintingStory('XL')
