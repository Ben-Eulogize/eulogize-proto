import { sidedCardModel } from '../../../database'
import { BaseProductResourceController } from './BaseProductResourceController'
import { EulogiseProduct } from '@eulogise/core'

class SidedCardResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'sidedCard',
      product: EulogiseProduct.SIDED_CARD,
      model: sidedCardModel,
    })
  }
}

export const sidedCardResourceController = new SidedCardResourceController()
