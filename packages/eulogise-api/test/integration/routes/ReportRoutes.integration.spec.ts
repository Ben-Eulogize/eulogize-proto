import expect from 'expect'
import { TestRequestHelper } from '../../helpers/TestRequestHelper'
import { EulogiseCountry, EulogiseUserRole } from '@eulogise/core'
import { clientModel } from '../../../src/ts/database'
import { CaseMockService } from '../../mock/CaseMockService'
import moment from 'moment'

describe('ReportRoutes', () => {
  describe('POST /admin/report/export/csv', () => {
    const caseMockService = new CaseMockService()

    beforeEach(async () => {
      await clientModel.create({
        title: 'Flamingo Case Integration',
        primaryAddress: ['primary-address-line-1'],
        additionalAddress: [['additional-address-line-1']],
        country: EulogiseCountry.AUSTRALIA,
        createCaseFamilyInviteOptions: ['editor'],
        directors: [],
      })
    })

    const noOfCases = 1

    beforeEach(async () => {
      await caseMockService.createMockItems(noOfCases)
    })

    afterEach(async () => {
      await caseMockService.restore()
    })

    it('should return csv string', async () => {
      const results = await TestRequestHelper.request(
        '/v2/admin/report/export/csv',
        {
          userType: EulogiseUserRole.ADMIN,
          method: 'POST',
          data: {
            from: moment().subtract(1, 'months').toISOString(),
            to: moment().toISOString(),
          },
        },
      )
      expect(results).toEqual('')
    })
  })
})
