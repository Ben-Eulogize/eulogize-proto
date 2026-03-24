import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Drawer, Row, Col, Input } from 'antd'
import {
  Button,
  ButtonSize,
  ButtonType,
  TabPane,
  Tabs,
  PlusIcon,
  MinsIcon,
  EyeIcon,
} from '@eulogise/client-components'
import { CHECKOUT_BREAKPOINT, COLOR, STYLE } from '@eulogise/client-core'
import {
  ADDRESS_INPUT_MODE,
  CardProductPageSize,
  EulogiseCardProducts,
  EulogiseCountry,
  EulogisePhotoBookCheckoutOptions,
  EulogisePhotobookCoverType,
  EulogiseRegion,
  EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS,
  IAddressDetails,
  ICheckoutsState,
  IImageAssetContent,
  IPhotoBookMetaData,
  KEEPSAKE_PRODUCTS,
  PhotobookBookStyle,
  PhotobookCoverTypeLabelMap,
  ValidPhotobookCheckoutSize,
} from '@eulogise/core'
import {
  PhotobookHelper,
  CardProductFrameHelper,
  CheckoutHelper,
} from '@eulogise/helpers'
import {
  useAssetState,
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
  usePhotobookState,
} from '../../store/hooks'
import { useCustomisedImageOrder } from '../../hooks/useCustomisedImageOrder'
import { CaseHelper } from '@eulogise/helpers'
import { PhotobookCoverPagePreview } from '@eulogise/client-components/dist/PhotobookCoverPagePreview'
import SlidedPhotoGallery, {
  ISlidedPhotoGalleryAssetType,
  ISlidedPhotoGalleryAsset,
} from './SlidedPhotoGallery'
import { PhotobookDrawerFeature } from './PhotobookDrawerFeature'
import { detectAssetFaces } from '../../store/AssetState/actions'
import {
  updatePhotoBookOrderSelection,
  updatePhotoBookShippingAddressDetails,
  updatePhotoBookDetails,
  updateIsReviewDesignDrawerOpened,
} from '../../store/CheckoutsState/action'
import ReviewDesignDrawer from './ReviewDesignDrawer'

const CONTENT_VERTICAL_WIDTH = 40
const LIVE_ASSET_WIDTH = 430
const MOBILE_DRAWER_WIDTH = LIVE_ASSET_WIDTH + 48

interface PhotobookCheckoutDrawerProps {
  open: boolean
  country: EulogiseCountry
  onDrawerClose: () => void
}

const getDrawerWidth = () => {
  if (typeof window === 'undefined') {
    return MOBILE_DRAWER_WIDTH
  }
  if (window.innerWidth < CHECKOUT_BREAKPOINT.MD) {
    return MOBILE_DRAWER_WIDTH
  }
  return 980
}

const StyledHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
  position: relative;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    max-width: ${LIVE_ASSET_WIDTH}px;
    margin: 0 auto;
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

const StyledContentParentContainer = styled.div`
  padding-top: 24px;
  display: flex;
  gap: 24px;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    flex-direction: column;
    align-items: center;
  }
`

export const StyledVerticalSeparator = styled.div`
  width: ${CONTENT_VERTICAL_WIDTH}px;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }
`

const StyledContentContainer = styled.div<{ $width: number }>`
  ${({ $width }) => $width && `width: ${$width}px;`}
  max-width: 100%;
  min-width: 0; // allow flex child to shrink when gallery wants more width
`

const StyledProductDetailsContainer = styled.div`
  padding: 0 0 24px 0;
`

const StyledProductDescription = styled.div``

const StyledSettingsContainer = styled.div``

const StyledTitleLabel = styled.div`
  font-weight: ${STYLE.FONT_WEIGHT_BOLD};
  padding-bottom: 8px;
`

const StyledPriceSection = styled.div`
  background-color: ${COLOR.CORE_PURPLE_10};
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
`

const StyledPriceDescription = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  text-align: right;
`

const StyledContinueButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`

const StyledProductFeaturesContainer = styled.div`
  padding: 40px 0;
`

const StyledProductFeaturesHeader = styled.div`
  ${STYLE.HEADING_SMALL};
`

