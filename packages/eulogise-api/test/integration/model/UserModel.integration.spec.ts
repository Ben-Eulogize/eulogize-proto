import expect from 'expect'
import { UserMockService } from '../../mock/UserMockService'
import { userModel } from '../../../src/ts/database'

describe('UserModel - Integration', () => {
  let results: any

  const mockUserService = new UserMockService()

  beforeEach(async () => {
    await mockUserService.createMockItems(10)
  })

  describe('queryByUserIdsGroupById', () => {
    beforeEach(async () => {
      const users = mockUserService.getMockItems()
      const [firstUser, secondUser, thirdUser] = users
      const userIds = [firstUser.id!, secondUser.id!, thirdUser.id!]
      console.log('userIds', userIds)
      results = await userModel.queryByUserIdsGroupById(userIds, [
        'id',
        'fullName',
      ])
    })

    it('should return a user', () => {
      console.log('results', results)
      expect(Object.keys(results).length).toBeGreaterThanOrEqual(2)
      for (const key in results) {
        expect(results[key].id).toBeDefined()
        expect(results[key].fullName).toBeDefined()
      }
    })
  })

  describe('findByToken', () => {
    beforeEach(async () => {
      const [user] = mockUserService.getMockItems()
      results = await userModel.findByToken(user.token)
    })

    it('should return a user', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOneByToken', () => {
    let expectedEmail: string
    beforeEach(async () => {
      const [user] = mockUserService.getMockItems()
      expectedEmail = user.email
      results = await userModel.findOneByToken(user.token)
    })

    it('should return a user', () => {
      expect(results.email).toEqual(expectedEmail)
    })
  })

  describe('findByEmail', () => {
    beforeEach(async () => {
      const [user] = mockUserService.getMockItems()
      results = await userModel.findByEmail(user.email)
    })

    it('should return a user', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findOneByEmail', () => {
    let expectedEmail: string
    beforeEach(async () => {
      const [user] = mockUserService.getMockItems()
      expectedEmail = user.email
      results = await userModel.findOneByEmail(user.email)
    })

    it('should return a user', () => {
      expect(results.email).toEqual(expectedEmail)
    })
  })

  describe('isExists', () => {
    describe('exists', () => {
      beforeEach(async () => {
        const [user] = mockUserService.getMockItems()
        results = await userModel.isExists({ email: user.email })
      })

      it('should return true', () => {
        expect(results).toEqual(true)
      })
    })

    describe('not exists', () => {
      beforeEach(async () => {
        results = await userModel.isExists({ email: 'nonexist@gmail.com' })
      })

      it('should return false', () => {
        expect(results).toEqual(false)
      })
    })
  })

  describe('getAllIndexesById()', () => {
    const noOfUsers = 10
    const userMockService = new UserMockService()

    beforeEach(async () => {
      await userMockService.createMockItems(noOfUsers)
    })

    afterEach(async () => {
      await userMockService.restore()
    })

    beforeEach(async () => {
      results = await userModel.getAllIndexesById(['id', 'fullName'])
    })

    it('should return all users', () => {
      console.log('JSON', JSON.stringify(results))
      expect(Object.keys(results).length).toBeGreaterThanOrEqual(noOfUsers)
    })
  })

  describe('update', () => {
    it('when supplying an undefined password, should password should not be updated', async () => {
      const [user] = mockUserService.getMockItems()
      results = await userModel.update({
        ...user,
        password: undefined,
      })
      expect(results.password).toEqual(user.password)
    })
  })
})
