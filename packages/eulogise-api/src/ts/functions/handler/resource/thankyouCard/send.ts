import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { thankyouCardResourceController } from '../../../controller'

export const resourceThankyouCardSend: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await thankyouCardResourceController.sendPrintEmail(query.thankyouCard)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to send thankyouCard.`,
    })
  }

  return {
    statusCode: 200,
    body: {},
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceThankyouCardSend),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      thankyouCard: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
