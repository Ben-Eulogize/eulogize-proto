import {
  EulogiseProduct,
  IAllProductStates,
  ICardProductState,
  IEulogiseState,
  ISlideshowState,
  ResourceFileStatus,
} from '@eulogise/core'

export class StateHelper {
  public static getProductStateByProduct({
    state,
    product,
    slug,
  }: {
    state: IEulogiseState
    product: EulogiseProduct
    slug?: string
  }): ICardProductState | ISlideshowState {
    switch (product) {
      case EulogiseProduct.BOOKLET:
        return state.booklets
      case EulogiseProduct.BOOKMARK:
        return state.bookmarks
      case EulogiseProduct.SLIDESHOW:
        return state.slideshows
      case EulogiseProduct.SIDED_CARD:
        return state.sidedCards
      case EulogiseProduct.TV_WELCOME_SCREEN:
        return state.tvWelcomeScreens
      case EulogiseProduct.THANK_YOU_CARD:
        return state.thankYouCards
      case EulogiseProduct.PHOTOBOOK:
        return state.photobooks
      case EulogiseProduct.SLIDESHOW_TITLE_SLIDE:
        return state.slideshowTitleSlides
      case EulogiseProduct.GENERIC_CARD_PRODUCT: {
        if (slug) {
          return state.genericCardProducts.productsState[slug]
        }
        throw new Error(`getProductStateByProduct: ${slug} is not supported`)
      }
      default:
        throw new Error(
          `getProductStateByProduct: Invalid Product (${product})`,
        )
    }
  }
  public static getIsAnyProductStillFetching(
    allProductState: IAllProductStates,
  ) {
    let isAnyProductStillFetching = false

    for (const [, state] of Object.entries(allProductState)) {
      if (state?.isFetching) {
        isAnyProductStillFetching = true
        break
      }
    }
    return isAnyProductStillFetching
  }

  public static getIsAnyProductStillGenerating(
    allProductState: IAllProductStates,
  ) {
    let isAnyProductStillGenerating = false

    for (const [, state] of Object.entries(allProductState)) {
      if (state?.activeItem?.fileStatus === ResourceFileStatus.PROCESSING) {
        isAnyProductStillGenerating = true
        break
      }
    }
    return isAnyProductStillGenerating
  }
}
