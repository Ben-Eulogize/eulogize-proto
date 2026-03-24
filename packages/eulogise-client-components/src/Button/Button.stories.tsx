import React from 'react'

import { Button, ButtonType } from './Button'
import { SearchIcon } from '../icons'
import { IconButton } from './IconButton'

export default {
  title: 'General/Button',
  component: Button,
  argTypes: {},
}

export const Default = () => <Button>Test</Button>
export const Transparent = () => (
  <Button buttonType={ButtonType.TRANSPARENT}>Test</Button>
)
export const Outline = () => (
  <Button buttonType={ButtonType.OUTLINE}>Test</Button>
)
export const Secondary = () => (
  <Button buttonType={ButtonType.SECONDARY}>Test</Button>
)
export const Primary = () => (
  <Button buttonType={ButtonType.PRIMARY}>Test</Button>
)
export const PrimaryNewCoreBlue = () => (
  <Button buttonType={ButtonType.CORE_PURPLE}>Test</Button>
)
export const Highlighted = () => (
  <Button buttonType={ButtonType.HIGHLIGHTED_BUTTON}>Test</Button>
)
export const Danger = () => <Button buttonType={ButtonType.DANGER}>Test</Button>
export const White = () => <Button buttonType={ButtonType.WHITE}>Test</Button>

export const WithTooltip = () => <Button tooltip="Test">Test</Button>
export const WithTooltipAndDisabled = () => (
  <Button disabled tooltip="Test">
    Test
  </Button>
)

export const WithIcon = () => <IconButton icon={<SearchIcon />} />
