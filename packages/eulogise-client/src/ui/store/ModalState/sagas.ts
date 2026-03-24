import { takeEvery, put } from 'redux-saga/effects'
import { ModalActionTypes } from '@eulogise/core'
import { ShowDownloadModalAction, showModalAction } from './actions'
import { CaseStatus, ModalId } from '@eulogise/core'

function* handleShowDownloadModal(action: ShowDownloadModalAction) {
  const {
    payload: { product, caseStatus, genericProductType },
  } = action
  if (caseStatus === CaseStatus.PAID) {
    yield put(
      showModalAction(ModalId.DOWNLOAD, {
        product: product!,
        genericProductType,
      }),
    )
  } else {
    yield put(showModalAction(ModalId.CHECKOUT))
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(ModalActionTypes.SHOW_DOWNLOAD_MODAL, handleShowDownloadModal)
}

export const ModalSagas = [watchers()]
