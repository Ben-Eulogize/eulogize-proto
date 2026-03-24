import React from 'react'
import { WindowLocation } from '@reach/router'
import {
  DrawerId,
  EulogisePage,
  EulogiseUserRole,
  IAssetState,
  IGenericCardProductData,
} from '@eulogise/core'
import { CustomerSiderTopMenu } from './CustomerSiderTopMenu'
import { AdminSiderTopMenu } from './AdminSiderTopMenu'
import { ContributorSiderTopMenu } from './ContributorSiderTopMenu'
import { openDrawerAction } from '../../../../store/DrawerState/actions'
import {
  CardProductHelper,
  NavigationHelper,
  DashboardHelper,
  AssetHelper,
} from '@eulogise/helpers'
import {
  useAssetState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useGenericCardProductTypeBySlug,
  useGenericCardProductTypeByPathname,
} from '../../../../store/hooks'
import {
  showUnsavedChangesConfirmModal,
  showUnsavedPhotoImagesOrderConfirmModal,
} from '../../../../store/ModalState/actions'
import { EulogiseEndpoint } from '@eulogise/client-core'

interface ISiderTopMenuProps {
  location: WindowLocation
  userRole: EulogiseUserRole
  isClientAdminSider?: boolean
}

export const SiderTopMenu: React.FunctionComponent<ISiderTopMenuProps> = ({
  location,
  userRole,
  isClientAdminSider,
}) => {
  const dispatch = useEulogiseDispatch()
  const { activeItem: activeCase } = useCaseState()
  const { genericProductType } = useGenericCardProductTypeByPathname(
    location.pathname,
  )
  const product = CardProductHelper.getAtWhichProductEditorPage({
    location: location!,
  })
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location,
  })
  const { activeItem: activeProductItem } = useProductState({ product, slug })
  const region = activeCase?.region!

  const pathname = location?.pathname

  const isAtPhotoLibrary: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.PHOTO_LIBRARY,
    })

  const { images }: IAssetState = useAssetState()

  const changeTheme = () =>
    dispatch(
      openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
        productType: product,
        genericProductType,
        isNavigateToProductWhenApplyTheme: false,
      }),
    )

  const onViewAllMemorialsClick = () => {
    NavigationHelper.navigate(
      EulogisePage.DASHBOARD,
      null,
      undefined,
      false,
      () => {
        if (isAtPhotoLibrary) {
          const customisedImagesOrderIds: Array<string> =
            AssetHelper.getCustomisedImagesOrderIdsByImages(images ?? [])
          dispatch(
            showUnsavedPhotoImagesOrderConfirmModal({
              page: EulogisePage.DASHBOARD,
              newCustomisedPhotoImagesOrderIds: customisedImagesOrderIds,
            }),
          )
          return
        }
        dispatch(
          showUnsavedChangesConfirmModal({
            editingProduct: product,
            unsavedProductState: activeProductItem!,
            page: EulogisePage.DASHBOARD,
            region,
          }),
        )
        return
      },
    )
  }

  return (
    <>
      {userRole === EulogiseUserRole.CONTRIBUTOR && <ContributorSiderTopMenu />}
      {[
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.COEDITOR,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.CLIENT,
      ].includes(userRole) && (
        <CustomerSiderTopMenu
          location={location}
          isClientAdminSider={isClientAdminSider}
          onChangeThemeClick={changeTheme}
          onViewAllMemorialsClick={onViewAllMemorialsClick}
        />
      )}
      {userRole === EulogiseUserRole.ADMIN && (
        <AdminSiderTopMenu
          location={location}
          onChangeThemeClick={changeTheme}
          onViewAllMemorialsClick={onViewAllMemorialsClick}
        />
      )}
    </>
  )
}
