import React from 'react'
import { ActionBar } from '../../ActionBar'
import { AlignmentType, PageActionPosition } from '@eulogise/core'
import {
  ActionBarAlignmentButton,
  ActionBarChangeIconButton,
  ActionBarColorDropdown,
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
} from '../../ActionBar/ActionBarButtons'

export interface IIconItemActionBarProps {
  onChangeIcon: () => void
  onColorSelect: (color: string) => void
  onDelete: () => void
  onDuplicate: () => void
  onChangeAlignment: (alignment: AlignmentType) => void
  alignment: AlignmentType
  actionsPosition: PageActionPosition
  isShowPhotobookTitlePageLayout: boolean
  isPortaled?: boolean
}

export const IconItemActionBar = (props: IIconItemActionBarProps) => {
  const {
    onChangeIcon,
    onColorSelect,
    onDelete,
    onDuplicate,
    actionsPosition,
    alignment,
    onChangeAlignment,
    isShowPhotobookTitlePageLayout,
    isPortaled,
  } = props

  const colorAction = {
    content: <ActionBarColorDropdown onColorSelect={onColorSelect} />,
    title: 'Change color',
    onClick: () => {},
    isCustomContent: true,
  }

  return (
    <ActionBar
      isPortaled={isPortaled}
      actions={
        isShowPhotobookTitlePageLayout
          ? [ActionBarChangeIconButton({ onClick: onChangeIcon }), colorAction]
          : [
              ActionBarChangeIconButton({ onClick: onChangeIcon }),
              colorAction,
              ActionBarAlignmentButton({
                alignment,
                onClick: onChangeAlignment,
              }),
              ActionBarCopyAssetButton({
                title: 'Duplicate icon',
                onClick: onDuplicate,
              }),
              ActionBarDeleteButton({ onClick: onDelete }),
            ]
      }
      actionsPosition={actionsPosition}
    />
  )
}
