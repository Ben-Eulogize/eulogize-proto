import {
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import { GENERATOR_CONFIG } from '../config'
import { S3Helper } from '../core/S3Helper'
import { CardProductHelper } from '@eulogise/helpers'
import { GenericCardProductPdfHelper } from './GenericCardProductPdfHelper'

const bucket = GENERATOR_CONFIG.AWS_S3_BUCKET

export class GenericCardProductController {
  public static async generateGenericCardProduct(
    cardProduct: ICardProductData,
    productTheme: ICardProductTheme,
    bleed: boolean,
  ) {
    if (!cardProduct) {
      throw new Error('cardProduct param is undefined')
    }

    const { filePath: generatedPdfFile, htmlFilePath } =
      await GenericCardProductPdfHelper.generatePdfFile({
        cardProduct,
        productTheme,
        bleed,
      })

    // Use the slug as the product name for S3 path
    const genericProductMetadata = (cardProduct as IGenericCardProductData)
      ?.content?.metadata
    const productName = genericProductMetadata?.slug

    // Upload PDF files to AWS S3
    const s3Path = CardProductHelper.getCardProductS3FilePath({
      caseId: cardProduct.case,
      productName,
      slug: genericProductMetadata?.slug,
      bleed,
      fileType: 'pdf',
    })

    await Promise.all([
      S3Helper.uploadToS3({
        bucket,
        filePath: generatedPdfFile,
        s3Path,
      }),
      S3Helper.uploadToS3({
        bucket,
        filePath: htmlFilePath,
        s3Path: `${s3Path}.html`,
      }),
    ])
  }
}
