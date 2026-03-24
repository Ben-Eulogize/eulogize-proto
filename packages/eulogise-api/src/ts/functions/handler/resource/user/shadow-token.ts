import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  accessControlAllowOrigin,
  mwWebtokenAccount,
  mwWebtokenAccountRole,
} from '../../../middleware'
import { UserResourceController } from '../../../controller'
import { EulogiseUserRole } from '@eulogise/core'

export const resourceUserShadowTokenHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  let shadowToken: string

  try {
    shadowToken = await UserResourceController.shadowToken(query.user)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to create shadow token.`,
    })
  }

  return {
    statusCode: 200,
    body: {
      token: shadowToken,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(
    mwWebtokenAccount,
    mwWebtokenAccountRole([
      EulogiseUserRole.ADMIN,
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.EDITOR,
      EulogiseUserRole.COEDITOR,
    ]),
    resourceUserShadowTokenHandler,
  ),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      user: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      token: string
    }
  }
}
