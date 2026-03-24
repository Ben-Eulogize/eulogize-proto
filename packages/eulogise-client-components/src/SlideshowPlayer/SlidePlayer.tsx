import React from 'react'
import styled from 'styled-components'
import { SlideBackground } from './SlideBackground'
import { SlideImage } from './SlideImage'
import {
  CardProductViewDisplayMode,
  EulogiseImageSize,
  ICardProductData,
  ICardProductTheme,
  ISlide,
  ISlideshowBackground,
  ISlideshowData,
  ISlideshowTheme,
  ISlideTransitionParams,
} from '@eulogise/core'
import { SlideshowHelper, ImageHelper } from '@eulogise/helpers'
import { TitleSlidePlayer } from './TitleSlidePlayer'
// import { SLIDESHOW_FILTERS } from '@eulogise/client-core'

interface ISlidePlayerProps {
  caseId: string
  slideIndex: number
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  progress?: number
  fadeInAndOut?: boolean
  isShowLoading?: boolean
  isMp4?: boolean
  cardProductTheme: ICardProductTheme
  cardProduct?: ICardProductData
  scale?: number
  imageTransitionParams?: ISlideTransitionParams
  borderScaledFactor?: number
  displayMode?: CardProductViewDisplayMode
  slideshowTitleSlideUrl?: string
  maxPhotoSize?: EulogiseImageSize
  slideshowProgress: number
  isThumbnail?: boolean
}

const BackgroundImage = styled.img<{
  blur?: boolean
  filterCss: any
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  ${({ blur, filterCss }) => `
  ${blur && `filter: blur(10px);`}
  ${filterCss}
`}
`

export const SlidePlayer: React.FC<ISlidePlayerProps> = React.memo(
  ({
    caseId,
    isThumbnail = false,
    slideIndex,
    slideshowData,
    slideshowTheme,
    progress,
    cardProduct,
    cardProductTheme,
    fadeInAndOut,
    isShowLoading = false,
    isMp4,
    scale,
    imageTransitionParams,
    borderScaledFactor,
    displayMode = CardProductViewDisplayMode.PREVIEW,
    slideshowTitleSlideUrl,
    maxPhotoSize,
    slideshowProgress,
  }) => {
    const slides: Array<ISlide> =
      SlideshowHelper.getSlidesBySlideshowData(slideshowData)

    // start title slide or end title slide
    if (slideIndex === 0 || slides.length - 1 === slideIndex) {
      return (
        <TitleSlidePlayer
          slideshowData={slideshowData}
          slideshowTheme={slideshowTheme}
          cardProduct={cardProduct!}
          cardProductTheme={cardProductTheme}
          progress={progress!}
          scale={
            displayMode === CardProductViewDisplayMode.GENERATE_VIDEO
              ? 1
              : scale
          }
          slideIndex={slideIndex}
          displayMode={displayMode}
          slideshowTitleSlideUrl={slideshowTitleSlideUrl}
        />
      )
    }

    // const filter = SlideshowHelper.getImageFilter(slideshowData)

    const slide: ISlide | null =
      slideIndex !== undefined ? slides[slideIndex] : null
    const slideshowBackground: ISlideshowBackground =
      SlideshowHelper.getSlideshowBackground(slideshowTheme)

    const customedBackground = slideshowData.content.slideshowBackground
    const newSlideshowBackground: ISlideshowBackground = customedBackground
      ? Object.keys(customedBackground).length > 0
        ? customedBackground
        : slideshowBackground
      : slideshowBackground
    const backgroundImageUrl = ImageHelper.getSlideshowImageUrlByCaseId({
      image: newSlideshowBackground?.image!,
      caseId,
      size: isMp4 ? 'LG' : 'MD',
      options: { isStaticAssets: true },
    })

    const isTitleSlideFullyDisplay: boolean =
      SlideshowHelper.isTitleSlideFullyDisplayed({
        slideshowData,
        slideshowTheme,
        slideshowProgress,
      })
    const isShowBackgroundImage = isThumbnail
      ? SlideshowHelper.isShowBackgroundImage(slideshowTheme)
      : isTitleSlideFullyDisplay &&
        SlideshowHelper.isShowBackgroundImage(slideshowTheme)

    return (
      <>
        {isShowBackgroundImage && newSlideshowBackground?.image && (
          <BackgroundImage
            src={backgroundImageUrl}
            blur={slideshowBackground?.blurred}
            alt=""
            // filterCss={(SLIDESHOW_FILTERS as any)[filter]}
            filterCss=""
          />
        )}
        {slide && (
          <SlideBackground
            slideIndex={slideIndex}
            slideshowTheme={slideshowTheme}
            slide={slide}
            slides={slides}
            slideshowData={slideshowData}
            caseId={caseId}
            progress={progress}
            fadeInAndOut={fadeInAndOut}
            isShowLoading={isShowLoading}
            isMp4={isMp4}
          />
        )}
        {slide?.image && (
          <SlideImage
            slideIndex={slideIndex}
            slides={slides}
            slideshowData={slideshowData}
            slideshowTheme={slideshowTheme}
            slide={slide}
            caseId={caseId}
            progress={progress}
            isShowLoading={isShowLoading}
            isMp4={isMp4}
            transitionParams={imageTransitionParams}
            borderScaledFactor={borderScaledFactor}
            maxPhotoSize={maxPhotoSize}
          />
        )}
      </>
    )
  },
)
