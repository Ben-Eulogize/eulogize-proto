import { MOCK_CASE_1 } from '../cases'
import {
  CardProductBorderType,
  CardProductContentItemType,
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseResource,
  ICardProductData,
  ICardProductFadeEdgeType,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users'

// Mock SidedCard data
export const MOCK_SIDED_CARD_1: ICardProductData = {
  id: 'cfcf69b0-a232-4dfe-81b9-324ade3515df',
  case: MOCK_CASE_1.id,
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.A5,
    theme: 'grandeur',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
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
          {
            type: 'space',
            data: {
              height: 10,
            },
            id: 'h0nz5rjz',
          },
          {
            type: 'text',
            data: {
              width: 360,
              margin: [2, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        length: 31,
                        style: 'white',
                      },
                    ],
                    text: 'In Loving Memory of the Life of',
                    type: 'header-six',
                    key: '913dj',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 15,
            },
            id: 'l74qu3fi',
          },
          {
            type: 'text',
            data: {
              width: 360,
              margin: [10.5, 0],
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
                    text: 'Deceased Name',
                    type: 'header-one',
                    key: '4eg16',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 32,
            },
            id: 'nbyypixj',
          },
          {
            type: 'text',
            data: {
              width: 360,
              margin: [3.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [
                      {
                        offset: 0,
                        length: 50,
                        style: 'white',
                      },
                    ],
                    text: '10 March 1954 - 10 January 2018',
                    type: 'header-six',
                    key: '9m1ib',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 15,
            },
            id: '66a0pzyx',
          },
          {
            type: 'space',
            data: {
              height: 25,
            },
            id: 'h0c5rvz',
          },
          {
            type: 'text',
            data: {
              width: 360,
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
                        style: 'white',
                      },
                    ],
                    text: 'Eastern Suburbs Memorial Park West Chapel',
                    type: 'paragraph-one',
                    key: '7rk74',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 10,
            },
            id: 'ju8xuzx1',
          },
          {
            type: 'text',
            data: {
              width: 360,
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
                        style: 'white',
                      },
                    ],
                    text: 'Friday 30 June 2023 at 5:05 pm',
                    type: 'paragraph-one',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 15,
            },
            id: 'j28c2cdz',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Field/AU/Field_BOOKLET_FRONT_BOTH_SIDE.jpg',
          },
        },
      },
      {
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
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, Abide With Me',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'yg7tujs0',
          },
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
                    text: 'Henry Francis Lyte',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [3, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'First Tribute',
                    type: 'header-five',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 24,
            },
            id: '1e1mplrw',
          },
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
                    text: 'Georgie Goodperson',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'The Lord’s Prayer',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Second Tribute',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'ugt3230a',
          },
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
                    text: 'Lucinda Goodperson',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Address',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: '0vp38mpb',
          },
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
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, When September Ends',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'dcm0hbw5',
          },
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
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
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
              width: 360,
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Words of Farewell',
                    type: 'header-five',
                    key: 'drrrl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 23,
            },
            id: 'npf2vsps',
          },
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
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '8dfio',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 16,
            },
            id: 'npxxvsps',
          },
        ],
      },
      {
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
              width: 360,
              margin: [3, 0],
              alignment: 'center',
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
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 14,
            },
            id: 'og7rmfoh',
          },
          {
            type: 'image',
            data: {
              width: 335,
              filepath:
                'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-cropped.jpg',
              alignment: 'center',
              height: 240,
            },
            id: '7j8yn34d',
          },
          {
            type: 'space',
            data: {
              height: 85,
            },
            id: 't3hx3wi8',
          },
          {
            type: 'text',
            data: {
              width: 360,
              style: 'unstyled',
              margin: [5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Thank You',
                    type: 'header-five',
                    key: '9ohrh',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 19,
            },
            id: 'med4zr2y',
          },
          {
            type: 'text',
            data: {
              width: 360,
              margin: [5, 0],
              alignment: 'center',
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
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '',
                    type: 'paragraph-one',
                    key: '7v69g',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Please join us at the Pacific Room, Intercontinental',
                    type: 'paragraph-one',
                    key: '95fre',
                    entityRanges: [],
                  },
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hotel for refreshments',
                    type: 'paragraph-one',
                    key: 'd0ra8',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 65,
            },
            id: '7tjre50r',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Field/AU/Field_BOOKLET_BACK_BOTH_SIDE.jpg',
          },
          overlayMargin: [11, 8],
          overlayColor: '#ffffff',
          overlayOpacity: 0.85,
        },
      },
    ],
  },
  status: MemorialVisualStatus.COMPLETE,
}

