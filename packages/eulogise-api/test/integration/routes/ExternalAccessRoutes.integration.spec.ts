import expect from 'expect'
import { faker } from '@faker-js/faker'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import { getExternalV2APIKeys } from '../../../src/ts/config/ExternalAPIConfig'
import { ClientMockService } from '../../mock/ClientMockService'
import { IClientModel } from '../../../src/ts/database/types/ClientModel.types'
import { caseModel } from '../../../src/ts/database'

describe('ExternalAccessRoutes', () => {
  let results: any

  describe(`POST /external/createCase`, () => {
    const mockEmail = faker.internet.email()
    const deceasedName = `Deceased Name`
    const familyFirstAndLastName = `Family Name`
    const dateOfBirth = `2025-04-23`
    const dateOfDeath = `2025-04-24`
    const serviceDate = `2025-04-25`
    const apiKey = getExternalV2APIKeys({ stage: 'test' })[0]
    let client: IClientModel.Model

    describe('with valid data', () => {
      beforeEach(async () => {
        const clientMockService = new ClientMockService()
        client = await clientMockService.createMockItem()
        let arrangerId = Array.from(client.users ?? [])
        console.log('client users', arrangerId[0])
        results = (
          await TestRequestHelper.request('/v2/external/createCase', {
            method: 'POST',
            headers: {
              'api-key': apiKey,
            },
            data: {
              clientId: client.id /* 'mock-client-id' */,
              email: mockEmail,
              deceasedName,
              familyFirstAndLastName,
              dateOfBirth,
              dateOfDeath,
              role: 'customer',
              serviceDate,
              /*
              serviceAddress,
              serviceStartTime,
*/
              arrangerId,
              //              inviteFamilyAs,
              // enabledProducts: ['product1', 'product2'],
            },
          })
        ).response
      })

      it('should return case created successfully', () => {
        expect(results.status).toEqual(200)
        expect(results.data).toEqual({
          accessUrl: expect.any(String),
          caseStatus: 'case_created',
          caseId: expect.any(String),
          message: 'Case created successfully.',
          ref: expect.any(String),
        })
      })

      describe('Date Values', () => {
        beforeEach(async () => {
          const data = results.data
          results = await caseModel.findById(data.caseId)
        })

        it('should return valid date values and display value', () => {
          expect(results.deceased).toEqual({
            dateOfBirth: 1745337600000,
            dateOfBirthDisplay: dateOfBirth,
            dateOfDeath: 1745424000000,
            dateOfDeathDisplay: dateOfDeath,
            fullName: 'Deceased Name',
          })
          expect(results.service).toEqual({
            timeStart: 1745510400000,
            timeStartDisplay: serviceDate,
          })
        })
      })
    })

    describe('with invalid data', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request('/v2/external/createCase', {
            method: 'POST',
            headers: {
              'api-key': apiKey,
            },
            data: {
              email: '',
              deceasedName: '',
              familyFirstAndLastName: '',
              role: '',
              clientId: '',
            },
          })
        ).response
      })

      it('should return validation error', () => {
        expect(results.status).toEqual(400)
        expect(results.data.error.message).toEqual(
          'Validation failed. Please check your input and try again.',
        )
      })
    })
  })
})
