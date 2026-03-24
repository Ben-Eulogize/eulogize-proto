import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin, mwWebtokenAccount } from '../../middleware'
import { FindHandler } from '../../controller/resource/handler/FindHandler.types'
import { ResourceController } from '../../controller/ResourceController'

export const resourceFindHandler: Lambdur.Handler<
  FindHandler.Request,
  FindHandler.Response
> = async (request, context) => {
  if (
    (request as unknown as { source: string }).source ===
    'serverless-plugin-warmup'
  ) {
    console.log('WarmUp - Lambda is warm!')
    return
  }

  let findResult: any

  console.log('findHandler', { body: request.body })
  try {
    findResult = await ResourceController.switchHandler(
      request.webtoken,
      request.body,
    )
  } catch (error) {
    console.log(
      `🚨 Something wrong in resourceFindHandler, error is ${error}`,
      error,
    )
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to find ${request.body.resource}`,
    })
  }

  return {
    statusCode: 200,
    body: {
      items: findResult,
      count: findResult.length,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceFindHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Query {
    resource: string
    search: any
  }
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: handler.Query
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      items: any[]
      count: number
    }
  }
}
