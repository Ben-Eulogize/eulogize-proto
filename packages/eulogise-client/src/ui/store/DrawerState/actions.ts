import {
  DrawerId,
  DrawerActionTypes,
  EulogiseProduct,
  DrawerOptions,
  ChangeBackgroundImageDrawerOptions,
} from '@eulogise/core'

export const openDrawerAction = (
  id: DrawerId,
  drawerOptions?: DrawerOptions,
) => ({
  type: DrawerActionTypes.OPEN_DRAWER,
  payload: {
    id,
    drawerOptions,
  },
})

export const openThemeDrawer = (
  productType: EulogiseProduct,
  isNavigateToProductWhenApplyTheme: boolean,
) =>
  openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
    productType,
    isNavigateToProductWhenApplyTheme,
  })

export const openChangeBackgroundImageDrawer = ({
  productType,
  slug,
  productId,
}: {
  productType: EulogiseProduct
  slug?: string
  productId?: string
}) =>
  openDrawerAction(DrawerId.CHANGE_BACKGROUND_IMAGE_DRAWER, {
    productType,
    slug,
    productId,
    isNavigateToProductWhenApplyTheme: false,
  } as ChangeBackgroundImageDrawerOptions)

export const openSlideshowDrawer = (
  isNavigateToProductWhenApplyTheme: boolean = false,
) =>
  openThemeDrawer(EulogiseProduct.SLIDESHOW, isNavigateToProductWhenApplyTheme)

export const openCopyLibraryDrawer = ({
  productType,
}: {
  productType: EulogiseProduct
}) =>
  openDrawerAction(DrawerId.HYMNS_PRAYERS_DRAWER, {
    productType,
  })

export const closeDrawerAction = () => ({
  type: DrawerActionTypes.CLOSE_DRAWER,
})
