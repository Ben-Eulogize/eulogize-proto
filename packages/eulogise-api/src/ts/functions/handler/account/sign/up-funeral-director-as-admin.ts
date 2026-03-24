import { Lambdur } from 'lambdur'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'

export const accountSignUpFuneralDirectorAsAdmin: Lambdur.Handler<
  handler.IRequest,
  handler.IResponse
> = async (request, context) => {
  const query = request.body

  if (!query.fullName || !query.email) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `fullName`, `email`',
    })
  }

  let result: object

  result = await AccountController.signUpFuneralDirectorAsAdmin(
    query.fullName,
    query.email,
  )

  return {
    statusCode: 200,
    body: result,
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignUpFuneralDirectorAsAdmin),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface IRequest extends Lambdur.Handler.Request {
    body: {
      fullName: string
      email: string
    }
  }
  export interface IResponse extends Lambdur.Handler.Response {
    body: {}
  }
}
