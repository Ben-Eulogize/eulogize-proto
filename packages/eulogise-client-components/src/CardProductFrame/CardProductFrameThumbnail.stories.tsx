import React from 'react'
import {
  CARD_PRODUCT_FRAME_ONE_ARCH_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LEAF_LEFT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LEAF_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_TWO_CENTER_ONE_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_ONE_CENTER_TWO_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_ONE_LEFT_TWO_CENTER_TWO_RIGHT_LAYOUT,
} from '@eulogise/core'
import { CardProductFrameThumbnail } from './CardProductFrameThumbnail'
import { ICardProductFrameLayout } from '@eulogise/core'

export default {
  title: 'CardProduct/CardProductFrameThumbnail',
  component: CardProductFrameThumbnail,
  argTypes: {},
}

const CardProductFrameTemplate = ({
  layout,
}: {
  layout: ICardProductFrameLayout
}) => (
  <CardProductFrameThumbnail
    layout={layout}
    onClick={(sl) => console.log('selectedLayout', sl)}
  />
)

export const OnePortraitLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT} />
)

export const OneLandscapeLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT} />
)

export const OneSquareLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT} />
)

export const OneArchLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_ARCH_LAYOUT} />
)

export const OneLeafLeftLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_LEAF_LEFT_LAYOUT} />
)

export const OneLeafRightLayout = () => (
  <CardProductFrameTemplate layout={CARD_PRODUCT_FRAME_ONE_LEAF_RIGHT_LAYOUT} />
)

export const ThreeColumnsTwoLeftOneCenterTwoRight = () => (
  <CardProductFrameTemplate
    layout={
      CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_ONE_CENTER_TWO_RIGHT_LAYOUT
    }
  />
)
export const ThreeColumnsTwoLeftTwoCenterOneRight = () => (
  <CardProductFrameTemplate
    layout={
      CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_TWO_CENTER_ONE_RIGHT_LAYOUT
    }
  />
)

export const ThreeColumnsOneLeftTwoCenterTwoRight = () => (
  <CardProductFrameTemplate
    layout={
      CARD_PRODUCT_FRAME_THREE_COLUMNS_ONE_LEFT_TWO_CENTER_TWO_RIGHT_LAYOUT
    }
  />
)
