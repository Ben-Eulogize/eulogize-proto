import { closeMenuAction, openMenuAction, toggleMenuAction } from './actions'
import { MobileMenuActionTypes } from '@eulogise/core'

describe('MobileMenuState - Action', () => {
  let results: any

  describe('openMenuAction()', () => {
    beforeEach(() => {
      results = openMenuAction()
    })

    it('should return OPEN_MENU action type', () => {
      expect(results).toEqual({
        type: MobileMenuActionTypes.OPEN_MENU,
      })
    })
  })

  describe('closeMenuAction()', () => {
    beforeEach(() => {
      results = closeMenuAction()
    })

    it('should return CLOSE_MENU action type', () => {
      expect(results).toEqual({
        type: MobileMenuActionTypes.CLOSE_MENU,
      })
    })
  })

  describe('toggleMenuAction', () => {
    beforeEach(() => {
      results = toggleMenuAction()
    })

    it('should return CLOSE_MENU action type', () => {
      expect(results).toEqual({
        type: MobileMenuActionTypes.TOGGLE_MENU,
      })
    })
  })
})
