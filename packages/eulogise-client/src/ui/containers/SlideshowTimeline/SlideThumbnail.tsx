import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  EditIcon,
  ClickableIcon,
  FontSizeIcon,
  SlideSettingIcon,
  Notification,
  RemovePhotoIcon,
} from '@eulogise/client-components'
import { COLOR } from '@eulogise/client-core'
import SlideThumbnailPreview from './SlideThumbnailPreview'
import {
  ENHANCE_IMAGE_ACTIVE_SVG_URL,
  ENHANCE_IMAGE_INACTIVE_SVG_URL,
  IAssetState,
  IFilestackImageEnhancePreset,
  ISlide,
  ISlideshowData,
} from '@eulogise/core'
import { SortableElement } from '@eulogise/client-components'
import { StyledPhotoLibraryThumbnail } from './styles'
import { TranformationUIHelper } from '../../helpers/TransformationUIHelper'
import {
  useAllActiveCardProducts,
  useAssetState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
} from '../../store/hooks'
import {
  EulogiseProduct,
  IAllActiveCardProducts,
  IImageAsset,
  ICaseState,
  ICaseDeceased,
  IImageSize,
  EulogiseCardProducts,
  IImageAssetContent,
  ICardProductPage,
  ICardProductRow,
  CardProductContentItemType,
  ICardProductImageRow,
  SlideType,
} from '@eulogise/core'
import {
  AssetHelper,
  ImageHelper,
  NavigationHelper,
  SlideshowHelper,
} from '@eulogise/helpers'
import { updateCaseById } from '../../store/CaseState/actions'
import { saveCardProduct } from '../../store/CardProduct/actions'
import {
  saveSlidesToSlideshowByCaseId,
  updateSlides,
} from '../../store/SlideshowState/actions'
import { saveImage } from '../../store/AssetState/actions'

interface ISlideThumbnailProps {
  caseId: string
  slideIndex: number
  imageSlideIndex: number
  slide: ISlide
  slideNumber: number
  onRemoveSlideClick: (slide: ISlide) => void
  slides: Array<ISlide>
  slideshowData: ISlideshowData
  onMouseEnter: (slideIndex: number) => void
  onMouseLeave: (slideIndex: number) => void
  isEmpty: boolean
  isStartTitleSlide?: boolean
  isEndTitleSlide?: boolean
  onEditStartTitleSlideClick: () => void
  onDisableStartTitleSlideClick: () => void
  onEditEndTitleSlideClick: () => void
  onDisableEndTitleSlideClick: () => void
  onSlideSettingsClick: () => void
  isSlideTitleEnabled: boolean
  isOpenTooltip: boolean
  scaledThumbnailWidth?: number
}

export const SLIDE_THUMBNAIL_ACTION_ICON_WIDTH = 20
export const SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT = 20

const StyledClickableIcon = styled(ClickableIcon)<{
  $padding?: string
  $isUploadingEditedImage?: boolean
}>`
  ${({ isShowPrimaryColor }: { isShowPrimaryColor?: boolean }) =>
    isShowPrimaryColor &&
    `
    color: ${COLOR.PRIMARY};
  `}
  ${({ $padding }: { $padding?: boolean }) =>
    $padding ? `padding: ${$padding};` : `padding: 0 0.4rem;`}
  ${({ $isUploadingEditedImage }: { $isUploadingEditedImage?: boolean }) =>
    $isUploadingEditedImage &&
    `
    color: ${COLOR.GREY};
    cursor: not-allowed;
  `}
`

const Toolbar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0;
`

const ToolbarLeftContainer = styled.div`
  display: flex;
`

const ToolbarRightContainer = styled.div`
  display: flex;
`

const ToolbarNumber = styled.div`
  min-width: ${SLIDE_THUMBNAIL_ACTION_ICON_WIDTH}px;
  height: ${SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT}px;
  border-radius: 10px;
  text-align: center;
  background-color: ${COLOR.PASTEL_BLUE};
  color: ${COLOR.BLACK};
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: -3px;
  padding-right: 3px;
  ${({ isDoubleDigits }: { isDoubleDigits?: boolean }) =>
    isDoubleDigits &&
    `
    padding-right: 4.8px;
  `}
