import fsExtra from 'fs-extra'
import fs from 'fs'
import * as uuid from 'uuid'
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommandInput,
  HeadObjectCommand,
  HeadObjectCommandOutput,
  DeleteObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3'
import { CONFIG } from '../config/Config'
import { BACKGROUND_IMAGES_BASE_PATH } from '@eulogise/core'
import { S3CleanUpHelper } from './S3CleanUpHelper'

const getClient = (): S3Client => {
  if (!CONFIG.AWS_ACCESS_KEY || !CONFIG.AWS_SECRET_KEY) {
    throw new Error(
      'AWS_ACCESS_KEY or AWS_SECRET_KEY is not set in the environment variables',
    )
  }
  return new S3Client({
    region: CONFIG.AWS_REGION,
    credentials: {
      accessKeyId: CONFIG.AWS_ACCESS_KEY,
      secretAccessKey: CONFIG.AWS_SECRET_KEY,
    },
  })
}

const client = getClient()

export class S3Helper {
  public static async listAllObjects({
    bucket,
    prefix,
  }: {
    bucket?: string
    prefix: string
  }) {
    console.log('listAllObjects', { bucket, prefix })
    let isTruncated = true
    let continuationToken = undefined
    const contents = []

    while (isTruncated) {
      try {
        const response: any = await client.send(
          new ListObjectsV2Command({
            Bucket: bucket ?? CONFIG.AWS_S3_BUCKET,
            Prefix: prefix,
            ContinuationToken: continuationToken,
          }),
        )
        contents.push(...response.Contents)

        isTruncated = response.IsTruncated
        continuationToken = response.NextContinuationToken
      } catch (err) {
        console.error(err)
        throw err
      }
    }

    return contents
  }

  public static async uploadFile({
    bucket = CONFIG.AWS_S3_BUCKET,
    key,
    fileContent,
  }: {
    bucket?: string
    key: string
    fileContent: Buffer
  }) {
    console.log('uploadFile', { bucket, key })
    const params = {
      Bucket: bucket,
      Key: key, // File name you want to save as in S3
      Body: fileContent,
      ContentType: 'image/jpeg', // Adjust content type as necessary
    }

    try {
      const command = new PutObjectCommand(params)
      const response = await client.send(command)

      console.log('Success', response)
    } catch (err) {
      console.error('Error upload file', err)
    }
  }

  public static async downloadFile({
    bucket = CONFIG.AWS_S3_BUCKET,
    key,
    downloadPath,
  }: {
    bucket?: string
    key: string
    downloadPath: string
  }) {
    console.log('downloadFile', { bucket, key, downloadPath })
    const params = {
      Bucket: bucket,
      Key: key,
    }

    try {
      const command = new GetObjectCommand(params)
      const response = await client.send(command)

      const writeStream = fs.createWriteStream(downloadPath)
      if (!response.Body) {
        throw new Error('Response body is empty or not a stream')
      }
      ;(response.Body as NodeJS.ReadableStream).pipe(writeStream)

      writeStream.on('close', () => {
        console.log(`Downloaded ${key} from ${bucket} to ${downloadPath}`)
      })

      writeStream.on('error', (err) => {
        console.error('Error writing file', err)
      })
    } catch (err) {
      console.error('Error downloading file', err)
    }
  }

  public static async downloadFilePromise({
    bucket = CONFIG.AWS_S3_BUCKET,
    key,
    downloadPath,
  }: {
    bucket?: string
    key: string
    downloadPath: string
  }) {
    console.log('downloadFile', { bucket, key, downloadPath })
    const params = {
      Bucket: bucket,
      Key: key,
    }

    const command = new GetObjectCommand(params)
    const response = await client.send(command)

    return new Promise((resolve, reject) => {
      try {
        const writeStream = fs.createWriteStream(downloadPath)
        if (!response.Body) {
          throw new Error('Response body is empty or not a stream')
        }
        ;(response.Body as NodeJS.ReadableStream).pipe(writeStream)

        writeStream.on('close', () => {
          console.log(`Downloaded ${key} from ${bucket} to ${downloadPath}`)
          resolve(null)
        })

        writeStream.on('error', (err) => {
          console.error('Error writing file', err)
          reject(err)
        })
      } catch (err) {
        console.error('Error downloading file', err)
        reject(err)
      }
    })
  }

  public static async getJsonFile(params: { bucket?: string; key: string }) {
    const downloadFilePath = `/tmp/${uuid.v4()}.json`
    await this.downloadFilePromise({
      ...params,
      downloadPath: downloadFilePath,
    })
    return fsExtra.readJson(downloadFilePath)
  }

  public static async getAllBackgroundImages(params?: {
    bucket: string
  }): Promise<
    Array<{
      Key: string
      LastModify: Date
      Size: number
      ETag: string
      StorageClass: string
    }>
  > {
    const bucket = params?.bucket
    console.log('getAllBackgroundImages', {
      bucket,
    })
    return await this.listAllObjects({
      bucket,
      prefix: BACKGROUND_IMAGES_BASE_PATH,
    })
  }

