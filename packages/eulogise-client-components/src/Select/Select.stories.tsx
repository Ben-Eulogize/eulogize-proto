import React, { useState } from 'react'
import { Select, SelectOptionType } from './Select'

export default {
  title: 'General/Select',
  component: Select,
  argTypes: {},
}

export const Default = () => {
  const [value, setValue] = useState('yes')
  return (
    <Select
      defaultValue={value}
      style={{ width: 120 }}
      onChange={(
        value: string,
        selectedItem: SelectOptionType | SelectOptionType[],
      ) => {
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
