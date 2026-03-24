import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import ServiceCards from '../../ui/containers/Dashboard/ServiceCards'
import { fetchImageAssetsByCaseId } from '../../ui/store/AssetState/actions'
import {
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
} from '../../ui/store/hooks'
import { fetchAllProductsByCaseId } from '../../ui/store/CardProduct/actions'
import { DEVICES, STYLE, useBreakpoint } from '@eulogise/client-core'
import ScreenTooSmall from '../../ui/containers/Dashboard/ScreenTooSmall'
import { showGuide } from '../../ui/store/GuideWalkThroughState/action'
import { openDrawerAction } from '../../ui/store/DrawerState/actions'
import { updateIsComingFromPaymentPage } from '../../ui/store/CheckoutsState/action'
import {
  DrawerId,
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  IAuthState,
  ICaseState,
  ICheckoutsState,
  IUserGuideHelperConfig,
} from '@eulogise/core'
import { useIsDebug } from '../../ui/hooks/useIsDebug'
import { GuidePopoverWelcome } from '../../ui/components/GuidePopoverWelcome/GuidePopoverWelcome'
import { usePreloadPrimaryOrFirstImage } from '../../ui/hooks/usePreloadPrimaryOrFirstImage'
import { fetchInvoices } from '../../ui/store/InvoiceState/actions'
import { fetchGenericCardProductTypes } from '../../ui/store/GenericCardProductTypeState'

const StyledDashboardPage = styled(Layout)``

const PageContent = styled.div`
  padding: 0 ${STYLE.CONTENT_PADDING};
`

const DashboardPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const isDebug = useIsDebug()
  const { account }: IAuthState = useAuthState()
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig
  const caseState: ICaseState = useCaseState()
  const screenSize = useBreakpoint()
  const activeCase = caseState?.activeItem
  const accountRole: EulogiseUserRole = account?.role!
  const hasViewedMemorialDashboardGuide: boolean =
    userGuideHelperConfig?.hasViewedMemorialDashboard ?? false
  const validRoleAutoShowMemorialGuide: boolean =
    accountRole === EulogiseUserRole.CUSTOMER ||
    accountRole === EulogiseUserRole.COEDITOR ||
    accountRole === EulogiseUserRole.EDITOR ||
    accountRole === EulogiseUserRole.CLIENT
  const caseId: string = activeCase?.id!
  const region = activeCase?.region!

  const { willOpenThemeDrawer }: ICheckoutsState = useCheckoutsState()

  usePreloadPrimaryOrFirstImage()

  useEffect(() => {
    if (accountRole === EulogiseUserRole.CONTRIBUTOR) {
      return
    }

    dispatch(fetchImageAssetsByCaseId(caseId))
    dispatch(fetchAllProductsByCaseId({ caseId, region }))

    if (validRoleAutoShowMemorialGuide && !hasViewedMemorialDashboardGuide) {
      dispatch(
        showGuide(
          GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_MEMORIAL_DASHBOARD,
          0,
          false,
        ),
      )
    }

    if (willOpenThemeDrawer) {
      dispatch(
        openDrawerAction(DrawerId.THEME_SELECTION_DRAWER, {
          productType: undefined!,
          isNavigateToProductWhenApplyTheme: false,
        }),
      )
      dispatch(updateIsComingFromPaymentPage(false))
    }

    if (
      accountRole &&
      caseId &&
      [
        EulogiseUserRole.CUSTOMER,
        EulogiseUserRole.CLIENT,
        EulogiseUserRole.EDITOR,
        EulogiseUserRole.ADMIN,
      ].includes(accountRole)
    ) {
      dispatch(fetchInvoices({ caseId }))
    }

    // return () => {
    //   dispatch(restoreGuideState())
    // }
  }, [caseId, accountRole])

  const isShowScreenToSmall = !isDebug && screenSize === DEVICES.MOBILE

  return (
    <StyledDashboardPage title="Dashboard" location={location} noPadding>
      {isShowScreenToSmall ? (
        <ScreenTooSmall />
      ) : (
        <PageContent>
          <GuidePopoverWelcome
            placedPage={GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_MEMORIAL_DASHBOARD}
            showUpStepIndex={0}
            location={location}
          />
          <ServiceCards />
        </PageContent>
      )}
    </StyledDashboardPage>
  )
}

export default DashboardPage
