import { faker } from '@faker-js/faker'
import { IClientModel } from '../../src/ts/database/types/ClientModel.types'
import { clientModel } from '../../src/ts/database'
import { BaseMockService } from './BaseMockService'
import { UserMockService } from './UserMockService'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'

export class ClientMockService extends BaseMockService<
  IClientModel.Model,
  IClientModel.Schema
> {
  constructor() {
    super('client', clientModel)
  }

  public async createMockItemData(): Promise<IClientModel.Schema> {
    const mockUserService = new UserMockService()
    const clientUser = await mockUserService.createMockItem(
      EulogiseUserRole.CLIENT,
    )
    return {
      id: faker.string.uuid(),
      handle: faker.word.words().replace(/\s/g, '-').toLowerCase(),
      title: faker.company.name(),
      primaryAddress: [
        'primary-address-line-1',
        'primary-address-line-2',
        'primary-address-line-3',
      ],
      additionalAddress: [
        [
          'additional-address-line-1',
          'primary-address-line-2',
          'primary-address-line-3',
        ],
      ],
      createCaseFamilyInviteOptions: ['editor'],
      country: EulogiseCountry.AUSTRALIA,
      logo: 'BejkgemCTey9uaNEnbjr_temp.png',
      users: [clientUser.id!],
    }
  }
}
