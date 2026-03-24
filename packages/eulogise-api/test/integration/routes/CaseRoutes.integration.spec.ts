import expect from 'expect'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import {
  EulogiseResource,
  EulogiseUserRole,
  IEulogiseProductAvailabilityStatus,
} from '@eulogise/core'
import {
  assetModel,
  bookletModel,
  caseModel,
  userModel,
} from '../../../src/ts/database'
import { ICaseModel } from '../../../src/ts/database/types/CaseModel.types'
import { MOCK_CASE_1 } from '@eulogise/mock'

describe('CaseRoutes', () => {
  let results: any
  let caseId: string
  const mockCase = {
    ...MOCK_CASE_1,
    customer: MOCK_CASE_1.customer.id,
    funeralDirector: MOCK_CASE_1.funeralDirector.id,
  } as unknown as ICaseModel.Schema

  beforeEach(async () => {
    results = await caseModel.create(mockCase)
    caseId = results.id
  })

  describe('Public', () => {
    describe('GET /v2/admin/cases/:caseId/embeddedDetails', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/admin/cases/${caseId}/embeddedDetails`,
            {
              method: 'GET',
            },
          )
        ).response
      })

      it('should return the case info of the provided case id', () => {
        expect(results.status).toEqual(200)
        expect(results.data).toEqual({
          case: {
            client: expect.any(String),
            country: 'Australia',
            createdAt: expect.any(String),
            customer: expect.any(String),
            customisedImagesOrderIds: [],
            deceased: { fullName: 'whoami' },
            editors: [],
            funeralDirector: expect.any(String),
            hasAccessedDownloadPage: false,
            hasImages: false,
            id: expect.any(String),
            region: 'AU',
            service: { timeStart: 1619568023412 },
            status: 'paid',
            updatedAt: expect.any(String),
          },
          embeddedIframesSettings: {
            showWhiteBottomBar: true,
            allowPurchaseButton: true,
            purchaseUrl: 'https://www.eulogise.com/purchase',
            customButtonCopy: 'Purchase',
            showEulogizeBranding: true,
          },
          ref: expect.any(String),
        })
      })
    })
  })

  describe('Admin', () => {
    const customer1Email = 'customer1@email.com'
    const customer1FullName = 'customer full name 1'
    const userType = EulogiseUserRole.ADMIN
    const caseStatus: any = 'paid'

    beforeEach(async () => {
      const customer1 = await userModel.create({
        email: customer1Email,
        fullName: customer1FullName,
        role: EulogiseUserRole.CUSTOMER,
        verified: true,
      })
      await caseModel.create({
        customer: customer1.id,
        inviteEmail: {
          content: '',
          image: {
            filestackHandle: '',
            url: '',
            filepath: '',
          },
          greeting: '',
        },
        status: caseStatus,
      })
    })

    describe('POST /v2/admin/cases/search', () => {
      beforeEach(async () => {
        results = await TestRequestHelper.request(`/v2/admin/cases/search`, {
          userType,
          method: 'POST',
          data: {
            email: customer1Email,
          },
        })
      })

      it('should return search cases', () => {
        expect(results.response.status).toEqual(200)
        expect(results.response.data).toEqual({
          cases: [
            {
              booklet: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              bookmark: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              country: 'Australia',
              createdAt: expect.any(String),
              customer: expect.any(String),
              customerEmail: 'customer1@email.com',
              customerName: 'customer full name 1',
              customisedImagesOrderIds: [],
              editors: [],
              funeralDirectorName: '',
              hasAccessedDownloadPage: false,
              hasImages: false,
              id: expect.any(String),
              inviteEmail: {
                content: '',
                greeting: '',
                image: { filepath: '', filestackHandle: '', url: '' },
              },
              region: 'AU',
              sidedCard: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              slideshow: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              status: 'paid',
              thankyouCard: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              tvWelcomeScreen: {
                activeId: null,
                fileStatus: 'not_started',
                hasGeneratedBefore: false,
                ids: [],
                status: 'not_started',
              },
              updatedAt: expect.any(String),
            },
          ],
          ref: expect.any(String),
        })
      })
    })

    describe('GET /v2/cases/:caseId/funeralDirectors', () => {
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/cases/${caseId}/funeralDirectors`,
            {
              userType,
              method: 'GET',
            },
          )
        ).response
      })

      it('should return status code 200 and funeral directors', () => {
        expect(results.status).toEqual(200)
        expect(results.data.funeralDirectors).toBeDefined()
      })
    })

    describe('PUT /v2/cases/:caseId/funeralDirectors/assign', () => {
      const funeralDirectorId = 'mock-funeral-director'

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/cases/${caseId}/funeralDirectors/assign`,
            {
              userType,
              method: 'PUT',
              data: {
                funeralDirector: funeralDirectorId,
              },
            },
          )
        ).response
      })

      it('should return status code 200 and funeral directors', async () => {
        expect(results.status).toEqual(200)
        expect(results.data.ok).toEqual(true)

        const activeCase = await caseModel.findById(caseId)
        expect(activeCase.funeralDirector).toEqual(funeralDirectorId)
      })
    })

    describe('PUT /v2/admin/cases/:caseId', () => {
      const enabledProducts = {
        SLIDESHOW: true,
      } as IEulogiseProductAvailabilityStatus
      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(`/v2/admin/cases/${caseId}`, {
            userType,
            method: 'PUT',
            data: {
              enabledProducts,
            },
          })
        ).response
      })

      it('should return status code 200 and case should be updated with id', () => {
        expect(results.status).toEqual(200)
        const returnCase = results.data.case

        expect(returnCase.id).toBeDefined()
        // all other field should remain
        expect(returnCase.client).toEqual(mockCase.client)
        expect(returnCase.customer).toEqual(mockCase.customer)
        expect(returnCase.funeralDirector).toEqual(mockCase.funeralDirector)
        expect(returnCase.status).toEqual(mockCase.status)

        // enabledProducts should be updated
        expect(returnCase.enabledProducts).toEqual(enabledProducts)
      })
    })

    describe('POST /v2/admin/cases/:caseId/resources', () => {
      beforeEach(async () => {
        await assetModel.create({
          case: caseId,
          content: {},
          owner: '*',
          type: 'image',
        })
        await bookletModel.create({
          case: caseId,
          content: {},
          generateUserId: 'mock-user-id',
        })
      })

      beforeEach(async () => {
        results = (
          await TestRequestHelper.request(
            `/v2/admin/cases/${caseId}/resources`,
            {
              userType,
              method: 'POST',
              data: {
                resources: [
                  {
                    name: EulogiseResource.ASSET,
                    query: {
                      type: 'image',
                    },
                  },
                  EulogiseResource.BOOKLET,
                ],
              },
            },
          )
        ).response
      })

      it('should return status code 200 and list of items for the requested resource', () => {
        const responseData = results.data
        console.log('response', JSON.stringify(responseData))
        expect(responseData.asset).toBeDefined()
        expect(responseData.booklet).toBeDefined()
        expect(results.status).toEqual(200)
      })
    })
  })
})
