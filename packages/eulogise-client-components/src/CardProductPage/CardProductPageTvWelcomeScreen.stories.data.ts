import {
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { TV_WELCOME_SCREEN_THEMES } from '@eulogise/core'

const getTheme = (themeId: string): ICardProductTheme =>
  CardProductHelper.createDynamicTheme({
    themeId,
    product: EulogiseProduct.TV_WELCOME_SCREEN,
    productTheme: TV_WELCOME_SCREEN_THEMES.find((t) => t.id === themeId)!,
    variables: { region: EulogiseRegion.AU },
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_AURA: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('aura'),
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRANDEUR: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('grandeur'),
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_LINEN: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('linen'),
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_REFLECTION: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('reflection'),
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_GRACE: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('grace'),
  })

export const STORIES_MOCK_TV_WELCOME_SCREEN_DATA_CLASSIC: ICardProductData =
  CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme: getTheme('classic'),
  })
