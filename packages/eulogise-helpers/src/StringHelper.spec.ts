import expect from 'expect'
import { StringHelper } from './StringHelper'

describe('StringHelper', () => {
  let results: any
  describe('padStart', () => {
    describe('undefined', () => {
      beforeEach(() => {
        // @ts-expect-error
        results = StringHelper.padStart(undefined, 4)
      })

      it('should return undefined', () => {
        expect(results).toEqual(undefined)
      })
    })

    describe('number', () => {
      beforeEach(() => {
        // @ts-ignore
        results = StringHelper.padStart(123, 4)
      })

      it('should return undefined', () => {
        expect(results).toEqual(undefined)
      })
    })

    describe('123 string', () => {
      beforeEach(() => {
        // @ts-ignore
        results = StringHelper.padStart('123', 4)
      })

      it('should return "0123"', () => {
        expect(results).toEqual('0123')
      })
    })

    describe('12345 string with max length 4', () => {
      beforeEach(() => {
        // @ts-ignore
        results = StringHelper.padStart('12345', 4)
      })

      it('should return "12345"', () => {
        expect(results).toEqual('12345')
      })
    })
  })
})
