import {
  put,
  takeEvery,
  call,
  take,
  select,
  fork,
  cancel,
  delay,
} from 'redux-saga/effects'
import { eventChannel, Channel } from 'redux-saga'
import {
  ConnectionActionTypes,
  EulogiseRegion,
  IAuthState,
  ICaseState,
  IEulogiseState,
  WebSocketJoinCasePayload,
  WebSocketConnectionStatus,
  WebSocketMessage,
  WebSocketMessageEventType,
  WebSocketStatus,
  WebSocketPayload,
} from '@eulogise/core'
import { fetchAllProductsByCaseId } from '../CardProduct/actions'
import { fetchSlideshowsByCaseId } from '../SlideshowState/actions'
import RequestHelper from '../../helpers/RequestHelper'
import { EulogiseClientConfig, EulogiseEndpoint } from '@eulogise/client-core'
import {
  ConnectAction,
  connectSuccess,
  connectFailed,
  DisconnectAction,
  disconnectSuccess,
  JoinCaseAction,
  joinCaseSuccess,
  joinCaseFailed,
  LeaveCaseAction,
  leaveCaseSuccess,
  leaveCaseFailed,
  FetchConnectionsAction,
  fetchConnectionsSuccess,
  fetchConnectionsFailed,
  SendMessageAction,
  sendMessageSuccess,
  sendMessageFailed,
  receiveMessage,
  setConnectionStatus,
  ResetConnectionStateAction,
  incrementReconnectAttempts,
  connect,
  fetchConnections,
  joinCase,
} from './actions'

// WebSocket connection management
let webSocketConnection: WebSocket | null = null
let webSocketChannel: Channel<any> | null = null
let messageHandlerTask: any = null
let reconnectTask: any = null
let pendingConnectCallbacks: {
  onSuccess?: () => void
  onFailed?: (error: Error) => void
} | null = null

enum WebSocketEventType {
  OPEN = 'WEBSOCKET_OPEN',
  MESSAGE = 'WEBSOCKET_MESSAGE',
  CLOSE = 'WEBSOCKET_CLOSE',
  ERROR = 'WEBSOCKET_ERROR',
}

/**
 * Create a WebSocket event channel for receiving messages
 */
function createWebSocketChannel(url: string) {
  return eventChannel((emit) => {
    const ws = new WebSocket(url)
    webSocketConnection = ws

    ws.onopen = () => {
      console.log('WebSocket: connection opened')
      emit({ type: WebSocketEventType.OPEN })
    }

    ws.onmessage = (event) => {
      console.log('WebSocket: connection message', event)
      try {
        const data = JSON.parse(event.data)
        emit({ type: WebSocketEventType.MESSAGE, payload: data })
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
        emit({ type: WebSocketEventType.MESSAGE, payload: event.data })
      }
    }

    ws.onclose = (event) => {
      console.log('WebSocket: connection closed')
      emit({
        type: 'WEBSOCKET_CLOSE',
        payload: { code: event.code, reason: event.reason },
      })
    }

    ws.onerror = (error) => {
      console.log('WebSocket: connection error', error)
      emit({ type: WebSocketEventType.ERROR, payload: error })
    }

    // Cleanup function
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket: clean up disconnecting ')
        ws.close()
      }
      webSocketConnection = null
    }
  })
}

/**
 * Handle automatic WebSocket reconnection
 */
