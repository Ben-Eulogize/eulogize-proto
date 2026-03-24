import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { EulogiseCardProducts } from '@eulogise/core'
import PrintingOptionCard from './PrintingOptionCard'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'

const meta: Meta<typeof PrintingOptionCard> = {
  title: 'Checkout V2/Printing Option Card',
  component: PrintingOptionCard,
  args: {
    product: EulogiseCardProducts.BOOKLET,
    displayName: 'Folded Funereal Program',
    displayedSize: '5.5" x 8.5"',
    stringPrice: 3.99,
    previewThumbnailImgSrc:
      'https://staging.media.eulogisememorials.com/assets/checkouts/printing-options/printing-and-deliver-option-thumbnail.png',
    isSelected: false,
    isProductAvailableToPrint: true,
    shouldShowNotAvailableInYourArea: false,
    onViewOptions: fn(),
  },
}

export default meta

type Story = StoryObj<typeof PrintingOptionCard>

export const XS375: Story = {
  name: CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT.XS],
  args: {
    isProductAvailableToPrint: false,
  },
  globals: {
    viewport: {
      value: 'XS',
      isRotated: false,
    },
  },
}

export const SM768: Story = {
  name: CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT.SM],
  args: {
    isSelected: true,
  },
  globals: {
    viewport: {
      value: 'SM',
      isRotated: false,
    },
  },
}

export const MD1024: Story = {
  name: CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT.MD],
  globals: {
    viewport: {
      value: 'MD',
      isRotated: false,
    },
  },
}

export const LG1440: Story = {
  name: CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT.LG],
  globals: {
    viewport: {
      value: 'LG',
      isRotated: false,
    },
  },
}

export const XL1920: Story = {
  name: CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT.XL],
  args: {
    isSelected: true,
  },
  globals: {
    viewport: {
      value: 'XL',
      isRotated: false,
    },
  },
}
