import React from 'react'
import { useModalState } from '../../store/hooks'
import SlideshowPreviewModal from '../Modal/SlideshowPreviewModal/SlideshowPreviewModal'
import { CardProductPreviewModal } from '../../components/Modal/CardProductPreviewModal'
import ShareCardProductModal from '../Modal/ShareBookletModal/ShareCardProductModal'
import ShareSlideshowModal from '../Modal/ShareSlideshowModal/ShareSlideshowModal'
import DownloadModal from '../Modal/CheckoutModal/DownloadModal/DownloadModal'
import InviteModal from '../Modal/InviteModal/InviteModal'
import FinalisedSignUpModal from '../Modal/FinalisedSignUpModal/FinalisedSignUpModal'
import MemorialDataPullModal from '../Modal/MemorialDataPullModal/MemorialDataPullModal'
import ReplaceEditedImageConfirmModal from '../Modal/ReplaceEditedImageModal/ReplaceEditedImageModal'
import UnsavedChangesConfirmModalModal from '../Modal/UnsavedChangesConfirmModal/UnsavedChangesConfirmModal'

import { IModalState, ModalId } from '@eulogise/core'
import AudioSettingsModal from '../Modal/AudioSettingsModal/AudioSettingsModal'
import SaveTemplateDesignModal from '../Modal/SaveTemplateDesignModal/SaveTemplateDesignModal'
import UnsavedPhotoLibraryNewOrderConfirmModal from '../Modal/UnsavedPhotoLibraryNewOrderConfirmModal/UnsavedPhotoLibraryNewOrderConfirmModal'
import EditorClearAllModal from '../Modal/EditorClearAllModal/EditorClearAllModal'
import SlideshowClearAllModal from '../Modal/SlideshowClearAllModal/SlideshowClearAllModal'
import RemoveBackgroundModal from '../Modal/RemoveBackgroundModal/RemoveBackgroundModal'
import { SelectIconAssetModal } from '../Modal/SelectIconAssetModal/SelectIconAssetModal'
import { SelectDividerAssetModal } from '../Modal/SelectDividerAssetModal/SelectDividerAssetModal'
import ViewInvoiceModal from '../Modal/ViewInvoiceModal/ViewInvoiceModal'
import { PaperTypePreviewModal } from '../../components/PaperTypePreviewModal/PaperTypePreviewModal'
import DeleteSelectedPhotosModal from '../Modal/DeleteSelectedPhotosModal/DeleteSelectedPhotosModal'
import DeleteClientModal from '../Modal/DeleteClientModal/DeleteClientModal'
import DeleteAccountModal from '../Modal/DeleteAccountModal/DeleteAccountModal'
import SystemUpgradeNotificationModal from '../Modal/SystemUpgradeNotificationModal/SystemUpgradeNotificationModal'
import { PdfViewerModal } from '../../components/Modal/PdfPreviewModal'
import { VideoPreviewModal } from '../../components/Modal/VideoPreviewModal'

const GlobalModalManager = () => {
  const { openModalIds, options }: IModalState = useModalState()
  const checkHasModalId = (modalId: ModalId) =>
    openModalIds?.find((id: ModalId) => id === modalId)
  return (
    <>
      {!!checkHasModalId(ModalId.DOWNLOAD) && <DownloadModal />}
      {!!checkHasModalId(ModalId.SLIDESHOW_PREVIEW) && (
        <SlideshowPreviewModal />
      )}
      {!!checkHasModalId(ModalId.CARD_PRODUCT_PREVIEW) && (
        <CardProductPreviewModal />
      )}
      {!!checkHasModalId(ModalId.PDF_VIEWER) && <PdfViewerModal />}
      {!!checkHasModalId(ModalId.VIDEO_VIEWER) && <VideoPreviewModal />}
      {!!checkHasModalId(ModalId.SHARE_SLIDESHOW) && <ShareSlideshowModal />}
      {!!checkHasModalId(ModalId.SHARE_CARD_PRODUCT) && (
        <ShareCardProductModal />
      )}
      {!!checkHasModalId(ModalId.INVITE) && <InviteModal />}
      {!!checkHasModalId(ModalId.FINALISE_SIGNUP) && <FinalisedSignUpModal />}
      {!!checkHasModalId(ModalId.MEMORIAL_DATA_PULL) && (
        <MemorialDataPullModal />
      )}
      {!!checkHasModalId(ModalId.REPLACE_EDITED_IMAGE_CONFIRM) && (
        <ReplaceEditedImageConfirmModal />
      )}
      {!!checkHasModalId(ModalId.AUDIO_SETTINGS) && <AudioSettingsModal />}
      {!!checkHasModalId(ModalId.UNSAVED_CHANGES_CONFIRM) && (
        <UnsavedChangesConfirmModalModal
          region={options[ModalId.UNSAVED_CHANGES_CONFIRM]?.region}
        />
      )}
      {!!checkHasModalId(ModalId.UNSAVED_PHOTO_IMAGES_ORDER_CONFIRM) && (
        <UnsavedPhotoLibraryNewOrderConfirmModal
          newCustomisedPhotoImagesOrderIds={
            options[ModalId.UNSAVED_CHANGES_CONFIRM]
              ?.newCustomisedPhotoImagesOrderIds
          }
        />
      )}
      {!!checkHasModalId(ModalId.SAVE_TEMPLATE_DESIGN) && (
        <SaveTemplateDesignModal
          product={options[ModalId.SAVE_TEMPLATE_DESIGN]?.product}
          region={options[ModalId.SAVE_TEMPLATE_DESIGN]?.region}
        />
      )}
      {!!checkHasModalId(ModalId.EDITOR_CLEAR_ALL) && <EditorClearAllModal />}
      {!!checkHasModalId(ModalId.SLIDESHOW_CLEAR_ALL) && (
        <SlideshowClearAllModal />
      )}
      {!!checkHasModalId(ModalId.REMOVE_IMAGE_BACKGROUND) && (
        <RemoveBackgroundModal />
      )}
      {!!checkHasModalId(ModalId.ICON_ASSET) && <SelectIconAssetModal />}
      {!!checkHasModalId(ModalId.DIVIDER_ASSET) && <SelectDividerAssetModal />}
      {!!checkHasModalId(ModalId.VIEW_INVOICE) && <ViewInvoiceModal />}
      {!!checkHasModalId(ModalId.PRINTING_PAPER_TYPE_PREVIEW) && (
        <PaperTypePreviewModal />
      )}
      {!!checkHasModalId(ModalId.DELETE_SELECTED_PHOTOS) && (
        <DeleteSelectedPhotosModal />
      )}
      {!!checkHasModalId(ModalId.DELETE_CLIENT_MODAL) && <DeleteClientModal />}
      {!!checkHasModalId(ModalId.DELETE_ACCOUNT_MODAL) && (
        <DeleteAccountModal />
      )}
      {!!checkHasModalId(ModalId.SYSTEM_UPGRADE_NOTIFICATION) && (
        <SystemUpgradeNotificationModal />
      )}
    </>
  )
}

export default GlobalModalManager
