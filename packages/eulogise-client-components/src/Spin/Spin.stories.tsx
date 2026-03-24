import React from 'react'

import { Spin } from './Spin'

export default {
  title: 'Feedback/Spin',
  component: Spin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export const Default = () => <Spin />
