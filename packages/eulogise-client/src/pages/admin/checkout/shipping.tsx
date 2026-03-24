import React, { useEffect, useMemo, useCallback } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import { CheckoutHelper, NavigationHelper } from '@eulogise/helpers'
import {
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useClientState,
  useEulogiseDispatch,
  usePhotobookState,
  useSiderMenuState,
} from '../../../ui/store/hooks'
import {
  ICaseState,
  EulogiseCountry,
  ICheckoutsState,
  EulogisePage,
  CHECKOUTS_SHIPPING_METHOD,
  CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD,
  CHECKOUTS_SHIPPING_PRODUCTS,
  EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS,
  ISiderMenuState,
  EulogiseLeatherVideoTributeBookOptions,
  EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS,
  KEEPSAKE_PRODUCTS,
  ADDRESS_INPUT_MODE,
  IAddressDetails,
  KEEPSAKE_PRODUCTS_DISPLAY_NAMES,
  EulogizePrintingProductDisplayNames,
  EulogisePhotoBookCheckoutOptions,
  IPhotoBookCheckoutData,
  PhotobookBookStyle,
  ValidPhotobookCheckoutSize,
} from '@eulogise/core'

import {
  CHECKOUT_BREAKPOINT,
  COLOR,
  EulogiseClientConfig,
  STYLE,
} from '@eulogise/client-core'
import Header from '../../../ui/components/Checkoutv2/Header'
import {
  BreadCrumbs,
  CHECKOUT_V2_URL_STEPS_MAPS,
  Price,
} from '@eulogise/client-components'
import { Radio } from 'antd'
import {
  AddDeliveryAddress,
  Button,
  ButtonSize,
  ButtonType,
  Notification,
  PurchaseIcon,
} from '@eulogise/client-components'
import {
  restoreCheckoutsState,
  updateKeepsakesShippingAddressDetails,
  updateLeatherVideoTributeBookShippingMethod,
  updatePhotoBookShippingAddressDetails,
  updatePhotoBookShippingMethod,
  updatePrintingDetails,
} from '../../../ui/store/CheckoutsState/action'
import { collapseSiderMenu } from '../../../ui/store/SiderMenuState/action'
import { OrderSummaryContainer } from '../../../ui/containers/Checkoutv2/OrderSummaryContainer'
import { DisplayedPhotoBookSizeText } from '../../../ui/components/Checkoutv2/PhotobookCheckoutDrawer'

const RIGHT_COLUMN_WIDTH_MD_TO_LG = 283
const RIGHT_COLUMN_WIDTH_XL = 411
const LEFT_COLUMN_WIDTH_MD_TO_LG = 589
const LEFT_COLUMN_WIDTH_XL = 765
const MID_LAYOUT_WIDTH =
  LEFT_COLUMN_WIDTH_MD_TO_LG + RIGHT_COLUMN_WIDTH_MD_TO_LG + 24
const LARGE_LAYOUT_WIDTH = LEFT_COLUMN_WIDTH_XL + RIGHT_COLUMN_WIDTH_XL + 24
const PAGE_MARGIN_MOBILE = '24px 16px'
const PAGE_MARGIN_MD = '40px 24px'
const PAGE_MARGIN_LG = '40px'
const SHIPPING_METHOD_TEXT_WIDTH = 210
const SHIPPING_METHOD_DURATION_WIDTH = 360
const SHIPPING_METHOD_PRICE_WIDTH = 100
const SHIPPING_METHOD_TEXT_WIDTH_MOBILE = 200
const SHIPPING_METHOD_DURATION_WIDTH_MOBILE = 280
const SHIPPING_METHOD_PRICE_WIDTH_MOBILE = 60
const SHIPPING_METHOD_TEXT_WIDTH_MD_TO_LG = 140
const SHIPPING_METHOD_DURATION_WIDTH_MD_TO_LG = 280
const SHIPPING_METHOD_PRICE_WIDTH_MD_TO_LG = 68
const TRANSIT_DIGIT_CAPTURE_REGEX = /(\d+)/g
const DIGIT_ONLY_REGEX = /^\d+$/

const DISPLAY_PHOTO_BOOK_BOOK_STYLE_SHIPPING_PREFIX: Record<
  PhotobookBookStyle,
  string
> = {
  [PhotobookBookStyle.CLASSIC_PHOTOBOOK]: 'Classic',
  [PhotobookBookStyle.PREMIUM_PHOTOBOOK]: 'Premium',
}

const StyledShippingPage = styled(Layout)`
  margin: ${PAGE_MARGIN_MOBILE};

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    margin: ${PAGE_MARGIN_MD};
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    margin: ${PAGE_MARGIN_LG};
  }
`

const StyledHeaderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${LARGE_LAYOUT_WIDTH}px;
  }
`

const StyledContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    max-width: ${MID_LAYOUT_WIDTH}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    max-width: ${LARGE_LAYOUT_WIDTH}px;
  }
`

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }
`

const StyledHeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
  }
`

