import {
  IEditorClearAllConfirmOption,
  IGenericCardProductTypeData,
  IUnsavedPhotoImagesOrderConfirmOption,
} from '@eulogise/core'
import {
  IModalOptions,
  ModalActionTypes,
  ModalId,
  CaseStatus,
  EulogiseProduct,
  IMemorialDataPullModalOption,
  IUnsavedChangesConfirmOption,
} from '@eulogise/core'

export const showModalAction = (id: ModalId, options?: IModalOptions) => ({
  type: ModalActionTypes.SHOW_MODAL,
  payload: {
    id,
    options,
  },
})

/* TODO:REMOVE?
export const showSelectImageModal = (options: ISelectImageModalOption) => {
  return showModalAction(ModalId.SELECT_IMAGE, options)
}
*/

type ShowDownloadModalPayload = {
  product?: EulogiseProduct
  caseStatus?: CaseStatus
  genericProductType?: IGenericCardProductTypeData
}
export type ShowDownloadModalAction = {
  type: ModalActionTypes.SHOW_DOWNLOAD_MODAL
  payload: ShowDownloadModalPayload
}

export const showDownloadModal = (
  payload: ShowDownloadModalPayload,
): ShowDownloadModalAction => ({
  type: ModalActionTypes.SHOW_DOWNLOAD_MODAL,
  payload,
})

export const hideModalAction = (id: ModalId) => ({
  type: ModalActionTypes.HIDE_MODAL,
  payload: {
    id,
  },
})

export const showMemorialDataPullFormModal = (
  options: IMemorialDataPullModalOption,
) => {
  const { product, slug, id } = options
  return showModalAction(ModalId.MEMORIAL_DATA_PULL, {
    product,
    slug,
    id,
  })
}

/* TODO:REMOVE?
export const showReplaceEditedConfirmModal = (
  options: IReplaceEditedImageConfirmOption,
) => {
  const {
    newEditedImageContent,
    updatedCardProducts,
    editingImageContent,
    needUpdateSlideshow,
  } = options
  return showModalAction(ModalId.REPLACE_EDITED_IMAGE_CONFIRM, {
    editingImageContent,
    newEditedImageContent,
    updatedCardProducts,
    needUpdateSlideshow,
  })
}
*/

export const showUnsavedChangesConfirmModal = (
  options: IUnsavedChangesConfirmOption,
) => {
  const { editingProduct, unsavedProductState, page, region, query } = options
  return showModalAction(ModalId.UNSAVED_CHANGES_CONFIRM, {
    editingProduct,
    unsavedProductState,
    page,
    region,
    query,
  })
}

export const showUnsavedPhotoImagesOrderConfirmModal = (
  options: IUnsavedPhotoImagesOrderConfirmOption,
) => {
  const { newCustomisedPhotoImagesOrderIds, page } = options
  return showModalAction(ModalId.UNSAVED_PHOTO_IMAGES_ORDER_CONFIRM, {
    page,
    newCustomisedPhotoImagesOrderIds,
  })
}

export const showCardEditorClearAllModal = (
  options: IEditorClearAllConfirmOption,
) => {
  return showModalAction(ModalId.EDITOR_CLEAR_ALL, options)
}
