import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { AccountController } from '../../../controller'
import { IUserModel } from '../../../../database/types/UserModel.types'
import { IInviteModel } from '../../../../database/types/InviteModel.types'

export const accountSignCheckHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  let accountObj: IUserModel.PublicSchema | IInviteModel.PublicSchema

  switch (request.webtoken.type) {
    case 'invite':
      accountObj = (await AccountController.signCheckInvite(
        request.webtoken.ref,
      ))!
      break
    case 'user':
      accountObj = (await AccountController.signCheckUser(
        request.webtoken.ref,
      ))!
      break
  }

  return {
    statusCode: 200,
    body: {
      account: {
        ...accountObj!,
        type: request.webtoken.type,
      },
      type: request.webtoken.type,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, accountSignCheckHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {}
  export interface Response extends Lambdur.Handler.Response {
    body: {
      account: IUserModel.PublicSchema | IInviteModel.PublicSchema
      type: Webtoken.Account.Type
    }
  }
}
