import { DashboardHelper } from './DashboardHelper'
import { EulogiseEndpoint } from '@eulogise/client-core'

describe('DashboardHelper', () => {
  let results: any
  let pathname: any
  let pageEndPoint: any

  describe('isAtDashboardPage', () => {
    it('should return true if pathname is matched', () => {
      pathname = '/admin/dashboard/'
      pageEndPoint = EulogiseEndpoint.DASHBOARD
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(true)
    })

    it('should return false if pathname is not matched', () => {
      pathname = '/'
      pageEndPoint = EulogiseEndpoint.DASHBOARD
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(false)
    })
  })

  describe('isAtClientDashboardPage', () => {
    it('should return true if pathname is matched', () => {
      pathname = '/admin/client/cases/'
      pageEndPoint = EulogiseEndpoint.CLIENT_DASHBOARD
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(true)
    })

    it('should return false if pathname is not matched', () => {
      pathname = '/admin/dashboard/'
      pageEndPoint = EulogiseEndpoint.CLIENT_DASHBOARD
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(false)
    })
  })

  describe('isAtPhotoLibraryPage', () => {
    it('should return true if pathname is matched', () => {
      pathname = '/admin/photoLibrary/'
      pageEndPoint = EulogiseEndpoint.PHOTO_LIBRARY
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(true)
    })

    it('should return false if pathname is not matched', () => {
      pathname = '/admin/dashboard/'
      pageEndPoint = EulogiseEndpoint.PHOTO_LIBRARY
      results = DashboardHelper.isPathnameMatchedPageEndpoint({
        pathname,
        pageEndPoint,
      })
      expect(results).toEqual(false)
    })
  })
})
