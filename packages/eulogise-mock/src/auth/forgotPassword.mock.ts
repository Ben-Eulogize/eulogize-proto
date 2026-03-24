import { AbstractMock } from '../AbstractMock'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { MOCK_FORGOT_PASSWORD_REQUEST_RESPONSES } from './forgotPassword.mock.data'

export class ForgotPasswordMock extends AbstractMock {
  constructor(mock: any) {
    super(mock)
    this.mockForgotPasswordRequest()
  }

  protected mockForgotPasswordRequest() {
    this.mockPostRequest(
      EulogiseEndpoint.FORGOT_PASSWORD,
      MOCK_FORGOT_PASSWORD_REQUEST_RESPONSES,
    )
    this.mockErrorRequest(
      EulogiseEndpoint.FORGOT_PASSWORD,
      'Invalid email address.',
    )
  }
}
