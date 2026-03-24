import { faker } from '@faker-js/faker'
import { IEulogiseUser } from '@eulogise/core'

export class CypressTestUtils {
  public static getUniqueFullName: () => string = () => faker.person.fullName()

  public static createRandomUser: IEulogiseUser = () => ({
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    deceasedName: faker.person.fullName(),
    password: faker.word.words(8),
  })
}
