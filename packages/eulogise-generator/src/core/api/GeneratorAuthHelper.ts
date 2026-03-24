import fetch from 'node-fetch'

import { GENERATOR_CONFIG } from '../../config'

let _tokens = {}
let _retry = 5

async function getApiToken(env) {
  if (_tokens[env]) {
    return _tokens[env]
  }

  const apiUrl = GENERATOR_CONFIG.API_URL
  console.log(`👋 Authenticating with ${apiUrl}`)

  const response = await fetch(`${apiUrl}/account/sign/in`, {
    method: 'POST',
    body: JSON.stringify({
      type: 'service',
      accessKey: GENERATOR_CONFIG.API_ACCESS_KEY,
      secretKey: GENERATOR_CONFIG.API_SECRET_KEY,
    }),
  })

  if (response.status === 200) {
    const { webtoken } = await response.json()

    if (webtoken) {
      console.log(`🤝 Authenticated with ${apiUrl}`)

      _tokens[env] = webtoken
      return webtoken
    }
  } else if (_retry > 0) {
    _retry--

    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await getApiToken(env)
        resolve(result)
      }, 1000)
    })
  } else {
    _retry = 5
  }
}

export const GeneratorAuthHelper = { getApiToken }
export default GeneratorAuthHelper
