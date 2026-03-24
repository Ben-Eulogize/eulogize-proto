import React from 'react'
import styled, { css } from 'styled-components'
import { STYLE, COLOR } from '@eulogise/client-core'
import { DropdownArrowDownIcon, DropdownArrowUpIcon } from '../icons'

interface ITextProps {
  children: React.ReactNode
  required?: boolean
  isCollapsible?: boolean
  isCollapsed?: boolean
  onChange?: (isCollapsed: boolean) => void
  textColor?: string
}

const RequiredText = styled.span`
  color: red;
`

const dropdownIconStyle = `
  margin-left: calc(${STYLE.GUTTER} / 2);
`

// @ts-ignore
const StyledDropdownArrowUpIcon = styled(DropdownArrowUpIcon)`
  ${dropdownIconStyle}
`

// @ts-ignore
const StyledDropdownArrowDownIcon = styled(DropdownArrowDownIcon)`
  ${dropdownIconStyle}
`

const StyledLabelText = styled.div<{
  $isCollapsible?: boolean
  $textColor?: string
}>`
  margin-bottom: 0.25rem;
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
  display: flex;
  align-items: center;
  color: ${({ $textColor }) => $textColor};
  ${({ $isCollapsible }) =>
    $isCollapsible &&
    css`
      cursor: pointer;
      &:hover {
        color: ${COLOR.PRIMARY};
      }
    `}
`

export const LabelText: React.FunctionComponent<ITextProps> = ({
  children,
  required,
  isCollapsible = false,
  isCollapsed = false,
  onChange,
  textColor = COLOR.BLACK,
}) => (
  <StyledLabelText
    $textColor={textColor}
    $isCollapsible={isCollapsible}
    onClick={() => {
      if (onChange) {
        onChange(!isCollapsed)
      }
    }}
  >
    {children}
    {required && <RequiredText>&nbsp;*</RequiredText>}
    {isCollapsible &&
      (isCollapsed ? (
        <StyledDropdownArrowUpIcon />
      ) : (
        <StyledDropdownArrowDownIcon />
      ))}
  </StyledLabelText>
)
