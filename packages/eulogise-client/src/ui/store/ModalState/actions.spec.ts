import { ModalId, ModalActionTypes } from '@eulogise/core'
import { hideModalAction, showModalAction } from './actions'

describe('ModalState - Action', () => {
  let results: any

  describe('showModalAction()', () => {
    beforeEach(() => {
      results = showModalAction(ModalId.CHECKOUT)
    })

    it('should return SHOW_MODAL action type', () => {
      expect(results).toEqual({
        type: ModalActionTypes.SHOW_MODAL,
        payload: {
          id: ModalId.CHECKOUT,
        },
      })
    })
  })

  describe('hideModalAction()', () => {
    beforeEach(() => {
      results = hideModalAction(ModalId.CHECKOUT)
    })

    it('should return HIDE_MODAL action type', () => {
      expect(results).toEqual({
        type: ModalActionTypes.HIDE_MODAL,
        payload: {
          id: ModalId.CHECKOUT,
        },
      })
    })
  })
})
