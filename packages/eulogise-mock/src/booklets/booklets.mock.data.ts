import { MOCK_CASE_1 } from '../cases'
import {
  AlignmentType,
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseResource,
  ICardProductData,
  ICardProductFadeEdgeType,
  ICardProductFrameAvailability,
  ICardProductFrameImageContent,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users'

// Mock Booklet data
export const MOCK_BOOKLET_1: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.HALF_LETTER_A5,
    theme: 'fall-flowers',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        border: {
          color: '#B9346F',
        },
        rows: [
          {
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
            id: 'fall-flowers-front-img',
            data: {
              prevAlignment: AlignmentType.CENTER,
              enableBorder: false,
              content: {
                fadeEdge: ICardProductFadeEdgeType.ROUNDED,
                lockAspectRatio: true,
                width: 205,
                frameAvailability: ICardProductFrameAvailability.CARD,
                id: '1e75g6il',
                type: 'rows',
                items: [
                  {
                    id: '394u4bn4',
                    borderRadius: '100rem',
                    type: 'content',
                    content: {
                      transformY: -169.5,
                      renderImageHeight: 337,
                      transformX: -262.96009244992297,
                      filename:
                        'QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      renderImageWidth: 521.9201848998459,
                      type: 'image',
                      filestackHandle: 'INtXnkWgTpWgXNVwFX1J',
                    },
                  },
                ],
                layoutId: 'card-product-frame-one-rounded',
                height: 216,
              },
              prevWidth: 395.432,
              width: 205,
              enableFadeImage: false,
              isFullWidth: false,
              height: 216,
            },
            type: CardProductContentItemType.FRAME,
          },
          {
            data: {
              height: 18,
            },
            type: 'space',
            id: 'hcnz5hjz',
          },
          {
            dynamicDataId: CardProductDynamicDataKey.serviceDateAtServiceTime,
            id: 'j28c2cdz',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
                font: 'Sora',
              },
              width: 335,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        length: 100000,
                        style: 'white',
                      },
                      {
                        offset: 0,
                        length: 100000,
                        style: 'dark-grey',
                      },
                    ],
                    text: '06/26/2025 at 5:05 pm',
                    type: 'header-six',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            type: 'text',
          },
          {
            id: 'ut2a91og',
            type: CardProductContentItemType.FRAME,
            data: {
              height: 210,
              width: 210,
              enableFadeImage: true,
              content: {
                layoutId: 'card-product-frame-one-square',
                type: 'rows',
                items: [
                  {
                    id: '1vlchk91',
                    type: 'content',
                    content: {
                      type: 'image',
                      filestackHandle: 'SRArRHO3TVOSn2fPkwwo',
                      transformX: -160.3698630136986,
                      transformY: -109,
                      renderImageHeight: 326,
                      renderImageWidth: 492,
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/MpurxomIStmqyxsmYPsF_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
                      filename:
                        'MpurxomIStmqyxsmYPsF_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
                    },
                  },
                ],
                height: 210,
                width: 210,
                fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
                isAddAsRatio: true,
                id: 'tfu14d6c',
              },
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_FRONT_USA.jpg',
          },
        },
      },
      {
        border: {
          borderStyle: CardProductBorderType.TOP_AND_BOTTOM_DASHED,
          color: '#BF713E',
        },
        rows: [
          {
            data: {
              width: 335,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'WELCOME',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'n1647zxb',
          },
          {
            data: {
              width: 335,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 14,
            },
            type: 'text',
            id: 'm1647zib',
          },
          {
            id: 'bbnioua',
            type: CardProductContentItemType.FRAME,
            data: {
              enableBorder: false,
              content: {
                fadeEdge: ICardProductFadeEdgeType.ROUNDED,
                lockAspectRatio: true,
                width: 316,
                frameAvailability: ICardProductFrameAvailability.ALL,
                id: '1e75g6il',
                type: 'rows',
                items: [
                  {
                    id: '394u4bn4',
                    borderRadius: '100rem',
                    type: 'content',
                    content: {
                      lockAspectRatio: true,
                      transformY: -169.5,
                      renderImageHeight: 337,
                      transformX: -262.96009244992297,
                      filename:
                        'QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      borderRadius: '200px',
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      renderImageWidth: 521.9201848998459,
                      type: 'image',
                      filestackHandle: '2z9EQUyT8SBGpheu9O4j',
                      imageType: 'PRIMARY_IMAGE',
                    } as ICardProductFrameImageContent,
                  },
                ],
                layoutId: 'card-product-frame-one-rounded',
                height: 333,
              },
              prevWidth: 395.432,
              width: 316,
              enableFadeImage: true,
              isFullWidth: false,
              height: 333,
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_LEFT_USA.jpg',
          },
        },
      },
      {
        border: {
          color: '#B9346F',
        },
        rows: [
          {
            data: {
              width: 335,
              margin: [-1, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'ABIDE WITH ME',
                    type: 'header-five',
                    key: 'dscg2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'up2c8o4t',
          },
          {
            data: {
              height: 10,
            },
            type: 'space',
            id: '83ipd8t8',
          },
          {
            id: '16afg0ut',
            type: CardProductContentItemType.FRAME,
            data: {
              height: 426,
              width: 395,
              content: {
                layoutId: 'card-product-frame-one-square',
                type: 'rows',
                items: [
                  {
                    id: '131vawtj',
                    type: 'content',
                    content: {
                      type: 'image',
                      filestackHandle: 'NyxVppSQuamRyMzplW9d',
                      transformX: -198.7109375,
                      transformY: -214,
                      renderImageHeight: 592.4185893691589,
                      renderImageWidth: 397.421875,
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/GQPQysM3SDi6t6eGqqWw_abstral-official-cyOKLSgkgCE-unsplash.jpg',
                      filename:
                        'GQPQysM3SDi6t6eGqqWw_abstral-official-cyOKLSgkgCE-unsplash.jpg',
                    },
                  },
                ],
                height: 426,
                width: 395,
                isAddAsRatio: true,
                fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
                id: '17r3rhbe',
              },
              isFullWidth: true,
              alignment: AlignmentType.CENTER,
              prevWidth: 210,
              enableFadeImage: true,
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_RIGHT_USA.jpg',
          },
        },
      },
      {
        border: {
          borderStyle: CardProductBorderType.DOUBLE_SOLID,
          color: '#BF713E',
        },
        rows: [
          {
            data: {
              height: 51,
            },
            type: 'space',
            id: 'og7rmfoh',
          },
          {
            data: {
              width: 335,
              content: {
                lockAspectRatio: false,
                width: 335,
                id: '2qn6ec01',
                type: 'columns',
                items: [
                  {
                    id: '89gwpaim',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -63.2421875,
                          renderImageHeight: 126.484375,
                          transformX: -88.37946076498422,
                          filepath:
                            'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-cropped.jpg',
                          renderImageWidth: 176.75892152996843,
                          type: 'image',
                          filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                        },
                        id: '4yai0tyr',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -93.46534653465346,
                          filename:
                            'SE6NcSuBQUew2Yd6mcHV_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                          renderImageHeight: 186.93069306930693,
                          transformX: -88.5,
                          filepath: 'primaryImages/9SX8tPefQIa8Exe65i0J.jpeg',
                          renderImageWidth: 177,
                          type: 'image',
                          filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                        },
                        id: 'frpf4d2s',
                      },
                    ],
                  },
                  {
                    type: 'content',
                    content: {
                      transformY: -132.33644859813086,
                      filename: 'd5HcPxbTYalvbLM1103B_11 Small.jpeg',
                      renderImageHeight: 264.6728971962617,
                      transformX: -88.5,
                      filepath: 'primaryImages/V9AcshtbTQq8mhHqlNdB.jpeg',
                      renderImageWidth: 177,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                    id: '4k6yotj3',
                  },
                ],
                layoutId: 'card-product-frame-one-square',
                height: 257,
              },
              height: 257,
            },
            type: CardProductContentItemType.FRAME,
            id: '7j8yn34d',
          },
          {
            data: {
              height: 140,
            },
            type: 'space',
            id: 't3hx3wi8',
          },
          {
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              width: 335,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'THANK YOU',
                    type: 'header-five',
                    key: '9ohrh',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'med4zr2y',
          },
          {
            data: {
              width: 335,
              margin: [5, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The family would like to thank you for your support',
                    type: 'paragraph-one',
                    key: '3mn3k',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'during this time of sadness. ',
                    type: 'paragraph-one',
                    key: 'ai1cf',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 28,
            },
            type: 'text',
            id: '7tjre50r',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_BACK_USA.jpg',
          },
        },
      },
    ],
  },
  updatedAt: '2022-12-15T09:37:49.305Z',
  status: MemorialVisualStatus.COMPLETE,
  createdAt: '2022-12-12T02:55:17.687Z',
  id: 'mock-booklet-id-1',
  case: MOCK_CASE_1.id,
  fileStatus: ResourceFileStatus.GENERATED,
}

