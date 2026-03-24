import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'
import { ProductThumbnailGeneratorJobPayload } from '../types/GeneratorProcessJob.types'
import { S3Helper } from '../core/S3Helper'

export class GeneratorThemeController {
  public static async generateThumbnail(
    props: ProductThumbnailGeneratorJobPayload,
  ) {
    const { filePath, htmlFilePath } =
      await PuppeteerCardProductHelper.generateCardProductThumbnail(props)

    const { s3Path } = props

    await Promise.all([
      S3Helper.uploadToS3({
        filePath,
        s3Path,
      }),
      S3Helper.uploadToS3({
        filePath: htmlFilePath,
        s3Path: `${s3Path}.html`,
      }),
    ])
  }
}
