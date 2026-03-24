import React from 'react'
import {
  CardProductContentItemType,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductTheme,
} from '@eulogise/core'
import { BackgroundImageHelper, CardProductHelper } from '@eulogise/helpers'
import { CardProductPageThumbnail } from '../CardProductPageThumbnail/CardProductPageThumbnail'
import { BaseBackgroundThumbnail } from './BaseBackgroundThumbnail'
import { IProductThumbnailProps } from './IProductThumbnailProps'

const DEFAULT_TV_WELCOME_SCREEN_BACKGROUND_THEME: ICardProductTheme = {
  id: 'grandeur',
  name: 'Grandeur',
  thumbnail: {
    images: [],
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
      fontSize: 8,
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
            divider: {
              asset: {
                name: 'Divider 20',
                filepath: null,
                id: null,
              },
            },
            height: 25,
          },
          id: 'abspjidc',
        },
        {
          id: '3v98derv',
          type: CardProductContentItemType.FRAME,
          data: {
            enableBorder: false,
            width: 280,
            content: {
              width: 280,
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
                  },
                },
              ],
              height: 280,
            },
            isFullWidth: false,
            height: 280,
          },
        },
      ],
      background: {
        image: {
          filepath:
            'backgroundImages/Beach/AU/Beach_TV_WELCOME_SCREEN_LEFT.jpg',
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
            height: 64,
          },
          id: '5vwn60q7',
        },
        {
          id: 'zqdoy9sx',
          type: 'text',
          data: {
            margin: [17, 0],
            rowStyle: {
              fontSize: 32,
            },
            width: 290,
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
                  text: 'Test Name',
                  type: 'header-one',
                  key: 'dbpr0',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 90,
          },
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
            height: 52,
          },
          id: '0ut2mmba',
        },
        {
          id: 'cmisqvjf',
          type: 'text',
          data: {
            margin: [5, 0],
            rowStyle: {
              fontSize: 12,
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
                  text: '20/03/1954 - 25/01/2023',
                  type: 'header-six',
                  key: 'cdnn1',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 17,
          },
        },
      ],
      background: {
        image: {
          filepath:
            'backgroundImages/Beach/AU/Beach_TV_WELCOME_SCREEN_RIGHT.jpg',
        },
        overlayMargin: [11, 8],
        overlayColor: '#ffffff',
        overlayOpacity: 0.85,
      },
    },
  ],
}

export const TvWelcomeScreenBackgroundThumbnail = ({
  isRegenerating,
  backgroundId,
  loadingMessage,
}: IProductThumbnailProps) => {
  const leftType = 'TV_WELCOME_SCREEN_LEFT'
  const rightType = 'TV_WELCOME_SCREEN_RIGHT'
  const product = EulogiseProduct.TV_WELCOME_SCREEN
  const leftBackgroundImagePath =
    BackgroundImageHelper.getBackgroundImageAssetKey(
      leftType,
      backgroundId,
      EulogiseRegion.AU,
    )
  const rightBackgroundImagePath =
    BackgroundImageHelper.getBackgroundImageAssetKey(
      rightType,
      backgroundId,
      EulogiseRegion.AU,
    )
  const productTheme = DEFAULT_TV_WELCOME_SCREEN_BACKGROUND_THEME
  const cardProduct = CardProductHelper.createDummyTvWelcomeScreenCardData({
    productTheme,
    backgroundPaths: [leftBackgroundImagePath, rightBackgroundImagePath],
  })
  return (
    <BaseBackgroundThumbnail
      isRegenerating={isRegenerating}
      backgroundImagePaths={[leftBackgroundImagePath, rightBackgroundImagePath]}
      loadingMessage={loadingMessage}
    >
      <CardProductPageThumbnail
        cardProduct={cardProduct}
        productTheme={productTheme!}
        product={product}
      />
    </BaseBackgroundThumbnail>
  )
}