export const MOCK_SIDED_CARD_US_1: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.HALF_LETTER_A5,
    theme: 'watercolor-sailing',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
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
              width: 360,
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
              width: 360,
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
            data: {
              enableBorder: false,
              width: 210,
              content: {
                width: 210,
                id: 'w58ut2pi',
                type: 'rows',
                items: [
                  {
                    id: 'lsx8vp0i',
                    borderRadius: '0px',
                    type: 'content',
                    content: {
                      transformY: -105,
                      transformX: -105,
                      renderImageHeight: 210,
                      renderImageWidth: 210,
                      type: 'image',
                      filepath: 'primaryImages/FwYTLk15TL6aUjYj2qTJ.jpeg',
                    },
                  },
                ],
                height: 210,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              isFullWidth: false,
              height: 210,
            },
            id: 'watercolor-sailing-front-image',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 24,
                font: 'BioRhyme',
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
                    text: 'Deceased US 2',
                    type: 'unstyled',
                    key: 'b4ebl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 34,
            },
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
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '10/03/1954 - 10/01/2023',
                    type: 'unstyled',
                    key: 'bemo4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 22,
            },
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
              width: 360,
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
                    type: 'header-six',
                    key: '7rk74',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
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
              width: 360,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '18/01/2023 at 5:05 pm',
                    type: 'header-six',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: 'ju8c23dx',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.NONE,
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_FRONT_USA.jpg',
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
              width: 360,
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
            filepath:
              'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_LEFT_USA.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: CardProductContentItemType.FRAME,
            data: {
              width: 360,
              content: {
                width: 360,
                id: 'ittqxohr',
                type: 'rows',
                items: [
                  {
                    type: 'columns',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -94.52145214521452,
                          filename:
                            'bmqVd02iQ2SWinOs7xiC_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                          transformX: -90,
                          renderImageHeight: 189.04290429042905,
                          renderImageWidth: 180,
                          type: 'image',
                          filepath: 'primaryImages/jx06V87nTmOKr0QIOqPP.jpeg',
                        },
                        id: '7or7bgrw',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -106.07407407407408,
                          filename: 'hcH5ni1TlytVGvSZYkD0_1 Small.jpeg',
                          transformX: -90,
                          renderImageHeight: 212.14814814814815,
                          renderImageWidth: 180,
                          type: 'image',
                          filepath: 'primaryImages/oDFNzYECSlieJvg6Fy7g.jpeg',
                        },
                        id: 'fdcubjw4',
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
                      transformX: -180,
                      renderImageHeight: 255,
                      renderImageWidth: 360,
                      type: 'image',
                      filepath: 'primaryImages/zo3c7YSpQXu3vKWrABXp.jpeg',
                    },
                  },
                  {
                    type: 'columns',
                    items: [
                      {
                        type: 'content',
                        content: {
                          transformY: -134.46009389671363,
                          filename: 'q9kB6egzTSm1lX8rdtbY_20 Small.jpeg',
                          transformX: -90,
                          renderImageHeight: 268.92018779342726,
                          renderImageWidth: 180,
                          type: 'image',
                          filepath: 'primaryImages/J6NxFO9CSdmYeuUP3tJW.jpeg',
                        },
                        id: '9vu9u1xe',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -64,
                          filename: 'KTYZifzWQB2OedPPegXA_5 Small.jpeg',
                          transformX: -90,
                          renderImageHeight: 128,
                          renderImageWidth: 180,
                          type: 'image',
                          filepath: 'primaryImages/fhj1H9uSgCUJnYTl43lY.jpeg',
                        },
                        id: '85o3d54t',
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
            filepath:
              'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_RIGHT_USA.jpg',
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
              width: 360,
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
            filepath:
              'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_USA.jpg',
          },
        },
      },
    ],
  },
  updatedAt: '2024-03-14T05:39:06.443Z',
  status: MemorialVisualStatus.EDITED,
  createdAt: '2024-03-14T05:37:30.489Z',
  id: 'e2353e01-832b-438d-950c-1950e5021a34',
  case: '1e331968-8d9c-420b-b579-684b3efb8d0e',
  fileStatus: ResourceFileStatus.NOT_STARTED,
}

