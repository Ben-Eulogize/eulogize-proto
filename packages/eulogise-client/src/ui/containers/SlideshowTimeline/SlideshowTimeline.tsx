import React from 'react'
import styled from 'styled-components'
import SlideThumbnailList from './SlideThumbnailList'
import {
  ISlide,
  ISlideGroup,
  ISlideshowData,
  ISlideshowTheme,
  ISlideTransitionParams,
} from '@eulogise/core'
import EmptyThumbnailList from './EmptyThumbnailList'
import { SlideshowHelper } from '@eulogise/helpers'
const StyledSlideshowTimeline = styled.div``

interface ISlideshowTimelineProps {
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

const SlideshowTimeline: React.FunctionComponent<ISlideshowTimelineProps> = ({
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
  const hasActiveSlide: boolean =
    SlideshowHelper.getTotalActiveImageSlides(slideshowData) > 0

  return (
    <StyledSlideshowTimeline>
      {!hasActiveSlide && (
        <EmptyThumbnailList onMouseEnter={() => onThumbnailMouseEnter(0)} />
      )}
      {hasActiveSlide && (
        <SlideThumbnailList
          onRemoveSlideClick={onRemoveSlideClick}
          onEditSlideModalOpen={onEditSlideModalOpen}
          onEditSlideModalClose={onEditSlideModalClose}
          slides={slides}
          caseId={caseId}
          onSlideUpdate={onSlideUpdate}
          onThumbnailMouseEnter={onThumbnailMouseEnter}
          slideshowData={slideshowData}
          slideshowTheme={slideshowTheme}
          slideGroups={slideGroups}
          hoveringThumbnailIndex={hoveringThumbnailIndex}
          onEditStartTitleSlideClick={onEditStartTitleSlideClick}
          onDisableStartTitleSlideClick={onDisableStartTitleSlideClick}
          onEditEndTitleSlideClick={onEditEndTitleSlideClick}
          onDisableEndTitleSlideClick={onDisableEndTitleSlideClick}
          scaledThumbnailWidth={scaledThumbnailWidth}
        />
      )}
    </StyledSlideshowTimeline>
  )
}

export default SlideshowTimeline
