import { faker } from '@faker-js/faker'
import * as uuid from 'uuid'
import { IUserModel } from '../../src/ts/database/types/UserModel.types'
import { userModel } from '../../src/ts/database'
import { BaseMockService } from './BaseMockService'
import { EulogiseUserRole } from '@eulogise/core'

export class UserMockService extends BaseMockService<
  IUserModel.Model,
  IUserModel.Schema
> {
  constructor() {
    super('user', userModel)
  }

  public createMockItemData(
    role = EulogiseUserRole.CUSTOMER,
  ): IUserModel.Schema {
    return {
      acceptMarketing: false,
      acceptTerms: false,
      city: faker.location.city(),
      createdAt: this.createMockDate().getTime(),
      email: faker.internet.email(),
      firstStreetAddress: faker.location.streetAddress(),
      fullName: faker.person.fullName(),
      id: uuid.v4(),
      password: 'mock-password',
      phone: faker.phone.number(),
      postcode: faker.location.zipCode(),
      role,
      showOnBoardingHelperEveryTime: false,
      state: faker.location.state(),
      token: faker.string.uuid(),
      updatedAt: 0,
      verified: false,
    }
  }

  public async createMockItem(
    role?: EulogiseUserRole,
  ): Promise<IUserModel.Model> {
    const mockUserData = this.createMockItemData(role)
    const mockUser = await this.model.getModel().create(mockUserData)
    console.log(
      `creating mock item ${this.mockModelName} (Role: ${role})`,
      mockUserData,
    )
    this.mockItems.push(mockUser)
    return mockUser
  }

  public createMockCustomerUserData(): IUserModel.Schema {
    return this.createMockItemData(EulogiseUserRole.CUSTOMER)
  }

  public async createMockCustomerUser(): Promise<IUserModel.Model> {
    return await this.createMockItem(EulogiseUserRole.CUSTOMER)
  }

  public createMockClientUserData(): IUserModel.Schema {
    return this.createMockItemData(EulogiseUserRole.CLIENT)
  }

  public async createMockClientUser(): Promise<IUserModel.Model> {
    return await this.createMockItem(EulogiseUserRole.CLIENT)
  }

  public createMockCoEditorUserData(): IUserModel.Schema {
    return this.createMockItemData(EulogiseUserRole.COEDITOR)
  }

  public async createMockCoEditorUser(): Promise<IUserModel.Model> {
    return await this.createMockItem(EulogiseUserRole.COEDITOR)
  }

  public createMockEditorUserData(): IUserModel.Schema {
    return this.createMockItemData(EulogiseUserRole.EDITOR)
  }

  public async createMockEditorUser(): Promise<IUserModel.Model> {
    return await this.createMockItem(EulogiseUserRole.EDITOR)
  }

  public createMockAdminUserData(): IUserModel.Schema {
    return this.createMockItemData(EulogiseUserRole.ADMIN)
  }

  public async createMockAdminUser(): Promise<IUserModel.Model> {
    return await this.createMockItem(EulogiseUserRole.ADMIN)
  }

  public async createMockItems(noOfUsers: number): Promise<void> {
    for (let i = 0; i < noOfUsers; i++) {
      this.mockItems.push(
        await this.createMockItem(
          faker.helpers.arrayElement([
            EulogiseUserRole.COEDITOR,
            EulogiseUserRole.EDITOR,
            EulogiseUserRole.ADMIN,
            EulogiseUserRole.CUSTOMER,
            EulogiseUserRole.CLIENT,
          ]),
        ),
      )
    }
  }
}
