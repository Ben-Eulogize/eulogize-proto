import React, { useMemo } from 'react'
import styled from 'styled-components'
import { PauseIcon, PlayIcon, Slider } from '@eulogise/client-components'
import { COLOR, DEVICES, STYLE, useBreakpoint } from '@eulogise/client-core'
import { DateTimeHelper } from '@eulogise/helpers'

interface IPreviewSliderProps {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  value: number
  onChange: (value: number) => void
  duration: number
  progress: number
}

const StyledSlideshowPreviewSlider = styled.div`
  display: flex;
  align-items: center;
`

const StyledSlider = styled(Slider)``

const SliderContainer = styled.div`
  flex: 1;
  padding-left: ${STYLE.GUTTER};
  padding-top: 0.5rem;
`

const iconStyle = `
  font-size: 1.6rem;
  cursor: pointer;
  color: ${COLOR.CORNFLOWER_BLUE};
`

const StyledPlayIcon = styled(PlayIcon)`
  ${iconStyle}
`

const StyledPauseIcon = styled(PauseIcon)`
  ${iconStyle}
`

const ProgressText = styled.div`
  margin-left: calc(${STYLE.GUTTER} / 2);
`

const SlideshowPreviewSlider: React.FC<IPreviewSliderProps> = ({
  isPlaying,
  onPlay,
  progress,
  onPause,
  value,
  onChange,
  duration,
}) => {
  const formatTime = DateTimeHelper.formatTime
  const screenSize = useBreakpoint()
  const displayMarks =
    screenSize === DEVICES.MOBILE
      ? {
          0: formatTime(0),
          100: formatTime(duration),
        }
      : {
          0: formatTime(0),
          10: formatTime(0.1 * duration),
          20: formatTime(0.2 * duration),
          30: formatTime(0.3 * duration),
          40: formatTime(0.4 * duration),
          50: formatTime(0.5 * duration),
          60: formatTime(0.6 * duration),
          70: formatTime(0.7 * duration),
          80: formatTime(0.8 * duration),
          90: formatTime(0.9 * duration),
          100: formatTime(duration),
        }
  const marks = useMemo(() => displayMarks, [duration, displayMarks])
  return (
    <StyledSlideshowPreviewSlider>
      {isPlaying ? (
        <StyledPauseIcon onClick={onPause} />
      ) : (
        <StyledPlayIcon onClick={onPlay} />
      )}
      <ProgressText>{DateTimeHelper.formatTime(progress)}</ProgressText>
      <SliderContainer>
        <StyledSlider
          marks={marks}
          value={value}
          tooltipVisible={false}
          onChange={onChange}
        />
      </SliderContainer>
    </StyledSlideshowPreviewSlider>
  )
}

export default SlideshowPreviewSlider
