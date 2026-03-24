import { BookmarkInitialState, BookmarkReducer } from './reducer'
import { MOCK_BOOKMARK_1 } from '@eulogise/mock'
import { BookmarkActionTypes, ICardProductData } from '@eulogise/core'

describe('BookmarkState - Reducer', () => {
  let results: any

  describe('FETCH_BOOKMARKS_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ICardProductData> = [MOCK_BOOKMARK_1]

    beforeEach(() => {
      results = BookmarkReducer(BookmarkInitialState, {
        type: BookmarkActionTypes.FETCH_BOOKMARKS_BY_CASE_ID_SUCCESS,
        payload: { items },
      })
    })

    it('should update "items"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(items[0])
    })
  })
})
