import {
  AssetActionTypes,
  AssetType,
  IAsset,
  IAudioAssetContent,
  IFilestackImageEnhancePreset,
} from './Assets.types'
import { ResourceFileStatus } from './Resource.types'
import { EulogiseProduct } from './Eulogise.types'
import {
  IBaseProductTheme,
  ICardProductData,
  ICardProductState,
  ICardProductThemeThumbnail,
  MemorialVisualStatus,
} from './CardProduct.types'
import { ConnectionActionTypes } from './Connection.types'

export enum SlideshowActionTypes {
  ATTACH_AUDIOS_TO_SLIDESHOW = 'ATTACH_AUDIOS_TO_SLIDESHOW',
  REPLACE_AUDIOS_FROM_SLIDESHOW = 'REPLACE_AUDIOS_FROM_SLIDESHOW',
  CLEAN_UP_SLIDESHOW_UNDO_HISTORY = 'CLEAN_UP_SLIDESHOW_UNDO_HISTORY',
  UNDO_SLIDESHOW_CONTENT = 'UNDO_SLIDESHOW_CONTENT',
  REDO_SLIDESHOW_CONTENT = 'REDO_SLIDESHOW_CONTENT',
  DOWNLOAD_SLIDESHOW = 'DOWNLOAD_SLIDESHOW',
  DOWNLOAD_SLIDESHOW_SUCCESS = 'DOWNLOAD_SLIDESHOW_SUCCESS',
  DOWNLOAD_SLIDESHOW_FAILED = 'DOWNLOAD_SLIDESHOW_FAILED',
  RESET_SLIDESHOW = 'RESET_SLIDESHOW',
  UPDATE_SLIDESHOW_BACKGROUND_IMAGE = 'UPDATE_SLIDESHOW_BACKGROUND_IMAGE',
  UPSERT_SLIDESHOW_BY_CASE_ID = 'UPSERT_SLIDESHOW_BY_CASE_ID',
  FETCH_SLIDESHOWS_BY_CASE_ID = 'FETCH_SLIDESHOWS_BY_CASE_ID',
  FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS = 'FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS',
  FETCH_SLIDESHOWS_BY_CASE_ID_FAILED = 'FETCH_SLIDESHOWS_BY_CASE_ID_FAILED',
  CREATE_SLIDESHOW_BY_CASE_ID = 'CREATE_SLIDESHOW_BY_CASE_ID',
  CREATE_SLIDESHOW_BY_CASE_ID_SUCCESS = 'CREATE_SLIDESHOW_BY_CASE_ID_SUCCESS',
  CREATE_SLIDESHOW_BY_CASE_ID_FAILED = 'CREATE_SLIDESHOW_BY_CASE_ID_FAILED',
  UPDATE_TITLE_SLIDE = 'UPDATE_TITLE_SLIDE',
  SAVE_TITLE_SLIDE = 'SAVE_TITLE_SLIDE',
  SAVE_SLIDESHOW_BY_CASE_ID = 'SAVE_SLIDESHOW_BY_CASE_ID',
  SAVE_SLIDESHOW_BY_CASE_ID_SUCCESS = 'SAVE_SLIDESHOW_BY_CASE_ID_SUCCESS',
  SAVE_SLIDESHOW_BY_CASE_ID_FAILED = 'SAVE_SLIDESHOW_BY_CASE_ID_FAILED',
  GENERATE_SLIDESHOW = 'GENERATE_SLIDESHOW',
  GENERATE_SLIDESHOW_SUCCESS = 'GENERATE_SLIDESHOW_SUCCESS',
  GENERATE_SLIDESHOW_FAILED = 'GENERATE_SLIDESHOW_FAILED',
  UPDATE_SLIDE_BY_INDEX = 'UPDATE_SLIDE_BY_INDEX',
  UPDATE_SLIDES = 'UPDATE_SLIDES',
  UPDATE_SLIDESHOW = 'UPDATE_SLIDESHOW',
  RESET_SLIDESHOW_STATE = 'RESET_SLIDESHOW_STATE',
  UPDATE_TIMELINE_THUMBNAILS_DISPLAYED_AMOUNT = 'UPDATE_TIMELINE_THUMBNAILS_DISPLAYED_AMOUNT',
  UPDATE_TIMELINE_UPLOAD_IMAGE_PANEL_COLLAPSED = 'UPDATE_TIMELINE_UPLOAD_IMAGE_PANEL_COLLAPSED',
}

export interface ISlideBlock {
  depth: number
  data: object
  inlineStyleRanges: Array<any>
  text: string
  type: string
  key: string
  entityRanges: Array<any>
}

export interface ISlideshowAction {
  type: SlideshowActionTypes | AssetActionTypes | ConnectionActionTypes
  payload?: {
    audios?: Array<IAudioAssetContent>
    product?: EulogiseProduct
    items?: Array<ISlideshowData> | Array<IAsset>
    slideshowTheme?: ISlideshowTheme
    timelineThumbnailsDisplayedAmount?: number
    timelineUploadImagePanelCollapsed?: boolean
    assetType?: AssetType
    slideshowId?: string
    productData?: ISlideshowData
    slideshow?: ISlideshowData
    slide?: ISlide
    slides?: Array<ISlide>
    slideIndex?: number
  }
}

