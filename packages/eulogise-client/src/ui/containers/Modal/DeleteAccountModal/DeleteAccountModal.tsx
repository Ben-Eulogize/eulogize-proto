import React, { useState } from 'react'
import { Modal, Text, Button, ButtonType } from '@eulogise/client-components'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import { EulogisePage, ModalId } from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useEulogiseDispatch } from '../../../store/hooks'
import { NavigationHelper } from '@eulogise/helpers'
import RequestHelper from '../../../helpers/RequestHelper'
import { EulogiseEndpoint } from '@eulogise/client-core'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
    gap: 0;
  }
`

const StyledDeleteAccountModal = styled(Modal)`
  .ant-modal-close-x {
    color: ${COLOR.BLACK};
  }
`

const Paragraph = styled(Text)`
  display: block;
  margin: 0.6rem 0;
  color: ${COLOR.TEXT_COLOR};
`

const CompleteConfirmModalContent = styled.div`
  margin: 0.6rem 0;
  text-align: left;
`

const StyledButton = styled(Button)`
  margin: 0.5rem 0;
  width: 100%;
  ${SCREEN_SIZE.TABLET} {
    margin: 0.5rem;
    width: auto;
  }
`

const ErrorText = styled(Text)`
  display: block;
  margin-top: 0.8rem;
  color: ${COLOR.LIGHT_RED};
`

interface IDeleteAccountModalProps {}

const ACCOUNT_DELETE_ERROR_MESSAGE = `Something went wrong and we couldn't delete your account yet. Your account is still active. Please try again in a few minutes or contact our support team if this keeps happening support@eulogizememorials.com.`

const focusDeleteAccountButton = () => {
  setTimeout(() => {
    const button = document.querySelector(
      '.account-settings-delete-account-button',
    ) as HTMLButtonElement | null
    button?.focus()
  }, 0)
}

const DeleteAccountModal: React.FC<IDeleteAccountModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onClose = () => {
    if (isDeleting) {
      return
    }
    dispatch(hideModalAction(ModalId.DELETE_ACCOUNT_MODAL))
    focusDeleteAccountButton()
  }

  const onDeleteAccount = async () => {
    if (isDeleting) {
      return
    }
    setErrorMessage('')
    setIsDeleting(true)
    try {
      await RequestHelper.requestWithToken(EulogiseEndpoint.ACCOUNT_DELETE, {
        method: 'DELETE',
      })

      dispatch(hideModalAction(ModalId.DELETE_ACCOUNT_MODAL))
      NavigationHelper.navigate(EulogisePage.ACCOUNT_DELETED)
    } catch (ex) {
      console.error('DeleteAccountModal > onDeleteAccount failed', ex)
      setErrorMessage(ACCOUNT_DELETE_ERROR_MESSAGE)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <StyledDeleteAccountModal
      isOpen
      footer={null}
      width="700px"
      title="Delete your account?"
      onCloseClick={onClose}
      closeButtonDisabled={isDeleting}
      keyboard={!isDeleting}
    >
      <CompleteConfirmModalContent>
        <Paragraph>
          This will remove any tributes you have created and any photos you have
          uploaded to Eulogize.
        </Paragraph>
        <Paragraph>This action is permanent and cannot be undone.</Paragraph>
        <Paragraph>
          You will stop receiving emails from us, apart from a confirmation of
          this deletion.
        </Paragraph>
        {!!errorMessage && (
          <ErrorText aria-live="assertive">{errorMessage}</ErrorText>
        )}
        <ButtonsContainer>
          <StyledButton
            buttonType={ButtonType.TRANSPARENT}
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.DANGER}
            onClick={onDeleteAccount}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Yes, delete my account
          </StyledButton>
        </ButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledDeleteAccountModal>
  )
}

export default DeleteAccountModal
