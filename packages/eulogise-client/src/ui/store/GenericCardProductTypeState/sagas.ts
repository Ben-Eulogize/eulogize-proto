import { takeEvery, throttle, put } from 'redux-saga/effects'
import { GenericCardProductTypeActionTypes } from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  FetchGenericCardProductTypesAction,
  FetchGenericCardProductTypeByIdAction,
  CreateGenericCardProductTypeAction,
  UpdateGenericCardProductTypeAction,
  DuplicateGenericCardProductTypeAction,
  DeleteGenericCardProductTypeAction,
} from './actions'
import { Notification } from '@eulogise/client-components'

/**
 * Fetch all generic card product types with optional filtering
 */
export function* handleFetchGenericCardProductTypes(
  action: FetchGenericCardProductTypesAction,
) {
  try {
    const payload = action.payload
    const { onSuccess } = payload || {}

    const url = `/v2/admin/generic-card-product-types`

    const { data } = yield RequestHelper.requestWithToken(url)

    yield put({
      type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES_SUCCESS,
      payload: { genericCardProductTypes: data.genericCardProductTypes },
    })

    if (onSuccess) {
      onSuccess(data.genericCardProductTypes)
    }

    return data.genericCardProductTypes
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleFetchGenericCardProductTypes - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to fetch generic card product types'

    yield put({
      type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES_FAILED,
      payload: { error: errorMessage },
    })

    if (action.payload?.onFailed) {
      action.payload.onFailed(errorMessage)
    }
  }
}

/**
 * Fetch a single generic card product type by ID
 */
function* handleFetchGenericCardProductTypeById(
  action: FetchGenericCardProductTypeByIdAction,
) {
  const {
    payload: { genericCardProductTypeId, onSuccess, onFailed },
  } = action

  try {
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/admin/generic-card-product-types/${genericCardProductTypeId}`,
    )

    yield put({
      type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_SUCCESS,
      payload: { genericCardProductType: data.genericCardProductType },
    })

    if (onSuccess) {
      onSuccess(data.genericCardProductType)
    }

    return data.genericCardProductType
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleFetchGenericCardProductTypeById - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to fetch generic card product type'

    yield put({
      type: GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }
  }
}

/**
 * Create a new generic card product type
 */
function* handleCreateGenericCardProductType(
  action: CreateGenericCardProductTypeAction,
) {
  const {
    payload: { data: createData, onSuccess, onFailed },
  } = action

  try {
    const { data } = yield RequestHelper.requestWithToken(
      '/v2/admin/generic-card-product-types',
      {
        method: 'POST',
        data: createData,
      },
    )

    yield put({
      type: GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS,
      payload: { genericCardProductType: data.genericCardProductType },
    })

    if (onSuccess) {
      onSuccess(data.genericCardProductType)
    }

    Notification.success('Generic card product type created successfully')
    return data.genericCardProductType
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleCreateGenericCardProductType - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to create generic card product type'

    yield put({
      type: GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }

    Notification.error(errorMessage)
  }
}

/**
 * Update an existing generic card product type
 */
function* handleUpdateGenericCardProductType(
  action: UpdateGenericCardProductTypeAction,
) {
  const {
    payload: {
      genericCardProductTypeId,
      data: updateData,
      onSuccess,
      onFailed,
    },
  } = action

  try {
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/admin/generic-card-product-types/${genericCardProductTypeId}`,
      {
        method: 'PUT',
        data: updateData,
      },
    )

    yield put({
      type: GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS,
      payload: { genericCardProductType: data.genericCardProductType },
    })

    if (onSuccess) {
      onSuccess(data.genericCardProductType)
    }

    Notification.success('Generic card product type updated successfully')
    return data.genericCardProductType
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleUpdateGenericCardProductType - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to update generic card product type'

    yield put({
      type: GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }

    Notification.error(errorMessage)
  }
}

/**
 * Duplicate a generic card product type
 */
function* handleDuplicateGenericCardProductType(
  action: DuplicateGenericCardProductTypeAction,
) {
  const {
    payload: { genericCardProductTypeId, newName, onSuccess, onFailed },
  } = action

  try {
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/admin/generic-card-product-types/${genericCardProductTypeId}/duplicate`,
      {
        method: 'POST',
        data: { name: newName },
      },
    )

    yield put({
      type: GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS,
      payload: { genericCardProductType: data.genericCardProductType },
    })

    if (onSuccess) {
      onSuccess(data.genericCardProductType)
    }

    Notification.success('Generic card product type duplicated successfully')
    return data.genericCardProductType
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleDuplicateGenericCardProductType - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to duplicate generic card product type'

    yield put({
      type: GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE_FAILED,
      payload: { error: errorMessage },
    })

    if (onFailed) {
      onFailed(errorMessage)
    }

    Notification.error(errorMessage)
  }
}

/**
 * Delete a generic card product type
 */
function* handleDeleteGenericCardProductType(
  action: DeleteGenericCardProductTypeAction,
) {
  const {
    payload: { genericCardProductTypeId, onSuccess, onFailed },
  } = action

  try {
    yield RequestHelper.requestWithToken(
      `/v2/admin/generic-card-product-types/${genericCardProductTypeId}`,
      {
        method: 'DELETE',
      },
    )

    yield put({
      type: GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE_SUCCESS,
      payload: { genericCardProductTypeId },
    })

    if (onSuccess) {
      onSuccess()
    }

    Notification.success('Generic card product type deleted successfully')
  } catch (error: any) {
    console.error(
      'GenericCardProductTypeState > sagas > handleDeleteGenericCardProductType - ',
      error,
    )
    const errorMessage =
      error?.message || 'Failed to delete generic card product type'

    yield put({
      type: GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE_FAILED,
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
  // Throttle fetch to prevent excessive requests
  yield throttle(
    3000,
    GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPES,
    handleFetchGenericCardProductTypes,
  )

  yield takeEvery(
    GenericCardProductTypeActionTypes.FETCH_GENERIC_CARD_PRODUCT_TYPE_BY_ID,
    handleFetchGenericCardProductTypeById,
  )
  yield takeEvery(
    GenericCardProductTypeActionTypes.CREATE_GENERIC_CARD_PRODUCT_TYPE,
    handleCreateGenericCardProductType,
  )
  yield takeEvery(
    GenericCardProductTypeActionTypes.UPDATE_GENERIC_CARD_PRODUCT_TYPE,
    handleUpdateGenericCardProductType,
  )
  yield takeEvery(
    GenericCardProductTypeActionTypes.DUPLICATE_GENERIC_CARD_PRODUCT_TYPE,
    handleDuplicateGenericCardProductType,
  )
  yield takeEvery(
    GenericCardProductTypeActionTypes.DELETE_GENERIC_CARD_PRODUCT_TYPE,
    handleDeleteGenericCardProductType,
  )
}

export const GenericCardProductTypeSagas = [watchers()]
