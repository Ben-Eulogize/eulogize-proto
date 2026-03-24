import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Col, Drawer, Row, Select } from 'antd'
import {
  Button,
  ButtonSize,
  ButtonType,
  OutlinedRightArrowIcon,
  TabPane,
  Tabs,
} from '@eulogise/client-components'
import { PhotobookCoverTypeSelector } from '../../../../../eulogise-client-components/src/PhotobookCoverTypeSelector/PhotobookCoverTypeSelector'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  CardProductPageSize,
  CreatePhotobookMethod,
  DrawerId,
  EulogiseCountry,
  EulogisePhotobookCoverType,
  EulogiseProduct,
  IImageAssetContent,
  PhotobookBookStyle,
} from '@eulogise/core'
import {
  CardProductFrameHelper,
  CaseHelper,
  NavigationHelper,
  SlideshowHelper,
} from '@eulogise/helpers'
import { PhotobookHelper } from '@eulogise/helpers'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
  useIsOpenDrawer,
  usePhotobookState,
  useSlideshowState,
} from '../../store/hooks'
import { useCustomisedImageOrder } from '../../hooks/useCustomisedImageOrder'
import { closeDrawerAction } from '../../store/DrawerState/actions'
import { PhotobookCoverPagePreview } from '@eulogise/client-components/dist/PhotobookCoverPagePreview'
import SlidedPhotoGallery, {
  ISlidedPhotoGalleryAsset,
  ISlidedPhotoGalleryAssetType,
} from './SlidedPhotoGallery'
import {
  createPhotobook,
  updatePhotobookCoverType,
} from '../../store/PhotobookState/actions'
import { PhotobookDrawerFeature } from './PhotobookDrawerFeature'
import { detectAssetFaces } from '../../store/AssetState/actions'
import { PHOTOBOOK_SIZE_OPTIONS } from '@eulogise/helpers/dist/cardProduct.constants'
import { HowToAddPhotosDrawer } from '../Drawer/HowToAddPhotosDrawer'
import {
  DrawerContentContainer,
  DrawerContentItemContainer,
} from '../Drawer/DrawerContentContainer'
import { DrawerHeader } from '../Drawer/DrawerHeader'
import { InfoPanel } from '../Panel/InfoPanel'

interface PhotobookCheckoutDrawerProps {
  country: EulogiseCountry
}

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 40px;
  }
`

const StyledProductDetailsContainer = styled.div``

const StyledProductDescription = styled.div``

const StyledSettingsContainer = styled.div``

const StyledFieldRow = styled.div`
  padding-top: 0.8rem;
`

const StyledTitleLabel = styled.div`
  font-weight: ${STYLE.FONT_WEIGHT_BOLD};
`

const StyledFieldLabel = styled.div`
  padding-bottom: 0.25rem;
`

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border-radius: 6px !important;
  }
`

const StyledPriceSection = styled(InfoPanel)`
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

const StyledOutlinedRightArrowIcon = styled(OutlinedRightArrowIcon)`
  width: 1.4rem;
  height: 1.4rem;
`

const PhotobookBookStyleOptions: Array<{
  label: string
  value: PhotobookBookStyle
}> = [
  {
    label: 'Classic Photo Book',
    value: PhotobookBookStyle.CLASSIC_PHOTOBOOK,
  },
  {
    label: 'Premium Photo Book',
    value: PhotobookBookStyle.PREMIUM_PHOTOBOOK,
  },
]

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledViewFeatureBookText = styled.div`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.5rem;
  ${STYLE.TEXT_EXTRA_SMALL};
