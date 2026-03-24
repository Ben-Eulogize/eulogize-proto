import {
  AssetActionTypes,
  AssetType,
  ConnectionActionTypes,
  EulogiseImageLibrarySortingBy,
  IAsset,
  IAssetAction,
  IAssetState,
  IAudioAsset,
  IImageAsset,
} from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'

const initialState: IAssetState = {
  items: [],
  audios: [],
  images: [],
  brands: [],
  isFetching: false,
  sortBy: EulogiseImageLibrarySortingBy.UPLOAD_TIME,
  isUploadingEditedImage: false,
  uploadingEditedImageIndex: -1,
  isRemovingImageBackground: false,
  removingImageBackgroundImageIndex: -1,
  isSelectingPhoto: false,
  selectedPhotos: [],
  isDeletingSelectedPhotos: false,
  isFilestackOverlayPickerOpen: false,
  filestackOverlayPickerUploadAssetType: null,
}

export const AssetReducer = (
  state: IAssetState = initialState,
  action: IAssetAction,
): IAssetState => {
  switch (action.type) {
    case ConnectionActionTypes.ASSET_UPDATED: {
      const assetId = action.payload?.assetId
      const newAssetData = action.payload?.assetData
      const asset = state.items?.find((i) => i.id === assetId)
      const items = asset
        ? ((state.items ?? []).map((i) => {
            if (i.id === asset.id) {
              return newAssetData
            }
            return i
          }) as Array<IAsset>)
        : (state.items ?? []).concat(newAssetData!)
      const images = items.filter(
        (i) => i?.type === 'image',
      ) as Array<IImageAsset>
      const audios = items.filter(
        (i) => i?.type === 'audio',
      ) as Array<IAudioAsset>
      return {
        ...state,
        // if asset exists, update item. Otherwise add the asset
        items: items,
        audios,
        images,
      }
    }
    case ConnectionActionTypes.ASSET_DELETED: {
      const assetId = action.payload?.assetId
      return {
        ...state,
        items: (state.items ?? []).filter((i) => i.id !== assetId),
        images: (state.items ?? []).filter(
          (i) => i.id !== assetId,
        ) as Array<IImageAsset>,
        audios: (state.items ?? []).filter(
          (i) => i.id !== assetId,
        ) as Array<IAudioAsset>,
      }
    }
    case AssetActionTypes.RESET_ASSET_STATE: {
      return initialState
    }
    case AssetActionTypes.FETCH_ASSETS_BY_CASE_ID: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS: {
      const newItems = action.payload?.items
      const newAssetType = action.payload?.assetType
      const sortBy =
        action.payload?.sortBy ?? EulogiseImageLibrarySortingBy.FILE_NAME
      const customisedImagesOrderIds = action.payload?.customisedImagesOrderIds

      const audios = (
        (newAssetType === AssetType.AUDIO
          ? newItems?.filter((item: IAsset) => item.type === AssetType.AUDIO)
          : state.audios) || []
      ).sort((a, b) =>
        a.updatedAt > b.updatedAt ? -1 : 1,
      ) as Array<IAudioAsset>

      let images = (
        (newAssetType === AssetType.IMAGE
          ? newItems?.filter((item: IAsset) => item.type === AssetType.IMAGE)
          : state.images) || []
      ).sort((a, b) =>
        a.updatedAt > b.updatedAt ? -1 : 1,
      ) as Array<IImageAsset>

      if (
        sortBy === EulogiseImageLibrarySortingBy.CUSTOMISED &&
        customisedImagesOrderIds &&
        customisedImagesOrderIds.length > 0
      ) {
        images = AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds!,
        )
      }
      return {
        ...state,
        items: [...images, ...audios],
        images,
        audios,
        sortBy,
        isFetching: false,
      }
    }
    case AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID_SUCCESS: {
      const newItems = action.payload?.items
      const oldStateItems = state.items ?? ([] as IAsset[])

      const brands = newItems?.filter(
        (item: IAsset) => item.type === AssetType.BRAND,
      ) as Array<IImageAsset>

      return {
        ...state,
        items: [...oldStateItems, ...brands],
        brands,
        isFetching: false,
      }
    }
    case AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case AssetActionTypes.SAVE_ASSET_SUCCESS: {
      const { image, assetType } = action.payload!
      if (assetType === AssetType.AUDIO) {
        return state
      }
      if (!image) {
        return state
      }
      // Response is to update an existing image
      if (image?.type == AssetType.IMAGE && state?.images?.length! > 0) {
        const existingImageIds: string[] = state?.images?.map((i) => i.id) ?? []
        if (existingImageIds.includes(image?.id)) {
          const updatedImages = state.images?.map((oldImage) =>
            oldImage.id === image.id ? image : oldImage,
          )
          const updatedItems = state.images?.map((oldItem) =>
            oldItem.id === image.id ? image : oldItem,
          )
          return {
            ...state,
            items: updatedImages,
            images: updatedItems,
          }
        }
      }
      return {
        ...state,
        items: [image, ...state.items!],
        images: [image, ...state.images!],
      }
    }
    case AssetActionTypes.SAVE_ASSET_SUCCESS_WITH_INSERT_INDEX: {
      const { image, assetType, insertIndex } = action.payload!
      if (assetType === AssetType.AUDIO) {
        return state
      }
      if (!image) {
        return state
      }
      // @ts-ignore
      const newInsertedItems = state.items?.toSpliced(insertIndex, 0, image)
      // @ts-ignore
      const newInsertedImage = state.images?.toSpliced(insertIndex, 0, image)
      return {
        ...state,
        items: newInsertedItems,
        images: newInsertedImage,
      }
    }
    case AssetActionTypes.REMOVE_ASSET_SUCCESS: {
      const { assetId } = action.payload!
      return {
        ...state,
        items: state.items?.filter((item: IAsset) => item.id !== assetId),
        images: state.images?.filter((item: IAsset) => item.id !== assetId),
      }
    }
    case AssetActionTypes.REMOVE_ASSETS_SUCCESS: {
      const { assetIds } = action.payload!
      return {
        ...state,
        items: state.items?.filter(
          (item: IAsset) => !assetIds!.includes(item.id),
        ),
        images: state.images?.filter(
          (item: IAsset) => !assetIds!.includes(item.id),
        ),
      }
    }
    case AssetActionTypes.UPDATE_IMAGES_ORDER: {
      const { newOrderImages } = action.payload!
      return {
        ...state,
        images: newOrderImages,
      }
    }
    case AssetActionTypes.UPDATE_IMAGES_SORTED_BY: {
      const { sortBy } = action.payload!
      return {
        ...state,
        sortBy: sortBy!,
      }
    }
    case AssetActionTypes.UPLOAD_EDITED_IMAGE: {
      const { uploadingEditedImageIndex } = action.payload!
      return {
        ...state,
        isUploadingEditedImage: true,
        uploadingEditedImageIndex,
      }
    }
    case AssetActionTypes.UPLOAD_EDITED_IMAGE_SUCCESS: {
      return {
        ...state,
        isUploadingEditedImage: false,
        uploadingEditedImageIndex: -1,
      }
    }
    case AssetActionTypes.UPLOAD_EDITED_IMAGE_FAILED: {
      return {
        ...state,
        isUploadingEditedImage: false,
        uploadingEditedImageIndex: -1,
      }
    }
    case AssetActionTypes.REMOVE_IMAGE_BACKGROUND: {
      const { removingImageBackgroundImageIndex } = action.payload!
      return {
        ...state,
        isRemovingImageBackground: true,
        removingImageBackgroundImageIndex,
      }
    }
    case AssetActionTypes.REMOVE_IMAGE_BACKGROUND_SUCCESS: {
      return {
        ...state,
        isRemovingImageBackground: false,
        removingImageBackgroundImageIndex: -1,
      }
    }
    case AssetActionTypes.REMOVE_IMAGE_BACKGROUND_FAILED: {
      return {
        ...state,
        isRemovingImageBackground: false,
        removingImageBackgroundImageIndex: -1,
      }
    }
    case AssetActionTypes.REMOVE_IMAGE_BACKGROUND_FAILED: {
      return {
        ...state,
        isRemovingImageBackground: false,
        removingImageBackgroundImageIndex: -1,
      }
    }
    case AssetActionTypes.UPDATE_IS_SELECTING_PHOTOS: {
      const { isSelectingPhoto } = action.payload!
      if (typeof isSelectingPhoto == 'boolean') {
        return {
          ...state,
          isSelectingPhoto,
          selectedPhotos: [],
        }
      }
      return state
    }
    case AssetActionTypes.UPDATE_SELECTED_PHOTOS: {
      const { selectedPhotos } = action.payload!
      if (Array.isArray(selectedPhotos)) {
        return {
          ...state,
          selectedPhotos,
        }
      }
      return state
    }
    case AssetActionTypes.UPDATE_IS_DELETING_PHOTOS: {
      const { isDeletingSelectedPhotos } = action.payload!
      if (typeof isDeletingSelectedPhotos == 'boolean') {
        return {
          ...state,
          isDeletingSelectedPhotos,
        }
      }
      return state
    }
    case AssetActionTypes.UPDATE_IS_FS_OVERLAY_PICKER_OPEN: {
      const {
        isFilestackOverlayPickerOpen,
        filestackOverlayPickerUploadAssetType,
      } = action.payload!
      if (typeof isFilestackOverlayPickerOpen === 'boolean') {
        return {
          ...state,
          isFilestackOverlayPickerOpen,
          filestackOverlayPickerUploadAssetType,
        }
      }
      return state
    }
    case AssetActionTypes.DETECT_ASSET_FACES_SUCCESS: {
      const { asset } = action.payload!
      if (!asset || asset.type !== AssetType.IMAGE) {
        return state
      }

      // Update the asset in the images array
      const updatedImages = state.images?.map((img) =>
        img.id === asset.id ? { ...img, content: asset.content } : img,
      )

      // Update the asset in the items array
      const updatedItems = state.items?.map((item) =>
        item.id === asset.id ? { ...item, content: asset.content } : item,
      )

      return {
        ...state,
        images: updatedImages,
        items: updatedItems,
      }
    }
    case AssetActionTypes.DETECT_ASSET_FACES_FAILED: {
      // Optionally handle error state
      return state
    }
    case AssetActionTypes.DETECT_ALL_CASE_FACES: {
      // Optionally set a loading state
      return state
    }
    case AssetActionTypes.DETECT_ALL_CASE_FACES_SUCCESS: {
      const { assets } = action.payload!
      if (!assets || assets.length === 0) {
        return state
      }

      // Update the assets in the images array
      const updatedImages = state.images?.map((img) => {
        const updatedAsset = assets.find((a) => a.id === img.id)
        return updatedAsset
          ? { ...img, content: (updatedAsset as IImageAsset).content }
          : img
      })

      // Update the assets in the items array
      const updatedItems = state.items?.map((item) => {
        const updatedAsset = assets.find((a) => a.id === item.id)
        return updatedAsset
          ? { ...item, content: (updatedAsset as IImageAsset).content }
          : item
      })

      return {
        ...state,
        images: updatedImages,
        items: updatedItems,
      }
    }
    case AssetActionTypes.DETECT_ALL_CASE_FACES_FAILED: {
      // Optionally handle error state
      return state
    }
    default:
      return state
  }
}

export const AssetInitialState = initialState
