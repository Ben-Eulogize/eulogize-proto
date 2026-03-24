import { EulogiseProduct, ICardProductTheme } from '@eulogise/core'
import { ICardProductData } from '@eulogise/core'
import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'

export class TvWelcomeScreenCardPdfHelper {
  public static async generateImageFile({
    cardProduct,
    productTheme,
  }: {
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed: boolean
    useMock?: boolean
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    const { filePath, htmlFilePath } =
      await PuppeteerCardProductHelper.generateCardProduct({
        cardProduct,
        product: EulogiseProduct.TV_WELCOME_SCREEN,
        productTheme,
        type: 'jpg',
        bleed: false,
        scale: 1,
        deviceScaleFactor: 4,
      })
    return { filePath, htmlFilePath }
  }
}
