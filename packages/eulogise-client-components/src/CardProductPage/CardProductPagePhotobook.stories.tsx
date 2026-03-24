import React from 'react'

import 'draft-js/dist/Draft.css'
import { CardProductPage } from './CardProductPage'
import { CardProductPageStory } from './CardProductPage.stories.component'
import { EulogiseProduct, ICardProductData } from '@eulogise/core'
import { PHOTOBOOK_DEFAULT_THEME } from '@eulogise/core'
import { STORIES_MOCK_PHOTOBOOK_DATA_DEFAULT } from './CardProductPagePhotobook.stories.data'

export default {
  title: 'CardProductPage/Photobook',
  component: CardProductPage,
  argTypes: {},
}

const Template = ({ cardProduct }: { cardProduct: ICardProductData }) => (
  <CardProductPageStory
    cardProduct={cardProduct}
    productTheme={PHOTOBOOK_DEFAULT_THEME}
    product={EulogiseProduct.PHOTOBOOK}
  />
)

export const Default = () => (
  <Template cardProduct={STORIES_MOCK_PHOTOBOOK_DATA_DEFAULT} />
)
