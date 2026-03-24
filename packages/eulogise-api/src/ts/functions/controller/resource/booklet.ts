import { bookletModel } from '../../../database'
import { BaseProductResourceController } from './BaseProductResourceController'
import { EulogiseProduct } from '@eulogise/core'

class BookletResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'booklet',
      product: EulogiseProduct.BOOKLET,
      model: bookletModel,
    })
  }
}

export const bookletResourceController = new BookletResourceController()
