import { IConnection, WebSocketConnectionStatus } from './WebSocket.types'

/**
 * Connection state for Redux store
 */
export interface IConnectionState {
  /**
   * Currently active connection (user's own connection)
   */
  activeConnection: IConnection | null
  items: IConnection[]

  /**
   * WebSocket connection status
   */
  connectionStatus: WebSocketConnectionStatus

  /**
   * Current case ID that the user is connected to
   */
  activeCaseId: string | null

  /**
   * Loading states
   */
  isFetching: boolean
  isConnecting: boolean
  isDisconnecting: boolean

  /**
   * Last received WebSocket message
   */
  lastMessage: any

  /**
   * Connection error state
   */
  error: string | null

  /**
   * Reconnection attempt count
   */
  reconnectAttempts: number

  /**
   * Auto-reconnect enabled
   */
  autoReconnect: boolean
}

/**
 * Connection action types
 */
export enum ConnectionActionTypes {
  // WebSocket Connection Actions
  CONNECT = 'CONNECT',
  CONNECT_SUCCESS = 'CONNECT_SUCCESS',
  CONNECT_FAILED = 'CONNECT_FAILED',
  DISCONNECT = 'DISCONNECT',
  DISCONNECT_SUCCESS = 'DISCONNECT_SUCCESS',

  ASSET_UPDATED = 'ASSET_UPDATED',
  ASSET_DELETED = 'ASSET_DELETED',

  CASE_UPDATED = 'CASE_UPDATED',

  // Case Room Actions
  NEW_JOIN_CASE = 'NEW_JOIN_CASE',
  NEW_LEAVE_CASE = 'NEW_LEAVE_CASE',
  JOIN_CASE = 'JOIN_CASE',
  JOIN_CASE_SUCCESS = 'JOIN_CASE_SUCCESS',
  JOIN_CASE_FAILED = 'JOIN_CASE_FAILED',
  LEAVE_CASE = 'LEAVE_CASE',
  LEAVE_CASE_SUCCESS = 'LEAVE_CASE_SUCCESS',
  LEAVE_CASE_FAILED = 'LEAVE_CASE_FAILED',

  // Product Data
  PRODUCT_DATA_UPDATED = 'PRODUCT_DATA_UPDATED',

  // Connection Management Actions
  FETCH_CONNECTIONS = 'FETCH_CONNECTIONS',
  FETCH_CONNECTIONS_SUCCESS = 'FETCH_CONNECTIONS_SUCCESS',
  FETCH_CONNECTIONS_FAILED = 'FETCH_CONNECTIONS_FAILED',

  // WebSocket Message Actions
  SEND_MESSAGE = 'SEND_MESSAGE',
  SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED',

  // Connection Status Actions
  SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS',
  SET_ACTIVE_CASE_ID = 'SET_ACTIVE_CASE_ID',
  CLEAR_ERROR = 'CLEAR_ERROR',

  // Auto-Reconnect Actions
  SET_AUTO_RECONNECT = 'SET_AUTO_RECONNECT',
  RESET_RECONNECT_ATTEMPTS = 'RESET_RECONNECT_ATTEMPTS',
  INCREMENT_RECONNECT_ATTEMPTS = 'INCREMENT_RECONNECT_ATTEMPTS',

  // Reset State
  RESET_CONNECTION_STATE = 'RESET_CONNECTION_STATE',
}

/**
 * Base action interface for all connection actions
 */
export interface IConnectionAction {
  type: ConnectionActionTypes
  payload?: any
}
