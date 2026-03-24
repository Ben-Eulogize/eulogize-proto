import fetch from 'node-fetch'

import GeneratorAuthHelper from './GeneratorAuthHelper'
import { GENERATOR_CONFIG } from '../../config'

export async function save({ env, resource, item }) {
  const method = 'POST'
  // Create full url and add token if found
  const webtoken = await GeneratorAuthHelper.getApiToken(env)
  const apiUrl = GENERATOR_CONFIG.API_URL
  const url = `${apiUrl}/v2/old/resource/save`

  // Send request
  console.log(`🎩 ${method} ${url}`, { id: item.id })

  const response = await fetch(webtoken ? `${url}?webtoken=${webtoken}` : url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resource,
      item,
    }),
  })

  // Ready body
  const result = await response.json()

  // Return any other errors
  if (!response.ok) {
    console.log(`🦃 ${method} ${url}`, result)
    console.log(`😩 result.error`, result.error)

    throw new Error(result.error.message)
  }

  console.log(`🐇 ${method} ${url}`, result)

  return result.item
}