const StyledQuanityInput = styled(Input)<{
  $shouldPlayHighlightAnimation: boolean
}>`
  margin-top: 4px;
  width: 192px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  max-height: 32px;
  cursor: default;
  &:hover {
    cursor: default;
  }
  .ant-input-affix-wrapper {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    max-height: 32px;
    cursor: default;
  }
  .ant-input {
    text-align: center;
    border: none;
    cursor: default;
    caret-color: transparent;
    user-select: none;
  }
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  ${({ $shouldPlayHighlightAnimation }) =>
    $shouldPlayHighlightAnimation &&
    `.ant-input-affix-wrapper {
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
        0% {
            border-color: ${COLOR.CORE_PURPLE_60};
        }
      }
      animation: flashBorder 3s ease-in-out 1 forwards;
  }`};
`

const StyledMinsIcon = styled(MinsIcon)<{
  $disabled: boolean
}>`
  ${({ $disabled }) =>
    $disabled
      ? `color: ${COLOR.DOVE_GREY};
  `
      : `color: ${COLOR.BLACK};`}
`

export const DisplayedPhotoBookStyle: Record<PhotobookBookStyle, string> = {
  [PhotobookBookStyle.CLASSIC_PHOTOBOOK]: 'Classic Photo Book',
  [PhotobookBookStyle.PREMIUM_PHOTOBOOK]: 'Premium Photo Book',
}

export const DisplayedPhotoBookSizeText: Partial<
  Record<CardProductPageSize, string>
> = {
  [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM]: 'Medium Landscape',
  [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE]: 'Large Landscape',
  [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM]: 'Medium Landscape',
  [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE]: 'Large Landscape',
}

const PHOTO_BOOK_DRAWER_STATIC_SQUARE_PHOTOS_PREMIUM: ISlidedPhotoGalleryAsset[] =
  [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/premium/photobook-premium-square-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/premium/photobook-premium-square-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/premium/photobook-premium-square-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/premium/photobook-premium-square-4.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ]

const PHOTO_BOOK_DRAWER_STATIC_SQUARE_PHOTOS_CLASSIC: ISlidedPhotoGalleryAsset[] =
  [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/classic/photobook-classic-square-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/classic/photobook-classic-square-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/photo-books/classic/photobook-classic-square-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ]

const getPhotoBookDrawerStaticSquarePhotos = ({
  bookstyle,
}: {
  bookstyle: PhotobookBookStyle
}): ISlidedPhotoGalleryAsset[] => {
  switch (bookstyle) {
    case PhotobookBookStyle.CLASSIC_PHOTOBOOK:
      return PHOTO_BOOK_DRAWER_STATIC_SQUARE_PHOTOS_CLASSIC
    case PhotobookBookStyle.PREMIUM_PHOTOBOOK:
      return PHOTO_BOOK_DRAWER_STATIC_SQUARE_PHOTOS_PREMIUM
    default:
      return []
  }
}

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyleText = styled.div`
  color: #646872;
  font-size: 16px;
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

// const StyledAddPresentationalBoxSwitchContainer = styled.div`
//   display: flex;
//   padding-top: 8px;
// `

// const StyledAddPresentationalBoxSwitch = styled(Switch)`
//   margin-right: 8px;
// `

const StyledQuantityContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  display: flex;
  align-items: center;
  max-height: 32px;
  gap: 12px;
`

const StyledCopiesSelectContainer = styled.div``

const StyledPriceContainer = styled.div`
  display: flex;
`

const StyledPriceText = styled.div`
  color: ${COLOR.DOVE_GREY};
  margin-left: 20px;
  margin-right: 4px;
  letter-spacing: -0.1rem;
`

const StyledPriceSuffixText = styled.div`
  color: ${COLOR.DOVE_GREY};
`

const NumberText = styled.span`
  letter-spacing: -0.1rem;
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

const renderWithStyledNumbers = (text: string) => {
  return text.split(/(\d+)/).map((part, idx) => {
    if (/^\d+$/.test(part)) {
      return <NumberText key={idx}>{part}</NumberText>
    }
    return <span key={idx}>{part}</span>
  })
}

const StyledTitle = styled.div<{ $width?: string }>`
  ${({ $width }) => ($width ? `width: ${$width}` : `min-width : 260px`)};
  ${STYLE.TEXT_EXTRA_SMALL};
`

