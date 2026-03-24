import { bookmarkModel } from '../../../database'
import { BaseProductResourceController } from './BaseProductResourceController'
import { EulogiseProduct } from '@eulogise/core'

class BookmarkResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'bookmark',
      product: EulogiseProduct.BOOKMARK,
      model: bookmarkModel,
    })
  }
}

export const bookmarkResourceController = new BookmarkResourceController()
