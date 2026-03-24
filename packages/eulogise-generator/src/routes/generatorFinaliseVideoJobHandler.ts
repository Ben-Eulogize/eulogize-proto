import { PuppeteerRecorder } from '../slideshow/PuppeteerRecorder'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { SlaveFinaliseVideoProcessPayload } from '../types/GeneratorProcessJob.types'
import { FrameHelper } from '../core/FrameHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'

export const generatorFinaliseVideoJobHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const startTime = new Date()
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as SlaveFinaliseVideoProcessPayload
  console.log('new generator slave finalise video process received', payload)
  const slideshow = payload.slideshow
  const caseId = slideshow.case
  const noOfBlocks = PuppeteerRecorder.getNoOfBlocks(slideshow)

  console.log('start downloading video blocks', payload)
  // download all video blocks from s3
  await PuppeteerRecorder.downloadAllVideoBlocks({
    caseId,
    noOfBlocks,
    generationId: slideshow.generationId,
  })
  console.log('completed downloading video blocks', payload)
  FrameHelper.logHumanTime(startTime.getTime())

  // merging all videos
  console.log('start merging video blocks', payload)
  await PuppeteerRecorder.mergeSlideshowVideos({
    caseId,
    noOfBlocks,
  })
  console.log('completed merging video blocks', payload)
  FrameHelper.logHumanTime(startTime.getTime())

  // finalising the video (attach audios and upload the video back to s3)
  console.log('start finalising video blocks', payload)
  try {
    await PuppeteerRecorder.finaliseVideo({
      slideshow,
    })
  } catch (error) {
    console.log(
      'GENERATOR-FINALISE-VIDEO-ERROR finaliseVideo',
      {
        slideshow,
      },
      error,
    )
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-FINALISE-VIDEO-ERROR finaliseVideo (caseId: ${slideshow.case}). Error generatorFinaliseVideoJobHandle. ${error.message}`,
      notifyChannel: true,
    })
  }
  console.log('completed finalising video blocks', payload)
  FrameHelper.logHumanTime(startTime.getTime())
}
