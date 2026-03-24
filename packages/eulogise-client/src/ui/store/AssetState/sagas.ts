import { put, select, take, takeEvery } from 'redux-saga/effects'
import {
  AssetActionTypes,
  AssetType,
  EulogiseResource,
  IAudioAssetCategory,
  IAudioAssetContent,
  IImageAsset,
  IImageSize,
  RemoveBackgroundImageMode,
} from '@eulogise/core'
import axios from 'axios'
import RequestHelper from '../../helpers/RequestHelper'
import {
  DetectAllCaseFacesAction,
  DetectAssetFacesAction,
  FetchAssetsByCaseIdAction,
  fetchAudioAssetsByCaseId,
  FetchBrandsByClientIdAction,
  RemoveAssetAction,
  RemoveAssetsAction,
  RemoveImageBackgroundAction,
  saveAudioFromFileStack,
  SaveAudioFromFileStackAction,
  SaveAudiosFromFilestackAction,
  SaveBrandFromFilestackAction,
  SaveEditedAudioBufferAction,
  SaveImageAction,
  saveImageFromFilestack,
  SaveImageFromFilestackAction,
  SaveImagesFromFilestackAction,
  SaveImageWithInsertIndexAction,
  UpdateImagesOrdersAction,
} from './actions'
import { AssetHelper, ImageHelper } from '@eulogise/helpers'
import { Notification } from '@eulogise/client-components'
import { EulogiseEndpoint } from '@eulogise/client-core'

let isFetchingAudios = false
let isFetchingImages = false

function* handleFetchAssetsByCaseId(action: FetchAssetsByCaseIdAction) {
  const {
    payload: { caseId, assetType, sortBy, customisedImagesOrderIds },
  } = action
  try {
    if (assetType === AssetType.AUDIO) {
      if (isFetchingAudios) {
        console.log('It is already fetching audios')
        return
      } else {
        isFetchingAudios = true
      }
    } else if (assetType === AssetType.IMAGE) {
      if (isFetchingImages) {
        console.log('It is already fetching images')
        return
      } else {
        isFetchingImages = true
      }
    }

    if (!caseId) {
      throw new Error('fetchAssetsByCaseId: caseId must be provided')
    }
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.ASSET,
      caseId,
      additionalData: { type: assetType },
    })

    yield put({
      type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
      payload: {
        // @ts-ignore
        items: data?.items,
        assetType,
        sortBy,
        customisedImagesOrderIds,
      },
    })
  } catch (ex) {
    yield put({
      type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_FAILED,
    })
  }
  if (assetType === AssetType.AUDIO) {
    isFetchingAudios = false
  } else if (assetType === AssetType.IMAGE) {
    isFetchingImages = false
  }
}

function* handleFetchBrandsByClientId(action: FetchBrandsByClientIdAction) {
  try {
    const {
      payload: { clientId },
    } = action

    if (!clientId) {
      throw new Error('handleFetchBrandsByClientId: clientId must be provided')
    }
    const caseId = '*'
    const { data } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.ASSET,
      caseId,
      additionalData: {
        type: AssetType.BRAND,
        client: clientId,
        shouldSkipAccessControlCheck: true,
      },
    })

    yield put({
      type: AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID_SUCCESS,
      payload: {
        // @ts-ignore
        items: data?.items,
      },
    })
  } catch (ex) {
    yield put({
      type: AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID_FAILED,
    })
  }
}

