import { Item } from 'dynamoose/dist/Item'
import moment from 'moment'
import { faker } from '@faker-js/faker'

export abstract class BaseMockService<I extends Item, S> {
  protected readonly mockItems: Array<I>
  protected readonly mockModelName: string
  protected model: any

  protected constructor(modelName: string, model: any) {
    this.model = model
    this.mockItems = []
    this.mockModelName = modelName
  }

  public getMockItems(): Array<I> {
    return this.mockItems
  }

  public createMockDate() {
    const startDate = moment().subtract(1, 'months').toDate()
    const endDate = moment().toDate()
    return faker.date.between({ from: startDate, to: endDate })
  }

  public abstract createMockItemData(): Promise<S> | S

  public async createMockItem(): Promise<I> {
    const mockItemData = await this.createMockItemData()
    const item = await this.model.getModel().create(mockItemData)
    console.log(`created mock ${this.mockModelName} data`, item)
    this.mockItems.push(item)
    return item
  }

  public async createMockItems(noOfItems: number): Promise<void> {
    for (let i = 0; i < noOfItems; i++) {
      await this.createMockItem()
    }
  }

  public async restore() {
    // @ts-ignore
    for (const { id: mockItemId } of this.mockItems) {
      console.log(`remove ${this.mockModelName}`, mockItemId)
      await this.model.getModel().delete(mockItemId)
    }
  }
}
