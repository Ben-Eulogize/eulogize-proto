import { S3Helper } from './S3Helper'
import expect from 'expect'
import { MOCK_S3_BACKGROUND_IMAGE_OBJECTS } from './mock/S3BackgroundImage.mock.data'
import { EulogiseRegion } from '@eulogise/core'
import { FrameHelper } from './FrameHelper'

describe('S3Helper', () => {
  let results: any
  const caseId = '935b6396-7e38-40e7-9a0b-1ac9666fdfdf'

  describe('downloadFileFromUrl', () => {
    it('should download file from url', async () => {
      await S3Helper.downloadFileFromUrl({
        url: 'https://us.media.eulogisememorials.com/backgroundImages/Australian_Watercolour/AU/Australian_Watercolour_BOOKLET_BACK.jpg',
        filePath: '/tmp/Australian_Watercolour_BOOKLET_BACK.jpg',
      })
    })
  })

  describe('convertS3BackgroundImageObjectsToJsonHierarchy', () => {
    beforeEach(() => {
      results = S3Helper.convertS3BackgroundImageObjectsToJsonHierarchy({
        backgroundImageObjects: MOCK_S3_BACKGROUND_IMAGE_OBJECTS,
      })
    })

    it('should return json hierarchy object', () => {
      expect(results).toEqual({
        Australian_Watercolour: {
          AU: [
            'Australian_Watercolour_BOOKLET_BACK.jpg',
            'Australian_Watercolour_BOOKLET_BACK_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_BACK_BOTH_SIDE.jpg',
            'Australian_Watercolour_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_FRONT.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_BOTH_SIDE.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_LEFT.jpg',
            'Australian_Watercolour_BOOKLET_LEFT_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_RIGHT.jpg',
            'Australian_Watercolour_BOOKLET_RIGHT_BLEED.jpg',
            'Australian_Watercolour_BOOKMARK_BACK.jpg',
            'Australian_Watercolour_BOOKMARK_BACK_BLEED.jpg',
            'Australian_Watercolour_BOOKMARK_FRONT.jpg',
            'Australian_Watercolour_BOOKMARK_FRONT_BLEED.jpg',
            'Australian_Watercolour_SLIDESHOW.jpg',
            'Australian_Watercolour_THANK_YOU_CARD.jpg',
            'Australian_Watercolour_THANK_YOU_CARD_2_COL_LEFT.jpg',
            'Australian_Watercolour_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg',
            'Australian_Watercolour_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            'Australian_Watercolour_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg',
            'Australian_Watercolour_THANK_YOU_CARD_BLEED.jpg',
            'Australian_Watercolour_THUMBNAIL.jpg',
            'Australian_Watercolour_TV_WELCOME_SCREEN_LEFT.jpg',
            'Australian_Watercolour_TV_WELCOME_SCREEN_RIGHT.jpg',
          ],
          USA: [
            'Australian_Watercolour_BOOKLET_BACK_BOTH_SIDE_USA.jpg',
            'Australian_Watercolour_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_BACK_USA.jpg',
            'Australian_Watercolour_BOOKLET_BACK_USA_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_BOTH_SIDE_USA.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_USA.jpg',
            'Australian_Watercolour_BOOKLET_FRONT_USA_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_LEFT_USA.jpg',
            'Australian_Watercolour_BOOKLET_LEFT_USA_BLEED.jpg',
            'Australian_Watercolour_BOOKLET_RIGHT_USA.jpg',
            'Australian_Watercolour_BOOKLET_RIGHT_USA_BLEED.jpg',
            'Australian_Watercolour_THUMBNAIL_USA.jpg',
            'Australian_watercolour TV_SLIDESHOW_USA.jpg',
          ],
        },
        Beach: {
          AU: [
            'Beach_BOOKLET_BACK.jpg',
            'Beach_BOOKLET_BACK_BLEED.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
            'Beach_BOOKLET_FRONT.jpg',
            'Beach_BOOKLET_FRONT_BLEED.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg',
            'Beach_BOOKLET_LEFT.jpg',
            'Beach_BOOKLET_LEFT_BLEED.jpg',
            'Beach_BOOKLET_RIGHT.jpg',
            'Beach_BOOKLET_RIGHT_BLEED.jpg',
            'Beach_BOOKMARK_BACK.jpg',
            'Beach_BOOKMARK_BACK_BLEED.jpg',
            'Beach_BOOKMARK_FRONT.jpg',
            'Beach_BOOKMARK_FRONT_BLEED.jpg',
            'Beach_SLIDESHOW.jpg',
            'Beach_THANK_YOU_CARD.jpg',
            'Beach_THANK_YOU_CARD_2_COL_LEFT.jpg',
            'Beach_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg',
            'Beach_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            'Beach_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg',
            'Beach_THANK_YOU_CARD_BLEED.jpg',
            'Beach_THUMBNAIL.jpg',
            'Beach_TV_WELCOME_SCREEN_LEFT.jpg',
            'Beach_TV_WELCOME_SCREEN_RIGHT.jpg',
          ],
          USA: [
            'Beach_BOOKLET_BACK_BOTH_SIDE_USA.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
            'Beach_BOOKLET_BACK_USA.jpg',
            'Beach_BOOKLET_BACK_USA_BLEED.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_USA.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg',
            'Beach_BOOKLET_FRONT_USA.jpg',
            'Beach_BOOKLET_FRONT_USA_BLEED.jpg',
            'Beach_BOOKLET_LEFT_USA.jpg',
            'Beach_BOOKLET_LEFT_USA_BLEED.jpg',
            'Beach_BOOKLET_RIGHT_USA.jpg',
            'Beach_BOOKLET_RIGHT_USA_BLEED.jpg',
            'Beach_SLIDESHOW_USA.jpg',
            'Beach_THUMBNAIL_USA.jpg',
          ],
        },
        Blank: {
          AU: [
            'Blank_BOOKLET_BACK.jpg',
            'Blank_BOOKLET_BACK_BLEED.jpg',
            'Blank_BOOKLET_BACK_BOTH_SIDE_.jpg',
            'Blank_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
            'Blank_BOOKLET_FRONT.jpg',
            'Blank_BOOKLET_FRONT_BLEED.jpg',
            'Blank_BOOKLET_FRONT_BOTH_SIDE.jpg',
            'Blank_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg',
            'Blank_BOOKLET_LEFT.jpg',
            'Blank_BOOKLET_LEFT_BLEED.jpg',
            'Blank_BOOKLET_RIGHT.jpg',
            'Blank_BOOKLET_RIGHT_BLEED.jpg',
            'Blank_BOOKMARK_BACK.jpg',
            'Blank_BOOKMARK_BACK_BLEED.jpg',
            'Blank_BOOKMARK_FRONT.jpg',
            'Blank_BOOKMARK_FRONT_BLEED.jpg',
            'Blank_SLIDESHOW.jpeg',
            'Blank_SLIDESHOW.jpg',
            'Blank_THANK_YOU_CARD.jpg',
            'Blank_THANK_YOU_CARD_2_COL_LEFT.jpg',
            'Blank_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg',
            'Blank_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            'Blank_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg',
            'Blank_THANK_YOU_CARD_BLEED.jpg',
            'Blank_TV_WELCOME_SCREEN_LEFT.jpg',
            'Blank_TV_WELCOME_SCREEN_RIGHT.jpg',
          ],
          USA: [
            'Blank_BOOKLET_BACK_BOTH_SIDE_USA.jpg',
            'Blank_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
            'Blank_BOOKLET_BACK_USA.jpg',
            'Blank_BOOKLET_BACK_USA_BLEED.jpg',
            'Blank_BOOKLET_FRONT_BOTH_SIDE_USA.jpg',
            'Blank_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg',
            'Blank_BOOKLET_FRONT_USA.jpg',
            'Blank_BOOKLET_FRONT_USA_BLEED.jpg',
            'Blank_BOOKLET_LEFT_USA.jpg',
            'Blank_BOOKLET_LEFT_USA_BLEED.jpg',
            'Blank_BOOKLET_RIGHT_USA.jpg',
            'Blank_BOOKLET_RIGHT_USA_BLEED.jpg',
            'Blank_SLIDESHOW_USA.jpg',
          ],
        },
      })
    })
  })

  describe('validateRegionBackgroundImages', () => {
    describe('region: AU', () => {
      beforeEach(() => {
        results = S3Helper.validateRegionBackgroundImages({
          backgroundKey: 'Beach',
          backgroundImages: [
            'Beach_BOOKLET_BACK.jpg',
            'Beach_BOOKLET_BACK_BLEED.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
            'Beach_BOOKLET_FRONT.jpg',
            'Beach_BOOKLET_FRONT_BLEED.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg',
            'Beach_BOOKLET_LEFT.jpg',
            'Beach_BOOKLET_LEFT_BLEED.jpg',
            'Beach_BOOKLET_RIGHT.jpg',
            'Beach_BOOKLET_RIGHT_BLEED.jpg',
            'Beach_BOOKMARK_BACK.jpg',
            'Beach_BOOKMARK_BACK_BLEED.jpg',
            'Beach_BOOKMARK_FRONT.jpg',
            'Beach_BOOKMARK_FRONT_BLEED.jpg',
            'Beach_SLIDESHOW.jpg',
            'Beach_THANK_YOU_CARD.jpg',
            'Beach_THANK_YOU_CARD_2_COL_LEFT.jpg',
            'Beach_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg',
            'Beach_THANK_YOU_CARD_2_COL_RIGHT.jpg',
            'Beach_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg',
            'Beach_THANK_YOU_CARD_BLEED.jpg',
            'Beach_THUMBNAIL.jpg',
            'Beach_TV_WELCOME_SCREEN_LEFT.jpg',
            'Beach_TV_WELCOME_SCREEN_RIGHT.jpg',
          ],
          region: EulogiseRegion.AU,
        })
      })

      it('should return summary', () => {
        console.log('JSON', JSON.stringify(results))
        expect(results).toEqual([
          { file: 'Beach_BOOKLET_BACK.jpg', isExists: true },
          { file: 'Beach_BOOKLET_BACK_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_BACK_BOTH_SIDE.jpg', isExists: true },
          { file: 'Beach_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT_BOTH_SIDE.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT_BOTH_SIDE_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_LEFT.jpg', isExists: true },
          { file: 'Beach_BOOKLET_LEFT_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_RIGHT.jpg', isExists: true },
          { file: 'Beach_BOOKLET_RIGHT_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKMARK_BACK.jpg', isExists: true },
          { file: 'Beach_BOOKMARK_BACK_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKMARK_FRONT.jpg', isExists: true },
          { file: 'Beach_BOOKMARK_FRONT_BLEED.jpg', isExists: true },
          { file: 'Beach_SLIDESHOW.jpg', isExists: true },
          { file: 'Beach_THANK_YOU_CARD.jpg', isExists: true },
          { file: 'Beach_THANK_YOU_CARD_2_COL_LEFT.jpg', isExists: true },
          { file: 'Beach_THANK_YOU_CARD_2_COL_LEFT_BLEED.jpg', isExists: true },
          { file: 'Beach_THANK_YOU_CARD_2_COL_RIGHT.jpg', isExists: true },
          {
            file: 'Beach_THANK_YOU_CARD_2_COL_RIGHT_BLEED.jpg',
            isExists: true,
          },
          { file: 'Beach_THANK_YOU_CARD_BLEED.jpg', isExists: true },
          { file: 'Beach_THUMBNAIL.jpg', isExists: true },
          { file: 'Beach_TV_WELCOME_SCREEN_LEFT.jpg', isExists: true },
          { file: 'Beach_TV_WELCOME_SCREEN_RIGHT.jpg', isExists: true },
        ])
      })
    })

    describe('region: USA', () => {
      beforeEach(() => {
        results = S3Helper.validateRegionBackgroundImages({
          backgroundKey: 'Beach',
          backgroundImages: [
            'Beach_BOOKLET_BACK_BOTH_SIDE_USA.jpg',
            'Beach_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
            'Beach_BOOKLET_BACK_USA.jpg',
            'Beach_BOOKLET_BACK_USA_BLEED.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_USA.jpg',
            'Beach_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg',
            'Beach_BOOKLET_FRONT_USA.jpg',
            'Beach_BOOKLET_FRONT_USA_BLEED.jpg',
            'Beach_BOOKLET_LEFT_USA.jpg',
            'Beach_BOOKLET_LEFT_USA_BLEED.jpg',
            'Beach_BOOKLET_RIGHT_USA.jpg',
            'Beach_BOOKLET_RIGHT_USA_BLEED.jpg',
            'Beach_SLIDESHOW_USA.jpg',
            'Beach_THUMBNAIL_USA.jpg',
          ],
          region: EulogiseRegion.USA,
        })
      })

      it('should return summary', () => {
        console.log('JSON', JSON.stringify(results))
        expect(results).toEqual([
          { file: 'Beach_BOOKLET_BACK_BOTH_SIDE_USA.jpg', isExists: true },
          {
            file: 'Beach_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
            isExists: true,
          },
          { file: 'Beach_BOOKLET_BACK_USA.jpg', isExists: true },
          { file: 'Beach_BOOKLET_BACK_USA_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT_BOTH_SIDE_USA.jpg', isExists: true },
          {
            file: 'Beach_BOOKLET_FRONT_BOTH_SIDE_USA_BLEED.jpg',
            isExists: true,
          },
          { file: 'Beach_BOOKLET_FRONT_USA.jpg', isExists: true },
          { file: 'Beach_BOOKLET_FRONT_USA_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_LEFT_USA.jpg', isExists: true },
          { file: 'Beach_BOOKLET_LEFT_USA_BLEED.jpg', isExists: true },
          { file: 'Beach_BOOKLET_RIGHT_USA.jpg', isExists: true },
          { file: 'Beach_BOOKLET_RIGHT_USA_BLEED.jpg', isExists: true },
          { file: 'Beach_SLIDESHOW_USA.jpg', isExists: true },
        ])
      })
    })
  })

  describe('validateBackgroundImages', () => {
    beforeEach(() => {
      results = S3Helper.validateBackgroundImages({
        backgroundImageObjects: MOCK_S3_BACKGROUND_IMAGE_OBJECTS,
      })
    })

    it('should validate all background images', () => {
      expect(results).toEqual('')
    })
  })

  describe('validateBackgroundImagesFromS3', () => {
    beforeEach(async () => {
      results = await S3Helper.validateBackgroundImagesFromS3({})
    })

    it('should return summary of the validation', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toEqual('')
    })
  })

  /*
  // rename XXXX_BLEED_USA.jpg file to XXXX_USA_BLEED.jpg
  describe('listObjects', () => {
    beforeEach(async () => {
      results = await S3Helper.listObjects({
        folder: 'backgroundImages',
      })
    })

    it('should return all objects', async () => {
      const files = results.filter((objectName: string) => {
        console.log('objectName', objectName)
        return /BLEED_USA.jpg$/.test(objectName)
      })
      console.log('files', JSON.stringify(files))
      for (const oldFileKey of files) {
        const newFileKey = oldFileKey.replace(/BLEED_USA.jpg$/, 'USA_BLEED.jpg')
        console.log(`converting file ${oldFileKey} to ${newFileKey}`)
        await S3Helper.renameObject({
          oldFileKey,
          newFileKey,
        })
      }
      expect(files).toEqual('')
    })
  })
*/

  describe('downloadFramesToFolder', () => {
    beforeEach(async () => {
      for (let i = 100; i <= 103; i++) {
        const filename = FrameHelper.getFrameKeyByFrameIndex(i)
        results = await S3Helper.uploadToS3({
          filePath: `${__dirname}/files/${filename}.jpg`,
          s3Path: `cases/${caseId}/frames/${filename}.jpg`,
          isCheck: true,
        })
      }

      results = await S3Helper.downloadFramesToFolder({
        caseId,
        startIndex: 100,
        endIndex: 102,
        folderPath: `/tmp/${caseId}/frames`,
      })
    })

    it('should download the entire folder', () => {})
  })

  describe('deleteObject', () => {
    const frameIndex = 100
    const filename = FrameHelper.getFrameKeyByFrameIndex(frameIndex)
    const s3Path = `cases/${caseId}/frames/${filename}.jpg`
    beforeEach(async () => {
      const filename = FrameHelper.getFrameKeyByFrameIndex(frameIndex)
      results = await S3Helper.uploadToS3({
        filePath: `${__dirname}/files/${filename}.jpg`,
        s3Path,
        isCheck: true,
      })
    })

    it('should return correct response', async () => {
      // file should exist at this point
      await expect(S3Helper.checkExists(s3Path)).resolves.not.toThrowError()

      // deleting
      await S3Helper.deleteObject({
        key: s3Path,
      })
      // file should not exist
      await expect(S3Helper.checkExists(s3Path)).rejects.toThrowError()
    })
  })

  describe('uploadToS3()', () => {
    beforeEach(async () => {
      results = await S3Helper.uploadToS3({
        filePath: `${__dirname}/S3Helper.ts`,
        s3Path: `cases/${caseId}/S3Helper.ts`,
        isCheck: true,
      })
    })

    it('should upload to s3', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toBeDefined()
    })
  })

  describe('listObjects', () => {
    beforeEach(async () => {
      results = await S3Helper.listObjects({
        folder: `cases/${caseId}`,
      })
    })

    it('should return a list of objects', () => {
      console.log('JSON', JSON.stringify(results))
      expect(results).toEqual([`cases/${caseId}/S3Helper.ts`])
    })
  })

  describe('checkExists', () => {
    it('if exists, should not throw error', async () => {
      await expect(
        S3Helper.checkExists(`cases/${caseId}/S3Helper.ts`),
      ).resolves.not.toThrow()
    })

    it('if not exists, should throw error', async () => {
      await expect(
        S3Helper.checkExists(`cases/${caseId}/blah`),
      ).rejects.toThrowError()
    })
  })
})
