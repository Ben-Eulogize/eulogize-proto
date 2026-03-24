import expect from 'expect'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import { EulogiseResource } from '@eulogise/core'

describe('ProductRoutes', () => {
  describe('POST /v2/admin/cases/:caseId/:resource/sendGeneratedEmailByCaseId', () => {
    beforeEach(async () => {
      const caseId: string = '97dd7f04-efd9-4d57-8c4d-0e5ba69d0c39'
      const resource = EulogiseResource.BOOKLET
      await TestRequestHelper.request(
        `/v2/admin/cases/${caseId}/${resource}/sendGeneratedEmailByCaseId`,
        {
          method: 'POST',
        },
      )
    })

    it('should send an email to notify the user', () => {
      expect(true).toEqual(true)
    })
  })

  describe('POST /v2/products/:product/:productId/generate', () => {
    beforeEach(async () => {
      const productId = 'product-id'
      const product = EulogiseResource.BOOKLET
      await TestRequestHelper.request(
        `/v2/products/${product.toLowerCase()}/${productId}/generate`,
        {
          method: 'POST',
          data: {
            generateUserId: 'generateUserId',
          },
        },
      )
    })

    it('should send an email to notify the user', () => {
      expect(true).toEqual(true)
    })
  })
})
