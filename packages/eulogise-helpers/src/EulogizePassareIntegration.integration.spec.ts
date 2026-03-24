import { EulogizePassareIntegration } from './EulogizePassareIntegration'
import { MOCK_PASSARE_CASES } from './Passare.mock'

jest.setTimeout(30000)
describe.skip('EulogizePassareIntegration', () => {
  let results: any
  const passareCaseId = MOCK_PASSARE_CASES[0].case_uuid
  describe.skip('fetchCaseInfoByCaseId()', () => {
    beforeEach(async () => {
      results = await EulogizePassareIntegration.fetchCaseInfoByCaseId(
        passareCaseId,
      )
    })

    it('should return case object', () => {
      expect(results).toEqual({
        deceased: {
          dateOfBirth: -989971200000,
          dateOfDeath: 1595635200000,
          fullName: 'Barbara Stearns',
          gender: 'Female',
          primaryImage: {
            url: 'https://cap.passare.com/stored_file_file/47476001.jpg',
          },
        },
        externalCaseId: 'c4a45116-70f4-47b3-b63d-bb5819277790',
        service: {
          location: '123 Rose Ave, Chicago, IL',
          serviceStartTime: '13:00:00',
          timeStart: expect.any(Number),
        },
        user: { email: null, fullName: 'Big G' },
      })
    })
  })
})
