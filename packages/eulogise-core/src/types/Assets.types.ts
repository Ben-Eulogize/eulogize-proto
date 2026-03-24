import { EulogiseImageOrientation } from './CardProduct.types'
import { ConnectionActionTypes } from './Connection.types'

export enum AssetActionTypes {
  RESET_ASSET_STATE = 'RESET_ASSET_STATE',
  FETCH_ASSETS_BY_CASE_ID = 'FETCH_ASSETS_BY_CASE_ID',
  FETCH_ASSETS_BY_CASE_ID_SUCCESS = 'FETCH_ASSETS_BY_CASE_ID_SUCCESS',
  FETCH_ASSETS_BY_CASE_ID_FAILED = 'FETCH_ASSETS_BY_CASE_ID_FAILED',
  FETCH_BRANDS_BY_CLIENT_ID = 'FETCH_BRANDS_BY_CLIENT_ID',
  FETCH_BRANDS_BY_CLIENT_ID_SUCCESS = 'FETCH_BRANDS_BY_CLIENT_ID_SUCCESS',
  FETCH_BRANDS_BY_CLIENT_ID_FAILED = 'FETCH_BRANDS_BY_CLIENT_ID_FAILED',
  SAVE_AUDIO_FROM_FILESTACK = 'SAVE_AUDIO_FROM_FILESTACK',
  SAVE_AUDIOS_FROM_FILESTACK = 'SAVE_AUDIOS_FROM_FILESTACK',
  SAVE_IMAGES_FROM_FILESTACK = 'SAVE_IMAGES_FROM_FILESTACK',
  SAVE_EDITED_AUDIO_BUFFER = 'SAVE_EDITED_AUDIO_BUFFER',
  SAVE_IMAGE = 'SAVE_IMAGE',
  SAVE_ASSET = 'SAVE_ASSET',
  SAVE_ASSET_SUCCESS = 'SAVE_ASSET_SUCCESS',
  SAVE_ASSET_SUCCESS_WITH_INSERT_INDEX = 'SAVE_ASSET_SUCCESS_WITH_INSERT_INDEX',
  SAVE_ASSET_FAILED = 'SAVE_ASSET_FAILED',
  REMOVE_ASSET = 'REMOVE_ASSET',
  REMOVE_ASSET_SUCCESS = 'REMOVE_ASSET_SUCCESS',
  REMOVE_ASSET_FAILED = 'REMOVE_ASSET_FAILED',
  REMOVE_ASSETS = 'REMOVE_ASSETS',
  REMOVE_ASSETS_SUCCESS = 'REMOVE_ASSETS_SUCCESS',
  REMOVE_ASSETS_FAILED = 'REMOVE_ASSETS_FAILED',
  REMOVE_IMAGE_BACKGROUND = 'REMOVE_IMAGE_BACKGROUND',
  REMOVE_IMAGE_BACKGROUND_SUCCESS = 'REMOVE_IMAGE_BACKGROUND_SUCCESS',
  REMOVE_IMAGE_BACKGROUND_FAILED = 'REMOVE_IMAGE_BACKGROUND_FAILED',
  SAVE_IMAGE_WITH_INSERT_INDEX = 'SAVE_IMAGE_WITH_INSERT_INDEX',
  SAVE_IMAGE_FROM_FILESTACK = 'SAVE_IMAGE_FROM_FILESTACK',
  SAVE_BRAND_FROM_FILESTACK = 'SAVE_BRAND_FROM_FILESTACK',
  UPDATE_IMAGES_ORDER = 'UPDATE_IMAGES_ORDER',
  UPDATE_IMAGES_SORTED_BY = 'UPDATE_IMAGES_SORTED_BY',
  UPDATE_IMAGES_ORDER_WITH_CUSTOM_ORDERS = 'UPDATE_IMAGES_ORDER_WITH_CUSTOM_ORDERS',
  UPLOAD_EDITED_IMAGE = 'UPLOAD_EDITED_IMAGE',
  UPLOAD_EDITED_IMAGE_SUCCESS = 'UPLOAD_EDITED_IMAGE_SUCCESS',
  UPLOAD_EDITED_IMAGE_FAILED = 'UPLOAD_EDITED_IMAGE_FAILED',
  UPDATE_IS_SELECTING_PHOTOS = 'UPDATE_IS_SELECTING_PHOTOS',
  UPDATE_SELECTED_PHOTOS = 'UPDATE_SELECTED_PHOTOS',
  UPDATE_IS_DELETING_PHOTOS = 'UPDATE_IS_DELETING_PHOTOS',
  UPDATE_IS_FS_OVERLAY_PICKER_OPEN = 'UPDATE_IS_FS_OVERLAY_PICKER_OPEN',
  DETECT_ASSET_FACES = 'DETECT_ASSET_FACES',
  DETECT_ASSET_FACES_SUCCESS = 'DETECT_ASSET_FACES_SUCCESS',
  DETECT_ASSET_FACES_FAILED = 'DETECT_ASSET_FACES_FAILED',
  DETECT_ALL_CASE_FACES = 'DETECT_ALL_CASE_FACES',
  DETECT_ALL_CASE_FACES_SUCCESS = 'DETECT_ALL_CASE_FACES_SUCCESS',
  DETECT_ALL_CASE_FACES_FAILED = 'DETECT_ALL_CASE_FACES_FAILED',
}

