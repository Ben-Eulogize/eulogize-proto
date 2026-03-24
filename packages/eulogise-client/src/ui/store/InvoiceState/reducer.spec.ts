import { MOCK_INVOICES } from '@eulogise/mock'
import { InvoiceInitialState, InvoiceReducer } from './reducer'
import { IInvoice, InvoiceActionTypes } from '@eulogise/core'

describe('Invoice Reducer - Unit', () => {
  let results: any

  describe('FETCH_INVOICE', () => {
    beforeEach(() => {
      results = InvoiceReducer(
        { ...InvoiceInitialState, isFetching: false },
        {
          type: InvoiceActionTypes.FETCH_INVOICES,
        },
      )
    })

    describe('isFetching', () => {
      it('should be true', () => {
        expect(results.isFetching).toEqual(true)
      })
    })
  })

  describe('FETCH_INVOICE_SUCCESS', () => {
    const invoices: Array<IInvoice> = MOCK_INVOICES

    beforeEach(() => {
      results = InvoiceReducer(
        { ...InvoiceInitialState, isFetching: true },
        {
          type: InvoiceActionTypes.FETCH_INVOICES_SUCCESS,
          payload: {
            invoices,
          },
        },
      )
    })

    describe('isFetching', () => {
      it('should be false', () => {
        expect(results.isFetching).toEqual(false)
      })
    })

    describe('items', () => {
      it('should return all the invoices', () => {
        expect(results.items).toEqual(invoices)
      })
    })
  })

  describe('FETCH_INVOICE_FAILED', () => {
    beforeEach(() => {
      results = InvoiceReducer(
        { ...InvoiceInitialState, isFetching: true },
        {
          type: InvoiceActionTypes.FETCH_INVOICES_FAILED,
        },
      )
    })

    describe('isFetching', () => {
      it('should be false', () => {
        expect(results.isFetching).toEqual(false)
      })
    })
  })
})