function* handleAutoReconnect() {
  try {
    console.log('WebSocket: Starting auto-reconnect saga')
    while (true) {
      // Check if auto-reconnect is enabled
      const { autoReconnect, reconnectAttempts }: any = yield select(
        (state: IEulogiseState) => state.connections,
      )

      if (!autoReconnect) {
        console.log(
          'WebSocket: Auto-reconnect disabled, stopping reconnection attempts',
        )
        break
      }

      // Wait 100ms as requested
      yield delay(100)

      console.log(
        `WebSocket: Attempting reconnection (attempt ${reconnectAttempts + 1})`,
      )

      // Increment reconnect attempts
      yield put(incrementReconnectAttempts())

      // Attempt to reconnect
      yield put(connect())

      // Wait a bit to see if connection succeeds
      yield delay(1000)

      // Check if we're now connected
      const { connectionStatus, activeCaseId }: any = yield select(
        (state: IEulogiseState) => state.connections,
      )

      if (connectionStatus === WebSocketConnectionStatus.CONNECTED) {
        console.log('WebSocket: Reconnection successful')

        // Fetch existing connections and rejoin case after successful reconnection
        if (activeCaseId) {
          console.log(
            'WebSocket: Fetching existing connections and rejoining case after reconnection',
          )
          yield put(fetchConnections({ caseId: activeCaseId }))
          yield put(joinCase({ caseId: activeCaseId }))

          // Refetch product resources and slideshows to ensure file statuses are updated
          const { activeItem: activeCase }: ICaseState = yield select(
            (state: IEulogiseState) => state.cases,
          )
          const region = activeCase?.region ?? EulogiseRegion.AU
          console.log(
            'WebSocket: Refetching products and slideshows after reconnection',
          )
          yield put(
            fetchAllProductsByCaseId({
              caseId: activeCaseId,
              region,
            }),
          )
          yield put(fetchSlideshowsByCaseId({ caseId: activeCaseId }))
        }

        break
      }
    }
  } catch (error) {
    console.error('WebSocket: Auto-reconnect error:', error)
  }
}

/**
 * WebSocket message listener saga
 */
function* handleWebSocketMessages(channel: Channel<any>) {
  try {
    while (true) {
      const message: {
        type: WebSocketEventType
        payload: {
          type: WebSocketMessageEventType
          data: WebSocketPayload
          timestamp: string
          from: string
        }
      } = yield take(channel)

      console.log('WebSocket: handleWebSocketMessages', message)
      switch (message.type) {
        case WebSocketEventType.OPEN:
          console.log('WebSocket: handleWebSocketMessages set connected')

          // Cancel any running reconnect task since we're connected
          if (reconnectTask) {
            yield cancel(reconnectTask)
            reconnectTask = null
          }

          yield put(
            connectSuccess({
              connectionStatus: WebSocketConnectionStatus.CONNECTED,
            }),
          )

          // Call pending connect callbacks
          if (pendingConnectCallbacks?.onSuccess) {
            pendingConnectCallbacks.onSuccess()
          }
          pendingConnectCallbacks = null
          break

        case WebSocketEventType.MESSAGE: {
          console.log(
            'WebSocket: handleWebSocketMessages received message:',
            message,
          )
          yield put(receiveMessage(message.payload.type, message.payload.data))
          break
        }
        case WebSocketEventType.CLOSE:
          yield put(
            setConnectionStatus({
              status: WebSocketConnectionStatus.DISCONNECTED,
            }),
          )

          // Start auto-reconnection if enabled
          const { autoReconnect }: any = yield select(
            (state: IEulogiseState) => state.connections,
          )

          if (autoReconnect && !reconnectTask) {
            console.log(
              'WebSocket: Connection closed, starting auto-reconnection',
            )
            reconnectTask = yield fork(handleAutoReconnect)
          }
          break

        case WebSocketEventType.ERROR:
          yield put(
            setConnectionStatus({ status: WebSocketConnectionStatus.ERROR }),
          )
          yield put(connectFailed({ error: 'WebSocket connection error' }))

          // Call pending connect failed callback
          if (pendingConnectCallbacks?.onFailed) {
            pendingConnectCallbacks.onFailed(
              new Error('WebSocket connection error'),
            )
          }
          pendingConnectCallbacks = null

          // Start auto-reconnection if enabled (also for errors)
          const { autoReconnect: autoReconnectOnError }: any = yield select(
            (state: IEulogiseState) => state.connections,
          )

          if (autoReconnectOnError && !reconnectTask) {
            console.log(
              'WebSocket: Connection error, starting auto-reconnection',
            )
            reconnectTask = yield fork(handleAutoReconnect)
          }
          break
      }
    }
  } catch (error) {
    console.error('WebSocket message handling error:', error)
  }
}

/**
 * Connect to WebSocket
 */
