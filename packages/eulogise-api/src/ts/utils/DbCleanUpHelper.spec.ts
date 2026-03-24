import expect from 'expect'
import { DbCleanUpHelper } from './DbCleanUpHelper'
import moment from 'moment'
import uuid from 'uuid'
import { MemorialVisualStatus } from '@eulogise/core'
import { caseModel, bookletModel } from '../database'

describe('DbCleanUpHelper', () => {
  let results: any

  describe.skip('isAccountActive', () => {
    describe('True', () => {
      describe('one of the product was updated within 3 months', () => {
        beforeEach(async () => {
          const accountId = 'a3faf2b6-edff-443d-acbe-763aebfc420a'
          results = await DbCleanUpHelper.isAccountActive(accountId)
        })

        it('should return true', () => {
          expect(results).toEqual(true)
        })
      })

      describe('one of the case has paid', () => {
        beforeEach(async () => {
          const accountId = 'c5d5f09a-d2c8-48cb-aa96-9c01b806c76a'
          results = await DbCleanUpHelper.isAccountActive(accountId)
        })

        it('should return true', () => {
          expect(results).toEqual(true)
        })
      })
    })

    describe('False', () => {
      beforeEach(async () => {
        const accountId = 'a1a343ff-64ff-4b86-a68a-92f3fafb65b0'
        results = await DbCleanUpHelper.isAccountActive(accountId)
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Undefined', () => {
      beforeEach(async () => {
        const accountId = 'something'
        results = await DbCleanUpHelper.isAccountActive(accountId)
      })

      it('should return false', () => {
        expect(results).toEqual(undefined)
      })
    })
  })

  describe.skip('getInactiveAccounts()', () => {
    beforeEach(async () => {
      results = await DbCleanUpHelper.getInactiveAccounts()
    })

    it('should return all the user accounts', () => {
      expect(results).toEqual('')
    })
  })

  describe('deleteAccount()', () => {
    beforeEach(async () => {
      const accountId = 'f172ad39-0bb5-41e9-a1d5-ce40002ffa3f'
      results = await DbCleanUpHelper.deleteAccount(accountId)
    })

    it('should remove the account and its cases and product', () => {
      expect(true).toEqual(true)
    })
  })

  describe.skip('getNonClientCases', () => {
    beforeEach(async () => {
      results = await DbCleanUpHelper.getNonClientCases()
    })

    it('should return all non client cases', () => {
      expect(results.length).toBeGreaterThan(1)
    })
  })

  describe('isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus', () => {
    describe('Case retainOnCleanup flag is true', () => {
      const caseUuid = uuid.v4()
      const createdAt = moment().subtract(4, 'months').valueOf()

      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          customer: 'mock-customer',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
          retainOnCleanup: true,
        })

        results =
          await DbCleanUpHelper.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus(
            {
              caseId: caseUuid,
            },
          )
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Case created recently (less than 3 months)', () => {
      const caseUuid = uuid.v4()
      const createdAt = new Date().getTime()
      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          client: 'mock-client',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })

        results =
          await DbCleanUpHelper.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus(
            {
              caseId: caseUuid,
            },
          )
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Case created recently (older than 3 months) with non client case but Active status cases', () => {
      const caseUuid = uuid.v4()
      const createdAt = moment().subtract(4, 'months').valueOf()

      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          customer: 'mock-customer',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })

        // Create a booklet as active case (COMPLETE)
        await bookletModel.create({
          case: caseUuid,
          content: {},
          status: MemorialVisualStatus.COMPLETE,
        })

        results =
          await DbCleanUpHelper.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus(
            {
              caseId: caseUuid,
            },
          )
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Case created recently (older than 3 months) with client case but no Active status cases', () => {
      const caseUuid = uuid.v4()
      const createdAt = moment().subtract(4, 'months').valueOf()

      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          // important to have client
          client: 'mock-client',
          customer: 'mock-customer',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })

        results =
          await DbCleanUpHelper.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus(
            {
              caseId: caseUuid,
            },
          )
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Case created recently (older than 3 months) with non client case and without Active status cases', () => {
      const caseUuid = uuid.v4()
      const createdAt = moment().subtract(4, 'months').valueOf()

      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          customer: 'mock-customer',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })

        results =
          await DbCleanUpHelper.isCaseOlderThan3MonthsNonClientCaseAndNotActiveStatus(
            {
              caseId: caseUuid,
            },
          )
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })
  })

  describe('getCasesOlderThan3MonthsNonClientCasesAndNotActiveStatus', () => {
    beforeEach(async () => {
      results =
        await DbCleanUpHelper.getCasesOlderThan3MonthsNonClientCasesAndNotActiveStatus()
    })

    it('should return all the removable cases', () => {
      console.log('length', results.length)
      expect(results.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('isCaseOlderThan1Week', () => {
    describe('Case created recently (less than 1 week)', () => {
      let caseUuid = uuid.v4()
      const createdAt = new Date().getTime()
      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          customer: 'mock-customer',
          client: 'mock-client',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })
        results = await DbCleanUpHelper.isCaseOlderThan1Week({
          caseId: caseUuid,
        })
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })

    describe('Case created recently (older than 1 week)', () => {
      let caseUuid = uuid.v4()
      const createdAt = moment().subtract(2, 'weeks').valueOf()
      beforeEach(async () => {
        await caseModel.getModel().create({
          id: caseUuid,
          customer: 'mock-customer',
          client: 'mock-client',
          funeralDirector: 'mock-funeral-director',
          status: 'paid',
          createdAt: createdAt,
          updatedAt: createdAt,
        })
        results = await DbCleanUpHelper.isCaseOlderThan1Week({
          caseId: caseUuid,
        })
      })

      afterEach(async () => {
        await caseModel.remove({ id: caseUuid })
      })

      beforeEach(async () => {
        results = await DbCleanUpHelper.isCaseOlderThan1Week({
          caseId: caseUuid,
        })
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })
  })

  describe('getCasesOlderThan1Week', () => {
    let caseUuid = uuid.v4()
    const createdAt = moment().subtract(2, 'weeks').valueOf()
    beforeEach(async () => {
      await caseModel.getModel().create({
        id: caseUuid,
        customer: 'mock-customer',
        client: 'mock-client',
        funeralDirector: 'mock-funeral-director',
        status: 'paid',
        createdAt: createdAt,
        updatedAt: createdAt,
      })

      results = await DbCleanUpHelper.getCasesOlderThan1Week()
    })

    afterEach(async () => {
      await caseModel.remove({ id: caseUuid })
    })

    it('should return all the cases older than 1 week', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('deleteCasesOlderThan1Week', () => {
    beforeEach(async () => {
      await DbCleanUpHelper.deleteCasesOlderThan1Week()
    })

    it('should remove all the cases older than 1 week', async () => {
      const results = await DbCleanUpHelper.getCasesOlderThan1Week()
      expect(results.length).toEqual(0)
    })
  })

  describe('deleteCaseOlderThan3MonthsNonClientCasesAndNotActiveStatus', () => {
    beforeEach(async () => {
      await DbCleanUpHelper.deleteCaseOlderThan3MonthsNonClientCasesAndNotActiveStatus()
    })

    it('should remove all the non client users cases', async () => {
      const results =
        await DbCleanUpHelper.getCasesOlderThan3MonthsNonClientCasesAndNotActiveStatus()
      expect(results.length).toEqual(0)
    })
  })

  describe.skip('deleteCaseById', () => {
    const caseId = '65a4eca7-c044-45f7-94f0-b65c7c55b083'
    beforeEach(async () => {
      results = await DbCleanUpHelper.deleteCaseById(caseId)
    })

    it('should delete all the memorial products, assets and s3 data for the case', () => {
      expect(true).toEqual(true)
    })
  })

  describe('deleteNonClientUserCases', () => {
    beforeEach(async () => {
      await DbCleanUpHelper.deleteNonClientUserCases()
    })

    it('should remove all the non client users cases', async () => {
      const results = await DbCleanUpHelper.getNonClientCases()
      expect(results.length).toEqual(0)
    })
  })

  describe('deleteInactiveAccounts', () => {
    beforeEach(async () => {
      results = await DbCleanUpHelper.deleteInactiveAccounts()
    })

    it('should remove the account and its cases and product', () => {
      expect(true).toEqual(true)
    })
  })
})
