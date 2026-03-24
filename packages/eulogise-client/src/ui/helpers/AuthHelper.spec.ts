import { AuthHelper } from './AuthHelper'
import { MOCK_USER_1 } from '@eulogise/mock'

describe('AuthHelper', () => {
  let results: any

  describe('isTokenExpired', () => {
    describe('undefined', () => {
      beforeEach(() => {
        results = AuthHelper.isTokenExpired()
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })

    describe('expired token', () => {
      beforeEach(() => {
        results = AuthHelper.isTokenExpired(MOCK_USER_1.webtoken)
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })
  })
})
