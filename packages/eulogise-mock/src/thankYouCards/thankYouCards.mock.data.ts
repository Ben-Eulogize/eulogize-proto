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

// Mock ThankYouCard data
export const MOCK_THANK_YOU_CARD_1: ICardProductData = {
  id: 'thankyoucard',
  case: MOCK_CASE_1.id,
  content: {
    pageMargins: [15, 20],
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        background: {
          image: {
            filepath:
              'thankyouCard/themes/background-images/reflection-bg-2.jpg',
          },
        },
        rows: [
          {
            id: 'sf1fbvcr',
            data: {
              height: 90,
            },
            type: 'space',
          },
          {
            id: '09cuoe77',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'bgrhm',
                    text: 'Thank You',
                    type: 'header-one',
                  },
                ],
                entityMap: {},
              },
              height: 50,
              margin: [0, 0],
              style: 'unstyled',
              width: 389,
            },
            type: 'text',
          },
          {
            id: 'tjg3h0xm',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 38,
                        offset: 0,
                        style: 'ITALIC',
                      },
                    ],
                    key: '9hqe8',
                    text: 'for your kind expression of sympathy',
                    type: 'header-six',
                  },
                ],
                entityMap: {},
              },
              height: 16,
              margin: [0, 0],
              style: 'unstyled',
              width: 389,
            },
            type: 'text',
          },
          {
            id: 'ly14btcr',
            data: {
              height: 57,
            },
            type: 'space',
          },
          {
            id: 'zc2139nx',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: '73pmq',
                    text: 'With love, the family of',
                    type: 'paragraph-one',
                  },
                ],
                entityMap: {},
              },
              height: 16,
              margin: [2, 0],
              style: 'unstyled',
              width: 389,
            },
            type: 'text',
          },
          {
            id: 'q3acuzqr',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: '3lipa',
                    text: 'Kimberly Davenport',
                    type: 'header-three',
                  },
                ],
                entityMap: {},
              },
              height: 24,
              margin: [0, 0],
              style: 'unstyled',
              width: 389,
            },
            type: 'text',
          },
        ],
      },
      {
        editable: false,
        rows: [
          {
            id: 'que9u0sj',
            data: {
              height: 24,
            },
            type: 'space',
          },
        ],
      },
    ],
    pageSize: CardProductPageSize.THANKYOUCARD,
    theme: 'reflection',
  },
  status: MemorialVisualStatus.INCOMPLETE,
}

export const MOCK_THANK_YOU_CARD_2: ICardProductData = {
  id: 'thankyoucard-2-cols',
  case: '9c2841f2-6617-41e9-a1ad-2dd7a9237668',
  content: {
    pageMargins: [15, 20],
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        background: {
          image: {
            filepath:
              'thankyouCard/themes/background-images/granduer-2cols-left-bg-2.png',
          },
        },
        rows: [
          {
            id: '0maclb4z',
            data: {
              height: 50,
            },
            type: 'space',
          },
          {
            id: 'grandeur-front-img',
            data: {
              alignment: 'center',
              filepath:
                'thankyouCard/themes/example-images/granduer-old-person-portrait.png',
              height: 172,
              width: 172,
            },
            type: 'image',
          },
        ],
      },
      {
        background: {
          image: {
            filepath:
              'thankyouCard/themes/background-images/granduer-2cols-right-bg-2.png',
          },
        },
        rows: [
          {
            id: '9maclb4b',
            data: {
              height: 20,
            },
            type: 'space',
          },
          {
            id: 'l74qu3fi',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 9,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: '913dj',
                    text: 'Thank You',
                    type: 'header-one',
                  },
                ],
                entityMap: {},
              },
              height: 35,
              margin: [2, 0],
              width: 150,
            },
            type: 'text',
          },
          {
            id: '0msdflfz',
            data: {
              height: 33,
            },
            type: 'space',
          },
          {
            id: 'yg7tujs0',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 28,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: 'drrrl',
                    text: 'We would like to express our',
                    type: 'paragraph-one',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 27,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: '8dfio',
                    text: 'Gratitude for your kindness',
                    type: 'paragraph-one',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 23,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: 'sffio',
                    text: 'and prayers during this',
                    type: 'paragraph-one',
                  },
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 14,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: 'ssfml',
                    text: 'difficult time',
                    type: 'paragraph-one',
                  },
                ],
                entityMap: {},
              },
              height: 59,
              margin: [0, 0],
              width: 150,
            },
            type: 'text',
          },
          {
            id: 'smflsjf8',
            data: {
              height: 48,
            },
            type: 'space',
          },
          {
            id: 'c5hwfx7s',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 13,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: 'drrrl',
                    text: 'The family of',
                    type: 'paragraph-one',
                  },
                ],
                entityMap: {},
              },
              height: 14,
              margin: [0, 0],
              width: 150,
            },
            type: 'text',
          },
          {
            id: 'up2c8o4t',
            data: {
              alignment: 'center',
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [
                      {
                        length: 12,
                        offset: 0,
                        style: 'dark-grey',
                      },
                    ],
                    key: 'dscg2',
                    text: 'Diego Garcia',
                    type: 'header-five',
                  },
                ],
                entityMap: {},
              },
              height: 19,
              margin: [0, 0],
              width: 150,
            },
            type: 'text',
          },
        ],
      },
      {
        editable: false,
        rows: [
          {
            id: '0m9hlg1z',
            data: {
              height: 33,
            },
            type: 'space',
          },
        ],
      },
      {
        editable: false,
        rows: [
          {
            id: '0m9hlg6z',
            data: {
              height: 33,
            },
            type: 'space',
          },
        ],
      },
    ],
    pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
    theme: 'grandeur',
  },
  status: MemorialVisualStatus.INCOMPLETE,
}

