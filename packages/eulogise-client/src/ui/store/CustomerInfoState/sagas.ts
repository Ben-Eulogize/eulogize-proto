import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { CaseActionTypes, EulogiseResource, ICase } from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  CustomerInfoActionTypes,
  FetchCustomerInfoAction,
  UpdateCustomerInfoAction,
  fetchCustomerInfo,
} from './actions'
import { Notification } from '@eulogise/client-components'

/**
 * Fetch customer info from user endpoint
 */
function* handleFetchCustomerInfo(action: FetchCustomerInfoAction) {
  const {
    payload: { userId, onSuccess, onFailed },
  } = action

  try {
    // Fetch user data from /users/:userId endpoint
    const { data } = yield RequestHelper.requestWithToken(`/v2/users/${userId}`)
    if (!data.hasWebToken) {
      console.log(
        `handleFetchCustomerInfo: stopped - hasWebtoken`,
        data.hasWebToken,
      )
      return
    }

    const customerInfo = data.user

    if (!customerInfo) {
      throw new Error('Customer info not found')
    }

    yield put({
      type: CustomerInfoActionTypes.FETCH_CUSTOMER_INFO_SUCCESS,
      payload: { customerInfo },
    })

    if (onSuccess) {
      onSuccess(customerInfo)
    }
  } catch (error: any) {
    console.error(
      'CustomerInfoState > sagas > handleFetchCustomerInfo - ',
      error,
    )
    const errorMessage = error?.message || 'Failed to fetch customer info'

    yield put({
      type: CustomerInfoActionTypes.FETCH_CUSTOMER_INFO_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }

    Notification.error(errorMessage)
  }
}

/**
 * Auto-fetch customer info when active case changes
 */
function* handleCaseChange(action: any) {
  try {
    const { payload } = action
    const isShareFlow = payload.isShareFlow
    const fetchedCase: ICase = payload?.fetchedCase || payload?.caseData

    if (isShareFlow) {
      return
    }
    if (fetchedCase && fetchedCase.customer && fetchedCase.customer.id) {
      yield put(
        fetchCustomerInfo({
          userId: fetchedCase.customer.id,
        }),
      )
    }
  } catch (error: any) {
    console.error('CustomerInfoState > sagas > handleCaseChange - ', error)
  }
}

/**
 * Update customer info via user endpoint
 */
function* handleUpdateCustomerInfo(action: UpdateCustomerInfoAction) {
  const {
    payload: { userId, customerInfo, onSuccess, onFailed },
  } = action

  try {
    // Update user data via /users/:userId endpoint
    const {
      data: { item: updatedCustomerInfo },
    } = yield RequestHelper.saveResourceRequest(EulogiseResource.USER, {
      id: userId,
      ...customerInfo,
    })

    yield put({
      type: CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO_SUCCESS,
      payload: { customerInfo: updatedCustomerInfo },
    })

    if (onSuccess) {
      onSuccess(updatedCustomerInfo)
    }

    Notification.success('Customer info updated successfully')
  } catch (error: any) {
    console.error(
      'CustomerInfoState > sagas > handleUpdateCustomerInfo - ',
      error,
    )
    const errorMessage = error?.message || 'Failed to update customer info'

    yield put({
      type: CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }

    Notification.error(errorMessage)
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(
    CustomerInfoActionTypes.FETCH_CUSTOMER_INFO,
    handleFetchCustomerInfo,
  )
  yield takeEvery(
    CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO,
    handleUpdateCustomerInfo,
  )

  // Auto-fetch customer info when active case changes
  yield takeLatest(CaseActionTypes.FETCH_CASE_BY_ID_SUCCESS, handleCaseChange)
  yield takeLatest(
    CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID_SUCCESS,
    handleCaseChange,
  )
}

export const CustomerInfoSagas = [watchers()]
