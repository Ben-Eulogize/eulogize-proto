import React from 'react'
import {
  Modal,
  HeaderTextLG,
  Text,
  Button,
  ButtonType,
  DeleteIcon,
  Notification,
} from '@eulogise/client-components'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'
import {
  EulogisePage,
  IDeleteClientModalOption,
  IModalState,
  ModalId,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useEulogiseDispatch, useModalState } from '../../../store/hooks'
import { deleteClient } from '../../../store/ClientState/actions'
import { NavigationHelper } from '@eulogise/helpers'

const ButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 90%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledRemoveBackgroundModal = styled(Modal)`
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
  margin: 1rem 0;
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

interface IDeleteClientModalModalProps {}

const DeleteClientModal: React.FC<IDeleteClientModalModalProps> = () => {
  const dispatch = useEulogiseDispatch()
  const { options }: IModalState = useModalState()
  const { clientId } = options as IDeleteClientModalOption

  const onClose = () => {
    dispatch(hideModalAction(ModalId.DELETE_CLIENT_MODAL))
  }

  const onDeleteClient = () => {
    if (!clientId) {
      return
    }
    dispatch(
      deleteClient({
        clientId,
        success: () => {
          onClose()
          Notification.success(
            `Client Deleted. Redirecting to view clients page.`,
          )
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
        },
        failed: () => {
          onClose()
          Notification.error(`Failed to delete client.`)
          NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
        },
      }),
    )
  }

  return (
    <StyledRemoveBackgroundModal
      isOpen
      footer={null}
      width="800px"
      onCloseClick={() =>
        dispatch(hideModalAction(ModalId.DELETE_CLIENT_MODAL))
      }
    >
      <CompleteConfirmModalContent>
        <HeaderText>Delete Client</HeaderText>
        {
          <>
            <Paragraph>This will delete the client.</Paragraph>
            <Paragraph>
              This will delete client cases and all associated data.
            </Paragraph>
            <Paragraph>This can not be undone or reversed.</Paragraph>
            <Paragraph>Are you sure you wish to continue?</Paragraph>
            <ButtonsContainer>
              <StyledButton
                buttonType={ButtonType.OUTLINE}
                onClick={() => onClose()}
              >
                Cancel
              </StyledButton>
              <StyledButton
                buttonType={ButtonType.DANGER}
                icon={<DeleteIcon />}
                onClick={() => onDeleteClient()}
              >
                Delete Client
              </StyledButton>
            </ButtonsContainer>
          </>
        }
      </CompleteConfirmModalContent>
    </StyledRemoveBackgroundModal>
  )
}

export default DeleteClientModal
