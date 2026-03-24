import { CHECKOUT_BREAKPOINT, COLOR, STYLE } from '@eulogise/client-core'
import {
  CardProductPageSize,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogisePackageOptions,
  EULOGIZE_CHECKOUT_PACKAGE_OPTION,
  ICardProductData,
  IInvoice,
} from '@eulogise/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button, ButtonSize, ButtonType } from '../Button'
import { CheckFilledIcon, CheckedIcon } from '../icons'
import { CheckoutHelper } from '@eulogise/helpers'

const BACKGROUND_PURPLE = `rgba(236, 223, 239, 0.7);`
const LARGE_SCREEN_PACKAGE_CARD_WIDTH = 308
const SMALL_SCREEN_PACKAGE_CARD_WIDTH = 260
const LARGE_SCREEN_BUTTON_WIDTH = 260
const SMALL_SCREEN_BUTTON_WIDTH = 228

const BUCKET_URL = 'staging.media.eulogisememorials.com'

interface PackageItem {
  label: string
  children?: string[]
}

enum PackageItemsEnum {
  FUNERAL_PROGRAM = 'FUNERAL_PROGRAM',
  TRIBUTE_VIDEO = 'TRIBUTE_VIDEO',
  INSTANT_PDF_DOWNLOAD = 'INSTANT_PDF_DOWNLOAD',
  ALL_TRIBUTES_CAN_BE_PRINTED = 'ALL_TRIBUTES_CAN_BE_PRINTED',
  PROFESSIONAL_PREMIUM_PRINTS_DELIVERED = 'PROFESSIONAL_PREMIUM_PRINTS_DELIVERED',
  PHOTO_BOOK_PAGES = 'PHOTO_BOOK_PAGES',
  PHOTO_BOOK_ARVCHIVAL_QUALITY_PAPER = 'PHOTO_BOOK_ARVCHIVAL_QUALITY_PAPER',
  PHOTO_BOOK_VIBRANT_SIX_COLOR_PRINTING = 'PHOTO_BOOK_VIBRANT_SIX_COLOR_PRINTING',
  PHOTO_BOOK_SELECTION_OF_PREMIUM_HARD_COVER_FABRICS = 'PHOTO_BOOK_SELECTION_OF_PREMIUM_HARD_COVER_FABRICS',
  PHOTO_BOOK_OPTIONAL_MATCHING_PRESENTATION_BOX_UPGRADE = 'PHOTO_BOOK_OPTIONAL_MATCHING_PRESENTATION_BOX_UPGRADE',
  BUNDLE_OPTIONAL_PRINTING_DELIVERY_CAN_BE_ADDED = 'BUNDLE_OPTIONAL_PRINTING_DELIVERY_CAN_BE_ADDED',
  CHOICE_OF_THREE_QUALITY_PAPER_STOCKS = 'CHOICE_OF_THREE_QUALITY_PAPER_STOCKS',
  TV_WELCOME_SCREEN_JPG_DOWNLOAD = 'TV_WELCOME_SCREEN_JPG_DOWNLOAD',
  READY_TO_PLAY_AN_ANY_TV_OR_SCREEN = 'READY_TO_PLAY_AN_ANY_TV_OR_SCREEN',
  OPTIONAL_VIDEO_BOOK_ADD_ON = 'OPTIONAL_VIDEO_BOOK_ADD_ON',
}

