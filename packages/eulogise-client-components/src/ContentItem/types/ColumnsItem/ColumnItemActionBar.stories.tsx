import React from 'react'

import { ColumnsItemActionBar } from './ColumnsItemActionBar'
import { PageActionPosition } from '@eulogise/core'

export default {
  title: 'CardProductActionBar/ColumnsItemActionBar',
  component: ColumnsItemActionBar,
  argTypes: {},
}

export const Default = () => (
  <ColumnsItemActionBar
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
    actionsPosition={PageActionPosition.LEFT}
  />
)
