import { MemorialVisualStatus } from '@eulogise/core'
import expect from 'expect'
import { CaseMockService } from '../../mock/CaseMockService'
import { CaseReportController } from '../../../src/ts/functions/controller/resource/CaseReportController'

describe('CaseReportController', () => {
  const customer1Email = 'customer1@email.com'

  let results: any
  const mockCaseService = new CaseMockService()

  describe('findCaseSummariesByCaseId()', () => {
    describe('no case found', () => {
      it('should return empty array', async () => {
        const cases = await CaseReportController.findCaseSummariesByCaseId(
          'not-exist',
        )
        expect(cases).toEqual([])
      })
    })

    describe('case found', () => {
      it('should return array of case summary', async () => {
        await mockCaseService.createMockItems(1)
        const [firstMockCase] = mockCaseService.getMockItems()
        console.log('firstMockCase', firstMockCase)
        const casesSummaries =
          await CaseReportController.findCaseSummariesByCaseId(
            firstMockCase.id!,
          )
        console.log('casesSummaries', casesSummaries)
        const [caseSummary] = casesSummaries
        expect(caseSummary.booklet).toBeDefined()
        expect(caseSummary.bookmark).toBeDefined()
        expect(caseSummary.sidedCard).toBeDefined()
        expect(caseSummary.slideshow).toBeDefined()
        expect(caseSummary.thankyouCard).toBeDefined()
        expect(caseSummary.tvWelcomeScreen).toBeDefined()
      })
    })
  })

  describe('findCasesByEmail()', () => {
    describe('no users found', () => {
      it('should return empty array', async () => {
        const cases = await CaseReportController.findCaseSummariesByEmail(
          'not-exist',
        )
        expect(cases).toEqual([])
      })
    })

    describe('case found', () => {
      it('should return array', async () => {
        const cases = await CaseReportController.findCaseSummariesByEmail(
          customer1Email,
        )
        expect(cases).toEqual([
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
            clientName: '',
            country: 'Australia',
            createdAt: expect.any(Date),
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
            updatedAt: expect.any(Date),
          },
        ])
      })
    })
  })

  describe('getMemorialSummary()', () => {
    describe('empty array', () => {
      beforeEach(() => {
        results = CaseReportController.getMemorialSummary([])
      })

      it('should return status NOT_STARTED', () => {
        expect(results.ids).toEqual([])
        expect(results.activeId).toEqual(null)
        expect(results.status).toEqual(MemorialVisualStatus.NOT_STARTED)
      })
    })

    describe('multiple items in array', () => {
      beforeEach(() => {
        results = CaseReportController.getMemorialSummary([
          {
            id: '1',
            status: MemorialVisualStatus.NOT_STARTED,
            case: '',
            content: null,
          },
          {
            id: '2',
            status: MemorialVisualStatus.EDITED,
            case: '',
            content: null,
          },
          {
            id: '3',
            status: MemorialVisualStatus.DOWNLOAD,
            case: '',
            content: null,
          },
        ])
      })

      it('should return status the highest status in the order list', () => {
        expect(results.ids).toEqual(['1', '2', '3'])
        expect(results.activeId).toEqual('3')
        expect(results.status).toEqual(MemorialVisualStatus.DOWNLOAD)
      })
    })
  })
})
