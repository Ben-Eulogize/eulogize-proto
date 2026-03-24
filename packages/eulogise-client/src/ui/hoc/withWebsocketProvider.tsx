import React from 'react'
import { WebSocketProvider } from '../components/providers/WebsocketProvider'

export const withWebsocketProvider = (Component: any) => {
  return <WebSocketProvider>{Component}</WebSocketProvider>
}
