import axios, { Method } from 'axios'
import { GENERATOR_CONFIG } from '../config'

let _token: any

export const GeneratorAuthHelper = {
  getApiToken: async (): Promise<string> => {
    if (_token) {
      return _token
    }
    const requestOptions = {
      url: `${GENERATOR_CONFIG.API_URL}/v2/old/account/sign/in`,
      method: 'POST' as Method,
      data: {
        type: 'service',
        accessKey: GENERATOR_CONFIG.API_ACCESS_KEY,
        secretKey: GENERATOR_CONFIG.API_SECRET_KEY,
      },
    }

    try {
      const response = await axios(requestOptions)
      console.log('response', response)
      if (response.status === 200) {
        // @ts-ignore
        _token = response.data.webtoken
        if (!_token) {
          throw new Error('webtoken does not exist')
        }
        return _token
      } else {
        throw new Error('failed to get webtoken')
      }
    } catch (error) {
      console.log('failed to get webtoken, error', error)
      throw new Error('failed to get webtoken, error')
    }
  },
}
