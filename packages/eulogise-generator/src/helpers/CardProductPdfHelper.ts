import {
  CardProductPageMode,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import mkdirp from 'mkdirp'
import { GENERATOR_CONFIG } from '../config'
import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'
import { LambdaHelper } from './LambdaHelper'
import { S3Helper } from '../core/S3Helper'
import { GeneratorProcessJobTypes } from '../types/GeneratorProcessJob.types'

const TMP_FILE_DIR =
  GENERATOR_CONFIG.TMP_DIR || `${__dirname}/../../test/files/__snapshots__`

export class CardProductPdfHelper {
  public static async createPdf({
    cardProduct,
    product,
    productTheme,
    bleed,
    pageMode,
  }: {
    cardProduct: ICardProductData
    product: EulogiseProduct
    productTheme: ICardProductTheme
    bleed?: boolean
    useMock?: boolean
    pageMode?: CardProductPageMode
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    if (pageMode === CardProductPageMode.COVER_PAGE) {
      return await PuppeteerCardProductHelper.generatePhotobookCoverPage({
        cardProduct,
      })
    }
    return await PuppeteerCardProductHelper.generateCardProduct({
      cardProduct,
      product,
      bleed,
      type: 'pdf',
      productTheme,
      pageMode,
    })
  }

  public static async generatePdfFile({
    cardProduct,
    product,
    productTheme,
    bleed,
    useMock,
    pageMode,
  }: {
    cardProduct: ICardProductData
    product: EulogiseProduct
    productTheme: ICardProductTheme
    bleed: boolean
    useMock?: boolean
    pageMode?: CardProductPageMode
  }): Promise<{ filePath: string; htmlFilePath: string }> {
    mkdirp.sync(TMP_FILE_DIR)

    const { filePath, htmlFilePath } = await this.createPdf({
      cardProduct,
      product,
      productTheme,
      bleed,
      useMock,
      pageMode,
    })

    // if it is Photobook and bleed version, we need ghostscript to convert images to rgb and 300ppi
    // and also embed fonts
    if (product === EulogiseProduct.PHOTOBOOK && bleed) {
      console.log('Invoking Ghostscript Lambda for PDF conversion')

      // Upload the PDF to S3 first
      const s3Key = `cases/${
        cardProduct.case
      }/pdf-generation/${pageMode}-${Date.now()}.pdf`
      await S3Helper.uploadToS3({ filePath, s3Path: s3Key, isCheck: true })
      console.log('Uploaded PDF to S3:', s3Key)

      // Invoke the Ghostscript Lambda
      await LambdaHelper.invokeJob(
        GeneratorProcessJobTypes.CONVERT_TO_PRINTABLE_PDF,
        {
          caseId: cardProduct.case,
          s3Key,
          product,
        },
        false,
      )

      console.log('Ghostscript Lambda responded')

      // Download the converted PDF from S3
      const convertedS3Key = s3Key.replace('.pdf', '-converted.pdf')
      const outputFilePath = filePath.replace('.pdf', '-converted.pdf')
      await S3Helper.downloadFile({
        key: convertedS3Key,
        filePath: outputFilePath,
      })
      console.log('Downloaded converted PDF:', outputFilePath)

      return { filePath: outputFilePath, htmlFilePath }
    }

    console.log(`${product} created at ${filePath}`)
    return { filePath, htmlFilePath }
  }
}
