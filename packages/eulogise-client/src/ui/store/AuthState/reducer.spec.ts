import { AuthInitialState, AuthReducer } from './reducer'
import { AuthActionTypes, ILogin } from '@eulogise/core'
import { MOCK_LOGIN_1, MOCK_USER_1 } from '@eulogise/mock'

describe('AuthState - Reducer', () => {
  let results: any

  describe('LOGIN_SUCCESS', () => {
    const auth: ILogin = MOCK_LOGIN_1

    beforeEach(() => {
      results = AuthReducer(AuthInitialState, {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
          webtoken: MOCK_USER_1.webtoken,
          account: MOCK_USER_1,
        },
      })
    })

    it('should update "webtoken" and "account"', () => {
      expect(results.webtoken).toEqual(auth.webtoken)
      expect(results.account).toEqual(auth.account)
    })
  })

  describe('LOGOUT', () => {
    beforeEach(() => {
      results = AuthReducer(
        { webtoken: MOCK_USER_1.webtoken, account: MOCK_USER_1 },
        { type: AuthActionTypes.LOGOUT },
      )
    })

    it('should restore initial state', () => {
      expect(results).toEqual(AuthInitialState)
    })
  })
})
