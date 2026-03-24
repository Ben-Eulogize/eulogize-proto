import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import {
  CardProductViewDisplayMode,
  IBoundariesType,
  ICardProductColumnRowData,
  ICardProductTheme,
  IContentItemOnChangeEvent,
  PageActionPosition,
} from '@eulogise/core'
import { IChangeImageEvent } from '../ContentItem.types'
import { ColumnItem } from './ColumnItem'
import { ColumnsItemActionBar } from './ColumnsItemActionBar'

interface IColumnsItemProps {
  data: {
    height?: number
    items: Array<any>
  }
  hideActions: boolean
  boundaries: IBoundariesType
  displayMode: CardProductViewDisplayMode
  productTheme: ICardProductTheme
  onChange: (
    rowData: ICardProductColumnRowData,
    events: IContentItemOnChangeEvent,
  ) => any
  onChangeImage: (ev: IChangeImageEvent) => void
  onEditImage: (ev: IChangeImageEvent) => void
  onDelete: () => void
  isFocused?: boolean
  onFocus: () => void
  isRowHovered?: boolean
  focusColumnIndex: number
  setFocusColumnIndex: (colIndex: number) => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  onDragDisabled: (disabled: boolean) => void
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const ColumnsItem: React.FC<IColumnsItemProps> = ({
  isFocused,
  onFocus,
  onChangeImage,
  onEditImage,
  data,
  hideActions,
  productTheme,
  displayMode,
  boundaries,
  onChange,
  isRowHovered,
  onDelete,
  focusColumnIndex,
  setFocusColumnIndex,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  onDragDisabled,
}) => {
  const { items: columns } = data

  const onItemChange = (itemData: any, columnIndex: number) => {
    const { items } = data

    const changes = items.map((item, index: number) => {
      if (index === columnIndex) {
        return {
          ...items[columnIndex],
          data: itemData,
        }
      }

      return item
    })

    onChange(
      {
        items: changes,
      },
      { event: 'resize' },
    )
  }

  const maxWidth: number = boundaries.width / columns.length
  return (
    <StyledContainer>
      {columns.map((item, columnIndex: number) => (
        <ColumnItem
          key={columnIndex}
          onDragDisabled={onDragDisabled}
          isFocused={isFocused && focusColumnIndex === columnIndex}
          onFocus={onFocus}
          onChangeImage={({ filestackHandle }) => {
            setFocusColumnIndex(columnIndex)
            onChangeImage({ columnIndex, filestackHandle })
          }}
          productTheme={productTheme}
          isRowHovered={isRowHovered}
          item={item}
          maxWidth={maxWidth}
          boundaries={boundaries}
          onItemChange={(data) => onItemChange(data, columnIndex)}
          displayMode={displayMode}
          onEditImage={({ filestackHandle }) => {
            setFocusColumnIndex(columnIndex)
            onEditImage({ columnIndex, filestackHandle })
          }}
          onDuplicate={onDuplicate}
          actionsPosition={actionsPosition}
          isAnyRowFocused={isAnyRowFocused}
          imageColumnIndex={columnIndex}
        />
      ))}

      {displayMode === CardProductViewDisplayMode.EDIT &&
        isFocused &&
        (() => {
          const portalTarget = document.getElementById(
            'editor-toolbar-sticky-target',
          )
          return portalTarget
            ? createPortal(
                <ColumnsItemActionBar
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  actionsPosition={actionsPosition}
                  isPortaled
                />,
                portalTarget,
              )
            : null
        })()}
    </StyledContainer>
  )
}
