import React, { useState } from 'react'
import { ColorPickerField } from './ColorPickerField'

export default {
  title: 'General/ColorPickerField',
  component: ColorPickerField,
  argTypes: {},
}

export const Default = () => {
  const [color, setColor] = useState<string>('#000')
  return (
    <ColorPickerField
      color={color}
      onColorSelected={(newColor: string) => {
        setColor(newColor)
      }}
    />
  )
}
