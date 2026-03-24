import { AbstractMock } from './AbstractMock'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { IFindRequestResponse } from '@eulogise/core'

export abstract class AbstractEulogiseResourceMock extends AbstractMock {
  constructor(mock: any, requestResponses: Array<IFindRequestResponse>) {
    super(mock, true)
    this.mockFindRequest(requestResponses)
  }

  protected mockFindRequest(requestResponses: any) {
    this.mockPostRequest(EulogiseEndpoint.FIND_RESOURCE, requestResponses)
  }
}
