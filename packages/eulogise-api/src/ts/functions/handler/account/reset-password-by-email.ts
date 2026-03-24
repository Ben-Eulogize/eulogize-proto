import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin } from '../../middleware'
import { AccountController } from '../../controller'

export const accountResetPasswordByEmailHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await AccountController.resetPasswordByEmail(query.email, query.password)
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
  Lambdur.chain(accountResetPasswordByEmailHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      email: string
      password: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
