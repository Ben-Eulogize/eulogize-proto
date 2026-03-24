import React from 'react'
import { SwitchButton } from './SwitchButton'
import { OnOffSwitchButton } from './OnOffSwitchButton'

export default {
  title: 'General/SwitchButton',
  component: SwitchButton,
  argTypes: {},
}

export const Default = () => (
  <SwitchButton onClick={() => {}}>Test</SwitchButton>
)

export const OnOffSwitch = () => (
  <OnOffSwitchButton onClick={() => {}} checked />
)

export const Disabled = () => (
  <SwitchButton
    onClick={() => {}}
    disabled
    checkedChildren={'On'}
    unCheckedChildren={'Off'}
  />
)
