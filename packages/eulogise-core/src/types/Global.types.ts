export enum GlobalActionTypes {
  UPDATE_HEADER_HEIGHT = 'UPDATE_HEADER_HEIGHT',
}

export type IUpdateHeaderHeightPayload = {
  height: number
}

export type IGlobalActionPayload = IUpdateHeaderHeightPayload

export type IUpdateHeaderHeightAction = {
  type: GlobalActionTypes.UPDATE_HEADER_HEIGHT
  payload: IUpdateHeaderHeightPayload
}

export type IGlobalState = {
  headerHeight?: number
}

export type IGlobalAction = {
  type: GlobalActionTypes
  payload?: IGlobalActionPayload
}
