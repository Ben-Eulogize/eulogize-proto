import { MOCK_CASE_FIND_RESPONSE_1 } from '@eulogise/mock'
import { fetchCases } from './actions'
import { CaseActionTypes } from '@eulogise/core'

describe('CaseState - Actions', () => {
  let results: any

  describe('fetchCases()', () => {
    beforeEach(async () => {
      results = await fetchCases({})
    })

    it('should return FETCH_BOOKLETS_BY_CASE_ID_SUCCESS action', () => {
      expect(results).toEqual({
        type: CaseActionTypes.FETCH_CASES_SUCCESS,
        payload: MOCK_CASE_FIND_RESPONSE_1,
      })
    })
  })
})
