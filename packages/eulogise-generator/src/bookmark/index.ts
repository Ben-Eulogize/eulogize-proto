import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { BookmarkPdfHelper } from './BookmarkPdfHelper'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'

export class BookmarkController extends CardProductBaseController {
  public static async generateBookmark(
    bookmark: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
  ) {
    await this.generateCardProductPdf({
      cardProduct: bookmark,
      productName: EXPORT_PRODUCT_NAME.BOOKMARK,
      productTheme,
      generatePdfFile: BookmarkPdfHelper.generatePdfFile,
      bleed,
    })
  }
}
