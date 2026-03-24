import expect from 'expect'
import { FilestackHelper } from '../../../src/ts/utils/FilestackHelper'
import { IImageAssetContent } from '@eulogise/core'

describe('FilestackHelper - integration', () => {
  let results: any

  describe('downloadImage()', () => {
    const filestackHandle: string = 'gNTLNExUQmugLwMXoMIK'
    beforeEach(async () => {
      results = await FilestackHelper.downloadImage(filestackHandle)
    })

    it('should return output filepath', () => {
      expect(results).toBeDefined()
    })
  })

  describe('convertHEICImageToJPG()', () => {
    describe('HEIC file', () => {
      const heicFilePath: string = `${__dirname}/files/test.heic`
      beforeEach(async () => {
        results = await FilestackHelper.convertHEICImageToJPG(heicFilePath)
      })

      it('should create a jpg file', () => {
        expect(results).toBeDefined()
      })
    })

    describe('JPG file', () => {
      const jpgFilePath: string = `${__dirname}/files/test.jpg`
      beforeEach(async () => {
        results = await FilestackHelper.convertHEICImageToJPG(jpgFilePath)
      })

      it('should return undefined', () => {
        expect(results).toEqual(undefined)
      })
    })
  })

  describe('convertFilestackImage()', () => {
    const assetContent: IImageAssetContent = {
      filename: '0lZ7wnryRPKfwzSnpAFX_IMG_7963.HEIC',
      filepath:
        'cases/48698d5b-72d9-4f98-ba61-30fb2001d68a/gallery/0lZ7wnryRPKfwzSnpAFX_IMG_7963.HEIC',
      filestackHandle: 'JDLFaohPRciIPpJH2W9W',
    }

    beforeEach(async () => {
      results = await FilestackHelper.convertFilestackImage(assetContent)
    })

    it('should return new assetContent', () => {
      expect(results).toEqual('')
    })
  })
})
