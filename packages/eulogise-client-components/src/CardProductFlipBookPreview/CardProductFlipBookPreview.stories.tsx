import React, { useRef } from 'react'

import { CardProductFlipBookPreview } from './CardProductFlipBookPreview'
import {
  EulogiseProduct,
  EulogiseRegion,
  ICardProductTheme,
} from '@eulogise/core'
import {
  MOCK_BOOKLET_1,
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
  MOCK_SIDED_CARD_1,
  MOCK_THEMES,
} from '@eulogise/mock'

export default {
  title: 'CardProduct/CardProductFlipBook',
  component: CardProductFlipBookPreview,
  argTypes: {},
}

export const Booklet = () => {
  const bookRef = useRef()
  const product = EulogiseProduct.BOOKLET
  const region = EulogiseRegion.AU
  const cardProduct = MOCK_BOOKLET_1
  const productTheme = MOCK_THEMES.find(
    (t) => t.id === cardProduct.content.theme,
  )?.products.booklet as ICardProductTheme
  return (
    <CardProductFlipBookPreview
      bookRef={bookRef}
      product={product}
      cardProduct={cardProduct}
      region={region}
      onPreviewModalWidthChange={(w) => console.log(w)}
      productTheme={productTheme}
    />
  )
}

export const MemorialCard = () => {
  const bookRef = useRef()
  const product = EulogiseProduct.SIDED_CARD
  const region = EulogiseRegion.AU
  const cardProduct = MOCK_SIDED_CARD_1
  const productTheme = MOCK_THEMES.find(
    (t) => t.id === cardProduct.content.theme,
  )?.products.sidedCard as ICardProductTheme
  return (
    <CardProductFlipBookPreview
      bookRef={bookRef}
      product={product}
      cardProduct={cardProduct}
      region={region}
      onPreviewModalWidthChange={(w) => console.log(w)}
      productTheme={productTheme}
    />
  )
}

export const Photobook = () => {
  const bookRef = useRef()
  const product = EulogiseProduct.PHOTOBOOK
  const region = EulogiseRegion.AU
  const cardProduct = MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1
  const productTheme = {} as ICardProductTheme
  return (
    <CardProductFlipBookPreview
      bookRef={bookRef}
      cardProduct={cardProduct}
      region={region}
      product={product}
      productTheme={productTheme}
      onPreviewModalWidthChange={(w) => console.log(w)}
    />
  )
}
