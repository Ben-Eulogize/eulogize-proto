import {
  CreatePhotobookMethod,
  PhotobookActionTypes,
} from '@eulogise/core/dist/types/Photobook.types'
import { CardProductPageSize, EulogisePhotobookCoverType } from '@eulogise/core'

type CreatePhotobookPayload = {
  onSuccess: (id: string) => void
  orientation: string
  pageSize: CardProductPageSize
  noOfPages: number
  coverType: string
  coverLayoutId: string
  method: CreatePhotobookMethod
  onProgress: (progress: number) => void
}

export type CreatePhotobookAction = {
  type: PhotobookActionTypes.CREATE_PHOTOBOOK
  payload: CreatePhotobookPayload
}

export const createPhotobook = (
  payload: CreatePhotobookPayload,
): CreatePhotobookAction => ({
  type: PhotobookActionTypes.CREATE_PHOTOBOOK,
  payload,
})

export type UpdatePhotobookCoverTypePayload = {
  coverType: EulogisePhotobookCoverType
}

export type UpdatePhotobookCoverTypeAction = {
  type: PhotobookActionTypes.UPDATE_PHOTOBOOK_COVER_TYPE
  payload: UpdatePhotobookCoverTypePayload
}

export const updatePhotobookCoverType = (
  payload: UpdatePhotobookCoverTypePayload,
): UpdatePhotobookCoverTypeAction => {
  return {
    type: PhotobookActionTypes.UPDATE_PHOTOBOOK_COVER_TYPE,
    payload,
  }
}
