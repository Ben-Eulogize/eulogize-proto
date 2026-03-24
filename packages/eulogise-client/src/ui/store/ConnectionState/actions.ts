import {
  ConnectionActionTypes,
  EulogiseProduct,
  ICardProductData,
  IConnection,
  WebSocketConnectionStatus,
  WebSocketMessageEventType,
  WebSocketNewJoinCasePayload,
  WebSocketNewLeaveCasePayload,
  WebSocketPayload,
} from '@eulogise/core'

// WebSocket Connection Actions
type ConnectPayload = {
  onSuccess?: () => void
  onFailed?: (error: Error) => void
}

export type ConnectAction = {
  type: ConnectionActionTypes.CONNECT
  payload: ConnectPayload
}

export const connect = (payload: ConnectPayload = {}): ConnectAction => ({
  type: ConnectionActionTypes.CONNECT,
  payload,
})

type ConnectSuccessPayload = {
  connectionStatus: WebSocketConnectionStatus
}

export type ConnectSuccessAction = {
  type: ConnectionActionTypes.CONNECT_SUCCESS
  payload: ConnectSuccessPayload
}

export const connectSuccess = (
  payload: ConnectSuccessPayload,
): ConnectSuccessAction => ({
  type: ConnectionActionTypes.CONNECT_SUCCESS,
  payload,
})

type ConnectFailedPayload = {
  error: string
}

export type ConnectFailedAction = {
  type: ConnectionActionTypes.CONNECT_FAILED
  payload: ConnectFailedPayload
}

export const connectFailed = (
  payload: ConnectFailedPayload,
): ConnectFailedAction => ({
  type: ConnectionActionTypes.CONNECT_FAILED,
  payload,
})

// Disconnect Actions
type DisconnectPayload = {
  onSuccess?: () => void
}

export type DisconnectAction = {
  type: ConnectionActionTypes.DISCONNECT
  payload: DisconnectPayload
}

export const disconnect = (
  payload: DisconnectPayload = {},
): DisconnectAction => ({
  type: ConnectionActionTypes.DISCONNECT,
  payload,
})

export type DisconnectSuccessAction = {
  type: ConnectionActionTypes.DISCONNECT_SUCCESS
}

export const disconnectSuccess = (): DisconnectSuccessAction => ({
  type: ConnectionActionTypes.DISCONNECT_SUCCESS,
})

// Case Room Actions
type JoinCasePayload = {
  caseId: string
  onSuccess?: () => void
  onFailed?: (error: Error) => void
}

export type JoinCaseAction = {
  type: ConnectionActionTypes.JOIN_CASE
  payload: JoinCasePayload
}

export const joinCase = (payload: JoinCasePayload): JoinCaseAction => ({
  type: ConnectionActionTypes.JOIN_CASE,
  payload,
})

type JoinCaseSuccessPayload = {
  caseId: string
}

export type JoinCaseSuccessAction = {
  type: ConnectionActionTypes.JOIN_CASE_SUCCESS
  payload: JoinCaseSuccessPayload
}

export const joinCaseSuccess = (
  payload: JoinCaseSuccessPayload,
): JoinCaseSuccessAction => ({
  type: ConnectionActionTypes.JOIN_CASE_SUCCESS,
  payload,
})

type JoinCaseFailedPayload = {
  caseId: string
  error: string
}

export type JoinCaseFailedAction = {
  type: ConnectionActionTypes.JOIN_CASE_FAILED
  payload: JoinCaseFailedPayload
}

type NewJoinCasePayload = WebSocketNewJoinCasePayload
type NewLeaveCasePayload = WebSocketNewLeaveCasePayload

export const joinCaseFailed = (
  payload: JoinCaseFailedPayload,
): JoinCaseFailedAction => ({
  type: ConnectionActionTypes.JOIN_CASE_FAILED,
  payload,
})

export type NewJoinCaseAction = {
  type: ConnectionActionTypes.NEW_JOIN_CASE
  payload: NewJoinCasePayload
}

export type NewLeaveCaseAction = {
  type: ConnectionActionTypes.NEW_LEAVE_CASE
  payload: NewLeaveCasePayload
}

