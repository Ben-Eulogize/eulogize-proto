import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

type IColorPickerButtonProps = {
  onClick?: () => void
  children: React.ReactNode
}

const StyledColorPickerButton = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.25rem;
  border: 1px solid ${COLOR.GREY};
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    border-color: ${COLOR.PRIMARY};
  }
`

export const ColorPickerButton = ({
  onClick,
  children,
}: IColorPickerButtonProps) => (
  <StyledColorPickerButton onClick={onClick}>
    {children}
  </StyledColorPickerButton>
)
