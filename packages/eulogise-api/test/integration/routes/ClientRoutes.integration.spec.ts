import { ClientMockService } from '../../mock/ClientMockService'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import expect from 'expect'
import { EulogiseUserRole } from '@eulogise/core'

describe('ClientRoutes', () => {
  const clientMockService = new ClientMockService()
  const noOfClients = 10
  let expectedClient: any
  let results: any

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

  describe('GET /clients/users', () => {
    beforeEach(async () => {
      results = (
        await TestRequestHelper.request('/v2/clients/users', {
          userType: EulogiseUserRole.CLIENT,
          method: 'GET',
        })
      ).response
    })

    it('should return clients', () => {
      expect(results.data.users).toBeDefined()
    })
  })

  describe('GET /clients/handles/:handle', () => {
    beforeEach(async () => {
      const handle = expectedClient.handle
      results = (
        await TestRequestHelper.request(`/v2/clients/handles/${handle}`, {
          method: 'GET',
        })
      ).response
    })

    it('should return client', () => {
      const { id, handle, country, logo, title } = expectedClient
      expect(results.data.client).toEqual({
        id,
        handle,
        country,
        logo,
        title,
      })
    })
  })

  describe('GET /admin/clients/handles/:handle/exists', () => {
    describe('exists', () => {
      beforeEach(async () => {
        const handle = expectedClient.handle
        results = (
          await TestRequestHelper.request(
            `/v2/admin/clients/handles/${handle}/exists`,
            {
              method: 'GET',
            },
          )
        ).response
      })

      it('should return { exists: true }', () => {
        expect(results.data.exists).toEqual(true)
      })
    })

    describe('not exists', () => {
      beforeEach(async () => {
        const handle = 'non-exist-handle'
        results = (
          await TestRequestHelper.request(
            `/v2/admin/clients/handles/${handle}/exists`,
            {
              method: 'GET',
            },
          )
        ).response
      })

      it('should return { exists: false }', () => {
        expect(results.data.exists).toEqual(false)
      })
    })
  })
})
