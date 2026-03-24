import { faker } from '@faker-js/faker'
import { BaseMockService } from './BaseMockService'
import { IInviteModel } from '../../src/ts/database/types/InviteModel.types'
import { inviteModel } from '../../src/ts/database'
import { EulogiseUserRole } from '@eulogise/core'

export class InviteMockService extends BaseMockService<
  IInviteModel.Model,
  IInviteModel.Schema
> {
  constructor() {
    super('invite', inviteModel)
  }

  public async createMockItemData(): Promise<IInviteModel.Schema> {
    return {
      id: faker.string.uuid(),
      client: faker.string.uuid(),
      token: faker.string.uuid(),
      email: faker.internet.email(),
      case: faker.string.uuid(),
      invitorFullName: faker.person.fullName(),
      role: faker.helpers.arrayElement([
        EulogiseUserRole.VISITOR,
        EulogiseUserRole.VISITOR_BOOKLET,
        EulogiseUserRole.VISITOR_SLIDESHOW,
        EulogiseUserRole.VISITOR_SIDED_CARD,
        EulogiseUserRole.VISITOR_BOOKMARK,
        EulogiseUserRole.VISITOR_THANKYOUCARD,
        EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN,
        EulogiseUserRole.VISITOR_PHOTOBOOK,
        EulogiseUserRole.CONTRIBUTOR,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.COEDITOR,
        EulogiseUserRole.CLIENT,
      ]),
      status: faker.helpers.arrayElement([
        'pending',
        'sent',
        'error',
        'accepted',
      ]),
    }
  }
}
