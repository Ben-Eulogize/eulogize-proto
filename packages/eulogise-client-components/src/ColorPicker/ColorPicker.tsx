import React from 'react'
import styled from 'styled-components'
import ColorSelectorDropdown from '../Dropdown/ColorSelectorDropdown'
import { COLOR } from '@eulogise/client-core'

type IColorPickerProps = {
  color?: string
  onColorSelect: (color: string) => void
}

const StyledColorPicker = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  padding: 0.25rem;
  border: 1px solid ${COLOR.GREY};
  cursor: pointer;
  border-radius: 0.25rem;
  & > div,
  & > div > div,
  & > div > div > div {
    width: 100%;
    height: 100%;
  }
  &:hover {
    border-color: ${COLOR.PRIMARY};
  }
`

const SelectedColor = styled.div<{ color: string }>`
  ${({ color }) =>
    color
      ? `
    background-color: ${color};
  `
      : ''}
`

export const ColorPicker = ({
  color = '#000',
  onColorSelect,
}: IColorPickerProps) => {
  return (
    <StyledColorPicker>
      <ColorSelectorDropdown onColorSelect={onColorSelect}>
        <SelectedColor color={color} />
      </ColorSelectorDropdown>
    </StyledColorPicker>
  )
}
