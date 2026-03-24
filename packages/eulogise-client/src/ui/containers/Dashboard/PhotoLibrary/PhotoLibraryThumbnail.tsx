import React from 'react'

import { SortableElement } from '@eulogise/client-components'
import { StyledPhotoLibraryThumbnail } from '../../SlideshowTimeline/styles'
import PhotoLibraryImageThumbnail, {
  BORDER_SIZE,
} from './PhotoLibraryImageThumbnail'
import PhotoLibraryActionBar from './PhotoLibraryActionBar'
import {
  DEVICES,
  STYLE,
  THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT,
  useBreakpoint,
} from '@eulogise/client-core'
import styled from 'styled-components'
import {
  DrawerId,
  EulogisePhotoLibraryEditMode,
  GetImageObject,
  ICardProductBackgroundImageBase,
  IImageAsset,
} from '@eulogise/core'
import { SectionActionMenu } from '../../SectionActionMenu/SectionActionMenu'
import SectionActionMenuItem from '../../SectionActionMenu/SectionActionMenuItem'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
} from '../../../store/hooks'
import { openDrawerAction } from '../../../store/DrawerState/actions'
import { createNewBackgroundImageAction } from '../../../store/BackgroundImageState/actions'

const THUMBNAIL_ACTION_CONTAINER_HEIGHT_PERCENTAGE = 0.25

const StyledActionBarPlaceholder = styled.div<{
  $thumbnailActionContainerTopOffset: string
}>`
  ${({
    $thumbnailActionContainerTopOffset,
  }: {
    $thumbnailActionContainerTopOffset: string
  }) =>
    $thumbnailActionContainerTopOffset &&
    `
        height: ${$thumbnailActionContainerTopOffset};`}
`

interface IPhotoLibraryThumbnailProps {
  id?: string
  caseId: string
  imageIndex: number
  image: IImageAsset
  onRemoveImageClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMobileClick: () => void
  mobileSelectedImageIndex: number
  scaledThumbnailHeight?: number
  scaledThumbnailWidth?: number
  onHoverThumbnailIndex?: number
  isSelected: boolean
  editMode?: EulogisePhotoLibraryEditMode
  isAlwaysShowingSpin?: boolean
  isPhotoSelected?: boolean
  onSelectPhotoClick?: () => void
}

const PhotoLibraryThumbnail: React.FunctionComponent<
  IPhotoLibraryThumbnailProps
