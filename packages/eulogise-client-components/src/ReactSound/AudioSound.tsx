import React, { useState } from 'react'
import { ReactSound } from './index'
import { AssetHelper } from '@eulogise/helpers'
import { AudioStatus, IAudioAssetContent } from '@eulogise/core'

interface IAudioSoundProps {
  audio: IAudioAssetContent
  onLoading?: () => void
  onLoaded?: () => void
  onPlaying?: (position: number) => void
  onFinishPlaying?: () => void
  playFromPosition?: number
  audioStatus: AudioStatus
  volumn?: number
}

export const AudioSound: React.FunctionComponent<IAudioSoundProps> = ({
  audio,
  audioStatus,
  onLoading,
  onLoaded,
  onPlaying,
  onFinishPlaying,
  playFromPosition,
  volumn = 100,
}) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  if (!audio) {
    return null
  }
  return (
    <ReactSound
      volume={volumn}
      url={AssetHelper.getAudioUrl(audio)}
      playStatus={audioStatus}
      playFromPosition={playFromPosition}
      onLoading={() => {
        if (hasLoaded) {
          return
        }
        if (onLoading) {
          onLoading()
        }
      }}
      onLoad={() => {
        setHasLoaded(true)
        if (onLoaded) {
          onLoaded()
        }
      }}
      onPlaying={(a) => {
        if (onPlaying) {
          onPlaying(a.position)
        }
      }}
      onError={(err) => {
        console.log('AudioSound playing error', err)
      }}
      onFinishedPlaying={onFinishPlaying}
    />
  )
}
