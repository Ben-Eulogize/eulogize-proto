import React from 'react'

import { TextItemActionBar } from './TextItemActionBar'

export default {
  title: 'CardProductActionBar/TextItemActionBar',
  component: TextItemActionBar,
  argTypes: {},
}

export const Default = () => (
  <TextItemActionBar
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
  />
)
