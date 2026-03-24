import { ThankYouCardInitialState, ThankYouCardReducer } from './reducer'
import { MOCK_THANK_YOU_CARD_1 } from '@eulogise/mock'
import { ICardProductData, ThankYouCardActionTypes } from '@eulogise/core'

describe('ThankYouCardState - Reducer', () => {
  let results: any

  describe('FETCH_THANK_YOU_CARDS_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ICardProductData> = [MOCK_THANK_YOU_CARD_1]

    beforeEach(() => {
      results = ThankYouCardReducer(ThankYouCardInitialState, {
        type: ThankYouCardActionTypes.FETCH_THANK_YOU_CARDS_BY_CASE_ID_SUCCESS,
        payload: { items },
      })
    })

    it('should update "items"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(items[0])
    })
  })
})
