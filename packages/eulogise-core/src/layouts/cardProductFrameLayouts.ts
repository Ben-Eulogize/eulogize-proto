import {
  EulogiseImageOrientation,
  ICardProductFadeEdgeType,
  ICardProductFrameAvailability,
  ICardProductFrameLayout,
} from '../types'
import { DEFAULT_ORIGINAL_FRAME_SIZE } from '../constants'

export const CARD_PRODUCT_FRAME_CONTENT_RADIUS_SIZE = '.5rem'

const MEDIUM_THUMBNAIL_SIZE_RATIO = 1
const SMALL_THUMBNAIL_SIZE_RATIO = 0.8

export const PHOTO_FRAME_RATIO = {
  LARGE: 3 / 4, // 4 x 3    0.75
  MEDIUM: 2 / 3, // 3 x 2   0.66
  SMALL: 9 / 16, // 16 x 9  0.56
}

export const PHOTOBOOK_FRAME_LARGE_RECTANGLE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-large-rectangle-landscape',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE, // ( 4 x 3 )
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-medium-rectangle-landscape',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM, // ( 2 x 3 )
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const PHOTOBOOK_FRAME_SMALL_RECTANGLE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-small-rectangle-landscape',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL, // ( 16 x 9 )
    thumbnailHeight: SMALL_THUMBNAIL_SIZE_RATIO,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const PHOTOBOOK_FRAME_LARGE_RECTANGLE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-large-rectangle-portrait',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE, // ( 4 x 3 )
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-medium-rectangle-portrait',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM, // ( 3 x 2 )
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const PHOTOBOOK_FRAME_SMALL_RECTANGLE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-small-rectangle-portrait',
    type: 'rows',
    items: [{ type: 'content' }],
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL, // ( 16 x 9 )
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT: ICardProductFrameLayout = {
  layoutId: 'card-product-frame-one-portrait',
  type: 'rows',
  items: [{ type: 'content' }],
  width: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
  height: DEFAULT_ORIGINAL_FRAME_SIZE,
  isAddAsRatio: true,
  frameAvailability: ICardProductFrameAvailability.CARD,
  fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
  metadata: {
    frameOrientations: [EulogiseImageOrientation.PORTRAIT],
  },
}

export const CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-landscape',
    type: 'rows',
    items: [{ type: 'content' }],
    height: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT: ICardProductFrameLayout = {
  layoutId: 'card-product-frame-one-square',
  type: 'rows',
  items: [{ type: 'content' }],
  height: DEFAULT_ORIGINAL_FRAME_SIZE,
  width: DEFAULT_ORIGINAL_FRAME_SIZE,
  isAddAsRatio: true,
  frameAvailability: ICardProductFrameAvailability.ALL,
  fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
  metadata: {
    frameOrientations: [EulogiseImageOrientation.SQUARE],
  },
}

/*
export const CARD_PRODUCT_FRAME_HALF_AND_QUARTER_SQUARE_LAYOUT: ICardProductFrameLayout =
  {
    type: 'rows',
    items: [{ type: 'content' }],
    height: (DEFAULT_ORIGINAL_FRAME_SIZE * 3) / 4,
    width: (DEFAULT_ORIGINAL_FRAME_SIZE * 3) / 4,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
  }

export const CARD_PRODUCT_FRAME_HALF_SQUARE_LAYOUT: ICardProductFrameLayout = {
  type: 'rows',
  items: [
    {
      type: 'content',
      width: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
      height: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
    },
  ],
  height: DEFAULT_ORIGINAL_FRAME_SIZE,
  width: DEFAULT_ORIGINAL_FRAME_SIZE,
  isAddAsRatio: true,
  frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
}
*/