function* handleSaveAudioFromFilestack(action: SaveAudioFromFileStackAction) {
  yield put({
    type: AssetActionTypes.SAVE_ASSET,
    payload: {
      type: AssetType.AUDIO,
    },
  })

  let tags: any
  const {
    payload: { caseId, file, onSuccess },
  } = action

  try {
    // @ts-ignore
    tags = yield AssetHelper.getAudioTag(file.originalFile)
    if (onSuccess) {
      onSuccess
    }
  } catch (ex) {
    // Some audio do not have tags, we could not retrieve from media tags header.
    tags = {
      title: file?.originalFile?.name || file?.filename,
      artist: 'No Aritst',
    }
    if (!tags.title) {
      // throw error when no audio filename
      yield put({
        type: AssetActionTypes.SAVE_ASSET_FAILED,
        payload: {
          type: AssetType.AUDIO,
          ex,
        },
      })
    }
  }

  const duration: number = yield AssetHelper.getAudioDuration(file.url)

  try {
    const {
      data: {
        item: { content: audioContent },
      },
    } = yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, {
      case: caseId,
      content: {
        title: tags.title,
        artist: tags.artist,
        filename: file.filename,
        filepath: file.filename,
        filestackHandle: file.handle,
        duration: Math.round(duration * 1000),
        category: IAudioAssetCategory.UPLOADED,
      },
      type: AssetType.AUDIO,
    })

    yield put({
      type: AssetActionTypes.SAVE_ASSET_SUCCESS,
      payload: {
        type: AssetType.AUDIO,
      },
    })
    onSuccess(audioContent)
    yield put(fetchAudioAssetsByCaseId(caseId))
  } catch (ex) {
    yield put({
      type: AssetActionTypes.SAVE_ASSET_FAILED,
      payload: {
        type: AssetType.AUDIO,
        ex,
      },
    })
  }
}

function* handleSaveEditedAudioBuffer(action: SaveEditedAudioBufferAction) {
  try {
    const {
      payload: {
        key,
        caseId,
        editedAudioFromFileStack,
        fileName,
        previousEditedAudioId,
        onSuccess,
      },
    } = action
    // generate S3 pre-signed url to upload edited audio
    const { data } = yield RequestHelper.generatePreSignedUrlRequest(
      EulogiseResource.ASSET,
      {
        key,
      },
    )

    const preSignedUrl: string = data?.item?.preSignedUrl
    yield axios.put(preSignedUrl, editedAudioFromFileStack)

    // Save records in the backend
    const duration: number = yield AssetHelper.getAudioDuration(
      editedAudioFromFileStack.url,
    )

    const {
      data: {
        item: { content: audioContent },
      },
    } = yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, {
      id: previousEditedAudioId,
      case: caseId,
      content: {
        title: fileName!,
        artist: '',
        filename: editedAudioFromFileStack.key?.split('/').pop()!,
        filepath: editedAudioFromFileStack.key,
        filestackHandle: editedAudioFromFileStack.handle,
        duration: Math.round(duration * 1000),
        category: IAudioAssetCategory.UPLOADED,
      },
      type: AssetType.AUDIO,
    })

    if (onSuccess) {
      onSuccess(audioContent)
    }

    yield put(fetchAudioAssetsByCaseId(caseId))
    yield put({
      type: AssetActionTypes.SAVE_ASSET_SUCCESS,
      payload: {
        type: AssetType.AUDIO,
      },
    })
  } catch (ex) {
    yield put({
      type: AssetActionTypes.SAVE_ASSET_FAILED,
      payload: {
        type: AssetType.AUDIO,
        ex,
      },
    })
  }
}

function* handleSaveAudiosFromFilestack(action: SaveAudiosFromFilestackAction) {
  const {
    payload: { caseId, files, onSuccess },
  } = action
  const noOfFiles = files.length
  let saveItems: Array<IAudioAssetContent> = []
  for (const file of files) {
    yield put(
      saveAudioFromFileStack({
        caseId,
        file,
        onSuccess: (audioAssetContent) => {
          saveItems.push(audioAssetContent)
          if (saveItems.length === noOfFiles) {
            onSuccess(saveItems)
          }
        },
      }),
    )
  }
}

function* handleSaveImage(action: SaveImageAction) {
  yield put({
    type: AssetActionTypes.SAVE_ASSET,
    payload: {
      type: AssetType.IMAGE,
    },
  })
  try {
    const {
      payload: { file, onSuccess },
    } = action

    // Get old filestackHandle from current state before saving
    const oldFilestackHandle = file?.content?.filestackHandle

    console.log('handleSaveImage file', file)
    const {
      data: { item: image },
    }: { data: { item: IImageAsset } } =
      yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, file)

    yield put({
      type: AssetActionTypes.SAVE_ASSET_SUCCESS,
      payload: {
        type: AssetType.IMAGE,
        image,
        oldFilestackHandle,
      },
    })

    if (onSuccess) {
      onSuccess()
    } else {
      Notification.success('Image saved')
    }
  } catch (ex) {
    yield put({
      type: AssetActionTypes.SAVE_ASSET_FAILED,
      payload: {
        type: AssetType.IMAGE,
        ex,
      },
    })
    Notification.error('Failed to upload new image')
  }
}

