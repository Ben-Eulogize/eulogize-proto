import { tvWelcomeScreenModel } from '../../../database'
import { BaseProductResourceController } from './BaseProductResourceController'
import { EulogiseProduct } from '@eulogise/core'

class TvWelcomeScreenResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'tvWelcomeScreen',
      product: EulogiseProduct.TV_WELCOME_SCREEN,
      model: tvWelcomeScreenModel,
    })
  }
}

export const tvWelcomeScreenResourceController =
  new TvWelcomeScreenResourceController()
