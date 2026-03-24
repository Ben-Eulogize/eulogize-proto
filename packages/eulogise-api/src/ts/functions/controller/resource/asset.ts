import { Lambdur } from 'lambdur'

import * as Errors from '../../error'
import { Webtoken } from '../../../webtoken'
import { clientCaseOwnerOnly } from '../../../utils/accessControl'
import { FilestackHelper } from '../../../utils/FilestackHelper'
import { IAssetModel } from '../../../database/types/AssetModel.types'
import {
  assetModel,
  caseModel,
  inviteModel,
  userModel,
} from '../../../database'
import {
  AssetType,
  EulogiseUserRole,
  IAsset,
  WebSocketAssetDataDeletedPayload,
  WebSocketAssetDataUpdatedPayload,
  WebSocketMessageEventType,
} from '@eulogise/core'
import { ConnectionController } from '../ConnectionController'
import { ImageHelper } from '@eulogise/helpers'
import { CONFIG } from '../../../config/Config'
import { SlackWebhookHelper } from '../../../utils/SlackWebhookHelper'

export class AssetResourceController {
  public static async detectAndAddFacesToContentIfNotExists({
    asset,
    isForceRedetect = false,
  }: {
    asset: IAssetModel.Schema
    isForceRedetect?: boolean
  }): Promise<IAssetModel.Schema> {
    if (!asset.content) {
      console.log('Asset content is missing, skipping detection')
      return asset
    }

    const filestackHandle = asset.content.filestackHandle
    if (!filestackHandle) {
      console.log('Filestack handle is missing, skipping detection')
      return asset
    }

    let needsUpdate = false

    // Check if we need to detect faces
    const needsFaceDetection = isForceRedetect || !asset.content.faceDetection

    // Check if we need to detect image dimensions
    const needsDimensionDetection =
      !asset.content.width || !asset.content.height

    if (!needsFaceDetection && !needsDimensionDetection) {
      console.log(
        'Face detection and dimensions already exist, skipping detection',
      )
      return asset
    }

    // If forcing redetection, clear existing face detection data
    if (isForceRedetect && asset.content.faceDetection) {
      console.log('Forcing redetection, clearing existing face detection data')
      delete asset.content.faceDetection
    }

    try {
      // Detect faces if needed
      if (needsFaceDetection) {
        console.log(
          `Detecting faces for asset ${asset.id} with handle ${filestackHandle}`,
        )
        const faceDetectionResult = await FilestackHelper.detectFaces(
          filestackHandle,
        )

        asset.content.faceDetection = {
          faces: faceDetectionResult.faces,
        }

        // If dimensions were also detected from face detection, use them
        if (needsDimensionDetection) {
          asset.content.width = faceDetectionResult.imageWidth
          asset.content.height = faceDetectionResult.imageHeight
          console.log(
            `Dimensions detected from face detection: ${asset.content.width}x${asset.content.height}`,
          )
        }

        needsUpdate = true
      }
      // Detect dimensions only if still needed (not already done by face detection)
      else if (needsDimensionDetection) {
        console.log(
          `Detecting dimensions for asset ${asset.id} with handle ${filestackHandle}`,
        )
        const dimensionResult = await FilestackHelper.detectImageSize(
          filestackHandle,
        )

        asset.content.width = dimensionResult.width
        asset.content.height = dimensionResult.height
        console.log(
          `Dimensions detected: ${asset.content.width}x${asset.content.height}`,
        )

        needsUpdate = true
      }

      // Update the asset if any changes were made
      if (needsUpdate) {
        return await assetModel.update(asset, true)
      }

      return asset
    } catch (error: any) {
      console.error(
        `Error detecting faces/dimensions for asset ${asset.id}:`,
        error,
      )
      throw new Error(
        `Failed to detect faces/dimensions: ${error.message || error}`,
      )
    }
  }

  public static async find({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    console.log('AssetResourceController find', { accountObj, search })
    switch (accountObj.role) {
      case EulogiseUserRole.CONTRIBUTOR:
        return AssetResourceController.findAsContributor({ accountObj, search })
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR:
        return AssetResourceController.findAsCoEditor({ accountObj, search })
      case EulogiseUserRole.CUSTOMER:
        return AssetResourceController.findAsCustomer({ accountObj, search })
      case EulogiseUserRole.CLIENT:
        if (search?.shouldSkipAccessControlCheck) {
          return AssetResourceController.findAsClient({ accountObj, search })
        }
        return clientCaseOwnerOnly(
          AssetResourceController.findAsClient,
          'asset',
        )({ accountObj, search })
      case EulogiseUserRole.ADMIN:
        return AssetResourceController.findAsAdmin({ accountObj, search })
      default:
        throw new Lambdur.Error(Errors.resource.find.notAllowed('asset'))
    }
  }

  public static async findAsContributor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const inviteObj = await inviteModel.findOneById(accountObj.ref)
    const caseId = inviteObj.case
    return await assetModel.findByCaseId(caseId!)
  }

