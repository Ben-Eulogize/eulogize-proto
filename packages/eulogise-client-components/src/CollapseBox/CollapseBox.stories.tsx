import React from 'react'
import { CollapseBox } from './CollapseBox'

export default {
  title: 'General/CollapseBox',
  component: CollapseBox,
  argTypes: {},
}

export const Default = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  return (
    <CollapseBox
      title="Title"
      isCollapsed={isCollapsed}
      onCollapsedChange={setIsCollapsed}
    >
      Content
    </CollapseBox>
  )
}
