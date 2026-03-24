import { ServerStyleSheet } from 'styled-components'
import crypto from 'crypto'
import { GENERATOR_CONFIG } from '../config'
import { PuppeteerFrame } from '../Puppeteer.types'
import { FrameHelper } from './FrameHelper'
import { S3Helper } from './S3Helper'
import { CaptureScreenshotProcessPayload } from '../types/GeneratorProcessJob.types'
import { ISlideshowData } from '@eulogise/core/src'
import { renderToString } from 'react-dom/server'
import { PureSlideshowPlayer } from '@eulogise/client-components'
import React from 'react'
import {
  ICardProductData,
  ICardProductTheme,
  ISlideshowTheme,
  SLIDESHOW_FPS,
} from '@eulogise/core'
import { PuppeteerHelper } from './PuppeteerHelper'
import { SlideshowHelper } from '@eulogise/helpers'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'
import { DRAFT_CSS } from './draftcss'

export class PuppeteerSlideshowHelper extends PuppeteerHelper {
  private static async renderWithReact({
    slideshow,
    cardProduct,
    cardProductTheme,
    slideshowTheme,
    frameIndex,
    slideshowTitleSlideUrl,
  }: {
    slideshow: ISlideshowData
    cardProduct?: ICardProductData
    cardProductTheme?: ICardProductTheme
    slideshowTheme: ISlideshowTheme
    frameIndex: number
    slideshowTitleSlideUrl: string
  }) {
    const { duration: slideshowDuration } =
      SlideshowHelper.getSlideshowDurations({
        slideshowData: slideshow!,
        slideshowTheme,
      })

    const totalFrames = Math.ceil(
      // @ts-ignore
      (slideshowDuration / 1000) * SLIDESHOW_FPS,
    )
    // @ts-ignore
    const progress = (frameIndex / totalFrames) * slideshowDuration
    return React.createElement(
      PureSlideshowPlayer,
      {
        slideshowData: slideshow,
        cardProduct,
        cardProductTheme: cardProductTheme!,
        slideshowTheme,
        progress,
        caseId: slideshow.case,
        isShowLoading: false,
        isMp4: true,
        scale: 2,
        slideshowTitleSlideUrl,
      },
      null,
    )
  }

