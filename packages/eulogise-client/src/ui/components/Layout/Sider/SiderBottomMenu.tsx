import React, { useEffect } from 'react'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { DEVICES, useBreakpoint } from '@eulogise/client-core'
import { QuickGuideIcon } from '@eulogise/client-components'
import {
  EulogiseUserRole,
  GUIDE_SHOW_UP_PAGE,
  GUIDE_WALK_THROUGH_ROUTERS_START_WITH,
  IAuthState,
  ICaseState,
  IGuideWalkThroughState,
  IUserGuideHelperConfig,
} from '@eulogise/core'
import { SiderMenu } from './SiderMenu/SiderMenu'
import { SiderMenuItem } from './SiderMenu/SiderMenuItem'
import {
  useAuthState,
  useCaseState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
} from '../../../store/hooks'
import { restoreGuideState } from '../../../store/GuideWalkThroughState/action'

const getIsValidRoleShowQuickGuide = (role: EulogiseUserRole): boolean => {
  if (
    role === EulogiseUserRole.CUSTOMER ||
    role === EulogiseUserRole.COEDITOR ||
    role === EulogiseUserRole.EDITOR ||
    role === EulogiseUserRole.CLIENT
  ) {
    return true
  }
  return false
}
interface ISiderBottomMenuProps {
  userRole: EulogiseUserRole
  isClientAdminSider?: boolean
  location: WindowLocation
}

const StyledSiderMenu = styled(SiderMenu)`
  margin-top: auto;
`

const renderCustomerSiderBottomMenu = (
  location: WindowLocation,
  isClientAdminSider?: boolean,
): JSX.Element => {
  const dispatch = useEulogiseDispatch()
  const screenSize = useBreakpoint()
  const isNotMobile = screenSize !== DEVICES.MOBILE
  const { account }: IAuthState = useAuthState()
  const role = account?.role
  const isValidRoleShowQuickGuide = getIsValidRoleShowQuickGuide(role!)

  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const {
    shouldQuickGuideFlashHighlighted,
    currentStep,
    guideShowAt,
    shouldCreateNewCaseFlashHighlighted,
  } = guideWalkThroughContext

  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig

  const caseState: ICaseState = useCaseState()
  const hasClientCreatedCase: boolean = caseState?.items?.length > 0 ?? false

  const shouldDisableQuickGuideButtonInGuideMode: boolean =
    role === EulogiseUserRole.CLIENT &&
    !hasClientCreatedCase &&
    ((location?.pathname?.startsWith(
      GUIDE_WALK_THROUGH_ROUTERS_START_WITH.CLIENT_DASHBOARD_PART_ONE,
    ) &&
      guideShowAt === GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE &&
      currentStep < 3) ||
      !userGuideHelperConfig?.hasViewedClientDashboardPartTwo)

  useEffect(() => {
    if (shouldQuickGuideFlashHighlighted) {
      setTimeout(() => {
        dispatch(restoreGuideState())
      }, 3000)
    }
  }, [shouldQuickGuideFlashHighlighted])

  return (
    <StyledSiderMenu>
      {!isClientAdminSider && false && (
        <SiderMenuItem key="launch-quick-guide" icon={<QuickGuideIcon />}>
          Launch Quick Guide
        </SiderMenuItem>
      )}
      {/* {isNotMobile && (
        <>
          {
            <GuidePopover
              placedPage={GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE}
              showUpStepIndex={3}
              width={430}
            />
          }
        </>
      )} */}
    </StyledSiderMenu>
  )
}

const renderAdminSiderBottomMenu = (): JSX.Element => {
  return <StyledSiderMenu />
}

const renderVisitorBottomMenu = (): JSX.Element => {
  return <StyledSiderMenu />
}

const renderSiderBottomMenuByAccountRole = (
  userRole: EulogiseUserRole,
  location: WindowLocation,
  isClientAdminSider?: boolean,
): JSX.Element => {
  switch (userRole) {
    case EulogiseUserRole.CUSTOMER:
    case EulogiseUserRole.COEDITOR:
    case EulogiseUserRole.EDITOR:
    case EulogiseUserRole.CLIENT:
      return renderCustomerSiderBottomMenu(location, isClientAdminSider)
    case EulogiseUserRole.CONTRIBUTOR:
    case EulogiseUserRole.ADMIN:
      return renderAdminSiderBottomMenu()
    case EulogiseUserRole.VISITOR:
    case EulogiseUserRole.VISITOR_BOOKLET:
    case EulogiseUserRole.VISITOR_BOOKMARK:
    case EulogiseUserRole.VISITOR_PHOTOBOOK:
    case EulogiseUserRole.VISITOR_SIDED_CARD:
    case EulogiseUserRole.VISITOR_SLIDESHOW:
    case EulogiseUserRole.VISITOR_THANKYOUCARD:
    case EulogiseUserRole.VISITOR_TV_WELCOME_SCREEN:
      return renderVisitorBottomMenu()
    default:
      console.log(
        `[Bugsnag diagnostic data] - renderSiderBottomMenuByAccountRole, userRole: ${userRole}`,
      )
      throw Error('Unrecognized Eulogize User Role Type!')
  }
}

const SiderBottomMenu: React.FunctionComponent<ISiderBottomMenuProps> = ({
  userRole,
  location,
  isClientAdminSider,
}): JSX.Element =>
  renderSiderBottomMenuByAccountRole(userRole, location, isClientAdminSider)

export default SiderBottomMenu
