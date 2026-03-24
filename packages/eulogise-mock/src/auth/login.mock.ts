import { AbstractMock } from '../AbstractMock'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { MOCK_LOGIN_REQUEST_RESPONSES } from './login.mock.data'

export class LoginMock extends AbstractMock {
  constructor(mock: any) {
    super(mock)
    this.mockLoginRequest()
  }

  protected mockLoginRequest() {
    this.mockPostRequest(
      EulogiseEndpoint.ACCOUNT_SIGN_IN,
      MOCK_LOGIN_REQUEST_RESPONSES,
    )
    this.mockErrorRequest(
      EulogiseEndpoint.ACCOUNT_SIGN_IN,
      'Invalid email address.',
    )
  }
}
