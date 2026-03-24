import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  DragAndDropCollection,
  EulogisePhotoLibraryEditMode,
} from '@eulogise/core'
import PhotoLibraryThumbnail, {
  DraggablePhotoLibraryThumbnail,
} from './PhotoLibraryThumbnail'
import { DEVICES, STYLE, useBreakpoint } from '@eulogise/client-core'
import { IImageAsset } from '@eulogise/core'
import { ISlideshowData } from '@eulogise/core'
import { ISlide } from '@eulogise/core'
import { useAssetState, useSlideshowState } from '../../../store/hooks'
import { ISlideshowState } from '@eulogise/core'
import { IAssetState } from '@eulogise/core'

export type IPhotoLibraryThumbnailListProps = {
  caseId: string
  sortedImages: Array<IImageAsset>
  onThumbnailMouseEnter: (slideIndex: number) => void
  mobileSelectedImageIndex: number
  setMobileSelectedImageIndex: (slideIndex: number | undefined) => void
  scaledThumbnailWidth?: number
  editMode?: EulogisePhotoLibraryEditMode
  onSelectPhotoClick: (image: IImageAsset) => void
  isPhotoSelected: boolean
}

const StyledPhotoLibraryThumbnailList = styled.div<{
  $isMobileScreenSize: boolean
}>`
  ${({ $isMobileScreenSize }) =>
    $isMobileScreenSize
      ? `
      padding: 0 ${STYLE.HALF_GUTTER};
      align-items: center;
    
    `
      : ``}
  display: flex;
  flex-wrap: wrap;
`

const PhotoLibraryThumbnailList: React.FunctionComponent<
  IPhotoLibraryThumbnailListProps
> = ({
  caseId,
  sortedImages,
  onThumbnailMouseEnter,
  scaledThumbnailWidth = 0,
  mobileSelectedImageIndex,
  setMobileSelectedImageIndex,
  editMode,
  onSelectPhotoClick,
}) => {
  const thumbnailListRef = useRef<HTMLDivElement | null>(null)
  const [tooltipSlideIndex, setTooltipSlideIndex] = useState<
    number | undefined
  >()
  const [onHoverThumbnailIndex, setOnHoverThumbnailIndex] = useState<
    number | undefined
  >()
  const defaultThumbnailWidth = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_WIDTH as string).replace('px', ''),
    10,
  )
  const defaultThumbnailHeight = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_HEIGHT as string).replace('px', ''),
    10,
  )

  const thumbnailScaledFactor = scaledThumbnailWidth / defaultThumbnailWidth
  const scaledThumbnailHeight = thumbnailScaledFactor * defaultThumbnailHeight

  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE

  const slideshowState: ISlideshowState = useSlideshowState()

  const slideshowData: ISlideshowData = slideshowState?.activeItem!
  const slides: Array<ISlide> = slideshowData?.content?.slides ?? []

  const existingFileHandles = slides?.map((s) => s.image?.filestackHandle)

  const timelineThumbnailsDisplayedAmount =
    slideshowState?.timelineThumbnailsDisplayedAmount ?? 2

  const {
    isUploadingEditedImage,
    uploadingEditedImageIndex,
    isSelectingPhoto,
    selectedPhotos = [],
  }: IAssetState = useAssetState()

  const getPhotoLibraryItemId = (image: IImageAsset): string => {
    return `photo-library-${image.id}`
  }

  // Only auto-scroll up if new image added in - i.e the first image's id in the image array is changed
  useEffect(() => {
    if (!thumbnailListRef) {
      return
    }
    if (sortedImages?.length > timelineThumbnailsDisplayedAmount) {
      const itemElement = window.document.getElementById(
        getPhotoLibraryItemId(sortedImages[0]),
      )
      itemElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [sortedImages?.length])

  return (
    <StyledPhotoLibraryThumbnailList
      $isMobileScreenSize={isMobileScreenSize}
      id="image-library-thumbnail-list"
      ref={thumbnailListRef}
    >
      {sortedImages.map((image: IImageAsset, imageIndex: number) => {
        const isPhotoSelected: boolean = selectedPhotos?.some(
          (img) => img.id === image.id,
        )
        const isSelected: boolean = !!existingFileHandles.find(
          (h) => image?.content?.filestackHandle === h,
        )
        const shouldReplaceWithPlaceholderThumbnail =
          isUploadingEditedImage === true &&
          uploadingEditedImageIndex === imageIndex

        const PhotoLibraryThumbnailComponent =
          isUploadingEditedImage || isSelectingPhoto
            ? PhotoLibraryThumbnail
            : DraggablePhotoLibraryThumbnail

        return (
          <PhotoLibraryThumbnailComponent
            id={getPhotoLibraryItemId(image)}
            index={imageIndex}
            imageIndex={imageIndex}
            editMode={editMode}
            mobileSelectedImageIndex={mobileSelectedImageIndex}
            onMouseEnter={() => {
              setTooltipSlideIndex(imageIndex)
              onThumbnailMouseEnter(imageIndex)
              setOnHoverThumbnailIndex(imageIndex)
            }}
            onMouseLeave={() => {
              setTooltipSlideIndex(undefined)
              setOnHoverThumbnailIndex(undefined)
            }}
            onMobileClick={() => {
              if (!isSelectingPhoto) {
                setMobileSelectedImageIndex(imageIndex)
              } else {
                setMobileSelectedImageIndex(undefined)
              }
            }}
            collection={DragAndDropCollection.SLIDE}
            key={image.id}
            caseId={caseId}
            image={image}
            isOpenTooltip={tooltipSlideIndex === imageIndex}
            scaledThumbnailWidth={scaledThumbnailWidth}
            scaledThumbnailHeight={scaledThumbnailHeight}
            onHoverThumbnailIndex={onHoverThumbnailIndex}
            isSelected={isSelected}
            isAlwaysShowingSpin={shouldReplaceWithPlaceholderThumbnail}
            isPhotoSelected={isPhotoSelected}
            onSelectPhotoClick={() => {
              onSelectPhotoClick(image)
            }}
          />
        )
      })}
    </StyledPhotoLibraryThumbnailList>
  )
}

export default PhotoLibraryThumbnailList
