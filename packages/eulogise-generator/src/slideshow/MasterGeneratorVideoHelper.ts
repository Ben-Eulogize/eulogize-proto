import {
  ICardProductData,
  ICardProductTheme,
  ISlideshowData,
  ISlideshowTheme,
} from '@eulogise/core'
import Bluebird from 'bluebird'

import { LambdaHelper } from '../helpers/LambdaHelper'
import {
  GeneratorProcessJobTypes,
  ScreenshotTriggerInfo,
  ScreenshotTriggerPayload,
} from '../types/GeneratorProcessJob.types'
import { GENERATOR_CONFIG } from '../config'
import { SlideshowHelper } from '@eulogise/helpers/src/SlideshowHelper'
import { FrameHelper } from '../core/FrameHelper'

export class MasterGeneratorVideoHelper {
  public static createScreenshotTriggerInfos(
    totalFrames: number,
  ): Array<ScreenshotTriggerPayload> {
    const noOfTriggers = GENERATOR_CONFIG.NO_OF_TRIGGERS
    let framesPerTrigger = Math.floor(totalFrames / noOfTriggers)
    let currentIndex = 0
    // create empty array
    return Array.apply(null, Array(noOfTriggers)).map(
      (n: number, triggerIndex: number) => {
        const startFrameIndex = currentIndex
        let endFrameIndex = currentIndex + framesPerTrigger
        if (endFrameIndex > totalFrames - 1) {
          endFrameIndex = totalFrames - 1
        }
        currentIndex = endFrameIndex + 1
        return {
          triggerId: triggerIndex,
          startFrameIndex: startFrameIndex,
          endFrameIndex,
        }
      },
    ) as Array<ScreenshotTriggerPayload>
  }

  public static async startRecordTriggers({
    totalFrames,
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTitleSlideUrl,
  }: {
    totalFrames: number
    slideshowTitleSlide?: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
    slideshow: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowTitleSlideUrl: string
  }): Promise<void> {
    const triggerInfos: Array<ScreenshotTriggerInfo> =
      this.createScreenshotTriggerInfos(totalFrames)

    console.log('triggerInfos', triggerInfos)
    try {
      await Bluebird.map(
        triggerInfos,
        async (triggerInfo: ScreenshotTriggerInfo) => {
          console.log('invoke trigger', triggerInfo)
          await LambdaHelper.invokeJob(
            GeneratorProcessJobTypes.CAPTURE_SCREENSHOT_TRIGGER,
            {
              ...triggerInfo,
              slideshow,
              slideshowTheme,
              slideshowTitleSlide,
              slideshowTitleSlideTheme,
              slideshowTitleSlideUrl,
            },
            false,
          )
          console.log('complete trigger', triggerInfo)
        },
      )
    } catch (ex) {
      console.log('ERROR', ex)
      throw new Error(ex)
    }
  }

  // equivalent to record in PuppeteerRecorder
  public static async startTrigger({
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTitleSlideUrl,
  }: {
    slideshow: ISlideshowData
    slideshowTheme: ISlideshowTheme
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
    slideshowTitleSlideUrl: string
  }) {
    try {
      const startTime: any = new Date()

      const caseId = slideshow.case
      const totalFrames = SlideshowHelper.getTotalFrames(slideshow)

      console.log('PuppeteerRecorder.record startTime', startTime.toISOString())
      console.log('PuppeteerRecorder.record totalFrames', totalFrames)
      console.log('PuppeteerRecorder.record caseId', caseId)

      console.log('creating video', { slideshow, slideshowTheme })

      console.log('slideshow', slideshow)
      console.log('slideshow.case', slideshow.case)
      // Render slideshow to a video file
      await this.startRecordTriggers({
        totalFrames,
        slideshow,
        slideshowTheme,
        slideshowTitleSlide,
        slideshowTitleSlideTheme,
        slideshowTitleSlideUrl,
      })
      FrameHelper.logHumanTime(startTime)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      // Remove intermediary file
      //fsExtra.remove(screenCaptureRecordOption.output)
    }
  }
}
