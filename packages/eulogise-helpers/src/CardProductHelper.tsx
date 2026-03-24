import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RawDraftContentState,
} from 'draft-js'
import Mustache from 'mustache'
import {
  AlignmentType,
  AU_BOOKLET_CONTENT_HEIGHT,
  AU_BOOKLET_CONTENT_WIDTH,
  AU_BOOKLET_FULL_WIDTH_WIDTH,
  BLEED,
  BLEED_IN_MM,
  BleedPageMode,
  CARD_PRODUCT_DEFAULT_COMMON_DATA,
  CARD_PRODUCT_DEFAULT_THEME_DATA,
  CARD_PRODUCT_NORMAL_EDITOR_VERTICAL_PADDING_IN_REM,
  CARD_PRODUCT_THANK_YOU_CARD_EDITOR_VERTICAL_PADDING_IN_REM,
  CARD_PRODUCTS_OVERLAYS,
  CardProductBorderCategory,
  CardProductBorderPageType,
  CardProductBorderType,
  CardProductContentItemType,
  CardProductPageColMode,
  CardProductPageMode,
  CardProductPageOrientation,
  CardProductPageSize,
  CardProductViewDisplayMode,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  DEFAULT_ORIGINAL_FRAME_SIZE,
  DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT,
  DYNAMIC_THEME_FONT_SIZE_ADAPTION_THRESHOLD,
  EULOGISE_EDITOR_MIN_WIDTH,
  EulogiseCardProducts,
  EulogiseExportProductName,
  EulogisePage,
  EulogiseProduct,
  EulogiseProductAverageGenerationTimeText,
  EulogiseProductDownloadProductFileTypes,
  EulogiseProductDownloadProductName,
  EulogiseProductFileTypes,
  EulogiseProductName,
  EulogiseProductPageCursors,
  EulogiseProductShortName,
  EulogiseRegion,
  EulogiseResource,
  EulogiseResourceName,
  EulogiseUserRole,
  EulogiseViewPort,
  GenericCardProductTypeFoldType,
  getCardProductBorderStyle,
  GetImageObject,
  IAllActiveCardProducts,
  IBorderSettingsModalFormFields,
  ICardPopulatedTextData,
  ICardPopulatedTextDataPrimaryImage,
  ICardProductBackground,
  ICardProductColumnRowData,
  ICardProductContent,
  ICardProductData,
  ICardProductFadeEdgeType,
  ICardProductFrameColumnsItem,
  ICardProductFrameContentItem,
  ICardProductFrameItem,
  ICardProductFrameLayout,
  ICardProductFrameParentItem,
  ICardProductFrameRow,
  ICardProductFrameRowData,
  ICardProductFrameRowsItem,
  ICardProductFrameTextContent,
  ICardProductIconRow,
  ICardProductIconRowData,
  ICardProductImageRow,
  ICardProductImageRowData,
  ICardProductImageType,
  ICardProductNewPageStyles,
  ICardProductOverlayUpdateOptions,
  ICardProductPage,
  ICardProductPageMarginsType,
  ICardProductPageStyle,
  ICardProductRow,
  ICardProductRowData,
  ICardProductSingleBorder,
  ICardProductSpaceRow,
  ICardProductState,
  ICardProductTextRow,
  ICardProductTextRowData,
  ICardProductTheme,
  ICaseData,
  IEulogiseState,
  IGenericCardProductContent,
  IGenericCardProductData,
  IGenericCardProductMetadata,
  IGenericCardProductTypeData,
  IGenericCardProductTypeDimension,
  IImageAsset,
  IImageAssetContent,
  IImageSize,
  IPageContentWidthAndHeight,
  IResourceRowContent,
  IRowStyle,
  ISlideshowTheme,
  ITheme,
  MarginType,
  MAX_DUMMY_IMAGE_DIMENSION,
  MemorialVisualStatus,
  MemorialVisualStatusLevelOrder,
  MM_TO_PAGE_SIZE_SCALE,
  ModalId,
  PAGE_SIZES,
  PRODUCT_THUMBNAIL_SIZE,
  ResourceFileStatus,
  ResourceFileStatusKey,
  US_BOOKLET_CONTENT_HEIGHT,
  US_BOOKLET_CONTENT_WIDTH,
  US_BOOKLET_FULL_WIDTH_WIDTH,
  VIEW_PORT_IN_MM,
} from '@eulogise/core'
import {
  CARD_PRODUCT_NEW_PAGE_FRAMES_ROWS,
  CARD_PRODUCT_NEW_PAGE_IMAGE_ROWS,
  CARD_PRODUCT_NEW_PAGE_TEXT_ROWS,
} from './cardProduct.constants'
import { ImageHelper } from './ImageHelper'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { UtilHelper } from './UtilHelper'
import { CardProductFrameHelper } from './CardProductFrameHelper'
import { ThemeHelper } from './ThemeHelper'
import { FontHelper } from './FontHelper'
import { DateTimeHelper } from './DateTimeHelper'
import { ICardProductFrameImageContent } from '@eulogise/core/dist/types/EulogiseCardProductFrame.types'
import { CacheBusterHelper } from './CacheBusterHelper'
import { PhotobookHelper } from './PhotobookHelper'
import { UrlHelper } from './UrlHelper'
import { MOCK_THEMES_WITH_NORMAL_BORDERS } from '@eulogise/mock'

const THANK_YOU_CARD_PAGE_SIZE: { [key: number]: string } = {
  1: 'THANKYOUCARD',
  2: 'THANKYOUCARD_2_COLS',
}
const TV_WELCOME_SCREEN_PAGE_SIZE: { [key: number]: string } = {
  1: 'TV_WELCOME_SCREEN',
  2: 'TV_WELCOME_SCREEN_2_COLS',
}

const getDefaultThemeDataByRegion = (
  region: EulogiseRegion,
): {
  [key: string]: ICardPopulatedTextData & {
    bookmarkPrimaryImage?: ICardPopulatedTextDataPrimaryImage
    thankyouCardPrimaryImage?: ICardPopulatedTextDataPrimaryImage
    tvWelcomeScreenPrimaryImage?: ICardPopulatedTextDataPrimaryImage
  }
} => {
  return {
    aura: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Lisa Colby',
      primaryImage: {
        height: 232,
        width: 232,
      },
      bookmarkPrimaryImage: {
        width: 129,
        height: 129,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 276,
        width: 276,
      },
    },
    grandeur: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Diego Garcia',
      primaryImage: {
        lockAspectRatio: true,

        height:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_WIDTH
            : AU_BOOKLET_CONTENT_WIDTH,
        width:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_HEIGHT
            : AU_BOOKLET_CONTENT_HEIGHT,
        borderRadius: '200px',
      },
      bookmarkPrimaryImage: {
        lockAspectRatio: true,

        width: 132,
        height: 132,
        borderRadius: '100px',
      },
      thankyouCardPrimaryImage: {
        lockAspectRatio: true,

        height: 172,
        width: 172,
        borderRadius: '100px',
      },
      tvWelcomeScreenPrimaryImage: {
        lockAspectRatio: true,
        height: 280,
        width: 280,
      },
    },
    linen: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Kimberly Davenport',
      primaryImage: {
        height: 293,
        width: 293,
      },
      bookmarkPrimaryImage: {
        width: 132,
        height: 160,
      },
      thankyouCardPrimaryImage: {
        height: 172,
        width: 172,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 273,
        width: 220,
      },
    },
    reflection: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Eva Langmoore',
      primaryImage: {
        height: 334,
        width: 334,
      },
      bookmarkPrimaryImage: {
        width: 132,
        height: 245,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 287,
        width: 262,
      },
    },
    grace: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Angela Ambrose',
      primaryImage: {
        height: region === EulogiseRegion.USA ? US_BOOKLET_CONTENT_WIDTH : 354,
        width: region === EulogiseRegion.USA ? US_BOOKLET_CONTENT_HEIGHT : 354,
      },
      bookmarkPrimaryImage: {
        width: 152,
        height: 275,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 270,
        width: 270,
      },
    },
    classic: {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Ross Adley',
      primaryImage: {
        height: DEFAULT_ORIGINAL_FRAME_SIZE,
        width: (DEFAULT_ORIGINAL_FRAME_SIZE * 2) / 3,
        borderRadius: '90%',
      },
      bookmarkPrimaryImage: {
        width: (DEFAULT_ORIGINAL_FRAME_SIZE * 2) / 3,
        height: DEFAULT_ORIGINAL_FRAME_SIZE,
        borderRadius: '90%',
      },
      tvWelcomeScreenPrimaryImage: {
        height: 288,
        width: 223,
      },
    },
    'gold-roses': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Sarah J. McFarland',
      primaryImage: {
        height: 213,
        width: 213,
        lockAspectRatio: true,
        borderRadius: '100rem',
      },
      bookmarkPrimaryImage: {
        borderRadius: '100rem',

        lockAspectRatio: true,
        width: 136,
        height: 136,
      },
      tvWelcomeScreenPrimaryImage: {
        lockAspectRatio: true,
        width: 227,
        height: 227,
      },
    },
    'watercolor-sailing': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Sarah J. McFarland',
      primaryImage: {
        height: 210,
        width: 210,
      },
      thankyouCardPrimaryImage: {
        height: 179,
        width: 179,
        borderRadius: '.5rem',
      },
      bookmarkPrimaryImage: {
        borderRadius: '90%',

        width: 140,
        height: 210,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 210,
        width: 210,
      },
    },
    'pastel-blue-roses': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Pastel Blue Roses',
      primaryImage: {
        height: 211,
        width:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_HEIGHT
            : AU_BOOKLET_CONTENT_HEIGHT,
      },
      bookmarkPrimaryImage: {
        borderRadius: '50% 50% 0 0',

        width: 151,
        height: 207,
      },
      tvWelcomeScreenPrimaryImage: {
        borderRadius: '50% 50% 0 0',

        height: 248,
        width: 169,
      },
    },
    'pink-pastel': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Jane Louise Jones',
      primaryImage: {
        height: 187,
        width:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_HEIGHT
            : AU_BOOKLET_CONTENT_HEIGHT,
      },
      thankyouCardPrimaryImage: {
        width: 174,
        height: 110,
      },
      bookmarkPrimaryImage: {
        width: 132,
        height: 160,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 180,
        width: 290,
      },
    },
    'fall-flowers': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Fall Flowers',
      primaryImage: {
        borderRadius: '200px',
        lockAspectRatio: true,
        height:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_WIDTH
            : AU_BOOKLET_CONTENT_WIDTH,
        width:
          region === EulogiseRegion.USA
            ? US_BOOKLET_CONTENT_HEIGHT
            : AU_BOOKLET_CONTENT_HEIGHT,
      },
      thankyouCardPrimaryImage: {
        height: 172,
        width: 172,
        borderRadius: '100px',
      },
      bookmarkPrimaryImage: {
        width: 129,
        height: 129,
      },
      tvWelcomeScreenPrimaryImage: {
        height: 240,
        width: 240,
        lockAspectRatio: true,
      },
    },
    'minimal-arch': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Minimal Arch',
      primaryImage: {
        borderRadius: '50% 50% 0 0',
        height: 295,
        width: 284,
      },
      thankyouCardPrimaryImage: {
        borderRadius: '50% 50% 0 0',
        width: 180,
        height: 180,
        lockAspectRatio: true,
      },
      bookmarkPrimaryImage: {
        borderRadius: '50% 50% 0 0',
        lockAspectRatio: true,
        width: 132,
        height: 132,
      },
      tvWelcomeScreenPrimaryImage: {
        borderRadius: '50% 50% 0 0',
        height: 280,
        width: 280,
      },
    },
    'minimal-collage': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Jane M. Jones',
      primaryImage: {
        height: region === EulogiseRegion.USA ? US_BOOKLET_CONTENT_WIDTH : 340,
        width: region === EulogiseRegion.USA ? US_BOOKLET_CONTENT_HEIGHT : 340,
      },
      bookmarkPrimaryImage: {
        width: 132,
        height: 245,
      },
      // no thankyouCardPrimaryImage need as no primary image in the theme
      // no tvWelcomeScreenPrimaryImage need as no primary image in the theme
    },
    'modern-minimal': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Modern Minimal',
      primaryImage: {
        height: 272,
        width: 253,
      },
      thankyouCardPrimaryImage: {
        width: 180,
        height: 219,
      },
      bookmarkPrimaryImage: {
        width: 128,
        height: 145,
      },
      tvWelcomeScreenPrimaryImage: {
        lockAspectRatio: true,
        borderRadius: '200px',
        height: 280,
        width: 280,
      },
    },
    'full-width': {
      ...CARD_PRODUCT_DEFAULT_COMMON_DATA,
      deceasedName: 'Full Width',
      primaryImage: {
        height: 334,
        width:
          region === EulogiseRegion.USA
            ? US_BOOKLET_FULL_WIDTH_WIDTH
            : AU_BOOKLET_FULL_WIDTH_WIDTH,
        isFullWidth: true,
      },
      thankyouCardPrimaryImage: {
        width: 213,
        height: 253,
        isFullWidth: true,
      },
      bookmarkPrimaryImage: {
        width: 160,
        height: 150,
        isFullWidth: true,
      },
      tvWelcomeScreenPrimaryImage: {
        isFullWidth: true,
        height: 322,
        width: 323,
      },
    },
  }
}

export type ICardProductFramePayload = {
  frameContentItemId: string
  pageIndex: number
  rowId: string
  image: IImageAssetContent
}

export type IDummyBackgroundPagesParams = {
  productTheme: ICardProductTheme
  backgroundPaths?: Array<string>
  selectedDimension?: IGenericCardProductTypeDimension
}

type CreatePrimaryImageTemplateProps = {
  defaultPrimaryImage: ICardPopulatedTextDataPrimaryImage
  primaryImage: ICardPopulatedTextDataPrimaryImage
  isCurrentImage?: boolean
  isPrimaryImage?: boolean
  defaultThemeLayoutColumns?: number
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  region?: EulogiseRegion
  isPrimaryImageFullWidth?: boolean
}

type IGetCardProductS3FilePathParams = {
  caseId: string
  pageMode?: CardProductPageMode
  productName: string
  slug?: string
  bleed: boolean
  fileType?: 'pdf' | 'jpg'
}

