import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  ClickableIcon,
  EditIcon,
  DeleteIcon,
  Notification,
  RemoveBackgroundImageIcon,
} from '@eulogise/client-components'
import {
  COLOR,
  THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT,
  useBreakpoint,
  DEVICES,
} from '@eulogise/client-core'
import {
  AssetType,
  CardProductContentItemType,
  EulogiseCardProducts,
  EulogiseProduct,
  IAllActiveCardProducts,
  IAssetState,
  ICardProductImageRow,
  ICardProductPage,
  ICardProductRow,
  ICaseDeceased,
  IFilestackImageEnhancePreset,
  IImageAsset,
  IImageAssetContent,
  IImageSize,
  ISlide,
  ISlideshowData,
  ISlideshowState,
  ModalId,
  SlideType,
  ENHANCE_IMAGE_INACTIVE_SVG_URL,
  ENHANCE_IMAGE_ACTIVE_SVG_URL,
} from '@eulogise/core'
import {
  useAllActiveCardProducts,
  useAssetState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../../store/hooks'
import { removeAsset, saveImage } from '../../../store/AssetState/actions'
import { ConfirmModal } from '@eulogise/client-components'
import { TranformationUIHelper } from '../../../helpers/TransformationUIHelper'
import { ICaseState } from '@eulogise/core'
import { updateCaseById } from '../../../store/CaseState/actions'
import { saveCardProduct } from '../../../store/CardProduct/actions'
import {
  saveSlidesToSlideshowByCaseId,
  updateSlides,
} from '../../../store/SlideshowState/actions'
import {
  AssetHelper,
  NavigationHelper,
  ImageHelper,
  SlideshowHelper,
} from '@eulogise/helpers'
import { showModalAction } from '../../../store/ModalState/actions'

interface IPhotoLibraryImageActionBarProps {
  thumbnailActionContainerTopOffset: number
  image: IImageAsset
  mobileSelectedImageIndex: number
  isSelected: boolean
}

const StyledEnhanceImageIcon = styled.img`
  cursor: pointer;
  margin-left: 4px;
`

const StyledEditIcon = styled(EditIcon)``

const StyledDeleteIcon = styled(DeleteIcon)``

const StyledRemoveBackgroundImageIcon = styled(RemoveBackgroundImageIcon)``

const COMMON_THUNBNAIL_ACTION_STYLES = `
  position: relative;
  width: 100%;
  background-color: ${COLOR.PASTEL_BLUE};
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 0 12px;
  left: 4px;
  width: calc(100% - 8px);
`

const ModalImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 1rem auto 0;
  display: block;
`

const StyledEditIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledRemoveBackgroundImageClickIcon = styled(ClickableIcon)`
  padding-left: 4px;
`

const StyledThumbnailActionContainer = styled.div<{
  $isMobileScreenSize: boolean
  $top: string
}>`
  ${({
    $isMobileScreenSize,
    $top,
  }: {
    $isMobileScreenSize: boolean
    $top: string
  }) =>
    $isMobileScreenSize
      ? `
        ${COMMON_THUNBNAIL_ACTION_STYLES}
        position: absolute;
        bottom: 0;
        height:  ${THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT}px;
        `
      : `
        ${COMMON_THUNBNAIL_ACTION_STYLES}
        top: ${$top};
        max-height: ${THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT}px;
        height: 25%;
  `}
`

const PhotoLibraryActionBar = ({
  thumbnailActionContainerTopOffset,
  image,
  mobileSelectedImageIndex,
  isSelected,
}: IPhotoLibraryImageActionBarProps) => {
  const dispatch = useEulogiseDispatch()
  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const isButtonDisabled = isMobileScreenSize
    ? !isNaN(mobileSelectedImageIndex)
      ? false
      : true
    : false

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [enhanceImageSvgUrl, setEnhanceImageSvgUrl] = useState(
    ENHANCE_IMAGE_INACTIVE_SVG_URL,
  )

  const isEnhanceImageEnabled =
    image?.content?.preset === IFilestackImageEnhancePreset.AUTO

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts: IAllActiveCardProducts =
    useAllActiveCardProducts(allAvailableCardProducts)

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!

  const {
    images = [],
    isUploadingEditedImage,
    isRemovingImageBackground,
  }: IAssetState = useAssetState()

  const originPhotoIndex: number = images.findIndex(
    (i: IImageAsset) =>
      i?.content?.filestackHandle === image?.content?.filestackHandle,
  )

  const hasImageBackgroundRemoved: boolean =
    image?.content?.isRemovedBackgroundImage ?? false

  const imageContent = image.content
  const imageUrl: string = ImageHelper.getThumbnailImageUrl(imageContent)!

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!

  const deceased: ICaseDeceased = activeCase?.deceased!
  const primaryImage = deceased?.primaryImage

  const needUpdatePrimaryImage: boolean =
    primaryImage?.filestackHandle === image?.content?.filestackHandle

  const needUpdateSlideshow: boolean =
    SlideshowHelper.checkIfNeedToReplaceSlideshowImagesAfterEditing(
      image,
      slideshowData?.content.slides,
    )

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
    if (!image) {
      return
    }

    const updatedCardProducts = TranformationUIHelper.getAllUpdatedCardProducts(
      allActiveCardProducts,
    )

    TranformationUIHelper.openTranformationUI({
      image,
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

  const onRemoveImageBackground = () => {
    if (!image) {
      return
    }
    dispatch(
      showModalAction(ModalId.REMOVE_IMAGE_BACKGROUND, {
        assetId: image.id,
        assetFilestackHandle: image.content.filestackHandle,
        removingImageBackgroundImageIndex: originPhotoIndex,
      }),
    )
  }

  const onEnhanceImageIconHoverAndOut = () => {
    if (enhanceImageSvgUrl === ENHANCE_IMAGE_ACTIVE_SVG_URL) {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_INACTIVE_SVG_URL)
    } else {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_ACTIVE_SVG_URL)
    }
  }

  const onUpdateEnhanceImagePreset = () => {
    if (!image || !image.id || !image.content) {
      return
    }
    const updatedImage = AssetHelper.toggleEnhanceImagePreset(image)
    dispatch(
      saveImage({
        file: updatedImage,
        onSuccess: () => {
          // update slideshow
          if (slideshowData) {
            const slides: Array<ISlide> = slideshowData?.content?.slides
            const originalSlide: ISlide | undefined =
              SlideshowHelper.getSlideByFilestackHandle(
                slides,
                image?.content?.filestackHandle,
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
  }

  useEffect(() => {
    if (isEnhanceImageEnabled) {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_ACTIVE_SVG_URL)
    } else {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_INACTIVE_SVG_URL)
    }
  }, [isEnhanceImageEnabled])

  return (
    <StyledThumbnailActionContainer
      $top={`-${thumbnailActionContainerTopOffset}px`}
      $isMobileScreenSize={isMobileScreenSize}
    >
      <StyledEditIconsContainer>
        <ClickableIcon
          tooltip={isMobileScreenSize ? undefined : 'Edit this image'}
          disabled={isButtonDisabled || isUploadingEditedImage}
          onClick={() => {
            onEditImageClick()
          }}
        >
          <StyledEditIcon />
        </ClickableIcon>

        <ClickableIcon
          tooltip={
            isMobileScreenSize
              ? undefined
              : isEnhanceImageEnabled
              ? 'Remove image enhancement'
              : 'Enhance this Image'
          }
          disabled={isButtonDisabled || isUploadingEditedImage}
          onClick={() => onUpdateEnhanceImagePreset()}
        >
          <StyledEnhanceImageIcon
            onMouseOver={onEnhanceImageIconHoverAndOut}
            onMouseOut={onEnhanceImageIconHoverAndOut}
            src={enhanceImageSvgUrl}
          />
        </ClickableIcon>

        <StyledRemoveBackgroundImageClickIcon
          tooltip={
            isMobileScreenSize
              ? undefined
              : hasImageBackgroundRemoved
              ? 'Image background has been removed.'
              : 'Remove image background'
          }
          disabled={
            isButtonDisabled ||
            isUploadingEditedImage ||
            hasImageBackgroundRemoved ||
            isRemovingImageBackground
          }
          onClick={() => {
            onRemoveImageBackground()
          }}
        >
          <StyledRemoveBackgroundImageIcon />
        </StyledRemoveBackgroundImageClickIcon>
      </StyledEditIconsContainer>

      <ClickableIcon
        disabled={isButtonDisabled || isSelected || isUploadingEditedImage}
        tooltip={
          isSelected
            ? 'Image is in use. Please remove it from the slideshow before deleting'
            : 'Remove this image'
        }
        onClick={() => {
          if (!image) {
            return
          }
          if (isMobileScreenSize && image) {
            dispatch(
              removeAsset({ assetId: image.id, assetType: AssetType.IMAGE }),
            )
          }
          if (!isMobileScreenSize && image) {
            setIsShowConfirmModal(true)
          }
        }}
      >
        <StyledDeleteIcon />
      </ClickableIcon>
      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          text={
            <>
              This will remove the following image from your image library.
              <ModalImage src={imageUrl} />
            </>
          }
          isConfirming={false}
          onClose={() => setIsShowConfirmModal(false)}
          onConfirm={() => {
            setIsShowConfirmModal(false)
            dispatch(
              removeAsset({ assetId: image.id, assetType: AssetType.IMAGE }),
            )
          }}
        />
      )}
    </StyledThumbnailActionContainer>
  )
}

export default PhotoLibraryActionBar
