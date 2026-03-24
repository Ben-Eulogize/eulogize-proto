import { LambdaHelper } from '../helpers/LambdaHelper'
import { CardProductSingleScreenshotGeneratorJobPayload } from '../types/GeneratorProcessJob.types'
import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { S3Helper } from '../core/S3Helper'
import { CardProductHelper } from '@eulogise/helpers'

export const generatorCardProductSingleScreenshotJobHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as CardProductSingleScreenshotGeneratorJobPayload

  const { cardProduct, product, pageIndex } = payload
  const caseId = cardProduct.case
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT-START (${caseId}: pageIndex: ${pageIndex}): Start`,
  })
  const { filePath } =
    await PuppeteerCardProductHelper.generateCardProductJpgByPageIndex(payload)

  const s3Path = CardProductHelper.getGeneratedProductS3PathByPageIndex({
    caseId,
    product,
    pageIndex,
  })
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT (${caseId}: pageIndex: ${pageIndex}): Screenshot generated. Uploading screenshot to s3: ${s3Path}`,
  })
  await S3Helper.uploadToS3({
    filePath,
    s3Path,
    isCheck: true,
  })
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-PDF-SINGLE-PAGE-SCREENSHOT (${caseId}: pageIndex: ${pageIndex}): Uploaded screenshot to s3: ${s3Path}`,
  })
}