enum ActiveTab {
  CLASSIC_PHOTOBOOKS = 'classic-photobooks',
  PREMIUM_PHOTOBOOKS = 'premium-photobooks',
  PREMIUM_PHOTO_ALBUMS = 'premium-photo-albums',
}

const PhotobookCheckoutDrawer = ({
  open,
  country,
  onDrawerClose,
}: PhotobookCheckoutDrawerProps): JSX.Element | null => {
  if (!country) {
    return null
  }

  const dispatch = useEulogiseDispatch()
  const [hasFaceDetected, setHasFaceDetected] = useState<boolean>(false)
  const [displayedThumbnailIndex, setDisplayedThumbnailIndex] = useState(0)
  const { images } = useAssetState()
  const { activeItem: activeCase } = useCaseState()
  const { activeItem: activePhotobook } = usePhotobookState()
  const { orderedImages } = useCustomisedImageOrder()

  const region = activeCase?.region ?? EulogiseRegion.USA

  const photoBookSizesByRegion = PhotobookHelper.getPhotobookSizeByRegion({
    region,
  })

  const {
    keepsakesDetails,
    printingDetails: { printingAddressDetails },
    isReviewDesignDrawerOpened,
    reviewDesignDrawerActiveProduct,
  }: ICheckoutsState = useCheckoutsState()
  const {
    photoBook: {
      metaData: photoBookMetaData,
      shippingAddressDetails: photoBookShippingAddressDetails,
      option: photoBookOption,
    },
  } = keepsakesDetails

  const primaryImage = CaseHelper.getPrimaryImage({ activeCase: activeCase! })
  const displayImage: IImageAssetContent =
    primaryImage ?? orderedImages?.[0]?.content

  const [drawerWidth, setDrawerWidth] = useState(getDrawerWidth())
  const photobookFeaturesRef = useRef<HTMLVideoElement | null>(null)

  const [activeTabKey, setActiveTabKey] = useState<string | null>(null)

  const pageSize = activePhotobook?.content
    ?.pageSize as ValidPhotobookCheckoutSize
  const bookStyle: PhotobookBookStyle =
    PhotobookHelper.getBookStyleByPageSize(pageSize)
  const displayedBookStyle = DisplayedPhotoBookStyle?.[bookStyle]

  const noOfPages = (activePhotobook?.content?.pages?.length ?? 0) - 2
  const displayedPageSizeText = `${DisplayedPhotoBookSizeText?.[pageSize]} ${photoBookSizesByRegion?.[pageSize]} | ${noOfPages} Pages`

  const coverType = PhotobookHelper.getCoverType(activePhotobook!)!

  const displayedCoverText = `${PhotobookCoverTypeLabelMap?.[coverType]} Cover`

  const copyAmount = photoBookMetaData?.copyAmount ?? 0

  const isPrintingAddressAvailable =
    printingAddressDetails.isValidAddress &&
    printingAddressDetails.formattedAddress

  const isPhotoBookAdded =
    photoBookOption === EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK

  const photoBookDrawerStaticSquarePhotos =
    getPhotoBookDrawerStaticSquarePhotos({ bookstyle: bookStyle })
  const onHandleQuantityChange = ({
    newCopiesAmount,
  }: {
    newCopiesAmount: number
  }) => {
    const updatedPhotoBookDetails: IPhotoBookMetaData = {
      ...photoBookMetaData,
      copyAmount: newCopiesAmount,
    }
    dispatch(updatePhotoBookDetails(updatedPhotoBookDetails))
  }

  const onOverwritePhotoBookAddressDetails = () => {
    if (!isPrintingAddressAvailable) {
      return
    }

    const updatedPhotoBookShippingAddressDetails: IAddressDetails = {
      ...photoBookShippingAddressDetails,
      formattedAddress: printingAddressDetails.formattedAddress,
      isValidAddress: printingAddressDetails.isValidAddress,
      portalAddressMetaData: printingAddressDetails.portalAddressMetaData,
      addressInputMode: printingAddressDetails.addressInputMode,
    }

    dispatch(
      updatePhotoBookShippingAddressDetails(
        updatedPhotoBookShippingAddressDetails,
      ),
    )
  }

  const selectBefore = (
    <StyledMinsIcon
      $disabled={Number(copyAmount) === 0}
      onClick={() => {
        if (Number(copyAmount) === 0) {
          return
        }
        onHandleQuantityChange({ newCopiesAmount: Number(copyAmount) - 1 })
      }}
    />
  )

  const selectAfter = (
    <PlusIcon
      onClick={() =>
        onHandleQuantityChange({ newCopiesAmount: Number(copyAmount) + 1 })
      }
    />
  )

  const coverLayoutId = PhotobookHelper.getCoverPageLayoutId(activePhotobook!)!

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(980)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!displayImage) {
      setHasFaceDetected(true)
      return
    }
    if (displayImage.faceDetection) {
      setHasFaceDetected(true)
    } else {
      const asset = images?.find(
        (i) => i.content.filestackHandle === displayImage.filestackHandle,
      )
      if (asset) {
        // detect face
        dispatch(
          detectAssetFaces({
            assetId: asset.id,
            onSuccess: () => {
              setHasFaceDetected(true)
            },
          }),
        )
      } else {
        setHasFaceDetected(true)
      }
    }
  }, [displayImage])

  useEffect(() => {
    dispatch(
      updatePhotoBookOrderSelection(
        EulogisePhotoBookCheckoutOptions.ORDER_PHOTO_BOOK,
      ),
    )
    const updatedPhotoBookDetails: IPhotoBookMetaData = {
      ...photoBookMetaData,
      bookStyle: {
        style: bookStyle,
        size: pageSize,
        numberOfPages: noOfPages,
      },
      coverStyle: {
        design: coverLayoutId,
        coverMaterial: coverType,
      },
      copyAmount: copyAmount ? copyAmount : 1,
    }
    dispatch(updatePhotoBookDetails(updatedPhotoBookDetails))
  }, [])

  useEffect(() => {
    if (bookStyle) {
      switch (bookStyle) {
        case PhotobookBookStyle.CLASSIC_PHOTOBOOK:
          setActiveTabKey(ActiveTab.CLASSIC_PHOTOBOOKS)
          return
        case PhotobookBookStyle.PREMIUM_PHOTOBOOK:
          setActiveTabKey(ActiveTab.PREMIUM_PHOTOBOOKS)
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    if (isPrintingAddressAvailable && isPhotoBookAdded && copyAmount >= 1) {
      onOverwritePhotoBookAddressDetails()
    }
  }, [isPrintingAddressAvailable, isPhotoBookAdded, copyAmount])

  const onHandleCancel = () => {
    dispatch(
      updatePhotoBookOrderSelection(
        EulogisePhotoBookCheckoutOptions.SKIP_PHOTO_BOOK,
      ),
    )
    const updatedPhotoBookShippingAddressDetails: IAddressDetails = {
      ...photoBookShippingAddressDetails,
      formattedAddress: null,
      isValidAddress: false,
      portalAddressMetaData: null,
      addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
    }
    dispatch(
      updatePhotoBookShippingAddressDetails(
        updatedPhotoBookShippingAddressDetails,
      ),
    )
    const updatedPhotoBookDetails: IPhotoBookMetaData = {
      ...photoBookMetaData,
      bookStyle: {
        style: null,
        size: null,
        numberOfPages: 0,
      },
      coverStyle: {
        design: null,
        coverMaterial: null,
      },
      copyAmount: 0,
    }
    dispatch(updatePhotoBookDetails(updatedPhotoBookDetails))
    onDrawerClose()
  }

  const renderPhotoBookFeature = ({ style }: { style: PhotobookBookStyle }) => {
    if (!style) {
      return null
    }

    const getPhotoBookFeature = ({ style }: { style: PhotobookBookStyle }) => {
      switch (style) {
        case PhotobookBookStyle.CLASSIC_PHOTOBOOK:
          return (
            <TabPane tab="Classic Photo Books" key="classic-photobooks">
              <FeaturesContainer>
                {PhotobookHelper.getClassicPhotobookFeatures().map(
                  (feature) => (
                    <PhotobookDrawerFeature feature={feature} />
                  ),
                )}
              </FeaturesContainer>
            </TabPane>
          )
        case PhotobookBookStyle.PREMIUM_PHOTOBOOK:
          return (
            <TabPane tab="Premium Photo Books" key="premium-photobooks">
              <FeaturesContainer>
                {PhotobookHelper.getPremiumPhotobookFeatures().map(
                  (feature) => (
                    <PhotobookDrawerFeature feature={feature} />
                  ),
                )}
              </FeaturesContainer>
            </TabPane>
          )

        default:
          return null
      }
    }

    return (
      <StyledProductFeaturesContainer>
        <StyledProductFeaturesHeader ref={photobookFeaturesRef}>
          Product Features
        </StyledProductFeaturesHeader>

        {activeTabKey && (
          <Tabs activeKey={activeTabKey}>{getPhotoBookFeature({ style })}</Tabs>
        )}
      </StyledProductFeaturesContainer>
    )
  }

  const layout = CardProductFrameHelper.getCoverPageLayoutById(coverLayoutId!)

  const photoBookUnitPrice = PhotobookHelper.calculatePhotobookPrice({
    noOfPages,
    coverType,
    pageSize: pageSize,
    country,
  })

  const photoBookTotalPrice = photoBookUnitPrice * copyAmount

  const contentChildWidth =
    drawerWidth < CHECKOUT_BREAKPOINT.MD
      ? drawerWidth - 24 * 2
      : (drawerWidth - 40 * 2 - CONTENT_VERTICAL_WIDTH) / 2

  const PHOTOBOOK_THUMBNAILS: Array<ISlidedPhotoGalleryAsset> = [
    {
      type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
      isPhotobookPreview: true,
      component: hasFaceDetected ? (
        <PhotobookCoverPagePreview
          layout={layout}
          coverType={coverType as EulogisePhotobookCoverType}
          editorScaledFactor={
            pageSize === CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE ||
            pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE
              ? 0.4
              : 0.5
          }
          primaryImage={displayImage}
          pageSize={pageSize as CardProductPageSize}
        />
      ) : null,
    },
  ]

  const combinedPhotoBookThumbnails = [
    ...PHOTOBOOK_THUMBNAILS,
    ...photoBookDrawerStaticSquarePhotos,
  ]

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(getDrawerWidth())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderShippingOptionsDetails = () => {
    const validShippingMethod =
      CheckoutHelper.getPhotoBookShippingMethodByPageSize({
        photoBookSize: pageSize,
      })

    if (validShippingMethod === 'Unknown') {
      return null
    }

    const validShippingMethodObj =
      EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS?.[
        KEEPSAKE_PRODUCTS?.PHOTO_BOOKS
      ]?.find((method) => method.value === validShippingMethod)

    const validShippingMethodDisplayedName =
      validShippingMethodObj?.displayName ?? ''
    const validShippingTransitTimeText =
      validShippingMethodObj?.transitTimeText ?? ''

    return (
      <StyledShippingOptionsDetailsContainer>
        <StyledShippingOptionHeader>
          Shipping options
        </StyledShippingOptionHeader>
        <StyledShippingOptions>{`${validShippingMethodDisplayedName} ${validShippingTransitTimeText}`}</StyledShippingOptions>
        <StyledShippingDescriptionText>
          Choose your shipping option at checkout
        </StyledShippingDescriptionText>
      </StyledShippingOptionsDetailsContainer>
    )
  }

  const renderReviewDesignDrawer = ({
    open,
    product,
    country,
  }: {
    open: boolean
    product: EulogiseCardProducts | null
    country: EulogiseCountry
  }) => {
    return (
      <ReviewDesignDrawer open={open} product={product} country={country} />
    )
  }

  return (
    <StyledDrawer
      placement={'left'}
      open={open}
      closable={false}
      key={`Photobook Checkout Drawer`}
      maskClosable={false}
      width={drawerWidth}
    >
      <StyledHeaderContainer>
        <StyledHeaderText>Photo Book Options</StyledHeaderText>
        <StyledCancelButtonContainer>
          <StyledCancelButton
            buttonType={ButtonType.TRANSPARENT}
            buttonSize={ButtonSize.SM}
            onClick={() => onHandleCancel()}
            disabled={false}
            noMarginLeft
            noMarginRight
          >
            Cancel
          </StyledCancelButton>
        </StyledCancelButtonContainer>
      </StyledHeaderContainer>

      <StyledContentParentContainer>
        <StyledContentContainer $width={contentChildWidth}>
          <SlidedPhotoGallery
            thumbnails={combinedPhotoBookThumbnails || []}
            displayedThumbnailIndex={displayedThumbnailIndex}
            setDisplayedThumbnailIndex={setDisplayedThumbnailIndex}
            displayedThumbnailHeight={435}
          />
        </StyledContentContainer>

        <StyledVerticalSeparator />

        <StyledContentContainer $width={contentChildWidth}>
          <StyledProductDetailsContainer>
            <StyledProductDescription>
              Premium Photo Books are archival quality which means they're
              designed to last several lifetimes. Each one is handcrafted from
              the finest materials using age-old bookmaker’s techniques and the
              latest in print technologies.
            </StyledProductDescription>
          </StyledProductDetailsContainer>

          <StyledProductDetailsContainer>
            <StyledTitleLabel>Book style</StyledTitleLabel>
            <StyleText>{displayedBookStyle}</StyleText>
            <StyleText>
              {renderWithStyledNumbers(displayedPageSizeText)}
            </StyleText>
            <StyleText>{displayedCoverText}</StyleText>
          </StyledProductDetailsContainer>

          {/* <StyledProductDetailsContainer>
            <StyledProductDescription>
              Add a presentational box
            </StyledProductDescription>
            <StyledAddPresentationalBoxSwitchContainer>
              <StyledAddPresentationalBoxSwitch
                onChange={onHandleAddPresentationalBox}
              />
              <StyleText>+$50</StyleText>
            </StyledAddPresentationalBoxSwitchContainer>
          </StyledProductDetailsContainer> */}

          <StyledProductDetailsContainer>
            <StyledCopiesSelectContainer>
              <StyledTitle>How many copies?</StyledTitle>
              <StyledQuantityContainer>
                <StyledQuanityInput
                  value={copyAmount + ''}
                  prefix={selectBefore}
                  suffix={selectAfter}
                  $shouldPlayHighlightAnimation={
                    !copyAmount || copyAmount === 0
                  }
                  readOnly
                  inputMode="none"
                />
                <StyledPriceContainer>
                  <StyledPriceText>${photoBookUnitPrice}</StyledPriceText>
                  <StyledPriceSuffixText>
                    {CheckoutHelper.getCurrencyISOCodeByCountry({ country })}
                    /book
                  </StyledPriceSuffixText>
                </StyledPriceContainer>
              </StyledQuantityContainer>
            </StyledCopiesSelectContainer>
          </StyledProductDetailsContainer>

          <StyledSettingsContainer>
            <StyledPriceSection>
              <Row justify="space-between" align="middle">
                <Col>
                  <b>Price:</b>
                </Col>
                <Col>
                  <b>
                    ${photoBookTotalPrice.toFixed(2)}{' '}
                    {CheckoutHelper.getCurrencyISOCodeByCountry({ country })}
                  </b>
                </Col>
              </Row>
              <StyledPriceDescription style={{ padding: '8px 0' }}>
                Shipping calculated at checkout
              </StyledPriceDescription>

              <StyledContinueButton
                buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
                buttonSize={ButtonSize.XMD}
                onClick={() => {
                  dispatch(
                    updateIsReviewDesignDrawerOpened({
                      isReviewDesignDrawerOpened: true,
                      reviewDesignDrawerActiveProduct:
                        EulogiseCardProducts.PHOTOBOOK,
                    }),
                  )
                }}
                disabled={copyAmount <= 0}
                noMarginLeft
                noMarginRight
                icon={<StyledContinueIcon />}
              >
                Review Design
              </StyledContinueButton>
            </StyledPriceSection>

            <StyledProductDetailsContainer>
              {renderShippingOptionsDetails()}
            </StyledProductDetailsContainer>
          </StyledSettingsContainer>
        </StyledContentContainer>
      </StyledContentParentContainer>

      {renderPhotoBookFeature({
        style: bookStyle,
      })}

      {renderReviewDesignDrawer({
        open: isReviewDesignDrawerOpened,
        product: reviewDesignDrawerActiveProduct,
        country,
      })}
    </StyledDrawer>
  )
}

export default PhotobookCheckoutDrawer
