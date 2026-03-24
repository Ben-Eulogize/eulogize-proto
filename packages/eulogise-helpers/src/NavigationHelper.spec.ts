import { NavigationHelper } from './NavigationHelper'

describe('NavigationHelper', () => {
  describe('isClientDashboardPage()', () => {
    it('should return true', () => {
      expect(NavigationHelper.isClientDashboardPage('/admin/client')).toEqual(
        true,
      )
    })

    it('should return false', () => {
      expect(
        NavigationHelper.isClientDashboardPage('/admin/dashboard/aa'),
      ).toEqual(false)
    })
  })

  describe('isProductPage()', () => {
    it('should return true', () => {
      expect(NavigationHelper.isProductPage('/admin/booklets/a')).toEqual(true)
      expect(NavigationHelper.isProductPage('/admin/bookmarks/a')).toEqual(true)
      expect(NavigationHelper.isProductPage('/admin/slideshows/a')).toEqual(
        true,
      )
      expect(NavigationHelper.isProductPage('/admin/thankYouCards/a')).toEqual(
        true,
      )
      expect(NavigationHelper.isProductPage('/admin/sidedCards/a')).toEqual(
        true,
      )
      expect(
        NavigationHelper.isProductPage('/admin/tvWelcomeScreens/a'),
      ).toEqual(true)
    })

    it('should return false', () => {
      expect(NavigationHelper.isProductPage('/admin/non-product')).toEqual(
        false,
      )
    })
  })

  describe('isShowHelpGuide()', () => {
    it('should return true for dashboard page', () => {
      expect(NavigationHelper.isShowHelpGuide('/admin/dashboard')).toEqual(true)
      expect(NavigationHelper.isShowHelpGuide('/admin/dashboard/')).toEqual(
        true,
      )
      expect(
        NavigationHelper.isShowHelpGuide('/admin/dashboard?param=value'),
      ).toEqual(true)
    })

    it('should return true for all product editing pages', () => {
      // Test slideshow
      expect(NavigationHelper.isShowHelpGuide('/admin/slideshows/123')).toEqual(
        true,
      )
      expect(
        NavigationHelper.isShowHelpGuide('/admin/slideshows/abc-def-ghi'),
      ).toEqual(true)

      // Test booklet
      expect(NavigationHelper.isShowHelpGuide('/admin/booklets/456')).toEqual(
        true,
      )
      expect(
        NavigationHelper.isShowHelpGuide('/admin/booklets/booklet-id-789'),
      ).toEqual(true)

      // Test bookmark
      expect(NavigationHelper.isShowHelpGuide('/admin/bookmarks/789')).toEqual(
        false,
      )

      // Test sided card
      expect(NavigationHelper.isShowHelpGuide('/admin/sidedCards/abc')).toEqual(
        false,
      )

      // Test thank you card
      expect(
        NavigationHelper.isShowHelpGuide('/admin/thankYouCards/xyz'),
      ).toEqual(false)

      // Test photobook
      expect(
        NavigationHelper.isShowHelpGuide('/admin/photobooks/pb123'),
      ).toEqual(false)

      // Test TV welcome screen
      expect(
        NavigationHelper.isShowHelpGuide('/admin/tvWelcomeScreens/tv456'),
      ).toEqual(false)
    })

    it('should return true for product pages with query parameters', () => {
      expect(
        NavigationHelper.isShowHelpGuide('/admin/slideshows/123?edit=true'),
      ).toEqual(true)
      expect(
        NavigationHelper.isShowHelpGuide(
          '/admin/booklets/456?mode=preview&theme=dark',
        ),
      ).toEqual(true)
    })

    it('should return false for non-product pages', () => {
      expect(NavigationHelper.isShowHelpGuide('/admin/settings')).toEqual(false)
      expect(
        NavigationHelper.isShowHelpGuide('/admin/client/settings'),
      ).toEqual(false)
      expect(NavigationHelper.isShowHelpGuide('/admin/client/cases')).toEqual(
        false,
      )
      expect(NavigationHelper.isShowHelpGuide('/')).toEqual(false)
      expect(NavigationHelper.isShowHelpGuide('/sign-up')).toEqual(false)
      expect(NavigationHelper.isShowHelpGuide('/forgot-password')).toEqual(
        false,
      )
    })

    it('should return false for checkout pages', () => {
      expect(
        NavigationHelper.isShowHelpGuide('/admin/checkout/package'),
      ).toEqual(false)
      expect(
        NavigationHelper.isShowHelpGuide('/admin/checkout/payment'),
      ).toEqual(false)
      expect(
        NavigationHelper.isShowHelpGuide('/admin/checkout/shipping'),
      ).toEqual(false)
    })

    it('should return false for eulogizeAdmin pages', () => {
      expect(NavigationHelper.isShowHelpGuide('/eulogizeAdmin/users')).toEqual(
        false,
      )
      expect(
        NavigationHelper.isShowHelpGuide('/eulogizeAdmin/clients'),
      ).toEqual(false)
      expect(NavigationHelper.isShowHelpGuide('/eulogizeAdmin/cases')).toEqual(
        false,
      )
    })

    it('should return false for preview pages', () => {
      expect(NavigationHelper.isShowHelpGuide('/preview/slideshow')).toEqual(
        false,
      )
      expect(
        NavigationHelper.isShowHelpGuide('/preview/cardProducts/booklet'),
      ).toEqual(false)
    })

    it('should return false for embedded pages', () => {
      expect(
        NavigationHelper.isShowHelpGuide('/embedded/slideshows/caseId'),
      ).toEqual(false)
      expect(
        NavigationHelper.isShowHelpGuide('/embedded/whitebar/caseId'),
      ).toEqual(false)
    })
  })
})
