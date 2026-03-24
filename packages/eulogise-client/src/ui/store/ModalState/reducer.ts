import {
  IModalAction,
  IModalState,
  ModalActionTypes,
  ModalId,
} from '@eulogise/core'

const initialState: IModalState = {
  openModalIds: [],
}

export const ModalReducer = (
  state: IModalState = initialState,
  action: IModalAction,
) => {
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL: {
      const modalId: ModalId = action.payload?.id!
      const isExists: boolean = !!state.openModalIds?.find(
        (id: ModalId) => id === modalId,
      )
      if (isExists) {
        return state
      }
      return {
        ...state,
        openModalIds: state.openModalIds?.concat(modalId),
        options: action.payload?.options,
      }
    }
    case ModalActionTypes.HIDE_MODAL: {
      const modalId: ModalId = action.payload?.id!
      return {
        ...initialState,
        // When two modals are open, we need to keep the previous modal's options when closing the modal
        // https://trello.com/c/THd4a4s5/1671-bug-share-popup-close-button-crashes-program-preview
        options: state.options,
        openModalIds: state.openModalIds?.filter(
          (id: ModalId) => id !== modalId,
        ),
      }
    }
    default:
      return state
  }
}

export const ModalInitialState = initialState
