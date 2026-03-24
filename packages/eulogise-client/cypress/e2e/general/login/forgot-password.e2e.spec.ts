import { EulogisePage } from '@eulogise/core'
import { MOCK_CUSTOMER_EMAIL_1 } from '@eulogise/mock'

describe('Forgot Password Page', () => {
  beforeEach(() => {
    cy.visit(EulogisePage.FORGOT_PASSWORD)
  })

  describe('Request new password Button', () => {
    describe('Login with correct email and password', () => {
      const email = MOCK_CUSTOMER_EMAIL_1
      beforeEach(() => {
        cy.get('#forgot-password_email').type(email)
        cy.get('.forgot-password-form-button').click()
      })

      it('should remain in the forgot password page', () => {
        cy.assertPage(EulogisePage.FORGOT_PASSWORD)
      })
    })

    describe('Login with incorrect email', () => {
      beforeEach(() => {
        cy.get('#forgot-password_email').type('incorrect@email.com')
        cy.get('.forgot-password-form-button').click()
      })

      it('should remain in the Forgot Password page', () => {
        cy.assertPage(EulogisePage.FORGOT_PASSWORD)
      })

      it("should show 'Invalid `email`.' in the notification", () => {
        cy.get('.notification').contains('Invalid `email`.')
      })
    })
  })

  describe('Cancel Button', () => {
    describe('Click', () => {
      beforeEach(() => {
        cy.get('.cancel-link').click()
      })

      it('should direct user to the sign in page', () => {
        cy.assertPage(EulogisePage.SIGN_IN)
      })
    })
  })
})
