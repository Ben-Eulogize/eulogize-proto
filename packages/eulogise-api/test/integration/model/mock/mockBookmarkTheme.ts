import {
  AlignmentType,
  CardProductContentItemType,
  ICardProductTheme,
} from '@eulogise/core'
import { auraBookletImage } from '@eulogise/core'

export const MOCK_BOOKMARK_THEME_1: ICardProductTheme = {
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
      fontSize: 44,
    },
    'header-two': {
      font: 'Allura',
      fontSize: 32,
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
          filepath: 'backgroundImages/Floral/AU/Floral_BOOKMARK_FRONT.jpg',
        },
      },
      rows: [
        {
          id: '7f1sm3s9',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '8hiqu',
                  text: 'In Loving Memory of the Life of',
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
            width: 132,
            height: 39,
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
                  text: '{{{deceasedName}}}',
                  type: 'header-three',
                  depth: 0,
                  inlineStyleRanges: [
                    {
                      offset: 0,
                      style: 'BOLD',
                    },
                  ],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            },
            style: 'unstyled',
            margin: [10, 0],
            width: 132,
            height: 67,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: '913g9tls',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 15,
          },
        },
        {
          id: '7fpzbhoz',
          // @ts-ignore
          type: '{{{primaryImageType}}}',
          // @ts-ignore
          data: '<<&primaryImage>>',
        },
        {
          id: 'q1og9tls',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 290,
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
                  text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
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
            width: 132,
            height: 59,
            alignment: AlignmentType.CENTER,
          },
        },
      ],
    },
  ],
}