export const PACKAGE_ITEMS: Record<PackageItemsEnum, PackageItem> = {
  [PackageItemsEnum.FUNERAL_PROGRAM]: {
    label: 'Funeral program - pdf download',
  },
  [PackageItemsEnum.TRIBUTE_VIDEO]: {
    label: 'Tribtue Video - MP4 download',
  },
  [PackageItemsEnum.INSTANT_PDF_DOWNLOAD]: {
    label: 'Instant PDF download of',
    children: ['Funeral Program', 'Service Card', 'Thank You Card', 'Bookmark'],
  },
  [PackageItemsEnum.ALL_TRIBUTES_CAN_BE_PRINTED]: {
    label: 'All tribtues can be printed at home or professionally',
  },
  [PackageItemsEnum.PROFESSIONAL_PREMIUM_PRINTS_DELIVERED]: {
    label: 'Professional premium prints delivered to your door',
  },
  [PackageItemsEnum.PHOTO_BOOK_PAGES]: {
    label: '24-200 pages',
  },
  [PackageItemsEnum.PHOTO_BOOK_ARVCHIVAL_QUALITY_PAPER]: {
    label: 'Archival quality paper',
  },
  [PackageItemsEnum.PHOTO_BOOK_VIBRANT_SIX_COLOR_PRINTING]: {
    label: 'Vibrant 6-color printing',
  },
  [PackageItemsEnum.PHOTO_BOOK_SELECTION_OF_PREMIUM_HARD_COVER_FABRICS]: {
    label: 'Selection of premium hard cover fabrics',
  },
  [PackageItemsEnum.PHOTO_BOOK_OPTIONAL_MATCHING_PRESENTATION_BOX_UPGRADE]: {
    label: 'Optional matching Presentation Box upgrade (costs apply)',
  },
  [PackageItemsEnum.BUNDLE_OPTIONAL_PRINTING_DELIVERY_CAN_BE_ADDED]: {
    label: 'Print & delivery can be added (costs apply)',
  },
  [PackageItemsEnum.CHOICE_OF_THREE_QUALITY_PAPER_STOCKS]: {
    label: 'Choice of three quality paper stocks',
  },
  [PackageItemsEnum.TV_WELCOME_SCREEN_JPG_DOWNLOAD]: {
    label: 'TV Welcome Screen - JPG download',
  },
  [PackageItemsEnum.READY_TO_PLAY_AN_ANY_TV_OR_SCREEN]: {
    label: 'Ready to play an any TV or screen',
  },
  [PackageItemsEnum.OPTIONAL_VIDEO_BOOK_ADD_ON]: {
    label: 'Optional Video Book add-on to re-watch anywhere (costs apply)',
  },
}

enum DisplayPriceType {
  FIXED = 'fixed',
  START_FROM = 'start-from',
  DYNAMIC = 'dynamic',
}

interface PackageCardProps {
  country: EulogiseCountry
  packageOption: EulogisePackageOptions
  invoices: Array<IInvoice>
  activePhotobook: ICardProductData | null
  onSelect: () => void
}

const StyledPackageCardContainer = styled.div<{
  $isBestValue: boolean
  $isUpgradeToBundle: boolean
  $backgroundColor: string
}>`
  border-radius: 8px;
  border: 2px solid var(--Border, ${COLOR.LIGHT_GREY});
  ${({ $backgroundColor }) =>
    $backgroundColor ? `background: ${$backgroundColor};` : ``}
  width: ${SMALL_SCREEN_PACKAGE_CARD_WIDTH + 4}px;
  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LARGE_SCREEN_PACKAGE_CARD_WIDTH + 4}px;
  }
  ${({ $isBestValue, $isUpgradeToBundle }) =>
    $isBestValue || $isUpgradeToBundle
      ? `height: 932px; margin: 0 8px`
      : `height: 900px; margin: 32px 8px 0 8px;`}
`

const StyledPreviewThumbnail = styled.img<{
  $isBestValue: boolean
  $isUpgradeToBundle: boolean
}>`
  width: ${SMALL_SCREEN_PACKAGE_CARD_WIDTH}px;
  height: 162px;
  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LARGE_SCREEN_PACKAGE_CARD_WIDTH}px;
  }

  ${({ $isBestValue, $isUpgradeToBundle }) =>
    $isBestValue || $isUpgradeToBundle
      ? `border-radius: 0px 0px 6px 6px`
      : `border-radius: 6px;`}
`

