import { CaseHelper } from './CasesHelper'
import expect from 'expect'

describe('CaseHelper', () => {
  let results: any

  describe('getCases', () => {
    beforeEach(async () => {
      results = await CaseHelper.getCases()
    })

    it('should return an array of cases', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toBeInstanceOf(Array)
    })
  })

  describe('getCasesDontHaveAssociatedUsers', () => {
    beforeEach(async () => {
      results = await CaseHelper.getCasesDontHaveAssociatedUsers()
    })

    it('should return all cases with no associated users', () => {
      // it should be empty, if not something wrong with the database
      expect(results).toEqual([])
    })
  })

  describe('getCasesByClientId', () => {
    const clientId = '5fe3f73b-4123-4932-99cf-bdfef9a5f96d'
    beforeEach(async () => {
      results = await CaseHelper.getCasesByClientId(clientId)
    })

    it('should return an array of cases', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toBeInstanceOf(Array)
    })
  })
})
