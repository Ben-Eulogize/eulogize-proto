import {
  AssetType,
  IAssetRequestData,
  IImageAsset,
  AssetActionTypes,
  IAudioAssetContent,
  RemoveBackgroundImageMode,
} from '@eulogise/core'
import { EulogiseImageLibrarySortingBy } from '@eulogise/core'
import { PickerFileMetadata } from 'filestack-js'

type FetchAssetsByCaseIdPayload = {
  caseId: string
  assetType: AssetType
  sortBy?: EulogiseImageLibrarySortingBy
  customisedImagesOrderIds?: Array<string>
}

export type FetchAssetsByCaseIdAction = {
  type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID
  payload: FetchAssetsByCaseIdPayload
}

export const fetchAssetsByCaseId = (payload: FetchAssetsByCaseIdPayload) => {
  return {
    type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID,
    payload,
  }
}

export const fetchImageAssetsByCaseId = (caseId: string) => {
  return fetchAssetsByCaseId({ caseId, assetType: AssetType.IMAGE })
}

export const fetchAudioAssetsByCaseId = (caseId: string) => {
  return fetchAssetsByCaseId({ caseId, assetType: AssetType.AUDIO })
}

type FetchBrandsByClientIdPayload = {
  clientId: string
}

export type FetchBrandsByClientIdAction = {
  type: AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID
  payload: FetchBrandsByClientIdPayload
}

export const fetchBrandAssetsByClientId = (
  payload: FetchBrandsByClientIdPayload,
) => ({
  type: AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID,
  payload,
})

export const resetAssetState = () => ({
  type: AssetActionTypes.RESET_ASSET_STATE,
})

type SaveAudioFromFileStackPayload = {
  caseId: string
  file: PickerFileMetadata
  onSuccess: (item: IAudioAssetContent) => void
}

export type SaveAudioFromFileStackAction = {
  type: AssetActionTypes.SAVE_AUDIO_FROM_FILESTACK
  payload: SaveAudioFromFileStackPayload
}

export const saveAudioFromFileStack = (
  payload: SaveAudioFromFileStackPayload,
) => ({
  type: AssetActionTypes.SAVE_AUDIO_FROM_FILESTACK,
  payload,
})

type SaveEditedAudioBufferPayload = {
  caseId: string
  editedAudioFromFileStack: PickerFileMetadata
  fileName: string
  previousEditedAudioId: string
  key: string
  onSuccess: (item: IAudioAssetContent) => void
}

export type SaveEditedAudioBufferAction = {
  type: AssetActionTypes.SAVE_EDITED_AUDIO_BUFFER
  payload: SaveEditedAudioBufferPayload
}

// This function is only for uploading edited audio via audio trimmer
export const saveEditedAudioBuffer = (
  payload: SaveEditedAudioBufferPayload,
): SaveEditedAudioBufferAction => ({
  type: AssetActionTypes.SAVE_EDITED_AUDIO_BUFFER,
  payload,
})

type SaveAudiosFromFilestackPayload = {
  caseId: string
  files: Array<PickerFileMetadata>
  onSuccess: (audio: Array<IAudioAssetContent>) => void
}

export type SaveAudiosFromFilestackAction = {
  type: AssetActionTypes.SAVE_AUDIOS_FROM_FILESTACK
  payload: SaveAudiosFromFilestackPayload
}

export const saveAudiosFromFileStack = (
  payload: SaveAudiosFromFilestackPayload,
): SaveAudiosFromFilestackAction => ({
  type: AssetActionTypes.SAVE_AUDIOS_FROM_FILESTACK,
  payload,
})

type SaveImagePayload = {
  file: IAssetRequestData
  onSuccess?: () => void
}

export type SaveImageAction = {
  type: AssetActionTypes.SAVE_IMAGE
  payload: SaveImagePayload
}

export const saveImage = (payload: SaveImagePayload): SaveImageAction => ({
  type: AssetActionTypes.SAVE_IMAGE,
  payload,
})

type SaveImageWithInsertIndexPayload = {
  file: IAssetRequestData
  newImageInsertIndex?: number
  onSaveNewCustomisedImageOrderIds?: (
    newImageId: string,
    newImageInsertIndex: number,
  ) => void
}

