import { navigate } from 'gatsby-link'
import {
  EulogisePage,
  EulogiseProduct,
  INavigateToProductQueryString,
} from '@eulogise/core'
import { UtilHelper } from './UtilHelper'
import { UrlHelper } from './UrlHelper'

export const NavigationHelper = {
  hasProductBeenChanged: false,
  hasAddedUnsavedListener: false,

  isClientDashboardPage: (urlOrPath: string) => {
    return new RegExp(/\/admin\/client/).test(urlOrPath)
  },

  isProductPage: (url: string, pages?: Array<EulogisePage>) => {
    const productPages = pages ?? [
      EulogisePage.EDIT_BOOKLET,
      EulogisePage.EDIT_BOOKMARK,
      EulogisePage.EDIT_SLIDESHOW,
      EulogisePage.EDIT_THANK_YOU_CARD,
      EulogisePage.EDIT_SIDED_CARD,
      EulogisePage.EDIT_TV_WELCOME_SCREEN,
      EulogisePage.EDIT_PHOTOBOOK,
    ]
    return productPages.some((page) => {
      return new RegExp(page.replace(/:[a-zA-Z]+/, '')).test(url)
    })
  },

  isPhotobookPage: (url: string) => {
    return NavigationHelper.isProductPage(url, [EulogisePage.EDIT_PHOTOBOOK])
  },

  isShowHelpGuide: (path: string) => {
    // Check if it's the dashboard page
    if (path.includes(EulogisePage.DASHBOARD.replace(/\/$/, ''))) {
      return true
    }

    // Check if it's any product editing page
    const productPages = [
      EulogisePage.EDIT_SLIDESHOW,
      EulogisePage.EDIT_BOOKLET,
      /*
      EulogisePage.EDIT_BOOKMARK,
      EulogisePage.EDIT_SIDED_CARD,
      EulogisePage.EDIT_THANK_YOU_CARD,
      EulogisePage.EDIT_PHOTOBOOK,
      EulogisePage.EDIT_TV_WELCOME_SCREEN,
*/
    ]

    // Remove parameter placeholders (e.g., :slideshowId) and check if path matches
    return productPages.some((productPage) => {
      const pagePattern = productPage.replace(/:[a-zA-Z]+/g, '')
      return path.includes(pagePattern)
    })
  },

  navigateToBackground: ({
    product,
    backgroundImageId,
    fromProduct,
    fromProductId,
  }: {
    product: EulogiseProduct
    backgroundImageId: string
    fromProduct: EulogiseProduct
    fromProductId: string
  }) => {
    if (product === EulogiseProduct.BOOKLET) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_BOOKLET_BACKGROUND_IMAGE,
        {
          backgroundImageId,
        },
        {
          fromProduct,
          fromProductId,
        },
      )
    }
  },

  navigateToProduct: ({
    product,
    id,
    query,
    slug,
    ignoreUnsavedConfirmation,
  }: {
    product: EulogiseProduct
    id: string
    slug?: string
    query?: INavigateToProductQueryString
    ignoreUnsavedConfirmation?: boolean
  }) => {
    if (product === EulogiseProduct.SLIDESHOW) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_SLIDESHOW,
        {
          slideshowId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.BOOKLET) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_BOOKLET,
        {
          bookletId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.BOOKMARK) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_BOOKMARK,
        {
          bookmarkId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.SIDED_CARD) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_SIDED_CARD,
        {
          sidedCardId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.THANK_YOU_CARD) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_THANK_YOU_CARD,
        {
          thankYouCardId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_TV_WELCOME_SCREEN,
        {
          tvWelcomeScreenId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.SLIDESHOW_TITLE_SLIDE) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_SLIDESHOW_TITLE_SLIDE,
        {
          slideshowTitleSlideId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.PHOTOBOOK) {
      NavigationHelper.navigate(
        EulogisePage.EDIT_PHOTOBOOK,
        {
          photobookId: id,
        },
        query,
        ignoreUnsavedConfirmation,
      )
    } else if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
      if (!slug) {
        throw new Error(`navigateToProduct: slug is missing`)
      }
      NavigationHelper.navigate(EulogisePage.EDIT_GENERIC_CARD_PRODUCTS, {
        slugAndId: `${slug}.${id}`,
      })
    }
  },

  navigate: (
    page: EulogisePage | string,
    params?: any,
    query?: { [key: string]: string },
    ignoreUnsavedConfirmation: boolean = false,
    showUnsavedChangesModalFn?: () => void,
    showUnsavedPhotoLibraryModalFn?: () => void,
  ) => {
    const proceedToPage = () => {
      if (UtilHelper.hasWindow()) {
        NavigationHelper.hasAddedUnsavedListener = false
        NavigationHelper.hasProductBeenChanged = false
        const url = UrlHelper.toUrl(page, params)
        const queryString = UrlHelper.queryStringify(query!)
        navigate(`${url}${queryString ? `?${queryString}` : ''}`)
      }
    }
    if (NavigationHelper.hasAddedUnsavedListener) {
      if (ignoreUnsavedConfirmation) {
        proceedToPage()
      } else if (showUnsavedChangesModalFn) {
        // show unsaved changes modal when the `addedUnsavedListener` is attached
        showUnsavedChangesModalFn()
      } else if (showUnsavedPhotoLibraryModalFn) {
        showUnsavedPhotoLibraryModalFn()
      } else {
        proceedToPage()
      }
    } else {
      proceedToPage()
    }
  },

  confirmUnsavedChanges: (event: any) => {
    // Cancel the event as stated by the standard.
    event.preventDefault()

    // Chrome requires returnValue to be set.
    return (event.returnValue = 'Are you sure you want to exit?')
  },

  addUnsavedListener: () => {
    console.log('addUnsavedListener')
    NavigationHelper.hasProductBeenChanged = true
    const window = UtilHelper.getWindow()
    if (!NavigationHelper.hasAddedUnsavedListener) {
      if (window) {
        window.addEventListener(
          'beforeunload',
          NavigationHelper.confirmUnsavedChanges,
        )
      } else {
        console.log('window is undefined! - addUnsavedListener')
      }
    }
    NavigationHelper.hasAddedUnsavedListener = true
  },

  removeUnsavedListener: () => {
    console.log('removeUnsavedListener')
    const window = UtilHelper.getWindow()
    NavigationHelper.hasProductBeenChanged = false
    if (NavigationHelper.hasAddedUnsavedListener) {
      if (window) {
        window.removeEventListener(
          'beforeunload',
          NavigationHelper.confirmUnsavedChanges,
        )
      } else {
        console.log('window is undefined! - removeUnsavedListener')
      }
    }
    NavigationHelper.hasAddedUnsavedListener = false
  },
}
