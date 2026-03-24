import axios from 'axios'
import { CONFIG } from '../config/Config'

export enum BackgroundRemoveAPIImageFormat {
  PNG = 'png',
  JPG = 'jpg',
  ZIP = 'zip',
}

export class RemoveBGHelper {
  // Removebg API: www.remove.bg
  public static async removeBackground(
    imageURL: string,
    imageFormat: string,
  ): Promise<Buffer> {
    const formData = new FormData()
    formData.append('size', 'auto')
    formData.append('image_url', imageURL)
    formData.append('format', imageFormat)

    if (!CONFIG.REMOVE_BG_API_KEY) {
      throw new Error('No REMOVE_BG_API_KEY!')
    }

    const response = await axios({
      url: 'https://api.remove.bg/v1.0/removebg',
      method: 'POST',
      headers: { 'X-Api-Key': CONFIG.REMOVE_BG_API_KEY },
      data: formData,
      responseType: 'arraybuffer',
    })

    if (response.status === 200) {
      return response.data as Buffer
    } else {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
  }
}
