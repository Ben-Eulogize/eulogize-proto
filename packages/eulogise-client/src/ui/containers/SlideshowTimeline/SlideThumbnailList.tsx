import React, { useState } from 'react'
import styled from 'styled-components'
import {
  DragAndDropCollection,
  ISlide,
  ISlideGroup,
  ISlideshowData,
  ISlideshowTheme,
  ISlideTransitionParams,
  IAssetState,
} from '@eulogise/core'
import SlideThumbnail, { DraggableSlideThumbnail } from './SlideThumbnail'
import { EditSlideModal } from '../Modal/EditSlideModal/EditSlideModal'
import { useAssetState } from '../../store/hooks'

interface ISlideThumbnailListProps {
  caseId: string
  slides: Array<ISlide>
  onRemoveSlideClick: (slide: ISlide) => void
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideGroups: Array<ISlideGroup>
  onThumbnailMouseEnter: (slideIndex: number) => void
  hoveringThumbnailIndex: number
  onEditStartTitleSlideClick: () => void
  onDisableStartTitleSlideClick: () => void
  onEditEndTitleSlideClick: () => void
  onDisableEndTitleSlideClick: () => void
  onSlideUpdate: (params: ISlideTransitionParams) => void
  onEditSlideModalOpen: () => void
  onEditSlideModalClose: () => void
  scaledThumbnailWidth?: number
}

const StyledSlideThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SlideThumbnailList: React.FunctionComponent<ISlideThumbnailListProps> = ({
  caseId,
  slides,
  onRemoveSlideClick,
  slideshowData,
  slideshowTheme,
  slideGroups,
  onThumbnailMouseEnter,
  hoveringThumbnailIndex,
  onEditStartTitleSlideClick,
  onDisableStartTitleSlideClick,
  onEditEndTitleSlideClick,
  onDisableEndTitleSlideClick,
  onSlideUpdate,
  onEditSlideModalOpen,
  onEditSlideModalClose,
  scaledThumbnailWidth,
}) => {
  let hasStartTitleSlide: boolean = false
  const [mobileSelectedImageIndex, setMobileSelectedImageIndex] = useState<
    ISlideGroup | undefined
  >(undefined)
  const { isUploadingEditedImage }: IAssetState = useAssetState()
  const displaySlideGroups = slideGroups.filter((sg, index) => {
    // Title slide
    if (index === 0) {
      hasStartTitleSlide = !!sg.titleSlide?.isTitleSlideEnable
      return hasStartTitleSlide
    }
    // End Title Slide
    if (index === slideGroups.length - 1) {
      return !!sg.titleSlide?.isTitleSlideEnable
    }
    return sg.imageSlide?.image
  })
  const [tooltipSlideIndex, setTooltipSlideIndex] = useState<number>()
  if (
    (hasStartTitleSlide && hoveringThumbnailIndex > 0) ||
    (!hasStartTitleSlide && hoveringThumbnailIndex >= 0)
  ) {
    const hasEmpty: boolean = !!displaySlideGroups.find((s) => s.isEmpty)
    if (!hasEmpty) {
      displaySlideGroups.splice(hoveringThumbnailIndex, 0, {
        id: 'empty',
        isEmpty: true,
      })
    }
  }

  return (
    <StyledSlideThumbnailList id="slide-thumbnail-list">
      {displaySlideGroups.map((slideGroup: ISlideGroup, slideIndex: number) => {
        const isStartTitleSlide = slideGroup.imageSlideIndex === 1
        const isEndTitleSlide = slideGroup.id === 'end-title-slide'
        const SlideThumbnailComponent =
          isStartTitleSlide || isEndTitleSlide || isUploadingEditedImage
            ? SlideThumbnail
            : DraggableSlideThumbnail
        return (
          <SlideThumbnailComponent
            index={slideIndex}
            imageSlideIndex={slideIndex}
            onMouseEnter={() => {
              setTooltipSlideIndex(slideIndex)
              onThumbnailMouseEnter(slideIndex)
            }}
            onMouseLeave={() => {
              setTooltipSlideIndex(undefined)
            }}
            onEditStartTitleSlideClick={() => onEditStartTitleSlideClick()}
            onDisableStartTitleSlideClick={onDisableStartTitleSlideClick}
            onEditEndTitleSlideClick={() => onEditEndTitleSlideClick()}
            onDisableEndTitleSlideClick={onDisableEndTitleSlideClick}
            onSlideSettingsClick={() => {
              // onSlideSettingsClick({ slideGroup, slideIndex })
              setMobileSelectedImageIndex(slideGroup)
            }}
            isStartTitleSlide={isStartTitleSlide}
            isEndTitleSlide={isEndTitleSlide}
            collection={DragAndDropCollection.SLIDE}
            key={slideGroup.id}
            caseId={caseId}
            isEmpty={slideGroup.isEmpty!}
            slide={slideGroup.imageSlide!}
            slides={slides}
            isSlideTitleEnabled={!!slideGroup.titleSlide?.isTitleSlideEnable}
            slideshowData={slideshowData}
            slideIndex={slideGroup.imageSlideIndex!}
            onRemoveSlideClick={onRemoveSlideClick}
            slideNumber={hasStartTitleSlide ? slideIndex : slideIndex + 1}
            /*onEditTitleSlideClick={() => onEditTitleSlideClick(slideIndex * 2)}*/
            isOpenTooltip={tooltipSlideIndex === slideIndex}
            scaledThumbnailWidth={scaledThumbnailWidth}
          />
        )
      })}
      {/*
      <AddSlideThumbnailListItem
        onMouseEnter={() => onThumbnailMouseEnter(slides.length)}
      />
*/}
      {!!mobileSelectedImageIndex && (
        <EditSlideModal
          onClose={() => {
            onEditSlideModalClose()
            setMobileSelectedImageIndex(undefined)
          }}
          onOpen={onEditSlideModalOpen}
          onApply={(params: ISlideTransitionParams) => {
            setMobileSelectedImageIndex(undefined)
            onSlideUpdate({
              ...params,
              slideIndex: mobileSelectedImageIndex.imageSlideIndex,
            })
          }}
          slideGroup={mobileSelectedImageIndex}
          caseId={caseId}
          slideshowData={slideshowData}
          slideshowTheme={slideshowTheme}
        />
      )}
    </StyledSlideThumbnailList>
  )
}

export default SlideThumbnailList
