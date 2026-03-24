import React from 'react'

import { SpaceItemActionBar } from './SpaceItemActionBar'

export default {
  title: 'CardProductActionBar/SpaceItemActionBar',
  component: SpaceItemActionBar,
  argTypes: {},
}

export const Default = () => (
  <SpaceItemActionBar
    onChangeImage={() => console.log('change image')}
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
  />
)