const StyledHeaderRightContainer = styled.div`
  display: none;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
    justify-content: flex-end;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    display: flex;
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
    justify-content: flex-end;
  }
`

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }
`

const StyledLeftContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${LEFT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${LEFT_COLUMN_WIDTH_XL}px;
  }
`

const StyledRightContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  flex-shrink: 0;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
  }
`

const StyledActionButtonGroups = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  gap: 16px;
`

const StyledActionButtonsDesktop = styled.div`
  width: ${RIGHT_COLUMN_WIDTH_MD_TO_LG}px;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${RIGHT_COLUMN_WIDTH_XL}px;
  }
`

const StyledActionButtonsMobile = styled.div`
  width: 100%;
  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    display: none;
  }
`

const StyledShippingMethodRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 12px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    align-items: center;
  }
`

const StyledShippingMethodInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${SHIPPING_METHOD_TEXT_WIDTH_MOBILE}px;
  flex: 0 0 ${SHIPPING_METHOD_TEXT_WIDTH_MOBILE}px;
  gap: 4px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex-direction: row;
    gap: 0;
    align-items: center;
    width: auto;
    flex: initial;
  }
`

const StyledShippingMethodText = styled.div`
  width: ${SHIPPING_METHOD_TEXT_WIDTH_MOBILE}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${SHIPPING_METHOD_TEXT_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${SHIPPING_METHOD_TEXT_WIDTH}px;
  }
`

const StyledShippingMethodDuration = styled.div`
  width: ${SHIPPING_METHOD_DURATION_WIDTH_MOBILE}px;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${SHIPPING_METHOD_DURATION_WIDTH_MD_TO_LG}px;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${SHIPPING_METHOD_DURATION_WIDTH}px;
  }
`

const StyledShippingMethodPrice = styled.div`
  width: ${SHIPPING_METHOD_PRICE_WIDTH_MOBILE}px;
  text-align: right;
  margin-left: auto;
  flex-shrink: 0;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) and (max-width: ${CHECKOUT_BREAKPOINT.LG -
    1}px) {
    width: ${SHIPPING_METHOD_PRICE_WIDTH_MD_TO_LG}px;
    text-align: right;
  }

  @media (min-width: ${CHECKOUT_BREAKPOINT.LG}px) {
    width: ${SHIPPING_METHOD_PRICE_WIDTH}px;
    text-align: right;
    margin-left: auto;
  }
`

const StyledTransitTimeDigit = styled.span`
  letter-spacing: -0.1rem;
`

const StyledTransitTimeText = styled.span``

const StyledTransitTimeLine = styled.span`
  display: inline;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: block;
  }
`

const StyledTransitTimeLineDesktopOnly = styled(StyledTransitTimeLine)`
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }
`

const StyledTransitTimeLineMobileOnly = styled(StyledTransitTimeLine)`
  display: none;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: block;
  }
`

const renderTransitTimeSegments = ({
  text,
  keyPrefix,
}: {
  text: string
  keyPrefix: string
}): React.ReactNode[] => {
  if (!text) {
    return []
  }

  return text
    .split(TRANSIT_DIGIT_CAPTURE_REGEX)
    .filter((segment) => segment && segment.length > 0)
    .map((segment, index) => {
      if (DIGIT_ONLY_REGEX.test(segment)) {
        return (
          <StyledTransitTimeDigit
            key={`${keyPrefix}-digit-${segment}-${index}`}
          >
            {segment}
          </StyledTransitTimeDigit>
        )
      }

      return (
        <StyledTransitTimeText key={`${keyPrefix}-text-${index}`}>
          {segment}
        </StyledTransitTimeText>
      )
    })
}

const renderTransitTimeText = (text?: string | null): React.ReactNode => {
  if (!text) {
    return null
  }

  const lowerCaseText = text.toLowerCase()
  const daysIndex = lowerCaseText.indexOf('days')

  if (daysIndex === -1) {
    return (
      <StyledTransitTimeLine key="transit-full-line">
        {renderTransitTimeSegments({ text, keyPrefix: 'transit-full' })}
      </StyledTransitTimeLine>
    )
  }

  const daysWordLength = 'days'.length
  const beforeDaysWithWord = text.slice(0, daysIndex + daysWordLength).trim()
  const afterDays = text.slice(daysIndex + daysWordLength).trim()
  const afterDaysMobile = afterDays
    .replace(/^-\s*/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  return (
    <>
      {beforeDaysWithWord && (
        <StyledTransitTimeLine key="transit-before-days">
          {renderTransitTimeSegments({
            text: beforeDaysWithWord,
            keyPrefix: 'transit-before-days',
          })}
        </StyledTransitTimeLine>
      )}
      {afterDays && (
        <>
          <StyledTransitTimeLineDesktopOnly key="transit-after-days-desktop">
            {renderTransitTimeSegments({
              text: afterDays,
              keyPrefix: 'transit-after-days-desktop',
            })}
          </StyledTransitTimeLineDesktopOnly>
          {afterDaysMobile && (
            <StyledTransitTimeLineMobileOnly key="transit-after-days-mobile">
              {renderTransitTimeSegments({
                text: afterDaysMobile,
                keyPrefix: 'transit-after-days-mobile',
              })}
            </StyledTransitTimeLineMobileOnly>
          )}
        </>
      )}
    </>
  )
}

const StyledBackToEditing = styled.div`
  margin-right: 16px;
  font-weight: 300;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 1px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const StyledHeaderText = styled.div`
  ${STYLE.HEADING_MEDIUM};
  padding-bottom: 16px;
`

const StyledNextButton = styled(Button)`
  flex: 1;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 252px;
    flex: initial;
  }
