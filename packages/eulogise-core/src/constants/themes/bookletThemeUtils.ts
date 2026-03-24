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
  CardProductBorderCategory,
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  ICardProductFadeEdgeType,
  ICardProductTheme,
} from '../../types'

const graphicBorder = {
  borderCategory: CardProductBorderCategory.GRAPHIC,
  borderStyle: CardProductBorderType.SOSSAMON,
  color: '#76258a',
  thickness: CardProductBorderThicknessType.THIN,
}

export const attachGraphicBorder = (themes: Array<ICardProductTheme>) => {
  return themes.map((theme) => ({
    ...theme,
    defaultContent: theme.defaultContent?.map((page) => ({
      ...page,
      border: graphicBorder,
    })),
  })) as Array<ICardProductTheme>
}

export const getBookletThemes = ({
  regionContentWidth,
  regionContentHeight,
  regionFullWidth,
}: {
  regionContentWidth: number
  regionContentHeight: number
  regionFullWidth: number
}): Array<ICardProductTheme> =>
  JSON.parse(
    JSON.stringify([
      {
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
                filepath: `backgroundImages/Floral/{{{region}}}/Floral_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  height: 20,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
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
                  width: regionContentWidth,
                  height: 20,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            background: {
              image: {
                filepath: `backgroundImages/Floral/{{{region}}}/Floral_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  height: 84,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
        defaultContent: [
          {
            background: {
              image: {
                filepath: `backgroundImages/Beach/{{{region}}}/Beach_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
            rows: [
              {
                id: 'grandeur-front-img',
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                id: 'h0nz5rjz',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
                },
              },
              {
                id: '66a0pzyx',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9m1ib',
                        text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
              },
              {
                id: 'nbyypixj',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '4eg16',
                        text: '{{{deceasedName}}}',
                        type: '{{{deceasedNameFontType}}}',
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
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              },
              {
                id: 'hcnz5hjz',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
                },
              },
              {
                id: 'ju8xuzx1',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7rk74',
                        text: '{{{location}}}',
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
                  style: 'unstyled',
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
              },
              {
                id: 'j28c2cdz',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'e9s6f',
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
                  style: 'unstyled',
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
              },
            ],
          },
          {
            background: {
              image: {
                filepath: `backgroundImages/Beach/{{{region}}}/Beach_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
              overlayColor: '#ffffff',
              overlayOpacity: 0.85,
              overlayMargin: [11, 8],
            },
            rows: [
              {
                id: 'n1647zxb',
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'm1647zib',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'yg7xcss0',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                        key: '8dfio',
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
                  margin: [3, 0],
                  width: regionContentWidth,
                  height: 24,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '213mplrw',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                  width: regionContentWidth,
                  height: 23,
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
                id: 'ugt3230a',
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'ugt34l0a',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '0vp3cvpb',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'dcm03fw5',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 23,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'npxxvsps',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 16,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            background: {
              image: {
                filepath: `backgroundImages/Beach/{{{region}}}/Beach_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
              overlayColor: '#ffffff',
              overlayOpacity: 0.85,
              overlayMargin: [11, 8],
            },
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
                  width: regionContentWidth,
                  height: 23,
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
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '8307j',
                        text: 'The darkness deepens; Lord with me abide.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '2ds6b',
                        text: 'When other helpers fail and comforts flee,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '893le',
                        text: 'Help of the helpless, O abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '94qcr',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5nlrv',
                        text: "Swift to its close ebbs out life's little day;",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '79jah',
                        text: "Earth's joys grow dim; its glories pass away;",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '538u',
                        text: 'Change and decay in all around I see;',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '49eri',
                        text: 'O Thou who changest not, abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7ori8',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7nd8f',
                        text: 'Not a brief glance I beg, a passing word,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '6pcur',
                        text: "But as Thou dwell'st with Thy disciples, Lord,",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4qgdh',
                        text: 'Familiar, condescending, patient, free.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'f57c8',
                        text: 'Come not to sojourn, but abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '9be65',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'fvebn',
                        text: 'Thou on my head in early youth didst smile,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'e5hf9',
                        text: 'And though rebellious and perverse meanwhile,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'b8v2b',
                        text: 'Thou hast not left me, oft as I left Thee.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ccjid',
                        text: 'On to the close, O Lord, abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '6h96c',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7iue4',
                        text: 'I need Thy presence every passing hour.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'cbt9g',
                        text: "What but Thy grace can foil the tempter's power?",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5tm37',
                        text: 'Who, like Thyself, my guide and stay can be?',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'cqfa6',
                        text: 'Through cloud and sunshine, Lord, abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4i2ot',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'otkv',
                        text: 'I fear no foe, with Thee at hand to bless;',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '6o0ug',
                        text: 'Ills have no weight, and tears no bitterness.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '8a1mu',
                        text: "Where is death's sting? Where, grave, thy victory?",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5jrph',
                        text: 'I triumph still, if Thou abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4r92g',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'egon5',
                        text: 'Hold Thou Thy cross before my closing eyes;',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '2sr1m',
                        text: 'Shine through the gloom and point me to the skies.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5lf8r',
                        text: "Heaven's morning breaks, and earth's vain shadows flee;",
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '51uqc',
                        text: 'In life, in death, O Lord, abide with me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                    ],
                    entityMap: {},
                  },
                  margin: [3, 0],
                  width: regionContentWidth,
                  height: 476,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            background: {
              image: {
                filepath: `backgroundImages/Beach/{{{region}}}/Beach_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
              },
              overlayColor: '#ffffff',
              overlayOpacity: 0.85,
              overlayMargin: [11, 8],
            },
            rows: [
              {
                id: 'og7rmfoh',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 14,
                },
              },
              {
                id: '7j8yn34d',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    id: 'vli1wffz',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -128.5,
                          renderImageWidth: regionContentWidth,
                          transformX: -179.5757097791798,
                          renderImageHeight: 257,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-cropped.jpg',
                        },
                        id: 'q0nup4ud',
                      },
                    ],
                    height: 257,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 257,
                },
              },
              {
                id: 't3hx3wi8',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 62,
                },
              },
              {
                id: 'med4zr2y',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9ohrh',
                        text: 'Thank You',
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
                  width: regionContentWidth,
                  height: 14,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 't3hcwi8z',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 14,
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
                        text: 'The family would like to thank you for your support',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ai1cf',
                        text: 'during this time of sadness. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7v69g',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '95fre',
                        text: `Please join us at the Pacific Room, Intercontinental`,
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'd0ra8',
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
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 62,
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
          font: 'EB Garamond',
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
                filepath: `backgroundImages/Linen/{{{region}}}/Linen_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
            rows: [
              {
                id: 'eua58pfe',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'cnf6f',
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              },
              {
                id: '0c5m4j1n',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '6q9cl',
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
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
              },
              {
                id: '02ecas19',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 14,
                },
              },
              {
                id: 'linen-front-img',
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                id: 'g02ew9j9',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 10,
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
                  width: regionContentWidth,
                  height: 34,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'h01vzsdv',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 31,
                },
              },
              {
                id: 'zvms2zx1',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7zk71',
                        text: '{{{location}}}',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
              },
              {
                id: 'jad2c2xz',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '34s6f',
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
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
                id: '7fpzbhoz',
                type: CardProductContentItemType.FRAME,
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
                    height: 415,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 415,
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
                  width: regionContentWidth,
                  height: 22,
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
                        key: '9mo911',
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
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 14,
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            background: {
              image: {
                filepath: `backgroundImages/Linen/{{{region}}}/Linen_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
              },
            },
            rows: [
              {
                id: 'drzbhqqy',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 50,
                },
              },
              {
                id: '8syir7bg',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    id: 'hhibe4du',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -128.6004514672686,
                          renderImageWidth: regionContentWidth,
                          transformX: -180,
                          renderImageHeight: 257.2009029345372,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/kinga-cichewicz-587833-unsplash.jpg',
                        },
                        id: '6qgzrgw5',
                      },
                    ],
                    height: 257,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 257,
                },
              },
              {
                id: 'ndpi1z2l',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 28,
                },
              },
              {
                id: 'muzwt5um',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '8i0g',
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
                  margin: [1, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'ndpcvz2l',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 28,
                },
              },
              {
                id: 'zaap2qqn',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'a24o2',
                        text: 'The family would like to thank you for your support',
                        type: 'header-six',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'adg8a',
                        text: 'during this time of sadness. ',
                        type: 'header-six',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '9vm27',
                        text: '',
                        type: 'header-six',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'evlmd',
                        text: `Please join us at the Pacific Room, Intercontinental`,
                        type: 'header-six',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'dmvmu',
                        text: 'Hotel for refreshments',
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 98,
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
            fontSize: 16,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                id: 'reflection-front-img',
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                id: '09cuoe77',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'bgrhm',
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
                  margin: [9, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              },
              {
                id: 'tjg3h0xm',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9hqe8',
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
                  style: 'unstyled',
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
              },
              {
                id: 'ly14btcr',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 20,
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
                        text: 'Service',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'q3acuzqr',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '3lipa',
                        text: '{{{location}}}',
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
                  width: regionContentWidth,
                  height: 26,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
              },
              {
                id: 'q3azuzcv',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '36l6i',
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
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
                id: 'm9acv2mu',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'dnmej',
                        text: 'Welcome',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'msccv2mu',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'aeqnr',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'que9u0sj',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 24,
                },
              },
              {
                id: 'pjyqu6ky',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 251,
                  content: {
                    width: 251,
                    id: 'pkky7700',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -94.5,
                          renderImageWidth: 251,
                          transformX: -125.5,
                          renderImageHeight: 189,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/reflection-booklet-p2-joao-silas-636902.jpg',
                        },
                        id: 'yknd4ojb',
                      },
                    ],
                    height: 189,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 189,
                },
              },
              {
                id: 'vn8n7cey',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 24,
                },
              },
              {
                id: 'cv5b3hdf',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'av87k',
                        text: 'Ava Maria',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '075b3hdf',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '8bk3r',
                        text: 'Sung by, Innes Heart',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'zpxkusmu',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 24,
                },
              },
              {
                id: 'fl8hv3hk',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9r81s',
                        text: 'Poem',
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'fl8hb3hk',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'fjcm6',
                        text: 'Reading by Lucinda Goodperson',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'w5j413q1',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 33,
                },
              },
              {
                id: '3q81kn56',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '1eksu',
                        text: 'First Tribute',
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
                  margin: [5.5, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '3q81cc56',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'f61lr',
                        text: 'Georgie Goodperson',
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
                  margin: [5.5, 0],
                  width: regionContentWidth,
                  height: 14,
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'wcsa13qx',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
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
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'aiidg',
                        text: 'hallowed be thy name. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'bmdm2',
                        text: 'Thy kingdom come. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '1vdr6',
                        text: 'Thy will be done, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'drekf',
                        text: 'on Earth as it is in Heaven. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ctuor',
                        text: 'Give us this day our daily bread; ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ct9pv',
                        text: 'and forgive us our trespasses, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'colfc',
                        text: 'as we forgive those who trespass against us; ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'dd2mi',
                        text: 'and lead us not into temptation,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4k0lg',
                        text: ' but deliver us from evil.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '6v74h',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '31t8q',
                        text: 'For thine is the Kingdom,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'et9as',
                        text: 'and the power, and the glory,',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '3p0fm',
                        text: 'for ever and ever',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'agct8',
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
                  margin: [3.5, 0],
                  width: regionContentWidth,
                  height: 252,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '5fm08h19',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
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
                  margin: [18, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'o1ez5z66',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
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
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '3lw4vyp0',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
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
                id: 'y00ybamu',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 18,
                },
              },
              {
                id: 'q4w9bbxf',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    id: 'kkas0uz1',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -(regionContentHeight / 2),
                          renderImageWidth: regionContentWidth,
                          transformX: -(regionContentWidth / 2),
                          renderImageHeight: regionContentHeight,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
                        },
                        id: '82kyinw0',
                      },
                    ],
                    height: regionContentHeight,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: regionContentHeight,
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
                  margin: [10, 0],
                  width: regionContentWidth,
                  height: 17,
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
                  width: regionContentWidth,
                  height: 22,
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
                  width: regionContentWidth,
                  height: 84,
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
          headerHeight: 28,
          paragraphHeight: 134,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                id: 'xic35fmq',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'ffsc0',
                        text: 'In Loving Memory of the Life of',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              },
              {
                id: 'afouzj09',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'cqobn',
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
                  style: 'unstyled',
                  margin: [5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
              },
              {
                id: 'grace-front-img',
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                id: 'sadkv2if',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9j154',
                        text: 'Service',
                        type: 'header-six',
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
                  margin: [3.5, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'j23vsudz',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7rk34',
                        text: '{{{location}}}',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
              },
              {
                id: 'ju8384x1',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '29s6f',
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
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
                  margin: [1, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'jv9cvjby',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 29,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'og2advpc',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [3, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'kj4cv0c0',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'a4ufudle',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 28,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '98cyvz23',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'jnzbe337',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [1.5, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'kuxvcc1x',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'mkod9e87',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: '05jy4z7j',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
                },
              },
              {
                id: 'p1t2sjx6',
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
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'p1t88jx6',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'euo8a0wn',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [2.5, 0],
                  width: regionContentWidth,
                  height: 22,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'b8ufon80',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'a5c3fsz2',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 16,
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
                  margin: [4, 0],
                  width: regionContentWidth,
                  height: 22,
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
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                    ],
                    entityMap: {},
                  },
                  style: 'unstyled',
                  margin: [7.5, 0],
                  width: regionContentWidth,
                  height: 22,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 269,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            rows: [
              {
                id: 'zsypnc24',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 235,
                  content: {
                    width: 235,
                    id: 'qrwxg69s',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -(regionContentHeight / 2),
                          renderImageWidth: 261,
                          transformX: -130.5,
                          renderImageHeight: regionContentHeight,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/grace-theme-p4-portrait-les-anderson-189376-b-w.jpg',
                        },
                        id: 'i12ox78i',
                      },
                    ],
                    height: 300,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 300,
                },
              },
              {
                id: '05jyeecj',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 20,
                },
              },
              {
                id: 'jv3r4jby',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9c9eo',
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
                  margin: [8, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'tthvkrxz',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7d9il',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '2igoc',
                        text: 'The family would like to thank you for your support',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '3kuev',
                        text: 'during this time of sadness. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'fbv5t',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ennku',
                        text: `Please join us at the Pacific Room, Intercontinental`,
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'adar7',
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
                  margin: [8.5, 0],
                  width: regionContentWidth,
                  height: 101,
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
          headerHeight: 31,
          paragraphHeight: 84,
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
                filepath: `backgroundImages/Paper/{{{region}}}/Paper_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
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
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
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
                  margin: [21, 0],
                  width: regionContentWidth,
                  height: 45,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              },
              {
                id: 'classic-front-img',
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                id: '7gbupeps',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7s8j0',
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
                  margin: [2, 0],
                  width: regionContentWidth,
                  height: 20,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
              },
              {
                id: 'x0uvdlp4',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 30,
                },
              },
              {
                id: 'sny073sl',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'hmak',
                        text: 'Service',
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
                  width: regionContentWidth,
                  height: 31,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'ql43ttaz',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '9nh7s',
                        text: '{{{location}}}',
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
                  width: regionContentWidth,
                  height: 26,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
              },
              {
                id: 'ql43tteb',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: 'dsoca',
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
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
                  width: regionContentWidth,
                  height: 20,
                  alignment: AlignmentType.CENTER,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
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
                id: 'xcv2owso',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '17u5u',
                        text: 'Welcome',
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 31,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'xyc2owso',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '96g9h',
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 16,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'uv5wn88h',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 37,
                  divider: {
                    asset: {
                      id: 14,
                      name: 'Divider 14',
                      filename: 'divider-14.png',
                      filepath: 'booklet/dividers/divider-14.png',
                    },
                    width: regionContentWidth,
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
                  margin: [3, 0],
                  width: regionContentWidth,
                  height: 31,
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
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5hlsp',
                        text: 'Casting its shadows near. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '2586q',
                        text: 'And on this morning bright though it be, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '5hp8b',
                        text: 'I feel those shadows near me.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'fqu5b',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '93p0v',
                        text: 'But you are always close to me ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'e56gk',
                        text: 'Following all my ways. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4e7b3',
                        text: 'May I be always close to you ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'dcg52',
                        text: 'Following all your ways, Lord.',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'diit4',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'appl1',
                        text: 'I watch the sunlight shine through the clouds, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '1t724',
                        text: 'Warming the earth below. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '3i5db',
                        text: 'And at the mid-day, life seems to say: ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'f8ssd',
                        text: 'I feel your brightness near me. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7lvp',
                        text: 'For you are always . . .',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '846b5',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7phso',
                        text: 'I watch the sunset fading away, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'deklk',
                        text: 'Lighting the clouds with sleep. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7oo02',
                        text: 'And as the evening closes its eyes, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7vpkq',
                        text: 'I feel your presence near me. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'a580i',
                        text: 'For you are always . . .',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '7kt94',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'kojp',
                        text: 'I watch the moonlight guarding the night, ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '4lhek',
                        text: 'Waiting till morning comes. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '1e6h',
                        text: 'The air is silent, earth is at rest ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'bn2m9',
                        text: 'Only your peace is near me. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'div52',
                        text: 'Yes, you are always... ',
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
                  margin: [4, 0],
                  width: regionContentWidth,
                  height: 378,
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
                id: '6kqw8tl4',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7ikm3',
                        text: 'First Tribute',
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
                  margin: [0.5, 0],
                  width: regionContentWidth,
                  height: 31,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'vaz1a1nx',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '2x1vf',
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
                  margin: [3.5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'y6yhyu4n',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 37,
                  divider: {
                    asset: {
                      id: 14,
                      name: 'Divider 14',
                      filename: 'divider-14.png',
                      filepath: 'booklet/dividers/divider-14.png',
                    },
                    width: regionContentWidth,
                    height: 37,
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
                  margin: [1, 0],
                  width: regionContentWidth,
                  height: 31,
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
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'k28r',
                        text: 'hallowed be thy name. ',
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
                        text: 'for ever and ever',
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
                  width: regionContentWidth,
                  height: 210,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'r93q5j4w',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 37,
                  divider: {
                    asset: {
                      id: 14,
                      name: 'Divider 14',
                      filename: 'divider-14.png',
                      filepath: 'booklet/dividers/divider-14.png',
                    },
                    width: regionContentWidth,
                    height: 37,
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
                        text: 'Second Tribute',
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
                  margin: [0.5, 0],
                  width: regionContentWidth,
                  height: 31,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'g6csa1nx',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '1lq41',
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
                  margin: [3.5, 0],
                  width: regionContentWidth,
                  height: 17,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'gxzb7nif',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 37,
                  divider: {
                    asset: {
                      id: 14,
                      name: 'Divider 14',
                      filename: 'divider-14.png',
                      filepath: 'booklet/dividers/divider-14.png',
                    },
                    width: regionContentWidth,
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
                  margin: [0, 0],
                  width: regionContentWidth,
                  height: 31,
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
                  width: regionContentWidth,
                  height: 14,
                  alignment: AlignmentType.CENTER,
                },
              },
            ],
          },
          {
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            background: {
              image: {
                filepath: `backgroundImages/Paper/{{{region}}}/Paper_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
              },
            },
            rows: [
              {
                id: '3fvlxh9c',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 64,
                },
              },
              {
                id: 'x63rfjol',
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 230,
                  content: {
                    width: 230,
                    id: 'h9kevzur',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -127.5,
                          renderImageWidth: 245.6934306569343,
                          transformX: -122.84671532846716,
                          renderImageHeight: 255,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/classic-background-last-page.jpg',
                        },
                        id: 'ro4drgi1',
                      },
                    ],
                    height: 242,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 242,
                },
              },
              {
                id: '3fvlzi9c',
                type: CardProductContentItemType.SPACE,
                data: {
                  height: 30,
                },
              },
              {
                id: 'uj5oxn1o',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '7r3up',
                        text: 'Appreciation',
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
                  width: regionContentWidth,
                  height: 31,
                  alignment: AlignmentType.CENTER,
                },
              },
              {
                id: 'wt9fc1g7',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        key: '5tr4e',
                        text: 'The family would like to thank you for your support during',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'cnr2f',
                        text: 'this time of sadness. ',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'ifkj',
                        text: '',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '15q7p',
                        text: 'Please join us at the Pacific Room, Intercontinental Hotel',
                        type: 'paragraph-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'dhc6u',
                        text: 'for refreshments',
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
                  width: regionContentWidth,
                  height: 84,
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
          headerHeight: 31,
          paragraphHeight: 84,
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
                type: 'text',
                data: {
                  margin: [6.5, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'In Loving ',
                        type: 'header-one',
                        key: '8csdc',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Memory ',
                        type: 'header-one',
                        key: '8daoa',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 90,
                },
                id: 'ohl5harx',
              },
              {
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'classic-front-img',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                type: 'text',
                data: {
                  margin: [2, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 30,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{deceasedName}}}',
                        type: 'unstyled',
                        key: 'bvju',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 42,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: 'ddiloc1m',
              },
              {
                type: 'text',
                data: {
                  margin: [2, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                        type: 'header-five',
                        key: '7s8j0',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: '7gbupeps',
              },
              {
                type: 'space',
                data: {
                  height: 21,
                },
                id: 'x0uvdlp4',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 28,
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Service',
                        type: 'header-two',
                        key: 'hmak',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 39,
                },
                id: 'sny073sl',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 12,
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{location}}}',
                        type: 'header-five',
                        key: '9nh7s',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'ql43ttaz',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 12,
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'header-five',
                        key: 'dsoca',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'ql43tteb',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.NONE,
            },
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Welcome',
                        type: 'header-two',
                        key: '17u5u',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'xcv2owso',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
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
                        key: '96g9h',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'xyc2owso',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 65,
                },
                id: 'uv5wn88h',
              },
              {
                type: 'text',
                data: {
                  margin: [3, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "God's Garden",
                        type: 'header-two',
                        key: '170ra',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '1vf8gw3f',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'God looked around his garden and found an empty place, ',
                        type: 'paragraph-one',
                        key: 'cighk',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'He then looked down upon the earth and saw your tired face. ',
                        type: 'paragraph-one',
                        key: '21f0u',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'He put his arms around you And lifted you to rest. ',
                        type: 'paragraph-one',
                        key: '1pqb3',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'God’s garden must be beautiful , he always takes the best. ',
                        type: 'paragraph-one',
                        key: '9580n',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'He knew that you were suffering He knew you were in pain. ',
                        type: 'paragraph-one',
                        key: 'eo216',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'He knew that you would never Get well on Earth again. ',
                        type: 'paragraph-one',
                        key: '5f6em',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'He saw the road was getting rough And the hills were hard to climb. ',
                        type: 'paragraph-one',
                        key: 'eba08',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "So he closed your weary eyelids And whispered, 'Peace be thine’.",
                        type: 'paragraph-one',
                        key: '81nu8',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: ' It broke our hearts to lose you But you didn’t go alone, ',
                        type: 'paragraph-one',
                        key: 'a1mdh',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'For part of us went with you, ',
                        type: 'paragraph-one',
                        key: '5n312',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The day God called you home.',
                        type: 'paragraph-one',
                        key: 'c4k2i',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 154,
                },
                id: '3pmpifxz',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 305,
                  //                originalFrameSize: 210,
                  content: {
                    lockAspectRatio: false,
                    width: 180.4725,
                    id: 'pzxe506q',
                    type: 'rows',
                    items: [
                      {
                        id: '7sjav6n4',
                        borderRadius: '.5rem',
                        type: 'content',
                        content: {
                          transformY: -90.5,
                          filename:
                            'uRhGx1gGTCexvbRb8Qlj_tatiana-gonzales-179948-unsplash Small.jpeg',
                          transformX: -184.00236966824644,
                          renderImageHeight: 181,
                          renderImageWidth: 274.50236966824644,
                          type: 'image',
                          filepath: 'primaryImages/wjzvA08RCqnU8m8EHqJM.jpeg',
                        },
                      },
                    ],
                    height: 180.4725,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 210,
                },
                id: 'zi1jd5og',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'space',
                data: {
                  divider: {
                    asset: {
                      name: 'Divider 20',
                      filepath: null,
                      id: null,
                    },
                  },
                  height: 11,
                },
                id: 'zglcai49',
              },
              {
                type: 'text',
                data: {
                  margin: [0.5, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'First Tribute',
                        type: 'header-two',
                        key: '7ikm3',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '6kqw8tl4',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
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
                        key: '2x1vf',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'vaz1a1nx',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 51,
                },
                id: 'y6yhyu4n',
              },
              {
                type: 'text',
                data: {
                  margin: [4.5, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The Lord’s Prayer',
                        type: 'header-two',
                        key: '93lk4',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'tfo5u294',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Our Father who art in heaven',
                        type: 'paragraph-one',
                        key: '85ok8',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'hallowed be thy name. ',
                        type: 'paragraph-one',
                        key: 'k28r',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy kingdom come. ',
                        type: 'paragraph-one',
                        key: '53jtq',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy will be done, ',
                        type: 'paragraph-one',
                        key: '461h0',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'on Earth as it is in Heaven. ',
                        type: 'paragraph-one',
                        key: '71es',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Give us this day our daily bread; ',
                        type: 'paragraph-one',
                        key: '3gro5',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and forgive us our trespasses, ',
                        type: 'paragraph-one',
                        key: '7u3ec',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'as we forgive those who trespass against us; ',
                        type: 'paragraph-one',
                        key: '6auf7',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and lead us not into temptation,',
                        type: 'paragraph-one',
                        key: 'e1965',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
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
                        inlineStyleRanges: [],
                        text: 'For thine is the Kingdom,',
                        type: 'paragraph-one',
                        key: '94uib',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and the power, and the glory,',
                        type: 'paragraph-one',
                        key: '37pnd',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'forever and ever',
                        type: 'paragraph-one',
                        key: '2n4uc',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Amen.',
                        type: 'paragraph-one',
                        key: 'dnorh',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 210,
                },
                id: 'v3gkmqpv',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 65,
                },
                id: 'r93q5j4w',
              },
              {
                type: 'text',
                data: {
                  margin: [0.5, 0],
                  rowStyle: {
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Second Tribute',
                        type: 'header-two',
                        key: '4qt2c',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'qwcc06xz',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
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
                        key: '1lq41',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'g6csa1nx',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'space',
                data: {
                  height: 40,
                },
                id: 'vzvgubh4',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: 'cpuv0',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'h95mxbea4',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, -0.26499999999998636],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: 'evp9m',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'wryko0nw4',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: '80qbc',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '2mghjt554',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: '7p2ti',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'z9f59x154',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: '90b58',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'rqatbdnq4',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: '3q0tn',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'box1t8p24',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
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
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    id: 'vzxr6mw4',
                    type: 'columns',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -113.5,
                          renderImageWidth: 226.99999999999997,
                          transformX: -113.49999999999999,
                          renderImageHeight: 227,
                          type: 'image',
                          filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                        },
                        id: 'p3flwff4',
                      },
                      {
                        type: 'rows',
                        items: [
                          {
                            type: 'content',
                            content: {
                              transformY: -87.5,
                              renderImageWidth: 175,
                              transformX: -87.5,
                              renderImageHeight: 175,
                              type: 'image',
                              filepath:
                                'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            },
                            id: 'mjfs1erj',
                          },
                          {
                            type: 'content',
                            content: {
                              transformY: -87.5,
                              renderImageWidth: 175,
                              transformX: -87.5,
                              renderImageHeight: 175,
                              type: 'image',
                              filepath:
                                'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            },
                            id: 'm5358jf7',
                          },
                        ],
                        id: 'o9uh8nca',
                      },
                    ],
                    height: 227,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 227,
                },
                id: '3dffd50w5',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    id: 'e26netcm',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -(regionContentWidth / 2),
                          renderImageWidth: regionContentWidth,
                          transformX: -(regionContentHeight / 2),
                          renderImageHeight: regionContentHeight,
                          type: 'image',
                          filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                        },
                        id: '9ve8mptn',
                      },
                      {
                        type: 'columns',
                        items: [
                          {
                            type: 'content',
                            content: {
                              transformY: -87.5,
                              renderImageWidth: 175,
                              transformX: -87.5,
                              renderImageHeight: 175.00000000000003,
                              type: 'image',
                              filepath:
                                'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            },
                            id: 'ybeok62d',
                          },
                          {
                            type: 'content',
                            content: {
                              transformY: -87.5,
                              renderImageWidth: 175,
                              transformX: -87.5,
                              renderImageHeight: 175.00000000000003,
                              type: 'image',
                              filepath:
                                'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            },
                            id: 'khhku2oc',
                          },
                        ],
                        id: 'h96am2qg',
                      },
                    ],
                    height: 282,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 282,
                },
                id: 'fp4wkgwy5',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
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
                id: '12xmpyt86',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 280,
                  content: {
                    width: 280,
                    id: 'bq9nikjv',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -140,
                          filename: 'dummy-file',
                          transformX: -140,
                          renderImageHeight: 280,
                          renderImageWidth: 280,
                          type: 'image',
                          filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                        },
                        id: 'csm28ypk',
                      },
                    ],
                    height: 280,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 280,
                },
                id: 'omfdzst066',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: '1rliq',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 27,
                },
                id: '6b4bow396',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, -0.26499999999998636],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: 'rhao',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 118,
                },
                id: 'co0f8spb6',
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
                  height: 20,
                },
                id: 'niregubh6',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'space',
                data: {
                  height: 40,
                },
                id: 'vzvgubh7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: 'cpuv0',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'h95mxbea7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, -0.26499999999998636],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: 'evp9m',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'wryko0nw7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: '80qbc',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '2mghjt557',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: '7p2ti',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'z9f59x157',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Your Text Here',
                        type: 'default-header',
                        key: '90b58',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'rqatbdnq7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                        type: 'default-paragraph',
                        key: '3q0tn',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'box1t8p27',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'space',
                data: {
                  height: 64,
                },
                id: '3fvlxh9c',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 230,
                  content: {
                    lockAspectRatio: false,
                    width: 242,
                    id: 't629rtup',
                    type: 'rows',
                    items: [
                      {
                        id: 'kmdwiv6i',
                        borderRadius: '.5rem',
                        type: 'content',
                        content: {
                          transformY: -125.58333333333334,
                          renderImageWidth: 242.00000000000003,
                          transformX: -121.00000000000001,
                          renderImageHeight: 251.16666666666669,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/classic-background-last-page.jpg',
                        },
                      },
                    ],
                    height: 242,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 242,
                },
                id: 'x63rfjol',
              },
              {
                type: 'space',
                data: {
                  height: 17,
                },
                id: '3fvlzi9c',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 32,
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Appreciation',
                        type: 'header-two',
                        key: '7r3up',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                id: 'uj5oxn1o',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Raleway',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The family would like to thank you for your support during',
                        type: 'paragraph-one',
                        key: '5tr4e',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'this time of sadness. ',
                        type: 'paragraph-one',
                        key: 'cnr2f',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'ifkj',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Please join us at the Pacific Room, Intercontinental Hotel',
                        type: 'paragraph-one',
                        key: '15q7p',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'for refreshments',
                        type: 'paragraph-one',
                        key: 'dhc6u',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 70,
                },
                id: 'wt9fc1g7',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Gold_Roses/{{{region}}}/Gold_Roses_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
                  margin: [0, 0],
                  rowStyle: {
                    fontSize: 48,
                    font: 'Ballet',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Celebrating',
                        type: 'header-one',
                        key: '4fg91',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 67,
                },
                id: 'ry00ssf7',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The life of',
                        type: 'header-six',
                        key: '8hiqu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: '7f1sm3s9',
              },
              {
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'watercolor-sailing-front-image',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 24,
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{deceasedName}}}',
                        type: 'unstyled',
                        key: 'b4ebl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 34,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: 'u3941gxc',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 16,
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                        type: 'unstyled',
                        key: 'bemo4',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'ekh9ybre',
              },
              {
                type: 'space',
                data: {
                  height: 69,
                },
                id: 'q1og9tls',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Service',
                        type: 'header-five',
                        key: '9j9f5',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: '4isdyvif',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{location}}}',
                        type: 'header-six',
                        key: '7rk74',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'ju8zsudx',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'header-six',
                        key: 'e9s6f',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'ju8c23dx',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.NONE,
            },
            background: {
              image: {
                filepath: `backgroundImages/Sailing_Watercolor/{{{region}}}/Sailing_Watercolor_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
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
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'g679s1in',
              },
              {
                type: 'text',
                data: {
                  margin: [12, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        key: '2vq1f',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'g679s12n',
              },
              {
                type: 'text',
                data: {
                  margin: [4.5, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
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
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'yo4kpivl',
              },
              {
                type: 'text',
                data: {
                  margin: [7, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
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
                  height: 17,
                },
                id: 'yo4kc5vl',
              },
              {
                type: 'text',
                data: {
                  margin: [8, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
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
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'gah0wvzv',
              },
              {
                type: 'text',
                data: {
                  margin: [11, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        key: 'f8gds',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'gah0wxzv',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Second Tribute',
                        type: 'header-five',
                        key: 'c5136',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '536ss092',
              },
              {
                type: 'text',
                data: {
                  margin: [14.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        key: 'fif52',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '532vs092',
              },
              {
                type: 'text',
                data: {
                  margin: [9, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The Lord’s Prayer',
                        type: 'header-five',
                        key: '1hj7m',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '9o9oefmb',
              },
              {
                type: 'text',
                data: {
                  margin: [9.5, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Address',
                        type: 'header-five',
                        key: '52j9h',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'fmquatjk',
              },
              {
                type: 'text',
                data: {
                  margin: [2.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        key: 'fjjtu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'fb5am67l',
              },
              {
                type: 'text',
                data: {
                  margin: [21, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Hymn, When September Ends',
                        type: 'header-five',
                        key: 'sd1t',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'n7v3cemy',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'BioRhyme',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Words of Farewell',
                        type: 'header-five',
                        key: 'eon4m',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'h9inp3rf',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
            },
            background: {
              image: {
                filepath: `backgroundImages/Sailing_Watercolor/{{{region}}}/Sailing_Watercolor_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  // originalFrameSize: 210,
                  content: {
                    width: regionContentWidth,
                    id: 'ittqxohr',
                    type: 'rows',
                    items: [
                      {
                        type: 'columns',
                        items: [
                          {
                            id: '7or7bgrw',
                            type: 'content',
                            content: {
                              transformY: -94.52145214521452,
                              filename:
                                'bmqVd02iQ2SWinOs7xiC_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                              transformX: -(regionContentWidth / 2 / 2),
                              renderImageHeight: 189.04290429042905,
                              renderImageWidth: regionContentWidth / 2,
                              type: 'image',
                              filepath:
                                'primaryImages/jx06V87nTmOKr0QIOqPP.jpeg',
                            },
                          },
                          {
                            id: 'fdcubjw4',
                            type: 'content',
                            content: {
                              transformY: -106.07407407407408,
                              filename: 'hcH5ni1TlytVGvSZYkD0_1 Small.jpeg',
                              transformX: -(regionContentWidth / 2 / 2),
                              renderImageHeight: 212.14814814814815,
                              renderImageWidth: regionContentWidth / 2,
                              type: 'image',
                              filepath:
                                'primaryImages/oDFNzYECSlieJvg6Fy7g.jpeg',
                            },
                          },
                        ],
                        id: 't7bx2qyg',
                      },
                      {
                        id: 'zgqcb4l3',
                        type: 'content',
                        flex: 2,
                        content: {
                          transformY: -127.5,
                          filename: 'k9HxE4qDQvWaojbPjNmL_6 Small.jpeg',
                          transformX: -(regionContentWidth / 2),
                          renderImageHeight: 255,
                          renderImageWidth: regionContentWidth,
                          type: 'image',
                          filepath: 'primaryImages/zo3c7YSpQXu3vKWrABXp.jpeg',
                        },
                      },
                      {
                        type: 'columns',
                        items: [
                          {
                            id: '9vu9u1xe',
                            type: 'content',
                            content: {
                              transformY: -134.46009389671363,
                              filename: 'q9kB6egzTSm1lX8rdtbY_20 Small.jpeg',
                              transformX: -(regionContentWidth / 2 / 2),
                              renderImageHeight: 268.92018779342726,
                              renderImageWidth: regionContentWidth / 2,
                              type: 'image',
                              filepath:
                                'primaryImages/J6NxFO9CSdmYeuUP3tJW.jpeg',
                            },
                          },
                          {
                            id: '85o3d54t',
                            type: 'content',
                            content: {
                              transformY: -64,
                              filename: 'KTYZifzWQB2OedPPegXA_5 Small.jpeg',
                              transformX: -(regionContentWidth / 2 / 2),
                              renderImageHeight: 128,
                              renderImageWidth: regionContentWidth / 2,
                              type: 'image',
                              filepath:
                                'primaryImages/fhj1H9uSgCUJnYTl43lY.jpeg',
                            },
                          },
                        ],
                        id: '28sbktxk',
                      },
                    ],
                    height: 516,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 516,
                },
                id: 'ot0bdr0u',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
            },
            background: {
              image: {
                filepath: `backgroundImages/Sailing_Watercolor/{{{region}}}/Sailing_Watercolor_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'space',
                data: {
                  height: 28,
                },
                id: '6umm86t6',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Ballet',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thank you',
                        type: 'header-two',
                        key: '241aq',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                id: 'm5l3n9qw',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The family would like to thank you for your support',
                        type: 'paragraph-one',
                        key: 'e5ib3',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'during this time of sadness. ',
                        type: 'paragraph-one',
                        key: 'fbafv',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'a0rlu',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Please join us at the Pacific Room, Intercontinental',
                        type: 'paragraph-one',
                        key: 'l7cr',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Hotel for refreshments',
                        type: 'paragraph-one',
                        key: '846gi',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 98,
                },
                id: 'jth5itdq',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.NONE,
            },
            background: {
              image: {
                filepath: `backgroundImages/Sailing_Watercolor/{{{region}}}/Sailing_Watercolor_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
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
          headerHeight: 31,
          paragraphHeight: 84,
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
                      name: 'Divider 14',
                      filepath: 'booklet/dividers/divider-14.png',
                      id: 14,
                    },
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 36,
                },
                id: 'fri8kh7m',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    fontSize: 16,
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'In Loving ',
                        type: 'header-six',
                        key: '899qj',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'c88egct4',
              },
              {
                type: 'text',
                data: {
                  margin: [2.5, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 48,
                    font: 'Ballet',
                  },
                  width: regionContentWidth,
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
                        text: 'Memory',
                        type: 'unstyled',
                        key: '9qho1',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 67,
                },
                id: 'ue4ewl3m',
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
                id: 'kaiw6g8d',
              },
              {
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'pastel-blue-roses-front-img',
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
                  height: 13,
                },
                id: 'dnoodnnz',
              },
              {
                type: 'text',
                data: {
                  margin: [2.5, 0],
                  rowStyle: {
                    fontSize: 40,
                    font: 'Ballet',
                  },
                  width: regionContentWidth,
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
                          {
                            offset: 0,
                            style: 'lavender',
                          },
                        ],
                        text: '{{{deceasedName}}}',
                        type: 'header-one',
                        key: '8csdc',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 56,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: 'ohl5harx',
              },
              {
                type: 'text',
                data: {
                  margin: [2, 0],
                  rowStyle: {
                    fontSize: 16,
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        type: 'header-five',
                        key: '7s8j0',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: '7gbupeps',
              },
              {
                type: 'space',
                data: {
                  height: 45,
                },
                id: 'x0uvdlp4',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: '{{{dateOfService}}}',
                        type: 'header-five',
                        key: 'dsoca',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.dateOfService,
                id: 'ql43tteb',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.NONE,
            },
            background: {
              image: {
                filepath: `backgroundImages/Blue_Pastel_Flowers/{{{region}}}/Blue_Pastel_Flowers_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                        text: 'Welcome',
                        type: 'header-two',
                        key: '17u5u',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'xcv2owso',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'Celebrant, Joshua Goodheart',
                        type: 'paragraph-one',
                        key: '96g9h',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'xyc2owso',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 37,
                },
                id: 'uv5wn88h',
              },
              {
                type: 'text',
                data: {
                  margin: [3, 0],
                  rowStyle: {
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                        text: 'I Watch The Sunrise',
                        type: 'header-two',
                        key: '170ra',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '1vf8gw3f',
              },
              {
                type: 'text',
                data: {
                  margin: [4, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'I watch the sunrise lighting the sky, ',
                        type: 'paragraph-one',
                        key: 'cighk',
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
                        text: 'Casting its shadows near. ',
                        type: 'paragraph-one',
                        key: '5hlsp',
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
                        text: 'And on this morning bright though it be, ',
                        type: 'paragraph-one',
                        key: '2586q',
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
                        text: 'I feel those shadows near me.',
                        type: 'paragraph-one',
                        key: '5hp8b',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'fqu5b',
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
                        text: 'But you are always close to me ',
                        type: 'paragraph-one',
                        key: '93p0v',
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
                        text: 'Following all my ways. ',
                        type: 'paragraph-one',
                        key: 'e56gk',
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
                        text: 'May I be always close to you ',
                        type: 'paragraph-one',
                        key: '4e7b3',
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
                        text: 'Following all your ways, Lord.',
                        type: 'paragraph-one',
                        key: 'dcg52',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'diit4',
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
                        text: 'I watch the sunlight shine through the clouds, ',
                        type: 'paragraph-one',
                        key: 'appl1',
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
                        text: 'Warming the earth below. ',
                        type: 'paragraph-one',
                        key: '1t724',
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
                        text: 'And at the mid-day, life seems to say: ',
                        type: 'paragraph-one',
                        key: '3i5db',
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
                        text: 'I feel your brightness near me. ',
                        type: 'paragraph-one',
                        key: 'f8ssd',
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
                        text: 'For you are always . . .',
                        type: 'paragraph-one',
                        key: '7lvp',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '846b5',
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
                        text: 'I watch the sunset fading away, ',
                        type: 'paragraph-one',
                        key: '7phso',
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
                        text: 'Lighting the clouds with sleep. ',
                        type: 'paragraph-one',
                        key: 'deklk',
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
                        text: 'And as the evening closes its eyes, ',
                        type: 'paragraph-one',
                        key: '7oo02',
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
                        text: 'I feel your presence near me. ',
                        type: 'paragraph-one',
                        key: '7vpkq',
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
                        text: 'For you are always . . .',
                        type: 'paragraph-one',
                        key: 'a580i',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '7kt94',
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
                        text: 'I watch the moonlight guarding the night, ',
                        type: 'paragraph-one',
                        key: 'kojp',
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
                        text: 'Waiting till morning comes. ',
                        type: 'paragraph-one',
                        key: '4lhek',
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
                        text: 'The air is silent, earth is at rest ',
                        type: 'paragraph-one',
                        key: '1e6h',
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
                        text: 'Only your peace is near me. ',
                        type: 'paragraph-one',
                        key: 'bn2m9',
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
                        text: 'Yes, you are always... ',
                        type: 'paragraph-one',
                        key: 'div52',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 378,
                },
                id: '3pmpifxz',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Pastel_Flowers/{{{region}}}/Blue_Pastel_Flowers_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [0.5, 0],
                  rowStyle: {
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                        text: 'First Tribute',
                        type: 'header-two',
                        key: '7ikm3',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: '6kqw8tl4',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: '2x1vf',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'vaz1a1nx',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 37,
                },
                id: 'y6yhyu4n',
              },
              {
                type: 'text',
                data: {
                  margin: [1, 0],
                  rowStyle: {
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                        type: 'header-two',
                        key: '93lk4',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'tfo5u294',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'Our Father who art in heaven',
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
                        text: 'hallowed be thy name. ',
                        type: 'paragraph-one',
                        key: 'k28r',
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
                        text: 'for ever and ever',
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
                  height: 210,
                },
                id: 'v3gkmqpv',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 37,
                },
                id: 'r93q5j4w',
              },
              {
                type: 'text',
                data: {
                  margin: [0.5, 0],
                  rowStyle: {
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                        text: 'Second Tribute',
                        type: 'header-two',
                        key: '4qt2c',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 31,
                },
                id: 'qwcc06xz',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: '1lq41',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'g6csa1nx',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 37,
                },
                id: 'gxzb7nif',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Pastel_Flowers/{{{region}}}/Blue_Pastel_Flowers_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'space',
                data: {
                  height: 64,
                },
                id: '3fvlxh9c',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 230,
                  content: {
                    lockAspectRatio: false,
                    width: 205.7,
                    id: 'of9lsmo4',
                    type: 'rows',
                    items: [
                      {
                        id: 'a41h5jyc',
                        borderRadius: '50% 50% 0 0',
                        type: 'content',
                        content: {
                          transformY: -120.99999999999999,
                          renderImageWidth: 233.1678832116788,
                          transformX: -116.5839416058394,
                          renderImageHeight: 241.99999999999997,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/classic-background-last-page.jpg',
                        },
                      },
                    ],
                    height: 242,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 242,
                },
                id: 'x63rfjol',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '3fvlzi9c',
              },
              {
                type: 'text',
                data: {
                  margin: [9, 0],
                  rowStyle: {
                    fontSize: 32,
                    font: 'Ballet',
                  },
                  width: regionContentWidth,
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
                        text: 'Appreciation',
                        type: 'header-two',
                        key: '7r3up',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                id: 'uj5oxn1o',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 12,
                    font: 'Old Standard TT',
                  },
                  width: regionContentWidth,
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
                        text: 'The family would like to thank you for your support during',
                        type: 'paragraph-one',
                        key: '5tr4e',
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
                        text: 'this time of sadness. ',
                        type: 'paragraph-one',
                        key: 'cnr2f',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'ifkj',
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
                        text: 'Please join us at the Pacific Room, Intercontinental Hotel',
                        type: 'paragraph-one',
                        key: '15q7p',
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
                        text: 'for refreshments',
                        type: 'paragraph-one',
                        key: 'dhc6u',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'wt9fc1g7',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Pastel_Flowers/{{{region}}}/Blue_Pastel_Flowers_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    fontSize: 40,
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
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
                type: CardProductContentItemType.FRAME,
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
                type: 'text',
                data: {
                  margin: [0, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 40,
                    font: 'Parisienne',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{deceasedName}}}',
                        type: 'unstyled',
                        key: '9djqs',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 56,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: '02jx20xq',
              },
              {
                type: 'text',
                data: {
                  margin: [0, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 16,
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                        type: 'unstyled',
                        key: 'dnbir',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'divbb4ya',
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 98,
                },
                id: 'swtnngzd',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{location}}}',
                        type: 'header-five',
                        key: '7zk71',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'zvms2zx1',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [5, 0],
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'header-five',
                        key: '34s6f',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'jad2c2xz',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              color: '#B9346F',
              thickness: CardProductBorderThicknessType.MEDIUM,
            },
            background: {
              image: {
                filepath: `backgroundImages/Pastel_Pink/{{{region}}}/Pastel_Pink_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [15, 0],
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
                type: CardProductContentItemType.FRAME,
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
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 250,
                },
                id: '7fpzbhoz',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 325,
                  // originalFrameSize: 210,
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
                          renderImageWidth: 281.3333333333333,
                          type: 'image',
                          filepath: 'primaryImages/jyowJiOgRoCqIuqkQo1N.jpeg',
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

                              renderImageWidth: 165,
                              type: 'image',
                              filepath:
                                'primaryImages/l2OC50mQOaQz24CxCkMO.jpeg',
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
                              renderImageWidth: 165,
                              type: 'image',
                              filepath:
                                'primaryImages/oBUWpzpzSMO1o9H5dfrL.jpeg',
                            },
                            id: 'e8hqzj5n',
                          },
                        ],
                        id: 'vf60cx93',
                      },
                    ],
                    height: 210,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 210,
                },
                id: '574stfp4',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              color: '#B9346F',
              thickness: CardProductBorderThicknessType.MEDIUM,
            },
            background: {
              image: {
                filepath: `backgroundImages/Pastel_Pink/{{{region}}}/Pastel_Pink_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
                  width: regionContentWidth,
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
                  width: regionContentWidth,
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
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              color: '#B9346F',
              thickness: CardProductBorderThicknessType.MEDIUM,
            },
            background: {
              image: {
                filepath: `backgroundImages/Pastel_Pink/{{{region}}}/Pastel_Pink_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
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
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 186,
                  content: {
                    lockAspectRatio: false,
                    width: 186,
                    id: 'gbzsl67a',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -123.6568265682657,
                          filename: 'qQhm3FqsRwS1z97xnX7T_89hTqUUzRDSKeCjpnAs2',
                          transformX: -93.5,
                          renderImageHeight: 247,
                          renderImageWidth: 187,
                          type: 'image',
                          filepath: 'primaryImages/eZEFefPxRouqHThhcxyN.jpeg',
                        },
                        id: 'u0faa7co',
                      },
                    ],
                    height: 243,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
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
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [6, 0],
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
                    width: regionContentWidth,
                    height: 37,
                  },
                  height: 62,
                },
                id: '7tlvcnps',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  style: 'unstyled',
                  margin: [0, 0],
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
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              color: '#B9346F',
              thickness: CardProductBorderThicknessType.MEDIUM,
            },
            background: {
              image: {
                filepath: `backgroundImages/Pastel_Pink/{{{region}}}/Pastel_Pink_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'fall-flowers-front-img',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
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
                        text: '{{{dateOfBirth}}} - {{{dateOfDeath}}}',
                        type: 'header-six',
                        key: '9m1ib',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: '66a0pzyx',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [2, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: '{{{deceasedName}}}',
                        type: 'header-one',
                        key: '4eg16',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: 'nbyypixj',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'hcnz5hjz',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Sora',
                  },
                  width: regionContentWidth,
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
                          {
                            offset: 0,
                            style: 'gold',
                          },
                          {
                            offset: 0,
                            style: 'dark-grey',
                          },
                        ],
                        text: '{{{location}}}',
                        type: 'header-six',
                        key: '7rk74',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'ju8xuzx1',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Sora',
                  },
                  width: regionContentWidth,
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
                          {
                            offset: 0,
                            style: 'dark-grey',
                          },
                        ],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'header-six',
                        key: 'e9s6f',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'j28c2cdz',
              },
            ],
            border: {
              borderCategory: CardProductBorderCategory.CLASSIC,
              borderStyle: CardProductBorderType.DOUBLE_SOLID,
              thickness: CardProductBorderThicknessType.THICK,
              color: '#BF713E',
            },
            background: {
              image: {
                filepath: `backgroundImages/Fall_Flowers/{{{region}}}/Fall_Flowers_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                id: 'n1647zxb',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                id: 'm1647zib',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: '0m9hlg4z',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'HYMN - ABIDE WITH ME',
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'yg7tujs0',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Henry Francis Lyte',
                        type: 'paragraph-one',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'yg7xcss0',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: 'elhiebn3',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [3, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'FIRST TRIBUTE',
                        type: 'header-five',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '1e1mplrw',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Georgie Goodperson',
                        type: 'paragraph-one',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: '213mplrw',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: 'm4n9k9xb',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: "THE LORD'S PRAYER",
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'c5hwfx7s',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: 'tmpk5va7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'SECOND TRIBUTE',
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'ugt3230a',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'ugt34l0a',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: 'e65slfq7',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'ADDRESS',
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '0vp38mpb',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                id: '0vp3cvpb',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'bzra9l4f',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'READING  - THE WHEEL',
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'dcm0hbw5',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: ' Ivan Angelheart',
                        type: 'paragraph-one',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'dcm03fw5',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: '2nqvb8ib',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
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
                        text: 'WORDS OF FAREWELL',
                        type: 'header-five',
                        key: 'drrrl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'npf2vsps',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [0, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Sung by, Ivan Angelheart',
                        type: 'paragraph-one',
                        key: '8dfio',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: 'npxxvsps',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
              color: '#BF713E',
            },
            background: {
              image: {
                filepath: `backgroundImages/Fall_Flowers/{{{region}}}/Fall_Flowers_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [-1, 0],
                  alignment: 'center',
                  rowStyle: {
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
                id: 'up2c8o4t',
              },
              {
                type: 'space',
                data: {
                  height: 10,
                },
                id: '83ipd8t8',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [3, 0],
                  alignment: 'center',
                  rowStyle: {
                    font: 'Sora',
                  },
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Abide with me; fast falls the eventide;',
                        type: 'paragraph-one',
                        key: 'aa6pj',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The darkness deepens; Lord with me abide.',
                        type: 'paragraph-one',
                        key: '8307j',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'When other helpers fail and comforts flee,',
                        type: 'paragraph-one',
                        key: '2ds6b',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Help of the helpless, O abide with me.',
                        type: 'paragraph-one',
                        key: '893le',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '94qcr',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "Swift to its close ebbs out life's little day;",
                        type: 'paragraph-one',
                        key: '5nlrv',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "Earth's joys grow dim; its glories pass away;",
                        type: 'paragraph-one',
                        key: '79jah',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Change and decay in all around I see;',
                        type: 'paragraph-one',
                        key: '538u',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'O Thou who changest not, abide with me.',
                        type: 'paragraph-one',
                        key: '49eri',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '7ori8',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Not a brief glance I beg, a passing word,',
                        type: 'paragraph-one',
                        key: '7nd8f',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "But as Thou dwell'st with Thy disciples, Lord,",
                        type: 'paragraph-one',
                        key: '6pcur',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Familiar, condescending, patient, free.',
                        type: 'paragraph-one',
                        key: '4qgdh',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Come not to sojourn, but abide with me.',
                        type: 'paragraph-one',
                        key: 'f57c8',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '9be65',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thou on my head in early youth didst smile,',
                        type: 'paragraph-one',
                        key: 'fvebn',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'And though rebellious and perverse meanwhile,',
                        type: 'paragraph-one',
                        key: 'e5hf9',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thou hast not left me, oft as I left Thee.',
                        type: 'paragraph-one',
                        key: 'b8v2b',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'On to the close, O Lord, abide with me.',
                        type: 'paragraph-one',
                        key: 'ccjid',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '6h96c',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'I need Thy presence every passing hour.',
                        type: 'paragraph-one',
                        key: '7iue4',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "What but Thy grace can foil the tempter's power?",
                        type: 'paragraph-one',
                        key: 'cbt9g',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Who, like Thyself, my guide and stay can be?',
                        type: 'paragraph-one',
                        key: '5tm37',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Through cloud and sunshine, Lord, abide with me.',
                        type: 'paragraph-one',
                        key: 'cqfa6',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '4i2ot',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'I fear no foe, with Thee at hand to bless;',
                        type: 'paragraph-one',
                        key: 'otkv',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Ills have no weight, and tears no bitterness.',
                        type: 'paragraph-one',
                        key: '6o0ug',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "Where is death's sting? Where, grave, thy victory?",
                        type: 'paragraph-one',
                        key: '8a1mu',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'I triumph still, if Thou abide with me.',
                        type: 'paragraph-one',
                        key: '5jrph',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '4r92g',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Hold Thou Thy cross before my closing eyes;',
                        type: 'paragraph-one',
                        key: 'egon5',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Shine through the gloom and point me to the skies.',
                        type: 'paragraph-one',
                        key: '2sr1m',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "Heaven's morning breaks, and earth's vain shadows flee;",
                        type: 'paragraph-one',
                        key: '5lf8r',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'In life, in death, O Lord, abide with me.',
                        type: 'paragraph-one',
                        key: '51uqc',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 476,
                },
                id: 'zibmznhh',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
              color: '#BF713E',
            },
            background: {
              image: {
                filepath: `backgroundImages/Fall_Flowers/{{{region}}}/Fall_Flowers_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            rows: [
              {
                type: 'space',
                data: {
                  height: 51,
                },
                id: 'og7rmfoh',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    lockAspectRatio: false,
                    id: '2qn6ec01',
                    type: 'columns',
                    items: [
                      {
                        type: 'rows',
                        items: [
                          {
                            id: '4yai0tyr',
                            type: 'content',
                            content: {
                              transformY: -63.2421875,
                              renderImageWidth: 176.75892152996843,
                              transformX: -88.37946076498422,
                              renderImageHeight: 126.484375,
                              type: 'image',
                              filepath:
                                'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-cropped.jpg',
                            },
                          },
                          {
                            id: 'frpf4d2s',
                            type: 'content',
                            content: {
                              transformY: -93.46534653465346,
                              filename:
                                'SE6NcSuBQUew2Yd6mcHV_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                              transformX: -88.5,
                              renderImageHeight: 186.93069306930693,
                              renderImageWidth: 177,
                              type: 'image',
                              filepath:
                                'primaryImages/9SX8tPefQIa8Exe65i0J.jpeg',
                            },
                          },
                        ],
                        id: '89gwpaim',
                      },
                      {
                        id: '4k6yotj3',
                        type: 'content',
                        content: {
                          transformY: -132.33644859813086,
                          filename: 'd5HcPxbTYalvbLM1103B_11 Small.jpeg',
                          transformX: -88.5,
                          renderImageHeight: 264.6728971962617,
                          renderImageWidth: 177,
                          type: 'image',
                          filepath: 'primaryImages/V9AcshtbTQq8mhHqlNdB.jpeg',
                        },
                      },
                    ],
                    height: 257,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 257,
                },
                id: '7j8yn34d',
              },
              {
                type: 'space',
                data: {
                  height: 140,
                },
                id: 't3hx3wi8',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Neuton',
                  },
                  width: regionContentWidth,
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
                id: 'med4zr2y',
              },
              {
                type: 'text',
                data: {
                  width: regionContentWidth,
                  margin: [5, 0],
                  alignment: 'center',
                  rowStyle: {
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
                id: '7tjre50r',
              },
            ],
            border: {
              borderStyle: CardProductBorderType.DOUBLE_SOLID,
              color: '#BF713E',
            },
            background: {
              image: {
                filepath: `backgroundImages/Fall_Flowers/{{{region}}}/Fall_Flowers_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
            fontSize: 16,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.SINGLE_SOLID,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [2.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        key: 'bgrhm',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: '09cuoe77',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
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
                        key: '9hqe8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'tjg3h0xm',
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
                id: 'q3stnhwm',
              },
              {
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'minimal-arch-front-img',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'ly14btcr',
              },
              {
                type: 'text',
                data: {
                  margin: [8, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Service',
                        type: 'header-six',
                        key: '73pmq',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: 'zc2139nx',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{location}}}',
                        type: 'paragraph-one',
                        key: '3lipa',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'q3acuzqr',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'paragraph-one',
                        key: '36l6i',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'q3azuzcv',
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Welcome',
                        type: 'header-six',
                        key: 'dnmej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'm9acv2mu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
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
                        key: 'aeqnr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'msccv2mu',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'que9u0sj',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 251,
                  content: {
                    width: 251,
                    id: 'pkky7700',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -94.5,
                          renderImageWidth: 251,
                          transformX: -125.5,
                          renderImageHeight: 189,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/reflection-booklet-p2-joao-silas-636902.jpg',
                        },
                        id: 'yknd4ojb',
                      },
                    ],
                    height: 189,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 189,
                },
                id: 'pjyqu6ky',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'vn8n7cey',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Ava Maria',
                        type: 'header-six',
                        key: 'av87k',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'cv5b3hdf',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Sung by, Innes Heart',
                        type: 'paragraph-one',
                        key: '8bk3r',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '075b3hdf',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'zpxkusmu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Poem',
                        type: 'header-six',
                        key: '9r81s',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'fl8hv3hk',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Reading by Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: 'fjcm6',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'fl8hb3hk',
              },
              {
                type: 'space',
                data: {
                  height: 29,
                },
                id: 'w5j413q1',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'First Tribute',
                        type: 'header-six',
                        key: '1eksu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '3q81kn56',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    fontSize: 12,
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Georgie Goodperson',
                        type: 'unstyled',
                        key: 'f61lr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '3q81cc56',
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'High flight',
                        type: 'header-six',
                        key: '6o8ej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '69zlottc',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'wcsa13qx',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Oh! I have slipped the surly bonds of earth,',
                        type: 'paragraph-one',
                        key: '3bq1i',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'And danced the skies on laughter-silvered wings;',
                        type: 'paragraph-one',
                        key: '4bcij',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "Sunward I've climbed, and joined the tumbling mirth",
                        type: 'paragraph-one',
                        key: '3cj4b',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Of sun-split clouds, --and done a hundred things',
                        type: 'paragraph-one',
                        key: 'a250l',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'You have not dreamed of --Wheeled and soared and swung',
                        type: 'paragraph-one',
                        key: 'f4k6i',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "High in the sunlit silence. Hov'ring there",
                        type: 'paragraph-one',
                        key: 'dqnnr',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "I've chased the shouting wind along, and flung",
                        type: 'paragraph-one',
                        key: '3cvba',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'My eager craft through footless halls of air...',
                        type: 'paragraph-one',
                        key: '9krh4',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Up, up the long, delirious, burning blue',
                        type: 'paragraph-one',
                        key: '750pn',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "I've topped the wind-swept heights with easy grace",
                        type: 'paragraph-one',
                        key: '3bjb3',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Where never lark or even eagle flew --',
                        type: 'paragraph-one',
                        key: 'ejd0r',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: "And, while with silent lifting mind I've trod",
                        type: 'paragraph-one',
                        key: 'pgc5',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The high untrespassed sanctity of space,',
                        type: 'paragraph-one',
                        key: 'eriri',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Put out my hand, and touched the face of God.',
                        type: 'paragraph-one',
                        key: 'l9b7',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'fvq5n',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'John Gillespie Magee',
                        type: 'paragraph-one',
                        key: 'e9fm0',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 269,
                },
                id: 'k2df0sr6',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '5fm08h19',
              },
              {
                type: 'text',
                data: {
                  margin: [17, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Commital',
                        type: 'header-six',
                        key: 'f1veu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'lwnxejm3',
              },
              {
                type: 'space',
                data: {
                  height: 12,
                },
                id: 'o1ez5z66',
              },
              {
                type: 'text',
                data: {
                  margin: [1.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Eulogy',
                        type: 'header-six',
                        key: '4v7dg',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'azex3dsg',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Alegreya',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Simone Langmoore',
                        type: 'paragraph-one',
                        key: '6strl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '8efn4vld',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '3lw4vyp0',
              },
              {
                type: 'text',
                data: {
                  margin: [12.5, 0],
                  rowStyle: {
                    font: 'Cormorant',
                  },
                  width: regionContentWidth,
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
                        ],
                        text: 'Blessing and Dismissal',
                        type: 'header-six',
                        key: 'ajkia',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '1pwjbwsh',
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
                  width: regionContentWidth,
                  // originalFrameSize: 210,
                  content: {
                    width: regionContentWidth,
                    id: 'ruc8247m',
                    type: 'rows',
                    items: [
                      {
                        type: 'columns',
                        items: [
                          {
                            type: 'content',
                            content: {
                              transformY: -63.49999999999999,
                              filename: '3YWhVRfuSWwUJdpJQrfg_4 Small.jpeg',
                              transformX: -95.39906103286384,
                              renderImageHeight: 126.99999999999999,
                              renderImageWidth: 190.79812206572768,
                              type: 'image',
                              filepath:
                                'primaryImages/cWqSBQ7uTJ5Pbj02chck.jpeg',
                            },
                            id: 'jonec8hx',
                          },
                          {
                            type: 'content',
                            content: {
                              transformY: -63.49999999999999,
                              filename: 'IPhhIejnQRanBripJcLu_10 Small.jpeg',
                              transformX: -95.39906103286384,
                              renderImageHeight: 126.99999999999999,
                              renderImageWidth: 190.79812206572768,
                              type: 'image',
                              filepath:
                                'primaryImages/CwEtWrM5Rnm6AWQw43sK.jpeg',
                            },
                            id: 'iiu2qziz',
                          },
                        ],
                        id: '8bqrs83o',
                      },
                      {
                        id: 'srdsxu9v',
                        type: 'content',
                        flex: 2,
                        content: {
                          transformY: -126.99999999999999,
                          filename: '019SS3gATXu4QGVvsKF4_6 Small.jpeg',
                          transformX: -190.79812206572768,
                          renderImageHeight: 253.99999999999997,
                          renderImageWidth: 381.59624413145536,
                          type: 'image',
                          filepath: 'primaryImages/WSem8NeVTX2HKAcwEbSy.jpeg',
                        },
                      },
                      {
                        type: 'columns',
                        items: [
                          {
                            type: 'content',
                            content: {
                              transformY: -63.49999999999999,
                              filename: 'L4P2aOb1T1SIBQRskJ5e_15 Small.jpeg',
                              transformX: -93.21100917431193,
                              renderImageHeight: 126.99999999999999,
                              renderImageWidth: 186.42201834862385,
                              type: 'image',
                              filepath:
                                'primaryImages/6nlQJgJS3qfnV3nv3Dyd.jpeg',
                            },
                            id: 'fdkt3ntx',
                          },
                          {
                            type: 'content',
                            content: {
                              transformY: -63.49999999999999,
                              filename: '5xAhRFpOSfOuqipJx7A1_9 Small.jpeg',
                              transformX: -95.39906103286384,
                              renderImageHeight: 126.99999999999999,
                              renderImageWidth: 190.79812206572768,
                              type: 'image',
                              filepath:
                                'primaryImages/srTL5xBtQvKmQ0fLYcUK.jpeg',
                            },
                            id: '1jfc5gf2',
                          },
                        ],
                        id: '9d284e11',
                      },
                    ],
                    height: 515,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 515,
                },
                id: 'yvtudp4g',
              },
            ],
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
          headerHeight: 27,
          paragraphHeight: 118,
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
            fontSize: 16,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.NONE,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  // originalFrameSize: 210,
                  content: {
                    width: regionContentWidth,
                    id: 'yyqnt4u4',
                    type: 'columns',
                    items: [
                      {
                        type: 'rows',
                        items: [
                          {
                            id: 'gtbtk0is',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename: 'JwJtjJbbRLOFXbcy9vJd_11 Small.jpeg',
                              transformX: -44.125,
                              renderImageHeight: 131.9626168224299,
                              renderImageWidth: 88.25,
                              type: 'image',
                              filepath:
                                'primaryImages/GJqgX2lReW9cuWHL8zef.jpeg',
                            },
                          },
                          {
                            id: 'kqk02mgd',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename:
                                '19h0I6nRfaYBC4kCJ0wd_rawpixel-1147214-unsplash Small.jpeg',
                              transformX: -111.11737089201878,
                              renderImageHeight: 103.5,

                              renderImageWidth: 155.49295774647888,
                              type: 'image',
                              filepath:
                                'primaryImages/vgZHYHrzRNOw3KzIihIN.jpeg',
                            },
                          },
                        ],
                        id: 's0ytgp4m',
                      },
                      {
                        id: '34i1hx0u',
                        type: 'content',
                        flex: 2,
                        content: {
                          transformY: -105.4921875,
                          filename:
                            'vXp114xpQ2e9gC5128v8_tatiana-gonzales-179948-unsplash Small.jpeg',
                          transformX: -226.98815165876778,
                          renderImageHeight: 210.984375,
                          renderImageWidth: 319.97630331753555,
                          type: 'image',
                          filepath: 'primaryImages/kwgcXVbyRrifXTsrnKqx.jpeg',
                        },
                      },
                      {
                        type: 'rows',
                        items: [
                          {
                            id: 'lmm7dsif',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename: 'uTR1Ees3QY9mIURFzJTQ_15 Small.jpeg',
                              transformX: -75.96330275229359,
                              renderImageHeight: 103.5,
                              renderImageWidth: 151.92660550458717,
                              type: 'image',
                              filepath:
                                'primaryImages/6iGLuxA2RQWFQa4GpPHa.jpeg',
                            },
                          },
                          {
                            id: '33tz6tag',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename: 'MGyuX4k0TIqb38RNoM10_2 Small.jpeg',
                              transformX: -81.98019801980197,
                              renderImageHeight: 103.5,
                              renderImageWidth: 163.96039603960395,
                              type: 'image',
                              filepath:
                                'primaryImages/KTTdNrFQ9aJzkehGtr6w.jpeg',
                            },
                          },
                        ],
                        id: 'p18rtl2v',
                      },
                    ],
                    height: 211,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 211,
                },
                id: '9rg8jdme',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  // originalFrameSize: 210,
                  content: {
                    width: regionContentWidth,
                    id: 'hogvdm2x',
                    type: 'columns',
                    items: [
                      {
                        id: 'wuypfrs7',
                        type: 'content',
                        flex: 2,
                        content: {
                          transformY: -132.57042253521126,
                          filename:
                            '7zwpq4jCQcGYd5gx84wZ_robert-godwin-cdksyTqEXzo-unsplash Small.jpeg',
                          transformX: -88.2421875,
                          renderImageHeight: 265.14084507042253,

                          renderImageWidth: 176.484375,
                          type: 'image',
                          filepath: 'primaryImages/yrQe67OyRdCqI6Eo5BfQ.jpeg',
                        },
                      },
                      {
                        type: 'rows',
                        items: [
                          {
                            id: 'yepdbhd1',
                            type: 'content',
                            content: {
                              transformY: -52.296296296296305,
                              filename: 'P5LByAEzRtetbV44i0Zl_1 Small.jpeg',
                              transformX: -44.125,
                              renderImageHeight: 104.59259259259261,
                              renderImageWidth: 88.25,
                              type: 'image',
                              filepath:
                                'primaryImages/8bGDcBESQRCvrQ1vs03r.jpeg',
                            },
                          },
                          {
                            id: 'qc9mn0o9',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename: 'Ay5h3xHySryD4j3jAmnZ_17 Small.jpeg',
                              transformX: -56.3265306122449,
                              renderImageHeight: 103.5,
                              renderImageWidth: 112.6530612244898,
                              type: 'image',
                              filepath:
                                'primaryImages/s1klifNvSmifoZ3pjbFl.jpeg',
                            },
                          },
                        ],
                        id: 'kzba8fd7',
                      },
                      {
                        type: 'rows',
                        items: [
                          {
                            id: 'dydym4wq',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename:
                                'FtgRNewRrStcAogWQ8DY_polox-hernandez-itGcCnMWPpQ-unsplash Small.jpeg',
                              transformX: -46.999999999999986,
                              renderImageHeight: 103.5,
                              renderImageWidth: 137.99999999999997,
                              type: 'image',
                              filepath:
                                'primaryImages/zrmKqje5SAGEEF57f3xU.jpeg',
                            },
                          },
                          {
                            id: 'nmq0759i',
                            type: 'content',
                            content: {
                              transformY: -51.75,
                              filename:
                                'Q4P6wgboTEy0SggV2m88_stephen-lustig-363932-unsplash Small.jpeg',
                              transformX: -68.99999999999999,
                              renderImageHeight: 103.5,
                              renderImageWidth: 137.99999999999997,
                              type: 'image',
                              filepath:
                                'primaryImages/djOJij3sR2Wkeg8zR9wv.jpeg',
                            },
                          },
                        ],
                        id: 'zuctsj4e',
                      },
                    ],
                    height: 211,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 211,
                },
                id: 'l2riiwhr',
              },
              {
                type: 'text',
                data: {
                  margin: [4.5, 0],
                  rowStyle: {
                    fontSize: 38,
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
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
                        key: 'bgrhm',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 53,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: '09cuoe77',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
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
                        key: '9hqe8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'tjg3h0xm',
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Welcome',
                        type: 'header-six',
                        key: 'dnmej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'm9acv2mu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
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
                        key: 'aeqnr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'msccv2mu',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'que9u0sj',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 284,
                  content: {
                    width: 322,
                    lockAspectRatio: false,
                    id: '3l6pey4a',
                    type: 'rows',
                    items: [
                      {
                        id: 'ggup7bw7',
                        type: 'content',
                        flex: 1,
                        content: {
                          transformY: -119.8125,
                          filename: 'D64eveTXShqKXxGfcp0H_18 Small.jpeg',
                          transformX: -180,
                          renderImageHeight: 239.625,
                          renderImageWidth: regionContentWidth,
                          type: 'image',
                          filepath: 'primaryImages/FoI9BMhAR6F4YPeO5nNR.jpeg',
                        },
                      },
                      {
                        id: 'jiiio88i',
                        type: 'content',
                        flex: 1,
                        content: {
                          transformY: -107.8125,
                          filename:
                            '19h0I6nRfaYBC4kCJ0wd_rawpixel-1147214-unsplash Small.jpeg',
                          transformX: -177,
                          renderImageHeight: 239.625,
                          renderImageWidth: regionContentWidth,
                          type: 'image',
                          filepath: 'primaryImages/vgZHYHrzRNOw3KzIihIN.jpeg',
                        },
                      },
                    ],
                    height: 230,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 230,
                },
                id: 'pjyqu6ky',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Ava Maria',
                        type: 'header-six',
                        key: 'av87k',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'cv5b3hdf',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Sung by, Innes Heart',
                        type: 'paragraph-one',
                        key: '8bk3r',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '075b3hdf',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'zpxkusmu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Poem',
                        type: 'header-six',
                        key: '9r81s',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'fl8hv3hk',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Reading by Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: 'fjcm6',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'fl8hb3hk',
              },
              {
                type: 'space',
                data: {
                  height: 10,
                },
                id: 'w5j413q1',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'First Tribute',
                        type: 'header-six',
                        key: '1eksu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '3q81kn56',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Georgie Goodperson',
                        type: 'unstyled',
                        key: 'f61lr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 14,
                },
                id: '3q81cc56',
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The Lord’s Prayer',
                        type: 'header-six',
                        key: '6o8ej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '69zlottc',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'wcsa13qx',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Our Father who art in heaven',
                        type: 'paragraph-one',
                        key: '3bq1i',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'hallowed be thy name. ',
                        type: 'paragraph-one',
                        key: 'aiidg',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy kingdom come. ',
                        type: 'paragraph-one',
                        key: 'bmdm2',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy will be done, ',
                        type: 'paragraph-one',
                        key: '1vdr6',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'on Earth as it is in Heaven. ',
                        type: 'paragraph-one',
                        key: 'drekf',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Give us this day our daily bread; ',
                        type: 'paragraph-one',
                        key: 'ctuor',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and forgive us our trespasses, ',
                        type: 'paragraph-one',
                        key: 'ct9pv',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'as we forgive those who trespass against us; ',
                        type: 'paragraph-one',
                        key: 'colfc',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and lead us not into temptation,',
                        type: 'paragraph-one',
                        key: 'dd2mi',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: ' but deliver us from evil.',
                        type: 'paragraph-one',
                        key: '4k0lg',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '6v74h',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'For thine is the Kingdom,',
                        type: 'paragraph-one',
                        key: '31t8q',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and the power, and the glory,',
                        type: 'paragraph-one',
                        key: 'et9as',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'for ever and ever',
                        type: 'paragraph-one',
                        key: '3p0fm',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Amen.',
                        type: 'paragraph-one',
                        key: 'agct8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 252,
                },
                id: 'k2df0sr6',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '5fm08h19',
              },
              {
                type: 'text',
                data: {
                  margin: [18, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Commital',
                        type: 'header-six',
                        key: 'f1veu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'lwnxejm3',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'o1ez5z66',
              },
              {
                type: 'text',
                data: {
                  margin: [1.5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Eulogy',
                        type: 'header-six',
                        key: '4v7dg',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'azex3dsg',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Simone Langmoore',
                        type: 'paragraph-one',
                        key: '6strl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '8efn4vld',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '3lw4vyp0',
              },
              {
                type: 'text',
                data: {
                  margin: [18.5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Blessing and Dismissal',
                        type: 'header-six',
                        key: 'ajkia',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '1pwjbwsh',
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
                type: 'text',
                data: {
                  margin: [6.5, 0],
                  rowStyle: {
                    fontSize: 16,
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
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
                        text: 'Always in our hearts',
                        type: 'paragraph-one',
                        key: '14qgd',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: '7s1kc6j0',
              },
              {
                type: CardProductContentItemType.FRAME,
                // @ts-ignore
                data: '<<&primaryImage>>',
                id: 'minimal-collage-front-img',
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Appreciation',
                        type: 'header-six',
                        key: '5ghmb',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 22,
                },
                id: 'i5ic1f7b',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'Playfair Display',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The family would like to thank you for your support',
                        type: 'paragraph-one',
                        key: 'bfhjj',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'during this time of sadness. ',
                        type: 'paragraph-one',
                        key: 'albga',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'e3g8d',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Please join us at the Pacific Room, Intercontinental',
                        type: 'paragraph-one',
                        key: 'edh',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Hotel for refreshments',
                        type: 'paragraph-one',
                        key: '39jr1',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'p8e5ebah',
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
          headerHeight: 27,
          paragraphHeight: 118,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.NONE,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [9, 0],
                  rowStyle: {
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
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
                        // text: 'J a m i e  J o n e s',
                        type: 'header-one',
                        key: 'bgrhm',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
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
                  height: 10,
                },
                id: 'kowb8w07',
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
                type: 'text',
                data: {
                  margin: [12, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
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
                        key: '9hqe8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'tjg3h0xm',
              },
              {
                type: 'space',
                data: {
                  height: 60,
                },
                id: 'ly14btcr',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Service',
                        type: 'header-six',
                        key: '73pmq',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'zc2139nx',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{location}}}',
                        type: 'paragraph-one',
                        key: '3lipa',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.location,
                id: 'q3acuzqr',
              },
              {
                type: 'text',
                data: {
                  margin: [0, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '{{{dateOfService}}}{{#serviceStartTime}} at {{{serviceStartTime}}}{{/serviceStartTime}}',
                        type: 'paragraph-one',
                        key: '36l6i',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId:
                  CardProductDynamicDataKey.serviceDateAtServiceTime,
                id: 'q3azuzcv',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Stripe/{{{region}}}/Blue_Stripe_BOOKLET_FRONT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Welcome',
                        type: 'header-six',
                        key: 'dnmej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'm9acv2mu',
              },
              {
                type: 'text',
                data: {
                  margin: [3, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
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
                        key: 'aeqnr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: 'msccv2mu',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'que9u0sj',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 99,
                  content: {
                    lockAspectRatio: false,
                    width: 310,
                    id: '5j65q39q',
                    type: 'rows',
                    items: [
                      {
                        id: 'v8kgiikt',
                        type: 'content',
                        content: {
                          transformY: -116.71314741035857,
                          renderImageWidth: 310,
                          transformX: -155,
                          renderImageHeight: 233.42629482071715,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/reflection-booklet-p2-joao-silas-636902.jpg',
                        },
                      },
                    ],
                    height: 155,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 155,
                },
                id: 'pjyqu6ky',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'vn8n7cey',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Ava Maria',
                        type: 'header-six',
                        key: 'av87k',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'cv5b3hdf',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Sung by, Innes Heart',
                        type: 'paragraph-one',
                        key: '8bk3r',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: '075b3hdf',
              },
              {
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'zpxkusmu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Poem',
                        type: 'header-six',
                        key: '9r81s',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'fl8hv3hk',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Reading by Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: 'fjcm6',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: 'fl8hb3hk',
              },
              {
                type: 'space',
                data: {
                  height: 33,
                },
                id: 'w5j413q1',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'First Tribute',
                        type: 'header-six',
                        key: '1eksu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: '3q81kn56',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Georgie Goodperson',
                        type: 'unstyled',
                        key: 'f61lr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: '3q81cc56',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Stripe/{{{region}}}/Blue_Stripe_BOOKLET_LEFT{{{regionFileExt}}}.jpg`,
              },
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
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The Lord’s Prayer',
                        type: 'header-six',
                        key: '6o8ej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: '69zlottc',
              },
              {
                type: 'text',
                data: {
                  margin: [3.5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Our Father who art in heaven',
                        type: 'paragraph-one',
                        key: '3bq1i',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'hallowed be thy name. ',
                        type: 'paragraph-one',
                        key: 'aiidg',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy kingdom come. ',
                        type: 'paragraph-one',
                        key: 'bmdm2',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Thy will be done, ',
                        type: 'paragraph-one',
                        key: '1vdr6',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'on Earth as it is in Heaven. ',
                        type: 'paragraph-one',
                        key: 'drekf',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Give us this day our daily bread; ',
                        type: 'paragraph-one',
                        key: 'ctuor',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and forgive us our trespasses, ',
                        type: 'paragraph-one',
                        key: 'ct9pv',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'as we forgive those who trespass against us; ',
                        type: 'paragraph-one',
                        key: 'colfc',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and lead us not into temptation,',
                        type: 'paragraph-one',
                        key: 'dd2mi',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: ' but deliver us from evil.',
                        type: 'paragraph-one',
                        key: '4k0lg',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: '6v74h',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'For thine is the Kingdom,',
                        type: 'paragraph-one',
                        key: '31t8q',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'and the power, and the glory,',
                        type: 'paragraph-one',
                        key: 'et9as',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'for ever and ever',
                        type: 'paragraph-one',
                        key: '3p0fm',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Amen.',
                        type: 'paragraph-one',
                        key: 'agct8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 294,
                },
                id: 'k2df0sr6',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: '5fm08h19',
              },
              {
                type: 'text',
                data: {
                  margin: [6.5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Commital',
                        type: 'header-six',
                        key: 'f1veu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'lwnxejm3',
              },
              {
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'o1ez5z66',
              },
              {
                type: 'text',
                data: {
                  margin: [1.5, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Eulogy',
                        type: 'header-six',
                        key: '4v7dg',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: 'azex3dsg',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'Jost',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Simone Langmoore',
                        type: 'paragraph-one',
                        key: '6strl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                id: '8efn4vld',
              },
              {
                type: 'space',
                data: {
                  height: 14,
                },
                id: '3lw4vyp0',
              },
              {
                type: 'text',
                data: {
                  margin: [10, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Blessing and Dismissal',
                        type: 'header-six',
                        key: 'ajkia',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: '1pwjbwsh',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Stripe/{{{region}}}/Blue_Stripe_BOOKLET_RIGHT{{{regionFileExt}}}.jpg`,
              },
            },
          },
          {
            border: {
              color: 'rgb(255,255,255)',
              borderStyle: CardProductBorderType.NONE,
              thickness: CardProductBorderThicknessType.MEDIUM,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [10, 0],
                  rowStyle: {
                    fontSize: 18,
                    font: 'Poiret One',
                  },
                  width: regionContentWidth,
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
                        text: 'Always in our Hearts',
                        type: 'paragraph-one',
                        key: '14qgd',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 25,
                },
                id: '7s1kc6j0',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionContentWidth,
                  content: {
                    width: regionContentWidth,
                    lockAspectRatio: false,
                    id: 'vqkg88by',
                    type: 'rows',
                    items: [
                      {
                        type: 'columns',
                        items: [
                          {
                            id: 'u93mky1x',
                            type: 'content',
                            content: {
                              transformY: -83.75294117647059,
                              renderImageWidth: 171,
                              transformX: -85,
                              renderImageHeight: 171,
                              type: 'image',
                              filepath:
                                'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
                            },
                          },
                          {
                            id: 'z7s6mun5',
                            type: 'content',
                            content: {
                              transformY: -85,
                              filename: 'geAVhvS9R62OgcObph2O_12 Small.jpeg',
                              transformX: -85,
                              renderImageHeight: 170,
                              renderImageWidth: 170,
                              type: 'image',
                              filepath:
                                'primaryImages/lLGIqVIPShpMm6Tma5Yw.jpeg',
                            },
                          },
                        ],
                        id: 'u808d70y',
                      },
                      {
                        id: 'svhe0nps',
                        type: 'content',
                        flex: 2,
                        content: {
                          transformY: -120.49999999999999,
                          filename:
                            'mz1PTWYTzi1EXRnbPGRL_tatiana-gonzales-179948-unsplash Small.jpeg',
                          transformX: -182.74881516587675,
                          renderImageHeight: 240.99999999999997,
                          renderImageWidth: 365.4976303317535,
                          type: 'image',
                          filepath: 'primaryImages/fWsJAEkGSUa9IaVXSoTs.jpeg',
                        },
                      },
                      {
                        type: 'columns',
                        items: [
                          {
                            id: 'vn3pnl8j',
                            type: 'content',
                            content: {
                              transformY: -60.5,
                              filename: 'K1HHUKWUQeSh2HRuPsZQ_2 Small.jpeg',
                              transformX: -95.84158415841584,
                              renderImageHeight: 121,
                              renderImageWidth: 191.68316831683168,
                              type: 'image',
                              filepath:
                                'primaryImages/26jNWLpASWCYI3BuLj70.jpeg',
                            },
                          },
                          {
                            id: '0nxoti8v',
                            type: 'content',
                            content: {
                              transformY: -78.09375,
                              filename: 'IdhPzxp1TR9FisRpURBN_17 Small.jpeg',
                              transformX: -85,
                              renderImageHeight: 156.1875,
                              renderImageWidth: 170,
                              type: 'image',
                              filepath:
                                'primaryImages/51RFLy0VScK5qswS7MKG.jpeg',
                            },
                          },
                        ],
                        id: 'dloypaqe',
                      },
                    ],
                    height: 489,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 489,
                },
                id: 'q4w9bbxf',
              },
            ],
            background: {
              image: {
                filepath: `backgroundImages/Blue_Stripe/{{{region}}}/Blue_Stripe_BOOKLET_BACK{{{regionFileExt}}}.jpg`,
              },
            },
          },
        ],
      },
      {
        id: 'full-width',
        name: 'Full Width',
        isPrimaryImageFullWidth: true,
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
          headerHeight: 27,
          paragraphHeight: 118,
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
            fontSize: 20,
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
            fontSize: 16,
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
            border: {
              color: 'black',
              borderStyle: CardProductBorderType.NONE,
              thickness: CardProductBorderThicknessType.THIN,
            },
            rows: [
              {
                type: 'text',
                data: {
                  margin: [0, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 48,
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
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
                        key: 'esl4q',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 67,
                },
                id: 'qqh3hblz',
              },
              {
                type: 'text',
                data: {
                  margin: [0, -0.4724999999999966],
                  rowStyle: {
                    fontSize: 12,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
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
                        key: 'aj1f2',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'saeqq13f',
              },
              {
                type: 'space',
                data: {
                  height: 10,
                },
                id: 'ly14btcr',
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
                  height: 10,
                },
                id: 'n3afrruj',
              },
              {
                type: 'text',
                data: {
                  margin: [7, 0],
                  rowStyle: {
                    fontSize: 34,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
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
                        key: 'bgrhm',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 48,
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
                id: '09cuoe77',
              },
              {
                type: 'text',
                data: {
                  margin: [3, 0],
                  rowStyle: {
                    fontSize: 14,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
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
                        key: '9hqe8',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 20,
                },
                dynamicDataId: CardProductDynamicDataKey.dobToDod,
                id: 'tjg3h0xm',
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
                type: 'space',
                data: {
                  height: 24,
                },
                id: 'que9u0sj',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: 330,
                  prevWidth: regionFullWidth,
                  content: {
                    width: 330,
                    lockAspectRatio: false,
                    id: 'u1fo72bp',
                    type: 'rows',
                    items: [
                      {
                        type: 'columns',
                        items: [
                          {
                            type: 'content',
                            content: {
                              transformY: -122.44131455399062,
                              filename:
                                '42RsFZscTRKujqWd7AKl_rafael-leao-NRnPv3Gs-Nc-unsplash Small.jpeg',
                              transformX: -81.5,
                              renderImageHeight: 244.88262910798124,
                              renderImageWidth: 163,
                              type: 'image',
                              filepath:
                                'primaryImages/nzvBSBFdTaWZif097ZKA.jpeg',
                            },
                            id: 'weqn1bh3',
                          },
                          {
                            type: 'content',
                            content: {
                              transformY: -122.44131455399062,
                              filename:
                                'cJTjCnvBSCuip9VDVhTg_sinitta-leunen-LcHdWuAYEKo-unsplash Small.jpeg',
                              transformX: -81.5,
                              renderImageHeight: 244.88262910798124,
                              renderImageWidth: 163,
                              type: 'image',
                              filepath:
                                'primaryImages/OFHbQMWfQp20WSaXbbdx.jpeg',
                            },
                            id: '1ly39ry2',
                          },
                        ],
                        id: 's7u6wqwy',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -114.4921875,
                          filename: 'Nb64vDYPRWikIqyXgax8_8 Small.jpeg',
                          transformX: -(regionContentWidth / 2),
                          renderImageHeight: 228.984375,
                          renderImageWidth: regionContentWidth,
                          type: 'image',
                          filepath: 'primaryImages/sjaGtElSqib8qim8DlYA.jpeg',
                        },
                        id: '7iavatsx',
                      },
                    ],
                    height: 462,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: 462,
                  isFullWidth: false,
                },
                id: 'pjyqu6ky',
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
                type: 'space',
                data: {
                  height: 17,
                },
                id: '09e7i05z',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Welcome',
                        type: 'header-six',
                        key: 'dnmej',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: 'm9acv2mu',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
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
                        key: 'aeqnr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'msccv2mu',
              },
              {
                type: 'space',
                data: {
                  height: 23,
                },
                id: '7gwr6d7w',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Poem',
                        type: 'header-six',
                        key: '9r81s',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: 'fl8hv3hk',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Reading by Lucinda Goodperson',
                        type: 'paragraph-one',
                        key: 'fjcm6',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: 'fl8hb3hk',
              },
              {
                type: 'space',
                data: {
                  height: 23,
                },
                id: 'fsx0tpbr',
              },
              {
                type: 'text',
                data: {
                  margin: [1.5, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Eulogy',
                        type: 'header-six',
                        key: '4v7dg',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: 'azex3dsg',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Simone Langmoore',
                        type: 'paragraph-one',
                        key: '6strl',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '8efn4vld',
              },
              {
                type: 'space',
                data: {
                  height: 23,
                },
                id: 'j0nmwax1',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Video Tribute',
                        type: 'header-six',
                        key: '1eksu',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: '3q81kn56',
              },
              {
                type: 'text',
                data: {
                  margin: [5.5, 0],
                  rowStyle: {
                    fontSize: 12,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Georgie Goodperson',
                        type: 'unstyled',
                        key: 'f61lr',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '3q81cc56',
              },
              {
                type: 'space',
                data: {
                  height: 23,
                },
                id: '7ofm0t0l',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Reading',
                        type: 'header-six',
                        key: 'av87k',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: 'cv5b3hdf',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Innes Heart',
                        type: 'paragraph-one',
                        key: '8bk3r',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 17,
                },
                id: '075b3hdf',
              },
              {
                type: 'space',
                data: {
                  height: 23,
                },
                id: '5fm08h19',
              },
              {
                type: 'text',
                data: {
                  margin: [7, 0],
                  rowStyle: {
                    fontSize: 20,
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Blessing and Dismissal',
                        type: 'header-six',
                        key: 'ajkia',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 28,
                },
                id: '1pwjbwsh',
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
                type: 'space',
                data: {
                  height: 18,
                },
                id: 'y00ybamu',
              },
              {
                type: CardProductContentItemType.FRAME,
                data: {
                  width: regionFullWidth,
                  alignment: AlignmentType.CENTER,
                  content: {
                    width: regionFullWidth,
                    id: 'kkas0uz1',
                    type: 'rows',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -169.4921875,
                          renderImageWidth: regionFullWidth,
                          transformX: -(regionFullWidth / 2),
                          renderImageHeight: 419.6994485294117,
                          type: 'image',
                          filepath:
                            'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
                        },
                        id: '82kyinw0',
                      },
                    ],
                    height: regionContentHeight,
                    fadeEdge: ICardProductFadeEdgeType.NONE,
                  },
                  height: regionContentHeight,
                  isFullWidth: true,
                },
                id: 'q4w9bbxf',
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
                  height: 24,
                },
                id: 'wugs0ida',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    fontSize: 32,
                    font: 'Monsieur La Doulaise',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Appreciation',
                        type: 'header-six',
                        key: '5ghmb',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 45,
                },
                id: 'i5ic1f7b',
              },
              {
                type: 'text',
                data: {
                  margin: [5, 0],
                  rowStyle: {
                    font: 'EB Garamond',
                  },
                  width: regionContentWidth,
                  style: 'unstyled',
                  alignment: 'center',
                  content: {
                    blocks: [
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'The family would like to thank you for your support',
                        type: 'paragraph-one',
                        key: 'bfhjj',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'during this time of sadness. ',
                        type: 'paragraph-one',
                        key: 'albga',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: '',
                        type: 'paragraph-one',
                        key: 'e3g8d',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'Please join us at the {{{location}}}',
                        type: 'paragraph-one',
                        key: 'edh',
                        entityRanges: [],
                      },
                      {
                        depth: 0,
                        data: {},
                        inlineStyleRanges: [],
                        text: 'for refreshments',
                        type: 'paragraph-one',
                        key: '39jr1',
                        entityRanges: [],
                      },
                    ],
                    entityMap: {},
                  },
                  height: 84,
                },
                id: 'p8e5ebah',
              },
            ],
          },
        ],
      },
    ]),
  )
