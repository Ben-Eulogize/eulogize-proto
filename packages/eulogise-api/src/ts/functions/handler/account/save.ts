import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import {
  accessControlAllowOrigin,
  mwWebtokenAccount,
  mwWebtokenAccountRole,
} from '../../middleware'
import { AccountController } from '../../controller'
import { IUserModel } from '../../../database/types/UserModel.types'
import { EulogiseUserRole } from '@eulogise/core'

export const accountSaveHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await AccountController.save(request.webtoken, query.user)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    console.log('error', error)
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
  Lambdur.chain(
    mwWebtokenAccount,
    mwWebtokenAccountRole([
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.EDITOR,
      EulogiseUserRole.COEDITOR,
    ]),
    accountSaveHandler,
  ),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      user: IUserModel.PublicSchema
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
