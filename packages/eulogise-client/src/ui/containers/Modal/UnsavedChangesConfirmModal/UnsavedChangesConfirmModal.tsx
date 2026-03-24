import React, { useState } from 'react'
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
  ICardProductData,
  EulogiseRegion,
  EulogiseProduct,
} from '@eulogise/core'
import { hideModalAction } from '../../../store/ModalState/actions'
import { useEulogiseDispatch, useModalState } from '../../../store/hooks'
import { saveCardProduct } from '../../../store/CardProduct/actions'
import { NavigationHelper, CardProductHelper } from '@eulogise/helpers'
import { saveActiveSlideshow } from '../../../store/SlideshowState/actions'

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

const UnsavedChangesConfirmModalModal: React.FC<{ region: EulogiseRegion }> = ({
  region,
}) => {
  const dispatch = useEulogiseDispatch()
  const modalState: IModalState = useModalState()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const { options } = modalState as { options: IUnsavedChangesConfirmOption }
  const { editingProduct, unsavedProductState, page, query } = options

  const onCloseModal = () => {
    dispatch(hideModalAction(ModalId.UNSAVED_CHANGES_CONFIRM))
  }

  const onSaveChange = () => {
    if (!editingProduct || !unsavedProductState || !page) {
      console.log('stop saving unsaved changes', {
        editingProduct,
        unsavedProductState,
        page,
      })
      return
    }
    setIsSaving(true)
    const queryParams = query ?? {}
    switch (editingProduct) {
      case EulogiseProduct.SLIDESHOW: {
        dispatch(
          saveActiveSlideshow({
            onSuccess: () => {
              setIsSaving(false)
              onCloseModal()
              NavigationHelper.navigate(
                page,
                null,
                queryParams,
                true,
                () => null,
              )
            },
          }),
        )
        return
      }
      default: {
        const productName: string = CardProductHelper.getProductName({
          product: editingProduct,
          region,
        })
        dispatch(
          saveCardProduct({
            product: editingProduct,
            cardProduct: unsavedProductState as ICardProductData,
            onSuccess: () => {
              Notification.success(`${productName} saved.`)
              setIsSaving(false)
              onCloseModal()
              NavigationHelper.navigate(
                page,
                null,
                queryParams,
                true,
                () => null,
              )
            },
          }),
        )
      }
    }
  }

  const onDiscardChanges = () => {
    if (!editingProduct || !unsavedProductState || !page) {
      return
    }
    const queryParams = query ?? {}
    onCloseModal()
    NavigationHelper.navigate(page, null, queryParams, true, () => null)
  }

  return (
    <StyledUnsavedChangesConfirmModalModal
      isOpen
      footer={null}
      width="540px"
      closable={false}
    >
      <CompleteConfirmModalContent>
        <StyledTitleContainer>
          <StyledTitleTextContainer>
            <StyledTitleText>Save Your Work?</StyledTitleText>
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
            You have made changes to your tribute.
          </StyledParagraph>
          <StyledParagraph>Would you like to save your work?</StyledParagraph>
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
            loading={isSaving}
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

export default UnsavedChangesConfirmModalModal
