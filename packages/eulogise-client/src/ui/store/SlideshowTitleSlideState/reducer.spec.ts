import { MOCK_THANK_YOU_CARD_1 } from '@eulogise/mock'
import {
  ICardProductData,
  SlideshowTitleSlideActionTypes,
} from '@eulogise/core'
import {
  SlideshowTitleSlideInitialState,
  SlideshowTitleSlideReducer,
} from './reducer'

describe('SlideshowTitleSlideScreenState - Reducer', () => {
  let results: any

  describe('FETCH_TV_WELCOME_SCREEN_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ICardProductData> = [MOCK_THANK_YOU_CARD_1]

    beforeEach(() => {
      results = SlideshowTitleSlideReducer(SlideshowTitleSlideInitialState, {
        type: SlideshowTitleSlideActionTypes.FETCH_SLIDESHOW_TITLE_SLIDE_BY_CASE_ID_SUCCESS,
        payload: { items },
      })
    })

    it('should update "items"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(items[0])
    })
  })
})
