import { BaseMemorialModel } from './BaseMemorialModel'

class SidedCardModel extends BaseMemorialModel {
  constructor() {
    super('sidedCard')
  }
}

export const sidedCardModel = new SidedCardModel()
