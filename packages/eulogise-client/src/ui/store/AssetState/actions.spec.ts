import { fetchAssetsByCaseId } from './actions'
import { MOCK_CASE_1, MOCK_IMAGE_ASSET_FIND_RESPONSE_1 } from '@eulogise/mock'
import { AssetType, AssetActionTypes } from '@eulogise/core'

describe('AssetState - Actions', () => {
  let results: any
  const caseId: string = MOCK_CASE_1.id

  describe('fetchAssetsByCaseId()', () => {
    beforeEach(() => {
      results = fetchAssetsByCaseId({
        caseId,
        assetType: AssetType.IMAGE,
      })
    })

    it('should return FETCH_ASSETS_BY_CASE_ID_SUCCESS action', () => {
      expect(results).toEqual({
        type: AssetActionTypes.FETCH_ASSETS_BY_CASE_ID_SUCCESS,
        payload: MOCK_IMAGE_ASSET_FIND_RESPONSE_1,
      })
    })
  })
})
