import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import {
  CardProductPageOrientation,
  CardProductPageSize,
  CardProductPageType,
  EulogiseCountry,
  EulogisePackageOptions,
  EulogisePhotobookCoverType,
  ICardProductData,
  MemorialVisualStatus,
} from '@eulogise/core'
import {
  CHECKOUT_BREAKPOINT,
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES,
} from '@eulogise/client-core'
import PackageCard from './PackageCard'

const meta: Meta<typeof PackageCard> = {
  title: 'Checkout V2/PackageCard',
  component: PackageCard,
  args: {
    country: EulogiseCountry.UNITED_STATES,
    invoices: [],
    onSelect: fn(),
  },
}

export default meta

type Story = StoryObj<typeof PackageCard>

type CheckoutViewportKey = keyof typeof CHECKOUT_BREAKPOINT

const getViewportLabel = (viewportKey: CheckoutViewportKey) =>
  CHECKOUT_VIEWPORTS_EXAMPLE_DEVICES[CHECKOUT_BREAKPOINT[viewportKey]]

const withViewportGlobals = (viewportKey: CheckoutViewportKey) => ({
  viewport: {
    value: viewportKey,
    isRotated: false,
  },
})

const mockPhotobook: ICardProductData = {
  id: 'photobook-1',
  case: 'case-1',
  content: {
    pageMargins: { top: 0, bottom: 0, left: 0, right: 0 },
    pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    theme: 'default-theme',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        id: 'cover-page',
        pageNumber: 0,
        pageType: CardProductPageType.PHOTOBOOK_COVER_PAGE,
        elements: [],
        background: null,
        coverType: EulogisePhotobookCoverType.METALLIC_CHESTNUT_BUCKRAM,
      } as any,
    ],
  } as any,
  status: MemorialVisualStatus.COMPLETE,
  createdAt: '',
  updatedAt: '',
}

const createPackageStory = (
  packageOption: EulogisePackageOptions,
  extraArgs: Partial<Story['args']> = {},
  viewportKey: CheckoutViewportKey = 'LG',
  storyName?: string,
): Story => ({
  name: storyName,
  args: {
    packageOption,
    activePhotobook:
      packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK
        ? mockPhotobook
        : null,
    ...extraArgs,
  },
  globals: withViewportGlobals(viewportKey),
})

const createPackagePreviewStory = (viewportKey: CheckoutViewportKey) =>
  createPackageStory(
    EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
    {},
    viewportKey,
    `CheckoutProductPreview/PackageCard/${getViewportLabel(viewportKey)}`,
  )

export const PackageCardXS375 = createPackagePreviewStory('XS')
export const PackageCardSM768 = createPackagePreviewStory('SM')
export const PackageCardMD1024 = createPackagePreviewStory('MD')
export const PackageCardLG1440 = createPackagePreviewStory('LG')
export const PackageCardXL1920 = createPackagePreviewStory('XL')

export const AllTributesBundle: Story = createPackageStory(
  EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
)
export const PrintablePdfOnly: Story = createPackageStory(
  EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY,
)
export const PrintableWithDelivery: Story = createPackageStory(
  EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY,
)
export const VideoAndWelcomeScreen: Story = createPackageStory(
  EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
)
export const UpgradeVideoTributes: Story = createPackageStory(
  EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
)
export const UpgradePrintablePdfOnly: Story = createPackageStory(
  EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
)
export const UpgradePrintableWithDelivery: Story = createPackageStory(
  EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
)
export const AddOnLeatherVideoBook: Story = createPackageStory(
  EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
)
export const AddOnPremiumPrinting: Story = createPackageStory(
  EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING,
)
export const AddOnPremiumPhotoBook: Story = createPackageStory(
  EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
)
