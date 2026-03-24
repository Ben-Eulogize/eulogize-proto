import { IImageAsset } from '@eulogise/core'
import { AssetHelper } from './AssetHelper'
import {
  MOCK_AUDIO_ASSET_1,
  MOCK_AUDIO_ASSET_2,
  MOCK_AUDIO_ASSET_6,
  MOCK_AUDIO_ASSET_8,
  MOCK_IMAGE_ASSET_1,
  MOCK_IMAGE_ASSET_2,
  MOCK_IMAGE_ASSET_3,
  MOCK_IMAGE_ASSET_4,
  MOCK_IMAGE_ASSET_5,
} from '@eulogise/mock'

describe('AssetHelper', () => {
  let results: any

  describe('categoriseAudios()', () => {
    beforeEach(() => {
      results = AssetHelper.categoriseAudios([
        MOCK_AUDIO_ASSET_1,
        MOCK_AUDIO_ASSET_2,
        MOCK_AUDIO_ASSET_6,
        MOCK_AUDIO_ASSET_8,
      ])
    })

    it('should return grouped audios', () => {
      expect(results).toEqual([
        { name: 'Uploaded', audios: [MOCK_AUDIO_ASSET_8] },
        { name: 'Strings', audios: [MOCK_AUDIO_ASSET_1, MOCK_AUDIO_ASSET_6] },
        { name: 'Bright', audios: [MOCK_AUDIO_ASSET_2] },
      ])
    })
  })

  describe('removeNonExistedImagesFromCustomImagesOrderIds()', () => {
    let images: Array<IImageAsset>
    let customisedImagesOrderIds: Array<string>
    beforeEach(() => {
      customisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_4,
      ]?.map((i) => i?.id)
    })

    it('should return empty array if orderId is undefined', () => {
      customisedImagesOrderIds = undefined!
      images = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_5,
      ]
      results = AssetHelper.removeNonExistedImagesFromCustomImagesOrderIds(
        images,
        customisedImagesOrderIds,
      )
      expect(results).toEqual([])
    })

    it('should return empty array if orderId is an empty array', () => {
      customisedImagesOrderIds = []
      images = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_5,
      ]
      results = AssetHelper.removeNonExistedImagesFromCustomImagesOrderIds(
        images,
        customisedImagesOrderIds,
      )
      expect(results).toEqual([])
    })

    it('should return orderIds array if no images', () => {
      images = []
      results = AssetHelper.removeNonExistedImagesFromCustomImagesOrderIds(
        images,
        customisedImagesOrderIds,
      )
      expect(results).toEqual(customisedImagesOrderIds)
    })

    it('should return all imagesIds in orderImagesArray if no removal', () => {
      images = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_4,
      ]
      results = AssetHelper.removeNonExistedImagesFromCustomImagesOrderIds(
        images,
        customisedImagesOrderIds,
      )
      expect(results).toEqual(customisedImagesOrderIds)
    })

    it('should return all existed images in order array if one of images are removed', () => {
      images = [MOCK_IMAGE_ASSET_1, MOCK_IMAGE_ASSET_2, MOCK_IMAGE_ASSET_4]
      const expectedCustomisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_4,
      ]?.map((i) => i?.id)
      results = AssetHelper.removeNonExistedImagesFromCustomImagesOrderIds(
        images,
        customisedImagesOrderIds,
      )
      expect(results).toEqual(expectedCustomisedImagesOrderIds)
    })
  })

  describe('getNewImagesOrderByStoredImagesOrderIds()', () => {
    let images: Array<IImageAsset>
    let customisedImagesOrderIds: Array<string>
    beforeEach(() => {})

    it('should return empty array if no images, and no customisedImagesOrdersIds array', () => {
      images = []
      customisedImagesOrderIds = []
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([])
    })

    it('should return empty array if no images, with an existed customisedImagesOrdersIds array', () => {
      images = []
      customisedImagesOrderIds = [MOCK_IMAGE_ASSET_1, MOCK_IMAGE_ASSET_2]?.map(
        (i) => i?.id,
      )
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([])
    })

    it('should return images if no customisedImagesOrderIds array', () => {
      images = [MOCK_IMAGE_ASSET_1, MOCK_IMAGE_ASSET_2]
      customisedImagesOrderIds = []
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual(images)
    })

    it('should return images if no customisedImagesOrderIds is the same order', () => {
      images = [MOCK_IMAGE_ASSET_1, MOCK_IMAGE_ASSET_2]
      customisedImagesOrderIds = images?.map((i) => i?.id)
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual(images)
    })

    it('should return correct order if customisedImagesOrderIds is different than the image order', () => {
      images = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_4,
      ]
      customisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
      ]?.map((i) => i?.id)
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
      ])
    })

    it('should return correct order if customisedImagesOrderIds is different than the image order, and one of the image was removed before the existed orderIds array was stored', () => {
      images = [MOCK_IMAGE_ASSET_2, MOCK_IMAGE_ASSET_3, MOCK_IMAGE_ASSET_4]
      customisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
      ]?.map((i) => i?.id)
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([MOCK_IMAGE_ASSET_4, MOCK_IMAGE_ASSET_3, MOCK_IMAGE_ASSET_2])
    })

    it('should return correct order if customisedImagesOrderIds is different than the image order, and one new image is added but not in the existed orderIds array', () => {
      images = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_5,
      ]
      customisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
      ]?.map((i) => i?.id)
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([
        MOCK_IMAGE_ASSET_4,
        MOCK_IMAGE_ASSET_3,
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_5,
      ])
    })

    it('should return correct order if customisedImagesOrderIds is different than the image order, a new image is added and an old image is removed, neither was in the orderId array', () => {
      images = [MOCK_IMAGE_ASSET_2, MOCK_IMAGE_ASSET_3, MOCK_IMAGE_ASSET_4]
      customisedImagesOrderIds = [
        MOCK_IMAGE_ASSET_1,
        MOCK_IMAGE_ASSET_2,
        MOCK_IMAGE_ASSET_3,
      ]?.map((i) => i?.id)
      expect(
        AssetHelper.getNewImagesOrderByStoredImagesOrderIds(
          images,
          customisedImagesOrderIds,
        ),
      ).toEqual([MOCK_IMAGE_ASSET_2, MOCK_IMAGE_ASSET_3, MOCK_IMAGE_ASSET_4])
    })
  })
})
