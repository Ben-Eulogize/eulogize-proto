import {
  AlignmentType,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  ICardProductTheme,
} from '@eulogise/core'
import { auraBookletImage } from '@eulogise/core'

export const MOCK_BOOKLET_THEME_1: ICardProductTheme = {
  id: 'aura',
  name: 'Aura',
  thumbnail: {
    images: [auraBookletImage],
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
          dynamicDataId: CardProductDynamicDataKey.deceasedName,
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
          dynamicDataId: CardProductDynamicDataKey.dobToDod,
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
      rows: [
        {
          id: 'g679s1in',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'ca7a4',
                  text: 'Welcome',
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
            margin: [3.5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'g679s12n',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '2vq1f',
                  text: 'Celebrant, Joshua Goodheart',
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
            margin: [3.5, 0],
            width: 10,
            height: 17,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'huiguyck',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 29,
          },
        },
        {
          id: 'aura-front-img',
          type: CardProductContentItemType.FRAME,
          // @ts-ignore
          data: '<<&primaryImage>>',
        },
        {
          id: 's5p73597',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 29,
          },
        },
        {
          id: 'yo4kpivl',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'a5oum',
                  text: 'Hymn, Abide With Me',
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
            margin: [7, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'yo4kc5vl',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '8v22l',
                  text: 'Henry Francis Lyte',
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
            margin: [7, 0],
            width: 10,
            height: 19,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'ngq08v75',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 39,
          },
        },
        {
          id: 'gah0wvzv',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'vs0n',
                  text: 'First Tribute',
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
            margin: [4.5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'gah0wxzv',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'f8gds',
                  text: 'Georgie Goodperson',
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
            margin: [4.5, 0],
            width: 10,
            height: 17,
            alignment: AlignmentType.CENTER,
          },
        },
      ],
    },
    {
      rows: [
        {
          id: '536ss092',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'c5136',
                  text: 'Second Tribute',
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
            margin: [5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: '532vs092',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'fif52',
                  text: 'Lucinda Goodperson',
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
            height: 17,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'zopx0hhq',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 15,
          },
        },
        {
          id: '9o9oefmb',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '1hj7m',
                  text: 'The Lord’s Prayer',
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
            margin: [1.5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'z7m6hjvs',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'fljno',
                  text: 'Our Father who art in heaven',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'q68t',
                  text: 'hallowed be thy name. ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'em4dc',
                  text: 'Thy kingdom come. ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '4jn94',
                  text: 'Thy will be done, ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '7v2ok',
                  text: 'on Earth as it is in Heaven. ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '7t8td',
                  text: 'Give us this day our daily bread; ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '7dt25',
                  text: 'and forgive us our trespasses, ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '8qp8q',
                  text: 'as we forgive those who trespass against us; ',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'a2uka',
                  text: 'and lead us not into temptation,',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '1pidd',
                  text: ' but deliver us from evil.',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'egeg1',
                  text: '',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: 'cn3c6',
                  text: 'For thine is the Kingdom,',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '573il',
                  text: 'and the power, and the glory,',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '3tl4h',
                  text: 'for ever and ever',
                  type: 'paragraph-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
                {
                  key: '2b15o',
                  text: 'Amen.',
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
            height: 252,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: '7pyy8cbt',
          type: CardProductContentItemType.SPACE,
          data: {
            height: 15,
          },
        },
        {
          id: 'fmquatjk',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: '52j9h',
                  text: 'Address',
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
            margin: [5, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'fb5am67l',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'fjjtu',
                  text: 'Celebrant, Joshua Goodheart',
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
            margin: [2.5, 0],
            width: 10,
            height: 17,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'n7v3cemy',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'sd1t',
                  text: 'Hymn, When September Ends',
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
            margin: [25, 0],
            width: 10,
            height: 22,
            alignment: AlignmentType.CENTER,
          },
        },
        {
          id: 'h9inp3rf',
          type: CardProductContentItemType.TEXT,
          data: {
            content: {
              blocks: [
                {
                  key: 'eon4m',
                  text: 'Words of Farewell',
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
            margin: [3.5, 0],
            width: 10,
            height: 22,
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
