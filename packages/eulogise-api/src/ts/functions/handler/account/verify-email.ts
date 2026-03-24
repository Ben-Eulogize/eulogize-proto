import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin } from '../../middleware'
import { AccountController } from '../../controller'

export const accountVerifyEmailHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    console.log('accountVerifyEmailHandler token', { token: query.token })
    const webtoken = await AccountController.verifyEmail(query.token)
    console.log('accountVerifyEmailHandler webtoken created', { webtoken })
    const parsedWebtoken = Webtoken.decode(webtoken)
    const accountObj = (await AccountController.signCheckUser(
      parsedWebtoken.ref,
    ))!

    return {
      statusCode: 200,
      body: {
        webtoken,
        account: accountObj,
      },
      headers: {
        'Set-Cookie': Webtoken.cookiefy(webtoken),
      },
    }
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: `Invalid query.`,
    })
  }

  return {
    statusCode: 200,
    body: {},
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountVerifyEmailHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      token: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
