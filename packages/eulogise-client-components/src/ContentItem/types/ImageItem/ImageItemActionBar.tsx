import React from 'react'
import styled from 'styled-components'
import { ActionBar } from '../../ActionBar'
import { PageActionPosition } from '@eulogise/core'
import { ButtonType } from '../../../Button'
import {
  ActionBarPhotoAndFrameEffectsButton,
  ActionBarCopyAssetButton,
  ActionBarDeleteButton,
} from '../../ActionBar/ActionBarButtons'

const StyledButtonLabel = styled.span`
  white-space: nowrap;
`

export interface IImageItemActionBarProps {
  onEditImage: () => void
  onDelete: () => void
  onDuplicate: () => void
  showDeleteIcon: boolean
  isColumnItem: boolean
  showDuplicateIcon: boolean
  actionsPosition: PageActionPosition
  imageColumnIndex: number
  itemMaxWidth: number
  onChangeLayout: () => void
  isClientBrandImage?: boolean
  isPortaled?: boolean
  onPhotoAndFrameEffects: () => void
}

// TODO: might need to work out a better solution to dynamically calculate the offset to make the edit button visible across all products
// @ts-ignore
const StyledImageItemActionBar = styled(ActionBar)`
  ${({
    $isColumnItem,
    $imageColumnIndex,
    $itemMaxWidth,
    $isPortaled,
  }: {
    $isColumnItem: boolean
    $imageColumnIndex: number
    $itemMaxWidth: number
    $isPortaled?: boolean
  }) => {
    if ($isPortaled) {
      return ``
    }
    if ($isColumnItem) {
      if ($imageColumnIndex === 3) {
        if ($itemMaxWidth === 44.75) {
          // 1/4 Thank you card - 2 cols templates
          return `
            left: -83px;
          `
        }
        if ($itemMaxWidth === 97.25) {
          // 1/4 Thank you card - 1 col templates
          return `
            left: -31px;
          `
        }
        if ($itemMaxWidth === 37.5) {
          // 1/4 Bookmark width
          return `
            left: -100px;
          `
        } else if ($itemMaxWidth === 50) {
          // 1/4 Thank you card - 1 col templates
          return `
            left: 0px;
          `
        }
        if ($itemMaxWidth === 72.5) {
          // 1/4 TV Screen
          return `
            left: -56px;
          `
        }
        return `
          left: -23px;
        `
      } else if ($imageColumnIndex === 2) {
        if ($itemMaxWidth === 97.25) {
          // 1/4 Thank you card - 2 cols templates
          return `
            right: auto;
            flex-wrap: wrap;
          `
        }
        if ($itemMaxWidth === 44.75) {
          // 1/4 Thank you card - 2 cols templates
          return `
            left: -38px;
          `
        }
        if ($itemMaxWidth > 59.6 && $itemMaxWidth < 59.7) {
          // 1/3 Thank you card - two cols templates
          return `
            left: -68px;
          `
        }
        if ($itemMaxWidth > 96.6 && $itemMaxWidth < 96.7) {
          // 1/3 TV Screen
          return `
            left: -32px;
          `
        }
        if ($itemMaxWidth <= 37.5) {
          // 1/4 Bookmark width
          return `
            left: -62px;
          `
        }
        if ($itemMaxWidth === 50) {
          // 1/3 width Bookmark
          return `
            left: -88px;
          `
        }
        if ($itemMaxWidth === 90) {
          // 1/4 width Booklet
          return `
            right: auto;
            flex-wrap: wrap;
          `
        }
        return `
          left: 0;
        `
      } else if ($imageColumnIndex === 1) {
        if ($itemMaxWidth === 89.5) {
          // 1/2 Thank you card - two cols templates
          return `
            left: -38px;
          `
        }
        if ($itemMaxWidth > 59.6 && $itemMaxWidth < 59.7) {
          // 1/3 Thank you card - two cols templates
          return `
            left: -8px;
          `
        }
        if ($itemMaxWidth === 194.5) {
          // 1/2 Thank you card - 1 col templates
          return `
            left: 66px;
          `
        }
        if ($itemMaxWidth === 145) {
          // 1/2 TV Screen
          return `
            left: 0;
          `
        }
        if ($itemMaxWidth === 75) {
          // 1/2 Bookmark
          return `
            left: -63px;
          `
        }
        if ($itemMaxWidth === 37.5) {
          // 1/4 Bookmark width
          return `
            left: -25px;
          `
        } else if ($itemMaxWidth === 50) {
          // 1/3 Bookmark width
          return `
            left: -38px;
          `
        }
      }
      return `
        right: auto;
        flex-wrap: wrap;
      `
    }
    return ``
  }}
`

export const ImageItemActionBar: React.FC<IImageItemActionBarProps> = ({
  onEditImage,
  isColumnItem,
  onDelete,
  onDuplicate,
  onChangeLayout,
  showDeleteIcon = true,
  showDuplicateIcon = true,
  actionsPosition,
  imageColumnIndex,
  itemMaxWidth,
  isClientBrandImage = false,
  isPortaled,
  onPhotoAndFrameEffects,
}) => {
  const actions = [
    ActionBarPhotoAndFrameEffectsButton({
      onClick: onPhotoAndFrameEffects,
    }),
    {
      content: <StyledButtonLabel>Change Frame</StyledButtonLabel>,
      title: 'Image Layout',
      onClick: (ev: any) => {
        ev.stopPropagation()
        onChangeLayout()
      },
      buttonType: ButtonType.WHITE,
      shouldHide: isClientBrandImage,
    },
  ]
    .concat(
      showDuplicateIcon
        ? ActionBarCopyAssetButton({
            onClick: onDuplicate,
            title: 'Duplicate image',
          })
        : [],
    )
    .concat(showDeleteIcon ? ActionBarDeleteButton({ onClick: onDelete }) : [])

  const filteredActions = isClientBrandImage
    ? actions?.filter((action: any) => !action?.shouldHide)
    : actions

  return (
    <StyledImageItemActionBar
      $isColumnItem={isColumnItem}
      isPortaled={isPortaled}
      actions={filteredActions}
      actionsPosition={actionsPosition}
      $imageColumnIndex={imageColumnIndex}
      $itemMaxWidth={itemMaxWidth}
      $isPortaled={isPortaled}
    />
  )
}