export type SaveImageWithInsertIndexAction = {
  type: AssetActionTypes.SAVE_IMAGE_WITH_INSERT_INDEX
  payload: SaveImageWithInsertIndexPayload
}

export const saveImageWithInsertIndex = (
  payload: SaveImageWithInsertIndexPayload,
): SaveImageWithInsertIndexAction => ({
  type: AssetActionTypes.SAVE_IMAGE_WITH_INSERT_INDEX,
  payload,
})

/*
export const saveImages =
  (files: Array<IAssetRequestData>) => async (dispatch: Dispatch<any>) => {
    for (const file of files) {
      dispatch(saveImage({ file }))
    }
  }
*/

type SaveImageFromFilestackPayload = {
  caseId: string
  file: PickerFileMetadata
  complete?: () => void
}

export type SaveImageFromFilestackAction = {
  type: AssetActionTypes.SAVE_IMAGE_FROM_FILESTACK
  payload: SaveImageFromFilestackPayload
}

export const saveImageFromFilestack = (
  payload: SaveImageFromFilestackPayload,
): SaveImageFromFilestackAction => ({
  type: AssetActionTypes.SAVE_IMAGE_FROM_FILESTACK,
  payload,
})

type SaveImagesFromFilestackPayload = {
  caseId: string
  files: Array<PickerFileMetadata>
  complete?: () => void
}

export type SaveImagesFromFilestackAction = {
  type: AssetActionTypes.SAVE_IMAGES_FROM_FILESTACK
  payload: SaveImagesFromFilestackPayload
}

export const saveImagesFromFilestack = (
  payload: SaveImagesFromFilestackPayload,
) => ({
  type: AssetActionTypes.SAVE_IMAGES_FROM_FILESTACK,
  payload,
})

type SaveBrandFromFilestackPayload = {
  client: string
  file: PickerFileMetadata
  complete?: () => void
}

export type SaveBrandFromFilestackAction = {
  type: AssetActionTypes.SAVE_BRAND_FROM_FILESTACK
  payload: SaveBrandFromFilestackPayload
}

export const saveBrandFromFilestack = (
  payload: SaveBrandFromFilestackPayload,
): SaveBrandFromFilestackAction => ({
  type: AssetActionTypes.SAVE_BRAND_FROM_FILESTACK,
  payload,
})

type UpdateImagesOrdersPayload = {
  newOrderImages: Array<IImageAsset>
  complete?: () => void
}

export type UpdateImagesOrdersAction = {
  type: AssetActionTypes.UPDATE_IMAGES_ORDER
  payload: UpdateImagesOrdersPayload
}

export const updateImagesOrders = (payload: UpdateImagesOrdersPayload) => ({
  type: AssetActionTypes.UPDATE_IMAGES_ORDER,
  payload,
})

type UpdateImagesSortByPayload = {
  sortBy: EulogiseImageLibrarySortingBy
  complete?: () => void
}
export type UpdateImagesSortByAction = {
  type: AssetActionTypes.UPDATE_IMAGES_SORTED_BY
  payload: UpdateImagesSortByPayload
}

export const updateImagesSortBy = (
  payload: UpdateImagesSortByPayload,
): UpdateImagesSortByAction => ({
  type: AssetActionTypes.UPDATE_IMAGES_SORTED_BY,
  payload,
})

type RemoveAssetPayload = {
  assetId: string
  assetType: AssetType
  onSuccess?: () => void
}

export type RemoveAssetAction = {
  type: AssetActionTypes.REMOVE_ASSET
  payload: RemoveAssetPayload
}

export const removeAsset = (
  payload: RemoveAssetPayload,
): RemoveAssetAction => ({
  type: AssetActionTypes.REMOVE_ASSET,
  payload,
})

type RemoveAssetsPayload = {
  assetIds: Array<string>
  onSuccess?: () => void
  onFailed?: () => void
}

export type RemoveAssetsAction = {
  type: AssetActionTypes.REMOVE_ASSETS
  payload: RemoveAssetsPayload
}

export const removeAssets = (
  payload: RemoveAssetsPayload,
): RemoveAssetsAction => ({
  type: AssetActionTypes.REMOVE_ASSETS,
  payload,
})

export const removeImageBackground = (
  payload: RemoveImageBackgroundPayload,
): RemoveImageBackgroundAction => ({
  type: AssetActionTypes.REMOVE_IMAGE_BACKGROUND,
  payload,
})

