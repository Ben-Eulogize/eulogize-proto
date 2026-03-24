import { UtilHelper } from './UtilHelper'

describe('UtilHelper - Unit', () => {
  let results: any

  describe('arrayMoveMultiple', () => {
    it('should move from 1 to 2', () => {
      const arr = [1, 2, 3, 4, 5]
      const noOfItems = 2
      const fromIndex = 1
      const toIndex = 2
      const movedArr = UtilHelper.arrayMoveMultiple(
        arr,
        fromIndex,
        toIndex,
        noOfItems,
      )
      expect(movedArr).toEqual([1, 4, 2, 3, 5])
    })

    it('should move from 1 to 3', () => {
      const arr = [1, 2, 3, 4, 5]
      const noOfItems = 2
      const fromIndex = 1
      const toIndex = 3
      const movedArr = UtilHelper.arrayMoveMultiple(
        arr,
        fromIndex,
        toIndex,
        noOfItems,
      )
      expect(movedArr).toEqual([1, 4, 5, 2, 3])
    })

    it('should move from 3 to 1', () => {
      const arr = [1, 2, 3, 4, 5]
      const noOfItems = 2
      const fromIndex = 3
      const toIndex = 1
      const movedArr = UtilHelper.arrayMoveMultiple(
        arr,
        fromIndex,
        toIndex,
        noOfItems,
      )
      expect(movedArr).toEqual([1, 4, 5, 2, 3])
    })

    it('should move from 3 to 2', () => {
      const arr = [1, 2, 3, 4, 5]
      const noOfItems = 2
      const fromIndex = 3
      const toIndex = 2
      const movedArr = UtilHelper.arrayMoveMultiple(
        arr,
        fromIndex,
        toIndex,
        noOfItems,
      )
      expect(movedArr).toEqual([1, 2, 4, 5, 3])
    })
  })

  describe('removeNils', () => {
    it('should return correct results', () => {
      expect(UtilHelper.removeNils({ a: 1, b: null, c: 3, d: null })).toEqual({
        a: 1,
        c: 3,
      })
      expect(
        UtilHelper.removeNils({ a: null, b: null, c: null, d: null }),
      ).toEqual({})
    })
  })

  describe('setObject', () => {
    it('should return correct results', () => {
      expect(
        UtilHelper.setObject('a.b[1].d', 'test', {
          a: { b: [{ c: 3 }, { d: 4 }] },
        }),
      ).toEqual({
        a: { b: [{ c: 3 }, { d: 'test' }] },
      })
      expect(UtilHelper.setObject('a.b', 'test', {})).toEqual({
        a: { b: 'test' },
      })
      expect(
        UtilHelper.setObject('a.b', 'test', {
          a: { b: 'existing', c: 'yoo' },
          d: 'newObject',
        }),
      ).toEqual({
        a: {
          b: 'test',
          c: 'yoo',
        },
        d: 'newObject',
      })
    })
  })

  describe('parseFullName', () => {
    it('should return correct results', () => {
      expect(UtilHelper.parseFullName('Chan')).toEqual({
        error: [],
        first: '',
        last: 'Chan',
        middle: '',
        nick: '',
        suffix: '',
        title: '',
      })
      expect(UtilHelper.parseFullName('Eric Chan')).toEqual({
        error: [],
        first: 'Eric',
        last: 'Chan',
        middle: '',
        nick: '',
        suffix: '',
        title: '',
      })
      expect(UtilHelper.parseFullName('Mr. Eric Chan')).toEqual({
        error: [],
        first: 'Eric',
        last: 'Chan',
        middle: '',
        nick: '',
        suffix: '',
        title: 'Mr.',
      })
    })
  })

  describe('updateArrayItemById', () => {
    const item1 = { id: 'item-1' }
    const item2 = { id: 'item-2' }
    const items = [item1, item2]
    const updatedItem = { ...item1, isGenerated: true }
    beforeEach(() => {
      results = UtilHelper.updateArrayItemById(items, updatedItem)
    })

    it('should return correct results', () => {
      expect(results).toEqual([updatedItem, item2])
    })
  })

  describe('isPropNullUndefined', () => {
    it('should return true if passing a null prop', () => {
      results = UtilHelper.isPropNullOrUndefined(null)
      expect(results).toEqual(true)
    })

    it('should return true if passing a undefined prop', () => {
      results = UtilHelper.isPropNullOrUndefined(undefined)
      expect(results).toEqual(true)
    })

    it('should return false if passing a false boolean prop', () => {
      results = UtilHelper.isPropNullOrUndefined(false)
      expect(results).toEqual(false)
    })

    it('should return false if passing a 0 prop', () => {
      results = UtilHelper.isPropNullOrUndefined(0)
      expect(results).toEqual(false)
    })

    it('should return false if passing a truthy prop', () => {
      results = UtilHelper.isPropNullOrUndefined('something')
      expect(results).toEqual(false)
    })
  })

  describe('percentTextToFloat', () => {
    it('should convert 50% to 0.5', () => {
      results = UtilHelper.percentTextToFloat('50%')
      expect(results).toEqual(0.5)
    })

    it('should convert 100% to 1', () => {
      results = UtilHelper.percentTextToFloat('100%')
      expect(results).toEqual(1)
    })

    it('should convert 0% to 0', () => {
      results = UtilHelper.percentTextToFloat('0%')
      expect(results).toEqual(0)
    })

    it('should convert 25.5% to 0.255', () => {
      results = UtilHelper.percentTextToFloat('25.5%')
      expect(results).toEqual(0.255)
    })

    it('should convert 200% to 2', () => {
      results = UtilHelper.percentTextToFloat('200%')
      expect(results).toEqual(2)
    })

    it('should convert negative percentage -50% to -0.5', () => {
      results = UtilHelper.percentTextToFloat('-50%')
      expect(results).toEqual(-0.5)
    })

    it('should handle percentage without % sign as a number divided by 100', () => {
      results = UtilHelper.percentTextToFloat('75')
      expect(results).toEqual(0.75)
    })

    it('should handle decimal values like 33.33%', () => {
      results = UtilHelper.percentTextToFloat('33.33%')
      expect(results).toBeCloseTo(0.3333, 4)
    })

    it('should handle very small percentages like 0.1%', () => {
      results = UtilHelper.percentTextToFloat('0.1%')
      expect(results).toEqual(0.001)
    })

    it('should return NaN for invalid input', () => {
      results = UtilHelper.percentTextToFloat('invalid%')
      expect(results).toBeNaN()
    })

    it('should return NaN for empty string with %', () => {
      results = UtilHelper.percentTextToFloat('%')
      expect(results).toBeNaN()
    })

    it('should handle leading spaces in percentage string', () => {
      results = UtilHelper.percentTextToFloat(' 50%')
      expect(results).toEqual(0.5) // parseFloat handles leading spaces
    })
  })
})
