import { ModalInitialState, ModalReducer } from './reducer'
import { ModalActionTypes, ModalId } from '@eulogise/core'

describe('ModalState - Reducer', () => {
  let results: any

  describe('SHOW_MODAL', () => {
    beforeEach(() => {
      results = ModalReducer(ModalInitialState, {
        type: ModalActionTypes.SHOW_MODAL,
        payload: {
          id: ModalId.CHECKOUT,
        },
      })
    })

    it('should update openModalIds to [CHECKOUT]', () => {
      expect(results.openModalIds).toEqual([ModalId.CHECKOUT])
    })
  })

  describe('HIDE_MODAL', () => {
    beforeEach(() => {
      results = ModalReducer(
        {
          openModalIds: [ModalId.CHECKOUT],
        },
        {
          type: ModalActionTypes.HIDE_MODAL,
          payload: {
            id: ModalId.CHECKOUT,
          },
        },
      )
    })

    it('should update openModalIds to []', () => {
      expect(results.openModalIds).toEqual([])
    })
  })
})