// Content
const StyledContentContainer = styled.div`
  margin: 24px 20px;
`

// Header
const StyledPackageText = styled.div<{ $height?: number }>`
  color: ${COLOR.CORE_PURPLE};
  text-align: center;
  padding: 0 16px;
  ${STYLE.HEADING_MEDIUM}
  ${({ $height }) => ($height ? `height: ${$height}px` : `height: 64px;`)}
`

const StyledPackageSecondaryText = styled.div`
  text-align: center;
  ${STYLE.MEDIUM};
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Price
const StyledPrice = styled.div<{ $isStartingFrom: boolean }>`
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 40px;
  margin: 16px 0;
  ${({ $isStartingFrom }) =>
    $isStartingFrom ? `letter-spacing: -4px;` : `letter-spacing: -1px;`}
`

const StyledPriceContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`

const StyledPriceDecorator = styled.div`
  ${STYLE.MEDIUM};
  display: flex;
  align-items: center;
  margin: 8px 8px 0 8px;
`

const StyledWhatsIncludedText = styled.div`
  ${STYLE.SMALL};
  color: ${COLOR.CORE_PURPLE};
  margin-bottom: 16px;
`

const StyledItemContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const StyledCheckIcon = styled(CheckFilledIcon)`
  color: ${COLOR.CORE_PURPLE};
  width: 20px;
  height: 20px;
  margin-right: 8px;
  margin-top: 3px;
`

const StyledItemText = styled.div`
  ${STYLE.SMALL};
  width: 100%;
`

const StyledSelectButton = styled(Button)`
  margin: 16px 0;
  width: ${SMALL_SCREEN_BUTTON_WIDTH}px;
  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LARGE_SCREEN_BUTTON_WIDTH}px;
  }
`

const StyledBestValueContainer = styled.div`
  background-color: ${COLOR.CORE_PURPLE};
  border-radius: 6px 6px 0px 0px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBestValueText = styled.div`
  color: ${COLOR.WHITE};
  font-size: 14px;
  text-align: center;
`

const StyledPlaceHolder = styled.div`
  display: block;
  height: 32px;
`

const StyledSelectButtonContainer = styled.div``

const StyledSubItemContainer = styled.div`
  display: flex;
  margin-top: 6px;
`

const StyledSubCheckIcon = styled(CheckedIcon)`
  color: ${COLOR.CORE_PURPLE};
  width: 16px;
  height: 16px;
  margin-right: 8px;
  margin-top: 2px;
`

const StyledSubItemText = styled.div`
  ${STYLE.SMALL};