export const MOCK_BOOKLET_WITH_BORDER: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.A5,
    theme: 'reflection',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
          color: 'black',
          thickness: CardProductBorderThicknessType.THIN,
        },
        rows: [
          {
            type: 'image',
            data: {
              width: 360,
              filepath:
                'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-masked.png',
              alignment: 'center',
              height: 360,
            },
            id: 'grandeur-front-img',
          },
        ],
      },
      {
        border: {
          borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
          color: 'black',
          thickness: CardProductBorderThicknessType.THIN,
        },
        rows: [
          {
            type: 'text',
            data: {
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Welcome',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'n1647zxb',
          },
        ],
      },
      {
        border: {
          borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
          color: 'black',
          thickness: CardProductBorderThicknessType.THIN,
        },
        rows: [
          {
            type: 'text',
            data: {
              width: 360,
              margin: [-1, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, Abide With Me',
                    type: 'header-five',
                    key: 'dscg2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'up2c8o4t',
          },
        ],
      },
      {
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
          color: 'black',
          thickness: CardProductBorderThicknessType.THIN,
        },
        rows: [
          {
            type: 'space',
            data: {
              height: 14,
            },
            id: 'og7rmfoh',
          },
        ],
      },
    ],
  },
  updatedAt: '2022-12-15T09:37:49.305Z',
  status: MemorialVisualStatus.COMPLETE,
  createdAt: '2022-12-12T02:55:17.687Z',
  id: 'mock-booklet-with-border-id-2',
  case: MOCK_CASE_1.id,
  fileStatus: ResourceFileStatus.GENERATED,
}

