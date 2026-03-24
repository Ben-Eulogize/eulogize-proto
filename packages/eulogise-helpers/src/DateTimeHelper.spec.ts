import { DateTimeHelper } from './DateTimeHelper'
import { StringHelper } from './StringHelper'

describe('DateTimeHelper', () => {
  let results: any

  describe('formatISODate()', () => {
    describe('2021-10-10T00:00:00Z', () => {
      beforeEach(() => {
        results = DateTimeHelper.formatISODate('2021-10-10T00:00:00Z')
      })

      it('should return "2021-10-10"', () => {
        expect(results).toEqual('2021-10-10')
      })
    })

    describe('undefined', () => {
      beforeEach(() => {
        results = DateTimeHelper.formatISODate()
      })

      it("should return today's date", () => {
        const date = new Date()
        const m = StringHelper.padStart((date.getMonth() + 1).toString(), 2)
        const d = StringHelper.padStart(date.getDate().toString(), 2)
        const y = date.getFullYear().toString()
        expect(results).toEqual(`${y}-${m}-${d}`)
      })
    })

    describe('invalid date', () => {
      beforeEach(() => {
        results = DateTimeHelper.formatISODate('invalid')
      })

      it('should return "Invalid date"', () => {
        expect(results).toEqual('Invalid date')
      })
    })
  })

  describe('formatDuration()', () => {
    beforeEach(() => {
      results = DateTimeHelper.formatDuration(100000)
    })

    it('should return correct results', () => {
      expect(results).toEqual('1:40')
    })
  })

  describe('getTimeByDate()', () => {
    beforeEach(() => {
      results = DateTimeHelper.getTimeByDate('2021-10-23')
    })

    it('should return time number', () => {
      expect(results).toEqual(1634947200000)
    })
  })
})
