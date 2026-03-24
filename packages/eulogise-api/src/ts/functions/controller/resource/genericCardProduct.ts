import { BaseProductResourceController } from './BaseProductResourceController'
import { genericCardProductModel } from '../../../database'
import { EulogiseProduct } from '@eulogise/core'

class GenericCardProductResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'genericCardProduct',
      product: EulogiseProduct.GENERIC_CARD_PRODUCT,
      model: genericCardProductModel,
    })
  }
}

export const genericCardProductResourceController =
  new GenericCardProductResourceController()
