import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { CHECKOUT_BREAKPOINT, COLOR, STYLE } from '@eulogise/client-core'
import {
  EulogiseCountry,
  ICheckoutsState,
  KEEPSAKE_PRODUCTS,
  EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS,
  LeatherVideoTributeMaterialColor,
  ILeatherVideoTributeBookMetaData,
  LeatherVideoTributeMaterial,
  EulogiseLeatherVideoTributeBookOptions,
  IAddressDetails,
  ADDRESS_INPUT_MODE,
  IKeepsakesDetails,
  ILeatherVideoTributeBookData,
} from '@eulogise/core'

import { PlusIcon, MinsIcon } from '@eulogise/client-components'

import { Drawer, Select, Input, Row, Col } from 'antd'

import {
  Button,
  ButtonSize,
  ButtonType,
  PurchaseIcon,
} from '@eulogise/client-components'
import { CheckoutHelper } from '@eulogise/helpers'
import { useCheckoutsState, useEulogiseDispatch } from '../../store/hooks'
import {
  updateKeepsakesShippingAddressDetails,
  updateLeatherVideoTributeBookDetails,
  updateLeatherVideoTributeBookOrderSelection,
} from '../../store/CheckoutsState/action'

import SlidedPhotoGallery, {
  ISlidedPhotoGalleryAssetPhoto,
  ISlidedPhotoGalleryAssetType,
} from './SlidedPhotoGallery'

const CONTENT_VERTICAL_WIDTH = 40
const VIDEO_FEATURE_THUMBNAIL_WIDTH = 284
const VIDEO_FEATURE_THUMBNAIL_HEIGHT = 190
const LIVE_ASSET_WIDTH = 430
const MOBILE_DRAWER_WIDTH = LIVE_ASSET_WIDTH + 48
const ENABLE_ORDER_FOUR_BOOKS_FREE_STANDING_SHIPPING = false

const VIDEO_BOOK_ASSET_THUMBNAILS: Record<
  LeatherVideoTributeMaterialColor,
  Array<ISlidedPhotoGalleryAssetPhoto>
