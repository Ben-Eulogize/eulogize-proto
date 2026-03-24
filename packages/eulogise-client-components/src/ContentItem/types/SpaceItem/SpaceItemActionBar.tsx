import React from 'react'
import { ActionBar } from '../../ActionBar'
import { PageActionPosition } from '@eulogise/core'
import {
  ActionBarColorDropdown,
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
  ActionBarDividerButton,
} from '../../ActionBar/ActionBarButtons'

export interface ISpaceItemActionBarProps {
  onChangeImage: () => void
  onColorSelect: (color: string) => void
  onDelete: () => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isPortaled?: boolean
}

export const SpaceItemActionBar: React.FC<ISpaceItemActionBarProps> = ({
  onChangeImage,
  onColorSelect,
  onDelete,
  onDuplicate,
  actionsPosition,
  isPortaled,
}) => (
  <ActionBar
    isPortaled={isPortaled}
    actions={[
      ActionBarDividerButton({
        onClick: onChangeImage,
      }),
      {
        content: <ActionBarColorDropdown onColorSelect={onColorSelect} />,
        title: 'Change color',
        onClick: () => {},
        isCustomContent: true,
      },
      ActionBarCopyAssetButton({
        onClick: onDuplicate,
        title: 'Duplicate space',
      }),
      ActionBarDeleteButton({
        onClick: onDelete,
      }),
    ]}
    actionsPosition={actionsPosition}
  />
)
