import { Webtoken } from '../../webtoken'
import { EulogiseResource } from '@eulogise/core'
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
  TransactionResourceController,
  tvWelcomeScreenResourceController,
  UserResourceController,
} from './resource'
import { Lambdur } from 'lambdur'
import { FindHandler } from './resource/handler/FindHandler.types'
import { photobookResourceController } from './resource/photobook'

export class ResourceController {
  public static switchHandler = async (
    accountObj: Webtoken.Payload.Account,
    query: FindHandler.Query,
  ): Promise<any[]> => {
    const findQuery = {
      ...query.search,
    }

    console.log('ResourceController.switchHandler query.resource', {
      findQuery,
      resource: query.resource,
    })
    switch (query.resource as EulogiseResource) {
      case EulogiseResource.ASSET:
        return AssetResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.BOOKLET:
        return bookletResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.BOOKMARK:
        return bookmarkResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.CASE:
        return CaseResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.CLIENT:
        return ClientResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.INVITE:
        return InviteResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.INVOICE:
        return InvoiceResourceController.find({ accountObj, search: findQuery })
      case EulogiseResource.SLIDESHOW:
        return slideshowResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.SLIDESHOW_TITLE_SLIDE:
        return slideshowTitleSlideResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.SIDED_CARD:
        return sidedCardResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.THANK_YOU_CARD:
        return thankyouCardResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.TV_WELCOME_SCREEN:
        return tvWelcomeScreenResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.PHOTOBOOK:
        return photobookResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.GENERIC_CARD_PRODUCT:
        return genericCardProductResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.TRANSACTION:
        return TransactionResourceController.find({
          accountObj,
          search: findQuery,
        })
      case EulogiseResource.USER:
        return UserResourceController.find({ accountObj, search: findQuery })
      default:
        throw new Lambdur.Error({
          id: '',
          statusCode: 400,
          message: `Invalid resource "${query.resource}" in find switchHandler.`,
        })
    }
  }
}
