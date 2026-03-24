import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Slider, WarningAlert } from '@eulogise/client-components'
import {
  DateTimeHelper,
  VIDEO_CANNOT_EXCEED_LIMIT_TEXT,
} from '@eulogise/helpers'
import { SlideshowHelper } from '@eulogise/helpers'
import { COLOR, MIN_SINGLE_SLIDE_DURATION_IN_MS } from '@eulogise/client-core'
import { IAudioAsset, ISlideshowData, ISlideshowTheme } from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'
import { updateSlideshow } from '../../../store/SlideshowState/actions'
import {
  MinutesInputNumber,
  SecondsInputNumber,
} from '@eulogise/client-components'
import { useEulogiseDispatch } from '../../../store/hooks'
import { InfoButton } from '@eulogise/client-components'

interface INoAudioProps {
  internalUsedAudio: Array<IAudioAsset>
  totalImageSlides: number
  onSlideDurationChange: (slideDuration: number) => void
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  totalTileSlides: number
  isStartTitleSlideEnabled: boolean
  isEndTitleSlideEnabled: boolean
}

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
`

const NoAudioIntro = styled.div`
  margin-bottom: 2rem;
`

const NoAudioItem = styled.div`
  width: 100%;
`
const NoAudioItemCell = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`

const NoAudioItemRow = styled.div`
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  & > ${NoAudioItemCell} {
    width: 50%;
    max-width: 10rem;
  }
`

const StyledNoAudio = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.LITE_GREY};
`

const StyledWarningAlert = styled(WarningAlert)`
  align-items: center;
`

const NoAudio: React.FC<INoAudioProps> = ({
  internalUsedAudio,
  totalImageSlides,
  slideshowData,
  slideshowTheme,
  onSlideDurationChange,
  totalTileSlides = 0,
  isStartTitleSlideEnabled,
  isEndTitleSlideEnabled,
}) => {
  const dispatch = useEulogiseDispatch()
  const containerRef = useRef()

  const noAudioSlideshowMs = SlideshowHelper.getNoAudioTotalSlideshowDuration({
    slideshowData,
    slideshowTheme,
  })

  const noAudioMinutes = DateTimeHelper.getMinutesFromMs(noAudioSlideshowMs)
  const noAudioSeconds = DateTimeHelper.getSecondsFromMs(noAudioSlideshowMs)
  const noAudioSlideDuration =
    SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(slideshowData)

  const properNoAudioFileName =
    AssetHelper.getProperSilenceAudioFileName(noAudioSlideshowMs)
  const properNoAudioFile: IAudioAsset = internalUsedAudio.find(
    (audio: IAudioAsset) => audio?.content?.filename === properNoAudioFileName,
  )!

  useEffect(() => {
    if (properNoAudioFile?.content) {
      dispatch(
        updateSlideshow({
          slideshow: {
            // @ts-ignore
            content: {
              audio: [properNoAudioFile?.content],
            },
          },
        }),
      )
    }
  }, [properNoAudioFile])

  const updateTotalDuration = ({
    minutes,
    seconds,
  }: {
    minutes?: number
    seconds?: number
  }) => {
    const totalMinutes = minutes === null ? 0 : minutes ?? noAudioMinutes
    const totalSeconds = seconds === null ? 0 : seconds ?? noAudioSeconds
    const totalDurationInSeconds = totalMinutes * 60 + totalSeconds
    const totalDurationInMs = totalDurationInSeconds * 1000

    const { durationPerSlide } =
      SlideshowHelper.calculateSingleNonSpecifiedSlideDurationWithoutTransitionOutByTotalDuration(
        totalDurationInMs,
        {
          slideshowData,
          slideshowTheme,
        },
      )

    onSlideDurationChange(
      Math.max(durationPerSlide, MIN_SINGLE_SLIDE_DURATION_IN_MS),
    )
  }
  const isExceededTimeLimit =
    SlideshowHelper.isExceededTimeLimit(noAudioSlideshowMs)

  return (
    <StyledNoAudio ref={containerRef}>
      <NoAudioIntro>
        The visual tribute will play for the duration of the slides with no
        audio.
      </NoAudioIntro>
      {isExceededTimeLimit ? (
        <StyledWarningAlert>
          {VIDEO_CANNOT_EXCEED_LIMIT_TEXT}
        </StyledWarningAlert>
      ) : null}

      <NoAudioItem>
        <NoAudioItemRow>
          <NoAudioItemCell>Video Length: (mm : ss)</NoAudioItemCell>
          <NoAudioItemCell>
            {totalImageSlides === 0 || isNaN(noAudioSlideshowMs) ? (
              'N/A'
            ) : (
              <TimeInputContainer>
                <MinutesInputNumber
                  value={noAudioMinutes}
                  onChange={(minutes: any) => {
                    updateTotalDuration({ minutes: minutes as number })
                  }}
                />
                &nbsp;:&nbsp;
                <SecondsInputNumber
                  value={noAudioSeconds}
                  onChange={(seconds: any) => {
                    updateTotalDuration({ seconds: seconds as number })
                  }}
                />
              </TimeInputContainer>
            )}
          </NoAudioItemCell>
        </NoAudioItemRow>
        <NoAudioItemRow>
          <NoAudioItemCell>Number of Slides:</NoAudioItemCell>
          <NoAudioItemCell>
            {totalTileSlides > 0
              ? `${totalImageSlides} + ${totalTileSlides} title slides`
              : totalImageSlides}
          </NoAudioItemCell>
        </NoAudioItemRow>
        <NoAudioItemRow>
          <NoAudioItemCell>
            Slide Duration:&nbsp;
            <InfoButton
              title="Slide duration includes transition in and out time of each photo"
              getPopupContainer={() => containerRef.current!}
            />
          </NoAudioItemCell>
          <NoAudioItemCell>
            {DateTimeHelper.formatInSecondsWithDecimalPlaces(
              noAudioSlideDuration,
              1,
            )}
          </NoAudioItemCell>
        </NoAudioItemRow>
      </NoAudioItem>
      <Slider
        min={5}
        max={20}
        dots
        value={noAudioSlideDuration / 1000}
        onChange={(value: number) => {
          onSlideDurationChange(Math.round(value * 10) * 100)
        }}
        getTooltipPopupContainer={() => containerRef.current}
      />
    </StyledNoAudio>
  )
}

export default NoAudio
