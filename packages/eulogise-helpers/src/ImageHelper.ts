import axios from 'axios'
import * as filestack from 'filestack-js'
import { EulogiseClientConfig } from '@eulogise/client-core'
import {
  EulogiseImageOrientation,
  GetImageObject,
  GetImageUrlOption,
  IFilestackImageEnhancePreset,
  IImageAsset,
  IImageAssetContent,
  IImageSize,
} from '@eulogise/core'
import moment from 'moment'
import { STYLE as GLOBAL_STYLE } from '@eulogise/client-core'

const STYLE = {
  THUMBNAIL_IMAGE_SIZE: 500,
  SM_SLIDESHOW_IMAGE_DEFAULT_WIDTH: 480,
  SM_SLIDESHOW_IMAGE_DEFAULT_HEIGHT: 270,
  MD_SLIDESHOW_IMAGE_DEFAULT_WIDTH: 960,
  MD_SLIDESHOW_IMAGE_DEFAULT_HEIGHT: 540,
  LG_SLIDESHOW_IMAGE_DEFAULT_WIDTH: 1200,
  LG_SLIDESHOW_IMAGE_DEFAULT_HEIGHT: 675,
}

export class ImageHelper {
  private static readonly MAX_RETRY_ATTEMPTS = 3
  private static readonly INITIAL_RETRY_DELAY = 1000 // 1 second