export const MOCK_SIDED_CARD_LETTER_1: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: CardProductPageSize.HALF_LETTER_A5,
    theme: 'fall-flowers',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        rows: [
          {
            type: CardProductContentItemType.FRAME,
            data: {
              enableBorder: false,
              width: 335,
              content: {
                width: 335,
                id: 'w58ut2pi',
                type: 'rows',
                items: [
                  {
                    id: 'lsx8vp0i',
                    borderRadius: '200px',
                    type: 'content',
                    content: {
                      transformY: -180,
                      transformX: -180,
                      renderImageHeight: 360,
                      filepath:
                        'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-masked.png',
                      renderImageWidth: 360,
                      type: 'image',
                    },
                  },
                ],
                height: 337,
                fadeEdge: ICardProductFadeEdgeType.NONE,
              },
              isFullWidth: false,
              height: 337,
            },
            id: 'fall-flowers-front-img',
          },
          {
            type: 'text',
            data: {
              width: 335,
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
                        style: 'white',
                      },
                    ],
                    text: '10 March 1954 - 10 January 2018',
                    type: 'header-six',
                    key: '9m1ib',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: '66a0pzyx',
          },
          {
            type: 'text',
            data: {
              width: 335,
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
                    text: 'Deceased',
                    type: 'header-one',
                    key: '4eg16',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 45,
            },
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
                    text: 'Eastern Suburbs Memorial Park West Chapel',
                    type: 'header-six',
                    key: '7rk74',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'ju8xuzx1',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
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
                        style: 'white',
                      },
                      {
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    text: 'Tuesday 05 March 2024 at 5:05 pm',
                    type: 'header-six',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
            id: 'j28c2cdz',
          },
        ],
        border: {
          borderStyle: CardProductBorderType.DOUBLE_SOLID,
          color: '#BF713E',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_FRONT_USA.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
              width: 335,
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
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_LEFT_USA.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
            data: {
              width: 335,
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
              width: 335,
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
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_RIGHT_USA.jpg',
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
              width: 356,
              content: {
                width: 356,
                lockAspectRatio: false,
                id: '2qn6ec01',
                type: 'columns',
                items: [
                  {
                    type: 'rows',
                    items: [
                      {
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
                        id: '4yai0tyr',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -93.46534653465346,
                          filename:
                            'SE6NcSuBQUew2Yd6mcHV_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                          transformX: -88.5,
                          renderImageHeight: 186.93069306930693,
                          renderImageWidth: 177,
                          type: 'image',
                          filepath: 'primaryImages/9SX8tPefQIa8Exe65i0J.jpeg',
                        },
                        id: 'frpf4d2s',
                      },
                    ],
                    id: '89gwpaim',
                  },
                  {
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
                    id: '4k6yotj3',
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
            id: 'med4zr2y',
          },
          {
            type: 'text',
            data: {
              width: 335,
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
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_BACK_USA.jpg',
          },
        },
      },
    ],
  },
  updatedAt: '2024-03-05T19:14:12.351Z',
  status: MemorialVisualStatus.EDITED,
  createdAt: '2024-03-05T19:13:35.886Z',
  id: 'b3f2cb89-24a8-499b-91ee-99391f59ec43',
  case: '729706ac-5738-4992-8649-97b179c1a865',
  fileStatus: ResourceFileStatus.NOT_STARTED,
}

