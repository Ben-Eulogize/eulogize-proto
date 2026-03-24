import expect from 'expect'
import { GeneratorBackgroundImageController } from './GeneratorBackgroundImageController'
import { BackgroundImageProcessPayload } from '../types/GeneratorProcessJob.types'

describe('GeneratorBackgroundImageController', () => {
  describe('generateBackgroundImage', () => {
    it('should generate background image', async () => {
      const payload: BackgroundImageProcessPayload = {
        backgroundImageId: 'c2ba1ce3-f7a3-40eb-90fa-869d859933fd',
        type: 'BOOKLET_BACK',
        image: {
          url: 'https://staging.media.eulogisememorials.com/backgroundImages/c2ba1ce3-f7a3-40eb-90fa-869d859933fd/edited_BOOKLET_AU.jpg',
        },
      }
      await GeneratorBackgroundImageController.generateBackgroundImage(payload)
      expect(true).toEqual(true)
    })
  })
})
