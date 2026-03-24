import { DrawerInitialState, DrawerReducer } from './reducer'
import { DrawerActionTypes, DrawerId, EulogiseProduct } from '@eulogise/core'

describe('DrawerState - Reducer', () => {
  let results: any

  describe('OPEN_DRAWER', () => {
    beforeEach(() => {
      results = DrawerReducer(DrawerInitialState, {
        type: DrawerActionTypes.OPEN_DRAWER,
        payload: {
          id: DrawerId.THEME_SELECTION_DRAWER,
          productType: EulogiseProduct.SLIDESHOW,
        },
      })
    })

    it('should update openDrawerId to THEME_SELECTION_DRAWER', () => {
      expect(results.openDrawerId).toEqual(DrawerId.THEME_SELECTION_DRAWER)
      expect(results.productType).toEqual(EulogiseProduct.SLIDESHOW)
    })
  })

  describe('CLOSE_DRAWER', () => {
    beforeEach(() => {
      results = DrawerReducer(
        {
          openDrawerId: DrawerId.THEME_SELECTION_DRAWER,
          productType: EulogiseProduct.SLIDESHOW,
        },
        {
          type: DrawerActionTypes.CLOSE_DRAWER,
        },
      )
    })

    it('should update openDrawerId to false', () => {
      expect(results.openDrawerId).toEqual(null)
      expect(results.productType).toEqual(null)
    })
  })
})
