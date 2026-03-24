import expect from 'expect'
import { ReportController } from '../../../src/ts/functions/controller/ReportController'

describe('ReportController', () => {
  let results: any
  const reportController = new ReportController()

  /*describe('getOverviewReportByCaseId()', () => {
    beforeEach(async () => {
      results = await reportController.getOverviewReportByCaseReport({ caseId })
    })

    it('should return a report for a case', () => {
      expect(results).toEqual({
        arrangerName: expect.any(String),
        bookletBackground: '',
        bookletNoOfPages: 0,
        bookletStatus: undefined,
        bookletTheme: undefined,
        bookmarkBackground: undefined,
        bookmarkStatus: undefined,
        bookmarkTheme: undefined,
        caseCreated: expect.any(String),
        caseCreatedTime: expect.any(String),
        caseId: expect.any(String),
        customerEmail: expect.any(String),
        customerFullName: expect.any(String),
        deceasedFullName: expect.any(String),
        didCaseGenerate: false,
        funeralBusinessName: expect.any(String),
        noOfImagesInSlideshow: 0,
        noOfInvitesSent: 0,
        noOfPhotosUploaded: 0,
        noOfTracksUploaded: 0,
        noOfTracksUsed: 0,
        paymentDate: undefined,
        paymentDateTime: undefined,
        country: expect.any(String),
        serviceDate: undefined,
        serviceDateTime: undefined,
        sidedCardBackground: undefined,
        sidedCardStatus: undefined,
        sidedCardTheme: undefined,
        slideshowBackground: undefined,
        slideshowLength: undefined,
        slideshowStatus: undefined,
        slideshowTheme: undefined,
        titleSlideEnd: undefined,
        titleSlideFront: undefined,
        thankYouCardBackground: undefined,
        thankYouCardStatus: undefined,
        thankYouCardTheme: undefined,
        tvWelcomeScreenBackground: undefined,
        tvWelcomeScreenStatus: undefined,
        tvWelcomeScreenTheme: undefined,
      })
    })
  })*/

  describe('getOverviewReport()', () => {
    beforeEach(async () => {
      results = await reportController.getOverviewReport()
    })

    it('should return the download report', () => {
      const length = results.length
      expect(results).toEqual(
        new Array(length).fill({
          arrangerName: expect.any(String),
          bookletBackground: '',
          bookletNoOfPages: 0,
          bookletStatus: undefined,
          bookletTheme: undefined,
          bookmarkBackground: undefined,
          bookmarkStatus: undefined,
          bookmarkTheme: undefined,
          caseCreated: expect.any(String),
          caseCreatedTime: expect.any(String),
          caseId: expect.any(String),
          customerEmail: expect.any(String),
          customerFullName: expect.any(String),
          deceasedFullName: expect.any(String),
          didCaseGenerate: false,
          funeralBusinessName: expect.any(String),
          noOfImagesInSlideshow: 0,
          noOfInvitesSent: 0,
          noOfPhotosUploaded: 0,
          noOfTracksUploaded: 0,
          noOfTracksUsed: 0,
          paymentDate: undefined,
          paymentDateTime: undefined,
          country: expect.any(String),
          serviceDate: undefined,
          serviceDateTime: undefined,
          sidedCardBackground: undefined,
          sidedCardStatus: undefined,
          sidedCardTheme: undefined,
          slideshowBackground: undefined,
          slideshowLength: undefined,
          slideshowStatus: undefined,
          slideshowTheme: undefined,
          titleSlideEnd: undefined,
          titleSlideFront: undefined,
          thankYouCardBackground: undefined,
          thankYouCardStatus: undefined,
          thankYouCardTheme: undefined,
          tvWelcomeScreenBackground: undefined,
          tvWelcomeScreenStatus: undefined,
          tvWelcomeScreenTheme: undefined,
        }),
      )
    })
  })

  describe('exportOverviewReportToCsv()', () => {
    beforeEach(async () => {
      results = await reportController.exportOverviewReportToCsv()
    })

    it('should return csv string', () => {
      expect(results).toMatch(
        /"caseId","country","didCaseGenerate","customerFullName","customerEmail","deceasedFullName","caseCreated","caseCreatedTime","paymentDate","paymentDateTime","serviceDate","serviceDateTime","funeralBusinessName","arrangerName","noOfPhotosUploaded","noOfInvitesSent","slideshowStatus","slideshowTheme","slideshowBackground","slideshowLength","titleSlideFront","titleSlideEnd","noOfImagesInSlideshow","noOfTracksUploaded","noOfTracksUsed","bookletStatus","bookletTheme","bookletBackground","bookletNoOfPages","sidedCardStatus","sidedCardTheme","sidedCardBackground","thankYouCardStatus","thankYouCardTheme","thankYouCardBackground","bookmarkStatus","bookmarkTheme","bookmarkBackground","tvWelcomeScreenStatus","tvWelcomeScreenTheme","tvWelcomeScreenBackground"/,
      )
    })
  })
})
