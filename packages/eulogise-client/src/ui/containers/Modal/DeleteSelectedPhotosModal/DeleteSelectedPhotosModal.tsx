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
import { ModalId } from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useAssetState, useEulogiseDispatch } from '../../../store/hooks'
import {
  removeAssets,
  updateIsDeletingPhotos,
  updateIsSelectingPhotos,
} from '../../../store/AssetState/actions'

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

interface IDeleteSelectedPhotosModalProps {}

const DeleteSelectedPhotosModal: React.FC<
  IDeleteSelectedPhotosModalProps
> = () => {
  const dispatch = useEulogiseDispatch()

  const { selectedPhotos, isDeletingSelectedPhotos } = useAssetState()

  const numberOfSelectedPhotos = selectedPhotos?.length ?? 0
  const hasMoreThanOneSelectedPhotos = selectedPhotos?.length > 1
  const photoWord = hasMoreThanOneSelectedPhotos ? 'photos' : 'photo'

  const onClose = () => {
    dispatch(hideModalAction(ModalId.DELETE_SELECTED_PHOTOS))
  }

  const onDeleteSelectedPhotos = () => {
    if (isDeletingSelectedPhotos) {
      return
    }
    const seletedPhotoIds = selectedPhotos?.map((img) => img.id)
    dispatch(updateIsDeletingPhotos({ isDeletingSelectedPhotos: true }))

    dispatch(
      removeAssets({
        assetIds: seletedPhotoIds,
        onSuccess: () => {
          dispatch(updateIsSelectingPhotos({ isSelectingPhoto: false }))
          dispatch(updateIsDeletingPhotos({ isDeletingSelectedPhotos: false }))
          dispatch(hideModalAction(ModalId.DELETE_SELECTED_PHOTOS))
          Notification.success(
            `${numberOfSelectedPhotos} ${photoWord} removed.`,
          )
        },
        onFailed: () => {
          dispatch(updateIsSelectingPhotos({ isSelectingPhoto: false }))
          dispatch(updateIsDeletingPhotos({ isDeletingSelectedPhotos: false }))
          dispatch(hideModalAction(ModalId.DELETE_SELECTED_PHOTOS))
          Notification.error(`Failed to remove photos., please retry.`)
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
        dispatch(hideModalAction(ModalId.DELETE_SELECTED_PHOTOS))
      }
    >
      <CompleteConfirmModalContent>
        <HeaderText>
          {isDeletingSelectedPhotos
            ? `Deleting ${numberOfSelectedPhotos} ${photoWord}...`
            : `This will delete ${numberOfSelectedPhotos} ${photoWord}!`}
        </HeaderText>
        {!isDeletingSelectedPhotos && (
          <>
            <Paragraph>
              This will delete the {numberOfSelectedPhotos} {photoWord} selected
              from your account.
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
                onClick={() => onDeleteSelectedPhotos()}
              >
                Delete Selected
              </StyledButton>
            </ButtonsContainer>
          </>
        )}
      </CompleteConfirmModalContent>
    </StyledRemoveBackgroundModal>
  )
}

export default DeleteSelectedPhotosModal
