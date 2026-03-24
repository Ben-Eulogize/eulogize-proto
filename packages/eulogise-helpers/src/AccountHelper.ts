import {
  ALL_EULOGIZE_PRODUCTS,
  CaseStatus,
  EulogiseCountry,
  EulogiseProduct,
  EulogiseRegion,
  EulogiseUserRole,
  EulogiseUserType,
  IAuthAccount,
  ICase,
  IEulogiseProductAvailabilityStatus,
  IGenericCardProductTypeData,
  ITheme,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
} from '@eulogise/core'
import { ThemeHelper } from './ThemeHelper'
import { CaseHelper } from './CaseHelper'
import { CardProductHelper } from './CardProductHelper'

export class AccountHelper {
  public static hasProAccess(account: IAuthAccount): boolean {
    if (!account) {
      return false
    }
    const { role, type } = account
    if (role === EulogiseUserRole.CLIENT) {
      return true
    }
    return (
      role === EulogiseUserRole.CUSTOMER && type === EulogiseUserType.SHADOW
    )
  }

  public static hasPaidAccess(
    account: IAuthAccount,
    activeCase: ICase,
  ): boolean {
    if (!account) {
      return false
    }
    const { role } = account
    if (role === EulogiseUserRole.CLIENT) {
      return true
    }
    return activeCase.status === CaseStatus.PAID
  }

  public static getCardProducts({
    genericProductTypes,
  }: {
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<EulogiseProduct | string> {
    return [
      EulogiseProduct.BOOKLET,
      EulogiseProduct.SIDED_CARD,
      EulogiseProduct.THANK_YOU_CARD,
      EulogiseProduct.BOOKMARK,
      EulogiseProduct.PHOTOBOOK,
      ...(genericProductTypes?.map((productType) => productType.slug) ?? []),
    ]
  }

  public static getAllProducts({
    genericProductTypes,
  }: {
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<EulogiseProduct | string> {
    return [
      ...ALL_EULOGIZE_PRODUCTS,
      ...(genericProductTypes?.map((productType) => productType.slug) ?? []),
    ]
  }

  public static getAllAvailableProducts({
    activeCase,
    genericProductTypes,
  }: {
    activeCase: ICase
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<EulogiseProduct | string> {
    const allProducts = this.getAllProducts({
      genericProductTypes,
    })
    return allProducts.filter((p) => {
      if (CardProductHelper.isCardProduct(p as EulogiseProduct)) {
        return CaseHelper.isCaseProductEnabled({ activeCase, productOrSlug: p })
      }
      return true
    })
  }

  public static getAllAvailableProductOptions({
    activeCase,
    genericProductTypes,
  }: {
    activeCase: ICase
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<{
    value: string
    label: string
  }> {
    return this.getAllAvailableProducts({
      activeCase,
      genericProductTypes,
    }).map((productOrSlug) => ({
      value: productOrSlug,
      label: CardProductHelper.getProductShortName({
        product:
          CardProductHelper.convertProductTypeToGenericIfNotFound(
            productOrSlug,
          ),
        region: activeCase.region,
      }),
    }))
  }

  public static convertProductAvailabilityStatusToArray(
    productStatuses: IEulogiseProductAvailabilityStatus,
  ): Array<EulogiseProduct> {
    return Object.keys(productStatuses).filter(
      // @ts-ignore
      (key) => productStatuses[key] === true,
    ) as Array<EulogiseProduct>
  }

  public static convertArrayToProductAvailabilityStatus(
    productStatuses: Array<EulogiseProduct | string>,
  ): IEulogiseProductAvailabilityStatus {
    return productStatuses.reduce(
      (acc: IEulogiseProductAvailabilityStatus, key: string) => ({
        ...acc,
        [key]: true,
      }),
      {} as IEulogiseProductAvailabilityStatus,
    )
  }

  public static getCardProductOptions({
    region,
    genericProductTypes,
    country,
  }: {
    region: EulogiseRegion
    country: EulogiseCountry | undefined
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<{
    value: string
    label: string
  }> {
    return this.getCardProducts({ genericProductTypes })
      .filter((p) => {
        if (p === EulogiseProduct.PHOTOBOOK) {
          return (
            country && PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country)
          )
        }
        return true
      })
      .filter(Boolean)
      .map((productOrSlug: EulogiseProduct | string) => {
        const genericProductType = genericProductTypes?.find(
          (productType) => productType.slug === productOrSlug,
        )
        return {
          value: productOrSlug,
          label: CardProductHelper.getProductShortName({
            product:
              CardProductHelper.convertProductTypeToGenericIfNotFound(
                productOrSlug,
              ),
            genericProductType,
            region,
          }),
        }
      })
  }

  public static getVideoProductOptions({
    region,
  }: {
    region: EulogiseRegion
  }): Array<{
    value: string
    label: string
  }> {
    return [EulogiseProduct.SLIDESHOW, EulogiseProduct.TV_WELCOME_SCREEN].map(
      (product) => {
        return {
          value: product,
          label: CardProductHelper.getProductShortName({ product, region }),
        }
      },
    )
  }

  public static getAllProductOptions({
    region,
    genericProductTypes,
  }: {
    region: EulogiseRegion
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<{
    value: string
    label: string
  }> {
    return this.getAllProducts({
      genericProductTypes,
    }).map((productOrSlug: EulogiseProduct | string) => {
      const genericProductType = genericProductTypes?.find(
        (type) => type.slug === productOrSlug,
      )
      return {
        value: productOrSlug,
        label: CardProductHelper.getProductName({
          product:
            CardProductHelper.convertProductTypeToGenericIfNotFound(
              productOrSlug,
            ),
          genericProductType,
          region,
        }),
      }
    })
  }

  public static getAllAvailableProductsByTheme({
    theme,
    activeCase,
  }: {
    theme: ITheme
    activeCase: ICase
  }): Array<EulogiseProduct> {
    return ThemeHelper.getAvailableProductsFromTheme({
      activeCase,
      theme,
    })
  }

  public static getAvailableCardProducts({
    activeCase,
    genericProductTypes,
  }: {
    activeCase: ICase
    genericProductTypes?: Array<IGenericCardProductTypeData>
  }): Array<EulogiseProduct | string> {
    return AccountHelper.getAllAvailableProducts({
      activeCase,
      genericProductTypes,
    }).filter(
      (product: EulogiseProduct) => product !== EulogiseProduct.SLIDESHOW,
    )
  }

  public static getAvailableCardProductsByTheme({
    theme,
    activeCase,
  }: {
    theme: ITheme
    activeCase: ICase
  }): Array<EulogiseProduct> {
    return AccountHelper.getAllAvailableProductsByTheme({
      theme,
      activeCase,
    }).filter(
      (product: EulogiseProduct) => product !== EulogiseProduct.SLIDESHOW,
    )
  }
}
