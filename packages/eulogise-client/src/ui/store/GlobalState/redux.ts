import {
  GlobalActionTypes,
  IGlobalAction,
  IGlobalState,
  IUpdateHeaderHeightPayload,
} from '@eulogise/core'

const initialState: IGlobalState = {
  headerHeight: undefined,
}

export const GlobalInitialState: IGlobalState = initialState

export const GlobalReducer = (
  state = GlobalInitialState,
  action: IGlobalAction,
): IGlobalState => {
  switch (action.type) {
    case GlobalActionTypes.UPDATE_HEADER_HEIGHT: {
      const { height } = action.payload as IUpdateHeaderHeightPayload
      return {
        ...state,
        headerHeight: height,
      }
    }
    default:
      return state
  }
}
