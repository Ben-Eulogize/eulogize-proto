import {
  ConnectionActionTypes,
  IConnectionState,
  WebSocketConnectionStatus,
  WebSocketNewLeaveCasePayload,
} from '@eulogise/core'
import { ConnectionActions } from './actions'

export const ConnectionInitialState: IConnectionState = {
  activeConnection: null,
  items: [],
  connectionStatus: WebSocketConnectionStatus.DISCONNECTED,
  activeCaseId: null,
  isFetching: false,
  isConnecting: false,
  isDisconnecting: false,
  lastMessage: null,
  error: null,
  reconnectAttempts: 0,
  autoReconnect: true,
}

export const ConnectionReducer = (
  state: IConnectionState = ConnectionInitialState,
  action: ConnectionActions,
): IConnectionState => {
  switch (action.type) {
    case ConnectionActionTypes.NEW_JOIN_CASE: {
      const exists = state.items.find((conn) => conn.id! === action.payload.id)
      return {
        ...state,
        items: exists ? state.items : state.items.concat(action.payload),
      }
    }
    case ConnectionActionTypes.NEW_LEAVE_CASE: {
      // const exists = state.items.find((conn) => conn.id! === action.payload.id)
      return {
        ...state,
        items: state.items.filter(
          (i) => i.id !== (action.payload as WebSocketNewLeaveCasePayload).id,
        ),
      }
    }

    // WebSocket Connection Actions
    case ConnectionActionTypes.CONNECT: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      }
    }

    case ConnectionActionTypes.CONNECT_SUCCESS: {
      return {
        ...state,
        isConnecting: false,
        connectionStatus: action.payload.connectionStatus,
        error: null,
        reconnectAttempts: 0,
      }
    }

    case ConnectionActionTypes.CONNECT_FAILED: {
      return {
        ...state,
        isConnecting: false,
        connectionStatus: WebSocketConnectionStatus.ERROR,
        error: action.payload.error,
      }
    }

    case ConnectionActionTypes.DISCONNECT: {
      return {
        ...state,
        isDisconnecting: true,
        error: null,
      }
    }

    case ConnectionActionTypes.DISCONNECT_SUCCESS: {
      return {
        ...state,
        isDisconnecting: false,
        connectionStatus: WebSocketConnectionStatus.DISCONNECTED,
        activeConnection: null,
        activeCaseId: null,
        lastMessage: null,
        error: null,
      }
    }

    // Case Room Actions
    case ConnectionActionTypes.JOIN_CASE: {
      return {
        ...state,
        error: null,
      }
    }

    case ConnectionActionTypes.JOIN_CASE_SUCCESS: {
      return {
        ...state,
        activeCaseId: action.payload.caseId,
        error: null,
      }
    }

    case ConnectionActionTypes.JOIN_CASE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      }
    }

    case ConnectionActionTypes.LEAVE_CASE: {
      return {
        ...state,
        error: null,
      }
    }

    case ConnectionActionTypes.LEAVE_CASE_SUCCESS: {
      return {
        ...state,
        activeCaseId: null,
        activeConnection: null,
        error: null,
      }
    }

    case ConnectionActionTypes.LEAVE_CASE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      }
    }

    // Connection Management Actions
    case ConnectionActionTypes.FETCH_CONNECTIONS: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }

    case ConnectionActionTypes.FETCH_CONNECTIONS_SUCCESS: {
      return {
        ...state,
        items: action.payload.connections,
        isFetching: false,
        error: null,
      }
    }

    case ConnectionActionTypes.FETCH_CONNECTIONS_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    }

    // WebSocket Message Actions
    case ConnectionActionTypes.SEND_MESSAGE: {
      return {
        ...state,
        error: null,
      }
    }

    case ConnectionActionTypes.SEND_MESSAGE_SUCCESS: {
      return state
    }

    case ConnectionActionTypes.SEND_MESSAGE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
      }
    }

    // Connection Status Actions
    case ConnectionActionTypes.SET_CONNECTION_STATUS: {
      return {
        ...state,
        connectionStatus: action.payload.status,
        // Clear error when successfully connected
        ...(action.payload.status === WebSocketConnectionStatus.CONNECTED && {
          error: null,
          reconnectAttempts: 0,
        }),
      }
    }

    case ConnectionActionTypes.SET_ACTIVE_CASE_ID: {
      return {
        ...state,
        activeCaseId: action.payload.caseId,
      }
    }

    case ConnectionActionTypes.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      }
    }

    // Auto-Reconnect Actions
    case ConnectionActionTypes.SET_AUTO_RECONNECT: {
      return {
        ...state,
        autoReconnect: action.payload.enabled,
      }
    }

    case ConnectionActionTypes.RESET_RECONNECT_ATTEMPTS: {
      return {
        ...state,
        reconnectAttempts: 0,
      }
    }

    case ConnectionActionTypes.INCREMENT_RECONNECT_ATTEMPTS: {
      return {
        ...state,
        reconnectAttempts: state.reconnectAttempts + 1,
      }
    }

    // Reset State Action
    case ConnectionActionTypes.RESET_CONNECTION_STATE: {
      return {
        ...ConnectionInitialState,
      }
    }

    default:
      return state
  }
}
