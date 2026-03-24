import React, { CSSProperties, useEffect } from 'react'
import { ButtonProps, Modal as AntModal } from 'antd'
import styled from 'styled-components'
import { STYLE, COLOR } from '@eulogise/client-core'
import { Button, ButtonType } from '../Button'
import { CloseIcon } from '../icons'

export interface IModalProps {
  title?: React.ReactNode
  logo?: React.ReactNode
  children?: React.ReactNode
  isOpen: boolean
  onOkClick?: () => void
  onCloseClick?: () => void
  footer?: React.ReactNode
  width?: number | string
  style?: object
  okButtonProps?: ButtonProps
  bodyStyle?: CSSProperties
  className?: string
  fontSize?: string
  margin?: string
  maskClosable?: boolean
  closable?: boolean
  isShowCloseAsButton?: boolean
  isShowCloseIcon?: boolean
  closeButtonText?: string
  onOpen?: () => void
  closeButtonDisabled?: boolean
  keyboard?: boolean
}

// @ts-ignore
const StyledModal = styled(AntModal)<{
  $margin?: string
  $fontSize?: string
}>`
  .ant-modal-header {
    background: ${COLOR.PASTEL_BLUE};
    height: 60px;
    border-radius: 15px 15px 0 0;
    padding: 13px 110px 13px 24px;
    display: flex;
    align-items: center;
  }
  .ant-modal-title {
    display: flex;
    align-items: center;
    width: 100%;
    color: ${COLOR.DARK_BLUE};
    line-height: 100%;
    ${({ $fontSize }) =>
      $fontSize
        ? `font-size: ${$fontSize};`
        : `font-size: ${STYLE.HEADING_FONT_SIZE_MEDIUM};`}
    ${({ $margin }) => ($margin ? `margin: ${$margin};` : '')}
  }
  .ant-modal-close-x {
    width: auto;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .ant-modal-content {
    border-radius: 15px;
  }
`

// @ts-ignore
const StyledCloseButton = styled(Button)``

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const Title = styled.div``

export const Modal: React.FunctionComponent<IModalProps> = ({
  isOpen = true,
  onOpen,
  title,
  logo,
  className,
  children,
  onOkClick,
  onCloseClick,
  style,
  width,
  footer,
  okButtonProps,
  bodyStyle,
  fontSize,
  margin,
  maskClosable = false,
  closable = true,
  isShowCloseAsButton = true,
  isShowCloseIcon = true,
  closeButtonText = 'Close',
  closeButtonDisabled = false,
  keyboard = true,
}) => {
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen()
    }
  }, [isOpen])
  return (
    <StyledModal
      title={
        logo ? (
          <>
            {logo}
            <TitleContainer>
              <Title>{title}</Title>
            </TitleContainer>
          </>
        ) : (
          title
        )
      }
      open={isOpen}
      className={className}
      onOk={onOkClick}
      centered
      zIndex={9999}
      style={style}
      onCancel={onCloseClick}
      footer={footer}
      width={width}
      maskClosable={maskClosable}
      keyboard={keyboard}
      closeIcon={
        !isShowCloseIcon ? (
          <></>
        ) : isShowCloseAsButton ? (
          <StyledCloseButton
            disabled={closeButtonDisabled}
            onClick={onCloseClick}
            buttonType={ButtonType.TRANSPARENT}
          >
            {closeButtonText}
          </StyledCloseButton>
        ) : (
          <CloseIcon onClick={onCloseClick} />
        )
      }
      okButtonProps={okButtonProps}
      bodyStyle={bodyStyle}
      closable={closable}
      $fontSize={fontSize}
      $margin={margin}
    >
      {children}
    </StyledModal>
  )
}