`

enum ActiveTab {
  CLASSIC_PHOTOBOOKS = 'classic-photobooks',
  PREMIUM_PHOTOBOOKS = 'premium-photobooks',
  PREMIUM_PHOTO_ALBUMS = 'premium-photo-albums',
}

const PhotobookDrawer = ({
  country,
}: PhotobookCheckoutDrawerProps): JSX.Element | null => {
  if (!country) {
    return null
  }

  const dispatch = useEulogiseDispatch()
  const [hasFaceDetected, setHasFaceDetected] = useState<boolean>(false)
  const isOpenDrawer: boolean = useIsOpenDrawer(DrawerId.PHOTOBOOK_DRAWER)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [displayedThumbnailIndex, setDisplayedThumbnailIndex] = useState(0)
  const { images } = useAssetState()
  const { activeItem: activeCase } = useCaseState()
  const { activeItem: activePhotobook } = usePhotobookState()
  const { orderedImages } = useCustomisedImageOrder()
  const { activeItem: slideshowData } = useSlideshowState()

  const primaryImage = CaseHelper.getPrimaryImage({ activeCase: activeCase! })
  const displayImage: IImageAssetContent =
    primaryImage ?? orderedImages?.[0]?.content

  const noOfImages = (images ?? []).length
  const hasPhotos = !!(images && noOfImages > 0)

  const [isShowAddPhotosModal, setIsShowAddPhotosModal] =
    useState<boolean>(false)
  const [drawerWidth, setDrawerWidth] = useState(980)
  const [progress, setProgress] = useState<number>(0)
  const photobookFeaturesRef = useRef<HTMLVideoElement | null>(null)

  const PhotobookPages = PhotobookHelper.getPhotobookPageOptions()
  const [activeTabKey, setActiveTabKey] = useState<string>(
    ActiveTab.CLASSIC_PHOTOBOOKS,
  )

  const existingPageSize = activePhotobook?.content?.pageSize
  const defaultBookStyle: PhotobookBookStyle = existingPageSize
    ? PhotobookHelper.getBookStyleByPageSize(existingPageSize)
    : PhotobookBookStyleOptions[1].value
  const defaultPageSize = existingPageSize ?? PHOTOBOOK_SIZE_OPTIONS[2].value
  const defaultCoverType = activePhotobook
    ? PhotobookHelper.getCoverType(activePhotobook)
    : PhotobookHelper.getPhotobookCoverTypeOptions({
        pageSize: defaultPageSize,
      })[0].value

  /*
  const existingPages = activePhotobook?.content?.pages
  const defaultNoOfPages = existingPages
    ? existingPages.length - 2
    : PhotobookHelper.getRecommendedPhotobookPages({
        noOfPhotos: noOfImages,
      }).recommendedPages
*/
  const defaultNoOfPages = PhotobookHelper.getRecommendedPhotobookPages({
    noOfPhotos: noOfImages,
  }).recommendedPages
  const [imageLoadingPercent, setimageLoadingPercent] = useState<number>(0)

  const defaultCoverLayoutId = activePhotobook
    ? PhotobookHelper.getCoverPageLayoutId(activePhotobook)
    : PhotobookHelper.getPhotobookCoverLayoutOptions(defaultPageSize)[0].value
  const [fields, setFields] = useState({
    bookStyle: defaultBookStyle,
    pageSize: defaultPageSize,
    noOfPages: defaultNoOfPages,
    coverType: defaultCoverType,
    coverLayoutId: defaultCoverLayoutId,
    coverColor: null as string | null,
  })

  const hasPhotosInTimeline = slideshowData
    ? SlideshowHelper.hasSlideshowImageAssets(slideshowData)
    : false

  const region = CaseHelper.getRegionByCountry({ country })

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(980)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!displayImage) {
      setimageLoadingPercent(100)
      setHasFaceDetected(true)
      return
    }
    if (displayImage.faceDetection) {
      setimageLoadingPercent(100)
      setHasFaceDetected(true)
    } else {
      const asset = images?.find(
        (i) => i.content.filestackHandle === displayImage.filestackHandle,
      )
      setimageLoadingPercent(50)
      if (asset) {
        // detect face
        dispatch(
          detectAssetFaces({
            assetId: asset.id,
            onSuccess: () => {
              setimageLoadingPercent(100)
              setHasFaceDetected(true)
            },
          }),
        )
      } else {
        setimageLoadingPercent(100)
        setHasFaceDetected(true)
      }
    }
  }, [displayImage])

  const createPhotobookHandler = (method: CreatePhotobookMethod) => {
    setIsCreating(true)
    dispatch(
      createPhotobook({
        // orientation: fields.orientation,
        orientation: 'LANDSCAPE',
        noOfPages: fields.noOfPages,
        coverType: fields.coverType,
        coverLayoutId: fields.coverLayoutId!,
        method,
        onProgress: (p) => {
          setProgress(p)
        },
        onSuccess: (cardProductId) => {
          setIsShowAddPhotosModal(false)
          NavigationHelper.navigateToProduct({
            product: EulogiseProduct.PHOTOBOOK,
            id: cardProductId,
          })
          onHandleConfirm()
        },
        pageSize: fields.pageSize as CardProductPageSize,
      }),
    )
  }

  const onHandleCancel = () => {
    dispatch(closeDrawerAction())
  }

  const onHandleConfirm = () => {
    dispatch(closeDrawerAction())
  }

  const layout = CardProductFrameHelper.getCoverPageLayoutById(
    fields.coverLayoutId!,
  )

  const totalPrice = PhotobookHelper.calculatePhotobookPrice({
    noOfPages: fields.noOfPages,
    coverType: fields.coverType,
    country,
    pageSize: fields.pageSize,
  })

  const CLASSIC_PHOTOBOOK_THUMBNAILS: Array<ISlidedPhotoGalleryAsset> = [
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'classic/1_classic-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'classic/2_classic-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'classic/3_classic-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
  ]

  const PREMIUM_PHOTOBOOK_THUMBNAILS: Array<ISlidedPhotoGalleryAsset> = [
    /*
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/1_premium-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/2_premium-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/3_premium-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/4_premium-photobook_Eulogize_Memorials_Funeral.avif',
      ),
    },
*/
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/photo-books-1.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/photo-books-3.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/rectangle/photo-books-5.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/photo-books-6.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/square/photo-books-8.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/extras/photo-books-2.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/extras/photo-books-4.avif',
      ),
    },
    {
      type: ISlidedPhotoGalleryAssetType.PHOTO,
      src: PhotobookHelper.getPhotobookPreviewThumbnailUrl(
        'premium/extras/photo-books-7.avif',
      ),
    },
  ]

  const isShowLoadingBar = !hasFaceDetected
  const PHOTOBOOK_THUMBNAILS: Array<ISlidedPhotoGalleryAsset> = [
    {
      type: ISlidedPhotoGalleryAssetType.REACT_COMPONENT,
      component: (
        <PhotobookCoverPagePreview
          layout={layout}
          coverType={fields.coverType as EulogisePhotobookCoverType}
          editorScaledFactor={
            fields.pageSize ===
              CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE ||
            fields.pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE
              ? 0.4
              : 0.5
          }
          primaryImage={displayImage}
          pageSize={fields.pageSize as CardProductPageSize}
        />
      ),
    },
    ...(fields.bookStyle === PhotobookBookStyle.CLASSIC_PHOTOBOOK
      ? CLASSIC_PHOTOBOOK_THUMBNAILS
      : PREMIUM_PHOTOBOOK_THUMBNAILS),
  ]
  const photobookSizeOptions = PhotobookHelper.getPhotobookSizeOptions({
    region,
    bookStyle: fields.bookStyle,
  })

  const changePageSizeHandle = (
    newPageSize: CardProductPageSize,
    otherFields: any,
  ) => {
    const currentCoverFabricType =
      fields.coverType as EulogisePhotobookCoverType
    const availableCoverFabricOptions =
      PhotobookHelper.getPhotobookCoverTypeOptions({
        pageSize: newPageSize,
      })
    const hasCoverType = availableCoverFabricOptions.find(
      (o) => o.value === currentCoverFabricType,
    )

    const availableCoverLayoutOptions =
      PhotobookHelper.getPhotobookCoverLayoutOptions(newPageSize)
    const photobookCoverLayoutLabel =
      PhotobookHelper.getPhotobookCoverLayoutLabel(fields.coverLayoutId!)

    const selectedOption = photobookCoverLayoutLabel
      ? availableCoverLayoutOptions.find(
          (o) => o.label === photobookCoverLayoutLabel,
        )
      : undefined
    const coverLayoutId = selectedOption
      ? selectedOption.value
      : availableCoverLayoutOptions[0].value
    setFields({
      ...fields,
      ...otherFields,
      pageSize: newPageSize,
      coverType: hasCoverType
        ? currentCoverFabricType
        : availableCoverFabricOptions[0].value,
      coverLayoutId,
    })
  }

  const changeBookStyleHandle = (bookStyle: PhotobookBookStyle) => {
    const availablePageSizeOptions = PhotobookHelper.getPhotobookSizeOptions({
      region,
      bookStyle,
    })

    changePageSizeHandle(availablePageSizeOptions[0].value, {
      bookStyle,
    })
    // start from the first thumbnail again
    setDisplayedThumbnailIndex(0)
    setActiveTabKey(
      bookStyle === PhotobookBookStyle.PREMIUM_PHOTOBOOK
        ? ActiveTab.PREMIUM_PHOTOBOOKS
        : ActiveTab.CLASSIC_PHOTOBOOKS,
    )
  }

  const selectedLabel = PhotobookPages.find(
    (option) => option.value === fields.noOfPages,
  )?.label

  const coverLayoutOptions = PhotobookHelper.getPhotobookCoverLayoutOptions(
    fields.pageSize as CardProductPageSize,
  )

  return (
    <StyledDrawer
      placement={'left'}
      open={isOpenDrawer}
      closable={false}
      key={`Photobook Checkout Drawer`}
      maskClosable={false}
      width={drawerWidth}
    >
      <DrawerHeader
        onCloseClick={onHandleCancel}
        title={`Photo Book Settings`}
      />
      <DrawerContentContainer>
        <DrawerContentItemContainer>
          <SlidedPhotoGallery
            loadingProgress={imageLoadingPercent}
            isShowLoadingBar={isShowLoadingBar}
            thumbnails={PHOTOBOOK_THUMBNAILS || []}
            displayedThumbnailIndex={displayedThumbnailIndex}
            setDisplayedThumbnailIndex={setDisplayedThumbnailIndex}
            displayedThumbnailHeight={435}
          />
        </DrawerContentItemContainer>

        <DrawerContentItemContainer>
          <StyledProductDetailsContainer>
            <StyledProductDescription>
              Create a family heirloom in minutes. Import photos from your
              library or your memorial video timeline, and our smart editor
              arranges them into a beautiful book or album that’s ready to order
              or simple to fine-tune. Handcrafted with archival papers and
              premium materials using modern print technology, it’s made to be
              cherished today and kept in the family for generations.
            </StyledProductDescription>
          </StyledProductDetailsContainer>

          <StyledSettingsContainer>
            <StyledFieldRow>
              <StyledTitleLabel>Book style</StyledTitleLabel>
              <StyledFieldLabel>Select your style</StyledFieldLabel>
              <Row align="middle">
                <Col flex={1}>
                  <StyledSelect
                    value={fields.bookStyle}
                    onChange={changeBookStyleHandle}
                  >
                    {PhotobookBookStyleOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </Col>
                <Col>
                  <StyledViewFeatureBookText
                    onClick={() => {
                      photobookFeaturesRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                      if (
                        fields.bookStyle ===
                        PhotobookBookStyle.CLASSIC_PHOTOBOOK
                      ) {
                        setActiveTabKey(ActiveTab.CLASSIC_PHOTOBOOKS)
                      } else if (
                        fields.bookStyle ===
                        PhotobookBookStyle.PREMIUM_PHOTOBOOK
                      ) {
                        setActiveTabKey(ActiveTab.PREMIUM_PHOTOBOOKS)
                      }
                    }}
                  >
                    Explore product features
                  </StyledViewFeatureBookText>
                </Col>
              </Row>
            </StyledFieldRow>

            <StyledFieldRow>
              <StyledTitleLabel>Size settings</StyledTitleLabel>
              <StyledFieldLabel>Select book size</StyledFieldLabel>
              <StyledSelect
                value={fields.pageSize}
                onChange={changePageSizeHandle}
              >
                {photobookSizeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </StyledSelect>
            </StyledFieldRow>

            <StyledFieldRow>
              <StyledFieldLabel>Number of pages</StyledFieldLabel>
              <StyledSelect
                value={{ value: fields.noOfPages, label: selectedLabel }}
                onChange={(value: number) => {
                  setFields({ ...fields, noOfPages: value })
                }}
              >
                {PhotobookPages.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </StyledSelect>
              <div
                style={{
                  color: COLOR.DOVE_GREY,
                  paddingTop: '.5rem',
                }}
              >
                You can change this at any time
              </div>
            </StyledFieldRow>

            <StyledFieldRow>
              <StyledTitleLabel>Cover settings</StyledTitleLabel>
              <StyledFieldLabel style={{ paddingTop: '8px' }}>
                Cover design
              </StyledFieldLabel>
              <StyledSelect
                value={fields.coverLayoutId}
                onChange={(value: string) => {
                  setFields({ ...fields, coverLayoutId: value })
                }}
              >
                {coverLayoutOptions.map((option) => (
                  <Select.Option value={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </StyledSelect>
            </StyledFieldRow>

            <StyledFieldRow>
              <StyledFieldLabel>Cover material</StyledFieldLabel>
              <PhotobookCoverTypeSelector
                value={fields.coverType as EulogisePhotobookCoverType}
                pageSize={fields.pageSize as CardProductPageSize}
                onChange={(v: string) =>
                  setFields({
                    ...fields,
                    coverType: v as EulogisePhotobookCoverType,
                  })
                }
                country={country}
              />
            </StyledFieldRow>

            <StyledPriceSection>
              <Row justify="space-between" align="middle">
                <Col>
                  <b>Price:</b>
                </Col>
                <Col>
                  <b>${totalPrice.toFixed(2)} USD per book</b> (+shipping)
                </Col>
              </Row>
              <StyledPriceDescription style={{ paddingTop: '8px' }}>
                Price determined by page count and cover choice
              </StyledPriceDescription>

              <StyledContinueButton
                buttonType={ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY}
                buttonSize={ButtonSize.XMD}
                onClick={() => {
                  // if only changing cover materials, don't need to create a new photobook
                  if (
                    activePhotobook &&
                    fields.bookStyle === defaultBookStyle &&
                    fields.noOfPages === defaultNoOfPages &&
                    fields.pageSize === defaultPageSize &&
                    fields.coverLayoutId === defaultCoverLayoutId
                  ) {
                    dispatch(
                      updatePhotobookCoverType({
                        coverType: fields.coverType,
                      }),
                    )
                    onHandleConfirm()
                  } else {
                    setIsShowAddPhotosModal(true)
                  }
                }}
                noMarginLeft
                noMarginRight
              >
                <Row justify="center">
                  <Col>
                    {activePhotobook ? `Update design` : `Start creating`}&nbsp;
                  </Col>
                  <Col>
                    <StyledOutlinedRightArrowIcon />
                  </Col>
                </Row>
              </StyledContinueButton>
            </StyledPriceSection>
          </StyledSettingsContainer>
        </DrawerContentItemContainer>
      </DrawerContentContainer>

      <StyledProductFeaturesContainer>
        <StyledProductFeaturesHeader ref={photobookFeaturesRef}>
          Product Features
        </StyledProductFeaturesHeader>

        <Tabs
          activeKey={activeTabKey}
          onChange={(tab) => {
            setActiveTabKey(tab)
          }}
        >
          <TabPane tab="Classic Photo Books" key="classic-photobooks">
            <FeaturesContainer>
              {PhotobookHelper.getClassicPhotobookFeatures().map((feature) => (
                <PhotobookDrawerFeature feature={feature} />
              ))}
            </FeaturesContainer>
          </TabPane>
          <TabPane tab="Premium Photo Books" key="premium-photobooks">
            <FeaturesContainer>
              {PhotobookHelper.getPremiumPhotobookFeatures().map((feature) => (
                <PhotobookDrawerFeature feature={feature} />
              ))}
            </FeaturesContainer>
          </TabPane>
          {/*
          <TabPane tab="Photo Albums" key="premium-photo-albums">
            <FeaturesContainer>
              {PhotobookHelper.getPhotoAlbumFeatures().map((feature) => (
                <PhotobookDrawerFeature feature={feature} />
              ))}
            </FeaturesContainer>
          </TabPane>
*/}
        </Tabs>
      </StyledProductFeaturesContainer>

      {isShowAddPhotosModal && (
        <HowToAddPhotosDrawer
          isOpen={isShowAddPhotosModal}
          hasPhotos={hasPhotos}
          hasPhotosInTimeline={hasPhotosInTimeline}
          isCreating={isCreating}
          onCancel={() => setIsShowAddPhotosModal(false)}
          onCreate={createPhotobookHandler}
          progress={progress}
        />
      )}
    </StyledDrawer>
  )
}

export default PhotobookDrawer
