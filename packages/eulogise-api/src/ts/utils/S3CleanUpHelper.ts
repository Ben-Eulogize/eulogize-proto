import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { CONFIG } from '../config/Config'

export class S3CleanUpHelper {
  private static s3Client = new S3Client({ region: CONFIG.AWS_REGION })
  private static readonly BUCKET_NAME = CONFIG.AWS_S3_BUCKET
  private static readonly ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

  public static async cleanupOldFramesFolder(): Promise<number> {
    const folders = await this.findOldFramesFolders()
    console.log('Folders to clean up:', folders)

    for (const folderPrefix of folders) {
      await this.deleteFolder(folderPrefix)
    }

    console.log(`Cleaned up ${folders.length} old frames folders`)
    return folders.length
  }

  public static async deleteFolder(folderPrefix: string): Promise<void> {
    try {
      console.log(`Deleting folder and its contents: ${folderPrefix}`)
      let totalDeleted = 0
      let continuationToken: string | undefined

      // List and delete objects in batches
      do {
        const listCommand = new ListObjectsV2Command({
          Bucket: this.BUCKET_NAME,
          Prefix: folderPrefix,
          ContinuationToken: continuationToken,
        })

        const data = await this.s3Client.send(listCommand)
        const objectsToDelete = (data.Contents || []).map((obj) => ({
          Key: obj.Key!,
        }))

        if (objectsToDelete.length > 0) {
          // S3 DeleteObjects can handle up to 1000 objects per request
          // Split into chunks of 1000 if needed
          const chunkSize = 1000
          for (let i = 0; i < objectsToDelete.length; i += chunkSize) {
            const chunk = objectsToDelete.slice(i, i + chunkSize)
            await this.s3Client.send(
              new DeleteObjectsCommand({
                Bucket: this.BUCKET_NAME,
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
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.BUCKET_NAME,
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

  public static async findOldFramesFolders(): Promise<string[]> {
    const oneWeekAgo = new Date(Date.now() - this.ONE_WEEK_MS)
    const oldFramesFolders: string[] = []
    const newFramesFolders: string[] = []

    try {
      // First, get all case folders
      let caseContinuationToken: string | undefined

      do {
        const casesCommand = new ListObjectsV2Command({
          Bucket: this.BUCKET_NAME,
          Prefix: 'cases/',
          Delimiter: '/',
          ContinuationToken: caseContinuationToken,
        })

        const casesResponse = await this.s3Client.send(casesCommand)

        if (casesResponse.CommonPrefixes) {
          for (const casePrefix of casesResponse.CommonPrefixes) {
            if (casePrefix.Prefix) {
              // Check for legacy frames folder within each case folder
              const framesPrefix = `${casePrefix.Prefix}frames/`
              const framesFolderExists = await this.checkFolderExists(
                framesPrefix,
              )

              if (framesFolderExists) {
                const framesLastModified = await this.getFolderLastModifiedDate(
                  framesPrefix,
                )

                if (framesLastModified && framesLastModified < oneWeekAgo) {
                  oldFramesFolders.push(framesPrefix)
                } else {
                  newFramesFolders.push(framesPrefix)
                }
              }

              // Also check for timestamped generation folders (gen-*)
              const genFolders = await this.findGenerationFolders(
                casePrefix.Prefix,
              )
              for (const genFolder of genFolders) {
                const genLastModified = await this.getFolderLastModifiedDate(
                  genFolder,
                )
                if (genLastModified && genLastModified < oneWeekAgo) {
                  oldFramesFolders.push(genFolder)
                } else {
                  newFramesFolders.push(genFolder)
                }
              }
            }
          }
        }

        caseContinuationToken = casesResponse.NextContinuationToken
      } while (caseContinuationToken)

      console.log('Old frames folders:', oldFramesFolders)
      console.log('New frames folders:', newFramesFolders)
      console.log('Old frames folders Length: ', oldFramesFolders.length)
      console.log('New frames folders Length: ', newFramesFolders.length)

      return oldFramesFolders
    } catch (error) {
      console.error('Error finding old frames folders:', error)
      throw error
    }
  }

  /**
   * Finds all timestamped generation folders (gen-*) within a case folder.
   * These folders contain temporary frames and videos from slideshow generation.
   */
  private static async findGenerationFolders(
    casePrefix: string,
  ): Promise<string[]> {
    const genFolders: string[] = []

    try {
      let continuationToken: string | undefined

      do {
        const command = new ListObjectsV2Command({
          Bucket: this.BUCKET_NAME,
          Prefix: casePrefix,
          Delimiter: '/',
          ContinuationToken: continuationToken,
        })

        const response = await this.s3Client.send(command)

        if (response.CommonPrefixes) {
          for (const prefix of response.CommonPrefixes) {
            if (prefix.Prefix) {
              // Match gen-{timestamp} folders (e.g., cases/{caseId}/gen-1707123456789/)
              const match = prefix.Prefix.match(/gen-\d+\/$/)
              if (match) {
                genFolders.push(prefix.Prefix)
              }
            }
          }
        }

        continuationToken = response.NextContinuationToken
      } while (continuationToken)

      return genFolders
    } catch (error) {
      console.error(`Error finding generation folders in ${casePrefix}:`, error)
      return []
    }
  }

  private static async checkFolderExists(prefix: string): Promise<boolean> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.BUCKET_NAME,
        Prefix: prefix,
        MaxKeys: 1,
      })

      const response = await this.s3Client.send(command)
      return (response.Contents && response.Contents.length > 0) || false
    } catch (error) {
      console.error(`Error checking folder existence for ${prefix}:`, error)
      return false
    }
  }

  private static async getFolderLastModifiedDate(
    prefix: string,
  ): Promise<Date | null> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.BUCKET_NAME,
        Prefix: prefix,
        MaxKeys: 1000,
      })

      const response = await this.s3Client.send(command)

      if (!response.Contents || response.Contents.length === 0) {
        return null
      }

      const latestDate = response.Contents.reduce((latest, obj) => {
        if (obj.LastModified && (!latest || obj.LastModified > latest)) {
          return obj.LastModified
        }
        return latest
      }, null as Date | null)

      return latestDate
    } catch (error) {
      console.error(`Error getting last modified date for ${prefix}:`, error)
      return null
    }
  }
}
