import { takeEvery, throttle, put } from 'redux-saga/effects'
import { ThemeActionTypes } from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import {
  createNewTheme,
  CreateNewThemeAction,
  DeleteThemeByIdAction,
  FetchThemeByIdAction,
  FetchThemesAction,
  updateExistingTheme,
  UpdateExistingThemeAction,
  UpsertThemeAction,
} from './actions'
import { Notification } from '@eulogise/client-components'

export function* handleFetchThemes(action: FetchThemesAction) {
  try {
    const payload = action.payload
    const { onSuccess, isShareFlow, caseId } = payload || {}
    /*
    const { themes } = yield select((state) => state.themes)
    if (themes.length > 0) {
      console.log('fetchAllThemes: stopped as already fetched', themes)
      return
    }
*/

    const { data } = isShareFlow
      ? yield RequestHelper.request(`/v2/shares/cases/${caseId}/themes`, {})
      : yield RequestHelper.requestWithToken('/v2/themes')
    yield put({
      type: ThemeActionTypes.FETCH_THEMES_SUCCESS,
      payload: { themes: data.themes },
    })
    if (onSuccess) {
      onSuccess(data.themes)
    }
    return data.themes
  } catch (error) {
    console.error('ThemeState > actions > fetchAllThemes - ', error)
    yield put({ type: ThemeActionTypes.FETCH_THEMES_FAILED })
  }
}

function* handleFetchTheme(action: FetchThemeByIdAction) {
  const {
    payload: { themeId },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken(`/themes/${themeId}`)
    yield put({
      type: ThemeActionTypes.FETCH_THEME_SUCCESS,
      payload: { theme: data.theme },
    })
  } catch (error) {
    console.error('ThemeState > actions > fetchSingleThemeByName - ', error)
    yield put({ type: ThemeActionTypes.FETCH_THEME_FAILED })
  }
}

function* handleCreateTheme(action: CreateNewThemeAction) {
  const {
    payload: { theme, product, onCreated, cardProduct },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken('/v2/themes', {
      method: 'POST',
      data: { theme, cardProduct, product },
    })
    yield put({
      type: ThemeActionTypes.CREATE_THEME_SUCCESS,
      payload: { theme: data.theme },
    })
    onCreated()
    Notification.success('Theme created')
  } catch (error) {
    Notification.error('Failed to create theme')
    console.error('ThemeState > actions > createNewTheme - ', error)
    yield put({ type: ThemeActionTypes.CREATE_THEME_FAILED })
  }
}

function* handleUpdateTheme(action: UpdateExistingThemeAction) {
  const {
    payload: {
      theme,
      cardProduct,
      product,
      themeId,
      onUpdated,
      overwriteThumbnail,
    },
  } = action
  try {
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/themes/${themeId}`,
      {
        method: 'PUT',
        data: { theme, cardProduct, product, overwriteThumbnail },
      },
    )
    yield put({
      type: ThemeActionTypes.UPDATE_THEME_SUCCESS,
      payload: {
        theme: data.theme,
      },
    })
    onUpdated()
    Notification.success('Theme updated')
  } catch (error) {
    Notification.error('Failed to update theme')
    console.error('ThemeState > actions > updateExistingTheme - ', error)
    yield put({ type: ThemeActionTypes.UPDATE_THEME_FAILED })
  }
}

function* handleUpsertTheme(action: UpsertThemeAction) {
  const {
    payload: { theme, cardProduct, product, overwriteThumbnail, onCompleted },
  } = action
  if (theme.id) {
    yield put(
      updateExistingTheme({
        themeId: theme.id!,
        theme,
        cardProduct,
        product,
        overwriteThumbnail,
        onUpdated: () => {
          onCompleted()
        },
      }),
    )
  } else {
    console.log('-----> CREATE theme: ', theme)

    // hit the backend to save the template. We will get back the Theme ID
    // create a new Theme object and add them to the Themes State
    yield put(
      createNewTheme({
        theme,
        product,
        cardProduct,
        onCreated: () => {
          onCompleted()
        },
      }),
    )
  }
}

function* handleDeleteThemeById(action: DeleteThemeByIdAction) {
  const {
    payload: { themeId, onDeleted, onComplete },
  } = action

  try {
    yield RequestHelper.requestWithToken(`/v2/themes/${themeId}`, {
      method: 'DELETE',
    })
    yield put({ type: ThemeActionTypes.DELETE_THEME_BY_ID_SUCCESS })
    if (onDeleted) {
      onDeleted()
    }
    Notification.success('Theme deleted')
  } catch (error) {
    Notification.error('Failed to delete theme')
    console.error('ThemeState > actions > handleDeleteThemeById - ', error)
    yield put({ type: ThemeActionTypes.DELETE_THEME_BY_ID_FAILED })
  }
  if (onComplete) {
    onComplete()
  }
}

/* Watchers */
function* watchers() {
  // only fetch themes if over 5 seconds
  yield throttle(5000, ThemeActionTypes.FETCH_THEMES, handleFetchThemes)
  yield takeEvery(ThemeActionTypes.FETCH_THEME, handleFetchTheme)
  yield takeEvery(ThemeActionTypes.CREATE_THEME, handleCreateTheme)
  yield takeEvery(ThemeActionTypes.UPDATE_THEME, handleUpdateTheme)
  yield takeEvery(ThemeActionTypes.UPSERT_THEME, handleUpsertTheme)
  yield takeEvery(ThemeActionTypes.DELETE_THEME_BY_ID, handleDeleteThemeById)
}

export const ThemeSagas = [watchers()]
