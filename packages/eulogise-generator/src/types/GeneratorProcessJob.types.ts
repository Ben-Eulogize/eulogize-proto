import {
  BackgroundImageType,
  CardProductPageMode,
  EulogiseProduct,
  GetImageObject,
  ICardProductData,
  ICardProductTheme,
  IGenericCardProductMetadata,
  IGenericCardProductTypeData,
  ISlideshowData,
  ISlideshowTheme,
} from '@eulogise/core'
import { BookletBackgroundEditorProps } from '@eulogise/client-components'

export enum GeneratorProcessJobTypes {
  GENERATE_SLIDESHOW_MASTER = 'GENERATE_SLIDESHOW_MASTER',
  MASTER_VIDEO_GENERATION = 'MASTER_VIDEO_GENERATION',
  SLAVE_VIDEO_BLOCK_GENERATION = 'SLAVE_VIDEO_BLOCK_GENERATION',
  SLAVE_FINALISE_VIDEO = 'SLAVE_FINALISE_VIDEO',
  GENERATE_CARD_PRODUCT = 'GENERATE_CARD_PRODUCT',
  GENERATE_CARD_PRODUCT_THUMBNAIL = 'GENERATE_CARD_PRODUCT_THUMBNAIL',
  GENERATE_CARD_PRODUCT_SINGLE_SCREENSHOT = 'GENERATE_CARD_PRODUCT_SINGLE_SCREENSHOT',
  CONVERT_TO_PRINTABLE_PDF = 'CONVERT_TO_PRINTABLE_PDF',
  CAPTURE_SCREENSHOT = 'CAPTURE_SCREENSHOT',
  CAPTURE_SCREENSHOT_TRIGGER = 'CAPTURE_SCREENSHOT_TRIGGER',
  GENERATE_BACKGROUND_IMAGE = 'GENERATE_BACKGROUND_IMAGE',
  // Generated Edited Background Image (When edit Booklet or other products)
  GENERATE_EDITED_BACKGROUND_IMAGE = 'GENERATE_EDITED_BACKGROUND_IMAGE',
}

export type PdfGeneratorJobPayload = {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  bleed: boolean
  pageMode?: CardProductPageMode
  genericProductType?: IGenericCardProductTypeData
}

export type CardProductSingleScreenshotGeneratorJobPayload = {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  pageIndex: number
}

export type ProductThumbnailGeneratorJobPayload = {
  themeId: string
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  s3Path: string
  fileName: string
}

export type MasterSlideshowProcessPayload = {
  slideshow: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideshowTitleSlide: ICardProductData
  slideshowTitleSlideTheme: ICardProductTheme
  isVideoBier: boolean
}

export type MasterVideoGenerationProcessPayload = {
  slideshow: ISlideshowData
  slideshowTheme: ISlideshowTheme
}

export type SlaveVideoBlockGenerationProcessPayload = {
  slideshow: ISlideshowData
  blockIndex: number
}

export type SlaveFinaliseVideoProcessPayload = {
  slideshow: ISlideshowData
}

export type BackgroundImageProcessPayload = {
  backgroundImageId: string
  type: BackgroundImageType
  image: GetImageObject
}

export type EditedBackgroundImageProcessPayload = Pick<
  BookletBackgroundEditorProps,
  'region' | 'imageSizeAndPosition'
> & {
  backgroundImageId: string
  product: EulogiseProduct
  genericProductMetadata?: IGenericCardProductMetadata
}

export type ConvertToPrintablePdfProcessPayload = {
  caseId: string
  s3Key: string
  product: EulogiseProduct
}

export type CaptureScreenshotProcessPayload = {
  slideshow: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideshowTitleSlide: ICardProductData
  slideshowTitleSlideTheme: ICardProductTheme
  frameIndex: number
  slideshowTitleSlideUrl: string
}

export type ScreenshotTriggerInfo = {
  triggerId: number
  startFrameIndex: number
  endFrameIndex: number
}

export type ScreenshotTriggerPayload = ScreenshotTriggerInfo & {
  slideshow: ISlideshowData
  slideshowTheme: ISlideshowTheme
  slideshowTitleSlide: ICardProductData
  slideshowTitleSlideTheme: ICardProductTheme
  slideshowTitleSlideUrl: string
}
