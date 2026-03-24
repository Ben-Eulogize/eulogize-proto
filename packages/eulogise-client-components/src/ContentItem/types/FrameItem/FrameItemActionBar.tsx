import React from 'react'
import { ActionBar } from '../../ActionBar'
import {
  EulogiseProduct,
  PageActionPosition,
  IActionType,
} from '@eulogise/core'
import {
  ActionBarToggleTextButton,
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
  ActionBarImageLayoutButton,
  ActionBarRepositionButton,
  ActionBarPhotoAndFrameEffectsButton,
} from '../../ActionBar/ActionBarButtons'
import { ButtonType } from '../../../Button'

export interface IFrameItemActionBarProps {
  product?: EulogiseProduct
  onDelete: () => void
  onChangeLayout: () => void
  onReposition: () => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isTextEnabled: boolean
  onToggleText?: () => void
  isShowPhotobookTitlePageLayout: boolean
  hasSelectedImage: boolean
  isPortaled?: boolean
  onPhotoAndFrameEffects: () => void
}

export const FrameItemActionBar = ({
  product,
  onDelete,
  onChangeLayout,
  onReposition,
  onToggleText,
  onDuplicate,
  actionsPosition,
  isTextEnabled,
  isShowPhotobookTitlePageLayout,
  hasSelectedImage,
  isPortaled,
  onPhotoAndFrameEffects,
}: IFrameItemActionBarProps) => {
  const isPhotobook = product === EulogiseProduct.PHOTOBOOK
  const actions = isPhotobook
    ? !isShowPhotobookTitlePageLayout
      ? ([
          ActionBarToggleTextButton({
            onClick: () => {
              onToggleText && onToggleText()
            },
            text: 'Text',
            isTextEnabled,
          }),
          ActionBarImageLayoutButton({
            onClick: onChangeLayout,
            text: 'Change Layout',
          }),
        ].filter(Boolean) as Array<IActionType<ButtonType>>)
      : []
    : [
        ActionBarPhotoAndFrameEffectsButton({
          onClick: onPhotoAndFrameEffects,
        }),
        ActionBarImageLayoutButton({
          onClick: onChangeLayout,
        }),
        ActionBarRepositionButton({
          onClick: onReposition,
          disabled: !hasSelectedImage,
        }),
        ActionBarCopyAssetButton({
          onClick: onDuplicate,
          title: 'Duplicate image',
        }),
        ActionBarDeleteButton({ onClick: onDelete }),
      ]

  return (
    <ActionBar
      actions={actions}
      actionsPosition={actionsPosition}
      isPortaled={isPortaled}
    />
  )
}
