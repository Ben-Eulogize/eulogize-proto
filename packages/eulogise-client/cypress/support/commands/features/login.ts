import { EulogiseUserRole, TestUserRole } from '@eulogise/core'
import { AVAILABLE_SIGN_IN_USERS } from '@eulogise/mock'

export class LoginFeature {
  private static givenUserLoggedIn(userType: TestUserRole) {
    const user = AVAILABLE_SIGN_IN_USERS[userType]
    cy.visit('/')
    cy.get('#login_email').type(user.email)
    cy.get('#login_password').type(user.password)
    cy.get('.login-form-button').click()
  }

  public static givenAdminLoggedIn() {
    this.givenUserLoggedIn(EulogiseUserRole.ADMIN)
  }

  public static givenClientAdminLoggedIn() {
    this.givenUserLoggedIn(EulogiseUserRole.CLIENT)
  }

  public static givenUSClientAdminLoggedIn() {
    this.givenUserLoggedIn('US_CLIENT')
  }

  public static givenClientCustomerLoggedIn() {
    this.givenUserLoggedIn('CLIENT_CUSTOMER')
  }

  public static givenClientEditorLoggedIn() {
    this.givenUserLoggedIn('CLIENT_EDITOR')
  }

  public static givenClientCoEditorLoggedIn() {
    this.givenUserLoggedIn('CLIENT_COEDITOR')
  }

  public static givenCustomerLoggedIn() {
    this.givenUserLoggedIn(EulogiseUserRole.CUSTOMER)
  }

  public static givenUSCustomerLoggedIn() {
    this.givenUserLoggedIn('US_CUSTOMER')
  }

  public static givenCustomerEditorLoggedIn() {
    this.givenUserLoggedIn('CUSTOMER_EDITOR')
  }

  public static givenCustomerCoEditorLoggedIn() {
    this.givenUserLoggedIn('CUSTOMER_COEDITOR')
  }
}