export enum EulogiseImageLibrarySortingBy {
  UPLOAD_TIME = 'UPLOAD_TIME',
  FILE_NAME = 'FILE_NAME',
  CUSTOMISED = 'CUSTOMISED',
  RANDOM = 'RANDOM',
}
export interface IAssetAction {
  type: AssetActionTypes | ConnectionActionTypes
  payload?: {
    items?: Array<IAsset>
    assetType: AssetType
    assetId?: string
    assetIds?: string
    assetData?: IAsset
    asset?: IAsset
    assets?: Array<IAsset>
    image?: IImageAsset
    newOrderImages?: Array<IImageAsset>
    sortBy?: EulogiseImageLibrarySortingBy
    removingImageBackgroundImageIndex?: number
    uploadingEditedImageIndex?: number
    customisedImagesOrderIds?: Array<string>
    insertIndex?: number
    isSelectingPhoto?: boolean
    selectedPhotos?: Array<IImageAsset>
    isDeletingSelectedPhotos?: boolean
    isFilestackOverlayPickerOpen?: boolean
    filestackOverlayPickerUploadAssetType: AssetType | null
  }
}

export enum AssetType {
  IMAGE = 'image',
  AUDIO = 'audio',
  BRAND = 'brand',
}

export interface IImageAssetContent {
  url?: string
  filename: string
  filepath: string
  filestackHandle: string
  selected?: boolean
  height?: number
  width?: number
  orientation?: EulogiseImageOrientation
  isFullWidth?: boolean
  isStoredPermanently?: boolean
  isRemovedBackgroundImage?: boolean
  preset?: IFilestackImageEnhancePreset
  isShowLoading?: boolean
  loadingMessage?: string
  faceDetection?: {
    faces: Array<{
      topLeftX: number
      topLeftY: number
      width: number
      height: number
      confidence: number
    }>
    imageWidth: number
    imageHeight: number
    detectedAt?: number
  }
}

export type IBrandAssetContent = Pick<
  IImageAssetContent,
  'filename' | 'filepath' | 'filestackHandle'
>

export enum IAudioAssetCategory {
  UPLOADED = 'Uploaded',
  STRINGS = 'Strings',
  BRIGHT = 'Bright',
  ORCHESTRAL = 'Orchestral',
  HYMNS = 'Hymns',
  REFLECTION = 'Reflection',
  CHOIR = 'Choir',
  PIANO = 'Piano',
  INTERNAL_USED = 'Internal Used',
}

export interface IAudioAssetContent {
  duration?: number
  filestackHandle?: string
  filename: string
  filepath: string
  title: string
  category: IAudioAssetCategory
  artist: string
}

export enum AudioStatus {
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

export interface IAsset {
  id: string
  content: IImageAssetContent | IAudioAssetContent | IBrandAssetContent
  updatedAt: string
  createdAt: string
  owner: string
  case: string
  type: AssetType
  client?: string
}

export interface IAssetRequestData {
  content: IImageAssetContent | IAudioAssetContent | IBrandAssetContent
  case: string
  client?: string
  type: AssetType
}

export interface ICategorizedAudio {
  name: string
  audios: Array<IAudioAsset>
}

export interface IAudioAsset extends IAsset {
  content: IAudioAssetContent
}

export enum FileStackMimeType {
  AUDIO = 'audio/x-m4a',
}

export enum EditedAudioBufferType {
  WAV = 'audio/wav',
}

export enum FileStackStatus {
  STORED = 'Stored',
}

export enum RemoveBackgroundImageMode {
  KEEP_NEW_AND_OLD_IMAGES = 'KEEP_NEW_AND_OLD_IMAGES',
  KEEP_NEW_IMAGE_ONLY = 'KEEP_NEW_IMAGE_ONLY',
}

export interface IEditedAudioBuffer {
  size: number
  type: EditedAudioBufferType.WAV
}

export interface IAudioTag {
  title: string
  artist: string
}

export interface IImageAsset extends IAsset {
  content: IImageAssetContent
}

export interface IBrandAsset extends IAsset {
  content: IBrandAssetContent
}

export interface IAssetState {
  items?: Array<IAsset>
  audios?: Array<IAudioAsset>
  images?: Array<IImageAsset>
  brands?: Array<IBrandAsset>
  isFetching: boolean
  sortBy: EulogiseImageLibrarySortingBy
  isSelectingPhoto: boolean
  selectedPhotos: Array<IImageAsset>
  isDeletingSelectedPhotos: boolean
  isUploadingEditedImage?: boolean
  uploadingEditedImageIndex?: number
  isRemovingImageBackground?: boolean
  removingImageBackgroundImageIndex?: number
  isFilestackOverlayPickerOpen?: boolean
  filestackOverlayPickerUploadAssetType?: AssetType | null
}

export interface IImageSize {
  width: number
  height: number
}

export type IImageSizeAndPosition = IImageSize & {
  top?: number
  left?: number
  right?: number
}

export interface ICopyLibraryCopy {
  title: string
  copyFrom?: string
  text?: string
}

export interface ICopyCatogries {
  name: string
  copies: Array<ICopyLibraryCopy>
}

export enum IFilestackImageEnhancePreset {
  AUTO = 'auto',
  NULL = 'null',
  // Belows presets are not applied currently
  VIVID = 'vivid',
  BEAUTIFY = 'beautify',
  BEAUTIFY_PLUS = 'beautify_plus',
  FIX_DARK = 'fix_dark',
  FIX_NOISE = 'fix_noise',
  FIX_TINT = 'fix_tint',
  OUTDOOR = 'outdoor',
  FIREWORKS = 'fireworks',
}
