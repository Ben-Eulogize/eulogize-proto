import {
  CardProductHelper,
  ICardProductFramePayload,
} from './CardProductHelper'
import {
  BleedPageMode,
  BOOKLET_THEMES,
  BOOKMARK_THEMES,
  CardProductBorderThicknessType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  CardProductPageMode,
  CardProductPageOrientation,
  CardProductPageSize,
  CardProductViewDisplayMode,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductContent,
  ICardProductData,
  ICardProductFadeEdgeType,
  ICardProductFrameImageContent,
  ICardProductFrameItem,
  ICardProductFrameRow,
  ICardProductImageType,
  ICardProductPage,
  ICardProductState,
  ICardProductTextRow,
  ICardProductTheme,
  MemorialVisualStatus,
  THANK_YOU_CARD_THEMES,
  TV_WELCOME_SCREEN_THEMES,
  CardProductBorderCategory,
} from '@eulogise/core'
import {
  MOCK_BOOKLET_1,
  MOCK_BOOKLET_WITH_BORDER,
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
  MOCK_THEMES,
} from '@eulogise/mock'
import R from 'ramda'
import { ThemeHelper } from './ThemeHelper'
import { ImageHelper } from './ImageHelper'
import { EulogiseClientConfig } from '@eulogise/client-core'

