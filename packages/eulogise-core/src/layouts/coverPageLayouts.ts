import {
  CardProductContentItemType,
  CardProductPageSize,
  EulogiseImageOrientation,
  IPhotobookCoverLayoutOption,
  IPhotobookPageLayout,
} from '../types'
import { DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE } from '../constants'

export const MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 0,
        },
        type: 'space',
        id: 'gdafdsa3',
      },
      {
        data: {
          enableBorder: false,
          width: 582,
          content: {
            width: 582,
            lockAspectRatio: false,
            id: 'dasd',
            type: 'rows',
            items: [
              {
                id: 'fdafdsa',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 580,
                  transformY: -200,
                  renderImageHeight: 400,
                  transformX: -290,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 460,
          },
          isFullWidth: false,
          height: 460,
        },
        type: CardProductContentItemType.FRAME,
        id: 'fardme',
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
          height: 70,
        },
        type: 'space',
        id: 'divideda',
      },
    ],
    layoutId: 'milk-classic-medium-cover-page-landscape-image-only',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
    },
  }

export const MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 12,
        },
        type: 'space',
        id: 'gdasaddd',
      },
      {
        data: {
          enableBorder: false,
          width: 558,
          content: {
            width: 558,
            lockAspectRatio: false,
            id: 'rfda32',
            type: 'rows',
            items: [
              {
                id: 'fda32',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 558,
                  transformY: -125,
                  renderImageHeight: 250,
                  transformX: -279,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 400,
          },
          isFullWidth: false,
          height: 400,
        },
        type: CardProductContentItemType.FRAME,
        id: 'gdagdsa',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 10,
            font: 'Lora',
          },
          width: 558,
          style: 'unstyled',
          alignment: 'right',
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
          height: 30,
        },
        id: 'fdagfd43',
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
          height: 70,
        },
        type: 'space',
        id: 'gdasdas',
      },
    ],
    layoutId: 'milk-classic-medium-cover-page-landscape-image-and-text',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
    },
  }

export const MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 12,
        },
        type: 'space',
        id: 'gdafdsa3',
      },
      {
        data: {
          enableBorder: false,
          width: 851,
          content: {
            width: 851,
            lockAspectRatio: false,
            id: 'dasd',
            type: 'rows',
            items: [
              {
                id: 'fdafdsa',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 580,
                  transformY: -200,
                  renderImageHeight: 400,
                  transformX: -290,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 708,
          },
          isFullWidth: false,
          height: 708,
        },
        type: CardProductContentItemType.FRAME,
        id: 'fardme',
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
          height: 70,
        },
        type: 'space',
        id: 'divideda',
      },
    ],
    layoutId: 'milk-classic-large-cover-page-landscape-image-only',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    },
  }

export const MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 26,
        },
        type: 'space',
        id: 'gdasaddd',
      },
      {
        data: {
          enableBorder: false,
          width: 820,
          content: {
            width: 820,
            lockAspectRatio: false,
            id: 'rfda32',
            type: 'rows',
            items: [
              {
                id: 'fda32',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 558,
                  transformY: -125,
                  renderImageHeight: 250,
                  transformX: -279,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 644,
          },
          isFullWidth: false,
          height: 644,
        },
        type: CardProductContentItemType.FRAME,
        id: 'gdagdsa',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 10,
            font: 'Lora',
          },
          width: 820,
          style: 'unstyled',
          alignment: 'right',
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
          height: 30,
        },
        id: 'fdagfd43',
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
          height: 70,
        },
        type: 'space',
        id: 'gdasdas',
      },
    ],
    layoutId: 'milk-classic-large-cover-page-landscape-image-and-text',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
    },
  }

