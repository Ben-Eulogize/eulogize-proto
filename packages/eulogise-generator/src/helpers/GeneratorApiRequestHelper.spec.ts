import expect from 'expect'
import { GeneratorApiRequestHelper } from './GeneratorApiRequestHelper'
import { MOCK_SLIDESHOW_1 } from '@eulogise/mock'
import { EulogiseResource } from '@eulogise/core'

describe('GeneratorApiRequestHelper', () => {
  let results: any
  describe('findResource()', () => {
    const product = EulogiseResource.BOOKMARK
    const caseId = '6093121a-762a-4352-9679-f1905a1e2f54'
    beforeEach(async () => {
      try {
        results = await GeneratorApiRequestHelper.findResource(product, caseId)
      } catch (ex) {
        console.log(ex?.response?.data)
        throw new Error(ex)
      }
    })

    it('should return success', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toBeDefined()
    })

    describe('saveResource()', () => {
      beforeEach(async () => {
        const {
          items: [bookmark1],
        } = results
        try {
          results = await GeneratorApiRequestHelper.saveResource(product, {
            ...bookmark1,
            status: 'complete',
            fileStatus: 'generated',
          })
        } catch (ex) {
          console.log('ex', ex?.response?.data)
          throw new Error(ex)
        }
      })

      it('should return success', () => {
        console.log('results', JSON.stringify(results))
        expect(results).toBeDefined()
      })
    })
  })

  describe('saveResource()', () => {
    beforeEach(async () => {
      results = await GeneratorApiRequestHelper.saveResource(
        EulogiseResource.SLIDESHOW,
        MOCK_SLIDESHOW_1,
      )
    })

    it('should return success', () => {
      expect(results).toBeDefined()
    })
  })
})
