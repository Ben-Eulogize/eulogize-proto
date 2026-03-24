import { PuppeteerRecorder } from '../slideshow/PuppeteerRecorder'
import { MasterVideoGenerationProcessPayload } from '../types/GeneratorProcessJob.types'
import { GeneratorApiRequestHelper } from '../helpers/GeneratorApiRequestHelper'
import {
  EulogiseProduct,
  EulogiseResource,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { FrameHelper } from '../core/FrameHelper'
import { DateTimeHelper, SlideshowHelper } from '@eulogise/helpers'
import { GENERATOR_CONFIG } from '../config'

export const generatorMasterVideoGenerationJobHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const startTime: any = new Date()
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as MasterVideoGenerationProcessPayload
  console.log('new generator master video generation process received', payload)
  console.log(
    'new generator master video generation event',
    JSON.stringify(event, null, 2),
  )
  const { slideshow, slideshowTheme } = payload
  const { duration } = SlideshowHelper.getSlideshowDurations({
    slideshowData: slideshow,
    slideshowTheme,
  })
  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-MASTER-SLIDESHOW-VIDEO-START (${slideshow.case}).`,
  })
  await PuppeteerRecorder.generateVideo(slideshow)

  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Updating Slideshow Status to Complete.`,
  })
  // Update the slideshow file status
  await GeneratorApiRequestHelper.saveResource(EulogiseResource.SLIDESHOW, {
    ...slideshow,
    fileStatus: ResourceFileStatus.GENERATED,
    status: MemorialVisualStatus.COMPLETE,
    hasGeneratedBefore: true,
  })

  await SlackWebhookHelper.sendToSlack({
    text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Sending email to user.`,
  })
  // send email to notify the user after slideshow is generated
  await GeneratorApiRequestHelper.sendGeneratedEmail(
    EulogiseProduct.SLIDESHOW,
    slideshow.case,
  )

  // try catch this and ignore errors for now.
  // AWS Lambda would retry and invoke this handler 3 times if it fails.
  // Reference: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq
  try {
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-VIDEO (${slideshow.case}). Cleaning update S3 folders for case.`,
    })
    // do not remove html files if html generation is enabled
    if (GENERATOR_CONFIG.ENABLE_GENERATOR_CLEAN_UP_SCREENSHOTS) {
      await PuppeteerRecorder.cleanupAfterGeneration(
        slideshow.case,
        slideshow.generationId,
      )
    }
    const { humanTime } = FrameHelper.getHumanReadableTime(startTime)
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-VIDEO-END (${
        slideshow.case
      }). Completed (${humanTime}) for Video Length: ${DateTimeHelper.formatWithMinsAndSecondsText(
        duration,
      )}`,
    })
  } catch (ex) {
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-VIDEO-ERROR (${slideshow.case}) cleaning up S3 folders for case`,
      notifyChannel: true,
    })
    console.log(
      'GENERATOR-MASTER-SLIDESHOW-VIDEO-ERROR CLEANING UP S3 FOLDERS',
      ex,
    )
  }
}
