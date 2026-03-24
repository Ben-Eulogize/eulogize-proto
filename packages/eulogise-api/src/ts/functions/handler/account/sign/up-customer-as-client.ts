import { Lambdur } from 'lambdur'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'
import { EulogiseUserRole } from '@eulogise/core'

export const accountSignUpCustomerAsClient: Lambdur.Handler<
  handler.IRequest,
  handler.IResponse
> = async (request, context) => {
  const query = request.body

  if (!query.fullName || !query.password || !query.type) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `fullName`, `email`, `password` or `type` param.',
    })
  }

  let result: object

  result = await AccountController.signUpCustomerAsClient(
    query.fullName,
    query.password,
    query.type,
    query.email,
    query.invite,
  )

  return {
    statusCode: 200,
    body: result,
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignUpCustomerAsClient),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface IRequest extends Lambdur.Handler.Request {
    body: {
      fullName: string
      email: string
      password: string
      type:
        | EulogiseUserRole.CUSTOMER
        | EulogiseUserRole.CLIENT
        | EulogiseUserRole.EDITOR
        | EulogiseUserRole.COEDITOR
      deceasedName: string
      funeralHome: string
      clientUser: string
      clientEmail: string
      invite?: string
    }
  }
  export interface IResponse extends Lambdur.Handler.Response {
    body: {}
  }
}
