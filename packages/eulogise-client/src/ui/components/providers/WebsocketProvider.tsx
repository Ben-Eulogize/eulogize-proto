import React, { useEffect, useRef } from 'react'
import { IConnectionState, WebSocketConnectionStatus } from '@eulogise/core'
import {
  useCaseState,
  useConnectionState,
  useEulogiseDispatch,
} from '../../store/hooks'
import {
  connect,
  fetchConnections,
  joinCase,
} from '../../store/ConnectionState/actions'

/*
const WebSocketContext = createContext(null)
*/

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useEulogiseDispatch()

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<any>(null)

  // Connect on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(connect())
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return <div>{children}</div>
}

export const useWebSocket = (): IConnectionState => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const caseId = activeCase?.id
  const connectionState = useConnectionState()
  const { connectionStatus } = connectionState

  useEffect(() => {
    if (caseId && connectionStatus === WebSocketConnectionStatus.CONNECTED) {
      console.log('Websocket start fetching connections and joining case:', {
        caseId,
        connectionStatus,
      })
      dispatch(fetchConnections({ caseId }))
      dispatch(joinCase({ caseId }))
    }
  }, [caseId, connectionStatus])

  return connectionState
}
