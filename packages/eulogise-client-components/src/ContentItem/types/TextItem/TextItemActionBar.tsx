import React from 'react'
import { ActionBar } from '../../ActionBar'
import { PageActionPosition } from '@eulogise/core'
import {
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
} from '../../ActionBar/ActionBarButtons'

export interface ITextItemActionBarProps {
  onDelete: () => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isPortaled?: boolean
}

export const TextItemActionBar: React.FC<ITextItemActionBarProps> = ({
  onDelete,
  onDuplicate,
  actionsPosition,
  isPortaled,
}) => (
  <ActionBar
    actions={[
      ActionBarCopyAssetButton({
        title: 'Duplicate text',
        onClick: onDuplicate,
      }),
      ActionBarDeleteButton({ onClick: onDelete }),
    ]}
    actionsPosition={actionsPosition}
    isPortaled={isPortaled}
  />
)
