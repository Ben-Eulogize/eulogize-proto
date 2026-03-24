import { takeEvery, put } from 'redux-saga/effects'
import {
  EulogiseResource,
  IInvoice,
  IInvoiceTransaction,
  InvoiceActionTypes,
} from '@eulogise/core'
import RequestHelper from '../../helpers/RequestHelper'
import { FetchInvoiceAction } from './actions'

function* handleFetchInvoices(action: FetchInvoiceAction) {
  try {
    const { payload: { caseId, success } = {} } = action
    const {
      data: { items: invoices },
    } = yield RequestHelper.findResourceRequest({
      resource: EulogiseResource.INVOICE,
      caseId,
    })

    let updatedInvoices: Array<IInvoice> = invoices

    // @ts-ignore
    if (invoices?.length >= 0) {
      for (const invoice of updatedInvoices) {
        let invoiceId = invoice.id
        let transactions: Array<IInvoiceTransaction> = []
        for (const transactionId of invoice.transactions) {
          const {
            data: { items },
          } = yield RequestHelper.findResourceRequest({
            resource: EulogiseResource.TRANSACTION,
            caseId: undefined,
            additionalData: { id: transactionId },
          })
          transactions = transactions.concat(items)
        }
        updatedInvoices = updatedInvoices.map((i: IInvoice) => {
          if (i.id !== invoiceId) {
            return i
          }
          return {
            ...i,
            transactions,
          }
        })
      }
      if (success) {
        success()
      }
      yield put({
        type: InvoiceActionTypes.FETCH_INVOICES_SUCCESS,
        payload: { invoices: updatedInvoices },
      })
    }
  } catch (ex) {
    yield put({
      type: InvoiceActionTypes.FETCH_INVOICES_FAILED,
      payload: ex,
    })
  }
}

/* Watchers */
function* watchers() {
  yield takeEvery(InvoiceActionTypes.FETCH_INVOICES, handleFetchInvoices)
}

export const InvoiceSagas = [watchers()]
