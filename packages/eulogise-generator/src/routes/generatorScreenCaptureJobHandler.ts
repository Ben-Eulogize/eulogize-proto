import { PuppeteerSlideshowHelper } from '../core/PuppeteerSlideshowHelper'
import { CaptureScreenshotProcessPayload } from '../types/GeneratorProcessJob.types'
import { LambdaHelper } from '../helpers/LambdaHelper'

export const generatorScreenCaptureJobHandle = async (
  event: {
    compressedPayload: string
  },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as CaptureScreenshotProcessPayload

  console.log('new generator background process received', payload)
  return await PuppeteerSlideshowHelper.captureScreenshot(payload)
}