type RemoveImageBackgroundPayload = {
  assetId: string
  assetType: AssetType
  removingImageBackgroundImageIndex: number
  mode: RemoveBackgroundImageMode
  onSuccess?: () => void
}

export type RemoveImageBackgroundAction = {
  type: AssetActionTypes.REMOVE_IMAGE_BACKGROUND
  payload: RemoveImageBackgroundPayload
}

type UploadingEditedImageStartPayload = { uploadingEditedImageIndex: number }

export const uploadingEditedImageStart = (
  payload: UploadingEditedImageStartPayload,
) => ({
  type: AssetActionTypes.UPLOAD_EDITED_IMAGE,
  payload,
})

type UpdateIsSelectingPhotosPayload = {
  isSelectingPhoto: boolean
}

export type UpdateIsSelectingPhotosAction = {
  type: AssetActionTypes.UPDATE_IS_SELECTING_PHOTOS
  payload: UpdateIsSelectingPhotosPayload
}

export const updateIsSelectingPhotos = (
  payload: UpdateIsSelectingPhotosPayload,
) => ({
  type: AssetActionTypes.UPDATE_IS_SELECTING_PHOTOS,
  payload,
})

type UpdateSelectedPhotosPayload = {
  selectedPhotos: Array<IImageAsset>
}

export type UpdateSelectedPhotosAction = {
  type: AssetActionTypes.UPDATE_SELECTED_PHOTOS
  payload: UpdateSelectedPhotosPayload
}

export const updateSelectedPhotos = (payload: UpdateSelectedPhotosPayload) => ({
  type: AssetActionTypes.UPDATE_SELECTED_PHOTOS,
  payload,
})

type UpdateIsDeletingPhotosPayload = {
  isDeletingSelectedPhotos: boolean
}

export type UpdateIsDeletingPhotosAction = {
  type: AssetActionTypes.UPDATE_IS_DELETING_PHOTOS
  payload: UpdateIsSelectingPhotosPayload
}

export const updateIsDeletingPhotos = (
  payload: UpdateIsDeletingPhotosPayload,
) => ({
  type: AssetActionTypes.UPDATE_IS_DELETING_PHOTOS,
  payload,
})

type UpdateIsFSOverlayPickerOpenPayload = {
  isFilestackOverlayPickerOpen: boolean
  filestackOverlayPickerUploadAssetType: AssetType | null
}

export type UpdateIsFSOverlayPickerOpenAction = {
  type: AssetActionTypes.UPDATE_IS_FS_OVERLAY_PICKER_OPEN
  payload: UpdateIsFSOverlayPickerOpenPayload
}

export const updateIsFSOverlayPickerOpen = (
  payload: UpdateIsFSOverlayPickerOpenPayload,
) => ({
  type: AssetActionTypes.UPDATE_IS_FS_OVERLAY_PICKER_OPEN,
  payload,
})

type DetectAssetFacesPayload = {
  assetId: string
  oldFilestackHandle?: string
  forceRedetect?: boolean
  onSuccess?: (updatedAsset: IImageAsset) => void
  onError?: (error: string) => void
}

export type DetectAssetFacesAction = {
  type: AssetActionTypes.DETECT_ASSET_FACES
  payload: DetectAssetFacesPayload
}

export const detectAssetFaces = (
  payload: DetectAssetFacesPayload,
): DetectAssetFacesAction => ({
  type: AssetActionTypes.DETECT_ASSET_FACES,
  payload,
})

type DetectAllCaseFacesPayload = {
  caseId: string
  forceRedetect?: boolean
  onSuccess?: (results: {
    processedImages: number
    failedImages: number
    results: Array<{
      assetId: string
      status: 'success' | 'failed' | 'skipped'
      message?: string
      asset: IImageAsset
    }>
  }) => void
  onError?: (error: string) => void
}

export type DetectAllCaseFacesAction = {
  type: AssetActionTypes.DETECT_ALL_CASE_FACES
  payload: DetectAllCaseFacesPayload
}

export const detectAllCaseFaces = (
  payload: DetectAllCaseFacesPayload,
): DetectAllCaseFacesAction => ({
  type: AssetActionTypes.DETECT_ALL_CASE_FACES,
  payload,
})
