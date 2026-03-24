import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import { Tooltip } from '../../Tooltip'

type IDrawerLabelProps = {
  icon: React.ReactNode
  label: string
  className?: string
  isEnabledIcon?: boolean
  isClickable?: boolean
  tooltip?: string
  onClick?: () => void
}

const StyledDrawerLabel = styled.div<{ $isClickable: boolean }>`
  display: flex;
  align-items: center;
  ${({ $isClickable }) =>
    $isClickable
      ? `
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `
      : ''}
`

const IconContainer = styled.div<{ $isEnabled: boolean }>`
  padding-right: 0.5rem;
  font-size: 1.4rem;
  ${({ $isEnabled }) =>
    $isEnabled
      ? `color: ${COLOR.TEXT_COLOR};`
      : `color: ${COLOR.TEXT_DISABLED_COLOR};`}
`

const LabelText = styled.div<{ $isClickable: boolean }>`
  ${({ $isClickable }) =>
    $isClickable
      ? `
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    `
      : ''}
`

export const DrawerLabel = ({
  icon,
  isEnabledIcon = true,
  isClickable = false,
  tooltip,
  className,
  label,
  onClick,
}: IDrawerLabelProps) => {
  const renderDrawerLabel = () => {
    return (
      <StyledDrawerLabel
        className={className}
        $isClickable={isClickable}
        onClick={onClick}
      >
        <IconContainer $isEnabled={isEnabledIcon}>{icon}</IconContainer>
        <LabelText $isClickable={isClickable}>{label}</LabelText>
      </StyledDrawerLabel>
    )
  }
  if (tooltip) {
    return <Tooltip title={tooltip}>{renderDrawerLabel()}</Tooltip>
  }
  return renderDrawerLabel()
}
