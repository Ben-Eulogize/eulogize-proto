import { BookletInitialState, BookletReducer } from './reducer'
import { MOCK_BOOKLET_1 } from '@eulogise/mock'
import { EulogiseResourceHelper } from '../../helpers/EulogiseResourceHelper'
import {
  CardProductActionTypes,
  EulogiseProduct,
  ICardProductData,
} from '@eulogise/core'

describe('BookletState - Reducer', () => {
  let results: any

  describe('FETCH_BOOKLETS_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ICardProductData> = [MOCK_BOOKLET_1]

    beforeEach(() => {
      results = BookletReducer(BookletInitialState, {
        type: CardProductActionTypes.FETCH_CARD_PRODUCTS_BY_CASE_ID_SUCCESS,
        payload: { productType: EulogiseProduct.BOOKLET, products: items },
      })
    })

    it('should update "items" and "activeItem"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(
        EulogiseResourceHelper.getLatestItem(items),
      )
    })
  })
})
