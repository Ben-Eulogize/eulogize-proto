import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { InviteResourceController } from '../../../controller'

export const resourceInviteSend: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  const sendQuery = {
    invite: query.invite,
  }

  try {
    await InviteResourceController.send(request.webtoken, sendQuery)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to send invite.`,
    })
  }

  return {
    statusCode: 200,
    body: {},
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceInviteSend),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      invite: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