  public static async storeFilestackImage(
    filestackHandle: string,
    options?: { filestackApi?: string; filestackCdn?: string },
  ): Promise<filestack.PickerFileMetadata> {
    if (!filestackHandle?.trim()) {
      throw new Error('Invalid filestack handle provided')
    }

    /*
    const filestackClient = filestack.init(
      options?.filestackApi ?? EulogiseClientConfig.FILESTACK_API_KEY!,
    )
*/
    const size = 1280
    const url = `${
      options?.filestackCdn ?? EulogiseClientConfig.FILESTACK_CDN
    }/auto_image/resize=width:${size},height:${size}/output=format:png/store/${filestackHandle}`
    /*
    const url = `${
      options?.filestackCdn ?? EulogiseClientConfig.FILESTACK_CDN
    }/auto_image/resize=width:${size},height:${size}/output=format:jpg/${filestackHandle}`
*/

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= this.MAX_RETRY_ATTEMPTS; attempt++) {
      try {
        console.log(
          `Attempting to store Filestack image (attempt ${attempt}/${this.MAX_RETRY_ATTEMPTS})`,
          {
            filestackHandle,
            url,
          },
        )
        /*
        const storedFile = (await filestackClient.storeURL(
          url,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
          },
        )) as filestack.PickerFileMetadata
*/
        const { data: resp } = await axios({
          method: 'get',
          headers: {
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
          },
          url,
        })
        console.log('resp', resp)
        return {
          container: resp.container,
          filename: resp.filename,
          handle: resp.handle,
          key: resp.key,
          size: resp.size,
          url: resp.url,
        } as filestack.PickerFileMetadata
      } catch (error: any) {
        const isLastAttempt = attempt === this.MAX_RETRY_ATTEMPTS

        console.error(`Filestack storage attempt ${attempt} failed:`, {
          error: error.message,
          filestackHandle,
          url,
          isLastAttempt,
        })

        if (isLastAttempt) {
          // Final attempt failed, throw the error
          throw new Error(
            `Failed to store Filestack image after ${this.MAX_RETRY_ATTEMPTS} attempts: ${error.message}`,
          )
        }

        // Wait before retrying (exponential backoff)
        const delay = this.INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)
        console.log(`Retrying in ${delay}ms...`)
        await this.delay(delay)
      }
    }

    // This should never be reached, but TypeScript requires it
    throw new Error('Unexpected error in Filestack storage retry loop')
  }

  /**
   * Simple delay utility for retry logic
   */
  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  public static getImagePreloadSize({
    image,
    width = GLOBAL_STYLE.IMAGE_LIBRARY_ITEM_WIDTH as number,
  }: {
    image: IImageAsset
    width?: number
  }): IImageSize {
    const {
      content: { width: imageWidth, height: imageHeight },
    } = image
    if (!imageWidth || !imageHeight) {
      return { width, height: Math.round(width * 0.75) }
    }
    const imageScale = imageWidth / imageHeight
    return {
      width,
      height: Math.round(width / imageScale),
    }
  }

  public static determineWidthHeightByImageScale(
    imageWidth: number,
    imageHeight: number,
    containerWidth: number,
    containerHeight: number,
  ): {
    width: string
    height: string
  } {
    const imageScale = imageWidth / imageHeight
    const containerScale = containerWidth / containerHeight

    if (imageScale === containerScale) {
      return {
        height: '100%',
        width: '100%',
      }
    } else if (imageScale < containerScale) {
      return {
        height: '100%',
        width: 'auto',
      }
    } else if (imageScale > containerScale) {
      return {
        height: 'auto',
        width: '100%',
      }
    }
    return {
      height: 'auto',
      width: 'auto',
    }
  }

  public static async getImageOrientation(imageAsset: IImageAssetContent) {
    const { width, height } = imageAsset
    if (width && height) {
      return ImageHelper.getImageOrientationBySize({
        width,
        height,
      })
    }
    const imageSize = await ImageHelper.getImageSize(imageAsset)
    return ImageHelper.getImageOrientationBySize(imageSize)
  }

  public static getClientLogo(imageHandle: string): string {
    return `${EulogiseClientConfig.AWS_S3_URL}/clients/logos/${imageHandle}`
  }

  public static getImageUrl(
    image: GetImageObject,
    options?: GetImageUrlOption,
  ): string | undefined {
    if (!image) {
      return
    }
    const { filestackHandle, url, filepath, filename, preset } = image
    const {
      width,
      height,
      caseId,
      useProdS3BucketUrl = false,
      isFormatToJpg = false,
      resizeMethod = 'fit:max',
    } = options || {}
    const enhancePresetTask = `enhance=preset:${preset}`

    if (filestackHandle) {
      const shouldConvertToPng = !/\.(jpg|png)$/.test(filename ?? '')
      let imageUrl = `${EulogiseClientConfig.FILESTACK_CDN}`
      const transformationSegments: string[] = ['auto_image']

      if (width && height) {
        transformationSegments.push(
          `resize=${
            resizeMethod === '' ? '' : `${resizeMethod},`
          }width:${width},height:${height}`,
        )
        const outputFormat = isFormatToJpg
          ? `output=format:jpg`
          : shouldConvertToPng
          ? `output=format:png`
          : ''
        if (outputFormat) {
          transformationSegments.push(outputFormat)
        }
      } else if (isFormatToJpg) {
        transformationSegments.push('output=format:jpg')
      }

      if (preset && preset !== IFilestackImageEnhancePreset.NULL) {
        transformationSegments.push(enhancePresetTask)
      }

      if (transformationSegments.length) {
        imageUrl = imageUrl + `/${transformationSegments.join('/')}`
      }

      imageUrl = imageUrl + `/${filestackHandle}`
      return imageUrl
    }

    if (url) {
      // check if it is url. If it is not url, use AWS_S3_URL
      if (!url.startsWith('http')) {
        return `${EulogiseClientConfig.AWS_S3_URL}/${url}`
      }
      return url
    }

    if (filepath) {
      if (useProdS3BucketUrl) {
        return `${EulogiseClientConfig.AWS_S3_URL}/${filepath}`
      }
      return `${EulogiseClientConfig.AWS_S3_URL}/${filepath}`
    }

    // TODO: Remove filename asset fetching everywhere
    // either a FileStack.js handle or filepath should be present on every user uploaded asset
    return `${EulogiseClientConfig.AWS_S3_URL}/cases/${caseId}/gallery/${filename}`
  }

  public static calculateAspectRatio({
    width,
    height,
  }: {
    width: number
    height: number
  }): string {
    // Calculate the greatest common divisor (GCD) using Euclid's algorithm
    const gcd = (a: number, b: number): number => {
      if (b === 0) {
        return a
      }
      return gcd(b, a % b)
    }

    // Calculate the GCD of width and height
    const commonDivisor = gcd(width, height)

    // Simplify the aspect ratio by dividing width and height by the GCD
    const aspectWidth = width / commonDivisor
    const aspectHeight = height / commonDivisor

    // Return the aspect ratio in string format
    return `${aspectWidth}:${aspectHeight}`
  }

  public static async getImageSizeViaFilestack(
    handle: string,
  ): Promise<IImageSize> {
    const { data } = await axios(
      `${EulogiseClientConfig.FILESTACK_CDN}/imagesize/${handle}`,
    )
    return data
  }

  public static async getImageSizeByUrl(
    imageUrl: string,
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      ImageHelper.preloadImage(imageUrl, (event) => {
        resolve({ width: event.width, height: event.height })
      })
    })
  }

  public static async checkImageAvailability(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(true) // Image is available
      img.onerror = () => reject(false) // Image is not available
      img.src = url
    })
  }

  public static async getImageFileSize(url: string): Promise<string> {
    const response = await fetch(url)
    const blob = await response.blob()
    return ImageHelper.bytesToSize(blob.size)
  }

  public static bytesToSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes}b`
    }
    const toFixedWithTrailingZero = (num: number) => {
      return num.toFixed(2).replace(/\.00$/, '')
    }
    if (bytes < 1024 * 1024) {
      return `${toFixedWithTrailingZero(bytes / 1024)}kb`
    }

    return `${toFixedWithTrailingZero(bytes / (1024 * 1024))}mb`
  }

  // most efficient way to get image size by file metadata
  public static async getImageSizeByFile(
    file: filestack.PickerFileMetadata,
  ): Promise<IImageSize> {
    return new Promise((resolve, reject) => {
      // Check if this is a HEIC file
      const isHeicFile =
        file.mimetype === 'image/heic' ||
        file.mimetype === 'image/heif' ||
        file.filename?.toLowerCase().endsWith('.heic') ||
        file.filename?.toLowerCase().endsWith('.heif')

      const img = new Image()
      let url: string | null = null

      // For HEIC files uploaded through Filestack, they should be converted server-side
      // The file.url should point to the converted version
      if (isHeicFile && file.url) {
        // Use the Filestack URL which should be the converted version
        img.src = file.url
      } else if (file.originalFile && file.originalFile instanceof Blob) {
        // Local file - use createObjectURL
        url = URL.createObjectURL(file.originalFile)
        img.src = url
      } else if (file.url) {
        // Remote file (Google Drive, etc.) - use the file URL directly
        img.src = file.url
      } else {
        reject(new Error('No valid image source found for size check'))
        return
      }

      img.onload = function () {
        if (url) {
          URL.revokeObjectURL(url) // Clean up memory only for blob URLs
        }
        const dimensions = {
          width: (this as HTMLImageElement).naturalWidth,
          height: (this as HTMLImageElement).naturalHeight,
        }
        resolve(dimensions)
      }

      img.onerror = function () {
        if (url) {
          URL.revokeObjectURL(url) // Clean up memory only for blob URLs
        }
        // Check if it might be a HEIC file that wasn't properly converted
        if (
          file.filename?.toLowerCase().endsWith('.heic') ||
          file.filename?.toLowerCase().endsWith('.heif')
        ) {
          // Try to use Filestack's conversion URL if available
          if (file.handle && !img.src.includes('/convert')) {
            // Attempt to load the converted version from Filestack
            img.src = `https://cdn.filestackcontent.com/output=format:jpg/${file.handle}`
          } else {
            reject(
              new Error(
                'HEIC/HEIF files cannot be processed directly. The file may need to be converted server-side first.',
              ),
            )
          }
        } else {
          reject(new Error('Error loading image for dimension check'))
        }
      }
    })
  }

  public static getImageOrientationBySize({
    width,
    height,
  }: IImageSize): EulogiseImageOrientation {
    if (width > height) {
      return EulogiseImageOrientation.LANDSCAPE
    } else if (width < height) {
      return EulogiseImageOrientation.PORTRAIT
    }
    return EulogiseImageOrientation.SQUARE
  }

  public static async getImageOrientationByFile(
    file: filestack.PickerFileMetadata,
  ): Promise<EulogiseImageOrientation> {
    const { width, height } = await ImageHelper.getImageSizeByFile(file)
    return ImageHelper.getImageOrientationBySize({ width, height })
  }

  public static async getImageSize(image: GetImageObject): Promise<IImageSize> {
    return new Promise((resolve) => {
      // @ts-ignore
      const imageUrl: string = ImageHelper.getImageUrl(image)
      ImageHelper.preloadImage(imageUrl, (event: any) => {
        resolve({
          width: event.width,
          height: event.height,
        })
      })
    })
  }

  public static getSlideshowImageUrlByCaseId({
    image,
    caseId,
    size = 'MD',
    options,
    imageOptions,
  }: {
    image: GetImageObject
    caseId: string
    size: 'SM' | 'MD' | 'LG'
    options?: { isStaticAssets?: boolean }
    imageOptions?: GetImageUrlOption
  }) {
    return ImageHelper.getImageUrl(image, {
      useProdS3BucketUrl: !!options?.isStaticAssets,
      width: Number(STYLE[`${size}_SLIDESHOW_IMAGE_DEFAULT_WIDTH`]),
      height: Number(STYLE[`${size}_SLIDESHOW_IMAGE_DEFAULT_HEIGHT`]),
      caseId,
      isFormatToJpg: true,
      ...imageOptions,
    })
  }

  public static getThumbnailImageUrl(image: GetImageObject) {
    return ImageHelper.getImageUrl(image, {
      width: Number(STYLE.THUMBNAIL_IMAGE_SIZE),
      height: Number(STYLE.THUMBNAIL_IMAGE_SIZE),
      isFormatToJpg: !image.isRemovedBackgroundImage,
    })
  }

  public static preloadImage(src: string, loaded: (event: any) => void) {
    // @ts-ignore
    const img = new Image()
    img.onload = function () {
      loaded(this)
    }
    img.src = src
  }

  public static async preloadImages({
    imageAssets,
    progress,
    loaded,
    imageOptions,
  }: {
    imageAssets: Array<GetImageObject>
    progress: (progress: number) => void
    loaded: () => void
    imageOptions?: GetImageUrlOption
  }) {
    if (!imageAssets || imageAssets.length === 0) {
      loaded()
      return
    }
    let currentProgress = 0
    const progressSize = 100 / imageAssets.length

    const promises = imageAssets.map((image) => {
      return new Promise((resolve, reject) => {
        const imageUrl = ImageHelper.getImageUrl(image, imageOptions)
        if (!imageUrl) {
          reject(`Image URL is not defined for image: ${image}`)
          return
        }

        ImageHelper.preloadImage(imageUrl, () => {
          currentProgress += progressSize
          progress(Math.ceil(currentProgress))
          resolve(null)
        })
      })
    })

    await Promise.all(promises)
    loaded()
  }

  public static sortImagesDescByUpdatedDate(
    assetImages: Array<IImageAsset>,
  ): Array<IImageAsset> {
    const formattedImages: Array<IImageAsset> = assetImages.map(
      (img: IImageAsset) => {
        return {
          ...img,
          content: {
            ...img.content,
            createdAt: moment(img?.createdAt).unix(),
            updatedAt: moment(img?.updatedAt).unix(),
          },
        }
      },
    )
    return formattedImages.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
  }

  public static calculateEffectiveDPIFromContainer({
    actualImageSize,
    renderedImageSize,
    screenDPI = 96,
  }: {
    actualImageSize: IImageSize
    renderedImageSize: IImageSize
    screenDPI?: number
  }): { x: number; y: number } | null {
    try {
      if (!actualImageSize.width || !actualImageSize.height) {
        return null
      }

      if (renderedImageSize.width <= 0 || renderedImageSize.height <= 0) {
        return null
      }

      // Convert rendered dimensions to physical inches
      const renderedWidthInches = renderedImageSize.width / screenDPI
      const renderedHeightInches = renderedImageSize.height / screenDPI

      // Calculate DPI based on actual image pixels over rendered physical size
      return {
        x: Math.round(actualImageSize.width / renderedWidthInches),
        y: Math.round(actualImageSize.height / renderedHeightInches),
      }
    } catch (error) {
      console.error('Error calculating effective DPI from container:', error)
      return null
    }
  }

  public static check200DPIFromRenderedSize(params: {
    actualImageSize: IImageSize
    renderedImageSize: IImageSize
    screenDPI?: number
  }): boolean {
    const { actualImageSize, renderedImageSize, screenDPI = 96 } = params
    if (
      actualImageSize.width === undefined ||
      actualImageSize.height === undefined ||
      renderedImageSize.width === undefined ||
      renderedImageSize.height === undefined
    ) {
      return true
    }
    const dpi = ImageHelper.calculateEffectiveDPIFromContainer({
      actualImageSize,
      renderedImageSize,
      screenDPI,
    })

    if (!dpi) {
      return false
    }

    // Check if both x and y DPI are at least 200
    return dpi.x >= 200 && dpi.y >= 200
  }
}