export interface ISlideshowState {
  items?: Array<ISlideshowData>
  activeItem?: ISlideshowData
  activeSlideshowTheme?: ISlideshowTheme
  undoContentList: Array<ISlideshowDataContent>
  redoContentList: Array<ISlideshowDataContent>
  isFetching: boolean
  isUpdating: boolean
  isCreating: boolean
  isDownloading: boolean
  timelineThumbnailsDisplayedAmount?: number
  timelineUploadImagePanelCollapsed?: boolean
}

export enum SlideType {
  TITLE_SLIDE = 'Title Slide',
  IMAGE_SLIDE = 'Image Slide',
  END_TITLE_SLIDE = 'End Title Slide',
}

export enum SlideTransition {
  SLIDE_UP_FROM_BOTTOM = 'slideUp',
  FADE_ON = 'crossFade',
  NO_ANIMATION = 'none',
}

export enum SLIDE_ANIMATIONS_DISPLAY_IN_CLIENT {
  SLIDE_UP_FROM_BOTTOM = 'Slide Up',
  FADE_ON = 'Fade On',
  NO_ANIMATION = 'No Animation',
}

export declare type ITransitionType =
  | 'crossBlur'
  | 'crossFade'
  | 'slideUp'
  | 'slideDown'
  | 'slideRight'
  | 'crossFadeZoomOut'
  | 'none'

export declare type ImageAnimationType =
  | 'zoomIn'
  | 'zoomOut'
  | 'fadeIn'
  | 'fadeInBlack'
  | 'fadeOut'
  | 'fadeOutBlack'
  | 'fadeOutZoomIn'
  | 'slideRight'
  | 'slideLeft'
  | 'slideDown'
  | 'slideUp'
  | 'slideDownIn'
  | 'slideDownOut'
  | 'slideUpIn'
  | 'slideUpOut'
  | 'slideRightIn'
  | 'slideRightOut'
  | 'slideLeftIn'
  | 'slideLeftOut'
  | 'blurIn'
  | 'blurOut'
  | 'flashIn'
  | 'flashOut'
  | 'warpRightIn'
  | 'warpRightOut'
  | 'wipeLeftIn'
  | 'wipeLeftOut'
  | 'blurOutToBg'
  | 'none'
  | 'noneIn'
  | 'noneOut'
  | 'alignTopRight'

export enum TimelineType {
  FIT_SLIDES = 'fitSlidesToAudio',
  LOOP_SLIDES = 'loopSlidesToFillAudio',
  NO_AUDIO = 'noAudio',
}

export declare type ImageFilterType =
  | '1977'
  | 'brannan'
  | 'brooklyn'
  | 'clarendon'
  | 'inkwell'
  | 'lofi'
  | 'walden'
  | 'reyes'
  | 'none'

export interface IImageType {
  filename?: string
  filepath?: string
  filestackHandle?: string
  url?: string
}

export interface ISlideshowBackground {
  color?: string
  image?: IImageType
  blurred?: boolean
}

export interface ITransition {
  type: ImageAnimationType
  duration?: number
  delay?: number
}

export interface ITitleSlideTransition {
  in: ITransition
  out: ITransition
}

export enum SlideshowEditorSortableContainerType {
  SLIDE_THUMBNAIL_LIST = 'SLIDE_THUMBNAIL_LIST',
  SLIDESHOW_IMAGE_PANEL_AND_THUMBNAIL_LIST = 'SLIDESHOW_IMAGE_PANEL_AND_THUMBNAIL_LIST',
}

export interface ISlideTransitionParams {
  transitionIn?: ITransition
  transitionOut?: ITransition
  animation?: ImageAnimationType
  slideIndex?: number
  slideDuration?: number // total duration (including transition in & out)
}

export interface ITransitionInOut {
  in: ITransition
  out: ITransition
}

export interface ITransitionInOutWithAnimation extends ITransitionInOut {
  animation: ImageAnimationType
}

export interface IGetTransitionInOutData {
  in: ITransition
  out: ITransition
}

interface ITitleContentBlock {
  depth: number
  data: object
  inlineStyleRanges: Array<any>
  text: string
  type: string
  key: string
  entityRanges: Array<any>
}

export interface ISlideTitleContent {
  blocks: Array<ITitleContentBlock>
  entityMap: object
}

export interface ISlideTextTitle {
  style?: object
  content: ISlideTitleContent
}

export interface IThemeSlideshowBackground {
  color: string
  image: IImageType
  blurred?: boolean
  enlarge?: Array<boolean>
}

export declare type IThemeTextTransition =
  | 'blurOutToBgFadeIn'
  | 'blurOutToBgSlideUp'
  | 'blurOutToBgSlideRight'
  | 'crossFade'
  | 'slideRight'
  | 'crossFlash'
  | 'slideLeft'
  | 'slideUp'
  | 'slideDown'
  | 'crossBlur'
  | 'wipeLeftFadeIn'
  | 'crossFadeZoomOut'

