import Mustache from 'mustache'
import {
  BOOKLET_FONT_SIZES,
  CardProductContentItemType,
  CardProductPageSize,
  CardProductPageType,
  COVER_PAGE_LAYOUTS,
  DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT,
  EulogiseCountry,
  EulogiseImageOrientation,
  EulogisePhotobookCoverType,
  EulogiseProduct,
  EulogiseRegion,
  GenericCardProductTypeFoldType,
  GetImageObject,
  ICardProductBackground,
  ICardProductData,
  ICardProductFrameImageContent,
  ICardProductFrameLayout,
  ICardProductFrameRow,
  ICardProductIconRow,
  ICardProductPage,
  ICardProductPageSize,
  ICardProductRow,
  ICardProductSpaceRow,
  ICardProductTextRow,
  ICardProductTheme,
  ICase,
  IPhotobookCoverTypeOption,
  IPhotobookPageLayout,
  IPhotobookSizeOption,
  MAX_CARD_PRODUCT_IMAGES_PER_FRAME,
  PAGE_SIZES,
  PHOTOBOOK_DEFAULT_THEME,
  PHOTOBOOK_TITLE_PAGE_LAYOUTS,
  PhotobookBookStyle,
  PhotobookCoverLayoutOptions,
  PhotobookCoverTypeOptions,
  PhotobookFeatures,
  ValidPhotobookCheckoutSize,
} from '@eulogise/core'
import { CardProductFrameHelper } from './CardProductFrameHelper'
import { CardProductHelper } from './CardProductHelper'
import { UtilHelper } from './UtilHelper'
import { DateTimeHelper } from './DateTimeHelper'
import { CaseHelper } from './CaseHelper'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { ImageHelper } from './ImageHelper'
import { StringHelper } from './StringHelper'
import { IPhotobookCoverLayoutOption } from '@eulogise/core/src'
import {
  PHOTOBOOK_PRICING,
  NOT_APPLICABLE_PHOTO_BOOK_BASE_PRICE_OBJECT,
  IPPhotoBookPricing,
} from '@eulogise/client-core'
import {
  PHOTOBOOK_SIZES_BY_REGION,
  PHOTOBOOK_SIZE_OPTIONS,
} from './cardProduct.constants'

type PhotobookTitlePageLayoutVariables = {
  deceasedName?: string
  dateOfBirth?: string
  dateOfDeath?: string
  dateOfBirthYear?: string
  dateOfDeathYear?: string
}

type CreatePhotobookPageCoverPageParams = {
  pageType: CardProductPageType.PHOTOBOOK_COVER_PAGE
  coverType: EulogisePhotobookCoverType
  imageAssets: Array<ICardProductFrameImageContent>
  coverLayoutId: string
  pageSize?: CardProductPageSize
}

type CreatePhotobookPageTitlePageParams = {
  pageType: CardProductPageType.PHOTOBOOK_TITLE_PAGE
  pageSize: CardProductPageSize
  imageAssets: Array<ICardProductFrameImageContent>
  activeCase: ICase
  primaryImageOrientation?: EulogiseImageOrientation
}

type CreatePhotobookPageNormalPageParams = {
  pageType: CardProductPageType.NORMAL
  imageAssets: Array<ICardProductFrameImageContent>
  layout: ICardProductFrameLayout
  pageSize: CardProductPageSize
}

type FrameOrder = {
  layout: ICardProductFrameLayout
  imageAssets: Array<ICardProductFrameImageContent>
}

export class PhotobookHelper {
  public static getPhotobookSizeByRegion({
    region,
  }: {
    region: EulogiseRegion
  }) {
    return region === EulogiseRegion.USA
      ? PHOTOBOOK_SIZES_BY_REGION[EulogiseRegion.USA]
      : PHOTOBOOK_SIZES_BY_REGION[EulogiseRegion.AU]
  }

  public static getPhotobookSizeOptions({
    region,
    bookStyle,
  }: {
    region: EulogiseRegion
    bookStyle: PhotobookBookStyle
  }): Array<IPhotobookSizeOption> {
    return PHOTOBOOK_SIZE_OPTIONS.filter((sizeOption) =>
      sizeOption.availableBookStyles?.includes(bookStyle),
    ).map((sizeOption) => ({
      ...sizeOption,
      label: `${sizeOption.label} \xa0 | \xa0 ${
        this.getPhotobookSizeByRegion({ region })[sizeOption.value]
      }`,
    }))
  }

  public static isPremiumPhotobook(pageSize: CardProductPageSize): boolean {
    return (
      pageSize === CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE ||
      pageSize === CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM
    )
  }

  public static isClassicPhotobook(pageSize: CardProductPageSize): boolean {
    return (
      pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE ||
      pageSize === CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM
    )
  }

  public static getPhotobookPreviewThumbnailUrl(path: string) {
    return `${EulogiseClientConfig.AWS_S3_URL}/assets/photobook/preview-thumbnails/${path}`
  }

  public static getNoOfRemovePages({
    pageSize,
    foldType,
  }: {
    pageSize: CardProductPageSize
    foldType?: GenericCardProductTypeFoldType
  }): number {
    if (foldType) {
      switch (foldType) {
        case GenericCardProductTypeFoldType.SINGLE_SIDE:
          return 1
        case GenericCardProductTypeFoldType.BIFOLD:
          return 4
        case GenericCardProductTypeFoldType.TRIFOLD:
          return 6
      }
    }
    return this.isClassicPhotobook(pageSize) ? 2 : 4
  }

  public static getCoverPageLayoutId(cardProduct: ICardProductData) {
    return cardProduct.content.pages[0].layoutId
  }

  public static getBookStyleByPageSize(
    pageSize: CardProductPageSize,
  ): PhotobookBookStyle {
    switch (pageSize) {
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM:
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE:
        return PhotobookBookStyle.CLASSIC_PHOTOBOOK
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM:
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE:
        return PhotobookBookStyle.PREMIUM_PHOTOBOOK
      default:
        return PhotobookBookStyle.CLASSIC_PHOTOBOOK
    }
  }

  public static getPhotobookFeatureThumbnailUrl(key: string) {
    return `${EulogiseClientConfig.AWS_S3_URL}/assets/photobook/features/${key}.avif`
  }

