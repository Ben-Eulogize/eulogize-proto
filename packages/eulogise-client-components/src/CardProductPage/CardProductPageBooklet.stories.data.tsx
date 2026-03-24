import { EulogiseProduct, ICardProductData } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { BOOKLET_THEMES } from '@eulogise/core'

const createDummyBookletData = (
  themeId: string,
  backgroundPaths?: Array<string>,
): ICardProductData => {
  return CardProductHelper.createDummyBookletData({
    productTheme: getTheme(themeId),
    backgroundPaths,
  })
}

const getTheme = (themeId: string) =>
  CardProductHelper.createDynamicTheme({
    themeId,
    product: EulogiseProduct.BOOKLET,
    productTheme: BOOKLET_THEMES.find((t) => t.id === themeId)!,
  })

export const STORIES_MOCK_BOOKLET_DATA_AURA: ICardProductData =
  createDummyBookletData('aura')

export const STORIES_MOCK_BOOKLET_DATA_GRANDEUR: ICardProductData =
  createDummyBookletData('grandeur')

export const STORIES_MOCK_BOOKLET_DATA_GRANDEUR_PIER_BACKGROUND: ICardProductData =
  createDummyBookletData('grandeur', [
    'backgroundImages/Pier/AU/Pier_BOOKLET_FRONT.jpg',
    'backgroundImages/Pier/AU/Pier_BOOKLET_LEFT.jpg',
    'backgroundImages/Pier/AU/Pier_BOOKLET_RIGHT.jpg',
    'backgroundImages/Pier/AU/Pier_BOOKLET_BACK.jpg',
  ])

export const STORIES_MOCK_BOOKLET_DATA_LINEN: ICardProductData =
  createDummyBookletData('linen')

export const STORIES_MOCK_BOOKLET_DATA_REFLECTION: ICardProductData =
  createDummyBookletData('reflection')

export const STORIES_MOCK_BOOKLET_DATA_GRACE: ICardProductData =
  createDummyBookletData('grace')

export const STORIES_MOCK_BOOKLET_DATA_CLASSIC: ICardProductData =
  createDummyBookletData('classic')
