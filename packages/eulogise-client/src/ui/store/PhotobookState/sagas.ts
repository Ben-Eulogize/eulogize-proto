import { put, select, takeEvery, call } from 'redux-saga/effects'
import {
  EulogisePhotobookCoverType,
  EulogiseProduct,
  EulogiseProductThemeMap,
  ICardProductFrameImageContent,
  ICardProductTheme,
  ICaseState,
  IEulogiseState,
  IImageAsset,
} from '@eulogise/core'
import {
  CreatePhotobookAction,
  UpdatePhotobookCoverTypeAction,
} from './actions'
import {
  createCardProductByCaseId,
  updateCardProductPageByIndex,
} from '../CardProduct/actions'
import {
  CreatePhotobookMethod,
  PhotobookActionTypes,
} from '@eulogise/core/dist/types/Photobook.types'
import { AssetHelper, SlideshowHelper } from '@eulogise/helpers'
import { PhotobookHelper } from '@eulogise/helpers'
import { setFirstImageAsPrimaryImageNotSetSaga } from '../CardProduct/sagas'
import { handleDetectAllCaseFaces } from '../AssetState/sagas'

function* handleCreatePhotobook(action: CreatePhotobookAction) {
  console.log('handleCreatePhotobook', action)
  let progress = 0
  const {
    payload: {
      onSuccess,
      onProgress,
      noOfPages,
      method = CreatePhotobookMethod.START_FROM_BLANK,
      coverType,
      coverLayoutId,
      pageSize,
    },
  } = action
  const caseState: ICaseState = yield select(
    (state: IEulogiseState) => state.cases,
  )
  // @ts-ignore
  const imageAssetsFromLibrary = yield select((state: IEulogiseState) => {
    const images = state.assets.images ?? []
    const customisedImagesOrderIds =
      state.cases.activeItem?.customisedImagesOrderIds ?? []
    return AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
      images,
      customisedImagesOrderIds!,
    )
  }) as Array<IImageAsset>
  const { activeItem: slideshowData } = yield select(
    (state: IEulogiseState) => state.slideshows,
  )
  let imageAssets: Array<IImageAsset> = {
    [CreatePhotobookMethod.START_FROM_BLANK]: [],
    [CreatePhotobookMethod.COPY_FROM_VIDEO_TIMELINE]:
      SlideshowHelper.getSlideshowImageAssets({
        slideshowData,
        imageAssets: imageAssetsFromLibrary,
      }),
    [CreatePhotobookMethod.IMPORT_FROM_LIBRARY]: imageAssetsFromLibrary,
  }[method]
  progress = progress + 10 // 10%
  onProgress(progress)
  const { activeItem: activeCase } = caseState

  // Detect faces for all images in the case before creating photobook
  try {
    // @ts-ignore
    const faceDetectionResults: any = yield call(handleDetectAllCaseFaces, {
      payload: {
        caseId: activeCase?.id!,
        forceRedetect: false,
      },
    })

    // Update imageAssets with face detection data if available
    if (faceDetectionResults && faceDetectionResults.results) {
      // Create a map of assetId to updated asset with face detection
      const assetMap = new Map(
        faceDetectionResults.results.map((result: any) => [
          result.assetId,
          result.asset,
        ]),
      )

      // Update imageAssets with face detection data
      imageAssets = imageAssets.map((image) => {
        const updatedAsset = assetMap.get(image.id) as IImageAsset
        if (updatedAsset) {
          return updatedAsset
        }
        return image
      })

      console.log('Updated imageAssets with face detection data')
    }

    progress = progress + 5 // Add 5% for face detection
    onProgress(progress)
  } catch (error) {
    throw new Error(
      'Error during face detection before creating photobook: ' + error,
    )
  }
  yield setFirstImageAsPrimaryImageNotSetSaga()

  const product = EulogiseProduct.PHOTOBOOK
  const cardProductTheme = (yield PhotobookHelper.createPhotobookTheme({
    noOfPages,
    imageAssets: imageAssets.map(
      (i) =>
        ({
          ...i.content,
          type: 'image',
        } as ICardProductFrameImageContent),
    ),
    activeCase: activeCase!,
    coverType: coverType as EulogisePhotobookCoverType,
    coverLayoutId: coverLayoutId,
    onProgress: (p: number) => {
      const newProgress = parseInt((progress + p * 0.8).toFixed(0), 10) // account for 80% of the progress (5% was used for face detection)
      onProgress(newProgress)
    },
    pageSize,
  })) as unknown as ICardProductTheme

  yield put(
    createCardProductByCaseId({
      product,
      cardProductTheme,
      caseId: activeCase?.id!,
      themeId: cardProductTheme.id!,
      pageSize,
      theme: {
        clientId: '',
        // @ts-ignore
        products: {
          [EulogiseProductThemeMap.PHOTOBOOK]: cardProductTheme,
        },
      },
      isPopulatingData: false,
      populatedData: {},
      region: activeCase?.region!,
      onSaving: () => {
        onProgress(99) // the end - 100%
      },
      onSuccess: (id) => {
        onProgress(100)
        setTimeout(() => {
          onSuccess(id)
        }, 500)
      },
    }),
  )
}

function* handleUpdatePhotobookCoverType(
  action: UpdatePhotobookCoverTypeAction,
) {
  console.log('handleUpdatePhotobookCoverType', action)
  const { activeItem: photobook } = yield select(
    (s: IEulogiseState) => s.photobooks,
  )
  const {
    payload: { coverType },
  } = action
  const coverPage = photobook.content.pages[0]
  const pageSize = photobook.content.pageSize

  try {
    yield put(
      updateCardProductPageByIndex({
        product: EulogiseProduct.PHOTOBOOK,
        pageIndex: 0,
        page: {
          ...coverPage,
          background: PhotobookHelper.createCoverPageBackground({
            coverType,
            pageSize,
          }),
          coverType: coverType as EulogisePhotobookCoverType,
        },
      }),
    )
  } catch (ex) {
    console.error(ex)
    throw new Error('Error on handleUpdatePhotobookCoverType')
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(PhotobookActionTypes.CREATE_PHOTOBOOK, handleCreatePhotobook)
  yield takeEvery(
    PhotobookActionTypes.UPDATE_PHOTOBOOK_COVER_TYPE,
    handleUpdatePhotobookCoverType,
  )
}

export const PhotobookSagas = [watchers()]
