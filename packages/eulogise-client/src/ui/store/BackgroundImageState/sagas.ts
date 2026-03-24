import { takeEvery, select, put } from 'redux-saga/effects'
import { BackgroundImageActionTypes } from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import { Notification } from '@eulogise/client-components'
import {
  CreateNewBackgroundImageAction,
  DeleteBackgroundImageByIdAction,
  FetchBackgroundImageByIdAction,
  UpdateBackgroundImageByIdAction,
} from './actions'
import { CacheBusterHelper } from '@eulogise/helpers'

const BACKGROUND_IMAGES_ENDPOINT = '/v2/backgroundImages'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function* handleFetchBackgroundImages() {
  try {
    const { activeItem: activeCase } = yield select((state) => state.cases)
    const { backgroundImages: backgroundImagesState } = yield select(
      (state) => state.backgroundImages,
    )
    const customerId = activeCase?.customer?.id
    const { backgroundImages, isFetching } = backgroundImagesState
    if (/*backgroundImages.length > 0 ||*/ isFetching) {
      console.log(
        'fetchBackgroundImages: stopped as already fetched',
        backgroundImages,
      )
      return
    }

    const { data } = yield RequestHelper.requestWithToken(
      BACKGROUND_IMAGES_ENDPOINT,
      {
        params: { customerId },
      },
    )
    yield put({
      type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES_SUCCESS,
      payload: { backgroundImages: data.backgroundImages },
    })
  } catch (error) {
    console.error(
      'BackgroundImageState > actions > fetchAllBackgroundImages - ',
      error,
    )
    yield put({
      type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES_FAILED,
    })
  }
}

function* handleFetchBackgroundImageById(
  action: FetchBackgroundImageByIdAction,
) {
  try {
    const {
      payload: { backgroundImageId, onSuccess },
    } = action
    const { data } = yield RequestHelper.requestWithToken(
      `${BACKGROUND_IMAGES_ENDPOINT}/${backgroundImageId}`,
    )

    yield put({
      type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID_SUCCESS,
      payload: { backgroundImage: data.backgroundImage },
    })
    if (onSuccess) {
      onSuccess(data.backgroundImage)
    }
  } catch (error) {
    console.error(
      'BackgroundImageState > actions > fetchBackgroundImageById - ',
      error,
    )
    yield put({
      type: BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID_FAILED,
    })
  }
}

function* handleDeleteBackgroundImageById(
  action: DeleteBackgroundImageByIdAction,
) {
  const {
    payload: { backgroundImageId },
  } = action
  try {
    yield RequestHelper.requestWithToken(
      `${BACKGROUND_IMAGES_ENDPOINT}/${backgroundImageId}`,
      {
        method: 'DELETE',
      },
    )
    yield put({
      type: BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID_SUCCESS,
      payload: { backgroundImageId },
    })
    Notification.success('Background image deleted')
  } catch (error) {
    console.error(
      'BackgroundImageState > actions > deleteBackgroundImageByIdAction - ',
      error,
    )
    Notification.error('Failed to delete background image')
    yield put({
      type: BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID_FAILED,
    })
  }
}

function* handleCreateBackgroundImage(action: CreateNewBackgroundImageAction) {
  const {
    payload: { backgroundImage, onCreated },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken(
      '/v2/backgroundImages',
      {
        method: 'POST',
        data: { backgroundImage },
      },
    )
    yield put({
      type: BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE_SUCCESS,
      payload: { backgroundImage: data.backgroundImage },
    })
    if (onCreated) {
      onCreated(data.backgroundImage)
    }
    // Notification.success('Background Image created')
  } catch (error) {
    Notification.error('Failed to create background image')
    console.error(
      'BackgroundImageState > actions > createNewBackgroundImage - ',
      error,
    )
    yield put({
      type: BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE_FAILED,
    })
  }
}

function* handleUpdateBackgroundImageById(
  action: UpdateBackgroundImageByIdAction,
) {
  const {
    payload: {
      backgroundImage,
      backgroundImageId,
      onUpdated,
      status,
      regenerateProduct,
      regenerateProductRegion,
      genericProductType,
    },
  } = action
  try {
    console.log('sending request to background image PUT endpoint', {
      backgroundImage,
      status,
    })
    const { data } = yield RequestHelper.requestWithToken(
      `${BACKGROUND_IMAGES_ENDPOINT}/${backgroundImageId}`,
      {
        method: 'PUT',
        data: {
          backgroundImage,
          status,
          regenerateProduct,
          regenerateProductRegion,
          genericProductType,
        },
      },
    )
    // refresh cache buster
    CacheBusterHelper.refreshCacheBuster()
    // wait for five seconds so that CDN has time to remove all old cache images
    yield delay(5000)
    yield put({
      type: BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE_SUCCESS,
      payload: {
        backgroundImage: data.backgroundImage,
      },
    })
    if (onUpdated) {
      onUpdated()
    }
    Notification.success('Background Image updated')
  } catch (error) {
    Notification.error('Failed to update background image')
    console.error(
      'BackgroundImageState > actions > updateBackgroundImageById - ',
      error,
    )
    yield put({
      type: BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE_FAILED,
    })
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(
    BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGES,
    handleFetchBackgroundImages,
  )
  yield takeEvery(
    BackgroundImageActionTypes.FETCH_BACKGROUND_IMAGE_BY_ID,
    handleFetchBackgroundImageById,
  )
  yield takeEvery(
    BackgroundImageActionTypes.DELETE_BACKGROUND_IMAGE_BY_ID,
    handleDeleteBackgroundImageById,
  )
  yield takeEvery(
    BackgroundImageActionTypes.CREATE_BACKGROUND_IMAGE,
    handleCreateBackgroundImage,
  )
  yield takeEvery(
    BackgroundImageActionTypes.UPDATE_BACKGROUND_IMAGE,
    handleUpdateBackgroundImageById,
  )
}

export const BackgroundImageSagas = [watchers()]
