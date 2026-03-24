import { faker } from '@faker-js/faker'
import { UserMockService } from './UserMockService'
import { ICaseModel } from '../../src/ts/database/types/CaseModel.types'
import { caseModel } from '../../src/ts/database'
import { BaseMockService } from './BaseMockService'
import { ClientMockService } from './ClientMockService'

export class CaseMockService extends BaseMockService<
  ICaseModel.Model,
  ICaseModel.Schema
> {
  private userMockService
  private clientMockService

  constructor() {
    super('case', caseModel)
    this.userMockService = new UserMockService()
    this.clientMockService = new ClientMockService()
  }

  public createMockDeceased(): ICaseModel.Deceased {
    return {
      dateOfBirth: faker.date.birthdate().getTime(),
      fullName: faker.person.fullName(),
      dateOfDeath: faker.date.recent().getTime(),
      gender: faker.person.gender(),
    }
  }

  public createMockService(): ICaseModel.Service {
    return {
      serviceStartTime: faker.date.future().toISOString(),
      funeralHome: undefined,
      serviceLocation: undefined,
      timeEnd: 0,
      timeStart: 0,
      type: undefined,
    }
  }

  public getUserMockService() {
    return this.userMockService
  }

  public getClientMockService() {
    return this.clientMockService
  }

  public async createMockItemData(): Promise<ICaseModel.Schema> {
    const client = await this.clientMockService.createMockItem()
    const customer = await this.userMockService.createMockCustomerUser()
    const editor = await this.userMockService.createMockCoEditorUser()
    const funeralDirector = await this.userMockService.createMockClientUser()
    console.log('customer', customer)
    console.log('funeralDirector', funeralDirector)
    const deceased = this.createMockDeceased()
    const service = this.createMockService()
    return {
      client: client.id,
      createdAt: this.createMockDate().getTime(),
      customer: customer.id,
      deceased,
      editors: [editor.id!],
      funeralDirector: funeralDirector.id,
      id: faker.string.uuid(),
      inviteEmail: undefined,
      service,
      status: faker.helpers.arrayElement(['paid', 'unpaid']),
      updatedAt: this.createMockDate().getTime(),
      externalCaseId: faker.string.uuid(),
    }
  }
}
