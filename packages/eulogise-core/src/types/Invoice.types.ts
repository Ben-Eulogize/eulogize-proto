import { CHECKOUTS_SHIPPING_METHOD, IOrderDetails } from './Checkouts.types'

export type InvoiceStatus = 'complete' | 'pending' | 'failed'

export enum InvoiceActionTypes {
  FETCH_INVOICES = 'FETCH_INVOICES',
  FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS',
  FETCH_INVOICES_FAILED = 'FETCH_INVOICES_FAILED',
  FETCH_INVOICES_BY_CASE_ID = 'FETCH_INVOICES_BY_CASE_ID',
  FETCH_INVOICES_BY_CASE_ID_SUCCESS = 'FETCH_INVOICES_BY_CASE_ID_SUCCESS',
  FETCH_INVOICES_BY_CASE_ID_FAILED = 'FETCH_INVOICES_BY_CASE_ID_FAILED',
}

export interface IInvoiceAction {
  type: InvoiceActionTypes
  payload?: {
    invoices?: Array<IInvoice>
  }
}

export interface IInvoice {
  updatedAt: string
  status: InvoiceStatus
  createdAt: string
  customer: string
  transactions: Array<IInvoiceTransaction>
  details: IOrderDetails
  id: string
  case: string
}

export interface IDisplayedInvoiceShippingDetails {
  product: string
  address: string
  shippingMethod: CHECKOUTS_SHIPPING_METHOD
}

export enum StripeTransactionStatus {
  SUCCEEDED = 'succeeded',
  PENDING = 'pending',
  FAILED = 'failed',
}

export interface IInvoicestripePaymentIntentData {
  amount: number
  amount_captured: number
  amount_refunded: number
  created: number
  status: StripeTransactionStatus
}

export interface IInvoiceTransaction {
  createdAt: string
  customer: string
  id: string
  stripePaymentIntentData: IInvoicestripePaymentIntentData
  stripePaymentIntentId: string
  updatedAt: string
}

export interface IInvoiceState {
  items?: Array<IInvoice>
  isFetching?: boolean
}
