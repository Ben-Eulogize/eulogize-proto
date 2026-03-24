import type { Meta, StoryObj } from '@storybook/react'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import Price from './Price'

const meta: Meta<typeof Price> = {
  title: 'Checkout V2/Price',
  component: Price,
  args: {
    priceNumber: 199.99,
    withDollarSign: true,
  },
}

export default meta

type Story = StoryObj<typeof Price>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const createPricePreviewStory = (
  viewportKey: CheckoutViewportKey,
  extraArgs: Partial<Story['args']> = {},
): Story => ({
  name: `CheckoutProductPreview/Price/${getViewportLabel(viewportKey)}`,
  args: {
    ...extraArgs,
  },
  globals: withViewportGlobals(viewportKey),
})

export const PriceNormal = createPricePreviewStory('LG')

export const WithoutDollarSign: Story = {
  args: {
    priceNumber: 120,
    withDollarSign: false,
  },
  globals: withViewportGlobals('LG'),
}

export const AccentColor: Story = {
  args: {
    priceNumber: 59.99,
    $color: '#1E805E',
  },
  globals: withViewportGlobals('LG'),
}

export const TightLetterSpacing: Story = {
  args: {
    priceNumber: 19.99,
    $letterSpacing: '-3px',
  },
  globals: withViewportGlobals('LG'),
}
