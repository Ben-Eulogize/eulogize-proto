import { S3Helper } from '../src/ts/utils/S3Helper'
import BBPromise from 'bluebird'
import fsExtra from 'fs-extra'
import sharp from 'sharp'
import {
  BACKGROUND_IMAGES_BASE_PATH,
  BackgroundImageTypesMap,
} from '@eulogise/core'

const DOWNLOAD_ORIGINAL_PATH = 'downloads/original'
const DOWNLOAD_CONVERTED_PATH = 'downloads/converted'

class ReduceBackgroundImageSizeScript {
  public static async downloadBackgroundImage(imageAsset: {
    Key: string
    LastModify: Date
    Size: number
    ETag: string
    StorageClass: string
  }) {
    const key = imageAsset.Key
    const fileName = key.split('/').pop()
    console.log('fileName', fileName)
    const imageTypeStr = this.getImageTypeStrByFileName(fileName!)
    console.log('imageTypeStr', imageTypeStr)
    fsExtra.ensureDirSync(`./${DOWNLOAD_ORIGINAL_PATH}/${imageTypeStr}`)
    await S3Helper.downloadFile({
      key,
      downloadPath: `./${DOWNLOAD_ORIGINAL_PATH}/${imageTypeStr}/${fileName}`,
    })
  }

  public static async downloadBackgroundImages() {
    const s3BackgroundImages = await S3Helper.getAllBackgroundImages()
    fsExtra.ensureDirSync(DOWNLOAD_ORIGINAL_PATH)
    fsExtra.ensureDirSync(DOWNLOAD_CONVERTED_PATH)
    const slideshowAndTvWelcomeScreenBackgroundImages =
      s3BackgroundImages.filter((imageAsset) => {
        const imageKey = imageAsset.Key
        return (
          imageKey.includes('SLIDESHOW_USA.jpg') ||
          imageKey.includes('SLIDESHOW.jpg') ||
          imageKey.includes('TV_WELCOME_SCREEN_LEFT.jpg') ||
          imageKey.includes('TV_WELCOME_SCREEN_RIGHT.jpg')
        )
      })
    console.log(
      'slideshowAndTvWelcomeScreenBackgroundImages',
      slideshowAndTvWelcomeScreenBackgroundImages,
    )

    await BBPromise.map(
      slideshowAndTvWelcomeScreenBackgroundImages,
      async (imageAsset) => {
        await this.downloadBackgroundImage(imageAsset)
      },
      { concurrency: 50 },
    )
  }

  private static getImageTypeStrByFileName(fileName: string): string {
    const keys = Object.keys(BackgroundImageTypesMap)
    return keys.find((key) => fileName.includes(`${key}.jpg`))!
  }

  private static async reduceBackgroundImageSize(fileName: string) {
    console.log('fileName', fileName)
    const originalImagePath = `${DOWNLOAD_ORIGINAL_PATH}/${fileName}`
    const convertedImagePath = `${DOWNLOAD_CONVERTED_PATH}/${fileName}`
    console.log('originalImagePath', originalImagePath)
    console.log('convertedImagePath', convertedImagePath)

    const imageType =
      BackgroundImageTypesMap[this.getImageTypeStrByFileName(fileName)]
    console.log('imageType', imageType)
    const { width, height } = imageType
    await sharp(originalImagePath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(convertedImagePath)
  }

  public static async reduceBackgroundImageSizes() {
    const originalImages = fsExtra.readdirSync(DOWNLOAD_ORIGINAL_PATH)
    await BBPromise.map(originalImages, this.reduceBackgroundImageSize, {
      concurrency: 1,
    })
  }

  public static async uploadConvertedBackgroundImages() {
    const convertedCategoryFolders = fsExtra.readdirSync(
      DOWNLOAD_CONVERTED_PATH,
    )
    console.log('convertedCategoryFolders', convertedCategoryFolders)
    const convertedImages = convertedCategoryFolders.reduce((acc, folder) => {
      if (folder === '.DS_Store') {
        return acc
      }
      const images = fsExtra.readdirSync(`${DOWNLOAD_CONVERTED_PATH}/${folder}`)
      return [...acc, ...images]
    }, [] as string[])
    console.log('convertedImages', JSON.stringify(convertedImages))

    await BBPromise.map(
      convertedImages,
      async (fileName) => {
        if (fileName === '.DS_Store') {
          throw new Error('.DS_Store file found')
        }
        const imageTypeStr = this.getImageTypeStrByFileName(fileName)
        const imageType = BackgroundImageTypesMap[imageTypeStr]
        const region = imageType.region
        const backgroundImageId = fileName.replace(`_${imageTypeStr}.jpg`, '')
        const key = `${BACKGROUND_IMAGES_BASE_PATH}/${backgroundImageId}/${region}/${fileName}`
        const filePath = `${DOWNLOAD_CONVERTED_PATH}/${imageTypeStr}/${fileName}`
        const fileContent = fsExtra.readFileSync(filePath)!
        await S3Helper.uploadFile({
          key,
          fileContent,
        })
      },
      { concurrency: 10 },
    )
  }

  public static async start() {
    // Please comment out the step 1 by 1 and run the script

    // Step 1
    // await this.downloadBackgroundImages()

    // Step 2
    // Use Automator instead. sharp doesn't work on same jpg images.
    // await this.reduceBackgroundImageSizes()

    // Step 3
    await this.uploadConvertedBackgroundImages()
  }
}

// Please comment out the step 1 by 1 and run the script
;(async () => {
  await ReduceBackgroundImageSizeScript.start()
})()
