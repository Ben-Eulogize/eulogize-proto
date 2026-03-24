import React from 'react'
import styled from 'styled-components'
import {
  ICardProductFrameItem,
  ICardProductFrameItemUiBaseProps,
  ICardProductFrameRowsItem,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { CardProductFrameItem } from '../CardProductFrameItem'
import { STYLE } from '@eulogise/client-core'

type ICardProductFrameRowsProps = Exclude<ICardProductFrameRowsItem, 'type'> &
  ICardProductFrameItemUiBaseProps &
  ICardProductFrameScaleProps

const StyledCardProductFrameRows = styled.div<{
  $width?: number
  $height?: number
}>`
  display: flex;
  flex-direction: column;
  gap: ${STYLE.CARD_PRODUCT_FRAME_GAP};
  ${({ $width }) => ($width ? `width: ${$width}px;` : `width: 100%;`)};
  ${({ $height }) => ($height ? `height: ${$height}px;` : `height: 100%;`)};
`

export const CardProductFrameRows = ({
  items,
  width,
  height,
  containerRef,
  ...uiBaseProps
}: ICardProductFrameRowsProps) => {
  return (
    <StyledCardProductFrameRows
      className="card-product-frame-rows"
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
    </StyledCardProductFrameRows>
  )
}
