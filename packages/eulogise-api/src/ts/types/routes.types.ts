import { APIGatewayEvent, Context } from 'aws-lambda'
import { Webtoken } from '../webtoken'

export type V2RouteContext = Context

export type V2RouteBaseRequestEvent = APIGatewayEvent & {
  webtoken: Webtoken.Payload
}

export type V2RouteGetRequestEvent<T = {}> = V2RouteBaseRequestEvent & {
  queryStringParameters: T
}

export type V2RouteDeleteRequestEvent = V2RouteBaseRequestEvent

export type V2RoutePostRequestEvent<B> = V2RouteBaseRequestEvent & {
  body: B
}

export type V2RoutePutRequestEvent<B> = V2RoutePostRequestEvent<B>
