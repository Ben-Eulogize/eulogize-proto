import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { mwWebtokenAccount, accessControlAllowOrigin } from '../../middleware'
import { AssetResourceController } from '../../controller'
import { EulogiseResource, RemoveBackgroundImageMode } from '@eulogise/core'

export const resourceRemoveImageBackgroundHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  let removeResult: any

  try {
    removeResult = await switchHandler(request.webtoken, request.body)
  } catch (error) {
    console.log(
      `🚨 Something wrong in removeImageBackground, error is ${error}`,
      error,
    )
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to remove ${request.body.resource}`,
    })
  }

  return {
    statusCode: 200,
    body: {
      item: removeResult,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceRemoveImageBackgroundHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Query {
    resource: string
    search: {
      id: string
      mode: RemoveBackgroundImageMode
    }
  }
  export interface Request extends Webtoken.Request<Webtoken.Payload.Account> {
    body: handler.Query
  }
  export interface Response extends Lambdur.Handler.Response {
    body: {
      item: any
    }
  }
}

const switchHandler = async (
  accountObj: Webtoken.Payload.Account,
  query: handler.Query,
): Promise<any[]> => {
  const removeQuery = {
    ...query.search,
  }

  switch (query.resource as EulogiseResource) {
    case EulogiseResource.ASSET:
      return AssetResourceController.removeImageBackground({
        accountObj,
        search: removeQuery,
      })
    default:
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: `Invalid resource "${query.resource}" in in removeImageBackground switchHandler.`,
      })
  }
}
