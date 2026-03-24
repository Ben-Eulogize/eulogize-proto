import { MOCK_CASE_1 } from '../cases'
import {
  EulogiseResource,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  CardProductPageOrientation,
  CardProductPageSize,
  ICardProductData,
  MemorialVisualStatus,
} from '@eulogise/core'
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3 } from '../users'

// Mock Bookmark data
export const MOCK_BOOKMARK_1: ICardProductData = {
  content: {
    pageMargins: [5, 30],
    pageSize: CardProductPageSize.BOOKMARK,
    theme: 'grandeur',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        rows: [
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
                        length: 16,
                        style: 'ITALIC',
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
              height: 20,
            },
            id: 'judcggdv',
          },
          {
            type: 'space',
            data: {
              height: 20,
            },
            id: 'gkv3xlgf',
          },
          {
            type: 'image',
            data: {
              width: 132,
              filepath:
                'bookmark/themes/example-images/linen-front-profile.png',
              alignment: 'center',
              height: 160,
            },
            id: 'linen-front-img',
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
                    text: 'Kimberly Davenport',
                    type: 'header-two',
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 80,
            },
            id: 'eua58pfe',
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
                    text: '10 March 1954 - 10 January 2018',
                    type: 'paragraph-two',
                    key: '6q9cl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: '0c5m4j1n',
          },
        ],
        background: {
          image: {
            filepath: 'bookmark/themes/background-images/granduer-bg-front.jpg',
          },
        },
      },
      {
        rows: [
          {
            type: 'space',
            data: {
              height: 46,
            },
            id: '5gcnh1rx',
          },
          {
            type: 'image',
            data: {
              width: 132,
              filepath:
                'booklet/themes/example-images/linen-page-2-joao-2-images.jpg',
              alignment: 'center',
              height: 200,
            },
            id: '7fpzbhoz',
          },
          {
            type: 'space',
            data: {
              height: 5,
            },
            id: '5gdnh1rx',
          },
          {
            type: 'image',
            data: {
              width: 132,
              filepath:
                'booklet/themes/example-images/jordan-bauer-274427-unsplash-linen.jpg',
              alignment: 'center',
              height: 187,
            },
            id: '4fpzbhoz',
          },
          {
            type: 'text',
            data: {
              width: 132,
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
                        length: 20,
                        style: 'ITALIC',
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
              height: 11,
            },
            id: 'uz3c5q0m',
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
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Welcome',
                    type: 'header-four',
                    key: '9mo91',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'g3ybn9tn',
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
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: 'edufq',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: '7awhb9n9',
          },
          {
            type: 'space',
            data: {
              height: 24,
            },
            id: 'qib8cour',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [-0.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, Tears In Heaven',
                    type: 'header-four',
                    key: '72v2h',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'h11koudn',
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
                    inlineStyleRanges: [],
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '2pm4e',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: 'qgxlc9rn',
          },
          {
            type: 'space',
            data: {
              height: 24,
            },
            id: 'kqsjcbmj',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [-0.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Poem, Poem Name',
                    type: 'header-four',
                    key: '3so3u',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'ds6bp5b8',
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
                    inlineStyleRanges: [],
                    text: 'John Goodperson',
                    type: 'paragraph-one',
                    key: 'f30t',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: 'nuyje8jh',
          },
          {
            type: 'space',
            data: {
              height: 25,
            },
            id: 'qc9kn8mt',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [-0.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'First Tribute',
                    type: 'header-four',
                    key: 'cs1ua',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: '9cnyme64',
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
                    inlineStyleRanges: [],
                    text: 'Georgie Goodperson',
                    type: 'paragraph-one',
                    key: '6q58c',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: 'g6bofg56',
          },
          {
            type: 'space',
            data: {
              height: 23,
            },
            id: '1bhgpb30',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [-0.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Second Tribute',
                    type: 'header-four',
                    key: 'e0oec',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'rgyoxui9',
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
                    inlineStyleRanges: [],
                    text: 'Lucinda Goodperson',
                    type: 'paragraph-one',
                    key: '4j62j',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: 'nskvhs1o',
          },
          {
            type: 'space',
            data: {
              height: 25,
            },
            id: '9j86kcn8',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [-0.5, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Address',
                    type: 'header-four',
                    key: 'bqtk4',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: '7ym29wbi',
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
                    inlineStyleRanges: [],
                    text: 'Celebrant, Joshua Goodheart',
                    type: 'paragraph-one',
                    key: '61f17',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: '1z8ayrz8',
          },
          {
            type: 'space',
            data: {
              height: 27,
            },
            id: 'ee6jhyom',
          },
          {
            type: 'text',
            data: {
              width: 132,
              style: 'unstyled',
              margin: [0, 0],
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Hymn, When September Ends',
                    type: 'header-four',
                    key: 'eao43',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'sl4tu191',
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
                    inlineStyleRanges: [],
                    text: 'Sung by, Ivan Angelheart',
                    type: 'paragraph-one',
                    key: '75fu3',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 13,
            },
            id: 'p8q9bt2l',
          },
          {
            type: 'space',
            data: {
              height: 23,
            },
            id: 'gfjaj3ck',
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
                    inlineStyleRanges: [],
                    text: 'Words of Farewell',
                    type: 'header-four',
                    key: 'vfr6',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 18,
            },
            id: 'englrqf6',
          },
        ],
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
            type: 'image',
            data: {
              width: 132,
              filepath: 'bookmark/themes/example-images/linen-back-profile.png',
              alignment: 'center',
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
                        length: 62,
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
                        length: 60,
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
              height: 191,
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
                    text: 'Kimberly Davenport',
                    type: 'header-two',
                    key: 'cnf6f',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 80,
            },
            id: 'eua58pfe',
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
                    text: '10 March 1954 - 10 January 2018',
                    type: 'paragraph-two',
                    key: '6q9cl',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 20,
            },
            id: '0c5m4j1n',
          },
        ],
        background: {
          image: {
            filepath: 'bookmark/themes/background-images/granduer-bg-back.jpg',
          },
        },
      },
    ],
  },
  updatedAt: '2022-11-26T08:17:36.601Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2022-11-15T06:13:53.283Z',
  id: 'dc09d119-4286-4b6c-8bd4-9233a785e461',
  case: MOCK_CASE_1.id,
}