export const MOCK_BOOKLET_HALF_LETTER_1: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.HALF_LETTER_A5,
    theme: 'fall-flowers',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        border: {
          color: '#B9346F',
        },
        rows: [
          {
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
            id: 'fall-flowers-front-img',
            data: {
              prevAlignment: AlignmentType.CENTER,
              enableBorder: false,
              content: {
                fadeEdge: ICardProductFadeEdgeType.ROUNDED,
                lockAspectRatio: true,
                width: 205,
                frameAvailability: ICardProductFrameAvailability.CARD,
                id: '1e75g6il',
                type: 'rows',
                items: [
                  {
                    id: '394u4bn4',
                    borderRadius: '100rem',
                    type: 'content',
                    content: {
                      transformY: -169.5,
                      renderImageHeight: 337,
                      transformX: -262.96009244992297,
                      filename:
                        'QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      renderImageWidth: 521.9201848998459,
                      type: 'image',
                      filestackHandle: 'INtXnkWgTpWgXNVwFX1J',
                    },
                  },
                ],
                layoutId: 'card-product-frame-one-rounded',
                height: 216,
              },
              prevWidth: 395.432,
              width: 205,
              enableFadeImage: false,
              isFullWidth: false,
              height: 216,
            },
            type: CardProductContentItemType.FRAME,
          },
          {
            data: {
              height: 18,
            },
            type: 'space',
            id: 'hcnz5hjz',
          },
          {
            dynamicDataId: CardProductDynamicDataKey.serviceDateAtServiceTime,
            id: 'j28c2cdz',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
                font: 'Sora',
              },
              width: 335,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        length: 100000,
                        style: 'white',
                      },
                      {
                        offset: 0,
                        length: 100000,
                        style: 'dark-grey',
                      },
                    ],
                    text: '06/26/2025 at 5:05 pm',
                    type: 'header-six',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            type: 'text',
          },
          {
            id: 'ut2a91og',
            type: CardProductContentItemType.FRAME,
            data: {
              height: 210,
              width: 210,
              enableFadeImage: true,
              content: {
                layoutId: 'card-product-frame-one-square',
                type: 'rows',
                items: [
                  {
                    id: '1vlchk91',
                    type: 'content',
                    content: {
                      type: 'image',
                      filestackHandle: 'SRArRHO3TVOSn2fPkwwo',
                      transformX: -160.3698630136986,
                      transformY: -109,
                      renderImageHeight: 326,
                      renderImageWidth: 492,
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/MpurxomIStmqyxsmYPsF_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
                      filename:
                        'MpurxomIStmqyxsmYPsF_eberhard-grossgasteiger-NAIdtWsGmOk-unsplash.jpg',
                    },
                  },
                ],
                height: 210,
                width: 210,
                fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
                isAddAsRatio: true,
                id: 'tfu14d6c',
              },
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_FRONT_USA.jpg',
          },
        },
      },
      {
        border: {
          borderStyle: CardProductBorderType.TOP_AND_BOTTOM_DASHED,
          color: '#BF713E',
        },
        rows: [
          {
            data: {
              width: 335,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'WELCOME',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'n1647zxb',
          },
          {
            data: {
              width: 335,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 14,
            },
            type: 'text',
            id: 'm1647zib',
          },
          {
            id: 'bbnioua',
            type: CardProductContentItemType.FRAME,
            data: {
              enableBorder: false,
              content: {
                fadeEdge: ICardProductFadeEdgeType.ROUNDED,
                lockAspectRatio: true,
                width: 316,
                frameAvailability: ICardProductFrameAvailability.ALL,
                id: '1e75g6il',
                type: 'rows',
                items: [
                  {
                    id: '394u4bn4',
                    borderRadius: '100rem',
                    type: 'content',
                    content: {
                      lockAspectRatio: true,
                      transformY: -169.5,
                      renderImageHeight: 337,
                      transformX: -262.96009244992297,
                      filename:
                        'QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      borderRadius: '200px',
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/QVFM6d1SgCfmdf8OjIBg_avin-cp-h8pngKKUyYc-unsplash.jpeg',
                      renderImageWidth: 521.9201848998459,
                      type: 'image',
                      filestackHandle: '2z9EQUyT8SBGpheu9O4j',
                      imageType: 'PRIMARY_IMAGE',
                    } as ICardProductFrameImageContent,
                  },
                ],
                layoutId: 'card-product-frame-one-rounded',
                height: 333,
              },
              prevWidth: 395.432,
              width: 316,
              enableFadeImage: true,
              isFullWidth: false,
              height: 333,
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_LEFT_USA.jpg',
          },
        },
      },
      {
        border: {
          color: '#B9346F',
        },
        rows: [
          {
            data: {
              width: 335,
              margin: [-1, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'ABIDE WITH ME',
                    type: 'header-five',
                    key: 'dscg2',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'up2c8o4t',
          },
          {
            data: {
              height: 10,
            },
            type: 'space',
            id: '83ipd8t8',
          },
          {
            id: '16afg0ut',
            type: CardProductContentItemType.FRAME,
            data: {
              height: 426,
              width: 395,
              content: {
                layoutId: 'card-product-frame-one-square',
                type: 'rows',
                items: [
                  {
                    id: '131vawtj',
                    type: 'content',
                    content: {
                      type: 'image',
                      filestackHandle: 'NyxVppSQuamRyMzplW9d',
                      transformX: -198.7109375,
                      transformY: -214,
                      renderImageHeight: 592.4185893691589,
                      renderImageWidth: 397.421875,
                      filepath:
                        'cases/50dc2da2-e67c-40b1-bd6f-3a33b39dc639/gallery/GQPQysM3SDi6t6eGqqWw_abstral-official-cyOKLSgkgCE-unsplash.jpg',
                      filename:
                        'GQPQysM3SDi6t6eGqqWw_abstral-official-cyOKLSgkgCE-unsplash.jpg',
                    },
                  },
                ],
                height: 426,
                width: 395,
                isAddAsRatio: true,
                fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
                id: '17r3rhbe',
              },
              isFullWidth: true,
              alignment: AlignmentType.CENTER,
              prevWidth: 210,
              enableFadeImage: true,
            },
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_RIGHT_USA.jpg',
          },
        },
      },
      {
        border: {
          borderStyle: CardProductBorderType.DOUBLE_SOLID,
          color: '#BF713E',
        },
        rows: [
          {
            data: {
              height: 51,
            },
            type: 'space',
            id: 'og7rmfoh',
          },
          {
            data: {
              width: 335,
              content: {
                lockAspectRatio: false,
                width: 335,
                id: '2qn6ec01',
                type: 'columns',
                items: [
                  {
                    id: '89gwpaim',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -63.2421875,
                          renderImageHeight: 126.484375,
                          transformX: -88.37946076498422,
                          filepath:
                            'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-cropped.jpg',
                          renderImageWidth: 176.75892152996843,
                          type: 'image',
                          filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                        },
                        id: '4yai0tyr',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -93.46534653465346,
                          filename:
                            'SE6NcSuBQUew2Yd6mcHV_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                          renderImageHeight: 186.93069306930693,
                          transformX: -88.5,
                          filepath: 'primaryImages/9SX8tPefQIa8Exe65i0J.jpeg',
                          renderImageWidth: 177,
                          type: 'image',
                          filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                        },
                        id: 'frpf4d2s',
                      },
                    ],
                  },
                  {
                    type: 'content',
                    content: {
                      transformY: -132.33644859813086,
                      filename: 'd5HcPxbTYalvbLM1103B_11 Small.jpeg',
                      renderImageHeight: 264.6728971962617,
                      transformX: -88.5,
                      filepath: 'primaryImages/V9AcshtbTQq8mhHqlNdB.jpeg',
                      renderImageWidth: 177,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                    id: '4k6yotj3',
                  },
                ],
                layoutId: 'card-product-frame-one-square',
                height: 257,
              },
              height: 257,
            },
            type: CardProductContentItemType.FRAME,
            id: '7j8yn34d',
          },
          {
            data: {
              height: 140,
            },
            type: 'space',
            id: 't3hx3wi8',
          },
          {
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
                font: 'Neuton',
              },
              width: 335,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'THANK YOU',
                    type: 'header-five',
                    key: '9ohrh',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            type: 'text',
            id: 'med4zr2y',
          },
          {
            data: {
              width: 335,
              margin: [5, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The family would like to thank you for your support',
                    type: 'paragraph-one',
                    key: '3mn3k',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'during this time of sadness. ',
                    type: 'paragraph-one',
                    key: 'ai1cf',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 28,
            },
            type: 'text',
            id: '7tjre50r',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_BACK_USA.jpg',
          },
        },
      },
    ],
  },
  updatedAt: '2022-12-15T09:37:49.305Z',
  status: MemorialVisualStatus.COMPLETE,
  createdAt: '2022-12-12T02:55:17.687Z',
  id: 'mock-booklet-id-1',
  case: MOCK_CASE_1.id,
  fileStatus: ResourceFileStatus.GENERATED,
}

