import React from 'react'
import styled from 'styled-components'
import { SlideshowHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'
import { ISlideshowData, ModalId } from '@eulogise/core'
import { showModalAction } from '../../store/ModalState/actions'
import { useEulogiseDispatch } from '../../store/hooks'
import {
  TIMELINE_VERY_FAST_SLIDE_TEXT,
  TIMELINE_VERY_SLOW_SLIDE_TEXT,
} from '@eulogise/helpers/src/SlideshowHelper'

type ISlideWarningProps = {
  slideshowData: ISlideshowData
  className?: string
}

const StyledSlideWarning = styled.div`
  color: ${COLOR.RED};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    opacity: 0.7;
  }
  padding-bottom: 1.4rem;
`

export const SlideWarning = ({
  className,
  slideshowData,
}: ISlideWarningProps) => {
  const dispatch = useEulogiseDispatch()
  const isVerySlowSlide = SlideshowHelper.isVerySlowSlide(slideshowData)
  const isVeryFastSlide = SlideshowHelper.isVeryFastSlide(slideshowData)
  const showWarningText =
    !slideshowData || (!isVerySlowSlide && !isVeryFastSlide)
  if (showWarningText) {
    return null
  }
  return (
    <StyledSlideWarning
      className={className}
      onClick={() => {
        dispatch(showModalAction(ModalId.AUDIO_SETTINGS))
      }}
    >
      {isVerySlowSlide && TIMELINE_VERY_SLOW_SLIDE_TEXT}
      {isVeryFastSlide && TIMELINE_VERY_FAST_SLIDE_TEXT}
    </StyledSlideWarning>
  )
}
