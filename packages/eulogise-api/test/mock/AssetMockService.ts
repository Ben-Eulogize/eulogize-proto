import { faker } from '@faker-js/faker'
import { BaseMockService } from './BaseMockService'
import { IAssetModel } from '../../src/ts/database/types/AssetModel.types'
import { assetModel } from '../../src/ts/database'

export class AssetMockService extends BaseMockService<
  IAssetModel.Model,
  IAssetModel.Schema
> {
  constructor() {
    super('asset', assetModel)
  }

  public async createMockItemData(
    data?: Partial<IAssetModel.Schema>,
  ): Promise<IAssetModel.Schema> {
    return {
      id: faker.string.uuid(),
      type: 'image',
      case: faker.string.uuid(),
      content: {},
      owner: faker.string.uuid(),
      ...data,
    }
  }

  public async createMockItem(
    data?: Partial<IAssetModel.Schema>,
  ): Promise<IAssetModel.Model> {
    const mockAssetData = await this.createMockItemData(data)
    console.log('mock asset data', mockAssetData)
    const item = await this.model.getModel().create(mockAssetData)
    this.mockItems.push(item)
    return item
  }
}
