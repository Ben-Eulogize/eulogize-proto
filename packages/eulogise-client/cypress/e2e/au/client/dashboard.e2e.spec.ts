import { LoginFeature } from '../../../support/commands/features/login'
import { EulogisePage, EulogiseProduct, EulogiseRegion } from '@eulogise/core'
import { CypressTestUtils } from '../../../support/testUtils'
import { CardProductFeatures } from '../../../support/commands/features/CardProductFeatures'
import { DashboardFeature } from '../../../support/commands/features/DashboardFeature'

describe('Dashboard Page', () => {
  const region = EulogiseRegion.AU

  describe(`Logged in as AU Client`, () => {
    beforeEach(() => {
      LoginFeature.givenClientAdminLoggedIn()
    })

    it('should direct user to the client cases dashboard', () => {
      cy.assertPage(EulogisePage.CLIENT_ADMIN_CASES)
    })

    describe('Create New Case', () => {
      let deceasedName
      let familyName

      beforeEach(() => {
        deceasedName = CypressTestUtils.getUniqueFullName()
        familyName = CypressTestUtils.getUniqueFullName()
        CardProductFeatures.clientCreateCase({ deceasedName, familyName })
      })

      it('should show "Create a New Memorial" modal', () => {
        cy.findByText(deceasedName)
          .should('exist')
          .parents('tr')
          .first()
          .within(() => {
            cy.findByText(familyName).should('be.visible')
          })
      })

      describe('Click on the case', () => {
        beforeEach(() => {
          cy.findByText(deceasedName).first().should('exist').click()
        })

        it('should direct user to the case dashboard', () => {
          cy.assertPage(EulogisePage.DASHBOARD)
        })

        describe('Booklet', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.BOOKLET,
            region,
          }))

        describe('Slideshow', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.SLIDESHOW,
            region,
          }))

        describe('Memorial Card', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.SIDED_CARD,
            region,
          }))

        describe('Bookmark', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.BOOKMARK,
            region,
          }))

        describe('Thankyou Card', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.THANK_YOU_CARD,
            region,
          }))

        describe('TV Welcome Screen', () =>
          DashboardFeature.fullSelectThemeFeature({
            product: EulogiseProduct.TV_WELCOME_SCREEN,
            region,
          }))
      })
    })
  })
})
