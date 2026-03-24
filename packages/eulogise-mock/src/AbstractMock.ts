import { IRequestResponse } from '@eulogise/core'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { MOCK_USERS } from './users/users.mock'
import { IEulogiseUser } from '@eulogise/core'

export abstract class AbstractMock {
  mock: any
  sendWithJWT: boolean

  protected constructor(mock: any, sendWithJWT: boolean = false) {
    this.mock = mock
    this.sendWithJWT = sendWithJWT
  }

  protected mockPostRequest(
    endpoint: string,
    requestResponses: Array<IRequestResponse>,
  ) {
    for (const { request, response, webtoken } of requestResponses) {
      if (this.sendWithJWT) {
        const user = MOCK_USERS.find(
          (u: IEulogiseUser) => u.webtoken === webtoken,
        )
        console.log(
          'mock with token',
          endpoint,
          JSON.stringify(request),
          webtoken,
          user,
          response,
        )
        this.mock
          .onPost(
            `${EulogiseClientConfig.EULOGISE_API_URL}${endpoint}?webtoken=${webtoken}`,
            request.body,
          )
          .reply(200, response)
      } else {
        console.log('mock', endpoint, request, response)
        this.mock
          .onPost(
            `${EulogiseClientConfig.EULOGISE_API_URL}${endpoint}`,
            request.body,
          )
          .reply(200, response)
      }
    }
  }

  protected mockErrorRequest(endpoint: string, message: string) {
    this.mock
      .onPost(`${EulogiseClientConfig.EULOGISE_API_URL}${endpoint}`)
      .reply(400, {
        error: {
          id: 'abcd',
          message,
          ref: 'abcdef',
        },
      })
  }
}
