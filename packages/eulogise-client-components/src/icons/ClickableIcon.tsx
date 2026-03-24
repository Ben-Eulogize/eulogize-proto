import React, { useState } from 'react'
import styled from 'styled-components'
import { Tooltip } from '../Tooltip'
import { COLOR } from '@eulogise/client-core'

export interface IClickableIconProps {
  children: React.ReactNode
  onClick: (ev: React.MouseEvent) => void
  tooltip?: string
  className?: string
  disabled?: boolean
}

const StyledClickableIcon = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled
      ? `
    opacity: .5;
  `
      : `
    &:hover {
      color: ${COLOR.DARK_BLUE};
    }
  `}
`

export const ClickableIcon: React.FunctionComponent<IClickableIconProps> = ({
  children,
  className,
  tooltip,
  onClick,
  disabled,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)
  return (
    <StyledClickableIcon
      disabled={disabled!}
      className={className}
      onClick={(ev) => {
        if (disabled) {
          return
        }
        setIsTooltipVisible(false)
        onClick(ev)
      }}
      onMouseOver={() => setIsTooltipVisible(true)}
      onMouseOut={() => setIsTooltipVisible(false)}
    >
      <Tooltip title={tooltip!} visible={!!tooltip && isTooltipVisible}>
        {children}
      </Tooltip>
    </StyledClickableIcon>
  )
}
