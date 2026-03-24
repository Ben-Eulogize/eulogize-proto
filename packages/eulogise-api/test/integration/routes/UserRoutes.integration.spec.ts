import { UserMockService } from '../../mock/UserMockService'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import expect from 'expect'
import { EulogiseUserRole } from '@eulogise/core'
import { userModel } from '../../../src/ts/database'

describe('UserRoutes', () => {
  const userMockService = new UserMockService()
  const noOfUsers = 5
  let expectedUser: any

  beforeEach(async () => {
    await userMockService.createMockItems(noOfUsers)
  })

  afterEach(async () => {
    await userMockService.restore()
  })

  beforeEach(async () => {
    const users = userMockService.getMockItems()
    expectedUser = users[0]
    console.log('expected user', expectedUser)
  })

  describe('PUT /users/:userId/roles', () => {
    const userType = EulogiseUserRole.CLIENT
    describe('update user role', () => {
      const newRole = EulogiseUserRole.ADMIN
      beforeEach(async () => {
        const userId = expectedUser.id
        const payload = {
          role: newRole,
        }
        const results = (
          await TestRequestHelper.request(`/v2/users/${userId}/roles`, {
            userType,
            method: 'PUT',
            data: payload,
          })
        ).response
        expect(results.data.ok).toEqual(true)
      })

      it('should update user role', async () => {
        const userId = expectedUser.id
        const user = await userModel.findById(userId)
        console.log('JSON', JSON.stringify(user))
        // fullName should remain unchanged
        expect(user.fullName).toEqual(expectedUser.fullName)
        expect(user.role).toEqual(newRole)
      })
    })
  })
})
