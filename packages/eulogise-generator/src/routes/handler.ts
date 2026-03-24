'use strict'
import { getRoute } from './routes'
import { GENERATOR_CONFIG } from '../config'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

export const apiHandle = async (event, context) => {
  const claims: any = event.requestContext?.authorizer?.claims
  console.log('FFMPEG_PATH', GENERATOR_CONFIG.FFMPEG_PATH)
  console.log('event', event)
  const { path, httpMethod: method } = event
  console.log('Request path', path)
  console.log('Request method', method)
  const handleFn = getRoute(path, method)
  if (!handleFn) {
    return {
      statusCode: '404',
      headers,
      body: 'Not found',
    }
  }
  /*
  try {
    authenticate(claims)
  } catch (ex) {
    return {
      statusCode: '401',
      headers,
      body: 'Unauthorized',
    }
  }
*/
  try {
    const body = JSON.parse(event.body)
    const data = await handleFn({ body }, event, context)
    // if statusCode is part of the json, treat it as a response
    if (data.statusCode) {
      return data
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    }
  } catch (ex) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(ex),
    }
  }
}
