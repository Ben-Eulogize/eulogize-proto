import { S3Helper } from './S3Helper'
import expect from 'expect'

describe('S3Helper', () => {
  describe('deleteCaseResourceById', () => {
    const caseId = '0f69ede7-98ee-4c98-9858-38c7be21d7a5'
    beforeEach(async () => {
      const exists = await S3Helper.folderExists({
        folderPrefix: `cases/${caseId}`,
      })
      expect(exists).toEqual(true)
      await S3Helper.deleteCaseResourceById({
        caseId,
      })
    })

    it('should remove the associated case folder', async () => {
      const exists = await S3Helper.folderExists({
        folderPrefix: `cases/${caseId}`,
      })
      expect(exists).toEqual(false)
    })
  })
})
