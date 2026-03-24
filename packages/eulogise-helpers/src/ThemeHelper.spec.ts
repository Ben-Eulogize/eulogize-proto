import {
  CARD_PRODUCT_DEFAULT_COMMON_DATA,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  EulogiseProduct,
  EulogiseProductThemeMap,
  EulogiseRegion,
  ICardProductFadeEdgeType,
  ICardProductPage,
  ICardProductRow,
  ICardProductTheme,
  ICase,
  INITIAL_DEFAULT_PRODUCTS,
  ISlideshowTheme,
  ITheme,
} from '@eulogise/core'
import { ThemeHelper } from './ThemeHelper'

const MOCK_CARD_PRODUCT_TEXT_ROW: ICardProductRow = {
  type: CardProductContentItemType.TEXT,
  data: {
    content: {
      blocks: [
        {
          depth: 0,
          data: {},
          inlineStyleRanges: [],
          text: 'Celebrating',
          type: 'header-one',
          key: 'mock-key',
          entityRanges: [],
        },
        {
          depth: 0,
          data: {},
          inlineStyleRanges: [],
          text: 'Now',
          type: 'header-one',
          key: 'mock-key',
          entityRanges: [],
        },
      ],
      entityMap: {},
    },
  },
  id: 'mock-row-id',
  dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
}

const MOCK_CARD_PRODUCT_FRAME_ROW: ICardProductRow = {
  type: CardProductContentItemType.FRAME,
  data: {
    content: {
      type: 'rows',
      items: [],
      fadeEdge: ICardProductFadeEdgeType.NONE,
    },
  },
  id: 'mock-front-img',
  dynamicDataId: CardProductDynamicDataKey.primaryImage,
}

const MOCK_CARD_PRODUCT_SPACE_ROW: ICardProductRow = {
  type: CardProductContentItemType.SPACE,
  data: {},
  id: 'mock-id',
}

