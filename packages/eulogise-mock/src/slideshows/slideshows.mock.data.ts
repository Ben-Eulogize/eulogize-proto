// @ts-nocheck
import { MOCK_CASE_1 } from '../cases'
import {
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogiseResource,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  ISlide,
  ISlideshowData,
  MemorialVisualStatus,
  ResourceFileStatus,
  SlideType,
  TimelineType,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users'

export const MOCK_TITLE_SLIDE_1: ISlide = {
  background: {
    blurred: false,
    getImage: null,
  },
  duration: 6000,
  isTitleSlideEnable: false,
  slideType: 'Title Slide',
  text: {
    layers: {
      subTitle: {
        content: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: '31gbt',
              text: '10 March 1954 - 10 January 2018',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      title: {
        content: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'a75b3',
              text: '',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    },
  },
  titleSlideTextAnimation: 'crossFade',
}

export const MOCK_DUMMY_IMAGE_SLIDE_1: ISlide = {
  slideType: SlideType.IMAGE_SLIDE,
}

export const MOCK_IMAGE_SLIDE_1: ISlide = {
  image: {
    filename: 'abc-abc-abc.jpg',
    filepath: 'cases/abc/gallery/abc.jpg',
    filestackHandle: 'abc',
  },
  slideType: SlideType.IMAGE_SLIDE,
}

// Mock Slideshow data
export const MOCK_SLIDESHOW_1: ISlideshowData = {
  id: 'c2842e23-848b-443e-974c-598d9b41aa3a',
  case: MOCK_CASE_1.id,
  content: {
    hasUserSave: false,
    duration: 124968,
    timelineType: 'fitSlidesToAudio',
    hasUserPreview: false,
    slides: [
      {
        duration: 5000,
        isTitleSlideEnable: true,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'apgcu',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '28 December 1938 - 21 June 2023',
                    type: 'unstyled',
                    key: 'ebjs4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '97ei5',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'd6bh4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath: 'primaryImages/L779gHw4TteehRK4UYNJ.jpeg',
          filename:
            'KAZRvO3QRapPIDlT8DC7_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'b4q27',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '42qpm',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath: 'primaryImages/5vi2F2HQQMKebYXZxIld.jpeg',
          filename:
            'LjngPfscTcGxGCdpqcYD_museums-victoria-DR5hnFIIlrQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'fm340',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '19qa1',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
          filestackHandle: 'AprjiZ8ORbiTlAjIbuPy',
          filename:
            'M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'eiaii',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '2pt8b',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
          filestackHandle: 'cBpxYhJgSPageQ5ebj3v',
          filename: 'vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'fu6oa',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '145ap',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
          filestackHandle: '89B9QpQiTPydr9dEBICD',
          filename:
            'RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '8qrh3',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5udf2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/3JuFws9CShWBlJMYvB03_perola-hammar-KUcIow0Fy7o-unsplash.jpg',
          filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
          filename:
            '3JuFws9CShWBlJMYvB03_perola-hammar-KUcIow0Fy7o-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '7go1m',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'b1iqv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
          filestackHandle: 'qd6kTZbaTqikLTkAx0FK',
          filename: 'LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'avjr8',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '367qp',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
          filestackHandle: 'QrdUX3eaRC2hYqX35ze4',
          filename:
            '5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '6vd1b',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '67nfg',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
          filestackHandle: 'PTcdbPpQSpiwp5RilQOW',
          filename:
            'hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '27pej',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '1eesk',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/t4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
          filestackHandle: 'uiSOcp6R9qCZKh66DIFQ',
          filename:
            't4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '9im98',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'd2rth',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
          filestackHandle: 'HFlVimynTBSdjL3KxGTL',
          filename: 'CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'dps1h',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '7epvv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
          filestackHandle: 'jHuus2ZTS6ECmchhqF5E',
          filename:
            'WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '2bjpp',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '82b19',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
          filestackHandle: 'rosRxI5VSVi9165j2Tnf',
          filename:
            'eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '2mvgb',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8saa2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
          filestackHandle: 'gc2sIojTTzaZhZmcnpc8',
          filename:
            '4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'frfdo',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8rqj1',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
          filestackHandle: 'jBZTxpw9Q36n0PbCP36A',
          filename:
            'qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'bcqbt',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'a5kvn',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
          filestackHandle: 'cfYglS0qSGfzTCcbE7gs',
          filename:
            'O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '59vp6',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '9ojhi',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
          filestackHandle: 'pG6VAbzyQWulcUAbuprS',
          filename:
            '5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '9n822',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'etp7p',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
          filestackHandle: 'qczoR24RwK33DLY3dD3F',
          filename: 'o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'di9st',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8kp4d',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
          filestackHandle: 'rNO8tqYTsaNttdFus3Eh',
          filename:
            '6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'p19e',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '4gvid',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
          filestackHandle: 'UZyKALqDTjeKKykGPHBt',
          filename:
            'CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '81c31',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5lq8t',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
          filestackHandle: '0JILbgGySHurDmUpNTDS',
          filename:
            'N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'cf7n2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'accle',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
          filestackHandle: 'V8aMfD9sQCq1AUzJ4cnB',
          filename:
            '6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'assn9',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5d2jc',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
          filestackHandle: '7iEnx4eERum9MFt8jXKl',
          filename:
            'RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'd2eas',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '9plii',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
          filestackHandle: '11DH3tRGTRKwjtJKSJ6B',
          filename:
            'rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'End Title Slide Title',
                    type: 'unstyled',
                    key: '9o2lv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'End Title Slide Subtitle',
                    type: 'unstyled',
                    key: 'ciuks',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'End Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
    ],
    slideshowBackground: {},
    theme: 'reflection',
    audio: [
      {
        duration: 124968,
        filename: 'EnwZ0KLpSXOx7uNoxAEH_Edit - BY NIGHT',
        filepath: 'EnwZ0KLpSXOx7uNoxAEH_Edit - BY NIGHT',
        artist: '',
        title: 'Edit - BY NIGHT',
        category: 'Uploaded',
        filestackHandle: 'JGFNdO7aS1K9cyJ5cz3w',
      },
    ],
    defaultTitleSlideContent: {
      duration: 5000,
      isTitleSlideEnable: false,
      text: {
        layers: {
          title: {
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: 'Otto Donovan',
                  type: 'unstyled',
                  key: '2c9jr',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
          },
          subTitle: {
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: '28 December 1938 - 21 June 2023',
                  type: 'unstyled',
                  key: 'aequp',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
          },
        },
      },
      titleSlideTextAnimation: 'crossFade',
      slideType: 'Title Slide',
      background: {
        getImage: null,
        blurred: false,
      },
    },
    imageFilter: 'none',
  },
  createdAt: 1687480606651,
  fileStatus: ResourceFileStatus.FAILED,
  status: MemorialVisualStatus.EDITED,
  updatedAt: 1687737704573,
}

export const MOCK_SLIDESHOW_WITHOUT_AUDIO_1: ISlideshowData = {
  content: {
    hasUserSave: false,
    duration: 109113,
    timelineType: 'fitSlidesToAudio',
    hasUserPreview: false,
    slides: [
      {
        titleSlideTransition: {
          in: {
            type: 'fadeIn',
          },
          out: {
            type: 'fadeOut',
          },
        },
        isTitleSlideEnable: true,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/50cecd49-9634-4757-8e5e-092a05658646/gallery/cPjay2aSBSG3zMDGV0Ig_image.jpg',
          filestackHandle: 'llN8e2IKRrKto9gDysZE',
          filename: 'cPjay2aSBSG3zMDGV0Ig_image.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/50cecd49-9634-4757-8e5e-092a05658646/gallery/mrOEt7pgT9q7s7AEy38i_intro-1636395579.jpg',
          filestackHandle: '40oM6ujaQhS7Zr7A9cvq',
          filename: 'mrOEt7pgT9q7s7AEy38i_intro-1636395579.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/50cecd49-9634-4757-8e5e-092a05658646/gallery/FJGBL0ORiynAFXLSPvQw_NeoTheMatrix.jpg',
          filestackHandle: 'RJRSy8npRuCZZRyTbeXA',
          filename: 'FJGBL0ORiynAFXLSPvQw_NeoTheMatrix.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/50cecd49-9634-4757-8e5e-092a05658646/gallery/UfxpXRDRTMDCoiKBGkIb_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
          filestackHandle: 'iXRcBv7MTDSzmXQOqJC5',
          filename:
            'UfxpXRDRTMDCoiKBGkIb_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
        },
      },
      {
        titleSlideTransition: {
          in: {
            type: 'fadeIn',
          },
          out: {
            type: 'fadeOut',
          },
        },
        isTitleSlideEnable: true,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'End Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
    ],
    theme: 'watercolor-sailing',
    audio: [
      {
        duration: 109113,
        filename: 'Broken.mp3',
        filepath: 'slideshow/audio/Broken.mp3',
        artist: 'David Bullard',
        category: 'Reflection',
        title: 'Broken',
        filestackHandle: '8KbqombpTwmTHJCtaqrX',
      },
    ],
    defaultTitleSlideContent: {
      isTitleSlideEnable: false,
      titleSlideTextAnimation: 'crossFade',
      slideType: 'Title Slide',
      background: {
        getImage: null,
        blurred: false,
      },
    },
    imageFilter: 'none',
  },
  updatedAt: '2024-07-19T00:45:34.726Z',
  status: 'theme_selected',
  createdAt: '2024-07-19T00:44:45.298Z',
  id: '1c9dc1a9-002b-4311-8b9b-ff9bd42c9004',
  case: '50cecd49-9634-4757-8e5e-092a05658646',
  fileStatus: 'not_started',
}

export const MOCK_SLIDESHOW_WITH_MULTI_AUDIOS_1: ISlideshowData = {
  content: {
    hasUserSave: false,
    duration: 269061,
    timelineType: 'fitSlidesToAudio',
    hasUserPreview: false,
    slides: [
      {
        isTitleSlideEnable: true,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/d36d2a07-14a5-4b06-964b-23a13ccfc4c5/gallery/O5a7RNARySkfTNFSu0Sg_brandi-redd-6H9H-tYPUQQ-unsplash.jpg',
          filestackHandle: 'CyNEyYmbR0p4zHHeU8NM',
          filename: 'O5a7RNARySkfTNFSu0Sg_brandi-redd-6H9H-tYPUQQ-unsplash.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/d36d2a07-14a5-4b06-964b-23a13ccfc4c5/gallery/7PAYimCgQLWOfifN5AN3_annette-sousa-HW-ep3fC4Kc-unsplash.jpg',
          filestackHandle: 'vk8FYhJSpq7nowucTHpw',
          filename:
            '7PAYimCgQLWOfifN5AN3_annette-sousa-HW-ep3fC4Kc-unsplash.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
    ],
    slideshowBackground: {
      image: {
        url: 'https://us.media.eulogisememorials.com/backgroundImages/29756283-e369-4904-a5c9-948b50392f61/USA/29756283-e369-4904-a5c9-948b50392f61_SLIDESHOW_USA.jpg',
      },
    },
    theme: 'grandeur',
    audio: [
      {
        duration: 168046,
        filename: 'Canon Pachelbel.mp3',
        filepath: 'slideshow/audio/Canon Pachelbel.mp3',
        artist: 'Aura Classica',
        category: 'Classical',
        title: 'Canon - Pachelbel',
        filestackHandle: 'QI0cWJ39QneZuL6JQaRp',
      },
      {
        duration: 177032,
        filename: 'Cello Suite no1. - Bach.mp3',
        filepath: 'slideshow/audio/Cello Suite no1. - Bach.mp3',
        artist: 'Arend',
        category: 'Classical',
        title: 'Cello Suite 1 - Bach',
        filestackHandle: '4r5nwaRzRqCxano3OgEH',
      },
    ],
    defaultTitleSlideContent: {
      isTitleSlideEnable: false,
      titleSlideTextAnimation: 'crossFade',
      slideType: 'Title Slide',
      background: {
        getImage: null,
        blurred: false,
      },
    },
    imageFilter: 'none',
  },
  generateUserId: 'a54dd91d-82bc-4022-b18e-070ddebd4961',
  updatedAt: '2024-06-04T08:21:02.840Z',
  status: 'download',
  createdAt: '2024-06-04T06:39:27.618Z',
  id: '5d4022e1-a271-4eb4-a25a-b1c440345c07',
  case: 'd36d2a07-14a5-4b06-964b-23a13ccfc4c5',
  fileStatus: 'generated',
}

export const MOCK_SLIDESHOW_NO_AUDIO_1: ISlideshowData = {
  content: {
    hasUserSave: false,
    duration: 127000,
    timelineType: TimelineType.NO_AUDIO,
    hasUserPreview: false,
    slides: [
      {
        duration: 5000,
        isTitleSlideEnable: true,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'apgcu',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '28 December 1938 - 21 June 2023',
                    type: 'unstyled',
                    key: 'ebjs4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: null,
          blurred: false,
        },
      },
      {
        slideType: 'Image Slide',
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '97ei5',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'd6bh4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/KAZRvO3QRapPIDlT8DC7_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
          filestackHandle: 'L779gHw4TteehRK4UYNJ',
          filename:
            'KAZRvO3QRapPIDlT8DC7_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'b4q27',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '42qpm',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/LjngPfscTcGxGCdpqcYD_museums-victoria-DR5hnFIIlrQ-unsplash.jpg',
          filestackHandle: '5vi2F2HQQMKebYXZxIld',
          filename:
            'LjngPfscTcGxGCdpqcYD_museums-victoria-DR5hnFIIlrQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'fm340',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '19qa1',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
          filestackHandle: 'AprjiZ8ORbiTlAjIbuPy',
          filename:
            'M15BKjJSQ8ixOgajltMp_library-of-congress-Z0quHIuhUxc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'eiaii',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '2pt8b',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
          filestackHandle: 'cBpxYhJgSPageQ5ebj3v',
          filename: 'vqa6bwUDSz3TAM2iECoi_mile-modic-Sv9xCQ7RBCs-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'fu6oa',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '145ap',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
          filestackHandle: '89B9QpQiTPydr9dEBICD',
          filename:
            'RjEHrLRx2ITMOI1Z6bQj_freddy-kearney-o-ioeoATbIM-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '8qrh3',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5udf2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/3JuFws9CShWBlJMYvB03_perola-hammar-KUcIow0Fy7o-unsplash.jpg',
          filestackHandle: '8Nx5yq0rRvujfTFND7tc',
          filename:
            '3JuFws9CShWBlJMYvB03_perola-hammar-KUcIow0Fy7o-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '7go1m',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'b1iqv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
          filestackHandle: 'qd6kTZbaTqikLTkAx0FK',
          filename: 'LKJYUzSYa2O3XEye93Iw_z-i9uIhSlOWYc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'avjr8',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '367qp',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
          filestackHandle: 'QrdUX3eaRC2hYqX35ze4',
          filename:
            '5xJMdMJ3Sv2FzeDoXCWA_eduardo-barrios-XMCLLGGMMYU-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '6vd1b',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '67nfg',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
          filestackHandle: 'PTcdbPpQSpiwp5RilQOW',
          filename:
            'hWdaPSU8SKO0sdkHPlfC_paola-aguilar-LkQHGSVzfsk-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '27pej',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '1eesk',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/t4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
          filestackHandle: 'uiSOcp6R9qCZKh66DIFQ',
          filename:
            't4CHTujJQyIsXsC8Q5dg_luke-southern-yyvx_eYqtKY-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '9im98',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'd2rth',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
          filestackHandle: 'HFlVimynTBSdjL3KxGTL',
          filename: 'CGysNhXkSedETuR2UgEq_avin-cp-h8pngKKUyYc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'dps1h',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '7epvv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
          filestackHandle: 'jHuus2ZTS6ECmchhqF5E',
          filename:
            'WYAjdBTGQ6GXfS64FsEg_luis-machado-nCGl8FrGHb0-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '2bjpp',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '82b19',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
          filestackHandle: 'rosRxI5VSVi9165j2Tnf',
          filename:
            'eNBl91BCTBK27XczyrEr_robert-godwin-cdksyTqEXzo-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '2mvgb',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8saa2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
          filestackHandle: 'gc2sIojTTzaZhZmcnpc8',
          filename:
            '4LxraRHSEWfkLBC9MM3A_kindred-hues-photography-8LzOEqoCsh8-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'frfdo',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8rqj1',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
          filestackHandle: 'jBZTxpw9Q36n0PbCP36A',
          filename:
            'qcibZbPsSi6uighVxieB_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'bcqbt',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'a5kvn',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
          filestackHandle: 'cfYglS0qSGfzTCcbE7gs',
          filename:
            'O5c0FHVGRMGz2ZLEnCYy_jonathan-farber-woZEqF1ZE0Q-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '59vp6',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '9ojhi',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
          filestackHandle: 'pG6VAbzyQWulcUAbuprS',
          filename:
            '5hAKMa7Qa2kr8XH0gMkQ_museums-of-history-new-south-wales-Qohz2EJSorQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '9n822',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'etp7p',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
          filestackHandle: 'qczoR24RwK33DLY3dD3F',
          filename: 'o6saovCDRsan7iu2LiRf_rafael-leao-NRnPv3Gs-Nc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'di9st',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '8kp4d',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
          filestackHandle: 'rNO8tqYTsaNttdFus3Eh',
          filename:
            '6XbBenoTRqfStV6DfMvB_jack-finnigan-rriAI0nhcbc-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'p19e',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '4gvid',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
          filestackHandle: 'UZyKALqDTjeKKykGPHBt',
          filename:
            'CWYPKzppTqwDUtK9VNqQ_daisy-obryan-7JPGg8S-QD4-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: '81c31',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5lq8t',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
          filestackHandle: '0JILbgGySHurDmUpNTDS',
          filename:
            'N8buWU0sRbuav1AYBIWR_jixiao-huang-I1Plc-FAAnQ-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'cf7n2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: 'accle',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
          filestackHandle: 'V8aMfD9sQCq1AUzJ4cnB',
          filename:
            '6fOZLztESx1eiPgNPWVh_angelina-litvin-52R7t7x8CPI-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'assn9',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '5d2jc',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
          filestackHandle: '7iEnx4eERum9MFt8jXKl',
          filename:
            'RFfCkmemR9uGwwJEYF5F_danie-franco-l9I93gZKTG4-unsplash.jpg',
        },
      },
      {
        duration: 5000,
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'd2eas',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'unstyled',
                    key: '9plii',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
      {
        slideType: 'Image Slide',
        image: {
          filepath:
            'cases/a71c69c3-6d90-44eb-8f39-4c5c5f8a9a54/gallery/rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
          filestackHandle: '11DH3tRGTRKwjtJKSJ6B',
          filename:
            'rn5VwIaT9WNrmxU8BVfQ_abstral-official-cyOKLSgkgCE-unsplash.jpg',
        },
      },
      {
        isTitleSlideEnable: false,
        text: {
          layers: {
            title: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'End Title Slide Title',
                    type: 'unstyled',
                    key: '9o2lv',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
            subTitle: {
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'End Title Slide Subtitle',
                    type: 'unstyled',
                    key: 'ciuks',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
            },
          },
        },
        titleSlideTextAnimation: 'crossFade',
        slideType: 'End Title Slide',
        background: {
          getImage: 'next',
          blurred: true,
        },
      },
    ],
    slideshowBackground: {},
    theme: 'reflection',
    audio: [
      {
        duration: 124968,
        filename: 'EnwZ0KLpSXOx7uNoxAEH_Edit - BY NIGHT',
        filepath: 'EnwZ0KLpSXOx7uNoxAEH_Edit - BY NIGHT',
        artist: '',
        title: 'Edit - BY NIGHT',
        category: 'Uploaded',
        filestackHandle: 'JGFNdO7aS1K9cyJ5cz3w',
      },
    ],
    defaultTitleSlideContent: {
      duration: 5000,
      isTitleSlideEnable: false,
      text: {
        layers: {
          title: {
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: 'Otto Donovan',
                  type: 'unstyled',
                  key: '2c9jr',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
          },
          subTitle: {
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: '28 December 1938 - 21 June 2023',
                  type: 'unstyled',
                  key: 'aequp',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
          },
        },
      },
      titleSlideTextAnimation: 'crossFade',
      slideType: 'Title Slide',
      background: {
        getImage: null,
        blurred: false,
      },
    },
    imageFilter: 'none',
  },
  updatedAt: '2023-06-30T00:44:01.842Z',
  status: MemorialVisualStatus.EDITED,
  createdAt: '2023-06-23T00:36:46.651Z',
  id: 'c2842e23-848b-443e-974c-598d9b41aa3a',
  case: MOCK_CASE_1.id,
  fileStatus: ResourceFileStatus.FAILED,
}

export const MOCK_SLIDESHOWS: Array<ISlideshowData> = [MOCK_SLIDESHOW_1]

// Mock Slideshow Find response
export const MOCK_SLIDESHOW_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_SLIDESHOWS,
  count: MOCK_SLIDESHOWS.length,
  ref: 'a94f880cc41a7',
}

export const MOCK_SLIDESHOW_FIND_RESPONSE_2: IFindResponse = {
  items: [],
  count: 0,
  ref: 'a94f880cc41a7',
}

export const MOCK_SIDESHOW_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.SLIDESHOW,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_SIDESHOW_FIND_REQUEST_BODY_1 },
  response: MOCK_SLIDESHOW_FIND_RESPONSE_1,
}

export const MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_SIDESHOW_FIND_REQUEST_BODY_1 },
  response: MOCK_SLIDESHOW_FIND_RESPONSE_2,
}

export const MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_3.webtoken,
  request: { body: MOCK_SIDESHOW_FIND_REQUEST_BODY_1 },
  response: MOCK_SLIDESHOW_FIND_RESPONSE_2,
}

export const MOCK_SIDESHOW_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [
    MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_1,
    MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_2,
    MOCK_SIDESHOW_FIND_REQUEST_RESPONSE_3,
  ]