`

const StyledConfirmDeliveryAddress = styled.div``

const StyledKeepsakesDeliveryAddress = styled.div`
  padding: 24px 0;
  width: 100%;
`

const StyledKeepsakesHeaderText = styled.div`
  ${STYLE.HEADING_MEDIUM};
  padding-bottom: 16px;
`

const StyledDeliveryAddressText = styled.div`
  font-size: 14px;
  line-height: 24px;
  margin: 0 0 24px 0;
`

const StyledFreeShippingPromotionTextContainer = styled.div`
  display: flex;
  padding: 6px 12px;
  margin: 24px 0;
  justify-content: left;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${COLOR.CORE_PURPLE_30};
  background: ${COLOR.CORE_PURPLE_10};
`

const StyledFreeShippingPromotionTextIcon = styled(PurchaseIcon)`
  color: ${COLOR.CORE_PURPLE};
`

const StyledFreeShippingPromotionText = styled.div`
  color: ${COLOR.CORE_PURPLE};
  ${STYLE.TEXT_EXTRA_SMALL};
`

const StyledSelectShippingMethodContainer = styled.div``

const StyledProductShippingContainer = styled.div``

const StyledProductText = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
`

const StyledShippingOptionsContainer = styled.div`
  padding: 8px;
  background-color: ${COLOR.WARM_GREY_WHITE_BG};
  border-radius: 8px;
  border: 1px solid var(--Border, ${COLOR.LIGHT_GREY});
  margin: 8px 0;
  width: 100%;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 340px;
  }
`

const StyledShippingOptionRadioGroup = styled(Radio.Group)``

const StyledShippingOptionRadio = styled(Radio)<{ $isSelect: boolean }>`
  width: 100%;

  .span {
    width: 100%;
  }

  ${({ $isSelect }) =>
    $isSelect
      ? `background-color: ${COLOR.WHITE}; border-radius: 4px; padding: 8px`
      : `margin: 8px;`}
`

const StyledCheckoutsAddPrintingDeliveryAddress = styled(AddDeliveryAddress)<{
  value?: string | undefined
}>``

const getKeepsakesProductText = ({
  orderedKeepsakes,
}: {
  orderedKeepsakes: Array<KEEPSAKE_PRODUCTS>
}) => {
  if (!orderedKeepsakes || orderedKeepsakes.length === 0) {
    return `Keepsakes`
  }

  const suffixText = orderedKeepsakes
    .map((k) => KEEPSAKE_PRODUCTS_DISPLAY_NAMES?.[k])
    .join(' + ')
  return `Keepsakes | ${suffixText}`
}

const getPhotoBookProductText = ({
  photoBookDetails,
}: {
  photoBookDetails: IPhotoBookCheckoutData
}) => {
  const bookStyle = photoBookDetails?.metaData?.bookStyle?.style
  const bookSize = photoBookDetails?.metaData?.bookStyle?.size
  if (!bookStyle || !bookSize) {
    return 'Photo Books'
  }

  return `Photo Books | ${DISPLAY_PHOTO_BOOK_BOOK_STYLE_SHIPPING_PREFIX?.[bookStyle]} ${DisplayedPhotoBookSizeText?.[bookSize]}`
}

const getPrintingProductText = ({
  orderedPrintingTributes,
}: {
  orderedPrintingTributes: Array<EulogizePrintingProductDisplayNames>
}) => {
  if (!orderedPrintingTributes || orderedPrintingTributes.length === 0) {
    return `Printing`
  }

  const suffixText = orderedPrintingTributes.join(' + ')
  return `Printing | ${suffixText}`
}

