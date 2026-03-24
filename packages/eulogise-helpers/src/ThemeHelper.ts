import {
  AU_PRODUCTS_THEME_MAP,
  CARD_PRODUCT_DEFAULT_COMMON_DATA,
  CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP,
  CardProductContentItemType,
  CardProductDynamicDataKey,
  CardProductPageSize,
  DEFAULT_DATE_FORMAT,
  EulogiseProduct,
  EulogiseProductThemeMap,
  EulogiseRegion,
  GenericCardProductTypeFoldType,
  ICardProductPage,
  ICardProductRow,
  ICardProductTheme,
  ICase,
  IGenericCardProductMetadata,
  IGenericCardProductTypeData,
  ISlideshowTheme,
  ITheme,
  US_PRODUCTS_THEME_MAP,
} from '@eulogise/core'
import { IThemeModel } from '@eulogise/api/src/ts/database/types/ThemeModel.types'
import { UtilHelper } from './UtilHelper'
import { DateTimeHelper } from './DateTimeHelper'
import { CaseHelper } from './CaseHelper'

// a product-theme refers to the theme of a particular product such as booklet, bookmark, ect.
// whereas a theme has many product-themes, one for each product (slideshow, booklet, bookmark, etc.)
export class ThemeHelper {
  public static getDefaultContentForTheme(
    dynamicDataId: CardProductDynamicDataKey,
    dateFormat: string = DEFAULT_DATE_FORMAT,
  ) {
    const defaultData = CARD_PRODUCT_DEFAULT_COMMON_DATA
    switch (dynamicDataId) {
      case CardProductDynamicDataKey.dateOfBirth:
      case CardProductDynamicDataKey.dateOfDeath:
      case CardProductDynamicDataKey.dateOfService:
        return DateTimeHelper.formatDate(defaultData[dynamicDataId], dateFormat)
      case CardProductDynamicDataKey.location:
      case CardProductDynamicDataKey.deceasedName:
      case CardProductDynamicDataKey.serviceStartTime:
        return defaultData[dynamicDataId]
      case CardProductDynamicDataKey.dobToDod:
        return `${DateTimeHelper.formatDate(
          defaultData.dateOfBirth,
          dateFormat,
        )} - ${DateTimeHelper.formatDate(defaultData.dateOfDeath, dateFormat)}`
      case CardProductDynamicDataKey.serviceDateAtServiceTime:
        return `${DateTimeHelper.formatDate(
          defaultData.dateOfService,
          dateFormat,
        )} at ${defaultData.serviceStartTime}`
      default: {
        console.log(
          'default content for dynamic data key not supported',
          dynamicDataId,
        )
        return
      }
    }
  }

  public static getTemplateValueByDynamicDataId(dynamicDataId: string): string {
    return CARD_PRODUCT_DYNAMIC_DATA_TEMPLATE_FIELD_MAP[dynamicDataId].template
  }

  public static assignTextRowValue({
    row,
    assignText,
  }: {
    assignText: string
    row: ICardProductRow
  }) {
    const assignedRowData = UtilHelper.setObject(
      'data.content.blocks[0].text',
      assignText,
      row,
    )
    const newBlock = assignedRowData.data.content.blocks[0]
    return UtilHelper.setObject(
      'data.content.blocks',
      // make sure the new block is the only block in the row
      [
        {
          ...newBlock,
          inlineStyleRanges: newBlock.inlineStyleRanges.map((range: any) => {
            // change length to 100000 so the text color apply for the whole block
            return {
              ...range,
              length: 100000,
            }
          }),
        },
      ],
      row,
    )
  }

  public static applyDefaultDataToCardProductPages({
    cardProductPages,
    dateFormat,
    product,
  }: {
    cardProductPages: Array<ICardProductPage>
    dateFormat?: string
    product: EulogiseProduct
  }): Array<ICardProductPage> {
    let pages = cardProductPages
    if (product === EulogiseProduct.BOOKMARK) {
      const firstPage = cardProductPages?.[0]
      const lastPage = cardProductPages?.[cardProductPages.length - 1]
      pages = [firstPage, lastPage]
    }
    return pages.map((page) => {
      return {
        ...page,
        rows: page.rows.map((row: ICardProductRow) => {
          const dynamicDataId = row.dynamicDataId
          if (dynamicDataId) {
            const defaultText = this.getDefaultContentForTheme(
              dynamicDataId,
              dateFormat,
            )!
            if (defaultText) {
              switch (row.type) {
                case CardProductContentItemType.TEXT: {
                  return this.assignTextRowValue({
                    row,
                    assignText: defaultText,
                  })
                }
                default: {
                  break
                }
              }
            }
          }
          return row
        }),
      }
    })
  }

