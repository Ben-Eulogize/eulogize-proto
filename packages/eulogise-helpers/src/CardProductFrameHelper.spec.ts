import { CardProductFrameHelper } from './CardProductFrameHelper'
import {
  CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT,
  CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
  CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT,
  CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT,
  CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogiseImageOrientation,
  EulogiseProduct,
  ICardProductFadeEdgeType,
  ICardProductFrameAvailability,
  ICardProductFrameContentItem,
  ICardProductFrameImageContent,
  ICardProductFrameItem,
  ICardProductFrameLayout,
  IImageAssetContent,
  IPhotobookFrameSize,
} from '@eulogise/core'

const imageAssetContent1 = {
  filename: '6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
  type: 'image',
  filepath:
    'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
  filestackHandle: 'Fa8OHdznQDqRgxUUgV9h',
}
const imageAssetContent2 = {
  filename: 'Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
  type: 'image',
  filepath:
    'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
  filestackHandle: 'JiTA3juSJ6BWoqOwB4y4',
}

describe('CardProductFrameHelper', () => {
  const contentId1 = 'content-id-1'
  const contentId3 = 'content-id-3'
  const mockFrameContent: ICardProductFrameItem = {
    type: 'rows',
    items: [
      {
        type: 'columns',
        items: [
          {
            type: 'content',
            id: contentId1,
          },
          {
            type: 'content',
            id: 'content-id-2',
          },
        ],
      },
      {
        type: 'content',
        id: contentId3,
      },
    ],
  }

  describe('getFrameSizeByRatio', () => {
    describe('421 x 556.14', () => {
      it('should return Large', () => {
        const ratio = 421.90999999999997 / 556.14
        const results = CardProductFrameHelper.getFrameSizeByRatio(ratio)
        expect(results).toEqual(IPhotobookFrameSize.LG)
      })
    })
  })

  describe('getFirstContentId', () => {
    describe('Exists', () => {
      it('should return content-id-1', () => {
        const results =
          CardProductFrameHelper.getFirstContentId(mockFrameContent)
        expect(results).toEqual(contentId1)
      })
    })

    describe('With empty column/row', () => {
      it('should return content-id-3', () => {
        const results = CardProductFrameHelper.getFirstContentId({
          ...mockFrameContent,
          items: [
            {
              type: 'columns',
              items: [],
            },
            {
              type: 'content',
              id: contentId3,
            },
          ],
        })
        expect(results).toEqual(contentId3)
      })
    })

    describe('Not exist', () => {
      it('should return undefined', () => {
        const results = CardProductFrameHelper.getFirstContentId({
          type: 'rows',
          items: [
            {
              type: 'columns',
              items: [],
            },
          ],
        })
        expect(results).toBeUndefined()
      })
    })
  })

  describe('getFrameContentById', () => {
    describe('Exists', () => {
      it('should return contentItem1', () => {
        const results = CardProductFrameHelper.getFrameContentById(
          mockFrameContent,
          contentId1,
        )
        expect(results).toEqual({ id: 'content-id-1', type: 'content' })
      })

      it('should return contentItem1', () => {
        const results = CardProductFrameHelper.getFrameContentById(
          mockFrameContent,
          contentId3,
        )
        expect(results).toEqual({ id: 'content-id-3', type: 'content' })
      })
    })
  })

  describe('assignImageAssetsToLayout', () => {
    describe('single image layout', () => {
      const imageAssets: Array<ICardProductFrameImageContent> = [
        imageAssetContent1 as ICardProductFrameImageContent,
        imageAssetContent2 as ICardProductFrameImageContent,
      ]
      it('should assign image assets values to layout', () => {
        expect(
          CardProductFrameHelper.assignImageAssetsToLayout(
            CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
            imageAssets,
          ),
        ).toEqual({
          layoutId: 'card-product-frame-one-portrait',
          type: 'rows',
          items: [
            {
              type: 'content',
              content: imageAssetContent1,
              id: expect.any(String),
            },
          ],
          fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
          width: 105,
          height: 210,
          isAddAsRatio: true,
          frameAvailability: ICardProductFrameAvailability.CARD,
          metadata: {
            frameOrientations: [EulogiseImageOrientation.PORTRAIT],
          },
        })
      })
    })

    describe('multiple image layout', () => {
      const imageAssets: Array<ICardProductFrameImageContent> = [
        imageAssetContent1 as ICardProductFrameImageContent,
        imageAssetContent2 as ICardProductFrameImageContent,
      ]
      it('should assign image assets values to layout', () => {
        const results = CardProductFrameHelper.assignImageAssetsToLayout(
          CARD_PRODUCT_FRAME_TOP_ROW_BOTTOM_TWO_COLUMNS_LAYOUT,
          imageAssets,
        )
        expect(results).toEqual({
          layoutId: 'card-product-frame-top-row-bottom-two-columns',
          fadeEdge: ICardProductFadeEdgeType.NONE,
          type: 'rows',
          height: 210,
          frameAvailability: ICardProductFrameAvailability.ALL,
          width: 210,
          items: [
            {
              type: 'content',
              content: {
                filename:
                  '6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
                type: 'image',
                filepath:
                  'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
                filestackHandle: 'Fa8OHdznQDqRgxUUgV9h',
              },
              id: expect.any(String),
            },
            {
              type: 'columns',
              items: [
                {
                  type: 'content',
                  content: {
                    filename:
                      'Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
                    type: 'image',
                    filepath:
                      'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
                    filestackHandle: 'JiTA3juSJ6BWoqOwB4y4',
                  },
                  id: expect.any(String),
                },
                {
                  type: 'content',
                  content: {
                    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
                    type: 'image',
                  },
                  id: expect.any(String),
                },
              ],
            },
          ],
          metadata: { frameOrientations: ['LANDSCAPE', 'SQUARE', 'SQUARE'] },
        })
      })
    })
  })

  describe('getFrameLayoutImageAssets', () => {
    const layout: ICardProductFrameLayout = {
      type: 'rows',
      items: [
        {
          type: 'content',
          content: imageAssetContent1 as ICardProductFrameImageContent,
          id: 'sts7bfym',
        },
        {
          type: 'columns',
          items: [
            {
              id: 'eeytqlco',
              type: 'content',
              content: {
                ...(imageAssetContent2 as ICardProductFrameImageContent),
                transformX: -198.0921052631579,
                transformY: -159,
                renderImageHeight: 266,
                renderImageWidth: 413,
              },
            },
            {
              type: 'content',
              id: 'dze1djwq',
            },
            {
              type: 'content',
              id: '9p1nnt55',
            },
          ],
          id: 'q0cy87p6',
        },
      ],
      id: 'biuhbuj9',
    }

    it('should return image assets', () => {
      expect(CardProductFrameHelper.getFrameLayoutImageAssets(layout)).toEqual([
        {
          filename:
            '6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
          type: 'image',
          filepath:
            'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/6r5NRkeuT7at3TufPM2D_jeremy-brady-B7X7R_Q0c-c-unsplash.jpg',
          filestackHandle: 'Fa8OHdznQDqRgxUUgV9h',
        },
        {
          filename: 'Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
          type: 'image',
          filepath:
            'cases/21b40bfb-0cec-4489-9b23-d53bd964ec0f/gallery/Ynfhwr0RRfK5vojuED7x_avin-cp-h8pngKKUyYc-unsplash.jpg',
          filestackHandle: 'JiTA3juSJ6BWoqOwB4y4',
        },
      ])
    })
  })

  describe('getFrameLayouts', () => {
    describe('null', () => {
      describe('no product', () => {
        it('should return all card product layouts', () => {
          expect(CardProductFrameHelper.getFrameLayouts(null)).toEqual(
            CardProductFrameHelper.getCardFrameLayouts(null),
          )
        })
      })

      describe('photobook', () => {
        const product = EulogiseProduct.PHOTOBOOK
        it('should return all photobook layouts', () => {
          expect(CardProductFrameHelper.getFrameLayouts(null, product)).toEqual(
            CardProductFrameHelper.getPhotobookFrameLayouts(null),
          )
        })
      })

      describe('booklet', () => {
        const product = EulogiseProduct.BOOKLET
        it('should return all card products layouts', () => {
          expect(CardProductFrameHelper.getFrameLayouts(null, product)).toEqual(
            CardProductFrameHelper.getCardFrameLayouts(null),
          )
        })
      })
    })

    describe('1 Photo Layout', () => {
      it('should return 1 photo layouts', () => {
        expect(CardProductFrameHelper.getFrameLayouts(1).length).toEqual(12)
      })
    })

    describe('2 Photos Layout', () => {
      it('should return 2 photos layouts', () => {
        expect(CardProductFrameHelper.getFrameLayouts(2).length).toEqual(6)
      })
    })
  })

  describe('getNoOfPhotosInFrameLayout()', () => {
    it('should return no of photos of a given layout', () => {
      let results
      results = CardProductFrameHelper.getNoOfPhotosInFrameLayout(
        CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
      )
      expect(results).toEqual(1)

      results = CardProductFrameHelper.getNoOfPhotosInFrameLayout(
        CARD_PRODUCT_FRAME_TWO_EVEN_COLUMNS_LAYOUT,
      )
      expect(results).toEqual(2)

      results = CardProductFrameHelper.getNoOfPhotosInFrameLayout(
        CARD_PRODUCT_FRAME_THREE_EVEN_COLUMNS_LAYOUT,
      )
      expect(results).toEqual(3)

      results = CardProductFrameHelper.getNoOfPhotosInFrameLayout(
        CARD_PRODUCT_FRAME_TOP_THREE_COLUMNS_BOTTOM_ROW_LAYOUT,
      )
      expect(results).toEqual(4)

      results = CardProductFrameHelper.getNoOfPhotosInFrameLayout(
        CARD_PRODUCT_FRAME_TOP_TWO_COLUMNS_BOTTOM_TWO_COLUMNS_LAYOUT,
      )
      expect(results).toEqual(4)
    })
  })

  describe('getUpdatedLayoutFromNewContentItem()', () => {
    describe('Root Level', () => {
      const contentItemId = 'boedo36m'
      const layout: ICardProductFrameLayout = {
        type: 'rows',
        items: [
          {
            type: 'content',
            id: contentItemId,
          },
        ],
        id: '3j7ypn26',
      }
      const contentItem: ICardProductFrameContentItem = {
        type: 'content',
        id: contentItemId,
        content: {
          type: 'image',
          filestackHandle: 'I04TcJR0QuGJExdisr85',
          renderImageHeight: 353,
          renderImageWidth: 629,
        },
      }

      it('should update layout with the new content', () => {
        const result =
          CardProductFrameHelper.getUpdatedLayoutFromNewContentItem(
            layout,
            contentItem,
          )
        expect(result).toEqual({
          ...layout,
          items: [contentItem],
        })
      })
    })

    describe('Nested', () => {
      const contentItemId = 'boedo36m'
      const layout: ICardProductFrameLayout = {
        type: 'columns',
        items: [
          {
            type: 'rows',
            items: [
              {
                type: 'content',
              },
              {
                type: 'content',
                id: contentItemId,
              },
            ],
          },
          {
            type: 'content',
          },
        ],
      }
      const contentItem: ICardProductFrameContentItem = {
        type: 'content',
        id: contentItemId,
        content: {
          type: 'image',
          filestackHandle: 'I04TcJR0QuGJExdisr85',
          renderImageHeight: 353,
          renderImageWidth: 629,
        },
      }

      it('should update layout with the new content', () => {
        const result =
          CardProductFrameHelper.getUpdatedLayoutFromNewContentItem(
            layout,
            contentItem,
          )
        expect(result).toEqual({
          type: 'columns',
          items: [
            {
              type: 'rows',
              items: [
                {
                  type: 'content',
                },
                contentItem,
              ],
            },
            {
              type: 'content',
            },
          ],
        })
      })
    })
  })

  describe('generateIdForLayout', () => {
    it('should generate id for each element', () => {
      expect(
        CardProductFrameHelper.generateIdForLayout(
          CARD_PRODUCT_FRAME_ONE_PORTRAIT_LAYOUT,
        ),
      ).toEqual({
        layoutId: 'card-product-frame-one-portrait',
        height: 210,
        fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
        isAddAsRatio: true,
        frameAvailability: ICardProductFrameAvailability.CARD,
        width: 105,
        id: expect.any(String),
        items: [{ id: expect.any(String), type: 'content' }],
        type: 'rows',
        metadata: {
          frameOrientations: [EulogiseImageOrientation.PORTRAIT],
        },
      })

      expect(
        CardProductFrameHelper.generateIdForLayout({
          type: 'rows',
          items: [
            {
              type: 'content',
            },
            {
              type: 'columns',
              items: [
                {
                  type: 'content',
                },
                {
                  type: 'content',
                },
              ],
            },
          ],
        }),
      ).toEqual({
        id: expect.any(String),
        items: [
          { id: expect.any(String), type: 'content' },
          {
            id: expect.any(String),
            items: [
              { type: 'content', id: expect.any(String) },
              { type: 'content', id: expect.any(String) },
            ],
            type: 'columns',
          },
        ],
        type: 'rows',
      })

      expect(
        CardProductFrameHelper.generateIdForLayout(
          CARD_PRODUCT_FRAME_LEFT_COLUMN_RIGHT_TWO_ROWS_LAYOUT,
        ),
      ).toEqual({
        layoutId: 'card-product-frame-left-column-right-two-rows',
        id: expect.any(String),
        fadeEdge: ICardProductFadeEdgeType.NONE,
        type: 'columns',
        width: 210,
        height: 210,
        frameAvailability: ICardProductFrameAvailability.ALL,
        items: [
          {
            id: expect.any(String),
            type: 'content',
          },
          {
            id: expect.any(String),
            type: 'rows',
            items: [
              {
                id: expect.any(String),
                type: 'content',
              },
              {
                id: expect.any(String),
                type: 'content',
              },
            ],
          },
        ],
        metadata: {
          frameOrientations: ['PORTRAIT', 'SQUARE', 'SQUARE'],
        },
      })
    })
  })

  describe('centeringFrameItemImage', () => {
    const imageContentItem: ICardProductFrameContentItem = {
      type: 'content',
      content: {
        type: 'image',
        filename: 'filename',
        filestackHandle: 'fileHandle',
      },
    }
    const frameItem: ICardProductFrameItem = {
      type: 'rows',
      items: [
        {
          type: 'columns',
          items: [imageContentItem],
        },
      ],
    }

    it('should update the primary image', () => {
      const primaryImage: IImageAssetContent = {
        filename: 'newFilename',
        filestackHandle: 'newFileHandle',
        filepath: 'newFilepath',
        width: 200,
        height: 200,
      }
      const newFrameData = CardProductFrameHelper.centeringFrameItemImage({
        frameItem,
        imageAssetContent: primaryImage,
        containerSize: {
          width: 100,
          height: 100,
        },
      })
      expect(newFrameData).toEqual({
        items: [
          {
            items: [
              {
                content: {
                  ...primaryImage,
                  type: 'image',
                  renderImageHeight: 104,
                  renderImageWidth: 104,
                  transformX: -52,
                  transformY: -52,
                },
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

  describe('getFirstContentItem()', () => {
    describe('found', () => {
      const imageContentItem: ICardProductFrameContentItem = {
        type: 'content',
        content: {
          type: 'image',
          filename: 'filename',
          filestackHandle: 'fileHandle',
        },
      }
      const rowData: ICardProductFrameItem = {
        type: 'rows',
        items: [
          {
            type: 'columns',
            items: [imageContentItem],
          },
        ],
      }

      it('should return the first content item', () => {
        expect(CardProductFrameHelper.getFirstContentItem(rowData)).toEqual(
          imageContentItem,
        )
      })
    })

    describe('not found', () => {
      const rowData: ICardProductFrameItem = {
        type: 'rows',
        items: [
          {
            type: 'columns',
            items: [],
          },
        ],
      }

      it('should return the first content item', () => {
        expect(CardProductFrameHelper.getFirstContentItem(rowData)).toEqual(
          null,
        )
      })
    })
  })
})
