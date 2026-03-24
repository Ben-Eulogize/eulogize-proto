import { ICustomerInfoState } from '@eulogise/core'
import { CustomerInfoActionTypes, ICustomerInfoAction } from './actions'

const initialState: ICustomerInfoState = {
  customerInfo: null,
  isFetching: false,
  isUpdating: false,
  error: null,
}

export const CustomerInfoReducer = (
  state: ICustomerInfoState = initialState,
  action: ICustomerInfoAction,
): ICustomerInfoState => {
  switch (action.type) {
    case CustomerInfoActionTypes.FETCH_CUSTOMER_INFO: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case CustomerInfoActionTypes.FETCH_CUSTOMER_INFO_SUCCESS: {
      const { customerInfo } = action.payload || {}
      if (!customerInfo) {
        console.error(
          'CustomerInfoState > Reducer > FETCH_CUSTOMER_INFO_SUCCESS: missing customerInfo',
        )
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        customerInfo,
        error: null,
      }
    }
    case CustomerInfoActionTypes.FETCH_CUSTOMER_INFO_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error || 'Failed to fetch customer info',
      }
    }
    case CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO: {
      return {
        ...state,
        isUpdating: true,
        error: null,
      }
    }
    case CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO_SUCCESS: {
      const { customerInfo } = action.payload || {}
      if (!customerInfo) {
        console.error(
          'CustomerInfoState > Reducer > UPDATE_CUSTOMER_INFO_SUCCESS: missing customerInfo',
        )
        return {
          ...state,
          isUpdating: false,
        }
      }

      return {
        ...state,
        isUpdating: false,
        customerInfo,
        error: null,
      }
    }
    case CustomerInfoActionTypes.UPDATE_CUSTOMER_INFO_FAILED: {
      return {
        ...state,
        isUpdating: false,
        error: action.payload?.error || 'Failed to update customer info',
      }
    }
    case CustomerInfoActionTypes.CLEAR_CUSTOMER_INFO: {
      return initialState
    }
    default:
      return state
  }
}

export const CustomerInfoInitialState = initialState
