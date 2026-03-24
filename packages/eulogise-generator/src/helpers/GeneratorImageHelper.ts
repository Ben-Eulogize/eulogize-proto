import axios from 'axios'
import fsExtra from 'fs-extra'
import { ImageHelper, UtilHelper } from '@eulogise/helpers'
import { EulogiseImageSize, GetImageObject } from '@eulogise/core'
import { GENERATOR_CONFIG } from '../config'

export class GeneratorImageHelper {
  /**
   * Validates that a file is a valid JPEG image by checking its header and footer markers.
   * JPEG files should start with FFD8 (SOI marker) and end with FFD9 (EOI marker).
   */
  public static isValidJpeg(filepath: string): boolean {
    try {
      const buffer = fsExtra.readFileSync(filepath)
      if (buffer.length < 4) return false

      // Check SOI (Start of Image) marker: FFD8
      const startsCorrectly = buffer[0] === 0xff && buffer[1] === 0xd8

      // Check EOI (End of Image) marker: FFD9
      const endsCorrectly =
        buffer[buffer.length - 2] === 0xff && buffer[buffer.length - 1] === 0xd9

      return startsCorrectly && endsCorrectly
    } catch (error) {
      console.error('Error validating JPEG:', error)
      return false
    }
  }

  /**
   * Validates that a file is a valid PNG image by checking its header signature.
   * PNG files should start with the 8-byte signature: 89 50 4E 47 0D 0A 1A 0A
   */
  public static isValidPng(filepath: string): boolean {
    try {
      const buffer = fsExtra.readFileSync(filepath)
      if (buffer.length < 8) return false

      // PNG signature: 89 50 4E 47 0D 0A 1A 0A
      const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
      return pngSignature.every((byte, i) => buffer[i] === byte)
    } catch (error) {
      console.error('Error validating PNG:', error)
      return false
    }
  }

  /**
   * Validates an image file based on its extension.
   */
  public static isValidImage(filepath: string): boolean {
    const ext = filepath.toLowerCase().split('.').pop()
    if (ext === 'jpg' || ext === 'jpeg') {
      return this.isValidJpeg(filepath)
    } else if (ext === 'png') {
      return this.isValidPng(filepath)
    }
    // For other formats, just check file size
    try {
      const stats = fsExtra.statSync(filepath)
      return stats.size > 1000 // At least 1KB
    } catch {
      return false
    }
  }

  public static async downloadImage(url: string, filepath: string) {
    console.log('downloading image', { url, filepath })

    let response
    try {
      // Use arraybuffer instead of stream to ensure complete download
      response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer',
        timeout: 3000, // 3 second timeout
      })
    } catch (error: any) {
      const status = error?.response?.status
      const statusText = error?.response?.statusText
      console.error(
        `Failed to download image: ${url} - status: ${status} ${statusText}`,
        error.message,
      )
      throw new Error(
        `Failed to download image: ${url} - ${status ?? 'unknown'} ${
          statusText ?? error.message
        }`,
      )
    }

    // Write the complete buffer to file
    await fsExtra.writeFile(filepath, Buffer.from(response.data))

    // Validate the downloaded file
    const stats = await fsExtra.stat(filepath)
    console.log(`Downloaded image size: ${stats.size} bytes`)

    if (stats.size < 1000) {
      throw new Error(
        `Downloaded file is suspiciously small: ${stats.size} bytes`,
      )
    }

    // Validate image integrity
    if (!this.isValidImage(filepath)) {
      console.warn(
        `Downloaded image may be corrupted or incomplete: ${filepath}`,
      )
      // Remove the corrupted file so it can be re-downloaded
      await fsExtra.remove(filepath)
      throw new Error(`Downloaded image failed validation: ${filepath}`)
    }

    console.log('Image downloaded and validated successfully:', filepath)
  }

  public static getPreDownloadImageTmpDir = (cacheId?: string) => {
    const cacheDirBasePath = `${GENERATOR_CONFIG.TMP_DIR}/pre-download-images`
    return `${cacheDirBasePath}/${cacheId ?? new Date().getTime()}`
  }

  public static async prepareImages(
    htmlString: string,
    cacheId?: string,
  ): Promise<string> {
    const preDownloadImageUrls =
      GeneratorImageHelper.extractImageUrlsFromHtml(htmlString)
    const preDownloadImageTmpDir = this.getPreDownloadImageTmpDir(cacheId)
    fsExtra.ensureDirSync(preDownloadImageTmpDir)
    const paths = await Promise.all(
      preDownloadImageUrls.map(async (imageUrl: string) => {
        const downloadedFilePath = `${preDownloadImageTmpDir}/${imageUrl
          .split('/')
          .pop()!}`

        let needsDownload = false

        // Check if file exists
        if (!fsExtra.existsSync(downloadedFilePath)) {
          needsDownload = true
          console.log(
            'downloading the image since the image does not exist',
            downloadedFilePath,
          )
        } else {
          // File exists - validate it's not corrupted
          const stats = fsExtra.statSync(downloadedFilePath)
          if (stats.size < 1000) {
            console.log(
              'existing image is too small, likely corrupted, re-downloading',
              downloadedFilePath,
              stats.size,
            )
            needsDownload = true
          } else if (!this.isValidImage(downloadedFilePath)) {
            console.log(
              'existing image failed validation, re-downloading',
              downloadedFilePath,
            )
            needsDownload = true
          } else {
            console.log('image already exists and is valid', downloadedFilePath)
          }
        }

        if (needsDownload) {
          // Remove potentially corrupted file before re-downloading
          if (fsExtra.existsSync(downloadedFilePath)) {
            await fsExtra.remove(downloadedFilePath)
          }
          await this.downloadImage(imageUrl, downloadedFilePath)
          console.log('image downloaded', downloadedFilePath)
        }

        return {
          existingImageUrl: imageUrl,
          downloadedFilePath,
        }
      }),
    )

    console.log('prepareImages: paths', paths)
    let newHtmlString = htmlString
    // console.log('prepareImages: old htmlString', htmlString)
    // replace all existing image urls with the downloadFilePath in the htmlString
    paths.forEach(({ existingImageUrl, downloadedFilePath }) => {
      newHtmlString = newHtmlString.replace(
        existingImageUrl,
        `file://${downloadedFilePath}`,
      )
    })
    // console.log('prepareImages: new html string', newHtmlString)
    return newHtmlString
  }

  public static extractImageUrlsFromHtml(htmlString: string): string[] {
    // Regular expression to match <img> tags and extract their src attributes
    const imgUrlRegex = /<img[^>]+src="(https?:\/\/[^">]+)"/g
    const imageUrls = []
    let match

    // Loop to extract all image URLs
    while ((match = imgUrlRegex.exec(htmlString)) !== null) {
      imageUrls.push(match[1])
    }

    // mask urls
    const maskUrlRegex =
      /(?:mask-image|webkit-mask-image|background-image):\s*url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g
    while ((match = maskUrlRegex.exec(htmlString)) !== null) {
      imageUrls.push(match[1])
    }

    return UtilHelper.uniq(imageUrls)
  }

  public static async getImageDimensions(
    image: GetImageObject,
  ): Promise<EulogiseImageSize> {
    try {
      // add require instead of import so that only function (background image) will need to use the sharp AWS Layer
      const sharp = require('sharp')
      const imageUrl = ImageHelper.getImageUrl(image)!
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer', // Ensure response is treated as binary data
      })

      const imageData = Buffer.from(response.data, 'binary')
      const metadata = await sharp(imageData).metadata()

      return { width: metadata.width!, height: metadata.height! }
    } catch (error) {
      throw error
    }
  }
}
