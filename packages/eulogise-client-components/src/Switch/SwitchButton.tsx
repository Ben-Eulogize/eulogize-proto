import React from 'react'
import styled from 'styled-components'

import {
  default as Switch,
  SwitchProps,
  SwitchChangeEventHandler,
} from 'antd/lib/switch'

export type ISwitchButtonProps = SwitchProps & {
  onClick?: SwitchChangeEventHandler
  children?: React.ReactNode
  noMarginBottom?: boolean
}

// @ts-ignore
const StyledSwitch = styled(Switch)`
  margin: 0;
`

const SwitchContainer = styled.div<{ $noMarginBottom: boolean }>`
  display: flex;
  ${({ $noMarginBottom }) =>
    $noMarginBottom ? `margin-bottom: 0;` : `margin-bottom: 1rem;`}
`

const TextContainer = styled.div`
  padding-right: 0.5rem;
  flex: 1;
`

export const SwitchButton = ({
  className,
  onClick,
  children,
  style,
  noMarginBottom = false,
  ...defaultProps
}: ISwitchButtonProps) => {
  return (
    <SwitchContainer
      $noMarginBottom={noMarginBottom}
      style={style}
      className={className}
    >
      {children && <TextContainer>{children}</TextContainer>}
      <StyledSwitch onClick={onClick} {...defaultProps} />
    </SwitchContainer>
  )
}
