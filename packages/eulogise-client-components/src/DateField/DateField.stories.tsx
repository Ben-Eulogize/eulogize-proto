import React, { useState } from 'react'

import { DateField } from './DateField'

export default {
  title: 'Date/DateField',
  component: DateField,
  argTypes: {},
}

export const Default = () => (
  <DateField onChange={(value) => console.log(value)} value={''} />
)

export const DOB = () => {
  const [dob, setDob] = useState('')
  return (
    <DateField
      type="dob"
      value={dob}
      onChange={(value: string) => setDob(value)}
    />
  )
}
