import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import {
  COLOR,
  EulogizePrintingProductsPaperTypeDefinition,
  STYLE,
} from '@eulogise/client-core'
import {
  EulogiseCardProducts,
  EulogiseProduct,
  EulogizePrintingProductDisplayNames,
  ICardProductState,
  IPrintingPaperDefinition,
  ICheckoutsState,
  EulogizePrintingProductsPaperTypes,
  IPrintingDetails,
  IPrintingPerUnitPriceByCopies,
  EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS,
  EulogiseCountry,
  IPrintingProductDetails,
  ICardProductData,
  ICardProductTheme,
  CheckoutProductPreviewType,
} from '@eulogise/core'

import { Drawer, Row, Col, Select } from 'antd'
import { CHECKOUT_BREAKPOINT } from '@eulogise/client-core'

import {
  Button,
  ButtonSize,
  ButtonType,
  CheckoutProductPreview,
  EyeIcon,
  Price,
  PurchaseIcon,
} from '@eulogise/client-components'
import { CheckoutHelper } from '@eulogise/helpers'
import selectChevron from '../../assets/checkouts/selectChevron.svg'
import {
  useCheckoutsState,
  useEulogiseDispatch,
  useProductState,
} from '../../store/hooks'
import {
  updateIsPrintingOptionDrawerOpen,
  updateIsReviewDesignDrawerOpened,
  updatePrintingDetails,
} from '../../store/CheckoutsState/action'
import ReviewDesignDrawer from './ReviewDesignDrawer'
import SlidedPhotoGallery, {
  ISlidedPhotoGalleryAssetPhoto,
  ISlidedPhotoGalleryAssetType,
} from './SlidedPhotoGallery'

const ENABLE_DISPATCH_NOTIFICATION = false
const ENABLE_ORDER_FOUR_BOOKS_FREE_STANDING_SHIPPING = false
const MOCK_DISPATCH_TIME_TEXT = '03:12 (TODO)'
const CONTENT_VERITICAL_WIDTH = 40
const DISPLAYED_THUMBNAIL_HEIGHT = 538
const LIVE_ASSET_WIDTH = 430
const MOBILE_DRAWER_WIDTH = LIVE_ASSET_WIDTH + 48
const CANCEL_BUTTON_WIDTH = 80
const MARGIN = 40

const ENABLED_LIVE_ASSETS_PRODUCTS = [
  EulogiseCardProducts.BOOKLET,
  EulogiseCardProducts.SIDED_CARD,
]

const PRINTING_PRODUCTS_DESCRIPTION: Record<EulogiseCardProducts, string> = {
  [EulogiseCardProducts.BOOKLET]:
    'Single-fold booklet printed on premium paper stock',
  [EulogiseCardProducts.SIDED_CARD]:
    'Double-sided and printed on premium paper stock',
  [EulogiseCardProducts.BOOKMARK]:
    'Double-sided and printed on premium paper stock',
  [EulogiseCardProducts.THANK_YOU_CARD]:
    'Double-sided and printed on premium paper stock',
  [EulogiseCardProducts.PHOTOBOOK]: 'N/A',
  [EulogiseCardProducts.TV_WELCOME_SCREEN]: 'N/A',
  [EulogiseCardProducts.SLIDESHOW_TITLE_SLIDE]: 'N/A',
}

const PRODUCTS_ASSEST_THUMBNAILS: Record<
  EulogiseCardProducts,
  ISlidedPhotoGalleryAssetPhoto[]
> = {
  [EulogiseCardProducts.BOOKLET]: [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/folded-programs/folded-program-4.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ],
  [EulogiseCardProducts.SIDED_CARD]: [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-4.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/service-cards/service-cards-5.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ],
  [EulogiseCardProducts.BOOKMARK]: [],
  [EulogiseCardProducts.THANK_YOU_CARD]: [],
  [EulogiseCardProducts.TV_WELCOME_SCREEN]: [],
  [EulogiseCardProducts.PHOTOBOOK]: [],
  [EulogiseCardProducts.SLIDESHOW_TITLE_SLIDE]: [],
}

