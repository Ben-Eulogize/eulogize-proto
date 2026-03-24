import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
  useProductState,
} from '../../store/hooks'
import { ImageHelper } from '@eulogise/helpers'
import { CardProductHelper } from '../../../../../eulogise-helpers/src/CardProductHelper'
import { SlideshowHelper } from '../../../../../eulogise-helpers/src/SlideshowHelper'
import ImageLibraryItem, { IImageLibraryItemProps } from './ImageLibraryItem'
import {
  AssetType,
  DragAndDropCollection,
  EulogiseProduct,
  IAssetState,
  ICardProductData,
  ICaseState,
  IImageAsset,
  ISlideshowData,
} from '@eulogise/core'
import {
  fetchImageAssetsByCaseId,
  removeAsset,
} from '../../store/AssetState/actions'
import { EXPANDED_IMAGE_LIBRARY_BASE_WIDTH } from '../Dashboard/UploadPicturesPanel/UploadPicturesPanel'
import SortableImageLibraryItem from './SortableImageLibraryItem'

const FACE_DETECTION_LIMIT = 20

const StyledImageLibrary = styled.div<{ width: number }>`
  ${({ width }) =>
    width
      ? `width: ${width}px;`
      : `width: ${EXPANDED_IMAGE_LIBRARY_BASE_WIDTH}px;`}
  flex: 1;
  overflow-y: auto;
`

interface IImageLibraryProps {
  existingFileHandles?: Array<string>
  slug?: string
  onSelectImageClick: (image: IImageAsset) => void
  onImageClick: (props: {
    image: IImageAsset
    event: MouseEvent
    isSelected: boolean
  }) => void
  onUnselectImageClick: (image: IImageAsset) => void
  isDragging: boolean
  isDraggable: boolean
  width: number
  className?: string
  product?: EulogiseProduct
  isShowUnusedImages?: boolean
  isShowRemoveBackgroundButton?: boolean
  isShowAddAndRemoveButton?: boolean
}

const ImageList = styled.div`
  width: 100%;
  column-count: 2;
  padding: 0.25rem 1rem;
  text-align: center;
`

const ImageListItem = styled.div`
  user-select: none;
`

const ImageLibrary = ({
  existingFileHandles = [],
  onSelectImageClick,
  onImageClick,
  onUnselectImageClick,
  isDragging,
  isDraggable,
  className,
  width,
  product,
  slug,
  isShowUnusedImages,
  isShowRemoveBackgroundButton,
  isShowAddAndRemoveButton,
}: IImageLibraryProps) => {
  const dispatch = useEulogiseDispatch()
  const { images }: IAssetState = useAssetState()
  const [slideCollectionImageIndex, setSlideCollectionImageIndex] =
    useState<number>()

  const { activeItem }: ICaseState = useCaseState()
  const productState = product ? useProductState({ product, slug }) : null
  const activeProduct = productState?.activeItem
  const displayImages = isShowUnusedImages
    ? product === EulogiseProduct.SLIDESHOW
      ? SlideshowHelper.getUnusedImages({
          slideshow: activeProduct as ISlideshowData,
          images,
        })
      : CardProductHelper.getUnusedImages({
          images,
          cardProduct: activeProduct as ICardProductData,
        })
    : images
  const showShowClickOverlay = CardProductHelper.getIsAtCardProductEditor({
    location,
  })

  // Compute which images should trigger face detection (first 20 without faceDetection)
  // Only enable for Card Product editors, not Slideshow
  const isCardProductEditor =
    product && product !== EulogiseProduct.SLIDESHOW && showShowClickOverlay

  const faceDetectionEligibleIds = useMemo(() => {
    // Only trigger face detection on Card Product editor
    if (!isCardProductEditor || !displayImages) return new Set<string>()

    const eligibleIds = new Set<string>()
    let count = 0

    for (const image of displayImages) {
      if (count >= FACE_DETECTION_LIMIT) break
      if (!image?.content?.faceDetection) {
        eligibleIds.add(image.id)
        count++
      }
    }

    return eligibleIds
  }, [displayImages, isCardProductEditor])

  useEffect(() => {
    if (!activeItem) {
      return
    }
    dispatch(fetchImageAssetsByCaseId(activeItem.id))
  }, [])

  if (!displayImages) {
    return null
  }

  return (
    <StyledImageLibrary className={className} width={width}>
      <ImageList>
        {displayImages?.map((image: IImageAsset, imageIndex: number) => {
          const imageContent = image.content
          const imageUrl: string =
            ImageHelper.getThumbnailImageUrl(imageContent)!

          const isSelected: boolean = !!existingFileHandles.find(
            (h) => imageContent.filestackHandle === h,
          )
          const collection =
            imageIndex === slideCollectionImageIndex
              ? DragAndDropCollection.DRAGGING_IMAGE
              : DragAndDropCollection.IMAGE

          const imageItemProps: IImageLibraryItemProps & { key: string } = {
            product,
            isSelected,
            key: imageUrl,
            src: imageUrl,
            slug,
            image,
            filestackHandle: imageContent.filestackHandle,
            onSelectImageClick: () => onSelectImageClick(image),
            onImageClick: (ev: any) => {
              onImageClick({ image, event: ev, isSelected })
            },
            onUnselectImageClick: () => onUnselectImageClick(image),
            onDeleteImageClick: () =>
              dispatch(
                removeAsset({
                  assetId: image.id,
                  assetType: AssetType.IMAGE,
                }),
              ),
            showShowClickOverlay,
            isShowRemoveBackgroundButton,
            isShowAddAndRemoveButton,
            shouldTriggerFaceDetection: faceDetectionEligibleIds.has(image.id),
          }

          return (
            <ImageListItem
              key={imageUrl}
              onMouseEnter={() => {
                if (isDragging) {
                  return
                }
                setSlideCollectionImageIndex(imageIndex)
              }}
            >
              {isDraggable ? (
                <SortableImageLibraryItem
                  index={existingFileHandles.length + imageIndex}
                  disabled={isSelected}
                  collection={collection}
                  {...imageItemProps}
                />
              ) : (
                <ImageLibraryItem {...imageItemProps} />
              )}
            </ImageListItem>
          )
        })}
      </ImageList>
    </StyledImageLibrary>
  )
}

export default ImageLibrary
