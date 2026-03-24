import { BaseMemorialModel } from './BaseMemorialModel'

class BookmarkModel extends BaseMemorialModel {
  constructor() {
    super('bookmark')
  }
}

export const bookmarkModel = new BookmarkModel()
