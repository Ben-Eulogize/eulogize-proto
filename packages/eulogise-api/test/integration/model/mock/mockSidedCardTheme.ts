import {
  AlignmentType,
  CardProductContentItemType,
  ICardProductTheme,
} from '@eulogise/core'
import { auraMemorialCardImage } from '@eulogise/core'

export const MOCK_SIDED_CARD_THEME_1: ICardProductTheme = {
  id: 'aura',
  name: 'Aura',
  thumbnail: {
    images: [auraMemorialCardImage],
  },
  defaultStyle: {
    font: 'Lora',
    fontSize: 10,
  },
  newPageStyles: {
    header: 'default-header',
    paragraph: 'default-paragraph',
    headerHeight: 27,
    paragraphHeight: 118,
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
          filepath: `backgroundImages/Floral/AU/Floral_BOOKLET_FRONT.jpg`,
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
            width: 10,
            height: 20,
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
            margin: [10, 0],
            width: 10,
            height: 63,
            alignment: AlignmentType.CENTER,
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
            width: 10,
            height: 20,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'q1og9tls',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 300,
          },
        },
        {
          id: '4isdyvif',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '9j9f5',
                  text: 'Service',
                  type: 'header-five',
                  depth: 0,
                  inlineStyleRanges: [
                    {
                      offset: 0,
                      length: 7,
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
            margin: [3.5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'ju8zsudx',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '7rk74',
                  text: '{{{location}}}',
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
            width: 10,
            height: 20,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'ju8c23dx',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'e9s6f',
                  text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
            width: 10,
            height: 20,
            alignment: AlignmentType.CENTER,
          },
        },
      ],
    },
    {
      background: {
        image: {
          filepath: `backgroundImages/Floral/AU/Floral_BOOKLET_BACK.jpg`,
        },
      },
      rows: [
        {
          id: '6umm86t6',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 28,
          },
        },
        {
          id: 'm5l3n9qw',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '241aq',
                  text: 'Thank you',
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
            width: 10,
            height: 42,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'jth5itdq',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'e5ib3',
                  text: 'The family would like to thank you for your support',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'fbafv',
                  text: 'during this time of sadness. ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'a0rlu',
                  text: '',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'l7cr',
                  text: 'Please join us at the Pacific Room, Intercontinental',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '846gi',
                  text: 'Hotel for refreshments',
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
            width: 10,
            height: 84,
            alignment: AlignmentType.CENTER,
          },
        },
      ],
    },
  ],
}
