import React from 'react'

import 'draft-js/dist/Draft.css'
import { CardProductPage } from './CardProductPage'
import { CardProductPageStory } from './CardProductPage.stories.component'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import {
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_AURA,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_CLASSIC,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRACE,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRANDEUR,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_LINEN,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_REFLECTION,
} from './CardProductPageTvWelcomeScreen.stories.data'
import { TV_WELCOME_SCREEN_THEMES } from '@eulogise/core'

export default {
  title: 'CardProductPage/TvWelcomeScreen',
  component: CardProductPage,
  argTypes: {},
}

const Template = ({ cardProduct }: { cardProduct: ICardProductData }) => (
  <CardProductPageStory
    cardProduct={cardProduct}
    productTheme={
      TV_WELCOME_SCREEN_THEMES.find(
        (t: ICardProductTheme) => t.id === cardProduct.content.theme,
      )!
    }
    product={EulogiseProduct.TV_WELCOME_SCREEN}
  />
)

export const Aura = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_AURA} />
)
export const Grandeur = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRANDEUR} />
)
export const Linen = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_LINEN} />
)
export const Reflection = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_REFLECTION} />
)
export const Grace = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRACE} />
)
export const Classic = () => (
  <Template cardProduct={STORIES_MOCK_TV_WELCOME_SCREEN_DATA_CLASSIC} />
)
