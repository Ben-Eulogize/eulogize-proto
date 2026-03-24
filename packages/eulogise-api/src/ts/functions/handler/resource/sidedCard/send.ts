import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { sidedCardResourceController } from '../../../controller'

export const resourceSidedCardSend: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await sidedCardResourceController.sendPrintEmail(query.sidedCard)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to send sided card.`,
    })
  }

  return {
    statusCode: 200,
    body: {},
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceSidedCardSend),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      sidedCard: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
