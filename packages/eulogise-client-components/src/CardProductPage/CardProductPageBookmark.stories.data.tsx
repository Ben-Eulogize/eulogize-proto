import {
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductData,
  ICardProductTheme,
  MemorialVisualStatus,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { BOOKMARK_THEMES } from '@eulogise/core'

const createDummyBookmarkData = (themeId: string): ICardProductData => {
  const productTheme = getTheme(themeId)
  return {
    content: {
      pageMargins: CardProductHelper.getDefaultAUPageMargins({
        product: EulogiseProduct.BOOKMARK,
      })!,
      pageSize: CardProductPageSize.BOOKMARK,
      theme: themeId,
      pageOrientation: CardProductPageOrientation.PORTRAIT,
      pages: productTheme.defaultContent!,
    },
    updatedAt: '2023-01-10T07:48:51.863Z',
    status: MemorialVisualStatus.THEME_SELECTED,
    createdAt: '2023-01-06T05:10:56.451Z',
    id: '71637251-d9e4-4a1d-ab1b-e4e88c7c3f99',
    case: 'a5d79550-76b9-4357-a15f-bdd20a22734d',
  }
}

const getTheme = (themeId: string): ICardProductTheme =>
  CardProductHelper.createDynamicTheme({
    themeId,
    product: EulogiseProduct.BOOKMARK,
    productTheme: BOOKMARK_THEMES.find((t) => t.id === themeId)!,
    variables: { region: EulogiseRegion.AU },
  })

export const STORIES_MOCK_BOOKMARK_DATA_AURA: ICardProductData =
  createDummyBookmarkData('aura')

export const STORIES_MOCK_BOOKMARK_DATA_GRANDEUR: ICardProductData =
  createDummyBookmarkData('grandeur')

export const STORIES_MOCK_BOOKMARK_DATA_LINEN: ICardProductData =
  createDummyBookmarkData('linen')

export const STORIES_MOCK_BOOKMARK_DATA_REFLECTION: ICardProductData =
  createDummyBookmarkData('reflection')

export const STORIES_MOCK_BOOKMARK_DATA_GRACE: ICardProductData =
  createDummyBookmarkData('grace')

export const STORIES_MOCK_BOOKMARK_DATA_CLASSIC: ICardProductData =
  createDummyBookmarkData('classic')
