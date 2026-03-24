import { Lambdur } from 'lambdur'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'
import { EulogiseUserRole } from '@eulogise/core'

export const accountSignUpClientAsAdmin: Lambdur.Handler<
  handler.IRequest,
  handler.IResponse
> = async (request, context) => {
  const query = request.body

  if (!query.fullName || !query.email || !query.type) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `fullName`, `email` or `type` param.',
    })
  }

  let result: object

  result = await AccountController.signUpClientAsAdmin(
    query.fullName,
    query.email,
    query.password,
    query.type,
  )

  return {
    statusCode: 200,
    body: result,
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignUpClientAsAdmin),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface IRequest extends Lambdur.Handler.Request {
    body: {
      fullName: string
      email: string
      password: string
      type: EulogiseUserRole.CLIENT
      deceasedName: string
      clientEmail: string
      invite?: string
    }
  }
  export interface IResponse extends Lambdur.Handler.Response {
    body: {}
  }
}
