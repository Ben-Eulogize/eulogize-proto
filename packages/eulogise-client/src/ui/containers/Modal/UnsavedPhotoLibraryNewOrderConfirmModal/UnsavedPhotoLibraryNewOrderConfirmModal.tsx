import React from 'react'
import {
  Modal,
  Text,
  Button,
  ButtonType,
  Notification,
  ButtonSize,
} from '@eulogise/client-components'
import styled from 'styled-components'
import { COLOR, SCREEN_SIZE, STYLE } from '@eulogise/client-core'
import {
  IModalState,
  ModalId,
  IUnsavedChangesConfirmOption,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import {
  useCaseState,
  useEulogiseDispatch,
  useModalState,
} from '../../../store/hooks'
import { NavigationHelper } from '@eulogise/helpers'
import { updateCaseById } from '../../../store/CaseState/actions'
import { ICaseState } from '@eulogise/core'

const StyledButtonsContainer = styled.div`
  display: flex;
  margin: 2.4rem auto 0 auto;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 20px;
  ${SCREEN_SIZE.TABLET} {
    flex-direction: row;
  }
`

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  background-color: ${COLOR.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const StyledTitleTextContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  padding: 15px 0;
`

const StyledTitleText = styled.div`
  margin-left: 100px;
  font-size: ${STYLE.HEADING_FONT_SIZE_LARGE};
  color: ${COLOR.DARK_BLUE};
`

const StyledUnsavedChangesConfirmModalModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-content {
    border-radius: 25px;
    background-color: ${COLOR.PASTEL_BLUE};
    color: ${COLOR.WHITE};
    text-align: center;
    .ant-modal-close-x {
      color: ${COLOR.DARK_BLUE};
    }
  }
`

const StyledParagraphContainer = styled.div`
  padding-top: 30px;
`

const StyledCancelButton = styled(Button)`
  margin-top: 20px;
`

const StyledParagraph = styled(Text)`
  display: block;
  margin-bottom: 1rem;
  color: ${COLOR.BLACK};
`

const CompleteConfirmModalContent = styled.div`
  margin: 2rem 0;
`

const StyledButton = styled(Button)`
  margin: 0.5rem auto;
  max-width: 180px;
  ${SCREEN_SIZE.TABLET} {
    margin: 0.5rem;
  }
`

const UnsavedPhotoLibraryNewOrderConfirmModal: React.FC<{}> = () => {
  const dispatch = useEulogiseDispatch()
  const modalState: IModalState = useModalState()
  const { options } = modalState as { options: IUnsavedChangesConfirmOption }
  const { page, newCustomisedPhotoImagesOrderIds } = options

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const caseId: string = activeCase?.id!

  const onCloseModal = () => {
    dispatch(hideModalAction(ModalId.UNSAVED_PHOTO_IMAGES_ORDER_CONFIRM))
  }

  const onSaveChange = () => {
    if (!newCustomisedPhotoImagesOrderIds || !page) {
      return
    }
    const updatedCaseFields = {
      customisedImagesOrderIds: newCustomisedPhotoImagesOrderIds,
    }
    dispatch(
      updateCaseById({
        caseId,
        caseFields: updatedCaseFields,
        success: () => {
          Notification.success(`New photo order order saved.`)
          onCloseModal()
          NavigationHelper.navigate(
            page,
            null,
            {},
            true,
            () => null,
            () => null,
          )
        },
      }),
    )
  }

  const onDiscardChanges = () => {
    onCloseModal()
    NavigationHelper.navigate(
      page,
      null,
      {},
      true,
      () => null,
      () => null,
    )
  }

  return (
    <StyledUnsavedChangesConfirmModalModal
      isOpen
      footer={null}
      width="640px"
      closable={false}
    >
      <CompleteConfirmModalContent>
        <StyledTitleContainer>
          <StyledTitleTextContainer>
            <StyledTitleText>Save Your New Photo Order?</StyledTitleText>
          </StyledTitleTextContainer>
          <div>
            <StyledCancelButton
              buttonSize={ButtonSize.SM}
              buttonType={ButtonType.TRANSPARENT}
              onClick={() => onCloseModal()}
            >
              Cancel
            </StyledCancelButton>
          </div>
        </StyledTitleContainer>
        <StyledParagraphContainer>
          <StyledParagraph>
            You have made changes to your photo images order.
          </StyledParagraph>
          <StyledParagraph>
            Would you like to save your new order?
          </StyledParagraph>
        </StyledParagraphContainer>
        <StyledButtonsContainer>
          <StyledButton
            buttonType={ButtonType.TRANSPARENT}
            onClick={() => onDiscardChanges()}
          >
            Discard Changes
          </StyledButton>
          <StyledButton
            buttonType={ButtonType.PRIMARY}
            block
            onClick={() => onSaveChange()}
          >
            Save Changes
          </StyledButton>
        </StyledButtonsContainer>
      </CompleteConfirmModalContent>
    </StyledUnsavedChangesConfirmModalModal>
  )
}

export default UnsavedPhotoLibraryNewOrderConfirmModal
