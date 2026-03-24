import {
  DEFAULT_ORIGINAL_FRAME_SIZE,
  ICardProductFadeEdgeType,
  ICardProductFrameLayout,
} from '@eulogise/core'

// Create Graphic Frame please refer to https://drive.google.com/file/d/1tqjU7TDEbOAZeCu7hiyLo7KgvngEd07o/view?usp=sharing
export const CARD_PRODUCT_FRAME_BLUEGUM_GOLD_RECTANGLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-bluegum-gold-rectangle-background',
    type: 'rows',
    items: [{ type: 'content' }],
    height: 200,
    width: 176,
    isAddAsRatio: true,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Bluegum_Gold_Rectangle_Frame_v3',
      imageContainerWidth: '65%',
      imageContainerHeight: '82%',
      imageContainerTransform: 'translate(40%,5%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_BLUE_PASTEL_CIRCLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-blue-pastel-circle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Blue_Watercolor_Circle_Frame_v3',
      imageContainerWidth: '52%',
      imageContainerHeight: '52%',
      imageContainerTransform: 'translate(46%, 43%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_BLUE_PASTEL_RECTANGLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-blue-pastel-rectangle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Pastel_Blue_Flowers_Rectangle_v3',
      imageContainerWidth: '38%',
      imageContainerHeight: '59%',
      imageContainerTransform: 'translate(79%, 23%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_RECTANGLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-bluegold-roses-rectangle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: 186,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'BlueGold_Roses_Rectangle_Frame_v3',
      imageContainerWidth: '51%',
      imageContainerHeight: '78%',
      imageContainerTransform: 'translate(48%, 13%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_SQUARE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-bluegold-roses-square-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Bluegold_Roses_Square_Frame_v3',
      imageContainerWidth: '62%',
      imageContainerHeight: '62%',
      imageContainerTransform: 'translate(34%, 29%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_CIRCLE_LEAF_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-circle-leaf-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    height: 150,
    isAddAsRatio: true,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Circle_Leaf_1_Frame_v3',
      imageContainerWidth: '73%',
      imageContainerHeight: '96%',
      imageContainerTransform: 'translate(18%, 0%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_CIRCLE_LEAF_2_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-circle-leaf-2-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: 170,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    isAddAsRatio: true,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Circle_Leaf_2_Frame_v3',
      imageContainerWidth: '76%',
      imageContainerHeight: '94%',
      imageContainerTransform: 'translate(15%, 2%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_GOLD_ROSES_CIRCLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-gold-roses-circle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Gold_Roses_Circle_Frame_v3',
      imageContainerWidth: '73%',
      imageContainerHeight: '73%',
      imageContainerTransform: 'translate(20%, 14%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_GOLD_ROSES_HEXAGON_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-gold-roses-hexagon-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Gold_Roses_Hexagon_Frame_v3',
      imageContainerWidth: '75%',
      imageContainerHeight: '80%',
      imageContainerTransform: 'translate(20%, 18%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_GOLDBLUE_ROSES_CIRCLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-goldblue-roses-circle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Goldblue_Roses_Cricle_Frame_v3',
      imageContainerWidth: '73%',
      imageContainerHeight: '73%',
      imageContainerTransform: 'translate(20%, 17%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_RECTANGLE_LEAF_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-rectangle-leaf-background',
    type: 'rows',
    items: [{ type: 'content' }],
    width: 183,
    height: 168,
    isAddAsRatio: true,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Leaf_Square_Frame_v3',
      imageContainerWidth: '70%',
      imageContainerHeight: '87%',
      imageContainerTransform: 'translate(22%, 11%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_FLORAL_CIRCLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-floral-circle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Floral_Circle_v3',
      imageContainerWidth: '80%',
      imageContainerHeight: '83%',
      imageContainerTransform: 'translate(16%, 7.5%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_PINK_ROSE_SQUARE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-pink-rose-square-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Pink_Rose_Square_v3',
      imageContainerWidth: '42.2%',
      imageContainerHeight: '50.4%',
      imageContainerTransform: 'translate(70.6%, 49.4%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_GOLD_ROSES_RECTANGLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-gold-roses-rectangle-background',
    type: 'rows',
    items: [
      {
        type: 'content',
      },
    ],
    height: DEFAULT_ORIGINAL_FRAME_SIZE,
    width: DEFAULT_ORIGINAL_FRAME_SIZE,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'Gold_Roses_Rectangle_v3',
      imageContainerWidth: '50%',
      imageContainerHeight: '79%',
      imageContainerTransform: 'translate(49%, 12%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const CARD_PRODUCT_FRAME_WHITE_ROSE_RECTANGLE_BACKGROUND: ICardProductFrameLayout =
  {
    layoutId: 'card-product-frame-white-rose-rectangle-background',
    type: 'rows',
    items: [{ type: 'content' }],
    width: 185,
    height: 240,
    isAddAsRatio: true,
    lockAspectRatio: true,
    graphicFrame: {
      name: 'White_Rose_Rectangle_Frame_v3',
      imageContainerWidth: '73%',
      imageContainerHeight: '76%',
      imageContainerTransform: 'translate(20%, 18%)',
    },
    fadeEdge: ICardProductFadeEdgeType.NONE,
  }

export const GRAPHIC_FRAME_LAYOUTS = [
  CARD_PRODUCT_FRAME_CIRCLE_LEAF_BACKGROUND,
  CARD_PRODUCT_FRAME_CIRCLE_LEAF_2_BACKGROUND,
  CARD_PRODUCT_FRAME_RECTANGLE_LEAF_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLDBLUE_ROSES_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGOLD_ROSES_SQUARE_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_HEXAGON_BACKGROUND,
  CARD_PRODUCT_FRAME_GOLD_ROSES_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_FLORAL_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUE_PASTEL_CIRCLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUE_PASTEL_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_BLUEGUM_GOLD_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_WHITE_ROSE_RECTANGLE_BACKGROUND,
  CARD_PRODUCT_FRAME_PINK_ROSE_SQUARE_BACKGROUND,
]
