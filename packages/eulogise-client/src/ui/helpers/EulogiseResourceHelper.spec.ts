import { EulogiseResourceHelper } from './EulogiseResourceHelper'

describe('EulogiseResourceHelper', () => {
  let results: any
  let error: any

  describe('getLatestItem()', () => {
    const item1 = { name: 'Item 1', updatedAt: '2021-10-03T00:00:00' }
    const item2 = { name: 'Item 2', updatedAt: '2021-10-04T00:00:00' }
    const item3 = { name: 'Item 3', updatedAt: '2021-10-02T00:00:00' }

    describe('undefined parameter', () => {
      beforeEach(() => {
        results = EulogiseResourceHelper.getLatestItem()
      })

      it('should return undefined', () => {
        expect(results).toBeUndefined()
      })
    })

    describe('Empty Array', () => {
      beforeEach(() => {
        results = EulogiseResourceHelper.getLatestItem([])
      })

      it('should return undefined', () => {
        expect(results).toBeUndefined()
      })
    })

    describe('non Array item', () => {
      beforeEach(() => {
        try {
          // @ts-ignore
          results = EulogiseResourceHelper.getLatestItem('test')
        } catch (ex) {
          error = ex
        }
      })

      it('should throw an error', () => {
        expect(error.message).toEqual('Parameter must be an Array')
      })
    })

    describe('1 item', () => {
      beforeEach(() => {
        results = EulogiseResourceHelper.getLatestItem([item1])
      })

      it('should item1', () => {
        expect(results).toEqual(item1)
      })
    })

    describe('multiple items', () => {
      beforeEach(() => {
        results = EulogiseResourceHelper.getLatestItem([item1, item2, item3])
      })

      it('should return the latest item', () => {
        expect(results).toEqual(item2)
      })
    })
  })
})
