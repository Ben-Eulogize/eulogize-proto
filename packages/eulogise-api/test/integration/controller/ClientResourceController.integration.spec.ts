import expect from 'expect'
import { ClientResourceController } from '../../../src/ts/functions/controller'
import { clientModel, userModel } from '../../../src/ts/database'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'

describe('ClientResourceController - Integration', () => {
  const adminEmail1 = 'eric@wildpalms.com.au'
  const adminFullName1 = 'Eric'
  let admin1: any

  const adminEmail2 = 'stephen@wildpalms.com.au'
  const adminFullName2 = 'Stephen'
  let admin2: any

  const userEmail1 = 'garreth@wildpalms.com.au'
  const userFullName1 = 'Garreth'

  const userEmail2 = 'ben@wildpalms.com.au'
  const userFullName2 = 'Ben'
  let user2: any

  let client1: any
  let client2: any
  let results: any
  const client1Handle = 'client-1-handle'
  const client2Handle = 'client-2-handle'

  beforeEach(async () => {
    results = undefined

    admin1 = await userModel.create({
      email: adminEmail1,
      fullName: adminFullName1,
      role: EulogiseUserRole.CLIENT,
      verified: true,
    })

    admin2 = await userModel.create({
      email: adminEmail2,
      fullName: adminFullName2,
      role: EulogiseUserRole.CLIENT,
      verified: true,
    })

    await userModel.create({
      email: userEmail1,
      fullName: userFullName1,
      role: EulogiseUserRole.CUSTOMER,
      verified: true,
    })

    user2 = await userModel.create({
      email: userEmail2,
      fullName: userFullName2,
      role: EulogiseUserRole.CUSTOMER,
      verified: true,
    })

    client1 = await clientModel.create({
      directors: [],
      handle: client1Handle,
      title: 'New client 1',
      primaryAddress: ['primary-address-line-1'],
      additionalAddress: [['additional-address-line-1']],
      createCaseFamilyInviteOptions: ['editor'],
      country: EulogiseCountry.AUSTRALIA,
      users: [admin1.id],
    })
    client1 = client1.toJSON()

    client2 = await clientModel.create({
      directors: [],
      handle: client2Handle,
      title: 'New client 2',
      primaryAddress: ['primary-address-line-1'],
      additionalAddress: [['additional-address-line-1']],
      createCaseFamilyInviteOptions: ['editor'],
      country: EulogiseCountry.UNITED_STATES,
      users: [admin2.id],
    })
    client2 = client2.toJSON()
  })

  describe('findByHandle', () => {
    beforeEach(async () => {
      results = await ClientResourceController.findByHandle(client1.handle)
    })

    it('should return the correct client', () => {
      expect(results.primaryAddress).toEqual(client1.primaryAddress)
      expect(results.additionalAddress).toEqual(client1.additionalAddress)
      expect(results.handle).toEqual(client1.handle)
      expect(results.createCaseFamilyInviteOptions).toEqual(
        client1.createCaseFamilyInviteOptions,
      )
      expect(results.directors).toEqual(client1.directors)
      expect(results.id).toEqual(client1.id)
      expect(results.title).toEqual(client1.title)
      expect(results.users).toBeDefined()
    })
  })

  describe('findById', () => {
    beforeEach(async () => {
      results = await ClientResourceController.findById(client1.id)
    })

    it('should return the correct client', () => {
      expect(results.primaryAddress).toEqual(client1.primaryAddress)
      expect(results.additionalAddress).toEqual(client1.additionalAddress)
      expect(results.createCaseFamilyInviteOptions).toEqual(
        client1.createCaseFamilyInviteOptions,
      )
      expect(results.directors).toEqual(client1.directors)
      expect(results.id).toEqual(client1.id)
      expect(results.title).toEqual(client1.title)
      expect(results.users).toBeDefined()
    })
  })

  describe('findUsersById', () => {
    beforeEach(async () => {
      results = await ClientResourceController.findUsersById(client1.id)
    })

    it('should return the correct users', () => {
      expect(results.length).toBeGreaterThanOrEqual(1)
      expect(results[0].email).toEqual(admin1.email)
      expect(results[0].fullName).toEqual(admin1.fullName)
    })
  })

  describe('removeUsersById', () => {
    beforeEach(async () => {
      results = await ClientResourceController.findById(client1.id)
      expect(results.users.size).toEqual(1)
      await ClientResourceController.removeUsersById(client1.id, admin1.id)
      results = await ClientResourceController.findById(client1.id)
    })

    it('should remove the user from the client', () => {
      expect(Array.from(results.users)).toEqual([''])
    })
  })

  describe('findByAdminId', () => {
    describe('User exist', () => {
      beforeEach(async () => {
        results = await ClientResourceController.findByAdminId(admin1.id)
      })

      it('should return correct client', () => {
        expect(results.id).toEqual(client1.id)
        expect(results.title).toEqual(client1.title)
      })
    })

    describe('User not exist in the client list', () => {
      beforeEach(async () => {
        results = await ClientResourceController.findByAdminId(user2.id)
      })

      it('should not return any clients', () => {
        expect(results).toBeUndefined()
      })
    })
  })
})
