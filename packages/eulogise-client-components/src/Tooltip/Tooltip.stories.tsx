import React from 'react'

import { Tooltip } from './Tooltip'
import { LeftIcon } from '../icons'

export default {
  title: 'DataDisplay/Tooltip',
  component: Tooltip,
  argTypes: {},
}

export const Default = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
)

export const WithDelay = () => (
  <Tooltip title="prompt text" mouseEnterDelay={2}>
    <span>Tooltip will show on mouse enter with enter delay 2 seconds.</span>
  </Tooltip>
)

export const WithText = () => (
  <Tooltip title={'Previous page'} mouseEnterDelay={0.5}>
    <LeftIcon /> Previous
  </Tooltip>
)
