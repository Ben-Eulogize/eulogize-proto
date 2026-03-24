import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { BookletPdfHelper } from './BookletPdfHelper'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'

export class BookletController extends CardProductBaseController {
  public static async generateBooklet(
    booklet: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
  ) {
    await this.generateCardProductPdf({
      cardProduct: booklet,
      productTheme,
      productName: EXPORT_PRODUCT_NAME.BOOKLET,
      bleed,
      generatePdfFile: BookletPdfHelper.generatePdfFile,
    })
  }
}
