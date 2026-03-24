import {
  IShareAction,
  IShareState,
  ShareActionTypes,
  IShare,
} from '@eulogise/core'

const initialState: IShareState = {
  isUpserting: false,
  isFetching: false,
  share: null,
  shares: [],
  error: null,
}

export const ShareReducer = (
  state: IShareState = initialState,
  action: IShareAction,
): IShareState => {
  switch (action.type) {
    case ShareActionTypes.UPSERT_SHARE: {
      return {
        ...state,
        isUpserting: true,
        error: null,
      }
    }
    case ShareActionTypes.UPSERT_SHARE_SUCCESS: {
      const share = action.payload?.share
      return {
        ...state,
        isUpserting: false,
        share: share || null,
        shares: share
          ? state.shares.filter((s: IShare) => s.id !== share.id).concat(share)
          : state.shares,
        error: null,
      }
    }
    case ShareActionTypes.UPSERT_SHARE_FAILED: {
      return {
        ...state,
        isUpserting: false,
        error: action.payload?.error || 'Failed to save share',
      }
    }
    case ShareActionTypes.FETCH_SHARES_BY_CASE_ID: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case ShareActionTypes.FETCH_SHARES_BY_CASE_ID_SUCCESS: {
      const shares = action.payload?.shares
      return {
        ...state,
        isFetching: false,
        shares: shares || [],
        share: shares?.[0] ?? null,
        error: null,
      }
    }
    case ShareActionTypes.FETCH_SHARES_BY_CASE_ID_FAILED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload?.error || 'Failed to fetch shares',
      }
    }
    default:
      return state
  }
}

export const ShareInitialState = initialState
