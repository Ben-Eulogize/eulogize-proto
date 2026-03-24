// @ts-nocheck
import fsExtra from 'fs-extra'
import fs from 'fs'
import axios from 'axios'
import BluebirdPromise from 'bluebird'
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { GENERATOR_CONFIG } from '../config'
import { UtilHelper } from '@eulogise/helpers'
import { EulogiseRegion } from '@eulogise/core'
import { FrameHelper } from './FrameHelper'
import { CloudfrontHelper } from '../helpers/CloudfrontHelper'
import { SlackWebhookHelper } from '../helpers/SlackWebhookHelper'

const client = new S3Client()

type IUploadFileToS3Params = {
  filePath: string
  s3Path: string
  bucket?: string
  isCheck?: boolean
  noOfTries?: number
}

type IUploadFromUrlToS3Params = Omit<IUploadFileToS3Params, 'filePath'> & {
  imageUrl: string
  fileName: string
}

const cleanUp = async (key: string) => {
  try {
    const { AWS_S3_BUCKET } = GENERATOR_CONFIG

    const command = new DeleteObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
    })
    await client.send(command)
  } catch (error) {
    console.error(error)
  }
}

const saveFile = async ({
  readableStream,
  filePath,
}: {
  readableStream: ReadableStream
  filePath: string
}) => {
  return new Promise((resolve, reject) => {
    try {
      const fileStream = fs.createWriteStream(filePath)

      // Pipe the S3 object's data (readable stream) to the file stream
      readableStream.pipe(fileStream)

      // Handle the end of the stream (when download is complete)
      fileStream.on('close', () => {
        console.log(`File downloaded successfully to ${filePath}`)
        resolve()
      })

      // Handle errors
      fileStream.on('error', (err) => {
        console.error('Error writing to file:', err)
        reject(err)
      })
    } catch (error) {
      reject(error)
    }
  })
}

type BackgroundImageHierarchy = {
  [backgroundImageKey: string]: { ['AU' | 'USA']: Array<string> }
}
type BackgroundImageFileValidationSummary = {
  file: string
  isExists?: boolean
  isValid: boolean
  isCorrectImage: boolean
  imageSize: string
  expectedImageSize: string
}
type BackgroundImageRegionFileValidationSummary =
  Array<BackgroundImageFileValidationSummary>
type BackgroundImageValidationSummary = {
  [backgroundImageKey: string]: {
    [region: 'AU' | 'USA']: BackgroundImageRegionFileValidationSummary
  }
}
export class S3Helper {
  public static async deleteFolder(folderPrefix: string): Promise<void> {
    const BUCKET_NAME = GENERATOR_CONFIG.AWS_S3_BUCKET
    try {
      console.log(`Generator Deleting folder and its contents: ${folderPrefix}`)
      let totalDeleted = 0
      let continuationToken: string | undefined

      // List and delete objects in batches
      do {
        const listCommand = new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: folderPrefix,
          ContinuationToken: continuationToken,
        })

        const data = await client.send(listCommand)
        const objectsToDelete = (data.Contents || []).map((obj) => ({
          Key: obj.Key!,
        }))

        if (objectsToDelete.length > 0) {
          // S3 DeleteObjects can handle up to 1000 objects per request
          // Split into chunks of 1000 if needed
          const chunkSize = 1000
          for (let i = 0; i < objectsToDelete.length; i += chunkSize) {
            const chunk = objectsToDelete.slice(i, i + chunkSize)
            await client.send(
              new DeleteObjectsCommand({
                Bucket: BUCKET_NAME,
                Delete: { Objects: chunk },
              }),
            )
            totalDeleted += chunk.length
            console.log(
              `Deleted ${chunk.length} objects (${totalDeleted} total so far)`,
            )
          }
        }

        continuationToken = data.NextContinuationToken
      } while (continuationToken)

