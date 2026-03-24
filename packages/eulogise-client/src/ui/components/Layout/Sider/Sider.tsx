import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { EulogiseUserRole, IAuthState, ISiderMenuState } from '@eulogise/core'
import { COLOR, STYLE, SCREEN_SIZE } from '@eulogise/client-core'
import SiderBottomMenu from './SiderBottomMenu'
import { SiderMenuItem } from './SiderMenu/SiderMenuItem'
import {
  useAssetState,
  useAuthState,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useSiderMenuState,
} from '../../../store/hooks'
import { SiderMenu } from './SiderMenu/SiderMenu'
import { AdminDashboardIcon, RightIcon } from '@eulogise/client-components'
import { LeftIcon } from '@eulogise/client-components'
import { EulogisePage } from '@eulogise/core'
import { Tooltip } from '@eulogise/client-components'
import { NavigationHelper } from '@eulogise/helpers'
import {
  showUnsavedChangesConfirmModal,
  showUnsavedPhotoImagesOrderConfirmModal,
} from '../../../store/ModalState/actions'
import { CardProductHelper } from '@eulogise/helpers'
import { useIsDebug } from '../../../hooks/useIsDebug'
import {
  collapseSiderMenu,
  expandSiderMenu,
} from '../../../store/SiderMenuState/action'
import { SiderTopMenu } from './SiderTopMenu/SiderTopMenu'
import { DashboardHelper } from '@eulogise/helpers'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { IAssetState } from '@eulogise/core'
import { AssetHelper } from '@eulogise/helpers'

interface ISiderProps {
  isClientAdminSider?: boolean
  location: WindowLocation
  defaultCollapsed?: boolean
  id?: string
}

export const EXPANDED_SIDER_BASE_WIDTH = 240
export const COLLAPSED_SIDER_BASE_WIDTH = 80

const StyledSider = styled(Layout.Sider)<{ $isDebug: boolean }>`
  background-color: ${COLOR.PANEL_BACKGROUND_COLOR};
  border-right: 1px solid ${COLOR.PASTEL_BLUE};
  svg {
    font-size: ${STYLE.SIDER_SIZE};
  }
  ${({ $isDebug }) =>
    $isDebug
      ? ``
      : `
    display: none;
    ${SCREEN_SIZE.TABLET} {
      display: block;
    }
  `}
`

const SiderCollapsedMenuItem = styled(SiderMenuItem)`
  &&& {
    padding-left: ${STYLE.SIDER_ITEM_PADDING_LEFT};
    &.ant-menu-item-selected {
      background-color: transparent;
    }
  }
`

const ControlSiderMenu = styled(SiderMenu)`
  padding-bottom: 50px;
`

const Sider: React.FC<ISiderProps> = ({
  id,
  location,
  isClientAdminSider,
}): JSX.Element | null => {
  const isDebug = useIsDebug()
  const { account }: IAuthState = useAuthState()
  const { isCollapsed }: ISiderMenuState = useSiderMenuState()
  const { activeItem: activeCase } = useCaseState()
  const region = activeCase?.region!
  const userRole: EulogiseUserRole = account?.role!

  const dispatch = useEulogiseDispatch()
  const path: string = location?.pathname!
  const isClientUser: boolean = userRole === EulogiseUserRole.CLIENT
  const showClientDashboardMenuButton: boolean =
    path !== EulogisePage.CLIENT_ADMIN_CASES && isClientUser

  const product = CardProductHelper.getAtWhichProductEditorPage({ location })
  const slug = CardProductHelper.getGenericCardProductSlugByLocation({
    product,
    location,
  })

  const { activeItem: activeProductItem } = useProductState({ product, slug })

  const pathname = location?.pathname

  const isAtPhotoLibrary: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.PHOTO_LIBRARY,
    })

  const { images }: IAssetState = useAssetState()

  const isAtSlideshowPreviewPage: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.EULOGIZE_SLIDESHOW_PREVIEW_PAGE,
    })

  if (
    !account ||
    userRole === EulogiseUserRole.CONTRIBUTOR ||
    isAtSlideshowPreviewPage
  ) {
    return null
  }
  return (
    <StyledSider
      id={id}
      width={EXPANDED_SIDER_BASE_WIDTH}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      $isDebug={isDebug}
    >
      <ControlSiderMenu>
        <SiderCollapsedMenuItem
          key="collapse"
          icon={isCollapsed ? <RightIcon /> : <LeftIcon />}
          onClick={() => {
            if (isCollapsed) {
              dispatch(expandSiderMenu())
              return
            } else {
              dispatch(collapseSiderMenu())
              return
            }
          }}
        >
          {isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
        </SiderCollapsedMenuItem>

        {showClientDashboardMenuButton && (
          <Tooltip key="dashboard" placement="right" title="Dashboard">
            <SiderMenuItem
              key="client-admin-home"
              icon={<AdminDashboardIcon />}
              $isSelected={
                location?.pathname === EulogisePage.CLIENT_ADMIN_CASES
              }
              onClick={() => {
                NavigationHelper.navigate(
                  EulogisePage.CLIENT_ADMIN_CASES,
                  null,
                  undefined,
                  false,
                  () => {
                    if (isAtPhotoLibrary) {
                      const customisedImagesOrderIds: Array<string> =
                        AssetHelper.getCustomisedImagesOrderIdsByImages(images)
                      dispatch(
                        showUnsavedPhotoImagesOrderConfirmModal({
                          page: EulogisePage.DASHBOARD,
                          newCustomisedPhotoImagesOrderIds:
                            customisedImagesOrderIds,
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
              }}
            >
              Dashboard
            </SiderMenuItem>
          </Tooltip>
        )}
      </ControlSiderMenu>
      <SiderTopMenu
        location={location}
        userRole={userRole}
        isClientAdminSider={isClientAdminSider}
      />
      <SiderBottomMenu
        userRole={userRole}
        location={location}
        isClientAdminSider={isClientAdminSider}
      />
    </StyledSider>
  )
}

export default Sider
