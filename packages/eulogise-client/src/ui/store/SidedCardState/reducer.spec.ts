import { SidedCardInitialState, SidedCardReducer } from './reducer'
import { MOCK_SIDED_CARD_1 } from '@eulogise/mock'
import { ICardProductData, SidedCardActionTypes } from '@eulogise/core'

describe('SidedCardState - Reducer', () => {
  let results: any

  describe('FETCH_SIDED_CARDS_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ICardProductData> = [MOCK_SIDED_CARD_1]

    beforeEach(() => {
      results = SidedCardReducer(SidedCardInitialState, {
        type: SidedCardActionTypes.FETCH_SIDED_CARDS_BY_CASE_ID_SUCCESS,
        payload: { items },
      })
    })

    it('should update "items" and "activeItem"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(items[0])
    })
  })
})