export interface ISlideshowThemeContent {
  themeDefaultImageFilter: ImageFilterType
  slideshowTransitionIn: ITransitionType
  slideshowTransitionOut: ITransitionType
  slideshowBackground?: IThemeSlideshowBackground
  slideBackground: ISlideBackground
  image: {
    borderSettings: {
      enabled: boolean
    }
  }
  slideTransitions: Array<ITransitionInOutWithAnimation>
  transitionDuration: number
  slideshowDefaultThemeTracks: ISlideshowDefaultTrack
}

export interface ISlideshowDefaultTrack {
  title: string
}
export interface ISlideshowThemeProductAssets {
  images?: Array<string>
  video?: string
}

export interface ISlideshowTheme extends IBaseProductTheme {
  thumbnail: ICardProductThemeThumbnail
  content: ISlideshowThemeContent
}

export interface ISlide {
  isTitleSlideEnable?: boolean
  background?: ISlideBackground
  titleSlideTransition?: ITitleSlideTransition
  titleSlideTextAnimation?: SlideTransition
  slideType: 'Title Slide' | 'Image Slide' | 'End Title Slide'
  image?: ISlideImage
  slideDuration?: number // total slide duration (including transition in & out)
}

export enum DragAndDropCollection {
  SLIDE = 'SLIDE',
  IMAGE = 'IMAGE',
  DRAGGING_IMAGE = 'DRAGGING_IMAGE',
}

export interface ISlideGroup {
  id?: string | 'end-title-slide' // filestackHandle
  imageSlide?: ISlide
  titleSlide?: ISlide
  imageSlideIndex?: number
  isEmpty?: boolean
}

export interface ISlideShowType {
  timelineType?: TimelineType
  audio: Array<{
    filename?: string
    filestackHandle?: string
    duration?: string
  }>
  titleSlideEnabled?: boolean
  endTitleSlideEnabled?: boolean
  slides: Array<ISlide>
  slideshowBackground: ISlideshowBackground
}

export enum IAnimationEasing {
  LINEAR = 'linear',
  EASE_IN_SINE = 'easeInSine',
  EASE_OUT_SINE = 'easeOutSine',
  EASE_IN_QUAD = 'easeInQuad',
  EASE_OUT_QUAD = 'easeOutQuad',
  EASE_IN_OUT_QUAD = 'easeInOutQuad',
  EASE_IN_QUART = 'easeInQuart',
  EASE_OUT_QUART = 'easeOutQuart',
  EASE_IN_OUT_QUART = 'easeInOutQuart',
  EASE_OUT_BACK = 'easeOutBack',
  EASE_IN_BACK = 'easeInBack',
}

export interface ISlideBackground {
  blurred?: boolean | [boolean]
  color?: string
  image?: IImageType
  filter?: ImageFilterType
  enlarge?: boolean
  getImage?: string | Array<string | null> | null
}

export interface ISlideImage {
  filepath: string
  filestackHandle: string
  filename: string
  transitionIn?: ITransition
  transitionOut?: ITransition
  animation?: ImageAnimationType
  filter?: ImageFilterType
  preset?: IFilestackImageEnhancePreset
  isRemovedBackgroundImage?: boolean
}

export type ISlideshowBorderSettings = {
  enabled?: boolean
}

export interface ISlideshowDataContent {
  hasUserSave: boolean
  titleSlideEnabled?: boolean
  timelineType: TimelineType
  slides: Array<ISlide>
  hasUserPreview: boolean
  imageBorderSettings?: ISlideshowBorderSettings
  theme: string
  audio: Array<IAudioAssetContent>
  imageFilter: string
  defaultTitleSlideContent?: ISlide
  noAudioModeSlideDuration?: number // no audio global slide duration
  duration?: number
  slideshowBackground?: ISlideshowBackground
  isVideoBier?: boolean
}

export interface ISlideshowDataResponse {
  data: { item: ISlideshowData }
}

export interface ISlideshowData {
  id?: string
  updatedAt?: string
  status: MemorialVisualStatus
  createdAt?: string
  case: string
  content: ISlideshowDataContent
  fileStatus?: ResourceFileStatus
  hasGeneratedBefore?: boolean
  /**
   * Unique ID for this generation run, used to create timestamped S3 folders.
   * This allows new generation to start immediately while old files are cleaned up.
   */
  generationId?: string
}

export interface IAllActiveCardProducts {
  [EulogiseProduct.BOOKLET]?: ICardProductData
  [EulogiseProduct.SIDED_CARD]?: ICardProductData
  [EulogiseProduct.BOOKMARK]?: ICardProductData
  [EulogiseProduct.THANK_YOU_CARD]?: ICardProductData
  [EulogiseProduct.TV_WELCOME_SCREEN]?: ICardProductData
}

export interface ISlideshowStates {
  [EulogiseProduct.SLIDESHOW]: ICardProductState | null
}
