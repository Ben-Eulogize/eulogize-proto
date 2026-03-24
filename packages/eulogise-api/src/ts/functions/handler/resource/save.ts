import { Lambdur } from 'lambdur'
import { Webtoken } from '../../../webtoken'
import { accessControlAllowOrigin, mwWebtokenAccount } from '../../middleware'
import {
  AssetResourceController,
  bookletResourceController,
  bookmarkResourceController,
  CaseResourceController,
  ClientResourceController,
  genericCardProductResourceController,
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
import { BLOCKED_INVITES_EMAILS } from '../account/sign/blacklistEmails'
import { photobookResourceController } from '../../controller/resource/photobook'

export const resourceSaveHandler: Lambdur.Handler<
  handler.Request,
  handler.Response
> = async (request, context) => {
  if (
    (request as unknown as { source: string }).source ===
    'serverless-plugin-warmup'
  ) {
    console.log('WarmUp - Lambda is warm!')
    return
  }

  let saveResult: any

  try {
    saveResult = await switchHandler(request.webtoken, request.body)
  } catch (error) {
    console.log(
      `🚨 Something wrong in resourceSaveHandler, error is ${error}`,
      error,
    )
    if (error.lambdurError) {
      throw error
    }
    throw new Lambdur.Error({
      id: '',
      statusCode: 500,
      message: `Unable to save ${request.body.resource}`,
    })
  }

  return {
    statusCode: 200,
    body: {
      item: saveResult,
    },
  }
}

export const handler = Lambdur.chain(
  Lambdur.chain(mwWebtokenAccount, resourceSaveHandler),
  accessControlAllowOrigin,
)

export namespace handler {
  export interface Query {
    resource: string
    item: any
    options: any
    update: boolean
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
): Promise<any> => {
  const saveQuery = {
    ...query.item,
  }

  const options = {
    ...query.options,
  }

  console.log('save')
  console.log('query', query)
  console.log('accountObj', accountObj)
  console.log('saveQuery', saveQuery)
  switch (query.resource as EulogiseResource) {
    case EulogiseResource.ASSET:
      return AssetResourceController.save({ accountObj, assetObj: saveQuery })
    case EulogiseResource.BOOKLET:
      return bookletResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.BOOKMARK:
      return bookmarkResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.TV_WELCOME_SCREEN:
      return tvWelcomeScreenResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.CASE:
      return CaseResourceController.save({
        accountObj,
        caseObj: saveQuery,
        options,
      })
    case EulogiseResource.CLIENT:
      return ClientResourceController.save({ accountObj, clientObj: saveQuery })
    case EulogiseResource.INVITE:
      if (BLOCKED_INVITES_EMAILS.includes(saveQuery.email)) {
        throw new Error('This email cannot be invited')
      }
      return InviteResourceController.save({
        accountObj,
        inviteObj: saveQuery,
        options,
      })
    case EulogiseResource.INVOICE:
      return InvoiceResourceController.save({
        accountObj,
        invoiceObj: saveQuery,
      })
    case EulogiseResource.SLIDESHOW:
      return slideshowResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.SLIDESHOW_TITLE_SLIDE:
      return slideshowTitleSlideResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.SIDED_CARD:
      return sidedCardResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.THANK_YOU_CARD:
      return thankyouCardResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.GENERIC_CARD_PRODUCT:
      return genericCardProductResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.PHOTOBOOK:
      console.log('save photobook')
      return photobookResourceController.save({
        accountObj,
        memorialProductObj: saveQuery,
        update: query.update,
      })
    case EulogiseResource.USER:
      return UserResourceController.save({ accountObj, userObj: saveQuery })
    default:
      throw new Lambdur.Error({
        id: '',
        statusCode: 400,
        message: `Invalid resource "${query.resource}" in save switchHandler.`,
      })
  }
}
