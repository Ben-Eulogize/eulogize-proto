import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import {
  AddPhotoIcon,
  ClickableIcon,
  ConfirmModal,
  DeleteIcon,
  EditIcon,
  Notification,
  RemoveBackgroundImageIcon,
  RemovePhotoActiveIcon,
} from '@eulogise/client-components'
import {
  CardProductContentItemType,
  ENHANCE_IMAGE_ACTIVE_SVG_URL,
  ENHANCE_IMAGE_INACTIVE_SVG_URL,
  EulogiseCardProducts,
  EulogiseProduct,
  IAllActiveCardProducts,
  IAssetState,
  ICardProductData,
  ICardProductImageRow,
  ICardProductPage,
  ICardProductRow,
  ICaseDeceased,
  ICaseState,
  IFilestackImageEnhancePreset,
  IImageAsset,
  IImageAssetContent,
  IImageSize,
  ISlide,
  ISlideshowData,
  ISlideshowState,
  ModalId,
  SlideType,
} from '@eulogise/core'
import ImagePreview from './ImagePreview'
import {
  useAllActiveCardProducts,
  useAssetState,
  useAvailableEulogiseCardProducts,
  useCaseState,
  useEulogiseDispatch,
  useProductState,
  useSlideshowState,
} from '../../store/hooks'
import { TranformationUIHelper } from '../../helpers/TransformationUIHelper'
import { AssetHelper, ImageHelper, NavigationHelper } from '@eulogise/helpers'
import { SlideshowHelper } from '../../../../../eulogise-helpers/src/SlideshowHelper'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { saveCardProduct } from '../../store/CardProduct/actions'
import { updateCaseById } from '../../store/CaseState/actions'
import { saveSlidesToSlideshowByCaseId } from '../../store/SlideshowState/actions'
import { showModalAction } from '../../store/ModalState/actions'
import { Badge } from '../../components/Badge/Badge'
import { detectAssetFaces } from '../../store/AssetState/actions'

export interface IImageLibraryItemProps {
  src: string
  slug?: string
  image: IImageAsset
  isSelected: boolean
  onSelectImageClick: () => void
  onUnselectImageClick: () => void
  onDeleteImageClick: () => void
  filestackHandle: string
  onImageClick?: (ev: MouseEvent) => void
  showShowClickOverlay?: boolean
  product?: EulogiseProduct
  isShowAddAndRemoveButton?: boolean
  isShowRemoveBackgroundButton?: boolean
  shouldTriggerFaceDetection?: boolean
}

const StyledImageLibraryItem = styled.div<{ $isSelected: boolean }>`
  display: inline-block;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  border: 2px solid transparent;
  z-index: 3; // use this when dragging the image
  ${({ $isSelected }) =>
    $isSelected &&
    `
    border-color: ${COLOR.DARK_BLUE}
  `}
`

const ImageLibraryButtonContainer = styled.div`
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR};
  display: flex;
  height: 2rem;
  color: ${COLOR.BLACK};
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 0.25rem;
`

const StyledEditIcon = styled(EditIcon)``

const StyledDeleteIcon = styled(DeleteIcon)``

const ModalImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 1rem auto 0;
  display: block;
`

const StyledRemoveBackgroundImageClickIcon = styled(ClickableIcon)``

const StyledRemoveBackgroundImageIcon = styled.span`
  display: inline-flex;
`

const StyledClickableIcon = styled(ClickableIcon)<{
  $isUploadingEditedImage?: boolean
}>`
  ${({ $isUploadingEditedImage }: { $isUploadingEditedImage?: boolean }) =>
    $isUploadingEditedImage &&
    `
    color: ${COLOR.GREY};
    cursor: not-allowed;
  `}
