import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { EulogiseProduct } from '@eulogise/core'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import { CheckoutsCardProductDownloadButtons } from './CheckoutsCardProductDownloadButtons'

const meta: Meta<typeof CheckoutsCardProductDownloadButtons> = {
  title: 'Checkout V2/Download Buttons',
  component: CheckoutsCardProductDownloadButtons,
  args: {
    onDownloadBleed: fn(),
    onDownloadStandard: fn(),
  },
}

export default meta

type Story = StoryObj<typeof CheckoutsCardProductDownloadButtons>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const baseArgs: Story['args'] = {
  product: EulogiseProduct.BOOKLET,
}

const createDownloadButtonsPreviewStory = (
  viewportKey: CheckoutViewportKey,
  extraArgs: Partial<Story['args']> = {},
): Story => ({
  name: `CheckoutProductPreview/DownloadButtons/${getViewportLabel(
    viewportKey,
  )}`,
  args: {
    ...baseArgs,
    ...extraArgs,
  },
  globals: withViewportGlobals(viewportKey),
})

export const DownloadButtonsXS375 = createDownloadButtonsPreviewStory('XS')
export const DownloadButtonsSM768 = createDownloadButtonsPreviewStory('SM')
export const DownloadButtonsMD1024 = createDownloadButtonsPreviewStory('MD', {
  product: EulogiseProduct.PHOTOBOOK,
  onViewPhotobook: fn(),
})
export const DownloadButtonsLG1440 = createDownloadButtonsPreviewStory('LG', {
  product: EulogiseProduct.PHOTOBOOK,
  onViewPhotobook: fn(),
  onSharePhotobook: fn(),
  onPurchasePhotobook: fn(),
})
export const DownloadButtonsXL1920 = createDownloadButtonsPreviewStory('XL', {
  product: EulogiseProduct.PHOTOBOOK,
  isAdmin: true,
  isPhotobookInternalsDownloadLoading: false,
  onDownloadPhotobookInternals: fn(),
  onDownloadPhotobookCover: fn(),
})

export const PrintableTribute: Story = {
  args: {
    product: EulogiseProduct.BOOKLET,
  },
  globals: withViewportGlobals('LG'),
}

export const PhotobookCustomer: Story = {
  args: {
    product: EulogiseProduct.PHOTOBOOK,
    onViewPhotobook: fn(),
    onSharePhotobook: fn(),
    onPurchasePhotobook: fn(),
  },
  globals: withViewportGlobals('LG'),
}

export const PhotobookAdmin: Story = {
  args: {
    product: EulogiseProduct.PHOTOBOOK,
    isAdmin: true,
    isPhotobookInternalsDownloadLoading: false,
    onDownloadPhotobookInternals: fn(),
    onDownloadPhotobookCover: fn(),
    onCopyPhotobookCoverLink: fn(),
    onCopyPhotobookInternalsLink: fn(),
  },
  globals: withViewportGlobals('LG'),
}
