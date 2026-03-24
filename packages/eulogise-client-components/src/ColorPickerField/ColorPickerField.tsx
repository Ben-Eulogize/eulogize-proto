import React, { useState } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color'
import {
  COLOR,
  SLIDESHOW_COLORS,
  useDetectClickOutside,
} from '@eulogise/client-core'

const StyledColorPicker = styled.div`
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

const SketchPickerPopup = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  z-index: 2;
`

const SelectedColor = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  ${({ color }) =>
    color
      ? `
    background-color: ${color};
  `
      : ''}
`

type IColorPickerFieldProps = {
  color: string
  onColorSelected?: (color: string) => void
}

export const ColorPickerField = ({
  color,
  onColorSelected,
}: IColorPickerFieldProps) => {
  const [isShowColorPopup, setIsShowColorPopup] = useState<boolean>()
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsShowColorPopup(false)
    },
  })
  return (
    <StyledColorPicker
      ref={ref}
      onClick={() => {
        setIsShowColorPopup(true)
      }}
    >
      <SelectedColor color={color} />
      {isShowColorPopup && (
        <SketchPickerPopup>
          <SketchPicker
            color={color}
            onChangeComplete={(color) => {
              if (onColorSelected) {
                onColorSelected(color.hex)
              }
            }}
            presetColors={SLIDESHOW_COLORS.map((c) => c.color)}
          />
        </SketchPickerPopup>
      )}
    </StyledColorPicker>
  )
}
