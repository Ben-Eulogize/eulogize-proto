import { faker } from '@faker-js/faker'
import { IMemorialProductModel } from '../../src/ts/database/types/MemorialProductModel.types'
import { MemorialVisualStatus } from '@eulogise/core'
import { BaseMemorialModel } from '../../src/ts/database/model/BaseMemorialModel'
import { BaseMockService } from './BaseMockService'

export class MemorialProductMockService extends BaseMockService<
  IMemorialProductModel.Model,
  IMemorialProductModel.Schema
> {
  public mockMemorialProducts: Array<IMemorialProductModel.Model>

  constructor(model: BaseMemorialModel) {
    super(model.getModelName(), model)
    this.mockMemorialProducts = []
  }

  public createMockItemData(
    caseId?: string,
    data?: Partial<IMemorialProductModel.Schema>,
  ): IMemorialProductModel.Schema {
    return {
      id: faker.string.uuid(),
      case: caseId ? caseId : faker.string.uuid(),
      createdAt: faker.date.recent({ days: 30 }).getTime(),
      content: {},
      status: faker.helpers.arrayElement([
        MemorialVisualStatus.NOT_STARTED,
        MemorialVisualStatus.THEME_SELECTED,
        MemorialVisualStatus.EDITED,
        MemorialVisualStatus.COMPLETE,
        MemorialVisualStatus.DOWNLOAD,
        MemorialVisualStatus.INCOMPLETE,
        undefined,
      ]),
      fileStatus: faker.helpers.arrayElement([
        'processing',
        'generated',
        'failed',
        undefined,
      ]),
      updatedAt: faker.date.recent({ days: 30 }).getTime(),
      ...data,
    }
  }

  public async createMockItem(
    caseId?: string,
    data?: Partial<IMemorialProductModel.Schema>,
  ): Promise<IMemorialProductModel.Model> {
    const mockMemorialProductData = this.createMockItemData(caseId, data)
    const item = await this.model.getModel().create(mockMemorialProductData)
    this.mockItems.push(item)
    return item
  }

  public async createMockItems(
    noOfProducts: number,
    caseId?: string,
  ): Promise<void> {
    for (let i = 0; i < noOfProducts; i++) {
      await this.createMockItem(caseId)
    }
  }
}