export const CARD_PRODUCT_FRAME_ONE_ARCH_LAYOUT: ICardProductFrameLayout = {
  layoutId: 'card-product-frame-one-arch',
  type: 'rows',
  items: [{ type: 'content', borderRadius: '50% 50% 0 0' }],
  height: DEFAULT_ORIGINAL_FRAME_SIZE,
  width: DEFAULT_ORIGINAL_FRAME_SIZE * 0.85,
  isAddAsRatio: true,
  frameAvailability: ICardProductFrameAvailability.CARD,
  fadeEdge: ICardProductFadeEdgeType.NONE,
  metadata: {
    frameOrientations: [EulogiseImageOrientation.PORTRAIT],
  },
}

export const CARD_PRODUCT_FRAME_ONE_LEAF_RIGHT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-leaf-right',
    type: 'rows',
    items: [{ type: 'content', borderRadius: '50% 0 50% 0' }],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE * 0.85,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_LEAF_LEFT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-leaf-left',
    type: 'rows',
    items: [{ type: 'content', borderRadius: '0 50% 0 50%' }],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE * 0.85,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_ROUNDED_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-rounded-portrait',
    type: 'rows',
    items: [
      {
        type: 'content',
        borderRadius: CARD_PRODUCT_FRAME_CONTENT_RADIUS_SIZE,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_ROUNDED_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-rounded-landscape',
    type: 'rows',
    items: [
      {
        type: 'content',
        borderRadius: CARD_PRODUCT_FRAME_CONTENT_RADIUS_SIZE,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE / 2,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_ROUNDED_SQUARE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-rounded-square',
    type: 'rows',
    items: [
      {
        type: 'content',
        borderRadius: CARD_PRODUCT_FRAME_CONTENT_RADIUS_SIZE,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.SQUARE],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_ROUNDED_LAYOUT: ICardProductFrameLayout = {
  layoutId: 'card-product-frame-one-rounded',
  type: 'rows',
  items: [
    {
      type: 'content',
      borderRadius: '100rem',
    },
  ],
  height: DEFAULT_ORIGINAL_FRAME_SIZE,
  width: DEFAULT_ORIGINAL_FRAME_SIZE,
  lockAspectRatio: true,
  frameAvailability: ICardProductFrameAvailability.CARD,
  fadeEdge: ICardProductFadeEdgeType.ROUNDED,
  metadata: {
    frameOrientations: [EulogiseImageOrientation.SQUARE],
  },
}

export const CARD_PRODUCT_FRAME_ONE_VERTICAL_ELLIPSE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-vertical-ellipse',
    type: 'rows',
    items: [
      {
        type: 'content',
        borderRadius: '90%',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: (DEFAULT_ORIGINAL_FRAME_SIZE * 2) / 3,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.ROUNDED,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.PORTRAIT],
    },
  }

export const CARD_PRODUCT_FRAME_ONE_HORIZONTAL_ELLIPSE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-one-horizontal-ellipse',
    type: 'rows',
    items: [
      {
        type: 'content',
        borderRadius: '90%',
      },
    ],
    height: (DEFAULT_ORIGINAL_FRAME_SIZE * 2) / 3,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.ROUNDED,
    metadata: {
      frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-columns',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LARGE_FRAME_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-columns-large-frame-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_MEDIUM_FRAME_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-columns-medium-frame-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_SMALL_FRAME_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-columns-small-frame-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: SMALL_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-large-left-column-small-right-column',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LARGE_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-small-right-column-large-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_MEDIUM_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-small-right-column-medium-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_SMALL_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-small-right-column-small-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    thumbnailHeight: SMALL_THUMBNAIL_SIZE_RATIO,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-large-left-column-large-right-column',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LARGE_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-large-right-column-large-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_MEDIUM_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-large-right-column-medium-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_SMALL_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'card-product-frame-large-left-column-large-right-column-small-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    thumbnailHeight: SMALL_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-rows',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LARGE_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-rows-large-ratio',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.LARGE,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_MEDIUM_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-rows-medium-ratio',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM,
    thumbnailWidth: MEDIUM_THUMBNAIL_SIZE_RATIO,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_SMALL_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-two-even-rows-small-ratio',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL,
    isAddAsRatio: true,
    thumbnailWidth: SMALL_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LARGE_TOP_ROW_SMALL_BOTTOM_ROW_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-large-top-row-small-bottom-row',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_SMALL_TOP_ROW_LARGE_BOTTOM_ROW_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-small-top-row-large-bottom-row',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-even-columns',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_MEDIUM_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-even-columns-medium-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.MEDIUM,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    thumbnailHeight: MEDIUM_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    isAddAsRatio: true,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_SMALL_RATIO_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-even-columns-small-ratio',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE * PHOTO_FRAME_RATIO.SMALL,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    thumbnailHeight: SMALL_THUMBNAIL_SIZE_RATIO,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    isAddAsRatio: true,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-left-column-right-two-rows',
    type: 'columns',
    items: [
      {
        type: 'content',
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LEFT_TWO_ROWS_RIGHT_COLUMN_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-left-two-rows-right-column',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_EVEN_ROWS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-even-rows',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
      {
        type: 'content',
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.CARD,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-top-row-bottom-two-columns',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_ROW_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-top-two-columns-bottom-row',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-top-two-columns-bottom-two-columns',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
        EulogiseImageOrientation.SQUARE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-top-three-columns-bottom-row',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_THREE_COLUMNS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-top-row-bottom-three-columns',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
          },
          {
            type: 'content',
          },
          {
            type: 'content',
          },
        ],
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_ONE_CENTER_TWO_RIGHT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-columns-two-left-one-center-two-right',
    type: 'columns',
    items: [
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'content', flex: 2 },
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_TWO_CENTER_ONE_RIGHT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-columns-two-left-two-center-one-right',
    type: 'columns',
    items: [
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'content', flex: 2 },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_COLUMNS_ONE_LEFT_TWO_CENTER_TWO_RIGHT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-columns-one-left-two-center-two-right',
    type: 'columns',
    items: [
      { type: 'content', flex: 2 },
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'rows', items: [{ type: 'content' }, { type: 'content' }] },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_ROWS_TWO_TOP_ONE_CENTER_TWO_BOTTOM_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-rows-two-top-one-center-two-bottom',
    type: 'rows',
    items: [
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'content', flex: 2 },
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_ROWS_TWO_TOP_TWO_CENTER_ONE_BOTTOM_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-rows-two-top-two-center-one-bottom',
    type: 'rows',
    items: [
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'content', flex: 2 },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_THREE_ROWS_ONE_TOP_TWO_CENTER_TWO_BOTTOM_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-three-rows-one-top-two-center-two-bottom',
    type: 'rows',
    items: [
      { type: 'content', flex: 2 },
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
      { type: 'columns', items: [{ type: 'content' }, { type: 'content' }] },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    frameAvailability: ICardProductFrameAvailability.ALL,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_LANDSCAPE_BOTTOM_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-top-landscape-bottom-landscape',
    type: 'rows',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 4x3 - two rows = 4x6
    width: 4,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 3x4 - two columns = 6x4
    width: 6,
    height: 4,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-landscape-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 4x3 - two columns = 8x3
    width: 8,
    height: 3,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 9 / 25,
      },
      {
        type: 'content',
        flex: 16 / 25,
      },
    ],
    // 1 portrait + 1 landscape = (9 x 12) + (16 x 12) = 25 x 12
    width: 25,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 16 / 25,
      },
      {
        type: 'content',
        flex: 9 / 25,
      },
    ],
    // 1 portrait + 1 landscape = (9 x 12) + (16 x 12) = 25 x 12
    width: 25,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_TWO_ROWS_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-two-rows-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 portrait + 2 landscape = (4.5 x 6) + (4 x 6) = 8.5 x 6
    width: 8.5,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_THREE_COLUMNS_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-three-columns-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 3 portraits = (3 x 4) + (3 x 4) + (3 x 4) = 9 x 4
    width: 9,
    height: 4,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_THREE_COLUMNS_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-three-columns-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 3 landscape = (4 x 3) + (4 x 3) + (4 x 3) = 12 x 3
    width: 12,
    height: 3,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

// new
export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-landscape-center-portrait-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 16 / 34,
      },
      {
        type: 'content',
        flex: 9 / 34,
      },
      {
        type: 'content',
        flex: 9 / 34,
      },
    ],
    // 1 landscape, 1 portrait, 1 portrait = (16 x 12) + (9 x 12) + (9 x 12) = 34 x 12
    width: 34,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-center-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 9 / 34,
      },
      {
        type: 'content',
        flex: 16 / 34,
      },
      {
        type: 'content',
        flex: 9 / 34,
      },
    ],
    // 1 portrait, 1 landscape, 1 portrait = (9 x 12) + (16 x 12) + (9 x 12) = 34 x 12
    width: 34,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-center-portrait-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 9 / 34,
      },
      {
        type: 'content',
        flex: 9 / 34,
      },
      {
        type: 'content',
        flex: 16 / 34,
      },
    ],
    // 1 portrait, 1 portrait, 1 landscape = (9 x 12) + (9 x 12) + (16 x 12) = 34 x 12
    width: 34,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-center-landscape-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 9 / 41,
      },
      {
        type: 'content',
        flex: 16 / 41,
      },
      {
        type: 'content',
        flex: 16 / 41,
      },
    ],
    // 1 portrait, 1 landscape, 1 landscape = (9 x 12) + (16 x 12) + (16 x 12) = 41 x 12
    width: 41,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-landscape-center-portrait-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 16 / 41,
      },
      {
        type: 'content',
        flex: 9 / 41,
      },
      {
        type: 'content',
        flex: 16 / 41,
      },
    ],
    // 1 landscape, 1 portrait, 1 landscape = (16 x 12) + (9 x 12) + (16 x 12) = 41 x 12
    width: 41,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-landscape-center-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 16 / 41,
      },
      {
        type: 'content',
        flex: 16 / 41,
      },
      {
        type: 'content',
        flex: 9 / 41,
      },
    ],
    // 1 landscape, 1 landscape, 1 portrait = (16 x 12) + (16 x 12) + (9 x 12) = 41 x 12
    width: 41,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_THREE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-portrait-right-three-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 27 / 43,
      },
      {
        type: 'rows',
        flex: 16 / 43,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 portrait, 3 landscape = (27 x 36) + (16 x 12 + 16 x 12 + 16 x 12) = 43 x 36
    width: 43,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_THREE_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-left-three-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 16 / 43,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 27 / 43,
      },
    ],
    // 3 landscape + 1 portrait = (16 x 12 + 16 x 12 + 16 x 12) + (27 x 36) = 43 x 36
    width: 43,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-center-portrait-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 48 / 99,
      },
      {
        type: 'content',
        flex: 27 / 99,
      },
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 portrait + 2 landscapes = 48 x 36 + 27 x 36 + (24 x 18, 24 x 18) = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-landscape-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 27 / 99,
      },
      {
        type: 'content',
        flex: 48 / 99,
      },
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 portrait + 2 landscapes = 48 x 36 + 27 x 36 + (24 x 18, 24 x 18) = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 48 / 99,
      },
      {
        type: 'content',
        flex: 27 / 99,
      },
    ],
    // 2 landscapes + 1 landscape + 1 portrait = (24 x 18, 24 x 18) + 48 x 36 + 27 x 36 = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-center-two-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 48 / 99,
      },
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 27 / 99,
      },
    ],
    // 2 landscapes + 1 landscape + 1 portrait = (24 x 18, 24 x 18) + 48 x 36 + 27 x 36 = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-two-landscape-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 27 / 99,
      },
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 48 / 99,
      },
    ],
    // 1 portrait + 1 landscape + 2 landscapes = 27 x 36 + (24 x 18, 24 x 18) + 48 x 36 = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-portrait-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 24 / 99,
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 27 / 99,
      },
      {
        type: 'content',
        flex: 48 / 99,
      },
    ],
    // 2 landscapeS + 1 portrait + 1 landscape = (42 x 36, 42 x 36) + 27 x 36 + 48 x 36 = 99 x 36
    width: 99,
    height: 36,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-landscape-right-landscape-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
    ],
    // (1 portrait, 1 landscape) + (1 landscape, 1 portrait) = (12 x 16) + (12 x 9) = 24 x 25
    //                                                         (12 x 9) + (12 x 16)
    width: 24,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-portrait-right-portrait-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
    ],
    // (1 portrait, 1 landscape) + (1 landscape, 1 portrait) = (12 x 16) + (12 x 9) = 24 x 25
    //                                                         (12 x 9) + (12 x 16)
    width: 24,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_LANDSCAPE_PORTRAIT_BOTTOM_PORTRAIT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-top-landscape-portrait-bottom-portrait-landscape',
    type: 'rows',
    items: [
      {
        type: 'columns',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
      {
        type: 'columns',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
    ],
    // (1 landscape, 1 portrait) + (1 portrait, 1 landscape) = (16 x 12) + (9 x 12) = 25 x 24
    //                                                         (9 x 12) + (16 x 12)
    width: 25,
    height: 24,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_PORTRAIT_LANDSCAPE_BOTTOM_LANDSCAPE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-top-portrait-landscape-bottom-landscape-portrait',
    type: 'rows',
    items: [
      {
        type: 'columns',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
      {
        type: 'columns',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
    ],
    // (1 portrait, 1 landscape) + (1 landscape, 1 portrait) = (9 x 12) + (16 x 12) = 25 x 24
    //                                                         (16 x 12) + (9 x 12)
    width: 25,
    height: 24,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-portrait-right-landscape-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
    ],
    // (1 landscape, 1 portrait) + (1 landscape, 1 portrait) = (12 x 16) + (12 x 9) = 24 x 25
    //                                                         (12 x 9) + (12 x 16)
    width: 24,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-landscape-right-portrait-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
      {
        type: 'rows',
        flex: 1,
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
    ],
    // (1 portrait, 1 landscape) + (1 portrait, 1 landscape) = (12 x 16) + (12 x 9) = 24 x 25
    //                                                         (12 x 9) + (12 x 16)
    width: 24,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TWO_ROWS_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-two-rows-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 1 portrait + 2 landscape = (4.5 x 6) + (4 x 6) = 8.5 x 6
    width: 8.5,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_FOUR_LANDSCAPE_WINDOWS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-four-landscape-windows',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 2 landscape + 2 landscape = (4 x 3) + (4 x 3) = 8 x 6
    width: 8,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_FOUR_PORTRAIT_WINDOWS_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-four-portrait-windows',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 2 landscape + 2 landscape = (3 x 4) + (3 x 4) = 6 x 8
    width: 6,
    height: 8,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-portrait-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 3 columns - 1 portrait column + 1 column with 2 landscape + 1 portrait column = (4.5 x 6) + (4 x 3*2) + (4.5 x 6) = 13x6
    width: 13,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-portrait-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 3 columns - 1 portrait column + 1 column with 2 landscape + 1 portrait column = (4.5 x 6) + (4 x 3*2) + (4.5 x 6) = 13x6
    width: 13,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-two-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 1,
      },
    ],
    // 3 columns - 1 portrait column + 1 column with 2 landscape + 1 portrait column = (4.5 x 6) + (4 x 3*2) + (4.5 x 6) = 13x6
    width: 13,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-center-two-landscape-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 1,
      },
      {
        type: 'columns',
        items: [
          {
            type: 'rows',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
          },
          {
            type: 'rows',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
          },
        ],
      },
    ],
    // 1 landscape + 2 landscapes + 2 landscape = (8 x 6) + (4 x 6) + (4 x 6) = 16 x 6
    width: 16,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-landscape-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 2 landscapes + 1 landscape + 2 landscape = (4 x 6) + (8 x 6) +(4 x 6) = 16 x 6
    width: 16,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-center-two-landscape-right-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    // 2 landscapes + 2 landscape + 1 landscape = (4 x 6) + (8 x 6) +(4 x 6) = 16 x 6
    width: 16,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_PORTRAIT_RIGHT_TWO_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-two-portrait-right-two-portrait',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 portrait + 2 portrait + 2 portrait = (4 x 6) + (2 x 3) + (2 x 3) = 8 x 6
    width: 8,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_PORTRAIT_CENTER_PORTRAIT_RIGHT_TWO_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-portrait-center-portrait-right-two-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 2,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 2 portrait + 1 portrait + 2 portrait = (4 x 6) + (2 x 3) + (2 x 3) = 8 x 6
    width: 8,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_PORTRAIT_CENTER_TWO_PORTRAIT_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-two-portrait-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'content',
        flex: 2,
      },
    ],
    // 2 portrait + 2 portrait + 1 portrait = (4 x 6) + (2 x 3) + (2 x 3) = 8 x 6
    width: 8,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-center-two-landscape-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'content',
        flex: 9 / 25,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
    ],
    // 1 portrait + 2 landscape + 2 landscape = (9 x 12) + (8 x 12) + (8 x 12) = 25 x 12
    width: 25,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-portrait-right-two-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
      {
        type: 'content',
        flex: 9 / 25,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
    ],
    // 1 portrait + 2 landscape + 2 landscape = (9 x 12) + (8 x 12) + (8 x 12) = 25 x 12
    width: 25,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-two-landscape-center-two-landscape-right-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
        flex: 8 / 25,
      },
      {
        type: 'content',
        flex: 9 / 25,
      },
    ],
    // 1 portrait + 2 landscape + 2 landscape = (9 x 12) + (8 x 12) + (8 x 12) = 25 x 12
    width: 25,
    height: 12,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_BOTTOM_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-top-left-landscape-center-portrait-right-portrait-bottom-left-portrait-center-portrait-right-landscape',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 portrait + 1 portrait = (12 x 9) + (6 x 9) + (6 x 9) = 24 x 9
    // 1 portrait + 1 portrait + 1 landscape = (6 x 9) + (6 x 9) + (12 x 9) = 24 x 9
    // Row 1 + Row 2 = 24 x 18
    width: 24,
    height: 18,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_BOTTOM_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-top-left-portrait-center-portrait-right-landscape-bottom-left-landscape-center-portrait-right-portrait',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                flex: 1,
              },
              {
                type: 'content',
                flex: 1,
              },
            ],
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 portrait + 1 portrait = (12 x 9) + (6 x 9) + (6 x 9) = 24 x 9
    // 1 portrait + 1 portrait + 1 landscape = (6 x 9) + (6 x 9) + (12 x 9) = 24 x 9
    // Row 1 + Row 2 = 24 x 18
    width: 24,
    height: 18,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_THREE_LANDSCAPE_BOTTOM_THREE_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-top-three-landscape-bottom-three-landscape',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 landscape + 1 landscape = (4 x 3) + (4 x 3) + (4 x 3) = 12 x 3
    // 1 landscape + 1 landscape + 1 landscape = (4 x 3) + (4 x 3) + (4 x 3) = 12 x 3
    // Row 1 + Row 2 = 12 x 6
    width: 12,
    height: 6,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_THREE_PORTRAIT_BOTTOM_THREE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId: 'photobook-frame-top-three-portrait-bottom-three-portrait',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 portrait + 1 portrait + 1 portrait = (3 x 4) + (3 x 4) + (3 x 4) = 9 x 4
    // 1 portrait + 1 portrait + 1 portrait = (3 x 4) + (3 x 4) + (3 x 4) = 9 x 4
    // Row 1 + Row 2 = 9 x 8
    width: 9,
    height: 8,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_TOP_TWO_LANDSCAPE_MIDDLE_TWO_LANDSCAPE_BOTTOM_TWO_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-top-two-landscape-middle-two-landscape-bottom-two-landscape',
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            flex: 1,
          },
          {
            type: 'content',
            flex: 1,
          },
        ],
      },
    ],
    // 1 landscape + 1 landscape = (4 x 3) + (4 x 3) = 8 x 3
    // 1 landscape + 1 landscape = (4 x 3) + (4 x 3) = 8 x 3
    // 1 landscape + 1 landscape = (4 x 3) + (4 x 3) = 8 x 3
    // Row 1 + Row 2 = 8 x 9
    width: 8,
    height: 9,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_CENTER_PORTRAIT_LANDSCAPE_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-landscape-portrait-center-portrait-landscape-right-landscape-portrait',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
    ],
    // column 1: 1 landscape + 1 portrait = (12 x 9) + (12 x 16) = 12 x 25
    // column 2: 1 portrait + 1 landscape = (12 x 16) + (12 x 9) = 12 x 25
    // column 3: 1 landscape + 1 portrait = (12 x 9) + (12 x 16) = 12 x 25
    // Column 1 + Column 2 + Column 3 = 36 x 25
    width: 36,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ],
    },
  }

