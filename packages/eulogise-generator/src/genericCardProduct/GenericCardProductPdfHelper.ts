import { CardProductPdfHelper } from '../helpers/CardProductPdfHelper'
import {
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductTypeData,
} from '@eulogise/core'

export class GenericCardProductPdfHelper {
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
      product: EulogiseProduct.GENERIC_CARD_PRODUCT,
      productTheme,
      bleed,
      useMock,
    })
  }
}
