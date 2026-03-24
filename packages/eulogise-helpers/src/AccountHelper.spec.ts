import { AccountHelper } from './AccountHelper'
import {
  EulogiseProduct,
  EulogiseUserRole,
  EulogiseUserType,
} from '@eulogise/core'

describe('AccountHelper', () => {
  let results: any

  describe('convertProductAvailabilityStatusToArray()', () => {
    it('should return correct results', () => {
      expect(
        AccountHelper.convertProductAvailabilityStatusToArray({
          [EulogiseProduct.SLIDESHOW]: true,
          [EulogiseProduct.BOOKLET]: true,
        }),
      ).toEqual([EulogiseProduct.SLIDESHOW, EulogiseProduct.BOOKLET])
      expect(AccountHelper.convertProductAvailabilityStatusToArray({})).toEqual(
        [],
      )
    })
  })

  describe('convertArrayToProductAvailabilityStatus()', () => {
    it('should return correct results', () => {
      expect(
        AccountHelper.convertArrayToProductAvailabilityStatus([
          EulogiseProduct.SLIDESHOW,
          EulogiseProduct.BOOKLET,
        ]),
      ).toEqual({
        [EulogiseProduct.SLIDESHOW]: true,
        [EulogiseProduct.BOOKLET]: true,
      })
      expect(AccountHelper.convertArrayToProductAvailabilityStatus([])).toEqual(
        {},
      )
    })
  })

  describe('hasProAccess()', () => {
    describe('account parameter is empty', () => {
      beforeEach(() => {
        // @ts-ignore
        results = AccountHelper.hasProAccess()
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Account role is Client', () => {
      beforeEach(() => {
        // @ts-ignore
        results = AccountHelper.hasProAccess({ role: EulogiseUserRole.CLIENT })
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Account role is Customer and type is Shadow', () => {
      beforeEach(() => {
        // @ts-ignore
        results = AccountHelper.hasProAccess({
          role: EulogiseUserRole.CUSTOMER,
          type: EulogiseUserType.SHADOW,
        })
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })

    describe('Account role is Customer and type is Invite', () => {
      beforeEach(() => {
        // @ts-ignore
        results = AccountHelper.hasProAccess({
          role: EulogiseUserRole.CUSTOMER,
          type: EulogiseUserType.INVITE,
        })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })
  })
})
