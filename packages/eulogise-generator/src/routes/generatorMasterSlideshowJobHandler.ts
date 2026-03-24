import { generateSlideshow } from '../slideshow'
import { MasterSlideshowProcessPayload } from '../types/GeneratorProcessJob.types'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { PuppeteerRecorder } from '../slideshow/PuppeteerRecorder'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'

export const generatorMasterSlideshowJobHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as MasterSlideshowProcessPayload

  console.log('GENERATOR-MASTER-SLIDESHOW-START', JSON.stringify(payload))

  const {
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    isVideoBier,
  } = payload

  // Generate unique ID for this generation run to create timestamped S3 folders
  // This allows new generation to start immediately without waiting for old file cleanup
  const generationId = `gen-${Date.now()}`
  slideshow.generationId = generationId

  const caseId = slideshow.case
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-MASTER-SLIDESHOW-START (${caseId}) generationId: ${generationId}`,
  })

  // No need to delete old folders before generation - we use timestamped folders now
  // Old folders will be cleaned up after video generation completes

  await generateSlideshow({
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    isVideoBier,
  })
}
