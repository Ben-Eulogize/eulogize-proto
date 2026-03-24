import { fetchSlideshowsByCaseId } from './actions'
import { MOCK_CASE_1, MOCK_SLIDESHOW_FIND_RESPONSE_1 } from '@eulogise/mock'
import { SlideshowActionTypes } from '@eulogise/core'

describe('SlideshowState - Actions', () => {
  let results: any
  const caseId: string = MOCK_CASE_1.id

  describe('fetchSlideshowsByCaseId()', () => {
    beforeEach(() => {
      results = fetchSlideshowsByCaseId({ caseId })
    })

    it('should return FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS action', () => {
      expect(results).toEqual({
        type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS,
        payload: MOCK_SLIDESHOW_FIND_RESPONSE_1,
      })
    })
  })
})
