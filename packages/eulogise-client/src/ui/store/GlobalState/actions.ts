import {
  GlobalActionTypes,
  IUpdateHeaderHeightAction,
  IUpdateHeaderHeightPayload,
} from '@eulogise/core'

export const updateHeaderHeight = (
  payload: IUpdateHeaderHeightPayload,
): IUpdateHeaderHeightAction => ({
  type: GlobalActionTypes.UPDATE_HEADER_HEIGHT,
  payload,
})
