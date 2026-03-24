import { UrlHelper } from './UrlHelper'
import { EulogisePage, EulogiseProduct } from '@eulogise/core'

describe('UrlHelper', () => {
  let results: any

  describe('getParams()', () => {
    describe('/slideshows/slideshow-1', () => {
      beforeEach(() => {
        results = UrlHelper.getParams(
          EulogisePage.EDIT_SLIDESHOW,
          '/admin/slideshows/slideshow-1',
        )
      })

      it('should return "slideshow-1"', () => {
        expect(results).toEqual({ slideshowId: 'slideshow-1' })
      })
    })

    describe('location object', () => {
      beforeEach(() => {
        results = UrlHelper.getParams(EulogisePage.EDIT_SLIDESHOW, {
          pathname: '/admin/slideshows/slideshow-1',
        })
      })

      it('should return "slideshow-1"', () => {
        expect(results).toEqual({ slideshowId: 'slideshow-1' })
      })
    })

    describe('queryStringify', () => {
      describe('undefined', () => {
        beforeEach(() => {
          // @ts-expect-error
          results = UrlHelper.queryStringify()
        })

        it('should return ""', () => {
          expect(results).toEqual('')
        })
      })

      describe('{}', () => {
        beforeEach(() => {
          // @ts-expect-error
          results = UrlHelper.queryStringify()
        })

        it('should return ""', () => {
          expect(results).toEqual('')
        })
      })

      describe('{applyThemeTo: "ALL"}', () => {
        beforeEach(() => {
          results = UrlHelper.queryStringify({
            applyThemeTo: EulogiseProduct.ALL,
          })
        })

        it('should return "applyThemeTo=ALL"', () => {
          expect(results).toEqual('applyThemeTo=ALL')
        })
      })
    })

    describe('undefined', () => {
      beforeEach(() => {
        results = UrlHelper.getParams(EulogisePage.EDIT_SLIDESHOW, undefined)
      })

      it('should return empty object', () => {
        expect(results).toEqual({})
      })
    })

    describe('unmatch pathname', () => {
      beforeEach(() => {
        results = UrlHelper.getParams(EulogisePage.EDIT_SLIDESHOW, 'abcd')
      })

      it('should return empty object', () => {
        expect(results).toEqual({})
      })
    })
  })

  describe('getQueryParams()', () => {
    beforeEach(() => {
      results = UrlHelper.getQueryParams('?token=123')
    })

    it('should return correct results', () => {
      expect(results).toEqual({ token: '123' })
    })
  })

  describe('getQueryParam()', () => {
    beforeEach(() => {
      results = UrlHelper.getQueryParam('token', '?token=123')
    })

    it('should return correct results', () => {
      expect(results).toEqual('123')
    })
  })

  describe('toUrl()', () => {
    const slideshowId: string = 'slideshow-1'
    describe('Success', () => {
      beforeEach(() => {
        results = UrlHelper.toUrl(EulogisePage.EDIT_SLIDESHOW, {
          slideshowId,
        })
      })

      it('should return /admin/slideshows/slideshow-1', () => {
        expect(results).toEqual(`/admin/slideshows/${slideshowId}`)
      })
    })

    describe('undefined', () => {
      beforeEach(() => {
        results = UrlHelper.toUrl(EulogisePage.EDIT_SLIDESHOW, undefined)
      })

      it('should return /admin/slideshows/:slideshowId', () => {
        expect(results).toEqual(`/admin/slideshows/:slideshowId`)
      })
    })
  })
})