function* handleSaveImageWithInsertIndex(
  action: SaveImageWithInsertIndexAction,
) {
  yield put({
    type: AssetActionTypes.SAVE_ASSET,
    payload: {
      type: AssetType.IMAGE,
    },
  })

  try {
    const {
      payload: { newImageInsertIndex, file, onSaveNewCustomisedImageOrderIds },
    } = action

    // Get old filestackHandle from the file before saving
    const oldFilestackHandle = file?.content?.filestackHandle

    const {
      data: { item: image },
    }: { data: { item: IImageAsset } } =
      yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, file)

    if (newImageInsertIndex !== undefined) {
      yield put({
        type: AssetActionTypes.SAVE_ASSET_SUCCESS_WITH_INSERT_INDEX,
        payload: {
          type: AssetType.IMAGE,
          image,
          insertIndex: newImageInsertIndex,
          oldFilestackHandle,
        },
      })
    }
    if (
      onSaveNewCustomisedImageOrderIds &&
      newImageInsertIndex &&
      newImageInsertIndex >= 0
    ) {
      onSaveNewCustomisedImageOrderIds(image?.id, newImageInsertIndex)
    }
    yield put({
      type: AssetActionTypes.UPLOAD_EDITED_IMAGE_SUCCESS,
      payload: {},
    })
  } catch (ex) {
    yield put({
      type: AssetActionTypes.SAVE_ASSET_FAILED,
      payload: {
        type: AssetType.IMAGE,
        ex,
      },
    })
    yield put({
      type: AssetActionTypes.UPLOAD_EDITED_IMAGE_FAILED,
      payload: {},
    })
    Notification.error('Failed to upload new image with an insert index')
  }
}

function* handleSaveImageFromFilestack(action: SaveImageFromFilestackAction) {
  console.log('saveImageFromFilestack')
  yield put({
    type: AssetActionTypes.SAVE_ASSET,
    payload: {
      type: AssetType.IMAGE,
    },
  })

  const {
    payload: { caseId, file, complete },
  } = action

  const MAX_RETRIES = 5
  let lastError: any = null

  // Retry loop
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `handleSaveImageFromFilestack: Attempt ${attempt} of ${MAX_RETRIES}`,
      )

      const fileName = file.filename
      if (!fileName) {
        throw new Error(
          'handleSaveImageFromFilestack: fileName must not be empty',
        )
      }

      /*
      const newFile: filestack.PickerFileMetadata =
        yield ImageHelper.storeFilestackImage(file.handle)
*/
      const imageSize: IImageSize = yield ImageHelper.getImageSizeByFile(file)
      const imageOrientation = ImageHelper.getImageOrientationBySize(imageSize)
      const {
        data: { item: image },
      }: { data: { item: IImageAsset } } =
        yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, {
          case: caseId,
          content: {
            filename: fileName,
            filepath: fileName,
            filestackHandle: file.handle,
            width: imageSize?.width,
            height: imageSize?.height,
            orientation: imageOrientation,
          },
          type: AssetType.IMAGE,
        })

      yield put({
        type: AssetActionTypes.SAVE_ASSET_SUCCESS,
        payload: {
          type: AssetType.IMAGE,
          image,
        },
      })

      console.log(`handleSaveImageFromFilestack: Success on attempt ${attempt}`)

      if (complete) {
        complete()
      }

      // Success - exit the retry loop
      return
    } catch (ex) {
      lastError = ex
      console.error(
        `handleSaveImageFromFilestack: Attempt ${attempt} failed:`,
        ex,
      )

      // If this was the last attempt, fail permanently
      if (attempt === MAX_RETRIES) {
        console.error(
          `handleSaveImageFromFilestack: All ${MAX_RETRIES} attempts failed`,
        )
        yield put({
          type: AssetActionTypes.SAVE_ASSET_FAILED,
          payload: {
            type: AssetType.IMAGE,
            ex: lastError,
          },
        })

        if (complete) {
          complete()
        }
        return
      }

      // Wait before retrying (exponential backoff: 1s, 2s, 4s, 8s)
      const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 8000)
      console.log(`handleSaveImageFromFilestack: Retrying in ${delayMs}ms...`)
      yield new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