  public static getClassicPhotobookFeatures(): PhotobookFeatures {
    return [
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'classic/durable-pur-binding',
        ),
        title: 'Durable PUR binding',
        description:
          'Classic Photo Books use strong, flexible PUR binding for a clean spine and pages that turn smoothly and hold their shape over time. It is a proven, long-lasting binding suited to everyday browsing.',
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'classic/classic-linen-covers',
        ),
        title: 'Classic linen covers',
        description: `Choose from a palette of timeless linen fabrics designed for beauty and durability in our Classic range. The lightly textured, woven fabric covers give an understated elegant feel.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'classic/4-color-printing',
        ),
        title: '4 color printing',
        description: `Printed in CMYK, the industry-standard 4-color process renders lifelike color and clarity across every page. Precise layers of tiny dots build depth and detail for vibrant, natural results.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'classic/archival-planet-conscious-paper',
        ),
        title: 'Archival, planet-conscious paper',
        description: `Classic white coated paper with a Satin finish. Printed on the highest quality, earth-friendly, FSC® certified, acid-free papers that feel luxurious and keep colors vibrant for generations.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'classic/easy-build-templates',
        ),
        title: `Easy build templates`,
        description: `Start with your photo library or import straight from your memorial video timeline. Our smart editor drops your images into a polished template in seconds, ready to purchase or use as a simple starting point for edits.`,
      },
      /*
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl('classic/presentation-box'),
        title: 'Presentation box (optional)',
        description: `Protect and elevate your book with a hand-bound in your choice of classic linens and lined with textured Italian paper. Finished with a debossed text label and a satin lift-out ribbon; add your own words for a simple, personal finishing touch.`,
      },
*/
    ]
  }

  public static getPremiumPhotobookFeatures(): PhotobookFeatures {
    return [
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/section-sewn-binding',
        ),
        title: 'Section sewn binding',
        description:
          'Section-sewn binding is an age-old bookmaking technique that requires extra care and time, which is made evident in the stunning results. In this binding method, sections of folded pages (signatures) are bound together with thread. Each signature is stitched together forming a book block that is then glued along the binding edge to give extra strength and durability.',
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/premium-cover-fabrics',
        ),
        title: 'Premium cover fabrics',
        description: `A choice of linen or vegan leather. Our archival quality European linens are textured, woven natural fabric with a modern-classic appeal. Our vegan leathers are a buttery-soft leather alternative with a dappled finish that gives a luxurious look and feel that will elevate your photo book.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/6-color-printing',
        ),
        title: '6 color printing',
        description: `Standard four-color can miss the gentle shifts in light and skin tone; our six-ink process brings deeper warmth, smoother gradients, and truer-to-life detail on every page. Printed with archival-quality inks, your photos keep their richness for years, so future generations can turn the pages and feel the moment, just as you remember it.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/archival-quality-papers',
        ),
        title: 'Archival quality papers',
        description: `Classic white coated paper with a Satin finish. Printed on the highest quality, earth-friendly, FSC® certified, acid-free papers that feel luxurious and keep colors vibrant for generations.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/easy-build-templates',
        ),
        title: `Easy build templates`,
        description: `Start with your photo library or import straight from your memorial video timeline. Our smart editor drops your images into a polished template in seconds, ready to purchase or use as a simple starting point for edits.`,
      },
      /*
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium/presentation-box',
        ),
        title: 'Presentation box (optional)',
        description: `Protect and elevate your book with a hand-bound clamshell box in linen, buckram, or vegan leather to match your cover, lined with textured Italian paper and finished with a satin lift-out ribbon. Personalize the lid with text or an image, then reuse it as a beautiful memory box for treasured keepsakes.`,
      },
*/
    ]
  }

  public static getPhotoAlbumFeatures(): PhotobookFeatures {
    return [
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'section-sewn-binding',
        ),
        title: 'Section sewn binding (Album)',
        description:
          'Section-sewn binding is an age-old bookmaking technique that requires extra care and time, which is made evident in the stunning results. In this binding method, sections of folded pages (signatures) are bound together with thread. Each signature is stitched together forming a book block that is then glued along the binding edge to give extra strength and durability.',
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'premium-cover-fabrics',
        ),
        title: 'Premium cover fabrics (Album)',
        description: `A choice of linen or vegan leather. Our archival quality European linens are textured, woven natural fabric with a modern-classic appeal. Our vegan leathers are a buttery-soft leather alternative with a dappled finish that gives a luxurious look and feel that will elevate your photo book.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl('6-color-printing'),
        title: '6 color printing',
        description: `Standard four-color can miss the gentle shifts in light and skin tone; our six-ink process brings deeper warmth, smoother gradients, and truer-to-life detail on every page. Printed with archival-quality inks, your photos keep their richness for years, so future generations can turn the pages and feel the moment, just as you remember it.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'archival-quality-paper',
        ),
        title: 'Archival quality papers',
        description: `Classic white coated paper with a Satin finish. Printed on the highest quality, earth-friendly, FSC® certified, acid-free papers that feel luxurious and keep colors vibrant for generations.`,
      },
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'easy-building-template-premium',
        ),
        title: `Easy build templates`,
        description: `Start with your photo library or import straight from your memorial video timeline. Our smart editor drops your images into a polished template in seconds, ready to purchase or use as a simple starting point for edits.`,
      },
      /*
      {
        thumbnailUrl: this.getPhotobookFeatureThumbnailUrl(
          'presentation-box-premium',
        ),
        title: 'Presentation box (optional)',
        description: `Protect and elevate your book with a hand-bound clamshell box in linen, buckram, or vegan leather to match your cover, lined with textured Italian paper and finished with a satin lift-out ribbon. Personalize the lid with text or an image, then reuse it as a beautiful memory box for treasured keepsakes.`,
      },
*/
    ]
  }

  public static getPhotobookPageComponentHeightScale({
    pageSize,
  }: {
    pageSize: CardProductPageSize
  }): number {
    const basePageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM
    const [_baseWidth, baseHeight] = PAGE_SIZES[basePageSize]
    const [_newWidth, newHeight] = PAGE_SIZES[pageSize]
    return newHeight / baseHeight
  }

  public static getPhotobookPageComponentWidthScale({
    pageSize,
  }: {
    pageSize: CardProductPageSize
  }): number {
    const basePageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM
    const [baseWidth, _baseHeight] = PAGE_SIZES[basePageSize]
    const [newWidth, _newHeight] = PAGE_SIZES[pageSize]
    return newWidth / baseWidth
  }

  private static getAvailableContentHeight({
    pageSize,
  }: {
    pageSize: CardProductPageSize
  }) {
    // Get page dimensions based on pageSize
    const pageDimensions = PAGE_SIZES[pageSize]
    if (!pageDimensions) {
      throw new Error(`Unsupported page size: ${pageSize}`)
    }

    const [, pageHeight] = pageDimensions
    const [, pageMarginY] =
      pageSize === CardProductPageSize.PHOTOBOOK_THUMBNAIL
        ? [5, 5]
        : CardProductHelper.getDefaultUSPageMargins({
            product: EulogiseProduct.PHOTOBOOK,
          })

    // Calculate available content height
    return pageHeight - pageMarginY * 2
  }

  public static getPhotobookCoverLayoutLabel(
    coverLayoutId: string,
  ): string | undefined {
    return PhotobookCoverLayoutOptions.find((l) => l.value === coverLayoutId)
      ?.label
  }

  public static getPhotobookCoverLayoutOptions(
    pageSize: CardProductPageSize,
  ): Array<IPhotobookCoverLayoutOption> {
    return PhotobookCoverLayoutOptions.filter((option) =>
      option.supportedPageSizes.includes(pageSize),
    )
  }

  private static getTotalContentHeight(
    rows: Array<ICardProductRow> = [],
  ): number {
    let totalContentHeight = 0

    rows.forEach((row) => {
      if (
        row.data &&
        'height' in row.data &&
        typeof row.data.height === 'number'
      ) {
        totalContentHeight += row.data.height
      }
    })
    return totalContentHeight
  }

  public static getClosestAvailableFontSize(
    fontSize?: number,
  ): number | undefined {
    // get closest font size from BOOKLET_FONT_SIZES
    if (!fontSize) {
      return undefined
    }

    // Find the closest font size
    let closestSize = BOOKLET_FONT_SIZES[0]
    let minDifference = Math.abs(fontSize - closestSize)

    for (const availableSize of BOOKLET_FONT_SIZES) {
      const difference = Math.abs(fontSize - availableSize)
      if (difference < minDifference) {
        minDifference = difference
        closestSize = availableSize
      }
    }

    return closestSize
  }

  public static scaleTitlePageRowToPageSize({
    row,
    pageSize,
  }: {
    row: ICardProductRow
    pageSize: CardProductPageSize
  }) {
    const componentHeightScale = this.getPhotobookPageComponentHeightScale({
      pageSize: pageSize!,
    })
    const componentWidthScale = this.getPhotobookPageComponentWidthScale({
      pageSize: pageSize!,
    })
    if (row.type === CardProductContentItemType.FRAME) {
      const frameRow = row as ICardProductFrameRow
      const currentHeight = frameRow.data.height
      const currentWidth = frameRow.data.width
      const newHeight = currentHeight
        ? Math.round(currentHeight * componentHeightScale)
        : undefined
      const newWidth = currentWidth
        ? // should use height scale to keep aspect ratio
          Math.round(currentWidth * componentHeightScale)
        : undefined
      return {
        ...frameRow,
        data: {
          ...frameRow.data,
          height: newHeight,
          width: newWidth,
          content: frameRow.data.content
            ? {
                ...frameRow.data.content,
                height: newHeight,
                width: newWidth,
              }
            : frameRow.data.content,
        },
      } as ICardProductFrameRow
    } else if (row.type === CardProductContentItemType.TEXT) {
      const textRow = row as ICardProductTextRow
      const currentHeight = textRow.data.height
      const newHeight = currentHeight
        ? Math.round(currentHeight * componentHeightScale)
        : undefined
      const fontSize = textRow.data.rowStyle?.fontSize ?? 10
      const newWidth = textRow.data.width
        ? Math.round(textRow.data.width * componentWidthScale)
        : undefined
      return {
        ...textRow,
        data: {
          ...textRow.data,
          rowStyle: {
            ...textRow.data.rowStyle,
            fontSize: fontSize
              ? this.getClosestAvailableFontSize(
                  fontSize * componentHeightScale,
                )
              : undefined,
          },
          width: newWidth,
          height: newHeight,
        },
      } as ICardProductTextRow
    } else if (row.type === CardProductContentItemType.ICON) {
      // resize icon row
      const iconRow = row as ICardProductIconRow
      const currentHeight = iconRow.data.height
      const currentWidth = iconRow.data.width
      const newWidth = currentWidth
        ? // should use height scale to keep aspect ratio
          Math.round(currentWidth * componentHeightScale)
        : undefined
      const newHeight = currentHeight
        ? Math.round(currentHeight * componentHeightScale)
        : undefined
      return {
        ...iconRow,
        data: {
          ...iconRow.data,
          width: newWidth,
          height: newHeight,
        },
        height: newHeight,
      } as ICardProductIconRow
    }
    return row
  }

  public static scaleTitlePageRowsToPageSize({
    rows,
    pageSize,
  }: {
    rows: Array<ICardProductRow>
    pageSize: CardProductPageSize
  }) {
    return rows.map((row) =>
      this.scaleTitlePageRowToPageSize({ row, pageSize }),
    )
  }

  public static resizeTitlePageLayoutToFit({
    page,
    pageSize,
  }: {
    page: ICardProductPage
    pageSize: CardProductPageSize
  }): ICardProductPage {
    const availableContentHeight = this.getAvailableContentHeight({ pageSize })

    // If total content height is less than or equal to available height, no need to resize
    // Create a deep copy of the page to maintain immutability
    const newPage: ICardProductPage = UtilHelper.clone(page)
    // scale all rows and content height and width except space rows
    const pageRowsAfterScale = this.scaleTitlePageRowsToPageSize({
      rows: newPage.rows,
      pageSize,
    })

    // Calculate total content height of all rows
    const totalContentHeight = this.getTotalContentHeight(pageRowsAfterScale)

    // Calculate how much we need to reduce
    let heightReduction = totalContentHeight - availableContentHeight
    let currentTotalHeight = totalContentHeight

    // Find the first space element
    const firstSpaceRowIndex = pageRowsAfterScale.findIndex(
      (row) => row.type === CardProductContentItemType.SPACE,
    )
    // if the first row is not a space row, we don't need to resize
    if (
      firstSpaceRowIndex !== 0 ||
      availableContentHeight > currentTotalHeight
    ) {
      return page
    }

    // if the current total height is less than or equal to available height, reduce the height of the first space row
    const spaceRow = pageRowsAfterScale[firstSpaceRowIndex]
    const currentSpaceHeight =
      spaceRow.data &&
      'height' in spaceRow.data &&
      typeof spaceRow.data.height === 'number'
        ? spaceRow.data.height
        : 0

    // Reduce space height, but keep minimum 10px
    const newSpaceHeight = Math.max(10, currentSpaceHeight - heightReduction)
    const actualReduction = currentSpaceHeight - newSpaceHeight

    // Update space row height in the new object
    if (spaceRow.data && 'height' in spaceRow.data) {
      spaceRow.data.height = newSpaceHeight
    }

    // Recalculate total height after space adjustment
    currentTotalHeight -= actualReduction

    // If content now fits, we're done
    if (currentTotalHeight <= availableContentHeight) {
      return newPage
    }

    // If still doesn't fit, resize the first frame element
    const remainingReduction = currentTotalHeight - availableContentHeight
    const firstFrameRowIndex = pageRowsAfterScale.findIndex(
      (row) => row.type === CardProductContentItemType.FRAME,
    )

    // if there is no frame row, we cannot resize
    if (firstFrameRowIndex === -1) {
      return newPage
    }
    const frameRow = pageRowsAfterScale[
      firstFrameRowIndex
    ] as ICardProductFrameRow
    const currentFrameHeight = frameRow.data?.height || 0
    const currentFrameWidth =
      frameRow.data?.width || frameRow.data?.content?.width || 0

    // Reduce frame height, but keep minimum 100px
    const newFrameHeight = Math.max(
      100,
      currentFrameHeight - remainingReduction,
    )

    // Calculate the scale factor to maintain aspect ratio
    const scaleFactor =
      currentFrameHeight > 0 ? newFrameHeight / currentFrameHeight : 1
    const newFrameWidth = Math.round(currentFrameWidth * scaleFactor)

    // Create a new frame row with updated heights and width
    pageRowsAfterScale[firstFrameRowIndex] = {
      ...frameRow,
      data: {
        ...frameRow.data,
        height: newFrameHeight,
        width: newFrameWidth,
        // Also update the content height and width inside the frame
        content: frameRow.data.content
          ? {
              ...frameRow.data.content,
              height: newFrameHeight,
              width: newFrameWidth,
            }
          : frameRow.data.content,
      },
    }
    return { ...newPage, rows: pageRowsAfterScale }
  }

  public static centerTitlePageLayout({
    page,
    pageSize,
  }: {
    page: ICardProductPage
    pageSize: CardProductPageSize
  }): ICardProductPage {
    // If total content height is less than or equal to available height, no need to resize
    // Create a deep copy of the page to maintain immutability
    const newPage: ICardProductPage = UtilHelper.clone(page)

    const availableContentHeight = this.getAvailableContentHeight({ pageSize })
    const totalContentHeight = this.getTotalContentHeight(page.rows)

    // Find first and last space row indices
    const firstSpaceRowIndex = newPage.rows.findIndex(
      (row) => row.type === CardProductContentItemType.SPACE,
    )
    const lastSpaceRowIndex = newPage.rows
      .slice()
      .reverse()
      .findIndex((row) => row.type === CardProductContentItemType.SPACE)
    const actualLastSpaceRowIndex =
      lastSpaceRowIndex !== -1
        ? newPage.rows.length - 1 - lastSpaceRowIndex
        : -1

    // If no space rows found, return the page as is
    if (firstSpaceRowIndex === -1) {
      console.warn(
        'No space row found in the page. Cannot center the content vertically.',
      )
      return newPage
    }

    const firstSpaceRow = newPage.rows[
      firstSpaceRowIndex
    ] as ICardProductSpaceRow
    const lastSpaceRow =
      actualLastSpaceRowIndex !== -1
        ? (newPage.rows[actualLastSpaceRowIndex] as ICardProductSpaceRow)
        : null

    // Calculate content height excluding space rows
    let contentHeightWithoutSpaces = totalContentHeight
    if (firstSpaceRow?.data?.height) {
      contentHeightWithoutSpaces -= firstSpaceRow.data.height
    }
    if (lastSpaceRow?.data?.height) {
      contentHeightWithoutSpaces -= lastSpaceRow.data.height
    }

    // Calculate the total padding needed
    const totalPadding = availableContentHeight - contentHeightWithoutSpaces

    if (totalPadding <= 0) {
      // Content is too tall, no padding needed
      return newPage
    }

    // Distribute padding between top and bottom
    const topPadding = Math.max(10, Math.floor(totalPadding / 2))
    const bottomPadding = Math.max(10, totalPadding - topPadding)

    // Update first space row height
    if (firstSpaceRow.data && 'height' in firstSpaceRow.data) {
      firstSpaceRow.data.height = topPadding
    }

    // Update last space row height if it exists and is different from first
    if (
      lastSpaceRow &&
      lastSpaceRow !== firstSpaceRow &&
      lastSpaceRow.data &&
      'height' in lastSpaceRow.data
    ) {
      lastSpaceRow.data.height = bottomPadding
    }

    return newPage
  }

  public static fitAndCenterTitlePageLayout({
    page,
    pageSize,
  }: {
    page: ICardProductPage
    pageSize: CardProductPageSize
  }): ICardProductPage {
    return this.centerTitlePageLayout({
      page: this.resizeTitlePageLayoutToFit({ page, pageSize }),
      pageSize,
    })
  }

  public static isPhotobookCoverPage({
    product,
    pageIndex,
    noOfPageCursors,
  }: {
    product: EulogiseProduct
    pageIndex: number
    noOfPageCursors?: number // not mandatory because it is not needed for CardProductFrameDrawer for back page
  }): boolean {
    if (product !== EulogiseProduct.PHOTOBOOK) {
      return false
    }
    // for Photobook preview that has back page
    if (noOfPageCursors !== undefined) {
      // cover page is always the first page and last page
      return pageIndex === 0 || pageIndex === noOfPageCursors - 1 // -1 because noOfPageCursors is 1-based index
    }
    // cover page is always the first page and last page
    return pageIndex === 0
  }

  public static getCoverPageFabricBackgroundPath({
    coverType,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }) {
    return `assets/photobook/${this.getPhotobookCoverPageFolderBySize(
      pageSize,
    )}/front/${coverType}.jpg`
  }

  public static getCoverBackPageFabricBackgroundPath({
    coverType,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }): string {
    return `assets/photobook/${this.getPhotobookCoverPageFolderBySize(
      pageSize,
    )}/back/${coverType}.jpg`
  }

  public static getCoverPageFabricBackgroundUrl({
    coverType,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }): string {
    return `${
      EulogiseClientConfig.AWS_S3_URL
    }/${this.getCoverPageFabricBackgroundPath({ coverType, pageSize })}`
  }

  public static getCoverBackPageFabricBackgroundUrl({
    coverType,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }): string {
    return `${
      EulogiseClientConfig.AWS_S3_URL
    }/${this.getCoverBackPageFabricBackgroundPath({ coverType, pageSize })}`
  }

  public static getCoverPageFabricUrl({
    coverType,
  }: {
    coverType: EulogisePhotobookCoverType
  }) {
    return `${EulogiseClientConfig.AWS_S3_URL}/assets/photobook/fabric/${coverType}.png`
  }

  public static getPhotobookCoverPageFolderBySize(
    pageSize: CardProductPageSize,
  ) {
    switch (pageSize) {
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM:
        return 'milk-classic-medium'
      case CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE:
        return 'milk-classic-large'
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM:
        return 'milk-premium-medium'
      case CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE:
        return 'milk-premium-large'
      default:
        throw new Error(`Unsupported photobook size: ${pageSize}`)
    }
  }

  public static getPhotobookTitlePageLayoutVariables({
    activeCase,
    dateFormat,
  }: {
    activeCase?: ICase
    dateFormat?: string
  }): PhotobookTitlePageLayoutVariables {
    const deceased = activeCase?.deceased
    const dateOfBirthDisplay = deceased?.dateOfBirthDisplay ?? '1930-05-25'
    const dateOfDeathDisplay = deceased?.dateOfDeathDisplay ?? '2025-05-07'
    return {
      deceasedName: deceased?.fullName ?? 'Lisa Colby',
      dateOfBirth: DateTimeHelper.formatDate(dateOfBirthDisplay, dateFormat),
      dateOfDeath: DateTimeHelper.formatDate(dateOfDeathDisplay, dateFormat),
      dateOfBirthYear: DateTimeHelper.getYearFromDate(dateOfBirthDisplay),
      dateOfDeathYear: DateTimeHelper.getYearFromDate(dateOfDeathDisplay),
    }
  }

  public static isPhotobookTitlePage({
    product,
    pageIndex,
  }: {
    product: EulogiseProduct
    pageIndex?: number
  }) {
    return product === EulogiseProduct.PHOTOBOOK && pageIndex === 0
  }

  public static isPhotobookTitlePageLayout({
    page,
  }: {
    page: ICardProductPage
  }): boolean {
    return !!page.isTitlePageLayout
  }

  public static getPhotobookPageOptions(): Array<{
    label: string
    value: number
  }> {
    const start = 24
    const end = 120
    const step = 8
    const pages = []
    for (let i = start; i <= end; i += step) {
      pages.push({
        label: `${i} (Recommended for ${
          this.getPhotoRangeFromPages({ noOfPages: i }).range
        } Photos)`,
        value: i,
      })
    }
    return pages
  }

  public static hasCaptionRow(frameRow: ICardProductFrameRow): boolean {
    return !!frameRow.childRowIds
  }

  public static getCaptionRowHeight(frameRow: ICardProductFrameRow) {
    return this.hasCaptionRow(frameRow) ? DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT : 0
  }

  public static calculateCaptionRowHeight({
    frameRowHeight,
    pageSize,
  }: {
    frameRowHeight?: number
    pageSize: CardProductPageSize
  }): number {
    if (!frameRowHeight) {
      return DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT
    }
    const { height: pageContentHeight } = this.getPhotobookContentSize({
      pageSize,
    })
    const bottomRemainingHeight = Math.floor(
      (pageContentHeight - frameRowHeight) / 2,
    ) // divide by two because we only need the bottom space
    return Math.max(bottomRemainingHeight, DEFAULT_PHOTOBOOK_TEXT_ROW_HEIGHT)
  }

  public static getUpdatedPhotobookRows({
    rows,
    pageSize,
  }: {
    rows: Array<ICardProductRow>
    pageSize: CardProductPageSize
  }): Array<ICardProductRow> {
    const updateRowHeight = <T extends ICardProductRow>({
      row,
      height,
    }: {
      row: T
      height: number
    }) => {
      return {
        ...row,
        data: {
          ...row.data,
          height,
        },
        height,
      }
    }
    const frameRow = rows.find(
      (row) => row.type === CardProductContentItemType.FRAME,
    ) as ICardProductFrameRow

    const frameRowHeight = frameRow?.data?.height
    if (!frameRow || !frameRowHeight) {
      return rows
    }

    const { height: pageContentHeight } = this.getPhotobookContentSize({
      pageSize,
    })

    // update Caption row height
    const captionRowHeight = this.calculateCaptionRowHeight({
      frameRowHeight,
      pageSize,
    })

    const spaceRowHeight = (pageContentHeight - frameRowHeight) / 2
    const spaceRow = rows.find(
      (row) => row.type === CardProductContentItemType.SPACE,
    )

    // update space row height
    if (spaceRow) {
      return rows.map((row) => {
        if (row.type === CardProductContentItemType.SPACE) {
          return updateRowHeight({ row, height: spaceRowHeight })
        }
        if (row.type === CardProductContentItemType.TEXT) {
          return updateRowHeight({ row, height: captionRowHeight })
        }
        return row
      })
    }
    // create a new space row
    else {
      return [
        CardProductHelper.createSpaceRowData({
          row: updateRowHeight({
            row: {} as ICardProductSpaceRow,
            height: spaceRowHeight,
          }),
        }),
        ...rows.map((row) => {
          if (row.type === CardProductContentItemType.TEXT) {
            return updateRowHeight({ row, height: captionRowHeight })
          }
          return row
        }),
      ]
    }
  }

  public static getPhotobookContentSize = ({
    pageSize,
  }: {
    pageSize: CardProductPageSize
  }): ICardProductPageSize => {
    const [pageWidth, pageHeight] = PAGE_SIZES[pageSize]
    const [pageMarginX, pageMarginY] =
      CardProductHelper.getDefaultUSPageMargins({
        product: EulogiseProduct.PHOTOBOOK,
      })

    const width = pageWidth - pageMarginX * 2
    const height = pageHeight - pageMarginY * 2

    return { width, height }
  }

  public static createPhotobookSingleFrameRow = ({
    frameContent,
    pageSize,
  }: {
    frameContent: ICardProductFrameLayout
    pageSize: CardProductPageSize
  }): ICardProductFrameRow => {
    const { width: pageContentWidth, height: pageContentHeight } =
      this.getPhotobookContentSize({ pageSize })
    const { newContentWidth, newContentHeight } =
      CardProductFrameHelper.calculateNewContentSizeOnAddingFrame({
        product: EulogiseProduct.PHOTOBOOK,
        newLayout: frameContent,
        // @ts-ignore
        oldLayout: {
          width: pageContentWidth,
          height: pageContentHeight,
        },
        pageContentWidth,
        pageSize,
      })
    return {
      id: UtilHelper.generateID(8),
      type: CardProductContentItemType.FRAME,
      data: {
        content: {
          ...frameContent,
          height: newContentHeight,
          width: newContentWidth,
        },
        height: newContentHeight,
      },
    }
  }

  public static getPhotobookTitlePageLayouts({
    variables,
    isCreation,
    frameOrientations,
  }: {
    variables: PhotobookTitlePageLayoutVariables
    isCreation: boolean
    frameOrientations?: Array<EulogiseImageOrientation>
  }): Array<IPhotobookPageLayout> {
    const templateString = JSON.stringify(
      PHOTOBOOK_TITLE_PAGE_LAYOUTS.filter((tl) => {
        // only return creation layouts if isCreation is true
        if (isCreation) {
          if (frameOrientations) {
            // filter layouts based on frame orientations (with square always included)
            return (
              // filter layouts based on landscape and portrait orientations
              tl.metadata.frameOrientations?.some((fo) =>
                frameOrientations.includes(fo as EulogiseImageOrientation),
              ) ||
              // always allow square layouts
              (tl.metadata.frameOrientations?.includes(
                EulogiseImageOrientation.SQUARE,
              ) &&
                tl.metadata.useOnPhotobookCreation)
            )
          }
          return tl.metadata.useOnPhotobookCreation
        }
        return true
      }),
    )
    const templateReplacedString = Mustache.render(templateString, {
      ...variables,
      deceasedName: variables.deceasedName?.replace(/"/g, '\\"'),
    })
    return StringHelper.safeJsonParse(templateReplacedString)
  }

  public static getPhotobookCoverPageLayouts({
    variables,
    pageSize,
  }: {
    variables: PhotobookTitlePageLayoutVariables
    pageSize?: CardProductPageSize
  }): Array<IPhotobookPageLayout> {
    if (!pageSize) {
      console.log('No page size provided, returning empty cover page layouts')
      return []
    }
    const templateString = JSON.stringify(
      COVER_PAGE_LAYOUTS.filter(
        (layout) => layout.metadata.pageSize === pageSize,
      ),
    )
    const templateReplacedString = Mustache.render(templateString, {
      ...variables,
      deceasedName: variables.deceasedName?.replace(/"/g, '\\"'),
    })

    return JSON.parse(templateReplacedString)
  }

  public static getRandomPhotobookTitlePageLayout({
    variables,
    isCreation,
    frameOrientations,
  }: {
    variables: PhotobookTitlePageLayoutVariables
    isCreation: boolean
    frameOrientations?: Array<EulogiseImageOrientation>
  }): IPhotobookPageLayout {
    const pageLayouts = this.getPhotobookTitlePageLayouts({
      variables,
      isCreation,
      frameOrientations,
    })
    const randomIndex = Math.floor(Math.random() * pageLayouts.length)
    return pageLayouts[randomIndex]
  }

  private static createBackground = (params?: {
    image: GetImageObject
  }): ICardProductBackground => {
    const { image } = params || { image: {} }
    return {
      image,
      overlayMargin: [4, 8],
    }
  }

  public static createCoverPageBackground({
    coverType,
    pageSize,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }) {
    return {
      image: {
        url: this.getCoverPageFabricBackgroundPath({ coverType, pageSize }),
      },
    }
  }

  public static createCoverBackPageBackground({
    coverType,
    pageSize,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
  }) {
    return {
      image: {
        url: this.getCoverBackPageFabricBackgroundPath({ coverType, pageSize }),
      },
    }
  }

  public static getCoverType(
    cardProduct: ICardProductData,
  ): EulogisePhotobookCoverType {
    const coverType = cardProduct.content?.pages?.[0]?.coverType
    if (!coverType) {
      throw new Error('coverType not found')
    }
    return coverType
  }

  public static getCoverPageSize(cardProduct: ICardProductData) {
    return (
      cardProduct.content?.pageSize ??
      CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM
    )
  }

  public static attachBackPages({
    cardProduct,
  }: {
    cardProduct: ICardProductData
  }): Array<ICardProductPage> {
    return [
      ...(cardProduct.content.pages ?? []),
      this.createBlankPhotobookPage(),
      this.createBlankPhotobookPage({
        background: this.createCoverBackPageBackground({
          coverType: this.getCoverType(cardProduct),
          pageSize: this.getCoverPageSize(cardProduct),
        }),
      }),
    ]
  }

  public static getPreviewPhotobookData(
    cardProduct: ICardProductData,
  ): ICardProductData {
    return {
      ...cardProduct,
      content: {
        ...cardProduct.content,
        pages: this.attachBackPages({ cardProduct }),
      },
    }
  }

  public static getPhotoRangeFromPages = ({
    noOfPages,
  }: {
    noOfPages: number
  }): { minPhotos?: number; maxPhotos: number; range: string } => {
    const basePhotos = 60
    const basePages = 24
    const increment = 20
    const pagesPerIncrement = 8
    const maxPages = 120
    const maxNoOfPhotos = 281

    const increments = (noOfPages - basePages) / pagesPerIncrement

    let minPhotos: number | undefined
    let maxPhotos: number
    if (increments === 0) {
      minPhotos = 0
      maxPhotos = basePhotos
    } else if (noOfPages >= maxPages) {
      maxPhotos = maxNoOfPhotos
    } else {
      minPhotos = basePhotos + (increments - 1) * increment + 1
      maxPhotos = minPhotos + increment - 1
    }

    const range =
      minPhotos === undefined ? `${maxPhotos}+` : `${minPhotos}-${maxPhotos}`

    return { minPhotos, maxPhotos, range }
  }

  public static getRecommendedPhotobookPages = ({
    noOfPhotos,
  }: {
    noOfPhotos: number
  }): { recommendedPages: number; range: string } => {
    const basePhotos = 60
    const basePages = 24
    const increment = 20
    const pagesPerIncrement = 8
    const maxPages = 120

    if (noOfPhotos <= basePhotos) {
      return { recommendedPages: basePages, range: '0-60' }
    }

    const extraPhotos = Math.max(0, noOfPhotos - basePhotos - 1)
    const increments = Math.floor(extraPhotos / increment) + 1
    const pages = Math.min(basePages + increments * pagesPerIncrement, maxPages)

    const rangeStart = basePhotos + (increments - 1) * increment + 1
    const rangeEnd = rangeStart + increment - 1
    const range = pages === maxPages ? '281+' : `${rangeStart}-${rangeEnd}`

    return { recommendedPages: pages, range }
  }

  public static getPhotobookCoverTypeOptions = ({
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    pageSize?: CardProductPageSize
  }): Array<IPhotobookCoverTypeOption> => {
    return PhotobookCoverTypeOptions.filter((option) => {
      if (pageSize) {
        return (option.supportedPageSizes ?? []).includes(pageSize)
      }
      return true
    })
  }

  public static getPhotobookCoverTypeOptionByValue = ({
    coverType,
  }: {
    coverType: EulogisePhotobookCoverType
  }): IPhotobookCoverTypeOption => {
    return PhotobookCoverTypeOptions.find(
      (option) => option.value === coverType,
    )!
  }

  public static createPhotobookPage = (
    params:
      | CreatePhotobookPageCoverPageParams
      | CreatePhotobookPageTitlePageParams
      | CreatePhotobookPageNormalPageParams,
  ): ICardProductPage & {
    frameOrientations?: Array<EulogiseImageOrientation>
  } => {
    const { pageType, imageAssets } = params
    if (
      pageType === CardProductPageType.PHOTOBOOK_TITLE_PAGE ||
      pageType === CardProductPageType.PHOTOBOOK_COVER_PAGE
    ) {
      let photobookTitlePageLayout: IPhotobookPageLayout
      const { pageSize } = params as CreatePhotobookPageCoverPageParams
      if (pageType === CardProductPageType.PHOTOBOOK_TITLE_PAGE) {
        const { activeCase, primaryImageOrientation, pageSize } = params
        photobookTitlePageLayout = this.fitAndCenterTitlePageLayout({
          page: this.getRandomPhotobookTitlePageLayout({
            variables: this.getPhotobookTitlePageLayoutVariables({
              activeCase,
            }),
            isCreation: true,
            frameOrientations: primaryImageOrientation
              ? [primaryImageOrientation]
              : [],
          }),
          pageSize,
        }) as IPhotobookPageLayout
      } else if (pageType === CardProductPageType.PHOTOBOOK_COVER_PAGE) {
        const { coverLayoutId } = params as CreatePhotobookPageCoverPageParams
        photobookTitlePageLayout =
          CardProductFrameHelper.getCoverPageLayoutById(coverLayoutId)
      }
      // @ts-ignore
      if (!photobookTitlePageLayout) {
        throw new Error('Photobook title page layout not found')
      }
      const rows = photobookTitlePageLayout?.rows.map((r) => {
        if (r.type === CardProductContentItemType.FRAME) {
          const existingLayout = r.data.content
          const content = CardProductFrameHelper.assignImageAssetsToLayout(
            existingLayout,
            imageAssets,
          )
          const frameRow = {
            ...r,
            data: {
              ...r.data,
              content,
            },
          }
          return CardProductFrameHelper.centeringFrameRowImages({ frameRow })
        }
        return r
      })
      const coverType = (params as CreatePhotobookPageCoverPageParams).coverType
      return {
        background: coverType
          ? this.createCoverPageBackground({ coverType, pageSize })
          : this.createBackground(),
        rows: rows!,
        layoutId: photobookTitlePageLayout?.layoutId,
        isTitlePageLayout: true,
        frameOrientations:
          photobookTitlePageLayout?.metadata?.frameOrientations,
        coverType,
      }
    } else {
      const { layout, pageSize } = params as CreatePhotobookPageNormalPageParams
      const content = CardProductFrameHelper.assignImageAssetsToLayout(
        layout,
        imageAssets,
      )
      const rows = [
        this.createPhotobookSingleFrameRow({
          frameContent: content as ICardProductFrameLayout,
          pageSize,
        }),
      ]
      return {
        background: this.createBackground(),
        // add a space row to the top and bottom of the frame row
        rows: CardProductFrameHelper.centeringRowsImages({
          rows: this.getUpdatedPhotobookRows({ rows, pageSize }),
        }),
      }
    }
  }

  public static createBlankPhotobookPage(params?: {
    background: ICardProductBackground
  }): ICardProductPage {
    const { background } = params || {}
    return {
      background: background ?? this.createBackground(),
      rows: [],
    } as ICardProductPage
  }

  public static getPageTypeByPageIndex = (pageIndex: number) => {
    return pageIndex === 0
      ? CardProductPageType.PHOTOBOOK_COVER_PAGE
      : pageIndex === 2
      ? CardProductPageType.PHOTOBOOK_TITLE_PAGE
      : CardProductPageType.NORMAL
  }

  public static createDefaultPhotobookPage = ({
    imageAssets,
    noOfPhotos,
    pageIndex,
    activeCase,
    primaryImageOrientation,
    pageSize,
  }: {
    imageAssets: Array<ICardProductFrameImageContent>
    noOfPhotos: number
    pageIndex: number
    activeCase?: ICase
    primaryImageOrientation?: EulogiseImageOrientation
    pageSize: CardProductPageSize
  }): ICardProductPage => {
    const layout =
      CardProductFrameHelper.getRandomPhotobookFrameLayoutByNoOfPhotos(
        noOfPhotos,
      )

    return this.createPhotobookPage({
      layout,
      imageAssets,
      pageType: this.getPageTypeByPageIndex(pageIndex),
      activeCase: activeCase!,
      primaryImageOrientation,
      pageSize,
    } as CreatePhotobookPageNormalPageParams)
  }

  public static createPhotobookTitlePage({
    imageAssets,
    activeCase,
    primaryImageOrientation,
    pageSize,
  }: {
    imageAssets: Array<ICardProductFrameImageContent>
    activeCase: ICase
    primaryImageOrientation?: EulogiseImageOrientation
    pageSize: CardProductPageSize
  }) {
    return this.createPhotobookPage({
      imageAssets,
      pageType: CardProductPageType.PHOTOBOOK_TITLE_PAGE,
      activeCase: activeCase!,
      primaryImageOrientation,
      pageSize,
    })
  }

  public static createPhotobookCoverPage({
    activeCase,
    coverType,
    coverLayoutId,
    firstImageAssetContent,
    pageSize,
  }: {
    activeCase: ICase
    coverType: EulogisePhotobookCoverType
    coverLayoutId?: string
    firstImageAssetContent: ICardProductFrameImageContent
    pageSize?: CardProductPageSize
  }): ICardProductPage {
    const primaryImageAssetContent = CaseHelper.getPrimaryImage({ activeCase })
    const displayImageAssetContent =
      primaryImageAssetContent ?? firstImageAssetContent

    const coverPage = this.createPhotobookPage({
      coverLayoutId,
      pageType: CardProductPageType.PHOTOBOOK_COVER_PAGE,
      imageAssets: [],
      coverType,
      pageSize,
    } as CreatePhotobookPageCoverPageParams)
    return {
      ...coverPage,
      rows: coverPage.rows.map((row) => {
        if (row.type === CardProductContentItemType.FRAME) {
          return CardProductFrameHelper.attachImageToFrameRow({
            frameRow: row as ICardProductFrameRow,
            imageAssetContent: displayImageAssetContent,
          })
        }
        return row
      }),
    }
  }

  public static getImagesOrientations(
    imageAssets: Array<ICardProductFrameImageContent>,
  ): Array<EulogiseImageOrientation> {
    return imageAssets.map((imageAsset) => {
      return imageAsset.orientation ?? EulogiseImageOrientation.SQUARE
    })
  }

  // This function should return all the frame layouts that match
  // the partial image orientations order provided
  public static getFrameLayoutsMatchPartialImageOrientations(
    imageOrientations: Array<EulogiseImageOrientation>,
  ): Array<ICardProductFrameLayout> {
    const photobookFrameLayouts =
      CardProductFrameHelper.getPhotobookFrameLayouts(null)
    return photobookFrameLayouts.filter((layout) => {
      const layoutOrientations = layout.metadata?.frameOrientations ?? []
      const minLength = Math.min(
        layoutOrientations.length,
        imageOrientations.length,
      )
      const layoutSlice = layoutOrientations.slice(0, minLength)
      const imageSlice = imageOrientations.slice(0, minLength)
      return layoutSlice.every(
        (layoutOrientation, i) =>
          layoutOrientation === imageSlice[i] ||
          // layoutOrientation === EulogiseImageOrientation.SQUARE ||
          imageSlice[i] === EulogiseImageOrientation.SQUARE,
      )
    })
  }

  public static getPhotobookCoverExtraCostText({
    country,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    country: EulogiseCountry
    pageSize?: CardProductPageSize
  }): string {
    // @ts-ignore
    return ` + $${
      PHOTOBOOK_PRICING[pageSize as ValidPhotobookCheckoutSize]?.[country]
        ?.VEGAN_LEATHER_ADDON
    }`
  }

  public static getPhotobookCoverDisplayText({
    coverType,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    country,
  }: {
    coverType: EulogisePhotobookCoverType
    pageSize?: CardProductPageSize
    country: EulogiseCountry
  }): string {
    const coverOption = PhotobookCoverTypeOptions.find(
      (i) => i.value === coverType,
    )
    // @ts-ignore
    const extraCost =
      PHOTOBOOK_PRICING[pageSize as ValidPhotobookCheckoutSize]?.[country]
        ?.VEGAN_LEATHER_ADDON
    return (
      (coverOption?.label ?? '') +
      (!!coverOption?.extraCost ? ` (+$${extraCost})` : '')
    )
  }

  /**
   * Pick a layout biased toward matching weight
   * @param {Array} frameLayouts - array of layouts with .capacity
   * @param {number} weight - desired weight (1-6)
   * @param {boolean} totallyRandom - if true, will pick a random layout without considering weight
   * @returns {Object} selected layout
   */
  // a function that accepts an array of layouts, each layout can allocate 1-6 images
  // it should try to match the number of images based on the weight
  // if it can't find one, it will try lower weight
  public static randomlySelectingLayout({
    frameLayouts,
    weight = MAX_CARD_PRODUCT_IMAGES_PER_FRAME,
    totallyRandom = false,
  }: {
    frameLayouts: Array<ICardProductFrameLayout>
    weight: number
    totallyRandom?: boolean
  }): ICardProductFrameLayout {
    if (totallyRandom) {
      const rand = Math.floor(Math.random() * frameLayouts.length)
      return frameLayouts[rand]
    }

    if (weight === 0) {
      return frameLayouts[0]
    }

    // Ensure the average is within bounds
    const target = Math.max(
      1,
      Math.min(MAX_CARD_PRODUCT_IMAGES_PER_FRAME, weight),
    )
    const targetWeight = Math.round(target)
    for (const layout of frameLayouts) {
      if (layout.metadata?.frameOrientations?.length === targetWeight) {
        return layout
      }
    }
    return this.randomlySelectingLayout({
      frameLayouts,
      weight: weight - 1,
    })
  }

  public static getBestFrameOrder({
    imageAssets,
    noOfPages,
    tries = 0,
  }: {
    imageAssets: Array<ICardProductFrameImageContent>
    noOfPages: number
    tries?: number
  }): Array<FrameOrder> {
    // Step 1: Get Images' Orientations
    let remainingImageAssets: Array<ICardProductFrameImageContent> =
      UtilHelper.clone(imageAssets)
    let noOfBlankFrameSlots = 0
    const averageImagesPerFrame = imageAssets.length / noOfPages
    const cannotBeCalculated =
      averageImagesPerFrame <= 1 ||
      averageImagesPerFrame > MAX_CARD_PRODUCT_IMAGES_PER_FRAME

    const frameOrder = Array.from({ length: noOfPages }, (_, pageIndex) => {
      const imageOrientations = this.getImagesOrientations(remainingImageAssets)
      // pick the first 6 images orientation orders
      const latestImageOrientations = imageOrientations.slice(
        0,
        MAX_CARD_PRODUCT_IMAGES_PER_FRAME,
      )

      // Step 2: find all the available layouts that match the image orientations order
      const matchedFrameLayouts: Array<ICardProductFrameLayout> =
        PhotobookHelper.getFrameLayoutsMatchPartialImageOrientations(
          latestImageOrientations,
        )

      if (matchedFrameLayouts.length === 0) {
        throw new Error(
          `No frame layouts found for image orientations: ${latestImageOrientations.join(
            ', ',
          )}`,
        )
      }
      const weight = remainingImageAssets.length / (noOfPages - pageIndex)

      // Step 3: randomly pick one of the matched layouts
      // but I want the frames, can allocate more photos, to have higher chance of being selected
      const selectedLayout: ICardProductFrameLayout =
        this.randomlySelectingLayout({
          frameLayouts: matchedFrameLayouts,
          weight,
          totallyRandom: cannotBeCalculated
            ? true
            : pageIndex % 2 === 0 && pageIndex < noOfPages / 2, // every second page is totally random
        })
      const noOfPhotosUsed = selectedLayout.metadata?.frameOrientations?.length

      // Step 4: pick the selected image assets and remove the used images from the image assets
      const selectedImageAssets: Array<ICardProductFrameImageContent> =
        UtilHelper.clone(remainingImageAssets.splice(0, noOfPhotosUsed))

      // update noOfBlankFrameSlots
      if (selectedImageAssets.length === 0) {
        noOfBlankFrameSlots += noOfPhotosUsed!
      }

      return {
        layout: selectedLayout,
        imageAssets: selectedImageAssets,
      }
    })
    const noOfRemainingImages = remainingImageAssets.length
    const allowance = Math.floor(tries / 100) // increase allowance after every 100 retries
    // return frame order only if remaining images are and noOfBlankFrameSlots is 0
    if (noOfRemainingImages <= allowance && noOfBlankFrameSlots <= allowance) {
      return frameOrder
    }

    // if averageImagesPerFrame is less than 1 or bigger than MAX_CARD_PRODUCT_IMAGES_PER_FRAME, it is no points to run again
    if (cannotBeCalculated) {
      return frameOrder
    }
    // run again with the remaining images
    return this.getBestFrameOrder({
      imageAssets,
      noOfPages,
      tries: tries + 1,
    })
  }

  public static allocateFramesToPagesBasedOnImageOrientations({
    imageAssets,
    noOfPages,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    imageAssets: Array<ICardProductFrameImageContent>
    noOfPages: number
    pageSize?: CardProductPageSize
  }): Array<ICardProductPage> {
    // loop through pages and allocate frames based on image orientations
    const selectedFrameOrder: Array<FrameOrder> = this.getBestFrameOrder({
      imageAssets,
      noOfPages,
    })

    // Step 6: Create pages with the selected image assets and layouts
    return selectedFrameOrder.map(({ layout, imageAssets }) => {
      return this.createPhotobookPage({
        layout,
        imageAssets,
        pageType: CardProductPageType.NORMAL,
        pageSize,
      })
    })
  }

  public static createPhotobookPages({
    noOfPages,
    imageAssets = [],
    activeCase,
    primaryImageOrientation,
    coverType,
    coverLayoutId,
    pageSize,
  }: {
    noOfPages: number
    imageAssets?: Array<ICardProductFrameImageContent>
    activeCase?: ICase
    primaryImageOrientation?: EulogiseImageOrientation
    coverType?: EulogisePhotobookCoverType
    coverLayoutId?: string
    pageSize: CardProductPageSize
  }): Array<ICardProductPage> {
    if (activeCase) {
      const firstImageAssetContent = imageAssets?.[0]
      // On photobook creation
      const photobookTitlePage = this.createPhotobookTitlePage({
        activeCase,
        imageAssets,
        primaryImageOrientation,
        pageSize,
      })
      /*
      const hasImageInTitlePageLayout = !!(
        photobookTitlePage.frameOrientations &&
        photobookTitlePage.frameOrientations?.length > 0
      )
*/

      const mainPhotobookPages =
        this.allocateFramesToPagesBasedOnImageOrientations({
          // remove one image from the image assets for the title page
          // if hasImageInTitlePageLayout is true
          imageAssets: imageAssets /*hasImageInTitlePageLayout
            ? imageAssets.slice(1)
            : imageAssets,*/,
          noOfPages: noOfPages - 1, // -1 for the title page
          pageSize,
        })

      return [
        this.createPhotobookCoverPage({
          activeCase,
          coverType: coverType!,
          coverLayoutId,
          firstImageAssetContent,
          pageSize,
        }),
        this.createBlankPhotobookPage(),
        photobookTitlePage,
        ...mainPhotobookPages,
      ]
    } else {
      // for adding pages to an existing photobook
      // create 2 pages in front of the actual photobook pages (1 front page and 1 blank page)
      return this.allocateFramesToPagesRandomly({
        noOfPages,
        noOfAvailableImages: imageAssets.length,
      }).map((noOfPhotos, pageIndex) => {
        return this.createDefaultPhotobookPage({
          noOfPhotos,
          imageAssets: [],
          pageIndex: pageIndex + 3, // +3 for front page, blank page, title page
          pageSize,
        })
      })
    }
  }

  public static async createPhotobookTheme({
    noOfPages = 24,
    imageAssets,
    activeCase,
    onProgress,
    coverType,
    coverLayoutId,
    pageSize,
  }: {
    noOfPages: number
    imageAssets: Array<ICardProductFrameImageContent>
    activeCase: ICase
    onProgress: (progress: number) => void
    coverType: EulogisePhotobookCoverType
    coverLayoutId: string
    pageSize: CardProductPageSize
  }): Promise<ICardProductTheme> {
    const primaryImageAsset = CaseHelper.getPrimaryImage({ activeCase })
    const primaryImageOrientation = primaryImageAsset
      ? await ImageHelper.getImageOrientation(primaryImageAsset)
      : undefined
    const DEFAULT_CONTENT: Array<ICardProductPage> = this.createPhotobookPages({
      noOfPages,
      pageSize,
      imageAssets: [
        ...(primaryImageAsset
          ? [
              {
                ...primaryImageAsset,
                type: 'image',
              } as ICardProductFrameImageContent,
            ]
          : []),
        ...imageAssets,
      ],
      activeCase,
      primaryImageOrientation,
      coverType,
      coverLayoutId,
    })

    const defaultContentLength = DEFAULT_CONTENT.length
    let completed = 0
    const defaultContent = await Promise.all(
      DEFAULT_CONTENT.map(async (content) => {
        const returnObj = await CardProductHelper.preCardProductSaveUpdatePage(
          content,
        )
        completed++
        onProgress((completed / defaultContentLength) * 100) // account for 90% of the current function progress
        return returnObj
      }),
    )
    return {
      ...PHOTOBOOK_DEFAULT_THEME,
      defaultContent,
    }
  }

  // randomly allocate frames, each frame can be 1-5 images, to pages
  // I would like to maximise the number of images across all pages
  // but, it has to be utilised 1-5 images per frame. It does not use all images, but
  // it should be using the all images without any extra spaces
  // For example, if there are 15 images and 5 pages, the result could be [1, 3, 4, 5, 2]
  public static allocateFramesToPagesRandomly = ({
    noOfPages,
    noOfAvailableImages,
  }: {
    noOfPages: number
    noOfAvailableImages: number
  }): Array<number> => {
    // if there are less images than pages, randomly allocate images to pages
    if (noOfAvailableImages <= noOfPages) {
      const result: Array<number> = new Array(noOfPages).fill(0)
      for (let i = 0; i < noOfPages; i++) {
        // first frame always 1 image (use Title page layout)
        if (i === 0) {
          result[i] = 1
        } else {
          result[i] =
            Math.floor(Math.random() * MAX_CARD_PRODUCT_IMAGES_PER_FRAME) + 1
        }
      }
      return result
    }
    const result: Array<number> = new Array(noOfPages).fill(1)
    let remainingImages = noOfAvailableImages - noOfPages
    // allocate remaining images
    while (remainingImages > 0) {
      // check if all the frames have filled with max images (5 images per page)
      if (
        result.every(
          (noOfImages, index) =>
            noOfImages === MAX_CARD_PRODUCT_IMAGES_PER_FRAME || index === 0,
        )
      ) {
        break
      }

      let randomIndex: number = 0
      do {
        randomIndex = Math.floor(Math.random() * noOfPages)
      } while (
        // make sure index 0 is always 1 for Title Page
        randomIndex === 0
      )

      if (result[randomIndex] < MAX_CARD_PRODUCT_IMAGES_PER_FRAME) {
        result[randomIndex]++
        remainingImages--
      }
    }

    return result
  }

  /**
   * Calculate photobook price based on pages, cover type, and page size
   * @param noOfPages Number of pages in the photobook
   * @param coverType Cover type (to check for vegan leather surcharge)
   * @param pageSize Page size (to determine pricing tier)
   * @returns Total price in USD
   */
  static calculatePhotobookPrice = ({
    noOfPages,
    coverType,
    country,
    pageSize = CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
  }: {
    noOfPages: number
    coverType: string
    country: EulogiseCountry
    pageSize?: CardProductPageSize
  }): number => {
    // Get pricing based on page size
    let pricing: IPPhotoBookPricing =
      NOT_APPLICABLE_PHOTO_BOOK_BASE_PRICE_OBJECT

    if (
      this.isPremiumPhotobook(pageSize) ||
      this.isClassicPhotobook(pageSize)
    ) {
      // @ts-ignore
      pricing = PHOTOBOOK_PRICING?.[pageSize]?.[country]
    }

    let totalPrice = pricing.BASE_PRICE

    // Add extra page cost
    if (noOfPages > pricing.BASE_PAGE_COUNT) {
      const extraPages = noOfPages - pricing.BASE_PAGE_COUNT
      const chargeableExtraPages = Math.max(extraPages, pricing.MIN_EXTRA_PAGES)
      totalPrice += chargeableExtraPages * pricing.EXTRA_PAGE_PRICE
    }

    // Add vegan leather cover cost
    const isVeganLeather =
      coverType === EulogisePhotobookCoverType.MERLOT_VEGAN_LEATHER ||
      coverType === EulogisePhotobookCoverType.EMERALD_VEGAN_LEATHER ||
      coverType === EulogisePhotobookCoverType.BLACK_VEGAN_LEATHER

    if (isVeganLeather) {
      totalPrice += pricing.VEGAN_LEATHER_ADDON
    }

    return totalPrice
  }
}
