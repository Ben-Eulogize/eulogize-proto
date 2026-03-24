import {
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseProduct,
  ICardProductData,
  ICardProductPage,
  ICardProductTheme,
  ITheme,
  MemorialVisualStatus,
} from '@eulogise/core'
import { CardProductHelper, ThemeHelper } from '@eulogise/helpers'
import { BOOKLET_THEMES } from '@eulogise/core'

export const CardProductPageBookletStoryHelper = {
  createDummyBookletData: (
    theme: ITheme,
    backgroundPaths?: Array<string>,
  ): ICardProductData => {
    const productTheme = ThemeHelper.getProductThemeByProductType({
      theme,
      product: EulogiseProduct.BOOKLET,
    }) as ICardProductTheme
    const pages = (productTheme.defaultContent as Array<ICardProductPage>).map(
      (p, index) => {
        if (!backgroundPaths) {
          return p
        }
        return {
          ...p,
          background: {
            ...p.background,
            image: {
              filepath: backgroundPaths[index],
            },
          },
        }
      },
    )

    return {
      content: {
        pageMargins: CardProductHelper.getDefaultAUPageMargins({
          product: EulogiseProduct.BOOKLET,
        })!,
        pageSize: CardProductPageSize.A5,
        theme: theme.id!,
        pageOrientation: CardProductPageOrientation.PORTRAIT,
        pages,
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: '71637251-d9e4-4a1d-ab1b-e4e88c7c3f99',
      case: 'a5d79550-76b9-4357-a15f-bdd20a22734d',
    }
  },

  getBookletTheme: (themeId: string) =>
    CardProductHelper.createDynamicTheme({
      themeId,
      product: EulogiseProduct.BOOKLET,
      productTheme: BOOKLET_THEMES.find((t) => t.id === themeId)!,
    }),
}
