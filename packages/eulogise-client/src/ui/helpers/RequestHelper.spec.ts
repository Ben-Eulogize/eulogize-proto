import RequestHelper from './RequestHelper'
import {
  MOCK_CASE_1,
  MOCK_CASE_FIND_RESPONSE_1,
  MOCK_BOOKLET_FIND_RESPONSE_1,
} from '@eulogise/mock'
import { EulogiseResource } from '@eulogise/core'
import { EulogiseEndpoint } from '@eulogise/client-core'

describe('RequestHelper', () => {
  let results: any
  const caseId = MOCK_CASE_1.id

  describe('request()', () => {
    beforeEach(async () => {
      results = await RequestHelper.request(EulogiseEndpoint.FIND_RESOURCE, {
        method: 'POST',
        data: {
          resource: EulogiseResource.BOOKLET,
          search: {
            case: caseId,
          },
        },
      })
    })

    it('should return expected results', () => {
      expect(results.data).toEqual(MOCK_BOOKLET_FIND_RESPONSE_1)
    })
  })

  describe('findResourceRequest()', () => {
    describe('without caseId', () => {
      beforeEach(async () => {
        results = await RequestHelper.findResourceRequest({
          resource: EulogiseResource.CASE,
        })
      })

      it('should return expected results', () => {
        expect(results.data).toEqual(MOCK_CASE_FIND_RESPONSE_1)
      })
    })

    describe('with caseId', () => {
      beforeEach(async () => {
        results = await RequestHelper.findResourceRequest({
          resource: EulogiseResource.BOOKLET,
          caseId,
        })
      })

      it('should return expected results', () => {
        expect(results.data).toEqual(MOCK_BOOKLET_FIND_RESPONSE_1)
      })
    })
  })
})
