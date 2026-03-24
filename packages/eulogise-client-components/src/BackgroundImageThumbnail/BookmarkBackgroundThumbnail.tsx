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

const DEFAULT_BOOKMARK_BACKGROUND_THEME: ICardProductTheme = {
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
      font: 'Comfortaa',
      fontSize: 8,
      color: '#4a4a4a',
    },
  },
  defaultContent: [
    {
      rows: [
        {
          id: 'grandeur-front-img',
          type: CardProductContentItemType.FRAME,
          data: {
            enableBorder: false,
            width: 132,
            content: {
              width: 132,
              lockAspectRatio: true,
              id: 'w58ut2pi',
              type: 'rows',
              items: [
                {
                  id: 'lsx8vp0i',
                  borderRadius: '100px',
                  type: 'content',
                  content: {
                    type: 'image',
                    filepath:
                      'bookmark/themes/example-images/granduer-profile.png',
                  },
                },
              ],
              height: 132,
            },
            isFullWidth: false,
            height: 132,
          },
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
            margin: [2, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 12,
            },
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
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
          id: 'nbyypixj',
          type: 'text',
          data: {
            width: 132,
            margin: [0.5, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 20,
            },
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: 'Test Name',
                  type: 'header-four',
                  key: '4eg16',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 84,
          },
        },
        {
          type: 'space',
          data: {
            height: 50,
          },
          id: 'h0cr5rjz',
        },
        {
          id: '66a0puy0',
          type: 'text',
          data: {
            width: 132,
            margin: [3.5, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 12,
            },
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: '20/03/1954',
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
          id: '31a0pzy0',
          type: 'text',
          data: {
            width: 132,
            margin: [3.5, 0],
            alignment: 'center',
            rowStyle: {
              fontSize: 12,
            },
            content: {
              blocks: [
                {
                  depth: 0,
                  data: {},
                  inlineStyleRanges: [],
                  text: '25/01/2023',
                  type: 'header-six',
                  key: '3w4ip',
                  entityRanges: [],
                },
              ],
              entityMap: {},
            },
            height: 16,
          },
        },
      ],
      background: {
        image: {
          filepath: undefined,
        },
        overlayMargin: [11, 4],
        overlayColor: '#ffffff',
        overlayOpacity: 0.85,
      },
    },
    {
      background: {
        image: {
          filepath: undefined,
        },
        overlayMargin: [11, 8],
      },
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
              fontSize: 16,
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
              fontSize: 8,
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
    },
  ],
}

export const BookmarkBackgroundThumbnail = ({
  isRegenerating,
  backgroundId,
  loadingMessage,
}: IProductThumbnailProps) => {
  const product = EulogiseProduct.BOOKMARK
  const frontBackgroundImagePath =
    BackgroundImageHelper.getBackgroundImageAssetKey(
      'BOOKMARK_FRONT',
      backgroundId,
      EulogiseRegion.AU,
    )
  const backBackgroundImagePath =
    BackgroundImageHelper.getBackgroundImageAssetKey(
      'BOOKMARK_BACK',
      backgroundId,
      EulogiseRegion.AU,
    )
  const productTheme = DEFAULT_BOOKMARK_BACKGROUND_THEME
  const backgroundPaths = [frontBackgroundImagePath, backBackgroundImagePath]
  const cardProduct = CardProductHelper.createDummyBookmarkData({
    productTheme,
    backgroundPaths,
  })
  return (
    <BaseBackgroundThumbnail
      isRegenerating={isRegenerating}
      backgroundImagePaths={backgroundPaths}
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
