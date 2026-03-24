import { EulogisePage } from '@eulogise/core'
import { MOCK_CUSTOMER_EMAIL_1, MOCK_PASSWORD } from '@eulogise/mock'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Login Button', () => {
    describe('Login with correct email and password', () => {
      const email = MOCK_CUSTOMER_EMAIL_1
      beforeEach(() => {
        cy.get('#login_email').type(email)
        cy.get('#login_password').type(MOCK_PASSWORD)
        cy.get('.login-form-button').click()
      })

      it('should direct user to the dashboard', () => {
        cy.assertPage(EulogisePage.DASHBOARD)
      })

      describe('Click Logout', () => {
        beforeEach(() => {
          cy.assertPage(EulogisePage.DASHBOARD)

          cy.get('.header-profile-dropdown').click()
          cy.get('#header-profile-dropdown-item-logout').click()
        })

        it('should direct the user to Login page', () => {
          cy.assertPage(EulogisePage.SIGN_IN)
        })
      })

      describe('Navigating back to the login page', () => {
        beforeEach(() => {
          // user should be on the dashboard page after logging in
          cy.assertPage(EulogisePage.DASHBOARD)

          // revisiting the page
          cy.visit('/')
        })

        it('should direct the user back to the Dashboard', () => {
          cy.assertPage(EulogisePage.DASHBOARD)
        })
      })
    })

    describe('Login with incorrect email and password', () => {
      beforeEach(() => {
        cy.get('#login_email').type('incorrect@email.com')
        cy.get('#login_password').type('incorrectpassword')
        cy.get('.login-form-button').click()
      })

      it('should remain in the login page', () => {
        cy.assertPage(EulogisePage.SIGN_IN)
      })

      it('should show "Invalid email address." in the notification', () => {
        cy.get('.notification').contains('Invalid email address.')
      })
    })
  })

  describe('Forgot Password Link', () => {
    describe('Click', () => {
      beforeEach(() => {
        cy.findByRole('link', { name: 'Forgot password?' }).click()
      })

      it('should direct user to the forgot password page', () => {
        cy.assertPage(EulogisePage.FORGOT_PASSWORD)
      })
    })
  })

  describe('Register Link', () => {
    describe('Click', () => {
      beforeEach(() => {
        cy.get('.register-here-link').click()
      })

      it('should direct user to the sign up page', () => {
        cy.assertPage(EulogisePage.SIGN_UP)
      })
    })
  })
})
