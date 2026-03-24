import { SlideshowHelper } from './SlideshowHelper'
import {
  createMockAudioAssetContent,
  createMockImageSlide,
  createMockSlideshowData,
  createMockTitleSlide,
  MOCK_DUMMY_IMAGE_SLIDE_1,
  MOCK_IMAGE_SLIDE_1,
  MOCK_SLIDESHOW_1,
  MOCK_SLIDESHOW_STATE_1,
  MOCK_THEMES,
  MOCK_TITLE_SLIDE_1,
} from '@eulogise/mock'
import {
  AssetType,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogiseProduct,
  IAudioAssetContent,
  IFilestackImageEnhancePreset,
  IImageAsset,
  ISlide,
  ISlideImage,
  ISlideshowData,
  ISlideshowTheme,
  MemorialVisualStatus,
  SlideTransition,
  SlideType,
  TimelineType,
} from '@eulogise/core'
import { ThemeHelper } from './ThemeHelper'

describe('SlideshowHelper', () => {
  let results: any
  const slideshowTheme = ThemeHelper.getProductThemeByProductType({
    theme: MOCK_THEMES[0],
    product: EulogiseProduct.SLIDESHOW,
  }) as ISlideshowTheme

  describe('getSlideshowImageAssets()', () => {
    const slideshowData = MOCK_SLIDESHOW_1

    beforeEach(() => {
      results = SlideshowHelper.getSlideshowImageAssets({
        slideshowData,
      })
    })

    it('should return image assets with no default dummy image handles', () => {
      expect(results).toEqual(
        [
          {
            filepath: 'primaryImages/L779gHw4TteehRK4UYNJ.jpeg',
            filename:
              'KAZRvO3QRapPIDlT8DC7_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
          },
          {
            filepath: 'primaryImages/5vi2F2HQQMKebYXZxIld.jpeg',
            filename:
              'LjngPfscTcGxGCdpqcYD_museums-victoria-DR5hnFIIlrQ-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
            filestackHandle: 'AprjiZ8ORbiTlAjIbuPy',
            filename:
              'M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
            filestackHandle: 'cBpxYhJgSPageQ5ebj3v',
            filename:
              'vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
            filestackHandle: '89B9QpQiTPydr9dEBICD',
            filename:
              'RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
            filestackHandle: 'qd6kTZbaTqikLTkAx0FK',
            filename: 'LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
            filestackHandle: 'QrdUX3eaRC2hYqX35ze4',
            filename:
              '5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
            filestackHandle: 'PTcdbPpQSpiwp5RilQOW',
            filename:
              'hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/t4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
            filestackHandle: 'uiSOcp6R9qCZKh66DIFQ',
            filename:
              't4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
            filestackHandle: 'HFlVimynTBSdjL3KxGTL',
            filename: 'CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
            filestackHandle: 'jHuus2ZTS6ECmchhqF5E',
            filename:
              'WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
            filestackHandle: 'rosRxI5VSVi9165j2Tnf',
            filename:
              'eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
            filestackHandle: 'gc2sIojTTzaZhZmcnpc8',
            filename:
              '4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
            filestackHandle: 'jBZTxpw9Q36n0PbCP36A',
            filename:
              'qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
            filestackHandle: 'cfYglS0qSGfzTCcbE7gs',
            filename:
              'O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
            filestackHandle: 'pG6VAbzyQWulcUAbuprS',
            filename:
              '5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
            filestackHandle: 'qczoR24RwK33DLY3dD3F',
            filename:
              'o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
            filestackHandle: 'rNO8tqYTsaNttdFus3Eh',
            filename:
              '6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
            filestackHandle: 'UZyKALqDTjeKKykGPHBt',
            filename:
              'CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
            filestackHandle: '0JILbgGySHurDmUpNTDS',
            filename:
              'N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
            filestackHandle: 'V8aMfD9sQCq1AUzJ4cnB',
            filename:
              '6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
            filestackHandle: '7iEnx4eERum9MFt8jXKl',
            filename:
              'RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
          },
          {
            filepath:
              'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
            filestackHandle: '11DH3tRGTRKwjtJKSJ6B',
            filename:
              'rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
          },
        ].map((slideImage: ISlideImage) =>
          SlideshowHelper.convertSlideImageToPartialImageAsset(slideImage!),
        ),
      )
    })
  })

  describe('getNoOfSlideshowImageAssets()', () => {
    const slideshowData = MOCK_SLIDESHOW_1

    beforeEach(() => {
      results = SlideshowHelper.getNoOfSlideshowImageAssets(slideshowData)
    })

    it('should return number of image assets with no default dummy image handles', () => {
      expect(results).toEqual(23)
    })
  })

  describe('hasSlideshowImageAssets()', () => {
    describe('True', () => {
      const slideshowData = MOCK_SLIDESHOW_1

      beforeEach(() => {
        results = SlideshowHelper.hasSlideshowImageAssets(slideshowData)
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })

    describe('False', () => {
      const slideshowData = createMockSlideshowData({
        slides: [
          createMockTitleSlide('Test Title Slide'),
          createMockImageSlide(DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE),
          createMockImageSlide(DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE),
          createMockTitleSlide('Test End Title Slide'),
        ],
      })

      beforeEach(() => {
        results = SlideshowHelper.hasSlideshowImageAssets(slideshowData)
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })
  })

  describe('getSlideshowEmbeddedCode()', () => {
    const caseId = '123'

    describe('showWhiteBottomBar = true', () => {
      const showWhiteBottomBar = true
      const expectedCode = `<iframe
  src="undefined/embedded/slideshows/${caseId}"
  allow='autoplay; fullscreen'
  style='filter: drop-shadow(2px 2px 2px #888888);border: 1px hidden black; border-top-left-radius: 16px; border-top-right-radius: 16px; margin: 10px auto 0 auto;;aspect-ratio: 16/9; display: block; width: 1024px; max-height: 100%; max-width: 100%;'
></iframe><iframe src="undefined/embedded/whitebar/123" style='filter: drop-shadow(2px 2px 2px #888888);border: 1px hidden black; height: 54px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; display: block; width: 1024px; max-height: 100%; max-width: 100%; margin: 0 auto 10px auto;'></iframe>`
      beforeEach(() => {
        results = SlideshowHelper.getSlideshowEmbeddedCode({
          caseId,
          showWhiteBottomBar,
        })
      })

      it('should return the expected code', () => {
        expect(results).toEqual(expectedCode)
      })
    })

    describe('showWhiteBottomBar = false', () => {
      const showWhiteBottomBar = false
      const expectedCode = `<iframe
  src="undefined/embedded/slideshows/${caseId}"
  allow='autoplay; fullscreen'
  style='filter: drop-shadow(2px 2px 2px #888888);border: 1px hidden black; border-radius: 16px; margin: 10px auto;;aspect-ratio: 16/9; display: block; width: 1024px; max-height: 100%; max-width: 100%;'
></iframe>`

      beforeEach(() => {
        results = SlideshowHelper.getSlideshowEmbeddedCode({
          caseId,
          showWhiteBottomBar,
        })
      })

      it('should return the expected code', () => {
        expect(results).toEqual(expectedCode)
      })
    })
  })

  describe('getSlideshowS3PosterPath()', () => {
    const caseId = '123'
    const expectedPath = `cases/${caseId}/SlideshowPoster.jpg`

    beforeEach(() => {
      results = SlideshowHelper.getSlideshowS3PosterPath({ caseId })
    })

    it('should return the expected path', () => {
      expect(results).toEqual(expectedPath)
    })
  })

  describe('getSlideshowS3PosterUrl()', () => {
    const caseId = '123'
    const expectedUrl = `undefined/cases/${caseId}/SlideshowPoster.jpg`

    beforeEach(() => {
      results = SlideshowHelper.getSlideshowS3PosterUrl({ caseId })
    })

    it('should return the expected url', () => {
      expect(results).toEqual(expectedUrl)
    })
  })

  describe('getGeneratedSlideshowUrl()', () => {
    const caseId = '123'
    const expectedUrl = `undefined/cases/${caseId}/Slideshow.mp4`

    beforeEach(() => {
      results = SlideshowHelper.getGeneratedSlideshowUrl({ caseId })
    })

    it('should return the expected url', () => {
      expect(results).toEqual(expectedUrl)
    })
  })

  describe('filterNonTitleSlideDummySlides', () => {
    describe('Normal', () => {
      beforeEach(() => {
        results = SlideshowHelper.filterNonTitleSlideDummySlides([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
        ])
      })

      it('should return the same array', () => {
        expect(results).toEqual([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
        ])
      })
    })

    describe('With dummy slides', () => {
      beforeEach(() => {
        results = SlideshowHelper.filterNonTitleSlideDummySlides([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
        ])
      })

      it('should filter out dummy slides', () => {
        expect(results).toEqual([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
        ])
      })
    })
  })

  describe('getSlideDuration()', () => {
    const COMMON_MOCK_SLIDESHOW_DATA: ISlideshowData = {
      content: {
        timelineType: TimelineType.FIT_SLIDES,
        theme: 'aura',
        audio: [
          {
            duration: 14000, // 10 seconds
          },
        ],
        slides: [],
      },
    } as never as ISlideshowData

    describe('FIT_SLIDES - with audio', () => {
      describe('without specified slideDuration in any slides', () => {
        const MOCK_SLIDESHOW_DATA = {
          ...COMMON_MOCK_SLIDESHOW_DATA,
          content: {
            ...COMMON_MOCK_SLIDESHOW_DATA.content,
            slides: [
              MOCK_TITLE_SLIDE_1, // Start Title Slide
              MOCK_DUMMY_IMAGE_SLIDE_1, // Start Title Slide
              MOCK_TITLE_SLIDE_1,
              MOCK_IMAGE_SLIDE_1,
              MOCK_TITLE_SLIDE_1,
              MOCK_IMAGE_SLIDE_1,
            ],
          },
        } as never as ISlideshowData

        it('should return default time for every slides', () => {
          expect(
            SlideshowHelper.getSlideDuration({
              slideshowData: MOCK_SLIDESHOW_DATA!,
              slideshowTheme,
              slideIndex: 3,
            }),
          ).toEqual(5000)

          expect(
            SlideshowHelper.getSlideDuration({
              slideshowData: MOCK_SLIDESHOW_DATA!,
              slideshowTheme,
              slideIndex: 5,
            }),
          ).toEqual(5000)
        })
      })

      describe('with a slide that specified slideDuration', () => {
        const MOCK_SLIDESHOW_DATA = {
          ...COMMON_MOCK_SLIDESHOW_DATA,
          content: {
            ...COMMON_MOCK_SLIDESHOW_DATA.content,
            audio: [
              {
                duration: 20000, // 20 seconds
              },
            ],
            slides: [
              MOCK_TITLE_SLIDE_1, // Start Title Slide
              MOCK_DUMMY_IMAGE_SLIDE_1, // Start Title Slide
              MOCK_TITLE_SLIDE_1,
              { ...MOCK_IMAGE_SLIDE_1, slideDuration: 8000 },
              MOCK_TITLE_SLIDE_1,
              MOCK_IMAGE_SLIDE_1,
              MOCK_TITLE_SLIDE_1,
              MOCK_IMAGE_SLIDE_1,
            ],
          },
        } as never as ISlideshowData

        it('should return the slide duration (minus transition duration) if getting the specified slide', () => {
          expect(
            SlideshowHelper.getSlideDuration({
              slideshowData: MOCK_SLIDESHOW_DATA!,
              slideshowTheme,
              slideIndex: 3,
            }),
          ).toEqual(4000)
        })

        it('should minus the specified slideDurations and calculate the remaining duration for the remaining slides', () => {
          expect(
            SlideshowHelper.getSlideDuration({
              slideshowData: MOCK_SLIDESHOW_DATA!,
              slideshowTheme,
              slideIndex: 5,
            }),
          ).toEqual(4000)

          expect(
            SlideshowHelper.getSlideDuration({
              slideshowData: MOCK_SLIDESHOW_DATA!,
              slideshowTheme,
              slideIndex: 7,
            }),
          ).toEqual(4000)
        })
      })
    })

    describe('NO_AUDIO', () => {
      const MOCK_SLIDESHOW_DATA = {
        ...COMMON_MOCK_SLIDESHOW_DATA,
        content: {
          ...COMMON_MOCK_SLIDESHOW_DATA.content,
          timelineType: TimelineType.NO_AUDIO,
          noAudioModeSlideDuration: 5000,
          slides: [
            MOCK_TITLE_SLIDE_1, // Start Title Slide
            MOCK_DUMMY_IMAGE_SLIDE_1, // Start Title Slide
            MOCK_TITLE_SLIDE_1,
            MOCK_IMAGE_SLIDE_1,
            MOCK_TITLE_SLIDE_1,
            MOCK_IMAGE_SLIDE_1,
          ],
        },
      } as never as ISlideshowData

      it('should calculate the slide duration equally', () => {
        expect(
          SlideshowHelper.getSlideDuration({
            slideshowData: MOCK_SLIDESHOW_DATA,
            slideshowTheme,
            slideIndex: 3,
          }),
        ).toEqual(1000)
        expect(
          SlideshowHelper.getSlideDuration({
            slideshowData: MOCK_SLIDESHOW_DATA,
            slideshowTheme,
            slideIndex: 5,
          }),
        ).toEqual(1000)
      })
    })
  })

  describe('getSlideGroups()', () => {
    describe('Normal Situation', () => {
      beforeEach(() => {
        results = SlideshowHelper.getSlideGroups([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
        ])
      })

      it('should return correct slide group', () => {
        expect(results).toEqual([
          {
            imageSlide: MOCK_DUMMY_IMAGE_SLIDE_1,
            titleSlide: MOCK_TITLE_SLIDE_1,
            imageSlideIndex: 1,
          },
          {
            id: 'abc',
            imageSlide: MOCK_IMAGE_SLIDE_1,
            titleSlide: MOCK_TITLE_SLIDE_1,
            imageSlideIndex: 3,
          },
          {
            id: 'end-title-slide',
            imageSlide: {
              slideType: 'Image Slide',
            },
          },
        ])
      })
    })

    describe('More than one dummy image slides', () => {
      beforeEach(() => {
        results = SlideshowHelper.getSlideGroups([
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_IMAGE_SLIDE_1,
          MOCK_TITLE_SLIDE_1,
          MOCK_DUMMY_IMAGE_SLIDE_1,
        ])
      })

      it('should return should remove extra empty slide image group', () => {
        expect(results).toEqual([
          {
            imageSlide: MOCK_DUMMY_IMAGE_SLIDE_1,
            titleSlide: MOCK_TITLE_SLIDE_1,
            imageSlideIndex: 1,
          },
          {
            id: 'abc',
            imageSlide: MOCK_IMAGE_SLIDE_1,
            titleSlide: MOCK_TITLE_SLIDE_1,
            imageSlideIndex: 3,
          },
          {
            id: 'end-title-slide',
            imageSlide: {
              slideType: SlideType.IMAGE_SLIDE,
            },
          },
        ])
      })
    })
  })

  describe('getAudioByProgress()', () => {
    const audio1: IAudioAssetContent = createMockAudioAssetContent({
      filename: 'filename-1',
      duration: 10,
    })
    const audio2: IAudioAssetContent = createMockAudioAssetContent({
      filename: 'filename-2',
      duration: 20,
    })
    const audio3: IAudioAssetContent = createMockAudioAssetContent({
      filename: 'filename-3',
      duration: 30,
    })
    const slideshowData = createMockSlideshowData({
      audio: [audio1, audio2, audio3],
    })

    describe('progress: 5', () => {
      beforeEach(() => {
        results = SlideshowHelper.getAudioByProgress(slideshowData, 5)
      })

      it('should return "{ audio: audio1, playFromPosition: 5 }"', () => {
        expect(results).toEqual({
          audio: audio1,
          audioIndex: 0,
          playFromPosition: 5,
        })
      })
    })

    describe('progress: 15', () => {
      beforeEach(() => {
        results = SlideshowHelper.getAudioByProgress(slideshowData, 15)
      })

      it('should return "{ audio: audio2, playFromPosition: 20 }"', () => {
        expect(results).toEqual({
          audio: audio2,
          audioIndex: 1,
          playFromPosition: 5,
        })
      })
    })

    describe('progress: 38', () => {
      beforeEach(() => {
        results = SlideshowHelper.getAudioByProgress(slideshowData, 38)
      })

      it('should return "{ audio: audio3, playFromPosition: 8 }"', () => {
        expect(results).toEqual({
          audio: audio3,
          audioIndex: 2,
          playFromPosition: 8,
        })
      })
    })
  })

  describe('getActiveSlideIndexesByProgress()', () => {
    const slides: Array<ISlide> = [
      createMockTitleSlide('title slide 1', false),
      createMockImageSlide('image slide 1'),
      createMockTitleSlide('title slide 2', false),
      createMockImageSlide('image slide 2'),
      createMockTitleSlide('title slide 3', false),
      createMockImageSlide('image slide 3'),
    ]
    const audioDuration = 150000
    describe('progress = 0', () => {
      const progress = 0
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowTheme,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([1])
      })
    })

    describe('progress = 47000', () => {
      const progress = 47000
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([1])
      })
    })

    describe('progress = 48000', () => {
      const progress = 48000
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([1])
      })
    })

    describe('progress = 49000', () => {
      const progress = 49000
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([1, 3])
      })
    })

    describe('progress = 52001', () => {
      const progress = 52001
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([1, 3])
      })
    })

    describe('progress = 54000', () => {
      const progress = 54000
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([3])
      })
    })

    describe('progress = 100000', () => {
      const progress = 100000
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([3, 5])
      })
    })

    describe('progress = 102001', () => {
      const progress = 102001
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([3, 5])
      })
    })

    describe('progress = 105001', () => {
      const progress = 105001
      beforeEach(() => {
        results = SlideshowHelper.getActiveSlideIndexesByProgress({
          slideProgress: progress,
          slideshowData: {
            content: {
              slides,
              theme: 'aura',
              // @ts-ignore
              audio: [{ duration: audioDuration }],
              timelineType: TimelineType.FIT_SLIDES,
            },
          },
          slideshowTheme,
        })
      })

      it('should return correct results', () => {
        expect(results).toEqual([5])
      })
    })
  })

  describe('getActiveSlideIndexes()', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const imageSlide1: ISlide = createMockImageSlide('image slide 1')
    const slides: Array<ISlide> = [titleSlide1, imageSlide1, titleSlide2]

    beforeEach(() => {
      results = SlideshowHelper.getActiveSlideIndexes(slides)
    })

    it('should return active slide indexes', () => {
      expect(results).toEqual([0, 1])
    })
  })

  describe('getActiveSlides', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const imageSlide1: ISlide = createMockImageSlide('image slide 1')
    const slides: Array<ISlide> = [titleSlide1, imageSlide1, titleSlide2]
    const slideshowData: ISlideshowData = {
      // @ts-ignore
      content: {
        slides,
      },
    }

    beforeEach(() => {
      results = SlideshowHelper.getActiveSlides(slideshowData)
    })

    it('should return active slides', () => {
      expect(results).toEqual([titleSlide1, imageSlide1])
    })
  })

  describe('getNoAudioModeSlideDuration', () => {
    describe('no specified slide duration', () => {
      const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
      const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
      const imageSlide1: ISlide = createMockImageSlide('image slide 1')
      const slides: Array<ISlide> = [titleSlide1, imageSlide1, titleSlide2]
      const slideshowData: ISlideshowData = {
        // @ts-ignore
        content: {
          timelineType: TimelineType.NO_AUDIO,
          slides,
        },
      }

      it('should return default slide duration if slideIndex is not specified', () => {
        const results =
          SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
            slideshowData,
          )
        expect(results).toEqual(5000)
      })

      it('should return default slide duration if no duration is specified for the slide', () => {
        const results =
          SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
            slideshowData,
            1,
          )
        expect(results).toEqual(5000)
      })
    })

    describe('specified slide duration', () => {
      const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
      const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
      const imageSlide1: ISlide = createMockImageSlide('image slide 1')
      const imageSlide2: ISlide = createMockImageSlide('image slide 2', {
        slideDuration: 1000,
      })
      const slides: Array<ISlide> = [
        titleSlide1,
        imageSlide1,
        titleSlide2,
        imageSlide2,
      ]
      const slideshowData: ISlideshowData = {
        // @ts-ignore
        content: {
          timelineType: TimelineType.NO_AUDIO,
          slides,
        },
      }

      it('should return default slide duration if slideIndex is not specified', () => {
        const results =
          SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
            slideshowData,
          )
        expect(results).toEqual(5000)
      })

      it('should return default slide duration if no duration is specified for the slide', () => {
        results = SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
          slideshowData,
          1,
        )
        expect(results).toEqual(5000)
        results = SlideshowHelper.getNoAudioModeSlideDurationInclTranInOut(
          slideshowData,
          3,
        )
        expect(results).toEqual(1000)
      })
    })
  })

  describe('getNonSpecifiedDurationSlides', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const imageSlide1: ISlide = createMockImageSlide('image slide 1')
    const imageSlide2: ISlide = createMockImageSlide('image slide 2', {
      slideDuration: 1000,
    })
    const slides: Array<ISlide> = [
      titleSlide1,
      imageSlide1,
      titleSlide2,
      imageSlide2,
    ]
    const slideshowData: ISlideshowData = {
      // @ts-ignore
      content: {
        timelineType: TimelineType.NO_AUDIO,
        slides,
      },
    }

    it('should return non specified duration slides', () => {
      expect(
        SlideshowHelper.getNonSpecifiedDurationSlides({
          slideshowData,
        }),
      ).toEqual([imageSlide1])
    })
  })

  describe('getSpecifiedDurationSlideIndexes', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const imageSlide1: ISlide = createMockImageSlide('image slide 1')
    const imageSlide2: ISlide = createMockImageSlide('image slide 2', {
      slideDuration: 1000,
    })
    const slides: Array<ISlide> = [
      titleSlide1,
      imageSlide1,
      titleSlide2,
      imageSlide2,
    ]
    const slideshowData: ISlideshowData = {
      // @ts-ignore
      content: {
        timelineType: TimelineType.NO_AUDIO,
        slides,
      },
    }

    it('should return specified duration slides', () => {
      expect(
        SlideshowHelper.getSpecifiedDurationSlideIndexes({
          slideshowData,
        }),
      ).toEqual([3])
    })
  })

  describe('getTotalSpecifiedDurationSlidesDuration', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const specifiedImageSlide1: ISlide = createMockImageSlide('image slide 1', {
      slideDuration: 3000,
    })

    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const specifiedImageSlide2: ISlide = createMockImageSlide('image slide 2', {
      slideDuration: 5000,
    })

    const titleSlide3: ISlide = createMockTitleSlide('title slide 3', false)
    const nonSpecifiedSlide3: ISlide = createMockImageSlide('image slide 3')

    const slides: Array<ISlide> = [
      titleSlide1,
      specifiedImageSlide1,
      titleSlide2,
      specifiedImageSlide2,
      titleSlide3,
      nonSpecifiedSlide3,
    ]
    const slideshowData: ISlideshowData = {
      // @ts-ignore
      content: {
        timelineType: TimelineType.NO_AUDIO,
        slides,
        theme: 'aura',
      },
    }

    it('should return the total of specified slide duration', () => {
      expect(
        SlideshowHelper.getTotalSpecifiedDurationSlidesDuration({
          slideshowData,
          slideshowTheme,
        }),
      ).toEqual(5000)
    })
  })

  describe('calculateSingleNonSpecifiedSlideDurationWithoutTransitionOutByTotalDuration', () => {
    describe('without title slides', () => {
      const titleSlide1: ISlide = createMockTitleSlide('title slide 1', false)
      const imageSlide1: ISlide = {
        slideType: 'Image Slide',
      }

      const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
      const imageSlide2: ISlide = createMockImageSlide('image slide 2')

      const titleSlide3: ISlide = createMockTitleSlide('title slide 3', false)
      const imageSlide3: ISlide = createMockImageSlide('image slide 2')

      const titleSlide4: ISlide = createMockTitleSlide('title slide 4', false)

      const slides: Array<ISlide> = [
        titleSlide1,
        imageSlide1,
        titleSlide2,
        imageSlide2,
        titleSlide3,
        imageSlide3,
        titleSlide4,
      ]
      const themeId = 'watercolor-sailing'
      const slideshowData: ISlideshowData = {
        content: {
          hasUserSave: false,
          duration: 167000,
          timelineType: TimelineType.NO_AUDIO,
          hasUserPreview: false,
          slides,
          noAudioModeSlideDuration: 84500,
          theme: themeId,
          audio: [],
          defaultTitleSlideContent: {
            isTitleSlideEnable: false,
            titleSlideTextAnimation: SlideTransition.FADE_ON,
            slideType: 'Title Slide',
            background: {
              getImage: null,
              blurred: false,
            },
          },
          imageFilter: 'none',
        },
        updatedAt: '2024-06-24T05:10:23.752Z',
        createdAt: '2024-06-20T03:29:18.668Z',
        id: '32456cc9-35ad-47dc-8a74-1662b57e62d0',
        case: '1b0c7ad8-5705-4341-9ae0-b5105a83aee2',
        status: MemorialVisualStatus.EDITED,
      }
      const slideshowTheme = MOCK_THEMES.find((t: any) => t.id === themeId)
        ?.products.slideshow as ISlideshowTheme

      const expectedSlideDuration = 85000
      const inputDuration = 168000 // 2 mins 48 seconds

      it('should return single non specified slide duration', () => {
        const results =
          SlideshowHelper.calculateSingleNonSpecifiedSlideDurationWithoutTransitionOutByTotalDuration(
            inputDuration,
            {
              slideshowData,
              slideshowTheme,
            },
          )
        expect(results).toEqual({
          noOfActiveSlides: 2,
          durationPerSlide: expectedSlideDuration,
          totalDurationWithoutLastTransition: 170000,
        })
      })

      it('use getNoAudioTotalSlideshowDuration() to convert back the result and it should be able to derive the original input', () => {
        const results = SlideshowHelper.getNoAudioTotalSlideshowDuration({
          slideshowData: {
            ...slideshowData,
            content: {
              ...slideshowData.content,
              noAudioModeSlideDuration: expectedSlideDuration,
            },
          },
          slideshowTheme,
        })

        expect(results).toEqual(inputDuration)
      })
    })
  })

  describe('getNoAudioTotalSlideshowDuration', () => {
    const titleSlide1: ISlide = createMockTitleSlide('title slide 1', true)
    const titleSlide2: ISlide = createMockTitleSlide('title slide 2', false)
    const imageSlide1: ISlide = createMockImageSlide('image slide 1')
    const slides: Array<ISlide> = [titleSlide1, imageSlide1, titleSlide2]
    const slideshowData: ISlideshowData = {
      // @ts-ignore
      content: {
        timelineType: TimelineType.NO_AUDIO,
        slides,
        theme: 'aura',
      },
    }

    it('should return active slides', () => {
      const results = SlideshowHelper.getNoAudioTotalSlideshowDuration({
        slideshowData,
        slideshowTheme,
      })
      expect(results).toEqual(9000)
    })
  })

  describe('getSlideByFilestackHandle()', () => {
    describe('FilestackHandle exists', () => {
      const filestackHandle: string = 'OAWnBIYhS626i2g3TnDA'

      beforeEach(() => {
        results = SlideshowHelper.getSlideByFilestackHandle(
          // @ts-ignore
          MOCK_SLIDESHOW_STATE_1.activeItem.content.slides,
          filestackHandle,
        )
      })

      it('should return image slide', () => {
        expect(results).toEqual({
          slideType: 'Image Slide',
          image: {
            filepath:
              'cases/e9029897-d7cb-4f8c-b83a-e862b6e05aab/gallery/VnlvWERwRO2mhpgOqt1O.jpg',
            filestackHandle: 'OAWnBIYhS626i2g3TnDA',
            filename: 'VnlvWERwRO2mhpgOqt1O_.jpg',
          },
        })
      })
    })

    describe('FilestackHandle not exist', () => {
      const filestackHandle: string = 'not-exists'
      const slides: Array<ISlide> = []

      beforeEach(() => {
        results = SlideshowHelper.getSlideByFilestackHandle(
          slides,
          filestackHandle,
        )
      })

      it('should return image slide', () => {
        expect(results).toBeUndefined()
      })
    })
  })

  describe('insertImageToSlide', () => {
    const newImageSlide: ISlide = {
      slideType: SlideType.IMAGE_SLIDE,
    }
    const newTitleSlide: ISlide = {
      slideType: SlideType.TITLE_SLIDE,
    }

    beforeEach(() => {
      // @ts-ignore
      global.sandbox
        .stub(SlideshowHelper, 'transformImageAssetToSlide')
        .returns(newImageSlide)
      // @ts-ignore
      global.sandbox
        .stub(SlideshowHelper, 'createDefaultTitleSlide')
        .returns(newTitleSlide)
    })
    beforeEach(() => {
      results = SlideshowHelper.insertImageToSlide({
        slides: [
          { slideType: SlideType.TITLE_SLIDE },
          { slideType: SlideType.IMAGE_SLIDE },
          { slideType: SlideType.TITLE_SLIDE },
          { slideType: SlideType.IMAGE_SLIDE },
          { slideType: SlideType.TITLE_SLIDE },
          { slideType: SlideType.IMAGE_SLIDE },
        ],
        index: 1,
        image: {
          case: '',
          createdAt: '',
          owner: '',
          type: AssetType.IMAGE,
          updatedAt: '',
          id: 'new-image-1',
          content: {
            filename: 'filename-1',
            filepath: 'filepath-1',
            filestackHandle: 'filehandle-1',
          },
        },
        slideshowTheme,
      })
    })

    it('should return correct results', () => {
      expect(results).toEqual([
        { slideType: 'Title Slide' },
        { slideType: 'Image Slide' },
        newTitleSlide,
        newImageSlide,
        { slideType: 'Title Slide' },
        { slideType: 'Image Slide' },
        { slideType: 'Title Slide' },
        { slideType: 'Image Slide' },
      ])
    })
  })

  describe('updateSlideImagePreset', () => {
    const mockImageName = 'image slide 1'
    const imageSlide1: ISlide = createMockImageSlide(mockImageName, {
      image: {
        preset: IFilestackImageEnhancePreset.NULL,
        filepath: mockImageName,
        filename: mockImageName,
        filestackHandle: mockImageName,
      },
    })
    const slides: Array<ISlide> = [imageSlide1]
    const mockUpdatedImageAsset: IImageAsset = {
      content: {
        filename: mockImageName,
        filepath: mockImageName,
        filestackHandle: mockImageName,
        preset: IFilestackImageEnhancePreset.AUTO,
      },
      id: 'mockImageAsset',
      updatedAt: 'updateAt',
      createdAt: 'createdAt',
      owner: 'owner',
      case: 'case',
      type: AssetType.IMAGE,
    }

    const expectedNewImageSlide: ISlide = {
      slideType: SlideType.IMAGE_SLIDE,
      image: {
        filename: mockImageName,
        filepath: mockImageName,
        filestackHandle: mockImageName,
        preset: IFilestackImageEnhancePreset.AUTO,
      },
    }

    beforeEach(() => {
      results = SlideshowHelper.updateSlideImagePreset({
        slides,
        originalSlide: slides[0],
        updatedImage: mockUpdatedImageAsset,
      })
    })

    it('should return correct results', () => {
      expect(results).toEqual([expectedNewImageSlide])
    })
  })
})
