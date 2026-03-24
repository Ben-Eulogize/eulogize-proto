import React, { useState } from 'react'
import { Expandable } from './Expandable'

export default {
  title: 'General/Expandable',
  component: Expandable,
  argTypes: {},
}

export const Default = () => <Expandable onClick={() => {}} />

export const DefaultWithOnClick = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>()
  return (
    <Expandable
      isExpanded={isExpanded}
      onClick={() => {
        setIsExpanded(!isExpanded)
      }}
    />
  )
}
