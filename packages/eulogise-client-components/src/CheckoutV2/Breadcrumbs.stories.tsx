import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { EulogisePackageOptions, EulogisePage } from '@eulogise/core'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import { BreadCrumbs, CHECKOUT_V2_URL_STEPS_MAPS } from './Breadcrumbs'

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Checkout V2/Breadcrumbs',
  component: BreadCrumbs,
  args: {
    packageOption: EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    onRedirect: fn(),
    onPackageClick: fn(),
    shouldShowPrintingDetails: true,
    shouldShowPrintingOptions: true,
    shouldShowKeepsakes: true,
    shouldShowShipping: true,
  },
}

export default meta

type Story = StoryObj<typeof BreadCrumbs>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const createBreadcrumbsPreviewStory = (
  viewportKey: CheckoutViewportKey,
): Story => ({
  name: `CheckoutProductPreview/Breadcrumbs/${getViewportLabel(viewportKey)}`,
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
  },
  globals: withViewportGlobals(viewportKey),
})

const defaultStepGlobals = withViewportGlobals('LG')

export const BreadcrumbsXS375: Story = createBreadcrumbsPreviewStory('XS')
export const BreadcrumbsSM768: Story = createBreadcrumbsPreviewStory('SM')
export const BreadcrumbsMD1024: Story = createBreadcrumbsPreviewStory('MD')
export const BreadcrumbsLG1440: Story = createBreadcrumbsPreviewStory('LG')
export const BreadcrumbsXL1920: Story = createBreadcrumbsPreviewStory('XL')

export const PackageStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.PACKAGE,
  },
  globals: defaultStepGlobals,
}

export const PrintingOptionsStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_OPTIONS,
  },
  globals: defaultStepGlobals,
}

export const PrintingDetailsStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.PRINTING_DETAILS,
  },
  globals: defaultStepGlobals,
}

export const KeepsakesStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
  },
  globals: defaultStepGlobals,
}

export const ShippingStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING,
  },
  globals: defaultStepGlobals,
}

export const PaymentStep: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.PAYMENT,
    onRedirect: fn<(page: EulogisePage) => void>(),
  },
  globals: defaultStepGlobals,
}

export const WithoutPrintingSteps: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    shouldShowPrintingDetails: false,
    shouldShowPrintingOptions: false,
    shouldShowKeepsakes: true,
    shouldShowShipping: true,
  },
  globals: defaultStepGlobals,
}

export const UpgradingPrintedPackages: Story = {
  args: {
    url: CHECKOUT_V2_URL_STEPS_MAPS.KEEPSAKES,
    shouldShowPrintingDetails: false,
    shouldShowPrintingOptions: false,
    shouldShowKeepsakes: true,
    shouldShowShipping: false,
  },
  globals: defaultStepGlobals,
}
