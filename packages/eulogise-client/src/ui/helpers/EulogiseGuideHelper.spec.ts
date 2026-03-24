import { EulogiseGuideHelper } from './EulogiseGuideHelper'

describe('findShowGuideAt', () => {
  let results: any
  let pathname: any

  it('should return DASHBOARD', () => {
    pathname = '/admin/dashboard/'
    results = EulogiseGuideHelper.findShowGuideAt(pathname)
    expect(results).toBe('DASHBOARD')
  })

  it('should return BOOKLET', () => {
    pathname = '/admin/booklets/'
    results = EulogiseGuideHelper.findShowGuideAt(pathname)
    expect(results).toBe('BOOKLET')
  })

  it('should return SLIDESHOW', () => {
    pathname = '/admin/slideshows/'
    results = EulogiseGuideHelper.findShowGuideAt(pathname)
    expect(results).toBe('SLIDESHOW')
  })

  it('should return CLIENT_DASHBOARD_PART_ONE', () => {
    pathname = '/admin/client/cases/'
    results = EulogiseGuideHelper.findShowGuideAt(pathname)
    expect(results).toBe('CLIENT_DASHBOARD_PART_ONE')
  })

  it('should return null', () => {
    pathname = '/random/page'
    results = EulogiseGuideHelper.findShowGuideAt(pathname)
    expect(results).toBe(null)
  })
})