export const MOCK_THANK_YOU_CARD_3: ICardProductData = {
  content: {
    pageMargins: [15, 40],
    pageSize: CardProductPageSize.THANKYOUCARD,
    theme: 'classic',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [{ rows: [] }, { rows: [] }],
  },
  updatedAt: '2021-05-26T14:13:12.904Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2021-05-26T14:13:12.904Z',
  id: 'b8a797de-139a-4660-a1f7-faab80423965',
  case: MOCK_CASE_1.id,
}

export const MOCK_THANK_YOU_CARD_4: ICardProductData = {
  content: {
    pageMargins: [15, 40],
    pageSize: CardProductPageSize.THANKYOUCARD,
    theme: 'linen',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [{ rows: [] }, { rows: [] }],
  },
  updatedAt: '2021-05-26T14:05:39.603Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2021-05-26T14:05:39.603Z',
  id: 'd916b9c2-9bfd-4ccc-9ce8-7d23e5ec7ebd',
  case: MOCK_CASE_1.id,
}

export const MOCK_THANK_YOU_CARD_5: ICardProductData = {
  content: {
    pageMargins: [15, 40],
    pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
    theme: 'grandeur',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [{ rows: [] }, { rows: [] }, { rows: [] }, { rows: [] }],
  },
  updatedAt: '2021-05-26T14:12:36.186Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2021-05-26T14:12:36.186Z',
  id: '455d308e-01a1-40d6-9b40-06e370aeec75',
  case: MOCK_CASE_1.id,
}

export const MOCK_THANK_YOU_CARD_6: ICardProductData = {
  content: {
    pageMargins: [15, 40],
    pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
    theme: 'aura',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [{ rows: [] }, { rows: [] }, { rows: [] }, { rows: [] }],
  },
  updatedAt: '2021-05-26T13:59:34.756Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2021-05-26T13:59:34.755Z',
  id: '5ee084d3-0664-4959-8776-3092917710e9',
  case: MOCK_CASE_1.id,
}

export const MOCK_THANK_YOU_CARD_7: ICardProductData = {
  content: {
    pageMargins: [15, 40],
    pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
    theme: 'aura',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [{ rows: [] }, { rows: [] }, { rows: [] }, { rows: [] }],
  },
  updatedAt: '2021-05-26T14:18:22.986Z',
  status: MemorialVisualStatus.INCOMPLETE,
  createdAt: '2021-05-26T14:18:22.986Z',
  id: 'd419acb5-4d4e-4400-a4ff-0ba497357645',
  case: MOCK_CASE_1.id,
}

export const MOCK_THANK_YOU_CARDS: Array<ICardProductData> = [
  MOCK_THANK_YOU_CARD_1,
  MOCK_THANK_YOU_CARD_2,
  MOCK_THANK_YOU_CARD_3,
  MOCK_THANK_YOU_CARD_4,
  MOCK_THANK_YOU_CARD_5,
  MOCK_THANK_YOU_CARD_6,
  MOCK_THANK_YOU_CARD_7,
]

// Mock ThankYouCard Find response
export const MOCK_THANK_YOU_CARD_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_THANK_YOU_CARDS,
  count: MOCK_THANK_YOU_CARDS.length,
  ref: '783942a4f403c',
}

export const MOCK_THANK_YOU_CARD_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.THANK_YOU_CARD,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_1: IFindRequestResponse =
  {
    webtoken: MOCK_USER_1.webtoken,
    request: { body: MOCK_THANK_YOU_CARD_FIND_REQUEST_BODY_1 },
    response: MOCK_THANK_YOU_CARD_FIND_RESPONSE_1,
  }

export const MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_2: IFindRequestResponse =
  {
    webtoken: MOCK_USER_2.webtoken,
    request: { body: MOCK_THANK_YOU_CARD_FIND_REQUEST_BODY_1 },
    response: MOCK_THANK_YOU_CARD_FIND_RESPONSE_1,
  }

export const MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_3: IFindRequestResponse =
  {
    webtoken: MOCK_USER_3.webtoken,
    request: { body: MOCK_THANK_YOU_CARD_FIND_REQUEST_BODY_1 },
    response: MOCK_THANK_YOU_CARD_FIND_RESPONSE_1,
  }

export const MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [
    MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_1,
    MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_2,
    MOCK_THANK_YOU_CARD_FIND_REQUEST_RESPONSE_3,
  ]
