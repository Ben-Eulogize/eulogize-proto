import {
  CaseStatus,
  ICase,
  CaseActionTypes,
  ICaseAction,
  ICaseState,
  ICaseDeceased,
  ConnectionActionTypes,
} from '@eulogise/core'
import { EulogiseResourceHelper } from '../../helpers/EulogiseResourceHelper'

const initialState: ICaseState = {
  isCreating: false,
  isUpdating: false,
  isFetching: false,
  items: [],
  // @ts-ignore
  activeItem: null,
}

export const CaseReducer = (
  state: ICaseState = initialState,
  action: ICaseAction,
): ICaseState => {
  switch (action.type) {
    case ConnectionActionTypes.CASE_UPDATED: {
      const { caseData } = action.payload
      const activeItem =
        caseData.id === state.activeItem?.id ? caseData : state.activeItem
      return {
        ...state,
        activeItem,
        items: state.items?.map((i) => {
          if (i.id === caseData.id) {
            return caseData
          }
          return i
        }) as Array<ICase>,
      }
    }
    case CaseActionTypes.RESET_CASE_STATE: {
      return initialState
    }
    case CaseActionTypes.SET_ACTIVE_CASE_BY_CASE_ID_SUCCESS: {
      const caseId: string = action.payload?.caseId!
      const items: Array<ICase> = state.items!
      const foundCase: ICase = items.find((c: ICase) => c.id === caseId)!
      console.log('foundCase', caseId)
      if (!foundCase) {
        console.log(
          `Warning: Cannot found case "${caseId}". Will be using the current active case "${state.activeItem?.id}"`,
        )
      }
      return {
        ...state,
        activeItem: foundCase || state.activeItem,
      }
    }
    case CaseActionTypes.FETCH_CASES: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case CaseActionTypes.FETCH_CASES_SUCCESS: {
      const items = action.payload?.items!
      const activeItemId = state?.activeItem?.id
      const activeItem =
        items.find((i) => i.id === activeItemId) ||
        EulogiseResourceHelper.getLatestItem(items)
      return {
        ...state,
        items,
        activeItem,
        isFetching: false,
      }
    }
    case CaseActionTypes.FETCH_CASES_FAILED: {
      return initialState
    }
    case CaseActionTypes.FETCH_CASE_BY_ID_SUCCESS: {
      const fetchedCase = action.payload?.fetchedCase!
      if (!fetchedCase) {
        console.error('fetchedCase is not defined')
        return state
      }
      const hasCase = state.items?.find((c) => c.id === fetchedCase.id)
      const newCases = hasCase
        ? state.items?.map((c: ICase) => {
            if (fetchedCase.id === c.id) {
              return fetchedCase
            }
            return c
          })
        : (state.items ?? []).concat(fetchedCase)
      return {
        ...state,
        activeItem: fetchedCase ?? state.activeItem,
        items: newCases,
      }
    }
    case CaseActionTypes.CREATE_PAYMENT_SUCCESS: {
      const updatedCase: ICase = {
        ...state.activeItem,
        status: CaseStatus.PAID,
      } as ICase
      return {
        ...state,
        items: state.items?.map((c: ICase) => {
          if (c.id === updatedCase.id) {
            return updatedCase
          }
          return c
        }),
        activeItem: updatedCase,
      }
    }
    case CaseActionTypes.CLEAR_ACTIVE_CASE: {
      return {
        ...state,
        activeItem: undefined,
      }
    }
    case CaseActionTypes.CREATE_CASE_AS_CLIENT: {
      return {
        ...state,
        isCreating: true,
      }
    }
    case CaseActionTypes.CREATE_CASE_AS_CLIENT_SUCCESS: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case CaseActionTypes.CREATE_CASE_AS_CLIENT_FAILED: {
      return {
        ...state,
        isCreating: false,
      }
    }
    case CaseActionTypes.UPDATE_CASE_BY_ID: {
      return {
        ...state,
        isUpdating: true,
      }
    }
    case CaseActionTypes.UPDATE_CASE_BY_ID_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
      }
    }
    case CaseActionTypes.UPDATE_CASE_BY_ID_FAILED: {
      return {
        ...state,
        isUpdating: false,
      }
    }
    case CaseActionTypes.UPDATE_CASE_HAS_SKIPPED_OR_FILLED_MEMORIAL_DATA_PULL_FORM_STATUS: {
      return {
        ...state,
        activeItem: {
          ...state.activeItem,
          deceased: {
            ...state.activeItem?.deceased,
            hasSkippedOrFilledMemorialDataPullForm: true,
          } as ICaseDeceased,
        } as ICase,
      }
    }
    case CaseActionTypes.UPDATE_HAS_ACCESSED_DOWNLOAD_PAGE_STATUS_AFTER_VISTIED_DOWNLOAD_PAGE: {
      return {
        ...state,
        activeItem: {
          ...state.activeItem,
          hasAccessedDownloadPage: true,
        } as ICase,
      }
    }
    default:
      return state
  }
}

export const CaseInitialState = initialState
