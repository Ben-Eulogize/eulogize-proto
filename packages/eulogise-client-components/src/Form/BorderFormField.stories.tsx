import React, { useState } from 'react'
import { BorderFormField } from './BorderFormField'
import { Select } from '../Select'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { BorderPagesSwitches } from '../BorderPagesSwitches'

export default {
  title: 'General/BorderFormField',
  component: BorderFormField,
  argTypes: {},
}

const MockSelect = () => {
  const [value, setValue] = useState('Yes')
  return (
    <Select
      defaultValue={value}
      onChange={(value: string) => {
        setValue(value)
      }}
      options={[
        {
          value: 'yes',
          label: 'Yes',
        },
        { value: 'no', label: 'No' },
      ]}
    />
  )
}

const MockColorPicker = () => {
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

export const WithSelect = () => (
  <BorderFormField label="Border Style">
    <MockSelect />
  </BorderFormField>
)

export const WithColorPicker = () => (
  <BorderFormField label="Color">
    <MockColorPicker />
  </BorderFormField>
)

export const WithMultipleSwitches = () => {
  const [values, setValues] = useState({})
  return (
    <BorderFormField label="Pages">
      <BorderPagesSwitches
        values={values}
        onChange={(vs) => {
          setValues(vs)
          console.log('vs', vs)
        }}
      />
    </BorderFormField>
  )
}
