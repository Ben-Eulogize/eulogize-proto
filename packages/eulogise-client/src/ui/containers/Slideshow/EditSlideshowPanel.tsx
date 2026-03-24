import React from 'react'
import styled from 'styled-components'
import UploadPicturesPanel from '../Dashboard/UploadPicturesPanel/UploadPicturesPanel'
import TimelinePanel from '../Dashboard/TimelinePanel'
import {
  EulogiseProduct,
  IImageAsset,
  ISlide,
  ISlideGroup,
  ISlideshowData,
  ISlideshowDataContent,
  ISlideshowTheme,
  ISlideTransitionParams,
  ModalId,
} from '@eulogise/core'
import { STYLE } from '@eulogise/client-core'
import { SortableContainer } from '@eulogise/client-components'
import { useModalState } from '../../store/hooks'

const StyledEditSlideshowPanel = styled.div<{ $isShow: boolean }>`
  display: flex;
  height: calc(100vh - ${STYLE.HEADER_HEIGHT});
  overflow-y: hidden;
  ${({ $isShow }) =>
    $isShow === undefined || $isShow === true
      ? ``
      : `display: none !important;`}
`

interface IEditSlideshowPanelProps {
  className?: string
  slides: Array<ISlide>
  onAddImage: (image: IImageAsset) => void
  onToggleImage: (props: {
    image: IImageAsset
    event: MouseEvent
    isSelected: boolean
  }) => void
  onRemoveImage: (image: IImageAsset) => void
  onAddAllImages: () => void
  onRemoveSlide: (slide: ISlide) => void
  caseId: string
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideGroups: Array<ISlideGroup>
  onThumbnailMouseEnter: (slideIndex: number) => void
  onTimelineMouseEnter: () => void
  onTimelineMouseLeave: () => void
  hoveringThumbnailIndex: number
  isDraggingImageLibraryItem: boolean
  isDraggingASlide: boolean
  undoContentList: Array<ISlideshowDataContent>
  redoContentList: Array<ISlideshowDataContent>
  onSlideUpdate: (params: ISlideTransitionParams) => void
  onEditSlideModalOpen: () => void
  onEditSlideModalClose: () => void
  isShow: boolean
}

const EditSlideshowPanel = ({
  className,
  slides,
  onAddImage,
  onRemoveImage,
  onToggleImage,
  onAddAllImages,
  onRemoveSlide,
  caseId,
  slideshowData,
  slideshowTheme,
  slideGroups,
  onThumbnailMouseEnter,
  onTimelineMouseLeave,
  onSlideUpdate,
  hoveringThumbnailIndex,
  isDraggingImageLibraryItem,
  isDraggingASlide,
  onEditSlideModalOpen,
  onEditSlideModalClose,
  onTimelineMouseEnter,
  isShow,
}: IEditSlideshowPanelProps) => {
  const { openModalIds } = useModalState()
  if (openModalIds?.includes(ModalId.SLIDESHOW_PREVIEW)) {
    return <div>Disabled to test preview performance</div>
  }
  if (!slideshowData) {
    return null
  }
  return (
    <StyledEditSlideshowPanel
      className={className}
      id="edit-slideshow-panel"
      $isShow={isShow}
    >
      <UploadPicturesPanel
        title=""
        existingFileHandles={slides.map((s) => s.image?.filestackHandle)}
        onSelectImageClick={onAddImage}
        onImageClick={onToggleImage}
        onUnselectImageClick={onRemoveImage}
        onAddAllPicturesClick={onAddAllImages}
        isDraggingImageLibraryItem={isDraggingImageLibraryItem}
        isDraggableImageLibraryItem
        isShowUnusedImagesButton
        product={EulogiseProduct.SLIDESHOW}
      />

      <TimelinePanel
        onThumbnailMouseEnter={onThumbnailMouseEnter}
        onTimelineMouseEnter={onTimelineMouseEnter}
        onTimelineMouseLeave={onTimelineMouseLeave}
        onEditSlideModalOpen={onEditSlideModalOpen}
        onEditSlideModalClose={onEditSlideModalClose}
        onSlideUpdate={onSlideUpdate}
        onRemoveSlideClick={onRemoveSlide}
        slideshowData={slideshowData}
        slideshowTheme={slideshowTheme}
        slides={slides}
        caseId={caseId}
        slideGroups={slideGroups}
        hoveringThumbnailIndex={hoveringThumbnailIndex}
        isDraggingASlide={isDraggingASlide}
      />
    </StyledEditSlideshowPanel>
  )
}

export default SortableContainer(EditSlideshowPanel)