export const PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_CENTER_LANDSCAPE_PORTRAIT_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT: ICardProductFrameLayout =
  {
    layoutId:
      'photobook-frame-left-portrait-landscape-center-landscape-portrait-right-portrait-landscape',
    type: 'columns',
    items: [
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 9 / 25,
          },
          {
            type: 'content',
            flex: 16 / 25,
          },
        ],
      },
      {
        type: 'rows',
        items: [
          {
            type: 'content',
            flex: 16 / 25,
          },
          {
            type: 'content',
            flex: 9 / 25,
          },
        ],
      },
    ],
    // column 1: 1 portrait + 1 landscape = (12 x 16) + (12 x 9) = 12 x 25
    // column 2: 1 landscape + 1 portrait = (12 x 9) + (12 x 16) = 12 x 25
    // column 1: 1 portrait + 1 landscape = (12 x 16) + (12 x 9) = 12 x 25
    // Column 1 + Column 2 + Column 3 = 36 x 25
    width: 36,
    height: 25,
    isAddAsRatio: true,
    frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
    fadeEdge: ICardProductFadeEdgeType.NONE,
    metadata: {
      frameOrientations: [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ],
    },
  }

export const CARD_PRODUCT_FRAME_LAYOUTS: Array<ICardProductFrameLayout> = [
  CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LANDSCAPE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT,
  /*
  CARD_PRODUCT_FRAME_HALF_SQUARE_LAYOUT,
  CARD_PRODUCT_FRAME_HALF_AND_QUARTER_SQUARE_LAYOUT,
*/
  CARD_PRODUCT_FRAME_ONE_ROUNDED_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_LANDSCAPE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_SQUARE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ROUNDED_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_VERTICAL_ELLIPSE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_HORIZONTAL_ELLIPSE_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_ARCH_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LEAF_LEFT_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_LEAF_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_LARGE_TOP_ROW_SMALL_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_SMALL_TOP_ROW_LARGE_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_LEFT_TWO_ROWS_RIGHT_COLUMN_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_EVEN_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_THREE_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_ONE_CENTER_TWO_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_TWO_LEFT_TWO_CENTER_ONE_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_COLUMNS_ONE_LEFT_TWO_CENTER_TWO_RIGHT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_ROWS_TWO_TOP_ONE_CENTER_TWO_BOTTOM_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_ROWS_TWO_TOP_TWO_CENTER_ONE_BOTTOM_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_ROWS_ONE_TOP_TWO_CENTER_TWO_BOTTOM_LAYOUT,
]

