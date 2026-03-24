import {
  CardProductContentItemType,
  ICardProductNewPageStyles,
  ICardProductRow,
  EulogiseRegion,
  US_BOOKLET_CONTENT_WIDTH,
  AU_BOOKLET_CONTENT_WIDTH,
  AU_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH,
  US_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH,
  EulogiseImageSize,
  GetImageUrlOption,
  CardProductPageSize,
  IPhotobookSizeOption,
  PhotobookBookStyle,
} from '@eulogise/core'

// 4px is a random number to fix "Image jumps in frame after repositioning"
// refer to https://trello.com/c/zXSRXNzW/1433-image-jumps-in-frame-after-repositioning
export const CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD = 4
export const MAX_CARD_PRODUCT_PHOTO_SIZE: EulogiseImageSize = {
  width: 1200,
  height: 1200,
}
export const DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS: GetImageUrlOption = {
  isFormatToJpg: true,
  // only apply max size if the image is bigger than the max size (either width or height)
  ...MAX_CARD_PRODUCT_PHOTO_SIZE,
}

export const CARD_PRODUCT_NEW_PAGE_TEXT_ROWS = (
  newPageStyles: ICardProductNewPageStyles,
  themeId: string,
  region: EulogiseRegion,
): Array<ICardProductRow> => {
  const regionTextWidth =
    region === EulogiseRegion.USA
      ? US_BOOKLET_CONTENT_WIDTH
      : AU_BOOKLET_CONTENT_WIDTH
  switch (themeId) {
    case 'grace':
      return [
        {
          id: 'nircvubh',
          type: 'space',
          data: {
            height: 52,
          },
        },
        {
          id: '2mghjt55',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '80qbc',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'z9f59x15',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '7p2ti',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'niacvubh',
          type: 'space',
          data: {
            height: 52,
          },
        },
        {
          id: 'rqatbdnq',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '90b58',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'box1t8p2',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '3q0tn',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'id9t43uk',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '989qi',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
      ]
    case 'classic':
      return [
        {
          id: 'vzvgubh',
          type: 'space',
          data: {
            height: 40,
          },
        },
        {
          id: 'h95mxbea',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: 'cpuv0',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'wryko0nw',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: 'evp9m',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            },
            style: 'unstyled',
            margin: [5, -0.26499999999998636],
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: '2mghjt55',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '80qbc',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'z9f59x15',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '7p2ti',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'rqatbdnq',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '90b58',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'box1t8p2',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '3q0tn',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
      ]
    default:
      return [
        {
          id: 'h95mxbea',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: 'cpuv0',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'wryko0nw',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: 'evp9m',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {},
                },
              ],
              entityMap: {},
            },
            style: 'unstyled',
            margin: [5, -0.26499999999998636],
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: '2mghjt55',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '80qbc',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'z9f59x15',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '7p2ti',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'rqatbdnq',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '90b58',
                  text: 'Your Text Here',
                  type: newPageStyles.header,
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
            height: newPageStyles.headerHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
        {
          id: 'box1t8p2',
          type: 'text',
          data: {
            content: {
              blocks: [
                {
                  key: '3q0tn',
                  text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
                  type: newPageStyles.paragraph,
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
            height: newPageStyles.paragraphHeight,
            width: regionTextWidth,
            alignment: 'center',
          },
        },
      ]
  }
}

export const CARD_PRODUCT_NEW_PAGE_FRAMES_ROWS = (
  region: EulogiseRegion,
): Array<ICardProductRow> => {
  const regionTextWidth =
    region === EulogiseRegion.USA
      ? US_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH
      : AU_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH
  return [
    {
      type: CardProductContentItemType.FRAME,
      data: {
        width: regionTextWidth,
        content: {
          width: regionTextWidth,
          id: 'vzxr6mw4',
          type: 'columns',
          items: [
            {
              type: 'content',
              content: {
                transformY: -110,
                renderImageWidth: 220,
                transformX: -110,
                renderImageHeight: 220,
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
                    filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
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
                    filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                  },
                  id: 'm5358jf7',
                },
              ],
              id: 'o9uh8nca',
            },
          ],
          height: 227,
        },
        height: 227,
      },
      id: '3dffd50w',
    },
    {
      type: CardProductContentItemType.FRAME,
      data: {
        width: regionTextWidth,
        content: {
          width: regionTextWidth,
          id: 'e26netcm',
          type: 'rows',
          items: [
            {
              type: 'content',
              content: {
                transformY: -174,
                renderImageWidth: 348,
                transformX: -174,
                renderImageHeight: 348,
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
                    filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
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
                    filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                  },
                  id: 'khhku2oc',
                },
              ],
              id: 'h96am2qg',
            },
          ],
          height: 282,
        },
        height: 282,
      },
      id: 'fp4wkgwy',
    },
  ]
}

export const CARD_PRODUCT_NEW_PAGE_IMAGE_ROWS = (
  newPageStyles: ICardProductNewPageStyles,
  region: EulogiseRegion,
): Array<ICardProductRow> => {
  const regionTextWidth =
    region === EulogiseRegion.USA
      ? US_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH
      : AU_BOOKLET_NEW_PAGE_FRAMES_ROWS_WIDTH
  return [
    {
      id: '12xmpyt8',
      type: 'space',
      data: {
        height: 32,
        divider: {
          asset: {
            id: null,
            name: 'Divider 20',
            filepath: null,
          },
        },
      },
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
        },
        height: 280,
      },
      id: 'omfdzst06',
    },
    {
      id: '6b4bow39',
      type: 'text',
      data: {
        content: {
          blocks: [
            {
              key: '1rliq',
              text: 'Your Text Here',
              type: newPageStyles.header,
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
        height: 27,
        width: regionTextWidth,
        alignment: 'center',
      },
    },
    {
      id: 'co0f8spb',
      type: 'text',
      data: {
        content: {
          blocks: [
            {
              key: 'rhao',
              text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.',
              type: newPageStyles.paragraph,
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
        height: 118,
        width: regionTextWidth,
        alignment: 'center',
      },
    },
    {
      id: 'niregubh',
      type: 'space',
      data: {
        height: 20,
        divider: {
          asset: {
            id: null,
            name: 'Divider 20',
            filepath: null,
          },
        },
      },
    },
  ]
}

export const PHOTOBOOK_SIZES_BY_REGION: Record<
  EulogiseRegion,
  { [CardProductPageSize: string]: string }
> = {
  [EulogiseRegion.USA]: {
    [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM]: '9.25 x 7.4"',
    [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE]: '13 x 11"',
    [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM]: '8.6 x 6.4"',
    [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE]: '12.7 x 9.5"',
  },
  [EulogiseRegion.AU]: {
    [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM]: '23.5 x 18.8cm',
    [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE]: '33.0 x 27.9cm',
    [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM]: '21.8 x 16.2cm',
    [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE]: '32.3 x 24.1cm',
  },
}

export const PHOTOBOOK_SIZE_OPTIONS: Array<IPhotobookSizeOption> = [
  {
    label: 'Medium - Landscape',
    value: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
    availableBookStyles: [PhotobookBookStyle.CLASSIC_PHOTOBOOK],
  },
  {
    label: 'Large - Landscape',
    value: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    availableBookStyles: [PhotobookBookStyle.CLASSIC_PHOTOBOOK],
  },
  {
    label: 'Medium - Landscape',
    value: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    availableBookStyles: [PhotobookBookStyle.PREMIUM_PHOTOBOOK],
  },
  {
    label: 'Large - Landscape',
    value: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    availableBookStyles: [PhotobookBookStyle.PREMIUM_PHOTOBOOK],
  },
]
