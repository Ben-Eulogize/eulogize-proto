import React from 'react'
import styled from 'styled-components'
import SlideshowPreviewSlider from './SlideshowPreviewSlider'
import { STYLE } from '@eulogise/client-core'

interface ISlideshowPreviewControlBarProps {
  className?: string
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  value: number
  onChange: (value: number) => void
  duration: number
  progress: number
}

const StyledSlideshowPreviewControlBar = styled.div`
  background-color: #fff;
  padding: 0 ${STYLE.GUTTER};
`

const SlideshowPreviewControlBar: React.FC<
  ISlideshowPreviewControlBarProps
> = ({
  className,
  isPlaying,
  onPlay,
  onPause,
  progress,
  value,
  duration,
  onChange,
}) => (
  <StyledSlideshowPreviewControlBar className={className}>
    <SlideshowPreviewSlider
      isPlaying={isPlaying}
      onPlay={onPlay}
      onPause={onPause}
      duration={duration}
      progress={progress}
      value={value}
      onChange={onChange}
    />
  </StyledSlideshowPreviewControlBar>
)

export default SlideshowPreviewControlBar
