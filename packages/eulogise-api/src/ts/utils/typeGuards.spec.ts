import expect from 'expect'
import { isDefined } from './typeGuards'

describe('typeGuards', () => {
  describe('isDefined()', () => {
    it('should return false for undefined', () => {
      expect(isDefined(undefined)).toEqual(false)
    })

    it('should return false for void 0', () => {
      expect(isDefined(void 0)).toEqual(false)
    })

    it('should return true for null', () => {
      expect(isDefined(null)).toEqual(true)
    })

    it('should return true for empty string', () => {
      expect(isDefined('')).toEqual(true)
    })

    it('should return true for zero', () => {
      expect(isDefined(0)).toEqual(true)
    })

    it('should return true for false', () => {
      expect(isDefined(false)).toEqual(true)
    })

    it('should return true for NaN', () => {
      expect(isDefined(NaN)).toEqual(true)
    })

    it('should return true for object', () => {
      expect(isDefined({ key: 'value' })).toEqual(true)
    })

    it('should return true for array', () => {
      expect(isDefined([])).toEqual(true)
    })

    it('should return true for function', () => {
      expect(
        isDefined(() => {
          return 1
        }),
      ).toEqual(true)
    })

    it('should work as a filter guard for undefined values', () => {
      const input: Array<string | undefined> = ['a', undefined, '', 'b']
      const output = input.filter(isDefined)

      expect(output).toEqual(['a', '', 'b'])
    })

    it('should keep null values when filtering', () => {
      const input: Array<string | null | undefined> = [
        'a',
        null,
        undefined,
        'b',
      ]
      const output = input.filter(isDefined)

      expect(output).toEqual(['a', null, 'b'])
    })
  })
})
