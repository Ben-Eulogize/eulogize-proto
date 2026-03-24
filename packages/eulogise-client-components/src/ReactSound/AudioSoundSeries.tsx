import React from 'react'
import styled from 'styled-components'
import { AudioSound } from './AudioSound'
import { SlideshowHelper } from '@eulogise/helpers'
import { AudioStatus, ISlideshowData } from '@eulogise/core'

interface IAudioSoundSeriesProps {
  slideshowData: ISlideshowData
  progress: number
  slideshowDuration: number
  audioStatus: AudioStatus
  isUseAudioMode: boolean
  onFinishPlaying: () => void
  onPlaying: (position: number) => void
  volumn?: number
}

const StyledAudioSoundSeries = styled.div``

const NoAudioTerminateBeforeMillsecondsBuffer = 10

const PureAudioSoundSeries: React.FC<IAudioSoundSeriesProps> = ({
  slideshowData,
  slideshowDuration,
  progress,
  audioStatus,
  isUseAudioMode,
  onPlaying,
  onFinishPlaying,
  volumn = 100,
}) => {
  let audios: any[]
  audios = slideshowData.content.audio
  const { audio, playFromPosition } = SlideshowHelper.getAudioByProgress(
    slideshowData,
    progress,
  )

  return (
    <StyledAudioSoundSeries>
      <AudioSound
        volumn={volumn}
        audio={audio}
        audioStatus={audioStatus}
        playFromPosition={
          audioStatus === AudioStatus.PLAYING ? undefined : playFromPosition
        }
        onPlaying={(position) => {
          if (
            !isUseAudioMode &&
            playFromPosition >
              slideshowDuration - NoAudioTerminateBeforeMillsecondsBuffer
          ) {
            onFinishPlaying()
            return
          }
          const { audioIndex } = SlideshowHelper.getAudioByProgress(
            slideshowData,
            progress,
          )
          const prevAudioDuration = audios
            .filter((a, i) => i < audioIndex)
            .reduce((a, c) => a + c.duration!, 0)

          onPlaying(prevAudioDuration + position)
        }}
        onFinishPlaying={() => {
          const { audioIndex } = SlideshowHelper.getAudioByProgress(
            slideshowData,
            progress,
          )
          if (audioIndex >= audios.length - 1) {
            onFinishPlaying()
          } else {
            // if the previous audio stop, continue with the next audio
            const prevAudioDuration = audios
              .filter((a, i) => i < audioIndex + 1)
              .reduce((a, c) => a + c.duration!, 0)

            onPlaying(prevAudioDuration)
          }
        }}
      />
    </StyledAudioSoundSeries>
  )
}

export const AudioSoundSeries = React.memo(PureAudioSoundSeries)
