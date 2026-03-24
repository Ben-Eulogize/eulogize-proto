import React from 'react'

import { ImageItemActionBar } from './ImageItemActionBar'
import { PageActionPosition } from '@eulogise/core'

export default {
  title: 'CardProductActionBar/ImageItemActionBar',
  component: ImageItemActionBar,
  argTypes: {},
}

export const Default = () => (
  <ImageItemActionBar
    isColumnItem
    onEditImage={() => console.log('edit image')}
    showDeleteIcon
    showDuplicateIcon
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
    actionsPosition={PageActionPosition.LEFT}
    imageColumnIndex={0}
    itemMaxWidth={360}
  />
)

export const notColumnItem = () => (
  <ImageItemActionBar
    isColumnItem={false}
    onEditImage={() => console.log('edit image')}
    showDeleteIcon
    showDuplicateIcon
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
    actionsPosition={PageActionPosition.LEFT}
    imageColumnIndex={0}
    itemMaxWidth={360}
  />
)

export const hideDeleteIcon = () => (
  <ImageItemActionBar
    isColumnItem={false}
    onEditImage={() => console.log('edit image')}
    showDeleteIcon={false}
    showDuplicateIcon
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
    actionsPosition={PageActionPosition.LEFT}
    imageColumnIndex={0}
    itemMaxWidth={360}
  />
)

export const hideDuplicateIcon = () => (
  <ImageItemActionBar
    isColumnItem={false}
    onEditImage={() => console.log('edit image')}
    showDuplicateIcon={false}
    showDeleteIcon
    onDelete={() => console.log('delete')}
    onDuplicate={() => console.log('duplicate')}
    actionsPosition={PageActionPosition.LEFT}
    imageColumnIndex={0}
    itemMaxWidth={360}
  />
)
