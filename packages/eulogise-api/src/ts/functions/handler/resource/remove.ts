import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin, mwWebtokenAccount } from '../../middleware'
import {
  AssetResourceController,
  bookletResourceController,
  bookmarkResourceController,
  CaseResourceController,
  ClientResourceController,
  InviteResourceController,
  InvoiceResourceController,
  sidedCardResourceController,
  slideshowResourceController,
  slideshowTitleSlideResourceController,
  thankyouCardResourceController,
  tvWelcomeScreenResourceController,
  UserResourceController,
} from '../../controller'
import { EulogiseResource } from '@eulogise/core'
import { photobookResourceController } from '../../controller/resource/photobook'

export const resourceRemoveHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  let removeResult: any

  try {
    removeResult = await switchHandler(request.webtoken, request.body)
  } catch (error) {
    console.log(
      `🚨 Something wrong in resourceRemoveHandler, error is ${error}`,
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
  Lambdur.chain(mwWebtokenAccount, resourceRemoveHandler),
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
      return AssetResourceController.remove({ accountObj, search: removeQuery })
    case EulogiseResource.BOOKLET:
      return bookletResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.BOOKMARK:
      return bookmarkResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.CASE:
      return CaseResourceController.remove({ accountObj, search: removeQuery })
    case EulogiseResource.CLIENT:
      return ClientResourceController.remove({
        accountObj,
        search: removeQuery,
      })
    case EulogiseResource.INVITE:
      return InviteResourceController.remove({
        accountObj,
        search: removeQuery,
      })
    case EulogiseResource.INVOICE:
      return InvoiceResourceController.remove({
        accountObj,
        search: removeQuery,
      })
    case EulogiseResource.SLIDESHOW:
      return slideshowResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.SLIDESHOW_TITLE_SLIDE:
      return slideshowTitleSlideResourceController.remove(
        accountObj,
        removeQuery,
      )
    case EulogiseResource.SIDED_CARD:
      return sidedCardResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.THANK_YOU_CARD:
      return thankyouCardResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.TV_WELCOME_SCREEN:
      return tvWelcomeScreenResourceController.remove(accountObj, removeQuery)
    case EulogiseResource.PHOTOBOOK:
      return photobookResourceController.remove(accountObj, removeQuery)
    case 'user':
      return UserResourceController.remove({ accountObj, search: removeQuery })
    default:
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: `Invalid resource "${query.resource}" in in remove switchHandler.`,
      })
  }
}
