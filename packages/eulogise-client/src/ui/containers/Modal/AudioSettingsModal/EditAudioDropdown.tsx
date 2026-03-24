import React, { useRef } from 'react'
import styled from 'styled-components'
import { IAudioAsset } from '@eulogise/core'
import { DateTimeHelper } from '@eulogise/helpers'
import { STYLE } from '@eulogise/client-core'
import EditAudioForm from './Form/EditAudioForm'
interface IEditAudioDropdownProps {
  editAudio: IAudioAsset | null
  isOpen: boolean
  playingAudioInAudioLists: Array<IAudioAsset>
  clearAllPlayingAudios: () => void
  onClose: () => void
}

const StyledEditAudioDropdownContainer = styled.div`
  margin: 0px 30px 20px 30px;

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    `animation: growDown 500ms ease-in-out forwards; transform-origin: top center;`}
`

const StyledEditAudioTitleContainer = styled.div`
  width: 100%;
`

const StyledEditAudioDropdownTitle = styled.div`
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  margin: 14px 0;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  width: calc(100% - 20px);
`

const StyledOriginalSongLengthText = styled.div`
  margin: 20px 0 0 0;
`

const StyledSongTrackNameText = styled.div`
  margin: 20px 0 0 0;
`

const EditAudioDropdown: React.FunctionComponent<IEditAudioDropdownProps> = ({
  editAudio,
  isOpen = false,
  playingAudioInAudioLists,
  clearAllPlayingAudios,
  onClose,
}) => {
  if (!editAudio) {
    return null
  }
  const {
    content: { duration = 0, title = '' },
  } = editAudio
  const formRef = useRef()

  return (
    <StyledEditAudioDropdownContainer isOpen={isOpen}>
      <StyledEditAudioTitleContainer>
        <StyledEditAudioDropdownTitle>Edit Track</StyledEditAudioDropdownTitle>
      </StyledEditAudioTitleContainer>

      <StyledSongTrackNameText>
        {`You are editing:\u00A0\u00A0${title}`}
      </StyledSongTrackNameText>

      <StyledOriginalSongLengthText>
        {`Original Song Length:\u00A0\u00A0${DateTimeHelper.formatDurationInMilliseconds(
          duration,
        )}`}
      </StyledOriginalSongLengthText>

      <EditAudioForm
        playingAudioInAudioLists={playingAudioInAudioLists}
        editAudio={editAudio}
        formRef={formRef}
        originalSongDuration={duration}
        onCloseAudioEditor={onClose}
        clearAllPlayingAudios={clearAllPlayingAudios}
      />
    </StyledEditAudioDropdownContainer>
  )
}

export default EditAudioDropdown
