import { DrawerActionTypes, IDrawerAction, IDrawerState } from '@eulogise/core'

const initialState: IDrawerState = {
  openDrawerId: null,
  drawerOptions: {},
}

export const DrawerReducer = (
  state: IDrawerState = initialState,
  action: IDrawerAction,
): IDrawerState => {
  switch (action.type) {
    case DrawerActionTypes.OPEN_DRAWER: {
      return {
        ...state,
        openDrawerId: action.payload?.id,
        drawerOptions: action.payload?.drawerOptions,
      }
    }
    case DrawerActionTypes.CLOSE_DRAWER: {
      return {
        ...state,
        openDrawerId: null,
        drawerOptions: undefined,
      }
    }
    default:
      return state
  }
}

export const DrawerInitialState = initialState
