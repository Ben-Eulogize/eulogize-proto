/**
 * This RequestHelper is used for testing purpose
 */
import axios, { Method } from 'axios'
import { EulogiseUserRole, IAuthAccount, TestUserRole } from '@eulogise/core'
import { AVAILABLE_SIGN_IN_USERS } from '@eulogise/mock'

const HOST = 'http://localhost:3000'

type RequestProps = {
  method?: Method
  data?: object
  query?: object
  headers?: object
  jwt?: string
}

const STAGE = 'development'

export class TestRequestHelper {
  public static getAccessToken = async (
    userType: TestUserRole = EulogiseUserRole.CLIENT,
  ): Promise<{ account: IAuthAccount; ref: string; webtoken: string }> => {
    const axiosOptions: any = {
      url: `${HOST}/${STAGE}/account/sign/in`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...AVAILABLE_SIGN_IN_USERS[userType], type: 'user' },
    }
    console.log('Request Access Token', { userType, axiosOptions })
    const {
      data: { account, ref, webtoken },
    }: { data: { account: IAuthAccount; ref: string; webtoken: string } } =
      await axios(axiosOptions)
    console.log('access token', {
      account,
      ref,
      webtoken,
    })
    return { account, ref, webtoken }
  }
  /**
   * @param path
   * @param options
   *        - jwt - setting to null - to make Authorization header empty
   */
  public static request = async (
    path: string,
    options: RequestProps & { userType?: TestUserRole } = {},
  ): Promise<{
    account: IAuthAccount
    response: any
  }> => {
    const { userType, ...requestProps } = options
    const { account, webtoken: token } = await this.getAccessToken(userType)
    console.log(`${HOST}/${STAGE}${path}`, requestProps)
    const axiosOptions = {
      url: `${HOST}/${STAGE}${path}`,
      method: requestProps?.method,
      headers: {
        Authorization: requestProps?.jwt !== null ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        ...requestProps?.headers,
      },
      params: {
        webtoken: token,
        ...requestProps?.query,
      },
      data: requestProps?.data,
    }
    return {
      account,
      response: await axios(axiosOptions),
    }
  }
}
