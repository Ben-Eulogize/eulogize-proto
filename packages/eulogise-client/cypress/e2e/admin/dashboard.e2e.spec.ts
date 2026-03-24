import { LoginFeature } from '../../support/commands/features/login'
import { EulogisePage } from '@eulogise/core'

describe('Dashboard Page', () => {
  describe(`Logged in as Admin`, () => {
    beforeEach(() => {
      LoginFeature.givenAdminLoggedIn()
    })

    it('should direct user to the admin clients page', () => {
      cy.assertPage(EulogisePage.EULOGIZE_ADMIN_CLIENTS)
    })
  })
})
