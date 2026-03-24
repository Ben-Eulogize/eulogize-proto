import React from 'react'
import styled from 'styled-components'
import { CardProductFrame } from './CardProductFrame'
import {
  EulogiseProduct,
  FRAME_THUMBNAIL_SIZE,
  ICardProductFrameLayout,
  ICardProductFrameScaleProps,
  PAGE_SIZES,
} from '@eulogise/core'
import { CardProductFrameHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'

type ICardProductFrameThumbnailProps = {
  layout: ICardProductFrameLayout
  onClick?: (selectedLayout: ICardProductFrameLayout) => void
  selected: boolean
  product: EulogiseProduct
} & ICardProductFrameScaleProps

const padding = 10

const StyledCardProductFrameThumbnail = styled.div<{
  $selected: boolean
  $product: EulogiseProduct
}>`
  ${({ $selected, $product }) =>
    `${
      $product === EulogiseProduct.PHOTOBOOK
        ? `width: ${PAGE_SIZES.PHOTOBOOK_THUMBNAIL[0]}px;`
        : `width: ${FRAME_THUMBNAIL_SIZE}px;`
    }
     ${
       $selected
         ? `border: 1px solid ${COLOR.CORNFLOWER_BLUE};`
         : `border: 1px solid ${COLOR.CORE_PURPLE_30};`
     } 
   `}
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${FRAME_THUMBNAIL_SIZE}px;
  cursor: pointer;
  /*
  .card-product-frame-content-box {
    background-color: ${COLOR.CORNFLOWER_BLUE};
  }
*/
`

export const CardProductFrameThumbnail = ({
  layout,
  onClick,
  containerRef,
  selected,
  product,
}: ICardProductFrameThumbnailProps) => {
  const sizeWithPadding = FRAME_THUMBNAIL_SIZE - padding
  const isUseWidthScale = layout.width! > layout.height!
  const scale = isUseWidthScale
    ? sizeWithPadding / layout.width!
    : sizeWithPadding / layout.height!

  return (
    <StyledCardProductFrameThumbnail
      $selected={selected}
      $product={product}
      className={layout.layoutId}
      onClick={() => {
        if (onClick) {
          const newLayout = CardProductFrameHelper.generateIdForLayout(layout)
          onClick(newLayout)
        }
      }}
    >
      <CardProductFrame
        isThumbnail
        isItemSelectable={false}
        layout={{
          ...layout,
          width: layout.width! * scale * (layout.thumbnailWidth ?? 1),
          height: layout.height! * scale * (layout.thumbnailHeight ?? 1),
        }}
        onContentItemClick={() => {}}
        onContentItemChange={() => {}}
        onDisplayModeChange={() => {}}
        containerRef={containerRef}
      />
    </StyledCardProductFrameThumbnail>
  )
}
