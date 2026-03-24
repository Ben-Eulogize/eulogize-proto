import fsExtra from 'fs-extra'

import { MasterGeneratorVideoHelper } from './MasterGeneratorVideoHelper'
import { GENERATOR_CONFIG } from '../config'
import { GeneratorApiRequestHelper } from '../helpers/GeneratorApiRequestHelper'
import {
  EulogiseResource,
  ResourceFileStatus,
  ISlideshowData,
  ICardProductData,
  ICardProductTheme,
  ISlideshowTheme,
  EulogiseProduct,
  EulogiseExportProductName,
} from '@eulogise/core'
import { LambdaHelper } from '../helpers/LambdaHelper'
import {
  GeneratorProcessJobTypes,
  PdfGeneratorJobPayload,
} from '../types/GeneratorProcessJob.types'
import { FrameHelper } from '../core/FrameHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'

const processingIds = []

// Generate slideshow, requires a slideshow and environment key
export async function generateSlideshow({
  slideshow,
  slideshowTheme,
  slideshowTitleSlide,
  slideshowTitleSlideTheme,
  isVideoBier,
}: {
  slideshow: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideshowTitleSlide: ICardProductData
  slideshowTitleSlideTheme: ICardProductTheme
  isVideoBier: boolean
}) {
  const startTime: any = new Date()
  if (!slideshow) {
    throw new Error('slideshow param does not exist')
  }

  // Exit early if slideshow is already processing
  if (processingIds.indexOf(slideshow.id) !== -1) {
    console.log(`🚨 Already rendering ${slideshow.id}`)
    throw new Error(`slideshow is rendering, slideshowId: ${slideshow.id}`)
  }

  // Send accepted status
  processingIds.push(slideshow.id)

  const cleanupPaths = []

  try {
    await LambdaHelper.invokeJob(
      GeneratorProcessJobTypes.GENERATE_CARD_PRODUCT,
      {
        cardProduct: slideshowTitleSlide,
        product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
        bleed: false,
        productTheme: slideshowTitleSlideTheme,
      } as PdfGeneratorJobPayload,
    )

    // Generate video and write files to disk
    await MasterGeneratorVideoHelper.startTrigger({
      slideshow: {
        ...slideshow,
        content: {
          ...slideshow.content,
          isVideoBier,
        },
      },
      slideshowTheme,
      slideshowTitleSlide,
      slideshowTitleSlideTheme,
      slideshowTitleSlideUrl: `${GENERATOR_CONFIG.AWS_S3_URL_WITHOUT_CDN}/cases/${slideshow.case}/${EulogiseExportProductName.SLIDESHOW_TITLE_SLIDE}.jpg`,
    })

    // await processPromises(promises, startTime)
    console.log('📸 Done taking snaps. Starting video generation')
    const { humanTime } = FrameHelper.getHumanReadableTime(startTime)
    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-END (${slideshow.case}). Done taking Snapshot (${humanTime}). Start Generate Video Process.`,
    })
    await LambdaHelper.invokeJob(
      GeneratorProcessJobTypes.MASTER_VIDEO_GENERATION,
      { slideshow, slideshowTheme },
      true,
    )

    FrameHelper.logHumanTime(startTime)
  } catch (error) {
    console.log(`🚨 ${error.message}`)

    await SlackWebhookHelper.sendToSlack({
      text: `GENERATOR-MASTER-SLIDESHOW-ERROR (${slideshow.case}). ${error.message}`,
      notifyChannel: true,
    })

    // Update the slideshow file status
    await GeneratorApiRequestHelper.saveResource(EulogiseResource.SLIDESHOW, {
      ...slideshow,
      fileStatus: ResourceFileStatus.FAILED,
    })
  } finally {
    const index = processingIds.indexOf(slideshow.id)
    if (index >= 0) {
      processingIds.splice(index, 1)
    }

    // Remove any leftover files
    if (GENERATOR_CONFIG.NODE_ENV === 'production') {
      cleanupPaths.forEach((path) => fsExtra.remove(path))
    }
  }
}
