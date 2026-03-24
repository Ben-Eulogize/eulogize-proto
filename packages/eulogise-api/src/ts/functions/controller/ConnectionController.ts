import { ApiGatewayManagementApi } from '@aws-sdk/client-apigatewaymanagementapi'
import { connectionModel } from '../../database/model/connection'
import { IConnectionModel } from '../../database/types/ConnectionModel.types'
import {
  WebSocketDisconnectPayload,
  WebSocketMessage,
  WebSocketMessageEventType,
  WebSocketNewJoinCasePayload,
  WebSocketNewLeaveCasePayload,
  WebSocketPayload,
} from '@eulogise/core'
import { CONFIG } from '../../config/Config'

export class ConnectionController {
  private readonly apiGatewayManagementApi: ApiGatewayManagementApi

  public constructor() {
    const apiEndpoint = CONFIG.WEBSOCKET_API_MANAGEMENT_API_ENDPOINT

    const isOffline =
      !apiEndpoint ||
      apiEndpoint.includes('localhost') ||
      apiEndpoint.startsWith('127.0.0.1')

    // Initialize API Gateway Management API for sending messages back to client
    const endpoint = isOffline
      ? `http://localhost:3001`
      : CONFIG.WEBSOCKET_API_MANAGEMENT_API_ENDPOINT /*`https://${domainName}/${stage}`*/
    console.log('WebSocket endpoint:', endpoint)
    this.apiGatewayManagementApi = new ApiGatewayManagementApi({
      endpoint: endpoint,
    })
    return
  }

  public static async getConnectionsByCaseId(caseId: string) {
    console.log('getConnectionsByCaseId for caseId:', caseId)
    return await connectionModel.findByCaseId(caseId)
  }

  public async connect(connectionObj: IConnectionModel.Schema) {
    return await connectionModel.create(connectionObj)
  }

  public async disconnect(connectionId: string, postMessage?: boolean) {
    console.log('WebSocket disconnect:', { connectionId, postMessage })
    if (postMessage) {
      const connection = await connectionModel.findById(connectionId)
      const caseId = connection.case
      console.log('WebSocket disconnect caseId:', caseId)
      if (caseId) {
        await this.sendMessagesToCase(caseId!, {
          type: WebSocketMessageEventType.NEW_LEAVE_CASE,
          data: { id: connectionId, caseId } as WebSocketDisconnectPayload,
          from: connectionId,
          timestamp: new Date().toISOString(),
        })
      }
    }
    await connectionModel.deleteById(connectionId)
  }

  public async joinCase(
    connectionId: string,
    caseId: string,
    payload: WebSocketPayload,
  ) {
    const existingConnection = await connectionModel.findById(connectionId)
    if (existingConnection && existingConnection.case) {
      await this.leaveCase(connectionId, existingConnection.case, payload)
    }
    await connectionModel.updateById(connectionId, { case: caseId })
    console.log('Websocket joinCase', { connectionId, caseId, payload })
    await this.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.NEW_JOIN_CASE,
      data: { ...payload, id: connectionId } as WebSocketNewJoinCasePayload,
      from: connectionId,
      timestamp: new Date().toISOString(),
    })
  }

  public async leaveCase(
    connectionId: string,
    caseId: string,
    payload: WebSocketPayload,
  ) {
    console.log('Websocket leaveCase', { connectionId, caseId, payload })
    await connectionModel.updateById(connectionId, { case: undefined })
    await this.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.NEW_LEAVE_CASE,
      data: { ...payload, id: connectionId } as WebSocketNewLeaveCasePayload,
      from: connectionId,
      timestamp: new Date().toISOString(),
    })
  }

  public async sendMessagesToCase(caseId: string, message: WebSocketMessage) {
    console.log('sendMessagesToCase:', { caseId, message })
    const connections = await ConnectionController.getConnectionsByCaseId(
      caseId,
    )
    // Send response back to the client
    const connIds = connections
      .map((conn) => conn.id)
      .filter((id): id is string => id !== undefined)

    // Helper function to send message with retry logic and connection cleanup
    const sendMessageWithRetry = async (
      connId: string,
      maxRetries: number = 5,
    ): Promise<void> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(
            `postToConnection attempt ${attempt}/${maxRetries} for ${connId}`,
          )
          await this.apiGatewayManagementApi.postToConnection({
            ConnectionId: connId,
            Data: JSON.stringify(message),
          })
          console.log(`postToConnection successful for ${connId}`)
          return // Success - exit the retry loop
        } catch (error) {
          console.error(
            `postToConnection attempt ${attempt} failed for ${connId}:`,
            error,
          )

          // If this is the last attempt, clean up the connection
          if (attempt === maxRetries) {
            console.log(
              `All ${maxRetries} attempts failed for ${connId}, removing from database`,
            )
            try {
              await this.disconnect(connId, false)
              console.log(
                `Successfully removed stale connection ${connId} from database`,
              )
            } catch (cleanupError) {
              console.error(
                `Failed to cleanup connection ${connId}:`,
                cleanupError,
              )
            }
            return
          }

          // Wait before retrying with exponential backoff
          const backoffMs = 1
          console.log(`Waiting ${backoffMs}ms before retry for ${connId}`)
          await new Promise((resolve) => setTimeout(resolve, backoffMs))
        }
      }
    }

    // Send messages to all connections with retry logic
    for (const connId of connIds) {
      await sendMessageWithRetry(connId)
    }
  }
}
