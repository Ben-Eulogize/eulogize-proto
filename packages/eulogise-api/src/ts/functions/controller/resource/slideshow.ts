import { BaseProductResourceController } from './BaseProductResourceController'
import {
  slideshowModel,
  slideshowTitleSlideModel,
  themeModel,
} from '../../../database'
import { ThemeHelper } from '@eulogise/helpers'
import { EulogiseProduct, ITheme } from '@eulogise/core'
import {
  ApiLambdaHelper,
  ApiLambdaJobTypes,
  SlideshowVideoGeneratePayload,
} from '../../../utils/ApiLambdaHelper'

class SlideshowResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'slideshow',
      product: EulogiseProduct.SLIDESHOW,
      model: slideshowModel,
    })
  }

  /*
  private async fixGlitches(slideshowId: string) {
    const slideshow = await slideshowModel.findById(slideshowId)

    if (!slideshow) {
      console.log(`No slideshow found for slideshow ${slideshowId}`)
      return
    }
    console.log('Found slideshow:', slideshow)

    for (const slide of slideshow.content.slides) {
      const slideType = slide.slideType
      if (slideType === 'Image Slide' && slide.image) {
        console.log(`Processing slide:`, slide)
        const slideFilestackHandle = slide.image.filestackHandle

        const { handle: storedFilestackHandle } =
          await ImageHelper.storeFilestackImage(slideFilestackHandle, {
            filestackApi: CONFIG.FILESTACK_API,
            filestackCdn: CONFIG.FILESTACK_CDN,
          })
        // update filestack handle in the slideshow slide
        slide.image.filestackHandle = storedFilestackHandle
      } else {
        console.log(`Skipping slide of type ${slideType}`)
      }
    }
    // save updated slideshow
    return await slideshow.save()
  }
*/

  async fixGlitchesAndGenerate(
    payload: SlideshowVideoGeneratePayload,
  ): Promise<any> {
    console.log('fixGlitchesAndGenerate', payload)
    const {
      memorialProductId,
      /*
      product,
      region,
*/
      additionalPayload = {},
      generateUserId,
    } = payload
    console.log('find product by slideshow id', memorialProductId)
    const memorialProductObj = await this.findById(memorialProductId)
    console.log('find product by theme id', memorialProductObj)
    const memorialProductTheme = (await themeModel.findById(
      memorialProductObj.content.theme,
    )) as unknown as ITheme
    console.log('slideshowTheme', memorialProductObj.case)
    const slideshowTheme = ThemeHelper.getProductThemeByProductType({
      theme: memorialProductTheme,
      product: EulogiseProduct.SLIDESHOW,
    })
    console.log('slideshowTitleSlide', memorialProductObj.case)
    const slideshowTitleSlide = await slideshowTitleSlideModel.findByCaseId(
      memorialProductObj.case,
    )
    console.log(
      'Slideshow Title Slide screen theme',
      slideshowTitleSlide?.content.theme,
    )
    const themeId = slideshowTitleSlide?.content.theme
    let slideshowTitleSlideTheme
    if (themeId) {
      const theme = (await themeModel.findById(
        slideshowTitleSlide?.content.theme,
      )) as unknown as ITheme
      console.log(
        'slideshowTitleSlide theme',
        slideshowTitleSlide?.content.theme,
      )
      slideshowTitleSlideTheme = ThemeHelper.getProductThemeByProductType({
        theme,
        product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      })
      console.log(
        'slideshowTitleSlideTheme theme results',
        slideshowTitleSlideTheme,
      )
    }
    // await this.fixGlitches(memorialProductId)
    // console.log('Complete fixing glitches', memorialProductId)
    return super.generate({
      memorialProductId,
      product: EulogiseProduct.SLIDESHOW,
      additionalPayload: {
        ...additionalPayload,
        slideshowTheme,
        slideshowTitleSlide,
        slideshowTitleSlideTheme,
      },
      generateUserId,
    })
  }

  // override original generate function so that we can fix glitches separately
  async generate(payload: SlideshowVideoGeneratePayload) {
    const { memorialProductId, generateUserId } = payload
    await ApiLambdaHelper.invokeJob(
      ApiLambdaJobTypes.VIDEO_FIX_GLITCHES_AND_GENERATE,
      payload,
      true,
    )
    return await this.setToProcessing({
      memorialProductId,
      generateUserId,
    })
  }
}

export const slideshowResourceController = new SlideshowResourceController()
