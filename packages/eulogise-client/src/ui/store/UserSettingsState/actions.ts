import {
  IUserSettingsSelectColorAction,
  IUserSettingsActionTypes,
  IUserSettingsSelectColorPayload,
} from '@eulogise/core'

export const selectUserSettingsColorAction = (
  payload: IUserSettingsSelectColorPayload,
): IUserSettingsSelectColorAction => ({
  type: IUserSettingsActionTypes.SELECT_USER_SETTINGS_COLOR,
  payload,
})
