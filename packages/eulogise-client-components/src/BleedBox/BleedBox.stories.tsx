import React from 'react'

import { BleedBox, BleedBoxType } from './BleedBox'

export default {
  title: 'General/BleedBox',
  component: BleedBox,
  argTypes: {},
}

export const TopLeft = () => <BleedBox type={BleedBoxType.TOP_LEFT} />
export const TopRight = () => <BleedBox type={BleedBoxType.TOP_RIGHT} />
export const BottomLeft = () => <BleedBox type={BleedBoxType.BOTTOM_LEFT} />
export const BottomRight = () => <BleedBox type={BleedBoxType.BOTTOM_RIGHT} />
