import {
  BackgroundImageActionTypes,
  EulogiseProduct,
  EulogiseRegion,
  GetImageObject,
  ICardProductBackgroundImageBase,
  ICardProductBackgroundStatus,
  IGenericCardProductTypeData,
} from '@eulogise/core'

type FetchBackgroundImagesAction = {
  type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES
}

export const fetchBackgroundImagesAction = (): FetchBackgroundImagesAction => ({
  type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES,
})

type FetchBackgroundImageByIdPayload = {
  backgroundImageId: string
  onSuccess?: (backgroundImage: ICardProductBackgroundImageBase) => void
}
export type FetchBackgroundImageByIdAction = {
  type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID
  payload: FetchBackgroundImageByIdPayload
}

export const fetchBackgroundImageByIdAction = (
  payload: FetchBackgroundImageByIdPayload,
): FetchBackgroundImageByIdAction => ({
  type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID,
  payload,
})

type DeleteBackgroundImageByIdPayload = { backgroundImageId: string }

export type DeleteBackgroundImageByIdAction = {
  type: BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID
  payload: DeleteBackgroundImageByIdPayload
}

export const deleteBackgroundImageByIdAction = (
  payload: DeleteBackgroundImageByIdPayload,
): DeleteBackgroundImageByIdAction => ({
  type: BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID,
  payload,
})

type CreateNewBackgroundImagePayload = {
  backgroundImage: GetImageObject
  onCreated?: (data: ICardProductBackgroundImageBase) => void
}

export type CreateNewBackgroundImageAction = {
  type: BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE
  payload: CreateNewBackgroundImagePayload
}

export const createNewBackgroundImageAction = (
  payload: CreateNewBackgroundImagePayload,
): CreateNewBackgroundImageAction => ({
  type: BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE,
  payload,
})

type UpdateBackgroundImageByIdPayload = {
  backgroundImageId: string
  backgroundImage: Partial<ICardProductBackgroundImageBase>
  status?: ICardProductBackgroundStatus
  regenerateProduct?: EulogiseProduct
  regenerateProductRegion?: EulogiseRegion
  genericProductType?: IGenericCardProductTypeData
  onUpdated?: () => void
}

export type UpdateBackgroundImageByIdAction = {
  type: BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE
  payload: UpdateBackgroundImageByIdPayload
}

export const updateBackgroundImageByIdAction = (
  payload: UpdateBackgroundImageByIdPayload,
): UpdateBackgroundImageByIdAction => ({
  type: BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE,
  payload,
})