export class CardProductHelper {
  public static getGenericProductTypeBySlug({
    slug,
    genericProductTypes,
  }: {
    slug: string
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): IGenericCardProductTypeData | undefined {
    return genericProductTypes?.find((g) => g.slug === slug)
  }

  public static getCoverPageSize(
    pageSize: CardProductPageSize,
  ): CardProductPageSize {
    switch (pageSize) {
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM:
        return CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE:
        return CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE_COVER
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM:
        return CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE:
        return CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE_COVER
      default:
        return pageSize
    }
  }

  public static attachPrimaryImageToCardProduct({
    cardProduct,
    primaryImage,
  }: {
    cardProduct: ICardProductData
    primaryImage?: IImageAssetContent
  }): ICardProductData {
    if (!primaryImage) {
      return cardProduct
    }
    const pageIndex = 0
    if (!cardProduct) {
      console.log(
        `attachPrimaryImageToCardProduct: cardProduct is undefined or null`,
      )
      return cardProduct
    }
    const cardProductPage = cardProduct.content.pages[pageIndex]
    if (!cardProductPage) {
      console.log(
        `attachPrimaryImageToCardProduct: cardProductPage is undefined`,
      )
      return cardProduct
    }
    const frameRow = cardProductPage.rows.find(
      (r) => r.type === CardProductContentItemType.FRAME,
    ) as ICardProductFrameRow
    if (!frameRow) {
      console.log(`attachPrimaryImageToCardProduct: imageRow is not found`)
      return cardProduct
    }
    const frameRowId = frameRow.id

    const [firstPage, ...restPages] = cardProduct.content.pages
    return {
      ...cardProduct,
      content: {
        ...cardProduct.content,
        pages: [
          {
            ...firstPage,
            rows: firstPage.rows.map((r) => {
              if (r.id === frameRowId) {
                return CardProductFrameHelper.attachImageToFrameRow({
                  frameRow,
                  imageAssetContent: primaryImage,
                })
              }
              return {
                ...r,
              }
            }),
          },
          ...restPages,
        ],
      },
    }
  }

  public static getCardProductImageFilestackHandles(
    cardProduct: ICardProductData,
  ): Array<string> {
    // get all the filestack from the card product
    const filestackHandles: Array<string> = []
    const pages = cardProduct.content.pages
    for (const page of pages) {
      const rows = page.rows
      for (const row of rows) {
        if (row.type === CardProductContentItemType.FRAME) {
          const frameRow = row as ICardProductFrameRow
          const frameContent = frameRow.data.content
          filestackHandles.push(
            ...CardProductFrameHelper.getFrameLayoutImageFilestackHandles(
              frameContent,
            ),
          )
        } else if (row.type === CardProductContentItemType.IMAGE) {
          const imageRow = row as ICardProductImageRow
          filestackHandles.push(imageRow.data.filestackHandle!)
        }
      }
    }
    return filestackHandles.filter(
      (f) => f !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
    )
  }

  public static isGraphicFrameRow(row: ICardProductFrameRow) {
    console.log(
      `[Bugsnag diagnostic data] - isGraphicFrameRow, row: ${JSON.stringify(
        row,
      )}`,
    )
    return !!row?.data?.content?.graphicFrame
  }

  private static getImagesByFrameContent(
    content: ICardProductFrameImageContent | ICardProductFrameTextContent,
  ): Array<string> {
    const images: Array<string> = []
    if (content.type === 'image') {
      const { filestackHandle } = content as ICardProductFrameImageContent
      if (filestackHandle) {
        images.push(filestackHandle)
      }
    }
    return images
  }

  private static getImagesByFrameRows(
    items: Array<ICardProductFrameItem>,
  ): Array<string> {
    let images: Array<string> = []
    for (const item of items) {
      if (item.type === 'rows' || item.type === 'columns') {
        images = images.concat(this.getImagesByFrameRows(item.items))
      } else if (item.type === 'content' && item.content) {
        images = images.concat(
          this.getImagesByFrameContent(
            item.content as ICardProductFrameImageContent,
          ),
        )
      }
    }
    return images
  }

  private static getImagesByCardProductFrameRow(
    row: ICardProductFrameRow,
  ): Array<string> {
    const rowContent = row.data.content
    if (rowContent.type === 'rows' || rowContent.type === 'columns') {
      return this.getImagesByFrameRows(rowContent.items)
    } else if (rowContent.type === 'content') {
      return this.getImagesByFrameContent(
        (rowContent as ICardProductFrameContentItem)
          .content as ICardProductFrameImageContent,
      )
    }
    return []
  }

  public static clearPhotobookPage({
    page,
    product,
  }: {
    page: ICardProductPage
    product: EulogiseProduct
  }): ICardProductPage {
    const rows = page.rows.map((row) => {
      if (row.type === CardProductContentItemType.FRAME) {
        return {
          ...row,
          data: CardProductFrameHelper.clearFrameRowData(row.data),
        }
      }
      return row
    })
    return {
      ...page,
      rows,
    }
  }

  public static clearCardProductPage({
    page,
    newRowsData,
  }: {
    page: ICardProductPage
    newRowsData: Array<ICardProductRow>
  }): ICardProductPage {
    return {
      ...page,
      rows: newRowsData.map((newRowData) => {
        return {
          ...newRowData,
          id: UtilHelper.generateID(8),
        }
      }),
    }
  }

  public static createBlankTextRows({
    product,
    productTheme,
    genericProductMetadata,
    region,
  }: {
    product: EulogiseProduct
    productTheme: ICardProductTheme
    genericProductMetadata?: IGenericCardProductMetadata
    region: EulogiseRegion
  }): Array<ICardProductRow> {
    const newBlankTextRowData = {
      id: UtilHelper.generateID(8),
      type: CardProductContentItemType.TEXT,
      data: CardProductHelper.createRowData({
        product,
        genericProductMetadata,
        type: CardProductContentItemType.TEXT,
        productTheme,
        options: {
          content: undefined,
          region,
        },
      }),
    } as ICardProductRow

    return [newBlankTextRowData]
  }

  public static getImageAssetsByPage(
    page: ICardProductPage,
  ): Array<ICardProductFrameImageContent> {
    const rows = page.rows
    let imageAssets: Array<ICardProductFrameImageContent> = []
    for (const row of rows) {
      if (row.type === CardProductContentItemType.FRAME) {
        imageAssets = imageAssets.concat(
          CardProductFrameHelper.getFrameLayoutImageAssets(row.data.content),
        )
      }
    }
    return imageAssets
  }

  public static getImageFilestackHandlesByPage(page: ICardProductPage) {
    const rows = page.rows
    let imageHandles: Array<string> = []
    for (const row of rows) {
      if (row.type === CardProductContentItemType.FRAME) {
        imageHandles = imageHandles.concat(
          this.getImagesByCardProductFrameRow(row),
        )
      } else if (row.type === CardProductContentItemType.IMAGE) {
        const imageRow = row as ICardProductImageRow
        const imageContent = imageRow.data
        const { filestackHandle } = imageContent
        if (filestackHandle) {
          imageHandles.push(filestackHandle)
        }
      }
    }
    return imageHandles
  }

  public static getAllImageFilestackHandles(cardProduct: ICardProductData) {
    if (!cardProduct) {
      console.log(`getAllImageFilestackHandles: cardProduct is undefined`)
      return
    }
    const pages = cardProduct.content.pages
    let imageHandles: Array<string> = []
    for (const page of pages) {
      const rows = page.rows
      for (const row of rows) {
        if (row.type === 'frame') {
          imageHandles = imageHandles.concat(
            this.getImagesByCardProductFrameRow(row),
          )
        } else if (row.type === 'image') {
          const imageRow = row as ICardProductImageRow
          const imageContent = imageRow.data
          const { filestackHandle } = imageContent
          if (filestackHandle) {
            imageHandles.push(filestackHandle)
          }
        }
      }
    }
    return imageHandles
  }

  public static getNoOfUseByImageHandle({
    cardProduct,
    imageHandle,
    product,
  }: {
    cardProduct: ICardProductData
    imageHandle: string
    product?: EulogiseProduct
  }) {
    if (!cardProduct || !product) {
      console.log(`getNoOfUseByImageHandle: cardProduct/product is undefined`)
      return
    }
    const usedImageHandles = this.getAllImageFilestackHandles(cardProduct)
    return usedImageHandles?.filter((handle) => handle === imageHandle).length
  }

  public static getViewPortByProduct({
    product,
    pageSize,
    pageMode,
  }: {
    product: EulogiseProduct
    pageSize?: CardProductPageSize
    pageMode?: CardProductPageMode
  }): EulogiseViewPort {
    switch (product) {
      case EulogiseProduct.BOOKLET: {
        if (pageSize === CardProductPageSize.HALF_LETTER_A5) {
          return EulogiseViewPort.BOOKLET_LETTER
        }
        return EulogiseViewPort.BOOKLET
      }
      case EulogiseProduct.SIDED_CARD: {
        if (pageSize === CardProductPageSize.HALF_LETTER_A5) {
          return EulogiseViewPort.SIDED_CARD_LETTER
        }
        return EulogiseViewPort.SIDED_CARD
      }
      case EulogiseProduct.BOOKMARK:
        return EulogiseViewPort.BOOKMARK
      case EulogiseProduct.GENERIC_CARD_PRODUCT:
        return EulogiseViewPort.GENERIC_CARD_PRODUCT
      case EulogiseProduct.TV_WELCOME_SCREEN:
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
        return EulogiseViewPort.TV_WELCOME_SCREEN
      case EulogiseProduct.THANK_YOU_CARD:
        return EulogiseViewPort.THANK_YOU_CARD
      case EulogiseProduct.PHOTOBOOK: {
        if (pageSize === CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM) {
          if (pageMode === CardProductPageMode.COVER_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER
          }
          if (pageMode === CardProductPageMode.SINGLE_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM_SINGLE_PAGE
          }
          return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_MEDIUM
        } else if (pageSize === CardProductPageSize.PHOTOBOOK_LARGE_PORTRAIT) {
          if (pageMode === CardProductPageMode.SINGLE_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_LARGE_PORTRAIT_SINGLE_PAGE
          }
          return EulogiseViewPort.PHOTOBOOK_LARGE_PORTRAIT
        } else if (
          pageSize === CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE
        ) {
          if (pageMode === CardProductPageMode.SINGLE_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE_SINGLE_PAGE
          }
          if (pageMode === CardProductPageMode.COVER_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE_COVER
          }
          return EulogiseViewPort.PHOTOBOOK_MILK_PREMIUM_LARGE
        } else if (
          pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM
        ) {
          if (pageMode === CardProductPageMode.SINGLE_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM_SINGLE_PAGE
          }
          if (pageMode === CardProductPageMode.COVER_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM_COVER
          }
          return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_MEDIUM
        } else if (
          pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE
        ) {
          if (pageMode === CardProductPageMode.SINGLE_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE_SINGLE_PAGE
          }
          if (pageMode === CardProductPageMode.COVER_PAGE) {
            return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE_COVER
          }
          return EulogiseViewPort.PHOTOBOOK_MILK_CLASSIC_LARGE
        }
        throw new Error(
          `getViewPortByProduct PHOTOBOOK: ${product} with pageSize ${pageSize} is not supported`,
        )
      }
      default:
        throw new Error(`getViewPortByProduct: ${product} is not supported`)
    }
  }

  public static addCacheBusterToCssBackground(
    backgroundCss: string,
  ): string | undefined {
    const urlPattern = /url\(['"]?(.+?)['"]?\)/g
    const matchedUrls: Array<string> | null = backgroundCss.match(urlPattern)
    if (!matchedUrls || matchedUrls.length === 0) {
      return backgroundCss
    }
    let newBackgroundCss = backgroundCss
    matchedUrls.forEach((text) => {
      const matchedUrl = text.replace(urlPattern, '$1')

      newBackgroundCss = newBackgroundCss.replace(
        matchedUrl,
        CacheBusterHelper.addCacheBusterToString(matchedUrl),
      )
    })
    return newBackgroundCss
  }

  public static async preCardProductSaveUpdateFrameItem(
    frameItem: ICardProductFrameItem,
    container?: { width?: number; height?: number },
  ): Promise<ICardProductFrameItem> {
    switch (frameItem.type) {
      case 'rows': {
        const containerWidth = container?.width
        const containerHeight = container?.height
        let newItems = []
        for (const item of frameItem.items) {
          const itemFlexPercent = CardProductFrameHelper.getFrameFlexPercent({
            frameItem,
            itemFlex: item.flex as number,
          })

          const itemSize =
            containerHeight && containerWidth
              ? {
                  height: containerHeight
                    ? containerHeight * itemFlexPercent
                    : undefined,
                  width: containerWidth ? containerWidth : undefined,
                }
              : undefined

          const newItem = await this.preCardProductSaveUpdateFrameItem(
            item,
            itemSize,
          )
          newItems.push(newItem)
        }
        return {
          ...frameItem,
          items: newItems,
        }
      }
      case 'columns': {
        const containerWidth = container?.width
        const containerHeight = container?.height
        let newItems = []
        for (const item of frameItem.items) {
          const itemFlexPercent = CardProductFrameHelper.getFrameFlexPercent({
            frameItem,
            itemFlex: item.flex as number,
          })

          const itemSize =
            containerWidth && containerHeight
              ? {
                  height: containerHeight ? containerHeight : undefined,
                  width: containerWidth
                    ? containerWidth * itemFlexPercent
                    : undefined,
                }
              : undefined

          const newItem = await this.preCardProductSaveUpdateFrameItem(
            item,
            itemSize,
          )
          newItems.push(newItem)
        }
        return {
          ...frameItem,
          items: newItems,
        }
      }
      case 'content': {
        if (frameItem.content?.type === 'image') {
          const frameImageContent =
            frameItem.content as ICardProductFrameImageContent

          // only perform calculation if the frameImageContent does not have renderImageWidth, renderImageHeight, transformX, transformY
          if (
            !frameImageContent?.renderImageWidth ||
            !frameImageContent?.renderImageHeight ||
            !frameImageContent?.transformX ||
            !frameImageContent?.transformY
          ) {
            const imageUrl = ImageHelper.getImageUrl(
              frameItem.content as GetImageObject,
            )
            // cannot calculate without container width and height
            if (!imageUrl) {
              return frameItem
            }

            // cannot calculate without container width and height
            if (!container && (!frameItem.width || !frameItem.height)) {
              return frameItem
            }

            const containerSize = {
              width: container ? container.width : frameItem.width,
              height: container ? container.height : frameItem.height,
            }
            const { renderWidth, renderHeight, transformY, transformX } =
              await CardProductFrameHelper.calculateDefaultFrameImageSizeAndPositionPromise(
                {
                  imageUrl,
                  imageHeight: frameImageContent.height,
                  imageWidth: frameImageContent.width,
                  // @ts-ignore
                  containerSize,
                  isBorderShowed: false,
                },
              )
            return {
              ...frameItem,
              content: {
                ...frameImageContent,
                renderImageWidth: renderWidth,
                renderImageHeight: renderHeight,
                transformX,
                transformY,
              },
            }
          }
        }
        return frameItem
      }
      default:
        throw new Error(
          `preCardProductSaveUpdateFrameItem: ${JSON.stringify(
            frameItem,
          )} is not supported`,
        )
    }
  }

  public static async preCardProductSaveUpdateFrame(
    frameData: ICardProductFrameRowData,
  ): Promise<ICardProductFrameRowData> {
    return {
      ...frameData,
      content: await this.preCardProductSaveUpdateFrameItem(frameData.content, {
        width: frameData.content.width,
        height: frameData.content.height,
      }),
    }
  }

  public static async preCardProductSaveUpdateRow(
    row: ICardProductRow,
  ): Promise<ICardProductRow> {
    if (row.type === CardProductContentItemType.FRAME) {
      return {
        ...row,
        data: await this.preCardProductSaveUpdateFrame(row.data),
      }
    }
    return row
  }

  public static async preCardProductSaveUpdatePage(
    page: ICardProductPage,
  ): Promise<ICardProductPage> {
    const rows = page.rows
    let newRows = []
    for (const row of rows) {
      newRows.push(await this.preCardProductSaveUpdateRow(row))
    }
    return {
      ...page,
      rows: newRows,
    }
  }

  public static async preCardProductSaveUpdate(
    cardProduct: ICardProductContent | IGenericCardProductContent,
  ): Promise<ICardProductContent | IGenericCardProductContent> {
    const pages = cardProduct.pages
    const newPages = []
    for (const page of pages) {
      newPages.push(await this.preCardProductSaveUpdatePage(page))
    }
    return {
      ...cardProduct,
      pages: newPages,
    }
  }

  public static isAllowAutoRepopulatePrimaryImage({
    activeCase,
    cardProduct,
  }: {
    activeCase?: ICaseData
    cardProduct?: ICardProductData
  }): boolean {
    if (!activeCase || !cardProduct) {
      return false
    }
    // ONLY perform the following if the product status is THEME_SELECTED
    if (cardProduct.status !== MemorialVisualStatus.THEME_SELECTED) {
      return false
    }
    // ONLY perform the following if the product status is THEME_SELECTED
    // check if the primary image is different from the primary image in the case
    // should replace primaryImage
    const primaryImageHandle = activeCase?.deceased?.primaryImage
    if (primaryImageHandle) {
      const primaryImageSrc = ImageHelper.getImageUrl(primaryImageHandle)
      const existingPrimaryImageSrc = CardProductHelper.getPrimaryImageSrc(
        cardProduct.content,
      )
      if (primaryImageSrc !== existingPrimaryImageSrc) {
        return true
      }
    }
    return false
  }

  public static getPrimaryImageSrc(
    cardProduct: ICardProductContent,
  ): string | undefined {
    const pages = cardProduct.pages
    for (const page of pages) {
      const rows = page.rows
      for (const row of rows) {
        if (this.isPrimaryImageRow(row)) {
          const primaryImageRow = row as ICardProductFrameRow
          const firstContentItem = CardProductFrameHelper.getFirstContentItem(
            primaryImageRow.data.content,
          )
          if (!firstContentItem) {
            console.log('firstContentItem does not exist', firstContentItem)
            return
          }
          const content =
            firstContentItem.content as ICardProductFrameImageContent
          return ImageHelper.getImageUrl(content)
        }
      }
    }
    return
  }

  public static isProcessing(fileStatus: ResourceFileStatus) {
    return fileStatus === ResourceFileStatus.PROCESSING
  }

  public static createDummyBackgroundPages = ({
    productTheme,
    backgroundPaths,
  }: IDummyBackgroundPagesParams): Array<ICardProductPage> => {
    return (productTheme.defaultContent as Array<ICardProductPage>).map(
      (p, index) => {
        if (!backgroundPaths) {
          return p
        }
        return {
          ...p,
          background: {
            ...p.background,
            image: {
              url: `${EulogiseClientConfig.AWS_S3_URL}/${backgroundPaths[index]}`,
              //              filepath: backgroundPaths[index],
            },
          },
        }
      },
    )
  }

  public static getCaseS3BasePath({ caseId }: { caseId: string }) {
    return `cases/${caseId}`
  }

  public static getGeneratedProductS3BasePath({
    product,
    caseId,
  }: {
    product: EulogiseProduct
    caseId: string
  }) {
    return `${this.getCaseS3BasePath({ caseId })}/${product}`
  }

  public static getGeneratedProductS3PathByPageIndex({
    product,
    caseId,
    pageIndex,
  }: {
    product: EulogiseProduct
    caseId: string
    pageIndex: number
  }) {
    return `${this.getGeneratedProductS3BasePath({
      product,
      caseId,
    })}/page-${pageIndex}.jpg`
  }

  public static getGeneratedProductS3UrlByPageIndex(params: {
    product: EulogiseProduct
    caseId: string
    pageIndex: number
  }) {
    return `${
      EulogiseClientConfig.AWS_S3_URL
    }/${this.getGeneratedProductS3PathByPageIndex(params)}`
  }

  public static createDummyGenericCardProductData = ({
    productTheme,
    backgroundPaths,
    genericProductType,
    selectedDimension,
  }: IDummyBackgroundPagesParams & {
    genericProductType: IGenericCardProductTypeData
  }): ICardProductData => {
    const themeId = productTheme.id!
    const productContent = this.createCardProductContentByThemeId({
      product: EulogiseProduct.GENERIC_CARD_PRODUCT,
      genericProductType,
      selectedDimension,
      themeId: themeId!,
      theme: MOCK_THEMES_WITH_NORMAL_BORDERS.find((t) => t.id === themeId)!,
      region: EulogiseRegion.USA,
    })
    return {
      content: {
        ...productContent,
        /*
        pages: this.createDummyBackgroundPages({
          productTheme,
          backgroundPaths,
        }),
*/
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: 'dummy-id',
      case: 'dummy-case',
    } as IGenericCardProductData

    /*
        const pageMargins = this.getDefaultPageMargins({
          genericProductMetadata,
          product: EulogiseProduct.GENERIC_CARD_PRODUCT,
        })
        console.log('iiiiiiiicreateDummyGenericCardProductData', {
          genericProductMetadata,
          pageMargins,
        })
        return {
          content: {
            metadata: genericProductMetadata,
            theme: productTheme.id!,
            pageOrientation: CardProductPageOrientation.PORTRAIT,
            pageMargins,
            pageSize: CardProductPageSize.GENERIC_CARD_PRODUCT,
            pages: this.createDummyBackgroundPages({
              productTheme,
              backgroundPaths,
            }),
          },
          updatedAt: '2023-01-10T07:48:51.863Z',
          status: MemorialVisualStatus.THEME_SELECTED,
          createdAt: '2023-01-06T05:10:56.451Z',
          id: 'dummy-id',
          case: 'dummy-case',
        } as IGenericCardProductData
    */
  }

  public static createDummyBookletData = ({
    productTheme,
    backgroundPaths,
  }: IDummyBackgroundPagesParams): ICardProductData => {
    return {
      content: {
        pageMargins: CardProductHelper.getDefaultAUPageMargins({
          product: EulogiseProduct.BOOKLET,
        })!,
        pageSize: CardProductPageSize.A5,
        theme: productTheme.id!,
        pageOrientation: CardProductPageOrientation.PORTRAIT,
        pages: this.createDummyBackgroundPages({
          productTheme,
          backgroundPaths,
        }),
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: 'dummy-id',
      case: 'dummy-case',
    }
  }

  public static createDummyBookmarkData = ({
    productTheme,
    backgroundPaths,
  }: IDummyBackgroundPagesParams): ICardProductData => {
    return {
      content: {
        pageMargins: CardProductHelper.getDefaultAUPageMargins({
          product: EulogiseProduct.BOOKMARK,
        })!,
        pageSize: CardProductPageSize.BOOKMARK,
        theme: productTheme.id!,
        pageOrientation: CardProductPageOrientation.PORTRAIT,
        pages: this.createDummyBackgroundPages({
          productTheme,
          backgroundPaths,
        }),
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: 'dummy-id',
      case: 'dummy-case-id',
    }
  }

  public static createDummyTvWelcomeScreenCardData = ({
    productTheme,
    backgroundPaths,
  }: IDummyBackgroundPagesParams): ICardProductData => {
    return {
      content: {
        pageMargins: CardProductHelper.getDefaultAUPageMargins({
          product: EulogiseProduct.TV_WELCOME_SCREEN,
        })!,
        pageSize:
          productTheme.defaultThemeLayoutColumns === 1
            ? CardProductPageSize.TV_WELCOME_SCREEN
            : CardProductPageSize.TV_WELCOME_SCREEN_2_COLS,
        theme: productTheme.id!,
        pageOrientation: CardProductPageOrientation.PORTRAIT,
        pages: this.createDummyBackgroundPages({
          productTheme,
          backgroundPaths,
        }),
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: '71637251-d9e4-4a1d-ab1b-e4e88c7c3f99',
      case: 'a5d79550-76b9-4357-a15f-bdd20a22734d',
    }
  }

  public static createDummyThankYouCardData = ({
    productTheme,
    backgroundPaths,
  }: IDummyBackgroundPagesParams): ICardProductData => {
    return {
      content: {
        pageMargins: CardProductHelper.getDefaultAUPageMargins({
          product: EulogiseProduct.THANK_YOU_CARD,
        })!,
        pageSize:
          productTheme.defaultThemeLayoutColumns === 1
            ? CardProductPageSize.THANKYOUCARD
            : CardProductPageSize.THANKYOUCARD_2_COLS,
        theme: productTheme.id!,
        pageOrientation: CardProductPageOrientation.PORTRAIT,
        pages: this.createDummyBackgroundPages({
          productTheme,
          backgroundPaths,
        }),
      },
      updatedAt: '2023-01-10T07:48:51.863Z',
      status: MemorialVisualStatus.THEME_SELECTED,
      createdAt: '2023-01-06T05:10:56.451Z',
      id: '71637251-d9e4-4a1d-ab1b-e4e88c7c3f99',
      case: 'a5d79550-76b9-4357-a15f-bdd20a22734d',
    }
  }

  public static isPrimaryImageRow(row: ICardProductRow) {
    return row.dynamicDataId === 'primaryImage'
  }

  public static getProductThumbnailScaleByPageSize(
    productPageSize: CardProductPageSize,
    padding: number = 0,
  ): number {
    const [thumbnailWidth, thumbnailHeight] = PRODUCT_THUMBNAIL_SIZE
    let newProductPageSize = productPageSize
    if (
      productPageSize === CardProductPageSize.TV_WELCOME_SCREEN_2_COLS ||
      productPageSize === CardProductPageSize.SLIDESHOW_TITLE_SLIDE_2_COLS
    ) {
      newProductPageSize = CardProductPageSize.TV_WELCOME_SCREEN
    } else if (productPageSize === CardProductPageSize.THANKYOUCARD_2_COLS) {
      newProductPageSize = CardProductPageSize.THANKYOUCARD
    }
    const [productWidth, productHeight] = PAGE_SIZES[newProductPageSize]
    const horizontalScale = (thumbnailWidth - padding * 2) / productWidth
    const verticalScale = (thumbnailHeight - padding * 2) / productHeight
    return Math.min(horizontalScale, verticalScale)
  }

  public static getProductState({
    currentState,
    product,
    slug,
  }: {
    currentState: IEulogiseState
    product: EulogiseProduct
    slug?: string
  }) {
    const {
      slideshows,
      sidedCards,
      booklets,
      bookmarks,
      thankYouCards,
      tvWelcomeScreens,
      photobooks,
      slideshowTitleSlides,
      genericCardProducts,
    } = currentState
    switch (product) {
      case EulogiseProduct.SIDED_CARD:
        return sidedCards
      case EulogiseProduct.BOOKLET:
        return booklets
      case EulogiseProduct.BOOKMARK:
        return bookmarks
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return tvWelcomeScreens
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
        return slideshowTitleSlides
      case EulogiseProduct.SLIDESHOW:
        return slideshows
      case EulogiseProduct.THANK_YOU_CARD:
        return thankYouCards
      case EulogiseProduct.PHOTOBOOK:
        return photobooks
      case EulogiseProduct.GENERIC_CARD_PRODUCT: {
        if (slug) {
          return genericCardProducts.productsState[slug]
        }
        throw new Error(
          `getProductState: Generic Card Product (${slug}) does not support`,
        )
      }
      default:
        throw new Error(
          `getProductState: product type: ${product} does not exist`,
        )
    }
  }

  public static getUpdatedRowContentDataForFrame({
    framePayload,
    frameItemData,
  }: {
    framePayload: ICardProductFramePayload
    frameItemData: ICardProductFrameItem
  }): ICardProductFrameItem {
    if ((frameItemData as ICardProductFrameParentItem).items) {
      return {
        ...frameItemData,
        items: (frameItemData as ICardProductFrameParentItem).items.map(
          (item: ICardProductFrameItem) => {
            if (item.type === 'rows' || item.type === 'columns') {
              return this.getUpdatedRowContentDataForFrame({
                framePayload,
                frameItemData: item,
              })
            }
            if (
              item.type === 'content' &&
              item.id === framePayload.frameContentItemId
            ) {
              // trigger auto resize on the CardProductFrameImageItem
              const resetProps = {
                renderImageWidth: undefined,
                renderImageHeight: undefined,
                /*
                width: undefined,
                height: undefined,
*/
                transformX: undefined,
                transformY: undefined,
              }
              const content = {
                type: 'image', // add default type to image
                ...(item as ICardProductFrameContentItem).content, // 'type' will get overwritten by existing type
                ...framePayload.image,
                ...resetProps,
                // Explicitly set preset from the new image to avoid inheriting
                // the previous image's preset when the new image has no preset key
                preset: framePayload.image.preset,
              }
              const newContentItem = {
                ...item,
                content,
              }
              return newContentItem as ICardProductFrameContentItem
            }
            return item
          },
        ),
      } as ICardProductFrameItem
    }
    return frameItemData
  }

  public static getPagePrintScale(
    displayMode: CardProductViewDisplayMode,
    product: EulogiseProduct,
    bleed?: boolean,
  ) {
    // if it is non print mode, just return 1
    if (displayMode !== CardProductViewDisplayMode.PRINT) {
      return 1
    }
    if (bleed) {
      if (product === EulogiseProduct.THANK_YOU_CARD) {
        // 101 is a number that works for Thank you card print bleed divided by 72 dpi
        return 101 / 71.8
      }
      // 99 is a number that works for Booklet, bookmark and sided card print bleed divided by 72 dpi
      return 99 / 71.8
    }
    // 96 dpi divided by 72 dpi
    return 96 / 71.8
  }

  public static mmToPx(mm: number): number {
    return Math.round(mm * MM_TO_PAGE_SIZE_SCALE * 100) / 100
  }

  public static pxToMm(px: number): number {
    return Math.round((px / MM_TO_PAGE_SIZE_SCALE) * 100) / 100
  }

  public static isHigherProductStatusPriority(
    newStatus: MemorialVisualStatus,
    existingStatus: MemorialVisualStatus,
  ) {
    const newStatusPriority = MemorialVisualStatusLevelOrder.indexOf(newStatus)
    const existingStatusPriority = MemorialVisualStatusLevelOrder.indexOf(
      existingStatus!,
    )
    return newStatusPriority > existingStatusPriority
  }

  public static getHigherProductStatusPriority(
    newStatus: MemorialVisualStatus,
    existingStatus: MemorialVisualStatus,
  ) {
    if (this.isHigherProductStatusPriority(newStatus, existingStatus)) {
      return newStatus
    }
    return existingStatus
  }

  private static getPageStyle({
    product,
    pageWidth,
    pageHeight,
    pageMargins,
    page,
    isBleed,
    isTwoPagesButActAsOnePage,
  }: {
    product: EulogiseProduct
    pageWidth: number
    pageHeight: number
    pageMargins: Array<number> | number
    page: ICardProductPage
    isBleed?: boolean
    isTwoPagesButActAsOnePage: boolean
  }) {
    const pm = pageMargins as Array<number>
    const pageBackgroundLayers = []
    const pageStyle: ICardProductPageStyle = {
      width: pageWidth,
      height: pageHeight,
      paddingTop: pm[1],
      paddingBottom: pm[3] || pm[1],
    }

    // Comments: As we cannot use the specific pixes of margin to define overlay size, so we decide to use the percentage to define it
    // for example: if margin we passed in is [20, 30], which means the overlay width should be 80% of original, and height should be 90% of the original height,
    // and the card product page will use `contain`, which is 100% width and 100% height of the parent container

    // Add optional page content background color
    const background = page.background
    /*
    if (background && background.overlayColor) {
      const margin = background.overlayMargin
        ? background.overlayMargin
        : [0, 0]

      pageBackgroundLayers.push({
        width: pageWidth - pageWidth * margin[0],
        height: pageHeight - pageHeight * margin[1],
        color: this.hexToRgba(
          background.overlayColor,
          background.overlayOpacity || 1,
        ),
      })
    }
*/

    // Add optional page background image
    if (background && background.image) {
      const bleed: number = isTwoPagesButActAsOnePage ? BLEED * 2 : 0

      pageBackgroundLayers.push({
        width: pageWidth + bleed,
        height: pageHeight + bleed,
        url: ImageHelper.getImageUrl(background.image),
      })
    }

    if (pageBackgroundLayers.length) {
      pageStyle.backgroundImage = pageBackgroundLayers
        .map((layer) => (layer.url ? `url('${layer.url}')` : undefined))
        .filter(Boolean)
        .join(', ')

      /*
      if (background && background.overlayColor) {
        const overlayBackgroundSize = this.getDefaultBorderAndOverlaySize(page)
        const overlayBackground = overlayBackgroundSize
          ? `${overlayBackgroundSize.width}% ${overlayBackgroundSize.height}%, contain`
          : `contain`
        const originalBackground = `contain`

        pageStyle.backgroundSize = `${overlayBackground}, ${originalBackground}`
      } else {
*/
      pageStyle.backgroundSize = `contain`
      //      }
    }

    // Add optional page background color
    if (background && background.color) {
      pageStyle.backgroundColor = background.color
    }
    return pageStyle
  }

  // input with marginX and marginY and return width and height in percentage
  public static getBorderAndOverlaySize({
    marginX,
    marginY,
  }: {
    marginX: number
    marginY: number
  }):
    | {
        width: number
        height: number
      }
    | undefined {
    if (
      marginX === undefined ||
      marginX === null ||
      marginY === undefined ||
      marginY === null
    ) {
      return { width: 0, height: 0 }
    }
    const width = 100 - marginX
    const height = 100 - marginY
    return { width, height }
  }

  public static getDefaultBorderAndOverlaySize(page?: ICardProductPage) {
    const margin = page?.background?.overlayMargin
      ? page.background.overlayMargin
      : [0, 0]

    return this.getBorderAndOverlaySize({
      marginX: margin?.[0],
      marginY: margin?.[1],
    })
  }

  public static moveContent(
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any,
  ) {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result: any = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  public static getIndexFromId(id: string): number {
    return Number(id.replace('page', ''))
  }

  public static reorder(
    list: Array<any>,
    startIndex: number,
    endIndex: number,
  ) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  public static getContentHeight({
    rows,
    product,
  }: {
    rows: Array<any>
    product: EulogiseProduct
  }) {
    return (rows || []).reduce((total, row) => {
      let height: number = row.data.height
      if (row.type === CardProductContentItemType.COLUMNS) {
        height = row.data.items.reduce(
          (curr: number, i: any) =>
            curr < i.data.height ? i.data.height : curr,
          0,
        )
      } else if (row.type === CardProductContentItemType.IMAGE) {
        height = row.data?.height
      } else if (row.type === CardProductContentItemType.TEXT) {
        const marginTopAndBottom = (row.data?.margin?.[0] || 0) * 2
        if (product === EulogiseProduct.PHOTOBOOK) {
          height = DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
        } else {
          height = row.data?.height + marginTopAndBottom
        }
      } else if (row.type === CardProductContentItemType.SPACE) {
        height = row.data?.height
      } else if (row.type === CardProductContentItemType.FRAME) {
        height = row.data?.height
      }
      return total + (height || 0)
    }, 0)
  }

  public static contentCanFit(params: {
    maxPageContentHeight?: number
    rows: Array<any>
    options: {
      pageSize?: string
      pageMargins: ICardProductPageMarginsType
      pageOrientation?: CardProductPageOrientation
      pageHeight?: number
    }
    product: EulogiseProduct
  }) {
    const { rows, options, product, maxPageContentHeight } = params
    const {
      pageSize,
      pageMargins,
      pageOrientation = CardProductPageOrientation.PORTRAIT,
      pageHeight,
    } = options
    const BOTTOM_MARGIN = 20
    const maxHeight =
      maxPageContentHeight ??
      Math.floor(
        (pageHeight ??
          PAGE_SIZES[pageSize!][
            pageOrientation === CardProductPageOrientation.PORTRAIT ? 1 : 0
          ]) -
          (Array.isArray(pageMargins)
            ? (pageMargins?.[1] as number)
            : pageMargins),
      ) - BOTTOM_MARGIN
    const nextHeight = this.getContentHeight({ rows, product })
    if (nextHeight >= maxHeight) {
      console.log('please reduce theme size', maxHeight - nextHeight - 1)
    }
    return nextHeight < maxHeight
  }

  public static getIconItemSize({
    genericProductMetadata,
  }: {
    genericProductMetadata?: IGenericCardProductMetadata
  }) {
    const defaultIconItemSize =
      EulogiseClientConfig.CARD_PRODUCT_ICON_ITEM_DEFAULT_SIZE
    if (!genericProductMetadata) {
      return defaultIconItemSize
    }
    const minSize = Math.min(
      genericProductMetadata?.selectedDimension?.height ?? defaultIconItemSize,
      genericProductMetadata?.selectedDimension?.width ?? defaultIconItemSize,
    )
    return Math.round(minSize / 4)
  }

  public static createIconRowData({
    row,
    genericProductMetadata,
  }: {
    row: ICardProductIconRowData
    genericProductMetadata?: IGenericCardProductMetadata
  }): ICardProductIconRowData {
    const size = this.getIconItemSize({
      genericProductMetadata,
    })
    return {
      height: size,
      width: size,
      ...row,
    }
  }

  private static getSpaceItemHeight({
    genericProductMetadata,
  }: {
    genericProductMetadata?: IGenericCardProductMetadata
  }) {
    const defaultSpaceItemHeight =
      EulogiseClientConfig.CARD_PRODUCT_SPACE_ITEM_MIN_HEIGHT
    if (!genericProductMetadata) {
      return defaultSpaceItemHeight
    }
    return (
      (genericProductMetadata?.selectedDimension?.height ??
        defaultSpaceItemHeight) / 4
    )
  }

  public static createSpaceRowData({
    row,
    genericProductMetadata,
  }: {
    row: Partial<ICardProductSpaceRow>
    genericProductMetadata?: IGenericCardProductMetadata
  }): ICardProductSpaceRow {
    const height = this.getSpaceItemHeight({
      genericProductMetadata,
    })
    return {
      height,
      type: CardProductContentItemType.SPACE,
      ...row,
    } as unknown as ICardProductSpaceRow
  }

  private static getFrameRowItemSize({
    genericProductMetadata,
  }: {
    genericProductMetadata?: IGenericCardProductMetadata
  }) {
    if (!genericProductMetadata) {
      return DEFAULT_ORIGINAL_FRAME_SIZE
    }
    const minSize = Math.min(
      genericProductMetadata?.selectedDimension?.height ??
        DEFAULT_ORIGINAL_FRAME_SIZE,
      genericProductMetadata?.selectedDimension?.width ??
        DEFAULT_ORIGINAL_FRAME_SIZE,
    )
    return Math.round(minSize / 4)
  }

  private static createFrameRowData({
    content,
    genericProductMetadata,
  }: {
    content: ICardProductFrameItem
    genericProductMetadata?: IGenericCardProductMetadata
  }): ICardProductFrameRowData {
    const defaultFrameSize = this.getFrameRowItemSize({
      genericProductMetadata,
    })
    return {
      type: CardProductContentItemType.FRAME,
      height: content.height ?? defaultFrameSize,
      width: content.width ?? defaultFrameSize,
      originalFrameSize: defaultFrameSize,
      content: content,
    } as ICardProductFrameRowData
  }

  public static createTextRowData({
    product,
    productTheme,
    options,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    productTheme?: ICardProductTheme
    options?: any
    genericProductMetadata?: IGenericCardProductMetadata
  }): ICardProductTextRowData {
    const {
      content = '',
      subType = 1,
      region = EulogiseRegion.AU,
      ...rest
    } = options ?? {}
    return {
      content: convertToRaw(
        ContentState.createFromText(content),
      ) as IResourceRowContent,
      style: 'unstyled',
      margin: [Math.ceil(productTheme?.defaultStyle.fontSize! / 2), 0],
      height:
        ((content || '').split('\n').length || 1) *
        productTheme?.defaultStyle.fontSize!,
      width: CardProductHelper.getDefaultPageContentWidthAndHeight({
        product,
        genericProductMetadata,
        defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
        region,
      }).width,
      alignment: AlignmentType.CENTER,
      ...rest,
    }
  }

  public static createImageRowData({
    rowData,
  }: {
    rowData: ICardProductImageRowData
  }): ICardProductImageRowData {
    return {
      filename: '',
      alignment: AlignmentType.CENTER,
      ...rowData,
    }
  }

  public static createRowData({
    product,
    type,
    productTheme,
    options,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    type: CardProductContentItemType
    productTheme?: ICardProductTheme
    options?: any
    genericProductMetadata?: IGenericCardProductMetadata
  }): ICardProductRowData {
    const {
      content = '',
      subType = 1,
      region = EulogiseRegion.AU,
      ...rest
    } = options ?? {}

    switch (type) {
      case CardProductContentItemType.TEXT:
        return this.createTextRowData({
          product,
          productTheme,
          options,
          genericProductMetadata,
        })
      case CardProductContentItemType.IMAGE:
        return this.createImageRowData({ rowData: rest })
      case CardProductContentItemType.COLUMNS: {
        const items: Array<any> = []

        for (let i = 0; i < subType; i++) {
          items.push({
            id: UtilHelper.generateID(8),
            type: CardProductContentItemType.IMAGE,

            data: this.createRowData({
              product,
              genericProductMetadata,
              type: CardProductContentItemType.IMAGE,
              productTheme,
              options: { region },
            }),
          })
        }

        return {
          items,
          ...rest,
        }
      }
      case CardProductContentItemType.ICON: {
        return this.createIconRowData({
          row: rest as ICardProductIconRowData,
          genericProductMetadata,
        })
      }
      case CardProductContentItemType.SPACE: {
        return this.createSpaceRowData({
          row: rest as ICardProductSpaceRow,
          genericProductMetadata,
        })
      }
      case CardProductContentItemType.FRAME:
        return this.createFrameRowData({
          content: content as unknown as ICardProductFrameItem,
          genericProductMetadata,
        })
      default:
        return {}
    }
  }

  public static getMaxGenericProductPageContentHeight({
    metadata,
  }: {
    metadata: IGenericCardProductMetadata
  }) {
    const [_, pageMarginY] = this.getDefaultPageMargins({
      product: EulogiseProduct.GENERIC_CARD_PRODUCT,
      genericProductMetadata: metadata,
    })
    const { pageHeight } = this.getPageWidthAndHeight({
      genericProductMetadata: metadata,
    })
    return pageHeight - pageMarginY * 2
  }

  public static isPageFull({
    cardProduct,
    rows,
    product,
  }: {
    cardProduct: ICardProductData | IGenericCardProductData
    rows: Array<ICardProductRow>
    product: EulogiseProduct
  }): boolean {
    let pageSize = '',
      pageMargins,
      pageOrientation = CardProductPageOrientation.PORTRAIT,
      pageHeight,
      maxPageContentHeight
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      const metadata = (cardProduct as IGenericCardProductData).content.metadata
      const selectedDim = metadata.selectedDimension
      if (
        selectedDim?.pageMarginsX !== undefined &&
        selectedDim?.pageMarginsY !== undefined
      ) {
        pageMargins = [
          selectedDim.pageMarginsX,
          selectedDim.pageMarginsY,
        ] as ICardProductPageMarginsType
      } else {
        // Fallback for legacy products that stored pageMargins on content
        pageMargins = (cardProduct as IGenericCardProductData).content
          .pageMargins as ICardProductPageMarginsType
      }
      pageHeight = metadata.selectedDimension?.height!
      maxPageContentHeight = this.getMaxGenericProductPageContentHeight({
        metadata,
      })
    } else {
      const content = cardProduct.content
      pageSize = content.pageSize
      pageMargins = content.pageMargins as ICardProductPageMarginsType
      pageOrientation = content.pageOrientation
    }
    return !this.contentCanFit({
      maxPageContentHeight,
      rows,
      options: {
        pageSize,
        pageMargins,
        pageOrientation,
        pageHeight,
      },
      product,
    })
  }

  public static hexToRgba(hex: string, opacity: number = 1) {
    let color: any

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      color = hex.substring(1).split('')

      if (color.length === 3) {
        color = [color[0], color[0], color[1], color[1], color[2], color[2]]
      }

      color = `0x${color.join('')}`

      return `rgba(${[
        (color >> 16) & 255,
        (color >> 8) & 255,
        color & 255,
      ].join(',')}, ${opacity})`
    }

    throw new Error('Bad Hex')
  }

  public static isCardProduct(product: EulogiseProduct): boolean {
    return [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.THANK_YOU_CARD,
      EulogiseProduct.TV_WELCOME_SCREEN,
      EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      EulogiseProduct.PHOTOBOOK,
      EulogiseProduct.GENERIC_CARD_PRODUCT,
    ].includes(product)
  }

  public static isAnyPageFull(
    cardProduct: ICardProductData,
    product: EulogiseProduct,
  ): boolean {
    return cardProduct?.content.pages.some((p: ICardProductPage) =>
      this.isPageFull({ cardProduct, rows: p.rows, product }),
    )
  }

  public static getRowHeight(row: ICardProductRow): number {
    if (row.type === CardProductContentItemType.COLUMNS) {
      return row.data.items.reduce(
        (curr: number, i: ICardProductImageRow) =>
          curr < i?.data.height! ? i.data.height : curr,
        0,
      ) as number
    }
    return row.data.height! as number
  }

  public static getRoleNameByType(role: EulogiseUserRole): string {
    // @ts-ignore
    return {
      [EulogiseUserRole.EDITOR]: 'Editor',
      [EulogiseUserRole.COEDITOR]: 'Coeditor',
      [EulogiseUserRole.CONTRIBUTOR]: 'Contributor',
      [EulogiseUserRole.CUSTOMER]: 'Customer',
      [EulogiseUserRole.ADMIN]: 'Admin',
    }[role]
  }

  public static getProductByUserRole(
    accountRole: EulogiseUserRole,
  ): EulogiseProduct | undefined {
    // @ts-ignore
    return {
      [EulogiseUserRole.VISITOR_SLIDESHOW]: EulogiseProduct.SLIDESHOW,
      [EulogiseUserRole.VISITOR_BOOKLET]: EulogiseProduct.BOOKLET,
      [EulogiseUserRole.VISITOR_BOOKMARK]: EulogiseProduct.BOOKMARK,
      [EulogiseUserRole.VISITOR_SIDED_CARD]: EulogiseProduct.SIDED_CARD,
      [EulogiseUserRole.VISITOR_THANKYOUCARD]: EulogiseProduct.THANK_YOU_CARD,
      [EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN]:
        EulogiseProduct.TV_WELCOME_SCREEN,
      [EulogiseUserRole.VISITOR_PHOTOBOOK]: EulogiseProduct.PHOTOBOOK,
    }[accountRole]
  }

  public static getProductByResourceName(
    resourceName: EulogiseResourceName,
  ): EulogiseProduct | undefined {
    // @ts-ignore
    return {
      slideshow: EulogiseProduct.SLIDESHOW,
      booklet: EulogiseProduct.BOOKLET,
      bookmark: EulogiseProduct.BOOKMARK,
      sidedCard: EulogiseProduct.SIDED_CARD,
      thankyouCard: EulogiseProduct.THANK_YOU_CARD,
      tvWelcomeScreen: EulogiseProduct.TV_WELCOME_SCREEN,
      slideshowTitleSlide: EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      photobook: EulogiseProduct.PHOTOBOOK,
      genericCardProduct: EulogiseProduct.GENERIC_CARD_PRODUCT,
    }[resourceName]
  }

  public static getPreviewModalIdByProduct(product: EulogiseProduct) {
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.SLIDESHOW]: ModalId.SLIDESHOW_PREVIEW,
      [EulogiseProduct.BOOKMARK]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.SIDED_CARD]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.THANK_YOU_CARD]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.TV_WELCOME_SCREEN]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.PHOTOBOOK]: ModalId.CARD_PRODUCT_PREVIEW,
      [EulogiseProduct.GENERIC_CARD_PRODUCT]: ModalId.CARD_PRODUCT_PREVIEW,
    }[product]
  }