function* handleSaveBrandFromFilestack(action: SaveBrandFromFilestackAction) {
  console.log('saveBrandFromFilestack')
  yield put({
    type: AssetActionTypes.SAVE_ASSET,
    payload: {
      type: AssetType.BRAND,
    },
  })

  const {
    payload: { client, file, complete },
  } = action

  if (!client) {
    throw new Error('saveBrandFromFilestack: client must be provided')
  }

  try {
    const fileName = file.filename
    const filestackHandle = file?.url?.replace(
      `${process.env.GATSBY_FILESTACK_CDN}/`,
      '',
    )
    if (!fileName) {
      throw new Error(
        'handleSaveBrandFromFilestack: fileName must not be empty',
      )
    }
    const {
      data: { item: brand },
    }: { data: { item: IImageAsset } } =
      yield RequestHelper.saveResourceRequest(EulogiseResource.ASSET, {
        case: '*',
        client,
        content: {
          filename: fileName,
          filepath: fileName,
          filestackHandle,
        },
        type: AssetType.BRAND,
      })

    yield put({
      type: AssetActionTypes.SAVE_ASSET_SUCCESS,
      payload: {
        type: AssetType.BRAND,
        brand,
      },
    })
  } catch (ex) {
    yield put({
      type: AssetActionTypes.SAVE_ASSET_FAILED,
      payload: {
        type: AssetType.BRAND,
        ex,
      },
    })
  }
  if (complete) {
    complete()
  }
}

function* handleSaveImagesFromFilestack(action: SaveImagesFromFilestackAction) {
  const {
    payload: { caseId, complete, files },
  } = action

  for (const file of files) {
    yield put(saveImageFromFilestack({ caseId, file }))
  }
  if (complete) {
    complete()
  }
}

function* handleRemoveAsset(action: RemoveAssetAction) {
  const {
    payload: { assetId, onSuccess, assetType },
  } = action
  try {
    // @ts-ignore
    const { activeItem: activeCase } = yield select((state) => state.cases)
    if (!assetId) {
      throw Error('Remove asset failed, no assetId provided.')
    }
    yield RequestHelper.removeResourceRequest({
      resource: EulogiseResource.ASSET,
      itemId: assetId,
      caseId: activeCase?.id,
    })

    yield put({
      type: AssetActionTypes.REMOVE_ASSET_SUCCESS,
      payload: {
        assetId,
      },
    })
    if (onSuccess) {
      onSuccess()
    } else {
      // Make the first letter uppercase
      const msg = `${
        assetType.charAt(0).toUpperCase() + assetType.slice(1)
      } removed.`
      Notification.success(msg)
    }
  } catch (ex) {
    yield put({
      type: AssetActionTypes.REMOVE_ASSET_FAILED,
      payload: {
        ex,
      },
    })
    Notification.error(`Failed to remove the ${assetType}.`)
  }
}

function* handleRemoveAssets(action: RemoveAssetsAction) {
  const {
    payload: { assetIds, onSuccess, onFailed },
  } = action
  try {
    if (!assetIds) {
      throw Error('Remove asset failed, no assetIds provided.')
    }
    yield RequestHelper.removeResourceRequests(EulogiseResource.ASSET, assetIds)

    yield put({
      type: AssetActionTypes.REMOVE_ASSETS_SUCCESS,
      payload: {
        assetIds,
      },
    })
    if (onSuccess) {
      onSuccess()
    } else {
      // Make the first letter uppercase
      const msg = `${assetIds.length} assets removed.`
      Notification.success(msg)
    }
  } catch (ex) {
    yield put({
      type: AssetActionTypes.REMOVE_ASSETS_FAILED,
      payload: {
        ex,
      },
    })
    if (onFailed) {
      onFailed()
    } else {
      Notification.error(`Failed to remove assets.`)
    }
  }
}

