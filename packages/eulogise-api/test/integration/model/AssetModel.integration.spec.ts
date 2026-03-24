import expect from 'expect'
import { AssetMockService } from '../../mock/AssetMockService'
import { assetModel } from '../../../src/ts/database'

describe('AssetModel - Integration', () => {
  let results: any

  const mockAssetService = new AssetMockService()

  describe('removeByCaseId()', () => {
    const caseId = '0f69ede7-98ee-4c98-9858-38c7be21d7a5'
    beforeEach(async () => {
      await assetModel.removeByCaseId({ caseId })
    })

    it('should have no more assets associated with the case', async () => {
      const results = await assetModel.findByCaseId(caseId)
      expect(results.length).toEqual(0)
    })
  })

  describe('getModel().query', () => {
    beforeEach(async () => {
      await mockAssetService.createMockItem({
        type: 'audio',
        case: 'mock-1',
      })
      await mockAssetService.createMockItem({
        type: 'audio',
        case: '*',
        owner: '*',
      })
      results = await assetModel
        .getModel()
        .query('type')
        .eq('audio')
        .filter('case')
        .in(['mock-1', '*'])
        .all()
        .exec()
    })

    it('should return all audios', () => {
      expect(results.length).toEqual(2)
    })
  })

  describe('findByCaseId', () => {
    beforeEach(async () => {
      const asset = await mockAssetService.createMockItem()
      results = await assetModel.findByCaseId(asset.case)
    })

    it('should return the asset', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('getImageCountByCaseId()', () => {
    beforeEach(async () => {
      const asset = await mockAssetService.createMockItem()
      results = await assetModel.getImageCountByCaseId(asset.case)
    })

    it('should return no of asset', () => {
      expect(results).toEqual(1)
    })
  })

  describe('getImagesByCaseId()', () => {
    beforeEach(async () => {
      const asset = await mockAssetService.createMockItem()
      results = await assetModel.getImagesByCaseId(asset.case)
    })

    it('should return images', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toBeDefined()
    })
  })
})
