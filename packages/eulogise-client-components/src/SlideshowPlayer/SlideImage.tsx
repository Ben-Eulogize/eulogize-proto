import React from 'react'
import styled from 'styled-components'

import ImageLayout from './ImageLayout'
import AnimationSelector from './AnimationSelector'
import { SlideshowHelper } from '@eulogise/helpers'
import { ImageHelper } from '@eulogise/helpers'
import {
  EulogiseImageSize,
  ISlide,
  ISlideImage,
  ISlideshowBorderSettings,
  ISlideshowData,
  ISlideshowTheme,
  ISlideTransitionParams,
} from '@eulogise/core'

const StyledContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`

// @ts-ignore
const StyledAnimation = styled(AnimationSelector)`
  width: 100%;
  height: 100%;
`

const StyledImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface ISlideImageProps {
  slideIndex: number
  caseId: string
  progress?: number
  highRes?: boolean
  slide: ISlide
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slides: Array<ISlide>
  isShowLoading: boolean
  isMp4?: boolean
  transitionParams?: ISlideTransitionParams
  borderScaledFactor?: number
  maxPhotoSize?: EulogiseImageSize
}

const PureSlideImage: React.FunctionComponent<ISlideImageProps> = ({
  slideIndex,
  slide,
  caseId,
  progress,
  slides,
  slideshowData,
  slideshowTheme,
  highRes,
  isShowLoading,
  isMp4,
  transitionParams,
  borderScaledFactor,
  maxPhotoSize,
}) => {
  const slideImage: ISlideImage = SlideshowHelper.getSlideImage({
    slideshowData,
    slideshowTheme,
    slide,
    slideIndex,
  })!
  const slideDuration: number = SlideshowHelper.getSlideDuration({
    slideshowData,
    slideshowTheme,
    slideIndex,
  })
  const borderSettings: ISlideshowBorderSettings =
    SlideshowHelper.getBorderSettings({ slideshowTheme, slideshowData })
  const {
    transitionInData: slideTranInData,
    transitionOutData: slideTranOutData,
  } = SlideshowHelper.getTransitionInOutDataBySlideIndex({
    slideshowData,
    slideshowTheme,
    slideIndex,
  })
  const animationDuration: number = SlideshowHelper.getTotalSlideDuration({
    slideshowData,
    slideshowTheme,
    imageSlideIndex: slideIndex,
  })

  const {
    delay: defaultTransitionInDelay,
    type: defaultTransitionInType,
    duration: defaultTransitionInDuration,
  } = slideTranInData
  const {
    delay: defaultTransitionOutDelay,
    type: defaultTransitionOutType,
    duration: defaultTransitionOutDuration,
  } = slideTranOutData
  // prop data
  const transitionIn = transitionParams?.transitionIn
  const transitionOut = transitionParams?.transitionOut
  const transitionInType = transitionIn?.type ?? defaultTransitionInType
  const transitionOutType = transitionOut?.type ?? defaultTransitionOutType
  const transitionInDelay = transitionIn?.delay ?? defaultTransitionInDelay
  const transitionOutDelay = transitionOut?.delay ?? defaultTransitionOutDelay
  const transitionInDuration =
    transitionIn?.duration ?? defaultTransitionInDuration
  const transitionOutDuration =
    transitionOut?.duration ?? defaultTransitionOutDuration
  const isVideoBier = !!slideshowData.content.isVideoBier

  const animationType =
    transitionParams?.animation ?? isVideoBier
      ? 'alignTopRight'
      : slideImage.animation
  const { inProgress, outProgress, outDelay } =
    SlideshowHelper.getDerivedProgressProps({
      progress,
      slideDuration,
      transitionInDelay: transitionInDelay,
      transitionInDuration: transitionInDuration,
      transitionOutDelay: transitionOutDelay,
    })

  const imageSrc = ImageHelper.getSlideshowImageUrlByCaseId({
    image: slideImage,
    caseId,
    size: isMp4 ? 'LG' : 'MD',
    imageOptions: {
      ...maxPhotoSize,
      resizeMethod: '',
      isFormatToJpg: !slideImage.isRemovedBackgroundImage,
    },
  })

  if (progress === -1) {
    return (
      <StyledImageContainer>
        <ImageLayout
          isVideoBier={isVideoBier}
          isShowLoading={isShowLoading}
          borderSettings={borderSettings}
          src={imageSrc!}
          filter={slideImage.filter}
          borderScaledFactor={borderScaledFactor}
        />
      </StyledImageContainer>
    )
  }
  return (
    <StyledContainer>
      {/* @ts-ignore */}
      <StyledAnimation
        className={`animation-transitionIn type-${transitionInType} inprogress-${inProgress} duration-${transitionInDuration} delay-${transitionInDelay}`}
        type={isVideoBier ? 'fadeIn' : transitionInType}
        duration={transitionInDuration!}
        progress={inProgress}
        highRes={highRes}
        delay={transitionInDelay}
      >
        {/* @ts-ignore */}
        <StyledAnimation
          className={`animation-transitionOut type-${transitionOutType} outprogress-${outProgress} duration-${transitionOutDuration} delay-${outDelay}`}
          type={isVideoBier ? 'fadeOut' : transitionOutType}
          duration={transitionOutDuration!}
          progress={outProgress}
          highRes={highRes}
          delay={outDelay}
        >
          {/* @ts-ignore */}
          <StyledAnimation
            className={`animation-animation type-${animationType} progress-${progress} duration-${animationDuration}`}
            type={animationType!}
            duration={animationDuration}
            highRes={highRes}
            progress={progress}
          >
            <StyledImageContainer>
              <ImageLayout
                isVideoBier={isVideoBier}
                isShowLoading={isShowLoading}
                src={imageSrc!}
                borderSettings={borderSettings}
                filter={slideImage.filter}
                borderScaledFactor={1}
              />
            </StyledImageContainer>
          </StyledAnimation>
        </StyledAnimation>
      </StyledAnimation>
    </StyledContainer>
  )
}

export const SlideImage = React.memo(PureSlideImage)