function* handleRemoveImageBackground(action: RemoveImageBackgroundAction) {
  const {
    payload: { assetId, onSuccess, mode },
  } = action
  try {
    if (!assetId) {
      throw Error('Remove asset failed, no assetId provided.')
    }

    // Get old filestackHandle from current state before removing background
    const images: Array<IImageAsset> = yield select(
      (state: any) => state.assets?.images ?? [],
    )
    const existingAsset = images.find((img: IImageAsset) => img.id === assetId)
    const oldFilestackHandle = existingAsset?.content?.filestackHandle

    Notification.info('Image background is being removed')
    const { data } = yield RequestHelper.removeImageBackgroundResource(
      EulogiseResource.ASSET,
      assetId,
      mode,
    )

    yield put({
      type: AssetActionTypes.REMOVE_IMAGE_BACKGROUND_SUCCESS,
      payload: {
        assetId,
      },
    })

    if (onSuccess) {
      onSuccess()
    } else {
      Notification.success('Image background removed.')
    }

    // Wait for the asset refetch to complete, then update card products
    if (oldFilestackHandle) {
      yield take(AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS)
      const updatedImages: Array<IImageAsset> = yield select(
        (state: any) => state.assets?.images ?? [],
      )

      let newAsset: IImageAsset | undefined
      if (mode === RemoveBackgroundImageMode.KEEP_NEW_IMAGE_ONLY) {
        // Original asset was replaced - find it by ID
        const updatedAsset = updatedImages.find(
          (img: IImageAsset) => img.id === assetId,
        )
        if (
          updatedAsset &&
          updatedAsset.content?.filestackHandle !== oldFilestackHandle
        ) {
          newAsset = updatedAsset
        }
      } else if (mode === RemoveBackgroundImageMode.KEEP_NEW_AND_OLD_IMAGES) {
        // A new asset was created - find the one with isRemovedBackgroundImage
        // that wasn't in the original images list
        const existingImageIds = new Set(
          images.map((img: IImageAsset) => img.id),
        )
        newAsset = updatedImages.find(
          (img: IImageAsset) =>
            !existingImageIds.has(img.id) &&
            img.content?.isRemovedBackgroundImage,
        )
      }

      if (newAsset) {
        yield put({
          type: AssetActionTypes.SAVE_ASSET_SUCCESS,
          payload: {
            type: AssetType.IMAGE,
            image: newAsset,
            oldFilestackHandle,
          },
        })
      }
    }
  } catch (ex) {
    yield put({
      type: AssetActionTypes.REMOVE_IMAGE_BACKGROUND_FAILED,
      payload: {
        ex,
      },
    })
    Notification.error(`Failed to remove image background.`)
  }
}

function* handleUpdateImagesOrder(action: UpdateImagesOrdersAction) {
  const {
    payload: { complete },
  } = action
  if (complete) {
    complete()
  }
}

/* Watchers */
export function* handleDetectAllCaseFaces(action: DetectAllCaseFacesAction) {
  const {
    payload: { caseId, forceRedetect = false, onSuccess, onError },
  } = action

  try {
    if (!caseId) {
      throw new Error('detectAllCaseFaces: caseId must be provided')
    }

    // Call the API endpoint
    const { data } = yield RequestHelper.requestWithToken(
      EulogiseEndpoint.FACE_DETECTION_BY_CASE_ID.replace('{caseId}', caseId),
      {
        data: {
          forceRedetect,
        },
        method: 'POST',
      },
    )

    // Update all assets in the store
    if (data.results && data.results.length > 0) {
      // Process successful detections
      const successfulAssets = data.results.map((result: any) => result.asset)

      yield put({
        type: AssetActionTypes.DETECT_ALL_CASE_FACES_SUCCESS,
        payload: {
          assets: successfulAssets,
          results: data.results,
        },
      })
    }

    // Call success callback if provided
    if (onSuccess) {
      onSuccess({
        processedImages: data.processedImages,
        failedImages: data.failedImages,
        results: data.results,
      })
    }
    return data
  } catch (error: any) {
    console.error('Bulk face detection error:', error)

    const errorMessage = error?.message || 'Bulk face detection failed'
    yield put({
      type: AssetActionTypes.DETECT_ALL_CASE_FACES_FAILED,
      payload: {
        error: errorMessage,
      },
    })

    // Call error callback if provided
    if (onError) {
      onError(errorMessage)
    }

    // Show error notification
    Notification.error(
      'Face Detection Failed',
      errorMessage || 'Unable to detect faces in images',
    )
  }
}

