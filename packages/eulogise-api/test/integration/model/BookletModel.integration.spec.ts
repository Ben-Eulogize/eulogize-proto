import expect from 'expect'
import sinon from 'sinon'
import { faker } from '@faker-js/faker'
import { bookletModel } from '../../../src/ts/database'
import { MemorialProductMockService } from '../../mock/MemorialProductMockService'
import { MemorialVisualStatus } from '@eulogise/core'
import { CaseMockService } from '../../mock/CaseMockService'

describe('BookletModel', () => {
  let results: any
  const noOfProducts = 11
  let mockBookletService: MemorialProductMockService
  let sandbox: any

  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  beforeEach(async () => {
    const mockCaseService = new CaseMockService()
    await mockCaseService.createMockItems(noOfProducts)
    const cases = mockCaseService.getMockItems()
    mockBookletService = new MemorialProductMockService(bookletModel)
    for (const currentCase of cases) {
      await mockBookletService.createMockItem(currentCase.id)
    }
  })

  afterEach(async () => {
    await mockBookletService.restore()
  })

  describe('scanByCaseIdsGroupById', () => {
    beforeEach(async () => {
      const booklets = mockBookletService.getMockItems()
      const [firstBooklet, secondBooklet, thirdBooklet] = booklets
      results = await bookletModel.scanByCaseIdsGroupById(
        [firstBooklet.case, secondBooklet.case, thirdBooklet.case],
        ['case', 'id', 'status'],
      )
    })

    it('should return a booklet', () => {
      console.log('results', results)
      expect(Object.keys(results).length).toBeGreaterThanOrEqual(1)
      for (const key in results) {
        const booklets = results[key]
        expect(booklets.length).toBeGreaterThan(0)
        for (const booklet of booklets) {
          expect(booklet.case).toBeDefined()
          expect(booklet.id).toBeDefined()
          expect(booklet.status).toBeDefined()
        }
      }
    })
  })

  describe('markAsDownloadStatusById', () => {
    it('should return update status to DOWNLOAD', async () => {
      const caseId = 'mock-case-1'
      const existingStatus = MemorialVisualStatus.EDITED
      const booklet1 = await mockBookletService.createMockItem(caseId, {
        status: existingStatus,
      })

      // should be false by default
      expect(booklet1.status).toEqual(existingStatus)

      await bookletModel.markAsDownloadStatusById(booklet1.id!)
      const newBooklet = await bookletModel.findByCaseId(caseId)

      // should be updated to DOWNLOAD
      expect(newBooklet?.status).toEqual(MemorialVisualStatus.DOWNLOAD)
    })
  })

  describe('unlockProductById()', () => {
    it('should update status to EDITED', async () => {
      const caseId = 'mock-case-1'
      const existingStatus = MemorialVisualStatus.COMPLETE
      const existingFileStatus = 'generated'
      const booklet1 = await mockBookletService.createMockItem(caseId, {
        status: existingStatus,
        fileStatus: existingFileStatus,
      })

      // should be false by default
      expect(booklet1.status).toEqual(existingStatus)
      expect(booklet1.fileStatus).toEqual(existingFileStatus)

      const returnBooklet = await bookletModel.unlockProductById({
        productId: booklet1.id!,
      })
      // return updated product
      expect(returnBooklet).toBeDefined()
      expect(returnBooklet.status).toEqual(MemorialVisualStatus.EDITED)
      expect(returnBooklet.fileStatus).toEqual(MemorialVisualStatus.NOT_STARTED)

      const newBooklet = await bookletModel.findByCaseId(caseId)

      // should be updated to EDITED
      expect(newBooklet?.status).toEqual(MemorialVisualStatus.EDITED)
      // should be updated to not_started
      expect(newBooklet?.fileStatus).toEqual(MemorialVisualStatus.NOT_STARTED)
    })
  })

  describe('query()', () => {
    const caseId = faker.string.uuid()

    describe('case attribute only', () => {
      beforeEach(async () => {
        sandbox.stub(bookletModel, 'getProductsByCaseId')
        await mockBookletService.createMockItem(caseId)
        await bookletModel.query({ case: caseId })
      })

      it('should trigger getProductsByCaseId', () => {
        // @ts-ignore
        expect(bookletModel.getProductsByCaseId.called).toEqual(true)
      })
    })

    describe('multiple attributes', () => {
      beforeEach(async () => {
        sandbox.stub(bookletModel, 'getProductsByCaseId')
        await mockBookletService.createMockItem(caseId)
        await bookletModel.query({
          case: caseId,
          status: MemorialVisualStatus.DOWNLOAD,
        })
      })

      it('should trigger getProductsByCaseId', () => {
        // @ts-ignore
        expect(bookletModel.getProductsByCaseId.called).toEqual(false)
      })
    })
  })

  describe('getActiveProductByCaseId()', () => {
    const caseId = faker.string.uuid()
    beforeEach(async () => {
      await mockBookletService.createMockItem(caseId)
      results = await bookletModel.getActiveProductByCaseId(caseId)
    })

    it('should return case', () => {
      expect(results.case).toEqual(caseId)
      expect(results.content).toBeDefined()
      expect(results.createdAt).toBeDefined()
      expect(results.id).toBeDefined()
    })
  })

  describe('getAll', () => {
    beforeEach(async () => {
      results = await bookletModel.getAll()
    })

    it('should return all booklets', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results.length).toBeGreaterThan(10)
    })
  })

  describe('getAllIndexesByCaseId()', () => {
    beforeEach(async () => {
      results = await bookletModel.getAllIndexesByCaseId([
        'case',
        'id',
        'status',
      ])
    })

    it('should return all booklets', () => {
      console.log('JSON', JSON.stringify(results))
      expect(Object.keys(results).length).toBeGreaterThan(10)
    })
  })
})
