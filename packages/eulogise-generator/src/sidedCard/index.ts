import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { SidedCardPdfHelper } from './SidedCardPdfHelper'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'

export class SidedCardController extends CardProductBaseController {
  public static async generateSidedCard(
    sidedCard: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
  ) {
    await this.generateCardProductPdf({
      cardProduct: sidedCard,
      productName: EXPORT_PRODUCT_NAME.SIDEDCARD,
      productTheme,
      generatePdfFile: SidedCardPdfHelper.generatePdfFile,
      bleed,
    })
  }
}
