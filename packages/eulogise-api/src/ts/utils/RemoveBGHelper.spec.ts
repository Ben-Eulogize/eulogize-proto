import { FilestackHelper } from './FilestackHelper'
import expect from 'expect'
import { RemoveBGHelper } from './RemoveBGHelper'
import { BackgroundRemoveAPIImageFormat } from './RemoveBGHelper'

describe.skip('RemoveBGHelper', () => {
  let results: any
  describe('Remove background()', () => {
    describe('removeBackground', () => {
      it('should remove background and upload back to Filestack', async () => {
        const imageURL = 'https://cdn.filestackcontent.com/bTJLC8dXRfOm6JIUUEJv'
        const rbgBuffer = await RemoveBGHelper.removeBackground(
          imageURL,
          BackgroundRemoveAPIImageFormat.PNG,
        )
        console.log('rbgBuffer', rbgBuffer)
        results = await FilestackHelper.uploadFileByBuffer(rbgBuffer)
        expect(results).toEqual('')
      })
    })
  })
})