  public static convertCardProductDynamicContentToTemplate(
    dynamicContent: Array<ICardProductPage>,
  ): Array<ICardProductPage> {
    return dynamicContent.map((page) => {
      return {
        ...page,
        rows: page.rows.map((row) => {
          const dynamicDataId = row.dynamicDataId
          if (dynamicDataId) {
            const templateValue: string =
              this.getTemplateValueByDynamicDataId(dynamicDataId)
            switch (row.type) {
              case CardProductContentItemType.TEXT: {
                return this.assignTextRowValue({
                  row,
                  assignText: templateValue,
                })
              }
              /*
              case CardProductContentItemType.IMAGE: {
                return UtilHelper.setObject('data', templateValue, row)
              }
              case CardProductContentItemType.FRAME: {
                return UtilHelper.setObject('data', templateValue, row)
              }
*/
              default: {
                break
              }
            }
          }
          return row
        }),
      }
    })
  }

  public static getThumbnailFileName({
    themeId,
    productThemeKey,
    type = 'jpg',
  }: {
    themeId: string
    productThemeKey: string
    type?: 'jpg' | 'pdf'
  }) {
    return `${themeId}_${productThemeKey}_thumbnail_${new Date().getTime()}.${type}`
  }

  public static getS3ThumbnailFilePath({
    themeId,
    productThemeKey,
    type = 'jpg',
  }: {
    themeId: string
    productThemeKey: string
    type?: 'jpg' | 'pdf'
  }): { fileName: string; s3Path: string } {
    const fileName = this.getThumbnailFileName({
      themeId,
      productThemeKey,
      type,
    })
    return { s3Path: `themes/custom/${fileName}`, fileName }
  }

  public static getS3ThumbnailAbsoluteFilePath({
    themeId,
    productThemeKey,
    baseUrl,
  }: {
    themeId: string
    productThemeKey: string
    baseUrl: string
  }): { s3AbsolutePath: string; s3Path: string; fileName: string } {
    const { s3Path, fileName } = ThemeHelper.getS3ThumbnailFilePath({
      themeId,
      productThemeKey,
    })
    return {
      s3AbsolutePath: `${baseUrl}/${s3Path}`,
      s3Path,
      fileName,
    }
  }

  public static mapThemeProductToProduct(
    themeProduct: EulogiseProductThemeMap,
  ): EulogiseProduct {
    const foundThemeProductKey = Object.entries(EulogiseProductThemeMap).find(
      ([, value]) => value === themeProduct,
    )
    if (!foundThemeProductKey) {
      throw new Error('No matched theme product key')
    }
    const [themeProductKey] = foundThemeProductKey

    if (themeProductKey === 'BOOKLET_US') {
      return EulogiseProduct.BOOKLET
    }
    if (themeProductKey === 'SIDED_CARD_US') {
      return EulogiseProduct.SIDED_CARD
    }
    if (themeProductKey === 'SLIDESHOW_TITLE_SLIDE') {
      return EulogiseProduct.TV_WELCOME_SCREEN
    }
    // @ts-ignore
    return EulogiseProduct[
      themeProductKey as keyof EulogiseProduct
    ] as EulogiseProduct
  }

  public static getAvailableProductsFromTheme({
    theme,
    activeCase,
  }: {
    theme: ITheme
    activeCase: ICase
  }): Array<EulogiseProduct> {
    const region = activeCase?.region!
    return (
      Object.keys(theme.products)
        .sort((a, b) => (a > b ? 1 : -1))
        .filter((key) => {
          // only return key if the booklet is au booklet
          if (EulogiseProductThemeMap.BOOKLET === key) {
            return region !== EulogiseRegion.USA
          }
          // only return key if the booklet is us booklet
          if (EulogiseProductThemeMap.BOOKLET_US === key) {
            return region === EulogiseRegion.USA
          }
          // only return key if the sided card is au sided card
          if (EulogiseProductThemeMap.SIDED_CARD === key) {
            return region !== EulogiseRegion.USA
          }
          // only return key if the sided card is us sided card
          if (EulogiseProductThemeMap.SIDED_CARD_US === key) {
            return region === EulogiseRegion.USA
          }
          return true
        })
        .map((themeProduct: EulogiseProductThemeMap) => {
          return this.mapThemeProductToProduct(themeProduct)
        })
        // filter disabled products
        .filter((productOrSlug) =>
          CaseHelper.isCaseProductEnabled({ activeCase, productOrSlug }),
        )
    )
  }

  public static isProductAvailableInTheme({
    theme,
    product,
    region = EulogiseRegion.AU,
  }: {
    theme: ITheme
    product?: EulogiseProduct
    region: EulogiseRegion
  }) {
    let key: string
    const productKeys = Object.keys(theme.products)
    const availableProductKeys =
      region === EulogiseRegion.AU
        ? productKeys.filter((k) =>
            AU_PRODUCTS_THEME_MAP.includes(k as EulogiseProductThemeMap),
          )
        : region === EulogiseRegion.USA
        ? productKeys.filter((k) =>
            US_PRODUCTS_THEME_MAP.includes(k as EulogiseProductThemeMap),
          )
        : []
    if (product === EulogiseProduct.BOOKLET && region === EulogiseRegion.USA) {
      key = EulogiseProductThemeMap.BOOKLET_US
    } else if (
      product === EulogiseProduct.SIDED_CARD &&
      region === EulogiseRegion.USA
    ) {
      key = EulogiseProductThemeMap.SIDED_CARD_US
    } else {
      if (product) {
        // @ts-ignore
        key = EulogiseProductThemeMap[product]
      } else {
        for (const pKey of availableProductKeys) {
          const themeMapKeys: Array<string> = Object.values(
            EulogiseProductThemeMap,
          )
          if (themeMapKeys.includes(pKey)) {
            return true
          }
        }
        return false
      }
    }
    return availableProductKeys.includes(key)
  }

