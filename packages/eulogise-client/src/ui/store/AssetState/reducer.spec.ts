import { AssetInitialState, AssetReducer } from './reducer'
import {
  AssetType,
  IAsset,
  IAssetState,
  IAudioAsset,
  IImageAsset,
  AssetActionTypes,
} from '@eulogise/core'
import {
  MOCK_AUDIO_ASSET_1,
  MOCK_AUDIO_ASSET_2,
  MOCK_IMAGE_ASSET_1,
  MOCK_IMAGE_ASSET_2,
  MOCK_IMAGE_ASSET_3,
} from '@eulogise/mock'

describe('AssetState - Reducer', () => {
  let results: any

  describe('FETCH_ASSETS_BY_CASE_ID', () => {
    beforeEach(() => {
      results = AssetReducer(AssetInitialState, {
        type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID,
      })
    })

    it('should set isFetching to true', () => {
      expect(results.isFetching).toEqual(true)
    })
  })

  describe('FETCH_ASSETS_BY_CASE_ID_SUCCESS', () => {
    describe('Initial state', () => {
      describe('Images', () => {
        const items: Array<IAsset> = [MOCK_IMAGE_ASSET_1, MOCK_IMAGE_ASSET_2]

        const assetType = AssetType.IMAGE

        beforeEach(() => {
          results = AssetReducer(
            { ...AssetInitialState, isFetching: true },
            {
              type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
              payload: { items, assetType },
            },
          )
        })

        it('should update "items"', () => {
          expect(results.items).toEqual(items)
          expect(results.audios).toEqual([])
          expect(results.images).toEqual(items)
        })

        it('should set isFetching to false', () => {
          expect(results.isFetching).toEqual(false)
        })
      })

      describe('Audios', () => {
        const items: Array<IAsset> = [MOCK_AUDIO_ASSET_1, MOCK_AUDIO_ASSET_2]

        const assetType = AssetType.AUDIO

        beforeEach(() => {
          results = AssetReducer(AssetInitialState, {
            type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
            payload: { items, assetType },
          })
        })

        it('should update "items"', () => {
          expect(results.items).toEqual(items)
          expect(results.audios).toEqual(items)
          expect(results.images).toEqual([])
        })
      })
    })

    describe('Existing state', () => {
      const existingState: IAssetState = {
        items: [MOCK_IMAGE_ASSET_1, MOCK_AUDIO_ASSET_1],
        images: [MOCK_IMAGE_ASSET_1 as IImageAsset],
        audios: [MOCK_AUDIO_ASSET_1 as IAudioAsset],
      }
      describe('Images', () => {
        const items: Array<IAsset> = [
          MOCK_IMAGE_ASSET_1,
          MOCK_IMAGE_ASSET_2,
          MOCK_IMAGE_ASSET_3,
        ]

        const assetType = AssetType.IMAGE

        beforeEach(() => {
          results = AssetReducer(existingState, {
            type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
            payload: { items, assetType },
          })
        })

        it('should update "items"', () => {
          expect(results.items).toEqual([
            MOCK_IMAGE_ASSET_1,
            MOCK_IMAGE_ASSET_2,
            MOCK_IMAGE_ASSET_3,
            MOCK_AUDIO_ASSET_1,
          ])
          expect(results.images).toEqual([
            MOCK_IMAGE_ASSET_1,
            MOCK_IMAGE_ASSET_2,
            MOCK_IMAGE_ASSET_3,
          ])
          expect(results.audios).toEqual([MOCK_AUDIO_ASSET_1])
        })
      })

      describe('Audios', () => {
        const items: Array<IAsset> = [MOCK_AUDIO_ASSET_1, MOCK_AUDIO_ASSET_2]

        const assetType = AssetType.AUDIO

        beforeEach(() => {
          results = AssetReducer(existingState, {
            type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
            payload: { items, assetType },
          })
        })

        it('should update "items"', () => {
          expect(results.items).toEqual([
            MOCK_IMAGE_ASSET_1,
            MOCK_AUDIO_ASSET_1,
            MOCK_AUDIO_ASSET_2,
          ])
          expect(results.images).toEqual([MOCK_IMAGE_ASSET_1])
          expect(results.audios).toEqual(items)
        })
      })
    })
  })
})
