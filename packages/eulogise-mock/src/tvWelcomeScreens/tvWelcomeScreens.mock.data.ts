import {
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductPageOrientation,
  CardProductPageSize,
  ICardProductData,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { MOCK_CASE_1 } from '../cases'

export const MOCK_TV_WELCOME_SCREEN_1: ICardProductData = {
  id: 'e3079c55-721e-46db-b900-fb1974be4dde',
  case: MOCK_CASE_1.id,
  content: {
    pageMargins: [15, 20],
    pageSize: CardProductPageSize.TV_WELCOME_SCREEN_2_COLS,
    theme: 'reflection',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
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
              height: 106,
            },
            id: '0m9h6b1z',
          },
          {
            type: 'text',
            data: {
              margin: [30.5, 0],
              rowStyle: {
                fontSize: 32,
                font: 'Raleway',
              },
              width: 290,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: 'Otto Donovan',
                    type: 'unstyled',
                    key: 'atdpj',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 10,
            },
            id: 'f5eztcev',
          },
          {
            type: 'text',
            data: {
              margin: [5, 0],
              rowStyle: {
                fontSize: 14,
              },
              width: 290,
              style: 'unstyled',
              alignment: 'center',
              content: {
                blocks: [
                  {
                    depth: 0,
                    data: {},
                    inlineStyleRanges: [],
                    text: '28 December 1938 - 21 June 2023',
                    type: 'unstyled',
                    key: 'a3ak1',
                    entityRanges: [],
                  },
                ],
                entityMap: {},
              },
              height: 10,
            },
            id: 'p5j65hnd',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Leaves/AU/Fall_Leaves_TV_WELCOME_SCREEN_LEFT.jpg',
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
            type: 'space',
            data: {
              divider: {
                asset: {
                  name: 'Divider 20',
                  filepath: null,
                  id: null,
                },
              },
              height: 38,
            },
            id: 'y1mdzm3c',
          },
          {
            type: 'image',
            data: {
              width: 250,
              filepath:
                'booklet/themes/example-images/rawpixel-423648-unsplash-cropped.jpg',
              alignment: 'center',
              height: 250,
            },
            id: 'n1uon558',
          },
        ],
        background: {
          image: {
            filepath:
              'backgroundImages/Fall_Leaves/AU/Fall_Leaves_TV_WELCOME_SCREEN_RIGHT.jpg',
          },
        },
      },
    ],
  },
  createdAt: '2023-05-23T11:01:17.034Z',
  fileStatus: ResourceFileStatus.FAILED,
  status: MemorialVisualStatus.EDITED,
  updatedAt: '2023-05-23T11:01:17.034Z',
}
