import { EXPORT_PRODUCT_NAME } from '../core/constants'
import {
  CardProductPageMode,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'
import { PhotobookPdfHelper } from './PhotobookPdfHelper'

export class PhotobookController extends CardProductBaseController {
  public static async generatePhotobook(
    photobook: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
    pageMode?: CardProductPageMode,
  ): Promise<void> {
    await this.generateCardProductPdf({
      cardProduct: photobook,
      productName: EXPORT_PRODUCT_NAME.PHOTOBOOK,
      productTheme,
      generatePdfFile: PhotobookPdfHelper.generatePdfFile,
      bleed,
      pageMode,
    })
  }
}
