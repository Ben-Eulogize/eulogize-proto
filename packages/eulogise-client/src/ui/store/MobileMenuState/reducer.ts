import {
  IMobileMenuState,
  IMobileMenuAction,
  MobileMenuActionTypes,
} from '@eulogise/core'

const initialState: IMobileMenuState = {
  isOpen: false,
}

export const MobileMenuReducer = (
  state: IMobileMenuState = initialState,
  action: IMobileMenuAction,
) => {
  switch (action.type) {
    case MobileMenuActionTypes.CLOSE_MENU: {
      return {
        ...state,
        isOpen: false,
      }
    }
    case MobileMenuActionTypes.OPEN_MENU: {
      return {
        ...state,
        isOpen: true,
      }
    }
    case MobileMenuActionTypes.TOGGLE_MENU: {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    }
    default:
      return state
  }
}

export const MobileMenuInitialState = initialState
