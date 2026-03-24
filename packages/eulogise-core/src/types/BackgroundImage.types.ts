import { ICardProductBackgroundImageBase } from './CardProduct.types'
import { EulogiseProduct, EulogiseRegion } from './Eulogise.types'

export interface IBackgroundImageState {
  isCreating: boolean
  isUpdating: boolean
  isRegenerating: boolean
  regenerateProduct?: EulogiseProduct
  isFetching: boolean
  isDeleting: boolean
  isAdding: boolean
  activeItem: undefined | ICardProductBackgroundImageBase
  backgroundImages: Array<ICardProductBackgroundImageBase>
}

export enum BackgroundImageActionTypes {
  FETCH_BACKGROUND_IMAGES = 'FETCH_BACKGROUND_IMAGES',
  FETCH_BACKGROUND_IMAGES_SUCCESS = 'FETCH_BACKGROUND_IMAGES_SUCCESS',
  FETCH_BACKGROUND_IMAGES_FAILED = 'FETCH_BACKGROUND_IMAGES_FAILED',

  // fetch a single background image, with the content
  FETCH_BACKGROUND_IMAGE_BY_ID = 'FETCH_BACKGROUND_IMAGE_BY_ID',
  FETCH_BACKGROUND_IMAGE_BY_ID_SUCCESS = 'FETCH_BACKGROUND_IMAGE_BY_ID_SUCCESS',
  FETCH_BACKGROUND_IMAGE_BY_ID_FAILED = 'FETCH_BACKGROUND_IMAGE_BY_ID_FAILED',

  // delete background image, with the content
  DELETE_BACKGROUND_IMAGE_BY_ID = 'DELETE_BACKGROUND_IMAGE_BY_ID',
  DELETE_BACKGROUND_IMAGE_BY_ID_SUCCESS = 'DELETE_BACKGROUND_IMAGE_BY_ID_SUCCESS',
  DELETE_BACKGROUND_IMAGE_BY_ID_FAILED = 'DELETE_BACKGROUND_IMAGE_BY_ID_FAILED',

  // create a background image
  CREATE_BACKGROUND_IMAGE = 'CREATE_BACKGROUND_IMAGE',
  CREATE_BACKGROUND_IMAGE_SUCCESS = 'CREATE_BACKGROUND_IMAGE_SUCCESS',
  CREATE_BACKGROUND_IMAGE_FAILED = 'CREATE_BACKGROUND_IMAGE_FAILED',

  // update a background image
  UPDATE_BACKGROUND_IMAGE = 'UPDATE_BACKGROUND_IMAGE',
  UPDATE_BACKGROUND_IMAGE_SUCCESS = 'UPDATE_BACKGROUND_IMAGE_SUCCESS',
  UPDATE_BACKGROUND_IMAGE_FAILED = 'UPDATE_BACKGROUND_IMAGE_FAILED',
}

export interface IBackgroundImageAction {
  type: BackgroundImageActionTypes
  payload?: {
    backgroundImage?: ICardProductBackgroundImageBase
    backgroundImages?: Array<ICardProductBackgroundImageBase>
    backgroundImageId?: string
    regenerateProduct?: EulogiseProduct
    regenerateProductRegion?: EulogiseRegion
  }
}

export type INewBackgroundFormFields = Pick<
  ICardProductBackgroundImageBase,
  'name' | 'categoryIds' | 'restrictions'
>

export enum BackgroundImageAlignmentType {
  LEFT = 'left',
  RIGHT = 'right',
  FULL = 'full',
  MID_LEFT = 'mid-left',
  MID_RIGHT = 'mid-right',
}

export type BackgroundImageProperties = {
  type?: string
  width: number
  height: number
  alignment: BackgroundImageAlignmentType
  isTwoColumnsPages: boolean
  isRemoveSideBleed?: boolean
  isRemoveFullBleed?: boolean
  region: EulogiseRegion
}

/*
const BLEED_SIZES = {
  // get bleed ratio (non bleed width (BOOKLET_FRONT) / pageSizeWidth) * bleed
  BOOKLET: (1782 / PAGE_SIZES.A5[0]) * BLEED,
  // get bleed ratio (non bleed width (THANK_YOU_CARD_2_COL_LEFT) / pageSizeWidth) * bleed
  THANK_YOU_CARD: (1782 / PAGE_SIZES.THANKYOUCARD_2_COLS[0]) * BLEED,
}

console.log('BLEED_SIZES', BLEED_SIZES)
*/

// get bleed ratio (non bleed width (BOOKLET_FRONT) / pageSizeWidth) * bleed
export const DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE = 36

