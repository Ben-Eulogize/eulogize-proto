/* WARNING: Please modify this file with caution (especially the file name and exported variables as this is used by our GENERATOR */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import 'draft-js/dist/Draft.css'
import { CardProductPage } from './CardProductPage'
import {
  CardProductViewDisplayMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import { CardProductPreview } from './CardProductPreview'
import {
  STORIES_MOCK_BOOKLET_DATA_AURA,
  STORIES_MOCK_BOOKLET_DATA_CLASSIC,
  STORIES_MOCK_BOOKLET_DATA_GRACE,
  STORIES_MOCK_BOOKLET_DATA_GRANDEUR,
  STORIES_MOCK_BOOKLET_DATA_LINEN,
  STORIES_MOCK_BOOKLET_DATA_REFLECTION,
} from './CardProductPageBooklet.stories.data'
import { CardProductHelper, UrlHelper } from '@eulogise/helpers'
import {
  STORIES_MOCK_BOOKMARK_DATA_AURA,
  STORIES_MOCK_BOOKMARK_DATA_CLASSIC,
  STORIES_MOCK_BOOKMARK_DATA_GRACE,
  STORIES_MOCK_BOOKMARK_DATA_GRANDEUR,
  STORIES_MOCK_BOOKMARK_DATA_LINEN,
  STORIES_MOCK_BOOKMARK_DATA_REFLECTION,
} from './CardProductPageBookmark.stories.data'
import {
  STORIES_MOCK_THANKYOU_CARD_DATA_AURA,
  STORIES_MOCK_THANKYOU_CARD_DATA_CLASSIC,
  STORIES_MOCK_THANKYOU_CARD_DATA_GRACE,
  STORIES_MOCK_THANKYOU_CARD_DATA_GRANDEUR,
  STORIES_MOCK_THANKYOU_CARD_DATA_LINEN,
  STORIES_MOCK_THANKYOU_CARD_DATA_REFLECTION,
} from './CardProductPageThankyouCard.stories.data'
import { Spin } from '../Spin'
import {
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_AURA,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_CLASSIC,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRACE,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRANDEUR,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_LINEN,
  STORIES_MOCK_TV_WELCOME_SCREEN_DATA_REFLECTION,
} from './CardProductPageTvWelcomeScreen.stories.data'
import {
  BOOKLET_THEMES,
  BOOKMARK_THEMES,
  THANK_YOU_CARD_THEMES,
  TV_WELCOME_SCREEN_THEMES,
} from '@eulogise/core'

export default {
  title: 'CardProductPage/ForGenerator',
  component: CardProductPage,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
}

const MockCardProductMap = {
  [EulogiseProduct.BOOKLET]: {
    themes: BOOKLET_THEMES,
    mockData: {
      aura: STORIES_MOCK_BOOKLET_DATA_AURA,
      grandeur: STORIES_MOCK_BOOKLET_DATA_GRANDEUR,
      linen: STORIES_MOCK_BOOKLET_DATA_LINEN,
      reflection: STORIES_MOCK_BOOKLET_DATA_REFLECTION,
      grace: STORIES_MOCK_BOOKLET_DATA_GRACE,
      classic: STORIES_MOCK_BOOKLET_DATA_CLASSIC,
    },
  },
  [EulogiseProduct.SIDED_CARD]: {
    themes: BOOKLET_THEMES,
    mockData: {
      aura: STORIES_MOCK_BOOKLET_DATA_AURA,
      grandeur: STORIES_MOCK_BOOKLET_DATA_GRANDEUR,
      linen: STORIES_MOCK_BOOKLET_DATA_LINEN,
      reflection: STORIES_MOCK_BOOKLET_DATA_REFLECTION,
      grace: STORIES_MOCK_BOOKLET_DATA_GRACE,
      classic: STORIES_MOCK_BOOKLET_DATA_CLASSIC,
    },
  },
  [EulogiseProduct.BOOKMARK]: {
    themes: BOOKMARK_THEMES,
    mockData: {
      aura: STORIES_MOCK_BOOKMARK_DATA_AURA,
      grandeur: STORIES_MOCK_BOOKMARK_DATA_GRANDEUR,
      linen: STORIES_MOCK_BOOKMARK_DATA_LINEN,
      reflection: STORIES_MOCK_BOOKMARK_DATA_REFLECTION,
      grace: STORIES_MOCK_BOOKMARK_DATA_GRACE,
      classic: STORIES_MOCK_BOOKMARK_DATA_CLASSIC,
    },
  },
  [EulogiseProduct.THANK_YOU_CARD]: {
    themes: THANK_YOU_CARD_THEMES,
    mockData: {
      aura: STORIES_MOCK_THANKYOU_CARD_DATA_AURA,
      grandeur: STORIES_MOCK_THANKYOU_CARD_DATA_GRANDEUR,
      linen: STORIES_MOCK_THANKYOU_CARD_DATA_LINEN,
      reflection: STORIES_MOCK_THANKYOU_CARD_DATA_REFLECTION,
      grace: STORIES_MOCK_THANKYOU_CARD_DATA_GRACE,
      classic: STORIES_MOCK_THANKYOU_CARD_DATA_CLASSIC,
    },
  },
  [EulogiseProduct.TV_WELCOME_SCREEN]: {
    themes: TV_WELCOME_SCREEN_THEMES,
    mockData: {
      aura: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_AURA,
      grandeur: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRANDEUR,
      linen: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_LINEN,
      reflection: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_REFLECTION,
      grace: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRACE,
      classic: STORIES_MOCK_TV_WELCOME_SCREEN_DATA_CLASSIC,
    },
  },
}

const getCardMockData = (
  product: EulogiseProduct,
): {
  themes: Array<ICardProductTheme>
  mockData: { [key: string]: ICardProductData }
} => {
  // @ts-ignore
  return MockCardProductMap[product]!
}

const CardProductForGenerator = ({
  product,
  bleed,
  // for mock
  theme,
  // for requesting a product
  webToken,
  productId,
  apiUrl,
  useMock,
}: {
  theme?: string
  productId?: string
  apiUrl?: string
  webToken?: string
  product: EulogiseProduct
  bleed?: boolean
  useMock?: boolean
}) => {
  const [cardProduct, setCardProduct] = useState<ICardProductData | null>(null)
  if (!product) {
    return <div>Please specify "product" in your query parameter.</div>
  }
  // no theme and no apiUrl
  if (useMock && !theme) {
    return <div>Please specify "theme" in your query parameter.</div>
  }
  if (!useMock) {
    if (!apiUrl) {
      return <div>Please specify apiUrl</div>
    }
    if (!productId) {
      return <div>Please specify productId</div>
    }
    if (!webToken) {
      return <div>Please specify webToken</div>
    }
  }

  const data = getCardMockData(product)
  if (!data) {
    return (
      <div>
        No card mock found for product: ({product}) for theme ({theme})
      </div>
    )
  }
  const { mockData, themes } = data

  useEffect(() => {
    // use mock data if "theme" is specified in the query parameter
    if (useMock && theme) {
      setCardProduct(mockData[theme])
    }
    const fetchCardProductData = async () => {
      const response = await axios({
        url: `${apiUrl}/resource/find`,
        method: 'POST',
        params: {
          webtoken: webToken,
        },
        data: {
          resource: CardProductHelper.getResourceByProduct(product),
          search: {
            id: productId,
          },
        },
      })
      // @ts-ignore
      const items = response.data.items
      if (items.length > 0) {
        setCardProduct(items[items.length - 1])
      }
    }
    fetchCardProductData()
  }, [])

  if (!cardProduct) {
    return <Spin />
  }
  return (
    <CardProductPreview
      cardProduct={cardProduct}
      productTheme={
        themes.find(
          (t: ICardProductTheme) => t.id === cardProduct.content.theme,
        )!
      }
      product={product}
      displayMode={CardProductViewDisplayMode.PRINT}
      bleed={bleed}
    />
  )
}

export const PrintForTheme = () => {
  const { product, theme, webToken, apiUrl, productId, useMock } =
    // @ts-ignore
    UrlHelper.getQueryParams(document.location.search)
  const bleed: string = UrlHelper.getQueryParam(
    'bleed',
    // @ts-ignore
    document.location.search,
  )
  return (
    <CardProductForGenerator
      theme={theme}
      webToken={webToken}
      productId={productId}
      apiUrl={apiUrl}
      product={product as EulogiseProduct}
      useMock={useMock === 'true'}
      bleed={bleed === 'true'}
    />
  )
}
