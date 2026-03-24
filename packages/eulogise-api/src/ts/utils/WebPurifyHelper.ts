import axios, { AxiosResponse } from 'axios'
import { CONFIG } from '../config/Config'
import { Lambdur } from 'lambdur'

export enum WebPurifyCheckResponseCode {
  NO_PROFANITY_WORDS = '0',
  HAS_PROFANITY_WORDS = '1',
}

export interface WebPurifyCheckRequestPayload {
  text: string
}

export interface WebPurifyCheckRespondPayload {
  rsp: {
    '@attributes': {
      stat: string
    }
    method: string
    lang: string
    format: string
    found: WebPurifyCheckResponseCode
    api_key: string
  }
}

export class WebPurifyHelper {
  public static async checkHasProfanityWords({
    text = '',
  }: WebPurifyCheckRequestPayload): Promise<Boolean> {
    if (!CONFIG.WEB_PURIFY_API_KEY) {
      throw new Error('No Web Purify API Key!')
    }

    if (!CONFIG.WEB_PURIFY_CHECK_API_PREFIX_URL) {
      throw new Error('No Web Purify Check API Prefix Url')
    }

    if (!text) {
      return false
    }

    const url = `${CONFIG.WEB_PURIFY_CHECK_API_PREFIX_URL}/?api_key=${
      CONFIG.WEB_PURIFY_API_KEY
    }&method=webpurify.live.check&text=${encodeURIComponent(text)}&format=json`

    try {
      const res: AxiosResponse<any, any> = await axios({
        method: 'GET',
        url,
        responseType: 'json',
      })
      const data: WebPurifyCheckRespondPayload = res?.data
      const hasProfanityWordsCode: WebPurifyCheckResponseCode =
        data?.rsp?.found ?? WebPurifyCheckResponseCode.NO_PROFANITY_WORDS
      if (
        hasProfanityWordsCode === WebPurifyCheckResponseCode.HAS_PROFANITY_WORDS
      ) {
        return true
      }
      return false
    } catch (error) {
      console.log('purify check failed error', error)
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: 'Web Purify check failed.',
      })
    }
  }
}
