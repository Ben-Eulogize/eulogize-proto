import { InvoiceActionTypes } from '@eulogise/core'

type FetchInvoicePayload = {
  caseId?: string
  success?: () => void
}

export type FetchInvoiceAction = {
  type: InvoiceActionTypes.FETCH_INVOICES
  payload: FetchInvoicePayload
}

export const fetchInvoices = (
  payload: FetchInvoicePayload,
): FetchInvoiceAction => ({
  type: InvoiceActionTypes.FETCH_INVOICES,
  payload,
})
