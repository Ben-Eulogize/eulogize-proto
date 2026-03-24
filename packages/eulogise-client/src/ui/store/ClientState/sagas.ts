import { takeEvery, put } from 'redux-saga/effects'
import { ClientActionTypes, EulogiseResource } from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  CheckClientHandleAvailabilityAction,
  DeleteClientAction,
  FetchClientByHandleAction,
} from './actions'

function* handleFetchClientByHandle(action: FetchClientByHandleAction) {
  const {
    payload: { handle, onSuccess, onFailed },
  } = action
  try {
    const {
      data: { client },
    } = yield RequestHelper.request(`/v2/clients/handles/${handle}`, {})
    yield put({
      type: ClientActionTypes.FETCH_CLIENT_BY_HANDLE_SUCCESS,
    })
    onSuccess(client)
  } catch (ex) {
    yield put({
      type: ClientActionTypes.FETCH_CLIENT_BY_HANDLE_FAILED,
      payload: ex,
    })
    onFailed()
  }
}

function* handleFetchClients() {
  try {
    const {
      data: { items: clients },
    } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.CLIENT,
    })

    yield put({
      type: ClientActionTypes.FETCH_CLIENT_SUCCESS,
      payload: { clients },
    })
  } catch (ex) {
    yield put({
      type: ClientActionTypes.FETCH_CLIENT_FAILED,
      payload: ex,
    })
  }
}

function* handleFetchClientHandleAvailability(
  action: CheckClientHandleAvailabilityAction,
) {
  const {
    payload: { handle, success },
  } = action
  try {
    const {
      data: { exists },
    } = yield RequestHelper.requestWithToken(
      `/v2/admin/clients/handles/${handle}/exists`,
    )

    yield put({
      type: ClientActionTypes.FETCH_CLIENT_HANDLE_AVAILABILITY_SUCCESS,
      payload: { exists },
    })
    success(exists)
  } catch (ex: any) {
    yield put({
      type: ClientActionTypes.FETCH_CLIENT_HANDLE_AVAILABILITY_FAILED,
    })
    throw new Error(ex)
  }
}

function* deleteClient(action: DeleteClientAction) {
  const {
    payload: { clientId, success, failed },
  } = action
  try {
    yield RequestHelper.removeResourceRequest({
      resource: EulogiseResource.CLIENT,
      itemId: clientId,
    })

    yield put({
      type: ClientActionTypes.DELETE_CLIENT_SUCCESS,
      payload: { clientId },
    })
    success()
  } catch (ex: any) {
    yield put({
      type: ClientActionTypes.DELETE_CLIENT_FAILED,
    })
    if (failed) {
      failed()
    } else {
      throw new Error(ex)
    }
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(
    ClientActionTypes.FETCH_CLIENT_BY_HANDLE,
    handleFetchClientByHandle,
  )
  yield takeEvery(ClientActionTypes.FETCH_CLIENT, handleFetchClients)
  yield takeEvery(
    ClientActionTypes.FETCH_CLIENT_HANDLE_AVAILABILITY,
    handleFetchClientHandleAvailability,
  )
  yield takeEvery(ClientActionTypes.DELETE_CLIENT, deleteClient)
}

export const ClientSagas = [watchers()]
