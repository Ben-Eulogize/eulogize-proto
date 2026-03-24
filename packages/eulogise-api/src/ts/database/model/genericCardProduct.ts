import { BaseMemorialModel } from './BaseMemorialModel'
import { MemorialVisualStatus } from '@eulogise/core'

class GenericCardProductModel extends BaseMemorialModel {
  constructor() {
    super('genericCardProduct', {
      additionalSchema: {
        slug: {
          type: String,
        },
      },
      additionalUpdatableFields: ['slug'],
    })
  }

  public async unlockProductByIdAndSlug({
    productId,
    slug,
  }: {
    productId: string
    slug: string
  }) {
    return this.getModel().update(
      { id: productId, slug },
      {
        status: MemorialVisualStatus.EDITED,
        fileStatus: 'not_started',
      },
      {
        return: 'item',
      },
    )
  }
}

export const genericCardProductModel = new GenericCardProductModel()
