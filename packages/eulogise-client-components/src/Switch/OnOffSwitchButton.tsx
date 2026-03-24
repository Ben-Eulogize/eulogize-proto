import { ISwitchButtonProps, SwitchButton } from './SwitchButton'
import React from 'react'

export const OnOffSwitchButton = (props: ISwitchButtonProps) => (
  <SwitchButton checkedChildren={'On'} unCheckedChildren={'Off'} {...props} />
)
