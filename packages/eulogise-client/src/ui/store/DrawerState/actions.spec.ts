import { closeDrawerAction, openDrawerAction } from './actions'
import { DrawerId, DrawerActionTypes } from '@eulogise/core'

describe('DrawerState - Action', () => {
  let results: any

  describe('openDrawerAction()', () => {
    const caseId: string = 'case-1'
    beforeEach(() => {
      results = openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
        caseId,
      })
    })

    it('should return OPEN_MENU action type', () => {
      expect(results).toEqual({
        type: DrawerActionTypes.OPEN_DRAWER,
        payload: {
          id: DrawerId.THEME_SELECTION_DRAWER,
          drawerOptions: {
            caseId,
          },
        },
      })
    })
  })

  describe('closeDrawerAction()', () => {
    beforeEach(() => {
      results = closeDrawerAction()
    })

    it('should return CLOSE_DRAWER action type', () => {
      expect(results).toEqual({
        type: DrawerActionTypes.CLOSE_DRAWER,
      })
    })
  })
})
