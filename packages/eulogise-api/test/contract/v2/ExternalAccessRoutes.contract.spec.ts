import expect from 'expect'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import * as Errors from '../../../src/ts/functions/error'

describe('ExternalAccessRoutes - Contract', () => {
  let error: any
  /*
  let clientModel: any

  const adminEmail = 'admin@wildpalms.com.au'
  const adminFullName = 'Admin User'
  let admin1: any

  let apiKey: string
*/

  describe('GET /v2/external/sync', () => {
    const endpoint = '/v2/external/sync'
    const method = 'GET'

    describe('without externalCaseId', () => {
      beforeEach(async () => {
        try {
          await TestRequestHelper.request(endpoint, {
            method,
            query: {
              clientId: 'client-1',
            },
          })
        } catch (ex) {
          error = ex
        }
      })

      it('should return externalCaseId is required error', () => {
        expect(error.response.status).toEqual(400)
        expect(error.response.data.error.message).toEqual(
          Errors.externalAPIErrors.get.externalCaseIdMissing().message,
        )
      })
    })

    describe('without clientId', () => {
      beforeEach(async () => {
        try {
          await TestRequestHelper.request(endpoint, {
            method,
            query: {
              externalCaseId: '123',
            },
          })
        } catch (ex) {
          error = ex
        }
      })

      it('should return clientId is required error', () => {
        expect(error.response.status).toEqual(400)
        expect(error.response.data.error.message).toEqual(
          Errors.externalAPIErrors.get.clientIdMissing().message,
        )
      })
    })

    describe('Invalid clientId', () => {
      beforeEach(async () => {
        try {
          await TestRequestHelper.request(endpoint, {
            method,
            query: {
              externalCaseId: '123',
              clientId: 'invalid-client-id',
            },
          })
        } catch (ex) {
          error = ex
        }
      })

      it('should return client not found error', () => {
        expect(error.response.status).toEqual(400)
        expect(error.response.data.error.message).toEqual(
          Errors.externalAPIErrors.get.syncError().message,
        )
      })
    })
  })

  describe('POST /v2/external/createCase', () => {
    const endpoint = '/v2/external/createCase'
    const method = 'POST'
    /*
    beforeEach(async () => {
      admin1 = await userModel.create({
        email: adminEmail,
        fullName: adminFullName,
        role: EulogiseUserRole.CLIENT,
        verified: true,
        password: await userModel.hashPassword('123123'),
      })
      apiKey = admin1.id

      clientModel = await clientModel.create({
        title: 'Flamingo',
        primaryAddress: ['some where'],
        additionalAddress: [''],
        apiKey,
        directors: [],
        users: [admin1.id],
      })
    })
*/

    describe('without api key', () => {
      beforeEach(async () => {
        try {
          await TestRequestHelper.request(endpoint, {
            method,
          })
        } catch (ex) {
          error = ex
        }
      })

      it('should return api not found error', () => {
        expect(error.response.status).toEqual(400)
        expect(error.response.data.error.message).toEqual(
          Errors.externalAPIErrors.create.apiKeyMissing().message,
        )
      })
    })
  })
})