> = ({
  caseId,
  imageIndex,
  image,
  onMouseEnter,
  onMouseLeave,
  onMobileClick,
  mobileSelectedImageIndex,
  scaledThumbnailHeight = 0,
  scaledThumbnailWidth = 0,
  onHoverThumbnailIndex,
  isSelected,
  editMode = EulogisePhotoLibraryEditMode.PHOTO_LIBRARY,
  isAlwaysShowingSpin = false,
  isPhotoSelected = false,
  onSelectPhotoClick,
  id,
}) => {
  const dispatch = useEulogiseDispatch()
  const screenSize = useBreakpoint()
  const isMobileScreenSize = screenSize === DEVICES.MOBILE
  const { activeItem: activeCase } = useCaseState()
  const {
    isRemovingImageBackground,
    removingImageBackgroundImageIndex,
    isSelectingPhoto,
  } = useAssetState()
  // Only used by Customers/CoEditor/Editor (not admin and clients) create background
  const clientId = activeCase?.client
  const customerId = activeCase?.customer?.id!

  const isMobileThumbnailSelected =
    isMobileScreenSize && mobileSelectedImageIndex === imageIndex

  const thumbnailActionContainerRawHeight =
    scaledThumbnailHeight * THUMBNAIL_ACTION_CONTAINER_HEIGHT_PERCENTAGE
  const thumbnailActionContainerHeight =
    thumbnailActionContainerRawHeight > THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT
      ? THUMBNAIL_ACTION_CONTAINER_MAX_HEIGHT
      : thumbnailActionContainerRawHeight

  const thumbnailActionContainerTopOffset =
    thumbnailActionContainerHeight + BORDER_SIZE

  const shouldShowWhenHoverInDesktop =
    !isMobileScreenSize && imageIndex === onHoverThumbnailIndex

  const actionBarThumbnailTopOffset = isMobileScreenSize
    ? ''
    : `${STYLE.GUTTER}`

  const isImageBeingRemoved =
    isRemovingImageBackground &&
    imageIndex === removingImageBackgroundImageIndex

  return (
    <StyledPhotoLibraryThumbnail
      id={id}
      $isMobileScreenSize={isMobileScreenSize}
      data-element-type="image-thumbnail"
      data-element-slide-index={imageIndex}
      $scaledThumbnailWidth={scaledThumbnailWidth}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={() => {
        if (isMobileScreenSize) {
          onMobileClick()
        }
      }}
    >
      <PhotoLibraryImageThumbnail
        // @ts-ignore
        scaledThumbnailHeight={scaledThumbnailHeight}
        scaledThumbnailWidth={scaledThumbnailWidth}
        caseId={caseId}
        image={image}
        imageIndex={imageIndex}
        isMobileScreenSize={isMobileScreenSize}
        isMobileThumbnailSelected={isMobileThumbnailSelected}
        onHoverThumbnailIndex={onHoverThumbnailIndex}
        isHoverable={editMode === EulogisePhotoLibraryEditMode.PHOTO_LIBRARY}
        isShowNumberContainer={
          editMode === EulogisePhotoLibraryEditMode.PHOTO_LIBRARY
        }
        isAlwaysShowingSpin={isAlwaysShowingSpin}
        isRemovingImageBackground={isImageBeingRemoved}
        isSelectingPhotos={isSelectingPhoto}
        isPhotoSelected={isPhotoSelected}
        onSelectPhotoClick={onSelectPhotoClick}
      />
      {editMode === EulogisePhotoLibraryEditMode.PHOTO_LIBRARY &&
        (shouldShowWhenHoverInDesktop ? (
          <PhotoLibraryActionBar
            thumbnailActionContainerTopOffset={
              thumbnailActionContainerTopOffset
            }
            mobileSelectedImageIndex={mobileSelectedImageIndex}
            image={image}
            isSelected={isSelected}
          />
        ) : (
          <StyledActionBarPlaceholder
            $thumbnailActionContainerTopOffset={actionBarThumbnailTopOffset}
          />
        ))}
      {editMode === EulogisePhotoLibraryEditMode.BACKGROUND_IMAGE_LIBRARY && (
        <SectionActionMenu isShow={shouldShowWhenHoverInDesktop}>
          <SectionActionMenuItem
            onClick={() => {
              dispatch(
                createNewBackgroundImageAction({
                  backgroundImage: {
                    ...image.content,
                    // Only used by Customers/CoEditor/Editor (not admin -not need one and clients - use the client id from user token) create background
                    clientId,
                    customerId,
                  } as unknown as GetImageObject,
                  onCreated: (
                    backgroundImage: ICardProductBackgroundImageBase,
                  ) => {
                    dispatch(
                      openDrawerAction(DrawerId.EDIT_BACKGROUND_DRAWER, {
                        backgroundImage,
                        isGenerating: false,
                      }),
                    )
                  },
                }),
              )
              dispatch(
                openDrawerAction(DrawerId.EDIT_BACKGROUND_DRAWER, {
                  isGenerating: true,
                }),
              )
            }}
          >
            Use photo as background
          </SectionActionMenuItem>
        </SectionActionMenu>
      )}
    </StyledPhotoLibraryThumbnail>
  )
}

export default PhotoLibraryThumbnail
export const DraggablePhotoLibraryThumbnail = SortableElement(
  PhotoLibraryThumbnail,
)
