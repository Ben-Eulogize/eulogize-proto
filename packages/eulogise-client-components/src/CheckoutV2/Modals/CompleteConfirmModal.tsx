import React from 'react'
import { Modal } from '../../Modal'
import { HeaderTextLG, Text } from '../../Text'
import { Button, ButtonType } from '../../Button'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 80%;
  flex-direction: column;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledCompleteConfirmModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    text-align: center;

    .ant-modal-close {
      .ant-modal-close-x {
        .ant-btn {
          background-color: transparent;
          &,
          &:hover,
          &:active,
          &:focus {
            border-color: ${COLOR.WHITE};
            color: ${COLOR.WHITE};
          }
          &:hover {
            opacity: 0.8;
          }
          &:disabled {
            opacity: 0.3;
          }
        }
      }
    }
  }
`

interface ICompleteConfirmModal {
  isOpen?: boolean
  isVideoBierProcessing?: boolean
  onClose: () => void
  onCompleteClick: () => void
  onShareClick: () => void
  onKeepEditingClick: () => void
}

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

const CompleteConfirmModal = ({
  isOpen = false,
  isVideoBierProcessing,
  onClose,
  onCompleteClick,
  onShareClick,
  onKeepEditingClick,
}: ICompleteConfirmModal) => {
  return (
    <StyledCompleteConfirmModal
      isOpen={isOpen}
      footer={null}
      width="800px"
      onCloseClick={onClose}
    >
      <CompleteConfirmModalContent>
        <HeaderText>Is your memorial finished?</HeaderText>

        <Paragraph>
          Clicking generate will lock your design and create a version for
          download.
        </Paragraph>
        <Paragraph>
          You will still be able to edit other memorials you are working on.
        </Paragraph>
        <Paragraph>
          You can share your memorial with anyone via email if you would like
          feedback before you finish.
        </Paragraph>
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            onClick={onCompleteClick}
          >
            Complete and Generate {isVideoBierProcessing ? 'VB' : ''}
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            block
            onClick={onShareClick}
          >
            Share
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            block
            onClick={onKeepEditingClick}
          >
            Keep Editing
          </StyledButton>
          <StyledButton buttonType={ButtonType.TRANSPARENT} onClick={onClose}>
            Cancel
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledCompleteConfirmModal>
  )
}

export default CompleteConfirmModal
