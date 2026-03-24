import React from 'react'
import styled from 'styled-components'
import {
  ICardProductFrameColumnsItem,
  ICardProductFrameItem,
  ICardProductFrameItemUiBaseProps,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { CardProductFrameItem } from '../CardProductFrameItem'
import { STYLE } from '@eulogise/client-core'

const StyledCardProductFrameColumns = styled.div<{
  $width?: number
  $height?: number
}>`
  display: flex;
  flex-direction: row;
  gap: ${STYLE.CARD_PRODUCT_FRAME_GAP};
  ${({ $width }) => ($width ? `width: ${$width}px;` : `width: 100%;`)};
  ${({ $height }) => ($height ? `height: ${$height}px;` : `height: 100%;`)};
`

type ICardProductFrameColumnsProps = ICardProductFrameColumnsItem &
  ICardProductFrameItemUiBaseProps &
  ICardProductFrameScaleProps

export const CardProductFrameColumns = ({
  items,
  width,
  height,
  containerRef,
  ...uiBaseProps
}: ICardProductFrameColumnsProps) => (
  <StyledCardProductFrameColumns
    className="card-product-frame-columns"
    $width={width}
    $height={height}
  >
    {items.map((item: ICardProductFrameItem, index: number) => (
      <CardProductFrameItem
        key={index}
        item={item}
        containerRef={containerRef}
        {...uiBaseProps}
      />
    ))}
  </StyledCardProductFrameColumns>
)