// Leave Case Actions
type LeaveCasePayload = {
  caseId?: string
  onSuccess?: () => void
  onFailed?: (error: Error) => void
}

export type LeaveCaseAction = {
  type: ConnectionActionTypes.LEAVE_CASE
  payload: LeaveCasePayload
}

export const leaveCase = (payload: LeaveCasePayload = {}): LeaveCaseAction => ({
  type: ConnectionActionTypes.LEAVE_CASE,
  payload,
})

type LeaveCaseSuccessPayload = {
  caseId: string
}

export type LeaveCaseSuccessAction = {
  type: ConnectionActionTypes.LEAVE_CASE_SUCCESS
  payload: LeaveCaseSuccessPayload
}

export const leaveCaseSuccess = (
  payload: LeaveCaseSuccessPayload,
): LeaveCaseSuccessAction => ({
  type: ConnectionActionTypes.LEAVE_CASE_SUCCESS,
  payload,
})

type LeaveCaseFailedPayload = {
  caseId: string
  error: string
}

export type LeaveCaseFailedAction = {
  type: ConnectionActionTypes.LEAVE_CASE_FAILED
  payload: LeaveCaseFailedPayload
}

export const leaveCaseFailed = (
  payload: LeaveCaseFailedPayload,
): LeaveCaseFailedAction => ({
  type: ConnectionActionTypes.LEAVE_CASE_FAILED,
  payload,
})

// PRODUCT_DATA_UPDATED Actions
type ProductDataUpdatedPayload = {
  caseId: string
  product: EulogiseProduct
  productData: Partial<ICardProductData>
  productId: string
}

export type ProductDataUpdatedAction = {
  type: ConnectionActionTypes.PRODUCT_DATA_UPDATED
  payload: ProductDataUpdatedPayload
}

// Fetch Connections Actions
type FetchConnectionsPayload = {
  caseId: string
  onSuccess?: (connections: IConnection[]) => void
  onFailed?: (error: Error) => void
}

export type FetchConnectionsAction = {
  type: ConnectionActionTypes.FETCH_CONNECTIONS
  payload: FetchConnectionsPayload
}

export const fetchConnections = (
  payload: FetchConnectionsPayload,
): FetchConnectionsAction => ({
  type: ConnectionActionTypes.FETCH_CONNECTIONS,
  payload,
})

type FetchConnectionsSuccessPayload = {
  connections: IConnection[]
}

export type FetchConnectionsSuccessAction = {
  type: ConnectionActionTypes.FETCH_CONNECTIONS_SUCCESS
  payload: FetchConnectionsSuccessPayload
}

export const fetchConnectionsSuccess = (
  payload: FetchConnectionsSuccessPayload,
): FetchConnectionsSuccessAction => ({
  type: ConnectionActionTypes.FETCH_CONNECTIONS_SUCCESS,
  payload,
})

type FetchConnectionsFailedPayload = {
  error: string
}

export type FetchConnectionsFailedAction = {
  type: ConnectionActionTypes.FETCH_CONNECTIONS_FAILED
  payload: FetchConnectionsFailedPayload
}

export const fetchConnectionsFailed = (
  payload: FetchConnectionsFailedPayload,
): FetchConnectionsFailedAction => ({
  type: ConnectionActionTypes.FETCH_CONNECTIONS_FAILED,
  payload,
})

// Send Message Actions
type SendMessagePayload = {
  type: WebSocketMessageEventType
  data: any
  onSuccess?: () => void
  onFailed?: (error: Error) => void
}

export type SendMessageAction = {
  type: ConnectionActionTypes.SEND_MESSAGE
  payload: SendMessagePayload
}

export const sendMessage = (
  payload: SendMessagePayload,
): SendMessageAction => ({
  type: ConnectionActionTypes.SEND_MESSAGE,
  payload,
})

export type SendMessageSuccessAction = {
  type: ConnectionActionTypes.SEND_MESSAGE_SUCCESS
}

export const sendMessageSuccess = (): SendMessageSuccessAction => ({
  type: ConnectionActionTypes.SEND_MESSAGE_SUCCESS,
})

type SendMessageFailedPayload = {
  error: string
}

export type SendMessageFailedAction = {
  type: ConnectionActionTypes.SEND_MESSAGE_FAILED
  payload: SendMessageFailedPayload
}

