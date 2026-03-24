import React from 'react'
import styled from 'styled-components'
import { IAudioAsset, IAudioAssetContent } from '@eulogise/core'
import { DateTimeHelper, AssetHelper } from '@eulogise/helpers'
import PlayButton from './Button/PlayButton'
import UseButton from './Button/UseButton'
import StopButton from './Button/StopButton'
import DeleteButton from './Button/DeleteButton'

interface IAvailableAudioProps {
  audio: IAudioAsset
  onUseClick: () => void
  onPlayClick: () => void
  onStopClick: () => void
  onDeleteClick: () => void
  isSelected?: boolean
  isPlaying?: boolean
  isUploadedCategory?: boolean
}

const StyledAvailableAudioItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
`

const AudioTitle = styled.div`
  flex: 1;
`

const AudioDuration = styled.div``

const AvailableAudioItem: React.FunctionComponent<IAvailableAudioProps> = ({
  audio,
  isPlaying,
  onUseClick,
  onPlayClick,
  onStopClick,
  onDeleteClick,
  isSelected,
  isUploadedCategory = false,
}) => {
  const audioContent: IAudioAssetContent = audio.content
  const audioContentDuration: number = audioContent.duration ?? 0
  const audioDuration: string =
    DateTimeHelper.formatDuration(audioContentDuration)

  return (
    <StyledAvailableAudioItem>
      <AudioTitle>{AssetHelper.getAudioName(audioContent)}</AudioTitle>
      <AudioDuration>[{audioDuration}]</AudioDuration>
      {!isPlaying ? (
        <PlayButton onClick={onPlayClick} />
      ) : (
        <StopButton onClick={onStopClick} />
      )}
      <UseButton disabled={isSelected} onClick={onUseClick} />
      {isUploadedCategory && (
        <DeleteButton
          disabled={isPlaying || isSelected}
          onClick={onDeleteClick}
        />
      )}
    </StyledAvailableAudioItem>
  )
}

export default AvailableAudioItem
