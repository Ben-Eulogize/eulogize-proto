import React from 'react'
import {
  Modal,
  HeaderTextLG,
  Text,
  Button,
  ButtonType,
} from '@eulogise/client-components'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import { ModalId, ISlideshowState, ICaseState } from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  cleanupSlideshowUndoHistory,
  upsertSlideshowByCaseId,
} from '../../../store/SlideshowState/actions'
import {
  useCaseState,
  useEulogiseDispatch,
  useSlideshowState,
} from '../../../store/hooks'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 80%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledEditorClearAllModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    text-align: center;
    .ant-modal-close-x {
      color: ${COLOR.WHITE};
    }
  }
`

const HeaderText = styled(HeaderTextLG)`
  margin-bottom: 2rem;
`
const Paragraph = styled(Text)`
  display: block;
  margin-bottom: 0.4rem;
`

const CompleteConfirmModalContent = styled.div`
  margin: 2rem 0;
`

const StyledButton = styled(Button)`
  margin: 0.5rem auto;
  ${SCREEN_SIZE.TABLET} {
    margin: 0.5rem;
  }
`

interface ISlideshowClearAllModalProps {}

const SlideshowClearAllModal: React.FC<ISlideshowClearAllModalProps> = () => {
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeCase }: ICaseState = useCaseState()

  const caseId: string = activeCase?.id!

  const { activeItem: slideshowData }: ISlideshowState = useSlideshowState()

  const onCloseClearAllModal = () => {
    dispatch(hideModalAction(ModalId.SLIDESHOW_CLEAR_ALL))
  }

  const onSlideshowClearAll = () => {
    const themeId = slideshowData?.content?.theme
    if (themeId) {
      dispatch(
        upsertSlideshowByCaseId({
          caseId,
          slideshow: {
            ...slideshowData,
            content: {
              ...slideshowData.content,
              slides: [],
            },
          },
          themeId,
          onSuccess: (id: string) => {
            dispatch(cleanupSlideshowUndoHistory())
            dispatch(hideModalAction(ModalId.SLIDESHOW_CLEAR_ALL))
          },
        }),
      )
    }
  }

  return (
    <StyledEditorClearAllModal
      isOpen
      footer={null}
      width="800px"
      onCloseClick={() => dispatch(hideModalAction(ModalId.EDITOR_CLEAR_ALL))}
    >
      <CompleteConfirmModalContent>
        <HeaderText>Clear All</HeaderText>
        <Paragraph>
          This cannot be undone and will start a new slideshow.
        </Paragraph>
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            onClick={() => onSlideshowClearAll()}
          >
            Clear
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            onClick={onCloseClearAllModal}
          >
            Cancel
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledEditorClearAllModal>
  )
}

export default SlideshowClearAllModal
