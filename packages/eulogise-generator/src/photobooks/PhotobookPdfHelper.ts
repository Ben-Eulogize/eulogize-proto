import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import {
  CardProductPageMode,
  EulogiseProduct,
  ICardProductTheme,
} from '@eulogise/core'
import { ICardProductData } from '@eulogise/core'

export class PhotobookPdfHelper {
  public static generatePdfFile({
    cardProduct,
    productTheme,
    bleed,
    useMock = false,
    pageMode,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed: boolean
    useMock?: boolean
    pageMode?: CardProductPageMode
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    return CardProductPdfHelper.generatePdfFile({
      cardProduct,
      bleed,
      product: EulogiseProduct.PHOTOBOOK,
      productTheme,
      useMock,
      pageMode,
    })
  }
}