  private static async renderFrame({
    frameIndex,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTheme,
    slideshow,
    slideshowTitleSlideUrl,
  }: {
    frameIndex: number
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
    slideshowTheme: ISlideshowTheme
    slideshow: ISlideshowData
    slideshowTitleSlideUrl: string
  }): Promise<PuppeteerFrame> {
    try {
      const sheet = new ServerStyleSheet()
      const markup = await this.renderWithReact({
        frameIndex,
        slideshow,
        cardProduct: slideshowTitleSlide,
        cardProductTheme: slideshowTitleSlideTheme,
        slideshowTheme,
        slideshowTitleSlideUrl,
      })
      const html = renderToString(sheet.collectStyles(markup))
      const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
      const globalStyleTags = `<style>html, body {margin: 0; padding: 0;} * { box-sizing: border-box; }${DRAFT_CSS}</style>`
      return {
        html,
        styleTags,
        globalStyleTags,
        frameIndex,
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  public static async generateFrame({
    slideshow,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    slideshowTheme,
    frameIndex,
    slideshowTitleSlideUrl,
  }: {
    slideshow: ISlideshowData
    slideshowTitleSlide: ICardProductData
    slideshowTitleSlideTheme: ICardProductTheme
    slideshowTheme: ISlideshowTheme
    frameIndex: number
    slideshowTitleSlideUrl: string
  }): Promise<{ fileName: string; filePath: string; htmlFilePath: string }> {
    const frame: PuppeteerFrame = await this.renderFrame({
      frameIndex,
      slideshowTitleSlide,
      slideshowTitleSlideTheme,
      slideshow,
      slideshowTheme,
      slideshowTitleSlideUrl,
    })
    const caseId: string = slideshow.case

    const [width, height] = GENERATOR_CONFIG.VIDEO_OUTPUT_SIZE.split('x')
    const viewport = {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    }
    const fileName =
      FrameHelper.getFrameKeyWithFileFormatByFrameIndex(frameIndex)
    const { html, styleTags, globalStyleTags } = frame

    const { filePath, htmlFilePath } = await this.generateScreenshot({
      caseId,
      viewport,
      fileName,
      style: `${styleTags}${globalStyleTags}`,
      html,
      cacheId: this.createCacheId({
        caseId,
        caseUpdatedAt: slideshow.updatedAt ?? '',
        titleSlideUpdatedAt: slideshowTitleSlide?.updatedAt,
      }),
      deviceScaleFactor: 1.5 /* * (viewport.width / 1280)*/, // 1.5 based on 1280 width
    })

    return { fileName, filePath, htmlFilePath }
  }

  public static createCacheId({
    caseId,
    caseUpdatedAt,
    titleSlideUpdatedAt,
  }: {
    caseId: string
    caseUpdatedAt: string
    titleSlideUpdatedAt?: string
  }): string {
    const cacheId = crypto
      .createHash('sha256')
      .update(
        `${caseId}-${new Date(caseUpdatedAt).getTime()}${
          titleSlideUpdatedAt
            ? `-${new Date(titleSlideUpdatedAt).getTime()}`
            : ''
        }`,
      )
      .digest('hex')
      .substring(0, 20)
    console.log('createdHash', {
      caseId,
      caseUpdatedAt,
      titleSlideUpdatedAt,
      cacheId,
    })
    return cacheId
  }

  public static async captureScreenshot({
    slideshow,
    slideshowTheme,
    slideshowTitleSlide,
    slideshowTitleSlideTheme,
    frameIndex,
    slideshowTitleSlideUrl,
  }: CaptureScreenshotProcessPayload) {
    const padFrameNo = FrameHelper.getFrameKeyByFrameIndex(frameIndex)
    const MAX_RETRIES = 3
    let lastError: any = null

    // Retry loop
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(
          `📺 Start job to render frame ${frameIndex} (Attempt ${attempt} of ${MAX_RETRIES})`,
        )
        const caseId = slideshow.case
        const { fileName, filePath, htmlFilePath } = await this.generateFrame({
          slideshow,
          slideshowTitleSlide,
          slideshowTitleSlideTheme,
          slideshowTheme,
          frameIndex,
          slideshowTitleSlideUrl,
        })
        console.log('captureScreenshot fileName', fileName)
        console.log('captureScreenshot filePath', filePath)
        console.log(`📺 Rendered frames ${padFrameNo}`)
        if (GENERATOR_CONFIG.isLambdaGenerateSlideshow) {
          const s3Path = FrameHelper.getFramePath(
            caseId,
            fileName,
            slideshow.generationId,
          )
          await S3Helper.uploadToS3({
            filePath,
            s3Path,
            isCheck: true,
          })
          // upload poster jpg file for embedded slideshow video
          // refer to EulogisePage.EMBEDDED_SLIDESHOW
          if (frameIndex === 10) {
            const s3PosterPath = SlideshowHelper.getSlideshowS3PosterPath({
              caseId,
            })
            await SlackWebhookHelper.sendToSlack({
              text: `📺 Uploaded poster image for case ${caseId} for frameIndex(${frameIndex})`,
            })
            await S3Helper.uploadToS3({
              filePath,
              s3Path: s3PosterPath,
              isCheck: true,
            })
          }
          if (GENERATOR_CONFIG.ENABLE_HTML_GENERATION) {
            await S3Helper.uploadToS3({
              filePath: htmlFilePath,
              s3Path: `${s3Path}.html`,
              isCheck: true,
            })
          }
        }
        // await S3Helper.downloadClipFromS3(filePath, `${options.output}/clips`)

        console.log(
          `📺 Successfully captured screenshot for frame ${frameIndex} on attempt ${attempt}`,
        )

        // Success - exit the retry loop
        return
      } catch (error) {
        lastError = error
        console.log(error)
        console.error(
          `GENERATORERROR generating frame ${padFrameNo} (Attempt ${attempt} of ${MAX_RETRIES}):`,
          JSON.stringify(error),
        )

        // If this was the last attempt, fail permanently
        if (attempt === MAX_RETRIES) {
          console.error(
            `📺 All ${MAX_RETRIES} attempts failed for frame ${frameIndex}`,
          )
          throw lastError
        }

        // Wait before retrying (exponential backoff: 2s, 4s)
        const delayMs = Math.min(2000 * Math.pow(2, attempt - 1), 4000)
        console.log(
          `📺 Retrying frame ${frameIndex} in ${delayMs}ms... (Attempt ${
            attempt + 1
          } of ${MAX_RETRIES})`,
        )
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    }
  }
}
