import styled from 'styled-components'
import React from 'react'
import { Tooltip } from '../../Tooltip'

const StyledDrawerListRowItem = styled.div<{
  $textRightAlign?: boolean
  $isClickable?: boolean
}>`
  flex: 1;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  ${({ $textRightAlign }) => $textRightAlign && `justify-content: right;`}
  ${({ $isClickable }) =>
    $isClickable
      ? `
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `
      : `
  `}
`

type IDrawerListRowItemProps = {
  children: React.ReactNode
  textRightAlign?: boolean
  isClickable?: boolean
  onClick?: () => void
  tooltip?: string
  className?: string
}

export const DrawerListRowItem = ({
  children,
  textRightAlign,
  isClickable,
  onClick,
  tooltip,
  className,
}: IDrawerListRowItemProps) => (
  <Tooltip title={tooltip!}>
    <StyledDrawerListRowItem
      className={className}
      $textRightAlign={textRightAlign}
      $isClickable={isClickable}
      onClick={onClick}
    >
      {children}
    </StyledDrawerListRowItem>
  </Tooltip>
)
