import { BaseProductResourceController } from './BaseProductResourceController'
import { thankyouCardModel } from '../../../database'
import { EulogiseProduct } from '@eulogise/core'

class ThankyouCardResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'thankyouCard',
      product: EulogiseProduct.THANK_YOU_CARD,
      model: thankyouCardModel,
    })
  }
}

export const thankyouCardResourceController =
  new ThankyouCardResourceController()
