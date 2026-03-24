import {
  ISiderMenuAction,
  ISiderMenuState,
  ISiderMenuActionTypes,
} from '@eulogise/core'

const initialState: ISiderMenuState = {
  isCollapsed: false,
}

export const SiderMenuReducer = (
  state: ISiderMenuState = initialState,
  action: ISiderMenuAction,
): ISiderMenuState => {
  switch (action.type) {
    case ISiderMenuActionTypes.COLLAPSE_SIDER_MENU: {
      return {
        ...state,
        isCollapsed: true,
      }
    }
    case ISiderMenuActionTypes.EXPAND_SIDER_MENU: {
      return {
        ...state,
        isCollapsed: false,
      }
    }
    default:
      return state
  }
}

export const SiderMenuInitialState = initialState
