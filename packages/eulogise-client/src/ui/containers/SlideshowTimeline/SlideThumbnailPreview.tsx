import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  EulogiseProduct,
  ICardProductState,
  ISlide,
  ISlideshowBackground,
  ISlideshowData,
  ISlideTransitionParams,
  PAGE_SIZES,
} from '@eulogise/core'
import CSS from 'csstype'
import { SlideshowHelper } from '@eulogise/helpers'
import { SortableHandle } from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { ProgressBar, Spin, Tooltip } from '@eulogise/client-components'
import { SlidePlayer } from '../../../../../eulogise-client-components/src/SlideshowPlayer/SlidePlayer'
import {
  useProductState,
  useSlideshowState,
  useSlideshowTitleSlideState,
} from '../../store/hooks'
import { useRef } from 'react/index'
import { loadCardProductsFonts } from '../../store/CardProduct/actions'

interface ISlideThumbnailPreviewProps {
  caseId: string
  slideIndex: number
  slide: ISlide
  slideshowData: ISlideshowData
  isTitleSlide: boolean
  isEndTitleSlide: boolean
  isOpenTooltip: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  width?: CSS.Property.Width
  isPlay?: boolean
  onStop?: () => void
  isPlayOnHover?: boolean
  imageTransitionParams: ISlideTransitionParams
  scaledThumbnailWidth?: number
  isLoading?: boolean
}

const ANIMATION_RESET_DELAY = 200
const BORDER_SIZE = 3
const Thumbnail = styled.div<{
  $backgroundColor?: string
  $width: CSS.Property.Width
  $height: CSS.Property.Height
  $isPlayOnHover?: boolean
}>`
  position: relative;
  background-color: whitesmoke;
  overflow: hidden;
  div:hover > &:before {
    content: ' ';
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    border: ${BORDER_SIZE}px solid ${COLOR.DARK_BLUE};
  }
  div > &&&&:before {
    ${({ $isPlayOnHover }) => (!$isPlayOnHover ? `border-width: 0;` : '')}
  }
  ${({ $backgroundColor, $width, $height }) => `
    ${$backgroundColor ? `background-color: ${$backgroundColor};` : ''};
    ${$width ? `width: ${$width};` : ''};
    ${$height ? `height: ${$height};` : ''};
  `}
`

const StyledProgressBar = styled(ProgressBar)`
  position: absolute;
  z-index: 3;
  left: 0;
  bottom: 0;
`

let animationTimeout: any

const SlideThumbnailPreview: React.FunctionComponent<
  ISlideThumbnailPreviewProps
> = ({
  caseId,
  slideIndex,
  slideshowData,
  isTitleSlide,
  isEndTitleSlide,
  onMouseEnter,
  onMouseLeave,
  isPlayOnHover = true,
  isPlay,
  onStop,
  width,
  imageTransitionParams,
  scaledThumbnailWidth,
  isLoading = false,
}) => {
  const { activeProductTheme } = useProductState({
    product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
  }) as ICardProductState
  const { activeSlideshowTheme: slideshowTheme } = useSlideshowState()
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const isMouseEnterRef = useRef(false)

  const slideshowBackground: ISlideshowBackground =
    SlideshowHelper.getSlideshowBackground(slideshowTheme!)

  const { activeItem: slideshowTitleSlideData } = useSlideshowTitleSlideState()

  const slideAndTransitionDuration: number =
    SlideshowHelper.getTotalSlideDuration({
      slideshowData,
      slideshowTheme: slideshowTheme!,
      imageSlideIndex: isTitleSlide
        ? 0
        : isEndTitleSlide
        ? slideshowData.content.slides.length - 1
        : slideIndex,
    })

  useEffect(() => {
    loadCardProductsFonts()
  }, [])

  useEffect(() => {
    if (isPlay) {
      onPlayAnimation()
    } else {
      onStopAnimation()
    }
  }, [isPlay])

  const onStopAnimation = () => {
    setIsAnimating(false)
    if (onStop) {
      onStop()
    }

    if (animationTimeout) {
      clearTimeout(animationTimeout)
    }
  }

  const onPlayAnimation = () => {
    setIsAnimating(true)
    animationTimeout = setTimeout(
      onStopAnimation,
      slideAndTransitionDuration + ANIMATION_RESET_DELAY,
    )
  }

  const progress: number | undefined = isAnimating ? undefined : -1

  const defaultThumbnailWidth = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_WIDTH as string).replace('px', ''),
    10,
  )
  const defaultThumbnailHeight = parseInt(
    (STYLE.SLIDESHOW_THUMBNAIL_HEIGHT as string).replace('px', ''),
    10,
  )

  const thumbnailWidth =
    scaledThumbnailWidth ??
    parseInt(
      ((width ?? STYLE.SLIDESHOW_THUMBNAIL_WIDTH) as string).replace('px', ''),
      10,
    )
  const slideshowTitleSlideToThumbnailScale =
    thumbnailWidth / PAGE_SIZES.SLIDESHOW_TITLE_SLIDE[0]
  const thumbnailScaledFactor = thumbnailWidth / defaultThumbnailWidth
  const thumbnailHeight = thumbnailScaledFactor * defaultThumbnailHeight

  const mouseEnter = () => {
    if (!isPlayOnHover) {
      return
    }
    if (isMouseEnterRef.current === true) {
      return
    }
    isMouseEnterRef.current = true
    setTimeout(() => {
      if (isMouseEnterRef.current === true) {
        onPlayAnimation()
      }
    }, 300)
    onMouseEnter()
  }
  const mouseLeave = () => {
    if (!isPlayOnHover) {
      return
    }
    isMouseEnterRef.current = false
    onStopAnimation()
    onMouseLeave()
  }

  return (
    <Tooltip title="Drag image to change order" zIndex={9999}>
      <Thumbnail
        $width={`${thumbnailWidth}px`}
        $height={`${thumbnailHeight}px`}
        $isPlayOnHover={isPlayOnHover}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onTouchStart={mouseEnter}
        onTouchEnd={mouseLeave}
        $backgroundColor={
          isTitleSlide || isEndTitleSlide || isLoading
            ? undefined
            : slideshowBackground?.color
        }
      >
        {isLoading ? (
          <Spin />
        ) : (
          <SlidePlayer
            isThumbnail
            maxPhotoSize={{
              width: STYLE.THUMBNAIL_IMAGE_SIZE as number,
              height: STYLE.THUMBNAIL_IMAGE_SIZE as number,
            }}
            progress={progress}
            slideshowData={slideshowData}
            slideshowTheme={slideshowTheme!}
            cardProductTheme={activeProductTheme!}
            cardProduct={slideshowTitleSlideData!}
            slideIndex={
              isTitleSlide
                ? 0
                : isEndTitleSlide
                ? slideshowData?.content?.slides?.length - 1
                : slideIndex
            }
            caseId={caseId}
            fadeInAndOut={false}
            isMp4={true}
            scale={
              isTitleSlide || isEndTitleSlide
                ? slideshowTitleSlideToThumbnailScale
                : 1
            }
            imageTransitionParams={imageTransitionParams}
            borderScaledFactor={thumbnailScaledFactor}
          />
        )}

        {isAnimating && (
          <StyledProgressBar duration={slideAndTransitionDuration} />
        )}
      </Thumbnail>
    </Tooltip>
  )
}

export default React.memo(SortableHandle(SlideThumbnailPreview))