function* handleDetectAssetFaces(action: DetectAssetFacesAction) {
  const {
    payload: {
      assetId,
      forceRedetect = false,
      oldFilestackHandle,
      onSuccess,
      onError,
    },
  } = action

  try {
    if (!assetId) {
      throw new Error('detectAssetFaces: assetId must be provided')
    }

    // Call the API endpoint
    const { data } = yield RequestHelper.requestWithToken(
      `/v2/assets/${assetId}/face-detection`,
      {
        data: {
          forceRedetect,
        },
        method: 'POST',
      },
    )

    if (data?.success && data?.asset) {
      // Update the asset in the store
      yield put({
        type: AssetActionTypes.DETECT_ASSET_FACES_SUCCESS,
        payload: {
          asset: data.asset,
          oldFilestackHandle,
          newFilestackHandle: data.asset?.content?.filestackHandle,
        },
      })

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data.asset)
      }
    } else {
      throw new Error(data?.message || 'Face detection failed')
    }
  } catch (error: any) {
    console.error('Face detection error:', error)

    const errorMessage = error?.message || 'Face detection failed'
    yield put({
      type: AssetActionTypes.DETECT_ASSET_FACES_FAILED,
      payload: {
        error: errorMessage,
      },
    })

    // Call error callback if provided
    if (action.payload.onError) {
      action.payload.onError(errorMessage)
    }

    if (onError) {
      onError('Face Detection Failed')
    }

    // Show notification
    Notification.error('Face Detection Failed')
  }
}

function* watchers() {
  yield takeEvery(
    AssetActionTypes.FETCH_ASSETS_BY_CASE_ID,
    handleFetchAssetsByCaseId,
  )
  yield takeEvery(
    AssetActionTypes.FETCH_BRANDS_BY_CLIENT_ID,
    handleFetchBrandsByClientId,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_AUDIO_FROM_FILESTACK,
    handleSaveAudioFromFilestack,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_EDITED_AUDIO_BUFFER,
    handleSaveEditedAudioBuffer,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_AUDIOS_FROM_FILESTACK,
    handleSaveAudiosFromFilestack,
  )
  yield takeEvery(AssetActionTypes.SAVE_IMAGE, handleSaveImage)
  yield takeEvery(
    AssetActionTypes.SAVE_IMAGE_WITH_INSERT_INDEX,
    handleSaveImageWithInsertIndex,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_IMAGE_FROM_FILESTACK,
    handleSaveImageFromFilestack,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_BRAND_FROM_FILESTACK,
    handleSaveBrandFromFilestack,
  )
  yield takeEvery(
    AssetActionTypes.SAVE_IMAGES_FROM_FILESTACK,
    handleSaveImagesFromFilestack,
  )
  yield takeEvery(AssetActionTypes.UPDATE_IMAGES_ORDER, handleUpdateImagesOrder)
  yield takeEvery(AssetActionTypes.REMOVE_ASSET, handleRemoveAsset)
  yield takeEvery(AssetActionTypes.REMOVE_ASSETS, handleRemoveAssets)
  yield takeEvery(
    AssetActionTypes.REMOVE_IMAGE_BACKGROUND,
    handleRemoveImageBackground,
  )
  yield takeEvery(AssetActionTypes.DETECT_ASSET_FACES, handleDetectAssetFaces)
  yield takeEvery(
    AssetActionTypes.DETECT_ALL_CASE_FACES,
    handleDetectAllCaseFaces,
  )
}

export const AssetSagas = [watchers()]
