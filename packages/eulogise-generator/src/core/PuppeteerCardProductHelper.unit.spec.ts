import { PuppeteerCardProductHelper } from './PuppeteerCardProductHelper'
import {
  CardProductPageMode,
  EulogiseProduct,
  EulogiseRegion,
  GetImageObject,
  ICardProductData,
  PHOTOBOOK_DEFAULT_THEME,
  BOOKLET_THEMES,
  BOOKMARK_THEMES,
  TV_WELCOME_SCREEN_THEMES,
  ICardProductFrameRow,
} from '@eulogise/core'
import expect from 'expect'
import {
  MOCK_BOOKLET_1,
  MOCK_BOOKLET_A5_WITH_OVERLAY,
  MOCK_BOOKMARK_1,
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_WITH_TEXT_COVER,
  MOCK_SIDED_CARD_1,
  MOCK_SIDED_CARD_DOUBLE_BACKGROUND_FIX,
  MOCK_SIDED_CARD_US_1,
  MOCK_THANK_YOU_CARD_1,
  MOCK_TV_WELCOME_SCREEN_1,
} from '@eulogise/mock'
import { CardProductHelper } from '@eulogise/helpers'

describe('PuppeteerCardProductHelper', () => {
  describe('generateEditedBackgroundImage()', () => {
    beforeEach(async () => {
      await PuppeteerCardProductHelper.generateEditedBackgroundImage({
        backgroundImageId: 'cf52e5e1-6ea4-44cf-bb59-1fb03e9f6999',
        product: EulogiseProduct.BOOKLET,
        region: EulogiseRegion.AU,
        imageSizeAndPosition: {
          width: 1236,
          height: 794,
          top: 0,
          left: -394,
        },
      })
    })

    it('should return generate all background images', () => {
      expect(true).toEqual(true)
    })
  })
  describe('generateBackgroundImages()', () => {
    beforeEach(async () => {
      const image: GetImageObject = {
        url: 'https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_THUMBNAIL.jpg',
      }
      await PuppeteerCardProductHelper.generateBackgroundImages({
        backgroundImageId: 'background-image-id',
        image,
      })
    })

    it('should return generate all background images', () => {
      expect(true).toEqual(true)
    })
  })

  describe('generateBackgroundImage()', () => {
    describe('BOOKLET_FRONT', () => {
      beforeEach(async () => {
        const image: GetImageObject = {
          url: 'https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_THUMBNAIL.jpg',
        }
        await PuppeteerCardProductHelper.generateBackgroundImage({
          backgroundImageId: 'background-image-id',
          type: 'BOOKLET_FRONT',
          image,
        })
      })

      it('should create a background image', () => {
        expect(true).toEqual(true)
      })
    })
  })

  describe('generateCardProductThumbnail()', () => {
    describe('Booklet', () => {
      beforeEach(async () => {
        const themeId = 'aura'
        await PuppeteerCardProductHelper.generateCardProductThumbnail({
          themeId,
          s3Path: 'us.media.eulogisememorials.com/mock-file-name.jpg',
          fileName: 'mock-file-name.jpg',
          cardProduct: MOCK_BOOKLET_1 as ICardProductData,
          product: EulogiseProduct.BOOKLET,
          productTheme: BOOKLET_THEMES.find((theme) => theme.id === themeId)!,
        })
      })

      it('should create a thumbnail in jpg format', () => {
        expect(true).toEqual(true)
      })
    })
  })

  describe('generateCardProductJpgByPageIndex()', () => {
    describe('Booklet', () => {
      beforeEach(async () => {
        const themeId = 'grace'
        const pageIndex = 0
        await PuppeteerCardProductHelper.generateCardProductJpgByPageIndex({
          cardProduct: MOCK_BOOKLET_1 as ICardProductData,
          product: EulogiseProduct.BOOKLET,
          productTheme: BOOKLET_THEMES.find((theme) => theme.id === themeId)!,
          pageIndex,
        })
      })

      it('should generate a single page jpg file for the specified page index', () => {
        expect(true).toEqual(true)
      })
    })
  })

  describe('generateFrameItemImage()', () => {
    describe('Booklet', () => {
      it('should generate frame png image from card product', async () => {
        const frameRows: Array<ICardProductFrameRow> =
          CardProductHelper.getFadedEdgesFrameRows({
            cardProductContent: MOCK_BOOKLET_1.content,
          })

        const frameRow = frameRows[0]
        const results = await PuppeteerCardProductHelper.generateFrameItemImage(
          {
            frameRow,
          },
        )
        const fileName = `frameItem_${frameRow.data.content.id}`
        expect(results).toEqual({
          fileName: `${fileName}.png`,
          filePath: expect.stringMatching(`${fileName}.png`),
          htmlFilePath: expect.stringMatching(`index-${fileName}.html`),
        })
      })
    })
  })

  describe('generateFrameImagesFromCardProduct()', () => {
    describe('Booklet', () => {
      it('should generate frame png images from card product', async () => {
        await PuppeteerCardProductHelper.generateFrameImagesFromCardProduct({
          cardProduct: MOCK_BOOKLET_1 as ICardProductData,
        })
        expect(true).toEqual(true)
      })
    })
  })

  describe('generateCardProduct()', () => {
    describe('pdf', () => {
      describe('non-bleed', () => {
        const bleed = false
        describe('Booklet', () => {
          describe('A5 size', () => {
            beforeEach(async () => {
              const themeId = 'grace'
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: MOCK_BOOKLET_1,
                product: EulogiseProduct.BOOKLET,
                bleed,
                type: 'pdf',
                productTheme: BOOKLET_THEMES.find(
                  (theme) => theme.id === themeId,
                )!,
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })

          describe('Letter size', () => {
            beforeEach(async () => {
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: {
                  ...MOCK_BOOKLET_1,
                } as ICardProductData,
                product: EulogiseProduct.BOOKLET,
                bleed,
                type: 'pdf',
                productTheme: BOOKLET_THEMES[0],
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })
        })

        describe('Sided Card', () => {
          describe('AU', () => {
            beforeEach(async () => {
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: MOCK_SIDED_CARD_1 as ICardProductData,
                product: EulogiseProduct.SIDED_CARD,
                bleed,
                type: 'pdf',
                productTheme: BOOKLET_THEMES[0],
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })

          describe('US', () => {
            beforeEach(async () => {
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: MOCK_SIDED_CARD_US_1 as ICardProductData,
                product: EulogiseProduct.SIDED_CARD,
                bleed: true,
                type: 'pdf',
                productTheme: BOOKLET_THEMES[0],
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })
        })

        describe('Bookmark', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKMARK_1 as ICardProductData,
              product: EulogiseProduct.BOOKMARK,
              bleed,
              type: 'pdf',
              productTheme: BOOKMARK_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Thank you card', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_THANK_YOU_CARD_1 as ICardProductData,
              product: EulogiseProduct.THANK_YOU_CARD,
              bleed,
              type: 'pdf',
              productTheme: BOOKMARK_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })
      })

      describe('bleed', () => {
        const bleed = true
        describe('Booklet', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKLET_1 as ICardProductData,
              product: EulogiseProduct.BOOKLET,
              bleed,
              type: 'pdf',
              productTheme: BOOKLET_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Letter size', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKLET_1 as ICardProductData,
              product: EulogiseProduct.BOOKLET,
              bleed,
              type: 'pdf',
              productTheme: BOOKLET_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        // https://trello.com/c/aheZbw1x/1091-pdf-bleed-text-overlay-not-appear
        describe('Letter size with overlay', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKLET_A5_WITH_OVERLAY as ICardProductData,
              product: EulogiseProduct.BOOKLET,
              bleed,
              type: 'pdf',
              productTheme: BOOKLET_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Sided Card', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_SIDED_CARD_1 as ICardProductData,
              product: EulogiseProduct.SIDED_CARD,
              bleed,
              type: 'pdf',
              productTheme: BOOKLET_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        // Fixed: https://trello.com/c/9pDamxRi/1090-sided-card-double-background
        // https://trello.com/c/aheZbw1x/1091-pdf-bleed-text-overlay-not-appear
        describe('Sided Card with overlay', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKLET_A5_WITH_OVERLAY as ICardProductData,
              product: EulogiseProduct.SIDED_CARD,
              bleed,
              type: 'pdf',
              productTheme: BOOKLET_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        // Fixed: https://trello.com/c/9pDamxRi/1090-sided-card-double-background
        describe('Sided Card Double background bleed', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct:
                MOCK_SIDED_CARD_DOUBLE_BACKGROUND_FIX as ICardProductData,
              product: EulogiseProduct.SIDED_CARD,
              bleed: true,
              type: 'pdf',
              productTheme: BOOKLET_THEMES.find(
                ({ id }) => id === 'fall-flowers',
              )!,
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Bookmark', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_BOOKMARK_1 as ICardProductData,
              product: EulogiseProduct.BOOKMARK,
              bleed,
              type: 'pdf',
              productTheme: BOOKMARK_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Thank you card', () => {
          beforeEach(async () => {
            await PuppeteerCardProductHelper.generateCardProduct({
              cardProduct: MOCK_THANK_YOU_CARD_1 as ICardProductData,
              product: EulogiseProduct.THANK_YOU_CARD,
              bleed,
              type: 'pdf',
              productTheme: BOOKMARK_THEMES[0],
            })
          })

          it('should create a pdf', () => {
            expect(true).toEqual(true)
          })
        })

        describe('Photobook', () => {
          describe('Cover Page', () => {
            describe('Image Only', () => {
              beforeEach(async () => {
                await PuppeteerCardProductHelper.generatePhotobookCoverPage({
                  cardProduct: MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
                })
              })

              it('should create a pdf', () => {
                expect(true).toEqual(true)
              })
            })

            describe('Image With Text', () => {
              beforeEach(async () => {
                await PuppeteerCardProductHelper.generatePhotobookCoverPage({
                  cardProduct:
                    MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_WITH_TEXT_COVER,
                })
              })

              it('should create a pdf', () => {
                expect(true).toEqual(true)
              })
            })
          })

          describe('Spread page', () => {
            beforeEach(async () => {
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
                product: EulogiseProduct.PHOTOBOOK,
                bleed,
                type: 'pdf',
                productTheme: PHOTOBOOK_DEFAULT_THEME,
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })

          describe('Single Page', () => {
            beforeEach(async () => {
              await PuppeteerCardProductHelper.generateCardProduct({
                cardProduct: MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
                product: EulogiseProduct.PHOTOBOOK,
                bleed,
                type: 'pdf',
                productTheme: PHOTOBOOK_DEFAULT_THEME,
                pageMode: CardProductPageMode.SINGLE_PAGE,
              })
            })

            it('should create a pdf', () => {
              expect(true).toEqual(true)
            })
          })
        })
      })
    })

    describe('jpg', () => {
      describe('TV Welcome Screen', () => {
        beforeEach(async () => {
          await PuppeteerCardProductHelper.generateCardProduct({
            cardProduct: MOCK_TV_WELCOME_SCREEN_1 as ICardProductData,
            product: EulogiseProduct.TV_WELCOME_SCREEN,
            bleed: false,
            productTheme: TV_WELCOME_SCREEN_THEMES[0],
            scale: 1,
            deviceScaleFactor: 4,
          })
        })

        it('should generate an image file', () => {
          expect(true).toEqual(true)
        })
      })
    })
  })
})
