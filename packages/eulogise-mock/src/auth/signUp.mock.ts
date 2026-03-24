import { AbstractMock } from '../AbstractMock'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { MOCK_SIGN_UP_REQUEST_RESPONSES } from './signUp.mock.data'

export class SignUpMock extends AbstractMock {
  constructor(mock: any) {
    super(mock)
    this.mockSignUpRequest()
  }

  protected mockSignUpRequest() {
    this.mockPostRequest(
      EulogiseEndpoint.ACCOUNT_SIGN_UP,
      MOCK_SIGN_UP_REQUEST_RESPONSES,
    )
    this.mockErrorRequest(
      EulogiseEndpoint.ACCOUNT_SIGN_UP,
      'Invalid email address.',
    )
  }
}