describe('CardProductHelper', () => {
  let results: any

  describe('getCardProductImageFilestackHandles', () => {
    const photobook = MOCK_BOOKLET_1

    it('should return all image filestack handles', () => {
      const handles =
        CardProductHelper.getCardProductImageFilestackHandles(photobook)
      expect(handles).toEqual([
        'INtXnkWgTpWgXNVwFX1J',
        'SRArRHO3TVOSn2fPkwwo',
        '2z9EQUyT8SBGpheu9O4j',
        'NyxVppSQuamRyMzplW9d',
      ])
    })
  })

  describe('getAllImageFilestackHandles', () => {
    const photobook = MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1

    it('should return all image filestack handles', () => {
      const [coverPage] = CardProductHelper.getAllImageFilestackHandles(
        photobook,
      ) as Array<string>
      expect(coverPage).toEqual('mmDqGAtXSLa6pQD93Jb5')
    })
  })

  describe('addCacheBusterToCssBackground', () => {
    it('should add cache buster to the css background url', () => {
      const url = 'url("https://example.com/image.jpg")'
      const cacheBustedUrl =
        CardProductHelper.addCacheBusterToCssBackground(url)
      expect(cacheBustedUrl).toMatch(
        /url\("https:\/\/example\.com\/image\.jpg\?cacheBuster=\d{13}"\)/,
      )
    })

    it('should add cache buster to the css background urls', () => {
      const url =
        'url("https://example.com/image.jpg"), url("https://example.com/image2.jpg")'
      const cacheBustedUrl =
        CardProductHelper.addCacheBusterToCssBackground(url)

      expect(cacheBustedUrl).toMatch(
        /url\("https:\/\/example\.com\/image\.jpg\?cacheBuster=\d{13}"\), url\("https:\/\/example\.com\/image2\.jpg\?cacheBuster=\d{13}"\)/,
      )
    })

    it('should add cache buster to the css background urls with position', () => {
      const url =
        'url("https://example.com/image.jpg"), url("https://example.com/image2.jpg") center center'
      const cacheBustedUrl =
        CardProductHelper.addCacheBusterToCssBackground(url)

      expect(cacheBustedUrl).toMatch(
        /url\("https:\/\/example\.com\/image\.jpg\?cacheBuster=\d{13}"\), url\("https:\/\/example\.com\/image2\.jpg\?cacheBuster=\d{13}"\) center center/,
      )
    })
  })

  describe('preCardProductSaveUpdate', () => {
    describe('no primary image', () => {
      /*
      const cardProductData = {
        pages: [
          {
            rows: [
              {
                id: 'row-id',
                type: CardProductContentItemType.FRAME,
                data: {
                  content: {
                    type: 'content',
                    height: 300,
                    width: 235,
                    content: {
                      type: 'image',
                      filestackHandle: '1cMQnRUSGmLwqM74BQkM',
                    },
                  },
                },
              },
            ],
          },
        ],
      } as ICardProductContent
*/

      // can't really test this one as preloadImage() is using in browser "onload" behavior
      it('should return the same cardProductData', async () => {
        /*
        results = await CardProductHelper.preCardProductSaveUpdate(
          cardProductData,
        )
        expect(results).toEqual(cardProductData)
*/
      })
    })

    describe('primary image exists', () => {
      const filestackHandle = 'image-handle'
      const cardProductData = {
        pages: [
          {
            rows: [
              {
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
                id: 'row-id',
                data: {
                  content: {
                    type: 'content',
                    content: {
                      type: 'image',
                      filestackHandle,
                    },
                  },
                },
              },
            ],
          },
        ],
      } as ICardProductContent

      it('should return the same cardProductData with updated primary image', async () => {
        results = await CardProductHelper.preCardProductSaveUpdate(
          cardProductData,
        )
        expect(results).toEqual(cardProductData)
      })
    })
  })

  describe('isAllowAutoRepopulatePrimaryImage', () => {
    describe('activeCase is undefined', () => {
      it('should return false', () => {
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            activeCase: undefined,
            // @ts-expect-error
            cardProduct: {},
          }),
        ).toEqual(false)
      })
    })

    describe('cardProduct is undefined', () => {
      it('should return false', () => {
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            // @ts-expect-error
            activeCase: {},
            cardProduct: undefined,
          }),
        ).toEqual(false)
      })
    })

    describe('cardProduct status is not THEME_SELECTED', () => {
      it('should return false', () => {
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            // @ts-expect-error
            activeCase: {},
            // @ts-expect-error
            cardProduct: {
              status: MemorialVisualStatus.EDITED,
            },
          }),
        ).toEqual(false)
      })
    })

    describe('activeCase primaryImage is not set', () => {
      it('should return false', () => {
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            activeCase: {
              // @ts-expect-error
              deceased: {},
            },
            // @ts-expect-error
            cardProduct: {
              status: MemorialVisualStatus.THEME_SELECTED,
            },
          }),
        ).toEqual(false)
      })
    })

    describe('activeCase primaryImage is same as the primary image in the cardProduct', () => {
      it('should return false', () => {
        const filestackHandle = 'image-handle'
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            activeCase: {
              deceased: {
                // @ts-expect-error
                primaryImage: {
                  filestackHandle,
                },
              },
            },
            cardProduct: {
              status: MemorialVisualStatus.THEME_SELECTED,
              content: {
                pages: [
                  {
                    rows: [
                      {
                        dynamicDataId: CardProductDynamicDataKey.primaryImage,
                        id: 'row-id',
                        data: {
                          content: {
                            type: 'content',
                            content: {
                              type: 'image',
                              filestackHandle,
                            } as ICardProductFrameImageContent,
                          },
                        },
                      },
                    ],
                  },
                ],
              } as ICardProductContent,
            } as ICardProductData,
          }),
        ).toEqual(false)
      })
    })

    describe('activeCase primary image is different from the primary image in the cardProduct', () => {
      it('should return true', () => {
        const filestackHandle = 'image-handle'
        expect(
          CardProductHelper.isAllowAutoRepopulatePrimaryImage({
            activeCase: {
              deceased: {
                // @ts-expect-error
                primaryImage: {
                  filestackHandle,
                },
              },
            },
            cardProduct: {
              status: MemorialVisualStatus.THEME_SELECTED,
              content: {
                pages: [
                  {
                    rows: [
                      {
                        dynamicDataId: CardProductDynamicDataKey.primaryImage,
                        id: 'row-id',
                        data: {
                          content: {
                            type: 'content',
                            content: {
                              type: 'image',
                              filestackHandle: 'different-image-handle',
                            } as ICardProductFrameImageContent,
                          },
                        },
                      },
                    ],
                  },
                ],
              } as ICardProductContent,
            } as ICardProductData,
          }),
        ).toEqual(true)
      })
    })
  })

  describe('getPrimaryImageSrc', () => {
    const filestackHandle = 'Ip3HJBgoS6O7JN6M8hvi'
    const cardProductData = {
      pages: [
        { rows: [] },
        {
          rows: [
            {
              id: 'mock-row-id',
              dynamicDataId: CardProductDynamicDataKey.primaryImage,
              type: CardProductContentItemType.FRAME,
              data: {
                content: {
                  type: 'rows',
                  items: [
                    {
                      type: 'content',
                      content: {
                        filename:
                          'oc2woTVWSqyqfLn6c8eM_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
                        type: 'image',
                        filepath:
                          'cases/e20cb2ec-5224-4e6d-a427-b6033bec66b5/gallery/oc2woTVWSqyqfLn6c8eM_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
                        filestackHandle,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    } as ICardProductContent

    it('should return primary image src', () => {
      results = CardProductHelper.getPrimaryImageSrc(cardProductData)
      expect(results).toEqual(
        `${EulogiseClientConfig.FILESTACK_CDN}/auto_image/${filestackHandle}`,
      )
    })
  })

  describe('convertDynamicTheme', () => {
    const themeId = 'granduer'

    describe('{{{deceasedName}}}', () => {
      const mockProductTheme = {
        id: themeId,
        defaultContent: [
          {
            rows: [
              {
                id: 'mock-row-id',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        text: '{{{deceasedName}}}',
                      },
                    ],
                  },
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              } as ICardProductTextRow,
            ],
          },
        ],
      } as ICardProductTheme

      beforeEach(() => {
        results = CardProductHelper.convertDynamicTheme({
          themeId,
          product: EulogiseProduct.BOOKLET,
          productTheme: mockProductTheme,
        })
      })

      it('should replace {{{deceasedName}}} with the default deceased name name', () => {
        // look at before and after
        expect(results).toEqual([
          {
            rows: [
              {
                id: 'mock-row-id',
                type: CardProductContentItemType.TEXT,
                data: {
                  content: {
                    blocks: [
                      {
                        text: 'Deceased Name',
                      },
                    ],
                  },
                },
                dynamicDataId: CardProductDynamicDataKey.deceasedName,
              } as ICardProductTextRow,
            ],
          },
        ])
      })
    })

    describe('<<&primaryImage>>', () => {
      const mockProductTheme = {
        id: themeId,
        defaultContent: [
          {
            rows: [
              {
                id: 'mock-row-id',
                type: CardProductContentItemType.FRAME,
                dynamicDataId: CardProductDynamicDataKey.primaryImage,
                data: '<<&primaryImage>>',
              } as unknown as ICardProductFrameRow,
            ],
          },
        ],
      } as ICardProductTheme

      beforeEach(() => {
        results = CardProductHelper.convertDynamicTheme({
          themeId,
          product: EulogiseProduct.BOOKLET,
          productTheme: mockProductTheme,
        })
      })

      it('should replace <<&primaryImage>> with default primary image data', () => {
        // look at before and after
        expect(results).toEqual([
          {
            rows: [
              {
                data: {
                  content: {
                    height: 232,
                    id: 'w58ut2pi',
                    items: [
                      {
                        borderRadius: '0px',
                        content: {
                          filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                          height: 232,
                          imageType: 'DEFAULT_THEME_IMAGE',
                          renderImageHeight: 236,
                          renderImageWidth: 236,
                          transformX: -118,
                          transformY: -118,
                          type: 'image',
                          width: 232,
                        },
                        id: 'lsx8vp0i',
                        type: 'content',
                      },
                    ],
                    lockAspectRatio: false,
                    type: 'rows',
                    width: 232,
                  },
                  enableBorder: false,
                  height: 232,
                  isFullWidth: false,
                  width: 232,
                },
                dynamicDataId: 'primaryImage',
                id: 'mock-row-id',
                type: 'frame',
              },
            ],
          },
        ])
      })
    })

    describe('dynamicDataId: primaryImage', () => {
      const filestackHandle = 'mock-filestackhandle'
      const filename = 'mock-filename'
      const filepath = 'mock-filepath'

      describe('Frame', () => {
        const mockProductTheme = {
          id: themeId,
          defaultContent: [
            {
              rows: [
                {
                  id: 'mock-row-id',
                  type: CardProductContentItemType.FRAME,
                  dynamicDataId: CardProductDynamicDataKey.primaryImage,
                  data: {
                    enableBorder: false,
                    width: 210,
                    content: {
                      width: 210,
                      lockAspectRatio: false,
                      id: 'w58ut2pi',
                      type: 'rows',
                      items: [
                        {
                          id: 'lsx8vp0i',
                          borderRadius: '0px',
                          type: 'content',
                          content: {
                            type: 'image',
                            imageType: 'DEFAULT_THEME_IMAGE',
                            filestackHandle: 'FwYTLk15TL6aUjYj2qTJ',
                          },
                        },
                      ],
                      height: 210,
                    },
                    isFullWidth: false,
                    height: 210,
                  },
                } as unknown as ICardProductFrameRow,
              ],
            },
          ],
        } as ICardProductTheme
        beforeEach(() => {
          results = CardProductHelper.convertDynamicTheme({
            themeId,
            product: EulogiseProduct.BOOKLET,
            productTheme: mockProductTheme,
            variables: {
              primaryImage: {
                filestackHandle,
                filename,
                filepath,
              },
            },
          })
        })

        it('should replace <<&primaryImage>> with default primary image data', () => {
          // look at before and after
          expect(results).toEqual([
            {
              rows: [
                {
                  data: {
                    content: {
                      height: 210,
                      id: 'w58ut2pi',
                      items: [
                        {
                          borderRadius: '0px',
                          content: {
                            filestackHandle,
                            filename,
                            filepath,
                            imageType: ICardProductImageType.PRIMARY_IMAGE,
                            type: 'image',
                            renderImageHeight: 214,
                            renderImageWidth: 214,
                            transformX: -107,
                            transformY: -107,
                          },
                          id: 'lsx8vp0i',
                          type: 'content',
                        },
                      ],
                      lockAspectRatio: false,
                      type: 'rows',
                      width: 210,
                    },
                    enableBorder: false,
                    height: 210,
                    isFullWidth: false,
                    width: 210,
                  },
                  dynamicDataId: 'primaryImage',
                  id: 'mock-row-id',
                  type: 'frame',
                },
              ],
            },
          ])
        })
      })

      /*
      Drop support of Image Item
      describe('Image', () => {
        const mockProductTheme = {
          id: themeId,
          defaultContent: [
            {
              rows: [
                {
                  id: 'mock-row-id',
                  type: CardProductContentItemType.IMAGE,
                  dynamicDataId: CardProductDynamicDataKey.primaryImage,
                  data: {
                    width: 163,
                    filename: 'dummy-file',
                    alignment: 'center',
                    filepath: '',
                    filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    height: 163,
                  },
                } as unknown as ICardProductFrameRow,
              ],
            },
          ],
        } as ICardProductTheme

        beforeEach(() => {
          results = CardProductHelper.convertDynamicTheme({
            themeId,
            product: EulogiseProduct.BOOKLET,
            productTheme: mockProductTheme,
            variables: {
              primaryImage: {
                filestackHandle,
                filename,
                filepath,
              },
            },
          })
        })

        it('should replace <<&primaryImage>> with default primary image data', () => {
          // look at before and after
          expect(results).toEqual([
            {
              rows: [
                {
                  id: 'mock-row-id',
                  type: CardProductContentItemType.IMAGE,
                  dynamicDataId: CardProductDynamicDataKey.primaryImage,
                  data: {
                    filename,
                    filepath,
                    filestackHandle,
                  },
                },
              ],
            },
          ])
        })
      })
*/
    })
  })

  describe('getProductThumbnailScaleByPageSize', () => {
    it('should return correct scale', () => {
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.A5,
        ),
      ).toEqual(0.5913183711866685)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.HALF_LETTER_A5,
        ),
      ).toEqual(0.5748984944845675)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.BOOKMARK,
        ),
      ).toEqual(0.5014245014245015)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.THANKYOUCARD,
        ),
      ).toEqual(1.182636742373337)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.TV_WELCOME_SCREEN,
        ),
      ).toEqual(0.8375)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.TV_WELCOME_SCREEN_2_COLS,
        ),
      ).toEqual(0.8375)
      expect(
        CardProductHelper.getProductThumbnailScaleByPageSize(
          CardProductPageSize.THANKYOUCARD_2_COLS,
        ),
      ).toEqual(1.182636742373337)
    })
  })

  describe('getBackgroundPosition', () => {
    const singleImage =
      'url("https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_BOOKLET_LEFT.jpg")'
    const twoImages =
      'linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_BOOKLET_LEFT.jpg")'

    describe('Left Page Column', () => {
      const pageMode = BleedPageMode.LEFT_SIDE_BLEED
      describe('1 background image', () => {
        it('should return "right center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(singleImage, pageMode),
          ).toEqual('right center')
        })
      })
      describe('2 background images', () => {
        it('should return "center center, right center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(twoImages, pageMode),
          ).toEqual('center center, right center')
        })
      })
    })
    describe('Right Page Column', () => {
      const pageMode = BleedPageMode.RIGHT_SIDE_BLEED
      describe('1 background image', () => {
        it('should return "left center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(singleImage, pageMode),
          ).toEqual('left center')
        })
      })

      describe('2 background images', () => {
        it('should return "center center, left center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(twoImages, pageMode),
          ).toEqual('center center, left center')
        })
      })
    })
    describe('Single Page', () => {
      const pageMode = BleedPageMode.FULL_BLEED
      describe('1 background image', () => {
        it('should return "center center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(singleImage, pageMode),
          ).toEqual('center center')
        })
      })

      describe('2 background images', () => {
        it('should return "center center, center center"', () => {
          expect(
            CardProductHelper.getPageBackgroundPosition(twoImages, pageMode),
          ).toEqual('center center, center center')
        })
      })
    })
  })

  describe('getRowById', () => {
    const frameRowId1 = 'frame-row-id-1'
    let frameRow1 = {
      type: CardProductContentItemType.FRAME,
      id: frameRowId1,
    }
    const mockCardProduct: ICardProductData = {
      content: {
        pages: [
          {
            rows: [
              {
                type: 'text',
                id: 'text-row-id-1',
              },
              {
                type: 'text',
                id: 'text-row-id-2',
              },
              {
                type: 'image',
                id: 'linen-front-img',
              },
              {
                type: 'space',
                id: 'space-id-2',
              },
            ],
          },
          {
            rows: [
              {
                type: 'space',
                id: 'space-row-id-3',
              },
              frameRow1,
              {
                type: 'columns',
                id: 'column-row-id-1',
              },
            ],
          },
        ],
      },
    } as unknown as ICardProductData

    describe('found row id', () => {
      it('should return the row type', () => {
        const results = CardProductHelper.getRowById({
          cardProduct: mockCardProduct,
          rowId: frameRowId1,
        })
        expect(results).toEqual(frameRow1)
      })
    })

    describe('unable to find row id', () => {
      it('should return undefined', () => {
        const results = CardProductHelper.getRowById({
          cardProduct: mockCardProduct,
          rowId: 'not-exist',
        })
        expect(results).toBeUndefined()
      })
    })
  })

  describe('getFirstFrameContentIdByRowId', () => {
    const frameRowId1 = 'frame-row-id-1'
    let contentId1 = 'content-id-1'
    const mockCardProduct: ICardProductData = {
      content: {
        pages: [
          {
            rows: [
              {
                type: 'text',
                id: 'text-row-id-1',
              },
            ],
          },
          {
            rows: [
              {
                type: 'space',
                id: 'space-row-id-3',
              },
              {
                type: CardProductContentItemType.FRAME,
                id: frameRowId1,
                data: {
                  content: {
                    type: 'rows',
                    items: [
                      {
                        type: 'columns',
                        items: [
                          {
                            id: contentId1,
                            type: 'content',
                          },
                          {
                            id: 'content-id-2',
                            type: 'content',
                          },
                          {
                            id: 'content-id-3',
                            type: 'content',
                          },
                        ],
                        id: 'column-id-1',
                      },
                      {
                        id: 'content-id-4',
                        type: 'content',
                      },
                    ],
                    id: 'row-id-1',
                  },
                },
              },
              {
                type: 'columns',
                id: 'column-row-id-1',
              },
            ],
          },
        ],
      },
    } as unknown as ICardProductData

    describe('Exists', () => {
      it('should return the first frameContentId', () => {
        expect(
          CardProductHelper.getFirstFrameContentIdByRowId(
            mockCardProduct,
            frameRowId1,
          ),
        ).toEqual(contentId1)
      })
    })
  })

  describe('getUpdatedRowContentDataForFrame()', () => {
    describe('Root level', () => {
      const frameContentItemId = '345k1vot'
      const imagePayload = {
        filepath:
          'cases/6f4e0692-8c20-4ecf-953d-7a3cf1034f8d/gallery/muhpoPROuuMgTTbT5Ggu_image.jpg',
        filestackHandle: 'BHXf2JhSkyC0NsBjTM6m',
        filename: 'muhpoPROuuMgTTbT5Ggu_image.jpg',
      }
      const framePayload: ICardProductFramePayload = {
        pageIndex: 0,
        rowId: 'v653vtgv',
        frameContentItemId,
        image: imagePayload,
      }
      const frameItemData: ICardProductFrameItem = {
        type: 'rows',
        items: [
          {
            type: 'content',
            id: frameContentItemId,
          },
        ],
        id: 'fn277bar',
      }

      beforeEach(() => {
        results = CardProductHelper.getUpdatedRowContentDataForFrame({
          framePayload,
          frameItemData,
        })
      })

      it('should attach the image data to the row payload', () => {
        expect(results).toEqual({
          type: 'rows',
          items: [
            {
              type: 'content',
              id: frameContentItemId,
              content: {
                type: 'image',
                ...imagePayload,
              },
            },
          ],
          id: 'fn277bar',
        } as ICardProductFrameItem)
      })
    })

    describe('Nested level', () => {
      const frameContentItemId = '345k1vot'
      const imagePayload = {
        filepath:
          'cases/6f4e0692-8c20-4ecf-953d-7a3cf1034f8d/gallery/muhpoPROuuMgTTbT5Ggu_image.jpg',
        filestackHandle: 'BHXf2JhSkyC0NsBjTM6m',
        filename: 'muhpoPROuuMgTTbT5Ggu_image.jpg',
      }
      const framePayload: ICardProductFramePayload = {
        pageIndex: 0,
        rowId: 'v653vtgv',
        frameContentItemId,
        image: imagePayload,
      }
      const frameItemData: ICardProductFrameItem = {
        type: 'rows',
        items: [
          {
            type: 'content',
            id: 'not-match',
          },
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                id: 'o45fldys',
              },
              {
                type: 'content',
                id: frameContentItemId,
              },
            ],
            id: 'n54om83y',
          },
        ],
        id: 'fn277bar',
      }

      beforeEach(() => {
        results = CardProductHelper.getUpdatedRowContentDataForFrame({
          framePayload,
          frameItemData,
        })
      })

      it('should attach the image data to the row payload', () => {
        expect(results).toEqual({
          type: 'rows',
          items: [
            {
              type: 'content',
              id: 'not-match',
            },
            {
              type: 'columns',
              items: [
                {
                  type: 'content',
                  id: 'o45fldys',
                },
                {
                  type: 'content',
                  id: frameContentItemId,
                  content: {
                    // important piece
                    type: 'image',
                    ...imagePayload,
                  },
                },
              ],
              id: 'n54om83y',
            },
          ],
          id: 'fn277bar',
        } as ICardProductFrameItem)
      })
    })
  })

  describe('getBorderSettingsFormFields()', () => {
    describe('Booklet without any borders', () => {
      beforeEach(() => {
        results = CardProductHelper.getBorderSettingsFormFields(MOCK_BOOKLET_1)
      })

      it('should return all form fields', () => {
        expect(results).toEqual({
          BACK_PAGE: {
            borderStyle: CardProductBorderType.DOUBLE_SOLID,
            borderCategory: CardProductBorderCategory.CLASSIC,
            color: '#BF713E',
          },
          FRONT_PAGE: {
            borderStyle: CardProductBorderType.NONE,
            borderCategory: CardProductBorderCategory.CLASSIC,
            color: '#B9346F',
          },
          MIDDLE_PAGES: {
            borderStyle: CardProductBorderType.TOP_AND_BOTTOM_DASHED,
            borderCategory: CardProductBorderCategory.CLASSIC,
            color: '#B9346F',
          },
        })
      })
    })

    describe('Booklet with borders', () => {
      beforeEach(() => {
        results = CardProductHelper.getBorderSettingsFormFields(
          MOCK_BOOKLET_WITH_BORDER,
        )
      })

      it('should return all form fields', () => {
        expect(results).toEqual({
          BACK_PAGE: {
            borderCategory: CardProductBorderCategory.CLASSIC,
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            color: 'black',
            thickness: CardProductBorderThicknessType.THIN,
          },
          FRONT_PAGE: {
            borderCategory: CardProductBorderCategory.CLASSIC,
            borderStyle: CardProductBorderType.SINGLE_SOLID,
            color: 'black',
            thickness: CardProductBorderThicknessType.THIN,
          },
          MIDDLE_PAGES: {
            borderCategory: CardProductBorderCategory.CLASSIC,
            borderStyle: CardProductBorderType.TOP_AND_BOTTOM_SOLID,
            color: 'black',
            thickness: CardProductBorderThicknessType.THIN,
          },
        })
      })
    })
  })

  describe('replaceFrameImagesWithDefaultFileStackHandle', () => {
    describe('multiple images', () => {
      const mockFrameItem: ICardProductFrameItem = {
        type: 'rows',
        items: [
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                content: {
                  transformY: -83.75294117647059,
                  renderImageWidth: 171,
                  transformX: -85,
                  renderImageHeight: 171,
                  type: 'image',
                  filepath:
                    'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
                },
                id: 'u93mky1x',
              },
              {
                type: 'content',
                content: {
                  transformY: -85,
                  filename: 'geAVhvS9R62OgcObph2O_12 Small.jpeg',
                  transformX: -85,
                  renderImageHeight: 170,
                  filepath: 'primaryImages/lLGIqVIPShpMm6Tma5Yw.jpeg',
                  renderImageWidth: 170,
                  type: 'image',
                },
                id: 'z7s6mun5',
              },
            ],
            id: 'u808d70y',
          },
          {
            id: 'svhe0nps',
            type: 'content',
            flex: 2,
            content: {
              transformY: -120.49999999999999,
              filename:
                'mz1PTWYTzi1EXRnbPGRL_tatiana-gonzales-179948-unsplash Small.jpeg',
              transformX: -182.74881516587675,
              renderImageHeight: 240.99999999999997,
              filepath: 'primaryImages/fWsJAEkGSUa9IaVXSoTs.jpeg',
              renderImageWidth: 365.4976303317535,
              type: 'image',
            },
          },
          {
            type: 'columns',
            items: [
              {
                type: 'content',
                content: {
                  transformY: -60.5,
                  filename: 'K1HHUKWUQeSh2HRuPsZQ_2 Small.jpeg',
                  transformX: -95.84158415841584,
                  renderImageHeight: 121,
                  filepath: 'primaryImages/26jNWLpASWCYI3BuLj70.jpeg',
                  renderImageWidth: 191.68316831683168,
                  type: 'image',
                },
                id: 'vn3pnl8j',
              },
              {
                type: 'content',
                content: {
                  transformY: -78.09375,
                  filename: 'IdhPzxp1TR9FisRpURBN_17 Small.jpeg',
                  transformX: -85,
                  renderImageHeight: 156.1875,
                  filepath: 'primaryImages/51RFLy0VScK5qswS7MKG.jpeg',
                  renderImageWidth: 170,
                  type: 'image',
                },
                id: '0nxoti8v',
              },
            ],
            id: 'dloypaqe',
          },
        ],
        height: 489,
      }

      it('should replace all images with default file image handle', () => {
        const result =
          CardProductHelper.replaceFrameImagesWithDefaultFileStackHandle(
            mockFrameItem,
          )

        expect(result).toEqual({
          height: 489,
          items: [
            {
              id: 'u808d70y',
              items: [
                {
                  content: {
                    filepath:
                      'booklet/themes/example-images/reflection-p4-lady-portrait.jpg',
                    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                    renderImageHeight: 171,
                    renderImageWidth: 171,
                    transformX: -85,
                    transformY: -83.75294117647059,
                    type: 'image',
                  },
                  id: 'u93mky1x',
                  type: 'content',
                },
                {
                  content: {
                    filename: 'geAVhvS9R62OgcObph2O_12 Small.jpeg',
                    filepath: 'primaryImages/lLGIqVIPShpMm6Tma5Yw.jpeg',
                    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                    renderImageHeight: 170,
                    renderImageWidth: 170,
                    transformX: -85,
                    transformY: -85,
                    type: 'image',
                  },
                  id: 'z7s6mun5',
                  type: 'content',
                },
              ],
              type: 'columns',
            },
            {
              content: {
                filename:
                  'mz1PTWYTzi1EXRnbPGRL_tatiana-gonzales-179948-unsplash Small.jpeg',
                filepath: 'primaryImages/fWsJAEkGSUa9IaVXSoTs.jpeg',
                filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                renderImageHeight: 240.99999999999997,
                renderImageWidth: 365.4976303317535,
                transformX: -182.74881516587675,
                transformY: -120.49999999999999,
                type: 'image',
              },
              flex: 2,
              id: 'svhe0nps',
              type: 'content',
            },
            {
              id: 'dloypaqe',
              items: [
                {
                  content: {
                    filename: 'K1HHUKWUQeSh2HRuPsZQ_2 Small.jpeg',
                    filepath: 'primaryImages/26jNWLpASWCYI3BuLj70.jpeg',
                    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                    renderImageHeight: 121,
                    renderImageWidth: 191.68316831683168,
                    transformX: -95.84158415841584,
                    transformY: -60.5,
                    type: 'image',
                  },
                  id: 'vn3pnl8j',
                  type: 'content',
                },
                {
                  content: {
                    filename: 'IdhPzxp1TR9FisRpURBN_17 Small.jpeg',
                    filepath: 'primaryImages/51RFLy0VScK5qswS7MKG.jpeg',
                    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                    renderImageHeight: 156.1875,
                    renderImageWidth: 170,
                    transformX: -85,
                    transformY: -78.09375,
                    type: 'image',
                  },
                  id: '0nxoti8v',
                  type: 'content',
                },
              ],
              type: 'columns',
            },
          ],
          type: 'rows',
        })
      })
    })
  })

  describe('replacePagesNonPrimaryImagesWithDefaultFilestackHandle', () => {
    const mockPage: ICardProductPage = {
      rows: [
        {
          type: CardProductContentItemType.FRAME,
          data: {
            width: 360,
            content: {
              width: 360,
              id: 'vzxr6mw4',
              type: 'columns',
              items: [
                {
                  type: 'content',
                  content: {
                    transformY: -117.5,
                    transformX: -117.49999999999999,
                    renderImageHeight: 235,
                    filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                    width: 232,
                    renderImageWidth: 234.99999999999997,
                    type: 'image',
                    filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    height: 232,
                  },
                  id: 'p3flwff4',
                },
                {
                  type: 'rows',
                  items: [
                    {
                      type: 'content',
                      content: {
                        transformY: -93.00000000000001,
                        renderImageWidth: 186,
                        transformX: -93,
                        renderImageHeight: 186.00000000000003,
                        type: 'image',
                        filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                      },
                      id: 'mjfs1erj',
                    },
                    {
                      type: 'content',
                      content: {
                        transformY: -93.00000000000001,
                        renderImageWidth: 186,
                        transformX: -93,
                        renderImageHeight: 186.00000000000003,
                        type: 'image',
                        filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                      },
                      id: 'm5358jf7',
                    },
                  ],
                  id: 'o9uh8nca',
                },
              ],
              height: 227,
            },
            height: 227,
          },
          id: '3dffd50w5',
        },
      ],
      border: {
        borderStyle: CardProductBorderType.BLANK_MID_BOTTOM_SOLID,
      },
      background: {
        image: {
          filepath:
            'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_BOOKLET_RIGHT.jpg',
        },
      },
    }

    it('should replace all non primary images to default filestack handle', () => {
      const result =
        CardProductHelper.replacePagesNonPrimaryImagesWithDefaultFilestackHandle(
          [mockPage],
        )

      expect(result).toEqual([
        {
          rows: [
            {
              type: 'frame',
              data: {
                width: 360,
                content: {
                  width: 360,
                  id: 'vzxr6mw4',
                  type: 'columns',
                  items: [
                    {
                      type: 'content',
                      content: {
                        transformY: -117.5,
                        transformX: -117.49999999999999,
                        renderImageHeight: 235,
                        filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                        width: 232,
                        renderImageWidth: 234.99999999999997,
                        type: 'image',
                        filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                        height: 232,
                      },
                      id: 'p3flwff4',
                    },
                    {
                      type: 'rows',
                      items: [
                        {
                          type: 'content',
                          content: {
                            transformY: -93.00000000000001,
                            renderImageWidth: 186,
                            transformX: -93,
                            renderImageHeight: 186.00000000000003,
                            type: 'image',
                            filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            filestackHandle:
                              DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                          },
                          id: 'mjfs1erj',
                        },
                        {
                          type: 'content',
                          content: {
                            transformY: -93.00000000000001,
                            renderImageWidth: 186,
                            transformX: -93,
                            renderImageHeight: 186.00000000000003,
                            type: 'image',
                            filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
                            filestackHandle:
                              DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                          },
                          id: 'm5358jf7',
                        },
                      ],
                      id: 'o9uh8nca',
                    },
                  ],
                  height: 227,
                },
                height: 227,
              },
              id: '3dffd50w5',
            },
          ],
          border: { borderStyle: 'BLANK_MID_BOTTOM_SOLID' },
          background: {
            image: {
              filepath:
                'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_BOOKLET_RIGHT.jpg',
            },
          },
        },
      ])
    })
  })

  describe('createDynamicThemes()', () => {
    const themeId = 'aura'
    describe('Booklet', () => {
      beforeEach(() => {
        results = CardProductHelper.createDynamicTheme({
          themeId,
          product: EulogiseProduct.BOOKLET,
          productTheme: BOOKLET_THEMES.find((t) => t.id === themeId)!,
        })
      })

      it('should replace all the template variable with the actual name', () => {
        const jsonString = JSON.stringify(results)
        console.log('JSON', jsonString)
        expect(jsonString).not.toMatch(/\{\{/)
      })
    })

    describe('Bookmark', () => {
      beforeEach(() => {
        results = CardProductHelper.createDynamicTheme({
          themeId,
          product: EulogiseProduct.BOOKMARK,
          productTheme: BOOKMARK_THEMES.find((t) => t.id === themeId)!,
          variables: { region: EulogiseRegion.AU },
        })
      })

      it('should replace all the template variable with the actual name', () => {
        const jsonString = JSON.stringify(results)
        console.log('JSON', jsonString)
        expect(jsonString).not.toMatch(/\{\{/)
      })
    })

    describe('Thank you card', () => {
      beforeEach(() => {
        results = CardProductHelper.createDynamicTheme({
          themeId,
          product: EulogiseProduct.THANK_YOU_CARD,
          productTheme: THANK_YOU_CARD_THEMES.find((t) => t.id === themeId)!,
          variables: { region: EulogiseRegion.AU },
        })
      })

      it('should replace all the template variable with the actual name', () => {
        const jsonString = JSON.stringify(results)
        console.log('JSON', jsonString)
        expect(jsonString).not.toMatch(/\{\{/)
      })
    })

    describe('TV Welcome Screen', () => {
      beforeEach(() => {
        results = CardProductHelper.createDynamicTheme({
          themeId,
          product: EulogiseProduct.TV_WELCOME_SCREEN,
          productTheme: TV_WELCOME_SCREEN_THEMES.find((t) => t.id === themeId)!,
          variables: { region: EulogiseRegion.AU },
        })
      })

      it('should replace all the template variable with the actual name', () => {
        const jsonString = JSON.stringify(results)
        console.log('JSON', jsonString)
        expect(jsonString).not.toMatch(/\{\{/)
      })
    })
  })

  describe('getPdfPageViewport()', () => {
    describe('without Bleed', () => {
      describe('Booklet', () => {
        it('should return correct viewport', () => {
          // simulate booklet with 4 pages
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.BOOKLET,
            }),
          ).toEqual({
            height: '210',
            width: '297',
          })
        })
      })

      describe('Memorial Card', function () {
        it('should return correct viewport', () => {
          // simulate memorial card with 2 pages
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.SIDED_CARD,
            }),
          ).toEqual({
            height: '210',
            width: '148.5',
          })
        })
      })

      describe('Bookmark', function () {
        it('should return correct viewport', () => {
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.BOOKMARK,
            }),
          ).toEqual({
            height: '247.65',
            width: '56.45',
          })
        })
      })

      describe('Thankyou card', function () {
        it('should return correct viewport', () => {
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.THANK_YOU_CARD,
            }),
          ).toEqual({
            height: '105',
            width: '148',
          })
        })
      })

      describe('Thankyou card 2 cols', function () {
        it('should return correct viewport', () => {
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.THANK_YOU_CARD,
            }),
          ).toEqual({
            height: '105',
            width: '148',
          })
        })
      })
    })

    describe('with Bleed', () => {
      describe('Booklet', () => {
        it('should return correct viewport', () => {
          // simulate booklet with 4 pages
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.BOOKLET,
              bleed: true,
            }),
          ).toEqual({
            height: '222',
            width: '309',
          })
        })
      })

      describe('Memorial Card', function () {
        it('should return correct viewport', () => {
          // simulate memorial card with 2 pages
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.SIDED_CARD,
              bleed: true,
            }),
          ).toEqual({
            height: '222',
            width: '160.5',
          })
        })
      })

      describe('Bookmark', function () {
        it('should return correct viewport', () => {
          // simulate bookmark
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.BOOKMARK,
              bleed: true,
            }),
          ).toEqual({
            height: '259.65',
            width: '68.45',
          })
        })
      })

      describe('Thankyou card', function () {
        it('should return correct viewport', () => {
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.THANK_YOU_CARD,
              bleed: true,
            }),
          ).toEqual({
            height: '117',
            width: '160',
          })
        })
      })

      describe('Thankyou card 2 cols', function () {
        it('should return correct viewport', () => {
          expect(
            CardProductHelper.getPdfPageViewport({
              product: EulogiseProduct.THANK_YOU_CARD,
              bleed: true,
            }),
          ).toEqual({
            height: '117',
            width: '160',
          })
        })
      })
    })
  })

  describe('getPageModeByPageSize()', () => {
    describe('Without displayMode', () => {
      it('should return different page mode based on page size', () => {
        expect(
          CardProductHelper.getPageModeByPageSize({
            pageSize: CardProductPageSize.A5,
            product: EulogiseProduct.BOOKLET,
          }),
        ).toEqual(CardProductPageMode.NORMAL)

        expect(
          CardProductHelper.getPageModeByPageSize({
            pageSize: CardProductPageSize.BOOKMARK,
            product: EulogiseProduct.BOOKMARK,
          }),
        ).toEqual(CardProductPageMode.NORMAL)

        expect(
          CardProductHelper.getPageModeByPageSize({
            pageSize: CardProductPageSize.THANKYOUCARD,
            product: EulogiseProduct.THANK_YOU_CARD,
          }),
        ).toEqual(CardProductPageMode.NORMAL)

        expect(
          CardProductHelper.getPageModeByPageSize({
            pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
            product: EulogiseProduct.THANK_YOU_CARD,
          }),
        ).toEqual(CardProductPageMode.TWO_PAGES)
      })
    })

    describe('With displayMode', () => {
      describe('EDIT', () => {
        it('should return different page mode based on page size', () => {
          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.A5,
              product: EulogiseProduct.BOOKLET,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.BOOKMARK,
              product: EulogiseProduct.BOOKMARK,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.TWO_PAGES)
        })
      })

      describe('PREViEW', () => {
        it('should return different page mode based on page size', () => {
          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.A5,
              product: EulogiseProduct.BOOKLET,
              displayMode: CardProductViewDisplayMode.PREVIEW,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.BOOKMARK,
              product: EulogiseProduct.BOOKMARK,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.EDIT,
            }),
          ).toEqual(CardProductPageMode.TWO_PAGES)
        })
      })

      describe('PRINT', () => {
        it('should return different page mode based on page size', () => {
          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.A5,
              product: EulogiseProduct.BOOKLET,
              displayMode: CardProductViewDisplayMode.PRINT,
            }),
          ).toEqual(CardProductPageMode.TWO_PAGES)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.A5,
              product: EulogiseProduct.SIDED_CARD,
              displayMode: CardProductViewDisplayMode.PRINT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.BOOKMARK,
              product: EulogiseProduct.BOOKMARK,
              displayMode: CardProductViewDisplayMode.PRINT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.PRINT,
            }),
          ).toEqual(CardProductPageMode.NORMAL)

          expect(
            CardProductHelper.getPageModeByPageSize({
              pageSize: CardProductPageSize.THANKYOUCARD_2_COLS,
              product: EulogiseProduct.THANK_YOU_CARD,
              displayMode: CardProductViewDisplayMode.PRINT,
            }),
          ).toEqual(CardProductPageMode.TWO_PAGES)
        })
      })
    })
  })

  describe('getPagesOrder', () => {
    describe('DisplayMode = Edit', () => {
      it('should return as its', () => {
        const displayMode = CardProductViewDisplayMode.EDIT
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKLET,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.SIDED_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKMARK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.THANK_YOU_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.PHOTOBOOK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])
      })
    })

    describe('DisplayMode = PREVIEW', () => {
      it('should return as its', () => {
        const displayMode = CardProductViewDisplayMode.PREVIEW
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKLET,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.SIDED_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKMARK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.THANK_YOU_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.PHOTOBOOK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])
      })
    })

    describe('DisplayMode = PRINT', () => {
      it('should only display the last page first for A5 items', () => {
        const displayMode = CardProductViewDisplayMode.PRINT
        // Booklet
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKLET,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([4, 1, 2, 3])

        // Memorial Card
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.SIDED_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([4, 2, 3, 1])

        // Bookmark
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.BOOKMARK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2],
          }),
        ).toEqual([1, 2])

        // Thank you card
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.THANK_YOU_CARD,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([1, 2, 3, 4])

        // Photobook
        expect(
          CardProductHelper.getPagesOrder({
            product: EulogiseProduct.PHOTOBOOK,
            displayMode,
            // @ts-expect-error
            pages: [1, 2, 3, 4],
          }),
        ).toEqual([3, 4])
      })
    })
  })

  describe('getTotalPageCursors()', () => {
    describe('CardProductViewDisplayMode: Thumbnail', () => {
      describe('Booklet', () => {
        const totalPages: number = 4
        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product: EulogiseProduct.BOOKLET,
            totalPages,
            displayMode: CardProductViewDisplayMode.THUMBNAIL,
          })
        })

        it('should return 1', () => {
          expect(results).toEqual(1)
        })
      })

      describe('Bookmark', () => {
        describe('Total pages: 4', () => {
          const totalPages: number = 4
          beforeEach(() => {
            results = CardProductHelper.getTotalPageCursors({
              product: EulogiseProduct.BOOKMARK,
              totalPages,
              displayMode: CardProductViewDisplayMode.THUMBNAIL,
            })
          })

          it('should return 2', () => {
            expect(results).toEqual(2)
          })
        })

        describe('Total pages: 1', () => {
          const totalPages: number = 1
          beforeEach(() => {
            results = CardProductHelper.getTotalPageCursors({
              product: EulogiseProduct.BOOKMARK,
              totalPages,
              displayMode: CardProductViewDisplayMode.THUMBNAIL,
            })
          })

          it('should return 1', () => {
            expect(results).toEqual(1)
          })
        })
      })
    })

    describe('CardProductViewDisplayMode: Print', () => {
      describe('Photobook', () => {
        const totalPages: number = 4
        const product = EulogiseProduct.PHOTOBOOK
        const displayMode = CardProductViewDisplayMode.PRINT
        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product,
            totalPages,
            displayMode,
          })
        })

        it('should return 3', () => {
          expect(results).toEqual(3)
        })
      })
    })

    describe('NORMAL mode', () => {
      describe('Total Page: 4', () => {
        const totalPages: number = 4

        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product: EulogiseProduct.BOOKLET,
            totalPages,
          })
        })

        it('should return 3', () => {
          expect(results).toEqual(3)
        })
      })

      describe('Total Page: 2', () => {
        const totalPages: number = 2

        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product: EulogiseProduct.BOOKLET,
            totalPages,
          })
        })

        it('should return 2', () => {
          expect(results).toEqual(2)
        })
      })
    })

    describe('TWO_PAGE mode', () => {
      describe('Total Page: 4', () => {
        const totalPages = 4

        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product: EulogiseProduct.BOOKLET,
            totalPages,
            pageMode: CardProductPageMode.TWO_PAGES,
          })
        })

        it('should return 2', () => {
          expect(results).toEqual(2)
        })
      })

      describe('Total Page: 2', () => {
        const totalPages = 2

        beforeEach(() => {
          results = CardProductHelper.getTotalPageCursors({
            product: EulogiseProduct.BOOKLET,
            totalPages,
            pageMode: CardProductPageMode.TWO_PAGES,
          })
        })

        it('should return 1', () => {
          expect(results).toEqual(1)
        })
      })
    })
  })

  describe('updateRowById()', () => {
    const rowId = 'row1'
    const mockRow: ICardProductFrameRow = {
      id: rowId,
      type: CardProductContentItemType.FRAME,
      data: {
        content: {
          type: 'content',
          layoutId: 'layout-id-1',
          fadeEdge: ICardProductFadeEdgeType.ROUNDED,
        },
        enableFadeImage: true,
      },
    }

    const cardProduct: ICardProductData = {
      case: 'case-123',
      status: MemorialVisualStatus.THEME_SELECTED,
      id: 'card-product-1',
      content: {
        pages: [
          {
            rows: [mockRow],
          },
        ],
        pageMargins: [],
        pageSize: CardProductPageSize.A5,
        theme: 'theme-1',
        pageOrientation: CardProductPageOrientation.PORTRAIT,
      },
    }

    it('should update the row by the given id', () => {
      const updatedRow = {
        ...mockRow,
        data: {
          ...mockRow.data,
          enableFadeImage: false,
        },
      }
      const newCardProduct = CardProductHelper.updateRowById({
        cardProduct,
        rowId,
        updatedRow,
      })

      expect(newCardProduct).toEqual({
        ...cardProduct,
        content: {
          ...cardProduct.content,
          pages: [
            {
              rows: [updatedRow],
            },
          ],
        },
      })
    })
  })

  describe('getFadedEdgesFrameRows()', () => {
    it('should return faded edges frames', () => {
      const frames = CardProductHelper.getFadedEdgesFrameRows({
        cardProductContent: MOCK_BOOKLET_1.content,
      })
      expect(frames.length).toEqual(3)
    })
  })

  describe('getPageIndexesByPageCursor()', () => {
    describe('NORMAL mode', () => {
      describe('Total Pages: 4', () => {
        const totalPages: number = 4

        describe('Page Cursor: 0', () => {
          const pageCursor: number = 0

          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex: pageCursor,
              totalPages,
            })
          })

          it('should return { leftPageIndex: undefined, rightPageIndex: 0 }', () => {
            expect(results).toEqual({
              leftPageIndex: undefined,
              rightPageIndex: 0,
            })
          })
        })

        describe('Page Cursor: 1', () => {
          const pageCursor: number = 1

          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex: pageCursor,
              totalPages,
            })
          })

          it('should return { leftPageIndex: 1, rightPageIndex: 2 }', () => {
            expect(results).toEqual({
              leftPageIndex: 1,
              rightPageIndex: 2,
            })
          })
        })

        describe('Page Cursor: 2', () => {
          const pageCursor: number = 2

          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex: pageCursor,
              totalPages,
            })
          })

          it('should return { leftPageIndex: undefined, rightPageIndex: 3 }', () => {
            expect(results).toEqual({
              leftPageIndex: undefined,
              rightPageIndex: 3,
            })
          })
        })
      })

      describe('Total Pages: 2', () => {
        const totalPages: number = 2

        describe('Page Cursor: 0', () => {
          const pageCursor: number = 0

          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex: pageCursor,
              totalPages,
            })
          })

          it('should return { leftPageIndex: undefined, rightPageIndex: 0 }', () => {
            expect(results).toEqual({
              leftPageIndex: undefined,
              rightPageIndex: 0,
            })
          })
        })

        describe('Page Cursor: 1', () => {
          const pageCursor: number = 1

          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex: pageCursor,
              totalPages,
            })
          })

          it('should return { leftPageIndex: undefined, rightPageIndex: 1 }', () => {
            expect(results).toEqual({
              leftPageIndex: undefined,
              rightPageIndex: 1,
            })
          })
        })
      })
    })

    describe('TWO_PAGE mode', () => {
      const mode: CardProductPageMode = CardProductPageMode.TWO_PAGES

      describe('Total Page: 4', () => {
        const totalPages: number = 4
        describe('Page Cursor: 0', () => {
          const pageCursorIndex: number = 0
          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex,
              totalPages,
              pageMode: mode,
            })
          })

          it('should return { leftPageIndex: 0, rightPageIndex: 1 }', () => {
            expect(results).toEqual({ leftPageIndex: 0, rightPageIndex: 1 })
          })
        })

        describe('Page Cursor: 1', () => {
          const pageCursorIndex: number = 1
          beforeEach(() => {
            results = CardProductHelper.getPageIndexesByPageCursor({
              product: EulogiseProduct.BOOKLET,
              pageCursorIndex,
              totalPages,
              pageMode: mode,
            })
          })

          it('should return { leftPageIndex: 2, rightPageIndex: 3 }', () => {
            expect(results).toEqual({ leftPageIndex: 2, rightPageIndex: 3 })
          })
        })
      })
    })

    describe('displayMode = PRINT', () => {
      const displayMode = CardProductViewDisplayMode.PRINT
      describe('Photobook', () => {
        const product = EulogiseProduct.PHOTOBOOK
        it('should return one per page', () => {
          const totalPages = 4
          const pageMode = CardProductPageMode.NORMAL
          let pageCursorIndex = 0
          let results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results.rightPageIndex).toEqual(0)
          expect(results.leftPageIndex).toBeUndefined()

          pageCursorIndex = 1
          results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results.leftPageIndex).toEqual(1)
          expect(results.rightPageIndex).toEqual(2)

          pageCursorIndex = 2
          results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results.leftPageIndex).toEqual(3)
          expect(results.rightPageIndex).toBeUndefined()
        })
      })
    })

    describe('displayMode = EDIT', () => {
      const displayMode = CardProductViewDisplayMode.EDIT
      describe('Photobook', () => {
        const product = EulogiseProduct.PHOTOBOOK
        it('should return one per page', () => {
          const totalPages = 4
          const pageMode = CardProductPageMode.NORMAL

          // pageCursor = 0
          let pageCursor = 0
          let results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex: pageCursor,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results).toEqual({
            leftPageIndex: undefined,
            rightPageIndex: 0,
          })

          // pageCursor = 1
          pageCursor = 1
          results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex: pageCursor,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results).toEqual({
            leftPageIndex: 1,
            rightPageIndex: 2,
          })

          // pageCursor = 2
          pageCursor = 2
          results = CardProductHelper.getPageIndexesByPageCursor({
            product,
            pageCursorIndex: pageCursor,
            totalPages,
            pageMode,
            isMobile: false,
            displayMode,
          })
          expect(results).toEqual({
            leftPageIndex: undefined,
            rightPageIndex: 3,
          })
        })
      })
    })
  })

  describe('getAddCardProductPagesState()', () => {
    const pages = ['page1', 'page2', 'page3', 'page4']
    const existingState: ICardProductState = {
      activeItem: {
        content: {
          pageMargins: [1, 1],
          pageSize: CardProductPageSize.A5,
          theme: 'aura',
          pageOrientation: CardProductPageOrientation.PORTRAIT,
          // @ts-ignore
          pages: pages,
        },
      },
    }
    beforeEach(() => {
      const theme = MOCK_THEMES[0]
      results = CardProductHelper.getAddCardProductPagesState({
        cardProductState: existingState,
        productTheme: ThemeHelper.getProductThemeByProductType({
          theme,
          product: EulogiseProduct.BOOKLET,
        }) as ICardProductTheme,
        themeId: theme.id!,
        region: EulogiseRegion.AU,
        product: EulogiseProduct.BOOKLET,
      })
    })

    it('should create two new pages before hte last page', () => {
      expect(results.activeItem.content.pages.length).toEqual(pages.length + 4)
    })
  })

  describe('getBleedPageBackground', () => {
    describe('SIDED_CARD', () => {
      const product = EulogiseProduct.SIDED_CARD
      describe('USA', () => {
        const region = 'USA'
        it('should return correct results', () => {
          const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_${region}.jpg`
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
          )
        })

        it('should return correct results with existing BOTH_SIDE in the image', () => {
          const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE_${region}.jpg`
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE_USA_BLEED.jpg',
          )
        })
      })

      describe('AU', () => {
        it('should return correct results', () => {
          const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK.jpg`
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
          )
        })

        it('should return correct results with existing _BOTH_SIDE in the image url', () => {
          const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE.jpg`
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BOTH_SIDE_BLEED.jpg',
          )
        })
      })
    })

    describe('BOOKLET', () => {
      const product = EulogiseProduct.BOOKLET
      describe('USA', () => {
        const region = 'USA'
        const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_${region}.jpg`
        it('should return correct results', () => {
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_USA_BLEED.jpg',
          )
        })
      })

      describe('AU', () => {
        const imageUrl = `backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK.jpg`
        it('should return correct results', () => {
          jest.spyOn(ImageHelper, 'getImageUrl').mockReturnValue(imageUrl)
          expect(
            CardProductHelper.getBleedPageBackground({
              page: {
                background: {
                  // @ts-ignore
                  image: 'blah',
                },
              },
              product,
            }),
          ).toEqual(
            'backgroundImages/Sailing_Watercolor/USA/Sailing_Watercolor_BOOKLET_BACK_BLEED.jpg',
          )
        })
      })
    })
  })

  describe('getRemoveCardProductPagesState()', () => {
    const pages = [
      'page1',
      'page2',
      'page3',
      'page4',
      'page5',
      'page6',
      'page7',
      'page8',
    ]
    const existingState: ICardProductState = {
      activeItem: {
        content: {
          pageMargins: [1, 1],
          pageSize: CardProductPageSize.A5,
          theme: 'aura',
          pageOrientation: CardProductPageOrientation.PORTRAIT,
          // @ts-ignore
          pages: pages,
        },
      },
    }
    beforeEach(() => {
      results = CardProductHelper.getRemoveCardProductPagesState(existingState)
    })

    it('should create two new pages before hte last page', () => {
      expect(results.activeItem.content.pages).toEqual([
        'page1',
        'page2',
        'page3',
        'page8',
      ])
    })
  })

  describe('getBookletPageOrder()', () => {
    beforeEach(() => {
      const pages = R.times((num) => `page${num + 1}`, 16)
      console.log('pages', pages)
      results = CardProductHelper.getBookletPageOrder(pages as any)
    })

    it('should return all results', () => {
      expect(results).toEqual([
        'page16',
        'page1',
        'page2',
        'page15',
        'page14',
        'page3',
        'page4',
        'page13',
        'page12',
        'page5',
        'page6',
        'page11',
        'page10',
        'page7',
        'page8',
        'page9',
      ])
    })
  })

  describe('hasOnlyOneFrameRowInPage', () => {
    it('should return true when page has a single FRAME row', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.FRAME, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(true)
    })

    it('should return true when page has a single FRAME row with SPACE rows', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.FRAME, data: {} },
          { id: 'row-2', type: CardProductContentItemType.SPACE, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(true)
    })

    it('should return true when page has SPACE row before FRAME row', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.SPACE, data: {} },
          { id: 'row-2', type: CardProductContentItemType.FRAME, data: {} },
        ],
      } as unknown as ICardProductPage

      // First row is SPACE, not FRAME — so rows[1].type check
      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(true)
    })

    it('should return false when page has a FRAME row and a TEXT row', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.FRAME, data: {} },
          { id: 'row-2', type: CardProductContentItemType.TEXT, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })

    it('should return false when page has multiple FRAME rows', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.FRAME, data: {} },
          { id: 'row-2', type: CardProductContentItemType.FRAME, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })

    it('should return false when page has only TEXT rows', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.TEXT, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })

    it('should return false when page has only SPACE rows', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.SPACE, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })

    it('should return false when page has no rows', () => {
      const page = {
        rows: [],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })

    it('should return true when page has FRAME row with multiple SPACE rows', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.FRAME, data: {} },
          { id: 'row-2', type: CardProductContentItemType.SPACE, data: {} },
          { id: 'row-3', type: CardProductContentItemType.SPACE, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(true)
    })

    it('should return false when page has an IMAGE row only', () => {
      const page = {
        rows: [
          { id: 'row-1', type: CardProductContentItemType.IMAGE, data: {} },
        ],
      } as unknown as ICardProductPage

      expect(CardProductHelper.hasOnlyOneFrameRowInPage(page)).toBe(false)
    })
  })
})
