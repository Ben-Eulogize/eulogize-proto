import { BaseMemorialModel } from './BaseMemorialModel'

class PhotobookModel extends BaseMemorialModel {
  constructor() {
    super('photobook')
  }
}

export const photobookModel = new PhotobookModel()