export const MOCK_BOOKLET_A5_WITH_OVERLAY: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: 'A5',
    theme: 'pink-pastel',
    pageOrientation: 'portrait',
    pages: [
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 40,
                font: 'Parisienne',
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'black',
                      },
                    ],
                    text: 'Celebrating',
                    type: 'header-one',
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 56,
            },
            id: 'eua58pfe',
          },
          {
            type: 'space',
            data: {
              height: 12,
            },
            id: '02ecas19',
          },
          {
            dynamicDataId: 'primaryImage',
            id: 'pink-pastel-front-img',
            type: 'frame',
            data: {
              enableBorder: false,
              width: 360,
              content: {
                width: 360,
                lockAspectRatio: false,
                id: 'w58ut2pi',
                type: 'rows',
                items: [
                  {
                    id: 'lsx8vp0i',
                    borderRadius: '0px',
                    type: 'content',
                    content: {
                      type: 'image',
                      filepath: 'primaryImages/oBUWpzpzSMO1o9H5dfrL.jpeg',
                      imageType: 'DEFAULT_THEME_IMAGE',
                    },
                  },
                ],
                height: 187,
              },
              isFullWidth: false,
              height: 187,
            },
          },
          {
            type: 'space',
            data: {
              divider: {
                asset: {
                  name: 'Divider 20',
                  filepath: null,
                  id: null,
                },
              },
              height: 14,
            },
            id: 'gnlqdbcy',
          },
          {
            dynamicDataId: 'deceasedName',
            id: '02jx20xq',
            type: 'text',
            data: {
              margin: [0, -0.4724999999999966],
              rowStyle: {
                fontSize: 40,
                font: 'Parisienne',
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Deceased',
                    type: 'unstyled',
                    key: '9djqs',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 56,
            },
          },
          {
            dynamicDataId: 'dobToDod',
            id: 'divbb4ya',
            type: 'text',
            data: {
              margin: [0, -0.4724999999999966],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '20/03/1954 - 25/01/2023',
                    type: 'unstyled',
                    key: 'dnbir',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
          },
          {
            type: 'space',
            data: {
              divider: {
                asset: {
                  name: 'Divider 11',
                  filepath: 'booklet/dividers/divider-11.png',
                  id: 11,
                },
                width: 354,
                height: 37,
              },
              height: 98,
            },
            id: 'swtnngzd',
          },
          {
            dynamicDataId: 'location',
            id: 'zvms2zx1',
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Eastern Suburbs Memorial Park West Chapel',
                    type: 'header-five',
                    key: '7zk71',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
          },
          {
            dynamicDataId: 'serviceDateAtServiceTime',
            id: 'jad2c2xz',
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '06/05/2024 at 5:05 pm',
                    type: 'header-five',
                    key: '34s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
          },
        ],
        border: {
          borderStyle: 'SINGLE_SOLID',
          color: '#B9346F',
          thickness: 'MEDIUM',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKLET_FRONT.jpg',
          },
          overlayColor: '#ffffff',
          overlayMargin: [11, 8],
          overlayOpacity: 0.85,
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [15, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'ITALIC',
                      },
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Always in our hearts',
                    type: 'header-four',
                    key: 'ft13d',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'uz3c5q0m',
          },
          {
            type: 'frame',
            data: {
              width: 330,
              content: {
                width: 330,
                id: 'bstiffc9',
                type: 'rows',
                items: [
                  {
                    type: 'columns',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -114.5,
                          renderImageWidth: 170,
                          transformX: -85,
                          renderImageHeight: 232,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/jordan-bauer-274427-unsplash-linen-1.jpg',
                        },
                        id: 'i0gmujhz',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -114.5,
                          renderImageWidth: 170,
                          transformX: -85,
                          renderImageHeight: 233,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/jordan-bauer-274427-unsplash-linen-2.jpg',
                        },
                        id: 'ez29gemd',
                      },
                    ],
                    id: 'suy8htee',
                  },
                  {
                    type: 'content',
                    content: {
                      transformY: -117.5,
                      renderImageWidth: 398,
                      transformX: -207.5,
                      renderImageHeight: 234,
                      type: 'image',
                      filepath:
                        'booklet/themes/example-images/jordan-bauer-274427-unsplash-linen.jpg',
                    },
                    id: 'ubo4tanw',
                  },
                ],
                height: 250,
              },
              height: 250,
            },
            id: '7fpzbhoz',
          },
          {
            type: 'frame',
            data: {
              width: 325,
              content: {
                width: 333,
                lockAspectRatio: false,
                id: 'aqjw86gw',
                type: 'columns',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -105.5,
                      filename:
                        '5v8LylKfQeOq7x4Q7Hfz_polox-hernandez-itGcCnMWPpQ-unsplash Small.jpeg',
                      transformX: -106.66666666666666,
                      renderImageHeight: 211,
                      filepath: 'primaryImages/jyowJiOgRoCqIuqkQo1N.jpeg',
                      renderImageWidth: 281.3333333333333,
                      type: 'image',
                    },
                    id: '2i47kh6i',
                  },
                  {
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -54.9140625,
                          filename:
                            'VJSUI2lXSnGBZ3wYBFCM_rawpixel-1147214-unsplash Small.jpeg',
                          transformX: -82.5,
                          renderImageHeight: 109.828125,
                          filepath: 'primaryImages/l2OC50mQOaQz24CxCkMO.jpeg',
                          renderImageWidth: 165,
                          type: 'image',
                        },
                        id: '881mgam6',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -52.078125,
                          filename: 'EzJ3VtKwSM6scqwQWGnc_2 Small.jpeg',
                          transformX: -82.5,
                          renderImageHeight: 104.15625,
                          filepath: 'primaryImages/oBUWpzpzSMO1o9H5dfrL.jpeg',
                          renderImageWidth: 165,
                          type: 'image',
                        },
                        id: 'e8hqzj5n',
                      },
                    ],
                    id: 'vf60cx93',
                  },
                ],
                height: 210,
              },
              height: 210,
            },
            id: '574stfp4',
          },
        ],
        border: {
          borderStyle: 'SINGLE_SOLID',
          color: '#B9346F',
          thickness: 'MEDIUM',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKLET_LEFT.jpg',
          },
          overlayMargin: [11, 8],
          overlayColor: '#ffffff',
          overlayOpacity: 0.85,
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Welcome',
                    type: 'header-four',
                    key: '9mo911',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'g3ybn9tn',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: 'edufq',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: '7awhb9n9',
          },
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'qib8cour',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Hymn, Tears In Heaven',
                    type: 'header-four',
                    key: '72v2h',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'h11koudn',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '2pm4e',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'qgxlc9rn',
          },
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'kqsjcbmj',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Poem, Poem Name',
                    type: 'header-four',
                    key: '3so3u',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'ds6bp5b8',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'John Goodperson',
                    type: 'paragraph-one',
                    key: 'f30t',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'nuyje8jh',
          },
          {
            type: 'space',
            data: {
              height: 21,
            },
            id: 'qc9kn8mt',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'First Tribute',
                    type: 'header-four',
                    key: 'cs1ua',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: '9cnyme64',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Georgie Goodperson',
                    type: 'paragraph-one',
                    key: '6q58c',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'g6bofg56',
          },
          {
            type: 'space',
            data: {
              height: 22,
            },
            id: '1bhgpb30',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Second Tribute',
                    type: 'header-four',
                    key: 'e0oec',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'rgyoxui9',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Lucinda Goodperson',
                    type: 'paragraph-one',
                    key: '4j62j',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'nskvhs1o',
          },
          {
            type: 'space',
            data: {
              height: 22,
            },
            id: '9j86kcn8',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Address',
                    type: 'header-four',
                    key: 'bqtk4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: '7ym29wbi',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '61f17',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: '1z8ayrz8',
          },
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'ee6jhyom',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Hymn, When September Ends',
                    type: 'header-four',
                    key: 'eao43',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'sl4tu191',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '75fu3',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'p8q9bt2l',
          },
          {
            type: 'space',
            data: {
              height: 19,
            },
            id: 'gfjaj3ck',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Words of Farewell',
                    type: 'header-four',
                    key: 'vfr6',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'englrqf6',
          },
        ],
        border: {
          borderStyle: 'SINGLE_SOLID',
          color: '#B9346F',
          thickness: 'MEDIUM',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKLET_RIGHT.jpg',
          },
          overlayMargin: [11, 8],
          overlayColor: '#ffffff',
          overlayOpacity: 0.85,
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 29,
            },
            id: 'drzbhqqy',
          },
          {
            type: 'frame',
            data: {
              width: 186,
              content: {
                width: 186,
                lockAspectRatio: false,
                id: 'gbzsl67a',
                type: 'rows',
                items: [
                  {
                    id: 'u0faa7co',
                    type: 'content',
                    content: {
                      transformY: -125.5,
                      filename: 'qQhm3FqsRwS1z97xnX7T_89hTqUUzRDSKeCjpnAs2',
                      transformX: -97,
                      renderImageHeight: 256.24598930481284,
                      filepath: 'primaryImages/eZEFefPxRouqHThhcxyN.jpeg',
                      renderImageWidth: 194,
                      type: 'image',
                    },
                  },
                ],
                height: 243,
              },
              height: 243,
            },
            id: '8syir7bg',
          },
          {
            type: 'space',
            data: {
              height: 17,
            },
            id: 'ndpi1z2l',
          },
          {
            type: 'text',
            data: {
              margin: [6, 0],
              rowStyle: {
                fontSize: 16,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'magenta',
                      },
                    ],
                    text: 'Thank you for joining us',
                    type: 'header-four',
                    key: '8i0g',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'muzwt5um',
          },
          {
            type: 'space',
            data: {
              divider: {
                asset: {
                  name: 'Divider 11',
                  filepath: 'booklet/dividers/divider-11.png',
                  id: 11,
                },
                width: 360,
                height: 37,
              },
              height: 62,
            },
            id: '7tlvcnps',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                fontSize: 12,
              },
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The family would like to thank you for your support',
                    type: 'header-six',
                    key: 'a24o2',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'during this time of sadness. ',
                    type: 'header-six',
                    key: 'adg8a',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'header-six',
                    key: '9vm27',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Please join us at the Pacific Room, Intercontinental',
                    type: 'header-six',
                    key: 'evlmd',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hotel for refreshments',
                    type: 'header-six',
                    key: 'dmvmu',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 84,
            },
            id: 'zaap2qqn',
          },
        ],
        border: {
          borderStyle: 'SINGLE_SOLID',
          color: '#B9346F',
          thickness: 'MEDIUM',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKLET_RIGHT.jpg',
          },
          overlayColor: '#ffffff',
          overlayMargin: [11, 8],
          overlayOpacity: 0.85,
        },
      },
    ],
  },
  generateUserId: '487874ce-84d4-4d02-8f3d-20a8e9da0ffd',
  updatedAt: '2024-05-06T22:24:24.648Z',
  status: 'edited',
  createdAt: '2024-05-06T00:37:12.464Z',
  id: 'e9e47df5-2d79-4a11-ad20-de7c20c1096b',
  case: '6638acbe-727c-4726-8eca-7a241930a49f',
  fileStatus: 'not_started',
} as unknown as ICardProductData

