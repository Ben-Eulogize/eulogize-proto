import React, { useState } from 'react'
import { BorderPagesSwitches } from './BorderPagesSwitches'

export default {
  title: 'Border/BorderPagesSwitches',
  component: BorderPagesSwitches,
  argTypes: {},
}

export const Default = () => {
  const [values, setValues] = useState<{ [key: string]: boolean }>({})
  return (
    <BorderPagesSwitches
      values={values}
      onChange={(vs) => {
        setValues(vs)
      }}
    />
  )
}
