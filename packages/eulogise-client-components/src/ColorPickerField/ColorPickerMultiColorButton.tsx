import React from 'react'
import styled from 'styled-components'
import { ColorPickerButton } from './ColorPickerButton'

const StyledColorPickerMultiColorButton = styled.div`
  width: 100%;
  height: 100%;
  background: conic-gradient(
    red,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet,
    red
  );
`

type IColorPickerMultiColorButtonProps = {
  onClick?: () => void
}

export const ColorPickerMultiColorButton = ({
  onClick,
}: IColorPickerMultiColorButtonProps) => (
  <ColorPickerButton onClick={onClick}>
    <StyledColorPickerMultiColorButton />
  </ColorPickerButton>
)
