import { BaseMemorialModel } from './BaseMemorialModel'

class ThankyouCardModel extends BaseMemorialModel {
  constructor() {
    super('thankyouCard')
  }
}

export const thankyouCardModel = new ThankyouCardModel()
