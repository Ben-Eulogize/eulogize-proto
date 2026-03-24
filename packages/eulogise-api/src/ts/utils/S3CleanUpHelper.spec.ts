import { S3CleanUpHelper } from './S3CleanUpHelper'
import expect from 'expect'

describe('S3CleanUpHelper', () => {
  describe('findOldFramesFolders', () => {
    it('should return an array', async function () {
      const result = await S3CleanUpHelper.findOldFramesFolders()
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('cleanupOldFramesFolder', () => {
    it('should return the number of folders cleaned up', async function () {
      const result = await S3CleanUpHelper.cleanupOldFramesFolder()
      console.log('Folders cleaned up:', result)
      expect(result).toBeGreaterThanOrEqual(0)
    })
  })
})
