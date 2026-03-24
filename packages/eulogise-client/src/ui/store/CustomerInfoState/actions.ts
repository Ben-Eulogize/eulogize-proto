import { ICaseCustomerInfo } from '@eulogise/core'

export enum CustomerInfoActionTypes {
  FETCH_CUSTOMER_INFO = 'FETCH_CUSTOMER_INFO',
  FETCH_CUSTOMER_INFO_SUCCESS = 'FETCH_CUSTOMER_INFO_SUCCESS',
  FETCH_CUSTOMER_INFO_FAILED = 'FETCH_CUSTOMER_INFO_FAILED',
  UPDATE_CUSTOMER_INFO = 'UPDATE_CUSTOMER_INFO',
  UPDATE_CUSTOMER_INFO_SUCCESS = 'UPDATE_CUSTOMER_INFO_SUCCESS',
  UPDATE_CUSTOMER_INFO_FAILED = 'UPDATE_CUSTOMER_INFO_FAILED',
  CLEAR_CUSTOMER_INFO = 'CLEAR_CUSTOMER_INFO',
}

export interface ICustomerInfoAction {
  type: CustomerInfoActionTypes
  payload?: {
    customerInfo?: ICaseCustomerInfo
    error?: string
    userId?: string
  }
}

// Fetch Customer Info Actions
type FetchCustomerInfoPayload = {
  userId: string
  onSuccess?: (customerInfo: ICaseCustomerInfo) => void
  onFailed?: (error: string) => void
}

export type FetchCustomerInfoAction = {
  type: CustomerInfoActionTypes.FETCH_CUSTOMER_INFO
  payload: FetchCustomerInfoPayload
}

export const fetchCustomerInfo = (
  payload: FetchCustomerInfoPayload,
): FetchCustomerInfoAction => ({
  type: CustomerInfoActionTypes.FETCH_CUSTOMER_INFO,
  payload,
})

// Update Customer Info Actions
type UpdateCustomerInfoPayload = {
  userId: string
  customerInfo: {
    fullName?: string
    email?: string
  }
  onSuccess?: (customerInfo: ICaseCustomerInfo) => void
  onFailed?: (error: string) => void
}

export type UpdateCustomerInfoAction = {
  type: CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO
  payload: UpdateCustomerInfoPayload
}

export const updateCustomerInfo = (
  payload: UpdateCustomerInfoPayload,
): UpdateCustomerInfoAction => ({
  type: CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO,
  payload,
})

// Clear Customer Info Action
export type ClearCustomerInfoAction = {
  type: CustomerInfoActionTypes.CLEAR_CUSTOMER_INFO
}

export const clearCustomerInfo = (): ClearCustomerInfoAction => ({
  type: CustomerInfoActionTypes.CLEAR_CUSTOMER_INFO,
})
