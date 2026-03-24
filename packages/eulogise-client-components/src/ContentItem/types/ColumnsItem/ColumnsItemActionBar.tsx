import React from 'react'
import { ActionBar } from '../../ActionBar'
import { PageActionPosition } from '@eulogise/core'
import {
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
} from '../../ActionBar/ActionBarButtons'

export interface IColumnsItemActionBarProps {
  onDelete: () => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isPortaled?: boolean
}

export const ColumnsItemActionBar: React.FC<IColumnsItemActionBarProps> = ({
  onDelete,
  onDuplicate,
  actionsPosition,
  isPortaled,
}) => (
  <ActionBar
    actions={[
      ActionBarCopyAssetButton({
        title: 'Duplicate column',
        onClick: onDuplicate,
      }),
      ActionBarDeleteButton({
        onClick: onDelete,
      }),
    ]}
    actionsPosition={actionsPosition}
    isPortaled={isPortaled}
  />
)
