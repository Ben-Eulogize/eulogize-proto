import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ImageLibrary from '../../ImageLibrary/ImageLibrary'
import UploadPicturesPanelHeader from './UploadPicturesPanelHeader'
import { COLOR } from '@eulogise/client-core'
import {
  IImageAsset,
  EulogiseImageLibrarySortingBy,
  EulogiseProduct,
} from '@eulogise/core'
import {
  useAssetState,
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../../store/hooks'
import { updateTimelineUploadImagePanelCollapsed } from '../../../store/SlideshowState/actions'
import { ICaseState } from '@eulogise/core'
import { fetchCaseById } from '../../../store/CaseState/actions'
import {
  fetchAssetsByCaseId,
  updateImagesOrders,
} from '../../../store/AssetState/actions'
import { AssetType } from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'

interface IUploadPicturePanelProps {
  existingFileHandles?: Array<string>
  onSelectImageClick: (image: IImageAsset) => void
  onUnselectImageClick: (image: IImageAsset) => void
  onImageClick?: (props: {
    image: IImageAsset
    event: MouseEvent
    isSelected: boolean
  }) => void
  onAddAllPicturesClick?: () => void
  isDraggingImageLibraryItem?: boolean
  isDraggableImageLibraryItem: boolean
  title: string
  isVisible: boolean
  onImageLayoutButtonClick?: () => void
  height?: string
  product?: EulogiseProduct
  slug?: string
  isCollapsed?: boolean
  isShowUnusedImagesButton: boolean
}

export const EXPANDED_IMAGE_LIBRARY_BASE_WIDTH = 300
export const COLLAPSED_IMAGE_LIBRARY_BASE_WIDTH = 56

const StyledUploadPicturesPanel = styled.div<{
  showCursor: boolean
  isCollapsed: boolean
  isFullCollapsed: boolean
  isVisible: boolean
  height?: string
}>`
  background-color: ${COLOR.LITE_GREY};
  display: flex;
  flex-direction: column;
  transition: 0s;
  ${({ showCursor, isCollapsed, isFullCollapsed, isVisible, height }) =>
    `${
      showCursor
        ? `
    cursor: pointer;
    &:hover {
      opacity: .7;
    }`
        : ''
    }
    transition: width 300ms;
    ${
      !isCollapsed
        ? `width: ${EXPANDED_IMAGE_LIBRARY_BASE_WIDTH}px;`
        : `width: ${COLLAPSED_IMAGE_LIBRARY_BASE_WIDTH}px;`
    }
    ${
      !isFullCollapsed
        ? `overflow: hidden;`
        : `width: 0 !important; overflow: hidden;`
    }
    ${!isVisible ? `visibility: hidden;` : ''}
    ${height ? `height: ${height}` : ''}
  `}
`

const StyledImageLibrary = styled(ImageLibrary)<{ $isShow: boolean }>`
  ${({ $isShow = true }) => ($isShow ? `` : `display: none;`)}
`

const UploadPicturesPanel = ({
  isVisible = true,
  slug,
  onImageLayoutButtonClick,
  existingFileHandles,
  onSelectImageClick,
  onImageClick,
  onUnselectImageClick,
  onAddAllPicturesClick,
  isDraggableImageLibraryItem,
  isDraggingImageLibraryItem,
  height = 'auto',
  product,
  isCollapsed = false,
  isShowUnusedImagesButton = false,
}: IUploadPicturePanelProps) => {
  const dispatch = useEulogiseDispatch()
  const [imageLibrarySortBy, setImageLibrarySortBy] =
    useState<EulogiseImageLibrarySortingBy>(
      EulogiseImageLibrarySortingBy.UPLOAD_TIME,
    )
  const [isShowUnusedImages, setIsShowUnusedImages] = useState<boolean>(false)
  const { timelineUploadImagePanelCollapsed } = useSlideshowState()
  const { sortBy, images } = useAssetState()
  const caseState: ICaseState = useCaseState()
  const caseId: string = caseState?.activeItem?.id!
  const customisedImagesOrderIds: Array<string> =
    caseState?.activeItem?.customisedImagesOrderIds
  const isCustomisedImageOrderExisted =
    customisedImagesOrderIds?.length > 0 ?? false

  const sortImages = (newSortBy: EulogiseImageLibrarySortingBy) => {
    if (!newSortBy) {
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.UPLOAD_TIME) {
      dispatch(
        updateImagesOrders({
          newOrderImages: AssetHelper.sortImagesByUpdatedAt(images!),
        }),
      )
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.FILE_NAME) {
      dispatch(
        updateImagesOrders({
          newOrderImages: AssetHelper.sortImagesByFileName(images!),
        }),
      )
      return
    } else if (newSortBy === EulogiseImageLibrarySortingBy.CUSTOMISED) {
      const customisedOrderImages =
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images!,
          customisedImagesOrderIds,
        )
      dispatch(updateImagesOrders({ newOrderImages: customisedOrderImages }))
      return
    }
  }

  useEffect(() => {
    if (!caseId) {
      return
    }
    // Has to invoke fetchCaseById() firstly to get the latest order from database
    dispatch(
      fetchCaseById({
        caseId,
      }),
    )
  }, [caseId, isVisible])

  useEffect(() => {
    if (customisedImagesOrderIds?.length > 0) {
      dispatch(
        fetchAssetsByCaseId({
          caseId,
          assetType: AssetType.IMAGE,
          sortBy: EulogiseImageLibrarySortingBy.CUSTOMISED,
          customisedImagesOrderIds: customisedImagesOrderIds!,
        }),
      )
    } else {
      dispatch(fetchAssetsByCaseId({ caseId, assetType: AssetType.IMAGE }))
    }
    if (
      isVisible &&
      customisedImagesOrderIds?.length > 0 &&
      sortBy === EulogiseImageLibrarySortingBy.CUSTOMISED
    ) {
      setImageLibrarySortBy(EulogiseImageLibrarySortingBy.CUSTOMISED)
    }
  }, [customisedImagesOrderIds, sortBy])

  useEffect(() => {
    if (images?.length > 0) {
      sortImages(imageLibrarySortBy)
    }
  }, [imageLibrarySortBy])

  const toggleImageLibrarySort = () => {
    if (imageLibrarySortBy === EulogiseImageLibrarySortingBy.FILE_NAME) {
      if (!isCustomisedImageOrderExisted) {
        setImageLibrarySortBy(EulogiseImageLibrarySortingBy.UPLOAD_TIME)
        return
      }
      setImageLibrarySortBy(EulogiseImageLibrarySortingBy.CUSTOMISED)
      return
    } else if (
      imageLibrarySortBy === EulogiseImageLibrarySortingBy.UPLOAD_TIME
    ) {
      setImageLibrarySortBy(EulogiseImageLibrarySortingBy.FILE_NAME)
    } else if (
      imageLibrarySortBy === EulogiseImageLibrarySortingBy.CUSTOMISED
    ) {
      setImageLibrarySortBy(EulogiseImageLibrarySortingBy.UPLOAD_TIME)
    }
    sortImages(imageLibrarySortBy)
  }
  const isShowRemoveBackgroundButton = product !== EulogiseProduct.PHOTOBOOK
  const isShowAddAndRemoveButton = product !== EulogiseProduct.PHOTOBOOK
  return (
    <StyledUploadPicturesPanel
      height={height}
      showCursor={timelineUploadImagePanelCollapsed}
      isVisible={isVisible}
      isCollapsed={!!timelineUploadImagePanelCollapsed}
      isFullCollapsed={isCollapsed}
      onMouseDown={(ev) => ev.stopPropagation()}
      onClick={() => {
        if (timelineUploadImagePanelCollapsed) {
          dispatch(updateTimelineUploadImagePanelCollapsed(false))
        }
      }}
    >
      <UploadPicturesPanelHeader
        product={product!}
        slug={slug}
        isCollapsed={!!timelineUploadImagePanelCollapsed}
        onToggleClick={() =>
          dispatch(
            updateTimelineUploadImagePanelCollapsed(
              !timelineUploadImagePanelCollapsed,
            ),
          )
        }
        isShowUnusedImagesButton={isShowUnusedImagesButton}
        onAddAllPicturesClick={onAddAllPicturesClick}
        onImageLayoutButtonClick={onImageLayoutButtonClick}
        onToggleImageSortBy={toggleImageLibrarySort}
        imageLibrarySortBy={imageLibrarySortBy}
        isShowUnusedImages={isShowUnusedImages}
        onShowUnusedImagesClick={() => {
          setIsShowUnusedImages(!isShowUnusedImages)
        }}
      />
      <StyledImageLibrary
        $isShow={!timelineUploadImagePanelCollapsed}
        product={product}
        slug={slug}
        isShowUnusedImages={isShowUnusedImages}
        width={EXPANDED_IMAGE_LIBRARY_BASE_WIDTH}
        isDragging={isDraggingImageLibraryItem!}
        isDraggable={isDraggableImageLibraryItem}
        existingFileHandles={existingFileHandles}
        onSelectImageClick={onSelectImageClick}
        onImageClick={onImageClick!}
        onUnselectImageClick={onUnselectImageClick}
        isShowRemoveBackgroundButton={isShowRemoveBackgroundButton}
        isShowAddAndRemoveButton={isShowAddAndRemoveButton}
      />
    </StyledUploadPicturesPanel>
  )
}

export default UploadPicturesPanel
