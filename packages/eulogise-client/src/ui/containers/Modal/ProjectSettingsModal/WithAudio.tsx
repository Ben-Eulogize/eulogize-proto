import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  DateTimeHelper,
  VERY_FAST_SLIDE_DURATION_THRESHOLD,
  VERY_FAST_SLIDES_WARNING_TEXT,
  SLOW_SLIDE_WARNING_TEXT_WITH_AUDIOS,
  SLOW_SLIDE_DURATION_THRESHOLD,
  SlideshowHelper,
  VIDEO_CANNOT_EXCEED_LIMIT_TEXT,
} from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'

interface IWithAudioProps {
  totalImageSlides: number
  audioLength: number
  totalTileSlides: number
  noOfSelectedAudios: number
}

const WithAudioIntro = styled.div`
  margin-bottom: 2rem;
`

const WithAudioWarning = styled.div`
  margin-bottom: 2rem;
  color: ${COLOR.RED};
  text-align: center;
`

const WithAudioItem = styled.div`
  width: 100%;
`
const WithAudioItemCell = styled.div`
  width: 50%;
`

const WithAudioItemRow = styled.div`
  padding: 0.2rem 0;
  display: flex;
  & > ${WithAudioItemCell} {
    width: 50%;
    max-width: 10rem;
  }
`

const StyledWithAudio = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.LITE_GREY};
`

const WithAudio: React.FC<IWithAudioProps> = ({
  totalImageSlides,
  audioLength,
  noOfSelectedAudios = 0,
  totalTileSlides = 0,
}) => {
  const containerRef = useRef()
  const slideshowDurationValue: number = audioLength / totalImageSlides
  const formattedSlideshowDurationValue: string =
    totalImageSlides === 0
      ? '0'
      : DateTimeHelper.formatInSecondsWithDecimalPlaces(
          audioLength / (totalImageSlides + totalTileSlides),
          1,
        )
  return (
    <StyledWithAudio ref={containerRef}>
      {noOfSelectedAudios === 0 && (
        <WithAudioWarning>
          Please select/upload a music track or select no audio for your video
        </WithAudioWarning>
      )}
      {SlideshowHelper.isExceededTimeLimit(audioLength) ? (
        <WithAudioWarning>{VIDEO_CANNOT_EXCEED_LIMIT_TEXT}</WithAudioWarning>
      ) : (
        <>
          {!!audioLength &&
            slideshowDurationValue < VERY_FAST_SLIDE_DURATION_THRESHOLD && (
              <WithAudioWarning>
                {VERY_FAST_SLIDES_WARNING_TEXT}
              </WithAudioWarning>
            )}
          {!!audioLength &&
            slideshowDurationValue > SLOW_SLIDE_DURATION_THRESHOLD && (
              <WithAudioWarning>
                {SLOW_SLIDE_WARNING_TEXT_WITH_AUDIOS}
              </WithAudioWarning>
            )}
        </>
      )}
      <WithAudioIntro>
        Slides will automatically be timed to the length of your selected music
      </WithAudioIntro>
      <WithAudioItem>
        <WithAudioItemRow>
          <WithAudioItemCell>Audio Length:</WithAudioItemCell>
          <WithAudioItemCell>
            {DateTimeHelper.formatTime(audioLength)}
          </WithAudioItemCell>
        </WithAudioItemRow>
        <WithAudioItemRow>
          <WithAudioItemCell>Video Length:</WithAudioItemCell>
          <WithAudioItemCell>
            {totalImageSlides === 0
              ? 'N/A'
              : DateTimeHelper.formatTime(audioLength)}
          </WithAudioItemCell>
        </WithAudioItemRow>
        <WithAudioItemRow>
          <WithAudioItemCell>Number of Slides:</WithAudioItemCell>
          <WithAudioItemCell>
            {totalTileSlides > 0
              ? `${totalImageSlides} + ${totalTileSlides} title slides`
              : totalImageSlides}
          </WithAudioItemCell>
        </WithAudioItemRow>
        <WithAudioItemRow>
          <WithAudioItemCell>Slide Duration:</WithAudioItemCell>
          <WithAudioItemCell>
            {formattedSlideshowDurationValue}
          </WithAudioItemCell>
        </WithAudioItemRow>
      </WithAudioItem>
    </StyledWithAudio>
  )
}

export default WithAudio
