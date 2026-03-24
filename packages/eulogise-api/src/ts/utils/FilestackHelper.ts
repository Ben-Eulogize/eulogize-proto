import { promisify } from 'util'
import fs from 'fs'
import * as FilestackClient from 'filestack-js'

import axios from 'axios'
import * as uuid from 'uuid'
import { CONFIG } from '../config/Config'
import { IImageAssetContent } from '@eulogise/core'
import { heicConvert } from './heicConvert'
import { Readable } from 'node:stream'

export interface IFilestackResponse {
  handle: string
  url: string
  filename: string
  size: number
  mimetype: string
  status: string
  key: string
  container: string
}

export interface IFaceDetectionResult {
  faces: Array<{
    topLeftX: number
    topLeftY: number
    width: number
    height: number
    confidence: number
  }>
  imageWidth: number
  imageHeight: number
}

const filestackClient = FilestackClient.init(CONFIG.FILESTACK_API)

export class FilestackHelper {
  public static generateFilePath(suffix: string = ''): string {
    return `${CONFIG.TMP_DIR}/${uuid.v4()}${suffix}`
  }

  public static async convertHEICImageToJPG(
    imagePath: string,
  ): Promise<string | undefined> {
    try {
      const imageFileSuffix = '.jpg'
      const inputBuffer = await promisify(fs.readFile)(imagePath)
      const outputBuffer = await heicConvert({
        buffer: inputBuffer, // the HEIC file buffer
        format: 'JPEG', // output format
      })
      if (!outputBuffer) {
        return
      }

      // save file
      const outputFilePath: string = this.generateFilePath(imageFileSuffix)
      await promisify(fs.writeFile)(outputFilePath, outputBuffer)
      return outputFilePath
      /*
      // resize image
      const resizeImageFilePath: string = this.generateFilePath(imageFileSuffix)
      const result = await sharp(imagePath)
        .resize(1000)
        .toFile(resizeImageFilePath)
      return resizeImageFilePath
*/
    } catch (ex) {
      console.log('Exception', ex)
      throw new Error(ex)
    }
  }

  public static async downloadImage(filestackHandle: string): Promise<string> {
    const outputLocationPath: string = this.generateFilePath()
    const imageUrl: string = `https://cdn.filestackcontent.com/${filestackHandle}`
    const writer = fs.createWriteStream(outputLocationPath)

    const resp = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
    })

    return new Promise((resolve, reject) => {
      // @ts-ignore
      resp.data.pipe(writer)
      let error: any = null
      writer.on('error', (err: any) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(outputLocationPath)
        }
      })
    })
  }

  public static async uploadFile(
    filePath: string,
  ): Promise<IFilestackResponse> {
    return filestackClient.upload(filePath)
  }

  public static async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks = []
    for await (const chunk of stream) {
      chunks.push(chunk)
    }
    return Buffer.concat(chunks)
  }

  public static async uploadFileByBuffer(
    rbgBuffer: Buffer,
  ): Promise<IFilestackResponse> {
    try {
      return filestackClient.upload(
        rbgBuffer,
        {},
        {
          filename: uuid.v4(),
        },
      )
    } catch (error) {
      throw new Error(`Cannot uploadFileByBuffer to Filestack, error: ${error}`)
    }
  }

  public static async convertFilestackImage(
    assetContent: IImageAssetContent,
  ): Promise<IImageAssetContent | undefined> {
    // download image
    const imageFilePath: string = await this.downloadImage(
      assetContent.filestackHandle,
    )

    // convert file
    const jpgImageFilePath: string | undefined =
      await this.convertHEICImageToJPG(imageFilePath)

    if (!jpgImageFilePath) {
      return assetContent
    }

    // upload new file to filestack
    const uploadResp: IFilestackResponse = await this.uploadFile(
      jpgImageFilePath,
    )
    return {
      filename: uploadResp.key.split('/').pop()!,
      filepath: uploadResp.key,
      filestackHandle: uploadResp.handle,
    }
  }

  public static async downloadTrimmedAudio(
    filestackHandle: string,
    filePath: string,
  ): Promise<void> {
    const audioUrl: string = `https://cdn.filestackcontent.com/${filestackHandle}`
    const writer = fs.createWriteStream(filePath)

    const resp = await axios({
      method: 'GET',
      url: audioUrl,
      responseType: 'stream',
    })

    return new Promise((resolve, reject) => {
      // @ts-ignore
      resp.data.pipe(writer)
      let error: any = null
      writer.on('error', (err: any) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve()
        }
      })
    })
  }

  public static async detectImageSize(
    filestackHandle: string,
  ): Promise<{ width: number; height: number }> {
    try {
      const imageSizeUrl = `https://cdn.filestackcontent.com/imagesize/${filestackHandle}`
      const imageSizeResponse = await axios({
        method: 'GET',
        url: imageSizeUrl,
        headers: {
          Accept: 'application/json',
        },
      })

      const imageSizeResponseData = imageSizeResponse.data
      if (!imageSizeResponseData) {
        throw new Error('Image size data is missing')
      }

      return {
        width: imageSizeResponseData.width as number,
        height: imageSizeResponseData.height as number,
      }
    } catch (error: any) {
      console.error('Error detecting image size:', error)
      // Handle axios errors more gracefully
      if (error.response?.status === 400) {
        throw new Error(
          `Failed to detect image size for handle ${filestackHandle}: Invalid request or unsupported image format`,
        )
      }
      throw new Error(
        `Failed to detect image size for handle ${filestackHandle}: ${
          error.message || error
        }`,
      )
    }
  }

  public static async detectFaces(
    filestackHandle: string,
  ): Promise<IFaceDetectionResult> {
    try {
      // Use Filestack's Processing API to detect faces with metadata output
      // The metadata output provides JSON response with face detection data
      const faceDetectionUrl = `https://process.filestackapi.com/${CONFIG.FILESTACK_API}/detect_faces=export:true/${filestackHandle}`

      const faceDetectionResponse = await axios({
        method: 'GET',
        url: faceDetectionUrl,
        headers: {
          Accept: 'application/json',
        },
      })

      const imageSizeUrl = `https://cdn.filestackcontent.com/imagesize/${filestackHandle}`
      const imageSizeResponse = await axios({
        method: 'GET',
        url: imageSizeUrl,
        headers: {
          Accept: 'application/json',
        },
      })

      const imageSizeResponseData = imageSizeResponse.data
      const faceDetectionResponseData = faceDetectionResponse.data
      if (!faceDetectionResponseData || !imageSizeResponseData) {
        throw new Error('Face detection or image size data is missing')
      }

      // Parse the response - Filestack returns an array of face objects
      const facesData = Array.isArray(faceDetectionResponseData)
        ? faceDetectionResponseData
        : []

      return {
        faces: facesData.map((face: any) => ({
          topLeftX: face.x || 0,
          topLeftY: face.y || 0,
          width: face.width || 0,
          height: face.height || 0,
          confidence: face.confidence || 1.0, // Default to 1.0 if not provided
        })),
        imageWidth: imageSizeResponseData.width as number,
        imageHeight: imageSizeResponseData.height as number,
      }
    } catch (error: any) {
      console.error('Error detecting faces:', error)
      // Handle axios errors more gracefully
      if (error.response?.status === 400) {
        throw new Error(
          `Failed to detect faces for handle ${filestackHandle}: Invalid request or unsupported image format`,
        )
      }
      throw new Error(
        `Failed to detect faces for handle ${filestackHandle}: ${
          error.message || error
        }`,
      )
    }
  }
}
