import expect from 'expect'
import { EULOGISE_BACKGROUND_IMAGES } from '@eulogise/core'
import { BackgroundImageSetHelper } from './BackgroundImageSetHelper'

describe('BackgroundImageSetHelper', () => {
  describe('verifyBackgroundImageSet', () => {
    const backgroundImageSet = EULOGISE_BACKGROUND_IMAGES[0]
    describe('Assets exists', () => {
      it('should return an empty missing asset array', async () => {
        const missingAssets =
          await BackgroundImageSetHelper.verifyBackgroundImageSet(
            backgroundImageSet,
          )
        expect(missingAssets).toEqual([])
      })
    })

    describe('Asset not exist', () => {
      it('should return a list of missing assets', async () => {
        const missingAssets =
          await BackgroundImageSetHelper.verifyBackgroundImageSet({
            id: 'blah',
            name: 'Blah',
          })
        expect(missingAssets).toEqual([
          'backgroundImages/Blah/AU/Blah_BOOKLET_BACK_BLEED.jpg',
          'backgroundImages/Blah/USA/Blah_BOOKLET_BACK_BLEED.jpg',
        ])
      })
    })
  })

  describe('verifyBackgroundImageSets', () => {
    describe('All assets exists', () => {
      it('should return an empty image assets array', async () => {
        const missingAssets =
          await BackgroundImageSetHelper.verifyBackgroundImageSets()
        console.log('missing assets', missingAssets)
        expect(missingAssets).toEqual([])
      })
    })
  })
})
