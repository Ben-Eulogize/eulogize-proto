import React from 'react'
import {
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
  ISlideshowData,
  ISlideshowTheme,
} from '@eulogise/core'
import styled from 'styled-components'
import { SlideshowHelper } from '@eulogise/helpers'
import { CardProductPreview } from '../CardProductPage'
import AnimationSelector from './AnimationSelector'

const StyledTitleSlidePlayer = styled.div<{ $scale?: number }>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  ${({ $scale }) =>
    $scale
      ? `
    transform: scale(calc(${$scale}));
    transform-origin: top;
  `
      : ''}
`

// @ts-ignore
const StyledAnimation = styled(AnimationSelector)`
  width: 100%;
  height: 100%;
`

// @ts-ignore
const TitleSlidePlayerBackground = styled(AnimationSelector)`
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
`

type ITitleSlidePlayerProps = {
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  cardProduct: ICardProductData
  cardProductTheme: ICardProductTheme
  progress: number
  scale?: number
  slideIndex: number
  displayMode?: CardProductViewDisplayMode
  slideshowTitleSlideUrl?: string
}

const StyledGeneratorTitleSlideImage = styled.img`
  width: 100%;
  height: 100%;
`

export const TitleSlidePlayer = ({
  progress,
  slideshowData,
  slideshowTheme,
  cardProduct,
  cardProductTheme,
  scale = 1,
  slideIndex,
  slideshowTitleSlideUrl,
  displayMode = CardProductViewDisplayMode.PREVIEW,
}: ITitleSlidePlayerProps) => {
  if (!cardProduct?.content) {
    return null
  }
  const product = EulogiseProduct.TV_WELCOME_SCREEN
  const { transitionInData, transitionOutData } =
    SlideshowHelper.getTransitionInOutDataBySlideIndex({
      slideshowData,
      slideshowTheme,
      slideIndex,
    })

  const {
    delay: transitionInDelay,
    type: transitionInType,
    duration: transitionInDuration,
  } = transitionInData
  const {
    // delay: transitionOutDelay,
    type: transitionOutType,
    //      duration: transitionOutDuration,
  } = transitionOutData
  const transitionOutDuration = 1500

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
      transitionInDuration: transitionInDuration!,
      transitionOutDelay: 0,
    })

  const cardProductPreview = slideshowTitleSlideUrl ? (
    <StyledGeneratorTitleSlideImage src={slideshowTitleSlideUrl} />
  ) : (
    <CardProductPreview
      cardProduct={cardProduct}
      productTheme={cardProductTheme}
      product={product}
      displayMode={displayMode}
      containerRef={null}
    />
  )

  return (
    <>
      {transitionInType === 'fadeInBlack' && (
        <TitleSlidePlayerBackground
          type="fadeOut"
          duration={transitionInDuration!}
          progress={inProgress}
          delay={transitionInDelay}
        />
      )}
      {transitionOutType === 'fadeOutBlack' && (
        <TitleSlidePlayerBackground
          type="fadeIn"
          duration={transitionOutDuration!}
          progress={outProgress}
          delay={outDelay}
        />
      )}
      <StyledTitleSlidePlayer $scale={scale}>
        {progress === -1 ? (
          cardProductPreview
        ) : (
          /* @ts-ignore */
          <StyledAnimation
            type={transitionInType}
            duration={transitionInDuration!}
            progress={inProgress}
            delay={transitionInDelay}
          >
            {/* @ts-ignore */}
            <StyledAnimation
              type={transitionOutType}
              duration={transitionOutDuration}
              progress={outProgress}
              delay={outDelay}
            >
              {cardProductPreview}
            </StyledAnimation>
          </StyledAnimation>
        )}
      </StyledTitleSlidePlayer>
    </>
  )
}