export const MOCK_BOOKMARKS: Array<ICardProductData> = [MOCK_BOOKMARK_1]

// Mock Bookmark Find response
export const MOCK_BOOKMARK_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_BOOKMARKS,
  count: MOCK_BOOKMARKS.length,
  ref: 'c4b30da0f071c',
}

export const MOCK_BOOKMARK_FIND_RESPONSE_2: IFindResponse = {
  items: [],
  count: 0,
  ref: 'c4b30da0f071c',
}

export const MOCK_BOOKMARK_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.BOOKMARK,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: {
    body: MOCK_BOOKMARK_FIND_REQUEST_BODY_1,
  },
  response: MOCK_BOOKMARK_FIND_RESPONSE_1,
}

export const MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_2: IFindRequestResponse = {
  webtoken: MOCK_USER_2.webtoken,
  request: {
    body: MOCK_BOOKMARK_FIND_REQUEST_BODY_1,
  },
  response: MOCK_BOOKMARK_FIND_RESPONSE_2,
}

export const MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_3: IFindRequestResponse = {
  webtoken: MOCK_USER_3.webtoken,
  request: {
    body: MOCK_BOOKMARK_FIND_REQUEST_BODY_1,
  },
  response: MOCK_BOOKMARK_FIND_RESPONSE_2,
}

export const MOCK_BOOKMARK_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [
    MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_1,
    MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_2,
    MOCK_BOOKMARK_FIND_REQUEST_RESPONSE_3,
  ]