      // Optionally delete the folder marker
      await client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: folderPrefix,
        }),
      )

      console.log(
        `Deleted ${totalDeleted} objects from folder '${folderPrefix}'`,
      )
    } catch (error) {
      console.error(`Error deleting folder '${folderPrefix}':`, error)
      throw error
    }
  }

  public static async downloadClipFromS3(
    key: string,
    folderPath: string,
    filename: string,
  ) {
    try {
      fsExtra.ensureDirSync(folderPath)
      const { AWS_S3_BUCKET } = GENERATOR_CONFIG
      console.log('downloadClipFromS3 AWS_S3_BUCKET', AWS_S3_BUCKET, key)
      const command = GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
      })
      const data = await client.send(command)
      const filePath = `${folderPath}/${filename}`
      console.log('saving clip to s3', filePath)
      await saveFile({ readableStream: data.Body, filePath })
    } catch (error) {
      console.log(
        `Error downloading key: ${key}, ${folderPath} ${filename}`,
        error,
      )
      throw error
    } finally {
      if (GENERATOR_CONFIG.NODE_ENV !== 'development') {
        await cleanUp(key)
      }
    }
  }

  public static convertS3BackgroundImageObjectsToJsonHierarchy({
    backgroundImageObjects,
  }: {
    backgroundImageObjects: Array<string>
  }): BackgroundImageHierarchy {
    // 1. get an array of background key names
    return backgroundImageObjects.reduce((acc, backgroundImageObject) => {
      console.log('backgroundImageObject', backgroundImageObject)
      let matches = backgroundImageObject.match(/backgroundImages\/([^\/]+)\//)
      console.log('background key matches', matches)
      if (!matches || matches?.length <= 1) {
        console.log(`No background key match found on ${backgroundImageObject}`)
        return acc
      }
      const [backgroundKeyPath, backgroundKey] = matches
      console.log('backgroundKey', backgroundKey)

      // 2. get region AU | USA
      matches = backgroundImageObject.match(`${backgroundKeyPath}([^/]+)/`)
      console.log('background region key matches', matches)
      if (!matches || matches?.length <= 1) {
        console.log(
          `No background region key match found on ${backgroundKeyPath}`,
        )
        return acc
      }
      const [backgroundRegionKeyPath, regionKey] = matches

      // 3. get file keys
      matches = backgroundImageObject.match(`${backgroundRegionKeyPath}([^/]+)`)
      console.log('background file key matches', matches)
      if (!matches || matches?.length <= 1) {
        console.log(
          `No background file key match found on ${backgroundRegionKeyPath}`,
        )
        return acc
      }
      const [, fileKey] = matches
      const files = acc[backgroundKey]?.[regionKey] ?? []

      return UtilHelper.mergeDeepRight(acc, {
        [backgroundKey]: {
          [regionKey]: files.concat(fileKey),
        },
      })
    }, {})
  }

  public static validateBackgroundImageFileSummary({
    fileKey,
  }: {
    fileKey: string
  }): BackgroundImageFileValidationSummary {
    return {
      file: fileKey,
      // expectedImageSize
      // imageSize
      // isValid
      // isCorrectImage
    }
  }

  // backgroundKey (e.g. Beach)
  public static validateRegionBackgroundImages({
    backgroundKey,
    backgroundImages,
    region,
  }: {
    backgroundKey: string
    backgroundImages: Array<string>
    region: EulogiseRegion
  }): BackgroundImageRegionFileValidationSummary {
    const summary: BackgroundImageRegionFileValidationSummary = []
    const expectedFileKeys =
      region === EulogiseRegion.USA
        ? [
            `${backgroundKey}_BOOKLET_BACK_BOTH_SIDE_USA.jpg`,
            `${backgroundKey}_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_BACK_USA.jpg`,
            `${backgroundKey}_BOOKLET_BACK_USA_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_BOTH_SIDE_USA.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_USA.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_USA_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_LEFT_USA.jpg`,
            `${backgroundKey}_BOOKLET_LEFT_USA_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_RIGHT_USA.jpg`,
            `${backgroundKey}_BOOKLET_RIGHT_USA_BLEED.jpg`,
            `${backgroundKey}_SLIDESHOW_USA.jpg`,
          ]
        : [
            `${backgroundKey}_BOOKLET_BACK.jpg`,
            `${backgroundKey}_BOOKLET_BACK_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_BACK_BOTH_SIDE.jpg`,
            `${backgroundKey}_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_FRONT.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_BOTH_SIDE.jpg`,
            `${backgroundKey}_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_LEFT.jpg`,
            `${backgroundKey}_BOOKLET_LEFT_BLEED.jpg`,
            `${backgroundKey}_BOOKLET_RIGHT.jpg`,
            `${backgroundKey}_BOOKLET_RIGHT_BLEED.jpg`,
            `${backgroundKey}_BOOKMARK_BACK.jpg`,
            `${backgroundKey}_BOOKMARK_BACK_BLEED.jpg`,
            `${backgroundKey}_BOOKMARK_FRONT.jpg`,
            `${backgroundKey}_BOOKMARK_FRONT_BLEED.jpg`,
            `${backgroundKey}_SLIDESHOW.jpg`,
            `${backgroundKey}_THANK_YOU_CARD.jpg`,
            `${backgroundKey}_THANK_YOU_CARD_2_COL_LEFT.jpg`,
            `${backgroundKey}_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg`,
            `${backgroundKey}_THANK_YOU_CARD_2_COL_RIGHT.jpg`,
            `${backgroundKey}_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg`,
            `${backgroundKey}_THANK_YOU_CARD_BLEED.jpg`,
            `${backgroundKey}_THUMBNAIL.jpg`,
            `${backgroundKey}_TV_WELCOME_SCREEN_LEFT.jpg`,
            `${backgroundKey}_TV_WELCOME_SCREEN_RIGHT.jpg`,
          ]

    expectedFileKeys.forEach((fileKey: string) => {
      summary.push({
        ...S3Helper.validateBackgroundImageFileSummary({ fileKey }),
        isExists: backgroundImages.includes(fileKey),
      })
    })
    return summary
  }

  // return summary object
  public static validateBackgroundImages({
    backgroundImageObjects,
  }: {
    backgroundImageObjects: Array<string>
  }): BackgroundImageValidationSummary {
    const summary: BackgroundImageValidationSummary = {}
    const backgroundImageHierarchy: BackgroundImageHierarchy =
      S3Helper.convertS3BackgroundImageObjectsToJsonHierarchy({
        backgroundImageObjects,
      })

    console.log('backgroundImageHierarchy', backgroundImageHierarchy)
    // 1. loop throw background keys
    Object.keys(backgroundImageHierarchy).forEach((backgroundKey: string) => {
      const backgroundImageRegionFolder =
        backgroundImageHierarchy[backgroundKey]

      // create object if not exist
      summary[backgroundKey] = summary[backgroundKey] ?? {}

      // 2. loop throw background region folders
      Object.keys(backgroundImageRegionFolder).forEach(
        (region: 'AU' | 'USA') => {
          // create region object if not exist
          summary[backgroundKey][region] = summary[backgroundKey][region] ?? []

          const files = backgroundImageRegionFolder[region]

          // 3. validate files
          summary[backgroundKey][region] =
            S3Helper.validateRegionBackgroundImages({
              backgroundKey,
              backgroundImages: files,
              region,
            })
        },
      )
    })
    return summary
  }

  public static async validateBackgroundImagesFromS3({
    bucket,
  }: {
    bucket?: string
  }) {
    const command = new ListObjectsCommand({
      Bucket: bucket,
      Prefix: 'backgroundImages',
    })
    const backgroundImageObjects = await client.send(command)
    return S3Helper.validateBackgroundImages({ backgroundImageObjects })
  }

  public static async deleteObject({
    bucket = GENERATOR_CONFIG.AWS_S3_BUCKET,
    key,
  }: {
    bucket?: string
    key: string
  }) {
    // console.log('deleting', { bucket, key })
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
    return await client.send(command)
  }

  public static async cleanUpS3Path({
    prefix,
  }: {
    prefix: string
  }): Promise<void> {
    console.log('cleanUpS3Path prefix', prefix)
    // invalidate the cache before cleaning up data
    await CloudfrontHelper.createInvalidation({
      path: `/${prefix}/*`,
    })
    const list: Array<string> = await this.listObjects({
      folder: prefix,
    })
    console.log('cleanUpS3Path list', list)
    await BluebirdPromise.map(
      list,
      async (key) => {
        console.log('deleting object', key)
        if (new RegExp(prefix).test(key)) {
          console.log('matched regex', key)
          await S3Helper.deleteObject({
            key,
          })
        }
      },
      { concurrency: 50 },
    )
  }

  public static getFrameKeyByCasesId(caseId: string, generationId?: string) {
    if (generationId) {
      return `cases/${caseId}/${generationId}/frames`
    }
    return `cases/${caseId}/frames`
  }

  public static async downloadFile({
    bucket = GENERATOR_CONFIG.AWS_S3_BUCKET,
    key,
    filePath,
  }: {
    bucket?: string
    key: string
    filePath: string
  }) {
    try {
      console.log('downloadFile', { bucket, key, filePath })
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
      const data = await client.send(command)
      console.log('finish downloading key', key)

      await saveFile({ readableStream: data.Body, filePath })
      console.log('save file: filePath', filePath)
    } catch (ex) {
      console.log('ERROR: failed to download', bucket, key)
      console.log('ex', ex)
      throw new Error(ex)
    }
  }

  public static async downloadFrameToFolder({
    caseId,
    frameIndex,
    saveFileName,
    folderPath,
    generationId,
  }: {
    caseId: string
    frameIndex: number
    saveFileName: number
    folderPath: string
    generationId?: string
  }) {
    const filename =
      FrameHelper.getFrameKeyWithFileFormatByFrameIndex(frameIndex)
    const key = `${S3Helper.getFrameKeyByCasesId(
      caseId,
      generationId,
    )}/${filename}`
    console.log('downloading frame to folder', key)
    const bucket = GENERATOR_CONFIG.AWS_S3_BUCKET
    const filePath = `${folderPath}/${saveFileName}`
    await this.downloadFile({ bucket, key, filePath })
  }

  public static async downloadFramesToFolder({
    caseId,
    folderPath,
    startIndex,
    endIndex,
    retries = 0,
    generationId,
  }: {
    caseId: string
    folderPath: string
    startIndex: number
    endIndex: number
    retries?: number
    generationId?: string
  }): Promise<any> {
    try {
      const totalFrames = endIndex - startIndex + 1
      console.log('totalFrames', totalFrames)
      fsExtra.ensureDirSync(folderPath)
      return await BluebirdPromise.map(
        Array(totalFrames),
        async (_, index) => {
          const currentFrameIndex = startIndex + index
          return await S3Helper.downloadFrameToFolder({
            caseId,
            folderPath,
            // using index rather than the frameIndex as puppeteer always start from 00000
            saveFileName:
              FrameHelper.getFrameKeyWithFileFormatByFrameIndex(index),
            frameIndex: currentFrameIndex,
            generationId,
          })
        },
        { concurrency: 500 },
      )
    } catch (ex) {
      console.log('Error downloadFramesToFolder', folderPath)
      // 3 retries if error
      if (retries < 3) {
        console.log('Retrying downloadFramesToFolder', retries)
        await SlackWebhookHelper.sendToSlack({
          text: `GENERATOR-ERROR-DOWNLOAD-FRAMES (${caseId}). Error downloading frames to folder. ${folderPath}. Retrying downloadFramesToFolder. Retries: ${retries}`,
        })
        return await S3Helper.downloadFramesToFolder({
          caseId,
          folderPath,
          startIndex,
          endIndex,
          retries: retries + 1,
          generationId,
        })
      }

      throw new Error(ex)
    }
  }

  public static async downloadFolderFromS3(
    folderKey: string,
    folderPath: string,
  ): Promise<any> {
    try {
      fsExtra.ensureDirSync(folderPath)
      const command = new ListObjectsCommand({
        Bucket: GENERATOR_CONFIG.AWS_S3_BUCKET,
        Prefix: folderKey,
      })
      const data = await client.send(command)
      console.log('data', data)
    } catch (ex) {
      console.log('Error', folderPath)
    }
  }

  public static async checkExists(
    key: string,
    bucket: string = GENERATOR_CONFIG.AWS_S3_BUCKET,
  ) {
    console.log(`checking s3 bucket: ${bucket}`)
    console.log(`checking s3 key: ${key}`)
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key })
    await client.send(command)
    // console.log('s3headResults', s3headResults)
    console.log(`checked s3 key: ${key}. File exists`)
  }

  public static async renameObject({
    bucket = GENERATOR_CONFIG.AWS_S3_BUCKET,
    oldFileKey,
    newFileKey,
  }: {
    bucket?: string
    oldFileKey: string
    newFileKey: string
  }) {
    const command = new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `/${bucket}/${oldFileKey}`, // Source object path
      Key: newFileKey, // Destination object path (new file name)
    })
    await client.send(command)
  }

  public static async listObjects({
    bucket = GENERATOR_CONFIG.AWS_S3_BUCKET,
    folder,
  }: {
    bucket?: string
    folder: string
  }): Promise<Array<string>> {
    console.log(`Bucket: ${bucket}`)

    const allObjects = []
    let continuationToken = null

    do {
      try {
        const command = new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: folder,
          ContinuationToken: continuationToken,
        })
        const data: ListObjectsV2CommandOutput = await client.send(command)
        if (data.Contents && data.Contents.length > 0) {
          // Extract object keys from the data and push them into the array
          allObjects.push(...data.Contents.map((obj) => obj.Key))
        }
        // Update continuationToken for pagination
        continuationToken = data.NextContinuationToken
      } catch (error) {
        console.error('Error:', error)
        return []
      }
    } while (continuationToken)

    return allObjects
  }

  public static async downloadFileFromUrl({
    url,
    filePath,
  }: {
    url: string
    filePath: string
  }) {
    try {
      console.log('downloading file from url:', url)
      const response = await axios({
        method: 'get',
        url,
        responseType: 'stream',
      })

      console.log('writing file to:', filePath)
      const writer = fs.createWriteStream(filePath)

      response.data.pipe(writer)

      return new Promise((resolve, reject) => {
        console.log('Downloading file...')
        writer.on('finish', () => {
          console.log('Download Complete.')
          resolve()
        })
        writer.on('error', reject)
      })
    } catch (error) {
      console.error('Error downloading the file:', error)
      throw error
    }
  }

  public static async uploadFromUrlToS3({
    imageUrl,
    fileName,
    ...rest
  }: IUploadFromUrlToS3Params) {
    // download file from imageUrl
    const filePath = `/tmp/${fileName}`
    console.log('uploadFromUrlToS3 filePath', filePath)
    await S3Helper.downloadFileFromUrl({ url: imageUrl, filePath })
    return await S3Helper.uploadToS3({
      ...rest,
      filePath,
    })
  }

  public static async uploadToS3({
    filePath,
    s3Path,
    bucket = GENERATOR_CONFIG.AWS_S3_BUCKET,
    isCheck,
    noOfTries = 0,
  }: IUploadFileToS3Params) {
    console.log('uploading to s3 filePath', filePath)
    console.log('uploading to s3 s3Path', s3Path)
    console.log('uploading to s3 bucket', bucket)
    const file = await fsExtra.readFile(filePath)
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Path,
      Body: file,
    })
    const result = await client.send(command)

    console.log(
      `✅ ${filePath} successfully uploaded to 'https://${bucket}/${s3Path}'`,
      result,
    )

    if (isCheck) {
      try {
        await S3Helper.checkExists(s3Path, bucket)
      } catch (ex) {
        if (noOfTries < 3) {
          console.log(
            `file (${s3Path}) does not exist. Try to upload again. Tries: ${
              noOfTries + 1
            }`,
          )
          return await S3Helper.uploadToS3({
            filePath,
            s3Path,
            bucket,
            isCheck,
            noOfTries: noOfTries + 1,
          })
        } else {
          console.log(`failed to upload file(${s3Path}) to s3. No more tries.`)
        }
      }
    }
    return result
  }
}
