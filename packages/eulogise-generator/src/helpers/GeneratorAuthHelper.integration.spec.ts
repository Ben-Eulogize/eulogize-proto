import { GeneratorAuthHelper } from './GeneratorAuthHelper'
import expect from 'expect'

describe('GeneratorAuthHelper', () => {
  describe('getApiToken()', () => {
    let results: any
    beforeEach(async () => {
      results = await GeneratorAuthHelper.getApiToken()
    })

    it('should return generator token', () => {
      expect(results.length).toBeGreaterThan(10)
    })
  })
})
