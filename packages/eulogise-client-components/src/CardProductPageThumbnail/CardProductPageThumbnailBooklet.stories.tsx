import React from 'react'
import { CardProductPageThumbnail } from './CardProductPageThumbnail'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import {
  STORIES_MOCK_BOOKLET_DATA_AURA,
  STORIES_MOCK_BOOKLET_DATA_CLASSIC,
  STORIES_MOCK_BOOKLET_DATA_GRACE,
  STORIES_MOCK_BOOKLET_DATA_GRANDEUR,
  STORIES_MOCK_BOOKLET_DATA_GRANDEUR_PIER_BACKGROUND,
  STORIES_MOCK_BOOKLET_DATA_LINEN,
  STORIES_MOCK_BOOKLET_DATA_REFLECTION,
} from '../CardProductPage/CardProductPageBooklet.stories.data'
import { BOOKLET_THEMES } from '@eulogise/core'

export default {
  title: 'CardProductPageThumbnail/BookletThumbnail',
  component: CardProductPageThumbnail,
  argTypes: {},
}

const Template = ({ cardProduct }: { cardProduct: ICardProductData }) => {
  return (
    <CardProductPageThumbnail
      cardProduct={cardProduct}
      productTheme={
        BOOKLET_THEMES.find(
          (t: ICardProductTheme) => t.id === cardProduct.content.theme,
        )!
      }
      product={EulogiseProduct.BOOKLET}
    />
  )
}

export const Aura = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_AURA} />
)

export const Grandeur = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_GRANDEUR} />
)

export const GrandeurWithPierBackground = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_GRANDEUR_PIER_BACKGROUND} />
)

export const Linen = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_LINEN} />
)

export const Reflection = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_REFLECTION} />
)

export const Grace = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_GRACE} />
)

export const Classic = () => (
  <Template cardProduct={STORIES_MOCK_BOOKLET_DATA_CLASSIC} />
)
