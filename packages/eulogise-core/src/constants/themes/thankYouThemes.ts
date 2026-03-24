import {
  archBookletImage,
  auraBookletImage,
  classicBookletImage,
  collageBookletImage,
  fallFlowersBookletImage,
  fullWidthBookletImage,
  goldRosesBookletImage,
  graceBookletImage,
  grandeurBookletImage,
  linenBookletImage,
  modernMinimalBookletImage,
  pastelBlueRosesBookletImage,
  pinkBookletImage,
  reflectionBookletImage,
  sailingWatercolorBookletImage,
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

export const THANK_YOU_CARD_THEMES: Array<ICardProductTheme> =
  attachGraphicBorder([
    {
      id: 'aura',
      name: 'Aura',
      thumbnail: {
        images: [auraBookletImage],
      },
      defaultThemeLayoutColumns: 2,
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
          fontSize: 44,
        },
        'header-two': {
          font: 'Allura',
          fontSize: 30,
        },
        'header-three': {
          font: 'Allura',
          fontSize: 24,
        },
        'header-four': {
          font: 'Alegreya',
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
      defaultContent: [
        {
          background: {
            image: {
              filepath:
                'backgroundImages/Floral/AU/Floral_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: 'hsdf56ck',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 30,
              },
            },
            {
              id: '7f1sm3s9',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '8hiqu',
                      text: 'Thank You',
                      type: 'header-two',
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
                height: 60,
                width: 195,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'ry00ssf7',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '4fg91',
                      text: 'for your kind expression of',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: '91sdf',
                      text: 'sympathy for our recent loss',
                      type: 'paragraph-one',
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
                height: 50,
                width: 195,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'q1og9tls',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 30,
              },
            },
            {
              id: 'ekh9ybre',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'bemo4',
                      text: 'With love,',
                      type: 'paragraph-one',
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
                height: 20,
                width: 195,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'ekh9cczs',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'sfcs4',
                      text: 'The family of {{{deceasedName}}}',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [3, 0],
                height: 20,
                width: 195,
                alignment: AlignmentType.CENTER,
              },
            },
          ],
        },
        {
          background: {
            image: {
              filepath:
                'backgroundImages/Floral/AU/Floral_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [],
        },
        {
          editable: false,
          rows: [
            {
              id: '0m9hlg13',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 33,
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: '0m9hlgdz',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 33,
              },
            },
          ],
        },
      ],
    },
    {
      id: 'grandeur',
      name: 'Grandeur',
      thumbnail: {
        images: [grandeurBookletImage],
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
                'backgroundImages/Beach/AU/Beach_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: '0maclb4z',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 50,
              },
            },
            {
              id: 'grandeur-front-img',
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
                'backgroundImages/Beach/AU/Beach_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: '9maclb4b',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 46,
              },
            },
            {
              id: 'l74qu3fi',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '913dj',
                      text: 'Thank You',
                      type: 'header-three',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                margin: [2, 0],
                height: 35,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: '0msdflfz',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 40,
              },
            },
            {
              id: 'yg7tujs0',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'drrrl',
                      text: 'We would like to express our',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: '8dfio',
                      text: 'Gratitude for your kindness',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: 'sffio',
                      text: 'and prayers during this',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: 'ssfml',
                      text: 'difficult time',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                margin: [0, 0],
                height: 70,
                width: 150,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'smflsjf8',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 30,
              },
            },
            {
              id: 'c5hwfx7s',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'drrrl',
                      text: 'The family of',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                margin: [0, 0],
                height: 14,
                width: 150,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'up2c8o4t',
              type: CardProductContentItemType.TEXT,
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'dscg2',
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                margin: [0, 0],
                height: 14,
                width: 150,
                alignment: AlignmentType.CENTER,
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: '0m9hlg1z',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 33,
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: '0m9hlg6z',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 33,
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
        images: [linenBookletImage],
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          background: {
            image: {
              filepath: 'backgroundImages/Linen/AU/Linen_THANK_YOU_CARD.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: 'vsmdh1rx',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 40,
              },
            },
            {
              id: 'judcggdv',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '2oih4',
                      text: 'Thank You',
                      type: 'header-one',
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
                width: 389,
                height: 45,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'eua58pfe',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'cnf6f',
                      text: 'for your kind expression of sympathy',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [10.5, 0],
                width: 389,
                height: 36,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'gkv3xlgf',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 48,
              },
            },
            {
              id: '0c5m4j1n',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '6q9cl',
                      text: 'With love, the family of',
                      type: 'paragraph-one',
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
                width: 389,
                height: 14,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: '5v2o38uf',
              type: CardProductContentItemType.TEXT,
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                content: {
                  blocks: [
                    {
                      key: '6lo4u',
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
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
                width: 389,
                height: 14,
                alignment: AlignmentType.CENTER,
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: '5gcnh1rx',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 46,
              },
            },
          ],
        },
      ],
    },
    {
      id: 'reflection',
      name: 'Reflection',
      thumbnail: {
        images: [reflectionBookletImage],
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          border: {
            color: 'black',
            borderStyle: CardProductBorderType.BLANK_MID_BOTTOM_SOLID,
            thickness: CardProductBorderThicknessType.THIN,
          },
          rows: [
            {
              id: 'sf1fbvcr',
              type: 'space',
              data: {
                height: 90,
              },
            },
            {
              id: '09cuoe77',
              type: 'text',
              data: {
                content: {
                  blocks: [
                    {
                      key: 'bgrhm',
                      text: 'Thank You',
                      type: 'header-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [0, 0],
                width: 389,
                height: 50,
                alignment: 'center',
              },
            },
            {
              id: 'tjg3h0xm',
              type: 'text',
              data: {
                content: {
                  blocks: [
                    {
                      key: '9hqe8',
                      text: 'for your kind expression of sympathy',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'ITALIC',
                        },
                      ],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [0, 0],
                width: 389,
                height: 22,
                alignment: 'center',
              },
            },
            {
              id: 'ly14btcr',
              type: 'space',
              data: {
                height: 48,
              },
            },
            {
              id: 'zc2139nx',
              type: 'text',
              data: {
                content: {
                  blocks: [
                    {
                      key: '73pmq',
                      text: 'With love, the family of',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [1, 0],
                width: 389,
                height: 17,
                alignment: 'center',
              },
            },
            {
              id: 'q3acuzqr',
              type: 'text',
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              data: {
                content: {
                  blocks: [
                    {
                      key: '3lipa',
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [0, 0],
                width: 389,
                height: 17,
                alignment: 'center',
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: 'que9u0sj',
              type: 'space',
              data: {
                height: 24,
              },
            },
          ],
        },
      ],
    },
    {
      id: 'grace',
      name: 'Grace',
      thumbnail: {
        images: [graceBookletImage],
      },
      defaultStyle: {
        font: 'Lora',
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          background: {
            image: {
              filepath:
                'thankyouCard/themes/background-images/grace-bg-border.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: 'vsfndnt',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 60,
              },
            },
            {
              id: 'exrpjvlz',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'b33p',
                      text: 'Thank You',
                      type: 'header-one',
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
                width: 389,
                height: 50,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'afouzj09',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'cqo1xbn',
                      text: 'The family of {{{deceasedName}}} would like to',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: 'czgnz',
                      text: 'thank you for you support and sympathy,',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: 'cxvmn',
                      text: 'following her sad passing',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [10, 0],
                width: 389,
                height: 51,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'aop4gwnt',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 40,
              },
            },
            {
              id: 'jvsfd2lz',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: 'badm',
                      text: 'May she live on in our hearts',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [0, 0],
                width: 389,
                height: 17,
                alignment: AlignmentType.CENTER,
              },
            },
          ],
        },
        {
          editable: false,
          rows: [
            {
              id: 'og2advpc',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 22,
              },
            },
          ],
        },
      ],
    },
    {
      id: 'classic',
      name: 'Classic',
      thumbnail: {
        images: [classicBookletImage],
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          background: {
            image: {
              filepath: 'backgroundImages/Paper/AU/Paper_THANK_YOU_CARD.jpg',
            },
            overlayMargin: [4, 8],
          },
          rows: [
            {
              id: 's3sfdlp45',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 35,
              },
            },
            {
              id: 'ohl5harx',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '8csdc',
                      text: 'Thank you',
                      type: 'header-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [6, 0],
                width: 389,
                height: 45,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'c88egct4',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '899qj',
                      text: 'We are deeply grateful for your kindness and',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: '239zj',
                      text: 'sympathy during our time of loss',
                      type: 'paragraph-one',
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
                width: 389,
                height: 28,
                alignment: AlignmentType.CENTER,
              },
            },
            {
              id: 'x0uvdlp4',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 32,
              },
            },
            {
              id: 'gdzvdif',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 30,
                divider: {
                  asset: {
                    id: 14,
                    name: 'Divider 14',
                    filename: 'divider-14.png',
                    filepath: 'booklet/dividers/divider-14.png',
                  },
                  width: 389,
                  height: 30,
                  alignment: AlignmentType.CENTER,
                },
              },
            },
            {
              id: 'smgldlp4',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 5,
              },
            },
            {
              id: '1sz3frx',
              type: CardProductContentItemType.TEXT,
              data: {
                content: {
                  blocks: [
                    {
                      key: '8dsv2',
                      text: 'From the family of {{{deceasedName}}}',
                      type: 'paragraph-one',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                },
                style: 'unstyled',
                margin: [11, 0],
                width: 389,
                height: 31,
                alignment: AlignmentType.CENTER,
              },
            },
          ],
        },
        {
          rows: [
            {
              id: 'uv5wn88h',
              type: CardProductContentItemType.SPACE,
              data: {
                height: 50,
                divider: {
                  asset: {
                    id: 14,
                    name: 'Divider 14',
                    filename: 'divider-14.png',
                    filepath: 'booklet/dividers/divider-14.png',
                  },
                  width: 389,
                  height: 37,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'gold-roses',
      name: 'Gold Roses',
      thumbnail: {
        images: [goldRosesBookletImage],
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 35,
              },
              id: 's3sfdlp45',
            },
            {
              type: 'text',
              data: {
                margin: [6, 0],
                rowStyle: {
                  font: 'Monsieur La Doulaise',
                },
                width: 389,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Thank you',
                      type: 'header-one',
                      key: '8csdc',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              id: 'ohl5harx',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Raleway',
                },
                width: 389,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'We are deeply grateful for your kindness and',
                      type: 'paragraph-one',
                      key: '899qj',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy during our time of loss',
                      type: 'paragraph-one',
                      key: '239zj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'c88egct4',
            },
            {
              type: 'space',
              data: {
                divider: {
                  width: 383,
                  asset: {
                    name: 'Divider 11',
                    id: 11,
                    filename: 'divider-14.png',
                    filepath: 'booklet/dividers/divider-11.png',
                  },
                  alignment: AlignmentType.CENTER,
                  height: 40,
                },
                height: 39,
              },
              id: 'gdzvdif',
            },
            {
              type: 'space',
              data: {
                height: 5,
              },
              id: 'smgldlp4',
            },
            {
              type: 'text',
              data: {
                margin: [8, 0],
                rowStyle: {
                  font: 'Raleway',
                },
                width: 389,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'From the family of ',
                      type: 'paragraph-one',
                      key: '8dsv2',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'f1ma4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: '1sz3frx',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Gold_Roses/AU/Gold_Roses_THANK_YOU_CARD.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                divider: {
                  asset: {
                    name: 'Divider 14',
                    id: 14,
                    filename: 'divider-14.png',
                    filepath: 'booklet/dividers/divider-14.png',
                  },
                  width: 389,
                  height: 37,
                },
                height: 50,
              },
              id: 'uv5wn88h',
            },
          ],
        },
      ],
    },
    {
      id: 'watercolor-sailing',
      name: 'Watercolor Sailing',
      thumbnail: {
        images: [sailingWatercolorBookletImage],
      },
      defaultThemeLayoutColumns: 2,
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
          fontSize: 44,
        },
        'header-two': {
          font: 'Cormorant',
          fontSize: 30,
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
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 35,
              },
              id: 'hsdf56ck',
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
                'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
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
                height: 36,
              },
              id: 'bt0uii1j',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Ballet',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Thank You',
                      type: 'header-two',
                      key: '8hiqu',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 42,
              },
              id: '7f1sm3s9',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Cormorant',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'for your kind expression of',
                      type: 'paragraph-one',
                      key: '4fg91',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy for our recent loss',
                      type: 'paragraph-one',
                      key: '91sdf',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 34,
              },
              id: 'ry00ssf7',
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
                height: 47,
              },
              id: 'z699b7hx',
            },
            {
              type: 'text',
              data: {
                width: 195,
                style: 'unstyled',
                margin: [1.5, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'With love,',
                      type: 'paragraph-one',
                      key: 'bemo4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'ekh9ybre',
            },
            {
              type: 'text',
              data: {
                margin: [3, 0],
                rowStyle: {
                  fontSize: 16,
                  font: 'BioRhyme',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'The family of ',
                      type: 'paragraph-one',
                      key: 'sfcs4',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'cm1gl',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              id: 'ekh9cczs',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg13',
            },
          ],
          editable: false,
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlgdz',
            },
          ],
          editable: false,
        },
      ],
    },
    {
      id: 'pastel-blue-roses',
      name: 'Pastel Blue Roses',
      thumbnail: {
        images: [pastelBlueRosesBookletImage],
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
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 60,
              },
              id: 'vsfndnt',
            },
            {
              type: 'text',
              data: {
                margin: [9, 0],
                rowStyle: {
                  fontSize: 34,
                  font: 'Ballet',
                },
                width: 389,
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
                          style: 'blue',
                        },
                        {
                          offset: 0,
                          style: 'mavy',
                        },
                        {
                          offset: 0,
                          style: 'lavender',
                        },
                      ],
                      text: 'Thank You',
                      type: 'header-one',
                      key: 'b33p',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 48,
              },
              id: 'exrpjvlz',
            },
            {
              type: 'text',
              data: {
                margin: [10, 0],
                rowStyle: {
                  fontSize: 14,
                  font: 'Old Standard TT',
                },
                width: 389,
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
                      text: 'The family of {{{deceasedName}}} would like to',
                      type: 'paragraph-one',
                      key: 'cqo1xbn',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'mavy',
                        },
                      ],
                      text: 'thank you for you support and sympathy,',
                      type: 'paragraph-one',
                      key: 'czgnz',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'mavy',
                        },
                      ],
                      text: 'following her sad passing',
                      type: 'paragraph-one',
                      key: 'cxvmn',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 59,
              },
              id: 'afouzj09',
            },
            {
              type: 'space',
              data: {
                height: 21,
              },
              id: 'aop4gwnt',
            },
            {
              type: 'text',
              data: {
                margin: [0, 0],
                rowStyle: {
                  fontSize: 14,
                  font: 'Old Standard TT',
                },
                width: 389,
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
                      text: 'May she live on in our hearts',
                      type: 'paragraph-one',
                      key: 'badm',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              id: 'jvsfd2lz',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_THANK_YOU_CARD.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 22,
              },
              id: 'og2advpc',
            },
          ],
          editable: false,
        },
      ],
    },
    {
      id: 'pink-pastel',
      name: 'Pink Pastel',
      thumbnail: {
        images: [pinkBookletImage],
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
                height: 29,
              },
              id: '0maclb4z',
            },
            {
              type: 'text',
              data: {
                margin: [2, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 30,
                  font: 'Dancing Script',
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'Thank You',
                      type: 'header-three',
                      key: '913dj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 42,
              },
              id: 'l74qu3fi',
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
                height: 16,
              },
              id: 'm8vnmjmb',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'pink-pastel-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
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
                'backgroundImages/Pastel_Pink/AU/Pastel_Pink_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 34,
              },
              id: '9maclb4b',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [0, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '',
                      type: 'paragraph-one',
                      key: 'drrrl',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'We would like to express our gratitude for your kindness and prayers during this difficult time',
                      type: 'unstyled',
                      key: '6v1fg',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 70,
              },
              id: 'yg7tujs0',
            },
            {
              type: 'space',
              data: {
                height: 20,
              },
              id: 'smflsjf8',
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
                  width: 173,
                  height: 18,
                },
                height: 33,
              },
              id: 'anka7dcc',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [7, 0],
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'The family of',
                      type: 'paragraph-one',
                      key: 'drrrl',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 14,
              },
              id: 'c5hwfx7s',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [0, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 14,
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'dscg2',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 20,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'up2c8o4t',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Pastel_Pink/AU/Pastel_Pink_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg1z',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          editable: false,
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg6z',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          editable: false,
        },
      ],
    },
    {
      id: 'fall-flowers',
      name: 'Fall Flowers',
      thumbnail: {
        images: [fallFlowersBookletImage],
      },
      defaultStyle: {
        font: 'Sora',
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
          font: 'Sora',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Sora',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Sora',
          fontSize: 32,
        },
        'header-two': {
          font: 'Sora',
          fontSize: 28,
        },
        'header-three': {
          font: 'Sora',
          fontSize: 24,
        },
        'header-four': {
          font: 'Sora',
          fontSize: 20,
        },
        'header-five': {
          font: 'Sora',
          fontSize: 16,
        },
        'header-six': {
          font: 'Sora',
          fontSize: 12,
        },
        'paragraph-one': {
          font: 'Sora',
          fontSize: 10,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Sora',
          fontSize: 8,
          color: '#4a4a4a',
        },
      },
      defaultThemeLayoutColumns: 1,
      defaultContent: [
        {
          rows: [
            {
              type: CardProductContentItemType.SPACE,
              data: {
                height: 59,
              },
              id: 's3sfdlp45',
            },
            {
              type: 'text',
              data: {
                margin: [6, 0],
                rowStyle: {
                  font: 'Neuton',
                },
                width: 389,
                style: 'unstyled',
                alignment: AlignmentType.CENTER,
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
                      text: 'Thank you',
                      type: 'header-one',
                      key: '8csdc',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              id: 'ohl5harx',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Sora',
                },
                width: 389,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'We are deeply grateful for your kindness and',
                      type: 'paragraph-one',
                      key: '899qj',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy during our time of loss',
                      type: 'paragraph-one',
                      key: '239zj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'c88egct4',
            },
            {
              type: 'space',
              data: {
                height: 32,
              },
              id: 'x0uvdlp4',
            },
            {
              type: 'space',
              data: {
                height: 5,
              },
              id: 'smgldlp4',
            },
            {
              type: 'text',
              data: {
                margin: [11, 0],
                rowStyle: {
                  font: 'Sora',
                },
                width: 389,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'From the family of {{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: '8dsv2',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 14,
              },
              id: '1sz3frx',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
            color: '#BF713E',
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Fall_Flowers/AU/Fall_Flowers_THANK_YOU_CARD.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                divider: {
                  asset: {
                    name: 'Divider 14',
                    id: 14,
                    filename: 'divider-14.png',
                    filepath: 'booklet/dividers/divider-14.png',
                  },
                  width: 389,
                  height: 37,
                },
                height: 50,
              },
              id: 'uv5wn88h',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
        },
      ],
    },
    {
      id: 'minimal-arch',
      name: 'Minimal Arch',
      thumbnail: {
        images: [archBookletImage],
      },
      defaultStyle: {
        font: 'Alegra',
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
          font: 'Alegra',
          fontSize: 16,
        },
        'default-paragraph': {
          font: 'Alegra',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'header-one': {
          font: 'Alegra',
          fontSize: 32,
        },
        'header-two': {
          font: 'Alegra',
          fontSize: 24,
        },
        'header-three': {
          font: 'Alegra',
          fontSize: 20,
        },
        'header-four': {
          font: 'Alegra',
          fontSize: 20,
        },
        'header-five': {
          font: 'Alegra',
          fontSize: 18,
        },
        'header-six': {
          font: 'Alegra',
          fontSize: 16,
        },
        'paragraph-one': {
          font: 'Alegra',
          fontSize: 12,
          color: '#4a4a4a',
        },
        'paragraph-two': {
          font: 'Alegra',
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
                height: 35,
              },
              id: '0maclb4z',
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
            borderStyle: CardProductBorderType.SINGLE_SOLID,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 46,
              },
              id: '9maclb4b',
            },
            {
              type: 'text',
              data: {
                margin: [2, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 32,
                  font: 'Cormorant',
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'Thank You',
                      type: 'header-three',
                      key: '913dj',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 45,
              },
              id: 'l74qu3fi',
            },
            {
              type: 'space',
              data: {
                height: 22,
              },
              id: '0msdflfz',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [0, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 12,
                  font: 'Alegreya',
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'We would like to express our',
                      type: 'paragraph-one',
                      key: 'drrrl',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'Gratitude for your kindness',
                      type: 'paragraph-one',
                      key: '8dfio',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'and prayers during this',
                      type: 'paragraph-one',
                      key: 'sffio',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'difficult time',
                      type: 'paragraph-one',
                      key: 'ssfml',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 67,
              },
              id: 'yg7tujs0',
            },
            {
              type: 'space',
              data: {
                height: 30,
              },
              id: 'smflsjf8',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [0, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 12,
                  font: 'Alegreya',
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: 'The family of',
                      type: 'paragraph-one',
                      key: 'drrrl',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'c5hwfx7s',
            },
            {
              type: 'text',
              data: {
                width: 150,
                margin: [0, 0],
                alignment: 'center',
                rowStyle: {
                  fontSize: 12,
                  font: 'Alegreya',
                },
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [
                        {
                          offset: 0,
                          style: 'dark-grey',
                        },
                      ],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'dscg2',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'up2c8o4t',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg1z',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          editable: false,
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg6z',
            },
          ],
          border: {
            borderStyle: CardProductBorderType.NONE,
          },
          editable: false,
        },
      ],
    },
    {
      id: 'minimal-collage',
      name: 'Minimal Collage',
      thumbnail: {
        images: [collageBookletImage],
      },
      defaultStyle: {
        font: 'Playfair Display',
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
          rows: [
            {
              type: 'space',
              data: {
                height: 30,
              },
              id: 'hsdf56ck',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 28,
                  font: 'Playfair Display',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Thank You',
                      type: 'header-two',
                      key: '8hiqu',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 39,
              },
              id: '7f1sm3s9',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'Playfair Display',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'for your kind expression of',
                      type: 'paragraph-one',
                      key: '4fg91',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy for our recent loss',
                      type: 'paragraph-one',
                      key: '91sdf',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'ry00ssf7',
            },
            {
              type: 'space',
              data: {
                height: 30,
              },
              id: 'q1og9tls',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'Playfair Display',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'With love,',
                      type: 'paragraph-one',
                      key: 'bemo4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 14,
              },
              id: 'ekh9ybre',
            },
            {
              type: 'text',
              data: {
                margin: [3, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'Playfair Display',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'The family of ',
                      type: 'paragraph-one',
                      key: 'sfcs4',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: '5805a',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'ekh9cczs',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: CardProductContentItemType.FRAME,
              data: {
                width: 180,
                // originalFrameSize: 210,
                content: {
                  width: 180,
                  id: 'j2y66cpj',
                  type: 'rows',
                  items: [
                    {
                      type: 'columns',
                      items: [
                        {
                          id: 'iewkdqyx',
                          type: 'content',
                          content: {
                            transformY: -36.2953125,
                            filename:
                              'W7a3diW8T0uPLIusjKDQ_sir-manuel-HaS1rwBpLus-unsplash Small.jpeg',
                            transformX: -44.5,
                            renderImageHeight: 72.590625,
                            renderImageWidth: 89,
                            type: 'image',
                            filepath: 'primaryImages/kChOzYAeRH6RqTXYJSby.jpeg',
                          },
                        },
                        {
                          id: 'hyyflts3',
                          type: 'content',
                          content: {
                            transformY: -29.6203125,
                            filename: 'D64eveTXShqKXxGfcp0H_18 Small.jpeg',
                            transformX: -44.5,
                            renderImageHeight: 59.240625,
                            renderImageWidth: 89,
                            type: 'image',
                            filepath: 'primaryImages/FoI9BMhAR6F4YPeO5nNR.jpeg',
                          },
                        },
                      ],
                      id: 'f7q3c6bd',
                    },
                    {
                      id: 'mya4qjcw',
                      type: 'content',
                      flex: 2,
                      content: {
                        transformY: -83.14687500000001,
                        filename: 'Ay5h3xHySryD4j3jAmnZ_17 Small.jpeg',
                        transformX: -90.5,
                        renderImageHeight: 166.29375000000002,

                        renderImageWidth: 181,
                        type: 'image',
                        filepath: 'primaryImages/s1klifNvSmifoZ3pjbFl.jpeg',
                      },
                    },
                    {
                      type: 'columns',
                      items: [
                        {
                          id: 'upaa8sea',
                          type: 'content',
                          content: {
                            transformY: -52.74074074074073,
                            filename: 'P5LByAEzRtetbV44i0Zl_1 Small.jpeg',
                            transformX: -44.5,
                            renderImageHeight: 105.48148148148147,

                            renderImageWidth: 89,
                            type: 'image',
                            filepath: 'primaryImages/8bGDcBESQRCvrQ1vs03r.jpeg',
                          },
                        },
                        {
                          id: 'cri6hz68',
                          type: 'content',
                          content: {
                            transformY: -33.375,
                            filename:
                              'Q4P6wgboTEy0SggV2m88_stephen-lustig-363932-unsplash Small.jpeg',
                            transformX: -44.5,
                            renderImageHeight: 66.75,
                            renderImageWidth: 89,
                            type: 'image',
                            filepath: 'primaryImages/djOJij3sR2Wkeg8zR9wv.jpeg',
                          },
                        },
                      ],
                      id: 'wx5t9mkn',
                    },
                  ],
                  height: 244,
                  fadeEdge: ICardProductFadeEdgeType.NONE,
                },
                height: 244,
              },
              id: 's3oc4mvp',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg13',
            },
          ],
          editable: false,
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlgdz',
            },
          ],
          editable: false,
        },
      ],
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      thumbnail: {
        images: [modernMinimalBookletImage],
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
          fontSize: 44,
        },
        'header-two': {
          font: 'Jost',
          fontSize: 30,
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
                height: 25,
              },
              id: 'hsdf56ck',
            },
            {
              type: 'text',
              data: {
                margin: [7.5, 0],
                rowStyle: {
                  font: 'Poiret One',
                },
                width: 195,
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
                      text: 'Thank You',
                      type: 'header-two',
                      key: '8hiqu',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 42,
              },
              id: '7f1sm3s9',
            },
            {
              type: 'text',
              data: {
                margin: [8.5, 0],
                rowStyle: {
                  font: 'Jost',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'for your kind expression of',
                      type: 'paragraph-one',
                      key: '4fg91',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy for our recent loss',
                      type: 'paragraph-one',
                      key: '91sdf',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 34,
              },
              id: 'ry00ssf7',
            },
            {
              type: 'space',
              data: {
                height: 30,
              },
              id: 'q1og9tls',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  font: 'Jost',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'With love,',
                      type: 'paragraph-one',
                      key: 'bemo4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'ekh9ybre',
            },
            {
              type: 'text',
              data: {
                margin: [3, 0],
                rowStyle: {
                  font: 'Jost',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'The family of {{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'sfcs4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 17,
              },
              id: 'ekh9cczs',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Stripe/AU/Blue_Stripe_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
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
                height: 27,
              },
              id: 'bwi4knaw',
            },
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'modern-minimal',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blue_Stripe/AU/Blue_Stripe_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlg13',
            },
          ],
          editable: false,
        },
        {
          rows: [
            {
              type: 'space',
              data: {
                height: 33,
              },
              id: '0m9hlgdz',
            },
          ],
          editable: false,
        },
      ],
    },
    {
      id: 'full-width',
      isPrimaryImageFullWidth: true,
      name: 'full-width',
      thumbnail: {
        images: [fullWidthBookletImage],
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
          fontSize: 20,
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
          rows: [
            {
              type: 'space',
              data: {
                height: 24,
              },
              id: 'hsdf56ck',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 34,
                  font: 'Monsieur La Doulaise',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Thank You',
                      type: 'header-two',
                      key: '8hiqu',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 48,
              },
              id: '7f1sm3s9',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'EB Garamond',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'for your kind expression of',
                      type: 'paragraph-one',
                      key: '4fg91',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'sympathy for our recent loss',
                      type: 'paragraph-one',
                      key: '91sdf',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'ry00ssf7',
            },
            {
              type: 'space',
              data: {
                height: 23,
              },
              id: 'q1og9tls',
            },
            {
              type: 'text',
              data: {
                margin: [5, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'EB Garamond',
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'With love,',
                      type: 'paragraph-one',
                      key: 'bemo4',
                      entityRanges: [],
                    },
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'The family of',
                      type: 'paragraph-one',
                      key: '6s8h5',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 28,
              },
              id: 'ekh9ybre',
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
                height: 16,
              },
              id: '5w5ragc4',
            },
            {
              type: 'text',
              data: {
                margin: [3, 0],
                rowStyle: {
                  fontSize: 18,
                },
                width: 195,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: '{{{deceasedName}}}',
                      type: 'paragraph-one',
                      key: 'sfcs4',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 25,
              },
              dynamicDataId: CardProductDynamicDataKey.deceasedName,
              id: 'ekh9cczs',
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
        {
          rows: [
            {
              // @ts-ignore
              type: '{{{primaryImageType}}}',
              // @ts-ignore
              data: '<<&primaryImage>>',
              id: 'full-width-front-img',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
            },
          ],
          background: {
            image: {
              filepath:
                'backgroundImages/Blank/AU/Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            },
            overlayMargin: [4, 8],
          },
        },
      ],
    },
  ])