export const CARD_PRODUCT_PHOTOBOOK_FRAME_LAYOUTS: Array<ICardProductFrameLayout> =
  [
    /*
    PHOTOBOOK_FRAME_LARGE_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_SMALL_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LARGE_RECTANGLE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_SMALL_RECTANGLE_PORTRAIT_LAYOUT,
    CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT,
    // CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LARGE_FRAME_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_MEDIUM_FRAME_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_SMALL_FRAME_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LAYOUT,
    // CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_LARGE_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_MEDIUM_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_LARGE_LEFT_COLUMN_SMALL_RIGHT_COLUMN_SMALL_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LAYOUT,
    // CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_LARGE_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_MEDIUM_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_SMALL_LEFT_COLUMN_LARGE_RIGHT_COLUMN_SMALL_RATIO_LAYOUT,
    // CARD_PRODUCT_FRAME_HALF_SQUARE_LAYOUT,
    // CARD_PRODUCT_FRAME_HALF_AND_QUARTER_SQUARE_LAYOUT,

    CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_LAYOUT,
    CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_MEDIUM_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_TWO_EVEN_ROWS_SMALL_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT,
    CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_MEDIUM_RATIO_LAYOUT,
    CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_SMALL_RATIO_LAYOUT,
*/
    // Single frames
    PHOTOBOOK_FRAME_LARGE_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_SMALL_RECTANGLE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LARGE_RECTANGLE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_MEDIUM_RECTANGLE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_SMALL_RECTANGLE_PORTRAIT_LAYOUT,
    CARD_PRODUCT_FRAME_ONE_SQUARE_LAYOUT,
    // 2 image frames
    PHOTOBOOK_FRAME_TOP_LANDSCAPE_BOTTOM_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,

    // 3 image frames
    PHOTOBOOK_FRAME_THREE_COLUMNS_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_THREE_COLUMNS_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_TWO_ROWS_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_TWO_ROWS_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,

    // 4 image frames
    PHOTOBOOK_FRAME_FOUR_LANDSCAPE_WINDOWS_LAYOUT,
    PHOTOBOOK_FRAME_FOUR_PORTRAIT_WINDOWS_LAYOUT,
    PHOTOBOOK_FRAME_TOP_LANDSCAPE_PORTRAIT_BOTTOM_PORTRAIT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_TOP_PORTRAIT_LANDSCAPE_BOTTOM_LANDSCAPE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_RIGHT_THREE_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_THREE_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT,

    // 5 image frames
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_PORTRAIT_RIGHT_TWO_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_PORTRAIT_CENTER_PORTRAIT_RIGHT_TWO_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_PORTRAIT_CENTER_TWO_PORTRAIT_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_CENTER_TWO_LANDSCAPE_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_PORTRAIT_RIGHT_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_TWO_LANDSCAPE_CENTER_TWO_LANDSCAPE_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_TOP_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_BOTTOM_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_TOP_LEFT_PORTRAIT_CENTER_PORTRAIT_RIGHT_LANDSCAPE_BOTTOM_LEFT_LANDSCAPE_CENTER_PORTRAIT_RIGHT_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_LANDSCAPE_PORTRAIT_CENTER_PORTRAIT_LANDSCAPE_RIGHT_LANDSCAPE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_LEFT_PORTRAIT_LANDSCAPE_CENTER_LANDSCAPE_PORTRAIT_RIGHT_PORTRAIT_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_TOP_TWO_LANDSCAPE_MIDDLE_TWO_LANDSCAPE_BOTTOM_TWO_LANDSCAPE_LAYOUT,
    PHOTOBOOK_FRAME_TOP_THREE_PORTRAIT_BOTTOM_THREE_PORTRAIT_LAYOUT,
    PHOTOBOOK_FRAME_TOP_THREE_LANDSCAPE_BOTTOM_THREE_LANDSCAPE_LAYOUT,
  ]
