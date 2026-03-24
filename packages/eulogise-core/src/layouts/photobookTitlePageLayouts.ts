import {
  AlignmentType,
  CardProductContentItemType,
  ICardProductFadeEdgeType,
  EulogiseImageOrientation,
  IPhotobookPageLayout,
} from '../types'
import { DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE } from '../constants'

const CENTER_FRAME_SIZE = 338
const CARD_PRODUCT_BORDER_SIZE = 3
const CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH =
  CENTER_FRAME_SIZE + CARD_PRODUCT_BORDER_SIZE * 2 // 3px * 2 for both sides
const CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH = 586 + CARD_PRODUCT_BORDER_SIZE * 2

export const PHOTOBOOK_TITLE_PAGE_LAYOUT_1: IPhotobookPageLayout = {
  layoutId: 'photobook-title-page-layout-1',
  rows: [
    {
      id: 'kowb8w07',
      data: {
        height: 30,
      },
      type: 'space',
    },
    {
      data: {
        enableBorder: false,
        width: CENTER_FRAME_SIZE,
        alignment: AlignmentType.CENTER,
        content: {
          width: CENTER_FRAME_SIZE,
          lockAspectRatio: false,
          id: 'w58ut2pi',
          type: 'rows',
          items: [
            {
              id: 'lsx8vp0i',
              borderRadius: '0px',
              type: 'content',
              content: {
                transformY: -140,
                renderImageWidth: 276,
                renderImageHeight: 276,
                transformX: -140,
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
              },
            },
          ],
          height: CENTER_FRAME_SIZE,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: CENTER_FRAME_SIZE,
      },
      type: CardProductContentItemType.FRAME,
      id: 'modern-minimal-front-img',
    },
    {
      type: 'text',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 22,
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '2c4oi',
              text: 'In Loving Memory',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 40,
      },
      id: '1p5p6dyf',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Jost',
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '9hqe8',
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 20,
      },
      type: 'text',
      id: 'tjg3h0xm',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Jost',
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{dateOfBirth}} - {{dateOfDeath}}',
              type: 'paragraph-one',
              key: '36l6i',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 20,
      },
      type: 'text',
      id: 'q3azuzcv',
    },
    {
      id: 'cowb8w07',
      data: {
        height: 30,
      },
      type: 'space',
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.SQUARE],
  },
}

export const PHOTOBOOK_TITLE_PAGE_LAYOUT_2: IPhotobookPageLayout = {
  layoutId: 'photobook-title-page-layout-2',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 16,
      },
      type: 'space',
      id: 'kowb8w07',
    },
    {
      type: 'text',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 22,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '2c4oi',
              text: 'In Loving Memory',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 36,
      },
      id: '1p5p6dyf',
    },
    {
      id: 'modern-minimal-front-img',
      data: {
        enableBorder: false,
        width: CENTER_FRAME_SIZE,
        alignment: AlignmentType.CENTER,
        content: {
          width: CENTER_FRAME_SIZE,
          lockAspectRatio: false,
          id: 'w58ut2pi',
          type: 'rows',
          items: [
            {
              id: 'lsx8vp0i',
              borderRadius: '0px',
              type: 'content',
              content: {
                transformY: -140,
                renderImageHeight: 276,
                transformX: -140,
                renderImageWidth: 276,
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
              },
            },
          ],
          height: CENTER_FRAME_SIZE,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: CENTER_FRAME_SIZE,
      },
      type: CardProductContentItemType.FRAME,
    },
    {
      id: 'tjg3h0xm',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '9hqe8',
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 31,
      },
      type: 'text',
    },
    {
      id: 'q3azuzcv',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '36l6i',
              text: '{{dateOfBirth}} - {{dateOfDeath}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 20,
      },
      type: 'text',
    },
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
          height: 30,
        },
        height: 30,
      },
      type: 'space',
      id: 'cowb8w07',
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.SQUARE],
  },
}

