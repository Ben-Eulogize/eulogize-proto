import { PuppeteerSlideshowHelper } from './PuppeteerSlideshowHelper'
import expect from 'expect'
import {
  MOCK_SLIDESHOW_NO_AUDIO_1,
  MOCK_THEMES,
  MOCK_TV_WELCOME_SCREEN_1,
} from '@eulogise/mock'
import { TV_WELCOME_SCREEN_THEMES } from '@eulogise/core'
import { EulogiseProduct, ISlideshowTheme } from '@eulogise/core'
import { ThemeHelper } from '@eulogise/helpers'

describe('PuppeteerSlideshowHelper', () => {
  describe('createCacheId', () => {
    const caseId = 'mock-case-id'
    const caseUpdatedAt = '2024-10-10T00:00:00.000Z'
    const titleSlideUpdatedAt = '2023-09-10T00:00:00.000Z'

    it('should return hashed string', () => {
      const cacheId = PuppeteerSlideshowHelper.createCacheId({
        caseId,
        caseUpdatedAt,
        titleSlideUpdatedAt,
      })
      expect(cacheId).toEqual('27e79c5a98ee149e1bf9')
    })

    it('should return hashed string without titleSlideUpdatedAt', () => {
      const cacheId = PuppeteerSlideshowHelper.createCacheId({
        caseId,
        caseUpdatedAt,
      })
      expect(cacheId).toEqual('9a66aaa2dc120421d955')
    })
  })

  describe('generateFrame', () => {
    beforeEach(async () => {
      await PuppeteerSlideshowHelper.generateFrame({
        slideshow: MOCK_SLIDESHOW_NO_AUDIO_1,
        slideshowTheme: ThemeHelper.getProductThemeByProductType({
          theme: MOCK_THEMES[0],
          product: EulogiseProduct.SLIDESHOW,
        }) as ISlideshowTheme,
        // @ts-ignore
        slideshowTitleSlide: MOCK_TV_WELCOME_SCREEN_1,
        slideshowTitleSlideTheme: TV_WELCOME_SCREEN_THEMES[0],
        frameIndex: 50,
        slideshowTitleSlideUrl: '',
      })
    })

    it('should generate the frame', () => {
      expect(true).toEqual(true)
    })
  })
})
