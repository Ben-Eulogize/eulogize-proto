import React, { useState } from 'react'
import styled from 'styled-components'
import { ImageItem } from '../ImageItem'
import {
  AlignmentType,
  CardProductViewDisplayMode,
  IBoundariesType,
  ICardProductTheme,
  PageActionPosition,
} from '@eulogise/core'
import { IChangeImageEvent } from '../ContentItem.types'
import { CardProductHelper } from '@eulogise/helpers'

interface IColumnItemProps {
  item: any
  maxWidth: number
  displayMode: CardProductViewDisplayMode
  onItemChange: (data: object) => void
  boundaries: IBoundariesType
  onChangeImage: (ev: IChangeImageEvent) => void
  onEditImage: (ev: IChangeImageEvent) => void
  isFocused?: boolean
  onFocus: () => void
  isRowHovered?: boolean
  productTheme: ICardProductTheme
  onDragDisabled: (disabled: boolean) => void
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  imageColumnIndex: number
}

const StyledColumnItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  ${({ $alignment }: { $alignment: AlignmentType }) =>
    $alignment &&
    `justify-content: ${CardProductHelper.getJustifyContentStyleByAlignment(
      $alignment,
    )}`}
`

export const ColumnItem: React.FC<IColumnItemProps> = ({
  onFocus,
  isFocused,
  item,
  maxWidth,
  displayMode,
  onItemChange,
  boundaries,
  onChangeImage,
  onEditImage,
  isRowHovered,
  productTheme,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  imageColumnIndex,
  onDragDisabled,
}) => {
  const [isCellHovered, setIsCellHovered] = useState<boolean>(false)

  return (
    <StyledColumnItem
      $alignment={item.data.alignment}
      onMouseEnter={() => setIsCellHovered(true)}
      onMouseLeave={() => {
        setIsCellHovered(false)
      }}
    >
      <ImageItem
        onFocus={onFocus}
        isFocused={isFocused}
        onDragDisabled={onDragDisabled}
        maxWidth={maxWidth}
        data={item.data}
        displayMode={displayMode}
        boundaries={boundaries}
        isRowHovered={isRowHovered && isCellHovered}
        onChange={onItemChange}
        hideActions={!isCellHovered}
        maxImages={1}
        onEditImage={onEditImage}
        columnHeight={item?.data?.height ?? 50}
        showDeleteIcon={false}
        isColumnItem
        onChangeImage={onChangeImage}
        productTheme={productTheme}
        onDuplicate={onDuplicate}
        actionsPosition={actionsPosition}
        isAnyRowFocused={isAnyRowFocused}
        imageColumnIndex={imageColumnIndex}
      />
    </StyledColumnItem>
  )
}
