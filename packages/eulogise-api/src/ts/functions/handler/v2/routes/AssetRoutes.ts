import { assetModel } from '../../../../database'
import {
  V2RouteContext,
  V2RoutePostRequestEvent,
} from '../../../../types/routes.types'
import { EulogiseUserRole } from '@eulogise/core'
import { RouteMiddleware } from '../middleware/RouteMiddleware'
import { AssetResourceController } from '../../../controller'
import { IAssetModel } from '../../../../database/types/AssetModel.types'
import Bluebird from 'bluebird'

/**
 * Detects a single image by asset ID and attaches face detection data to asset content
 */
const detectAndAttachImageByAssetId = async (
  req: V2RoutePostRequestEvent<{ forceRedetect?: boolean }>,
  context: V2RouteContext,
  pathParams: { assetId: string },
): Promise<{
  success: boolean
  assetId: string
  message: string
  asset: IAssetModel.Schema
}> => {
  const assetId = pathParams.assetId
  const { forceRedetect = false } = req.body || {}

  console.log('detectAndAttachImageByAssetId request received', {
    assetId,
    forceRedetect,
  })

  try {
    // Find the asset by ID
    const asset = await assetModel.findById(assetId)

    if (!asset) {
      throw new Error(`Asset with ID ${assetId} not found`)
    }

    // Check if it's an image asset
    if (asset.type !== 'image') {
      throw new Error(
        `Asset ${assetId} is not an image asset (type: ${asset.type})`,
      )
    }

    // Check if face detection already exists and not forcing redetection
    if (asset.content?.faceDetection && !forceRedetect) {
      return {
        success: true,
        assetId,
        message: 'Face detection already exists',
        asset,
      }
    }

    // Detect faces using AssetResourceController
    const updatedAsset =
      await AssetResourceController.detectAndAddFacesToContentIfNotExists({
        asset,
        isForceRedetect: forceRedetect,
      })

    return {
      success: true,
      assetId,
      message: `Successfully detected faces for asset ${assetId}`,
      asset: updatedAsset,
    }
  } catch (error) {
    console.error(`Face detection failed for asset ${assetId}:`, error)
    throw new Error(
      `Failed to process image for asset ${assetId}: ${error.message}`,
    )
  }
}

/**
 * Detects all images for a case and attaches face detection data to asset content
 */
const detectAndAttachImagesByCaseId = async (
  req: V2RoutePostRequestEvent<{ forceRedetect?: boolean }>,
  context: V2RouteContext,
  pathParams: { caseId: string },
): Promise<{
  success: boolean
  processedImages: number
  failedImages: number
  results: Array<{
    assetId: string
    status: 'success' | 'failed' | 'skipped'
    message?: string
    asset: IAssetModel.Schema
  }>
}> => {
  const caseId = pathParams.caseId
  const { forceRedetect = false } = req.body || {}

  console.log('detectAndAttachImagesForCase request received', {
    caseId,
    forceRedetect,
  })

  try {
    // Find all image assets for the case
    const assets = await assetModel.findByCaseIdAndType(caseId, 'image')

    let results: Array<{
      assetId: string
      status: 'success' | 'failed' | 'skipped'
      message?: string
      asset: IAssetModel.Schema
    }>

    let processedImages = 0
    let failedImages = 0

    // Process assets asynchronously with concurrency limit using Bluebird
    const CONCURRENCY_LIMIT = 100

    // Process all assets with Bluebird.map for concurrent execution
    results = await Bluebird.map(
      assets,
      async (asset: IAssetModel.Schema) => {
        const assetId = asset.id

        try {
          // Skip if face detection already exists and not forcing redetection
          if (asset.content?.faceDetection && !forceRedetect) {
            return {
              assetId: assetId!,
              status: 'skipped' as const,
              message: 'Face detection already exists',
              asset,
            }
          }

          // If forcing redetection, clear existing face detection data
          if (forceRedetect && asset.content?.faceDetection) {
            delete asset.content.faceDetection
          }

          const updatedAsset =
            await AssetResourceController.detectAndAddFacesToContentIfNotExists(
              {
                asset,
              },
            )

          processedImages++
          return {
            assetId: assetId!,
            status: 'success' as const,
            message: 'Face detection completed',
            asset: updatedAsset,
          }
        } catch (error) {
          console.error(`Face detection failed for asset ${assetId}:`, error)
          failedImages++
          return {
            assetId: assetId!,
            status: 'failed' as const,
            message: error.message || 'Face detection failed',
            asset,
          }
        }
      },
      { concurrency: CONCURRENCY_LIMIT },
    )

    console.log(
      `Face detection completed: ${processedImages} succeeded, ${failedImages} failed out of ${assets.length} total`,
    )

    return {
      success: true,
      processedImages,
      failedImages,
      results,
    }
  } catch (error) {
    console.error('Error in detectAndAttachImagesForCase:', error)
    throw new Error(
      `Failed to process images for case ${caseId}: ${error.message}`,
    )
  }
}

const permitRoles = [
  EulogiseUserRole.ADMIN,
  EulogiseUserRole.CLIENT,
  EulogiseUserRole.CUSTOMER,
  EulogiseUserRole.EDITOR,
  EulogiseUserRole.COEDITOR,
]

export default {
  '/assets/:assetId/face-detection': {
    POST: RouteMiddleware.authMiddleware(
      permitRoles,
      detectAndAttachImageByAssetId,
    ),
  },
  '/assets/cases/:caseId/face-detection': {
    POST: RouteMiddleware.authMiddleware(
      permitRoles,
      detectAndAttachImagesByCaseId,
    ),
  },
}