  public static getEditPageByProduct({
    product,
  }: {
    product: EulogiseProduct
  }): EulogisePage {
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: EulogisePage.EDIT_BOOKLET,
      [EulogiseProduct.SLIDESHOW]: EulogisePage.EDIT_SLIDESHOW,
      [EulogiseProduct.BOOKMARK]: EulogisePage.EDIT_BOOKMARK,
      [EulogiseProduct.SIDED_CARD]: EulogisePage.EDIT_SIDED_CARD,
      [EulogiseProduct.THANK_YOU_CARD]: EulogisePage.EDIT_THANK_YOU_CARD,
      [EulogiseProduct.TV_WELCOME_SCREEN]: EulogisePage.EDIT_TV_WELCOME_SCREEN,
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]:
        EulogisePage.EDIT_SLIDESHOW_TITLE_SLIDE,
      [EulogiseProduct.PHOTOBOOK]: EulogisePage.EDIT_PHOTOBOOK,
      [EulogiseProduct.GENERIC_CARD_PRODUCT]:
        EulogisePage.EDIT_GENERIC_CARD_PRODUCTS,
    }[product]
  }

  public static getProductIdKey({
    genericProductType,
    product,
  }: {
    genericProductType?: IGenericCardProductTypeData
    product: EulogiseProduct
  }) {
    if (genericProductType) {
      return genericProductType.slug
    }
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: 'bookletId',
      [EulogiseProduct.SLIDESHOW]: 'slideshowId',
      [EulogiseProduct.BOOKMARK]: 'bookmarkId',
      [EulogiseProduct.SIDED_CARD]: 'sidedCardId',
      [EulogiseProduct.THANK_YOU_CARD]: 'thankYouCardId',
      [EulogiseProduct.TV_WELCOME_SCREEN]: 'tvWelcomeScreenId',
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'slideshowTitleSlideId',
      [EulogiseProduct.PHOTOBOOK]: 'photobookId',
      [EulogiseProduct.GENERIC_CARD_PRODUCT]: 'slugAndId',
    }[product]
  }

  public static getProductStateKeyByProduct({
    product,
  }: {
    product: EulogiseProduct
  }) {
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: 'booklet',
      [EulogiseProduct.SLIDESHOW]: 'slideshow',
      [EulogiseProduct.BOOKMARK]: 'bookmark',
      [EulogiseProduct.SIDED_CARD]: 'sidedCard',
      [EulogiseProduct.THANK_YOU_CARD]: 'thankYouCard',
      [EulogiseProduct.TV_WELCOME_SCREEN]: 'tvWelcomeScreen',
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: 'slideshowTitleSlide',
      [EulogiseProduct.PHOTOBOOK]: 'photobook',
    }[product]
  }

  public static getShareLinkUserRole(
    product: EulogiseProduct,
  ): EulogiseUserRole {
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: EulogiseUserRole.VISITOR_BOOKLET,
      [EulogiseProduct.BOOKMARK]: EulogiseUserRole.VISITOR_BOOKMARK,
      [EulogiseProduct.SIDED_CARD]: EulogiseUserRole.VISITOR_SIDED_CARD,
      [EulogiseProduct.THANK_YOU_CARD]: EulogiseUserRole.VISITOR_THANKYOUCARD,
      [EulogiseProduct.TV_WELCOME_SCREEN]:
        EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN,
      [EulogiseProduct.PHOTOBOOK]: EulogiseUserRole.VISITOR_PHOTOBOOK,
      [EulogiseProduct.SLIDESHOW]: EulogiseUserRole.VISITOR_SLIDESHOW,
    }[product]
  }

  public static getBorderStylesByType({
    borderType,
    editorScaledFactor,
  }: {
    borderType: CardProductBorderType
    editorScaledFactor: number
  }): Array<ICardProductSingleBorder> {
    return getCardProductBorderStyle({ borderType, editorScaledFactor })
  }

  public static hasMiddlePages({
    product,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
  }): boolean {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return (
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.BIFOLD ||
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.TRIFOLD
      )
    }
    if (product === EulogiseProduct.BOOKLET) {
      return true
    }
    return false
  }

  public static hasBackPage({
    product,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
  }): boolean {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return (
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.DOUBLE_SIDED ||
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.BIFOLD ||
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.TRIFOLD
      )
    }
    if (
      product === EulogiseProduct.BOOKLET ||
      product === EulogiseProduct.BOOKMARK ||
      product === EulogiseProduct.SIDED_CARD
    ) {
      return true
    }
    return false
  }

  public static isAllowAddPages({
    product,
    foldType,
  }: {
    product: EulogiseProduct
    foldType: GenericCardProductTypeFoldType
  }): boolean {
    return (
      product === EulogiseProduct.BOOKLET ||
      product === EulogiseProduct.PHOTOBOOK ||
      (product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
        foldType === GenericCardProductTypeFoldType.BIFOLD)
    )
  }

  private static readonly BOOKLET_MAX_PAGES = 28
  private static readonly BOOKLET_MIN_PAGES = 4
  private static readonly PHOTOBOOK_MAX_PAGES = 48
  private static readonly PHOTOBOOK_MIN_PAGES = 24

  public static getMaxPages({
    product,
    genericProductType,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
  }): number {
    if (product === EulogiseProduct.PHOTOBOOK) {
      return this.PHOTOBOOK_MAX_PAGES
    }
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType?.maxPages
    ) {
      return genericProductType.maxPages
    }
    return this.BOOKLET_MAX_PAGES
  }

  public static getMinPages({
    product,
    genericProductType,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
  }): number {
    if (product === EulogiseProduct.PHOTOBOOK) {
      return this.PHOTOBOOK_MIN_PAGES
    }
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType?.minPages
    ) {
      return genericProductType.minPages
    }
    return this.BOOKLET_MIN_PAGES
  }

  public static getNoOfPageCursors(
    product: EulogiseProduct,
  ): EulogiseProductPageCursors {
    return (EulogiseProductPageCursors as any)[product]
  }

  public static getResourceByProduct(
    product: EulogiseProduct,
  ): EulogiseResource {
    // @ts-ignore
    return EulogiseResource[product]
  }

  public static getProductName({
    product,
    genericProductType,
    genericProductMetadata,
    region,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
    region: EulogiseRegion
  }): EulogiseProductName | string {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      if (genericProductType) {
        return genericProductType.name
      }
      if (genericProductMetadata) {
        return genericProductMetadata.name
      }
      return ''
    }
    if (product === EulogiseProduct.BOOKLET && region === EulogiseRegion.USA) {
      return EulogiseProductName.BOOKLET_US
    }
    // @ts-ignore
    return EulogiseProductName[product]
  }

  public static getDownloadProductName({
    product,
  }: {
    product: EulogiseProduct
  }): EulogiseProductDownloadProductName {
    // @ts-ignore
    return EulogiseProductDownloadProductName[product]
  }

  public static getDownloadProductNameWithFileTypes({
    product,
  }: {
    product: EulogiseProduct
  }): EulogiseProductDownloadProductFileTypes {
    // @ts-ignore
    return EulogiseProductDownloadProductFileTypes[product]
  }

  public static getDownloadProductFileTypes({
    product,
  }: {
    product: EulogiseProduct
  }): EulogiseProductFileTypes {
    // @ts-ignore
    return EulogiseProductFileTypes[product]
  }

  public static getDownloadProductAverageGenerationText({
    product,
  }: {
    product: EulogiseProduct
  }): EulogiseProductAverageGenerationTimeText {
    // @ts-ignore
    return EulogiseProductAverageGenerationTimeText[product]
  }

  public static getProductServiceCardSelector(product: EulogiseProduct) {
    switch (product) {
      case EulogiseProduct.BOOKLET: {
        return '#order-of-service-booklet'
      }
      case EulogiseProduct.BOOKMARK: {
        return '#bookmark-card'
      }
      case EulogiseProduct.SIDED_CARD: {
        return '#a5-memorial-card'
      }
      case EulogiseProduct.SLIDESHOW: {
        return '#visual-tribute-slideshow-card'
      }
      case EulogiseProduct.TV_WELCOME_SCREEN: {
        return '#tv-welcome-screen-card'
      }
      case EulogiseProduct.THANK_YOU_CARD: {
        return '#a6-thankyou-card'
      }
    }
    return
  }

  public static getProductShortName({
    product,
    genericProductType,
    region,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    region: EulogiseRegion
  }): EulogiseProductShortName | string {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      if (genericProductType) {
        return genericProductType.name
      }
      return ''
    }
    if (product === EulogiseProduct.BOOKLET && region === EulogiseRegion.USA) {
      return EulogiseProductShortName.BOOKLET_US
    }
    // @ts-ignore
    return EulogiseProductShortName[product]
  }

  public static getDownloadProductExportName({
    product,
    productName,
    pageSize,
    isBleed,
    pageMode,
  }: {
    product: EulogiseProduct
    productName?: string
    pageSize?: CardProductPageSize
    isBleed?: boolean
    pageMode?: CardProductPageMode
  }): string {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return `${productName} ${isBleed ? 'with Bleed' : ''}`
    }
    if (product === EulogiseProduct.SIDED_CARD) {
      return `Memorial Card ${isBleed ? 'with Bleed' : ''}`
    }
    if (product === EulogiseProduct.PHOTOBOOK) {
      if (!pageSize) {
        throw new Error('pageSize is required for photobook export name')
      }
      const isCoverPage = pageMode === CardProductPageMode.COVER_PAGE
      // @ts-ignore
      return `${EulogiseExportProductName[pageSize as string]} ${
        isCoverPage ? 'Cover Page' : 'Internal Pages'
      }`
    }
    // @ts-ignore
    return `${EulogiseExportProductName[product]}${
      isBleed ? ' with Bleed' : ''
    }`
  }

  public static getProductExportName({
    product,
    genericProductMetadata,
    region,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    region: EulogiseRegion
  }): EulogiseExportProductName | string {
    if (genericProductMetadata) {
      return genericProductMetadata?.name
    }
    if (product === EulogiseProduct.BOOKLET && region === EulogiseRegion.USA) {
      return EulogiseExportProductName.BOOKLET_US
    }
    // @ts-ignore
    return EulogiseExportProductName[product]
  }

  public static getDefaultDeceasedContentByThemeId({
    product,
    themeId,
    region,
  }: {
    product?: EulogiseProduct
    themeId?: string
    region?: EulogiseRegion
  }): ICardPopulatedTextData {
    const defaultContent: ICardPopulatedTextData & {
      bookmarkPrimaryImage?: ICardPopulatedTextDataPrimaryImage
      thankyouCardPrimaryImage?: ICardPopulatedTextDataPrimaryImage
      tvWelcomeScreenPrimaryImage?: ICardPopulatedTextDataPrimaryImage
    } =
      (themeId
        ? getDefaultThemeDataByRegion(region!)[themeId]
        : CARD_PRODUCT_DEFAULT_THEME_DATA) ?? CARD_PRODUCT_DEFAULT_THEME_DATA
    const commonPrimaryImage = {
      filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
    }
    if (product) {
      if (product === EulogiseProduct.BOOKMARK) {
        return {
          ...defaultContent,
          primaryImage: {
            ...commonPrimaryImage,
            ...defaultContent.primaryImage,
            ...defaultContent.bookmarkPrimaryImage,
          },
        }
      } else if (product === EulogiseProduct.THANK_YOU_CARD) {
        return {
          ...defaultContent,
          primaryImage: {
            ...commonPrimaryImage,
            ...defaultContent.primaryImage,
            ...defaultContent.thankyouCardPrimaryImage,
          },
        }
      } else if (
        product === EulogiseProduct.TV_WELCOME_SCREEN ||
        product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
      ) {
        return {
          ...defaultContent,
          primaryImage: {
            ...commonPrimaryImage,
            ...defaultContent.primaryImage,
            ...(defaultContent as any).tvWelcomeScreenPrimaryImage,
          },
        }
      }
    }
    return {
      ...defaultContent,
      primaryImage: {
        ...commonPrimaryImage,
        ...defaultContent.primaryImage,
      },
    }
  }

  private static getMaxImageHeight(product: EulogiseProduct, height?: number) {
    if (height === undefined) {
      return
    }
    const MAX_HEIGHT = 360
    const MAX_TV_WELCOME_SCREEN_HEIGHT = 300
    if (
      product === EulogiseProduct.TV_WELCOME_SCREEN ||
      product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
    ) {
      return Math.min(height, MAX_TV_WELCOME_SCREEN_HEIGHT)
    }
    return Math.min(height, MAX_HEIGHT)
  }

  public static getRowByPagesAndRowId({
    pages,
    rowId,
  }: {
    pages: Array<ICardProductPage>
    rowId: string
  }): ICardProductRow | undefined {
    for (let page of pages) {
      for (let row of page.rows) {
        if (row.id === rowId) {
          return row
        }
      }
    }
    return
  }

  public static getRowById({
    cardProduct,
    rowId,
  }: {
    cardProduct: ICardProductData
    rowId: string
  }): ICardProductRow | undefined {
    return this.getRowByPagesAndRowId({
      pages: cardProduct.content?.pages,
      rowId,
    })
  }

  public static getFirstFrameContentIdByRowId(
    cardProduct: ICardProductData,
    rowId: string,
  ): string | undefined {
    const row = this.getRowById({ cardProduct, rowId })
    if (!row) {
      return undefined
    }
    return CardProductFrameHelper.getFirstContentId(
      (row.data as ICardProductFrameRowData).content as ICardProductFrameItem,
    )
  }

  public static getFirstFrameRowInPage(
    page: ICardProductPage,
  ): ICardProductFrameRow | undefined {
    const row = page.rows.find(
      (r) => r.type === CardProductContentItemType.FRAME,
    )
    if (!row) {
      console.log('no frame row found')
      return undefined
    }
    return row as ICardProductFrameRow
  }

  public static getFirstFrameRowIdInPage(page: ICardProductPage) {
    return this.getFirstFrameRowInPage(page)?.id
  }

  public static hasOnlyOneFrameRowInPage(page: ICardProductPage): boolean {
    return (
      page.rows.filter((r) => r.type !== CardProductContentItemType.SPACE)
        .length === 1 &&
      !!page.rows.find((r) => r.type === CardProductContentItemType.FRAME)
    )
  }

  public static getImageSizeByProduct({
    orgImageWidth,
    orgImageHeight,
    product,
    genericProductMetadata,
    productTheme,
    currentHeight,
    region,
  }: {
    orgImageWidth: number
    orgImageHeight: number
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    productTheme: ICardProductTheme
    currentHeight: number
    region: EulogiseRegion
  }) {
    let height: number, width: number
    const orgImageScale = orgImageWidth / orgImageHeight
    const isLandscape = orgImageScale > 1
    const isPortrait = orgImageScale < 1
    const { width: pageContentWidth } =
      CardProductHelper.getDefaultPageContentWidthAndHeight({
        product,
        genericProductMetadata,
        defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
        region,
      })

    if (isLandscape) {
      width =
        orgImageWidth > pageContentWidth ? pageContentWidth : orgImageWidth
      const scale = orgImageHeight / orgImageWidth
      const newHeight = scale * width
      if (orgImageHeight > newHeight) {
        height = newHeight
        width = newHeight * (orgImageWidth / orgImageHeight)
      } else {
        height = newHeight
      }
    } else if (isPortrait) {
      height = (
        orgImageHeight > currentHeight ? currentHeight : orgImageHeight
      )!
      const scale = orgImageWidth / orgImageHeight
      width = scale * height!
      if (width > pageContentWidth) {
        width = pageContentWidth
        height = pageContentWidth * (orgImageHeight / orgImageWidth)
      }
    }
    // square image
    else {
      height = currentHeight!
      width = currentHeight!
    }
    return {
      width,
      height,
    }
  }

  public static getImageSizeWithPresetHeight({
    defaultPrimaryImageHeight,
    primaryImageHeight,
    primaryImageWidth,
    genericProductType,
    product,
    defaultThemeLayoutColumns,
    region = EulogiseRegion.AU,
  }: {
    defaultPrimaryImageHeight: number
    primaryImageHeight: number
    primaryImageWidth: number
    genericProductType?: IGenericCardProductTypeData
    product: EulogiseProduct
    defaultThemeLayoutColumns?: number
    region?: EulogiseRegion
  }): {
    width: number
    height: number
  } {
    const adjustedImageHeight = this.getMaxImageHeight(
      product,
      defaultPrimaryImageHeight,
    )
    primaryImageWidth =
      primaryImageHeight && primaryImageWidth
        ? this.getScaledPrimaryImageWidthByHeight(
            {
              height: primaryImageHeight,
              width: primaryImageWidth,
            },
            adjustedImageHeight!,
          ).width
        : primaryImageWidth
    const maxImageWidth = this.getDefaultPageContentWidthAndHeight({
      product,
      genericProductType,
      defaultThemeLayoutColumns,
      region,
    }).width
    primaryImageWidth =
      primaryImageWidth > maxImageWidth ? maxImageWidth : primaryImageWidth
    return {
      width: primaryImageWidth,
      height: adjustedImageHeight!,
    }
    /*const { width: adjustedImageWidth, height: adjustedImageHeight } =
      this.getImageSizeByProduct({
        product,
        themeId,
        orgImageHeight: primaryImage?.height!,
        orgImageWidth: primaryImage?.width!,
        currentHeight: defaultContent.primaryImage?.height,
      })*/
  }

  public static createPrimaryImageTemplateObject(
    props: CreatePrimaryImageTemplateProps,
  ): ICardProductFrameRowData {
    return JSON.parse(this.createPrimaryImageTemplate(props))
  }

  public static createPrimaryImageTemplate({
    defaultPrimaryImage,
    primaryImage,
    isCurrentImage,
    isPrimaryImage,
    genericProductType,
    defaultThemeLayoutColumns,
    product,
    region,
    isPrimaryImageFullWidth,
  }: CreatePrimaryImageTemplateProps): string {
    const borderRadius = defaultPrimaryImage?.borderRadius || '0px'
    const rowContentHeight =
      defaultPrimaryImage?.height ?? DEFAULT_ORIGINAL_FRAME_SIZE
    const rowContentWidth =
      defaultPrimaryImage?.width ?? DEFAULT_ORIGINAL_FRAME_SIZE

    const { height: adjustedImageHeight, width: adjustedImageWidth } =
      this.getImageSizeWithPresetHeight({
        defaultPrimaryImageHeight: defaultPrimaryImage?.height!,
        defaultThemeLayoutColumns,
        genericProductType,
        product,
        primaryImageWidth: primaryImage?.width!,
        primaryImageHeight: primaryImage?.height!,
        region,
      })

    // if image template
    if (defaultPrimaryImage?.type === CardProductContentItemType.IMAGE) {
      return `{
        ${
          primaryImage?.filename
            ? `"filename": "${primaryImage?.filename}",`
            : ''
        }
        ${
          primaryImage?.filepath
            ? `"filepath": "${primaryImage?.filepath}",`
            : ''
        }
        ${
          primaryImage?.filestackHandle
            ? `"filestackHandle": "${primaryImage?.filestackHandle}",`
            : ''
        }
        ${
          adjustedImageHeight ? `"height": ${adjustedImageHeight ?? null},` : ''
        }
        ${adjustedImageWidth ? `"width": ${adjustedImageWidth ?? null},` : ''}
        "alignment": "center",
        "imageType": "${
          isCurrentImage
            ? ICardProductImageType.CURRENT_IMAGE
            : isPrimaryImage
            ? ICardProductImageType.PRIMARY_IMAGE
            : ICardProductImageType.DEFAULT_THEME_IMAGE
        }"
      }`
    } else {
      // frame template
      const newRowData: ICardProductFrameRowData = JSON.parse(
        `{ "isFullWidth": ${
          isPrimaryImageFullWidth ?? !!primaryImage?.isFullWidth
        }, "enableBorder": ${
          (primaryImage as any)?.enableBorder ?? false
        }, "width": ${adjustedImageWidth ?? null}, "height": ${
          adjustedImageHeight ?? null
        }, "content": { "lockAspectRatio": ${
          (primaryImage as ICardPopulatedTextDataPrimaryImage)
            ?.lockAspectRatio ?? false
        }, "width": ${rowContentWidth ?? null}, "height": ${
          rowContentHeight ?? null
        }, "type": "rows", "items": [{ "borderRadius": "${borderRadius}", "id": "lsx8vp0i", "type": "content", "content": { "type": "image","imageType": "${
          isCurrentImage
            ? ICardProductImageType.CURRENT_IMAGE
            : isPrimaryImage
            ? ICardProductImageType.PRIMARY_IMAGE
            : ICardProductImageType.DEFAULT_THEME_IMAGE
        }"${
          primaryImage?.filename
            ? `,"filename": "${primaryImage?.filename}"`
            : ''
        }${
          primaryImage?.filepath
            ? `,"filepath": "${primaryImage?.filepath}"`
            : ''
        }${
          primaryImage?.filestackHandle
            ? `,"filestackHandle": "${primaryImage?.filestackHandle}"`
            : ''
        }}}],"id": "w58ut2pi"}}`,
      )

      const newPrimaryImage = {
        ...primaryImage,
        // @ts-ignore
        ...newRowData.content?.items[0].content,
      }
      const centeredPrimaryImageFaces =
        CardProductFrameHelper.adjustToDefaultImagePosition({
          imageAssetContent: newPrimaryImage,
          containerSize: {
            width: rowContentWidth,
            height: rowContentHeight,
          },
        })
      // @ts-ignore
      newRowData.content.items[0].content = centeredPrimaryImageFaces
      return JSON.stringify(newRowData)
    }
  }

  public static convertDynamicTheme({
    product,
    genericProductType,
    themeId,
    productTheme,
    region,
    variables,
    currentImage,
    dateFormat,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    themeId?: string
    productTheme: ICardProductTheme
    region?: EulogiseRegion
    variables?: ICardPopulatedTextData
    currentImage?: IImageAssetContent
    dateFormat?: string
  }): Array<ICardProductPage> {
    const templateString = JSON.stringify(productTheme.defaultContent)
    const defaultContent = this.getDefaultDeceasedContentByThemeId({
      product,
      themeId,
      region,
    })!

    const customTags: Mustache.OpeningAndClosingTags = ['"<<', '>>"']
    const defaultPrimaryImage = defaultContent.primaryImage!

    const primaryImage =
      currentImage || variables?.primaryImage || defaultPrimaryImage
    const isCurrentImage = !!currentImage
    const isPrimaryImage = !!variables?.primaryImage

    let primaryImageTemplate = ''

    const hasPrimaryImageTag = /<<&primaryImage>>/.test(templateString)
    if (hasPrimaryImageTag) {
      primaryImageTemplate = this.createPrimaryImageTemplate({
        primaryImage,
        defaultPrimaryImage,
        isCurrentImage,
        isPrimaryImage,
        defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
        product,
        genericProductType,
        region: variables?.region,
        isPrimaryImageFullWidth: productTheme?.isPrimaryImageFullWidth,
      })
    }

    const newDateFormat =
      dateFormat ??
      (region === EulogiseRegion.USA
        ? productTheme.metadata?.dateFormatUS
        : productTheme.metadata?.dateFormat) ??
      ''
    const dateOfBirth = DateTimeHelper.toTime(
      // @ts-ignore
      variables?.dateOfBirth || defaultContent.dateOfBirth,
    )
    const dateOfDeath = DateTimeHelper.toTime(
      // @ts-ignore
      variables?.dateOfDeath || defaultContent.dateOfDeath,
    )
    const dateOfService = DateTimeHelper.toTime(
      // @ts-ignore
      variables?.dateOfService || defaultContent.dateOfService,
    )

    const newVariables = {
      ...defaultContent,
      ...UtilHelper.removeUndefinedFields(variables!),
      regionFileExt: region === EulogiseRegion.USA ? '_USA' : '',
      dateOfBirth: newDateFormat
        ? DateTimeHelper.formatDate(dateOfBirth, newDateFormat)
        : dateOfBirth,
      dateOfService: newDateFormat
        ? DateTimeHelper.formatDate(dateOfService, newDateFormat)
        : dateOfService,
      dateOfDeath: newDateFormat
        ? DateTimeHelper.formatDate(dateOfDeath, newDateFormat)
        : dateOfDeath,
      deceasedNameFontType: this.getThemeFontSizeByDeceasedNameLength(
        themeId as string,
        variables?.deceasedName?.length || 0,
        product as EulogiseProduct,
      ),
      primaryImageType:
        defaultPrimaryImage?.type ?? CardProductContentItemType.FRAME,
      primaryImage: primaryImageTemplate,
    }
    const templateReplacedString = Mustache.render(templateString, {
      ...newVariables,
      deceasedName: newVariables.deceasedName?.replace(/"/g, '\\"'),
    })
    const templateReplacedObject = Mustache.render(
      templateReplacedString,
      newVariables,
      {},
      customTags,
    )

    const result = JSON.parse(templateReplacedObject)
    // If this is not a dynamic theme template
    if (!hasPrimaryImageTag) {
      let hasPrimaryImageApplied = false
      // Some special treatment on primaryImage in Frame and Image
      // apply primaryImage to cover cases (Saved Theme) that does not have <<&primaryImage>> tag
      return result.map((page: any) => {
        if (hasPrimaryImageApplied) {
          return page
        }
        return {
          ...page,
          rows: page.rows.map((row: ICardProductRow) => {
            if (row.type === CardProductContentItemType.FRAME) {
              // do not apply renderImageHeight, renderImageWidth, transformX and transformY fields even if the theme has these fields
              // otherwise, the primary image will get distorted
              // refer to https://trello.com/c/Gqwg31HW/1189-issues-with-round-frames-and-primary-image-pulls
              const {
                renderImageHeight,
                renderImageWidth,
                transformX,
                transformY,
                ...newPrimaryImageContent
              } = {
                ...(
                  (
                    row.data.content as
                      | ICardProductFrameColumnsItem
                      | ICardProductFrameRowsItem
                  ).items[0] as ICardProductFrameContentItem
                ).content,
                ...primaryImage,
                // @ts-ignore - not sure why we need this line
                imageType: ICardProductImageType.PRIMARY_IMAGE,
              } as ICardProductFrameImageContent
              const newRow = CardProductFrameHelper.attachImageToFrameRow({
                frameRow: row as ICardProductFrameRow,
                imageAssetContent: newPrimaryImageContent,
              })

              hasPrimaryImageApplied = true
              return newRow
            }
            // Don't Support Image Item for now
            /*            else if (row.type === CardProductContentItemType.IMAGE) {
              return UtilHelper.setObject(
                'data',
                {
                  //                  ...row.data,
                  ...primaryImage,
                },
                row,
              )
            }*/
            return row
          }) as Array<ICardProductRow>,
        }
      }) as Array<ICardProductPage>
    }
    return this.replacePagesNonPrimaryImagesWithDefaultFilestackHandle(result)
  }

  public static replaceFrameImagesWithDefaultFileStackHandle(
    frameItem: ICardProductFrameItem,
  ): ICardProductFrameItem {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      return {
        ...frameItem,
        items: frameItem.items.map((item) =>
          this.replaceFrameImagesWithDefaultFileStackHandle(item),
        ),
      }
    }
    if (frameItem.type === 'content') {
      return {
        ...frameItem,
        content: {
          ...frameItem.content,
          filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
        } as ICardProductFrameImageContent,
      }
    }
    throw new Error('Invalid frame item type')
  }

  public static replacePageNonPrimaryImagesWithDefaultFilestackHandle(
    page: ICardProductPage,
  ) {
    return {
      ...page,
      rows: page.rows?.map((row: ICardProductRow) => {
        if (row.type === CardProductContentItemType.FRAME) {
          if (row.dynamicDataId === 'primaryImage') {
            return row
          }
          return {
            ...row,
            data: {
              ...row.data,
              content: this.replaceFrameImagesWithDefaultFileStackHandle(
                row.data.content as ICardProductFrameItem,
              ),
            },
          } as ICardProductFrameRow
        }
        return row
      }),
    }
  }

  public static replacePagesNonPrimaryImagesWithDefaultFilestackHandle(
    pages: Array<ICardProductPage>,
  ): Array<ICardProductPage> {
    return pages.map((page) =>
      this.replacePageNonPrimaryImagesWithDefaultFilestackHandle(page),
    )
  }

  private static createDynamicThemePages({
    product,
    genericProductType,
    themeId,
    productTheme,
    variables,
    currentImage,
    region,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    themeId: string
    productTheme: ICardProductTheme
    variables?: ICardPopulatedTextData
    currentImage?: IImageAssetContent
    region?: EulogiseRegion
  }): Array<ICardProductPage> {
    return this.convertDynamicTheme({
      product,
      genericProductType,
      themeId,
      productTheme,
      variables,
      currentImage,
      region,
    })
  }

  public static createDynamicTheme({
    themeId,
    product,
    genericProductType,
    productTheme,
    variables,
    currentImage,
    region,
  }: {
    themeId: string
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    productTheme: ICardProductTheme
    variables?: ICardPopulatedTextData
    currentImage?: IImageAssetContent
    region?: EulogiseRegion
  }): ICardProductTheme {
    if (!productTheme) {
      throw new Error('productTheme not found')
    }
    return {
      ...productTheme,
      defaultContent: productTheme.defaultContent
        ? this.createDynamicThemePages({
            product,
            themeId,
            productTheme,
            genericProductType,
            variables,
            currentImage,
            region,
          })
        : undefined,
    }
  }

  private static getThemeFontSizeByDeceasedNameLength(
    themeId: string,
    deceasedNameLength: number,
    product: EulogiseProduct,
  ) {
    const threshold = DYNAMIC_THEME_FONT_SIZE_ADAPTION_THRESHOLD[themeId]
    if (
      !threshold ||
      product === EulogiseProduct.SLIDESHOW ||
      product === EulogiseProduct.ALL
    ) {
      return
    }
    const {
      DECEASED_NAME: {
        ORIGIN_FONT_TYPE,
        ONE_LEVEL_SMALLER_FONT_TYPE,
        TWO_LEVEL_SMALLER_FONT_TYPE,
        ONE_LEVEL_STRING_LENGTH_THRESHOLD,
        TWO_LEVEL_STRING_LENGTH_THRESHOLD,
      },
    } = threshold

    const originFontType = ORIGIN_FONT_TYPE[product]
    const oneLevelSmallerFontType = ONE_LEVEL_SMALLER_FONT_TYPE[product]
    const twoLevelSmallerFontType = TWO_LEVEL_SMALLER_FONT_TYPE[product]
    const oneLevelStringLengthThreshold =
      ONE_LEVEL_STRING_LENGTH_THRESHOLD[product]
    const twoLevelStringLengthThreshold =
      TWO_LEVEL_STRING_LENGTH_THRESHOLD[product]

    if (deceasedNameLength > twoLevelStringLengthThreshold) {
      return twoLevelSmallerFontType
    } else if (deceasedNameLength > oneLevelStringLengthThreshold) {
      return oneLevelSmallerFontType
    }
    return originFontType
  }

  private static getScaledPrimaryImageWidthByHeight(
    imageSize: IImageSize,
    height: number,
  ): IImageSize {
    if (!height || !imageSize) {
      return imageSize
    }
    const coefficient = height / imageSize?.height
    const scaledWidth = Math.floor(imageSize?.width * coefficient)
    return {
      height: imageSize.height,
      width: scaledWidth,
    }
  }

  public static getCardProductWidthAndHeightInScale({
    product,
    genericProductMetadata,
    defaultThemeLayoutColumns,
    height,
    pageSize,
    region,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    defaultThemeLayoutColumns?: number
    height: number
    pageSize: CardProductPageSize
    region?: EulogiseRegion
  }): {
    width: number
    height: number
    scale: number
  } {
    const {
      pageWidth: originalProductWidth,
      pageHeight: originalProductHeight,
    } = this.getPageWidthAndHeightByProduct({
      product,
      genericProductMetadata,
      defaultThemeLayoutColumns,
      region,
    })
    const scale = originalProductWidth / originalProductHeight

    const colMode = this.getPageColModeByPageSize(pageSize)
    return {
      width: scale * height * this.getNoOfDisplayPagesByPageMode(colMode),
      height,
      scale: height / originalProductHeight,
    }
  }

  public static getCurrentImage(
    existingCardProduct?: ICardProductData,
  ): IImageAssetContent | undefined {
    if (!existingCardProduct) {
      return
    }
    let currentImage: ICardProductImageRowData | undefined = undefined
    existingCardProduct.content.pages.forEach((p: ICardProductPage) => {
      p.rows.forEach((r: ICardProductRow) => {
        if (r.type === CardProductContentItemType.IMAGE) {
          if (r.data.imageType === ICardProductImageType.CURRENT_IMAGE) {
            currentImage = r.data
          }
        }
      })
    })
    return currentImage ? (currentImage as IImageAssetContent) : undefined
  }

  public static getGenericCardProductSlugByPathname({
    pathname,
  }: {
    pathname: string
  }): string | undefined {
    const { slugAndId } = UrlHelper.getParams(
      EulogisePage.EDIT_GENERIC_CARD_PRODUCTS,
      {
        pathname,
      },
    )
    if (!slugAndId) {
      return
    }
    const [slug, _id] = slugAndId.split('.')
    return slug
  }

  public static getCardProductThemeWithPopulatedData({
    product,
    genericProductType,
    themeId,
    theme,
    region,
    populatedData,
    existingCardProduct,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    themeId: string
    theme: ITheme
    region: EulogiseRegion
    populatedData?: ICardPopulatedTextData
    existingCardProduct?: ICardProductData
  }): ICardProductTheme | ISlideshowTheme | undefined {
    const currentImage = this.getCurrentImage(existingCardProduct)
    switch (product) {
      case EulogiseProduct.BOOKLET:
      case EulogiseProduct.BOOKMARK:
      case EulogiseProduct.SIDED_CARD:
      case EulogiseProduct.TV_WELCOME_SCREEN:
      case EulogiseProduct.THANK_YOU_CARD:
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
      case EulogiseProduct.GENERIC_CARD_PRODUCT: {
        const genericProductMetadata = (
          existingCardProduct as IGenericCardProductData
        )?.content?.metadata
        const productTheme = ThemeHelper.getProductThemeByProductType({
          theme,
          product,
          genericProductType,
          genericProductMetadata,
          region,
        }) as ICardProductTheme
        const foldType = genericProductMetadata?.foldType
        const newDefaultContent =
          this.replacePagesNonPrimaryImagesWithDefaultFilestackHandle(
            productTheme.defaultContent!,
          )
        return this.createDynamicTheme({
          themeId,
          product,
          genericProductType,
          productTheme: {
            ...productTheme,
            defaultContent:
              foldType === GenericCardProductTypeFoldType.DOUBLE_SIDED
                ? [
                    newDefaultContent[0],
                    newDefaultContent[newDefaultContent.length - 1],
                  ]
                : newDefaultContent,
          } as ICardProductTheme,
          variables: { ...populatedData, region },
          currentImage,
          region,
        })
      }
      case EulogiseProduct.PHOTOBOOK:
        return ThemeHelper.getProductThemeByProductType({
          theme,
          product,
          region,
        }) as ICardProductTheme
      case EulogiseProduct.SLIDESHOW:
        return ThemeHelper.getProductThemeByProductType({
          theme,
          product,
          region,
        }) as ISlideshowTheme
      default:
        throw new Error('no such product type')
    }
  }

  public static updateFrameImageContent({
    imageContent,
    frameImageItem,
  }: {
    imageContent: IImageAssetContent
    frameImageItem: ICardProductFrameImageContent
  }): ICardProductFrameImageContent {
    // make sure renderImageWidth, renderImageHeight, transformX and transformY fields will not carry back to the new image content
    const { filename, filestackHandle, filepath, type, isFullWidth } = {
      ...frameImageItem,
      ...imageContent,
    }
    return {
      filename,
      filestackHandle,
      filepath,
      type,
      isFullWidth,
    } as ICardProductFrameImageContent
  }

  public static updateFrameImageByContentIdInFrameItem({
    frameContentId,
    imageContent,
    frameItem,
  }: {
    frameContentId: string
    imageContent: IImageAssetContent
    frameItem: ICardProductFrameItem
  }): ICardProductFrameItem {
    if (frameItem.type === 'rows' || frameItem.type === 'columns') {
      return {
        ...frameItem,
        items: (frameItem as ICardProductFrameColumnsItem).items.map((item) =>
          this.updateFrameImageByContentIdInFrameItem({
            frameContentId,
            frameItem: item,
            imageContent,
          }),
        ),
      }
    }
    // when id is found
    if (frameItem.type === 'content' && frameContentId === frameItem.id) {
      return {
        ...frameItem,
        content: this.updateFrameImageContent({
          imageContent,
          frameImageItem: frameItem.content as ICardProductFrameImageContent,
        }),
      }
    }
    // if it is a different frame content item
    return frameItem
  }

  public static updateFrameImageByContentIdInRowData({
    rowData,
    frameContentId,
    imageContent,
  }: {
    rowData: ICardProductFrameRowData
    frameContentId: string
    imageContent: IImageAssetContent
  }): ICardProductFrameRowData {
    const frameData = rowData as ICardProductFrameRowData
    return {
      ...frameData,
      content: this.updateFrameImageByContentIdInFrameItem({
        frameItem: frameData.content,
        frameContentId,
        imageContent,
      }),
    }
  }

  public static updateFrameImageByContentIdInPage({
    page,
    frameContentId,
    imageContent,
  }: {
    page: ICardProductPage
    frameContentId: string
    imageContent: IImageAssetContent
  }): ICardProductPage {
    return {
      ...page,
      rows: page.rows.map((row) => {
        if (row.type === CardProductContentItemType.FRAME) {
          const newFrameRowData = this.updateFrameImageByContentIdInRowData({
            rowData: row.data,
            frameContentId,
            imageContent,
          })
          return {
            ...row,
            data: newFrameRowData,
          }
        }
        return row
      }),
    }
  }

  public static updateFrameImageByContentId({
    cardProduct,
    frameContentId,
    imageContent,
  }: {
    cardProduct: ICardProductContent
    frameContentId: string
    imageContent: IImageAssetContent
  }): ICardProductContent {
    const pages = cardProduct.pages
    return {
      ...cardProduct,
      pages: pages.map((page) =>
        this.updateFrameImageByContentIdInPage({
          page,
          frameContentId,
          imageContent,
        }),
      ),
    }
  }

  public static updateCardProductPages({
    page,
    updatedRows,
    cardProduct,
    pageIndex,
    layoutId,
  }: {
    page: ICardProductPage
    updatedRows: Array<ICardProductRow>
    cardProduct: ICardProductData
    pageIndex: number
    layoutId?: string
  }): Array<any> {
    const updatedPage = {
      ...page,
      rows: updatedRows,
      ...(layoutId ? { layoutId } : {}),
    }

    return [
      ...cardProduct.content.pages.slice(0, pageIndex),
      updatedPage,
      ...cardProduct.content.pages.slice(pageIndex + 1),
    ].filter(Boolean)
  }

  public static getAddCardProductRowState(
    cardProductState: ICardProductState,
    pageIndex: number,
    row: ICardProductRow,
  ) {
    const activeCardProduct = cardProductState.activeItem
    const page: ICardProductPage = activeCardProduct?.content.pages[pageIndex]!
    const rows = page.rows.concat(row)
    return UtilHelper.mergeDeepRight(cardProductState, {
      activeItem: {
        content: {
          pages: CardProductHelper.updateCardProductPages({
            page,
            updatedRows: rows,
            cardProduct: activeCardProduct!,
            pageIndex,
          }),
        },
      },
    })
  }

  public static getRemoveCardProductPagesState(
    cardProductState: ICardProductState,
    removePages: number = 4,
  ): ICardProductState {
    const existingPages = cardProductState.activeItem?.content.pages!
    const totalPages = existingPages.length
    const frontPages = existingPages.slice(0, totalPages - 1 - removePages)
    const lastPage = existingPages[existingPages.length - 1]
    return UtilHelper.mergeDeepRight(cardProductState, {
      activeItem: {
        content: {
          pages: [...frontPages, lastPage],
        },
      },
    })
  }

  public static getDummyImage(pageContentWidth: number, maxImages: number) {
    const padding = 3
    const dummyImageDimension =
      (pageContentWidth - maxImages * padding) / maxImages

    return {
      filename: 'dummy-file',
      filepath: 'primaryImages/mFMLqO1RSYylJwRWp5Rx.jpeg',
      width:
        dummyImageDimension > MAX_DUMMY_IMAGE_DIMENSION
          ? MAX_DUMMY_IMAGE_DIMENSION
          : dummyImageDimension,
      height:
        dummyImageDimension > MAX_DUMMY_IMAGE_DIMENSION
          ? MAX_DUMMY_IMAGE_DIMENSION
          : dummyImageDimension,
    }
  }

  private static createCardProductNewPageRows(
    type: 'image' | 'text' | 'frame',
    suffix: string,
    region: EulogiseRegion,
    newPageStyles?: ICardProductNewPageStyles,
    themeId?: string,
  ): Array<ICardProductRow> {
    const assignRowId = (row: ICardProductRow) => {
      return Object.assign(
        {},
        {
          ...row,
          id: `${row.id}${suffix}`,
        },
      )
    }
    if (type === CardProductContentItemType.IMAGE) {
      return CARD_PRODUCT_NEW_PAGE_IMAGE_ROWS(newPageStyles!, region).map(
        assignRowId,
      )
    } else if (type === CardProductContentItemType.FRAME) {
      return CARD_PRODUCT_NEW_PAGE_FRAMES_ROWS(region).map(assignRowId)
    }
    return CARD_PRODUCT_NEW_PAGE_TEXT_ROWS(
      newPageStyles!,
      themeId!,
      region,
    ).map(assignRowId)
  }

  private static getAddTextPage(params: {
    pageNo: number
    page: any
    pageStyle?: ICardProductNewPageStyles
    themeId?: string
    region: EulogiseRegion
  }): ICardProductPage {
    const { page, pageNo, region, pageStyle, themeId } = params
    return {
      ...page,
      rows: this.createCardProductNewPageRows(
        CardProductContentItemType.TEXT,
        `${pageNo}`,
        region,
        pageStyle,
        themeId,
      ),
    } as ICardProductPage
  }

  private static getAddFramePage(params: {
    pageNo: number
    page: any
    pageStyle?: ICardProductNewPageStyles
    themeId?: string
    region: EulogiseRegion
  }): ICardProductPage {
    const { page, pageNo, region } = params
    return {
      ...page,
      rows: this.createCardProductNewPageRows(
        CardProductContentItemType.FRAME,
        `${pageNo}`,
        region,
      ),
    } as ICardProductPage
  }

  private static getAddImagePage(params: {
    pageNo: number
    page: any
    pageStyle?: ICardProductNewPageStyles
    themeId?: string
    region: EulogiseRegion
  }): ICardProductPage {
    const { page, pageNo, pageStyle, region, themeId } = params
    return {
      ...page,
      rows: this.createCardProductNewPageRows(
        CardProductContentItemType.IMAGE,
        `${pageNo}`,
        region,
        pageStyle,
        themeId,
      ),
    } as ICardProductPage
  }

  public static getAddCardProductPagesState({
    product,
    cardProductState,
    productTheme,
    themeId,
    foldType,
    region,
  }: {
    product: EulogiseProduct
    cardProductState: ICardProductState
    productTheme: ICardProductTheme
    themeId: string
    foldType?: GenericCardProductTypeFoldType
    region: EulogiseRegion
  }): ICardProductState {
    const existingPages = cardProductState.activeItem?.content.pages!
    const frontPages = existingPages.slice(0, existingPages.length - 1)
    const lastPage = existingPages[existingPages.length - 1]
    const secondPage = frontPages[1]
    const thirdPage = frontPages[2]
    const pageNo: number = frontPages.length
    const { activeItem: cardProduct } = cardProductState
    const pageSize = cardProduct?.content.pageSize!
    const evenPage = secondPage || lastPage
    const oddPage = thirdPage || lastPage
    const newPages = [
      ...frontPages,
      ...(product === EulogiseProduct.PHOTOBOOK
        ? PhotobookHelper.createPhotobookPages({
            noOfPages: PhotobookHelper.isClassicPhotobook(pageSize) ? 2 : 4,
            pageSize,
          })
        : this.createDefaultCardProductPages({
            pageNo,
            evenPage,
            oddPage,
            themeId,
            foldType,
            pageStyle: productTheme.newPageStyles,
            region,
          })),
      lastPage,
    ]
    return UtilHelper.mergeDeepRight(cardProductState, {
      activeItem: {
        content: {
          pages: newPages,
        },
      },
    })
  }

  public static createDefaultCardProductPages(params: {
    pageNo: number
    evenPage: ICardProductPage
    oddPage: ICardProductPage
    foldType?: GenericCardProductTypeFoldType
    pageStyle?: ICardProductNewPageStyles
    themeId?: string
    region: EulogiseRegion
  }): Array<ICardProductPage> {
    const { pageNo, evenPage, foldType, oddPage, ...shareParams } = params
    const newPageNo = pageNo + 1
    const biFoldNewPages = [
      this.getAddTextPage({
        ...shareParams,
        pageNo: newPageNo,
        page: evenPage,
      }),
      this.getAddFramePage({
        ...shareParams,
        pageNo: pageNo + 2,
        page: oddPage,
      }),
      this.getAddImagePage({
        ...shareParams,
        pageNo: pageNo + 3,
        page: evenPage,
      }),
      this.getAddTextPage({
        ...shareParams,
        pageNo: pageNo + 4,
        page: oddPage,
      }),
    ]
    if (foldType) {
      switch (foldType) {
        case GenericCardProductTypeFoldType.SINGLE_SIDE:
        case GenericCardProductTypeFoldType.DOUBLE_SIDED: {
          // Two pages: front and back (same as TWO_PAGES page mode)
          return []
        }
        case GenericCardProductTypeFoldType.BIFOLD: {
          return biFoldNewPages
        }
        case GenericCardProductTypeFoldType.TRIFOLD: {
          return biFoldNewPages.concat([
            this.getAddFramePage({
              ...shareParams,
              pageNo: pageNo + 5,
              page: oddPage,
            }),
            this.getAddImagePage({
              ...shareParams,
              pageNo: pageNo + 6,
              page: evenPage,
            }),
          ])
        }
      }
    }
    return biFoldNewPages
  }

  public static getUpdateBookletRowState({
    cardProductState,
    pageIndex,
    rowId,
    rowData,
    frameContentItemId,
  }: {
    cardProductState: ICardProductState
    pageIndex: number
    rowId: string
    rowData: ICardProductRowData
    frameContentItemId?: string
  }): ICardProductState {
    const activeCardProduct = cardProductState?.activeItem
    const page: ICardProductPage | undefined =
      activeCardProduct?.content?.pages?.[pageIndex]
    if (!page) {
      console.log('getUpdateBookletRowState - no page!')
      return cardProductState
    }
    const rows = page?.rows
    if (!rows) {
      console.log('getUpdateBookletRowState - no rows!')
      return cardProductState
    }
    const updateRow: ICardProductRow = CardProductHelper.getCardProductRow(
      activeCardProduct!,
      pageIndex,
      rowId,
    )

    if (!updateRow) {
      console.log('getUpdateBookletRowState - no updateRow!')
      return cardProductState
    }

    return UtilHelper.mergeDeepRight(cardProductState, {
      activeItem: {
        content: {
          pages: CardProductHelper.updateCardProductPages({
            page,
            updatedRows: rows.map((r: ICardProductRow) => {
              if (r.id === rowId) {
                if (r.type === 'frame') {
                  const frameItemData: ICardProductFrameItem = (
                    updateRow.data as any
                  ).content!
                  const containerSize = {
                    width: frameItemData.width!,
                    height: frameItemData.height!,
                  }
                  const updatedFrameItem =
                    this.getUpdatedRowContentDataForFrame({
                      framePayload: {
                        frameContentItemId: frameContentItemId!,
                        rowId,
                        pageIndex,
                        image: rowData as IImageAssetContent,
                      },
                      frameItemData,
                    })
                  const graphicFrame = updatedFrameItem.graphicFrame
                  const imageContainerWidth = graphicFrame?.imageContainerWidth
                  const imageContainerHeight =
                    graphicFrame?.imageContainerHeight
                  const newContainerSize =
                    imageContainerWidth && imageContainerHeight
                      ? {
                          width:
                            containerSize.width *
                            UtilHelper.percentTextToFloat(imageContainerWidth),
                          height:
                            containerSize.height *
                            UtilHelper.percentTextToFloat(imageContainerHeight),
                        }
                      : containerSize

                  const newContent =
                    CardProductFrameHelper.centeringFrameItemImage({
                      frameContentItemId,
                      frameItem: updatedFrameItem,
                      imageAssetContent:
                        rowData as Partial<ICardProductFrameImageContent>,
                      containerSize: newContainerSize,
                    })

                  return {
                    ...updateRow,
                    data: {
                      ...updateRow.data,
                      content: newContent,
                    },
                  } as ICardProductFrameRow
                }
                if (r.type === 'columns') {
                  return {
                    ...updateRow,
                    data: {
                      ...updateRow.data,
                      items: (
                        updateRow.data as ICardProductColumnRowData
                      ).items.map((item: ICardProductImageRow, index: number) =>
                        UtilHelper.mergeDeepRight(item, {
                          data: (rowData as ICardProductColumnRowData).items[
                            index
                          ].data,
                        }),
                      ),
                    },
                  }
                }
                if (r.type === 'image') {
                  return UtilHelper.mergeDeepRight(updateRow, {
                    data: {
                      ...rowData,
                      ...((r.data as ICardProductImageRowData).imageType
                        ? { imageType: ICardProductImageType.CURRENT_IMAGE }
                        : {}),
                    } as ICardProductImageRowData,
                  })
                }
                return UtilHelper.mergeDeepRight(updateRow, {
                  data: rowData,
                })
              }
              return r
            }),
            cardProduct: activeCardProduct!,
            pageIndex,
          }),
        },
      },
    })
  }

  public static getBookletPageSizeByRegion(
    region: EulogiseRegion = EulogiseRegion.AU,
  ) {
    if (region === EulogiseRegion.USA) {
      return CardProductPageSize.HALF_LETTER_A5
    }
    return CardProductPageSize.A5
  }

  public static getEulogiseProductPaperSizeByRegion({
    product,
    paperSize,
  }: {
    product: EulogiseCardProducts
    paperSize: CardProductPageSize
  }): EulogiseRegion {
    if (
      product === EulogiseCardProducts.BOOKLET &&
      paperSize === CardProductPageSize.HALF_LETTER_A5
    ) {
      return EulogiseRegion.USA
    }
    return EulogiseRegion.AU
  }

  public static getRegionByPageSize(
    pageSize?: CardProductPageSize,
  ): EulogiseRegion {
    if (pageSize === CardProductPageSize.A5) {
      return EulogiseRegion.AU
    }
    return EulogiseRegion.USA
  }

  public static getUpdatedRegionByOldRegion(
    currentRegion: EulogiseRegion,
  ): EulogiseRegion {
    switch (currentRegion) {
      case EulogiseRegion.AU:
        return EulogiseRegion.USA
      case EulogiseRegion.USA:
        return EulogiseRegion.AU
      default:
        return EulogiseRegion.AU
    }
  }

  public static onCardProductFlip(
    event: any,
    {
      bookRef,
      isNonDesktop,
      noOfPageCursors,
    }: { bookRef: any; isNonDesktop: boolean; noOfPageCursors: number },
  ): number {
    const pageNumber = event.data
    const bookRefEl = bookRef?.current as any
    if (!bookRefEl) {
      console.log('bookRef.current is not defined')
      return 0
    }
    const pageFlipEl = bookRefEl.pageFlip()
    const newPageCursor = isNonDesktop
      ? pageNumber
      : CardProductHelper.convertPageNumberToCursor(pageNumber)

    CardProductHelper.positioningPageFlip({
      pageCursor: newPageCursor,
      pageFlipEl,
      totalPageCursors: noOfPageCursors!,
    })
    return newPageCursor
  }

  public static getEmbeddedCardProductUrl({
    caseId,
    product,
  }: {
    caseId: string
    product: EulogiseProduct
  }) {
    return `${
      EulogiseClientConfig.APP_ENDPOINT
    }${EulogisePage.EMBEDDED_CARD_PRODUCT.replace(':caseId', caseId).replace(
      ':product',
      product,
    )}`
  }

  public static positioningPageFlip = ({
    pageCursor,
    totalPageCursors,
    pageFlipEl,
  }: {
    pageCursor: number
    totalPageCursors: number
    pageFlipEl: any
  }) => {
    const isFirstPage = pageCursor === 0
    const isLastPage = pageCursor >= totalPageCursors! - 1

    // @ts-ignore
    const bookRefPageFlipBlock = pageFlipEl?.block
    if (isFirstPage) {
      bookRefPageFlipBlock?.classList.add('flipbook-first-page')
      bookRefPageFlipBlock?.classList.remove('flipbook-last-page')
    } else if (isLastPage) {
      bookRefPageFlipBlock?.classList.add('flipbook-last-page')
      bookRefPageFlipBlock?.classList.remove('flipbook-first-page')
    } else {
      bookRefPageFlipBlock?.classList.remove('flipbook-first-page')
      bookRefPageFlipBlock?.classList.remove('flipbook-last-page')
    }
  }

  public static getPageSizeByProduct({
    product,
    defaultThemeLayoutColumns,
    region,
    pageSize,
  }: {
    product: EulogiseProduct
    defaultThemeLayoutColumns?: number
    region?: EulogiseRegion
    pageSize?: CardProductPageSize
  }): CardProductPageSize {
    // If pageSize is provided, return it directly
    if (pageSize) {
      return pageSize
    }

    if (EulogiseProduct.THANK_YOU_CARD === product) {
      const pageColumns = defaultThemeLayoutColumns ?? 1
      return THANK_YOU_CARD_PAGE_SIZE[pageColumns] as CardProductPageSize
    } else if (
      EulogiseProduct.TV_WELCOME_SCREEN === product ||
      EulogiseProduct.SLIDESHOW_TITLE_SLIDE === product
    ) {
      const pageColumns = defaultThemeLayoutColumns ?? 1
      return TV_WELCOME_SCREEN_PAGE_SIZE[pageColumns] as CardProductPageSize
    }
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: this.getBookletPageSizeByRegion(region),
      [EulogiseProduct.SIDED_CARD]: this.getBookletPageSizeByRegion(region),
      [EulogiseProduct.BOOKMARK]: CardProductPageSize.BOOKMARK,
      [EulogiseProduct.PHOTOBOOK]:
        CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      [EulogiseProduct.GENERIC_CARD_PRODUCT]:
        CardProductPageSize.GENERIC_CARD_PRODUCT,
    }[product]
  }

  public static getPageWidthAndHeightByProduct({
    product,
    genericProductMetadata,
    defaultThemeLayoutColumns,
    pageOrientation = CardProductPageOrientation.PORTRAIT,
    region,
    pageSize,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    defaultThemeLayoutColumns?: number
    pageOrientation?: CardProductPageOrientation
    region?: EulogiseRegion
    pageSize?: CardProductPageSize
  }): {
    pageWidth: number
    pageHeight: number
  } {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      if (genericProductMetadata) {
        return this.getGenericProductPageWidthAndHeight({
          genericProductMetadata,
        })
      }
      throw new Error(
        `getPageWidthAndHeightByProduct: genericProductType must be defined`,
      )
    }
    const isPortrait = pageOrientation === CardProductPageOrientation.PORTRAIT
    const resolvedPageSize = this.getPageSizeByProduct({
      product,
      defaultThemeLayoutColumns,
      region,
      pageSize,
    })
    const pageWidth = PAGE_SIZES[resolvedPageSize][isPortrait ? 0 : 1]
    const pageHeight = PAGE_SIZES[resolvedPageSize][isPortrait ? 1 : 0]
    return {
      pageWidth,
      pageHeight,
    }
  }

  private static getGenericProductPageWidthAndHeight({
    genericProductType,
    genericProductMetadata,
  }: {
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
  }): { pageWidth: number; pageHeight: number } {
    const metaDimension = genericProductMetadata?.selectedDimension
    if (metaDimension) {
      return {
        pageWidth: metaDimension.width,
        pageHeight: metaDimension.height,
      }
    }
    const typeDimension = genericProductType?.dimensions[0]
    if (typeDimension) {
      return {
        pageWidth: typeDimension.width,
        pageHeight: typeDimension.height,
      }
    }
    throw new Error(
      `getPageWidthAndHeight: metaDimension or typeDimension undefined`,
    )
  }

  public static getPageWidthAndHeight({
    pageSize,
    genericProductType,
    genericProductMetadata,
    pageOrientation = CardProductPageOrientation.PORTRAIT,
  }: {
    pageSize?: CardProductPageSize
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
    pageOrientation?: CardProductPageOrientation
  }): { pageWidth: number; pageHeight: number } {
    if (genericProductMetadata || genericProductType) {
      return this.getGenericProductPageWidthAndHeight({
        genericProductType,
        genericProductMetadata,
      })
    }
    const isPortrait = pageOrientation === CardProductPageOrientation.PORTRAIT
    const pageWidth = PAGE_SIZES[pageSize!][isPortrait ? 0 : 1]
    const pageHeight = PAGE_SIZES[pageSize!][isPortrait ? 1 : 0]
    return { pageWidth, pageHeight }
  }

  public static getPageBackgroundPosition(
    backgroundImages: string = '',
    bleedPageMode: BleedPageMode,
  ) {
    const newBackgroundImageString = backgroundImages
      .replace(/\([^()]*\)/g, '')
      // need to do two times to remove all the nested css function
      // e.g. linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("https://us.media.eulogisememorials.com/backgroundImages/Beach/AU/Beach_BOOKLET_LEFT.jpg")
      .replace(/\([^()]*\)/g, '')

    const noOfBackgroundImages = newBackgroundImageString.split(',').length
    if (noOfBackgroundImages === 0) {
      return ''
    }
    const prefix = UtilHelper.times(
      () => 'center center',
      noOfBackgroundImages - 1,
    ).join(', ')
    if (bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED) {
      return [prefix, 'right center'].filter(Boolean).join(', ')
    } else if (bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED) {
      return [prefix, 'left center'].filter(Boolean).join(', ')
    } else if (bleedPageMode === BleedPageMode.FULL_BLEED) {
      return [prefix, 'center center'].filter(Boolean).join(', ')
    }
    return [prefix, 'center center'].filter(Boolean).join(', ')
  }

  public static getPageWidthByCardProduct({
    cardProduct,
  }: {
    cardProduct: ICardProductData
  }): number {
    const cardProductContent = cardProduct?.content
    const cardProductPageSize = cardProductContent?.pageSize
    const cardProductPageOrientation = cardProductContent?.pageOrientation
    const { pageWidth } = this.getPageWidthAndHeight({
      pageSize: cardProductPageSize,
      pageOrientation: cardProductPageOrientation,
      genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
        ?.metadata,
    })
    return pageWidth
  }

  public static getEditorWidth({
    cardProduct,
    isMobile = false,
    minWidth = 0,
  }: {
    cardProduct: ICardProductData
    isMobile: boolean
    minWidth?: number
  }): number {
    const cardProductContent = cardProduct?.content
    const cardProductPageSize = cardProductContent?.pageSize
    const cardProductPageOrientation = cardProductContent?.pageOrientation
    const noOfPages = cardProductContent?.pages.length
    const { pageWidth } = this.getPageWidthAndHeight({
      genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
        ?.metadata,
      pageSize: cardProductPageSize,
      pageOrientation: cardProductPageOrientation,
    })
    const pageWidthWithDraggable = pageWidth + 30
    if (
      cardProductContent.pageSize === CardProductPageSize.THANKYOUCARD_2_COLS ||
      cardProductContent.pageSize ===
        CardProductPageSize.TV_WELCOME_SCREEN_2_COLS ||
      cardProductContent.pageSize ===
        CardProductPageSize.SLIDESHOW_TITLE_SLIDE ||
      cardProductContent.pageSize ===
        CardProductPageSize.SLIDESHOW_TITLE_SLIDE_2_COLS
    ) {
      if (minWidth && minWidth > pageWidthWithDraggable * 2) {
        return minWidth
      }
      return pageWidthWithDraggable * 2
    }
    if (!isMobile && noOfPages && noOfPages > 2) {
      if (minWidth && minWidth > pageWidthWithDraggable * 2) {
        return minWidth
      }
      return pageWidthWithDraggable * 2
    }
    if (minWidth && minWidth > pageWidthWithDraggable) {
      return minWidth
    }
    return pageWidthWithDraggable
  }

  public static isWrapperBorderVisible = ({
    isFocused,
    isHovered,
    resizing,
    isAnyRowFocused,
    enables,
  }: {
    isFocused: boolean
    isHovered: boolean
    resizing: boolean
    isAnyRowFocused: boolean
    enables: object
  }): boolean => {
    const hasEnabled = Object.values(enables ?? {}).includes(true)
    if (hasEnabled) {
      return true
    }

    if (!isAnyRowFocused && isHovered) {
      return true
    } else if (isAnyRowFocused && (isFocused || resizing)) {
      return true
    }
    return false
  }

  public static calculateContentItemTotalHeight = (
    elementHeight: number,
    margin: MarginType,
    editorScaledFactor: number = 1,
  ): number => {
    if (typeof margin === 'number') {
      return (elementHeight + margin * 2) * editorScaledFactor
    } else if (Array.isArray(margin)) {
      switch (margin.length) {
        case 2:
          return (elementHeight + margin[0] * 2) * editorScaledFactor
        case 3:
          return (elementHeight + margin[0] + margin[2]) * editorScaledFactor
        case 4:
          return (elementHeight + margin[0] + margin[1]) * editorScaledFactor
      }
    }
    return elementHeight * editorScaledFactor
  }

  public static getDefaultPageMargins({
    region,
    genericProductType,
    genericProductMetadata,
    product,
  }: {
    region?: EulogiseRegion
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
    product: EulogiseProduct
  }): Array<number> {
    return region === EulogiseRegion.USA
      ? (this.getDefaultUSPageMargins({
          product,
          genericProductType,
          genericProductMetadata,
        }) as Array<number>)
      : (this.getDefaultAUPageMargins({
          product,
          genericProductType,
          genericProductMetadata,
        }) as Array<number>)
  }

  public static getPageContentWidthAndHeight(params: {
    product: EulogiseProduct
    pageSize: CardProductPageSize
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
    pageOrientation: CardProductPageOrientation
    region: EulogiseRegion
  }): IPageContentWidthAndHeight {
    const {
      product,
      pageSize,
      pageOrientation,
      region,
      genericProductType,
      genericProductMetadata,
    } = params
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      !genericProductMetadata &&
      !genericProductType
    ) {
      return {
        width: 0,
        height: 0,
      }
    }
    const { pageWidth, pageHeight } = this.getPageWidthAndHeight({
      genericProductType,
      genericProductMetadata,
      pageSize,
      pageOrientation,
    })
    const [xMargin, yMargin] = this.getDefaultPageMargins({
      product,
      region,
      genericProductType,
      genericProductMetadata,
    })
    return { width: pageWidth - xMargin * 2, height: pageHeight - yMargin * 2 }
  }

  public static getDefaultPageContentWidthAndHeight({
    product,
    genericProductType,
    genericProductMetadata,
    defaultThemeLayoutColumns,
    region = EulogiseRegion.USA,
    pageSize,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
    defaultThemeLayoutColumns?: number
    region?: EulogiseRegion
    pageSize?: CardProductPageSize
  }): IPageContentWidthAndHeight {
    const resolvedPageSize = this.getPageSizeByProduct({
      product,
      defaultThemeLayoutColumns,
      region,
      pageSize,
    })
    return this.getPageContentWidthAndHeight({
      product,
      genericProductType,
      genericProductMetadata,
      pageSize: resolvedPageSize,
      pageOrientation: this.getDefaultPageOrientation(),
      region,
    })
  }

  // page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15, page16

  // no of pages per chunk is 4 (page16, page1, page2 and page15)
  // i = 0   x=16              // x is noOfPages
  // page16 (x - i - 1), page1 (i),
  // page2 (i + 1), page15 (x - i - 2)

  // i = 2    x=16
  // page14 (x - i - 1), page3 (i),
  // page4 (i + 1), page13 (x - i - 2),

  // i = 4    x = 16
  // page12 (x - i - 1), page5 (i),
  // page6 (i + 1), page11 (x - i - 2),

  // i = 6    x = 16
  // page10 (x - i - 1), page7 (i),
  // page8 (i + 1), page9 (x - i - 2)

  public static getBookletPageOrder(pages: Array<ICardProductPage>) {
    const noOfPages = pages.length
    const noOfPagesPerChunk = 4
    const chunks = Math.ceil(noOfPages / noOfPagesPerChunk)
    const result = []

    for (let i = 0, times = 0; times < chunks; i += 2, times++) {
      // page16
      result.push(pages[noOfPages - i - 1])
      // page1
      result.push(pages[i])
      // page2
      result.push(pages[i + 1])
      // page15
      result.push(pages[noOfPages - i - 2])
    }

    return result
  }

  public static getCardProductEmbeddedCode({
    product,
    caseId,
  }: {
    product: EulogiseProduct
    caseId: string
  }) {
    const url: string = `${
      EulogiseClientConfig.APP_ENDPOINT
    }${EulogisePage.EMBEDDED_CARD_PRODUCT.replace(':caseId', caseId).replace(
      ':product',
      product,
    )}`
    const aspectRatio = product === EulogiseProduct.PHOTOBOOK ? '18/9' : '10/9'
    return `<iframe
  src='${url}'
  allow='autoplay; fullscreen'
  style='filter: drop-shadow(0px 0px 2px #888888);border-radius: 16px; border:none; display: block; width: 1024px; max-height: 100%; max-width: 100%; margin: 10px auto; aspect-ratio: ${aspectRatio}; min-height: 200px;'
></iframe>`
  }

  public static getFadedEdgesFrameRows({
    cardProductContent,
  }: {
    cardProductContent: ICardProductContent
  }): Array<ICardProductFrameRow> {
    const frameRows: Array<ICardProductFrameRow> = []
    for (const pages of cardProductContent.pages) {
      for (const row of pages.rows) {
        const rowData = row.data
        if (
          row.type === CardProductContentItemType.FRAME &&
          (rowData as ICardProductFrameRowData).enableFadeImage &&
          // make sure fadeEdge is not NONE
          (rowData as ICardProductFrameRowData).content.fadeEdge !==
            ICardProductFadeEdgeType.NONE
        ) {
          frameRows.push(row as ICardProductFrameRow)
        }
      }
    }
    return frameRows
  }

  public static getPagesOrder({
    product,
    foldType,
    displayMode = CardProductViewDisplayMode.EDIT,
    pages,
  }: {
    product: EulogiseProduct
    foldType?: GenericCardProductTypeFoldType
    displayMode: CardProductViewDisplayMode
    pages: Array<ICardProductPage>
  }): Array<ICardProductPage> {
    if (displayMode === CardProductViewDisplayMode.PRINT) {
      if (
        product === EulogiseProduct.BOOKLET ||
        foldType === GenericCardProductTypeFoldType.BIFOLD
      ) {
        return this.getBookletPageOrder(pages)
      }
      if (
        product === EulogiseProduct.SIDED_CARD ||
        foldType === GenericCardProductTypeFoldType.DOUBLE_SIDED
      ) {
        const clonePages = [...pages]
        const lastPage = pages[pages.length - 1]
        const firstPage = pages[0]
        clonePages.pop()
        clonePages.shift()
        return [lastPage, ...clonePages, firstPage]
      }
      if (product === EulogiseProduct.PHOTOBOOK) {
        const [_coverPage, _blankPage, ...mainPages] = pages
        return mainPages
      }
    }
    return pages
  }

  public static getTextItemFont({
    rowStyle,
    blockType,
    productTheme,
  }: {
    rowStyle?: IRowStyle
    blockType: string // please refer DraftBlockType in draft js
    productTheme: ICardProductTheme
  }): string {
    const { defaultStyle, styles, metadata } = productTheme
    const baseFont: string | undefined = FontHelper.getFontNameById(
      metadata?.baseFont,
    )
    return (
      rowStyle?.font ??
      styles[blockType]?.font ??
      baseFont ??
      defaultStyle.font!
    )
  }

  public static getTextItemFontSize({
    rowStyle,
    blockType,
    productTheme,
  }: {
    rowStyle?: IRowStyle
    blockType: string // please refer DraftBlockType in draft js
    productTheme: ICardProductTheme
  }) {
    const { defaultStyle, styles } = productTheme
    return (
      rowStyle?.fontSize ??
      styles[blockType]?.fontSize ??
      defaultStyle.fontSize!
    )
  }

  // contentHeight does not needed as we are using window.innerHeight
  public static calculateFitScaleFactor(params: {
    pageHeight: number
    contentWidth: number
    pageWidth: number
    product: EulogiseProduct
    colMode: CardProductPageColMode
    fixedScreenContentHeight: number
  }): {
    fitScaleFactorInHeight: number
    fitScaleFactorInWidth: number
  } {
    const {
      pageHeight,
      contentWidth,
      pageWidth,
      colMode,
      product,
      fixedScreenContentHeight,
    } = params
    const fitScaleFactorInWidth =
      contentWidth /
      (pageWidth * CardProductHelper.getNoOfDisplayPagesByPageMode(colMode))

    const fixedCardProductEditorContentHeight =
      product === EulogiseProduct.TV_WELCOME_SCREEN ||
      product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE
        ? fixedScreenContentHeight * 0.65
        : fixedScreenContentHeight
    const fitScaleFactorInHeight =
      fixedCardProductEditorContentHeight / pageHeight
    return {
      fitScaleFactorInHeight,
      fitScaleFactorInWidth,
    }
  }

  public static getEditorScaleFactor(params: {
    baseScaleRatio?: number
    cardProduct: ICardProductData
    screenContentWidth: number
    isMobile: boolean
    product: EulogiseProduct
    bookletMagnifierSliderValue: number
  }): {
    editorScaledFactor: number
    bookletMagnifierSliderScaleFactor: number
    scaledEditorWidth: number
    fixedWelcomeScreenTitleSlideEditorPanelHeight: number
  } {
    const {
      baseScaleRatio,
      cardProduct,
      screenContentWidth,
      isMobile,
      product,
      bookletMagnifierSliderValue,
    } = params
    const editorWidth = this.getEditorWidth({
      cardProduct,
      isMobile,
      minWidth: EULOGISE_EDITOR_MIN_WIDTH[product],
    })

    const cardProductContent = cardProduct?.content
    const pageSize = cardProductContent?.pageSize
    const pageOrientation = cardProductContent?.pageOrientation
    const genericProductMetadata = (
      cardProductContent as IGenericCardProductContent
    )?.metadata

    const { pageHeight, pageWidth } = CardProductHelper.getPageWidthAndHeight({
      genericProductMetadata,
      pageSize,
      pageOrientation,
    })
    const colMode: CardProductPageColMode =
      CardProductHelper.getPageColModeByPageSize(pageSize)
    const SPACES = 22
    const contentWidth = screenContentWidth - SPACES
    const cardProductEditorPaddingInRem =
      product === EulogiseProduct.THANK_YOU_CARD
        ? CARD_PRODUCT_THANK_YOU_CARD_EDITOR_VERTICAL_PADDING_IN_REM
        : CARD_PRODUCT_NORMAL_EDITOR_VERTICAL_PADDING_IN_REM

    // 4rem for header and 4rem for the editor bar, and 12rem (4rem * 2 for vertical space padding + 4rem for pagniation component at the bottom)
    const fixedScreenContentHeight =
      typeof window !== 'undefined'
        ? window.innerHeight -
          4 * 16 -
          4 * 16 -
          cardProductEditorPaddingInRem * 16 * 2 -
          4 * 16
        : 0

    const { fitScaleFactorInWidth, fitScaleFactorInHeight } =
      this.calculateFitScaleFactor({
        product,
        colMode,
        contentWidth,
        pageWidth,
        pageHeight,
        fixedScreenContentHeight,
      })

    const fitScaleFactor =
      fitScaleFactorInWidth <= 0 // fitScaleFactorInWidth can be less than 0 when the contentWidth is less than the pageWidth
        ? fitScaleFactorInHeight
        : Math.min(fitScaleFactorInHeight, fitScaleFactorInWidth)

    // Scale factor will be from 1.0 (100%) to 2.5 (250%)
    const bookletMagnifierSliderScaleFactor =
      (bookletMagnifierSliderValue / 100) * (2.5 - 1) + 1

    // Thank you card's default size is the 75% original size, other products are 100%
    const productBasedScaleRatio = baseScaleRatio
      ? baseScaleRatio
      : product === EulogiseProduct.THANK_YOU_CARD
      ? 0.75
      : 1

    // if the product is TV screen, we will make sure TV welcome screen takes 65% height and the panel takes 35%
    const fixedWelcomeScreenTitleSlideEditorPanelHeight =
      fixedScreenContentHeight * 0.35

    const scaledEditorWidth =
      fitScaleFactor *
      editorWidth *
      // because there is always two pages view (no single page view) on mobile for photobook,
      (product === EulogiseProduct.PHOTOBOOK ? 2 : 1)

    // if scaledEditorWidth reached the max contentWidth,
    // make sure the editor is scaled to the max contentWidth
    // so that the editor will not be overflowed outside of the browser
    if (scaledEditorWidth > contentWidth) {
      const sideMargin = 100 // 50px per side (left and right)
      const maxWidthScaleFactor = (contentWidth - sideMargin) / (pageWidth * 2)
      return {
        editorScaledFactor: maxWidthScaleFactor,
        bookletMagnifierSliderScaleFactor,
        scaledEditorWidth: contentWidth,
        fixedWelcomeScreenTitleSlideEditorPanelHeight,
      }
    }
    const results = {
      editorScaledFactor:
        fitScaleFactor *
        bookletMagnifierSliderScaleFactor *
        productBasedScaleRatio,
      bookletMagnifierSliderScaleFactor,
      scaledEditorWidth,
      fixedWelcomeScreenTitleSlideEditorPanelHeight,
    }
    return results
  }

  public static convertPageNumberToCursor(pageNumber: number): number {
    if (pageNumber === 0) {
      return 0
    }
    return Math.floor(pageNumber / 2) + 1
  }

  public static convertCursorToPageNumber(cursor: number): number {
    return cursor * 2 - 1
  }

  public static getPageModeByPageSize({
    pageSize,
    product,
    foldType,
    displayMode = CardProductViewDisplayMode.EDIT,
    isMobile = false,
  }: {
    pageSize: CardProductPageSize
    product: EulogiseProduct
    displayMode?: CardProductViewDisplayMode
    foldType?: GenericCardProductTypeFoldType
    isMobile?: boolean
  }): CardProductPageMode {
    if (displayMode === CardProductViewDisplayMode.PRINT) {
      if (
        product === EulogiseProduct.BOOKLET ||
        foldType === GenericCardProductTypeFoldType.BIFOLD
      ) {
        if (isMobile) {
          return CardProductPageMode.NORMAL
        }
        return CardProductPageMode.TWO_PAGES
      }
    }
    if (
      pageSize === CardProductPageSize.THANKYOUCARD_2_COLS ||
      pageSize === CardProductPageSize.TV_WELCOME_SCREEN_2_COLS ||
      pageSize === CardProductPageSize.SLIDESHOW_TITLE_SLIDE_2_COLS
    ) {
      return CardProductPageMode.TWO_PAGES
    }
    return CardProductPageMode.NORMAL
  }

  public static getDefaultBorderMargin({
    product,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
  }): {
    marginX: number
    marginY: number
  } {
    // For generic card products, resolve overlay margins from selectedDimension (percentage)
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductMetadata?.selectedDimension
    ) {
      const { overlayMarginX, overlayMarginY } =
        genericProductMetadata.selectedDimension
      if (overlayMarginX !== undefined && overlayMarginY !== undefined) {
        return {
          marginX: overlayMarginX,
          marginY: overlayMarginY,
        }
      }
    }

    const [marginX, marginY] = this.getDefaultOverlayByProduct(product)
      .overlayMargin as [number, number]
    return {
      marginX,
      marginY,
    }
  }

  public static getPageColModeByPageSize(
    pageSize: CardProductPageSize,
  ): CardProductPageColMode {
    if (
      pageSize === CardProductPageSize.THANKYOUCARD_2_COLS ||
      pageSize === CardProductPageSize.TV_WELCOME_SCREEN_2_COLS ||
      pageSize === CardProductPageSize.SLIDESHOW_TITLE_SLIDE_2_COLS
    ) {
      return CardProductPageColMode.TWO_COLS
    }
    return CardProductPageColMode.ONE_COL
  }

  public static getNoOfDisplayPagesByPageMode(
    pageColMode: CardProductPageColMode,
  ) {
    if (pageColMode === CardProductPageColMode.TWO_COLS) {
      return 2
    }
    return 1
  }

  public static getNoOfDisplayPagesByCardProduct(
    cardProduct: ICardProductData,
  ) {
    const pageSize = cardProduct.content.pageSize
    const pageColMode = this.getPageColModeByPageSize(pageSize)
    return this.getNoOfDisplayPagesByPageMode(pageColMode)
  }

  // AU PageMargins
  public static getDefaultAUPageMargins({
    product,
    genericProductType,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
  }): Array<number> {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      const selectedDimension =
        genericProductMetadata?.selectedDimension ??
        genericProductType?.dimensions[0]
      if (selectedDimension) {
        const marginsX = selectedDimension.pageMarginsX
        const marginsY = selectedDimension.pageMarginsY
        if (marginsX !== undefined && marginsY !== undefined) {
          return [marginsX, marginsY]
        }
      }
      console.log(
        `getDefaultAUPageMargins: no page margins found for generic card product`,
      )
      return [10, 10]
    }
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: [30, 40],
      [EulogiseProduct.SIDED_CARD]: [30, 40],
      [EulogiseProduct.BOOKMARK]: [5, 30],
      [EulogiseProduct.THANK_YOU_CARD]: [15, 20],
      [EulogiseProduct.TV_WELCOME_SCREEN]: [15, 20],
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: [15, 20],
      [EulogiseProduct.PHOTOBOOK]: [38, 38],
    }[product]
  }

  // US PageMargins
  public static getDefaultUSPageMargins({
    product,
    genericProductType,
    genericProductMetadata,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    genericProductMetadata?: IGenericCardProductMetadata
  }): Array<number> {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      const selectedDimension =
        genericProductMetadata?.selectedDimension ??
        genericProductType?.dimensions[0]
      if (selectedDimension) {
        const marginsX = selectedDimension.pageMarginsX
        const marginsY = selectedDimension.pageMarginsY
        if (marginsX !== undefined && marginsY !== undefined) {
          return [marginsX, marginsY]
        }
      }
      console.log(
        `getDefaultUSPageMargins: no page margins found for generic card product`,
      )
      return [10, 10]
    }
    // @ts-ignore
    return {
      [EulogiseProduct.BOOKLET]: [30, 40],
      [EulogiseProduct.SIDED_CARD]: [30, 40],
      [EulogiseProduct.BOOKMARK]: [5, 30],
      [EulogiseProduct.THANK_YOU_CARD]: [15, 20],
      [EulogiseProduct.TV_WELCOME_SCREEN]: [15, 20],
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: [15, 20],
      [EulogiseProduct.PHOTOBOOK]: [40, 40],
    }[product]
  }

  public static getDefaultThemeContent(
    productTheme: ICardProductTheme,
  ): Array<ICardProductPage> | undefined {
    return productTheme.defaultContent
  }

  public static getDefaultPageOrientation() {
    return CardProductPageOrientation.PORTRAIT
  }

  public static createCardProductContentByThemeId({
    product,
    genericProductType,
    selectedDimension,
    themeId,
    theme,
    isPopulatingData,
    populatedData,
    existingCardProduct,
    region = EulogiseRegion.AU,
    pageSize,
  }: {
    product: EulogiseProduct
    genericProductType?: IGenericCardProductTypeData
    selectedDimension?: IGenericCardProductTypeDimension
    themeId: string
    theme: ITheme
    isPopulatingData?: boolean
    populatedData?: ICardPopulatedTextData
    existingCardProduct?: ICardProductData
    region: EulogiseRegion
    pageSize?: CardProductPageSize
  }): ICardProductContent {
    const existingGenericProductMetadata = (
      existingCardProduct as IGenericCardProductData
    )?.content?.metadata
    const populatedTheme: ICardProductTheme | ISlideshowTheme =
      this.getCardProductThemeWithPopulatedData({
        product,
        genericProductType,
        themeId,
        theme,
        region,
        populatedData: isPopulatingData
          ? populatedData!
          : {
              primaryImage: populatedData?.primaryImage,
            },
        existingCardProduct,
      })!

    const pages = this.getDefaultThemeContent(
      populatedTheme as ICardProductTheme,
    )!
    const pageMargins: number[] = this.getDefaultPageMargins({
      region,
      product,
      genericProductType,
      genericProductMetadata: existingGenericProductMetadata,
    })
    const productTheme = ThemeHelper.getProductThemeByProductType({
      theme,
      product,
      region,
      genericProductType,
    }) as ICardProductTheme

    // Get target page content dimensions (the product's current dimension)
    const { width: targetPageContentWidth, height: targetPageContentHeight } =
      this.getDefaultPageContentWidthAndHeight({
        product,
        genericProductType,
        genericProductMetadata: existingGenericProductMetadata,
        defaultThemeLayoutColumns: productTheme.defaultThemeLayoutColumns,
        region,
      })

    // Calculate scale factor for generic card products based on height
    // Theme is designed for the first/default dimension, scale to target dimension
    let scaleFactor = 1
    let originalPageWidth = targetPageContentWidth
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType &&
      existingGenericProductMetadata?.selectedDimension
    ) {
      // Get the theme's base dimensions (first dimension in the product type)
      const themeBaseDimension = genericProductType.dimensions[0]
      if (themeBaseDimension) {
        // Create a temporary metadata with the base dimension to get the base dimensions
        const baseMetadata: IGenericCardProductMetadata = {
          ...existingGenericProductMetadata,
          selectedDimension: themeBaseDimension,
        }
        const { width: themeBaseWidth, height: themeBaseHeight } =
          this.getDefaultPageContentWidthAndHeight({
            product,
            genericProductType,
            genericProductMetadata: baseMetadata,
            defaultThemeLayoutColumns: productTheme.defaultThemeLayoutColumns,
            region,
          })

        // Store original page width for font size scaling
        originalPageWidth = themeBaseWidth

        // Calculate scale factor: target height / theme base height
        if (themeBaseHeight > 0) {
          scaleFactor = targetPageContentHeight / themeBaseHeight
        }
      }
    }

    const baseContent: ICardProductContent = {
      theme: themeId.toLowerCase(),
      pageSize: this.getPageSizeByProduct({
        product,
        defaultThemeLayoutColumns: productTheme.defaultThemeLayoutColumns,
        region,
        pageSize,
      }),
      pageOrientation: this.getDefaultPageOrientation(),
      pageMargins,
      pages: this.refinePages({
        pages,
        productTheme,
        pageContentWidth: targetPageContentWidth,
        pageContentHeight: targetPageContentHeight,
        product,
        scaleFactor,
        originalPageWidth,
      }),
    }

    // Add metadata for generic card products
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductType
    ) {
      const resolvedDimension =
        selectedDimension ?? genericProductType.dimensions[0]
      const metadata: IGenericCardProductMetadata =
        existingGenericProductMetadata ?? {
          // default or for creation
          slug: genericProductType.slug,
          name: genericProductType.name,
          dimensions: genericProductType.dimensions,
          selectedDimension: resolvedDimension,
          foldType: genericProductType.foldType,
          outputFormat: genericProductType.outputFormat,
          minPages: genericProductType.minPages,
          maxPages: genericProductType.maxPages,
          defaultPages: genericProductType.defaultPages,
        }

      return {
        ...baseContent,
        metadata,
      } as IGenericCardProductContent
    }

    return baseContent
  }

  public static styleDefToStyle(styleDef: any, options: any = {}) {
    const { font, margin, ...rest } = styleDef
    const style = {
      ...rest,
      fontFamily: font,
    }

    if (!options.excludeMargin) {
      const marginArray = typeof margin === 'number' ? [margin] : margin || [0]

      style.padding = `${marginArray[1] || marginArray[0]}px ${
        marginArray[2] || marginArray[0]
      }px ${marginArray[3] || marginArray[1] || marginArray[0]}px ${
        marginArray[0]
      }px`
    }

    return style
  }

  public static getBlockRenderMap(
    productTheme: ICardProductTheme,
    rowStyle: IRowStyle,
  ) {
    const paragraphsBlockRenderMap = Immutable.Map({
      'paragraph-one': {
        element: 'div',
      },
      'paragraph-two': {
        element: 'div',
      },
    })

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
      paragraphsBlockRenderMap,
    )
    return extendedBlockRenderMap.map((item, key) => {
      const themeStyle = { ...productTheme.styles[key], ...rowStyle }
      if (themeStyle) {
        const style = this.styleDefToStyle(themeStyle, { excludeMargin: true })

        const Wrapper = ({ children }: any) => (
          <section style={style}>{children}</section>
        )

        // @ts-ignore
        item.wrapper = <Wrapper style={style} />
      }

      return item
    })
  }

  public static calculateBestFontSizeForTextBlock(props: {
    productTheme: ICardProductTheme
    row: ICardProductTextRow
    pageContentWidth: number
    newFontSize?: number
  }): number {
    // work out the best font size that fit the size of the block
    const { productTheme, row, newFontSize, pageContentWidth } = props

    // START: get current font size from data
    const blocks = row.data.content.blocks
    const blockType = blocks[0]?.type
    const rowStyle = row.data.rowStyle
    const dataFontSize = this.getTextItemFontSize({
      rowStyle,
      blockType,
      productTheme,
    })
    // END - get current font size from data

    const rowData = row.data as ICardProductTextRowData
    const editorState = EditorState.createWithContent(
      convertFromRaw(rowData?.content as unknown as RawDraftContentState),
    )
    const container = document.createElement('div')

    // Apply styles to position the container off-screen
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.lineHeight = 'normal'
    // please ensure the following style are same as StyledContainer in TextItem
    container.classList.add('text-item-calculation-container')

    ReactDOM.render(
      // @ts-ignore
      <Editor
        onChange={() => {}}
        editorState={editorState}
        textAlignment={rowData?.alignment}
        blockRenderMap={this.getBlockRenderMap(productTheme, {
          ...rowData?.rowStyle!,
          // use new font size if available
          fontSize: newFontSize ?? dataFontSize,
        })}
        readOnly
      />,
      container,
    )

    // Append the container to the document body
    document.body.appendChild(container)
    const width = container.offsetWidth

    // Remove the container - since we have the width, we don't need it anymore
    document.body.removeChild(container)

    const PAGE_CONTENT_PADDING = 8
    // if the current font size does not fit the block, reduce the font size
    if (width > pageContentWidth - PAGE_CONTENT_PADDING) {
      const newCheckFontSize = (newFontSize ? newFontSize : dataFontSize) - 1
      const minFontSize = 6
      if (newCheckFontSize <= minFontSize) {
        return minFontSize
      }
      return this.calculateBestFontSizeForTextBlock({
        productTheme,
        row,
        pageContentWidth,
        newFontSize: newCheckFontSize,
      })
    }
    return newFontSize ?? dataFontSize
  }

  /**
   * Calculate scaled font size based on width ratio.
   * This ensures text maintains the same visual proportion relative to page width,
   * preventing single-line text from wrapping to multiple lines.
   *
   * Font size scales linearly with width: newFontSize = currentFontSize * (targetWidth / originalWidth)
   */
  public static calculateScaledFontSize(props: {
    productTheme: ICardProductTheme
    row: ICardProductTextRow
    originalPageWidth: number
    targetPageWidth: number
  }): number {
    const { productTheme, row, originalPageWidth, targetPageWidth } = props

    const currentFontSize =
      row.data.rowStyle?.fontSize ?? productTheme.defaultStyle.fontSize ?? 12

    // Scale font size by width ratio to maintain same visual proportion
    // This ensures single-line text stays single-line
    const widthRatio = targetPageWidth / originalPageWidth
    const scaledFontSize = currentFontSize * widthRatio

    const MIN_FONT_SIZE = 6
    return Math.max(MIN_FONT_SIZE, scaledFontSize)
  }

  public static refineTextRow(props: {
    productTheme: ICardProductTheme
    row: ICardProductTextRow
    pageContentWidth: number
    pageContentHeight?: number
    scaleFactor?: number
    product?: EulogiseProduct
    originalPageWidth?: number
  }): ICardProductTextRow {
    const {
      row,
      scaleFactor = 1,
      product,
      productTheme,
      pageContentWidth,
    } = props

    // For generic card products, scale font size by the same scale factor as other items
    // This ensures fonts maintain the same visual proportion relative to the page
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT && scaleFactor !== 1) {
      const currentFontSize =
        row.data.rowStyle?.fontSize ?? productTheme.defaultStyle.fontSize ?? 12

      // Scale font size by the height-based scale factor (same as other items)
      const MIN_FONT_SIZE = 6
      const scaledFontSize = Math.round(
        Math.max(MIN_FONT_SIZE, currentFontSize * scaleFactor),
      )

      const currentRowHeight = row?.data?.height
      return {
        ...row,
        data: {
          ...row.data,
          ...(currentRowHeight
            ? { height: currentRowHeight * scaleFactor }
            : {}),
          // Text uses full width naturally
          width: pageContentWidth,
          rowStyle: {
            ...row.data.rowStyle,
            fontSize: scaledFontSize,
          },
        },
      }
    }

    // For other products, use the existing best font size calculation
    const adjustedFontSize = this.calculateBestFontSizeForTextBlock(props)
    return {
      ...row,
      data: {
        ...row.data,
        rowStyle: {
          ...row.data.rowStyle,
          fontSize: adjustedFontSize,
        },
      },
    }
  }

  /**
   * Refine icon row for generic card products.
   * Scale icon proportionally and use full width container.
   */
  public static refineIconRow(props: {
    row: ICardProductIconRow
    pageContentWidth: number
    product: EulogiseProduct
    scaleFactor?: number
  }): ICardProductIconRow {
    const { row, pageContentWidth, product } = props

    // Only apply to generic card products
    if (product !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return row
    }

    const currentWidth = row.data.width ?? 0
    const currentHeight = row.data.height ?? 0

    // If no dimensions, return as-is
    if (!currentWidth || !currentHeight) {
      return row
    }

    // Scale icon to full page width while maintaining aspect ratio
    const widthScale = pageContentWidth / currentWidth
    const newWidth = pageContentWidth
    const newHeight = Math.round(currentHeight * widthScale)

    return {
      ...row,
      data: {
        ...row.data,
        width: newWidth,
        height: newHeight,
      },
      height: newHeight,
    }
  }

  /**
   * Refine space row for generic card products.
   * Scale divider height proportionally and use full width.
   */
  public static refineSpaceRow(props: {
    row: ICardProductSpaceRow
    pageContentWidth: number
    product: EulogiseProduct
    scaleFactor?: number
  }): ICardProductSpaceRow {
    const { row, pageContentWidth, product, scaleFactor = 1 } = props

    // Only apply to generic card products
    if (product !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return row
    }

    // Scale the space height
    const currentSpaceHeight = row.data.height ?? 0
    const scaledSpaceHeight = Math.round(currentSpaceHeight * scaleFactor)

    // If no divider, just scale the space height
    if (!row.data.divider) {
      return {
        ...row,
        data: {
          ...row.data,
          height: scaledSpaceHeight,
        },
        height: scaledSpaceHeight,
      }
    }

    const currentDividerHeight = row.data.divider.height ?? 0
    // Scale divider height, use full width for divider
    const scaledDividerHeight = Math.round(currentDividerHeight * scaleFactor)

    return {
      ...row,
      data: {
        ...row.data,
        height: scaledSpaceHeight,
        divider: {
          ...row.data.divider,
          width: pageContentWidth, // Divider uses full width
          height: scaledDividerHeight,
        },
      },
      height: scaledSpaceHeight,
    }
  }

  /**
   * Refine image row for generic card products.
   * Scale image proportionally based on scale factor, then fit to page width if needed.
   */
  public static refineImageRow(props: {
    row: ICardProductImageRow
    pageContentWidth: number
    product: EulogiseProduct
    scaleFactor?: number
  }): ICardProductImageRow {
    const { row, pageContentWidth, product, scaleFactor = 1 } = props

    // Only apply to generic card products
    if (product !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return row
    }

    const currentWidth = row.data.width ?? 0
    const currentHeight = row.data.height ?? 0

    // If no dimensions, return as-is
    if (!currentWidth || !currentHeight) {
      return row
    }

    // Scale proportionally using the same scale factor as other items
    let newWidth = Math.round(currentWidth * scaleFactor)
    let newHeight = Math.round(currentHeight * scaleFactor)

    // If scaled width exceeds page width, scale down to fit while maintaining aspect ratio
    if (newWidth > pageContentWidth) {
      const fitScale = pageContentWidth / newWidth
      newWidth = pageContentWidth
      newHeight = Math.round(newHeight * fitScale)
    }

    return {
      ...row,
      data: {
        ...row.data,
        width: newWidth,
        height: newHeight,
      },
      height: newHeight,
    }
  }

  /**
   * Refine frame row for generic card products.
   * Scale frame proportionally based on scale factor, then fit to page width if needed.
   */
  public static refineFrameRow(props: {
    row: ICardProductFrameRow
    pageContentWidth: number
    product: EulogiseProduct
    scaleFactor?: number
  }): ICardProductFrameRow {
    const { row, pageContentWidth, product, scaleFactor = 1 } = props

    // Only apply to generic card products
    if (product !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return row
    }

    const currentWidth = row.data.width ?? 0
    const currentHeight = row.data.height ?? 0

    // If no dimensions, return as-is
    if (!currentWidth || !currentHeight) {
      return row
    }

    // Scale proportionally using the same scale factor as other items
    let newWidth = Math.round(currentWidth * scaleFactor)
    let newHeight = Math.round(currentHeight * scaleFactor)

    // If scaled width exceeds page width, scale down to fit while maintaining aspect ratio
    if (newWidth > pageContentWidth) {
      const fitScale = pageContentWidth / newWidth
      newWidth = pageContentWidth
      newHeight = Math.round(newHeight * fitScale)
    }

    return CardProductFrameHelper.centeringFrameRowImages({
      frameRow: {
        ...row,
        data: {
          ...row?.data,
          content: {
            ...row?.data?.content,
            width: newWidth,
            height: newHeight,
          },
          width: newWidth,
          height: newHeight,
        },
      },
    })
  }

  /**
   * Calculate the height of a single row for filtering purposes.
   */
  public static getRowHeightForFiltering(props: {
    row: ICardProductRow
    product: EulogiseProduct
  }): number {
    const { row, product } = props

    if (row.type === CardProductContentItemType.COLUMNS) {
      const columnRow = row as { data: ICardProductColumnRowData }
      return columnRow.data.items.reduce(
        (curr: number, item: ICardProductImageRow) =>
          curr < (item.data.height ?? 0) ? item.data.height ?? 0 : curr,
        0,
      )
    } else if (row.type === CardProductContentItemType.IMAGE) {
      return (row as ICardProductImageRow).data?.height ?? 0
    } else if (row.type === CardProductContentItemType.TEXT) {
      const textRow = row as ICardProductTextRow
      const margin = textRow.data?.margin
      const marginValue = Array.isArray(margin) ? margin[0] : margin
      const marginTopAndBottom = (marginValue || 0) * 2
      if (product === EulogiseProduct.PHOTOBOOK) {
        return DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
      }
      return (textRow.data?.height ?? 0) + marginTopAndBottom
    } else if (row.type === CardProductContentItemType.SPACE) {
      return (row as ICardProductSpaceRow).data?.height ?? 0
    } else if (row.type === CardProductContentItemType.FRAME) {
      return (row as ICardProductFrameRow).data?.height ?? 0
    } else if (row.type === CardProductContentItemType.ICON) {
      return (row as ICardProductIconRow).data?.height ?? 0
    }

    return 0
  }

  /**
   * Filter rows to fit within available page height.
   * Removes rows from the bottom if total height exceeds available height.
   */
  public static filterRowsByAvailableHeight(props: {
    rows: Array<ICardProductRow>
    pageContentHeight: number
    product: EulogiseProduct
  }): Array<ICardProductRow> {
    const { rows, pageContentHeight, product } = props
    const filteredRows: Array<ICardProductRow> = []
    let accumulatedHeight = 0

    for (const row of rows) {
      const rowHeight = this.getRowHeightForFiltering({ row, product })

      // Check if adding this row would exceed available height
      if (accumulatedHeight + rowHeight > pageContentHeight) {
        // Stop adding rows - this row and all following rows are removed
        break
      }

      filteredRows.push(row)
      accumulatedHeight += rowHeight
    }

    return filteredRows
  }

  public static refineRow(props: {
    row: ICardProductRow
    productTheme: ICardProductTheme
    pageContentWidth: number
    pageContentHeight: number
    product: EulogiseProduct
    scaleFactor?: number
    originalPageWidth?: number
  }): ICardProductRow {
    const {
      row,
      productTheme,
      pageContentWidth,
      pageContentHeight,
      product,
      scaleFactor = 1,
      originalPageWidth,
    } = props

    switch (row.type) {
      case CardProductContentItemType.TEXT:
        return this.refineTextRow({
          row,
          productTheme,
          pageContentWidth,
          pageContentHeight,
          scaleFactor,
          product,
          originalPageWidth,
        })
      case CardProductContentItemType.ICON:
        return this.refineIconRow({
          row: row as ICardProductIconRow,
          pageContentWidth,
          product,
          scaleFactor,
        })
      case CardProductContentItemType.SPACE:
        return this.refineSpaceRow({
          row: row as ICardProductSpaceRow,
          pageContentWidth,
          product,
          scaleFactor,
        })
      case CardProductContentItemType.IMAGE:
        return this.refineImageRow({
          row: row as ICardProductImageRow,
          pageContentWidth,
          product,
          scaleFactor,
        })
      case CardProductContentItemType.FRAME:
        return this.refineFrameRow({
          row: row as ICardProductFrameRow,
          pageContentWidth,
          product,
          scaleFactor,
        })
      default:
        return row
    }
  }

  public static refineSinglePage(props: {
    page: ICardProductPage
    productTheme: ICardProductTheme
    pageContentWidth: number
    pageContentHeight: number
    product: EulogiseProduct
    scaleFactor?: number
    originalPageWidth?: number
  }): ICardProductPage {
    const {
      page,
      productTheme,
      pageContentWidth,
      pageContentHeight,
      product,
      scaleFactor = 1,
      originalPageWidth,
    } = props

    // First, refine all rows for width and scale
    let refinedRows = page.rows.map((row: ICardProductRow) =>
      this.refineRow({
        row,
        productTheme,
        pageContentWidth,
        pageContentHeight,
        product,
        scaleFactor,
        originalPageWidth,
      }),
    )

    /*
    // For generic card products, filter rows that exceed page height
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      refinedRows = this.filterRowsByAvailableHeight({
        rows: refinedRows,
        pageContentHeight,
        product,
      })
    }
*/

    return {
      ...page,
      rows: refinedRows,
    }
  }

  public static refinePages(props: {
    pages: Array<ICardProductPage>
    pageContentWidth: number
    pageContentHeight: number
    productTheme: ICardProductTheme
    product: EulogiseProduct
    scaleFactor?: number
    originalPageWidth?: number
  }): Array<ICardProductPage> {
    const {
      pages,
      productTheme,
      pageContentWidth,
      pageContentHeight,
      product,
      scaleFactor = 1,
      originalPageWidth,
    } = props
    return pages.map((page: ICardProductPage) =>
      this.refineSinglePage({
        page,
        productTheme,
        pageContentWidth,
        pageContentHeight,
        product,
        scaleFactor,
        originalPageWidth,
      }),
    )
  }

  public static getCardProductRow(
    cardProduct: ICardProductData,
    pageIndex: number,
    rowId: string,
  ): ICardProductRow {
    const page: ICardProductPage = cardProduct.content.pages[pageIndex]
    const rows = page.rows
    return rows.find((r: ICardProductRow) => r.id === rowId)!
  }

  public static getCardProductRowByRowId(
    pages: Array<ICardProductPage>,
    rowId: string,
  ): ICardProductRow | undefined {
    for (const page of pages) {
      for (const row of page.rows) {
        if (row.id === rowId) {
          return row
        }
      }
    }
    return
  }

  public static replaceImageContentInRows(
    rows: Array<ICardProductRow>,
    oldFilestackHandle: string,
    newImageContent: IImageAssetContent,
  ): Array<ICardProductRow> {
    return rows.map((r: ICardProductRow) => {
      // update single image row
      if (
        r.type === CardProductContentItemType.IMAGE &&
        r?.data?.filestackHandle === oldFilestackHandle
      ) {
        return {
          ...r,
          data: {
            ...r.data,
            ...newImageContent,
          },
        }
      }
      // update column images
      else if (
        r.type === CardProductContentItemType.COLUMNS &&
        r?.data?.items
      ) {
        const updatedColumnRow: Array<ICardProductImageRow> =
          r?.data?.items?.map((item: ICardProductImageRow) => {
            if (item?.data?.filestackHandle === oldFilestackHandle) {
              return {
                ...item,
                data: {
                  ...item?.data,
                  ...newImageContent,
                },
              }
            }
            return item
          })
        return {
          ...r,
          data: {
            ...r?.data,
            items: updatedColumnRow,
          },
        }
      }
      // update frame content items
      else if (
        r.type === CardProductContentItemType.FRAME &&
        r?.data?.content
      ) {
        return {
          ...r,
          data: {
            ...r.data,
            content: CardProductFrameHelper.replaceFilestackHandleInFrameItem(
              r.data.content as ICardProductFrameLayout,
              oldFilestackHandle,
              newImageContent,
            ),
          },
        }
      }
      return r
    })
  }

  public static hasRowsWithFilestackHandle(
    rows: Array<ICardProductRow>,
    filestackHandle: string,
  ): boolean {
    return rows.some((r: ICardProductRow) => {
      if (
        r.type === CardProductContentItemType.IMAGE &&
        r?.data?.filestackHandle === filestackHandle
      ) {
        return true
      }
      if (
        r.type === CardProductContentItemType.COLUMNS &&
        r?.data?.items?.some(
          (item: ICardProductImageRow) =>
            item?.data?.filestackHandle === filestackHandle,
        )
      ) {
        return true
      }
      if (r.type === CardProductContentItemType.FRAME && r?.data?.content) {
        return CardProductFrameHelper.getFrameLayoutImageFilestackHandles(
          r.data.content as ICardProductFrameLayout,
        ).includes(filestackHandle)
      }
      return false
    })
  }

  public static replaceImageContentInPages(params: {
    pages: Array<ICardProductPage>
    oldFilestackHandle: string
    newImageContent: IImageAssetContent
  }): Array<ICardProductPage & { pageIndex: number }> {
    const { pages, oldFilestackHandle, newImageContent } = params
    const updatedPages: Array<ICardProductPage & { pageIndex: number }> = []

    pages.forEach((page: ICardProductPage, index: number) => {
      if (!this.hasRowsWithFilestackHandle(page.rows, oldFilestackHandle)) {
        return
      }
      updatedPages.push({
        ...page,
        pageIndex: index,
        rows: this.replaceImageContentInRows(
          page.rows,
          oldFilestackHandle,
          newImageContent,
        ),
      })
    })
    return updatedPages
  }

  public static getTotalPageCursors(params: {
    product: EulogiseProduct
    totalPages: number
    pageMode?: CardProductPageMode
    isMobile?: boolean
    displayMode?: CardProductViewDisplayMode
    foldType?: GenericCardProductTypeFoldType
  }): number | undefined {
    const {
      product,
      totalPages,
      pageMode = CardProductPageMode.NORMAL,
      isMobile = false,
      displayMode,
      foldType,
    } = params
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      switch (foldType) {
        case GenericCardProductTypeFoldType.SINGLE_SIDE: {
          return totalPages
        }
        case GenericCardProductTypeFoldType.DOUBLE_SIDED: {
          return 2
        }
        case GenericCardProductTypeFoldType.BIFOLD: {
          if (isMobile || displayMode === CardProductViewDisplayMode.TEMPLATE) {
            return totalPages
          }
          if (displayMode === CardProductViewDisplayMode.PRINT) {
            return Math.ceil(totalPages / 2)
          }
          const noOfDoublePages: number = (totalPages - 2) / 2
          const noOfFrontPages: number = 1
          const noOfBackPages: number = 1
          return noOfDoublePages + noOfFrontPages + noOfBackPages
        }
        case GenericCardProductTypeFoldType.TRIFOLD: {
          return Math.round(totalPages / 3)
        }
        default: {
          throw new Error(`getTotalPageCursors: Invalid foldType ${foldType}`)
        }
      }
    }
    if (displayMode === CardProductViewDisplayMode.THUMBNAIL) {
      if (product === EulogiseProduct.BOOKMARK) {
        if (totalPages > 1) {
          return 2
        }
      }
      return 1
    }
    if (displayMode === CardProductViewDisplayMode.PRINT) {
      if (pageMode === CardProductPageMode.SINGLE_PAGE) {
        return totalPages
      }
    }
    if (
      product === EulogiseProduct.PHOTOBOOK &&
      (displayMode === CardProductViewDisplayMode.PREVIEW ||
        displayMode === CardProductViewDisplayMode.PRINT)
    ) {
      return totalPages / 2 + 1
    }
    // if predefined
    const cursors = this.getNoOfPageCursors(product)
    if (cursors) {
      return cursors
    }
    if (pageMode === CardProductPageMode.NORMAL) {
      if (isMobile || displayMode === CardProductViewDisplayMode.TEMPLATE) {
        return totalPages
      }
      const noOfDoublePages: number = (totalPages - 2) / 2
      const noOfFrontPages: number = 1
      const noOfBackPages: number = 1
      return noOfDoublePages + noOfFrontPages + noOfBackPages
    } else if (pageMode === CardProductPageMode.TWO_PAGES) {
      return Math.ceil(totalPages / 2)
    }
    return
  }

  public static computeGeneratedFlipBookSize({
    maxSize,
    imageSize,
  }: {
    maxSize: {
      width: number
      height: number
    }
    imageSize: {
      width: number
      height: number
    }
  }): {
    width: number
    height: number
  } {
    // calculate to determine whether it should be using the max width or max height
    // it should return width and height based on whether the image width/height is closer to reach the max width/height
    const { width, height } = imageSize
    const { width: maxWidth, height: maxHeight } = maxSize
    const widthRatio = maxWidth / width
    const heightRatio = maxHeight / height
    const ratio = Math.min(widthRatio, heightRatio)
    return {
      width: Math.floor(width * ratio),
      height: Math.floor(height * ratio),
    }
  }

  // return 96dpi width and height
  public static getPdfPageViewport(params: {
    product: EulogiseProduct
    pageSize?: CardProductPageSize
    genericProductMetadata?: IGenericCardProductMetadata
    bleed?: boolean
    type?: 'MM' | 'PX'
    pageMode?: CardProductPageMode
  }): {
    width: string
    height: string
  } {
    const {
      product,
      pageSize,
      genericProductMetadata,
      bleed,
      type = 'MM',
      pageMode,
    } = params
    const scale = type === 'PX' ? MM_TO_PAGE_SIZE_SCALE : 1
    const viewPort = this.getViewPortByProduct({ product, pageSize, pageMode })
    const selectedDimension = genericProductMetadata?.selectedDimension
    const foldType = genericProductMetadata?.foldType
    const [width, height] = genericProductMetadata
      ? [
          CardProductHelper.pxToMm(selectedDimension?.width ?? 0) *
            (foldType === GenericCardProductTypeFoldType.BIFOLD ? 2 : 1),
          CardProductHelper.pxToMm(selectedDimension?.height ?? 0),
        ]
      : VIEW_PORT_IN_MM[viewPort]

    if (bleed) {
      const totalBleedPerPage =
        // for MILK products, we need to remove the trim mark
        pageMode === CardProductPageMode.SINGLE_PAGE ||
        pageMode === CardProductPageMode.COVER_PAGE
          ? BLEED_IN_MM * 2 // remove trim mark
          : BLEED_IN_MM * 2 * 2 // 2 sides and 2 scale

      return {
        width: ((width + totalBleedPerPage) * scale).toString(),
        height: ((height + totalBleedPerPage) * scale).toString(),
      }
    }

    return {
      width: (width * scale).toString(),
      height: (height * scale).toString(),
    }
  }

  public static getDefaultOverlayByProduct(
    product: EulogiseProduct,
    genericProductMetadata?: IGenericCardProductMetadata,
  ): ICardProductOverlayUpdateOptions {
    // For generic card products, resolve overlay margins from selectedDimension
    if (
      product === EulogiseProduct.GENERIC_CARD_PRODUCT &&
      genericProductMetadata?.selectedDimension
    ) {
      const { overlayMarginX, overlayMarginY } =
        genericProductMetadata.selectedDimension
      if (overlayMarginX !== undefined && overlayMarginY !== undefined) {
        const baseOverlay =
          CARD_PRODUCTS_OVERLAYS[product] ??
          CARD_PRODUCTS_OVERLAYS[EulogiseProduct.ALL]
        return {
          ...baseOverlay,
          overlayMargin: [overlayMarginX, overlayMarginY],
        }
      }
    }

    const overlay = CARD_PRODUCTS_OVERLAYS[product]
    if (!overlay) {
      return CARD_PRODUCTS_OVERLAYS[EulogiseProduct.ALL]
    }
    return overlay
  }

  public static getOverlaySettingsFormFields({
    cardProduct,
    product,
  }: {
    cardProduct: ICardProductData
    product: EulogiseProduct
  }): ICardProductOverlayUpdateOptions {
    return (
      cardProduct.content.pageOverlay ??
      this.getDefaultOverlayByProduct(product)
    )
  }

  public static getBorderSettingsFormFields(
    cardProduct: ICardProductData,
  ): IBorderSettingsModalFormFields {
    const formFields: IBorderSettingsModalFormFields = {
      [CardProductBorderPageType.BACK_PAGE]: {
        borderCategory: CardProductBorderCategory.CLASSIC,
        borderStyle: CardProductBorderType.NONE,
      },
      [CardProductBorderPageType.FRONT_PAGE]: {
        borderCategory: CardProductBorderCategory.CLASSIC,
        borderStyle: CardProductBorderType.NONE,
      },
      [CardProductBorderPageType.MIDDLE_PAGES]: {
        borderCategory: CardProductBorderCategory.CLASSIC,
        borderStyle: CardProductBorderType.NONE,
      },
    }
    const contentPages = cardProduct.content.pages
    for (let i = 0; i < contentPages.length; i++) {
      const contentPage = contentPages[i]
      if (contentPage.border) {
        if (i === 0) {
          formFields[CardProductBorderPageType.FRONT_PAGE] = {
            ...formFields[CardProductBorderPageType.FRONT_PAGE],
            ...contentPage.border,
          }
        } else if (i === contentPages.length - 1) {
          formFields[CardProductBorderPageType.BACK_PAGE] = {
            ...formFields[CardProductBorderPageType.BACK_PAGE],
            ...contentPage.border,
          }
        } else if (i !== 0 && i !== contentPages.length - 1) {
          formFields[CardProductBorderPageType.MIDDLE_PAGES] = {
            ...formFields[CardProductBorderPageType.MIDDLE_PAGES],
            ...contentPage.border,
          }
        }
      }
    }
    return formFields
  }

  public static getPageIndexesByPageCursor(params: {
    product: EulogiseProduct
    pageCursorIndex: number
    totalPages: number
    pageMode?: CardProductPageMode
    foldType?: GenericCardProductTypeFoldType
    isMobile?: boolean
    displayMode?: CardProductViewDisplayMode
  }): {
    leftPageIndex: number | undefined
    rightPageIndex: number | undefined
  } {
    const {
      product,
      pageCursorIndex,
      totalPages,
      pageMode = CardProductPageMode.NORMAL,
      isMobile,
      displayMode,
      foldType,
    } = params
    let leftPageIndex
    let rightPageIndex
    const totalCursors: number = this.getTotalPageCursors({
      product,
      totalPages,
      pageMode,
      isMobile,
      foldType,
      displayMode,
    })!

    const setBiFoldPageIndexes = () => {
      if (pageMode === CardProductPageMode.NORMAL) {
        if (displayMode === CardProductViewDisplayMode.TEMPLATE) {
          rightPageIndex = newPageCursorIndex
        } else if (isMobile) {
          rightPageIndex = newPageCursorIndex
        } else {
          // first page
          if (newPageCursorIndex === 0) {
            rightPageIndex = 0
          }
          // last page
          else if (newPageCursorIndex === totalCursors - 1) {
            if (
              displayMode === CardProductViewDisplayMode.PRINT ||
              displayMode === CardProductViewDisplayMode.PREVIEW
            ) {
              leftPageIndex = totalPages - 1
            } else {
              rightPageIndex = totalPages - 1
            }
          } else {
            leftPageIndex = newPageCursorIndex * 2 - 1
            rightPageIndex = newPageCursorIndex * 2
          }
        }
      } else if (pageMode === CardProductPageMode.TWO_PAGES) {
        leftPageIndex = newPageCursorIndex * 2
        rightPageIndex = newPageCursorIndex * 2 + 1
      } else if (pageMode === CardProductPageMode.SINGLE_PAGE) {
        rightPageIndex = newPageCursorIndex
      }
    }

    const newPageCursorIndex =
      pageCursorIndex >= totalCursors - 1 ? totalCursors - 1 : pageCursorIndex

    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      switch (foldType) {
        case GenericCardProductTypeFoldType.SINGLE_SIDE: {
          rightPageIndex = newPageCursorIndex
          break
        }
        case GenericCardProductTypeFoldType.DOUBLE_SIDED:
        case GenericCardProductTypeFoldType.BIFOLD: {
          setBiFoldPageIndexes()
          break
        }
        case GenericCardProductTypeFoldType.TRIFOLD: {
          throw new Error(`Trifold has not been implemented`)
        }
        default: {
          throw new Error(
            'getPageIndexesByPageCursor: Unknown fold type for generic card product',
          )
        }
      }
    } else {
      // For multiple pages e.g. booklet
      setBiFoldPageIndexes()
    }
    return {
      leftPageIndex,
      rightPageIndex,
    }
  }

  public static isCardProductComplete({
    product,
    fileStatuses,
  }: {
    product: EulogiseProduct
    fileStatuses: Record<ResourceFileStatusKey, ResourceFileStatus>
  }): boolean {
    switch (product) {
      case EulogiseProduct.BOOKLET:
      case EulogiseProduct.SIDED_CARD:
      case EulogiseProduct.THANK_YOU_CARD:
      case EulogiseProduct.BOOKMARK:
      case EulogiseProduct.GENERIC_CARD_PRODUCT:
        return (
          fileStatuses[ResourceFileStatusKey.BLEED] ===
            ResourceFileStatus.GENERATED &&
          fileStatuses[ResourceFileStatusKey.NON_BLEED] ===
            ResourceFileStatus.GENERATED
        )
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return (
          fileStatuses[ResourceFileStatusKey.NON_BLEED] ===
          ResourceFileStatus.GENERATED
        )
      case EulogiseProduct.PHOTOBOOK: {
        return (
          fileStatuses[ResourceFileStatusKey.BLEED] ===
            ResourceFileStatus.GENERATED &&
          fileStatuses[ResourceFileStatusKey.SINGLE_PAGE_BLEED] ===
            ResourceFileStatus.GENERATED
        )
      }
      default:
        return false
    }
  }

  public static getPageNumbersByPageCursor(params: {
    product: EulogiseProduct
    pageCursorIndex: number
    totalPages: number
    pageMode?: CardProductPageMode
    isMobile?: boolean
    displayMode?: CardProductViewDisplayMode
    foldType?: GenericCardProductTypeFoldType
  }): {
    leftPageNumber: number | undefined
    rightPageNumber: number | undefined
  } {
    const {
      product,
      pageCursorIndex,
      totalPages,
      pageMode = CardProductPageMode.NORMAL,
      isMobile,
      displayMode,
      foldType,
    } = params
    const { leftPageIndex, rightPageIndex } = this.getPageIndexesByPageCursor({
      product,
      pageCursorIndex,
      foldType,
      totalPages,
      pageMode,
      isMobile,
      displayMode,
    })
    if (product === EulogiseProduct.PHOTOBOOK) {
      return {
        leftPageNumber:
          leftPageIndex !== undefined && leftPageIndex > 1
            ? leftPageIndex - 1
            : undefined,
        rightPageNumber:
          rightPageIndex !== undefined && rightPageIndex > 1
            ? rightPageIndex - 1
            : undefined,
      }
    }
    return {
      leftPageNumber:
        leftPageIndex !== undefined ? leftPageIndex + 1 : undefined,
      rightPageNumber:
        rightPageIndex !== undefined ? rightPageIndex + 1 : undefined,
    }
  }

  public static getUnusedImages({
    images = [],
    cardProduct,
  }: {
    images?: Array<IImageAsset>
    cardProduct: ICardProductData
  }): Array<IImageAsset> {
    const shownImageHandles = this.getAllImageFilestackHandles(cardProduct)
    return images?.filter((i) => {
      return (
        i.content.filestackHandle &&
        !shownImageHandles?.includes(i.content.filestackHandle)
      )
    })
  }

  public static getPageNumberTextByPageCursor(params: {
    product: EulogiseProduct
    pageCursorIndex: number
    totalPages: number
    pageMode: CardProductPageMode
    isMobile?: boolean
    displayMode?: CardProductViewDisplayMode
    foldType?: GenericCardProductTypeFoldType
  }) {
    const {
      product,
      pageCursorIndex,
      totalPages,
      pageMode = CardProductPageMode.NORMAL,
      isMobile,
      displayMode,
      foldType,
    } = params
    const { leftPageNumber, rightPageNumber } = this.getPageNumbersByPageCursor(
      {
        product,
        pageCursorIndex,
        totalPages,
        pageMode,
        isMobile,
        foldType,
        displayMode,
      },
    )
    return [leftPageNumber, rightPageNumber].filter(Boolean).join('-')
  }

  public static isTwoPagesButActAsOnePage(product: EulogiseProduct): boolean {
    return EulogiseProduct.THANK_YOU_CARD !== product
  }

  public static getMaxPageContentWidth({
    cardProduct,
  }: {
    cardProduct: ICardProductData
  }) {
    const cardProductContent = cardProduct?.content
    const cardProductPageSize = cardProductContent?.pageSize
    const cardProductPageOrientation = cardProductContent?.pageOrientation
    const cardProductPageMargin =
      cardProductContent?.pageMargins as Array<number>
    const { pageWidth } = CardProductHelper.getPageWidthAndHeight({
      pageSize: cardProductPageSize,
      pageOrientation: cardProductPageOrientation,
      genericProductMetadata: (cardProductContent as IGenericCardProductContent)
        ?.metadata,
    })
    return (
      pageWidth -
      cardProductPageMargin[0] -
      (cardProductPageMargin[2] || cardProductPageMargin[0])
    )
  }

  public static getBleedPageBackground({
    page,
    product,
  }: {
    page: ICardProductPage
    product: EulogiseProduct
  }) {
    if (!page?.background?.image) {
      return
    }
    const image = page.background.image
    const imageUrl = ImageHelper.getImageUrl(image)!

    if (product === EulogiseProduct.SIDED_CARD) {
      // e.g. Sailing_Watercolor_BOOKLET_FRONT_BOTH_SIDE_USA.jpg
      const region: EulogiseRegion = /_USA\.jpg$/.test(imageUrl)
        ? EulogiseRegion.USA
        : EulogiseRegion.AU
      return imageUrl?.replace(
        /(_BOTH_SIDE_USA\.jpg|_BOTH_SIDE\.jpg|_USA\.jpg|\.jpg)$/,
        `_BOTH_SIDE${region === EulogiseRegion.USA ? '_USA' : ''}_BLEED.jpg`,
      )
    }
    return imageUrl?.replace(/\.jpg$/, '_BLEED.jpg')
  }

  public static getFirstPage(props: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed?: boolean
  }): ICardProductPage {
    return this.getPages(props)[0]
  }

  public static getFirstPageBackgroundImageUrl(props: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed?: boolean
  }): string | undefined {
    const firstPageBackground = this.getFirstPageBackground(props)
    if (!firstPageBackground) {
      return
    }
    return ImageHelper.getImageUrl(firstPageBackground.image)
  }

  public static getFirstPageBackground(props: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed?: boolean
  }) {
    return this.getFirstPage(props).background
  }

  public static getCardProductS3FileUrl(
    params: IGetCardProductS3FilePathParams,
  ): string {
    return `${
      EulogiseClientConfig.AWS_S3_URL_WITHOUT_CDN
    }/${CardProductHelper.getCardProductS3FilePath(params)}`
  }

  public static getCardProductS3FilePath({
    caseId,
    pageMode,
    productName,
    slug,
    bleed,
    fileType = 'pdf',
  }: IGetCardProductS3FilePathParams): string {
    return `cases/${caseId}/${slug ?? productName}${
      pageMode === CardProductPageMode.SINGLE_PAGE
        ? '-singlePage'
        : pageMode === CardProductPageMode.COVER_PAGE
        ? '-coverPage'
        : ''
    }${bleed ? '-bleed' : ''}.${fileType}`
  }

  public static getPages({
    product,
    cardProduct,
    productTheme,
    bleed,
  }: {
    product: EulogiseProduct
    cardProduct: ICardProductData
    productTheme: ICardProductTheme
    bleed?: boolean
  }): Array<ICardProductPage> {
    const cardProductContent = cardProduct?.content

    // TODO: move this on theme creation
    const isNoContent = cardProductContent.pages?.every(
      (page: ICardProductPage) => !page.rows || page.rows.length === 0,
    )

    if (isNoContent || isNoContent === undefined) {
      cardProductContent.pages = this.getDefaultThemeContent(productTheme)!
    }

    const cardProductPageSize = cardProductContent?.pageSize
    const cardProductPageOrientation = cardProductContent?.pageOrientation
    const cardProductPageMargin = cardProductContent?.pageMargins

    const pages = (cardProductContent.pages || []).map(
      (page: ICardProductPage) => {
        const genericProductMetadata = (
          cardProductContent as IGenericCardProductContent
        )?.metadata
        const { pageWidth, pageHeight } =
          CardProductHelper.getPageWidthAndHeight({
            genericProductMetadata,
            pageSize: cardProductPageSize,
            pageOrientation: cardProductPageOrientation,
          })

        const contentHeight = (page.rows || []).reduce(
          (total: number, row: ICardProductRow) =>
            total + this.getRowHeight(row),
          0,
        )
        const pm =
          product === EulogiseProduct.GENERIC_CARD_PRODUCT
            ? this.getDefaultPageMargins({
                product,
                genericProductMetadata,
              })
            : (cardProductPageMargin as Array<number>)

        const contentBoundaries = {
          width: CardProductHelper.getMaxPageContentWidth({
            cardProduct,
          }),
          height: pageHeight - pm[1] - (pm[3] || pm[1]),
        }
        const pageStyle = this.getPageStyle({
          product,
          pageWidth,
          pageHeight,
          pageMargins: pm,
          page,
          isBleed: bleed,
          isTwoPagesButActAsOnePage: this.isTwoPagesButActAsOnePage(product),
        })

        const bleedPageBackground = this.getBleedPageBackground({
          page,
          product,
        })

        return {
          ...page,
          pageWidth: pageWidth,
          pageHeight: pageHeight,
          contentHeight,
          contentBoundaries,
          pageStyle,
          bleedPageBackground,
        }
      },
    )

    return pages
  }

  public static getJustifyContentStyleByAlignment(
    alignment: AlignmentType,
  ): string | undefined {
    switch (alignment) {
      case AlignmentType.LEFT:
        return 'flex-start'
      case AlignmentType.CENTER:
        return 'center'
      case AlignmentType.RIGHT:
        return 'flex-end'
    }
    return
  }

  public static getNeedUpdatedCardProductsAfterEditing = (
    editedImage: IImageAsset,
    allActiveCardProducts: IAllActiveCardProducts,
  ): Array<EulogiseProduct> => {
    let needUpdatedCardProducts: Array<EulogiseProduct> = []

    let product: keyof IAllActiveCardProducts
    for (product in allActiveCardProducts) {
      const activeCardProduct: ICardProductData =
        allActiveCardProducts?.[product]!

      if (allActiveCardProducts[product]) {
        const activeCardProductContent = activeCardProduct?.content
        const { pages }: { pages: Array<ICardProductPage> } =
          activeCardProductContent
        const editedImageContent = editedImage?.content

        pages.forEach((page: ICardProductPage) => {
          page.rows.forEach((row: ICardProductRow) => {
            if (
              row.type === CardProductContentItemType.IMAGE &&
              !needUpdatedCardProducts.includes(product) &&
              row?.data?.filestackHandle === editedImageContent?.filestackHandle
            ) {
              needUpdatedCardProducts.push(product)
            } else if (
              row.type === CardProductContentItemType.COLUMNS &&
              !needUpdatedCardProducts.includes(product)
            ) {
              row.data?.items?.forEach((item: ICardProductImageRow) => {
                if (
                  item?.data?.filestackHandle ===
                  editedImageContent?.filestackHandle
                ) {
                  needUpdatedCardProducts.push(product)
                }
              })
            }
          })
        })
      }
    }
    return needUpdatedCardProducts
  }

  public static insertRowInPage = ({
    originalPageRows,
    insertRowIndex,
    insertNewRow,
  }: {
    originalPageRows: Array<ICardProductRow>
    insertRowIndex: number
    insertNewRow: ICardProductRow
  }): Array<ICardProductRow> => {
    const deepCopiedOriginalRows: Array<ICardProductRow> = JSON.parse(
      JSON.stringify(originalPageRows),
    )
    deepCopiedOriginalRows.splice(insertRowIndex, 0, insertNewRow)
    return deepCopiedOriginalRows
  }

  public static updateCardProductPageBackground({
    page,
    updatedPageImageData,
    cardProduct,
    pageIndex,
  }: {
    page: ICardProductPage
    updatedPageImageData: ICardProductBackground
    cardProduct: ICardProductData
    pageIndex: number
  }): Array<any> {
    const updatedPage = { ...page, background: updatedPageImageData }

    return [
      ...cardProduct.content.pages.slice(0, pageIndex),
      updatedPage,
      ...cardProduct.content.pages.slice(pageIndex + 1),
    ].filter(Boolean)
  }

  public static getHasPagesOverlayEnabled = (
    pages: Array<ICardProductPage>,
    leftPageIndex: number | undefined,
    rightPageIndex: number | undefined,
  ) => {
    return {
      isLeftPageOverlayed: this.getHasPageOverlayEnabledByIndex({
        pages,
        pageIndex: leftPageIndex,
      }),
      isRightPageOverlayed: this.getHasPageOverlayEnabledByIndex({
        pages,
        pageIndex: rightPageIndex,
      }),
    }
  }

  public static hasPageOverlay(page: ICardProductPage) {
    const background = page.background
    return background?.overlayEnabled === undefined
      ? !!background?.overlayColor &&
          !!background?.overlayMargin &&
          !!background?.overlayOpacity
      : background?.overlayEnabled
  }

  public static getHasPageOverlayEnabledByIndex = ({
    pages,
    pageIndex,
  }: {
    pages: Array<ICardProductPage>
    pageIndex?: number
  }) => {
    if (
      pageIndex !== undefined &&
      pages?.[pageIndex]?.background?.overlayEnabled !== undefined
    ) {
      return pages[pageIndex].background?.overlayEnabled
    }
    if (!pages || pageIndex === undefined) {
      return false
    }
    const background = pages?.[pageIndex]?.background
    return (
      !!background?.overlayColor &&
      !!background?.overlayMargin &&
      !!background?.overlayOpacity
    )
  }

  public static isCardProductBackgroundChangable = (
    productData: ICardProductData,
  ): boolean => {
    if (!productData) {
      return false
    }
    const isCompleted = productData?.status === MemorialVisualStatus.COMPLETE
    const isGenerated = productData?.fileStatus === ResourceFileStatus.GENERATED
    if (isCompleted || isGenerated) {
      return false
    }
    return true
  }

  public static isReadyForDownload(fileStatus: ResourceFileStatus) {
    return fileStatus === ResourceFileStatus.GENERATED
  }

  public static isCardProductThemeChangable = (
    productData: ICardProductData,
  ): boolean => {
    // never started, allow it to change
    if (!productData) {
      return true
    }
    const isCompleted = productData?.status === MemorialVisualStatus.COMPLETE
    const isGenerated = productData?.fileStatus === ResourceFileStatus.GENERATED
    if (isCompleted || isGenerated) {
      return false
    }
    return true
  }

  public static getCardProductsBackgroundChangableMap = (
    allActiveCardProductsData: IAllActiveCardProducts,
  ): Record<EulogiseCardProducts, boolean> => {
    let results: Record<EulogiseCardProducts, boolean> = {
      [EulogiseProduct.BOOKLET]: false,
      [EulogiseProduct.BOOKMARK]: false,
      [EulogiseProduct.SIDED_CARD]: false,
      [EulogiseProduct.THANK_YOU_CARD]: false,
      [EulogiseProduct.TV_WELCOME_SCREEN]: false,
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: false,
      [EulogiseProduct.PHOTOBOOK]: false,
    }

    if (!allActiveCardProductsData) {
      return results
    }

    for (const [product, productData] of Object?.entries(
      allActiveCardProductsData,
    )) {
      const isProductBGChangable =
        this.isCardProductBackgroundChangable(productData)
      results[product as EulogiseCardProducts] = isProductBGChangable
    }

    return results
  }

  public static get = (
    allActiveCardProductsData: IAllActiveCardProducts,
  ): Record<EulogiseCardProducts, boolean> => {
    let results: Record<EulogiseCardProducts, boolean> = {
      [EulogiseProduct.BOOKLET]: false,
      [EulogiseProduct.BOOKMARK]: false,
      [EulogiseProduct.SIDED_CARD]: false,
      [EulogiseProduct.THANK_YOU_CARD]: false,
      [EulogiseProduct.TV_WELCOME_SCREEN]: false,
      [EulogiseProduct.SLIDESHOW_TITLE_SLIDE]: false,
      [EulogiseProduct.PHOTOBOOK]: false,
    }

    if (!allActiveCardProductsData) {
      return results
    }

    for (const [product, productData] of Object?.entries(
      allActiveCardProductsData,
    )) {
      const isProductBGChangable =
        this.isCardProductBackgroundChangable(productData)
      results[product as EulogiseCardProducts] = isProductBGChangable
    }

    return results
  }

  public static getIsAtCardProductEditor = ({
    location,
  }: {
    location: Location
  }): boolean => {
    const path: string = location?.pathname!
    const [, firstPart, secondPart] = path.split('/')
    const simplifiedPath: string = `/${firstPart}/${secondPart}`

    const product: EulogiseProduct = {
      '/admin/slideshows': EulogiseProduct.SLIDESHOW,
      '/admin/booklets': EulogiseProduct.BOOKLET,
      '/admin/bookmarks': EulogiseProduct.BOOKMARK,
      '/admin/sidedCards': EulogiseProduct.SIDED_CARD,
      '/admin/photobooks': EulogiseProduct.PHOTOBOOK,
      '/admin/thankYouCards': EulogiseProduct.THANK_YOU_CARD,
      '/admin/tvWelcomeScreens': EulogiseProduct.TV_WELCOME_SCREEN,
      '/admin/slideshowTitleSlides': EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      '/admin/genericCardProducts': EulogiseProduct.GENERIC_CARD_PRODUCT,
    }[simplifiedPath]!

    return [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.THANK_YOU_CARD,
      EulogiseProduct.TV_WELCOME_SCREEN,
      EulogiseProduct.PHOTOBOOK,
      EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
      EulogiseProduct.GENERIC_CARD_PRODUCT,
    ].includes(product)
  }

  public static convertProductTypeToGenericIfNotFound(
    productOrSlug: EulogiseProduct | string,
  ): EulogiseProduct {
    return CardProductHelper.isCardProduct(
      productOrSlug as unknown as EulogiseProduct,
    )
      ? (productOrSlug as EulogiseProduct)
      : EulogiseProduct.GENERIC_CARD_PRODUCT
  }

  public static getGenericCardProductSlugByLocation({
    location,
    product,
  }: {
    location: Location
    product: EulogiseProduct
  }): string | undefined {
    if (!product) {
      return
    }
    if (product !== EulogiseProduct.GENERIC_CARD_PRODUCT) {
      return
    }
    return UrlHelper.getParams(EulogisePage.EDIT_GENERIC_CARD_PRODUCTS, {
      pathname: location.pathname,
    }).slugAndId?.split('.')?.[0] as string
  }

  public static getAtWhichProductEditorPage = ({
    location,
  }: {
    location: Location
  }): EulogiseProduct => {
    const path: string = location?.pathname!
    const [, firstPart, secondPart] = path.split('/')
    const simplifiedPath: string = `/${firstPart}/${secondPart}`

    const product: EulogiseProduct = {
      '/admin/slideshows': EulogiseProduct.SLIDESHOW,
      '/admin/booklets': EulogiseProduct.BOOKLET,
      '/admin/bookmarks': EulogiseProduct.BOOKMARK,
      '/admin/sidedCards': EulogiseProduct.SIDED_CARD,
      '/admin/photobooks': EulogiseProduct.PHOTOBOOK,
      '/admin/thankYouCards': EulogiseProduct.THANK_YOU_CARD,
      '/admin/tvWelcomeScreens': EulogiseProduct.TV_WELCOME_SCREEN,
      '/admin/genericCardProducts': EulogiseProduct.GENERIC_CARD_PRODUCT,
      '/admin/image-library': EulogiseProduct.SLIDESHOW,
      '/admin/slideshowTitleSlides': EulogiseProduct.SLIDESHOW_TITLE_SLIDE,
    }[simplifiedPath]!

    return product
  }

  public static getBookletEditorMagnifierValueByDoubleClick(
    bookletMagnifierSliderValue: number,
  ) {
    if (
      bookletMagnifierSliderValue < 0 ||
      bookletMagnifierSliderValue > 100 ||
      isNaN(bookletMagnifierSliderValue)
    ) {
      return 0
    }
    if (bookletMagnifierSliderValue >= 0 && bookletMagnifierSliderValue < 25) {
      return 25
    }
    if (bookletMagnifierSliderValue >= 25 && bookletMagnifierSliderValue < 50) {
      return 50
    }
    if (
      bookletMagnifierSliderValue >= 50 &&
      bookletMagnifierSliderValue <= 100
    ) {
      return 100
    }
    return 0
  }

  /**
   * Updates a row in a CardProduct by rowId, replacing it with the provided updated row.
   * Returns a new ICardProductData object with the update applied (does not mutate original).
   */
  public static updateRowById({
    cardProduct,
    rowId,
    updatedRow,
  }: {
    cardProduct: ICardProductData
    rowId: string
    updatedRow: ICardProductRow
  }): ICardProductData {
    const updatedPages = cardProduct.content.pages.map((page) => {
      const rowIndex = page.rows.findIndex((row) => row.id === rowId)
      if (rowIndex === -1) return page
      // Replace the row at rowIndex with updatedRow
      const newRows = [
        ...page.rows.slice(0, rowIndex),
        updatedRow,
        ...page.rows.slice(rowIndex + 1),
      ]
      return { ...page, rows: newRows }
    })
    return {
      ...cardProduct,
      content: {
        ...cardProduct.content,
        pages: updatedPages,
      },
    }
  }

  /**
   * Calculates estimated text dimensions based on font size and text content
   * @param params - Object containing text measurement parameters
   * @param params.text - The text to measure
   * @param params.fontSize - Font size in pixels
   * @param params.fontFamily - Font family (optional, defaults to system font)
   * @param params.fontWeight - Font weight (optional, defaults to normal)
   * @param params.maxWidth - Maximum width constraint (optional)
   * @returns Object containing estimated width, height, and number of lines
   */
  public static getTextDimensions(params: {
    text: string
    fontSize: number
    fontFamily?: string
    fontWeight?: string | number
    maxWidth?: number
  }): { width: number; height: number; lines: number } {
    const {
      text,
      fontSize,
      fontFamily = 'system-ui, -apple-system, sans-serif',
      fontWeight = 'normal',
      maxWidth,
    } = params

    // Average character width ratios for common fonts
    // These are approximate ratios of character width to font size
    const fontRatios: Record<string, number> = {
      serif: 0.5,
      'sans-serif': 0.55,
      monospace: 0.6,
      Arial: 0.52,
      Helvetica: 0.52,
      'Times New Roman': 0.48,
      Georgia: 0.54,
      Verdana: 0.58,
      'system-ui': 0.55,
      '-apple-system': 0.55,
      default: 0.55,
    }

    // Get font ratio based on font family
    const getFontRatio = (): number => {
      const lowerFont = fontFamily.toLowerCase()
      for (const [key, ratio] of Object.entries(fontRatios)) {
        if (lowerFont.includes(key)) {
          return ratio
        }
      }
      return fontRatios.default
    }

    // Adjust ratio for font weight
    const getWeightMultiplier = (): number => {
      const weight =
        typeof fontWeight === 'number'
          ? fontWeight.toString()
          : fontWeight.toLowerCase()

      if (weight === 'bold' || Number(weight) >= 700) return 1.1
      if (weight === 'light' || Number(weight) <= 300) return 0.95
      return 1.0
    }

    const baseRatio = getFontRatio()
    const weightMultiplier = getWeightMultiplier()
    const charWidth = fontSize * baseRatio * weightMultiplier

    // Calculate line height (typically 1.2 to 1.5 times font size)
    const lineHeight = fontSize * 1.2

    // Split text into lines if maxWidth is provided
    let lines: string[]
    let estimatedWidth: number

    if (maxWidth && maxWidth > 0) {
      // Split text by newlines first
      lines = []
      const paragraphs = text.split('\n')

      for (const paragraph of paragraphs) {
        if (!paragraph) {
          lines.push('')
          continue
        }

        const words = paragraph.split(' ')
        let currentLine = ''

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          const testWidth = testLine.length * charWidth

          if (testWidth > maxWidth && currentLine) {
            lines.push(currentLine)
            currentLine = word
          } else {
            currentLine = testLine
          }
        }

        if (currentLine) {
          lines.push(currentLine)
        }
      }

      // Calculate the maximum line width
      estimatedWidth = Math.min(
        maxWidth,
        Math.max(...lines.map((line) => line.length * charWidth)),
      )
    } else {
      // No max width constraint
      lines = text.split('\n')
      estimatedWidth = Math.max(...lines.map((line) => line.length * charWidth))
    }

    const numberOfLines = lines.length || 1
    const estimatedHeight = numberOfLines * lineHeight

    return {
      width: Math.ceil(estimatedWidth),
      height: Math.ceil(estimatedHeight),
      lines: numberOfLines,
    }
  }

  /**
   * Helper function to get text dimensions using Canvas API (browser only)
   * More accurate but only works in browser environment
   * @param params - Object containing text measurement parameters
   * @param params.text - The text to measure
   * @param params.fontSize - Font size in pixels
   * @param params.fontFamily - Font family (optional)
   * @param params.fontWeight - Font weight (optional)
   * @param params.maxWidth - Maximum width constraint (optional)
   * @returns Object containing exact width, height, and number of lines, or null if Canvas API is not available
   */
  public static getTextDimensionsUsingCanvas(params: {
    text: string
    fontSize: number
    fontFamily?: string
    fontWeight?: string | number
    maxWidth?: number
  }): { width: number; height: number; lines: number } | null {
    // Check if we're in a browser environment
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      // Fallback to estimation method in non-browser environments
      return this.getTextDimensions(params)
    }

    const {
      text,
      fontSize,
      fontFamily = 'system-ui, -apple-system, sans-serif',
      fontWeight = 'normal',
      maxWidth,
    } = params

    try {
      // Create a canvas element for measurement
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        return this.getTextDimensions(params)
      }

      // Set font properties
      context.font = `${fontWeight} ${fontSize}px ${fontFamily}`

      let lines: string[] = []
      let measuredWidth = 0

      if (maxWidth && maxWidth > 0) {
        // Split text with word wrapping
        const paragraphs = text.split('\n')

        for (const paragraph of paragraphs) {
          if (!paragraph) {
            lines.push('')
            continue
          }

          const words = paragraph.split(' ')
          let currentLine = ''

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word
            const metrics = context.measureText(testLine)

            if (metrics.width > maxWidth && currentLine) {
              lines.push(currentLine)
              const lineMetrics = context.measureText(currentLine)
              measuredWidth = Math.max(measuredWidth, lineMetrics.width)
              currentLine = word
            } else {
              currentLine = testLine
            }
          }

          if (currentLine) {
            lines.push(currentLine)
            const lineMetrics = context.measureText(currentLine)
            measuredWidth = Math.max(measuredWidth, lineMetrics.width)
          }
        }

        measuredWidth = Math.min(maxWidth, measuredWidth)
      } else {
        // No max width constraint
        lines = text.split('\n')
        for (const line of lines) {
          const metrics = context.measureText(line)
          measuredWidth = Math.max(measuredWidth, metrics.width)
        }
      }

      // Calculate line height
      const lineHeight = fontSize * 1.4
      const numberOfLines = lines.length || 1
      const measuredHeight = numberOfLines * lineHeight // 8 is margin

      return {
        width: Math.ceil(measuredWidth),
        height: Math.ceil(measuredHeight),
        lines: numberOfLines,
      }
    } catch (error) {
      // Fallback to estimation if Canvas API fails
      console.warn('Canvas API failed, falling back to estimation', error)
      return this.getTextDimensions(params)
    }
  }
}
