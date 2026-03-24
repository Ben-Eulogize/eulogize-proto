import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'

export class BookmarkPdfHelper {
  public static generatePdfFile({
    cardProduct,
    productTheme,
    bleed,
    useMock = false,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed: boolean
    useMock?: boolean
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    return CardProductPdfHelper.generatePdfFile({
      cardProduct,
      product: EulogiseProduct.BOOKMARK,
      productTheme,
      bleed,
      useMock,
    })
  }
}
