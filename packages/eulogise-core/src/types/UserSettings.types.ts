export enum IUserSettingsActionTypes {
  SELECT_USER_SETTINGS_COLOR = 'SELECT_USER_SETTINGS_COLOR',
}

export interface IUserSettingsState {
  selectedColors: Array<string>
}

export type IUserSettingsSelectColorPayload = {
  color: string
}

export type IUserSettingsSelectColorAction = {
  type: IUserSettingsActionTypes
  payload: IUserSettingsSelectColorPayload
}