  public static async findAsCustomer({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const caseObj = await caseModel.findOneByCustomerId(accountObj.ref)

    let findQuery: any

    if (search.system === true) {
      findQuery = {
        owner: '*',
        case: '*',
      }
    } else {
      return AssetResourceController.performTypeSearchByCaseId(
        search.type,
        caseObj.id!,
      )
    }

    return assetModel.query(findQuery)
  }

  public static async findAsCoEditor({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)
    const caseId = inviteObj.case

    return AssetResourceController.performTypeSearchByCaseId(
      search.type,
      caseId!,
    )
  }

  public static isTypeSearch(search: any) {
    return Object.keys(search).length === 1 && search.type
  }

  public static async performTypeSearchByCaseId(type: any, caseId: string) {
    console.log('performTypeSearchByCaseId', type, caseId)

    // Query for specific case assets using the optimized GSI
    const caseAssetsPromise = assetModel
      .getModel()
      .query('case')
      .eq(caseId)
      .where('type')
      .eq(type)
      .using('case-type-index')
      .all()
      .exec()

    // Query for wildcard assets (global assets available to all cases)
    const wildcardAssetsPromise = assetModel
      .getModel()
      .query('case')
      .eq('*')
      .where('type')
      .eq(type)
      .using('case-type-index')
      .all()
      .exec()

    // Execute both queries in parallel and combine results
    const [caseAssets, wildcardAssets] = await Promise.all([
      caseAssetsPromise,
      wildcardAssetsPromise,
    ])

    return [...caseAssets, ...wildcardAssets]
  }

  public static async performTypeSearchByClientId(type: any, clientId: string) {
    console.log('performTypeSearchByClientId', type, clientId)
    return assetModel
      .getModel()
      .query('type')
      .eq(type)
      .filter('client')
      .in([clientId])
      .all()
      .exec()
  }

  public static async findAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    const caseObj = await caseModel.findById(search.case)

    let findQuery: any

    if (search.system === true) {
      findQuery = {
        owner: '*',
        case: '*',
      }
    } else if (search?.client && search?.type === AssetType.BRAND) {
      return AssetResourceController.performTypeSearchByClientId(
        search.type,
        search?.client,
      )
    } else {
      return AssetResourceController.performTypeSearchByCaseId(
        search.type,
        caseObj.id!,
      )
    }

    console.log('asset find query', findQuery)
    return assetModel.getModel().query(findQuery).all().exec()
  }

  public static async findAsAdmin({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any[]> {
    if (search?.type === AssetType.BRAND && search?.client) {
      return AssetResourceController.performTypeSearchByClientId(
        search.type,
        search?.client,
      )
    }

    const caseObj = await caseModel.findById(search.case)

    let findQuery: any

    if (search.system === true) {
      findQuery = {
        owner: '*',
        case: '*',
      }
    } else {
      console.log(
        'findAsAdmin AssetResourceController.performTypeSearchByCaseId',
        {
          type: search.type,
          caseId: caseObj.id!,
        },
      )
      return AssetResourceController.performTypeSearchByCaseId(
        search.type,
        caseObj.id!,
      )
    }

    console.log('asset find query', findQuery)
    return assetModel.getModel().query(findQuery).all().exec()
  }

  public static async save({
    accountObj,
    assetObj,
  }: {
    accountObj: Webtoken.Payload.Account
    assetObj: IAssetModel.Schema
  }): Promise<any> {
    console.log(
      'accountObj.role',
      JSON.stringify(accountObj),
      JSON.stringify(assetObj),
    )
    if (assetObj.type === 'image' || assetObj.type === 'brand') {
      const content = await FilestackHelper.convertFilestackImage(
        assetObj.content,
      )
      if (content) {
        assetObj.content = content
      }
      // fixGlitch on image upload
      if (content?.filestackHandle) {
        console.log(
          'fixGlitch by using Filestack /store feature: existing filestackHandle',
          content?.filestackHandle,
        )
        try {
          assetObj.content.filestackHandle = (
            await ImageHelper.storeFilestackImage(content?.filestackHandle, {
              filestackApi: CONFIG.FILESTACK_API,
              filestackCdn: CONFIG.FILESTACK_CDN,
            })
          ).handle
          assetObj.content.isStoredPermanently = true
          console.log(
            'fixGlitch by using Filestack /store feature: new filestackHandle',
            assetObj.content.filestackHandle,
          )
        } catch (storeError: any) {
          console.error(
            'Failed to permanently store image via Filestack after all retries',
            {
              filestackHandle: content?.filestackHandle,
              caseId: assetObj.case,
              error: storeError?.message || storeError,
            },
          )
          assetObj.content.isStoredPermanently = false
          SlackWebhookHelper.sendToSlack({
            text: `Failed to permanently store image via Filestack /store.\nCase ID: ${
              assetObj.case
            }\nFilestack Handle: ${content?.filestackHandle}\nError: ${
              storeError?.message || storeError
            }`,
            notifyChannel: true,
          }).catch((slackErr) => {
            console.error('Failed to send Slack notification', slackErr)
          })
        }
      }
    }
    let returnAsset: IAssetModel.Schema
    switch (accountObj.role) {
      case EulogiseUserRole.CONTRIBUTOR: {
        returnAsset = await AssetResourceController.saveAsContributorOrEditor({
          accountObj,
          assetObj,
        })
        break
      }
      case EulogiseUserRole.EDITOR:
      case EulogiseUserRole.COEDITOR: {
        returnAsset = await AssetResourceController.saveAsCoEditor({
          accountObj,
          assetObj,
        })
        break
      }
      case EulogiseUserRole.CUSTOMER: {
        returnAsset = await AssetResourceController.saveAsCustomer({
          accountObj,
          assetObj,
        })
        break
      }
      case EulogiseUserRole.CLIENT: {
        returnAsset = await clientCaseOwnerOnly(
          AssetResourceController.saveAsClient,
          'asset',
        )({ accountObj, search: assetObj })
        break
      }
      case EulogiseUserRole.ADMIN: {
        returnAsset = await AssetResourceController.saveAsAdmin({
          accountObj,
          assetObj,
        })
        break
      }
      default:
        throw new Lambdur.Error(Errors.resource.save.notAllowed('asset'))
    }
    await caseModel.markHasImageById(returnAsset.case)

    // webhook
    const caseId = returnAsset.case
    const connectionController = new ConnectionController()
    await connectionController.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.ASSET_UPDATED,
      data: {
        caseId,
        assetId: returnAsset.id,
        assetData: returnAsset as unknown as IAsset,
      } as WebSocketAssetDataUpdatedPayload,
    })
    return returnAsset
  }

