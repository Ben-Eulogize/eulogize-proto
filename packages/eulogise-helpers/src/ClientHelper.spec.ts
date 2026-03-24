import { EulogizeFeature } from '@eulogise/core'
import { ClientHelper } from './ClientHelper'

describe('ClientHelper', () => {
  describe('getAllFeatures', () => {
    it('should return all features', () => {
      expect(ClientHelper.getAllFeatures()).toEqual([
        EulogizeFeature.SLIDESHOW_VB,
      ])
    })
  })

  describe('getAllFeatureOptions', () => {
    it('should return all feature options', () => {
      expect(ClientHelper.getAllFeatureOptions()).toEqual([
        {
          value: EulogizeFeature.SLIDESHOW_VB,
          label: ClientHelper.getFeatureName(EulogizeFeature.SLIDESHOW_VB),
        },
      ])
    })
  })

  describe('convertArrayToFeatures', () => {
    it('should convert array to features', () => {
      const features = ['SLIDESHOW_VB']
      expect(ClientHelper.convertArrayToFeatures(features)).toEqual({
        SLIDESHOW_VB: true,
      })
    })
  })

  describe('convertFeatureAvailabilityStatusToArray', () => {
    it('should convert feature availability status to array', () => {
      const featureStatuses = {
        SLIDESHOW_VB: true,
      }
      expect(
        ClientHelper.convertFeatureAvailabilityStatusToArray(featureStatuses),
      ).toEqual([EulogizeFeature.SLIDESHOW_VB])
    })
  })
})
