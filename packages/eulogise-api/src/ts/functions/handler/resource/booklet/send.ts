import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../../webtoken'
import {
  mwWebtokenAccount,
  accessControlAllowOrigin,
} from '../../../middleware'
import { bookletResourceController } from '../../../controller'

export const resourceBookletSend: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    await bookletResourceController.sendPrintEmail(query.booklet)
  } catch (error) {
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to send booklet.`,
    })
  }

  return {
    statusCode: 200,
    body: {},
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceBookletSend),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      booklet: string
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