describe('ThemeHelper', () => {
  let results: any

  describe('getDefaultContentForTheme()', () => {
    describe('deceasedName', () => {
      it('should return correct default content', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.deceasedName,
          ),
        ).toEqual(CARD_PRODUCT_DEFAULT_COMMON_DATA.deceasedName)
      })
    })

    describe('dateOfBirth', () => {
      it('should return correct default date and format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfBirth,
          ),
        ).toEqual('Mar 20th 1954')
      })
      it('should return correct default date with specified format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfBirth,
            'DD/MM/YYYY',
          ),
        ).toEqual('20/03/1954')
      })
    })

    describe('dateOfDeath', () => {
      it('should return correct default date and format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfDeath,
          ),
        ).toEqual('Jan 25th 2023')
      })
      it('should return correct default date with specified format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfDeath,
            'DD/MM/YYYY',
          ),
        ).toEqual('25/01/2023')
      })
    })

    describe('dateOfService', () => {
      it('should return correct default date and format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfService,
          ),
        ).toEqual('Jan 18th 2023')
      })
      it('should return correct default date with specified format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dateOfService,
            'DD/MM/YYYY',
          ),
        ).toEqual('18/01/2023')
      })
    })

    describe('location', () => {
      it('should return correct default location', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.location,
          ),
        ).toEqual(CARD_PRODUCT_DEFAULT_COMMON_DATA.location)
      })
    })

    describe('serviceStartTime', () => {
      it('should return correct default serviceStartTime', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.serviceStartTime,
          ),
        ).toEqual(CARD_PRODUCT_DEFAULT_COMMON_DATA.serviceStartTime)
      })
    })

    describe('dobToDod', () => {
      it('should return correct default date and format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dobToDod,
          ),
        ).toEqual('Mar 20th 1954 - Jan 25th 2023')
      })
      it('should return correct default date with specified format', () => {
        expect(
          ThemeHelper.getDefaultContentForTheme(
            CardProductDynamicDataKey.dobToDod,
            'DD/MM/YYYY',
          ),
        ).toEqual('20/03/1954 - 25/01/2023')
      })
    })
  })

  describe('applyDefaultDataToCardProductPages', () => {
    describe('Booklet', () => {
      describe('text field', () => {
        it('should apply default data to template', () => {
          const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
            {
              rows: [MOCK_CARD_PRODUCT_TEXT_ROW],
            },
          ]
          let newCardProductPages =
            ThemeHelper.applyDefaultDataToCardProductPages({
              cardProductPages: MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
              product: EulogiseProduct.BOOKLET,
            })
          expect(newCardProductPages[0].rows[0]).toEqual({
            ...MOCK_CARD_PRODUCT_TEXT_ROW,
            data: {
              content: {
                blocks: [
                  {
                    data: {},
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: [],
                    key: 'mock-key',
                    text: 'Mar 20th 1954',
                    type: 'header-one',
                  },
                ],
                entityMap: {},
              },
            },
          })
        })
      })
    })

    describe('Bookmark', () => {
      it('should always return 2 pages (first and last pages) when we have more than 2 pages', () => {
        const firstPage = {
          rows: [
            {
              id: 'first-page',
            },
          ],
        } as ICardProductPage
        const secondPage = {
          rows: [
            {
              id: 'second-page',
            },
          ],
        } as ICardProductPage
        const thirdPage = {
          rows: [
            {
              id: 'third-page',
            },
          ],
        } as ICardProductPage
        const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
          firstPage,
          secondPage,
          thirdPage,
        ]
        const newCardProductPages =
          ThemeHelper.applyDefaultDataToCardProductPages({
            cardProductPages: MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
            product: EulogiseProduct.BOOKMARK,
          })
        expect(newCardProductPages).toHaveLength(2)
        expect(newCardProductPages).toEqual([firstPage, thirdPage])
      })
    })
  })

  describe('convertCardProductDynamicContentToTemplate', () => {
    describe('text field', () => {
      const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
        {
          rows: [MOCK_CARD_PRODUCT_TEXT_ROW],
        },
      ]

      it('should return convert all dynamicDataId and return a correct template', () => {
        results = ThemeHelper.convertCardProductDynamicContentToTemplate(
          MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
        )

        expect(results).toEqual([
          {
            rows: [
              {
                data: {
                  content: {
                    blocks: [
                      {
                        data: {},
                        depth: 0,
                        entityRanges: [],
                        inlineStyleRanges: [],
                        key: 'mock-key',
                        text: '{{{dateOfBirth}}}',
                        type: 'header-one',
                      },
                    ],
                    entityMap: {},
                  },
                },
                dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
                id: 'mock-row-id',
                type: 'text',
              },
            ],
          },
        ])
      })
    })

    describe('frame field', () => {
      const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
        {
          rows: [MOCK_CARD_PRODUCT_FRAME_ROW],
        },
      ]

      it('should not convert frame data', () => {
        results = ThemeHelper.convertCardProductDynamicContentToTemplate(
          MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
        )
        expect(results).toEqual([
          {
            rows: [MOCK_CARD_PRODUCT_FRAME_ROW],
          },
        ])
      })
    })

    describe('space field', () => {
      const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
        {
          rows: [MOCK_CARD_PRODUCT_SPACE_ROW],
        },
      ]

      it('should return not convert template', () => {
        results = ThemeHelper.convertCardProductDynamicContentToTemplate(
          MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
        )
        expect(results).toEqual(MOCK_CARD_PRODUCT_DYNAMIC_CONTENT)
      })
    })

    describe('multiple fields and pages', () => {
      const MOCK_CARD_PRODUCT_DYNAMIC_CONTENT: Array<ICardProductPage> = [
        {
          rows: [MOCK_CARD_PRODUCT_TEXT_ROW, MOCK_CARD_PRODUCT_SPACE_ROW],
        },
        {
          rows: [MOCK_CARD_PRODUCT_FRAME_ROW],
        },
      ]
      it('should return correct template', () => {
        results = ThemeHelper.convertCardProductDynamicContentToTemplate(
          MOCK_CARD_PRODUCT_DYNAMIC_CONTENT,
        )
        expect(results).toEqual([
          {
            rows: [
              {
                data: {
                  content: {
                    blocks: [
                      {
                        data: {},
                        depth: 0,
                        entityRanges: [],
                        inlineStyleRanges: [],
                        key: 'mock-key',
                        text: '{{{dateOfBirth}}}',
                        type: 'header-one',
                      },
                    ],
                    entityMap: {},
                  },
                },
                dynamicDataId: CardProductDynamicDataKey.dateOfBirth,
                id: 'mock-row-id',
                type: 'text',
              },
              MOCK_CARD_PRODUCT_SPACE_ROW,
            ],
          },
          {
            rows: [MOCK_CARD_PRODUCT_FRAME_ROW],
          },
        ])
      })
    })
  })

  describe('mapThemeProductToProduct', () => {
    it('should return correct Eulogise products', () => {
      expect(
        ThemeHelper.mapThemeProductToProduct(EulogiseProductThemeMap.BOOKLET),
      ).toEqual(EulogiseProduct.BOOKLET)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.BOOKLET_US,
        ),
      ).toEqual(EulogiseProduct.BOOKLET)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.SIDED_CARD,
        ),
      ).toEqual(EulogiseProduct.SIDED_CARD)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.SIDED_CARD_US,
        ),
      ).toEqual(EulogiseProduct.SIDED_CARD)
      expect(
        ThemeHelper.mapThemeProductToProduct(EulogiseProductThemeMap.BOOKMARK),
      ).toEqual(EulogiseProduct.BOOKMARK)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.THANK_YOU_CARD,
        ),
      ).toEqual(EulogiseProduct.THANK_YOU_CARD)
      expect(
        ThemeHelper.mapThemeProductToProduct(EulogiseProductThemeMap.SLIDESHOW),
      ).toEqual(EulogiseProduct.SLIDESHOW)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.TV_WELCOME_SCREEN,
        ),
      ).toEqual(EulogiseProduct.TV_WELCOME_SCREEN)
      expect(
        ThemeHelper.mapThemeProductToProduct(
          EulogiseProductThemeMap.SLIDESHOW_TITLE_SLIDE,
        ),
      ).toEqual(EulogiseProduct.TV_WELCOME_SCREEN)
    })
  })

  describe('isProductAvailableInTheme', () => {
    describe('Booklet AU', () => {
      const product = EulogiseProduct.BOOKLET
      const theme: ITheme = {
        // @ts-ignore
        products: {
          booklet: {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: USA', () => {
        it('should return false', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(false)
        })
      })

      describe('ProductType: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })
    })

    describe('Booklet US', () => {
      const product = EulogiseProduct.BOOKLET
      const theme: ITheme = {
        // @ts-ignore
        products: {
          bookletUS: {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: AU', () => {
        it('should return false', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(false)
        })
      })
    })

    describe('Bookmark', () => {
      const product = EulogiseProduct.BOOKMARK
      const theme: ITheme = {
        // @ts-ignore
        products: {
          bookmark: {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })
    })

    describe('Slideshow', () => {
      const product = EulogiseProduct.SLIDESHOW
      const theme: ITheme = {
        // @ts-ignore
        products: {
          slideshow: {} as unknown as ISlideshowTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })
    })

    describe('Sided Card', () => {
      const product = EulogiseProduct.SIDED_CARD
      const theme: ITheme = {
        // @ts-ignore
        products: {
          [EulogiseProductThemeMap.SIDED_CARD]:
            {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: USA', () => {
        it('should return false', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(false)
        })
      })
    })

    describe('Sided Card US', () => {
      const product = EulogiseProduct.SIDED_CARD
      const theme: ITheme = {
        // @ts-ignore
        products: {
          [EulogiseProductThemeMap.SIDED_CARD_US]:
            {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return false', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(false)
        })
      })

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })
    })

    describe('Thankyou card', () => {
      const product = EulogiseProduct.THANK_YOU_CARD
      const theme: ITheme = {
        // @ts-ignore
        products: {
          [EulogiseProductThemeMap.THANK_YOU_CARD]:
            {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })
    })

    describe('TV Welcome screen', () => {
      const product = EulogiseProduct.TV_WELCOME_SCREEN
      const theme: ITheme = {
        // @ts-ignore
        products: {
          [EulogiseProductThemeMap.TV_WELCOME_SCREEN]:
            {} as unknown as ICardProductTheme,
        },
      }

      describe('Region: AU', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.AU,
            }),
          ).toEqual(true)
        })
      })

      describe('Region: USA', () => {
        it('should return true', () => {
          expect(
            ThemeHelper.isProductAvailableInTheme({
              theme,
              product,
              region: EulogiseRegion.USA,
            }),
          ).toEqual(true)
        })
      })
    })
  })

  describe('getAvailableProductsFromTheme', () => {
    const MOCK_THEME: ITheme = {
      products: {
        // @ts-ignore
        [EulogiseProductThemeMap.BOOKLET]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.BOOKLET_US]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.SIDED_CARD]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.SIDED_CARD_US]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.BOOKMARK]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.TV_WELCOME_SCREEN]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.SLIDESHOW]: {},
        // @ts-ignore
        [EulogiseProductThemeMap.THANK_YOU_CARD]: {},
      },
    }

    describe('AU', () => {
      const region = EulogiseRegion.AU
      describe('With specific enabledProducts', () => {
        const activeCase = {
          region,
          enabledProducts: { [EulogiseProduct.BOOKLET]: true },
        } as unknown as ICase

        beforeEach(() => {
          results = ThemeHelper.getAvailableProductsFromTheme({
            activeCase,
            theme: MOCK_THEME,
          })
        })

        it('should return only the available EulogiseProducts', () => {
          expect(results).toEqual(['BOOKLET'])
        })
      })

      describe('With initial default products', () => {
        const activeCase = {
          enabledProducts: INITIAL_DEFAULT_PRODUCTS,
        } as ICase

        beforeEach(() => {
          results = ThemeHelper.getAvailableProductsFromTheme({
            activeCase,
            theme: MOCK_THEME,
          })
        })

        it('should return all the available EulogiseProducts', () => {
          console.log('results', results)
          expect(results).toEqual([
            'BOOKLET',
            'BOOKMARK',
            'SIDED_CARD',
            'SLIDESHOW',
            'THANK_YOU_CARD',
            'TV_WELCOME_SCREEN',
          ])
        })
      })
    })

    describe('USA', () => {
      const region = EulogiseRegion.USA
      describe('With specific enabledProducts', () => {
        const activeCase = {
          region,
          enabledProducts: { [EulogiseProduct.BOOKLET]: true },
        } as unknown as ICase

        beforeEach(() => {
          results = ThemeHelper.getAvailableProductsFromTheme({
            activeCase,
            theme: MOCK_THEME,
          })
        })

        it('should return only the available EulogiseProducts', () => {
          expect(results).toEqual(['BOOKLET'])
        })
      })

      describe('with initial default products', () => {
        const activeCase = {
          region,
          enabledProducts: INITIAL_DEFAULT_PRODUCTS,
        } as ICase

        beforeEach(() => {
          results = ThemeHelper.getAvailableProductsFromTheme({
            activeCase,
            theme: MOCK_THEME,
          })
        })

        it('should return all the available EulogiseProducts', () => {
          console.log('results', results)
          expect(results).toEqual([
            'BOOKLET',
            'BOOKMARK',
            'SIDED_CARD',
            'SLIDESHOW',
            'THANK_YOU_CARD',
            'TV_WELCOME_SCREEN',
          ])
        })
      })
    })
  })

  describe('getEulogiseProductThemeMapValueByProduct', () => {
    const region = EulogiseRegion.USA
    describe('US', () => {
      it('should return correct keys', () => {
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.BOOKLET,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.BOOKLET_US)

        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.SIDED_CARD,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.SIDED_CARD_US)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.THANK_YOU_CARD,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.THANK_YOU_CARD)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.SLIDESHOW,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.SLIDESHOW)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.BOOKMARK,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.BOOKMARK)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.TV_WELCOME_SCREEN,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.TV_WELCOME_SCREEN)
      })
    })

    describe('AU', () => {
      const region = EulogiseRegion.AU
      it('should return correct key', () => {
        // AU
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.BOOKLET,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.BOOKLET)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.SIDED_CARD,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.SIDED_CARD)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.THANK_YOU_CARD,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.THANK_YOU_CARD)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.SLIDESHOW,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.SLIDESHOW)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.BOOKMARK,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.BOOKMARK)
        expect(
          ThemeHelper.getEulogiseProductThemeMapValueByProduct({
            product: EulogiseProduct.TV_WELCOME_SCREEN,
            region,
          }),
        ).toEqual(EulogiseProductThemeMap.TV_WELCOME_SCREEN)
      })
    })
  })
})
