import { MobileMenuInitialState, MobileMenuReducer } from './reducer'
import { MobileMenuActionTypes } from '@eulogise/core'

describe('MobileMenuState - Reducer', () => {
  let results: any

  describe('CLOSE_MENU', () => {
    beforeEach(() => {
      results = MobileMenuReducer(MobileMenuInitialState, {
        type: MobileMenuActionTypes.CLOSE_MENU,
      })
    })

    it('should update isOpen to false', () => {
      expect(results.isOpen).toEqual(false)
    })
  })

  describe('OPEN_MENU', () => {
    beforeEach(() => {
      results = MobileMenuReducer(MobileMenuInitialState, {
        type: MobileMenuActionTypes.OPEN_MENU,
      })
    })

    it('should update isOpen to true', () => {
      expect(results.isOpen).toEqual(true)
    })
  })

  describe('TOGGLE_MENU', () => {
    describe('isOpen is true', () => {
      beforeEach(() => {
        results = MobileMenuReducer(
          { isOpen: true },
          {
            type: MobileMenuActionTypes.TOGGLE_MENU,
          },
        )
      })

      it('should update isOpen to false', () => {
        expect(results.isOpen).toEqual(false)
      })
    })

    describe('isOpen is false', () => {
      beforeEach(() => {
        results = MobileMenuReducer(
          { isOpen: false },
          {
            type: MobileMenuActionTypes.TOGGLE_MENU,
          },
        )
      })

      it('should update isOpen to true', () => {
        expect(results.isOpen).toEqual(true)
      })
    })
  })
})