export const PHOTOBOOK_TITLE_PAGE_LAYOUT_3: IPhotobookPageLayout = {
  layoutId: 'photobook-title-page-layout-3',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 19,
      },
      type: 'space',
      id: 'kowb8w07',
    },
    {
      id: 'fdafda333',
      data: {
        enableBorder: false,
        width: 586,
        content: {
          width: 586,
          lockAspectRatio: false,
          id: 'w58ut2pi',
          type: 'rows',
          items: [
            {
              id: 'lsx8vp0i',
              borderRadius: '0px',
              type: 'content',
              content: {
                transformY: -181,
                renderImageHeight: 362,
                transformX: -181,
                renderImageWidth: 362,
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
              },
            },
          ],
          height: 315,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: 315,
      },
      type: CardProductContentItemType.FRAME,
    },
    {
      id: 'mgzwozl0',
      type: 'space',
      data: {
        height: 10,
        divider: {
          asset: {
            id: null,
          },
        },
      },
    },
    {
      type: 'text',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 22,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
        style: 'unstyled',
        alignment: 'right',
        content: {
          blocks: [
            {
              key: '2c4oi',
              text: 'In Loving Memory',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 33,
      },
      id: '1p5p6dyf',
    },
    {
      id: 'tjg3h0xm',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
        style: 'unstyled',
        alignment: 'right',
        content: {
          blocks: [
            {
              key: '9hqe8',
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 25,
      },
      type: 'text',
    },
    {
      id: 'q3azuzcv',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 14,
          font: 'Lora',
        },
        width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
        style: 'unstyled',
        alignment: 'right',
        content: {
          blocks: [
            {
              key: '36l6i',
              text: '{{dateOfBirth}} - {{dateOfDeath}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 25,
      },
      type: 'text',
    },
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 28,
      },
      type: 'space',
      id: 'cowb8w07',
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
  },
}

export const PHOTOBOOK_PORTRAIT_NO_TEXT_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-portrait-no-text-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 30,
      },
      type: 'space',
      id: 'kowb8w09',
    },
    {
      id: 'fdafda333',
      data: {
        enableBorder: false,
        width: 281,
        content: {
          width: 281,
          lockAspectRatio: false,
          id: 'w58ut2pi',
          type: 'rows',
          items: [
            {
              id: 'lsx8vp0i',
              borderRadius: '0px',
              type: 'content',
              content: {
                renderImageWidth: 590,
                transformY: -297,
                renderImageHeight: 590,
                transformX: -297,
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
              },
            },
          ],
          height: 375,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: 375,
      },
      type: CardProductContentItemType.FRAME,
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.PORTRAIT],
  },
}

export const PHOTOBOOK_PORTRAIT_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-portrait-with-top-phase-and-bottom-details-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 10,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'A Life Remembered',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 36,
        },
        id: '1p5p6dyf',
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 10,
        },
        type: 'space',
        id: 'spacew07',
      },
      {
        id: 'fdafda333',
        data: {
          enableBorder: false,
          width: 281,
          content: {
            width: 281,
            lockAspectRatio: false,
            id: 'w58ut2pi',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                  transformX: -193.5,
                  transformY: -191.5,
                  renderImageHeight: 383,
                  renderImageWidth: 383,
                },
              },
            ],
            height: 375,
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          },
          isFullWidth: false,
          height: 375,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 31,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const PHOTOBOOK_PORTRAIT_WITH_ALL_COPY_BOTTOM_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-portrait-with-all-copy-bottom-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 16,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        id: 'fdasda333',
        data: {
          enableBorder: false,
          width: 262,
          content: {
            width: 262,
            lockAspectRatio: false,
            id: 'w58ut2pi',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  transformY: -188.5,
                  renderImageWidth: 376.99999999999994,
                  transformX: -190.49999999999997,
                  renderImageHeight: 377,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 350,
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          },
          isFullWidth: false,
          height: 350,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 4,
        },
        type: 'space',
        id: 'spacew07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'A Life Remembered',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 36,
        },
        id: '1p5p6dyf',
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 31,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const PHOTOBOOK_SQUARE_NO_TEXT: IPhotobookPageLayout = {
  layoutId: 'photobook-square-no-text',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 56,
      },
      type: 'space',
      id: 'kowb9w07',
    },
    {
      id: 'modern-minimal-front-img',
      data: {
        enableBorder: false,
        width: CENTER_FRAME_SIZE,
        alignment: AlignmentType.CENTER,
        content: {
          width: CENTER_FRAME_SIZE,
          lockAspectRatio: false,
          id: 'w58ut2pi',
          type: 'rows',
          items: [
            {
              id: 'lsx8vp0i',
              borderRadius: '0px',
              type: 'content',
              content: {
                transformY: -140,
                renderImageHeight: 276,
                transformX: -140,
                renderImageWidth: 276,
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
              },
            },
          ],
          height: CENTER_FRAME_SIZE,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: CENTER_FRAME_SIZE,
      },
      type: CardProductContentItemType.FRAME,
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.SQUARE],
  },
}

