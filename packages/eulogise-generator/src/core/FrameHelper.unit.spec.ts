import expect from 'expect'
import { FrameHelper } from './FrameHelper'

describe('FrameHelper', () => {
  describe('getVideoBlockFilePaths()', () => {
    it('should return all the block paths', () => {
      const caseId = 'case-id'
      const noOfBlocks = 5
      const slideshowPattern = /Slideshow-\d+\.mp4$/
      const results = FrameHelper.getVideoBlockFilePaths({
        caseId,
        noOfBlocks,
      })

      results.forEach((file) => {
        expect(file).toMatch(slideshowPattern)
      })
      expect(results.length).toEqual(noOfBlocks)
    })
  })

  describe('getBaseFrameFolder()', () => {
    const caseId = 'case-id'
    it('should return the frame folder based on the case Id', () => {
      expect(FrameHelper.getBaseFrameFolder(caseId)).toEqual(
        `cases/${caseId}/frames`,
      )
    })
  })

  describe('getFrameKeyByFrameIndex()', () => {
    const frameIndex = 50
    it('should return the frame key based on the frame index', () => {
      expect(FrameHelper.getFrameKeyByFrameIndex(frameIndex)).toEqual('000050')
    })
  })

  describe('getFrameKeyByCasesIdAndFrameIndex()', () => {
    const caseId = 'case-id'
    const frameIndex = 50
    it('should return the frame key based on the case Id and frame index', () => {
      expect(
        FrameHelper.getFrameKeyByCasesIdAndFrameIndex({
          caseId,
          frameIndex,
        }),
      ).toEqual(`cases/${caseId}/frames/000050.jpg`)
    })
  })
})
