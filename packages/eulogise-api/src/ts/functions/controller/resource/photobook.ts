import { BaseProductResourceController } from './BaseProductResourceController'
import { photobookModel } from '../../../database/model/photobook'
import { EulogiseProduct } from '@eulogise/core'

class PhotobookResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'photobook',
      product: EulogiseProduct.PHOTOBOOK,
      model: photobookModel,
    })
  }
}

export const photobookResourceController = new PhotobookResourceController()
