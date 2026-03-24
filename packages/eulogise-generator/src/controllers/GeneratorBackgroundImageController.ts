import { PuppeteerCardProductHelper } from '../core/PuppeteerCardProductHelper'
import {
  BackgroundImageProcessPayload,
  EditedBackgroundImageProcessPayload,
} from '../types/GeneratorProcessJob.types'
import { S3Helper } from '../core/S3Helper'
import { BackgroundImageTypesMap } from '@eulogise/core'
import { BackgroundImageHelper } from '@eulogise/helpers'

export class GeneratorBackgroundImageController {
  public static async generateBackgroundImage(
    payload: BackgroundImageProcessPayload,
    retries: number = 0,
  ) {
    try {
      const { backgroundImageId, type } = payload
      const region = BackgroundImageTypesMap[type].region
      console.log(`generateBackgroundImage`, region)
      const { filePath, fileName, htmlFilePath } =
        await PuppeteerCardProductHelper.generateBackgroundImage(payload)

      const s3Path = `${BackgroundImageHelper.getBackgroundImagesPath(
        backgroundImageId,
      )}/${region}/${fileName}`

      if (retries === 0) {
        console.log('delete existing background image', s3Path)
        try {
          await S3Helper.deleteObject({
            key: s3Path,
          })
        } catch (ex) {
          console.log(`S3 Key does not existing (${s3Path}). Not deleting`)
        }
      }

      await this.uploadScreenshot({
        filePath,
        htmlFilePath,
        s3Path,
      })
    } catch (ex) {
      console.log('Error in generateBackgroundImage', ex)
      if (retries < 3) {
        console.log(`Retrying ${retries}`)
        await this.generateBackgroundImage(payload, retries + 1)
      }
      console.log('Error in generateBackgroundImage. No more retries')
    }
  }

  private static async uploadScreenshot({
    filePath,
    htmlFilePath,
    s3Path,
  }: {
    filePath: string
    htmlFilePath: string
    s3Path: string
  }): Promise<void> {
    await Promise.all([
      S3Helper.uploadToS3({
        filePath,
        s3Path,
        isCheck: true,
      }),
      S3Helper.uploadToS3({
        filePath: htmlFilePath,
        s3Path: `${s3Path}.html`,
        isCheck: false,
      }),
    ])
  }

  public static async generateEditedBackgroundImage(
    payload: EditedBackgroundImageProcessPayload,
    retries: number = 0,
  ) {
    try {
      const { backgroundImageId } = payload
      console.log(`generateEditedBackgroundImage payload`, payload)
      const { filePath, fileName, htmlFilePath } =
        await PuppeteerCardProductHelper.generateEditedBackgroundImage(payload)

      const s3Path = `${BackgroundImageHelper.getBackgroundImagesPath(
        backgroundImageId,
      )}/${fileName}`
      await this.uploadScreenshot({
        filePath,
        htmlFilePath,
        s3Path,
      })
    } catch (ex) {
      console.log('Error in generateEditedBackgroundImage', ex)
      if (retries < 3) {
        console.log(`Retrying ${retries}`)
        await this.generateEditedBackgroundImage(payload, retries + 1)
      }
      console.log('Error in generateEditedBackgroundImage. No more retries')
    }
  }
}
