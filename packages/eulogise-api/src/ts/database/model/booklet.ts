import { BaseMemorialModel } from './BaseMemorialModel'

class BookletModel extends BaseMemorialModel {
  constructor() {
    super('booklet')
  }
}

export const bookletModel = new BookletModel()