function* handleConnect(action: ConnectAction) {
  const {
    payload: { onSuccess, onFailed },
  } = action

  try {
    // Check if we're already connected or connecting
    const { connectionStatus }: any = yield select(
      (state: IEulogiseState) => state.connections,
    ) as any

    if (connectionStatus === WebSocketConnectionStatus.CONNECTED) {
      console.log('WebSocket: Already connected, skipping connection attempt')
      if (onSuccess) {
        onSuccess()
      }
      return
    }

    if (connectionStatus === WebSocketConnectionStatus.CONNECTING) {
      console.log('WebSocket: Connection already in progress, adding callbacks')
      // Just add callbacks to pending list if connection is in progress
      pendingConnectCallbacks = { onSuccess, onFailed }
      return
    }

    // Store callbacks for later use when connection actually opens
    pendingConnectCallbacks = { onSuccess, onFailed }

    yield put(
      setConnectionStatus({ status: WebSocketConnectionStatus.CONNECTING }),
    )

    // Get auth token for WebSocket connection
    const authState: IAuthState = yield select(
      (state: IEulogiseState) => state.auth,
    )
    const webtoken = authState?.webtoken

    if (!webtoken) {
      console.log('No authentication token available')
      return
    }

    // Create WebSocket URL with auth token
    const wsUrl = `${EulogiseClientConfig.WEBSOCKET_API_URL}?webtoken=${webtoken}`

    // Create and start WebSocket channel
    webSocketChannel = yield call(createWebSocketChannel, wsUrl)

    // Start listening to WebSocket messages as a forked task
    messageHandlerTask = yield fork(
      handleWebSocketMessages as any,
      webSocketChannel,
    )

    // Note: connectSuccess will be called from handleWebSocketMessages when OPEN event is received
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to connect to WebSocket'
    console.error('WebSocket connection error:', error)

    yield put(connectFailed({ error: errorMessage }))
    yield put(setConnectionStatus({ status: WebSocketConnectionStatus.ERROR }))

    // Call failed callback and clear pending callbacks
    if (pendingConnectCallbacks?.onFailed) {
      pendingConnectCallbacks.onFailed(error)
    }
    pendingConnectCallbacks = null
  }
}

/**
 * Disconnect from WebSocket
 */
function* handleDisconnect(action: DisconnectAction) {
  const {
    payload: { onSuccess },
  } = action

  try {
    // Cancel the reconnect task since this is a manual disconnect
    if (reconnectTask) {
      yield cancel(reconnectTask)
      reconnectTask = null
    }

    // Cancel the message handler task
    if (messageHandlerTask) {
      yield cancel(messageHandlerTask)
      messageHandlerTask = null
    }

    // Clear pending callbacks
    pendingConnectCallbacks = null

    if (webSocketChannel) {
      webSocketChannel.close()
      webSocketChannel = null
    }

    if (webSocketConnection) {
      webSocketConnection.close()
      webSocketConnection = null
    }

    yield put(disconnectSuccess())
    yield put(
      setConnectionStatus({ status: WebSocketConnectionStatus.DISCONNECTED }),
    )

    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error('WebSocket disconnect error:', error)
  }
}

/**
 * Join a case room
 */
