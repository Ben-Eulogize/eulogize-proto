import React, { useEffect, useMemo, useState } from 'react'
import { PageProps } from 'gatsby'
import {
  EulogisePage,
  EulogiseProduct,
  IAuthState,
  MemorialVisualStatus,
  ModalId,
  GUIDE_SHOW_UP_PAGE,
  IGuideWalkThroughState,
  IUserGuideHelperConfig,
  EulogiseUserRole,
} from '@eulogise/core'
import {
  DEFAULT_SEARCH_FILTERS,
  IPortalTableCellClickEvent,
  PortableTableHelper,
  SearchFilterCasesType,
} from '@eulogise/client-components'
import { PortalSearchFilterAndTable } from '@eulogise/client-components'
import { CardProductHelper, NavigationHelper } from '@eulogise/helpers'
import {
  useAdminState,
  useAuthState,
  useEulogiseDispatch,
  useGuideWalkThroughState,
} from '../../../ui/store/hooks'
import { fetchCasesWithFullDetails } from '../../../ui/store/AdminState/actions'
import Layout from '../../../ui/components/Layout/Layout'
import { setActiveCaseByCaseId } from '../../../ui/store/CaseState/actions'
import { ClientPortalSettingDrawer } from '../../../ui/components/Drawer/ClientPortalSettingDrawer'
import { openThemeDrawer } from '../../../ui/store/DrawerState/actions'
import { showModalAction } from '../../../ui/store/ModalState/actions'
import { showGuide } from '../../../ui/store/GuideWalkThroughState/action'

