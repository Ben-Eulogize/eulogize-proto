import React from 'react'
import styled from 'styled-components'
import { IAudioAsset, IAudioAssetContent } from '@eulogise/core'
import { DateTimeHelper, AssetHelper } from '@eulogise/helpers'
import PlayButton from './Button/PlayButton'
import RemoveButton from './Button/RemoveButton'
import StopButton from './Button/StopButton'
import { DragIcon } from '@eulogise/client-components'
import { STYLE } from '@eulogise/client-core'
import EditButton from './Button/EditButton'

interface ISelectedAudioListItemProps {
  audio: IAudioAsset
  onPlayClick: () => void
  onStopClick: () => void
  onRemoveClick: () => void
  onEditClick: () => void
  isPlaying?: boolean
  isLoading?: boolean
  draggableProvided: any
  isEditingAudio: boolean
}

const StyledSelectedAudioListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
`

const AudioName = styled.div`
  flex: 1;
  padding-left: ${STYLE.GUTTER};
`

const AudioDuration = styled.div``

const SelectedAudioListItem: React.FunctionComponent<
  ISelectedAudioListItemProps
> = ({
  audio,
  draggableProvided,
  onPlayClick,
  onRemoveClick,
  onStopClick,
  onEditClick,
  isPlaying,
  isLoading,
  isEditingAudio,
}) => {
  if (!audio) {
    return null
  }
  const audioContent: IAudioAssetContent = audio.content
  const audioDuration: string = DateTimeHelper.formatDuration(
    audioContent.duration!,
  )
  const isEulogizeTrack: boolean = audio.owner === '*'
  return (
    <StyledSelectedAudioListItem
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
    >
      <DragIcon {...draggableProvided.dragHandleProps} />
      <AudioName> {AssetHelper.getAudioName(audioContent)}</AudioName>
      <AudioDuration>[{audioDuration}]</AudioDuration>
      <EditButton disabled={isEulogizeTrack} onClick={onEditClick} />
      {!isPlaying ? (
        <PlayButton onClick={onPlayClick} disabled={isEditingAudio} />
      ) : (
        <StopButton onClick={onStopClick} disabled={isEditingAudio} />
      )}
      <RemoveButton onClick={onRemoveClick} disabled={isEditingAudio} />
    </StyledSelectedAudioListItem>
  )
}

export default SelectedAudioListItem