function* handleJoinCase(action: JoinCaseAction) {
  const {
    payload: { caseId, onSuccess, onFailed },
  } = action

  try {
    const { account }: IAuthState = yield select(
      (state: IEulogiseState) => state.auth,
    )
    const { connectionStatus } = yield select(
      (state: IEulogiseState) => state.connections,
    )
    console.log('WebSocket: handleJoinCase', connectionStatus)
    if (!account) {
      throw new Error('No authenticated user found')
    }
    // Send JOIN_CASE message through WebSocket
    if (webSocketConnection?.readyState === WebSocketStatus.OPEN) {
      console.log('WebSocket: handleJoinCase success', webSocketConnection)
      const message: WebSocketMessage = {
        action: 'message',
        type: WebSocketMessageEventType.JOIN_CASE,
        data: {
          caseId,
          user: {
            id: account.id,
            fullName: account.fullName,
            email: account.email,
            role: account.role,
          },
        } as WebSocketJoinCasePayload,
        timestamp: new Date().toISOString(),
      }

      if (!webSocketConnection) {
        throw new Error('webSocketConnection not exist error')
      }
      webSocketConnection.send(JSON.stringify(message))

      yield put(
        joinCaseSuccess({
          caseId,
        }),
      )

      if (onSuccess) {
        onSuccess()
      }
    } else {
      throw new Error('WebSocket is not connected')
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to join case'
    console.error('Join case error:', error)

    yield put(joinCaseFailed({ caseId, error: errorMessage }))

    if (onFailed) {
      onFailed(error)
    }
  }
}

/**
 * Leave a case room
 */
function* handleLeaveCase(action: LeaveCaseAction) {
  const {
    payload: { caseId, onSuccess, onFailed },
  } = action

  try {
    const activeCaseId =
      caseId || (yield select((state: any) => state.connections.activeCaseId))

    if (!activeCaseId) {
      throw new Error('No active case to leave')
    }

    // Send LEAVE_CASE message through WebSocket
    if (webSocketConnection?.readyState === WebSocket.OPEN) {
      const message = {
        action: 'message',
        caseId: activeCaseId,
        type: WebSocketMessageEventType.LEAVE_CASE,
        data: { caseId: activeCaseId },
        timestamp: new Date().toISOString(),
      }

      webSocketConnection.send(JSON.stringify(message))
    }

    yield put(leaveCaseSuccess({ caseId: activeCaseId }))

    if (onSuccess) {
      onSuccess()
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to leave case'
    console.error('Leave case error:', error)

    const caseIdToReport =
      caseId ||
      (yield select((state: any) => state.connections.activeCaseId)) ||
      ''
    yield put(leaveCaseFailed({ caseId: caseIdToReport, error: errorMessage }))

    if (onFailed) {
      onFailed(error)
    }
  }
}

/**
 * Fetch connections for a case
 */
function* handleFetchConnections(action: FetchConnectionsAction) {
  const {
    payload: { caseId, onSuccess, onFailed },
  } = action

  try {
    const endpoint = EulogiseEndpoint.FETCH_CONNECTIONS_BY_CASE_ID.replace(
      /:caseId/g,
      caseId,
    )

    const { data } = yield RequestHelper.requestWithToken(endpoint, {
      method: 'GET',
    })

    yield put(fetchConnectionsSuccess({ connections: data.connections || [] }))

    if (onSuccess) {
      onSuccess(data.connections || [])
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to fetch connections'
    console.error('Fetch connections error:', error)

    yield put(fetchConnectionsFailed({ error: errorMessage }))

    if (onFailed) {
      onFailed(error)
    }
  }
}

/**
 * Send a message through WebSocket
 */
function* handleSendMessage(action: SendMessageAction) {
  const {
    payload: { type, data, onSuccess, onFailed },
  } = action

  try {
    if (
      !webSocketConnection ||
      webSocketConnection.readyState !== WebSocket.OPEN
    ) {
      throw new Error('WebSocket is not connected')
    }

    const activeCaseId: string = yield select(
      (state: any) => state.connections.activeCaseId,
    )
    const message = {
      action: 'message',
      caseId: activeCaseId,
      type,
      data,
      timestamp: new Date().toISOString(),
    }

    webSocketConnection.send(JSON.stringify(message))

    yield put(sendMessageSuccess())

    if (onSuccess) {
      onSuccess()
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to send message'
    console.error('Send message error:', error)

    yield put(sendMessageFailed({ error: errorMessage }))

    if (onFailed) {
      onFailed(error)
    }
  }
}

/**
 * Handle connection state reset
 */
function* handleResetConnectionState(action: ResetConnectionStateAction) {
  const {
    payload: { onSuccess },
  } = action

  try {
    // Cancel the reconnect task
    if (reconnectTask) {
      yield cancel(reconnectTask)
      reconnectTask = null
    }

    // Cancel the message handler task
    if (messageHandlerTask) {
      yield cancel(messageHandlerTask)
      messageHandlerTask = null
    }

    // Clear pending callbacks
    pendingConnectCallbacks = null

    // Disconnect WebSocket if connected
    if (webSocketChannel) {
      webSocketChannel.close()
      webSocketChannel = null
    }

    if (webSocketConnection) {
      webSocketConnection.close()
      webSocketConnection = null
    }

    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    console.error('Reset connection state error:', error)
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(ConnectionActionTypes.CONNECT, handleConnect)
  yield takeEvery(ConnectionActionTypes.DISCONNECT, handleDisconnect)
  yield takeEvery(ConnectionActionTypes.JOIN_CASE, handleJoinCase)
  yield takeEvery(ConnectionActionTypes.LEAVE_CASE, handleLeaveCase)
  yield takeEvery(
    ConnectionActionTypes.FETCH_CONNECTIONS,
    handleFetchConnections,
  )
  yield takeEvery(ConnectionActionTypes.SEND_MESSAGE, handleSendMessage)
  yield takeEvery(
    ConnectionActionTypes.RESET_CONNECTION_STATE,
    handleResetConnectionState,
  )
}

export const ConnectionSagas = [watchers()]
