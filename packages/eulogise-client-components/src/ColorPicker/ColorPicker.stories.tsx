import React, { useState } from 'react'
import { ColorPicker } from './ColorPicker'

export default {
  title: 'General/ColorPicker',
  component: ColorPicker,
  argTypes: {},
}

export const Default = () => {
  const [color, setColor] = useState<string>()
  return (
    <ColorPicker
      color={color}
      onColorSelect={(newColor) => {
        setColor(newColor)
      }}
    />
  )
}