`

interface CheckoutPackageCardDetailsMappingProps {
  isBestValue: boolean
  isUpgradeToBundle: boolean
  headerText: string
  secondaryHeaderText: string | null
  priceType: DisplayPriceType
  itemsList: Array<PackageItemsEnum>
  previewThumbnailSrc: string
}

export const PACKAGE_CARD_DETAILS_MAPPING: Record<
  Partial<EulogisePackageOptions>,
  CheckoutPackageCardDetailsMappingProps
> = {
  // First-time Purchased Packages
  [EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Printable Tributes',
    secondaryHeaderText: 'PDF Download Only',
    priceType: DisplayPriceType.FIXED,
    itemsList: [
      PackageItemsEnum.INSTANT_PDF_DOWNLOAD,
      PackageItemsEnum.ALL_TRIBUTES_CAN_BE_PRINTED,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/printable-tributes.jpg`,
  },
  [EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Print & Delivery',
    secondaryHeaderText: 'plus PDF downloads',
    priceType: DisplayPriceType.START_FROM,
    itemsList: [
      PackageItemsEnum.PROFESSIONAL_PREMIUM_PRINTS_DELIVERED,
      PackageItemsEnum.INSTANT_PDF_DOWNLOAD,
      PackageItemsEnum.CHOICE_OF_THREE_QUALITY_PAPER_STOCKS,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/print-delivery.jpg`,
  },
  [EulogisePackageOptions.ALL_TRIBUTES_BUNDLE]: {
    isBestValue: true,
    isUpgradeToBundle: false,
    headerText: 'All Tributes Bundle',
    secondaryHeaderText: null,
    priceType: DisplayPriceType.FIXED,
    itemsList: [
      PackageItemsEnum.TRIBUTE_VIDEO,
      PackageItemsEnum.TV_WELCOME_SCREEN_JPG_DOWNLOAD,
      PackageItemsEnum.INSTANT_PDF_DOWNLOAD,
      PackageItemsEnum.ALL_TRIBUTES_CAN_BE_PRINTED,
      PackageItemsEnum.BUNDLE_OPTIONAL_PRINTING_DELIVERY_CAN_BE_ADDED,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/bundle.jpg`,
  },
  [EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Video & Screen Tributes',
    secondaryHeaderText: null,
    priceType: DisplayPriceType.FIXED,
    itemsList: [
      PackageItemsEnum.TRIBUTE_VIDEO,
      PackageItemsEnum.TV_WELCOME_SCREEN_JPG_DOWNLOAD,
      PackageItemsEnum.READY_TO_PLAY_AN_ANY_TV_OR_SCREEN,
      PackageItemsEnum.OPTIONAL_VIDEO_BOOK_ADD_ON,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/video-screen.jpg`,
  },
  // Upgraded Packages
  [EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES]: {
    isBestValue: false,
    isUpgradeToBundle: true,
    headerText: 'Video & Screen Tributes',
    secondaryHeaderText: null,
    priceType: DisplayPriceType.FIXED,
    itemsList: [
      PackageItemsEnum.TRIBUTE_VIDEO,
      PackageItemsEnum.TV_WELCOME_SCREEN_JPG_DOWNLOAD,
      PackageItemsEnum.READY_TO_PLAY_AN_ANY_TV_OR_SCREEN,
      PackageItemsEnum.OPTIONAL_VIDEO_BOOK_ADD_ON,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/video-screen.jpg`,
  },
  [EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY]: {
    isBestValue: false,
    isUpgradeToBundle: true,
    headerText: 'Printable Tributes',
    secondaryHeaderText: 'PDF downloads',
    priceType: DisplayPriceType.FIXED,
    itemsList: [
      PackageItemsEnum.INSTANT_PDF_DOWNLOAD,
      PackageItemsEnum.ALL_TRIBUTES_CAN_BE_PRINTED,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/upgrade-printable.jpg`,
  },
  [EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY]: {
    isBestValue: false,
    isUpgradeToBundle: true,
    headerText: 'Print & Delivery',
    secondaryHeaderText: 'plus PDF Downloads',
    priceType: DisplayPriceType.START_FROM,
    itemsList: [
      PackageItemsEnum.PROFESSIONAL_PREMIUM_PRINTS_DELIVERED,
      PackageItemsEnum.INSTANT_PDF_DOWNLOAD,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/upgrade-printable.jpg`,
  },
  // Keepsakes
  [EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Leather Video Book',
    secondaryHeaderText: null,
    priceType: DisplayPriceType.DYNAMIC,
    itemsList: [],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/video-book-features/1.png`,
  },
  [EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Print & Delivery',
    secondaryHeaderText: 'for printable tributes',
    priceType: DisplayPriceType.START_FROM,
    itemsList: [PackageItemsEnum.PROFESSIONAL_PREMIUM_PRINTS_DELIVERED],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/printing-add-on.jpg`,
  },
  [EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK]: {
    isBestValue: false,
    isUpgradeToBundle: false,
    headerText: 'Photo Books & Albums',
    secondaryHeaderText: null,
    priceType: DisplayPriceType.DYNAMIC,
    itemsList: [
      PackageItemsEnum.PHOTO_BOOK_PAGES,
      PackageItemsEnum.PHOTO_BOOK_VIBRANT_SIX_COLOR_PRINTING,
      PackageItemsEnum.PHOTO_BOOK_SELECTION_OF_PREMIUM_HARD_COVER_FABRICS,
      PackageItemsEnum.PHOTO_BOOK_ARVCHIVAL_QUALITY_PAPER,
    ],
    previewThumbnailSrc: `https://${BUCKET_URL}/assets/checkouts/package-thumbnails/photo-books.jpg`,
  },
}

const getMostRelevantPackagesForPostPurchasedUsers = ({
  invoices,
}: {
  invoices: Array<IInvoice>
}) => {
  if (!invoices || invoices?.length === 0) {
    return []
  }
  const {
    isBundlePurchased,
    isPrintingDeliveryPackagePurchased,
    isVideoScreenAndSlideshowPackagePurchased,
  } = CheckoutHelper.getPurchasedPackagesDetailsBasedOnInvoices({ invoices })
  const keepsakesPackages = EULOGIZE_CHECKOUT_PACKAGE_OPTION.filter(
    (p) => p.isKeepsake,
  )

  const displayedKeepsakesPackages = keepsakesPackages
    .filter((p) => p.displayInPackagePage)
    .map((p) => p.value)

  if (isBundlePurchased) {
    displayedKeepsakesPackages
  } else if (isPrintingDeliveryPackagePurchased) {
    return [EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES]
  } else if (isVideoScreenAndSlideshowPackagePurchased) {
    return [
      EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY,
      EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY,
    ]
  }
  return []
}

export const PackageCard = ({
  country,
  packageOption,
  invoices,
  activePhotobook,
  onSelect,
}: PackageCardProps): JSX.Element | null => {
  if (!packageOption) {
    return null
  }
  const invoiceList = invoices ?? []
  const {
    isBestValue,
    isUpgradeToBundle,
    headerText,
    secondaryHeaderText,
    priceType,
    itemsList,
    previewThumbnailSrc,
  } = PACKAGE_CARD_DETAILS_MAPPING?.[packageOption]

  const shouldAddPlaceHolder =
    !secondaryHeaderText &&
    [EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK].includes(packageOption)

  const isPhotoBookAvailableToOrder = CheckoutHelper.getIsPhotoBookReadyToOrder(
    { activePhotoBookData: activePhotobook, country },
  )
  const shouldPurchaseButtonDisable =
    packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
    !isPhotoBookAvailableToOrder

  const shouldUseSmallButtonSize =
    shouldPurchaseButtonDisable &&
    [
      EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
      EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK,
    ].includes(packageOption)

  const mostRelevantPackagesForPostPurchasedUsers =
    getMostRelevantPackagesForPostPurchasedUsers({ invoices: invoiceList })

  const hasUserPurchasedAnyFirstTimeCheckoutPackages =
    CheckoutHelper.getHasUserPurchasedAnyFirstTimeCheckoutPackages({
      invoices: invoiceList,
    })

  const isRelevantPostPurchase =
    hasUserPurchasedAnyFirstTimeCheckoutPackages &&
    mostRelevantPackagesForPostPurchasedUsers.includes(packageOption)

  const isAllTributesBundle =
    !hasUserPurchasedAnyFirstTimeCheckoutPackages &&
    packageOption === EulogisePackageOptions.ALL_TRIBUTES_BUNDLE

  const backgroundColor =
    isRelevantPostPurchase || isAllTributesBundle
      ? BACKGROUND_PURPLE
      : COLOR.WHITE

  const [isLargeCheckoutScreen, setIsLargeCheckoutScreen] =
    useState<boolean>(false)

  useEffect(() => {
    const lgBreakpoint = CHECKOUT_BREAKPOINT.LG

    const handleResize = () => {
      if (typeof window === 'undefined') {
        return
      }
      setIsLargeCheckoutScreen(window.innerWidth > lgBreakpoint)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getFromPriceByPackage = ({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions
  }) => {
    if (!packageOption) {
      return 0
    }
    switch (packageOption) {
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        return CheckoutHelper.getMinPhotoBookStartingPriceByPrintingProduct({
          country,
          size: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        })

      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
        return CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
          isLeatherVideoTributeBookAdded: true,
          country,
        })

      default:
        return CheckoutHelper.getMinPrintingProductsStartingPriceByPrintingProduct(
          {
            products: [EulogiseCardProducts.BOOKLET],
            country,
          },
        )
    }
  }

  const getFixedPriceByPackage = ({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions
  }) => {
    if (!packageOption) {
      return 0
    }
    return CheckoutHelper.getPackagePriceByCountry({
      country,
      packageOption,
    })
  }

  const getDynamicPriceByPackage = ({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions
  }) => {
    if (!packageOption) {
      return 0
    }
    switch (packageOption) {
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        if (activePhotobook?.content && isPhotoBookAvailableToOrder) {
          return CheckoutHelper.getPhotoBookLiveUnitPrice({
            activePhotoBook: activePhotobook,
            country,
          })
        }
        return getFromPriceByPackage({ packageOption })
      case EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK:
        return CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
          isLeatherVideoTributeBookAdded: true,
          country,
        })

      default:
        return 0
    }
  }

  const getPrice = ({
    packageOption,
    priceType,
  }: {
    packageOption: EulogisePackageOptions
    priceType: DisplayPriceType
  }) => {
    if (!packageOption || !priceType) {
      return 0
    }
    switch (priceType) {
      case DisplayPriceType.FIXED:
        return getFixedPriceByPackage({
          packageOption,
        })
      case DisplayPriceType.START_FROM:
        return getFromPriceByPackage({ packageOption })
      case DisplayPriceType.DYNAMIC:
        return getDynamicPriceByPackage({ packageOption })
      default:
        return 0
    }
  }

  const price = getPrice({ packageOption, priceType })

  const renderPrice = ({
    priceType,
    price,
    packageOption,
  }: {
    priceType: DisplayPriceType
    price: number
    packageOption: EulogisePackageOptions
  }) => {
    if (!priceType || !price) {
      return null
    }
    if (priceType === DisplayPriceType.FIXED) {
      return <StyledPrice $isStartingFrom={false}>${price}</StyledPrice>
    }
    if (
      priceType === DisplayPriceType.DYNAMIC &&
      packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK &&
      isPhotoBookAvailableToOrder
    ) {
      return (
        <StyledPriceContainer>
          <StyledPrice $isStartingFrom={true}>${price.toFixed(2)}</StyledPrice>
          <StyledPriceDecorator>
            /{' '}
            {packageOption ===
              EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK ||
            packageOption === EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK
              ? 'book'
              : 'print'}
          </StyledPriceDecorator>
        </StyledPriceContainer>
      )
    }
    return (
      <StyledPriceContainer>
        {priceType === DisplayPriceType.START_FROM ? (
          <StyledPriceDecorator>from</StyledPriceDecorator>
        ) : null}
        <StyledPrice $isStartingFrom={true}>${price}</StyledPrice>
        <StyledPriceDecorator>
          /{' '}
          {packageOption === EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK ||
          packageOption === EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK
            ? 'book'
            : 'print'}
        </StyledPriceDecorator>
      </StyledPriceContainer>
    )
  }

  const renderIncludedItems = ({ itemKey }: { itemKey: PackageItemsEnum }) => {
    const item = PACKAGE_ITEMS[itemKey]
    if (!item) return null

    return (
      <StyledItemContainer key={itemKey}>
        <StyledCheckIcon />
        <StyledItemText>
          {item.label}
          {item.children &&
            item.children.map((subItem) => (
              <StyledSubItemContainer key={subItem}>
                <StyledSubCheckIcon />
                <StyledSubItemText>{subItem}</StyledSubItemText>
              </StyledSubItemContainer>
            ))}
        </StyledItemText>
      </StyledItemContainer>
    )
  }

  const getSelectText = ({
    packageOption,
  }: {
    packageOption: EulogisePackageOptions
  }) => {
    switch (packageOption) {
      case EulogisePackageOptions.ALL_TRIBUTES_BUNDLE:
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_WITH_PRINT_AND_DELIVERY:
      case EulogisePackageOptions.PRINTABLE_TRIBUTES_PDF_DOWNLOAD_ONLY:
      case EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY:
      case EulogisePackageOptions.UPGRADE_PRINTABLE_PDF_ONLY:
      case EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES:
      case EulogisePackageOptions.UPGRADE_PRINTABLE_WITH_PRINT_AND_DELIVERY:
      case EulogisePackageOptions.ADD_ON_PREMIUM_PRINTING:
        return 'Select'
      case EulogisePackageOptions.ADD_ON_PREMIUM_PHOTO_BOOK:
        if (isPhotoBookAvailableToOrder) {
          return 'Select'
        }
        return 'Complete your layout to purchase'
      default:
        return 'Select'
    }
  }

  return (
    <>
      <StyledPackageCardContainer
        $isBestValue={isBestValue}
        $isUpgradeToBundle={isUpgradeToBundle}
        $backgroundColor={backgroundColor}
      >
        {isBestValue && (
          <StyledBestValueContainer>
            <StyledBestValueText>BEST VALUE</StyledBestValueText>
          </StyledBestValueContainer>
        )}
        {isUpgradeToBundle && (
          <StyledBestValueContainer>
            <StyledBestValueText>UPGRADE TO BUNDLE</StyledBestValueText>
          </StyledBestValueContainer>
        )}
        <StyledPreviewThumbnail
          $isBestValue={isBestValue}
          $isUpgradeToBundle={isUpgradeToBundle}
          src={previewThumbnailSrc}
          alt={packageOption}
        />
        <StyledContentContainer>
          <StyledPackageText
            $height={
              [
                EulogisePackageOptions.ALL_TRIBUTES_BUNDLE,
                EulogisePackageOptions.VIDEO_SLIDESHOW_AND_WELCOME_SCREEN_ONLY,
                EulogisePackageOptions.UPGRADE_VIDEO_TRIBUTES,
                EulogisePackageOptions.ADD_ON_LEATHER_VIDEO_BOOK,
              ].includes(packageOption)
                ? 64
                : 32
            }
          >
            {headerText}
          </StyledPackageText>
          {shouldAddPlaceHolder && <StyledPlaceHolder />}
          {secondaryHeaderText && (
            <StyledPackageSecondaryText>
              {secondaryHeaderText}
            </StyledPackageSecondaryText>
          )}

          {renderPrice({ price, priceType, packageOption })}
          <StyledSelectButtonContainer>
            <StyledSelectButton
              buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
              onClick={() => {
                if (!country || !packageOption) {
                  return
                }
                onSelect()
              }}
              disabled={shouldPurchaseButtonDisable}
              buttonSize={
                isLargeCheckoutScreen
                  ? shouldUseSmallButtonSize
                    ? ButtonSize.XS
                    : ButtonSize.XMD
                  : shouldUseSmallButtonSize
                  ? ButtonSize.XXS
                  : ButtonSize.XMD
              }
            >
              {getSelectText({ packageOption })}
            </StyledSelectButton>
          </StyledSelectButtonContainer>
          <StyledWhatsIncludedText>What's included</StyledWhatsIncludedText>
          {itemsList.map((itemKey) => renderIncludedItems({ itemKey }))}
        </StyledContentContainer>
      </StyledPackageCardContainer>
    </>
  )
}

export default PackageCard