export const BackgroundImageTypesMap: {
  [key: string]: BackgroundImageProperties
} = {
  THUMBNAIL: {
    width: 781,
    height: 517,
    alignment: BackgroundImageAlignmentType.FULL,
    isTwoColumnsPages: false,
    region: EulogiseRegion.AU,
  },
  BOOKLET_FRONT: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_FRONT_BOTH_SIDE: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveFullBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_LEFT: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_RIGHT: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_BACK: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_BACK_BOTH_SIDE: {
    width: 1782,
    height: 2520,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveFullBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_FRONT_BLEED: {
    width: 1818,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_FRONT_BOTH_SIDE_BLEED: {
    width: 1854,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_LEFT_BLEED: {
    width: 1818,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_RIGHT_BLEED: {
    width: 1818,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_BACK_BLEED: {
    width: 1818,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  BOOKLET_BACK_BOTH_SIDE_BLEED: {
    width: 1854,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD: {
    width: 1782,
    height: 1260,
    isTwoColumnsPages: false,
    isRemoveFullBleed: true,
    alignment: BackgroundImageAlignmentType.FULL,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD_BLEED: {
    width: 1854,
    height: 1332,
    isTwoColumnsPages: false,
    alignment: BackgroundImageAlignmentType.FULL,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD_2_COL_LEFT: {
    width: 891,
    height: 1260,
    isTwoColumnsPages: true,
    isRemoveSideBleed: true,
    alignment: BackgroundImageAlignmentType.LEFT,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD_2_COL_LEFT_BLEED: {
    width: 927,
    height: 1332,
    isTwoColumnsPages: true,
    alignment: BackgroundImageAlignmentType.LEFT,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD_2_COL_RIGHT: {
    width: 891,
    height: 1260,
    isTwoColumnsPages: true,
    isRemoveSideBleed: true,
    alignment: BackgroundImageAlignmentType.RIGHT,
    region: EulogiseRegion.AU,
  },
  THANK_YOU_CARD_2_COL_RIGHT_BLEED: {
    width: 927,
    height: 1332,
    isTwoColumnsPages: true,
    alignment: BackgroundImageAlignmentType.RIGHT,
    region: EulogiseRegion.AU,
  },
  BOOKMARK_FRONT: {
    width: 677,
    height: 2972,
    alignment: BackgroundImageAlignmentType.MID_RIGHT,
    isRemoveFullBleed: true,
    isTwoColumnsPages: false,
    region: EulogiseRegion.AU,
  },
  BOOKMARK_FRONT_BLEED: {
    width: 749,
    height: 3044,
    alignment: BackgroundImageAlignmentType.MID_RIGHT,
    isTwoColumnsPages: false,
    region: EulogiseRegion.AU,
  },
  BOOKMARK_BACK: {
    width: 677,
    height: 2972,
    isTwoColumnsPages: false,
    isRemoveFullBleed: true,
    alignment: BackgroundImageAlignmentType.MID_LEFT,
    region: EulogiseRegion.AU,
  },
  BOOKMARK_BACK_BLEED: {
    width: 749,
    height: 3044,
    isTwoColumnsPages: false,
    alignment: BackgroundImageAlignmentType.MID_LEFT,
    region: EulogiseRegion.AU,
  },
  TV_WELCOME_SCREEN_LEFT: {
    width: 1280,
    height: 1440,
    isTwoColumnsPages: true,
    alignment: BackgroundImageAlignmentType.LEFT,
    region: EulogiseRegion.AU,
  },
  TV_WELCOME_SCREEN_RIGHT: {
    width: 1280,
    height: 1440,
    isTwoColumnsPages: true,
    alignment: BackgroundImageAlignmentType.RIGHT,
    region: EulogiseRegion.AU,
  },
  SLIDESHOW: {
    width: 2560,
    height: 1440,
    isTwoColumnsPages: false,
    alignment: BackgroundImageAlignmentType.FULL,
    region: EulogiseRegion.AU,
  },

  // USA
  BOOKLET_BACK_BOTH_SIDE_USA_BLEED: {
    width: 1746,
    height: 2664,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_BACK_BOTH_SIDE_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveFullBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_BACK_USA_BLEED: {
    width: 1710,
    height: 2664,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_BACK_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_FRONT_BOTH_SIDE_USA_BLEED: {
    width: 1746,
    height: 2664,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_FRONT_BOTH_SIDE_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveFullBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_FRONT_USA_BLEED: {
    width: 1710,
    height: 2664,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_FRONT_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_LEFT_USA_BLEED: {
    width: 1710,
    height: 2664,
    alignment: BackgroundImageAlignmentType.LEFT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_LEFT_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.LEFT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_RIGHT_USA_BLEED: {
    width: 1710,
    height: 2664,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  BOOKLET_RIGHT_USA: {
    width: 1674,
    height: 2592,
    alignment: BackgroundImageAlignmentType.RIGHT,
    isRemoveSideBleed: true,
    isTwoColumnsPages: true,
    region: EulogiseRegion.USA,
  },
  SLIDESHOW_USA: {
    width: 2560,
    height: 1440,
    isTwoColumnsPages: false,
    alignment: BackgroundImageAlignmentType.FULL,
    region: EulogiseRegion.USA,
  },
  THUMBNAIL_USA: {
    width: 781,
    height: 517,
    alignment: BackgroundImageAlignmentType.FULL,
    isTwoColumnsPages: false,
    region: EulogiseRegion.USA,
  },
}

export type BackgroundImageType = keyof typeof BackgroundImageTypesMap
