import React from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { Modal } from './Modal'
import { Button, ButtonType } from '../Button'
import { InfoAlert, WarningAlert } from '../Alert'
import { Text } from '../Text'
import { SuccessAlert } from '../Alert/SuccessAlert'

export enum ConfirmModalStatus {
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

export interface IConfirmModalProps {
  isOpen?: boolean
  title?: string
  text?: React.ReactNode
  isConfirming?: boolean
  onClose?: () => void
  onConfirm?: () => void
  footer?: React.ReactNode
  status?: ConfirmModalStatus
  confirmButtonText?: string
}

const AlertStyle = `
  text-align: center;
  font-size: ${STYLE.FONT_SIZE_LG};
  align-items: center;
  margin-bottom: 0.5rem;
`

const StyledSuccessAlert = styled(SuccessAlert)`
  ${AlertStyle};
`

const StyledInfoAlert = styled(InfoAlert)`
  ${AlertStyle}
`

const StyledWarningAlert = styled(WarningAlert)`
  ${AlertStyle}
`

// @ts-ignore
const StyledConfirmModal = styled(Modal)`
  .ant-modal-body {
    padding: 5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Content = styled.div``

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  isOpen = true,
  title,
  text,
  isConfirming,
  onClose,
  onConfirm,
  confirmButtonText = 'Confirm',
  footer,
  status = ConfirmModalStatus.INFO,
}) => (
  <StyledConfirmModal
    isShowCloseIcon={false}
    isOpen={isOpen}
    onCloseClick={onClose}
    width="600px"
    footer={
      footer ? (
        footer
      ) : (
        <>
          <Button
            key="cancel"
            buttonType={ButtonType.TRANSPARENT}
            noMarginRight
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            loading={isConfirming}
            key="confirm"
            noMarginRight
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </>
      )
    }
  >
    <Content>
      {title &&
        (status === ConfirmModalStatus.SUCCESS ? (
          <StyledSuccessAlert>{title}</StyledSuccessAlert>
        ) : status === ConfirmModalStatus.INFO ? (
          <StyledInfoAlert>{title}</StyledInfoAlert>
        ) : (
          <StyledWarningAlert>{title}</StyledWarningAlert>
        ))}
      {text && <Text>{text}</Text>}
    </Content>
  </StyledConfirmModal>
)