export const MOCK_BOOKLETS: Array<ICardProductData> = [MOCK_BOOKLET_1]

// Mock Booklet Find response
export const MOCK_BOOKLET_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_BOOKLETS,
  count: MOCK_BOOKLETS.length,
  ref: '48f35d0f9f8ce',
}

export const MOCK_BOOKLET_FIND_RESPONSE_NO_BOOKLET_SELECTED: IFindResponse = {
  items: [],
  count: 0,
  ref: '48f35d0f9f8ce',
}

export const MOCK_BOOKLET_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.BOOKLET,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_BOOKLET_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_BOOKLET_FIND_REQUEST_BODY_1 },
  response: MOCK_BOOKLET_FIND_RESPONSE_1,
}

export const MOCK_BOOKLET_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_BOOKLET_FIND_REQUEST_BODY_1 },
  response: MOCK_BOOKLET_FIND_RESPONSE_NO_BOOKLET_SELECTED,
}

export const MOCK_BOOKLET_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_3.webtoken,
  request: { body: MOCK_BOOKLET_FIND_REQUEST_BODY_1 },
  response: MOCK_BOOKLET_FIND_RESPONSE_NO_BOOKLET_SELECTED,
}

export const MOCK_BOOKLET_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [
    MOCK_BOOKLET_FIND_REQUEST_RESPONSE_1,
    MOCK_BOOKLET_FIND_REQUEST_RESPONSE_2,
    MOCK_BOOKLET_FIND_REQUEST_RESPONSE_3,
  ]
