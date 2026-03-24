import expect from 'expect'
import {
  CaseResourceController,
  UserResourceController,
} from '../../../src/ts/functions/controller'
import { clientModel, userModel } from '../../../src/ts/database'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'
import { IntegrationAPIHelper } from '../../../src/ts/utils/IntegrationAPIHelper'

describe('UserResourceController - Integration', () => {
  let client1: any
  let results: any
  let error: any

  const adminEmail1 = 'eric@wildpalms.com.au'
  const adminFullName1 = 'Eric'
  let admin1: any

  const userEmail1 = 'garreth@wildpalms.com.au'
  const newUserFullName1 = 'Garreth'
  const deceasedName1 = 'newCaseDeceasedName1'
  const serviceAddress1 = 'randomStreet1'
  const serviceStartTime1 = '3:12 am'
  let userId: string | undefined

  const mockAPIKey = 'mock-api-key'

  beforeEach(async () => {
    admin1 = await userModel.create({
      email: adminEmail1,
      fullName: adminFullName1,
      role: EulogiseUserRole.CLIENT,
      verified: true,
    })

    client1 = await clientModel.create({
      directors: [],
      title: 'New client 1',
      primaryAddress: ['primary-address-line-1'],
      additionalAddress: [['additional-address-line-1']],
      country: EulogiseCountry.AUSTRALIA,
      createCaseFamilyInviteOptions: ['editor'],
      users: [admin1.id],
    })
    client1 = client1.toJSON()
  })

  // TODO: Might need to add more test cases
  describe('createUserAndCaseByClientArrangerId()', () => {
    describe('Admin Id belongs to the client', () => {
      beforeEach(async () => {
        const returnValue =
          await UserResourceController.createUserAndCaseByClientArrangerId(
            mockAPIKey,
            client1,
            admin1.id,
            {
              email: userEmail1,
              deceasedName: deceasedName1,
              familyFirstAndLastName: newUserFullName1,
              dateOfBirth: '1933-11-02',
              dateOfDeath: '2024-08-22',
              serviceDate: '2024-08-24',
              serviceAddress: serviceAddress1,
              serviceStartTime: serviceStartTime1,
              inviteFamilyAs: EulogiseUserRole.CUSTOMER,
              enabledProducts:
                IntegrationAPIHelper.getAllDefaultEnabledProducts(),
            },
          )
        userId = returnValue?.userId
      })

      describe("user's case is created and associated", () => {
        describe('case exists', () => {
          beforeEach(async () => {
            results = await CaseResourceController.findByUserId(userId!)
            console.log('results', results)
          })

          it("user's case is associated with client, and payment status is paid.", () => {
            expect(results.client).toEqual(client1.id)
            expect(results.status).toEqual('paid')
            expect(results.funeralDirector).toEqual(admin1.id)
            expect(results.customer).toEqual(userId)
          })
        })
      })
    })

    describe('Admin Id not belong to the client', () => {
      beforeEach(async () => {
        try {
          await UserResourceController.createUserAndCaseByClientArrangerId(
            mockAPIKey,
            client1,
            'not-exist-admin-id',
            {
              email: userEmail1,
              deceasedName: deceasedName1,
              familyFirstAndLastName: newUserFullName1,
              dateOfBirth: '11/02/1933',
              dateOfDeath: '22/08/2024',
              serviceAddress: serviceAddress1,
              serviceStartTime: serviceStartTime1,
              inviteFamilyAs: EulogiseUserRole.CUSTOMER,
              enabledProducts:
                IntegrationAPIHelper.getAllDefaultEnabledProducts(),
            },
          )
        } catch (ex: any) {
          error = ex
        }
      })

      it('should throw "No client Admin in found client!" exception', () => {
        expect(error.message).toEqual('No client Admin in found client!')
      })

      describe('User', () => {
        beforeEach(async () => {
          results = await userModel.findOne({ email: userEmail1 })
        })

        it('should not be created', () => {
          expect(results).toBeUndefined()
        })
      })
    })
  })
})