  public static async folderExists({ folderPrefix }: { folderPrefix: string }) {
    try {
      const data = await client.send(
        new ListObjectsV2Command({
          Bucket: CONFIG.AWS_S3_BUCKET,
          Prefix: folderPrefix,
          MaxKeys: 1, // We only need to check if there's at least one object
        }),
      )

      // If there's at least one object, the "folder" exists
      return data.Contents && data.Contents.length > 0
    } catch (error) {
      console.error(
        `Error checking folder existence for '${folderPrefix}':`,
        error,
      )
      return false
    }
  }

  public static async deleteObject({
    bucket = CONFIG.AWS_S3_BUCKET,
    key,
  }: {
    bucket?: string
    key: string
  }) {
    console.log(`Deleting object '${key}' from bucket '${bucket}'`)
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    )
    console.log(`Delete object '${key}' from bucket '${bucket}'`)
  }

  public static async deleteCaseResourceById({ caseId }: { caseId: string }) {
    const folderPrefix = `cases/${caseId}`
    try {
      // Deleting the folder itself is deleting all objects with the given prefix
      await S3CleanUpHelper.deleteFolder(folderPrefix)

      // Optionally, delete the empty folder marker if it exists
      await client.send(
        new DeleteObjectCommand({
          Bucket: CONFIG.AWS_S3_BUCKET,
          Key: folderPrefix,
        }),
      )

      console.log(
        `Bucket: ${CONFIG.AWS_S3_BUCKET}; Folder '${folderPrefix}' deleted successfully`,
      )
    } catch (error) {
      console.error(`Error deleting folder '${folderPrefix}':`, error)
    }
  }

  public static async existsInS3({
    client,
    bucket,
    key,
  }: {
    client: S3Client
    bucket: string
    key: string
  }) {
    try {
      const bucketParams: HeadObjectCommandInput = {
        Bucket: bucket,
        Key: key,
      }
      const cmd = new HeadObjectCommand(bucketParams)
      const data: HeadObjectCommandOutput = await client.send(cmd)

      // get 200 response if the object exists
      const exists = data.$metadata.httpStatusCode === 200
      return exists
    } catch (error) {
      if (error.$metadata?.httpStatusCode === 404) {
        // doesn't exist and permission policy includes s3:ListBucket
        console.log(
          `❌ existsInS3 checking error, key ${key} does not exist and permission policy includes s3:ListBucket`,
        )
        return false
      } else if (error.$metadata?.httpStatusCode === 403) {
        // doesn't exist, permission policy WITHOUT s3:ListBucket
        console.log(
          `❌ existsInS3 checking error, key ${key} does not exist and permission policy DOES NOT include s3:ListBucket`,
        )
        return false
      } else {
        console.log(
          `❌ existsInS3 checking error, key ${key} does not exist, and error is ${error}`,
        )
        return false
      }
    }
  }

  public static async uploadJsonToS3(params: {
    json: any
    s3Path: string
    bucket?: string
    isCheck?: boolean
    noOfTries?: number
  }): Promise<any> {
    console.log('uploadJsonToS3', params)
    const { json, ...uploadToS3Params } = params
    const filePath = `/tmp/${uuid.v4()}-temp.json`
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
    return await this.uploadToS3({
      ...uploadToS3Params,
      filePath,
    })
  }

  public static async uploadToS3(params: {
    filePath: string
    s3Path: string
    bucket?: string
    isCheck?: boolean
    noOfTries?: number
  }): Promise<any> {
    const {
      filePath,
      s3Path,
      bucket = CONFIG.AWS_S3_BUCKET!,
      isCheck,
      noOfTries = 0,
    } = params
    console.log('uploadToS3', params)
    const file = await fsExtra.readFile(filePath)

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Path,
      Body: file,
    })

    try {
      const response = await client.send(putObjectCommand)
      console.log(
        `✅ ${filePath} successfully uploaded to 'https://${bucket}/${s3Path}'`,
        response,
      )

      if (isCheck) {
        try {
          await S3Helper.existsInS3({
            client,
            bucket,
            key: s3Path,
          })
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
            console.log(
              `❌ failed to upload file(${s3Path}) to s3. No more tries.`,
            )
          }
        }
      }
      return response
    } catch (error) {
      console.log(`❌ s3 upload error`, error)
      throw Error('failed to upload file to s3')
    }
  }

  public static async deleteObjectsInFolder({
    folderPrefix,
  }: {
    folderPrefix: string
  }): Promise<void> {
    return S3CleanUpHelper.deleteFolder(folderPrefix)
  }

  public static async CopyObjectFromBucket({
    sourceBucket,
    sourceFilePath,
    destinationBucket,
    destinationFilePath,
  }: {
    sourceBucket: string
    sourceFilePath: string
    destinationBucket: string
    destinationFilePath: string
  }): Promise<any> {
    const input = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${sourceFilePath}`,
      Key: destinationFilePath,
    }
    const copyObjectCommand = new CopyObjectCommand(input)
    try {
      const response = await client.send(copyObjectCommand)
      console.log(
        `✅ ${destinationFilePath} successfully copied from ${sourceBucket}/${sourceFilePath} to 'https://${destinationBucket}/${destinationFilePath}'`,
        response,
      )
      return response
    } catch (error) {
      console.log(`❌ s3 copied error`, error)
      throw Error('failed to copied file to s3')
    }
  }
}