`

const StyledNoOfImageUsed = styled(Badge)`
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  z-index: 1;
`

const ImageLibraryItem = ({
  src,
  isSelected,
  onSelectImageClick,
  onUnselectImageClick,
  onDeleteImageClick,
  image,
  onImageClick,
  showShowClickOverlay = false,
  product,
  slug,
  isShowAddAndRemoveButton = true,
  isShowRemoveBackgroundButton = true,
  shouldTriggerFaceDetection = false,
}: IImageLibraryItemProps) => {
  const dispatch = useEulogiseDispatch()
  const itemRef = useRef<HTMLDivElement>(null)
  const [hasFaceDetectionTriggered, setHasFaceDetectionTriggered] =
    useState<boolean>(false)

  // Trigger face detection when image becomes visible for 500ms (after scroll stops)
  useEffect(() => {
    const element = itemRef.current
    if (!element) return

    // Skip if not eligible for face detection or already triggered
    if (!shouldTriggerFaceDetection || hasFaceDetectionTriggered) return

    let debounceTimer: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFaceDetectionTriggered) {
            // Start debounce timer - only trigger after 500ms of being visible
            debounceTimer = setTimeout(() => {
              // Mark as triggered to prevent duplicate calls
              setHasFaceDetectionTriggered(true)

              // Trigger face detection for this asset
              dispatch(
                detectAssetFaces({
                  assetId: image.id,
                  forceRedetect: false,
                  onSuccess: (updatedAsset) => {
                    console.log(
                      `Face detection completed for asset ${image.id}:`,
                      updatedAsset?.content?.faceDetection?.faces?.length || 0,
                      'faces detected',
                    )
                  },
                  onError: (error) => {
                    console.error(
                      `Face detection failed for asset ${image.id}:`,
                      error,
                    )
                  },
                }),
              )

              // Disconnect observer after triggering
              observer.disconnect()
            }, 500)
          } else {
            // Image scrolled out of view - cancel the timer
            if (debounceTimer) {
              clearTimeout(debounceTimer)
              debounceTimer = null
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    )

    observer.observe(element)

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      observer.disconnect()
    }
  }, [image?.id, shouldTriggerFaceDetection, hasFaceDetectionTriggered])

  /*
  const [isUpdatingEnhancementPreset, setIsUpdatingEnhancementPreset] =
    useState<boolean>(false)
*/

  const [enhanceImageSvgUrl, setEnhanceImageSvgUrl] = useState(
    ENHANCE_IMAGE_INACTIVE_SVG_URL,
  )
  const { activeItem: activeProduct } = useProductState({
    product: product!,
    slug,
  })
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false)
  const noOfImageUsed =
    product === EulogiseProduct.SLIDESHOW
      ? SlideshowHelper.isImageUsedByImageHandle({
          slideshow: activeProduct as ISlideshowData,
          imageHandle: image?.content?.filestackHandle,
        })
        ? 1
        : 0
      : CardProductHelper.getNoOfUseByImageHandle({
          cardProduct: activeProduct as ICardProductData,
          imageHandle: image?.content?.filestackHandle,
          product,
        })

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()

  const allActiveCardProducts: IAllActiveCardProducts =
    useAllActiveCardProducts(allAvailableCardProducts)

  const slideshowState: ISlideshowState = useSlideshowState()
  const slideshowData: ISlideshowData = slideshowState?.activeItem!

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId = activeCase?.id!

  const deceased: ICaseDeceased = activeCase?.deceased!
  const primaryImage = deceased?.primaryImage

  const needUpdatePrimaryImage: boolean =
    primaryImage?.filestackHandle === image?.content?.filestackHandle

  const {
    images = [],
    isUploadingEditedImage,
    uploadingEditedImageIndex,
    isRemovingImageBackground,
    removingImageBackgroundImageIndex,
  }: IAssetState = useAssetState()

  const originPhotoIndex: number = images.findIndex(
    (i: IImageAsset) =>
      i?.content?.filestackHandle === image?.content?.filestackHandle,
  )

  const shouldShowSpinWhenEditingImage: boolean = !!(
    isUploadingEditedImage && uploadingEditedImageIndex === originPhotoIndex
  )

  const shouldShowSpinWhenRemovingImageBackground: boolean = !!(
    isRemovingImageBackground &&
    removingImageBackgroundImageIndex === originPhotoIndex
  )

  const isEnhanceImageEnabled =
    image?.content?.preset === IFilestackImageEnhancePreset.AUTO

  const hasImageBackgroundRemoved: boolean =
    image?.content?.isRemovedBackgroundImage ?? false

  useEffect(() => {
    if (isEnhanceImageEnabled) {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_ACTIVE_SVG_URL)
    } else {
      setEnhanceImageSvgUrl(ENHANCE_IMAGE_INACTIVE_SVG_URL)
    }
  }, [isEnhanceImageEnabled])

  // TODO: Refactor this function in a common place later
  const onChangePrimaryImage = async (editingImage: IImageAsset) => {
    if (editingImage?.content) {
      const { height, width }: IImageSize =
        await ImageHelper.getImageSizeViaFilestack(
          editingImage?.content?.filestackHandle,
        )
      const updatedCaseFields = {
        primaryImage: {
          ...editingImage?.content,
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

  // TODO: Refactor this function in a common place later
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

  return (
    <StyledImageLibraryItem ref={itemRef} $isSelected={isSelected}>
      {noOfImageUsed ? (
        <StyledNoOfImageUsed>{noOfImageUsed}</StyledNoOfImageUsed>
      ) : null}
      <ImagePreview
        preLoadImageSize={ImageHelper.getImagePreloadSize({
          image,
        })}
        src={src}
        onClick={(ev: MouseEvent) => {
          if (onImageClick) {
            onImageClick(ev)
          }
        }}
        showShowClickOverlay={showShowClickOverlay}
        isLoading={
          shouldShowSpinWhenEditingImage ||
          shouldShowSpinWhenRemovingImageBackground
        }
      />
      <ImageLibraryButtonContainer>
        {isShowAddAndRemoveButton ? (
          isSelected ? (
            <StyledClickableIcon
              disabled={isUploadingEditedImage}
              tooltip="Unselect this image"
              onClick={onUnselectImageClick}
              $isUploadingEditedImage={isUploadingEditedImage}
            >
              <RemovePhotoActiveIcon style={{ color: COLOR.DARK_BLUE }} />
            </StyledClickableIcon>
          ) : (
            <StyledClickableIcon
              disabled={isUploadingEditedImage}
              tooltip="Select this image"
              onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
                onSelectImageClick()
              }}
              $isUploadingEditedImage={isUploadingEditedImage}
            >
              <AddPhotoIcon />
            </StyledClickableIcon>
          )
        ) : null}

        <StyledClickableIcon
          tooltip="Edit this image"
          disabled={isUploadingEditedImage}
          $isUploadingEditedImage={isUploadingEditedImage}
          onClick={() => {
            const updatedCardProducts =
              TranformationUIHelper.getAllUpdatedCardProducts(
                allActiveCardProducts,
              )
            const needUpdateSlideshow: boolean =
              SlideshowHelper.checkIfNeedToReplaceSlideshowImagesAfterEditing(
                image,
                slideshowData?.content.slides,
              )
            TranformationUIHelper.openTranformationUI({
              image,
              caseId,
              dispatch,
              updatedCardProducts,
              needUpdatePrimaryImage,
              needUpdateSlideshow,
              onChangePrimaryImage,
              onReplaceAllProductsWithEditedImageContent,
              originPhotoIndex,
              onSaveNewCustomisedImageOrderIds,
            })
          }}
        >
          <StyledEditIcon />
        </StyledClickableIcon>

        {isShowRemoveBackgroundButton && (
          <StyledRemoveBackgroundImageClickIcon
            tooltip={
              hasImageBackgroundRemoved
                ? 'Image background has been removed'
                : 'Remove image background'
            }
            disabled={
              isUploadingEditedImage ||
              hasImageBackgroundRemoved ||
              isRemovingImageBackground
            }
            onClick={() => {
              onRemoveImageBackground()
            }}
          >
            <StyledRemoveBackgroundImageIcon>
              <RemoveBackgroundImageIcon />
            </StyledRemoveBackgroundImageIcon>
          </StyledRemoveBackgroundImageClickIcon>
        )}

        <StyledClickableIcon
          $isUploadingEditedImage={isUploadingEditedImage}
          disabled={isSelected || isUploadingEditedImage}
          tooltip={
            isSelected
              ? 'Image is in use. Please remove it from the slideshow before deleting'
              : 'Delete this image'
          }
          onClick={() => {
            setIsShowConfirmModal(true)
          }}
        >
          <StyledDeleteIcon />
        </StyledClickableIcon>
        {isShowConfirmModal && (
          <ConfirmModal
            title="Are you sure?"
            text={
              <>
                This will remove the following image from your image library.
                <ModalImage src={src} />
              </>
            }
            isConfirming={false}
            onClose={() => setIsShowConfirmModal(false)}
            onConfirm={() => {
              setIsShowConfirmModal(false)
              if (!isSelected) {
                onDeleteImageClick()
              }
            }}
          />
        )}
      </ImageLibraryButtonContainer>
    </StyledImageLibraryItem>
  )
}

export default ImageLibraryItem