`

const ToolbarTitleSlideNumber = styled.div`
  min-width: ${SLIDE_THUMBNAIL_ACTION_ICON_WIDTH}px;
  height: ${SLIDE_THUMBNAIL_ACTION_ICON_HEIGHT}px;
  border-radius: 10px;
  text-align: center;
  background-color: ${COLOR.CORE_PURPLE};
  color: white;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: -3px;
  padding-right: 3px;
`

const ToolbarActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const StyledEnhanceImageIcon = styled.img`
  cursor: pointer;
`

const SlideThumbnail: React.FunctionComponent<ISlideThumbnailProps> = ({
  caseId,
  slideIndex,
  imageSlideIndex,
  slideNumber,
  slide,
  onRemoveSlideClick,
  slideshowData,
  isEmpty,
  onMouseEnter,
  onMouseLeave,
  isStartTitleSlide,
  isEndTitleSlide,
  isSlideTitleEnabled,
  onEditStartTitleSlideClick,
  onDisableStartTitleSlideClick,
  onEditEndTitleSlideClick,
  onDisableEndTitleSlideClick,
  onSlideSettingsClick,
  isOpenTooltip,
  scaledThumbnailWidth = 0,
}) => {
  const dispatch = useEulogiseDispatch()
  const [isUpdatingEnhancementPreset, setIsUpdatingEnhancementPreset] =
    useState<boolean>(false)
  const [enhanceImageSvgUrl, setEnhanceImageSvgUrl] = useState(
    ENHANCE_IMAGE_INACTIVE_SVG_URL,
  )

  // 20px for the width of the index icon, 80px for the total width of 3 edit icons with paddings
  const widthBetweenNumberAndActions = scaledThumbnailWidth - 20 - 80

  const shouldHideThumbnailActionIcon =
    widthBetweenNumberAndActions < SLIDE_THUMBNAIL_ACTION_ICON_WIDTH

  const {
    images,
    isUploadingEditedImage,
    uploadingEditedImageIndex,
  }: IAssetState = useAssetState()

  const slideImage: IImageAsset = images?.find(
    (i: IImageAsset) =>
      i?.content?.filestackHandle === slide?.image?.filestackHandle,
  )!

  const isTitleSlide = isStartTitleSlide || isEndTitleSlide

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts: IAllActiveCardProducts =
    useAllActiveCardProducts(allAvailableCardProducts)

  const updatedCardProducts = TranformationUIHelper.getAllUpdatedCardProducts(
    allActiveCardProducts,
  )

  const needUpdateSlideshow: boolean =
    SlideshowHelper.checkIfNeedToReplaceSlideshowImagesAfterEditing(
      slideImage,
      slideshowData?.content.slides,
    )

  const { activeItem: activeCase }: ICaseState = useCaseState()

  const deceased: ICaseDeceased = activeCase?.deceased!
  const primaryImage = deceased?.primaryImage

  const needUpdatePrimaryImage: boolean =
    primaryImage?.filestackHandle === slideImage?.content?.filestackHandle

  const originPhotoIndex: number = images.findIndex(
    (i: IImageAsset) =>
      i?.content?.filestackHandle === slideImage?.content?.filestackHandle,
  )

  const shouldShowSpinInThumbnailPreview =
    isUploadingEditedImage === true &&
    uploadingEditedImageIndex === originPhotoIndex

  const isEnhanceImageEnabled =
    slideImage?.content?.preset === IFilestackImageEnhancePreset.AUTO

  useEffect(() => {
    if (isEnhanceImageEnabled) {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_ACTIVE_SVG_URL)
    } else {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_INACTIVE_SVG_URL)
    }
  }, [isEnhanceImageEnabled])

  const onEnhanceImageIconHoverAndOut = () => {
    if (enhanceImageSvgUrl === ENHANCE_IMAGE_ACTIVE_SVG_URL) {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_INACTIVE_SVG_URL)
    } else {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_ACTIVE_SVG_URL)
    }
  }

  const onUpdateEnhanceImagePreset = () => {
    if (!slideImage || !slideImage.id || !slideImage.content) {
      return
    }
    setIsUpdatingEnhancementPreset(true)
    const updatedImage = AssetHelper.toggleEnhanceImagePreset(slideImage)
    dispatch(
      saveImage({
        file: updatedImage,
        onSuccess: () => {
          // Update and save Slideshow:
          if (slideshowData) {
            const slides: Array<ISlide> = slideshowData?.content?.slides
            const originalSlide: ISlide | undefined =
              SlideshowHelper.getSlideByFilestackHandle(
                slides,
                slideImage?.content?.filestackHandle,
              )
            if (originalSlide) {
              const updatedNewSlides: Array<ISlide> =
                SlideshowHelper.updateSlideImagePreset({
                  slides,
                  originalSlide,
                  updatedImage,
                })
              dispatch(updateSlides({ slides: updatedNewSlides }))
              dispatch(
                saveSlidesToSlideshowByCaseId({
                  caseId,
                  slideshowData,
                  slides: updatedNewSlides,
                  onSuccess: () => {
                    Notification.success('Slideshow saved.')
                  },
                }),
              )
            }
          }
          if (isEnhanceImageEnabled) {
            Notification.success('Image enhancement removed.')
          } else {
            Notification.success('Image enhancement enabled.')
          }
        },
      }),
    )
    setIsUpdatingEnhancementPreset(false)
  }

  const onChangePrimaryImage = async (editedImage: IImageAsset) => {
    if (editedImage?.content) {
      const { height, width }: IImageSize =
        await ImageHelper.getImageSizeViaFilestack(
          editedImage?.content?.filestackHandle,
        )
      const updatedCaseFields = {
        primaryImage: {
          ...editedImage?.content,
          height,
          width,
        },
      }
      dispatch(
        updateCaseById({
          caseId,
          caseFields: updatedCaseFields,
          success: () => null,
        }),
      )
    }
  }

  // TODO: Refactor this function in a common place later
  const onReplaceAllProductsWithEditedImageContent = ({
    updatedCardProducts,
    editingImageContent,
    newEditedImageContent,
    needUpdateSlideshow,
  }: {
    updatedCardProducts: Array<EulogiseCardProducts>
    editingImageContent: IImageAssetContent
    newEditedImageContent: IImageAssetContent
    needUpdateSlideshow: boolean
  }) => {
    try {
      // Update card products
      updatedCardProducts.forEach((p: keyof IAllActiveCardProducts) => {
        if (allActiveCardProducts?.[p]) {
          const pages: Array<ICardProductPage> =
            allActiveCardProducts[p]?.content?.pages!
          const updatedPages: Array<ICardProductPage> = pages.map(
            (p: ICardProductPage) => {
              return {
                ...p,
                rows: p.rows.map((r: ICardProductRow) => {
                  // Note: Frame is not updated at the moment, we might do it later
                  // update single image row
                  if (
                    r.type === CardProductContentItemType.IMAGE &&
                    r?.data?.filestackHandle ===
                      editingImageContent?.filestackHandle
                  ) {
                    return {
                      ...r,
                      data: {
                        ...r.data,
                        ...newEditedImageContent,
                      },
                    }
                  }
                  // update column images
                  else if (
                    r.type === CardProductContentItemType.COLUMNS &&
                    r?.data?.items
                  ) {
                    const updatedColumnRow: Array<ICardProductImageRow> =
                      r?.data?.items?.map((item: ICardProductImageRow) => {
                        if (
                          item?.data?.filestackHandle ===
                          editingImageContent?.filestackHandle
                        ) {
                          return {
                            ...item,
                            data: {
                              ...item?.data,
                              ...newEditedImageContent,
                            },
                          }
                        }
                        return item
                      })
                    return {
                      ...r,
                      data: {
                        ...r?.data,
                        items: updatedColumnRow,
                      },
                    }
                  }
                  return r
                }),
              }
            },
          )
          dispatch(
            saveCardProduct({
              product: p,
              cardProduct: {
                ...allActiveCardProducts[p]!,
                content: {
                  ...allActiveCardProducts[p]?.content!,
                  pages: updatedPages!,
                },
                case: caseId,
              },
              onSuccess: () => null,
            }),
          )
        }
      })
      // Update slideshow
      if (needUpdateSlideshow) {
        const slides: Array<ISlide> = slideshowData?.content?.slides

        const updatedSlides: Array<ISlide> = slides.map((slide: ISlide) => {
          if (
            slide?.slideType === SlideType.IMAGE_SLIDE &&
            slide?.image?.filestackHandle ===
              editingImageContent?.filestackHandle
          ) {
            return {
              ...slide,
              image: newEditedImageContent,
            }
          }
          return slide
        })
        dispatch(
          saveSlidesToSlideshowByCaseId({
            caseId,
            slideshowData,
            slides: updatedSlides,
          }),
        )
      }
      Notification.success(`Photo Updated.`)
    } catch (error) {
      Notification.error(`Replacing old image failed`)
      console.log('`Replacing old image failed`', error)
    }
  }

  const onSaveNewCustomisedImageOrderIds = (
    newImageId: string,
    newImageInsertIndex: number,
  ) => {
    if (!newImageId || !newImageInsertIndex || newImageInsertIndex < 0) {
      return
    }
    let customisedImagesOrderIds: Array<string> =
      AssetHelper.getCustomisedImagesOrderIdsByImages(images)
    customisedImagesOrderIds[newImageInsertIndex] = newImageId

    const updatedCaseFields = {
      customisedImagesOrderIds,
    }
    dispatch(updateCaseById({ caseId, caseFields: updatedCaseFields }))
    NavigationHelper.removeUnsavedListener()
  }

  const onEditImageClick = () => {
    TranformationUIHelper.openTranformationUI({
      image: slideImage,
      caseId,
      dispatch,
      updatedCardProducts,
      needUpdateSlideshow,
      needUpdatePrimaryImage,
      onChangePrimaryImage,
      onReplaceAllProductsWithEditedImageContent,
      originPhotoIndex,
      onSaveNewCustomisedImageOrderIds,
    })
  }

  if (isEmpty) {
    return <StyledPhotoLibraryThumbnail />
  }

  return (
    <StyledPhotoLibraryThumbnail
      data-element-type="slideshow-thumbnail"
      data-element-slide-index={imageSlideIndex}
      $scaledThumbnailWidth={scaledThumbnailWidth}
    >
      <SlideThumbnailPreview
        onMouseEnter={() => onMouseEnter(slideIndex)}
        onMouseLeave={() => onMouseLeave(slideIndex)}
        slide={slide}
        isTitleSlide={isStartTitleSlide}
        isEndTitleSlide={isEndTitleSlide}
        caseId={caseId}
        slideIndex={slideIndex}
        slideshowData={slideshowData}
        isOpenTooltip={isOpenTooltip}
        scaledThumbnailWidth={scaledThumbnailWidth}
        isLoading={shouldShowSpinInThumbnailPreview}
      />
      <Toolbar>
        <ToolbarLeftContainer>
          {isTitleSlide ? (
            <ToolbarTitleSlideNumber>T</ToolbarTitleSlideNumber>
          ) : (
            <ToolbarNumber isDoubleDigits={slideNumber >= 10}>
              {isTitleSlide ? 'T' : slideNumber}
            </ToolbarNumber>
          )}
          <ToolbarActions>
            {isStartTitleSlide && (
              <>
                {!shouldHideThumbnailActionIcon && (
                  <StyledClickableIcon
                    tooltip="Edit title slide"
                    onClick={onEditStartTitleSlideClick}
                    isShowPrimaryColor={isSlideTitleEnabled}
                    $isUploadingEditedImage={isUploadingEditedImage}
                  >
                    <FontSizeIcon />
                  </StyledClickableIcon>
                )}
              </>
            )}

            {isEndTitleSlide && (
              <>
                <StyledClickableIcon
                  tooltip="Edit end slide"
                  disable={isUploadingEditedImage}
                  onClick={onEditEndTitleSlideClick}
                  isShowPrimaryColor={isSlideTitleEnabled}
                  $isUploadingEditedImage={isUploadingEditedImage}
                >
                  <FontSizeIcon />
                </StyledClickableIcon>
                {/*
              <StyledClickableIcon
                tooltip="Edit Slide"
                onClick={onSlideSettingsClick}
              >
                <SlideSettingIcon />
              </StyledClickableIcon>
*/}
              </>
            )}

            {!isTitleSlide && (
              <>
                {!shouldHideThumbnailActionIcon && (
                  <StyledClickableIcon
                    tooltip="Edit image"
                    disabled={isUploadingEditedImage}
                    onClick={() => onEditImageClick()}
                    $isUploadingEditedImage={isUploadingEditedImage}
                  >
                    <EditIcon />
                  </StyledClickableIcon>
                )}

                {!shouldHideThumbnailActionIcon && (
                  <ClickableIcon
                    tooltip={
                      isEnhanceImageEnabled
                        ? 'Remove image enhancement'
                        : 'Enhance this Image'
                    }
                    disabled={isUpdatingEnhancementPreset}
                    onClick={() => onUpdateEnhanceImagePreset()}
                  >
                    <StyledEnhanceImageIcon
                      onMouseOver={onEnhanceImageIconHoverAndOut}
                      onMouseOut={onEnhanceImageIconHoverAndOut}
                      src={enhanceImageSvgUrl}
                    />
                  </ClickableIcon>
                )}

                {!shouldHideThumbnailActionIcon && (
                  <StyledClickableIcon
                    tooltip="Edit Slide"
                    disabled={isUploadingEditedImage}
                    onClick={onSlideSettingsClick}
                    $isUploadingEditedImage={isUploadingEditedImage}
                  >
                    <SlideSettingIcon />
                  </StyledClickableIcon>
                )}
              </>
            )}
          </ToolbarActions>
        </ToolbarLeftContainer>

        <ToolbarRightContainer>
          {isStartTitleSlide && (
            <StyledClickableIcon
              $padding={'0 0 0 0.4rem'}
              tooltip="Disable title slide"
              disabled={!!isUploadingEditedImage}
              onClick={() => onDisableStartTitleSlideClick()}
              $isUploadingEditedImage={isUploadingEditedImage}
            >
              <RemovePhotoIcon />
            </StyledClickableIcon>
          )}

          {isEndTitleSlide && (
            <StyledClickableIcon
              $padding={'0 0 0 0.4rem'}
              tooltip="Disable end slide"
              disabled={isUploadingEditedImage}
              onClick={() => onDisableEndTitleSlideClick()}
              $isUploadingEditedImage={isUploadingEditedImage}
            >
              <RemovePhotoIcon />
            </StyledClickableIcon>
          )}

          {!isTitleSlide && (
            <StyledClickableIcon
              $padding={'0 0 0 0.4rem'}
              disable={isUploadingEditedImage}
              tooltip="Remove image from slideshow"
              onClick={() => onRemoveSlideClick(slide)}
              $isUploadingEditedImage={isUploadingEditedImage}
            >
              <RemovePhotoIcon />
            </StyledClickableIcon>
          )}
        </ToolbarRightContainer>
      </Toolbar>
    </StyledPhotoLibraryThumbnail>
  )
}

export default SlideThumbnail
export const DraggableSlideThumbnail = SortableElement(SlideThumbnail)