export const PHOTOBOOK_SQUARE_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-square-with-top-phase-and-bottom-details-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 16,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'Forever in our Hearts',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 36,
        },
        id: '1p5p6dyf',
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 4,
        },
        type: 'space',
        id: 'spacew07',
      },
      {
        id: 'modern-minimal-front-img',
        data: {
          enableBorder: false,
          width: CENTER_FRAME_SIZE,
          alignment: AlignmentType.CENTER,
          content: {
            width: CENTER_FRAME_SIZE,
            lockAspectRatio: false,
            id: 'w58ut2pi',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  transformY: -140,
                  renderImageHeight: 276,
                  transformX: -140,
                  renderImageWidth: 276,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: CENTER_FRAME_SIZE,
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          },
          isFullWidth: false,
          height: CENTER_FRAME_SIZE,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 31,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.SQUARE],
    },
  }

export const PHOTOBOOK_SQUARE_WITH_ALL_COPY_BOTTOM_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-square-with-all-copy-bottom-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 16,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        id: 'modern-minimal-front-img',
        data: {
          enableBorder: false,
          width: CENTER_FRAME_SIZE,
          alignment: AlignmentType.CENTER,
          content: {
            width: CENTER_FRAME_SIZE,
            lockAspectRatio: false,
            id: 'w58ut2pi',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  transformY: -140,
                  renderImageHeight: 276,
                  transformX: -140,
                  renderImageWidth: 276,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: CENTER_FRAME_SIZE,
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          },
          isFullWidth: false,
          height: CENTER_FRAME_SIZE,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 4,
        },
        type: 'space',
        id: 'spacew07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'Forever in our Hearts',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 36,
        },
        id: '1p5p6dyf',
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 22,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_CENTER_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.SQUARE],
    },
  }

export const PHOTOBOOK_LANDSCAPE_NO_TEXT: IPhotobookPageLayout = {
  layoutId: 'photobook-landscape-no-text',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 68,
      },
      type: 'space',
      id: 'aowb8w07',
    },
    {
      id: '999afda333',
      data: {
        enableBorder: false,
        width: 420,
        content: {
          width: 420,
          lockAspectRatio: false,
          id: 'jkfdioaf',
          type: 'rows',
          items: [
            {
              id: 'fodam3of',
              borderRadius: '0px',
              type: 'content',
              content: {
                type: 'image',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                transformX: -214,
                transformY: -214,
                renderImageHeight: 424,
                renderImageWidth: 424,
              },
            },
          ],
          height: 315,
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        },
        isFullWidth: false,
        height: 315,
      },
      type: CardProductContentItemType.FRAME,
    },
  ],
  metadata: {
    useOnPhotobookCreation: false,
    frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
  },
}

