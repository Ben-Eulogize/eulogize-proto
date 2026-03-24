import { EulogiseProduct, ICardProductTheme } from '@eulogise/core'
import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import { ICardProductData } from '@eulogise/core'

export class SidedCardPdfHelper {
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
      bleed,
      product: EulogiseProduct.SIDED_CARD,
      productTheme,
      useMock,
    })
  }
}
