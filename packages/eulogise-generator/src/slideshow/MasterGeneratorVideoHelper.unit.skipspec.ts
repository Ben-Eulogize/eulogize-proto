import expect from 'expect'

import { LambdaHelper } from '../helpers/LambdaHelper'
import { MasterGeneratorVideoHelper } from './MasterGeneratorVideoHelper'
import { MOCK_SLIDESHOW_1 } from '@eulogise/mock'
import { SLIDESHOW_THEMES, TV_WELCOME_SCREEN_THEMES } from '@eulogise/core'

describe('MasterGeneratorVideoHelper', () => {
  let sandbox: any
  describe('startRecordTriggers()', () => {
    beforeEach(() => {
      sandbox.stub(LambdaHelper, 'invokeJob').resolves({})
    })

    it('should triggers', async () => {
      await MasterGeneratorVideoHelper.startRecordTriggers({
        slideshow: MOCK_SLIDESHOW_1,
        slideshowTheme: SLIDESHOW_THEMES[0],
        slideshowTitleSlide: undefined,
        slideshowTitleSlideTheme: TV_WELCOME_SCREEN_THEMES[0],
        totalFrames: 66666,
        slideshowTitleSlideUrl: '',
      })
      expect(LambdaHelper.invokeJob.callCount).toEqual(50)
    })
  })

  describe('createScreenshotTriggerInfos()', () => {
    it('should return correct number', () => {
      const totalFrames = 66666
      const results =
        MasterGeneratorVideoHelper.createScreenshotTriggerInfos(totalFrames)
      console.log(JSON.stringify(results))
      expect(results).toEqual([
        { triggerId: 0, startFrameIndex: 0, endFrameIndex: 1333 },
        { triggerId: 1, startFrameIndex: 1334, endFrameIndex: 2667 },
        { triggerId: 2, startFrameIndex: 2668, endFrameIndex: 4001 },
        { triggerId: 3, startFrameIndex: 4002, endFrameIndex: 5335 },
        { triggerId: 4, startFrameIndex: 5336, endFrameIndex: 6669 },
        { triggerId: 5, startFrameIndex: 6670, endFrameIndex: 8003 },
        { triggerId: 6, startFrameIndex: 8004, endFrameIndex: 9337 },
        { triggerId: 7, startFrameIndex: 9338, endFrameIndex: 10671 },
        { triggerId: 8, startFrameIndex: 10672, endFrameIndex: 12005 },
        { triggerId: 9, startFrameIndex: 12006, endFrameIndex: 13339 },
        { triggerId: 10, startFrameIndex: 13340, endFrameIndex: 14673 },
        { triggerId: 11, startFrameIndex: 14674, endFrameIndex: 16007 },
        { triggerId: 12, startFrameIndex: 16008, endFrameIndex: 17341 },
        { triggerId: 13, startFrameIndex: 17342, endFrameIndex: 18675 },
        { triggerId: 14, startFrameIndex: 18676, endFrameIndex: 20009 },
        { triggerId: 15, startFrameIndex: 20010, endFrameIndex: 21343 },
        { triggerId: 16, startFrameIndex: 21344, endFrameIndex: 22677 },
        { triggerId: 17, startFrameIndex: 22678, endFrameIndex: 24011 },
        { triggerId: 18, startFrameIndex: 24012, endFrameIndex: 25345 },
        { triggerId: 19, startFrameIndex: 25346, endFrameIndex: 26679 },
        { triggerId: 20, startFrameIndex: 26680, endFrameIndex: 28013 },
        { triggerId: 21, startFrameIndex: 28014, endFrameIndex: 29347 },
        { triggerId: 22, startFrameIndex: 29348, endFrameIndex: 30681 },
        { triggerId: 23, startFrameIndex: 30682, endFrameIndex: 32015 },
        { triggerId: 24, startFrameIndex: 32016, endFrameIndex: 33349 },
        { triggerId: 25, startFrameIndex: 33350, endFrameIndex: 34683 },
        { triggerId: 26, startFrameIndex: 34684, endFrameIndex: 36017 },
        { triggerId: 27, startFrameIndex: 36018, endFrameIndex: 37351 },
        { triggerId: 28, startFrameIndex: 37352, endFrameIndex: 38685 },
        { triggerId: 29, startFrameIndex: 38686, endFrameIndex: 40019 },
        { triggerId: 30, startFrameIndex: 40020, endFrameIndex: 41353 },
        { triggerId: 31, startFrameIndex: 41354, endFrameIndex: 42687 },
        { triggerId: 32, startFrameIndex: 42688, endFrameIndex: 44021 },
        { triggerId: 33, startFrameIndex: 44022, endFrameIndex: 45355 },
        { triggerId: 34, startFrameIndex: 45356, endFrameIndex: 46689 },
        { triggerId: 35, startFrameIndex: 46690, endFrameIndex: 48023 },
        { triggerId: 36, startFrameIndex: 48024, endFrameIndex: 49357 },
        { triggerId: 37, startFrameIndex: 49358, endFrameIndex: 50691 },
        { triggerId: 38, startFrameIndex: 50692, endFrameIndex: 52025 },
        { triggerId: 39, startFrameIndex: 52026, endFrameIndex: 53359 },
        { triggerId: 40, startFrameIndex: 53360, endFrameIndex: 54693 },
        { triggerId: 41, startFrameIndex: 54694, endFrameIndex: 56027 },
        { triggerId: 42, startFrameIndex: 56028, endFrameIndex: 57361 },
        { triggerId: 43, startFrameIndex: 57362, endFrameIndex: 58695 },
        { triggerId: 44, startFrameIndex: 58696, endFrameIndex: 60029 },
        { triggerId: 45, startFrameIndex: 60030, endFrameIndex: 61363 },
        { triggerId: 46, startFrameIndex: 61364, endFrameIndex: 62697 },
        { triggerId: 47, startFrameIndex: 62698, endFrameIndex: 64031 },
        { triggerId: 48, startFrameIndex: 64032, endFrameIndex: 65365 },
        { triggerId: 49, startFrameIndex: 65366, endFrameIndex: 66665 },
      ])
    })
  })
})