const ClientAdminCasesPage = ({ location }: PageProps) => {
  const dispatch = useEulogiseDispatch()
  const [selectedCaseId, setSelectedCaseId] = useState<string>()
  const { account }: IAuthState = useAuthState()
  const role: EulogiseUserRole = account?.role!
  const userGuideHelperConfig: IUserGuideHelperConfig | undefined =
    account?.userGuideHelperConfig
  const adminState = useAdminState()
  const cases = adminState.portalCasesPageState?.cases || []
  const fetchingCases = adminState.portalCasesPageState?.fetchingCases

  const dataSource = useMemo(
    () => PortableTableHelper.transformCaseToPortableItems(cases),
    [cases],
  )
  const guideWalkThroughContext: IGuideWalkThroughState =
    useGuideWalkThroughState()
  const {
    guideShowAt,
    shouldQuickGuideFlashHighlighted,
    shouldCreateNewCaseFlashHighlighted,
    currentStep,
  } = guideWalkThroughContext

  const hasViewedClientDashboardPartOne: boolean =
    userGuideHelperConfig?.hasViewedClientDashboardPartOne ?? false

  useEffect(() => {
    dispatch(fetchCasesWithFullDetails())

    /*
    // cases need to be fetched. These cases are going to be used by setActiveCaseByCaseId action
    dispatch(fetchCases()) // consider using fetchCaseById instead
*/

    if (role === EulogiseUserRole.CLIENT && !hasViewedClientDashboardPartOne) {
      dispatch(
        showGuide(GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD, 0, false),
      )
    }
  }, [])

  // Refetch to fix the issue that cases were disappeared after closing guide
  useEffect(() => {
    if (guideShowAt === GUIDE_SHOW_UP_PAGE.NULL) {
      dispatch(fetchCasesWithFullDetails())

      /*
      // cases need to be fetched. These cases are going to be used by setActiveCaseByCaseId action
      dispatch(fetchCases()) // consider using fetchCaseById instead
*/
    }
  }, [shouldQuickGuideFlashHighlighted, shouldCreateNewCaseFlashHighlighted])

  return (
    <Layout title="Cases" isClientAdminSider location={location}>
      {/* {guideShowAt === GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD && (
        <GuidePopoverWelcome
          placedPage={GUIDE_SHOW_UP_PAGE.GLOBAL_WELCOME_CLIENT_DASHBOARD}
          showUpStepIndex={0}
          location={location}
        />
      )} */}
      <PortalSearchFilterAndTable
        isShowResetButton={false}
        onResetClick={() => {
          /* Client Admin cannot reset file status
          dispatch(
            updateProductByIdAction({
              product: ev.product,
              productId: ev.id,
              caseId: ev.caseId,
              productData: {
                fileStatus: ResourceFileStatus.NOT_STARTED,
                status: MemorialVisualStatus.EDITED,
              },
            }),
          )
           */
        }}
        ownerId={account?.id!}
        defaultFilters={{ cases: SearchFilterCasesType.AllCases }}
        welcomeText={`Welcome ${account?.fullName!}. View, edit and create new customer memorials here`}
        dataSource={dataSource}
        filters={DEFAULT_SEARCH_FILTERS}
        excludeColumns={[
          'caseId',
          'clientName',
          'photobookStatus',
          'bookmarkStatus',
          'thankyouCardStatus',
          'sidedCardStatus',
          'customerEmail',
          'region',
          'country',
        ]}
        loading={fetchingCases}
        onCellClick={(ev: IPortalTableCellClickEvent) => {
          if (ev.columnKey === 'slideshowStatus') {
            dispatch(
              setActiveCaseByCaseId({
                caseId: ev.record.caseId,
                success: () => {
                  if (
                    ev.record.slideshowStatus ===
                      MemorialVisualStatus.COMPLETE ||
                    ev.record.slideshowStatus === MemorialVisualStatus.DOWNLOAD
                  ) {
                    return dispatch(
                      showModalAction(ModalId.SLIDESHOW_PREVIEW, {
                        showDownloadButton: true,
                        showKeepEditingButton: true,
                      }),
                    )
                  } else if (ev.record.slideshowId) {
                    return NavigationHelper.navigate(
                      EulogisePage.EDIT_SLIDESHOW,
                      {
                        slideshowId: ev.record.slideshowId,
                      },
                    )
                  } else {
                    return dispatch(
                      openThemeDrawer(EulogiseProduct.SLIDESHOW, true),
                    )
                  }
                },
              }),
            )
          } else if (ev.columnKey === 'bookletStatus') {
            dispatch(
              setActiveCaseByCaseId({
                caseId: ev.record.caseId,
                success: () => {
                  const product = EulogiseProduct.BOOKLET
                  if (
                    ev.record.bookletStatus === MemorialVisualStatus.COMPLETE ||
                    ev.record.bookletStatus === MemorialVisualStatus.DOWNLOAD
                  ) {
                    return dispatch(
                      showModalAction(
                        CardProductHelper.getPreviewModalIdByProduct(product)!,
                        {
                          product,
                          showDownloadButton: true,
                          showKeepEditingButton: true,
                        },
                      ),
                    )
                  } else if (ev.record.bookletId) {
                    return NavigationHelper.navigate(
                      EulogisePage.EDIT_BOOKLET,
                      {
                        bookletId: ev.record.bookletId,
                      },
                    )
                  } else {
                    return dispatch(openThemeDrawer(product, true))
                  }
                },
              }),
            )
          } else if (ev.columnKey === 'settings') {
            setSelectedCaseId(ev.record.caseId)
          } else if (ev.columnKey === 'deceasedName') {
            dispatch(
              setActiveCaseByCaseId({
                caseId: ev.record.caseId,
                success: () => {
                  NavigationHelper.navigate(EulogisePage.DASHBOARD)
                },
              }),
            )
          }
        }}
        MemorialStatusPopoverComponent={
          // <GuidePopover
          //   placedPage={GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO}
          //   showUpStepIndex={1}
          //   width={450}
          //   hasMemorialStatus={true}
          // />
          <></>
        }
        MemorialSettingsPopoverComponent={
          // <GuidePopover
          //   placedPage={GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO}
          //   showUpStepIndex={2}
          //   width={430}
          //   hasMemorialStatus={false}
          // />
          <></>
        }
        MemorialDashboardPopoverComponent={
          // <GuidePopover
          //   placedPage={GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_TWO}
          //   showUpStepIndex={0}
          //   width={430}
          //   hasMemorialStatus={false}
          // />
          <></>
        }
        isDropdownHighlighted={
          guideShowAt === GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE &&
          currentStep === 1
        }
        isSearchButtonHighlighted={
          guideShowAt === GUIDE_SHOW_UP_PAGE.CLIENT_DASHBOARD_PART_ONE &&
          currentStep === 2
        }
      />
      <ClientPortalSettingDrawer
        caseId={selectedCaseId!}
        iCase={cases.find((c) => c.id === selectedCaseId)!}
        isOpen={!!selectedCaseId}
        onClose={() => setSelectedCaseId(undefined)}
      />
    </Layout>
  )
}

export default ClientAdminCasesPage
