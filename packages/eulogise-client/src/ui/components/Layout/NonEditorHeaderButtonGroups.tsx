import React from 'react'
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  CheckoutTributeDownloadIcon,
  RefreshIcon,
} from '@eulogise/client-components'
import {
  useAdminState,
  useAnyActiveCardProductIsFetching,
  useAuthState,
  useCaseState,
  useCheckoutsState,
  useEulogiseDispatch,
} from '../../store/hooks'
import {
  CaseStatus,
  EulogiseEditorPaymentConfig,
  EulogisePage,
  EulogiseUserRole,
  IAuthState,
  ICaseState,
} from '@eulogise/core'
import { DashboardHelper, NavigationHelper } from '@eulogise/helpers'
import { EulogiseEndpoint } from '@eulogise/client-core'
import { fetchCasesWithFullDetails } from '../../store/AdminState/actions'
import { saveTemporaryCheckoutState } from '../../store/CheckoutsState/action'

const StyledEditorButtonGroupContainer = styled.div`
  display: flex;
  padding-right: 16px;
`

interface INonEditorHeaderButtonGroups {
  location: Location
}

const NonEditorHeaderButtonGroups = ({
  location,
}: INonEditorHeaderButtonGroups) => {
  const dispatch = useEulogiseDispatch()
  const { account }: IAuthState = useAuthState()
  const adminState = useAdminState()
  const checkoutsState = useCheckoutsState()
  const { activeItem: activeCase }: ICaseState = useCaseState()
  const isPaid: boolean = activeCase?.status === CaseStatus.PAID
  const userRole: EulogiseUserRole = account?.role!
  const isCoEditor = userRole === EulogiseUserRole.COEDITOR
  const isCustomer = userRole === EulogiseUserRole.CUSTOMER
  const isClient: boolean = userRole === EulogiseUserRole.CLIENT
  const isEditor: boolean = userRole === EulogiseUserRole.EDITOR
  const editorPaymentConfig = activeCase?.editorPaymentConfig

  const isTributeDashboardPage: boolean =
    location?.pathname === EulogisePage.DASHBOARD

  const pathname = location?.pathname

  const isAtClientDashboard: boolean =
    DashboardHelper.isPathnameMatchedPageEndpoint({
      pathname,
      pageEndPoint: EulogiseEndpoint.CLIENT_DASHBOARD,
    })

  const isRefreshButtonDisable: boolean =
    adminState.portalCasesPageState?.fetchingCases

  const shouldShowDownloadsButtonInDashboard =
    !isCoEditor && isPaid && isTributeDashboardPage

  const shouldShowCheckoutAndCompleteButton =
    isCustomer ||
    ((isClient || isEditor) &&
      editorPaymentConfig !== EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY &&
      !isPaid &&
      isTributeDashboardPage)

  const isAnyProductFetching = useAnyActiveCardProductIsFetching()

  if (!account) {
    return null
  }

  return (
    <StyledEditorButtonGroupContainer>
      {shouldShowDownloadsButtonInDashboard && !isAnyProductFetching && (
        <Button
          icon={<CheckoutTributeDownloadIcon />}
          buttonType={ButtonType.CORE_PURPLE}
          onClick={() =>
            NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_DOWNLOAD)
          }
          tooltip="Download your tributes"
          noMarginRight
        >
          Downloads
        </Button>
      )}
      {shouldShowCheckoutAndCompleteButton && (
        <>
          <Button
            buttonType={ButtonType.CORE_PURPLE}
            onClick={() => {
              // Clear temporary checkout state if it exists
              if (checkoutsState.temporaryCheckoutState) {
                dispatch(saveTemporaryCheckoutState(null))
              }
              NavigationHelper.navigate(EulogisePage.CHECKOUTS_V2_PACKAGE, null)
            }}
            tooltip="Checkout and complete your tributes"
            noMarginRight
          >
            Checkout & Complete
          </Button>
        </>
      )}
      {isAtClientDashboard && (
        <Button
          icon={<RefreshIcon />}
          buttonType={ButtonType.CORE_PURPLE}
          onClick={() => {
            dispatch(fetchCasesWithFullDetails())
          }}
          tooltip="Refresh to fetch all client cases"
          noMarginRight
          disabled={isRefreshButtonDisable}
        >
          {isRefreshButtonDisable ? 'Refreshing..' : 'Refresh'}
        </Button>
      )}
    </StyledEditorButtonGroupContainer>
  )
}

export default NonEditorHeaderButtonGroups
