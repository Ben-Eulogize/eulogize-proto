import { Lambdur } from 'lambdur'
import { accessControlAllowOrigin } from '../../../middleware'
import { AccountController } from '../../../controller'
import { EulogiseUserRole } from '@eulogise/core'

export const accountSignUpCoEditor: Lambdur.Handler<
  handler.IRequest,
  handler.IResponse
> = async (request, context) => {
  const query = request.body
  const { role } = query

  if (
    !(
      query.role === EulogiseUserRole.COEDITOR ||
      query.role === EulogiseUserRole.EDITOR
    )
  ) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: "You don' have permission to create this user role.",
    })
  }

  if (!query.fullName || !query.email || !query.role) {
    throw new Lambdur.Error({
      id: '',
      statusCode: 400,
      message: 'Missing `fullName`, `role` or `email` param.',
    })
  }

  let result: object
  result = await AccountController.signUpCoEditor(
    query.fullName,
    query.email,
    role,
  )

  return {
    statusCode: 200,
    body: result,
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(accountSignUpCoEditor),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface IRequest extends Lambdur.Handler.Request {
    body: {
      fullName: string
      email: string
      password: string
      deceasedName: string
      funeralHome: string
      clientUser: string
      clientEmail: string
      invite?: string
      role: EulogiseUserRole
    }
  }
  export interface IResponse extends Lambdur.Handler.Response {
    body: {}
  }
}
