import React from 'react'
import styled from 'styled-components'
import { Drawer as AntDrawer } from 'antd'
import { COLOR, DEVICES, useBreakpoint } from '@eulogise/client-core'
import { CloseIcon } from '../icons'

export enum DrawerPlacement {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface IDrawerProps {
  title?: React.ReactNode
  children: React.ReactNode
  placement?: DrawerPlacement
  isOpen?: boolean
  width?: string | number
  isShowCloseIcon?: boolean
  className?: string
  closeIcon?: React.ReactNode
  closeIconMargin?: string
  onClose?: () => void
  extra?: React.ReactNode
  mask?: boolean
  getContainer?: string | HTMLElement | false
}

// @ts-ignore
const StyledAntDrawer = styled(AntDrawer)<{
  $closeIconMargin?: string
}>`
  .ant-drawer-header {
    flex-direction: row-reverse;
    background-color: ${COLOR.PANEL_BACKGROUND_COLOR} !important;
  }
  .ant-drawer-header-title {
    flex-direction: row-reverse;
    justify-content: flex-end;
    .ant-drawer-close {
      font-size: 24px;
      ${({ $closeIconMargin }) =>
        $closeIconMargin ? `margin: ${$closeIconMargin};` : ''}
    }
  }
  .ant-drawer-body {
    background-color: ${COLOR.PANEL_BACKGROUND_COLOR};
  }
`

export const Drawer: React.FunctionComponent<IDrawerProps> = ({
  title,
  width,
  className,
  children,
  placement = DrawerPlacement.LEFT,
  isOpen,
  isShowCloseIcon = true,
  closeIcon,
  closeIconMargin,
  onClose,
  extra,
  mask,
  getContainer,
}) => {
  const screenSize = useBreakpoint()
  const defaultWidth = screenSize === DEVICES.DESKTOP ? '800px' : '90%'
  return (
    <StyledAntDrawer
      title={title}
      open={isOpen}
      width={width ? width : defaultWidth}
      className={className}
      closable={isShowCloseIcon}
      placement={placement}
      closeIcon={closeIcon ? closeIcon : <CloseIcon onClick={onClose} />}
      onClose={() => {
        if (onClose) {
          onClose()
        }
      }}
      $closeIconMargin={closeIconMargin}
      extra={extra}
      mask={mask}
      getContainer={getContainer}
    >
      {children}
    </StyledAntDrawer>
  )
}
