import { accessControlAllowOrigin, mwWebtokenAccount } from '../../middleware'
import { getRoute } from './routes'
import {
  V2RouteBaseRequestEvent,
  V2RouteContext,
} from '../../../types/routes.types'
import { EulogizeLambdur } from './EulogizeLambdur'

export const v2Handler = async (
  event: V2RouteBaseRequestEvent,
  context: V2RouteContext,
) => {
  if (
    (event as unknown as { source: string }).source ===
    'serverless-plugin-warmup'
  ) {
    console.log('WarmUp - Lambda is warm!')
    return
  }

  try {
    console.log('entering v2Handler route', event)
    const { path, httpMethod: method, requestContext } = event
    const routeKey = requestContext?.routeKey ?? ''
    console.log('route key', routeKey)
    const filteredPath = path?.replace('/v2-ext', '').replace('/v2', '')
    const { fn: handleFn, params: pathParams } = getRoute({
      path: filteredPath,
      method,
      routeKey,
    })
    if (!handleFn) {
      console.log('handle function not found', path)
      return {
        statusCode: 404,
      }
    }
    console.log('handle function found')
    // websocket routes have routeKey instead of path+method
    if (routeKey) {
      console.log('websocket function - routeKey', routeKey)
      return await handleFn(event, context, pathParams)
    }
    console.log('handling v2 http route - path', path)
    if (path.startsWith('/v2/old') || path.startsWith('/v2-ext/old')) {
      return await handleFn(event, context, pathParams)
    }
    const body = await handleFn(event, context, pathParams)
    // if statusCode is part of the json, treat it as a response
    if (body.statusCode) {
      return { ...body, isNonJSON: true }
    }
    return {
      statusCode: 200,
      body,
    }
  } catch (ex: any) {
    if (ex instanceof EulogizeLambdur.Error) {
      throw ex
    }
    return {
      statusCode: 400,
      body: { message: ex.message },
    }
  }
}

export const api = EulogizeLambdur.chain(
  // @ts-ignore
  EulogizeLambdur.chain(mwWebtokenAccount, v2Handler),
  accessControlAllowOrigin,
)
