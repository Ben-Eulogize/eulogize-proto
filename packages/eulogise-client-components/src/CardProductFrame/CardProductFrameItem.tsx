import React, { useState } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'
import {
  CardProductViewDisplayMode,
  ICardProductFadeEdgeType,
  ICardProductFrameColumnsItem,
  ICardProductFrameContentItem,
  ICardProductFrameDisplayMode,
  ICardProductFrameItem,
  ICardProductFrameItemUiBaseProps,
  ICardProductFrameLayout,
  ICardProductFrameRowsItem,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { CardProductFrameColumns } from './items/CardProductFrameColumns'
import { CardProductFrameContent } from './items/CardProductFrameContent'
import { CardProductFrameRows } from './items/CardProductFrameRows'

const FADE_EDGE_MASK_SIZE = 5 // px

const StyledCardProductFrameItem = styled.div<{
  $flex?: CSS.Property.Flex
  $scale?: number
  $zIndex?: number
  $opacity?: number
  $fadeEdge?: ICardProductFadeEdgeType
}>`
  // somehow adding this line enforce the Editor to respect the position of this element - Fixed Image Overlay not matching - https://trello.com/c/AIhojc9d/903-image-overlay-not-matching-position-on-the-page
  transform: scale(1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $flex, $scale, $zIndex, $opacity, $fadeEdge }) => `
    ${$scale ? `zoom: ${$scale};` : ''}
    flex: ${$flex ?? 1};
    z-index: ${$zIndex ?? 1};
    opacity: ${$opacity};
    & > DIV > DIV > DIV > DIV  {
    ${
      $fadeEdge === ICardProductFadeEdgeType.ROUNDED
        ? `
          mask-image: radial-gradient(farthest-side at center, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 0) 100%);
          mask-size: 100% 100%;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-composite: intersect;
        `
        : $fadeEdge === ICardProductFadeEdgeType.RECTANGULAR
        ? `
          mask-image: 
            linear-gradient(to top, transparent 0, white ${
              FADE_EDGE_MASK_SIZE + 2
            }px, white calc(100% - ${
            FADE_EDGE_MASK_SIZE + 2
          }px), transparent calc(100% - 1px)),
            linear-gradient(to left, transparent 0%, white ${FADE_EDGE_MASK_SIZE}px, white calc(100% - ${FADE_EDGE_MASK_SIZE}px), transparent 100%);
          mask-composite: intersect;
          mask-repeat: no-repeat;
          clip-path: inset(2px 0 2px 0);
        `
        : ''
    }
    }
  `}
`

type ICardProductFrameItemProps = ICardProductFrameItemUiBaseProps &
  ICardProductFrameScaleProps & {
    item: ICardProductFrameItem
    scale?: number
  }

export const CardProductFrameItem = ({
  enableBorder,
  enableFadeImage,
  opacity,
  isFrameFocused,
  item,
  isResizing,
  selectedContentItemId,
  onContentItemClick,
  onContentItemChange,
  onDisplayModeChange,
  isItemSelectable,
  scale,
  containerRef,
  graphicFrame,
  frameDisplayMode = ICardProductFrameDisplayMode.VIEW,
  cardProductDisplayMode = CardProductViewDisplayMode.EDIT,
  maxPhotoSize,
  repositionContentItemId,
}: ICardProductFrameItemProps) => {
  const { type, ...itemProps } = item
  const [currentComponentDisplayMode, setCurrentComponentDisplayMode] =
    useState<ICardProductFrameDisplayMode>(ICardProductFrameDisplayMode.VIEW)
  const uiBaseProps = {
    enableBorder,
    opacity,
    isResizing,
    isFrameFocused,
    frameDisplayMode,
    graphicFrame,
    selectedContentItemId,
    onContentItemClick,
    onContentItemChange,
    isItemSelectable,
    cardProductDisplayMode,
    maxPhotoSize,
    repositionContentItemId,
    onDisplayModeChange: (displayMode: ICardProductFrameDisplayMode) => {
      setCurrentComponentDisplayMode(displayMode)
      onDisplayModeChange(displayMode)
    },
  }
  const scaleProps: ICardProductFrameScaleProps = {
    containerRef,
  }
  return (
    <StyledCardProductFrameItem
      className={`card-product-frame-item resizing-${isResizing} mode-${currentComponentDisplayMode}`}
      $flex={item.flex}
      $scale={scale}
      $zIndex={
        currentComponentDisplayMode === ICardProductFrameDisplayMode.EDIT
          ? 5
          : 1
      }
      $opacity={
        frameDisplayMode === ICardProductFrameDisplayMode.VIEW
          ? 1
          : currentComponentDisplayMode === ICardProductFrameDisplayMode.EDIT
          ? 1
          : 0.4
      }
      $fadeEdge={
        enableFadeImage &&
        frameDisplayMode === ICardProductFrameDisplayMode.VIEW
          ? (item as ICardProductFrameLayout).fadeEdge
          : ICardProductFadeEdgeType.NONE
      }
    >
      {type === 'content' ? (
        <CardProductFrameContent
          {...(itemProps as ICardProductFrameContentItem)}
          {...uiBaseProps}
          {...scaleProps}
        />
      ) : type === 'columns' ? (
        <CardProductFrameColumns
          {...(itemProps as ICardProductFrameColumnsItem)}
          {...uiBaseProps}
          {...scaleProps}
        />
      ) : type === 'rows' ? (
        <CardProductFrameRows
          {...(itemProps as ICardProductFrameRowsItem)}
          {...uiBaseProps}
          {...scaleProps}
        />
      ) : null}
    </StyledCardProductFrameItem>
  )
}
