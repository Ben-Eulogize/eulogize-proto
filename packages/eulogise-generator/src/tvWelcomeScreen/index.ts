import { EXPORT_PRODUCT_NAME } from '../core/constants'
import { ICardProductData, ICardProductTheme } from '@eulogise/core'
import { CardProductBaseController } from '../cardProduct/CardProductBaseController'
import { TvWelcomeScreenCardPdfHelper } from './TvWelcomeScreenCardPdfHelper'

export class TvWelcomeScreenCardController extends CardProductBaseController {
  public static async generateTvWelcomeScreenCard(
    tvWelcomeScreen: ICardProductData,
    productTheme: ICardProductTheme,
  ) {
    await this.generateCardProductPdf({
      cardProduct: tvWelcomeScreen,
      productName: EXPORT_PRODUCT_NAME.TV_WELCOME_SCREEN,
      productTheme,
      generatePdfFile: TvWelcomeScreenCardPdfHelper.generateImageFile,
      bleed: false,
      fileType: 'jpg',
    })
  }
}
