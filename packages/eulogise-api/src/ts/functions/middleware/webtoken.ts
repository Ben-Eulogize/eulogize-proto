import { Lambdur } from 'lambdur'
import { Webtoken } from '../../webtoken'

import cookie from 'cookie'
import { EulogiseUserRole } from '@eulogise/core'

export const mwWebtokenAccount: Lambdur.Handler<
  mwWebtokenAccount.Request,
  mwWebtokenAccount.Response
> = async (request, context) => {
  const cookies = cookie.parse(String(request.headers.cookie))

  let webtoken: Webtoken.Payload.Account

  const path = (request as any)?.path
  // all public facing url (no webtoken required)
  if (
    path === '/v2/healthcheck' ||
    !(request.query.webtoken || cookies.webtoken)
  ) {
    return {
      statusCode: 200,
      message: 'OK',
    }
  }
  try {
    webtoken = Webtoken.decode(request.query.webtoken || cookies.webtoken)
  } catch (error) {
    console.log('error on validating webtoken', error)
    throw new Lambdur.Error({
      id: '',
      statusCode: 403,
      message: 'Invalid `webtoken` signature.',
    })
  }

  if (!webtoken.ref || !webtoken.type) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 403,
      message: 'Invalid `webtoken` content.',
    })
  }

  request.webtoken = webtoken

  return {
    statusCode: 200,
  }
}

export namespace mwWebtokenAccount {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    query: {
      webtoken?: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}

export const mwWebtokenAccountRole = (
  roles: Array<EulogiseUserRole>,
): Lambdur.Handler<
  mwWebtokenAccountRole.Request,
  mwWebtokenAccountRole.Response
> => {
  return async (request, context) => {
    if (!roles.includes(request.webtoken.role)) {
      throw new Lambdur.Error({
        id: '',
        statusCode: 403,
        message: 'Invalid `webtoken.role`.',
      })
    }

    return {
      statusCode: 200,
    }
  }
}

export namespace mwWebtokenAccountRole {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {}
  export interface Response extends Lambdur.Handler.Response {}
}
