import {
  IInvoiceAction,
  IInvoiceState,
  InvoiceActionTypes,
} from '@eulogise/core'

const initialState: IInvoiceState = {
  items: [],
  isFetching: false,
}

export const InvoiceReducer = (
  state: IInvoiceState = initialState,
  action: IInvoiceAction,
): IInvoiceState => {
  switch (action.type) {
    case InvoiceActionTypes.FETCH_INVOICES: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case InvoiceActionTypes.FETCH_INVOICES_SUCCESS: {
      const invoices = action.payload?.invoices
      return {
        ...state,
        isFetching: false,
        items: invoices,
      }
    }
    case InvoiceActionTypes.FETCH_INVOICES_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    default:
      return state
  }
}

export const InvoiceInitialState = initialState
