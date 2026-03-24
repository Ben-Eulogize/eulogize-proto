import { CardProductContentItemType, ICardProductTheme } from '@eulogise/core'
import { auraBookletImage } from '@eulogise/core'

export const MOCK_TV_WELCOME_SCREEN_THEME_1: ICardProductTheme = {
  id: 'aura',
  name: 'Aura',
  thumbnail: {
    images: [auraBookletImage],
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
}
