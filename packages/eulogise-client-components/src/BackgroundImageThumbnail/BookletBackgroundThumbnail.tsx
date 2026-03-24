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

const DEFAULT_BOOKLET_BACKGROUND_THEME: ICardProductTheme = {
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
          filepath: 'backgroundImages/Beach//Beach_BOOKLET_FRONT.jpg',
        },
        overlayMargin: [11, 8],
        overlayColor: '#ffffff',
        overlayOpacity: 0.85,
      },
      rows: [
        {
          id: 'grandeur-front-img',
          type: CardProductContentItemType.FRAME,
          data: {
            isFullWidth: false,
            enableBorder: false,
            width: 340,
            height: 340,
            content: {
              lockAspectRatio: true,
              width: 340,
              height: 340,
              type: 'rows',
              items: [
                {
                  borderRadius: '200px',
                  id: 'lsx8vp0i',
                  type: 'content',
                  content: {
                    type: 'image',
                    filepath:
                      'booklet/themes/example-images/diego-duarte-cereceda-622861-unsplash-masked.png',
                  },
                },
              ],
              id: 'w58ut2pi',
            },
          },
        },
        {
          id: 'h0nz5rjz',
          type: 'space',
          data: {
            height: 18,
          },
        },
        {
          id: '66a0pzyx',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '9m1ib',
                  text: '20 March 1954 - 25 January 2023',
                  type: 'header-six',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            },
            margin: [3.5, 0],
            width: 360,
            height: 17,
            alignment: 'center',
          },
        },
        {
          id: 'nbyypixj',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '4eg16',
                  text: 'Test Name',
                  type: 'header-one',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            },
            margin: [5, 0],
            width: 360,
            height: 45,
            alignment: 'center',
          },
        },
        {
          id: 'hcnz5hjz',
          type: 'space',
          data: {
            height: 18,
          },
        },
        {
          id: 'ju8xuzx1',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '7rk74',
                  text: 'Eastern Suburbs Memorial Park West Chapel',
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
            width: 360,
            height: 17,
            alignment: 'center',
          },
        },
        {
          id: 'j28c2cdz',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: 'e9s6f',
                  text: 'Monday 18 January 2023 at 5:05 pm',
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
            width: 360,
            height: 17,
            alignment: 'center',
          },
        },
      ],
    },
  ],
}

export const BookletBackgroundThumbnail = ({
  isRegenerating,
  backgroundId,
  loadingMessage,
}: IProductThumbnailProps) => {
  const type = 'BOOKLET_FRONT'
  const product = EulogiseProduct.BOOKLET
  const backgroundImagePath = BackgroundImageHelper.getBackgroundImageAssetKey(
    type,
    backgroundId,
    EulogiseRegion.AU,
  )

  const productTheme = DEFAULT_BOOKLET_BACKGROUND_THEME
  const cardProduct = CardProductHelper.createDummyBookletData({
    productTheme,
    backgroundPaths: [backgroundImagePath],
  })

  return (
    <BaseBackgroundThumbnail
      isRegenerating={isRegenerating}
      loadingMessage={loadingMessage}
      backgroundImagePaths={[backgroundImagePath]}
    >
      <CardProductPageThumbnail
        cardProduct={cardProduct}
        productTheme={productTheme!}
        product={product}
      />
    </BaseBackgroundThumbnail>
  )
}
