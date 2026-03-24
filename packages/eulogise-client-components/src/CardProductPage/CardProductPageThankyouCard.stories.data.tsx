import {
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { THANK_YOU_CARD_THEMES } from '@eulogise/core'

const getTheme = (themeId: string): ICardProductTheme => {
  return CardProductHelper.createDynamicTheme({
    themeId,
    product: EulogiseProduct.THANK_YOU_CARD,
    productTheme: THANK_YOU_CARD_THEMES.find((t) => t.id === themeId)!,
    variables: { region: EulogiseRegion.AU },
  })
}

export const STORIES_MOCK_THANKYOU_CARD_DATA_AURA: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('aura'),
  })

export const STORIES_MOCK_THANKYOU_CARD_DATA_GRANDEUR: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('grandeur'),
  })

export const STORIES_MOCK_THANKYOU_CARD_DATA_LINEN: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('linen'),
  })

export const STORIES_MOCK_THANKYOU_CARD_DATA_REFLECTION: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('reflection'),
  })

export const STORIES_MOCK_THANKYOU_CARD_DATA_GRACE: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('grace'),
  })

export const STORIES_MOCK_THANKYOU_CARD_DATA_CLASSIC: ICardProductData =
  CardProductHelper.createDummyThankYouCardData({
    productTheme: getTheme('classic'),
  })
