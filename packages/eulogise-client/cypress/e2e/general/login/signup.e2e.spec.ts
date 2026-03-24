import { CypressHelper } from '../../../support/helpers/CypressHelper'
import { EulogisePage } from '@eulogise/core'
import { CypressTestUtils } from '../../../support/testUtils'

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.visit(CypressHelper.pageUrl(EulogisePage.SIGN_UP))
  })

  describe('Sign Up Button', () => {
    describe('Success', () => {
      beforeEach(() => {
        const user1 = CypressTestUtils.createRandomUser()
        cy.get('#signup_fullName').type(user1.fullName)
        cy.get('#signup_email').type(user1.email)
        cy.get('#signup_password').type(user1.password)
        cy.get('#signup_deceasedName').type(user1.deceasedName)

        cy.get('#signup_deceasedDate').invoke(
          'attr',
          'value',
          user1.deceasedDate,
        )
        cy.get('#signup_country').click()
        cy.get('.ant-select-item-option-content:first-of-type').click({
          multiple: true,
          force: true,
        })
        cy.get('.confirm-sign-up-checkbox').within(() => {
          cy.findByText(/I have read/i).click()
        })
        cy.get('.signup-form-sign-up-button').click()
      })

      it('should direct user to the dashboard', () => {
        cy.assertPage(EulogisePage.DASHBOARD)
      })

      describe('Navigating back to the login page', () => {
        beforeEach(() => {
          cy.assertPage(EulogisePage.DASHBOARD)
          cy.visit('/')
        })

        it('should direct the user back to the Dashboard', () => {
          cy.assertPage(EulogisePage.DASHBOARD)
        })
      })
    })
  })

  describe('Sign In Link', () => {
    describe('Click', () => {
      beforeEach(() => {
        cy.get('.sign-in-link').click()
      })

      it('should direct user to the sign in page', () => {
        cy.assertPage(EulogisePage.SIGN_IN)
      })
    })
  })
})
