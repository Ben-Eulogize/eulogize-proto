import expect from 'expect'
import { PuppeteerRecorder } from './PuppeteerRecorder'
import fs from 'fs'
import {
  MOCK_CASE_1,
  MOCK_SLIDESHOW_1,
  MOCK_SLIDESHOW_NO_AUDIO_1,
  MOCK_SLIDESHOW_WITH_MULTI_AUDIOS_1,
  MOCK_THEMES,
  MOCK_TV_WELCOME_SCREEN_1,
} from '@eulogise/mock'
import { ICardProductData, TV_WELCOME_SCREEN_THEMES } from '@eulogise/core'
import { EulogiseProduct, ISlideshowTheme } from '@eulogise/core'
import { FrameHelper } from '../core/FrameHelper'
import { ThemeHelper } from '@eulogise/helpers'

const removeTmpFrameImages = () => {
  const imageFramesPath = FrameHelper.getFramesPath(MOCK_CASE_1.id)
  const fileList = fs.readdirSync(imageFramesPath)
  console.log('imageFramesPath', imageFramesPath)
  console.log('fileList', fileList)
  for (const filename of fileList) {
    if (/\d{5}\.jpg$/.test(filename)) {
      const imageFile = `${imageFramesPath}/${filename}`
      console.log('removing image file', imageFile)
      fs.unlinkSync(imageFile)
    }
  }
}

const removeTmpHtml = () => {
  const indexHtmlPath = FrameHelper.getTmpDir()
  const fileList = fs.readdirSync(indexHtmlPath)
  console.log('indexHtmlPath', indexHtmlPath)
  console.log('fileList', fileList)
  for (const filename of fileList) {
    if (/index-\d{5}\.html$/.test(filename)) {
      const indexHtmlFile = `${indexHtmlPath}/${filename}`
      console.log('removing index html file', indexHtmlFile)
      fs.unlinkSync(`${indexHtmlPath}/${filename}`)
    }
  }
}

// Note: skip this test because generating video is taking too long. We manually test this outcome for now
describe('Video', () => {
  const slideshowTheme = ThemeHelper.getProductThemeByProductType({
    theme: MOCK_THEMES[0],
    product: EulogiseProduct.SLIDESHOW,
  }) as ISlideshowTheme
  describe('generateVideo', () => {
    it('should upload video directly to s3', async () => {
      await PuppeteerRecorder.generateVideo(MOCK_SLIDESHOW_1)
    })
  })

  // equivalent to startTrigger() in MasterGeneratorVideoHelper
  describe('record()', () => {
    let results: any
    const slideshowTitleSlide: ICardProductData = MOCK_TV_WELCOME_SCREEN_1
    const removeTmpFiles = true

    beforeEach(() => {
      if (removeTmpFiles) {
        removeTmpFrameImages()
        removeTmpHtml()
      }
    })

    describe('With Audio', () => {
      const slideshow = MOCK_SLIDESHOW_1

      beforeEach(async () => {
        results = await PuppeteerRecorder.record({
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme: TV_WELCOME_SCREEN_THEMES[0],
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual(true)
      })
    })

    describe('With Multiple Audios', () => {
      const slideshow = MOCK_SLIDESHOW_WITH_MULTI_AUDIOS_1

      beforeEach(async () => {
        results = await PuppeteerRecorder.record({
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme: TV_WELCOME_SCREEN_THEMES[0],
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Without Audio', () => {
      const slideshow = MOCK_SLIDESHOW_NO_AUDIO_1

      beforeEach(async () => {
        results = await PuppeteerRecorder.record({
          slideshow,
          slideshowTheme,
          slideshowTitleSlide,
          slideshowTitleSlideTheme: TV_WELCOME_SCREEN_THEMES[0],
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual(true)
      })
    })
  })
})
