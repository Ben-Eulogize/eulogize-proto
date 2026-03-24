import { CardProductPageSize } from './CardProduct.types'

export enum PhotobookBookStyle {
  CLASSIC_PHOTOBOOK = 'CLASSIC_PHOTOBOOK',
  PREMIUM_PHOTOBOOK = 'PREMIUM_PHOTOBOOK',
}

export enum PhotobookActionTypes {
  CREATE_PHOTOBOOK = 'CREATE_PHOTOBOOK',
  UPDATE_PHOTOBOOK_COVER_TYPE = 'UPDATE_PHOTOBOOK_COVER_TYPE',
}

export enum CreatePhotobookMethod {
  START_FROM_BLANK = 'START_FROM_BLANK',
  COPY_FROM_VIDEO_TIMELINE = 'COPY_FROM_VIDEO_TIMELINE',
  IMPORT_FROM_LIBRARY = 'IMPORT_FROM_LIBRARY',
}

export enum IPhotobookFrameSize {
  'SM' = 'SM',
  'MD' = 'MD',
  'LG' = 'LG',
}

export type PhotobookFeature = {
  thumbnailUrl: string
  title: string
  description: string
}

export type PhotobookFeatures = Array<PhotobookFeature>

export type IPhotobookSizeOption = {
  label: string
  value: CardProductPageSize
  availableBookStyles?: Array<PhotobookBookStyle>
}

export type IPhotobookCoverLayoutOption = {
  label: string
  value: string
  supportedPageSizes: Array<CardProductPageSize>
}
