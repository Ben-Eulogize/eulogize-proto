import { takeEvery, put } from 'redux-saga/effects'
import { ShareActionTypes } from '@eulogise/core'
import { UpsertShareAction, FetchSharesByCaseIdAction } from './actions'
import RequestHelper from '../../helpers/RequestHelper'
import { Notification } from '@eulogise/client-components'

function* handleUpsertShare(action: UpsertShareAction) {
  const {
    payload: { caseId, share, success, error },
  } = action

  try {
    const {
      data: { share: upsertedShare },
    } = yield RequestHelper.requestWithToken(
      `/v2/cases/${caseId}/shares`,
      /* EulogiseEndpoint.SHARE_BY_CASE_ID.replace(/\{caseId\}/, caseId) */
      {
        method: 'POST',
        data: share,
      },
    )

    yield put({
      type: ShareActionTypes.UPSERT_SHARE_SUCCESS,
      payload: { share: upsertedShare },
    })

    if (success) {
      success(upsertedShare)
    }
  } catch (ex: any) {
    console.error('handleUpsertShare Exception', ex)
    const errorMessage = ex?.message || 'Failed to save share'
    Notification.error(errorMessage)

    yield put({
      type: ShareActionTypes.UPSERT_SHARE_FAILED,
      payload: { error: errorMessage },
    })

    if (error) {
      error(errorMessage)
    }
  }
}

function* handleFetchSharesByCaseId(action: FetchSharesByCaseIdAction) {
  const {
    payload: { caseId, success, error, complete },
  } = action

  try {
    const {
      data: { shares },
    } = yield RequestHelper.request(
      `/v2/cases/${caseId}/shares`,
      /* EulogiseEndpoint.SHARE_BY_CASE_ID.replace(/\{caseId\}/, caseId) */
      {
        method: 'GET',
      },
    )

    yield put({
      type: ShareActionTypes.FETCH_SHARES_BY_CASE_ID_SUCCESS,
      payload: { shares },
    })

    if (success) {
      success(shares)
    }
  } catch (ex: any) {
    console.error('handleFetchSharesByCaseId Exception', ex)
    const errorMessage = ex?.message || 'Failed to fetch shares'

    yield put({
      type: ShareActionTypes.FETCH_SHARES_BY_CASE_ID_FAILED,
      payload: { error: errorMessage },
    })

    if (error) {
      error(errorMessage)
    }
  }
  if (complete) {
    complete()
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(ShareActionTypes.UPSERT_SHARE, handleUpsertShare)
  yield takeEvery(
    ShareActionTypes.FETCH_SHARES_BY_CASE_ID,
    handleFetchSharesByCaseId,
  )
}

export const ShareSagas = [watchers()]