export const MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 67,
        },
        type: 'space',
        id: 'gdafdsa3',
      },
      {
        data: {
          enableBorder: false,
          width: 266,
          content: {
            width: 266,
            lockAspectRatio: false,
            id: 'dasd',
            type: 'rows',
            items: [
              {
                id: 'fdafdsa',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 266,
                  transformY: -133,
                  renderImageHeight: 266,
                  transformX: -133,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 201,
          },
          isFullWidth: false,
          height: 201,
        },
        type: CardProductContentItemType.FRAME,
        id: 'fardme',
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
          height: 67,
        },
        type: 'space',
        id: 'divideda',
      },
    ],
    layoutId: 'milk-premium-medium-cover-page-landscape-image-only',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    },
  }

export const MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 75,
        },
        type: 'space',
        id: 'gdasaddd',
      },
      {
        data: {
          enableBorder: false,
          width: 250,
          content: {
            width: 250,
            lockAspectRatio: false,
            id: 'rfda32',
            type: 'rows',
            items: [
              {
                id: 'fda32',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 250,
                  transformY: -125,
                  renderImageHeight: 250,
                  transformX: -125,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 164,
          },
          isFullWidth: false,
          height: 164,
        },
        type: CardProductContentItemType.FRAME,
        id: 'gdagdsa',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 10,
            font: 'Lora',
          },
          width: 258,
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
          height: 19,
        },
        id: 'fdagfd43',
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
          height: 75,
        },
        type: 'space',
        id: 'gdasdas',
      },
    ],
    layoutId: 'milk-premium-medium-cover-page-landscape-image-and-text',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    },
  }

export const MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 138,
        },
        type: 'space',
        id: 'gdafdsa3',
      },
      {
        data: {
          enableBorder: false,
          width: 378,
          content: {
            width: 378,
            lockAspectRatio: false,
            id: 'dasd',
            type: 'rows',
            items: [
              {
                id: 'fdafdsa',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 378,
                  transformY: -139,
                  renderImageHeight: 278,
                  transformX: -189,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 278,
          },
          isFullWidth: false,
          height: 278,
        },
        type: CardProductContentItemType.FRAME,
        id: 'fardme',
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
          height: 138,
        },
        type: 'space',
        id: 'divideda',
      },
    ],
    layoutId: 'milk-premium-large-cover-page-landscape-image-only',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    },
  }

export const MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT: IPhotobookPageLayout =
  {
    isTitlePageLayout: true,
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
          height: 148,
        },
        type: 'space',
        id: 'gdasaddd',
      },
      {
        data: {
          enableBorder: false,
          width: 356,
          content: {
            width: 356,
            lockAspectRatio: false,
            id: 'rfda32',
            type: 'rows',
            items: [
              {
                id: 'fda32',
                borderRadius: '0px',
                type: 'content',
                content: {
                  renderImageWidth: 356,
                  transformY: -118,
                  renderImageHeight: 236,
                  transformX: -178,
                  type: 'image',
                  filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                },
              },
            ],
            height: 236,
          },
          isFullWidth: false,
          height: 236,
        },
        type: CardProductContentItemType.FRAME,
        id: 'gdagdsa',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 258,
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
          height: 19,
        },
        id: 'fdagfd43',
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
          height: 148,
        },
        type: 'space',
        id: 'gdasdas',
      },
    ],
    layoutId: 'milk-premium-large-cover-page-landscape-image-and-text',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
    metadata: {
      useOnPhotobookCreation: false,
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
    },
  }

export const COVER_PAGE_LAYOUTS: Array<IPhotobookPageLayout> = [
  MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
]

export const PhotobookCoverLayoutOptions: Array<IPhotobookCoverLayoutOption> = [
  {
    label: 'Single image embossed with text',
    value: MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM],
  },
  {
    label: 'Single image embossed',
    value: MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM],
  },
  {
    label: 'Single image embossed with text',
    value: MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE],
  },
  {
    label: 'Single image embossed',
    value: MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE],
  },
  {
    label: 'Single image embossed with text',
    value: MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM],
  },
  {
    label: 'Single image embossed',
    value: MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM],
  },
  {
    label: 'Single image embossed with text',
    value: MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE],
  },
  {
    label: 'Single image embossed',
    value: MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY.layoutId,
    supportedPageSizes: [CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE],
  },
]
