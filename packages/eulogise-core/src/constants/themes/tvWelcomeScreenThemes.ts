import {
  auraTvWelcomeScreenImage,
  classicTvWelcomeScreenImage,
  fallFlowersTvWelcomeScreenImage,
  fullWidthTvWelcomeScreenImage,
  goldRosesTvWelcomeScreenImage,
  graceTvWelcomeScreenImage,
  grandeurTvWelcomeScreenImage,
  linenTvWelcomeScreenImage,
  minimalArchTvWelcomeScreenImage,
  minimalCollageTvWelcomeScreenImage,
  modernMinimalTvWelcomeScreenImage,
  pastelBlueRosesTvWelcomeScreenImage,
  pinkPastelTvWelcomeScreenImage,
  reflectionTvWelcomeScreenImage,
  watercolorSailingTvWelcomeScreenImage,
} from './thumbnailImages'
import {
  AlignmentType,
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  ICardProductFadeEdgeType,
  ICardProductTheme,
} from '../../types'
import { attachGraphicBorder } from './bookletThemeUtils'

export const TV_WELCOME_SCREEN_THEMES: Array<ICardProductTheme> =
  attachGraphicBorder([
    {
      id: 'aura',
      name: 'Aura',
      thumbnail: {
        images: [auraTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Lora',
        fontSize: 14,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Alegreya',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Alegreya',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Allura',
          fontSize: 32,
        },
        'header-two': {
          font: 'Allura',
          fontSize: 28,
        },
        'header-three': {
          font: 'Allura',
          fontSize: 24,
        },
        'header-four': {
          font: 'Allura',
          fontSize: 20,
        },
        'header-five': {
          font: 'Alegreya',
          fontSize: 16,
        },
        'header-six': {
          font: 'Alegreya',
          fontSize: 14,
        },
        'paragraph-one': {
          font: 'Alegreya',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Alegreya',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 83,
              },
              id: 'hsdf56ck',
            },
            {
              type: 'text',
              data: {
                style: 'unstyled',
                margin: [5, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      key: '8hiqu',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                width: 290,
                height: 62,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: '7f1sm3s9',
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
                height: 86,
              },
              id: '5pwpmecn',
            },
            {
              type: 'text',
              data: {
                margin: [7, 0],
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'fs9iq',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'yy587qvy',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Floral/AU/Floral_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
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
                height: 21,
              },
              id: 'p755a33a',
            },
            {
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'p91047ci',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Floral/AU/Floral_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'grandeur',
      name: 'Grandeur',
      thumbnail: {
        images: [grandeurTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Lora',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Comfortaa',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Comfortaa',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Comfortaa',
          fontSize: 32,
        },
        'header-two': {
          font: 'Comfortaa',
          fontSize: 28,
        },
        'header-three': {
          font: 'Comfortaa',
          fontSize: 24,
        },
        'header-four': {
          font: 'Comfortaa',
          fontSize: 20,
        },
        'header-five': {
          font: 'Comfortaa',
          fontSize: 16,
        },
        'header-six': {
          font: 'Comfortaa',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Comfortaa',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          fontSize: 8,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          background: {
            image: {
              filepath:
                'backgroundImages/Beach/AU/Beach_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
          rows: [
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
                height: 25,
              },
              id: 'abspjidc',
            },
            {
              id: '3v98derv',
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
        },
        {
          background: {
            image: {
              filepath:
                'backgroundImages/Beach/AU/Beach_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
          rows: [
            {
              id: '5vwn60q7',
              type: 'space',
              data: {
                height: 64,
                divider: {
                  asset: {
                    id: null,
                    name: 'Divider 20',
                    filepath: null,
                  },
                },
              },
            },
            {
              id: 'zqdoy9sx',
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'dbpr0',
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'black',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [17, 0],
                height: 90,
                width: 290,
                alignment: 'center',
              },
            },
            {
              id: '0ut2mmba',
              type: 'space',
              data: {
                height: 52,
                divider: {
                  asset: {
                    id: null,
                    name: 'Divider 20',
                    filepath: null,
                  },
                },
              },
            },
            {
              id: 'cmisqvjf',
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'cdnn1',
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [5, 0],
                height: 17,
                width: 290,
                alignment: 'center',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'linen',
      name: 'Linen',
      thumbnail: {
        images: [linenTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'EB Garamond',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Cormorant',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'EB Garamond',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Cormorant',
          fontSize: 32,
        },
        'header-two': {
          font: 'Cormorant',
          fontSize: 24,
        },
        'header-three': {
          font: 'Cormorant',
          fontSize: 16,
        },
        'header-four': {
          font: 'Cormorant',
          fontSize: 16,
        },
        'header-five': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'header-six': {
          font: 'EB Garamond',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'EB Garamond',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'EB Garamond',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
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
                height: 27,
              },
              id: 'p755a33a',
            },
            {
              id: 'p91047ci',
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Linen/AU/Linen_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 34,
              },
              id: '0mfdlg1z',
            },
            {
              id: 'pompvyae',
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                content: {
                  blocks: [
                    {
                      key: '9uv5r',
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [33, 0],
                height: 90,
                width: 290,
                alignment: 'center',
              },
            },
            {
              id: '6vzmrcrb',
              type: 'space',
              data: {
                height: 54,
                divider: {
                  asset: {
                    id: null,
                    name: 'Divider 20',
                    filepath: null,
                  },
                },
              },
            },
            {
              id: 'ljffml3s',
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                content: {
                  blocks: [
                    {
                      key: '6hddr',
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-five',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [7.5, 0],
                height: 22,
                width: 290,
                alignment: 'center',
              },
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Linen/AU/Linen_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'reflection',
      name: 'Reflection',
      thumbnail: {
        images: [reflectionTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Montserrat',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Montserrat',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Raleway',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Raleway',
          fontSize: 32,
        },
        'header-two': {
          font: 'Raleway',
          fontSize: 24,
        },
        'header-three': {
          font: 'Raleway',
          fontSize: 20,
        },
        'header-four': {
          font: 'Montserrat',
          fontSize: 20,
        },
        'header-five': {
          font: 'Raleway',
          fontSize: 18,
        },
        'header-six': {
          font: 'Montserrat',
          fontSize: 16,
        },
        'paragraph-one': {
          font: 'Raleway',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Raleway',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: 'space',
              data: {
                height: 60,
              },
              id: '0m9h6b1z',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                margin: [30.5, 0],
                rowStyle: {
                  fontSize: 32,
                  font: 'Raleway',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      key: 'atdpj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 90,
              },
              id: 'f5eztcev',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                margin: [5, 0],
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'paragraph-one',
                      key: 'a3ak1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              id: 'p5j65hnd',
            },
          ],
        },
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
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
                height: 17,
              },
              id: 'y1mdzm3c',
            },
            {
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'n1uon558',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
        },
      ],
    },
    {
      id: 'grace',
      name: 'Grace',
      thumbnail: {
        images: [graceTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Merriweather',
        fontSize: 10,
      },
      themeDefaultImageFilter: 'inkwell',
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Merriweather',
          fontSize: 16,
          color: '#c59acd',
        },
        'default-paragraph': {
          font: 'Merriweather',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Pinyon Script',
          fontSize: 32,
          color: '#c59acd',
        },
        'header-two': {
          font: 'Pinyon Script',
          fontSize: 28,
          color: '#c59acd',
        },
        'header-three': {
          font: 'Pinyon Script',
          fontSize: 24,
          color: '#c59acd',
        },
        'header-four': {
          font: 'Pinyon Script',
          fontSize: 22,
          color: '#c59acd',
        },
        'header-five': {
          font: 'Pinyon Script',
          fontSize: 16,
          color: '#c59acd',
        },
        'header-six': {
          font: 'Merriweather',
          fontSize: 16,
          color: '#c59acd',
        },
        'paragraph-one': {
          font: 'Merriweather',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Merriweather',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
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
                height: 24,
              },
              id: 'y1mdzm3c',
            },
            {
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'n1uon558',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
        },
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: 'space',
              data: {
                height: 40,
              },
              id: '0m9h6b1z',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                margin: [20, 0],
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      key: 'atdpj',
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'lavender',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                height: 123,
              },
              id: 'f5eztcev',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                width: 290,
                style: 'unstyled',
                margin: [10, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      key: 'a3ak1',
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                height: 22,
              },
              id: 'p5j65hnd',
            },
          ],
        },
      ],
    },
    {
      id: 'classic',
      name: 'Classic',
      thumbnail: {
        images: [classicTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Playfair Display',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Dancing Script',
          fontSize: 22,
        },
        'default-paragraph': {
          font: 'Playfair Display',
          fontSize: 10,
        },
        'header-one': {
          font: 'Dancing Script',
          fontSize: 32,
        },
        'header-two': {
          font: 'Dancing Script',
          fontSize: 22,
        },
        'header-three': {
          font: 'Dancing Script',
          fontSize: 18,
        },
        'header-four': {
          font: 'Dancing Script',
          fontSize: 14,
        },
        'header-five': {
          font: 'Playfair Display',
          fontSize: 14,
        },
        'header-six': {
          font: 'Playfair Display',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Playfair Display',
          fontSize: 10,
        },
        'paragraph-two': {
          font: 'Playfair Display',
          fontSize: 9,
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 17,
              },
              id: 'sfsfdlp4',
            },
            {
              type: CardProductContentItemType.FRAME,
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'oyrj3a06',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Paper/AU/Paper_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 77,
              },
              id: '02ahlg1z',
            },
            {
              type: 'text',
              data: {
                margin: [9.5, 0],
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'In Loving Memory of',
                      type: 'header-six',
                      key: '8td44',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: '135o37zt',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                margin: [15, 0],
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: '{{{deceasedNameFontType}}}',
                      key: '6oif0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 55,
              },
              id: 'jv2wkuvs',
            },
            {
              type: 'space',
              data: {
                divider: {
                  asset: {
                    name: 'Divider 15',
                    filepath: 'booklet/dividers/divider-15.png',
                    id: 15,
                  },
                  width: 284,
                  height: 29,
                },
                height: 44,
              },
              id: 'us06fwy3',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                width: 290,
                style: 'unstyled',
                margin: [5, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      key: 'aok85',
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'lwvx03p2',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Paper/AU/Paper_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'gold-roses',
      name: 'Gold Roses',
      thumbnail: {
        images: [goldRosesTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Raleway',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Raleway',
          fontSize: 22,
        },
        'default-paragraph': {
          font: 'Raleway',
          fontSize: 10,
        },
        'header-one': {
          font: 'Raleway',
          fontSize: 32,
        },
        'header-two': {
          font: 'Raleway',
          fontSize: 22,
        },
        'header-three': {
          font: 'Raleway',
          fontSize: 18,
        },
        'header-four': {
          font: 'Raleway',
          fontSize: 14,
        },
        'header-five': {
          font: 'Raleway',
          fontSize: 14,
        },
        'header-six': {
          font: 'Raleway',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Raleway',
          fontSize: 10,
        },
        'paragraph-two': {
          font: 'Raleway',
          fontSize: 9,
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 41,
              },
              id: 'sfsfdlp4',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'gold-roses-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Gold_Roses/AU/Gold_Roses_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 34,
              },
              id: '02ahlg1z',
            },
            {
              type: 'text',
              data: {
                margin: [9.5, 0],
                rowStyle: {
                  fontSize: 34,
                  font: 'Monsieur La Doulaise',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'In Loving Memory ',
                      type: 'header-six',
                      key: '8td44',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 48,
              },
              id: '135o37zt',
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
                height: 10,
              },
              id: 'gbp38z7z',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                margin: [15, 0],
                rowStyle: {
                  font: 'Raleway',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: '6oif0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              id: 'jv2wkuvs',
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
                  width: 284,
                  height: 29,
                },
                height: 54,
              },
              id: 'us06fwy3',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Raleway',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'aok85',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'lwvx03p2',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Gold_Roses/AU/Gold_Roses_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'watercolor-sailing',
      name: 'Watercolor Sailing',
      thumbnail: {
        images: [watercolorSailingTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Cormorant',
        fontSize: 12,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Cormorant',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Cormorant',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Cormorant',
          fontSize: 32,
        },
        'header-two': {
          font: 'Cormorant',
          fontSize: 28,
        },
        'header-three': {
          font: 'Cormorant',
          fontSize: 24,
        },
        'header-four': {
          font: 'Cormorant',
          fontSize: 20,
        },
        'header-five': {
          font: 'Cormorant',
          fontSize: 16,
        },
        'header-six': {
          font: 'Cormorant',
          fontSize: 14,
        },
        'paragraph-one': {
          font: 'Cormorant',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Cormorant',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 13,
              },
              id: 'sfsfdlp4',
            },
            {
              type: 'text',
              data: {
                margin: [9.5, 0],
                rowStyle: {
                  fontSize: 28,
                  font: 'Parisienne',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'In Loving Memory',
                      type: 'header-six',
                      key: '8td44',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 39,
              },
              id: '135o37zt',
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
                height: 124,
              },
              id: 'b6ncosxm',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                margin: [11.5, 0],
                rowStyle: {
                  fontSize: 28,
                  font: 'BioRhyme',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: '6oif0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 39,
              },
              id: 'jv2wkuvs',
            },
            {
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Old Standard TT',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'aok85',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              id: 'lwvx03p2',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 45,
              },
              id: '02ahlg1z',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'watercolor-sailing-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'pastel-blue-roses',
      name: 'Pastel Blue Roses',
      thumbnail: {
        images: [pastelBlueRosesTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Old Standard TT',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Old Standard TT',
          fontSize: 22,
        },
        'default-paragraph': {
          font: 'Old Standard TT',
          fontSize: 10,
        },
        'header-one': {
          font: 'Old Standard TT',
          fontSize: 32,
        },
        'header-two': {
          font: 'Old Standard TT',
          fontSize: 22,
        },
        'header-three': {
          font: 'Old Standard TT',
          fontSize: 18,
        },
        'header-four': {
          font: 'Old Standard TT',
          fontSize: 14,
        },
        'header-five': {
          font: 'Old Standard TT',
          fontSize: 14,
        },
        'header-six': {
          font: 'Old Standard TT',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Old Standard TT',
          fontSize: 10,
        },
        'paragraph-two': {
          font: 'Old Standard TT',
          fontSize: 9,
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 34,
              },
              id: 'sfsfdlp4',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'pastel-blue-roses-front-image',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 30,
              },
              id: '02ahlg1z',
            },
            {
              type: 'space',
              data: {
                divider: {
                  asset: {
                    name: 'Divider 14',
                    filepath: 'booklet/dividers/divider-14.png',
                    id: 14,
                  },
                  width: 285,
                  height: 29,
                },
                height: 55,
              },
              id: 'cam450x0',
            },
            {
              type: 'text',
              data: {
                margin: [9.5, 0],
                rowStyle: {
                  fontSize: 14,
                  font: 'Old Standard TT',
                },
                width: 290,
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
                          style: 'mavy',
                        },
                      ],
                      text: 'In Loving Memory of',
                      type: 'header-six',
                      key: '8td44',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              id: '135o37zt',
            },
            {
              type: 'text',
              data: {
                margin: [15, 0],
                rowStyle: {
                  fontSize: 38,
                  font: 'Ballet',
                },
                width: 290,
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
                          style: 'lavender',
                        },
                      ],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: '6oif0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 53,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'jv2wkuvs',
            },
            {
              type: 'space',
              data: {
                divider: {
                  asset: {
                    name: 'Divider 15',
                    filepath: 'booklet/dividers/divider-15.png',
                    id: 15,
                  },
                  width: 284,
                  height: 29,
                },
                height: 39,
              },
              id: 'us06fwy3',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 14,
                  font: 'Old Standard TT',
                },
                width: 290,
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
                          style: 'mavy',
                        },
                      ],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'aok85',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'lwvx03p2',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'pink-pastel',
      name: 'Pink Pastel',
      thumbnail: {
        images: [pinkPastelTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'EB Garamond',
        fontSize: 12,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'EB Garamond',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'EB Garamond',
          fontSize: 32,
        },
        'header-two': {
          font: 'EB Garamond',
          fontSize: 24,
        },
        'header-three': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'header-four': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'header-five': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'header-six': {
          font: 'EB Garamond',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'EB Garamond',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'EB Garamond',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
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
                height: 58,
              },
              id: 'p755a33a',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'pink-pastel-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
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
                  width: 284,
                  height: 29,
                },
                height: 68,
              },
              id: 'w7f5tc28',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            color: '#B9346F',
            thickness: CardProductBorderThicknessType.THICK,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Pastel_Pink/AU/Pastel_Pink_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 40,
                  font: 'Dancing Script',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Celebrating ',
                      type: 'unstyled',
                      key: 'uo9m',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 56,
              },
              id: 'mfy0ctc5',
            },
            {
              type: 'space',
              data: {
                height: 34,
              },
              id: '0mfdlg1z',
            },
            {
              type: 'text',
              data: {
                width: 290,
                style: 'unstyled',
                margin: [-18.5, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: '9uv5r',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'pompvyae',
            },
            {
              type: 'text',
              data: {
                width: 290,
                style: 'unstyled',
                margin: [25, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-five',
                      key: '6hddr',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 22,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'ljffml3s',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            color: '#B9346F',
            thickness: CardProductBorderThicknessType.THICK,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Pastel_Pink/AU/Pastel_Pink_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'fall-flowers',
      name: 'Fall Flowers',
      thumbnail: {
        images: [fallFlowersTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Lora',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Comfortaa',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Comfortaa',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Comfortaa',
          fontSize: 32,
        },
        'header-two': {
          font: 'Comfortaa',
          fontSize: 28,
        },
        'header-three': {
          font: 'Comfortaa',
          fontSize: 24,
        },
        'header-four': {
          font: 'Comfortaa',
          fontSize: 20,
        },
        'header-five': {
          font: 'Comfortaa',
          fontSize: 16,
        },
        'header-six': {
          font: 'Comfortaa',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Comfortaa',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          fontSize: 8,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          border: {
            color: '#BF713E',
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: 'space',
              data: {
                height: 60,
              },
              id: '0m9h6b1z',
            },
            {
              type: 'text',
              data: {
                margin: [30.5, 0],
                rowStyle: {
                  fontSize: 34,
                  font: 'Neuton',
                },
                width: 290,
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
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: 'atdpj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 48,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'f5eztcev',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Neuton',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'paragraph-one',
                      key: 'a3ak1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'p5j65hnd',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Fall_Flowers/AU/Fall_Flowers_TV_WELCOME_SCREEN_LEFT.jpg',
            },
          },
        },
        {
          border: {
            color: '#BF713E',
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
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
                height: 41,
              },
              id: 'cgkejecj',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'fall-flowers-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Fall_Flowers/AU/Fall_Flowers_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
          },
        },
      ],
    },
    {
      id: 'minimal-arch',
      name: 'Minimal Arch',
      thumbnail: {
        images: [minimalArchTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Montserrat',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Montserrat',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Raleway',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Raleway',
          fontSize: 32,
        },
        'header-two': {
          font: 'Raleway',
          fontSize: 24,
        },
        'header-three': {
          font: 'Raleway',
          fontSize: 20,
        },
        'header-four': {
          font: 'Montserrat',
          fontSize: 20,
        },
        'header-five': {
          font: 'Raleway',
          fontSize: 18,
        },
        'header-six': {
          font: 'Montserrat',
          fontSize: 16,
        },
        'paragraph-one': {
          font: 'Raleway',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Raleway',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
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
                height: 30,
              },
              id: 'abspjidc',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'minimal-arch-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          border: {
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
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
                height: 64,
              },
              id: '5vwn60q7',
            },
            {
              type: 'text',
              data: {
                margin: [17, 0],
                rowStyle: {
                  fontSize: 34,
                  font: 'Cormorant',
                },
                width: 290,
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
                      text: '{{{deceasedName}}}',
                      type: 'header-three',
                      key: 'dbpr0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 95,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'zqdoy9sx',
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
                height: 52,
              },
              id: '0ut2mmba',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 16,
                  font: 'Alegreya',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'cdnn1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 22,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'cmisqvjf',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'minimal-collage',
      name: 'Minimal Collage',
      thumbnail: {
        images: [minimalCollageTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Playfair Display',
        fontSize: 10,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Playfair Display',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Playfair Display',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Playfair Display',
          fontSize: 32,
        },
        'header-two': {
          font: 'Playfair Display',
          fontSize: 24,
        },
        'header-three': {
          font: 'Playfair Display',
          fontSize: 20,
        },
        'header-four': {
          font: 'Playfair Display',
          fontSize: 20,
        },
        'header-five': {
          font: 'Playfair Display',
          fontSize: 18,
        },
        'header-six': {
          font: 'Playfair Display',
          fontSize: 16,
        },
        'paragraph-one': {
          font: 'Playfair Display',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Playfair Display',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: 'space',
              data: {
                height: 51,
              },
              id: '0m9h6b1z',
            },
            {
              type: 'text',
              data: {
                margin: [30.5, 0],
                rowStyle: {
                  fontSize: 38,
                  font: 'Playfair Display',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'header-two',
                      key: 'atdpj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 106,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'f5eztcev',
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
                height: 26,
              },
              id: 'ext7nigh',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 16,
                  font: 'Playfair Display',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'paragraph-one',
                      key: 'a3ak1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 22,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'p5j65hnd',
            },
          ],
        },
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: CardProductContentItemType.FRAME,
              data: {
                width: 291,
                // originalFrameSize: 210,
                content: {
                  width: 291,
                  id: 'wl9y41p9',
                  type: 'columns',
                  items: [
                    {
                      type: 'rows',
                      items: [
                        {
                          id: 'e23h7gkq',
                          type: 'content',
                          content: {
                            transformY: -108.16901408450704,
                            filename: 'Zxu7XeJ9RHK8yamueUbR_7 Small.jpeg',
                            transformX: -72,
                            renderImageHeight: 216.33802816901408,
                            renderImageWidth: 144,
                            type: 'image',
                            filepath: 'primaryImages/Q4Cze6h1QXSHnJeSLXLu.jpeg',
                          },
                        },
                        {
                          id: 'ii77n79l',
                          type: 'content',
                          content: {
                            transformY: -108.16901408450704,
                            filename:
                              'rAXpKsKxRqKgJXNXwjZq_rafael-leao-NRnPv3Gs-Nc-unsplash Small.jpeg',
                            transformX: -72,
                            renderImageHeight: 216.33802816901408,
                            renderImageWidth: 144,
                            type: 'image',
                            filepath: 'primaryImages/cYHi0VJkRMaSVli0x8jw.jpeg',
                          },
                        },
                      ],
                      id: 'jeitbzeg',
                    },
                    {
                      id: 'xnl0zhrm',
                      type: 'content',
                      content: {
                        transformY: -161.5,
                        filename: 'JwJtjJbbRLOFXbcy9vJd_11 Small.jpeg',
                        transformX: -108.003125,
                        renderImageHeight: 323,
                        renderImageWidth: 216.00625,
                        type: 'image',
                        filepath: 'primaryImages/GJqgX2lReW9cuWHL8zef.jpeg',
                      },
                    },
                  ],
                  height: 322,
                  fadeEdge: ICardProductFadeEdgeType.NONE,
                },
                height: 322,
              },
              id: '32m3ws97',
            },
          ],
        },
      ],
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      thumbnail: {
        images: [modernMinimalTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'Jost',
        fontSize: 14,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'Jost',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Jost',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Jost',
          fontSize: 32,
        },
        'header-two': {
          font: 'Jost',
          fontSize: 28,
        },
        'header-three': {
          font: 'Jost',
          fontSize: 24,
        },
        'header-four': {
          font: 'Jost',
          fontSize: 20,
        },
        'header-five': {
          font: 'Jost',
          fontSize: 16,
        },
        'header-six': {
          font: 'Jost',
          fontSize: 14,
        },
        'paragraph-one': {
          font: 'Jost',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Jost',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          rows: [
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
                height: 25,
              },
              id: 'abspjidc',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'modern-minimal-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Stripe/AU/Blue_Stripe_TV_WELCOME_SCREEN_LEFT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
        {
          rows: [
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
                height: 10,
              },
              id: '5vwn60q7',
            },
            {
              type: 'text',
              data: {
                margin: [15, 0],
                rowStyle: {
                  fontSize: 48,
                  font: 'Poiret One',
                },
                width: 290,
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
                          style: 'white',
                        },
                      ],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: 'dbpr0',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 67,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'zqdoy9sx',
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
                height: 10,
              },
              id: '0ut2mmba',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 18,
                  font: 'Jost',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'header-six',
                      key: 'cdnn1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 25,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'mypke59j',
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
                height: 110,
              },
              id: 'aah3fyie',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 22,
                  font: 'Jost',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'In Loving Memory',
                      type: 'header-six',
                      key: 'cdnn1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 31,
              },
              id: 'cmisqvjf',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Stripe/AU/Blue_Stripe_TV_WELCOME_SCREEN_RIGHT.jpg',
            },
            overlayMargin: [2, 8],
          },
        },
      ],
    },
    {
      id: 'full-width',
      isPrimaryImageFullWidth: true,
      name: 'Full Width',
      thumbnail: {
        images: [fullWidthTvWelcomeScreenImage],
      },
      defaultStyle: {
        font: 'EB Garamond',
        fontSize: 12,
      },
      newPageStyles: {
        header: 'default-header',
        paragraph: 'default-paragraph',
        headerHeight: 0,
        paragraphHeight: 0,
      },
      styles: {
        'default-header': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'EB Garamond',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'EB Garamond',
          fontSize: 32,
        },
        'header-two': {
          font: 'EB Garamond',
          fontSize: 24,
        },
        'header-three': {
          font: 'EB Garamond',
          fontSize: 20,
        },
        'header-four': {
          font: 'EB Garamond',
          fontSize: 20,
        },
        'header-five': {
          font: 'EB Garamond',
          fontSize: 18,
        },
        'header-six': {
          font: 'EB Garamond',
          fontSize: 16,
        },
        'paragraph-one': {
          font: 'EB Garamond',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'EB Garamond',
          fontSize: 9,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 2,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.NONE,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: 'space',
              data: {
                height: 19,
              },
              id: '0m9h6b1z',
            },
            {
              type: 'text',
              data: {
                margin: [0, 0],
                rowStyle: {
                  fontSize: 48,
                  font: 'Monsieur La Doulaise',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Celebrating',
                      type: 'unstyled',
                      key: '7ivl4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 67,
              },
              id: 'frwxgvnp',
            },
            {
              type: 'text',
              data: {
                margin: [0, 0],
                rowStyle: {
                  fontSize: 12,
                  font: 'EB Garamond',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'THE LIFE OF',
                      type: 'unstyled',
                      key: '8vv4a',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'zem34nvf',
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
                height: 51,
              },
              id: '4fis6i6i',
            },
            {
              type: 'text',
              data: {
                margin: [9, 0],
                rowStyle: {
                  fontSize: 32,
                  font: 'EB Garamond',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'header-one',
                      key: 'atdpj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'f5eztcev',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'EB Garamond',
                },
                width: 290,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                      type: 'paragraph-one',
                      key: 'a3ak1',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              dynamicDataId: CardProductDynamicDataKey.dobToDod,
              id: 'p5j65hnd',
            },
          ],
        },
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.NONE,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              type: CardProductContentItemType.FRAME,
              data: {
                prevWidth: 228,
                enableBorder: false,
                width: 323,
                alignment: AlignmentType.CENTER,
                content: {
                  width: 323,
                  id: 'w58ut2pi',
                  type: 'rows',
                  items: [
                    {
                      id: 'lsx8vp0i',
                      borderRadius: '0px',
                      type: 'content',
                      content: {
                        transformY: -202.38028169014083,
                        filename:
                          '42RsFZscTRKujqWd7AKl_rafael-leao-NRnPv3Gs-Nc-unsplash Small.jpeg',
                        transformX: -162,
                        renderImageHeight: 486.76056338028167,
                        renderImageWidth: 324,
                        type: 'image',
                        filepath: 'primaryImages/nzvBSBFdTaWZif097ZKA.jpeg',
                      },
                    },
                  ],
                  height: 322,
                  fadeEdge: ICardProductFadeEdgeType.NONE,
                },
                height: 322,
                isFullWidth: true,
              },
              id: 'n1uon558',
            },
          ],
        },
      ],
    },
  ])
