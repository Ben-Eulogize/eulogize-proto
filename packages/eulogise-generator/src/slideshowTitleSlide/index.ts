import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'
import { SlideshowTitleSlidePdfHelper } from './SlideshowTitleSlidePdfHelper'

export class SlideshowTitleSlideController extends CardProductBaseController {
  public static async generateSlideshowTitleSlide(
    slideshowTitleSlide: ICardProductData,
    productTheme: ICardProductTheme,
  ) {
    await this.generateCardProductPdf({
      cardProduct: slideshowTitleSlide,
      productName: EXPORT_PRODUCT_NAME.SLIDESHOW_TITLE_SLIDE,
      productTheme,
      generatePdfFile: SlideshowTitleSlidePdfHelper.generateImageFile,
      bleed: false,
      fileType: 'jpg',
    })
  }
}