> = {
  [LeatherVideoTributeMaterialColor.BLACK]: [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/black/video-books-black-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/black/video-books-black-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/black/video-books-black-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ],
  [LeatherVideoTributeMaterialColor.WHITE]: [
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/white/video-books-white-1.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/white/video-books-white-2.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
    {
      src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/product-photos/video-books/white/video-books-white-3.avif`,
      type: ISlidedPhotoGalleryAssetType.PHOTO,
    },
  ],
}

const VIDEO_BOOK_FEATURES = [
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/1.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'What is a Video Book?',
    description:
      'A Video Book is a beautiful leather-bound keepsake with a built-in screen that plays your loved one’s tribute video instantly, no need for DVDs, thumb drives, or fiddling with computers. Simply open the cover, and the video begins to play.',
  },
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/2.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'Inbuilt screen and speaker',
    description:
      'The 7-inch HD screen brings your tribute video to life in vivid colour, making every photo and moment feel true to memory. A discreet built-in speaker with simple push-button controls ensures the sound is clear, warm, and effortless to use.',
  },
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/3.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'Long-lasting battery',
    description:
      'Each charge provides up to 4 hours of video playback and 30 hours of standby time, so your Video Book is always ready when you are.',
  },
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/4.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'USB charger included',
    description:
      'Comes with an included USB-C charging cable for quick, simple recharging whenever needed.',
  },
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/5.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'Elegant design',
    description:
      'Available in black or white leather with detailed stitching, each Video Book is crafted to feel as special as the memories inside. Designed to look at home on a coffee table, bookshelf, or bedside, it’s a keepsake worthy of display.',
  },
  {
    src: `https://${process.env.GATSBY_AWS_S3_BUCKET}/assets/checkouts/video-book-features/6.png`,
    type: ISlidedPhotoGalleryAssetType.PHOTO,
    title: 'Instant playback',
    description:
      'Just open the cover and your video begins to play. Easy push-button controls mean no USBs, TVs, or laptops are needed, everything is built in.',
  },
]

const EULOGISE_LEATHER_VIDEO_TRIBUTE_BOOK_COLOUR_OPTION: Array<{
  label: LeatherVideoTributeMaterialColor
  value: LeatherVideoTributeMaterialColor
}> = [
  {
    label: LeatherVideoTributeMaterialColor.WHITE,
    value: LeatherVideoTributeMaterialColor.WHITE,
  },
  {
    label: LeatherVideoTributeMaterialColor.BLACK,
    value: LeatherVideoTributeMaterialColor.BLACK,
  },
]

interface VideoBookDrawerProps {
  open: boolean
  country: EulogiseCountry
  onDrawerClose: () => void
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

const StyledVerticalSeperator = styled.div`
  width: ${CONTENT_VERTICAL_WIDTH}px;
  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    display: none;
  }
`

const StyledContentContainer = styled.div<{ $width: number }>`
  ${({ $width }) => $width && `width: ${$width}px;`}
  max-width: 100%;
  min-width: 0; // ensure slider column can shrink inside flex layout
`

const StyledProductDetailsContainer = styled.div``

const StyledProductDescription = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  padding: 8px 0;
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

const StyledColorContainer = styled.div`
  width: 100%;
`

const StyledQuantityContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 32px;
  gap: 12px;
`

const StyledPaperTypeSelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  width: 100%;
`

const StyledPaperCopiesSelectContainer = styled.div`
  padding-top: 20px;
`

const StyledContinueButtonContainer = styled.div`
  margin: 0;
  padding: 0;
  flex: 1;
  max-height: 32px;
  display: flex;
  align-items: center;
`

const StyledContinueButton = styled(Button)`
  width: 100%;
`

const StyledOrderDiscountContainer = styled.div`
  display: flex;
  padding: 6px 24px;
  margin-top: 24px;
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
  text-align: center;
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

const StyledQuanityInput = styled(Input)<{
  $shouldPlayHighlightAnimation: boolean
}>`
  width: 130px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  max-height: 32px;
  .ant-input-affix-wrapper {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    max-height: 32px;
  }
  .ant-input {
    text-align: center;
    border: none;
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

const StyledVideoFeaturesContainer = styled.div`
  padding: 40px 0;
`

const StyledVideoBookFeatureText = styled.div`
  ${STYLE.HEADING_SMALL};
  padding-bottom: 24px;
`

const StyledVideoBookFeatureContentContainer = styled(Row)`
  width: 100%;
`

const StyledVideoFeatureCard = styled.img`
  width: 100%;
  border-radius: 12px;

  width: inherit;
  object-fit: cover;

  @media (min-width: ${CHECKOUT_BREAKPOINT.MD}px) {
    width: ${VIDEO_FEATURE_THUMBNAIL_WIDTH}px;
    height: ${VIDEO_FEATURE_THUMBNAIL_HEIGHT}px;
  }
`

const StyledVideoFeatureTitle = styled.div`
  padding: 8px 0;
  width: 100%;
  ${STYLE.TEXT_SMALL};
  text-align: left;
`

const StyledVideoFeatureDescription = styled.div`
  ${STYLE.TEXT_EXTRA_SMALL};
  color: ${COLOR.DOVE_GREY};
  padding-bottom: 16px;
`

const StyledVideoFeatureContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;

  @media (max-width: ${CHECKOUT_BREAKPOINT.MD - 1}px) {
    width: 100%;
  }
`

const StyledViewFeatureBookText = styled.div`
  cursor: pointer;
  text-decoration: underline;
  ${STYLE.TEXT_EXTRA_SMALL};
  width: 86px;
`

const VideoBookDrawer = ({
  open,
  country,
  onDrawerClose,
}: VideoBookDrawerProps): JSX.Element | null => {
  if (!country) {
    return null
  }

  const {
    keepsakesDetails,
    printingDetails: { printingAddressDetails },
  }: ICheckoutsState = useCheckoutsState()
  const {
    leatherVideoTributeBook: {
      metaData: leatherVideoTributeBookMetaData,
      option: leatherVideoTributeBookOption,
      shippingAddressDetails: leatherVideoTribtueBookShippingAddressDetails,
    },
  } = keepsakesDetails

  const color = leatherVideoTributeBookMetaData.color
  const copyAmount = leatherVideoTributeBookMetaData.copyAmount
  const material = leatherVideoTributeBookMetaData.material

  const isPrintingAddressAvailable =
    printingAddressDetails.isValidAddress &&
    printingAddressDetails.formattedAddress

  const videoBookFeaturesRef = useRef<HTMLDivElement | null>(null)

  const getDrawerWidth = () => {
    if (typeof window === 'undefined') {
      return MOBILE_DRAWER_WIDTH
    }
    if (window.innerWidth < CHECKOUT_BREAKPOINT.MD) {
      return MOBILE_DRAWER_WIDTH
    }
    return 980
  }

  const dispatch = useEulogiseDispatch()

  const [displayedThumbnailIndex, setDisplayedThumbnailIndex] = useState(0)

  const isLeatherVideoTributeBookAdded =
    leatherVideoTributeBookOption ===
    EulogiseLeatherVideoTributeBookOptions.ORDER_LEATHER_VIDEO_TRIBUTE_BOOK

  const [drawerWidth, setDrawerWidth] = useState(getDrawerWidth())

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(getDrawerWidth())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (
      isPrintingAddressAvailable &&
      isLeatherVideoTributeBookAdded &&
      copyAmount >= 1
    ) {
      onOverwriteVideoBookAddressDetails()
    }
  }, [isPrintingAddressAvailable, isLeatherVideoTributeBookAdded, copyAmount])

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

  const renderAddOrderText = ({
    isLeatherVideoTributeBookAdded,
    color,
    material,
    copyAmount,
  }: {
    isLeatherVideoTributeBookAdded: boolean
    color: LeatherVideoTributeMaterialColor | null
    material: LeatherVideoTributeMaterial | null
    copyAmount: number
  }) => {
    if (!copyAmount || !material || !color || !leatherVideoTributeBookOption) {
      return 'Add to order'
    }
    const videoBooksCost =
      CheckoutHelper.getLeatherVideoTributeBookFeeByCountry({
        isLeatherVideoTributeBookAdded,
        country,
      }) * copyAmount
    return `Add to order - $${videoBooksCost}`
  }

  const onOverwriteVideoBookAddressDetails = () => {
    if (!isPrintingAddressAvailable) {
      return
    }

    const updatedKeepsakesShippingAddressDetails: IAddressDetails = {
      ...leatherVideoTribtueBookShippingAddressDetails,
      formattedAddress: printingAddressDetails.formattedAddress,
      isValidAddress: printingAddressDetails.isValidAddress,
      portalAddressMetaData: printingAddressDetails.portalAddressMetaData,
      addressInputMode: printingAddressDetails.addressInputMode,
    }
    dispatch(
      updateKeepsakesShippingAddressDetails(
        updatedKeepsakesShippingAddressDetails,
      ),
    )
  }

  const onHandleColorSelect = ({
    newLeatherColour,
  }: {
    newLeatherColour: LeatherVideoTributeMaterialColor
  }) => {
    const updatedLeatherVideoTributeBookDetails: ILeatherVideoTributeBookMetaData =
      {
        ...leatherVideoTributeBookMetaData,
        color: newLeatherColour,
      }
    dispatch(
      updateLeatherVideoTributeBookDetails(
        updatedLeatherVideoTributeBookDetails,
      ),
    )
  }

  const onHandleConfirm = () => {
    onDrawerClose()
  }

  const onRevertVideoBookOption = () => {
    dispatch(
      updateLeatherVideoTributeBookOrderSelection(
        EulogiseLeatherVideoTributeBookOptions.SKIP_LEATHER_VIDEO_TRIBUTE_BOOK,
      ),
    )
    const updatedKeepsakesShippingAddressDetails: IAddressDetails = {
      ...leatherVideoTribtueBookShippingAddressDetails,
      formattedAddress: null,
      isValidAddress: false,
      portalAddressMetaData: null,
      addressInputMode: ADDRESS_INPUT_MODE.NO_INPUT,
    }
    dispatch(
      updateKeepsakesShippingAddressDetails(
        updatedKeepsakesShippingAddressDetails,
      ),
    )
    onDrawerClose()
  }

  // const onCancel = () => {
  //   const updatedLeatherVideoTributeBookDetails: ILeatherVideoTributeBookMetaData =
  //     {
  //       ...leatherVideoTributeBookMetaData,
  //       ...initialProductState,
  //     }
  //   dispatch(
  //     updateLeatherVideoTributeBookDetails(
  //       updatedLeatherVideoTributeBookDetails,
  //     ),
  //   )
  //   onDrawerClose()
  // }

  const onHandleQuantityChange = ({
    newCopiesAmount,
  }: {
    newCopiesAmount: number
  }) => {
    const updatedLeatherVideoTributeBookDetails: ILeatherVideoTributeBookMetaData =
      {
        ...leatherVideoTributeBookMetaData,
        copyAmount: newCopiesAmount,
      }
    dispatch(
      updateLeatherVideoTributeBookDetails(
        updatedLeatherVideoTributeBookDetails,
      ),
    )
  }

  const renderVideoBookDetails = () => {
    return (
      <StyledProductDetailsContainer>
        <StyledProductDescription>
          Premium, rechargeable video books with a 7" HD screen, inbuilt speaker
          and 4 hours of continual playback. Comes with a USB charging cable
          included.
        </StyledProductDescription>
      </StyledProductDetailsContainer>
    )
  }

  const renderVideoBookDetailSelect = () => {
    return (
      <StyledPaperDetailsUpdateContainer>
        <StyledColorContainer>
          <StyledTitle>Select color</StyledTitle>

          <StyledPaperTypeSelectRow>
            <StyledPaperAttributeSelect
              defaultValue={color}
              placeholder={'Select Color'}
              onChange={(newLeatherColour) =>
                onHandleColorSelect({
                  newLeatherColour:
                    newLeatherColour as LeatherVideoTributeMaterialColor,
                })
              }
              options={EULOGISE_LEATHER_VIDEO_TRIBUTE_BOOK_COLOUR_OPTION}
              $shouldPlayHighlightAnimation={!color}
            />
            <StyledViewFeatureBookText
              onClick={() =>
                videoBookFeaturesRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            >
              View features
            </StyledViewFeatureBookText>
          </StyledPaperTypeSelectRow>
        </StyledColorContainer>

        <StyledPaperCopiesSelectContainer>
          <StyledTitle>Quantity</StyledTitle>
          <StyledQuantityContainer>
            <StyledQuanityInput
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 0
                onHandleQuantityChange({ newCopiesAmount: newQuantity })
              }}
              value={copyAmount + ''}
              defaultValue={1}
              prefix={selectBefore}
              suffix={selectAfter}
              $shouldPlayHighlightAnimation={!copyAmount || copyAmount === 0}
            />
            <StyledContinueButtonContainer>
              <StyledContinueButton
                buttonType={ButtonType.PRIMARY}
                buttonSize={ButtonSize.SM}
                onClick={() => onHandleConfirm()}
                disabled={!copyAmount || !color}
                noMarginLeft
                noMarginRight
              >
                {renderAddOrderText({
                  isLeatherVideoTributeBookAdded,
                  color,
                  copyAmount,
                  material,
                })}
              </StyledContinueButton>
            </StyledContinueButtonContainer>
          </StyledQuantityContainer>
        </StyledPaperCopiesSelectContainer>
      </StyledPaperDetailsUpdateContainer>
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
        {EULOGIZE_KEEPSAKES_SHIPPING_METHODS_DETAILS?.[
          KEEPSAKE_PRODUCTS?.VIDEO_BOOKS
        ]
          .filter((shippingMethod) => shippingMethod.isShipping)
          .map((shippingMethod) => {
            return (
              <StyledShippingOptions
                key={shippingMethod.displayName}
              >{`${shippingMethod.displayName} ${shippingMethod.transitTimeText}`}</StyledShippingOptions>
            )
          })}
        <StyledShippingDescriptionText>
          Choose your shipping option at checkout
        </StyledShippingDescriptionText>
      </StyledShippingOptionsDetailsContainer>
    )
  }

  const renderVideoBookFeatures = () => {
    return (
      <StyledVideoFeaturesContainer ref={videoBookFeaturesRef}>
        <StyledVideoBookFeatureText>
          Video Book Features
        </StyledVideoBookFeatureText>
        <StyledVideoBookFeatureContentContainer gutter={[24, 24]}>
          {VIDEO_BOOK_FEATURES.map((videoBookFeature) => {
            const { title, description, src } = videoBookFeature
            return (
              <StyledVideoFeatureContainer
                xs={24}
                sm={24}
                md={24}
                lg={8}
                key={title}
              >
                <StyledVideoFeatureCard src={src} />
                <StyledVideoFeatureTitle>{title}</StyledVideoFeatureTitle>
                <StyledVideoFeatureDescription>
                  {description}
                </StyledVideoFeatureDescription>
              </StyledVideoFeatureContainer>
            )
          })}
        </StyledVideoBookFeatureContentContainer>
      </StyledVideoFeaturesContainer>
    )
  }

  const contentChildWidth =
    drawerWidth < CHECKOUT_BREAKPOINT.MD
      ? drawerWidth - 24 * 2
      : (drawerWidth - 40 * 2 - CONTENT_VERTICAL_WIDTH) / 2
  const videoBooksThumbnailAssetsByColour = color
    ? VIDEO_BOOK_ASSET_THUMBNAILS?.[color]
    : []

  return (
    <StyledDrawer
      placement={'left'}
      open={open}
      closable={false}
      key={`Printing Options Drawer`}
      maskClosable={false}
      width={drawerWidth}
    >
      <StyledHeaderContainer>
        <StyledHeaderText>Video Book Options</StyledHeaderText>
        <StyledCancelButtonContainer>
          <StyledCancelButton
            buttonType={ButtonType.TRANSPARENT}
            buttonSize={ButtonSize.SM}
            onClick={() => onRevertVideoBookOption()}
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
            thumbnails={videoBooksThumbnailAssetsByColour}
            displayedThumbnailIndex={displayedThumbnailIndex}
            setDisplayedThumbnailIndex={setDisplayedThumbnailIndex}
            displayedThumbnailHeight={435}
          />
        </StyledContentContainer>
        <StyledVerticalSeperator />
        <StyledContentContainer $width={contentChildWidth}>
          {renderVideoBookDetails()}
          {renderVideoBookDetailSelect()}
          {ENABLE_ORDER_FOUR_BOOKS_FREE_STANDING_SHIPPING &&
            renderFreeShippingDiscountBox()}
          {renderShippingOptionsDetails()}
        </StyledContentContainer>
      </StyledContentParentContainer>

      {renderVideoBookFeatures()}
    </StyledDrawer>
  )
}

export default VideoBookDrawer
