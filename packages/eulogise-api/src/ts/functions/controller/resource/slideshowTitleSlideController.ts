import { slideshowTitleSlideModel } from '../../../database'
import { BaseProductResourceController } from './BaseProductResourceController'
import { EulogiseProduct } from '@eulogise/core'

class SlideshowTitleSlideResourceController extends BaseProductResourceController {
  constructor() {
    super({
      modelName: 'slideshowTitleSlide',
      product: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      model: slideshowTitleSlideModel,
    })
  }
}

export const slideshowTitleSlideResourceController =
  new SlideshowTitleSlideResourceController()
