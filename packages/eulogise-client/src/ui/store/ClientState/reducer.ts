import { ClientActionTypes, IClientAction, IClientState } from '@eulogise/core'

const initialState: IClientState = {
  items: [],
  activeItem: undefined,
  activeClientUsers: [],
  isFetching: false,
}

export const ClientReducer = (
  state: IClientState = initialState,
  action: IClientAction,
): IClientState => {
  switch (action.type) {
    case ClientActionTypes.FETCH_CLIENT: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ClientActionTypes.FETCH_CLIENT_SUCCESS: {
      const clients = action.payload?.clients
      const firstClient = clients?.[0]
      return {
        items: clients!,
        activeItem: firstClient,
        activeClientUsers: [],
        isFetching: false,
      }
    }
    case ClientActionTypes.FETCH_CLIENT_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    default:
      return state
  }
}

export const ClientInitialState = initialState
