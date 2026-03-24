import React from 'react'
import { DropdownMenu, ButtonType, Button } from '@eulogise/client-components'
import { logout } from '../../store/AuthState/actions'
import {
  EulogisePage,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
} from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import styled from 'styled-components'
import { EulogiseGuideHelper } from '../../helpers/EulogiseGuideHelper'
import { showGuide } from '../../store/GuideWalkThroughState/action'
import { useAuthState, useGetNonAdminConnections } from '../../store/hooks'

const StyledDropdownButton = styled(Button)``

const StyledDropdownMenu = styled(DropdownMenu)`
  display: inline-grid;
  &.ant-dropdown-menu {
    padding: 0;
    background-color: lavender;
  }
`

const HeaderProfileDropdownMenu = (dispatch: any, location: Location) => {
  const path: string = location?.pathname!
  const { account } = useAuthState()
  const connections = useGetNonAdminConnections()
  const isClientDashboardPage = NavigationHelper.isClientDashboardPage(path)
  const isClientRoleAndOnClientDashboard =
    account?.role === EulogiseUserRole.CLIENT && isClientDashboardPage
  const isShowHelpGuide = NavigationHelper.isShowHelpGuide(path)
  const isShowConnections = account?.role === EulogiseUserRole.ADMIN

  return () => (
    <StyledDropdownMenu>
      {!isClientRoleAndOnClientDashboard && (
        <StyledDropdownButton
          className="header-profile-dropdown-item-account-settings"
          key="account-settings"
          buttonType={ButtonType.WHITE}
          onClick={() => {
            if (isClientDashboardPage) {
              return NavigationHelper.navigate(
                EulogisePage.CLIENT_ACCOUNT_SETTINGS,
              )
            } else {
              return NavigationHelper.navigate(EulogisePage.ACCOUNT_SETTINGS)
            }
          }}
          noMarginRight
          noMarginLeft
          icon={null}
        >
          Account Settings
        </StyledDropdownButton>
      )}
      {isShowHelpGuide && (
        <StyledDropdownButton
          id="header-profile-dropdown-help-guide"
          key="helpGuide"
          buttonType={ButtonType.WHITE}
          onClick={() => {
            const availableGuidePages = [
              GUIDE_SHOW_UP_PAGE.DASHBOARD,
              GUIDE_SHOW_UP_PAGE.BOOKLET,
              GUIDE_SHOW_UP_PAGE.SLIDESHOW,
            ]
            const currentPageGuide = EulogiseGuideHelper.findShowGuideAt(
              location?.pathname,
            )
            const guidePageIndex =
              availableGuidePages?.indexOf(currentPageGuide)
            if (guidePageIndex >= 0) {
              const guidePage = availableGuidePages?.[guidePageIndex]
              dispatch(showGuide(guidePage, 0, true))
            }
          }}
          noMarginRight
          noMarginLeft
          icon={null}
        >
          Help Guide
        </StyledDropdownButton>
      )}
      <StyledDropdownButton
        id="header-profile-dropdown-item-logout"
        key="logout"
        buttonType={ButtonType.WHITE}
        onClick={() => {
          dispatch(
            logout({
              success: () => NavigationHelper.navigate(EulogisePage.SIGN_IN),
            }),
          )
        }}
        noMarginRight
        noMarginLeft
        icon={null}
      >
        Sign Out
      </StyledDropdownButton>
      {isShowConnections &&
        connections.map((conn) => (
          <StyledDropdownButton
            key={conn.id}
            buttonType={ButtonType.WHITE}
            noMarginRight
            noMarginLeft
            icon={null}
          >
            {conn.user?.fullName}
          </StyledDropdownButton>
        ))}
    </StyledDropdownMenu>
  )
}

export default HeaderProfileDropdownMenu