  public static getThemeById({
    themes,
    themeId,
  }: {
    themes: Array<ITheme>
    themeId: string
  }): ITheme {
    return themes.find((t) => t.id === themeId)!
  }

  public static getProductThemeByProductType(params: {
    theme: ITheme
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    genericProductType?: IGenericCardProductTypeData
    region?: EulogiseRegion
  }): ICardProductTheme | ISlideshowTheme | undefined {
    const {
      theme,
      product,
      genericProductType,
      genericProductMetadata,
      region = EulogiseRegion.AU,
    } = params
    const defaultProductThemeType =
      region === EulogiseRegion.USA
        ? EulogiseProductThemeMap.BOOKLET_US
        : EulogiseProductThemeMap.BOOKLET

    const productThemeType =
      this.getEulogiseProductThemeMapValueByProduct({
        product,
        genericProductMetadata,
        genericProductType,
        region,
      }) ?? defaultProductThemeType

    const productTheme = theme.products[productThemeType]
    if (productTheme) {
      const { products, ...metadata } = theme
      return {
        ...productTheme,
        metadata,
      }
    }
    return
  }

  public static getEulogiseProductKeyFromValue(value: string) {
    return Object.keys(EulogiseProductThemeMap).find(
      // @ts-ignore
      (key: string) => {
        // @ts-ignore
        return EulogiseProductThemeMap[key] === value
      },
    )
  }

  public static getEulogiseProductThemeMapValueByProduct({
    product,
    genericProductMetadata,
    genericProductType,
    region,
  }: {
    product: EulogiseProduct
    genericProductMetadata?: IGenericCardProductMetadata
    genericProductType?: IGenericCardProductTypeData
    region: EulogiseRegion
  }): EulogiseProductThemeMap {
    if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      if (!genericProductType && !genericProductMetadata) {
        throw new Error(
          'getEulogiseProductThemeMapValueByProduct: genericProductType/genericProductMetadata does not exist',
        )
      }
      if (
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.SINGLE_SIDE ||
        genericProductType?.foldType ===
          GenericCardProductTypeFoldType.SINGLE_SIDE
      ) {
        return EulogiseProductThemeMap.SIDED_CARD_US
      }
      if (
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.BIFOLD ||
        genericProductMetadata?.foldType ===
          GenericCardProductTypeFoldType.TRIFOLD ||
        genericProductType?.foldType ===
          GenericCardProductTypeFoldType.BIFOLD ||
        genericProductType?.foldType === GenericCardProductTypeFoldType.TRIFOLD
      ) {
        return EulogiseProductThemeMap.BOOKLET_US
      }
    }
    if (region === EulogiseRegion.USA) {
      if (product === EulogiseProduct.BOOKLET) {
        return EulogiseProductThemeMap.BOOKLET_US
      } else if (product === EulogiseProduct.SIDED_CARD) {
        return EulogiseProductThemeMap.SIDED_CARD_US
      }
    }
    // @ts-ignore
    return EulogiseProductThemeMap[product]
  }

  public static getEulogiseProductThemeMapValueByProductAndPageSize({
    product,
    pageSize,
  }: {
    product: EulogiseProduct
    pageSize?: CardProductPageSize
  }): EulogiseProductThemeMap {
    if (
      product === EulogiseProduct.BOOKLET &&
      pageSize === CardProductPageSize.HALF_LETTER_A5
    ) {
      return EulogiseProductThemeMap.BOOKLET_US
    }
    if (
      product === EulogiseProduct.SIDED_CARD &&
      pageSize === CardProductPageSize.HALF_LETTER_A5
    ) {
      return EulogiseProductThemeMap.SIDED_CARD_US
    }
    // @ts-ignore
    return EulogiseProductThemeMap[product]
  }

  public static getProductThemeKey = (theme: ITheme): string => {
    const productThemeKeys = Object.keys(theme.products)
    if (productThemeKeys.length < 1) {
      throw new Error('No product theme key found in theme data')
    }
    return productThemeKeys[0]
  }

  public static attachThumbnailToTheme({
    productThemeKey,
    themeData,
    s3AbsolutePath,
  }: {
    productThemeKey: EulogiseProductThemeMap
    themeData: ITheme
    s3AbsolutePath: string
  }): IThemeModel.Schema {
    return {
      ...themeData,
      products: {
        ...themeData.products,
        [productThemeKey]: {
          ...themeData.products[productThemeKey],
          thumbnail: {
            images: [s3AbsolutePath],
          },
        },
      },
    } as IThemeModel.Schema
  }
}
