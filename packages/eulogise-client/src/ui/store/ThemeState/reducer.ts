import { IThemeState, IThemeAction, ThemeActionTypes } from '@eulogise/core'

const initialState: IThemeState = {
  isCreating: false,
  isUpdating: false,
  isFetching: false,
  isAdding: false,
  themes: [],
}

export const ThemeReducer = (
  state: IThemeState = initialState,
  action: IThemeAction,
): IThemeState => {
  switch (action.type) {
    // FETCH ALL themes
    case ThemeActionTypes.FETCH_THEMES: {
      return {
        ...state,
        isFetching: state.themes.length ? false : true,
      }
    }
    case ThemeActionTypes.FETCH_THEMES_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case ThemeActionTypes.FETCH_THEMES_SUCCESS: {
      const themes = action.payload?.themes
      if (!themes) {
        console.error(
          'ThemeState > Reducer > FETCH_THEMES_SUCCESS: missing themes data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        themes,
      }
    }

    // FETCH ONE single theme
    case ThemeActionTypes.FETCH_THEME: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ThemeActionTypes.FETCH_THEME_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case ThemeActionTypes.FETCH_THEME_SUCCESS: {
      const fetchedTheme = action.payload?.theme
      if (!fetchedTheme) {
        console.error(
          'ThemeState > Reducer > FETCH_THEME_SUCCESS: missing theme data in the payload',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        themes: state.themes.filter((t) => {
          if (t.id === fetchedTheme.id) {
            return fetchedTheme
          }
          return t
        }),
      }
    }

    // CREATE a new theme
    case ThemeActionTypes.CREATE_THEME: {
      return {
        ...state,
        isCreating: true,
      }
    }
    case ThemeActionTypes.CREATE_THEME_FAILED: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case ThemeActionTypes.CREATE_THEME_SUCCESS: {
      const newTheme = action.payload?.theme
      if (!newTheme) {
        console.error(
          'ThemeState > Reducer > CREATE_THEME_SUCCESS: missing theme data in the payload',
        )
        return {
          ...state,
          isCreating: false,
        }
      }

      return {
        ...state,
        isCreating: false,
        themes: [...state.themes, newTheme],
      }
    }

    // UPDATE an existing theme
    case ThemeActionTypes.UPDATE_THEME: {
      return {
        ...state,
        isUpdating: true,
      }
    }
    case ThemeActionTypes.UPDATE_THEME_FAILED: {
      return {
        ...state,
        isUpdating: false,
      }
    }
    case ThemeActionTypes.UPDATE_THEME_SUCCESS: {
      const updatedTheme = action.payload?.theme
      if (!updatedTheme) {
        console.error(
          'ThemeState > Reducer > UPDATE_THEME_SUCCESS: missing them data in the payload',
        )
        return {
          ...state,
          isUpdating: false,
        }
      }
      return {
        ...state,
        isUpdating: false,
        themes: state.themes.map((t) => {
          if (t.id === updatedTheme.id) {
            return updatedTheme
          }
          return t
        }),
      }
    }

    // DEFAULT
    default: {
      return state
    }
  }
}

export const ThemeInitialState = initialState
