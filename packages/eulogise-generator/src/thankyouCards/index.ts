import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { ThankyouCardPdfHelper } from './ThankyouCardPdfHelper'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'

export class ThankyouCardController extends CardProductBaseController {
  public static async generateThankyouCard(
    thankyouCard: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
  ) {
    await this.generateCardProductPdf({
      cardProduct: thankyouCard,
      productName: EXPORT_PRODUCT_NAME.THANKYOUCARD,
      productTheme,
      generatePdfFile: ThankyouCardPdfHelper.generatePdfFile,
      bleed,
    })
  }
}
