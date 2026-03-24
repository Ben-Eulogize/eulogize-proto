import { IEulogiseUser } from './Resource.types'
import { EulogiseProduct } from './Eulogise.types'
import { ICardProductData } from './CardProduct.types'
import { IAsset } from './Assets.types'
import { ICase } from './Case.types'

export enum WebSocketMessageEventType {
  DISCONNECT = 'DISCONNECT',
  JOIN_CASE = 'JOIN_CASE',
  NEW_JOIN_CASE = 'NEW_JOIN_CASE',
  LEAVE_CASE = 'LEAVE_CASE',
  NEW_LEAVE_CASE = 'NEW_LEAVE_CASE',
  ERROR = 'ERROR',
  PRODUCT_DATA_UPDATED = 'PRODUCT_DATA_UPDATED',
  CASE_UPDATED = 'CASE_UPDATED',
  ASSET_UPDATED = 'ASSET_UPDATED',
  ASSET_DELETED = 'ASSET_DELETED',
}

export type IConnection = {
  id?: string
  caseId: string
  user?: Pick<IEulogiseUser, 'email' | 'fullName' | 'id' | 'role'>
}

export type WebsocketBaseDataPayload = IConnection

export type WebSocketDisconnectPayload = {
  id: string
  caseId: string
}
export type WebSocketJoinCasePayload = WebsocketBaseDataPayload
export type WebSocketLeaveCasePayload = WebsocketBaseDataPayload
export type WebSocketNewJoinCasePayload = WebsocketBaseDataPayload
export type WebSocketNewLeaveCasePayload = WebsocketBaseDataPayload
export type WebSocketProductDataUpdatedPayload = WebsocketBaseDataPayload & {
  product: EulogiseProduct
  productId: string
  productData: ICardProductData
  slug?: string
}
export type WebSocketAssetDataUpdatedPayload = WebsocketBaseDataPayload & {
  assetId: string
  assetData: IAsset
}
export type WebSocketAssetDataDeletedPayload = WebsocketBaseDataPayload & {
  assetId: string
}
export type WebSocketCaseDataUpdatedPayload = WebsocketBaseDataPayload & {
  caseData: ICase
}
export type WebSocketErrorPayload = {
  caseId: string
  message: string
}

export type WebSocketPayload =
  | WebSocketJoinCasePayload
  | WebSocketLeaveCasePayload
  | WebSocketNewJoinCasePayload
  | WebSocketNewLeaveCasePayload
  | WebSocketErrorPayload
  | WebSocketDisconnectPayload
  | WebSocketProductDataUpdatedPayload
  | WebSocketAssetDataUpdatedPayload
  | WebSocketAssetDataDeletedPayload
  | WebSocketCaseDataUpdatedPayload

export interface WebSocketMessage {
  action?: string
  type: WebSocketMessageEventType
  data?: WebSocketPayload
  from?: string
  timestamp?: string
}
export enum WebSocketStatus {
  CONNECTING = 0,
  /** The connection is open and ready to communicate. */
  OPEN = 1,
  /** The connection is in the process of closing. */
  CLOSING = 2,
  /** The connection is closed. */
  CLOSED = 3,
}

export enum WebSocketConnectionStatus {
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  DISCONNECTED = 'Disconnected',
  ERROR = 'Error',
}
