import { IntegrationAPIHelper } from './IntegrationAPIHelper'
import expect from 'expect'

const mockEmail = 'ben@eulogize.com'

describe('IntegrationAPIHelper', () => {
  let results: any
  describe('isDateInputValidISO()', () => {
    it('should return true for valid YYYY-MM-DD', () => {
      results = IntegrationAPIHelper.isDateInputValidISO({
        dateString: '2026-03-21',
      })
      expect(results).toEqual(true)
    })

    it('should return false for invalid format with trailing characters', () => {
      results = IntegrationAPIHelper.isDateInputValidISO({
        dateString: '2026-03-21232',
      })
      expect(results).toEqual(false)
    })

    it('should return false for non-ISO separator format', () => {
      results = IntegrationAPIHelper.isDateInputValidISO({
        dateString: '2026/03/21',
      })
      expect(results).toEqual(false)
    })

    it('should return false for impossible date', () => {
      results = IntegrationAPIHelper.isDateInputValidISO({
        dateString: '2026-02-30',
      })
      expect(results).toEqual(false)
    })

    it('should return true for undefined date input', () => {
      results = IntegrationAPIHelper.isDateInputValidISO({
        dateString: undefined,
      })
      expect(results).toEqual(true)
    })
  })

  describe('isAllDateInputsValid()', () => {
    it('should return false if any provided date is invalid', () => {
      results = IntegrationAPIHelper.isAllDateInputsValid({
        dateStringArray: ['2026-03-21', '2026-03-21232', undefined],
      })
      expect(results).toEqual(false)
    })

    it('should return true when all provided dates are valid', () => {
      results = IntegrationAPIHelper.isAllDateInputsValid({
        dateStringArray: ['2026-03-21', '2026-03-22', undefined],
      })
      expect(results).toEqual(true)
    })
  })

  describe('getAllDefaultEnabledProducts()', () => {
    it('should return all default enabled products', async () => {
      results = IntegrationAPIHelper.getAllDefaultEnabledProducts()
      expect(results).toEqual({
        BOOKLET: true,
        BOOKMARK: true,
        SIDED_CARD: true,
        SLIDESHOW: true,
        THANK_YOU_CARD: true,
        TV_WELCOME_SCREEN: true,
        PHOTOBOOK: false,
      })
    })
  })

  describe('replaceLastOccurrenceAndReplaceWithIncrementedNumber()', () => {
    describe('replaceLastOccurrenceAndReplaceWithIncrementedNumber', () => {
      it('raw email, index is 0', async () => {
        results =
          IntegrationAPIHelper.replaceLastOccurrenceAndReplaceWithIncrementedNumber(
            {
              email: mockEmail,
            },
          )
        expect(results).toEqual('ben+1@eulogize.com')
      })

      it('index is 1', async () => {
        results =
          IntegrationAPIHelper.replaceLastOccurrenceAndReplaceWithIncrementedNumber(
            {
              email: 'ben+1@eulogize.com',
            },
          )
        expect(results).toEqual('ben+2@eulogize.com')
      })

      it('index is 2', async () => {
        results =
          IntegrationAPIHelper.replaceLastOccurrenceAndReplaceWithIncrementedNumber(
            {
              email: 'ben+2@eulogize.com',
            },
          )
        expect(results).toEqual('ben+3@eulogize.com')
      })
    })

    describe('replaceLastOccurrenceAndReplaceWithIncrementedNumber', () => {
      it('multple +1, should only replace the last one', async () => {
        results =
          IntegrationAPIHelper.replaceLastOccurrenceAndReplaceWithIncrementedNumber(
            {
              email: 'ben+1something+1something+1@eulogize.com',
            },
          )
        expect(results).toEqual('ben+1something+1something+2@eulogize.com')
      })

      it('multiple numbers with plus signs, should only replace the last one', async () => {
        results =
          IntegrationAPIHelper.replaceLastOccurrenceAndReplaceWithIncrementedNumber(
            {
              email: 'ben+1something+1som+2+323@eulogize.com',
            },
          )
        expect(results).toEqual('ben+1something+1som+2+324@eulogize.com')
      })
    })
  })
})
