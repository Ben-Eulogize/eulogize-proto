import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import {
  ICardProductData,
  EulogiseProduct,
  ICardProductTheme,
} from '@eulogise/core'

export class BookletPdfHelper {
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
      product: EulogiseProduct.BOOKLET,
      productTheme,
      bleed,
      useMock,
    })
  }
}
