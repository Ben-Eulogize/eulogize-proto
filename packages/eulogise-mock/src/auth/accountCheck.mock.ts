import { AbstractMock } from '../AbstractMock'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { MOCK_ACCOUNT_CHECK_REQUEST_RESPONSES } from './accountCheck.mock.data'

export class AccountCheckMock extends AbstractMock {
  constructor(mock: any) {
    super(mock, true)
    this.mockAccountCheckRequest()
  }

  protected mockAccountCheckRequest() {
    this.mockPostRequest(
      EulogiseEndpoint.ACCOUNT_CHECK,
      MOCK_ACCOUNT_CHECK_REQUEST_RESPONSES,
    )
    this.mockErrorRequest(
      EulogiseEndpoint.ACCOUNT_CHECK,
      'Invalid email address.',
    )
  }
}