export const MOCK_SIDED_CARD_DOUBLE_BACKGROUND_FIX: ICardProductData = {
  content: {
    pageMargins: [30, 40],
    pageSize: 'HALF_LETTER_A5',
    theme: 'fall-flowers',
    pageOrientation: 'portrait',
    pages: [
      {
        rows: [
          {
            dynamicDataId: 'primaryImage',
            id: 'fall-flowers-front-img',
            type: 'frame',
            data: {
              enableBorder: false,
              width: 335,
              content: {
                width: 335,
                lockAspectRatio: true,
                id: 'w58ut2pi',
                type: 'rows',
                items: [
                  {
                    id: 'lsx8vp0i',
                    borderRadius: '200px',
                    type: 'content',
                    content: {
                      type: 'image',
                      filepath:
                        'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-masked.png',
                      imageType: 'DEFAULT_THEME_IMAGE',
                    },
                  },
                ],
                height: 335,
              },
              isFullWidth: false,
              height: 335,
            },
          },
          {
            dynamicDataId: 'dobToDod',
            id: '66a0pzyx',
            type: 'text',
            data: {
              width: 335,
              margin: [0, 0],
              alignment: 'center',
              rowStyle: {
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
                    text: '03/20/1954 - 01/25/2023',
                    type: 'header-six',
                    key: '9m1ib',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
          },
          {
            dynamicDataId: 'deceasedName',
            id: 'nbyypixj',
            type: 'text',
            data: {
              width: 335,
              margin: [2, 0],
              alignment: 'center',
              rowStyle: {
                fontSize: 32,
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
                    text: 'Deceased US',
                    type: 'header-one',
                    key: '4eg16',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 45,
            },
          },
          {
            type: 'space',
            data: {
              height: 18,
            },
            id: 'hcnz5hjz',
          },
          {
            dynamicDataId: 'location',
            id: 'ju8xuzx1',
            type: 'text',
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
                    text: 'Eastern Suburbs Memorial Park West Chapel',
                    type: 'header-six',
                    key: '7rk74',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
          },
          {
            dynamicDataId: 'serviceDateAtServiceTime',
            id: 'j28c2cdz',
            type: 'text',
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
                        style: 'white',
                      },
                      {
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    text: '05/07/2024 at 5:05 pm',
                    type: 'header-six',
                    key: 'e9s6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 17,
            },
          },
        ],
        border: {
          borderStyle: 'DOUBLE_SOLID',
          color: '#BF713E',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_FRONT_USA.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
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
            id: 'n1647zxb',
          },
          {
            type: 'text',
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
              width: 335,
              margin: [3, 0],
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
          borderStyle: 'TOP_AND_BOTTOM_SOLID',
          color: '#BF713E',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_LEFT_USA.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'text',
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
              width: 335,
              margin: [3, 0],
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
          borderStyle: 'TOP_AND_BOTTOM_SOLID',
          color: '#BF713E',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_RIGHT_USA.jpg',
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
            type: 'frame',
            data: {
              width: 335,
              content: {
                width: 335,
                lockAspectRatio: false,
                id: '2qn6ec01',
                type: 'columns',
                items: [
                  {
                    type: 'rows',
                    items: [
                      {
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
                        id: '4yai0tyr',
                      },
                      {
                        type: 'content',
                        content: {
                          transformY: -93.46534653465346,
                          filename:
                            'SE6NcSuBQUew2Yd6mcHV_preston-browning-rsBlTnSPDXQ-unsplash Small.jpeg',
                          transformX: -88.5,
                          renderImageHeight: 186.93069306930693,
                          filepath: 'primaryImages/9SX8tPefQIa8Exe65i0J.jpeg',
                          renderImageWidth: 177,
                          type: 'image',
                        },
                        id: 'frpf4d2s',
                      },
                    ],
                    id: '89gwpaim',
                  },
                  {
                    type: 'content',
                    content: {
                      transformY: -132.33644859813086,
                      filename: 'd5HcPxbTYalvbLM1103B_11 Small.jpeg',
                      transformX: -88.5,
                      renderImageHeight: 264.6728971962617,
                      filepath: 'primaryImages/V9AcshtbTQq8mhHqlNdB.jpeg',
                      renderImageWidth: 177,
                      type: 'image',
                    },
                    id: '4k6yotj3',
                  },
                ],
                height: 257,
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
            id: 'med4zr2y',
          },
          {
            type: 'text',
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
            id: '7tjre50r',
          },
        ],
        border: {
          borderStyle: 'DOUBLE_SOLID',
          color: '#BF713E',
        },
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Flowers/USA/Fall_Flowers_BOOKLET_BACK_USA.jpg',
          },
        },
      },
    ],
  },
  generateUserId: '42e2c862-d746-481d-8634-78cf1bb687b9',
  updatedAt: '2024-05-06T23:24:05.548Z',
  status: 'edited',
  createdAt: '2024-05-06T21:19:42.541Z',
  id: '23ceaec8-0011-410c-bdb3-3ee9c143b34b',
  case: '310f7929-7af9-4755-b0af-ad91a1466b2b',
  fileStatus: 'not_started',
} as unknown as ICardProductData

export const MOCK_SIDED_CARDS: Array<ICardProductData> = [MOCK_SIDED_CARD_1]

// Mock SidedCard Find response
export const MOCK_SIDED_CARD_FIND_RESPONSE_1: IFindResponse = {
  items: [MOCK_SIDED_CARD_1],
  count: 1,
  ref: '0df84fc45c54f',
}

export const MOCK_SIDED_CARD_FIND_RESPONSE_2: IFindResponse = {
  items: [],
  count: 0,
  ref: '0df84fc45c54f',
}

export const MOCK_SIDED_CARD_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.SIDED_CARD,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_SIDED_CARD_FIND_REQUEST_BODY_1 },
  response: MOCK_SIDED_CARD_FIND_RESPONSE_1,
}

export const MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: { body: MOCK_SIDED_CARD_FIND_REQUEST_BODY_1 },
  response: MOCK_SIDED_CARD_FIND_RESPONSE_2,
}

export const MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_3.webtoken,
  request: { body: MOCK_SIDED_CARD_FIND_REQUEST_BODY_1 },
  response: MOCK_SIDED_CARD_FIND_RESPONSE_1,
}

export const MOCK_SIDED_CARD_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [
    MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_1,
    MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_2,
    MOCK_SIDED_CARD_FIND_REQUEST_RESPONSE_3,
  ]
