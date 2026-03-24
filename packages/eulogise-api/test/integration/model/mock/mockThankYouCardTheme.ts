import {
  AlignmentType,
  CardProductContentItemType,
  ICardProductTheme,
} from '@eulogise/core'
import { auraBookletImage } from '@eulogise/core'

export const MOCK_THANK_YOU_CARD_THEME_1: ICardProductTheme = {
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
}
