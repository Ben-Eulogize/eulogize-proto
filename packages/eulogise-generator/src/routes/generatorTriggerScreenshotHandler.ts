import BluebirdPromise from 'bluebird'
import { ScreenshotTriggerPayload } from '../types/GeneratorProcessJob.types'
import { PuppeteerRecorder } from '../slideshow/PuppeteerRecorder'
import { GENERATOR_CONFIG } from '../config'
import { S3Helper } from '../core/S3Helper'
import { FrameHelper } from '../core/FrameHelper'
import { LambdaHelper } from '../helpers/LambdaHelper'

const MAX_LAMBDA_PROCESSES = 2000

export const generatorTriggerScreenshotHandle = async (
  event: { compressedPayload: string },
  context,
) => {
  const { compressedPayload } = event
  const payload = LambdaHelper.decompressPayload(
    compressedPayload,
  ) as ScreenshotTriggerPayload
  console.log('new trigger screenshot process received', payload)
  const {
    startFrameIndex,
    endFrameIndex,
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTitleSlideUrl,
  } = payload
  const noOfFrames = endFrameIndex - startFrameIndex + 1
  const concurrency = Math.floor(
    MAX_LAMBDA_PROCESSES / GENERATOR_CONFIG.NO_OF_TRIGGERS / 2,
  )
  try {
    await BluebirdPromise.map(
      Array(noOfFrames),
      async (_, index: number) => {
        const frameIndex = index + startFrameIndex
        console.log(`Triggering frame generation for frameIndex: ${frameIndex}`)
        try {
          return await PuppeteerRecorder.triggerGenerateFrameProcess({
            slideshow,
            slideshowTheme,
            slideshowTitleSlide,
            slideshowTitleSlideTheme,
            frameIndex,
            slideshowTitleSlideUrl,
          })
        } catch (ex) {
          console.log('ERROR RETRY ON DOUBLE CHECK', ex)
          return
        }
      },
      { concurrency },
    )

    console.log('complete generating screenshots. Double checking...')
    await BluebirdPromise.map(Array(noOfFrames), async (_, index: number) => {
      const frameIndex = index + startFrameIndex
      console.log(
        `Doubling checking on case id (${payload.slideshow?.case}) frame index: ${frameIndex}`,
      )
      try {
        const fileName =
          FrameHelper.getFrameKeyWithFileFormatByFrameIndex(frameIndex)
        await S3Helper.checkExists(
          FrameHelper.getFramePath(
            slideshow.case,
            fileName,
            slideshow.generationId,
          ),
        )
        console.log(`Doubling checked file exists: ${frameIndex}`)
      } catch (ex) {
        console.log('ERROR', ex)
        console.log(
          `ERROR Doubling checked File not exists (caseId ${payload.slideshow?.case} frameIndex ${frameIndex}) for some reasons. regeneratig...`,
        )
        // we let the error thrown this time
        await PuppeteerRecorder.triggerGenerateFrameProcess({
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme,
          frameIndex,
          slideshowTitleSlideUrl,
        })
      }
    })
    console.log('Complete double checking. Verification completed.')
  } catch (ex) {
    console.log('ERROR on creating screenshots', ex)
    throw new Error(ex)
  }
}
