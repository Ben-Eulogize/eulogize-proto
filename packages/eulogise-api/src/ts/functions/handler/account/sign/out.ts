import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'

import cookie from 'cookie'

export const accountSignOutHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  return {
    statusCode: 200,
    body: {},
    headers: {
      'Set-Cookie': cookie.serialize('webtoken', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
      }),
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, accountSignOutHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {}
  export interface Response extends Lambdur.Handler.Response {
    headers: {
      'Set-Cookie': string
    }
  }
}
