import React from 'react'
import styled from 'styled-components'

import { FadeIn, FadeOut } from './animations'
import ImageLayout from './ImageLayout'
import { ImageHelper, SlideshowHelper } from '@eulogise/helpers'
import {
  IAnimationEasing,
  ISlide,
  ISlideBackground,
  ISlideshowData,
  ISlideshowTheme,
} from '@eulogise/core'

const StyledContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledBackground = styled.div<{
  blurred?: boolean | [boolean]
  color?: string
}>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  & img {
    width: 100%;
  }
  ${({ blurred }) =>
    blurred
      ? `
    filter: blur(10px);
    transform: scale(1.2);
  `
      : `
    filter: none;
    transform: scale(1);
  `}
`

interface ISlideBackgroundProps {
  progress?: number
  slideIndex: number
  fadeInAndOut?: boolean
  caseId: string
  slide: ISlide
  slides: Array<ISlide>
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  isShowLoading?: boolean
  isMp4?: boolean
}

export const SlideBackground: React.FunctionComponent<
  ISlideBackgroundProps
> = ({
  progress,
  slideIndex,
  slideshowData,
  slideshowTheme,
  slides,
  fadeInAndOut = true,
  caseId,
  slide,
  isShowLoading,
  isMp4,
}) => {
  const slideBackground: ISlideBackground = SlideshowHelper.getSlideBackground({
    slideshowData,
    slideshowTheme,
    slides,
    slide,
    slideIndex,
  })
  const { transitionInData, transitionOutData } =
    SlideshowHelper.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex,
    })
  const transitionInDuration: number = transitionInData.duration
  const slideDuration: number = SlideshowHelper.getSlideDuration({
    slideshowData,
    slideshowTheme,
    slideIndex,
  })
  const { inProgress, outProgress, outDelay } =
    SlideshowHelper.getDerivedProgressProps({
      progress,
      slideDuration,
      transitionInDelay: 0,
      transitionInDuration,
      transitionOutDelay: 0,
    })
  const endTitleSlide: boolean = slides.length - 1 === slideIndex

  const content = (
    <StyledBackground
      color={slideBackground.color}
      blurred={slideBackground.blurred}
    >
      {slideBackground.image && (
        <ImageLayout
          isShowLoading={!!isShowLoading}
          // @ts-ignore
          src={ImageHelper.getSlideshowImageUrlByCaseId({
            image: slideBackground.image,
            caseId,
            size: isMp4 ? 'LG' : 'MD',
          })}
          isBackground
          filter={slideBackground.filter}
          blurred={slideBackground.blurred}
        />
      )}
    </StyledBackground>
  )

  if (fadeInAndOut) {
    return (
      <StyledContainer>
        <FadeIn
          duration={transitionInDuration}
          progress={inProgress}
          easing={IAnimationEasing.EASE_OUT_QUART}
        >
          <FadeOut
            duration={transitionOutData.duration}
            progress={outProgress}
            delay={outDelay}
            easing={IAnimationEasing.EASE_IN_QUART}
          >
            {content}
          </FadeOut>
        </FadeIn>
      </StyledContainer>
    )
  }
  if (endTitleSlide) {
    return (
      <StyledContainer>
        <FadeIn
          duration={transitionInDuration}
          progress={inProgress}
          easing={IAnimationEasing.EASE_OUT_QUART}
        >
          {content}
        </FadeIn>
      </StyledContainer>
    )
  }

  return <StyledContainer>{content}</StyledContainer>
}
