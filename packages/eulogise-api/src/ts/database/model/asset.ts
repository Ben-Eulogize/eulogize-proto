import dynamoose from 'dynamoose'
import * as uuid from 'uuid'
import { IAssetModel } from '../types/AssetModel.types'
import { BaseModel } from './BaseModel'
import { FilestackHelper } from '../../utils/FilestackHelper'
import { BackgroundRemoveAPIImageFormat } from '../../utils/RemoveBGHelper'
import { S3Helper } from '../../utils/S3Helper'
import { RemoveBGHelper } from '../../utils/RemoveBGHelper'
import { AssetType, RemoveBackgroundImageMode } from '@eulogise/core'
import { CONFIG } from '../../config/Config'

const ASSET_SCHEMA_DEFINITION: any = {
  id: {
    type: String,
    validate: (v: string) => v.length === 36,
    hashKey: true,
  },
  type: {
    type: String,
    enum: ['image', 'audio', 'brand'],
    index: {
      type: 'global',
      name: 'type-index',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  case: {
    type: String,
    required: true,
    index: [
      {
        type: 'global',
        name: 'case-index',
      },
      {
        type: 'global',
        name: 'case-type-index',
        rangeKey: 'type',
      },
    ],
  },
  content: {
    type: Object,
  },
  client: {
    type: String,
  },
}

const SchemaOptions = {
  saveUnknown: ['content.**'],
  timestamps: true,
}

class AssetModel extends BaseModel<IAssetModel.Model, IAssetModel.Schema> {
  constructor() {
    const schema = new dynamoose.Schema(ASSET_SCHEMA_DEFINITION, SchemaOptions)
    super('asset', schema)
  }

  /**
   * Detects faces in an image and adds the face detection data to the asset content
   * @param assetContent The asset content object to enhance with face detection
   * @param filestackHandle The filestack handle of the image
   * @returns The enhanced asset content with face detection data
   */
  public async detectAndAddFacesToContent(
    assetContent: any,
    filestackHandle: string,
  ): Promise<any> {
    try {
      const faceDetectionResult = await FilestackHelper.detectFaces(
        filestackHandle,
      )

      // Add face detection data to the content
      assetContent.faceDetection = {
        faces: faceDetectionResult.faces,
        imageWidth: faceDetectionResult.imageWidth,
        imageHeight: faceDetectionResult.imageHeight,
        detectedAt: Date.now(),
      }
    } catch (error) {
      // Log error but don't fail the operation
      console.error('Face detection failed for asset:', error)
    }

    return assetContent
  }

  public async query(
    search: any,
    attributes?: any,
  ): Promise<IAssetModel.Schema[]> {
    return this.getModel().scan(search).attributes(attributes).all().exec()
  }

  public async save(assetObj: IAssetModel.Schema): Promise<IAssetModel.Schema> {
    if (!assetObj.id) {
      return this.create(assetObj)
    } else {
      return this.update(assetObj)
    }
  }

  public async getImageCountByCaseId(caseId: string): Promise<number> {
    const { count } = await this.getModel()
      .query('case')
      .eq(caseId)
      .where('type')
      .eq('image')
      .using('case-type-index')
      .count()
      .exec()
    return count
  }

  public async getAudioCountByCaseId(caseId: string): Promise<number> {
    const { count } = await this.getModel()
      .query('case')
      .eq(caseId)
      .where('type')
      .eq('audio')
      .using('case-type-index')
      .count()
      .exec()
    return count
  }

  public async getImagesByCaseId(
    caseId: string,
  ): Promise<Array<IAssetModel.Schema>> {
    return this.getModel()
      .query('case')
      .eq(caseId)
      .where('type')
      .eq('image')
      .using('case-type-index')
      .all()
      .exec()
  }

  public async create(
    assetObj: IAssetModel.Schema,
  ): Promise<IAssetModel.Schema> {
    let assetResult: IAssetModel.Schema

    // If it's an image asset and has a filestackHandle, detect faces
    /*
    if (assetObj.type === 'image' && assetObj.content?.filestackHandle) {
      assetObj.content = await this.detectAndAddFacesToContent(
        assetObj.content,
        assetObj.content.filestackHandle,
      )
    }
*/

    const saveQuery = {
      id: uuid.v4(),
      type: assetObj.type,
      owner: assetObj.owner,
      case: assetObj.case,
      content: assetObj.content,
      client: assetObj.client,
    }

    try {
      assetResult = await this.getModel().create(saveQuery)
    } catch (error) {
      throw error
    }

    return assetResult
  }

  public async remove(search: any): Promise<boolean> {
    if (!search.id) {
      throw new Error(
        `Failed to remove ${this.getModelName()} as the id of removedItem is missing!`,
      )
    }
    const asset = await this.findById(search.id)
    if (asset && asset.case === '*') {
      console.log(
        `AssetModel.remove: cannot remove stock asset (case=*) id=${search.id}`,
      )
      return false
    }
    return super.remove(search)
  }

  public async removeMultiple(search: any): Promise<boolean> {
    const removeIds: string[] = search?.ids
    if (!removeIds) {
      throw new Error(
        `Failed to remove ${this.getModelName()} as the ids of removedItem is missing!`,
      )
    }
    const assets = await this.batchGetByIds(removeIds)
    const stockAssetIds = assets
      .filter((asset) => asset.case === '*')
      .map((asset) => asset.id)
    if (stockAssetIds.length > 0) {
      console.log(
        `AssetModel.removeMultiple: skipping ${
          stockAssetIds.length
        } stock assets (case=*): ${stockAssetIds.join(', ')}`,
      )
    }
    const safeIds = removeIds.filter((id) => !stockAssetIds.includes(id))
    if (safeIds.length === 0) {
      console.log('AssetModel.removeMultiple: no non-stock assets to remove')
      return true
    }
    return super.removeMultiple({ ...search, ids: safeIds })
  }

  public async removeByCaseId({ caseId }: { caseId: string }) {
    if (caseId === '*') {
      console.log(`AssetModel.removeByCaseId ${caseId}: cannot be *`)
      return
    }
    const assets = await this.findByCaseId(caseId)
    console.log(`removeByCaseId ${this.getModelName()}`, caseId, assets)
    for (const asset of assets) {
      await asset.delete()
    }
  }

  public async findByCaseId(caseId: string): Promise<Array<IAssetModel.Model>> {
    return this.getModel().query({ case: caseId }).all().exec()
  }

  public async findByCaseIdAndType(
    caseId: string,
    type: string,
  ): Promise<Array<IAssetModel.Model>> {
    return this.getModel()
      .query('case')
      .eq(caseId)
      .where('type')
      .eq(type)
      .using('case-type-index')
      .all()
      .exec()
  }

  public async update(
    assetObj: IAssetModel.Schema,
    isAttachFaceDetection: boolean = false,
  ): Promise<IAssetModel.Schema> {
    let assetResult: IAssetModel.Schema

    // If it's an image asset being updated with a new filestackHandle, detect faces
    if (
      isAttachFaceDetection &&
      assetObj.type === 'image' &&
      assetObj.content?.filestackHandle
    ) {
      console.log('start detectAndAddFacesToContent')
      assetObj.content = await this.detectAndAddFacesToContent(
        assetObj.content,
        assetObj.content.filestackHandle,
      )
    }

    const saveQuery = ['type', 'owner', 'case', 'content', 'client'].reduce(
      (query, key) => {
        if (assetObj.hasOwnProperty(key)) {
          query[key] = (assetObj as any)[key]
        }
        return query
      },
      {} as { [key: string]: any },
    )

    try {
      // do not update updatedAt timestamp when only attaching face detection
      if (isAttachFaceDetection) {
        const schema = new dynamoose.Schema(ASSET_SCHEMA_DEFINITION, {
          ...SchemaOptions,
          timestamps: false,
        })

        const assetModel = dynamoose.model('asset', schema, {
          // @ts-ignore
          throughput: CONFIG.DYNAMODB.THROUGHPUT,
          create: CONFIG.DYNAMODB.CREATE_TABLE_ON_START,
          waitForActive: {
            enabled: false,
          },
        })

        await assetModel.update({ id: assetObj.id }, saveQuery)
      } else {
        await this.getModel().update({ id: assetObj.id }, saveQuery)
      }
      assetResult = await this.getModel().get(assetObj.id!)
    } catch (error) {
      throw error
    }

    return assetResult
  }

  public async removeImageBackground(search: any): Promise<boolean> {
    console.log(`removeImageBackground ${this.modelName}`, search)

    let newUploadedImageData: any

    try {
      if (!search.id) {
        throw new Error(
          `Failed to remove ${this.modelName} as the id of removedItem is missing!`,
        )
      }
      if (!search.mode) {
        throw new Error(
          `Failed to remove ${this.modelName} as the mode of removedItem is missing!`,
        )
      }
      const imageAsset = await assetModel.findById(search.id)
      if (!imageAsset) {
        throw new Error(
          `Failed to remove ${this.modelName} as no matched image in database!`,
        )
      }
      const filestackHandle = imageAsset.content.filestackHandle

      const destinationFileImageFormatSuffix =
        BackgroundRemoveAPIImageFormat.PNG
      const imageUrl: string = `https://cdn.filestackcontent.com/${filestackHandle}`

      const rbgBuffer = await RemoveBGHelper.removeBackground(
        imageUrl,
        destinationFileImageFormatSuffix,
      )
      const rbgResultArrayBuffer = await FilestackHelper.uploadFileByBuffer(
        rbgBuffer,
      )

      if (
        rbgResultArrayBuffer?.handle &&
        rbgResultArrayBuffer?.key &&
        rbgResultArrayBuffer?.status === 'Stored'
      ) {
        let updatedFilepathArray = imageAsset?.content?.filepath.split('/')
        const newFilename = `${rbgResultArrayBuffer?.key}.${destinationFileImageFormatSuffix}`
        // upload to S3
        const bucket = process.env.XAWS_S3_BUCKET!
        const destinationFilePath = `cases/${imageAsset?.case}/gallery/${newFilename}`
        const sourceFilePath = `${rbgResultArrayBuffer?.key}`
        const sourceBucket = process.env.XAWS_FILESTACK_BUCKET!

        await S3Helper.CopyObjectFromBucket({
          sourceBucket,
          sourceFilePath,
          destinationBucket: bucket,
          destinationFilePath: destinationFilePath,
        })

        if (!updatedFilepathArray[0]) {
          throw new Error(`No updatedFilePathArray substring`)
        }
        updatedFilepathArray[0] = newFilename
        const newFilePath = updatedFilepathArray.join('/')
        // Mode 1: Keep both new and old images:
        if (search.mode === RemoveBackgroundImageMode.KEEP_NEW_AND_OLD_IMAGES) {
          // Create new content object with face detection
          let newContent = {
            filepath: newFilePath,
            filestackHandle: rbgResultArrayBuffer?.handle,
            filename: newFilename,
            isRemovedBackgroundImage: true,
          }

          // Detect faces for the new background-removed image
          /*
          newContent = await this.detectAndAddFacesToContent(
            newContent,
            rbgResultArrayBuffer?.handle,
          )
*/

          console.log('new create asset query', {
            case: imageAsset.case,
            content: newContent,
            owner: imageAsset.owner,
            type: AssetType.IMAGE,
            client: imageAsset.client,
          })

          await this.create({
            case: imageAsset.case,
            content: newContent,
            owner: imageAsset.owner,
            type: AssetType.IMAGE,
            client: imageAsset.client,
          })
        }
        // Mode 2: Keep the new image only:
        else if (
          search.mode === RemoveBackgroundImageMode.KEEP_NEW_IMAGE_ONLY
        ) {
          // Update content with new image information
          let updatedContent = {
            ...imageAsset.content,
            filepath: newFilePath,
            filestackHandle: rbgResultArrayBuffer?.handle,
            filename: newFilename,
            isRemovedBackgroundImage: true,
          }

          // Detect faces for the new background-removed image
          /*
          updatedContent = await this.detectAndAddFacesToContent(
            updatedContent,
            rbgResultArrayBuffer?.handle,
          )
*/

          await this.update({
            ...imageAsset,
            content: updatedContent,
          })
        }
      }
    } catch (error) {
      throw error
    }
    return newUploadedImageData
  }
}

export const assetModel = new AssetModel()
