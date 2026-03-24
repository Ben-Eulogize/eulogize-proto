import {
  IUserSettingsSelectColorAction,
  IUserSettingsActionTypes,
  IUserSettingsState,
} from '@eulogise/core'
import { UtilHelper } from '@eulogise/helpers'
import { SLIDESHOW_COLORS } from '@eulogise/client-core'

const initialState: IUserSettingsState = {
  selectedColors: [],
}

const MAX_SELECTED_COLOR = 5

export const UserSettingsReducer = (
  state: IUserSettingsState = initialState,
  action: IUserSettingsSelectColorAction,
): IUserSettingsState => {
  switch (action.type) {
    case IUserSettingsActionTypes.SELECT_USER_SETTINGS_COLOR: {
      const { color } = action.payload
      if (
        state.selectedColors.includes(color) ||
        // exclude any preset colors
        SLIDESHOW_COLORS.find((c) => c.color === color)
      ) {
        return state
      }
      return {
        ...state,
        selectedColors: UtilHelper.take(
          MAX_SELECTED_COLOR,
          [color].concat(state.selectedColors),
        ),
      }
    }
    default:
      return state
  }
}

export const UserSettingsInitialState = initialState
