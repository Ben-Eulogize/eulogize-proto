import { login, logout, signUp } from './actions'
import {
  MOCK_LOGIN_1,
  MOCK_LOGIN_REQUEST_BODY_1,
  MOCK_SIGN_UP_REQUEST_BODY_1,
} from '@eulogise/mock'
import { EulogisePage, AuthActionTypes } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

describe('AuthState - Action', () => {
  let results: any

  describe('login()', () => {
    beforeEach(() => global.sandbox.stub(NavigationHelper, 'navigate'))

    describe('Success', () => {
      beforeEach(async () => {
        const { email, password } = MOCK_LOGIN_REQUEST_BODY_1
        results = await login({ body: { email, password } })
      })

      it('should trigger NavigationHelper.navigate()', () => {
        expect(
          NavigationHelper.navigate.calledWith(EulogisePage.DASHBOARD),
        ).toEqual(true)
      })

      it('should return webtoken and account in the payload', () => {
        expect(results.payload.webtoken).toEqual(MOCK_LOGIN_1.webtoken)
        expect(results.payload.account).toEqual(MOCK_LOGIN_1.account)
      })
    })

    describe('Failed', () => {
      beforeEach(async () => {
        const email = 'incorrect@email.com'
        const password = 'incorrectpassword'
        results = await login({ body: { email, password } })
      })

      it('should not trigger NavigationHelper.navigate()', () => {
        expect(NavigationHelper.navigate.called).toEqual(false)
      })

      it('should return undefined', () => {
        expect(results).toBeUndefined()
      })
    })
  })

  describe('logout()', () => {
    beforeEach(() => {
      global.sandbox.stub(NavigationHelper, 'navigate')
    })

    beforeEach(() => {
      results = logout()
    })

    it('should trigger NavigationHelper.navigate() to Sign in page', () => {
      expect(
        NavigationHelper.navigate.calledWith(EulogisePage.SIGN_IN),
      ).toEqual(true)
    })

    it('should return LOGOUT action', () => {
      expect(results).toEqual({
        type: AuthActionTypes.LOGOUT,
      })
    })
  })

  describe('signUp()', () => {
    describe('Success', () => {
      beforeEach(async () => {
        results = await signUp(MOCK_SIGN_UP_REQUEST_BODY_1)
      })

      it('should return webtoken and account in the payload', () => {
        expect(results.payload.webtoken).toEqual(MOCK_LOGIN_1.webtoken)
        expect(results.payload.account).toEqual(MOCK_LOGIN_1.account)
      })
    })

    describe('Failed', () => {
      beforeEach(async () => {
        results = await signUp({
          fullName: 'Invalid user',
          email: 'invalid@email.com',
          password: 'invalid',
          deceasedName: 'invalid',
          deceasedDate: 'invalid',
        })
      })

      it('should return undefined', () => {
        expect(results).toBeUndefined()
      })
    })
  })
})