export const PHOTOBOOK_LANDSCAPE_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-landscape-with-top-phase-and-bottom-details-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 10,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 38,
            font: 'Monsieur La Doulaise',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'In Loving Memory',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 56,
        },
        id: '1p5p6dyf',
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 10,
        },
        type: 'space',
        id: 'spacew07',
      },
      {
        id: 'fdaz3fda',
        data: {
          enableBorder: false,
          width: 420,
          content: {
            width: 420,
            lockAspectRatio: false,
            id: 'gdadssdd',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  transformX: -214,
                  transformY: -214,
                  renderImageHeight: 424,
                  renderImageWidth: 424,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 315,
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          },
          isFullWidth: false,
          height: 315,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        id: 'mgzwozl0',
        type: 'space',
        data: {
          height: 10,
          divider: {
            asset: {
              id: null,
            },
          },
        },
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'right',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 25,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'right',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 25,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const PHOTOBOOK_LANDSCAPE_WITH_ALL_COPY_BOTTOM_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-landscape-with-all-copy-bottom-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 19,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        id: 'gdagdsa3fd1',
        data: {
          enableBorder: false,
          width: 460,
          content: {
            width: 460,
            lockAspectRatio: false,
            id: 'gdasdf3243',
            type: 'rows',
            items: [
              {
                id: 'gdasfdsad3',
                borderRadius: '0px',
                type: 'content',
                content: {
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                  transformX: -231.5,
                  transformY: -233.5,
                  renderImageHeight: 463,
                  renderImageWidth: 463,
                },
              },
            ],
            height: 345,
            fadeEdge: ICardProductFadeEdgeType.NONE,
          },
          isFullWidth: false,
          height: 345,
        },
        type: CardProductContentItemType.FRAME,
      },
      {
        id: 'mgzwozl0',
        type: 'space',
        data: {
          height: 10,
          divider: {
            asset: {
              id: null,
            },
          },
        },
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'right',
          content: {
            blocks: [
              {
                key: '2c4oi',
                text: 'In Loving Memory',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 33,
        },
        id: '1p5p6dyf',
      },
      {
        id: 'tjg3h0xm',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'right',
          content: {
            blocks: [
              {
                key: '9hqe8',
                text: '{{deceasedName}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 25,
        },
        type: 'text',
      },
      {
        id: 'q3azuzcv',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: CARD_PRODUCT_TEXT_ITEM_FULL_WIDTH,
          style: 'unstyled',
          alignment: 'right',
          content: {
            blocks: [
              {
                key: '36l6i',
                text: '{{dateOfBirth}} - {{dateOfDeath}}',
                type: 'paragraph-one',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          height: 25,
        },
        type: 'text',
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const PHOTOBOOK_TWO_TEXTBOX_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-two-textbox-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 124,
      },
      type: 'space',
      id: '3kowb8w07',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              key: '9hqe8',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 64,
      },
      type: 'text',
      id: 'tjg3h0xm',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{dateOfBirthYear}} - {{dateOfDeathYear}}',
              type: 'paragraph-one',
              key: '36l6i',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 56,
      },
      type: 'text',
      id: 'q3azuzcv',
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_THREE_TEXTBOX_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-three-textbox-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 79,
      },
      type: 'space',
      id: '4kowb8w07',
    },
    {
      type: 'text',
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 48,
          font: 'Monsieur La Doulaise',
        },
        width: 586,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: 'In Loving Memoray',
              type: 'unstyled',
              key: '2pf8c',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 106,
      },
      id: 'kp61jjgr',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 30,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              key: '9hqe8',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 64,
      },
      type: 'text',
      id: 'tjg3h0xm',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 24,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{dateOfBirthYear}} - {{dateOfDeathYear}}',
              type: 'paragraph-one',
              key: '36l6i',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 67,
      },
      type: 'text',
      id: 'q3azuzcv',
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_ONE_PARAGRAPH_TWO_TEXTBOX_LAYOUT: IPhotobookPageLayout =
  {
    layoutId: 'photobook-one-paragraph-two-textbox-layout',
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 51,
        },
        type: 'space',
        id: 'kowb8w07',
      },
      {
        id: '1a1uas4y',
        type: 'text',
        data: {
          content: {
            blocks: [
              {
                key: 'fdafdsa',
                text: '',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: 'bdasas',
                text: '',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: 'gdagdas',
                text: '',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: 'br8kr',
                text: 'Stop all the clocks, cut off the telephone, Prevent the dog from barking with a juicy bone, Silence the pianos and with muffled drum Bring out the coffin, let the mourners come. Let aeroplanes circle moaning overhead Scribbling on the sky the message ‘He is Dead’. Put crepe bows round the white necks of the public doves, Let the traffic policemen wear black cotton gloves. He was my North, my South, my East and West, My working week and my Sunday rest, My noon, my midnight, my talk, my song; I thought that love would last forever: I was wrong. The stars are not wanted now; put out every one, Pack up the moon and dismantle the sun, Pour away the ocean and sweep up the wood; For nothing now can ever come to any good. ',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: '7o8s8',
                text: '',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: '9d4ob',
                text: 'W H Auden',
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
          margin: [0, 0],
          height: 266,
          width: 586,
          alignment: 'center',
          rowStyle: {
            fontSize: 14,
          },
        },
      },
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
            height: 30,
          },
          height: 30,
        },
        type: 'space',
        id: 'cowb8w07',
      },
      {
        id: '15crxzf5',
        type: 'text',
        data: {
          content: {
            blocks: [
              {
                key: '4avb0',
                text: '{{deceasedName}}',
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
          margin: [5, 0],
          height: 25,
          width: 586.14,
          alignment: 'right',
          rowStyle: {
            fontSize: 18,
          },
        },
      },
      {
        id: '1w2kikbo',
        type: 'text',
        data: {
          content: {
            blocks: [
              {
                key: 'fqkdd',
                text: '{{dateOfBirthYear}} - {{dateOfDeathYear}}',
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
          margin: [5, 0],
          height: 25,
          width: 586.14,
          alignment: 'right',
          rowStyle: {
            fontSize: 18,
          },
        },
      },
    ],
    metadata: {
      useOnPhotobookCreation: true,
      frameOrientations: [],
    },
  }

export const PHOTOBOOK_ONE_PARAGRAPH_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-one-paragraph-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 108,
      },
      type: 'space',
      id: 'kowb8w07',
    },
    {
      id: '1a1uas4y',
      type: 'text',
      data: {
        content: {
          blocks: [
            {
              key: 'br8kr',
              text: 'Stop all the clocks, cut off the telephone, Prevent the dog from barking with a juicy bone, Silence the pianos and with muffled drum Bring out the coffin, let the mourners come. Let aeroplanes circle moaning overhead Scribbling on the sky the message ‘He is Dead’. Put crepe bows round the white necks of the public doves, Let the traffic policemen wear black cotton gloves. He was my North, my South, my East and West, My working week and my Sunday rest, My noon, my midnight, my talk, my song; I thought that love would last forever: I was wrong. The stars are not wanted now; put out every one, Pack up the moon and dismantle the sun, Pour away the ocean and sweep up the wood; For nothing now can ever come to any good. ',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '7o8s8',
              text: '',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '9d4ob',
              text: 'W H Auden',
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
        margin: [0, 0],
        height: 244,
        width: 586,
        alignment: 'left',
        rowStyle: {
          fontSize: 14,
        },
      },
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_ONE_PARAGRAPH_LAYOUT_2: IPhotobookPageLayout = {
  layoutId: 'photobook-one-paragraph-layout-2',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 170,
      },
      type: 'space',
      id: 'kowb8w07',
    },
    {
      id: '1a1uas4y',
      type: 'text',
      data: {
        content: {
          blocks: [
            {
              key: 'br8kr',
              text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.\n\nJohn 3:16',
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
        margin: [0, 0],
        height: 95,
        width: 586,
        alignment: 'left',
        rowStyle: {
          fontSize: 14,
        },
      },
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_ICON_TWO_TEXTBOX_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-icon-two-textbox-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 24,
      },
      type: 'space',
      id: 'kowb8w07',
    },
    {
      id: '4l3llhqc',
      type: CardProductContentItemType.ICON,
      data: {
        height: 239,
        width: 239,
        icon: {
          icon: 'Cross',
          color: 'black',
        },
      },
    },
    {
      id: '11yegtwp',
      type: 'space',
      data: {
        height: 14,
        divider: {
          asset: {
            id: null,
          },
        },
      },
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '9hqe8',
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 60,
      },
      type: 'text',
      id: 'tjg3h0xm',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              key: '36l6i',
              text: '{{dateOfBirthYear}} - {{dateOfDeathYear}}',
              type: 'paragraph-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        height: 51,
      },
      type: 'text',
      id: 'q3azuzcv',
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_TWO_TEXTBOX_ICON_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-two-textbox-icon-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 24,
      },
      type: 'space',
      id: '1kowb8w07',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{deceasedName}}',
              type: 'paragraph-one',
              key: '9hqe8',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 60,
      },
      type: 'text',
      id: '1tjg3h0xm',
    },
    {
      data: {
        margin: [0, 0],
        rowStyle: {
          fontSize: 18,
          font: 'Lora',
        },
        width: 344,
        style: 'unstyled',
        alignment: 'center',
        content: {
          blocks: [
            {
              depth: 0,
              data: {},
              inlineStyleRanges: [],
              text: '{{dateOfBirthYear}} - {{dateOfDeathYear}}',
              type: 'paragraph-one',
              key: '36l6i',
              entityRanges: [],
            },
          ],
          entityMap: {},
        },
        height: 46,
      },
      type: 'text',
      id: '1q3azuzcv',
    },
    {
      type: 'space',
      data: {
        divider: {
          asset: {
            id: null,
          },
        },
        height: 14,
      },
      id: '111yegtwp',
    },
    {
      type: 'icon',
      data: {
        width: 239,
        icon: {
          icon: 'Cross',
          color: 'black',
        },
        height: 239,
      },
      id: '14l3llhqc',
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_ICON_LAYOUT: IPhotobookPageLayout = {
  layoutId: 'photobook-icon-layout',
  rows: [
    {
      data: {
        divider: {
          asset: {
            filepath: null,
            name: 'Divider 20',
            id: null,
          },
        },
        height: 72,
      },
      type: 'space',
      id: '2kowb8w07',
    },
    {
      type: 'icon',
      data: {
        width: 239,
        icon: {
          icon: 'Cross',
          color: 'black',
        },
        height: 239,
      },
      id: '24l3llhqc',
    },
  ],
  metadata: {
    useOnPhotobookCreation: true,
    frameOrientations: [],
  },
}

export const PHOTOBOOK_TITLE_PAGE_LAYOUTS: Array<IPhotobookPageLayout> = [
  PHOTOBOOK_PORTRAIT_NO_TEXT_LAYOUT,
  PHOTOBOOK_PORTRAIT_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT,
  PHOTOBOOK_PORTRAIT_WITH_ALL_COPY_BOTTOM_LAYOUT,
  PHOTOBOOK_SQUARE_NO_TEXT,
  PHOTOBOOK_SQUARE_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT,
  PHOTOBOOK_SQUARE_WITH_ALL_COPY_BOTTOM_LAYOUT,
  PHOTOBOOK_LANDSCAPE_NO_TEXT,
  PHOTOBOOK_LANDSCAPE_WITH_TOP_PHASE_AND_BOTTOM_DETAILS_LAYOUT,
  PHOTOBOOK_LANDSCAPE_WITH_ALL_COPY_BOTTOM_LAYOUT,
  PHOTOBOOK_ONE_PARAGRAPH_TWO_TEXTBOX_LAYOUT,
  PHOTOBOOK_ONE_PARAGRAPH_LAYOUT,
  PHOTOBOOK_ONE_PARAGRAPH_LAYOUT_2,
  PHOTOBOOK_ICON_TWO_TEXTBOX_LAYOUT,
  PHOTOBOOK_TWO_TEXTBOX_ICON_LAYOUT,
  PHOTOBOOK_ICON_LAYOUT,
  PHOTOBOOK_TWO_TEXTBOX_LAYOUT,
  PHOTOBOOK_THREE_TEXTBOX_LAYOUT,
]
