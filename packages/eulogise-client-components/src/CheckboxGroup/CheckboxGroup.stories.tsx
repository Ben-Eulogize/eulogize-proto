import React from 'react'

import { CheckboxGroup } from './CheckboxGroup'

export default {
  title: 'General/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {},
}

export const Default = () => {
  return (
    <CheckboxGroup
      labelText="Lunch Time?"
      options={[
        { label: 'Yes', value: 'YES' },
        { label: 'No', value: 'NO' },
      ]}
    />
  )
}
