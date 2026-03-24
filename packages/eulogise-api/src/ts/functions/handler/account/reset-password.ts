import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin } from '../../middleware'
import { AccountController } from '../../controller'

export const accountResetPasswordHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await AccountController.resetPassword(query.token, query.password)
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
  Lambdur.chain(accountResetPasswordHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      token: string
      password: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
