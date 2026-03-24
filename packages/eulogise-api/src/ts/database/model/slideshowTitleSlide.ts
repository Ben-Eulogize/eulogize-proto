import { BaseMemorialModel } from './BaseMemorialModel'

class SlideshowTitleSlide extends BaseMemorialModel {
  constructor() {
    super('slideshowTitleSlide')
  }
}

export const slideshowTitleSlideModel = new SlideshowTitleSlide()
