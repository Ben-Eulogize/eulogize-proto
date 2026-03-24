import React from 'react'
import styled from 'styled-components'
import SelectedAudioListItem from './SelectedAudioListItem'
import { COLOR } from '@eulogise/client-core'
import { IAudioAsset } from '@eulogise/core'
import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@eulogise/client-components'

interface ISelectedAudioListProps {
  audios: Array<IAudioAsset>
  isEditingAudio: boolean
  playingAudios: Array<IAudioAsset>
  loadingAudios: Array<IAudioAsset>
  onPlayClick: (audio: IAudioAsset) => void
  onRemoveClick: (audio: IAudioAsset) => void
  onStopClick: (audio: IAudioAsset) => void
  onEditClick: (audio: IAudioAsset) => void
  onDragEnd: ({
    source,
    destination,
  }: {
    source: { index: number }
    destination: { index: number }
  }) => void
}

const StyledSelectedAudioList = styled.div`
  margin-bottom: 1.4rem;
`

const NoMusicSelected = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 0;
  color: ${COLOR.DOVE_GREY};
`

const SelectedAudioList: React.FunctionComponent<ISelectedAudioListProps> = ({
  audios,
  isEditingAudio,
  loadingAudios,
  playingAudios,
  onRemoveClick,
  onPlayClick,
  onStopClick,
  onEditClick,
  onDragEnd,
}) => {
  if (audios.length === 0) {
    return <NoMusicSelected>No music selected</NoMusicSelected>
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvider) => (
          <StyledSelectedAudioList
            {...droppableProvider.droppableProps}
            ref={droppableProvider.innerRef}
          >
            {audios.map((audio: IAudioAsset, index: number) => (
              <Draggable key={audio?.id} draggableId={audio?.id} index={index}>
                {(draggableProvided) => (
                  <SelectedAudioListItem
                    key={audio?.id}
                    draggableProvided={draggableProvided}
                    isPlaying={playingAudios.includes(audio)}
                    isLoading={loadingAudios.includes(audio)}
                    audio={audio}
                    onPlayClick={() => onPlayClick(audio)}
                    onRemoveClick={() => onRemoveClick(audio)}
                    onStopClick={() => onStopClick(audio)}
                    onEditClick={() => onEditClick(audio)}
                    isEditingAudio={isEditingAudio}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </StyledSelectedAudioList>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SelectedAudioList
