import {
  AuthActionTypes,
  IAuthAccount,
  IAuthAction,
  IAuthState,
} from '@eulogise/core'
import { jwtDecode } from 'jwt-decode'

const initialState: IAuthState = {
  webtoken: null,
  account: null,
  webtokenPayload: null,
  inviteToken: null,
  shadowToken: null,
  isSigningUp: false,
}

export const AuthReducer = (
  state: IAuthState = initialState,
  action: IAuthAction,
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return state
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      const webtoken = action.payload?.webtoken
      const account = action.payload?.account
      return {
        ...state,
        webtoken,
        webtokenPayload: webtoken ? jwtDecode(webtoken) : null,
        account,
      }
    }
    case AuthActionTypes.LOGIN_FAILED: {
      return state
    }
    case AuthActionTypes.SIGN_UP: {
      return {
        ...state,
        isSigningUp: true,
      }
    }
    case AuthActionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        // do not set isSigningUp to false here, as we want to keep the loading spinner
        // isSigningUp: false,
      }
    }
    case AuthActionTypes.UPDATE_SIGNUP_STATUS: {
      if (typeof action.payload?.isSigningUp == 'boolean') {
        return {
          ...state,
          isSigningUp: action.payload?.isSigningUp,
        }
      }
      return state
    }
    case AuthActionTypes.SIGN_UP_FAILED: {
      return {
        ...state,
        isSigningUp: false,
      }
    }
    case AuthActionTypes.UPDATE_PERSONAL_DATA: {
      return state
    }
    case AuthActionTypes.UPDATE_PERSONAL_DATA_SUCCESS: {
      const account = action.payload?.account as IAuthAccount
      return { ...state, account: { ...state.account, ...account } }
    }
    case AuthActionTypes.UPDATE_PERSONAL_DATA_FAILED: {
      return state
    }
    case AuthActionTypes.CHECK_ACCOUNT_SUCCESS: {
      const account = action.payload?.account
      return {
        ...state,
        account,
      }
    }
    case AuthActionTypes.MEMORISE_INVITE_TOKEN: {
      const inviteToken = action.payload?.inviteToken
      return {
        ...state,
        inviteToken,
      }
    }
    case AuthActionTypes.SHADOW_INVITE_TOKEN: {
      const shadowToken = action.payload?.shadowToken
      return {
        ...state,
        shadowToken,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return initialState
    }
    case AuthActionTypes.RESET_AUTH_STATE: {
      return initialState
    }
    default:
      return state
  }
}

export const AuthInitialState = initialState
