import React from 'react'
import { SlideshowHelper } from '@eulogise/helpers'
import { SlidePlayer } from './SlidePlayer'
import {
  CardProductViewDisplayMode,
  ICardProductData,
  ICardProductTheme,
  ISlideshowData,
  ISlideshowTheme,
} from '@eulogise/core'

interface IPureSlideshowPlayerProps {
  slideshowData: ISlideshowData
  cardProduct?: ICardProductData
  cardProductTheme: ICardProductTheme
  slideshowTheme: ISlideshowTheme
  progress: number
  caseId: string
  isShowLoading: boolean
  isMp4?: boolean
  scale?: number
  slideshowTitleSlideUrl?: string
}

export const PureSlideshowPlayer = ({
  slideshowData,
  cardProduct,
  cardProductTheme,
  slideshowTheme,
  progress,
  caseId,
  isShowLoading,
  isMp4,
  scale,
  slideshowTitleSlideUrl,
}: IPureSlideshowPlayerProps) => {
  const activeSlideIndexes: Array<number> =
    SlideshowHelper.getActiveSlideIndexesByProgress({
      slideProgress: progress,
      slideshowTheme,
      slideshowData,
    })

  return (
    <div>
      {activeSlideIndexes.map((activeSlideIndex: number) => {
        const slideProgress: number = SlideshowHelper.getSlideProgress({
          slideshowData,
          slideshowTheme,
          currentSlideshowProgress: progress,
          slideIndex: activeSlideIndex,
        })

        return (
          <SlidePlayer
            key={activeSlideIndex}
            slideshowData={slideshowData}
            slideshowTheme={slideshowTheme}
            cardProductTheme={cardProductTheme}
            cardProduct={cardProduct}
            slideIndex={activeSlideIndex}
            caseId={caseId}
            progress={slideProgress}
            fadeInAndOut
            isShowLoading={isShowLoading}
            isMp4={isMp4}
            scale={scale}
            displayMode={CardProductViewDisplayMode.GENERATE_VIDEO}
            slideshowTitleSlideUrl={slideshowTitleSlideUrl}
            slideshowProgress={progress}
          />
        )
      })}
    </div>
  )
}
