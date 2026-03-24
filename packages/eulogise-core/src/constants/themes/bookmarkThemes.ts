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

export const BOOKMARK_THEMES: Array<ICardProductTheme> = attachGraphicBorder([
  {
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
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
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
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
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
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
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
              width: 132,
              height: 31,
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
            type: CardProductContentItemType.IMAGE,
            data: {
              filepath:
                'booklet/themes/example-images/tracey-hocking-726156-unsplash-cropped.jpg',
              alignment: AlignmentType.CENTER,
              width: 132,
              height: 132,
            },
          },
          {
            id: 's5p73597',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 34,
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
              width: 132,
              height: 31,
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
              width: 132,
              height: 31,
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
              width: 132,
              height: 31,
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
            type: CardProductContentItemType.IMAGE,
            data: {
              filepath:
                'booklet/themes/example-images/tracey-hocking-726156-unsplash-cropped.jpg',
              alignment: AlignmentType.CENTER,
              width: 132,
              height: 132,
            },
          },
          {
            id: 's5p73597',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 34,
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
              width: 132,
              height: 31,
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
              width: 132,
              height: 31,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        background: {
          image: {
            filepath: 'backgroundImages/Floral/AU/Floral_BOOKMARK_BACK.jpg',
          },
        },
        rows: [
          {
            id: '6umm86t6',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 67,
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
                    text: 'Love is Immortal',
                    type: 'header-five',
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
              margin: [5, 0],
              width: 132,
              height: 31,
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
                    text: 'Love is pure energy and',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'fbafv',
                    text: 'No matter how hard you try,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'a0rlu',
                    text: 'You can never kill love',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'l7cr',
                    text: "Because pure energy can't die",
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '846gi',
                    text: 'The feeling of love can fade,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '13cgi',
                    text: 'And the body can cease to give,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '21vgi',
                    text: 'But the energy created by love',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1xcgi',
                    text: 'Is immortal and continues',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'zhsgi',
                    text: 'To live',
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
              width: 132,
              height: 235,
              alignment: AlignmentType.CENTER,
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
        font: 'Comfortaa',
        fontSize: 8,
        color: '#4a4a4a',
      },
    },
    defaultContent: [
      {
        background: {
          image: {
            filepath: 'backgroundImages/Beach/AU/Beach_BOOKMARK_FRONT.jpg',
          },
        },
        rows: [
          {
            id: 'grandeur-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            id: 'h0nz5rjz',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 310,
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
                    text: 'In Loving Memory',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'white',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [2, 0],
              width: 132,
              height: 17,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'nbyypixj',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: '4eg16',
                    text: '{{{deceasedName}}}',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'white',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [0.5, 0],
              width: 132,
              height: 84,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'h0cr5rjz',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 50,
            },
          },
          {
            id: '66a0puy0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            data: {
              content: {
                blocks: [
                  {
                    key: '9m1ib',
                    text: '{{{dateOfBirth}}}',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'white',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [3.5, 0],
              width: 132,
              height: 17,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '31a0pzy0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            data: {
              content: {
                blocks: [
                  {
                    key: '3w4ip',
                    text: '{{{dateOfDeath}}}',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'white',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [3.5, 0],
              width: 132,
              height: 16,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'm1647zib',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'Welcome',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
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
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '0m9hlg4z',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 33,
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
                    text: 'Hymn, Abide With Me',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
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
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'elhiebn3',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 33,
            },
          },
          {
            id: '1e1mplrw',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'First Tribute',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
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
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'm4n9k9xb',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 33,
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
              margin: [0, 0],
              width: 132,
              height: 19,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'tmpk5va7',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 33,
            },
          },
          {
            id: 'ugt34l0a',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'Second Tribute',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
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
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'e65slfq7',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 33,
            },
          },
          {
            id: '0vp38mpb',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'Address',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
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
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'bzra9l4f',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 24,
            },
          },
          {
            id: 'dcm0hbw5',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'Hymn, When September Ends',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '2nqvb8ib',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 24,
            },
          },
          {
            id: 'npf2vsps',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'drrrl',
                    text: 'Words of Farewell',
                    type: 'header-five',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8dfio',
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [0, 0],
              width: 132,
              height: 32,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'up2c8o4t',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'dscg2',
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
              margin: [-1, 0],
              width: 132,
              height: 19,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '83ipd8t8',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 10,
            },
          },
          {
            id: 'zibmznhh',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'aa6pj',
                    text: 'Abide with me; fast falls the eventide;',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8307j',
                    text: 'The darkness deepens; Lord with me abide.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2ds6b',
                    text: 'When other helpers fail and comforts flee,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '893le',
                    text: 'Help of the helpless, O abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '94qcr',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5nlrv',
                    text: "Swift to its close ebbs out life's little day;",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '79jah',
                    text: "Earth's joys grow dim; its glories pass away;",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '538u',
                    text: 'Change and decay in all around I see;',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '49eri',
                    text: 'O Thou who changest not, abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7ori8',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7nd8f',
                    text: 'Not a brief glance I beg, a passing word,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6pcur',
                    text: "But as Thou dwell'st with Thy disciples, Lord,",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4qgdh',
                    text: 'Familiar, condescending, patient, free.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'f57c8',
                    text: 'Come not to sojourn, but abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '9be65',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'fvebn',
                    text: 'Thou on my head in early youth didst smile,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e5hf9',
                    text: 'And though rebellious and perverse meanwhile,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'b8v2b',
                    text: 'Thou hast not left me, oft as I left Thee.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'ccjid',
                    text: 'On to the close, O Lord, abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6h96c',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7iue4',
                    text: 'I need Thy presence every passing hour.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'cbt9g',
                    text: "What but Thy grace can foil the tempter's power?",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5tm37',
                    text: 'Who, like Thyself, my guide and stay can be?',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'cqfa6',
                    text: 'Through cloud and sunshine, Lord, abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4i2ot',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'otkv',
                    text: 'I fear no foe, with Thee at hand to bless;',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6o0ug',
                    text: 'Ills have no weight, and tears no bitterness.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8a1mu',
                    text: "Where is death's sting? Where, grave, thy victory?",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5jrph',
                    text: 'I triumph still, if Thou abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4r92g',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'egon5',
                    text: 'Hold Thou Thy cross before my closing eyes;',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2sr1m',
                    text: 'Shine through the gloom and point me to the skies.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5lf8r',
                    text: "Heaven's morning breaks, and earth's vain shadows flee;",
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '51uqc',
                    text: 'In life, in death, O Lord, abide with me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [3, 0],
              width: 132,
              height: 442,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        background: {
          image: {
            filepath: 'backgroundImages/Beach/AU/Beach_BOOKMARK_BACK.jpg',
          },
          overlayMargin: [11, 8],
        },
        rows: [
          {
            id: 'og7rmfoh',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 21,
            },
          },
          {
            id: 'mdc2zr2y',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '9ohrh',
                    text: "The Lord's Prayer",
                    type: 'header-five',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 132,
              height: 45,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '7tjre50r',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '3mn3k',
                    text: 'Our Father who art in heaven',
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
                    key: 'ai1cf',
                    text: 'hallowed be thy name',
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
                    key: '7v69g',
                    text: 'Thy kingdom come.',
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
                    key: '95fre',
                    text: 'They will be done,',
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
                    key: 'd0ra8',
                    text: 'on Earth as it is in Heaven',
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
                    key: 'dcra8',
                    text: 'Give us this day our daily bread',
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
                    key: 'zcr18',
                    text: 'and forgive us our trespasses,',
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
                    key: 'fue38',
                    text: 'as we forgive those who trespass',
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
                    key: 'zsvc2',
                    text: 'against us;',
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
                    key: 'cks14',
                    text: 'and lead us not into temptation,',
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
                    key: 'cvzw4',
                    text: 'but deliver us from evil.',
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
              margin: [5, 0],
              width: 132,
              height: 238,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'tzncjd67',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 40,
            },
          },
          {
            id: 'nbczbd2j',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'ke1ss',
                    text: 'For thine is the kingdom',
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
                    key: 'kb1ss',
                    text: 'and the power, and the glory',
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
                    key: 'kbb88',
                    text: 'for ever and ever\n',
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
                    key: 'kbb89',
                    text: 'Amen',
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
              margin: [0.5, 0],
              width: 132,
              height: 100,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'czgjwd67',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 10,
            },
          },
          {
            id: 'nbnkpixj',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: '4eg16',
                    text: '{{{deceasedName}}}',
                    type: 'header-four',
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
              margin: [10.5, 0],
              width: 132,
              height: 84,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'r843zux0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            data: {
              content: {
                blocks: [
                  {
                    key: '8z0vb',
                    text: '{{{dateOfBirth}}}',
                    type: 'header-six',
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
              margin: [3.5, 0],
              width: 132,
              height: 17,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'r843puy0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            data: {
              content: {
                blocks: [
                  {
                    key: '8z0vb',
                    text: '{{{dateOfDeath}}}',
                    type: 'header-six',
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
              margin: [3.5, 0],
              width: 132,
              height: 17,
              alignment: AlignmentType.CENTER,
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
    defaultContent: [
      {
        background: {
          image: {
            filepath: 'backgroundImages/Linen/AU/Linen_BOOKMARK_FRONT.jpg',
          },
        },
        rows: [
          {
            id: 'judcggdv',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '2oih4',
                    text: 'In loving memory',
                    type: 'header-six',
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
              margin: [5, 0],
              width: 132,
              height: 20,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'gkv3xlgf',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'linen-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            id: 'g02ew9j9',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 300,
            },
          },
          {
            id: 'eua58pfe',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cnf6f',
                    text: '{{{deceasedName}}}',
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
              margin: [10.5, 0],
              width: 132,
              height: 80,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '0c5m4j1n',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: '6q9cl',
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                    type: 'paragraph-two',
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
              width: 142,
              height: 20,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: '5gcnh1rx',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 46,
            },
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 132,
              alignment: AlignmentType.CENTER,
              content: {
                lockAspectRatio: false,
                width: 132,
                id: 'sok6p3dd',
                type: 'rows',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -81,
                      renderImageWidth: 141.50602409638554,
                      transformX: -70.75301204819277,
                      renderImageHeight: 162,
                      type: 'image',
                      filepath:
                        'bookmark/themes/example-images/linen-back-profile.png',
                    },
                    id: '2o4pajtg',
                  },
                ],
                height: 200,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 200,
            },
            id: '8syir7bg',
          },
          {
            id: '5gdnh1rx',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 5,
            },
          },
          {
            id: '4fpzbhoz',
            type: CardProductContentItemType.IMAGE,
            data: {
              filepath:
                'booklet/themes/example-images/jordan-bauer-274427-unsplash-linen.jpg',
              alignment: AlignmentType.CENTER,
              width: 132,
              height: 187,
            },
          },
          {
            id: 'uz3c5q0m',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'ft13d',
                    text: 'Always in our hearts',
                    type: 'header-four',
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
              margin: [15, 0],
              width: 132,
              height: 11,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'g3ybn9tn',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '9mo91',
                    text: 'Welcome',
                    type: 'header-four',
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
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '7awhb9n9',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'edufq',
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
              margin: [5, 0],
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'qib8cour',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 24,
            },
          },
          {
            id: 'h11koudn',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '72v2h',
                    text: 'Hymn, Tears In Heaven',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'qgxlc9rn',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '2pm4e',
                    text: 'Sung by, Ivan Angelheart',
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
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'kqsjcbmj',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 24,
            },
          },
          {
            id: 'ds6bp5b8',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '3so3u',
                    text: 'Poem, Poem Name',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'nuyje8jh',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'f30t',
                    text: 'John Goodperson',
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
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'qc9kn8mt',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 25,
            },
          },
          {
            id: '9cnyme64',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cs1ua',
                    text: 'First Tribute',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'g6bofg56',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '6q58c',
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
              margin: [5, 0],
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '1bhgpb30',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 23,
            },
          },
          {
            id: 'rgyoxui9',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'e0oec',
                    text: 'Second Tribute',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'nskvhs1o',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '4j62j',
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
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '9j86kcn8',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 25,
            },
          },
          {
            id: '7ym29wbi',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'bqtk4',
                    text: 'Address',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '1z8ayrz8',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '61f17',
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
              margin: [5, 0],
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'ee6jhyom',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 27,
            },
          },
          {
            id: 'sl4tu191',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'eao43',
                    text: 'Hymn, When September Ends',
                    type: 'header-four',
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
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'p8q9bt2l',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '75fu3',
                    text: 'Sung by, Ivan Angelheart',
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
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'gfjaj3ck',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 23,
            },
          },
          {
            id: 'englrqf6',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'vfr6',
                    text: 'Words of Farewell',
                    type: 'header-four',
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
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        background: {
          image: {
            filepath: 'backgroundImages/Linen/AU/Linen_BOOKMARK_BACK.jpg',
          },
        },
        rows: [
          {
            id: 'drzbhqqy',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: '8syir7bg',
            type: CardProductContentItemType.IMAGE,
            data: {
              filepath: 'bookmark/themes/example-images/linen-back-profile.png',
              alignment: AlignmentType.CENTER,
              width: 132,
              height: 160,
            },
          },
          {
            id: 'ndpi1z2l',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 17,
            },
          },
          {
            id: '5v2o38uf',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '6lo4u',
                    text: 'You left us beautiful memories, your love is still our guide, ',
                    type: 'header-six',
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
                  {
                    key: 'ba6r0',
                    text: 'and although we can not see you, you are always at our side.',
                    type: 'header-six',
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
              margin: [5, 0],
              width: 132,
              height: 112,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'ndmgl62l',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 175,
            },
          },
          {
            id: 'eua58pfe',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cnf6f',
                    text: '{{{deceasedName}}}',
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
              margin: [10.5, 0],
              width: 132,
              height: 80,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'r843zux0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            data: {
              content: {
                blocks: [
                  {
                    key: '8cvab',
                    text: '{{{dateOfBirth}}}',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [3.5, 0],
              width: 132,
              height: 20,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'r843puy0',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            data: {
              content: {
                blocks: [
                  {
                    key: '8zv1b',
                    text: '{{{dateOfDeath}}}',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [3.5, 0],
              width: 132,
              height: 20,
              alignment: AlignmentType.CENTER,
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
    defaultContent: [
      {
        rows: [
          {
            id: 'reflection-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            id: 'lyzzcscr',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 5,
            },
          },
          {
            id: 'zc2139nx',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '73pmq',
                    text: 'Always in our hearts',
                    type: 'header-six',
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
              margin: [5, 0],
              width: 132,
              height: 45,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '85zzcscr',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 160,
            },
          },
          {
            id: '09cuoe77',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'bgrhm',
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
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
              style: 'unstyled',
              margin: [16, 0],
              width: 132,
              height: 101,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'tjg3h0xm',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: '9hqe8',
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 150,
              height: 34,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: '69zlottc',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '6o8ej',
                    text: 'The Lord’s Prayer',
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
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'k2df0sr6',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '3bq1i',
                    text: 'Our Father who art in heaven',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'aiidg',
                    text: 'hallowed be thy name. ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'bmdm2',
                    text: 'Thy kingdom come. ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1vdr6',
                    text: 'Thy will be done, ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'drekf',
                    text: 'on Earth as it is in Heaven. ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'ctuor',
                    text: 'Give us this day our daily bread; ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'ct9pv',
                    text: 'and forgive us our trespasses, ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'colfc',
                    text: 'as we forgive those who trespass against us; ',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dd2mi',
                    text: 'and lead us not into temptation,',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4k0lg',
                    text: ' but deliver us from evil.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6v74h',
                    text: '',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '31t8q',
                    text: 'For thine is the Kingdom,',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'et9as',
                    text: 'and the power, and the glory,',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3p0fm',
                    text: 'for ever and ever',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'agct8',
                    text: 'Amen.',
                    type: 'unstyled',
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
              width: 132,
              height: 215,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '5fm08h19',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 24,
            },
          },
          {
            id: 'lwnxejm3',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'f1veu',
                    text: 'Commital',
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
              margin: [22, 0],
              width: 132,
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'o1ez5z66',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 19,
            },
          },
          {
            id: 'azex3dsg',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '4v7dg',
                    text: 'Eulogy',
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
              margin: [1.5, 0],
              width: 132,
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '8efn4vld',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '6strl',
                    text: 'Simone Langmoore',
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
              width: 132,
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '3lw4vyp0',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 19,
            },
          },
          {
            id: '1pwjbwsh',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'ajkia',
                    text: 'Blessing and Dismissal',
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
              margin: [18.5, 0],
              width: 132,
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'y00ybamu',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 18,
            },
          },
          {
            id: 'q4w9bbxf',
            type: CardProductContentItemType.IMAGE,
            data: {
              filepath:
                'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
              alignment: AlignmentType.CENTER,
              width: 132,
              height: 132,
            },
          },
          {
            id: '7s1kc6j0',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '14qgd',
                    text: 'Always in our hearts',
                    type: 'header-six',
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
              margin: [10, 0],
              width: 132,
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'i5ic1f7b',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '5ghmb',
                    text: 'Appreciation',
                    type: 'header-four',
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
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'p8e5ebah',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'bfhjj',
                    text: 'The family would like to thank you for your support',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'albga',
                    text: 'during this time of sadness. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e3g8d',
                    text: '',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'edh',
                    text: 'Please join us at the Pacific Room, Intercontinental',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '39jr1',
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
              width: 132,
              height: 65,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        border: {
          color: 'black',
          borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
          thickness: CardProductBorderThicknessType.THIN,
        },
        rows: [
          {
            id: 'y00ybamu',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 100,
            },
          },
          {
            id: 'p8e5ebah',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'bfhjj',
                    text: 'You are near,',
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
                    key: 'albga',
                    text: "even if I don't ",
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
                    key: 'e3g8d',
                    text: 'see you.',
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
                    key: 'edh',
                    text: 'You are with me,',
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
                    key: '39jr1',
                    text: 'even if you are',
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
                    key: '39jr3',
                    text: 'far avay.',
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
                    key: 'v9jr1',
                    text: 'you are in',
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
                    key: '9jfb1',
                    text: 'my heart',
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
                    key: 'cccr1',
                    text: 'in my thoughts,',
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
                    key: 'mckfd',
                    text: 'in m life always',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 132,
              height: 168,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'y0cggamu',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 160,
            },
          },
          {
            id: '02vuoe77',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'bgrhm',
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
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
              style: 'unstyled',
              margin: [16, 0],
              width: 132,
              height: 101,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'tjd3h0xm',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: '9hqe8',
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 150,
              height: 40,
              alignment: AlignmentType.CENTER,
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
    defaultContent: [
      {
        rows: [
          {
            id: 'exrpjvlz',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'b33p',
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: '#c59acd',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [5, 0],
              width: 132,
              height: 84,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'vop4ewnt',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 30,
            },
          },
          {
            id: 'grace-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            id: 'mzv5lz9h',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 162,
            },
          },
          {
            id: 'xic35fmq',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'ffsc0',
                    text: 'In Loving Memory',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 132,
              height: 25,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'afouzj09',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cqobn',
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 150,
              height: 34,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'jv9r9jby',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '9m9mo',
                    text: 'Welcome',
                    type: 'header-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'fis83',
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
              margin: [5, 0],
              width: 132,
              height: 58,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'og2advpc',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 22,
            },
          },
          {
            id: 'kj4bu0c0',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '4on6g',
                    text: 'Hymn, Abide With Me',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2ld3v',
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
              margin: [3, 0],
              width: 132,
              height: 28,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'a4ufudle',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: '98cy8923',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'a7nnf',
                    text: 'First Tribute',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dtivn',
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
              margin: [5, 0],
              width: 132,
              height: 28,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'jnzbe337',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'kupxv5hx',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '80l42',
                    text: 'Second Tribute',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '289eu',
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
              width: 132,
              height: 28,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'mkod9e87',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'd6w0l0ub',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'dlpd1',
                    text: 'The Lord’s Prayer',
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
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '05jy4z7j',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'p1t88jx6',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '8uong',
                    text: 'Address',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'a92js',
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
              margin: [5, 0],
              width: 132,
              height: 28,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'euo8a0wn',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'p8ufon86',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '8pvgu',
                    text: 'Hymn, When September Ends',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '11r9n',
                    text: 'Sung by, Ivan Angelheart',
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
              width: 132,
              height: 28,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'a5c3fsz2',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
            },
          },
          {
            id: 'uf11a82n',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cq2f6',
                    text: 'Words of Farewell',
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
              height: 15,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: '8gvlxh9c',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 84,
            },
          },
          {
            id: 'y60s1o96',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'dq4ar',
                    text: 'The Lord’s Prayer',
                    type: 'header-six',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 360,
              height: 29,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '4qj6essg',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'fa0b1',
                    text: 'Our Father who art in heaven',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'fgpq0',
                    text: 'hallowed be thy name. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5m4if',
                    text: 'Thy kingdom come. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'bbno2',
                    text: 'Thy will be done, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '224in',
                    text: 'on Earth as it is in Heaven.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'gnrd',
                    text: '',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '10cjb',
                    text: 'Give us this day our daily bread; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '9r074',
                    text: 'and forgive us our trespasses, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5oqie',
                    text: 'as we forgive those who trespass against us; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '72jh9',
                    text: 'and lead us not into temptation,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '8oibj',
                    text: ' but deliver us from evil.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'bpf9g',
                    text: '',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'ferul',
                    text: 'For thine is the Kingdom,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'b2d0m',
                    text: 'and the power, and the glory,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1akg4',
                    text: 'for ever and ever',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6falt',
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
              margin: [4.5, 0],
              width: 312,
              height: 208,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'mdvkgr2j',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '9obmh',
                    text: "The Lord's Prayer",
                    type: 'header-six',
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
              style: 'unstyled',
              margin: [5, 0],
              width: 150,
              height: 22,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 't3h23wr8',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 40,
            },
          },
          {
            id: 'hskdgfn2',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '9686k',
                    text: 'Our Father who art in heaven',
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
                    key: 'camd2',
                    text: 'hallowed be thy name',
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
                    key: '8tllx',
                    text: 'Thy kingdom come.',
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
                    key: '9vlms',
                    text: 'They will be done,',
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
                    key: 'sdbjf',
                    text: 'on Earth as it is in Heaven',
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
                    key: 'lkmfj',
                    text: 'Give us this day our daily bread',
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
                    key: 'djviw',
                    text: 'and forgive us our trespasses,',
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
                    key: 'alsvs',
                    text: 'as we forgive those who trespass',
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
                    key: 'renhf',
                    text: 'against us;',
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
                    key: 'dmvjr',
                    text: 'and lead us not into temptation,',
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
                    key: 'fmgjt',
                    text: 'but deliver us from evil.',
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
                    key: 'ancow',
                    text: 'For thine is the kingdom',
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
                    key: 'vsdfj',
                    text: 'and the power, and the glory',
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
                    key: 'vasd2',
                    text: 'for ever and ever',
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
                    key: 'cnfh2',
                    text: 'Amen.',
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
              margin: [5, 0],
              width: 132,
              height: 420,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'fvncnz1',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 40,
            },
          },
          {
            id: 'cfmvjfs',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: 'fsado',
                    text: '{{{deceasedName}}}',
                    type: 'header-six',
                    depth: 0,
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: '#c59acd',
                      },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              margin: [5.5, 0],
              width: 132,
              height: 45,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'sdfsdfmf',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: 'sdgsd8',
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
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
              margin: [5, 0],
              width: 152,
              height: 34,
              alignment: AlignmentType.CENTER,
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
    defaultContent: [
      {
        background: {
          image: {
            filepath: 'backgroundImages/Paper/AU/Paper_BOOKMARK_FRONT.jpg',
          },
        },
        rows: [
          {
            id: 'c88egct4',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '899qj',
                    text: 'In Loving Memory of',
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
              height: 17,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'ohl5harx',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            data: {
              content: {
                blocks: [
                  {
                    key: '8csdc',
                    text: '{{{deceasedName}}}',
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
              margin: [21, 0],
              width: 132,
              height: 62,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'classic-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            id: 'x0midlp4',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 232,
            },
          },
          {
            id: '7gbupeps',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: '7u8j0',
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
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
              margin: [9, 0],
              width: 132,
              height: 59,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: 'xyc2owso',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '17u5u',
                    text: 'Welcome',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '96g9h',
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-0.5, 0],
              width: 132,
              height: 31,
              alignment: AlignmentType.CENTER,
            },
          },
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
                width: 132,
                height: 37,
              },
            },
          },
          {
            id: '1vf8gw3f',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '170ra',
                    text: 'I Watch The Sunrise',
                    type: 'header-four',
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
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: '3pmpifxz',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'cighk',
                    text: 'I watch the sunrise lighting the sky, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5hlsp',
                    text: 'Casting its shadows near. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2586q',
                    text: 'And on this morning bright though it be, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '5hp8b',
                    text: 'I feel those shadows near me.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'fqu5b',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '93p0v',
                    text: 'But you are always close to me ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e56gk',
                    text: 'Following all my ways. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4e7b3',
                    text: 'May I be always close to you ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dcg52',
                    text: 'Following all your ways, Lord.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'diit4',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'appl1',
                    text: 'I watch the sunlight shine through the clouds, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1t724',
                    text: 'Warming the earth below. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3i5db',
                    text: 'And at the mid-day, life seems to say: ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'f8ssd',
                    text: 'I feel your brightness near me. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7lvp',
                    text: 'For you are always . . .',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '846b5',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7phso',
                    text: 'I watch the sunset fading away, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'deklk',
                    text: 'Lighting the clouds with sleep. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7oo02',
                    text: 'And as the evening closes its eyes, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7vpkq',
                    text: 'I feel your presence near me. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'a580i',
                    text: 'For you are always . . .',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7kt94',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'kojp',
                    text: 'I watch the moonlight guarding the night, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '4lhek',
                    text: 'Waiting till morning comes. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1e6h',
                    text: 'The air is silent, earth is at rest ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'bn2m9',
                    text: 'Only your peace is near me. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'div52',
                    text: 'Yes, you are always... ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [4, 0],
              width: 132,
              height: 351,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        rows: [
          {
            id: '6kqw8tl4',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '7ikm3',
                    text: 'First Tribute',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'ag0th',
                    text: 'Lucinda Goodperson',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [0.5, 0],
              width: 132,
              height: 31,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'y6yhyu4n',
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
                width: 132,
                height: 14,
              },
            },
          },
          {
            id: 'tfo5u294',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '93lk4',
                    text: 'The Lord’s Prayer',
                    type: 'header-four',
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
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'v3gkmqpv',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '85ok8',
                    text: 'Our Father who art in heaven',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'k28r',
                    text: 'hallowed be thy name. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '53jtq',
                    text: 'Thy kingdom come. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '461h0',
                    text: 'Thy will be done, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '71es',
                    text: 'on Earth as it is in Heaven. ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3gro5',
                    text: 'Give us this day our daily bread; ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7u3ec',
                    text: 'and forgive us our trespasses, ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6auf7',
                    text: 'as we forgive those who trespass against us; ',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e1965',
                    text: 'and lead us not into temptation,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2tl6i',
                    text: ' but deliver us from evil.',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3g04s',
                    text: '',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '94uib',
                    text: 'For thine is the Kingdom,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '37pnd',
                    text: 'and the power, and the glory,',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2n4uc',
                    text: 'for ever and ever',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dnorh',
                    text: 'Amen.',
                    type: 'paragraph-two',
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
              height: 195,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'r93q5j4w',
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
                width: 132,
                height: 14,
              },
            },
          },
          {
            id: 'qwcc06xz',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '4qt2c',
                    text: 'First Tribute',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1lq40',
                    text: 'Lucinda Goodperson',
                    type: 'paragraph-two',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [0.5, 0],
              width: 132,
              height: 31,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'gxzb7nif',
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
                width: 132,
                height: 37,
              },
            },
          },
          {
            id: 's7a6zphh',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'dh5n1',
                    text: 'G.f Handel: Thine Be All The Glory',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              style: 'unstyled',
              margin: [-1, 0],
              width: 132,
              height: 18,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'hy3ppqdz',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: 'ihla',
                    text: 'Played by John Goodperson',
                    type: 'paragraph-two',
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
              height: 13,
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
      {
        background: {
          image: {
            filepath: 'backgroundImages/Paper/AU/Paper_BOOKMARK_BACK.jpg',
          },
        },
        rows: [
          {
            id: 'xgkl2ep4',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 25,
            },
          },
          {
            id: 'y6yhyu4n',
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
                width: 132,
                height: 14,
              },
            },
          },
          {
            id: 'xgklglp4',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 15,
            },
          },
          {
            id: 'tfo5u294',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '93lk4',
                    text: 'The Lord’s Prayer',
                    type: 'header-four',
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
              width: 132,
              height: 20,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'vmlaglp4',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 15,
            },
          },
          {
            id: 'v3gkmqpv',
            type: CardProductContentItemType.TEXT,
            data: {
              content: {
                blocks: [
                  {
                    key: '85ok8',
                    text: 'Our Father who art in heaven hallowed be thy name.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '53jtq',
                    text: 'Thy kingdom come. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '461h0',
                    text: 'Thy will be done, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '71es',
                    text: 'on Earth as it is in Heaven. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3gro5',
                    text: 'Give us this day our daily bread; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7u3ec',
                    text: 'and forgive us our trespasses, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6auf7',
                    text: 'as we forgive those who trespass against us; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e1965',
                    text: 'and lead us not into temptation,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2tl6i',
                    text: ' but deliver us from evil.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3g04s',
                    text: '',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '94uib',
                    text: 'For thine is the Kingdom,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '37pnd',
                    text: 'and the power, and the glory,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2n4uc',
                    text: 'for ever and ever\n',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dnorh',
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
              width: 150,
              height: 270,
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'x0mdblg0',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 60,
            },
          },
          {
            id: 'gkbndif',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 20,
              divider: {
                asset: {
                  id: 14,
                  name: 'Divider 14',
                  filename: 'divider-14.png',
                  filepath: 'booklet/dividers/divider-14.png',
                },
                width: 132,
                height: 14,
              },
            },
          },
          {
            id: 'x0mdglp4',
            type: CardProductContentItemType.SPACE,
            data: {
              height: 90,
            },
          },
          {
            id: '4ggjpeps',
            type: CardProductContentItemType.TEXT,
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              content: {
                blocks: [
                  {
                    key: '7u8j0',
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
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
              margin: [9, 0],
              width: 132,
              height: 42,
              alignment: AlignmentType.CENTER,
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
              height: 23,
            },
            id: 'yldghtii',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 20,
                font: 'Monsieur La Doulaise',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'In Loving ',
                    type: 'header-six',
                    key: '899qj',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Memory of',
                    type: 'header-six',
                    key: 'a7kik',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 56,
            },
            id: 'c88egct4',
          },
          {
            type: 'text',
            data: {
              margin: [21, 0],
              rowStyle: {
                font: 'Raleway',
              },
              width: 132,
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
                    key: '8csdc',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 62,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'ohl5harx',
          },
          {
            id: 'gold-roses-front-img',
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
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
                width: 144,
                height: 15,
              },
              height: 40,
            },
            id: 'kzortwtt',
          },
          {
            type: 'space',
            data: {
              height: 150,
            },
            id: 'x0midlp4',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [9, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'header-five',
                    key: '7u8j0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 59,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '7gbupeps',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Gold_Roses/AU/Gold_Roses_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 25,
            },
            id: 'xgkl2ep4',
          },
          {
            type: 'space',
            data: {
              divider: {
                asset: {
                  name: 'Divider 11',
                  id: 11,
                  filename: 'divider-14.png',
                  filepath: 'booklet/dividers/divider-11.png',
                },
                width: 132,
                height: 14,
              },
              height: 38,
            },
            id: 'y6yhyu4n',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'xgklglp4',
          },
          {
            type: 'text',
            data: {
              margin: [8, 0],
              rowStyle: {
                fontSize: 24,
                font: 'Monsieur La Doulaise',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'God’s Garden',
                    type: 'header-four',
                    key: '93lk4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 34,
            },
            id: 'tfo5u294',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'vmlaglp4',
          },
          {
            type: 'text',
            data: {
              margin: [0, 0],
              rowStyle: {
                font: 'Raleway',
              },
              width: 150,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'God looked around his garden, and found an empty place,',
                    type: 'unstyled',
                    key: '85ok8',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He then looked down ',
                    type: 'paragraph-one',
                    key: 'c4q7r',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'upon the Earth,',
                    type: 'paragraph-one',
                    key: '5q6cl',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'and saw your tired face.',
                    type: 'paragraph-one',
                    key: 'fpgr2',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: 'aeilb',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He put his arms around you,',
                    type: 'paragraph-one',
                    key: '7dnqu',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'and lifted you to rest.',
                    type: 'unstyled',
                    key: '91q0n',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'God’s garden must be beautiful',
                    type: 'paragraph-one',
                    key: 'cki5f',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He always takes the best.',
                    type: 'paragraph-one',
                    key: '63eho',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: '6s6tr',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He knew that you ',
                    type: 'paragraph-one',
                    key: 'a90av',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'were suffering.',
                    type: 'paragraph-one',
                    key: 'fed9g',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He knew you were in pain.',
                    type: 'paragraph-one',
                    key: '3ehda',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He knew that you would never',
                    type: 'paragraph-one',
                    key: '9hbk9',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Get well on earth again.',
                    type: 'paragraph-one',
                    key: '5sdjn',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: '9ub8l',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'He saw the road was',
                    type: 'paragraph-one',
                    key: 'dluda',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: ' getting rough',
                    type: 'paragraph-one',
                    key: '2pmu6',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'And the hills were ',
                    type: 'paragraph-one',
                    key: 'c7kvs',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'hard to climb.',
                    type: 'paragraph-one',
                    key: '9sjge',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'So he closed your ',
                    type: 'paragraph-one',
                    key: 'bv1hl',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'weary eyelids',
                    type: 'paragraph-one',
                    key: '9gg7c',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'And whispered, ',
                    type: 'paragraph-one',
                    key: '2jlmc',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: "'Peace be thine’.",
                    type: 'paragraph-one',
                    key: 'meie',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: 'ek4qc',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'It broke our hearts to lose you,',
                    type: 'paragraph-one',
                    key: 'ai58e',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'but you didn’t go alone.',
                    type: 'paragraph-one',
                    key: '5ja3',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'For part of us went with you,',
                    type: 'paragraph-one',
                    key: '8bhv8',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The day God called you home.',
                    type: 'paragraph-one',
                    key: '509qr',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: 'eg2tk',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 434,
            },
            id: 'v3gkmqpv',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Gold_Roses/AU/Gold_Roses_BOOKMARK_BACK.jpg',
          },
        },
      },
    ],
  },
  {
    id: 'watercolor-sailing',
    name: 'Watercolor Sailing',
    thumbnail: {
      images: [sailingWatercolorBookletImage],
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
        fontSize: 44,
      },
      'header-two': {
        font: 'Cormorant',
        fontSize: 32,
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
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 14,
                font: 'Cormorant',
              },
              width: 132,
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
                    key: '899qj',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: 'c88egct4',
          },
          {
            type: 'text',
            data: {
              margin: [21, 0],
              rowStyle: {
                fontSize: 28,
                font: 'Parisienne',
              },
              width: 132,
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
                    key: '8csdc',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 78,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'ohl5harx',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'watercolor-sailing-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'space',
            data: {
              height: 195,
            },
            id: 'x0midlp4',
          },
          {
            type: 'text',
            data: {
              margin: [9, 0],
              rowStyle: {
                font: 'Cormorant',
                fontSize: 14,
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'header-five',
                    key: '7u8j0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 59,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '7gbupeps',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 22,
            },
            id: 'xgkl2ep4',
          },
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
                width: 132,
                height: 14,
              },
              height: 30,
            },
            id: 'y6yhyu4n',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'xgklglp4',
          },
          {
            type: 'text',
            data: {
              margin: [1, 0],
              rowStyle: {
                font: 'Parisienne',
                fontSize: 14,
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    key: '93lk4',
                    text: 'The Lord’s Prayer',
                    type: 'header-four',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: 'tfo5u294',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'vmlaglp4',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Cormorant',
                fontSize: 10,
              },
              width: 150,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    key: '85ok8',
                    text: 'Our Father who art in heaven hallowed be thy name.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '53jtq',
                    text: 'Thy kingdom come. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '461h0',
                    text: 'Thy will be done, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '71es',
                    text: 'on Earth as it is in Heaven. ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3gro5',
                    text: 'Give us this day our daily bread; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '7u3ec',
                    text: 'and forgive us our trespasses, ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '6auf7',
                    text: 'as we forgive those who trespass against us; ',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'e1965',
                    text: 'and lead us not into temptation,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2tl6i',
                    text: ' but deliver us from evil.',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '3g04s',
                    text: '',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '94uib',
                    text: 'For thine is the Kingdom,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '37pnd',
                    text: 'and the power, and the glory,',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '2n4uc',
                    text: 'for ever and ever\n',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'dnorh',
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
              height: 238,
            },
            id: 'v3gkmqpv',
          },
          {
            type: 'space',
            data: {
              height: 57,
            },
            id: 'x0mdblg0',
          },
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
                width: 132,
                height: 14,
              },
              height: 20,
            },
            id: 'gkbndif',
          },
          {
            type: 'space',
            data: {
              height: 80,
            },
            id: 'x0mdglp4',
          },
          {
            type: 'text',
            data: {
              margin: [9, 0],
              rowStyle: {
                font: 'Cormorant',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'paragraph-one',
                    key: '7u8j0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 42,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '4ggjpeps',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_BOOKMARK_BACK.jpg',
          },
        },
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
              height: 63,
            },
            id: '3lqxcmc6',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Old Standard TT',
              },
              width: 132,
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
                    key: '899qj',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'c88egct4',
          },
          {
            type: 'text',
            data: {
              margin: [21, 0],
              rowStyle: {
                font: 'Parisienne',
              },
              width: 132,
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
                    type: 'header-two',
                    key: '8csdc',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 62,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'ohl5harx',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'pastel-blue-roses-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'space',
            data: {
              height: 86,
            },
            id: 'x0midlp4',
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
                width: 145,
                height: 15,
              },
              height: 65,
            },
            id: '6akb7ldp',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [9, 0],
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
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'header-five',
                    key: '7u8j0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 59,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '7gbupeps',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 25,
            },
            id: 'xgkl2ep4',
          },
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
                width: 132,
                height: 14,
              },
              height: 30,
            },
            id: 'y6yhyu4n',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'xgklglp4',
          },
          {
            type: 'text',
            data: {
              margin: [1, 0],
              rowStyle: {
                font: 'Parisienne',
              },
              width: 132,
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
                    text: 'The Lord’s Prayer',
                    type: 'header-four',
                    key: '93lk4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: 'tfo5u294',
          },
          {
            type: 'space',
            data: {
              height: 15,
            },
            id: 'vmlaglp4',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Old Standard TT',
              },
              width: 150,
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
                    text: 'Our Father who art in heaven hallowed be thy name.',
                    type: 'paragraph-one',
                    key: '85ok8',
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
                    text: 'Thy kingdom come. ',
                    type: 'paragraph-one',
                    key: '53jtq',
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
                    text: 'Thy will be done, ',
                    type: 'paragraph-one',
                    key: '461h0',
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
                    text: 'on Earth as it is in Heaven. ',
                    type: 'paragraph-one',
                    key: '71es',
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
                    text: 'Give us this day our daily bread; ',
                    type: 'paragraph-one',
                    key: '3gro5',
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
                    text: 'and forgive us our trespasses, ',
                    type: 'paragraph-one',
                    key: '7u3ec',
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
                    text: 'as we forgive those who trespass against us; ',
                    type: 'paragraph-one',
                    key: '6auf7',
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
                    text: 'and lead us not into temptation,',
                    type: 'paragraph-one',
                    key: 'e1965',
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
                    text: ' but deliver us from evil.',
                    type: 'paragraph-one',
                    key: '2tl6i',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: '3g04s',
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
                    text: 'For thine is the Kingdom,',
                    type: 'paragraph-one',
                    key: '94uib',
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
                    text: 'and the power, and the glory,',
                    type: 'paragraph-one',
                    key: '37pnd',
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
                    text: 'for ever and ever\n',
                    type: 'paragraph-one',
                    key: '2n4uc',
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
                    text: 'Amen.',
                    type: 'paragraph-one',
                    key: 'dnorh',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 238,
            },
            id: 'v3gkmqpv',
          },
          {
            type: 'space',
            data: {
              height: 60,
            },
            id: 'x0mdblg0',
          },
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
                width: 132,
                height: 14,
              },
              height: 20,
            },
            id: 'gkbndif',
          },
          {
            type: 'space',
            data: {
              height: 124,
            },
            id: 'x0mdglp4',
          },
          {
            type: 'text',
            data: {
              margin: [9, 0],
              rowStyle: {
                font: 'Old Standard TT',
              },
              width: 132,
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
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'paragraph-one',
                    key: '7u8j0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 42,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '4ggjpeps',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_BOOKMARK_BACK.jpg',
          },
        },
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
    defaultContent: [
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'gkv3xlgf',
          },
          {
            type: 'text',
            data: {
              margin: [11, 0],
              rowStyle: {
                fontSize: 20,
                font: 'Dancing Script',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    key: '2oih4',
                    text: 'Celebrating',
                    type: 'header-six',
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
              height: 28,
            },
            id: 'judcggdv',
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
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [10.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 101,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'eua58pfe',
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
                width: 144,
                height: 15,
              },
              height: 65,
            },
            id: 'hg0if30s',
          },
          {
            type: 'space',
            data: {
              height: 203,
            },
            id: 'g02ew9j9',
          },
          {
            type: 'text',
            data: {
              width: 142,
              style: 'unstyled',
              margin: [5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                    type: 'paragraph-two',
                    key: '6q9cl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '0c5m4j1n',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
          color: '#B9346F',
          thickness: CardProductBorderThicknessType.MEDIUM,
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'drzbhqqy',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 132,
              alignment: AlignmentType.CENTER,
              content: {
                lockAspectRatio: false,
                width: 132,
                id: 'po7bi3op',
                type: 'rows',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -87.00689655172415,
                      renderImageWidth: 152,
                      transformX: -76,
                      renderImageHeight: 174.0137931034483,
                      type: 'image',
                    },
                    id: 'xvj2g2m7',
                  },
                ],
                height: 160,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 160,
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
              width: 132,
              style: 'unstyled',
              margin: [5, 0],
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
                    ],
                    text: 'You left us beautiful memories, your love is still our guide, ',
                    type: 'header-six',
                    key: '6lo4u',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'ITALIC',
                      },
                    ],
                    text: 'and although we can not see you, you are always at our side.',
                    type: 'header-six',
                    key: 'ba6r0',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 112,
            },
            id: '5v2o38uf',
          },
          {
            type: 'space',
            data: {
              height: 142,
            },
            id: 'ndmgl62l',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [10.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 101,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'eua58pfe',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}}',
                    type: 'paragraph-two',
                    key: '8cvab',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            id: 'r843zux0',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfDeath}}}',
                    type: 'paragraph-two',
                    key: '8zv1b',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            id: 'r843puy0',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
          color: '#B9346F',
          thickness: CardProductBorderThicknessType.MEDIUM,
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Pastel_Pink/AU/Pastel_Pink_BOOKMARK_BACK.jpg',
          },
        },
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
    defaultContent: [
      {
        rows: [
          {
            type: CardProductContentItemType.SPACE,
            data: {
              height: 15,
            },
            id: '913g9tls',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Sora',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'In Loving Memory of the Life of',
                    type: 'header-six',
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
              margin: [10, 0],
              rowStyle: {
                font: 'Neuton',
              },
              width: 132,
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
                        style: 'BOLD',
                      },
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: '{{{deceasedName}}}',
                    type: 'header-three',
                    key: '4fg91',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 34,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
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
              height: 32,
            },
            id: '0rppjzqp',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'fall-flowers-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'space',
            data: {
              height: 303,
            },
            id: 'q1og9tls',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}}\n-\n{{{dateOfDeath}}}',
                    type: 'header-six',
                    key: 'bemo4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 42,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: 'ekh9ybre',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/AU/Fall_Flowers_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [3.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Welcome',
                    type: 'header-five',
                    key: 'ca7a4',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '2vq1f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'g679s1in',
          },
          {
            type: 'space',
            data: {
              height: 29,
            },
            id: 'huiguyck',
          },
          {
            type: 'image',
            data: {
              width: 132,
              filepath:
                'booklet/themes/example-images/tracey-hocking-726156-unsplash-cropped.jpg',
              alignment: 'center',
              height: 132,
            },
            id: 'aura-front-img',
          },
          {
            type: 'space',
            data: {
              height: 34,
            },
            id: 's5p73597',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [7, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, Abide With Me',
                    type: 'header-five',
                    key: 'a5oum',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Henry Francis Lyte',
                    type: 'paragraph-one',
                    key: '8v22l',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'yo4kpivl',
          },
          {
            type: 'space',
            data: {
              height: 39,
            },
            id: 'ngq08v75',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [4.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'First Tribute',
                    type: 'header-five',
                    key: 'vs0n',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Georgie Goodperson',
                    type: 'paragraph-one',
                    key: 'f8gds',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'gah0wvzv',
          },
        ],
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [3.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Welcome',
                    type: 'header-five',
                    key: 'ca7a4',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '2vq1f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'g679s1in',
          },
          {
            type: 'space',
            data: {
              height: 29,
            },
            id: 'huiguyck',
          },
          {
            type: 'image',
            data: {
              width: 132,
              filepath:
                'booklet/themes/example-images/tracey-hocking-726156-unsplash-cropped.jpg',
              alignment: 'center',
              height: 132,
            },
            id: 'aura-front-img',
          },
          {
            type: 'space',
            data: {
              height: 34,
            },
            id: 's5p73597',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [7, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, Abide With Me',
                    type: 'header-five',
                    key: 'a5oum',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Henry Francis Lyte',
                    type: 'paragraph-one',
                    key: '8v22l',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'yo4kpivl',
          },
          {
            type: 'space',
            data: {
              height: 39,
            },
            id: 'ngq08v75',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [4.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'First Tribute',
                    type: 'header-five',
                    key: 'vs0n',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Georgie Goodperson',
                    type: 'paragraph-one',
                    key: 'f8gds',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 31,
            },
            id: 'gah0wvzv',
          },
        ],
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 67,
            },
            id: '6umm86t6',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Neuton',
              },
              width: 132,
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
                        style: 'BOLD',
                      },
                      {
                        offset: 0,
                        style: 'tan',
                      },
                    ],
                    text: 'Love is Immortal',
                    type: 'header-five',
                    key: '241aq',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'm5l3n9qw',
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
              height: 37,
            },
            id: 'jnnp9i8f',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 10,
                font: 'Sora',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Love is pure energy ',
                    type: 'paragraph-one',
                    key: 'e5ib3',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'and no matter how ',
                    type: 'paragraph-one',
                    key: '8ah0s',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'hard you try,',
                    type: 'paragraph-one',
                    key: '5kcbi',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'you can never kill love',
                    type: 'paragraph-one',
                    key: 'a0rlu',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: "Because pure energy can't die.",
                    type: 'paragraph-one',
                    key: 'l7cr',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: 'd5nci',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The feeling of ',
                    type: 'paragraph-one',
                    key: '846gi',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'love can fade,',
                    type: 'paragraph-one',
                    key: 'ep4us',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'and the body can ',
                    type: 'paragraph-one',
                    key: '13cgi',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'cease to give,',
                    type: 'paragraph-one',
                    key: '1p1ti',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'but the energy created by love is immortal',
                    type: 'paragraph-one',
                    key: '21vgi',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: ' and continues to live',
                    type: 'paragraph-one',
                    key: '4b7ar',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 196,
            },
            id: 'jth5itdq',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/AU/Fall_Flowers_BOOKMARK_BACK.jpg',
          },
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
              height: 21,
            },
            id: 'ddddfnb7',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'minimal-arch-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [0.5, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 22,
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
                        style: 'black',
                      },
                    ],
                    text: '{{{deceasedName}}}',
                    type: 'header-four',
                    key: '4eg16',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 62,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'nbyypixj',
          },
          {
            type: 'space',
            data: {
              height: 310,
            },
            id: 'h0nz5rjz',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [19, 0],
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
                    text: 'In Loving Memory',
                    type: 'header-six',
                    key: '913dj',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'l74qu3fi',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              rowStyle: {
                font: 'Alegreya',
                fontSize: 12,
              },
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
                    text: '{{{dateOfBirth}}}',
                    type: 'header-six',
                    key: '9m1ib',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            id: '66a0puy0',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              rowStyle: {
                font: 'Alegreya',
                fontSize: 12,
              },
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
                      {
                        offset: 0,
                        style: 'black',
                      },
                    ],
                    text: '{{{dateOfDeath}}}',
                    type: 'header-six',
                    key: '3w4ip',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            id: '31a0pzy0',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
        },
        background: {
          image: {
            filepath: 'backgroundImages/Blank/AU/Blank_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 21,
            },
            id: 'og7rmfoh',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 18,
                font: 'Cormorant',
              },
              width: 132,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    key: '9ohrh',
                    text: "The Lord's Prayer",
                    type: 'header-five',
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
              height: 25,
            },
            id: 'mdc2zr2y',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
                font: 'Alegreya',
                fontSize: 10,
              },
              content: {
                blocks: [
                  {
                    key: '3mn3k',
                    text: 'Our Father who art in heaven',
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
                    key: 'ai1cf',
                    text: 'hallowed be thy name',
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
                    key: '7v69g',
                    text: 'Thy kingdom come.',
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
                    key: '95fre',
                    text: 'They will be done,',
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
                    key: 'd0ra8',
                    text: 'on Earth as it is in Heaven',
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
                    key: 'dcra8',
                    text: 'Give us this day our daily bread',
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
                    key: 'zcr18',
                    text: 'and forgive us our trespasses,',
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
                    key: 'fue38',
                    text: 'as we forgive those who trespass',
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
                    key: 'zsvc2',
                    text: 'against us;',
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
                    key: 'cks14',
                    text: 'and lead us not into temptation,',
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
                    key: 'cvzw4',
                    text: 'but deliver us from evil.',
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
                    key: 'fq0qp',
                    text: 'For thine is the kingdom\nand the power, and the glory for ever and ever\n',
                    type: 'paragraph-one',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: '1e0c',
                    text: 'Amen\n',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              },
              height: 386,
            },
            id: '7tjre50r',
          },
          {
            type: 'space',
            data: {
              height: 81,
            },
            id: 'czgjwd67',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [1, 0],
              alignment: 'center',
              rowStyle: {
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
                    text: '{{{deceasedName}}}',
                    type: 'header-four',
                    key: '4eg16',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 56,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'nbnkpixj',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              rowStyle: {
                font: 'Alegreya',
                fontSize: 12,
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
                    text: '{{{dateOfBirth}}}',
                    type: 'header-six',
                    key: '8z0vb',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            id: 'r843zux0',
          },
          {
            type: 'text',
            data: {
              width: 132,
              margin: [3.5, 0],
              alignment: 'center',
              rowStyle: {
                font: 'Alegreya',
                fontSize: 12,
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
                    text: '{{{dateOfDeath}}}',
                    type: 'header-six',
                    key: '8z0vb',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfDeath,
            id: 'r843puy0',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.SINGLE_SOLID,
        },
        background: {
          image: {
            filepath: 'backgroundImages/Blank/AU/Blank_BOOKMARK_BACK.jpg',
          },
          overlayMargin: [11, 8],
        },
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
    defaultContent: [
      {
        rows: [
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'minimal-collage-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'space',
            data: {
              height: 158,
            },
            id: '85zzcscr',
          },
          {
            type: 'text',
            data: {
              margin: [16, 0],
              rowStyle: {
                font: 'Playfair Display',
              },
              width: 132,
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
                        style: 'dark-grey',
                      },
                    ],
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
                    key: 'bgrhm',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 101,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: '09cuoe77',
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
              height: 39,
            },
            id: 'lxrb4591',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Playfair Display',
              },
              width: 150,
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
                        style: 'dark-grey',
                      },
                    ],
                    text: '{{{dateOfBirth}}}',
                    type: 'paragraph-one',
                    key: '9hqe8',
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
                    text: ' -',
                    type: 'paragraph-one',
                    key: 'atpmg',
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
                    text: ' {{{dateOfDeath}}}',
                    type: 'paragraph-one',
                    key: 'b3egi',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 50,
            },
            dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
            id: 'tjg3h0xm',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.NONE,
        },
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
              width: 151,
              // originalFrameSize: 210,
              content: {
                width: 151,
                id: '4yvhyb3l',
                type: 'rows',
                items: [
                  {
                    id: 'gj232jx5',
                    type: 'content',
                    content: {
                      transformY: -75.5,
                      renderImageWidth: 151,
                      transformX: -75.5,
                      renderImageHeight: 151,
                      type: 'image',
                      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    },
                  },
                  {
                    id: 'x8f9btr8',
                    type: 'content',
                    content: {
                      transformY: -75.4921875,
                      renderImageWidth: 150.984375,
                      transformX: -75.4921875,
                      renderImageHeight: 150.984375,
                      type: 'image',
                      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    },
                  },
                  {
                    id: 'mq2bmr8m',
                    type: 'content',
                    content: {
                      transformY: -75.4921875,
                      renderImageWidth: 150.984375,
                      transformX: -75.4921875,
                      renderImageHeight: 150.984375,
                      type: 'image',
                      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    },
                  },
                ],
                height: 377,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 377,
            },
            id: 'j20ldgk7',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              /*
              filename: 'dummy-file',
              filepath: '',
              width: 149,
              alignment: AlignmentType.CENTER,
              filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
*/
              content: {
                width: 149,
                lockAspectRatio: false,
                id: 'frw5bo6i',
                type: 'rows',
                items: [
                  {
                    id: 'cl6ejg7h',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -74.4921875,
                      filename: 'dummy-file',
                      transformX: -74.4921875,
                      renderImageHeight: 148.984375,
                      renderImageWidth: 148.984375,
                      type: 'image',
                      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    },
                  },
                  {
                    id: '6ypnhyfn',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -74.4921875,
                      renderImageWidth: 148.984375,
                      transformX: -74.4921875,
                      renderImageHeight: 148.984375,
                      type: 'image',
                      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    },
                  },
                ],
                height: 267,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 267,
            },
            id: 'a56ozk6i',
          },
        ],
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
        fontSize: 32,
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
    defaultContent: [
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 16,
                font: 'Poiret One',
              },
              width: 132,
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
                    text: 'In loving memory',
                    type: 'header-six',
                    key: '2oih4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
            id: 'judcggdv',
          },
          {
            type: 'space',
            data: {
              height: 30,
            },
            id: 'gkv3xlgf',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'modern-minimal-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
          },
          {
            type: 'space',
            data: {
              height: 300,
            },
            id: 'g02ew9j9',
          },
          {
            type: 'text',
            data: {
              margin: [10.5, 0],
              rowStyle: {
                fontSize: 28,
                font: 'Poiret One',
              },
              width: 132,
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
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 39,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: 'eua58pfe',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'Jost',
              },
              width: 142,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                    type: 'paragraph-two',
                    key: '6q9cl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            id: '0c5m4j1n',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Blue_Stripe/AU/Blue_Stripe_BOOKMARK_FRONT.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 28,
                font: 'Poiret One',
              },
              width: 150,
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
                    type: 'unstyled',
                    key: 'didp5',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 39,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: '9em1mrk5',
          },
          {
            type: 'space',
            data: {
              height: 23,
            },
            id: 'gbg5q533',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 160,
              alignment: AlignmentType.CENTER,
              content: {
                lockAspectRatio: true,
                width: 150,
                id: 'ifuyyqgx',
                type: 'rows',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -76,
                      transformX: -76,
                      renderImageHeight: 152,
                      renderImageWidth: 152,
                      type: 'image',
                    },
                    id: 'xewuuvdf',
                  },
                ],
                height: 150,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 160,
            },
            id: 'r7z8k3as',
          },
          {
            type: 'space',
            data: {
              height: 35,
            },
            id: 'drzbhqqy',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 160,
              alignment: AlignmentType.CENTER,
              content: {
                lockAspectRatio: true,
                width: 150,
                id: 'ifuyyqgx',
                type: 'rows',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -76,
                      transformX: -76,
                      renderImageHeight: 152,
                      renderImageWidth: 152,
                      type: 'image',
                    },
                    id: 'xewuuvdf',
                  },
                ],
                height: 150,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 160,
            },
            id: 'f3ubiuuw',
          },
          {
            type: 'space',
            data: {
              height: 39,
            },
            id: 'liioxuv6',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 160,
              alignment: AlignmentType.CENTER,
              content: {
                lockAspectRatio: true,
                width: 150,
                id: 'ifuyyqgx',
                type: 'rows',
                items: [
                  {
                    type: 'content',
                    content: {
                      transformY: -76,
                      transformX: -76,
                      renderImageHeight: 152,
                      renderImageWidth: 152,
                      type: 'image',
                    },
                    id: 'xewuuvdf',
                  },
                ],
                height: 150,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 160,
            },
            id: '8syir7bg',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Blue_Stripe/AU/Blue_Stripe_BOOKMARK_BACK.jpg',
          },
        },
      },
    ],
  },
  {
    id: 'full-width',
    isPrimaryImageFullWidth: true,
    name: 'Full Width',
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
    defaultContent: [
      {
        rows: [
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 32,
                font: 'Monsieur La Doulaise',
              },
              width: 132,
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
                    ],
                    text: 'Always',
                    type: 'header-six',
                    key: '73pmq',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'ITALIC',
                      },
                    ],
                    text: ' in our ',
                    type: 'header-six',
                    key: '7qf3n',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        style: 'ITALIC',
                      },
                    ],
                    text: 'Hearts',
                    type: 'header-six',
                    key: 'c1qn',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 134,
            },
            id: 'zc2139nx',
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
              height: 50,
            },
            id: 'cb6ia5wn',
          },
          {
            // @ts-ignore
            type: '{{{primaryImageType}}}',
            // @ts-ignore
            data: '<<&primaryImage>>',
            id: 'full-width-front-img',
            dynamicDataId: CardProductDynamicDataKey.primaryImage,
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
            id: 'nb6ie5wn',
          },
          {
            type: 'text',
            data: {
              margin: [16, 0],
              rowStyle: {
                font: 'EB Garamond',
              },
              width: 132,
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
                        style: 'dark-grey',
                      },
                    ],
                    text: '{{{deceasedName}}}',
                    type: 'header-two',
                    key: 'bgrhm',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 67,
            },
            dynamicDataId: CardProductDynamicDataKey.deceasedName,
            id: '09cuoe77',
          },
          {
            type: 'text',
            dynamicDataId: CardProductDynamicDataKey.dobToDod,
            data: {
              margin: [5, 0],
              rowStyle: {
                font: 'EB Garamond',
              },
              width: 150,
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
                        style: 'dark-grey',
                      },
                    ],
                    text: '{{{dateOfBirth}}}\n{{{dateOfDeath}}}',
                    type: 'paragraph-one',
                    key: '9hqe8',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 34,
            },
            id: 'tjg3h0xm',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.NONE,
        },
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
              prevWidth: 150,
              width: 164,
              alignment: AlignmentType.CENTER,
              content: {
                width: 164,
                lockAspectRatio: false,
                id: 'py88nkj5',
                type: 'rows',
                items: [
                  {
                    id: 'lig00f2t',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -123.94366197183098,
                      filename:
                        'cJTjCnvBSCuip9VDVhTg_sinitta-leunen-LcHdWuAYEKo-unsplash Small.jpeg',
                      transformX: -82.5,
                      renderImageHeight: 247.88732394366195,

                      renderImageWidth: 165,
                      type: 'image',
                      filepath: 'primaryImages/OFHbQMWfQp20WSaXbbdx.jpeg',
                    },
                  },
                  {
                    id: 'gc9o8kh9',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -79,
                      filename: 'CMJqSbEQTyOTW25cZRMq_9 Small.jpeg',
                      transformX: -118.68544600938968,
                      renderImageHeight: 158,
                      renderImageWidth: 237.37089201877936,
                      type: 'image',
                      filepath: 'primaryImages/AI2ALg75QbKAw0dWDM0f.jpeg',
                    },
                  },
                ],
                height: 320,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 320,
              isFullWidth: true,
            },
            id: 'k0l7rakg',
          },
          {
            type: CardProductContentItemType.FRAME,
            data: {
              prevWidth: 150,
              width: 164,
              alignment: AlignmentType.CENTER,
              content: {
                width: 164,
                lockAspectRatio: false,
                id: 'py88nkj5',
                type: 'rows',
                items: [
                  {
                    id: 'lig00f2t',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -123.94366197183098,
                      filename:
                        '42RsFZscTRKujqWd7AKl_rafael-leao-NRnPv3Gs-Nc-unsplash Small.jpeg',
                      transformX: -82.5,
                      renderImageHeight: 247.88732394366195,
                      renderImageWidth: 165,
                      type: 'image',
                      filepath: 'primaryImages/nzvBSBFdTaWZif097ZKA.jpeg',
                    },
                  },
                  {
                    id: 'gc9o8kh9',
                    type: 'content',
                    flex: 1,
                    content: {
                      transformY: -79.5,
                      filename: 'Nb64vDYPRWikIqyXgax8_8 Small.jpeg',
                      transformX: -119.43661971830986,
                      renderImageHeight: 159,
                      renderImageWidth: 238.8732394366197,
                      type: 'image',
                      filepath: 'primaryImages/sjaGtElSqib8qim8DlYA.jpeg',
                    },
                  },
                ],
                height: 320,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              height: 320,
              isFullWidth: true,
            },
            id: '5fe3tn4i',
          },
        ],
      },
    ],
  },
])
