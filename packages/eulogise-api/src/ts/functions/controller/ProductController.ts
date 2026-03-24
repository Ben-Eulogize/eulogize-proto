import { EulogiseProduct } from '@eulogise/core'
import {
  bookletModel,
  bookmarkModel,
  sidedCardModel,
  slideshowModel,
  slideshowTitleSlideModel,
  thankyouCardModel,
  tvWelcomeScreenModel,
} from '../../database'
import { photobookModel } from '../../database/model/photobook'
import { BaseMemorialModel } from '../../database/model/BaseMemorialModel'

export class ProductController {
  public static getModelByProduct(product: EulogiseProduct): BaseMemorialModel {
    switch (product) {
      case EulogiseProduct.BOOKMARK:
        return bookmarkModel
      case EulogiseProduct.PHOTOBOOK:
        return photobookModel
      case EulogiseProduct.BOOKLET:
        return bookletModel
      case EulogiseProduct.SLIDESHOW:
        return slideshowModel
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
        return slideshowTitleSlideModel
      case EulogiseProduct.SIDED_CARD:
        return sidedCardModel
      case EulogiseProduct.THANK_YOU_CARD:
        return thankyouCardModel
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return tvWelcomeScreenModel
    }
    throw new Error(`getModelByProduct not found ${product}`)
  }
}
