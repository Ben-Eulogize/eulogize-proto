import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { EulogiseProduct, ResourceFileStatus } from '@eulogise/core'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import { DownloadCardProductRow } from './DownloadCardProductRow'

const meta: Meta<typeof DownloadCardProductRow> = {
  title: 'Checkout V2/Download Card Product Row',
  component: DownloadCardProductRow,
  args: {
    onStartCreating: fn(),
    onKeepEditing: fn(),
    onPurchase: fn(),
    onConfirmGenerate: fn(),
    onShare: fn(),
  },
}

export default meta

type Story = StoryObj<typeof DownloadCardProductRow>

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
  hasCardProduct: false,
  hasGeneratePermission: true,
}

const createDownloadRowPreviewStory = (
  viewportKey: CheckoutViewportKey,
  extraArgs: Partial<Story['args']> = {},
): Story => ({
  name: `CheckoutProductPreview/DownloadCardProductRow/${getViewportLabel(
    viewportKey,
  )}`,
  args: {
    ...baseArgs,
    ...extraArgs,
  },
  globals: withViewportGlobals(viewportKey),
})

export const DownloadCardProductRowXS375 = createDownloadRowPreviewStory('XS')
export const DownloadCardProductRowSM768 = createDownloadRowPreviewStory('SM', {
  hasCardProduct: true,
  cardProductFileStatus: ResourceFileStatus.PROCESSING,
  processingContent: <div>Generating…</div>,
})
export const DownloadCardProductRowMD1024 = createDownloadRowPreviewStory(
  'MD',
  {
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.GENERATED,
  },
)
export const DownloadCardProductRowLG1440 = createDownloadRowPreviewStory(
  'LG',
  {
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.GENERATED,
    isAdmin: true,
  },
)
export const DownloadCardProductRowXL1920 = createDownloadRowPreviewStory(
  'XL',
  {
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.GENERATED,
    isAdmin: true,
    product: EulogiseProduct.PHOTOBOOK,
  },
)

export const AwaitingGeneration: Story = {
  args: {
    ...baseArgs,
  },
  globals: withViewportGlobals('LG'),
}

export const Processing: Story = {
  args: {
    product: EulogiseProduct.BOOKLET,
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.PROCESSING,
    processingContent: <div>Generating…</div>,
    hasGeneratePermission: true,
  },
  globals: withViewportGlobals('LG'),
}

export const Generated: Story = {
  args: {
    product: EulogiseProduct.BOOKLET,
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.GENERATED,
    hasGeneratePermission: true,
  },
  globals: withViewportGlobals('LG'),
}

export const PhotobookGenerated: Story = {
  args: {
    product: EulogiseProduct.PHOTOBOOK,
    hasCardProduct: true,
    cardProductFileStatus: ResourceFileStatus.GENERATED,
    isAdmin: true,
  },
  globals: withViewportGlobals('LG'),
}
