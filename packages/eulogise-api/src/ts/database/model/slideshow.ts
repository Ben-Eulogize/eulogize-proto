import { BaseMemorialModel } from './BaseMemorialModel'

class SlideshowModel extends BaseMemorialModel {
  constructor() {
    super('slideshow')
  }
}

export const slideshowModel = new SlideshowModel()
