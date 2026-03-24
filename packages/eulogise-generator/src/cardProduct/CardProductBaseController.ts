import {
  CardProductPageMode,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductData,
} from '@eulogise/core'
import { GENERATOR_CONFIG } from '../config'
import { S3Helper } from '../core/S3Helper'
import { CardProductHelper } from '@eulogise/helpers'

const bucket = GENERATOR_CONFIG.AWS_S3_BUCKET

export class CardProductBaseController {
  public static async generateCardProductPdf({
    cardProduct,
    productName,
    productTheme,
    bleed,
    generatePdfFile,
    fileType = 'pdf',
    pageMode,
  }: {
    cardProduct: ICardProductData
    productName: string
    bleed: boolean
    fileType?: 'pdf' | 'jpg'
    productTheme: ICardProductTheme
    generatePdfFile: ({
      cardProduct,
      productTheme,
      bleed,
      useMock,
      pageMode,
    }: {
      cardProduct: ICardProductData
      productTheme: ICardProductTheme
      bleed: boolean
      useMock?: boolean
      pageMode?: CardProductPageMode
    }) => Promise<{ filePath: string; htmlFilePath: string }>
    pageMode?: CardProductPageMode
  }) {
    if (!cardProduct) {
      throw new Error(`${cardProduct} param is undefined`)
    }
    const { filePath: generatedPdfFile, htmlFilePath } = await generatePdfFile({
      cardProduct,
      productTheme,
      bleed,
      pageMode,
    })

    // Upload PDF files to AWS S3
    const s3Path = CardProductHelper.getCardProductS3FilePath({
      caseId: cardProduct.case,
      pageMode,
      productName,
      slug: (cardProduct as IGenericCardProductData)?.content?.metadata?.slug,
      bleed,
      fileType,
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
    /* not needed
    await S3Helper.uploadToS3({
      bucket,
      filePath: generatedPdfFile,
      s3Path: s3Path,
    })
*/
  }
}