export const sendMessageFailed = (
  payload: SendMessageFailedPayload,
): SendMessageFailedAction => ({
  type: ConnectionActionTypes.SEND_MESSAGE_FAILED,
  payload,
})

export const receiveMessage = (
  type: WebSocketMessageEventType,
  payload: WebSocketPayload,
): { type: string; payload: WebSocketPayload } => ({
  type,
  payload,
})

// Connection Status Actions
type SetConnectionStatusPayload = {
  status: WebSocketConnectionStatus
}

export type SetConnectionStatusAction = {
  type: ConnectionActionTypes.SET_CONNECTION_STATUS
  payload: SetConnectionStatusPayload
}

export const setConnectionStatus = (
  payload: SetConnectionStatusPayload,
): SetConnectionStatusAction => ({
  type: ConnectionActionTypes.SET_CONNECTION_STATUS,
  payload,
})

type SetActiveCaseIdPayload = {
  caseId: string | null
}

export type SetActiveCaseIdAction = {
  type: ConnectionActionTypes.SET_ACTIVE_CASE_ID
  payload: SetActiveCaseIdPayload
}

export const setActiveCaseId = (
  payload: SetActiveCaseIdPayload,
): SetActiveCaseIdAction => ({
  type: ConnectionActionTypes.SET_ACTIVE_CASE_ID,
  payload,
})

// Clear Error Action
export type ClearErrorAction = {
  type: ConnectionActionTypes.CLEAR_ERROR
}

export const clearError = (): ClearErrorAction => ({
  type: ConnectionActionTypes.CLEAR_ERROR,
})

// Auto-Reconnect Actions
type SetAutoReconnectPayload = {
  enabled: boolean
}

export type SetAutoReconnectAction = {
  type: ConnectionActionTypes.SET_AUTO_RECONNECT
  payload: SetAutoReconnectPayload
}

export const setAutoReconnect = (
  payload: SetAutoReconnectPayload,
): SetAutoReconnectAction => ({
  type: ConnectionActionTypes.SET_AUTO_RECONNECT,
  payload,
})

export type ResetReconnectAttemptsAction = {
  type: ConnectionActionTypes.RESET_RECONNECT_ATTEMPTS
}

export const resetReconnectAttempts = (): ResetReconnectAttemptsAction => ({
  type: ConnectionActionTypes.RESET_RECONNECT_ATTEMPTS,
})

export type IncrementReconnectAttemptsAction = {
  type: ConnectionActionTypes.INCREMENT_RECONNECT_ATTEMPTS
}

export const incrementReconnectAttempts =
  (): IncrementReconnectAttemptsAction => ({
    type: ConnectionActionTypes.INCREMENT_RECONNECT_ATTEMPTS,
  })

// Reset State Action
type ResetConnectionStatePayload = {
  onSuccess?: () => void
}

export type ResetConnectionStateAction = {
  type: ConnectionActionTypes.RESET_CONNECTION_STATE
  payload: ResetConnectionStatePayload
}

export const resetConnectionState = (
  payload: ResetConnectionStatePayload = {},
): ResetConnectionStateAction => ({
  type: ConnectionActionTypes.RESET_CONNECTION_STATE,
  payload,
})

// Union type for all connection actions
export type ConnectionActions =
  | ConnectAction
  | ConnectSuccessAction
  | ConnectFailedAction
  | DisconnectAction
  | DisconnectSuccessAction
  | JoinCaseAction
  | JoinCaseSuccessAction
  | JoinCaseFailedAction
  | NewJoinCaseAction
  | NewLeaveCaseAction
  | LeaveCaseAction
  | LeaveCaseSuccessAction
  | LeaveCaseFailedAction
  | FetchConnectionsAction
  | FetchConnectionsSuccessAction
  | FetchConnectionsFailedAction
  | SendMessageAction
  | SendMessageSuccessAction
  | SendMessageFailedAction
  | SetConnectionStatusAction
  | SetActiveCaseIdAction
  | ClearErrorAction
  | SetAutoReconnectAction
  | ResetReconnectAttemptsAction
  | IncrementReconnectAttemptsAction
  | ResetConnectionStateAction
