import {
  V2RouteBaseRequestEvent,
  V2RouteContext,
  V2RouteGetRequestEvent,
} from '../../../../types/routes.types'
import {
  WebSocketMessage,
  WebSocketMessageEventType,
  WebSocketErrorPayload,
} from '@eulogise/core'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { IConnectionModel } from '../../../../database/types/ConnectionModel.types'
import { ConnectionController } from '../../../controller/ConnectionController'

const connectWebSocket = async (
  event: V2RouteGetRequestEvent,
  context: V2RouteContext,
  pathParams: object,
): Promise<any> => {
  console.log('WebSocket connectWebSocket:', event)

  const webtoken = event.webtoken
  const { connectionId } = event.requestContext
  if (!connectionId) {
    return {
      statusCode: 400,
    }
  }

  try {
    console.log(`WebSocket connected: ${connectionId}`)
    const connectionObj: IConnectionModel.Schema = {
      id: connectionId,
      user: webtoken.ref,
      client: webtoken.clientId,
    }
    const connectionController = new ConnectionController()
    await connectionController.connect(connectionObj)

    return {
      statusCode: 200,
    }
  } catch (error) {
    console.error('Error handling WebSocket connect:', error)

    return {
      statusCode: 500,
    }
  }
}

export const disconnectWebSocket = async (
  event: V2RouteBaseRequestEvent,
  context: V2RouteContext,
  pathParams: object,
) => {
  console.log('WebSocket disconnectWebSocket:')

  const connectionId = event.requestContext.connectionId
  const connectionController = new ConnectionController()
  if (!connectionId) {
    return {
      message: 'Connection ID not found',
    }
  }

  try {
    // Here you could remove the connection ID from DynamoDB
    // await removeConnection(connectionId)

    console.log(`WebSocket disconnected: ${connectionId}`)
    await connectionController.disconnect(connectionId, true)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Disconnected successfully',
        connectionId,
      }),
    }
  } catch (error) {
    console.error('Error handling WebSocket disconnect:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to disconnect',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}

export const defaultWebSocket = async () => {
  return {}
}

export const messageWebSocket = async (
  event: V2RouteBaseRequestEvent,
  context: V2RouteContext,
  pathParams: object,
) => {
  console.log('WebSocket messageWebSocket:', event)
  const connectionId = event.requestContext.connectionId!
  const connectionController = new ConnectionController()

  try {
    let messageData: WebSocketMessage = event.body as any
    console.log('WebSocket messageWebSocket messageData:', messageData)
    const { action, type, data } = messageData
    if (!data) {
      throw new Error('Message data is missing')
    }
    const caseId = data.caseId!

    // Handle different message types
    switch (type) {
      case WebSocketMessageEventType.JOIN_CASE: {
        await connectionController.joinCase(connectionId, caseId, data)
        break
      }
      case WebSocketMessageEventType.LEAVE_CASE: {
        await connectionController.leaveCase(connectionId, caseId, data)
        console.log('messageWebSocket leaveCase:', JSON.stringify(data))
        break
      }

      default: {
        await connectionController.sendMessagesToCase(caseId, {
          type: WebSocketMessageEventType.ERROR,
          data: {
            message: `Unknown action: ${action}`,
          } as WebSocketErrorPayload,
          from: connectionId,
          timestamp: new Date().toISOString(),
        })
      }
    }

    return {
      statusCode: 200,
    }
  } catch (error) {
    console.error('Error in WebSocket message handler:', error)

    return {
      statusCode: 500,
    }
  }
}

export default {
  $connect: RouteMiddleware.loggedInUserMiddleware(connectWebSocket),
  $disconnect: disconnectWebSocket,
  $default: defaultWebSocket,
  message: messageWebSocket,
}
