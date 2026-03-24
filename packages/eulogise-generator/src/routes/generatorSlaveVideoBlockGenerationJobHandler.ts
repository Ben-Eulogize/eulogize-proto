import { PuppeteerRecorder } from '../slideshow/PuppeteerRecorder'
import { SlaveVideoBlockGenerationProcessPayload } from '../types/GeneratorProcessJob.types'
import { LambdaHelper } from '../helpers/LambdaHelper'
import { S3Helper } from '../core/S3Helper'
import { FrameHelper } from '../core/FrameHelper'

export const generatorSlaveVideoBlockGenerationJobHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const startTime = new Date()
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as SlaveVideoBlockGenerationProcessPayload
  console.log('new generator slave video generation process received', payload)
  const { slideshow, blockIndex } = payload
  await PuppeteerRecorder.generateNoAudioVideoBlock({
    slideshow,
    blockIndex,
  })

  const caseId = slideshow.case
  const tmpVideoFilePath = FrameHelper.getVideoBlockFilePath({
    caseId,
    blockIndex,
  })
  console.log('video generated on tmp path', tmpVideoFilePath)

  console.log(`Uploading video ${slideshow.id} to s3`)
  // Update block slideshow video to S3
  await S3Helper.uploadToS3({
    filePath: tmpVideoFilePath,
    s3Path: PuppeteerRecorder.getVideoBlockS3Key({
      caseId,
      blockIndex,
      generationId: slideshow.generationId,
    }),
    isCheck: true,
    noOfTries: 3,
  })
  console.log(`📼 ${slideshow.id} video saved to s3`)
  FrameHelper.logHumanTime(startTime.getTime())
}
