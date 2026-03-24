import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import {
  accessControlAllowOrigin,
  mwWebtokenAccount,
  mwWebtokenAccountRole,
} from '../../middleware'
import { PaymentController } from '../../controller'
import { EulogiseUserRole } from '@eulogise/core'
import {
  ApiLambdaHelper,
  ApiLambdaJobTypes,
} from '../../../utils/ApiLambdaHelper'

const reindexRedisDb = async () => {
  await ApiLambdaHelper.invokeJob(
    ApiLambdaJobTypes.REINDEX_REDIS_DB,
    {
      redisIndexes: ['invoices'],
    },
    true,
  )
}

export const paymentCreateHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  const query = request.body

  try {
    const res = await PaymentController.create(request.webtoken, query.options)
    await reindexRedisDb()
    return {
      statusCode: 200,
      body: res,
    }
  } catch (error) {
    console.log('paymentCreateHandler error', error)
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to process payment.`,
    })
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(
    mwWebtokenAccount,
    mwWebtokenAccountRole([
      EulogiseUserRole.CUSTOMER,
      EulogiseUserRole.CLIENT,
      EulogiseUserRole.EDITOR,
    ]),
    paymentCreateHandler,
  ),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: {
      options: PaymentController.PaymentOptions
    }
  }
  export interface Response extends Lambdur.Handler.Response {}
}
