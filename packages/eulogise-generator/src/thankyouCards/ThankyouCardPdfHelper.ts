import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import { EulogiseProduct, ICardProductTheme } from '@eulogise/core'
import { ICardProductData } from '@eulogise/core'

export class ThankyouCardPdfHelper {
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
      product: EulogiseProduct.THANK_YOU_CARD,
      productTheme,
      useMock,
    })
  }
}
