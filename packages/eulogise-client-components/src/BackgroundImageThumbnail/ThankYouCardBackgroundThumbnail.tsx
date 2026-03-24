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

const DEFAULT_THANK_YOU_CARD_BACKGROUND_THEME: ICardProductTheme = {
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
            height: 50,
          },
          id: '0maclb4z',
        },
        {
          id: 'grandeur-front-img',
          type: CardProductContentItemType.FRAME,
          data: {
            enableBorder: false,
            width: 172,
            content: {
              width: 172,
              lockAspectRatio: true,
              id: 'w58ut2pi',
              type: 'rows',
              items: [
                {
                  id: 'lsx8vp0i',
                  borderRadius: '100px',
                  type: 'content',
                  content: {
                    transformY: -90,
                    transformX: -90,
                    renderImageHeight: 180,
                    filepath:
                      'thankyouCard/themes/example-images/granduer-old-person-portrait.png',
                    renderImageWidth: 180,
                    type: 'image',
                  },
                },
              ],
              height: 172,
            },
            isFullWidth: false,
            height: 172,
          },
        },
      ],
      background: {
        image: {
          filepath:
            'backgroundImages/Beach/AU/Beach_THANK_YOU_CARD_2_COL_LEFT.jpg',
        },
        overlayMargin: [4, 8],
      },
    },
    {
      rows: [
        {
          type: 'space',
          data: {
            height: 46,
          },
          id: '9maclb4b',
        },
        {
          type: 'text',
          data: {
            margin: [2, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 24,
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
                  text: 'Thank You',
                  type: 'header-three',
                  key: '913dj',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 30,
          },
          id: 'l74qu3fi',
        },
        {
          type: 'space',
          data: {
            height: 40,
          },
          id: '0msdflfz',
        },
        {
          type: 'text',
          data: {
            width: 150,
            margin: [0, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 10,
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
                  text: 'We would like to express our',
                  type: 'paragraph-one',
                  key: 'drrrl',
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
                  text: 'Gratitude for your kindness',
                  type: 'paragraph-one',
                  key: '8dfio',
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
                  text: 'and prayers during this',
                  type: 'paragraph-one',
                  key: 'sffio',
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
                  text: 'difficult time',
                  type: 'paragraph-one',
                  key: 'ssfml',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 70,
          },
          id: 'yg7tujs0',
        },
        {
          type: 'space',
          data: {
            height: 30,
          },
          id: 'smflsjf8',
        },
        {
          type: 'text',
          data: {
            width: 150,
            margin: [0, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 10,
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
                  text: 'The family of',
                  type: 'paragraph-one',
                  key: 'drrrl',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 14,
          },
          id: 'c5hwfx7s',
        },
        {
          id: 'up2c8o4t',
          type: 'text',
          data: {
            width: 150,
            margin: [0, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 10,
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
                  text: 'Deceased',
                  type: 'paragraph-one',
                  key: 'dscg2',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 14,
          },
        },
      ],
      background: {
        image: {
          filepath:
            'backgroundImages/Beach/AU/Beach_THANK_YOU_CARD_2_COL_RIGHT.jpg',
        },
        overlayMargin: [11, 8],
        overlayColor: '#ffffff',
        overlayOpacity: 0.85,
      },
    },
  ],
}

export const ThankYouCardBackgroundThumbnail = ({
  isRegenerating,
  backgroundId,
  loadingMessage,
}: IProductThumbnailProps) => {
  const leftType = 'THANK_YOU_CARD_2_COL_LEFT'
  const rightType = 'THANK_YOU_CARD_2_COL_RIGHT'
  const product = EulogiseProduct.THANK_YOU_CARD
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
  const productTheme = DEFAULT_THANK_YOU_CARD_BACKGROUND_THEME
  const cardProduct = CardProductHelper.createDummyThankYouCardData({
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
