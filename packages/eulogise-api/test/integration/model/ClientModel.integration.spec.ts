import expect from 'expect'
import { clientModel, userModel } from '../../../src/ts/database'
import { ClientMockService } from '../../mock/ClientMockService'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'

describe('ClientModel - Integration', () => {
  let results: any
  let cm: any
  const clientMockService = new ClientMockService()
  const noOfClients = 10

  beforeEach(async () => {
    cm = await clientModel.create({
      title: 'Flamingo',
      primaryAddress: ['primary-address-line-1'],
      additionalAddress: [['additional-address-line-1']],
      country: EulogiseCountry.AUSTRALIA,
      createCaseFamilyInviteOptions: ['editor'],
      directors: [],
    })
  })

  describe('findByUserId, findOneByHandle and findOneByUserId', () => {
    let expectedClient: any
    beforeEach(async () => {
      await clientMockService.createMockItems(noOfClients)
    })

    afterEach(async () => {
      await clientMockService.restore()
    })

    beforeEach(async () => {
      const clients = clientMockService.getMockItems()
      expectedClient = clients[0]
      console.log('expected client', expectedClient)
      console.log('user id', expectedClient?.users?.values().next().value)
    })

    describe('findOneByHandle', () => {
      beforeEach(async () => {
        const handle = expectedClient.handle
        console.log('handle', handle)
        results = await clientModel.findOneByHandle(handle)
      })

      it('should return client', () => {
        console.log('results', results)
        expect(results.id).toEqual(expectedClient.id)
      })
    })

    describe('findByUserId', () => {
      beforeEach(async () => {
        results = await clientModel.findByUserId(
          expectedClient?.users?.values().next().value,
        )
      })

      it('should the client of the specified user id', () => {
        console.log('JSON', JSON.stringify(results))
        expect(results[0].id).toEqual(expectedClient.id)
      })
    })

    describe('findOneByUserId', () => {
      beforeEach(async () => {
        results = await clientModel.findOneByUserId(
          expectedClient?.users?.values().next().value,
        )
      })

      it('should the client of the specified user id', () => {
        console.log('JSON', JSON.stringify(results))
        expect(results.id).toEqual(expectedClient.id)
      })
    })
  })

  describe('query', () => {
    const email = 'eric@wildpalms.com.au'
    beforeEach(async () => {
      const user = await userModel.create({
        email,
        fullName: email,
        role: EulogiseUserRole.CUSTOMER,
        verified: true,
      })
      await clientModel.getModel().update(
        { id: cm.id },
        {
          // @ts-ignore
          $SET: {
            users: new Set([user.id]),
          },
        },
      )
    })

    beforeEach(async () => {
      results = await clientModel.query('')
    })

    it('should return correct results', () => {
      const { id, users, createdAt, updatedAt, ...expected } = results[0]
      expect(expected).toEqual({
        primaryAddress: ['some where'],
        additionalAddress: [''],
        directors: [],
        title: 'Flamingo',
      })
      expect(id).toBeDefined()
      expect(users[0]).toBeDefined()
    })
  })
})
