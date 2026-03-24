import { PhotobookHelper } from './PhotobookHelper'
import {
  CardProductContentItemType,
  CardProductPageSize,
  EulogiseCountry,
  EulogiseImageOrientation,
  EulogisePhotobookCoverType,
  ICardProductFrameImageContent,
  ICardProductFrameRow,
  ICardProductPage,
  ICardProductRow,
  ICardProductSpaceRow,
  ICardProductTextRow,
  MAX_CARD_PRODUCT_IMAGES_PER_FRAME,
} from '@eulogise/core'

describe('PhotobookHelper', () => {
  describe('getFrameLayoutsMatchPartialImageOrientations()', () => {
    describe('[PORTRAIT, LANDSCAPE]', () => {
      const imageOrientations: Array<EulogiseImageOrientation> = [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
      ]

      it('should return all frame layouts that match the partial image orientations', () => {
        const result =
          PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
            imageOrientations,
          )
        console.log('JSON', JSON.stringify(result))
        expect(result.length).toEqual(16)
      })
    })

    describe('[PORTRAIT, LANDSCAPE, SQUARE]', () => {
      const imageOrientations: Array<EulogiseImageOrientation> = [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.SQUARE,
      ]

      it('should return all frame layouts that match the partial image orientations', () => {
        const result =
          PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
            imageOrientations,
          )
        console.log('JSON', JSON.stringify(result))
        expect(result.length).toEqual(16)
      })
    })

    describe('[PORTRAIT, LANDSCAPE, PORTRAIT]', () => {
      const imageOrientations: Array<EulogiseImageOrientation> = [
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
      ]

      it('should return all frame layouts that match the partial image orientations', () => {
        const result =
          PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
            imageOrientations,
          )
        console.log('JSON', JSON.stringify(result))
        expect(result.length).toEqual(6)
      })
    })

    describe('[LANDSCAPE, PORTRAIT, PORTRAIT]', () => {
      const imageOrientations: Array<EulogiseImageOrientation> = [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.PORTRAIT,
        EulogiseImageOrientation.PORTRAIT,
      ]

      it('should return all frame layouts that match the partial image orientations', () => {
        const result =
          PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
            imageOrientations,
          )
        console.log('JSON', JSON.stringify(result))
        expect(result.length).toEqual(9)
      })
    })

    describe('[LANDSCAPE, LANDSCAPE, LANDSCAPE]', () => {
      const imageOrientations: Array<EulogiseImageOrientation> = [
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
        EulogiseImageOrientation.LANDSCAPE,
      ]

      it('should return all frame layouts that match the partial image orientations', () => {
        const result =
          PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
            imageOrientations,
          )
        console.log('JSON', JSON.stringify(result))
        expect(result.length).toEqual(16)
      })
    })
  })

  describe('allocateFramesToPagesBasedOnImageOrientations()', () => {
    const noOfPages = 5
    const imageAssets: Array<ICardProductFrameImageContent> = [
      {
        filestackHandle: 'handle1',
        orientation: EulogiseImageOrientation.PORTRAIT,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle2',
        orientation: EulogiseImageOrientation.LANDSCAPE,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle3',
        orientation: EulogiseImageOrientation.SQUARE,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle4',
        orientation: EulogiseImageOrientation.LANDSCAPE,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle5',
        orientation: EulogiseImageOrientation.PORTRAIT,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle6',
        orientation: EulogiseImageOrientation.LANDSCAPE,
      } as ICardProductFrameImageContent,
      {
        filestackHandle: 'handle7',
        orientation: EulogiseImageOrientation.PORTRAIT,
      } as ICardProductFrameImageContent,
    ]

    it('should allocate frames to pages based on image orientations', () => {
      const result =
        PhotobookHelper.allocateFramesToPagesBasedOnImageOrientations({
          imageAssets,
          noOfPages,
        })
      console.log('JSON', JSON.stringify(result))
      expect(result.length).toEqual(5)
    })
  })

  describe('getPhotoRangeFromPages', () => {
    describe('noOfPages = 24', () => {
      const noOfPages = 24
      it('should return the correct photo range for a given number of pages', () => {
        const result = PhotobookHelper.getPhotoRangeFromPages({ noOfPages })
        expect(result).toEqual({
          minPhotos: 0,
          maxPhotos: 60,
          range: '0-60',
        })
      })
    })

    describe('noOfPages = 48', () => {
      const noOfPages = 48
      it('should return the correct photo range for a given number of pages', () => {
        const result = PhotobookHelper.getPhotoRangeFromPages({ noOfPages })
        expect(result).toEqual({
          minPhotos: 101,
          maxPhotos: 120,
          range: '101-120',
        })
      })
    })

    describe('noOfPages = 112', () => {
      const noOfPages = 112
      it('should return the correct photo range for a given number of pages', () => {
        const result = PhotobookHelper.getPhotoRangeFromPages({ noOfPages })
        expect(result).toEqual({
          minPhotos: 261,
          maxPhotos: 280,
          range: '261-280',
        })
      })
    })

    describe('noOfPages = 124', () => {
      const noOfPages = 124
      it('should return the correct photo range for a given number of pages', () => {
        const result = PhotobookHelper.getPhotoRangeFromPages({ noOfPages })
        expect(result).toEqual({
          minPhotos: undefined,
          maxPhotos: 281,
          range: '281+',
        })
      })
    })
  })

  describe('getPhotobookPageOptions', () => {
    it('should return the correct page options for a given number of pages', () => {
      const result = PhotobookHelper.getPhotobookPageOptions()
      console.log('results', JSON.stringify(result))
      expect(result).toEqual([
        { label: '24 (Recommended for 0-60 Photos)', value: 24 },
        { label: '32 (Recommended for 61-80 Photos)', value: 32 },
        { label: '40 (Recommended for 81-100 Photos)', value: 40 },
        { label: '48 (Recommended for 101-120 Photos)', value: 48 },
        { label: '56 (Recommended for 121-140 Photos)', value: 56 },
        { label: '64 (Recommended for 141-160 Photos)', value: 64 },
        { label: '72 (Recommended for 161-180 Photos)', value: 72 },
        { label: '80 (Recommended for 181-200 Photos)', value: 80 },
        { label: '88 (Recommended for 201-220 Photos)', value: 88 },
        { label: '96 (Recommended for 221-240 Photos)', value: 96 },
        { label: '104 (Recommended for 241-260 Photos)', value: 104 },
        { label: '112 (Recommended for 261-280 Photos)', value: 112 },
        { label: '120 (Recommended for 281+ Photos)', value: 120 },
      ])
    })
  })

  describe('getRecommendedPhotobookPages', () => {
    describe('noOfPhotos = 30', () => {
      const noOfPhotos = 30

      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(24)
        expect(result.range).toEqual('0-60')
      })
    })

    describe('noOfPhotos = 61', () => {
      const noOfPhotos = 61
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(32)
        expect(result.range).toEqual('61-80')
      })
    })

    describe('noOfPhotos = 91', () => {
      const noOfPhotos = 91
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(40)
        expect(result.range).toEqual('81-100')
      })
    })

    describe('noOfPhotos = 111', () => {
      const noOfPhotos = 111
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(48)
        expect(result.range).toEqual('101-120')
      })
    })

    describe('noOfPhotos = 140', () => {
      const noOfPhotos = 140
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(56)
        expect(result.range).toEqual('121-140')
      })
    })

    describe('noOfPhotos = 280', () => {
      const noOfPhotos = 280
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(112)
        expect(result.range).toEqual('261-280')
      })
    })

    describe('noOfPhotos = 300', () => {
      const noOfPhotos = 300
      it('should return the recommended number of pages for a given product', () => {
        const result = PhotobookHelper.getRecommendedPhotobookPages({
          noOfPhotos,
        })
        expect(result.recommendedPages).toEqual(120)
        expect(result.range).toEqual('281+')
      })
    })
  })

  describe('getPhotobookTitlePageLayouts', () => {
    it('should return the default theme', () => {
      const variables = {
        deceasedName: 'Someone Name',
        dateOfBirth: '01 Jan 2000',
        dateOfDeath: '01 Jan 2020',
      }
      const result = PhotobookHelper.getPhotobookTitlePageLayouts({
        variables,
        isCreation: true,
      })
      const resultString = JSON.stringify(result)
      // should converted all the keys into values
      Object.values(variables).forEach((value) => {
        expect(resultString).toMatch(value)
      })
      Object.keys(variables).forEach((value) => {
        expect(resultString).not.toMatch(value)
      })
    })
  })

  describe('allocateFramesToPagesRandomly()', () => {
    describe('availableImages = 0', () => {
      const noOfPages = 15
      const noOfAvailableImages = 0

      it('should randomly allocate frames', () => {
        PhotobookHelper.allocateFramesToPagesRandomly({
          noOfPages,
          noOfAvailableImages,
        }).forEach((noOfImages) => {
          expect(noOfImages).toBeGreaterThanOrEqual(1)
          expect(noOfImages).toBeLessThanOrEqual(6)
        })
      })
    })

    describe('availableImages < noOfPages', () => {
      const noOfPages = 15
      const noOfAvailableImages = 6

      it('should randomly allocate frames', () => {
        PhotobookHelper.allocateFramesToPagesRandomly({
          noOfPages,
          noOfAvailableImages,
        }).forEach((noOfImages) => {
          expect(noOfImages).toBeGreaterThanOrEqual(1)
          expect(noOfImages).toBeLessThanOrEqual(6)
        })
      })
    })

    describe('availableImages > noOfPages', () => {
      const noOfPages = 5
      const noOfAvailableImages = 15

      it('should allocate frames to pages randomly and use all images without no extra spaces', () => {
        let totalImages = 0
        PhotobookHelper.allocateFramesToPagesRandomly({
          noOfPages,
          noOfAvailableImages,
        }).forEach((noOfImages) => {
          expect(noOfImages).toBeGreaterThanOrEqual(1)
          expect(noOfImages).toBeLessThanOrEqual(6)
          totalImages += noOfImages
        })
        expect(totalImages).toBe(noOfAvailableImages)
      })
    })

    describe('Too many images > 6 images per page', () => {
      const noOfPages = 5
      const noOfAvailableImages = 30

      it('should allocate images to the maximum size frames (6)', () => {
        let totalImages = 0
        PhotobookHelper.allocateFramesToPagesRandomly({
          noOfPages,
          noOfAvailableImages,
        }).forEach((noOfImages, index) => {
          if (index === 0) {
            expect(noOfImages).toEqual(1)
          } else {
            expect(noOfImages).toEqual(MAX_CARD_PRODUCT_IMAGES_PER_FRAME)
          }
          totalImages += noOfImages
        })
        // minus 5 because the first page has only 1 image
        expect(totalImages).toBe(
          noOfPages * MAX_CARD_PRODUCT_IMAGES_PER_FRAME - 5,
        )
      })
    })
  })

  describe('resizeTitlePageToFit()', () => {
    const createMockPage = (rows: ICardProductRow[]): ICardProductPage => ({
      rows,
      background: {
        image: {},
      },
    })

    const createSpaceRow = (height: number): ICardProductSpaceRow => ({
      id: 'space1',
      type: CardProductContentItemType.SPACE,
      data: {
        height,
      },
    })

    const createFrameRow = (
      height: number,
      width: number = 500,
    ): ICardProductFrameRow => ({
      id: 'frame1',
      type: CardProductContentItemType.FRAME,
      data: {
        height,
        width,
        content: {
          height,
          width,
          id: 'content1',
          type: 'rows',
          items: [],
        },
      },
    })

    const createTextRow = (height: number): ICardProductTextRow => ({
      id: 'text1',
      type: CardProductContentItemType.TEXT,
      data: {
        height,
        content: {
          blocks: [
            {
              text: 'Test text',
              type: 'unstyled',
              key: 'test1',
              entityRanges: [],
              depth: 0,
              data: {},
              inlineStyleRanges: [],
            },
          ],
          entityMap: {},
        },
      },
    })

    describe('when page size is not supported', () => {
      it('should return the original page unchanged', () => {
        const page = createMockPage([createSpaceRow(100)])
        const result = PhotobookHelper.resizeTitlePageLayoutToFit({
          page,
          pageSize: CardProductPageSize.A5,
        })
        expect(result).toBe(page)
      })
    })

    describe('when content fits within available height', () => {
      it('should return the original page unchanged', () => {
        const page = createMockPage([
          createSpaceRow(50),
          createFrameRow(200),
          createTextRow(30),
        ])
        const result = PhotobookHelper.resizeTitlePageLayoutToFit({
          page,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        })
        expect(result).toBe(page)
      })
    })

    describe('when content exceeds available height', () => {
      describe('and space element can absorb the reduction', () => {
        it('should resize only the space element', () => {
          const page = createMockPage([
            createSpaceRow(100),
            createFrameRow(300),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          // Check immutability
          expect(result).not.toBe(page)
          expect((page.rows[0] as ICardProductSpaceRow).data?.height).toBe(100) // Original unchanged

          // Check space was resized
          const spaceRow = result.rows[0] as ICardProductSpaceRow
          expect(spaceRow.data?.height).toBeLessThan(100)
          expect(spaceRow.data?.height).toBeGreaterThanOrEqual(10) // Minimum height

          // Check frame was not resized
          const frameRow = result.rows[1] as ICardProductFrameRow
          expect(frameRow.data?.height).toBe(300)
        })

        it('should not resize space below minimum height', () => {
          const page = createMockPage([
            createSpaceRow(15),
            createFrameRow(400),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const spaceRow = result.rows[0] as ICardProductSpaceRow
          expect(spaceRow.data?.height).toBeGreaterThanOrEqual(10)
        })
      })

      describe('and space reduction is not sufficient', () => {
        it('should resize both space and frame elements', () => {
          const page = createMockPage([
            createSpaceRow(50),
            createFrameRow(450),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          // Check immutability
          expect(result).not.toBe(page)

          // Check space was resized to minimum
          const spaceRow = result.rows[0] as ICardProductSpaceRow
          expect(spaceRow.data?.height).toBe(10)

          // Check frame was also resized
          const frameRow = result.rows[1] as ICardProductFrameRow
          expect(frameRow.data?.height).toBeLessThan(450)
          expect(frameRow.data?.height).toBeGreaterThanOrEqual(100) // Minimum height

          // Check frame content height matches frame height
          expect(frameRow.data?.content?.height).toBe(frameRow.data?.height)
        })

        it('should maintain aspect ratio when resizing frame', () => {
          const originalHeight = 400
          const originalWidth = 600
          const page = createMockPage([
            createSpaceRow(50),
            createFrameRow(originalHeight, originalWidth),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const frameRow = result.rows[1] as ICardProductFrameRow
          const newHeight = frameRow.data?.height || 0
          const newWidth = frameRow.data?.width || 0

          // Calculate the expected aspect ratio
          const originalAspectRatio = originalWidth / originalHeight
          const newAspectRatio = newWidth / newHeight

          // Check that aspect ratio is maintained (allowing for rounding)
          expect(newAspectRatio).toBeCloseTo(originalAspectRatio, 2)

          // Also check that content dimensions match frame dimensions
          expect(frameRow.data?.content?.height).toBe(newHeight)
          expect(frameRow.data?.content?.width).toBe(newWidth)
        })

        it('should not resize frame below minimum height', () => {
          const page = createMockPage([
            createSpaceRow(20),
            createFrameRow(600),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const frameRow = result.rows[1] as ICardProductFrameRow
          expect(frameRow.data?.height).toBeGreaterThanOrEqual(100)
        })
      })

      describe('when there is no space element', () => {
        /*it('should resize only the frame element', () => {
          const page = createMockPage([createFrameRow(400), createTextRow(50)])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const frameRow = result.rows[0] as ICardProductFrameRow
          expect(frameRow.data?.height).toBeLessThan(400)
          expect(frameRow.data?.content?.height).toBe(frameRow.data?.height)
        })*/

        it('should maintain aspect ratio when resizing frame without space element', () => {
          const originalHeight = 500
          const originalWidth = 400
          const page = createMockPage([
            createFrameRow(originalHeight, originalWidth),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const frameRow = result.rows[0] as ICardProductFrameRow
          const newHeight = frameRow.data?.height || 0
          const newWidth = frameRow.data?.width || 0

          // Calculate the expected aspect ratio
          const originalAspectRatio = originalWidth / originalHeight
          const newAspectRatio = newWidth / newHeight

          // Check that aspect ratio is maintained
          expect(newAspectRatio).toBeCloseTo(originalAspectRatio, 2)
        })
      })

      describe('when there is no frame element', () => {
        it('should resize only the space element', () => {
          const page = createMockPage([createSpaceRow(450), createTextRow(50)])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          })

          const spaceRow = result.rows[0] as ICardProductSpaceRow
          expect(spaceRow.data?.height).toBeLessThan(450)
        })
      })
    })

    describe('with different page sizes', () => {
      const testPageSizes = [
        CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM,
        CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
        CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE,
      ]

      testPageSizes.forEach((pageSize) => {
        it(`should work correctly for ${pageSize}`, () => {
          const page = createMockPage([
            createSpaceRow(100),
            createFrameRow(500),
            createTextRow(50),
          ])

          const result = PhotobookHelper.resizeTitlePageLayoutToFit({
            page,
            pageSize,
          })

          expect(result).not.toBe(page)
          // The exact resizing will depend on the page size dimensions
          // but the function should execute without errors
        })
      })
    })

    describe('edge cases', () => {
      it('should handle empty rows array', () => {
        const page = createMockPage([])
        const result = PhotobookHelper.resizeTitlePageLayoutToFit({
          page,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        })
        expect(result).toBe(page)
      })

      it('should handle rows without data', () => {
        const page: ICardProductPage = {
          rows: [
            {
              id: 'row1',
              type: CardProductContentItemType.SPACE,
            } as ICardProductSpaceRow,
          ],
          background: {
            image: {},
          },
        }

        const result = PhotobookHelper.resizeTitlePageLayoutToFit({
          page,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        })
        expect(result).toBe(page)
      })

      it('should handle rows without height property', () => {
        const page: ICardProductPage = {
          rows: [
            {
              id: 'row1',
              type: CardProductContentItemType.SPACE,
              data: {},
            } as ICardProductSpaceRow,
          ],
          background: {
            image: {},
          },
        }

        const result = PhotobookHelper.resizeTitlePageLayoutToFit({
          page,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
        })
        expect(result).toBe(page)
      })
    })

    describe('calculatePhotobookPrice', () => {
      it('should calculate price for MILK_PREMIUM_MEDIUM with base pages', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 24,
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(68.0)
      })

      it('should calculate price for MILK_PREMIUM_MEDIUM with extra pages', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 32, // 8 extra pages
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(68.0 + 8 * 1.8) // Base price + 8 extra pages * $1.8
      })

      it('should calculate price for MILK_PREMIUM_MEDIUM with vegan leather', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 24,
          coverType: EulogisePhotobookCoverType.MERLOT_VEGAN_LEATHER,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(68.0 + 11.0) // Base price + vegan leather addon
      })

      it('should calculate price for MILK_PREMIUM_LARGE with base pages', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 24,
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(135.0)
      })

      it('should calculate price for MILK_PREMIUM_LARGE with extra pages', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 32, // 8 extra pages
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(135.0 + 8 * 2.5) // Base price + 8 extra pages * $2.5
      })

      it('should calculate price for MILK_PREMIUM_LARGE with vegan leather', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 24,
          coverType: EulogisePhotobookCoverType.BLACK_VEGAN_LEATHER,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(135.0 + 17.0) // Base price + vegan leather addon
      })

      it('should calculate price for MILK_PREMIUM_LARGE with extra pages and vegan leather', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 40, // 16 extra pages
          coverType: EulogisePhotobookCoverType.EMERALD_VEGAN_LEATHER,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(135.0 + 16 * 2.5 + 17.0) // Base + extra pages + vegan leather
      })

      it('should use MILK_PREMIUM_MEDIUM as default when pageSize is not provided', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 24,
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(68.0) // MILK_PREMIUM_MEDIUM base price
      })

      it('should apply minimum extra pages when less than MIN_EXTRA_PAGES', () => {
        const price = PhotobookHelper.calculatePhotobookPrice({
          noOfPages: 26, // 2 extra pages (less than minimum 4)
          coverType: EulogisePhotobookCoverType.SALT_LINEN,
          pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
          country: EulogiseCountry.UNITED_STATES,
        })
        expect(price).toBe(68.0 + 4 * 1.8) // Base price + minimum 4 extra pages
      })
    })
  })
})
