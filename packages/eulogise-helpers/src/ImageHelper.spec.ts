import { EulogiseClientConfig } from '@eulogise/client-core'
import { IFilestackImageEnhancePreset } from '@eulogise/core'
import expect from 'expect'
import { ImageHelper } from './ImageHelper'

describe('ImageHelper', () => {
  const mockFileStackCdn = 'https://cdn.filestackcontent.com'
  const mockS3Url = 'https://mock-s3.eulogise.com'
  const originalFileStackCdn = EulogiseClientConfig.FILESTACK_CDN
  const originalS3Url = EulogiseClientConfig.AWS_S3_URL

  beforeAll(() => {
    EulogiseClientConfig.FILESTACK_CDN = mockFileStackCdn
    EulogiseClientConfig.AWS_S3_URL = mockS3Url
  })

  afterAll(() => {
    EulogiseClientConfig.FILESTACK_CDN = originalFileStackCdn
    EulogiseClientConfig.AWS_S3_URL = originalS3Url
  })

  describe('getImageUrl', () => {
    const filestackHandle = 'S7CN4tqeTwOMDJvyEiXQ'

    it('returns undefined when image input is missing', () => {
      expect(ImageHelper.getImageUrl(undefined as any)).toBeUndefined()
    })

    it('builds filestack url with auto_image, resize, output, and enhance in order', () => {
      const result = ImageHelper.getImageUrl(
        {
          filestackHandle,
          filename: 'portrait.heic',
          preset: IFilestackImageEnhancePreset.AUTO,
        },
        {
          width: 580,
          height: 328,
        },
      )

      expect(result).toBe(
        `${mockFileStackCdn}/auto_image/resize=fit:max,width:580,height:328/output=format:png/enhance=preset:auto/${filestackHandle}`,
      )
    })

    it('uses resize without method prefix and forces jpg output when requested', () => {
      const result = ImageHelper.getImageUrl(
        {
          filestackHandle,
          filename: 'landscape.jpg',
        },
        {
          width: 300,
          height: 200,
          resizeMethod: '',
          isFormatToJpg: true,
        },
      )

      expect(result).toBe(
        `${mockFileStackCdn}/auto_image/resize=width:300,height:200/output=format:jpg/${filestackHandle}`,
      )
    })

    it('omits output transformation when width and height do not require conversion', () => {
      const result = ImageHelper.getImageUrl(
        {
          filestackHandle,
          filename: 'landscape.jpg',
        },
        {
          width: 640,
          height: 480,
        },
      )

      expect(result).toBe(
        `${mockFileStackCdn}/auto_image/resize=fit:max,width:640,height:480/${filestackHandle}`,
      )
    })

    it('adds jpg output even without resize dimensions when requested', () => {
      const result = ImageHelper.getImageUrl(
        {
          filestackHandle,
        },
        {
          isFormatToJpg: true,
        },
      )

      expect(result).toBe(
        `${mockFileStackCdn}/auto_image/output=format:jpg/${filestackHandle}`,
      )
    })

    it('returns minimal filestack url when no optional transformations exist', () => {
      const result = ImageHelper.getImageUrl({
        filestackHandle,
        preset: IFilestackImageEnhancePreset.NULL,
      })

      expect(result).toBe(`${mockFileStackCdn}/auto_image/${filestackHandle}`)
    })

    it('uses AWS S3 base when url lacks protocol', () => {
      const result = ImageHelper.getImageUrl({
        url: 'uploads/photo.jpg',
      })

      expect(result).toBe(`${mockS3Url}/uploads/photo.jpg`)
    })

    it('returns absolute urls untouched', () => {
      const externalUrl = 'https://example.com/photo.jpg'
      const result = ImageHelper.getImageUrl({
        url: externalUrl,
      })

      expect(result).toBe(externalUrl)
    })

    it('prefers filepath when provided', () => {
      const result = ImageHelper.getImageUrl(
        {
          filepath: 'client/files/photo.jpg',
        },
        {
          useProdS3BucketUrl: true,
        },
      )

      expect(result).toBe(`${mockS3Url}/client/files/photo.jpg`)
    })

    it('falls back to legacy filename path when only filename is present', () => {
      const result = ImageHelper.getImageUrl(
        {
          filename: 'legacy.jpg',
        },
        {
          caseId: 'case-123',
        },
      )

      expect(result).toBe(`${mockS3Url}/cases/case-123/gallery/legacy.jpg`)
    })
  })

  describe('bytesToSize', () => {
    it('returns bytes when input is less than 1024', () => {
      const bytes = 512 // Example input
      const result = ImageHelper.bytesToSize(bytes)
      expect(result).toBe('512b')
    })

    it('returns kilobytes when input is between 1024 and 1024 * 1024', () => {
      const bytes = 2048 // Example input
      const result = ImageHelper.bytesToSize(bytes)
      expect(result).toBe('2kb')
    })

    it('returns megabytes when input is greater than or equal to 1024 * 1024', () => {
      const bytes = 2 * 1024 * 1024 // Example input
      const result = ImageHelper.bytesToSize(bytes)
      expect(result).toBe('2mb')
    })
  })

  describe('getImageFileSize', () => {
    it('returns the correct file size in bytes', async () => {
      // Mock the fetch response and blob size
      const mockBlobSize = 1024 // Example blob size
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          blob: () => Promise.resolve({ size: mockBlobSize }),
        }),
      )

      // Call the function and assert the result
      const url = 'https://example.com/image.jpg' // Example URL
      const fileSize = await ImageHelper.getImageFileSize(url)

      expect(fileSize).toBe(`1kb`)
    })

    it('handles errors gracefully', async () => {
      // Mocking fetch to throw an error
      global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')))

      // Call the function and assert it throws an error
      const url = 'https://example.com/image.jpg' // Example URL
      await expect(ImageHelper.getImageFileSize(url)).rejects.toThrow(
        'Failed to fetch',
      )
    })
  })

  describe('determineWidthHeightByImageScale', () => {
    describe('image scale === container scale', () => {
      it('should return 100% for both width and height', () => {
        const result = ImageHelper.determineWidthHeightByImageScale(
          100,
          100,
          100,
          100,
        )
        expect(result).toEqual({
          width: '100%',
          height: '100%',
        })
      })
    })

    describe('image scale > container scale', () => {
      it('should return 100% width', () => {
        const result = ImageHelper.determineWidthHeightByImageScale(
          200,
          100,
          100,
          100,
        )
        expect(result).toEqual({
          width: '100%',
          height: 'auto',
        })
      })
    })

    describe('image scale < container scale', () => {
      it('should return 100% height', () => {
        const result = ImageHelper.determineWidthHeightByImageScale(
          100,
          100,
          200,
          100,
        )
        expect(result).toEqual({
          width: 'auto',
          height: '100%',
        })
      })
    })
  })

  describe('calculateEffectiveDPIFromContainer', () => {
    describe('with valid inputs', () => {
      it('should calculate DPI when actual image size matches rendered size', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 1920, height: 1080 },
          screenDPI: 96,
        })

        // 1920px / (1920px / 96 DPI) = 1920 / 20" = 96 DPI
        expect(result).toEqual({ x: 96, y: 96 })
      })

      it('should calculate DPI when image is rendered smaller', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 960, height: 540 },
          screenDPI: 96,
        })

        // 1920px / (960px / 96 DPI) = 1920 / 10" = 192 DPI
        expect(result).toEqual({ x: 192, y: 192 })
      })

      it('should calculate DPI when image is rendered larger', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 960, height: 540 },
          renderedImageSize: { width: 1920, height: 1080 },
          screenDPI: 96,
        })

        // 960px / (1920px / 96 DPI) = 960 / 20" = 48 DPI
        expect(result).toEqual({ x: 48, y: 48 })
      })

      it('should handle custom screen DPI correctly', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 192, // High DPI screen
        })

        // X: 1920px / (800px / 192 DPI) = 1920 / 4.17" = 461 DPI
        // Y: 1080px / (600px / 192 DPI) = 1080 / 3.125" = 346 DPI
        expect(result).toEqual({ x: 461, y: 346 })
      })

      it('should handle different aspect ratios', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 3000, height: 2000 }, // 3:2 ratio
          renderedImageSize: { width: 600, height: 450 }, // 4:3 ratio
          screenDPI: 96,
        })

        // X: 3000px / (600px / 96 DPI) = 3000 / 6.25" = 480 DPI
        // Y: 2000px / (450px / 96 DPI) = 2000 / 4.69" = 427 DPI
        expect(result).toEqual({ x: 480, y: 427 })
      })

      it('should work with square images', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1000, height: 1000 },
          renderedImageSize: { width: 500, height: 500 },
          screenDPI: 96,
        })

        // 1000px / (500px / 96 DPI) = 1000 / 5.21" = 192 DPI
        expect(result).toEqual({ x: 192, y: 192 })
      })
    })

    describe('with invalid inputs', () => {
      it('should return null when actual image width is zero', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 0, height: 1080 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        expect(result).toBeNull()
      })

      it('should return null when actual image height is zero', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 0 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        expect(result).toBeNull()
      })

      it('should return null when rendered width is zero', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 0, height: 600 },
          screenDPI: 96,
        })

        expect(result).toBeNull()
      })

      it('should return null when rendered height is negative', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 800, height: -600 },
          screenDPI: 96,
        })

        expect(result).toBeNull()
      })
    })

    describe('edge cases', () => {
      it('should handle very small rendered dimensions', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1000, height: 1000 },
          renderedImageSize: { width: 1, height: 1 },
          screenDPI: 96,
        })

        // 1000px / (1px / 96 DPI) = 1000 / 0.0104" = 96000 DPI
        expect(result).toEqual({ x: 96000, y: 96000 })
      })

      it('should handle very large actual image dimensions', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 10000, height: 10000 },
          renderedImageSize: { width: 1000, height: 1000 },
          screenDPI: 96,
        })

        // 10000px / (1000px / 96 DPI) = 10000 / 10.42" = 960 DPI
        expect(result).toEqual({ x: 960, y: 960 })
      })

      it('should use default screen DPI when not provided', () => {
        const result = ImageHelper.calculateEffectiveDPIFromContainer({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 1920, height: 1080 },
        })

        expect(result).toEqual({ x: 96, y: 96 })
      })
    })
  })

  describe('check200DPIFromRenderedSize', () => {
    describe('with valid inputs', () => {
      it('should return true when both x and y DPI are above 300', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 3000, height: 2000 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        // X: 3000px / (800px / 96 DPI) = 3000 / 8.33" = 360 DPI
        // Y: 2000px / (600px / 96 DPI) = 2000 / 6.25" = 320 DPI
        // Both above 300, so should return true
        expect(result).toBe(true)
      })

      it('should return false when x DPI is below 200', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 1500, height: 1000 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        // X: 1500px / (800px / 96 DPI) = 1500 / 8.33" = 180 DPI (below 200)
        // Y: 1000px / (600px / 96 DPI) = 1000 / 6.25" = 160 DPI (below 200)
        // Both below 200, so should return false
        expect(result).toBe(false)
      })

      it('should return false when y DPI is below 200', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        // X: 1920px / (800px / 96 DPI) = 1920 / 8.33" = 230 DPI (above 200)
        // Y: 1080px / (600px / 96 DPI) = 1080 / 6.25" = 173 DPI (below 200)
        // Y below 200, so should return false
        expect(result).toBe(false)
      })

      it('should return false when both x and y DPI are below 200', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        // X: 1920px / (800px / 96 DPI) = 1920 / 8.33" = 230 DPI (below 200)
        // Y: 1080px / (600px / 96 DPI) = 1080 / 6.25" = 173 DPI (below 200)
        // Both below 200, so should return false
        expect(result).toBe(false)
      })

      it('should return true when DPI is exactly 300', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 2500, height: 1875 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        // X: 2500px / (800px / 96 DPI) = 2500 / 8.33" = 300 DPI (exactly 300)
        // Y: 1875px / (600px / 96 DPI) = 1875 / 6.25" = 300 DPI (exactly 300)
        // Both exactly 300, so should return true
        expect(result).toBe(true)
      })

      it('should handle custom screen DPI correctly', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 400, height: 300 },
          screenDPI: 192, // High DPI screen
        })

        // X: 1920px / (400px / 192 DPI) = 1920 / 2.08" = 922 DPI (above 300)
        // Y: 1080px / (300px / 192 DPI) = 1080 / 1.56" = 692 DPI (above 300)
        // Both above 300, so should return true
        expect(result).toBe(true)
      })
    })

    describe('with invalid inputs', () => {
      it('should return false when actualImageSize is invalid', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 0, height: 1080 },
          renderedImageSize: { width: 800, height: 600 },
          screenDPI: 96,
        })

        expect(result).toBe(false)
      })

      it('should return false when renderedImageSize is invalid', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 1920, height: 1080 },
          renderedImageSize: { width: 0, height: 600 },
          screenDPI: 96,
        })

        expect(result).toBe(false)
      })

      it('should use default screen DPI when not provided', () => {
        const result = ImageHelper.check200DPIFromRenderedSize({
          actualImageSize: { width: 3000, height: 2000 },
          renderedImageSize: { width: 800, height: 600 },
        })

        // Should use default 96 DPI and return true (same as first test)
        expect(result).toBe(true)
      })
    })
  })
})