const Shipping: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const { packageOption, printingDetails, keepsakesDetails }: ICheckoutsState =
    useCheckoutsState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const country: EulogiseCountry = activeCase?.country!
  const { isCollapsed }: ISiderMenuState = useSiderMenuState()
  const { account } = useAuthState()
  const { activeItem: activeClient } = useClientState()
  const role = account?.role ?? null

  const { activeItem: activePhotoBookData } = usePhotobookState()

  const {
    printingMethod,
    orderedProductsDetails,
    printingShippingMethod,
    printingAddressDetails,
  } = printingDetails

  const countryCurrencySymbol = useMemo(
    () => CheckoutHelper.getCurrencySymbolByCountry({ country }),
    [country],
  )

  const printingFee = useMemo(
    () =>
      CheckoutHelper.getPrintingFeeByOrdedProductsDetails({
        country,
        orderedProductsDetails,
      }),
    [country, orderedProductsDetails],
  )

  const printingShippingFee = useMemo(
    () =>
      CheckoutHelper.getShippingFeeByShippingProducts({
        shippingMethod: printingShippingMethod,
        country,
        shippingProduct: CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
      }),
    [printingShippingMethod, country],
  )

  const shippingProductsOrderSummaryByDetails = useMemo(
    () =>
      CheckoutHelper.getShippingProductsOrderSummaryByDetails({
        country,
        keepsakesDetails,
        printingDetails,
      }),
    [country, keepsakesDetails, printingDetails],
  )

  const printingProductDetailsSummary = useMemo(
    () =>
      CheckoutHelper.getPrintingProductOrderSummaryByOrderedProductsDetails({
        orderedProductsDetails: printingDetails.orderedProductsDetails,
      }),
    [printingDetails.orderedProductsDetails],
  )

  const isPhotoBookAdded =
    keepsakesDetails.photoBook.option ===
      EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK &&
    keepsakesDetails.photoBook.metaData.copyAmount > 0

  const photoBookShippingMethod = keepsakesDetails?.photoBook?.shippingMethod

  const photoBookShippingAddressDetails =
    keepsakesDetails?.photoBook?.shippingAddressDetails

  const photoBookShippingAddress =
    photoBookShippingAddressDetails?.formattedAddress

  const photoBookAddressValid = photoBookShippingAddressDetails?.isValidAddress

  const leatherVideoTributeBookOption =
    keepsakesDetails.leatherVideoTributeBook.option

  const isLeatherVideoTributeBookAdded =
    leatherVideoTributeBookOption ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK

  const leatherVideoTributeBookSinglePrice =
    CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
      isLeatherVideoTributeBookAdded,
      country,
    })

  const leatherVideoTributeBookMetaData =
    keepsakesDetails.leatherVideoTributeBook.metaData

  const leatherCopiesAmount: number =
    leatherVideoTributeBookMetaData?.copyAmount

  const leatherVideoTributeBookFee: number =
    leatherVideoTributeBookSinglePrice * leatherCopiesAmount

  const leatherVideoTributeBookColour = leatherVideoTributeBookMetaData?.color
  const leatherVideoTributeBookMaterial =
    leatherVideoTributeBookMetaData?.material

  const leatherVideoTributeBookShippingMethod =
    keepsakesDetails.leatherVideoTributeBook.shippingMethod

  const leatherVideoTributeBookShippingAddressDetails =
    keepsakesDetails?.leatherVideoTributeBook?.shippingAddressDetails

  const leatherVideoTributeBookShippingAddress =
    leatherVideoTributeBookShippingAddressDetails?.formattedAddress

  const isLeatherVideoTributeBookAddressValid =
    leatherVideoTributeBookShippingAddressDetails?.isValidAddress

  const useDiscountPrice = EulogiseClientConfig?.CHECKOUT_USE_DISCOUNT_PRICE
  const digitalPriceFee: number = useMemo(
    () =>
      useDiscountPrice
        ? CheckoutHelper.getDiscountPackagePriceByCountry({
            country,
            packageOption,
          })
        : CheckoutHelper.getPackagePriceByCountry({
            country,
            packageOption,
          }),
    [useDiscountPrice, country, packageOption],
  )

  const keepSakesShippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
    shippingMethod: leatherVideoTributeBookShippingMethod,
    country,
    shippingProduct:
      CHECKOUTS_SHIPPING_PRODUCTS?.[KEEPSAKE_PRODUCTS.VIDEO_BOOKS],
  })

  const photoBookShippingFee = CheckoutHelper.getShippingFeeByShippingProducts({
    shippingMethod: photoBookShippingMethod,
    country,
    shippingProduct:
      CHECKOUTS_SHIPPING_PRODUCTS?.[KEEPSAKE_PRODUCTS.PHOTO_BOOKS],
  })

  const hasAnyPrintingProductSelected = useMemo(
    () =>
      CheckoutHelper.getIsAnyPrintingProductSelected({
        orderedProductsDetails,
      }),
    [orderedProductsDetails],
  )

  const printingShippingAddress = printingAddressDetails.formattedAddress

  const orderedPrintingTributes: Array<EulogizePrintingProductDisplayNames> =
    CheckoutHelper.getOrderedPrintingTributes({
      orderedProductsDetails,
    })

  const isAnyKeepsakeProductAdded = CheckoutHelper.getIsAnyKeepsakeProductAdded(
    {
      isVideoBookAdded: isLeatherVideoTributeBookAdded,
    },
  )

  const isPrintingDeliveryOrdered =
    printingMethod ===
    CHECKOUTS_PRINTING_DELIVERY_AVAILABILITY_METHOD.PRINTING_ORDERED

  const orderedKeepsakes = isLeatherVideoTributeBookAdded
    ? [KEEPSAKE_PRODUCTS.VIDEO_BOOKS]
    : []

  const photoBookFee = CheckoutHelper.getPhotoBookTotalPrice({
    keepsakesDetails,
    activePhotoBookData,
    country,
  })

  const shippingFee =
    printingShippingFee + keepSakesShippingFee + photoBookShippingFee

  const showShippingFee = CheckoutHelper.getShouldShowShippingFeeInOrderSummary(
    {
      printingShippingMethod,
      leatherVideoTributeBookShippingMethod,
      photoBookShippingMethod,
    },
  )

  const photoBookPageSize = activePhotoBookData?.content
    ?.pageSize as ValidPhotobookCheckoutSize

  const shouldShowKeepsakes = isPhotoBookAdded || isAnyKeepsakeProductAdded

  useEffect(() => {
    if (!isCollapsed) {
      dispatch(collapseSiderMenu())
    }
  }, [])

  const getIsContinueToPaymentButtonDisabled = useMemo(() => {
    // Keepsakes:
    if (isAnyKeepsakeProductAdded) {
      if (
        leatherVideoTributeBookShippingMethod ===
        CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
      ) {
        return true
      }
      if (!leatherVideoTributeBookShippingAddress) {
        return true
      }
      if (!isLeatherVideoTributeBookAddressValid) {
        return true
      }
    }

    // Printings
    if (
      hasAnyPrintingProductSelected &&
      (printingShippingMethod === CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING ||
        !printingShippingMethod)
    ) {
      return true
    }

    // Photobooks
    if (isPhotoBookAdded) {
      if (photoBookShippingMethod === CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING) {
        return true
      }
      if (!photoBookShippingAddress) {
        return true
      }
      if (!photoBookAddressValid) {
        return true
      }
    }
    return false
  }, [
    isLeatherVideoTributeBookAdded,
    leatherVideoTributeBookShippingMethod,
    hasAnyPrintingProductSelected,
    printingShippingMethod,
    leatherVideoTributeBookShippingAddress,
  ])

  const handleContinueToPayment = useCallback(() => {
    if (getIsContinueToPaymentButtonDisabled) {
      if (isAnyKeepsakeProductAdded) {
        if (
          leatherVideoTributeBookShippingMethod ===
          CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING
        ) {
          Notification.error(
            'Please select a shipping method for your Video Motion Book.',
          )
          return
        }
        if (!leatherVideoTributeBookShippingAddress) {
          Notification.error(
            'Please provide a valid delivery address for your Video Motion Book.',
          )
          return
        }
        if (!isLeatherVideoTributeBookAddressValid) {
          Notification.error(
            'The provided address for your Video Motion Book is invalid.',
          )
          return
        }
      }

      if (
        hasAnyPrintingProductSelected &&
        (printingShippingMethod === CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING ||
          !printingShippingMethod)
      ) {
        Notification.error(
          'Please select a shipping method for your printed tributes.',
        )
        return
      }

      if (isPhotoBookAdded) {
        if (photoBookShippingMethod === CHECKOUTS_SHIPPING_METHOD.NO_SHIPPING) {
          Notification.error(
            'Please select a shipping method for your Photo Book.',
          )
          return
        }
        if (!photoBookShippingAddress) {
          Notification.error(
            'Please provide a valid delivery address for your Photo Book.',
          )
          return
        }
        if (!photoBookAddressValid) {
          Notification.error(
            'The provided address for your Photo Book is invalid.',
          )
          return
        }
      }
    }

    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PAYMENT)
  }, [
    getIsContinueToPaymentButtonDisabled,
    isAnyKeepsakeProductAdded,
    leatherVideoTributeBookShippingMethod,
    leatherVideoTributeBookShippingAddress,
    isLeatherVideoTributeBookAddressValid,
    hasAnyPrintingProductSelected,
    printingShippingMethod,
    isPhotoBookAdded,
    photoBookShippingMethod,
    photoBookShippingAddress,
    photoBookAddressValid,
  ])

  const onChangePrintingShippingMethod = useCallback(
    (e: any) => {
      const updatedPrintingDetails = {
        ...printingDetails,
        printingShippingMethod: e.target.value,
      }
      dispatch(updatePrintingDetails(updatedPrintingDetails))
    },
    [printingDetails, dispatch],
  )

  const onChangeLeatherVideoBooksShippingMethod = useCallback(
    (e: any) => {
      const shippingMethod = e.target.value
      dispatch(updateLeatherVideoTributeBookShippingMethod(shippingMethod))
    },
    [dispatch],
  )

  const onChangePhotoBooksShippingMethod = useCallback(
    (e: any) => {
      const shippingMethod = e.target.value
      dispatch(updatePhotoBookShippingMethod(shippingMethod))
    },
    [dispatch],
  )

  const renderBreadCrumbs = () => {
    return (
      <BreadCrumbs
        url={CHECKOUT_V2_URL_STEPS_MAPS.SHIPPING}
        packageOption={packageOption}
        shouldShowPrintingDetails={CheckoutHelper.getShouldShowPrintingDetailsBreadcrumbs(
          {
            packageOption,
            country,
            role,
            allowPurchasing: activeClient?.allowPurchasing,
          },
        )}
        shouldShowPrintingOptions={isPrintingDeliveryOrdered}
        shouldShowKeepsakes={shouldShowKeepsakes}
        shouldShowShipping={true}
        onRedirect={(pageUrl: EulogisePage) =>
          NavigationHelper.navigate(pageUrl)
        }
        onPackageClick={() => {
          dispatch(restoreCheckoutsState())
          NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
        }}
      />
    )
  }

  const renderConfirmDeliveryAddress = ({
    printingDeliveryAddress,
  }: {
    printingDeliveryAddress: string | null
  }) => {
    if (!printingDeliveryAddress) {
      return null
    }
    return (
      <StyledConfirmDeliveryAddress>
        <StyledHeaderText>Delivery address</StyledHeaderText>
        <StyledDeliveryAddressText>
          {printingDeliveryAddress}
        </StyledDeliveryAddressText>
      </StyledConfirmDeliveryAddress>
    )
  }

  const renderKeepsakesGoogleAddressInput = ({
    country,
    id,
  }: {
    country: EulogiseCountry
    id: string
  }) => {
    const addressValue = leatherVideoTributeBookShippingAddress
      ? leatherVideoTributeBookShippingAddress
      : undefined

    return (
      <StyledKeepsakesDeliveryAddress>
        <StyledKeepsakesHeaderText>
          Keepsakes delivery address
        </StyledKeepsakesHeaderText>
        <StyledCheckoutsAddPrintingDeliveryAddress
          googleAutoCompleteInputId={`google-auto-complete-input-keepsakes-address-id-${id}`}
          googleAutoCompleteInputName={`google-auto-complete-input-keepsakes-address-id-${name}`}
          onAddressSelected={(selectedAddress, response, isValidAddress) => {
            if (selectedAddress && response) {
              const updatedKeepsakesShippingAddressDetails: IAddressDetails = {
                ...leatherVideoTributeBookShippingAddressDetails,
                formattedAddress:
                  response?.data?.result?.address?.formattedAddress,
                isValidAddress: isValidAddress,
                portalAddressMetaData:
                  response?.data?.result?.address?.postalAddress,
                addressInputMode: ADDRESS_INPUT_MODE.AUTO_COMPLETE,
              }
              if (isLeatherVideoTributeBookAdded) {
                dispatch(
                  updateKeepsakesShippingAddressDetails(
                    updatedKeepsakesShippingAddressDetails,
                  ),
                )
              }
              if (isPhotoBookAdded) {
                dispatch(
                  updatePhotoBookShippingAddressDetails(
                    updatedKeepsakesShippingAddressDetails,
                  ),
                )
              }
            }
          }}
          country={country}
          onResetDeliveryAddress={() => null}
          shouldAddressInputDisabled={false}
          value={addressValue}
        />
      </StyledKeepsakesDeliveryAddress>
    )
  }

  const getPhotoBookShippingMethodAndFee = ({
    validPhotoBookShippingMethodName,
  }: {
    validPhotoBookShippingMethodName: CHECKOUTS_SHIPPING_METHOD | 'Unknown'
  }) => {
    if (
      !validPhotoBookShippingMethodName ||
      validPhotoBookShippingMethodName === 'Unknown'
    ) {
      return {
        shippingMethod: null,
        shippingFee: null,
      }
    }
    const photoBookShippingMethodObj =
      EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS?.[
        KEEPSAKE_PRODUCTS?.PHOTO_BOOKS
      ]?.find((method) => method?.value === validPhotoBookShippingMethodName)

    if (!photoBookShippingMethodObj) {
      return {
        shippingMethod: null,
        shippingFee: null,
      }
    }

    const photoBookShippingMethodFee =
      CheckoutHelper.getShippingFeeByShippingProducts({
        country,
        shippingMethod: photoBookShippingMethodObj.value,
        shippingProduct:
          CHECKOUTS_SHIPPING_PRODUCTS[KEEPSAKE_PRODUCTS.PHOTO_BOOKS],
      })

    if (!photoBookShippingMethodObj) {
      return {
        shippingMethod: null,
        shippingFee: null,
      }
    }
    return {
      shippingMethod: photoBookShippingMethodObj,
      shippingFee: photoBookShippingMethodFee,
    }
  }

  const renderSelectShippingMethod = ({
    shouldShowFreeShippingPromotion,
  }: {
    shouldShowFreeShippingPromotion: boolean
  }) => {
    const validPhotoBookShippingMethodName =
      CheckoutHelper.getPhotoBookShippingMethodByPageSize({
        photoBookSize: photoBookPageSize,
      })

    const {
      shippingFee: photoBookshippingFee,
      shippingMethod: photoBookShippingMethodObj,
    } = getPhotoBookShippingMethodAndFee({
      validPhotoBookShippingMethodName,
    })

    return (
      <StyledSelectShippingMethodContainer>
        <StyledHeaderText>Select shipping method</StyledHeaderText>

        {shouldShowFreeShippingPromotion && (
          <StyledFreeShippingPromotionTextContainer>
            <StyledFreeShippingPromotionTextIcon />
            <StyledFreeShippingPromotionText>
              Your are 15km away from free shipping (TODO)
            </StyledFreeShippingPromotionText>
          </StyledFreeShippingPromotionTextContainer>
        )}

        {isPrintingDeliveryOrdered && hasAnyPrintingProductSelected && (
          <StyledProductShippingContainer>
            <StyledProductText>
              {getPrintingProductText({ orderedPrintingTributes })}
            </StyledProductText>
            <StyledShippingOptionsContainer>
              <StyledShippingOptionRadioGroup
                onChange={onChangePrintingShippingMethod}
                value={printingShippingMethod}
                style={{ width: '100%' }}
              >
                {EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS.filter(
                  (sm) => sm.isShipping,
                ).map((psm) => {
                  const shippingMethodFee =
                    CheckoutHelper.getShippingFeeByShippingProducts({
                      country,
                      shippingMethod: psm.value,
                      shippingProduct:
                        CHECKOUTS_SHIPPING_PRODUCTS.PRINTED_TRIBUTES,
                    })

                  return (
                    <StyledShippingOptionRadio
                      key={psm.value}
                      value={psm.value}
                      $isSelect={printingShippingMethod === psm.value}
                    >
                      <StyledShippingMethodRow>
                        <StyledShippingMethodInfo>
                          <StyledShippingMethodText>
                            {psm.displayName}
                          </StyledShippingMethodText>
                          <StyledShippingMethodDuration>
                            {renderTransitTimeText(psm.transitTimeText)}
                          </StyledShippingMethodDuration>
                        </StyledShippingMethodInfo>
                        <StyledShippingMethodPrice>
                          <Price
                            priceNumber={shippingMethodFee}
                            $letterSpacing="-1px"
                            withDollarSign={true}
                          />
                        </StyledShippingMethodPrice>
                      </StyledShippingMethodRow>
                    </StyledShippingOptionRadio>
                  )
                })}
              </StyledShippingOptionRadioGroup>
            </StyledShippingOptionsContainer>
          </StyledProductShippingContainer>
        )}

        {isLeatherVideoTributeBookAdded && (
          <StyledProductShippingContainer>
            <StyledProductText>
              {getKeepsakesProductText({ orderedKeepsakes })}
            </StyledProductText>
            <StyledShippingOptionsContainer>
              <StyledShippingOptionRadioGroup
                onChange={onChangeLeatherVideoBooksShippingMethod}
                value={leatherVideoTributeBookShippingMethod}
                style={{ width: '100%' }}
              >
                {EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS?.[
                  KEEPSAKE_PRODUCTS?.VIDEO_BOOKS
                ]
                  .filter((sm) => sm.isShipping)
                  .map((videoBookShippingMethod) => {
                    const shippingMethodFee =
                      CheckoutHelper.getShippingFeeByShippingProducts({
                        country,
                        shippingMethod: videoBookShippingMethod.value,
                        shippingProduct:
                          CHECKOUTS_SHIPPING_PRODUCTS[
                            KEEPSAKE_PRODUCTS.VIDEO_BOOKS
                          ],
                      })

                    return (
                      <StyledShippingOptionRadio
                        key={videoBookShippingMethod.value}
                        value={videoBookShippingMethod.value}
                        $isSelect={
                          leatherVideoTributeBookShippingMethod ===
                          videoBookShippingMethod.value
                        }
                      >
                        <StyledShippingMethodRow>
                          <StyledShippingMethodInfo>
                            <StyledShippingMethodText>
                              {videoBookShippingMethod.displayName}
                            </StyledShippingMethodText>
                            <StyledShippingMethodDuration>
                              {renderTransitTimeText(
                                videoBookShippingMethod.transitTimeText,
                              )}
                            </StyledShippingMethodDuration>
                          </StyledShippingMethodInfo>
                          <StyledShippingMethodPrice>
                            <Price
                              priceNumber={shippingMethodFee}
                              $letterSpacing="-1px"
                              withDollarSign={true}
                            />
                          </StyledShippingMethodPrice>
                        </StyledShippingMethodRow>
                      </StyledShippingOptionRadio>
                    )
                  })}
              </StyledShippingOptionRadioGroup>
            </StyledShippingOptionsContainer>
          </StyledProductShippingContainer>
        )}

        {isPhotoBookAdded &&
          validPhotoBookShippingMethodName !== 'Unknown' &&
          photoBookShippingMethodObj &&
          photoBookshippingFee && (
            <StyledProductShippingContainer>
              <StyledProductText>
                {getPhotoBookProductText({
                  photoBookDetails: keepsakesDetails.photoBook,
                })}
              </StyledProductText>
              <StyledShippingOptionsContainer>
                <StyledShippingOptionRadioGroup
                  onChange={onChangePhotoBooksShippingMethod}
                  value={photoBookShippingMethod}
                  style={{ width: '100%' }}
                >
                  <StyledShippingOptionRadio
                    key={photoBookShippingMethodObj.value}
                    value={photoBookShippingMethodObj.value}
                    $isSelect={
                      photoBookShippingMethod ===
                      photoBookShippingMethodObj.value
                    }
                  >
                    <StyledShippingMethodRow>
                      <StyledShippingMethodInfo>
                        <StyledShippingMethodText>
                          {photoBookShippingMethodObj.displayName}
                        </StyledShippingMethodText>
                        <StyledShippingMethodDuration>
                          {renderTransitTimeText(
                            photoBookShippingMethodObj.transitTimeText,
                          )}
                        </StyledShippingMethodDuration>
                      </StyledShippingMethodInfo>
                      <StyledShippingMethodPrice>
                        <Price
                          priceNumber={photoBookshippingFee}
                          $letterSpacing="-1px"
                          withDollarSign={true}
                        />
                      </StyledShippingMethodPrice>
                    </StyledShippingMethodRow>
                  </StyledShippingOptionRadio>
                </StyledShippingOptionRadioGroup>
              </StyledShippingOptionsContainer>
            </StyledProductShippingContainer>
          )}
      </StyledSelectShippingMethodContainer>
    )
  }

  const renderOrderSummary = () => {
    return (
      <OrderSummaryContainer
        showPrintingFee={printingFee > 0}
        showShippingFee={showShippingFee}
        showShippingCalculatedNext={false}
        showPrintPriceCalculatedNext={false}
        printingFee={printingFee}
        shippingFee={shippingFee}
        digitalProductFee={digitalPriceFee}
        countryCurrencySymbol={countryCurrencySymbol}
        packageOption={packageOption}
        showLeatherVideoTributeBookFee={isLeatherVideoTributeBookAdded}
        showPhotoBookFee={isPhotoBookAdded}
        photoBookFee={photoBookFee}
        leatherVideoTributeBookFee={leatherVideoTributeBookFee}
        leatherVideoTributeBookAmount={leatherCopiesAmount}
        leatherVideoTributeBookColour={leatherVideoTributeBookColour}
        leatherVideoTributeBookMaterial={leatherVideoTributeBookMaterial}
        shouldShowTotal={false}
        shippingProductDetailsSummary={shippingProductsOrderSummaryByDetails}
        printingProductDetailsSummary={printingProductDetailsSummary}
        country={country}
        pathname={location?.pathname ?? null}
      />
    )
  }

  const onBack = useCallback(() => {
    if (isAnyKeepsakeProductAdded) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_KEEPSAKES)
      return
    }
    if (isPrintingDeliveryOrdered) {
      NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PRINTING_OPTIONS)
      return
    }
    NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE)
    return
  }, [])

  const renderActionButtons = () => {
    return (
      <StyledActionButtonGroups>
        <StyledBackToEditing onClick={onBack}>Back</StyledBackToEditing>
        <StyledNextButton
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          onClick={handleContinueToPayment}
        >
          Continue to payment
        </StyledNextButton>
      </StyledActionButtonGroups>
    )
  }

  if (!activeCase) {
    return null
  }

  return (
    <StyledShippingPage
      title="Select your printing options"
      location={location}
      noPadding={true}
    >
      <StyledHeaderWrapper>
        <StyledHeaderContainer>
          <StyledHeaderLeftContainer>
            <Header text={'Checkout'} />
            {renderBreadCrumbs()}
          </StyledHeaderLeftContainer>
          <StyledHeaderRightContainer>
            <StyledActionButtonsDesktop>
              {renderActionButtons()}
            </StyledActionButtonsDesktop>
          </StyledHeaderRightContainer>
        </StyledHeaderContainer>
      </StyledHeaderWrapper>

      <StyledContentWrapper>
        <StyledContentContainer>
          <StyledLeftContentContainer>
            {printingShippingAddress
              ? renderConfirmDeliveryAddress({
                  printingDeliveryAddress: printingShippingAddress,
                })
              : renderKeepsakesGoogleAddressInput({
                  country,
                  id: 'leather-shipping-address-google-address-input',
                })}
            {renderSelectShippingMethod({
              shouldShowFreeShippingPromotion: false,
            })}
          </StyledLeftContentContainer>

          <StyledRightContentContainer>
            <StyledActionButtonsMobile>
              {renderActionButtons()}
            </StyledActionButtonsMobile>
            {renderOrderSummary()}
          </StyledRightContentContainer>
        </StyledContentContainer>
      </StyledContentWrapper>
    </StyledShippingPage>
  )
}

export default Shipping
