import React from 'react'
import styled from 'styled-components'
import CSS from 'csstype'
import {
  ICardProductFrameItemUiBaseProps,
  ICardProductFrameLayout,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { CardProductFrameItem } from './CardProductFrameItem'
import { CardProductFrameHelper } from '@eulogise/helpers'

const BORDER_WIDTH = 5

export type ICardProductFrameProps = ICardProductFrameItemUiBaseProps &
  ICardProductFrameScaleProps & {
    layout: ICardProductFrameLayout | undefined
    isThumbnail?: boolean
  }

const StyledCardProductFrame = styled.div<{
  $height?: CSS.Property.Height
  $width?: CSS.Property.Width
  $showBorder?: boolean
  $transform?: string
  $opacity?: number
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $height, $width, $transform }) => `
    ${
      $height
        ? `height: ${typeof $height === 'number' ? `${$height}px` : $height};`
        : ''
    }
    ${
      $width
        ? `width: ${typeof $width === 'number' ? `${$width}px` : $width};`
        : ''
    }
    ${$transform ? `transform: ${$transform};` : ''}
  `}
  ${({ $showBorder }) =>
    $showBorder
      ? `
      border: ${BORDER_WIDTH}px solid white;
      border-radius: 1%;
      background-color: white;
      `
      : `
      border: none;
      border-radius: 0;
      background-color: none;
      `}
  ${({ $opacity }) =>
    $opacity !== undefined && $opacity < 100
      ? `opacity: ${$opacity / 100};`
      : ''}
`

export const CardProductFrame = ({
  layout,
  containerRef,
  isThumbnail = false,
  ...uiBaseProps
}: ICardProductFrameProps) => {
  if (!layout) {
    throw new Error('"layout" is not defined')
  }

  // if the frame item only contains more than 1 image,
  // the border should be in the StyledCardProductFrame
  // else, pass along the enableBorder flag
  const imageCount = CardProductFrameHelper.getNoOfPhotosInFrameLayout(layout)
  let showFrameBorder = uiBaseProps.enableBorder
  if (imageCount > 1) {
    uiBaseProps.enableBorder = false
  }

  const graphicFrame = layout.graphicFrame
  return (
    <StyledCardProductFrame
      className="card-product-frame"
      $height={`${layout.height! + BORDER_WIDTH * 2}px`}
      $width={`${layout.width! + BORDER_WIDTH * 2}px`}
      $showBorder={imageCount > 1 ? showFrameBorder : false}
      $opacity={uiBaseProps.opacity}
      $transform={
        isThumbnail
          ? // use thumbnailTransform if it is defined, else use containerTransform
            graphicFrame?.thumbnailTransform ?? graphicFrame?.containerTransform
          : graphicFrame?.containerTransform
      }
    >
      <CardProductFrameItem
        item={layout}
        containerRef={containerRef}
        graphicFrame={graphicFrame}
        {...uiBaseProps}
      />
    </StyledCardProductFrame>
  )
}