interface PrintingOptionDrawerProps {
  open: boolean
  country: EulogiseCountry
  product: EulogiseCardProducts | undefined | null
}

const StyledHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
  position: relative;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    max-width: ${LIVE_ASSET_WIDTH}px;
    margin: 0 auto 16px auto;
  }
`

const StyledHeaderText = styled.div`
  ${STYLE.HEADING_MEDIUM};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    left: 0;
    transform: none;
    width: ${LIVE_ASSET_WIDTH - CANCEL_BUTTON_WIDTH - MARGIN}px;
  }
`

const StyledCancelButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const StyledCancelButton = styled(Button)``

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 40px;

    @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
      padding: 24px;
    }
  }
`

const StyledDispatchNotificationContainer = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid var(--Joy-Palette-Warning-Soft-Active-Bg, #eac54f);
  background: var(--Joy-Palette-Warning-Soft-Bg, #fff8c5);
  padding: 12px 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const StyledDispatchNotificationText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--Joy-Palette-Warning-Main, #9a6700);
`

const StyledDeliveryIcon = styled(PurchaseIcon)`
  color: var(--Joy-Palette-Warning-Main, #9a6700);
  padding-right: 4px;
`

const StyledContentParentContainer = styled.div`
  display: flex;
  padding-top: 24px;
  gap: 16px;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    flex-direction: column;
    align-items: center;
  }
`
const StyledVerticalSeperator = styled.div`
  width: ${CONTENT_VERITICAL_WIDTH}px;
`

const StyledContentContainer = styled.div<{ $width: number }>`
  ${({ $width }) => $width && `width: ${$width}px;`}
`

const StyledPaperTypesContainer = styled.div`
  padding: 40px 0;
  width: 100%;

  margin: 0 auto;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: flex;
    max-width: ${LIVE_ASSET_WIDTH}px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const StyledPaperyTypeText = styled.div`
  ${STYLE.HEADING_SMALL};
  padding-bottom: 24px;
`

const StyledPaperTypesContentContainer = styled(Row)`
  width: 100%;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    justify-content: center;
  }
`

const StyledPaperTypeCard = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 300px;
`

const StyledPaperTypeDisplayName = styled.div`
  padding: 8px 0;
  width: 100%;
  ${STYLE.TEXT_SMALL};
  text-align: left;
`

const StyledPaperTypeDescription = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  padding-bottom: 16px;
  text-align: left;
`

const StyledPaperTypeContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    flex: 1 1 0%;
    max-width: none;
  }
`

const StyledPaperTypeComposedRowTextContainer = styled.div`
  width: 100%;
  display: flex;
`

const StyledPaperTypeText = styled.div<{
  $textAlign?: string
  $margin?: string
  $fontWeight?: string
  $width?: string
  $fontSize?: string
}>`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  ${({ $textAlign }) =>
    $textAlign
      ? `
      text-align: ${$textAlign};
    `
      : 'text-align: center;'}
  ${({ $margin }) =>
    $margin
      ? `
        margin: ${$margin};
      `
      : 'margin: 8px 0;'}
  ${({ $width }) =>
    $width
      ? `
        width: ${$width};
          `
      : ''}
`

const StyledProductDetailsContainer = styled.div``

const StyledProductDescription = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  padding: 8px 0;
`

const StyledProductDimensions = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  padding: 0 0 4px 0;
`

const StyledPageDetails = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
`

const StyledPaperDetailsUpdateContainer = styled.div`
  padding-top: 24px;
`

// @ts-ignore
const StyledPaperAttributeSelect = styled(Select)<{
  $shouldPlayHighlightAnimation?: boolean
}>`
  .ant-select-selector {
    border-radius: 6px !important;
  }
  .ant-select {
    border-radius: 6px;
  }

  .ant-select-arrow {
    width: 12px;
    height: 8px;
    margin-top: -4px;
    right: 11px;
  }

  .ant-select-arrow .anticon {
    display: none;
  }

  .ant-select-arrow::after {
    content: '';
    display: block;
    width: 12px;
    height: 8px;
    background-image: url(${selectChevron});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  ${({ $shouldPlayHighlightAnimation }) =>
    $shouldPlayHighlightAnimation &&
    `.ant-select-selector {
      @keyframes flashBorder {
        0% {
            border-color: #d9d9d9;
        }
        20% {
            border-color: ${COLOR.CORE_PURPLE_60};
        }
        40% {
            border-color: #d9d9d9;
        }
        60% {
            border-color: ${COLOR.CORE_PURPLE_60};
        }
        80% {
            border-color: #d9d9d9;
        }
        100% {
            border-color: ${COLOR.CORE_PURPLE_60};
        }
      }
      animation: flashBorder 3s ease-in-out 1 forwards;
  }`};

  width: 200px;
`

const StyledTitle = styled.div<{ $width?: string }>`
  ${({ $width }) => ($width ? `width: ${$width}` : `min-width : 260px`)};
  ${STYLE.TEXT_EXTRA_SMALL};
`

const StyledPaperTypeSelectContainer = styled.div``

const StyledPaperTypeSelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
`

const StyledComparePapersText = styled.div`
  cursor: pointer;
  text-decoration: underline;
  ${STYLE.TEXT_EXTRA_SMALL};
`

const StyledPaperCopiesSelectContainer = styled.div`
  padding-top: 20px;
`

const StyledCopiesSelectContainer = styled.div`
  width: 350px;
  display: flex;
`

const StyledTotalCopiesPriceTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const StyledTotalCopiesUnitPriceText = styled.div<{
  $letterSpacing?: string
  $padding?: string
}>`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  ${({ $letterSpacing }) =>
    $letterSpacing && `letter-spacing: ${$letterSpacing}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
`

const StyledStartPrintingPriceContainer = styled.div`
  display: flex;
  width: 190px;
  padding-left: 20px;
  align-items: center;
  ${STYLE.TEXT_EXTRA_SMALL};
`

const StyledStartPrintingPriceText = styled.div<{ $padding?: string }>`
  ${({ $padding }) => $padding && `padding: ${$padding}`};
`

const StyledMinimumCopiesText = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  padding-top: 4px;
`

const StyledContinueButtonContainer = styled.div`
  margin: 0;
  padding-top: 20px;
  width: 100%;
`

const StyledContinueButton = styled(Button)`
  width: 100%;
`

const StyledContinueIcon = styled(EyeIcon)`
  && img {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && svg {
    width: 16px;
    height: 16px;
  }
`

const StyledOrderDiscountContainer = styled.div`
  display: flex;
  padding: 6px 24px;
  margin-top: 44px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${COLOR.CORE_PURPLE_30};
  background: ${COLOR.CORE_PURPLE_10};
`

const StyledFreeShippingIcon = styled(PurchaseIcon)`
  color: ${COLOR.CORE_PURPLE};
`

const StyledFreeShippingText = styled.div`
  color: ${COLOR.CORE_PURPLE};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

const StyledShippingOptionsDetailsContainer = styled.div``

const StyledShippingOptionHeader = styled.div`
  ${STYLE.TEXT_SMALL};
  padding: 12px 0;
`

const StyledShippingOptions = styled.li`
  ${STYLE.TEXT_EXTRA_SMALL};
  padding: 2px;
`

const StyledShippingDescriptionText = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  padding-top: 16px;
`

const getDrawerWidth = () => {
  if (typeof window === 'undefined') {
    return MOBILE_DRAWER_WIDTH
  }

  if (window.innerWidth < CHECKOUT_BREAKPOINT.MD) {
    return MOBILE_DRAWER_WIDTH
  }

  return 980
}

const PrintingOptionDrawer = ({
  open,
  country,
  product,
}: PrintingOptionDrawerProps): JSX.Element | null => {
  if (!product) {
    return null
  }

  const [initialProductState, setInitialProductState] =
    useState<IPrintingProductDetails | null>(null)

  const dispatch = useEulogiseDispatch()

  const productState = useProductState({
    product: product as unknown as EulogiseProduct,
  }) as ICardProductState
  const pageAmount = productState?.activeItem?.content?.pages?.length ?? 0

  const activeItem: ICardProductData = productState?.activeItem!
  const activeProductTheme: ICardProductTheme =
    productState?.activeProductTheme!

  const paperTypesRef = useRef<HTMLDivElement | null>(null)

  const [displayedThumbnailIndex, setDisplayedThumbnailIndex] = useState(0)

  const {
    printingDetails,
    isReviewDesignDrawerOpened,
    reviewDesignDrawerActiveProduct,
  }: ICheckoutsState = useCheckoutsState()

  const [drawerWidth, setDrawerWidth] = useState(getDrawerWidth())
  const productDetails =
    product && printingDetails?.orderedProductsDetails?.[product]
  const paperType = productDetails?.paperType ?? null
  const copiesAmount = productDetails?.copiesAmount ?? 0
  const shouldPaperTypeSelectHighlighted: boolean = !paperType
  const paperTypeOptions =
    product && CheckoutHelper.getAvailablePrintingPaperTypesOptions({ product })

  const paperQuantityOptions =
    CheckoutHelper.getAvailablePrintingPaperQuantityOptions()

  const shouldCopiesAmountSelectHighlighted: boolean =
    copiesAmount > 0 ? false : true

  const shouldShowActualUnitprice = copiesAmount > 0 && !!paperType

  const paperPricing = paperType
    ? EulogizePrintingProductsPaperTypeDefinition?.[paperType]
        .perPaperUnitPrice?.[product]?.[country]?.[
        copiesAmount as keyof IPrintingPerUnitPriceByCopies
      ]
    : 0

  const displayedStartingPrice =
    CheckoutHelper.getPrintingProductStartingPriceByProduct({
      product,
      country,
    })

  const isContinueButtonAvaialble = !!(paperType && copiesAmount > 0)

  const shouldShowPagesAmountText = product === EulogiseCardProducts.BOOKLET

  const makeLiveThumbnails = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return []
    }
    switch (product) {
      case EulogiseCardProducts.BOOKLET:
        return [
          {
            type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
            component: (
              <CheckoutProductPreview
                cardProduct={activeItem}
                productTheme={activeProductTheme}
                product={EulogiseProduct.BOOKLET}
                type={CheckoutProductPreviewType.FRONT_AND_THIRD}
                width={LIVE_ASSET_WIDTH}
              />
            ),
          },
          {
            type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
            component: (
              <CheckoutProductPreview
                cardProduct={activeItem}
                productTheme={activeProductTheme}
                product={EulogiseProduct.BOOKLET}
                type={CheckoutProductPreviewType.FRONT_AND_LAST}
                width={LIVE_ASSET_WIDTH}
              />
            ),
          },
          {
            type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
            component: (
              <CheckoutProductPreview
                cardProduct={activeItem}
                productTheme={activeProductTheme}
                product={EulogiseProduct.BOOKLET}
                type={CheckoutProductPreviewType.FRONT_AND_LAST_WITH_INTERNALS}
                width={LIVE_ASSET_WIDTH}
              />
            ),
          },
        ]
      case EulogiseCardProducts.SIDED_CARD:
        return [
          {
            type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
            component: (
              <CheckoutProductPreview
                cardProduct={activeItem}
                productTheme={activeProductTheme}
                product={EulogiseProduct.SIDED_CARD}
                type={CheckoutProductPreviewType.FRONT_AND_LAST}
                width={LIVE_ASSET_WIDTH}
              />
            ),
          },
          {
            type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
            component: (
              <CheckoutProductPreview
                cardProduct={activeItem}
                productTheme={activeProductTheme}
                product={EulogiseProduct.SIDED_CARD}
                type={CheckoutProductPreviewType.FRONT_AND_LAST}
                width={LIVE_ASSET_WIDTH}
                isReverse={true}
              />
            ),
          },
        ]
      default:
        return []
    }
  }

  const productAssetsThumbnailsWithLiveAssets =
    ENABLED_LIVE_ASSETS_PRODUCTS.includes(product)
      ? [
          ...makeLiveThumbnails({ product }),
          ...PRODUCTS_ASSEST_THUMBNAILS?.[product],
        ].filter((asset) => asset)
      : PRODUCTS_ASSEST_THUMBNAILS?.[product] ?? []

  const onCancel = ({ product }: { product: EulogiseCardProducts }) => {
    if (!product) {
      return
    }
    const updatedPrintingDetails: IPrintingDetails = {
      ...printingDetails,
      orderedProductsDetails: {
        ...printingDetails.orderedProductsDetails,
        [product]: {
          ...initialProductState,
        },
      },
    }
    dispatch(updatePrintingDetails(updatedPrintingDetails))
    dispatch(
      updateIsPrintingOptionDrawerOpen({
        isPrintingOptionDrawerOpened: false,
        printingOptionDrawerActiveProduct: null,
      }),
    )
    dispatch(
      updateIsReviewDesignDrawerOpened({
        isReviewDesignDrawerOpened: false,
        reviewDesignDrawerActiveProduct: null,
      }),
    )
  }

  const onRevertPrintingOption = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return
    }
    const updatedPrintingDetails: IPrintingDetails = {
      ...printingDetails,
      orderedProductsDetails: {
        ...printingDetails.orderedProductsDetails,
        [product]: {
          ...printingDetails.orderedProductsDetails[product],
          isProductOrderedForPrinting: false,
          paperType: null,
          copiesAmount: 0,
        },
      },
    }
    dispatch(updatePrintingDetails(updatedPrintingDetails))
    dispatch(
      updateIsPrintingOptionDrawerOpen({
        isPrintingOptionDrawerOpened: false,
        printingOptionDrawerActiveProduct: null,
      }),
    )
    dispatch(
      updateIsReviewDesignDrawerOpened({
        isReviewDesignDrawerOpened: false,
        reviewDesignDrawerActiveProduct: null,
      }),
    )
  }

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(getDrawerWidth())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (open && product) {
      const initialPrintingProductState =
        printingDetails.orderedProductsDetails?.[product]
      if (initialPrintingProductState) {
        setInitialProductState(initialPrintingProductState)
      }
    }
  }, [open, product])

  const renderStartingPrice = () => {
    return (
      <StyledStartPrintingPriceContainer>
        <StyledStartPrintingPriceText>{`from`}</StyledStartPrintingPriceText>
        <Price
          priceNumber={displayedStartingPrice}
          $letterSpacing="-0.1rem"
          withDollarSign={true}
          $padding={'0 4px;'}
        />
        <StyledStartPrintingPriceText $padding="0">{`per print`}</StyledStartPrintingPriceText>
      </StyledStartPrintingPriceContainer>
    )
  }

  const handlePaperTypeChange = ({
    product,
    type,
  }: {
    product: EulogiseCardProducts
    type: EulogizePrintingProductsPaperTypes
  }) => {
    if (!product || !type) {
      return
    }
    const updatedPrintingDetails: IPrintingDetails = {
      ...printingDetails,
      orderedProductsDetails: {
        ...printingDetails.orderedProductsDetails,
        [product]: {
          ...printingDetails.orderedProductsDetails[product],
          paperType: type,
        },
      },
    }
    dispatch(updatePrintingDetails(updatedPrintingDetails))
  }

  const handlePaperQuantityChange = ({
    product,
    amount,
  }: {
    product: EulogiseCardProducts
    amount: string
  }) => {
    if (!product || !amount) {
      return
    }
    const updatedPrintingDetails: IPrintingDetails = {
      ...printingDetails,
      orderedProductsDetails: {
        ...printingDetails.orderedProductsDetails,
        [product]: {
          ...printingDetails.orderedProductsDetails[product],
          copiesAmount: Number(amount),
        },
      },
    }
    dispatch(updatePrintingDetails(updatedPrintingDetails))
  }

  const renderDispatchNotification = ({
    countdownText,
  }: {
    countdownText: string
  }) => {
    if (!countdownText || pageAmount < 1) {
      return null
    }

    return (
      <StyledDispatchNotificationContainer>
        <StyledDeliveryIcon />
        <StyledDispatchNotificationText>
          Complete your order within {countdownText} hrs to make today's
          dispatch
        </StyledDispatchNotificationText>
      </StyledDispatchNotificationContainer>
    )
  }

  const renderPaperTypes = ({ product }: { product: EulogiseCardProducts }) => {
    const availablePaperTypeDefinition: IPrintingPaperDefinition[] =
      CheckoutHelper.getAvailablePrintingPaperTypesByProduct({ product })

    return (
      <StyledPaperTypesContainer ref={paperTypesRef}>
        <StyledPaperyTypeText>
          Choose from our range of quality papers
        </StyledPaperyTypeText>
        <StyledPaperTypesContentContainer gutter={[20, 20]}>
          {availablePaperTypeDefinition.map(
            (paperTypeDefinition: IPrintingPaperDefinition) => {
              const { perPaperUnitPrice, thickness, weight, weightUnit } =
                paperTypeDefinition

              const perPaperUnitPriceSet =
                perPaperUnitPrice?.[product]?.[country]

              const minStartingPriceArray = Object.values(
                perPaperUnitPriceSet,
              ).filter((num) => num !== 0)

              const minStartingPricePerCopy =
                Math.min(...minStartingPriceArray) ?? 999
              return (
                <StyledPaperTypeContainer
                  xs={24}
                  sm={12}
                  md={8}
                  key={paperTypeDefinition.key}
                >
                  <StyledPaperTypeCard src={paperTypeDefinition.imageUrl} />
                  <StyledPaperTypeDisplayName>
                    {paperTypeDefinition.displayName}
                  </StyledPaperTypeDisplayName>
                  <StyledPaperTypeDescription>
                    {paperTypeDefinition.description}
                  </StyledPaperTypeDescription>
                  <StyledPaperTypeComposedRowTextContainer>
                    <StyledPaperTypeText
                      $width="160px"
                      $textAlign="left"
                      $margin="2px 0"
                    >
                      {`Weight:`}
                    </StyledPaperTypeText>
                    <StyledPaperTypeText $textAlign="left" $margin="2px 0">
                      {weight}
                      {weightUnit}
                    </StyledPaperTypeText>
                  </StyledPaperTypeComposedRowTextContainer>

                  <StyledPaperTypeComposedRowTextContainer>
                    <StyledPaperTypeText
                      $width="160px"
                      $textAlign="left"
                      $margin="2px 0"
                    >
                      {`Thickness:`}
                    </StyledPaperTypeText>
                    <StyledPaperTypeText $textAlign="left" $margin="2px 0">
                      {thickness}
                    </StyledPaperTypeText>
                  </StyledPaperTypeComposedRowTextContainer>

                  <StyledPaperTypeComposedRowTextContainer>
                    <StyledPaperTypeText
                      $width="160px"
                      $textAlign="left"
                      $margin="2px 0"
                    >
                      {`Starting at:`}
                    </StyledPaperTypeText>
                    <StyledPaperTypeText $textAlign="left" $margin="2px 0">
                      {`$${minStartingPricePerCopy.toFixed(2)} per copy`}
                    </StyledPaperTypeText>
                  </StyledPaperTypeComposedRowTextContainer>
                </StyledPaperTypeContainer>
              )
            },
          )}
        </StyledPaperTypesContentContainer>
      </StyledPaperTypesContainer>
    )
  }

  const renderProductDetails = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    return (
      <StyledProductDetailsContainer>
        {/* <StyledProductName>
          {EulogizePrintingProductDisplayNames?.[product]}
        </StyledProductName> */}
        <StyledProductDescription>
          {PRINTING_PRODUCTS_DESCRIPTION?.[product] ?? ''}
        </StyledProductDescription>
        <StyledProductDimensions>
          Dimensions:{' '}
          {
            CheckoutHelper.getPrintingTributesDisplayedSizeByCountry({
              country,
            })?.[product]
          }
        </StyledProductDimensions>
        {shouldShowPagesAmountText && (
          <StyledPageDetails>
            {pageAmount} pages{' '}
            {`${
              CheckoutHelper.getPrintingProductDisplaySideInformationByCountry({
                country,
              })?.[product] === 'N/A'
                ? ''
                : `- ${
                    CheckoutHelper.getPrintingProductDisplaySideInformationByCountry(
                      { country },
                    )?.[product]
                  }`
            }`}
          </StyledPageDetails>
        )}
      </StyledProductDetailsContainer>
    )
  }

  const renderPaperTypeCopySelect = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return null
    }

    return (
      <StyledPaperDetailsUpdateContainer>
        <StyledPaperTypeSelectContainer>
          <StyledTitle>Select your paper type</StyledTitle>

          <StyledPaperTypeSelectRow>
            <StyledPaperAttributeSelect
              defaultValue={paperType}
              placeholder={'Select Paper'}
              onChange={(type) =>
                handlePaperTypeChange({
                  product,
                  type: type as EulogizePrintingProductsPaperTypes,
                })
              }
              options={paperTypeOptions!}
              $shouldPlayHighlightAnimation={shouldPaperTypeSelectHighlighted}
            />
            <StyledComparePapersText
              onClick={() =>
                paperTypesRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            >
              View paper types
            </StyledComparePapersText>
          </StyledPaperTypeSelectRow>
        </StyledPaperTypeSelectContainer>

        <StyledPaperCopiesSelectContainer>
          <StyledTitle>How many prints?</StyledTitle>
          <StyledCopiesSelectContainer>
            <StyledPaperAttributeSelect
              placeholder={'Select Quantity'}
              defaultValue={copiesAmount > 0 ? copiesAmount : undefined}
              onChange={(e) =>
                handlePaperQuantityChange({ product, amount: e as string })
              }
              options={paperQuantityOptions}
              $shouldPlayHighlightAnimation={
                shouldCopiesAmountSelectHighlighted
              }
            />
            {shouldShowActualUnitprice ? (
              <StyledTotalCopiesPriceTextContainer>
                <Price
                  priceNumber={Number(paperPricing * copiesAmount)}
                  $letterSpacing="-0.1rem"
                  withDollarSign={true}
                />

                <StyledTotalCopiesUnitPriceText $padding="0 0 0 4px;">
                  (
                </StyledTotalCopiesUnitPriceText>

                <Price
                  priceNumber={paperPricing}
                  $letterSpacing="-0.1rem"
                  $color={COLOR.DOVE_GREY}
                  withDollarSign={true}
                  $padding={'0px'}
                />
                <StyledTotalCopiesUnitPriceText>
                  /print)
                </StyledTotalCopiesUnitPriceText>
              </StyledTotalCopiesPriceTextContainer>
            ) : (
              renderStartingPrice()
            )}
          </StyledCopiesSelectContainer>
          <StyledMinimumCopiesText>Minimum 20 copies</StyledMinimumCopiesText>
        </StyledPaperCopiesSelectContainer>
      </StyledPaperDetailsUpdateContainer>
    )
  }

  const renderContinueButton = ({
    product,
  }: {
    product: EulogiseCardProducts
  }) => {
    if (!product) {
      return null
    }

    return (
      <StyledContinueButtonContainer>
        <StyledContinueButton
          buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
          buttonSize={ButtonSize.XMD}
          onClick={() => {
            dispatch(
              updateIsReviewDesignDrawerOpened({
                isReviewDesignDrawerOpened: true,
                reviewDesignDrawerActiveProduct: product,
              }),
            )
          }}
          disabled={!isContinueButtonAvaialble}
          noMarginLeft
          noMarginRight
          icon={<StyledContinueIcon />}
        >
          Review your design to continue
        </StyledContinueButton>
      </StyledContinueButtonContainer>
    )
  }

  const renderFreeShippingDiscountBox = () => {
    return (
      <StyledOrderDiscountContainer>
        <StyledFreeShippingIcon />
        <StyledFreeShippingText>
          Order 4 video books free FREE standard shipping
        </StyledFreeShippingText>
      </StyledOrderDiscountContainer>
    )
  }

  const renderShippingOptionsDetails = () => {
    return (
      <StyledShippingOptionsDetailsContainer>
        <StyledShippingOptionHeader>
          Shipping options
        </StyledShippingOptionHeader>
        {EULOGIZE_PRINTING_SHIPPING_METHODS_DETAILS.filter(
          (shippingMethod) => shippingMethod.isShipping,
        ).map((shippingMethod) => {
          return (
            <StyledShippingOptions>{`${shippingMethod.displayName} ${shippingMethod.transitTimeText}`}</StyledShippingOptions>
          )
        })}
        <StyledShippingDescriptionText>
          Choose your shipping option at checkout
        </StyledShippingDescriptionText>
      </StyledShippingOptionsDetailsContainer>
    )
  }

  const renderReviewDesignDrawer = ({
    open,
    product,
  }: {
    open: boolean
    product: EulogiseCardProducts | null
  }) => {
    return (
      <ReviewDesignDrawer
        open={open}
        // TODO: GENERIC_PRODUCT_TYPE
        // genericProductType={genericProductType}
        product={product}
        country={country}
      />
    )
  }

  const contentChildWidth = LIVE_ASSET_WIDTH

  const getHeaderTextByProduct = ({
    product,
  }: {
    product: EulogiseCardProducts | null
  }) => {
    if (!product) {
      return 'Printing Options'
    }

    return `${
      EulogizePrintingProductDisplayNames?.[product] ?? ''
    } Printing Options`
  }

  return (
    <StyledDrawer
      placement={'left'}
      open={open}
      closable={false}
      key={`Printing Options Drawer - ${product}`}
      maskClosable={false}
      width={drawerWidth}
    >
      <StyledHeaderContainer>
        <StyledHeaderText>
          {getHeaderTextByProduct({ product })}
        </StyledHeaderText>
        <StyledCancelButtonContainer>
          <StyledCancelButton
            buttonType={ButtonType.TRANSPARENT}
            buttonSize={ButtonSize.SM}
            onClick={() =>
              initialProductState
                ? onCancel({ product })
                : onRevertPrintingOption({ product })
            }
            disabled={false}
            noMarginLeft
            noMarginRight
          >
            Cancel
          </StyledCancelButton>
        </StyledCancelButtonContainer>
      </StyledHeaderContainer>

      {ENABLE_DISPATCH_NOTIFICATION &&
        renderDispatchNotification({ countdownText: MOCK_DISPATCH_TIME_TEXT })}

      <StyledContentParentContainer>
        <StyledContentContainer $width={contentChildWidth}>
          <SlidedPhotoGallery
            thumbnails={productAssetsThumbnailsWithLiveAssets}
            displayedThumbnailIndex={displayedThumbnailIndex}
            setDisplayedThumbnailIndex={setDisplayedThumbnailIndex}
            displayedThumbnailHeight={DISPLAYED_THUMBNAIL_HEIGHT}
          />
        </StyledContentContainer>
        <StyledVerticalSeperator />
        <StyledContentContainer $width={contentChildWidth}>
          {renderProductDetails({ product })}
          {renderPaperTypeCopySelect({ product })}
          {renderContinueButton({ product })}
          {ENABLE_ORDER_FOUR_BOOKS_FREE_STANDING_SHIPPING &&
            renderFreeShippingDiscountBox()}
          {renderShippingOptionsDetails()}
        </StyledContentContainer>
      </StyledContentParentContainer>

      {renderPaperTypes({ product })}
      {renderReviewDesignDrawer({
        open: isReviewDesignDrawerOpened,
        product: reviewDesignDrawerActiveProduct,
      })}
    </StyledDrawer>
  )
}

export default PrintingOptionDrawer