  public static async saveAsContributorOrEditor({
    accountObj,
    assetObj,
  }: {
    accountObj: Webtoken.Payload.Account
    assetObj: IAssetModel.Schema
  }): Promise<IAssetModel.Schema> {
    const inviteObj = await inviteModel.findById(accountObj.ref)
    const caseObj = await caseModel.findById(inviteObj.case!)

    const saveQuery: IAssetModel.Schema = {
      ...assetObj,
      owner: accountObj.ref,
      case: caseObj.id!,
    }

    return assetModel.save(saveQuery)
  }

  public static async saveAsCoEditor({
    accountObj,
    assetObj,
  }: {
    accountObj: Webtoken.Payload.Account
    assetObj: IAssetModel.Schema
  }): Promise<IAssetModel.Schema> {
    const userObj = await userModel.findById(accountObj.ref)
    const inviteObj = await inviteModel.findOneByEmail(userObj.email)
    const caseObj = await caseModel.findById(inviteObj.case!)

    const saveQuery: IAssetModel.Schema = {
      ...assetObj,
      owner: accountObj.ref,
      case: caseObj.id!,
    }

    return assetModel.save(saveQuery)
  }

  public static async saveAsCustomer({
    accountObj,
    assetObj,
  }: {
    accountObj: Webtoken.Payload.Account
    assetObj: IAssetModel.Schema
  }): Promise<IAssetModel.Schema> {
    const caseObj = await caseModel.findOneByCustomerId(accountObj.ref)

    const saveQuery: IAssetModel.Schema = {
      ...assetObj,
      owner: assetObj.owner || accountObj.ref,
      case: caseObj.id!,
    }

    return assetModel.save(saveQuery)
  }

  public static async saveAsClient({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: IAssetModel.Schema
  }): Promise<IAssetModel.Schema> {
    const caseObj = await caseModel.findById(search.case)

    const saveQuery: IAssetModel.Schema = {
      ...search,
      owner: search.owner || accountObj.ref,
      case: caseObj.id!,
    }

    const obj = await assetModel.save(saveQuery)
    console.log('return obj', obj)
    return obj
  }

  public static async saveAsAdmin({
    accountObj,
    assetObj,
  }: {
    accountObj: Webtoken.Payload.Account
    assetObj: IAssetModel.Schema
  }): Promise<IAssetModel.Schema> {
    const saveQuery: IAssetModel.Schema = {
      ...assetObj,
      owner: assetObj.owner || accountObj.ref,
    }

    return assetModel.save(saveQuery)
  }

  public static async remove({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: {
      id: string
      caseId: string
    }
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    // webhook
    const caseId = search.caseId
    const connectionController = new ConnectionController()
    await connectionController.sendMessagesToCase(caseId, {
      type: WebSocketMessageEventType.ASSET_DELETED,
      data: {
        caseId,
        assetId: search.id,
      } as WebSocketAssetDataDeletedPayload,
    })
    if (caseId === '*') {
      console.log(
        `AssetResourceController.remove: cannot remove asset ${caseId} ${search.id}`,
      )
    } else {
      return assetModel.remove(removeQuery)
    }
  }

  public static async removeMultiple({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return assetModel.removeMultiple(removeQuery)
  }

  public static async removeImageBackground({
    accountObj,
    search,
  }: {
    accountObj: Webtoken.Payload.Account
    search: any
  }): Promise<any> {
    const removeQuery = {
      ...search,
    }

    return assetModel.removeImageBackground(removeQuery)
  }
}
