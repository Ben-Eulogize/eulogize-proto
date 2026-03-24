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

const StyledFullPageMarginConfirmModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
    text-align: center;

    .ant-modal-close-x {
      color: ${COLOR.WHITE};
    }
  }
`

interface IFullPageMarginConfirmModal {
  isOpen?: boolean
  onClose: () => void
  onCompleteClick: () => void
  onKeepEditingClick: () => void
}

const HeaderText = styled(HeaderTextLG)`
  margin-bottom: 2rem;
`
const Paragraph = styled(Text)`
  display: block;
  margin-bottom: 0.4rem;
`

const FullPageMarginConfirmModalContent = styled.div`
  margin: 2rem 0;
`

const StyledButton = styled(Button)`
  margin: 0.5rem auto;
  ${SCREEN_SIZE.TABLET} {
    margin: 0.5rem;
  }
`

const FullPageMarginConfirmModal = ({
  isOpen = false,
  onClose,
  onCompleteClick,
  onKeepEditingClick,
}: IFullPageMarginConfirmModal) => {
  return (
    <StyledFullPageMarginConfirmModal
      isOpen={isOpen}
      footer={null}
      width="800px"
      onCloseClick={onClose}
    >
      <FullPageMarginConfirmModalContent>
        <HeaderText>
          Your memorial design is currently outside the safe print margins!
        </HeaderText>

        <Paragraph>
          The memorial design is currently outside the safe print margins.
        </Paragraph>
        <Paragraph>
          This can cause issues upon printing with assets getting cropped or
          distorted.
        </Paragraph>
        <Paragraph>
          To resolve this, reduce the size of the elements on the page or remove
          an element.
        </Paragraph>
        <Paragraph>Do you want to continue?</Paragraph>
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            block
            onClick={onCompleteClick}
          >
            Yes, finalize and complete
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.OUTLINE}
            block
            onClick={onKeepEditingClick}
          >
            No, keep editing
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.TRANSPARENT}
            block
            onClick={onClose}
          >
            Cancel
          </StyledButton>
        </ButtonsContainer>
      </FullPageMarginConfirmModalContent>
    </StyledFullPageMarginConfirmModal>
  )
}

export default FullPageMarginConfirmModal
