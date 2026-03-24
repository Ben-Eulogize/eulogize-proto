import React, { useEffect, useMemo, useState } from 'react'
import { PageProps } from 'gatsby'
import { Col, Row } from 'antd'
import {
  IAuthState,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import {
  Button,
  DEFAULT_SEARCH_FILTERS,
  PortableTableHelper,
  SearchFilterCasesType,
} from '@eulogise/client-components'
import { PortalSearchFilterAndTable } from '../../../../eulogise-client-components/src/Table/PortalTable/PortalSearchFilterAndTable'
import {
  useAdminState,
  useAuthState,
  useEulogiseDispatch,
} from '../../ui/store/hooks'
import {
  exportCasesReport,
  fetchCasesWithFullDetailsAsAdmin,
  fetchRecentCasesWithFullDetails,
  updateProductByIdAction,
} from '../../ui/store/AdminState/actions'
import { setActiveCaseByCaseId } from '../../ui/store/CaseState/actions'
import { showModalAction } from '../../ui/store/ModalState/actions'
import { openThemeDrawer } from '../../ui/store/DrawerState/actions'
import { ClientPortalSettingDrawer } from '../../ui/components/Drawer/ClientPortalSettingDrawer'
import Layout from '../../ui/components/Layout/Layout'
import { STYLE } from '@eulogise/client-core'

const ClientAdminCasesPage = ({ location }: PageProps) => {
  const dispatch = useEulogiseDispatch()
  const [selectedCaseId, setSelectedCaseId] = useState<string>()
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const { account }: IAuthState = useAuthState()
  const adminState = useAdminState()
  const cases = adminState.portalCasesPageState?.cases || []
  const fetchingCases = adminState.portalCasesPageState?.fetchingCases
  const fetchingRecentCases =
    adminState.portalCasesPageState?.fetchingRecentCases
  const dataSource = useMemo(
    () => PortableTableHelper.transformCaseToPortableItems(cases),
    [cases],
  )

  useEffect(() => {
    dispatch(fetchRecentCasesWithFullDetails())

    /*
    // cases need to be fetched. These cases are going to be used by setActiveCaseByCaseId action
    dispatch(fetchCases())
*/
  }, [])

  return (
    <Layout title="Cases" isClientAdminSider location={location}>
      <Row style={{ marginBottom: STYLE.GUTTER }}>
        <Col flex={1}></Col>
        <Col>
          <Button
            loading={fetchingCases}
            onClick={() => {
              dispatch(fetchCasesWithFullDetailsAsAdmin())
            }}
          >
            Load All Cases
          </Button>
          <Button
            loading={isExporting}
            onClick={() => {
              setIsExporting(true)
              dispatch(
                exportCasesReport({
                  onComplete: () => {
                    setIsExporting(false)
                  },
                }),
              )
            }}
          >
            Export to CSV
          </Button>
        </Col>
      </Row>
      <PortalSearchFilterAndTable
        isShowResetButton
        onResetClick={(ev) => {
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
        }}
        ownerId={account?.id!}
        defaultFilters={{ cases: SearchFilterCasesType.AllCases }}
        welcomeText={`Welcome ${account?.fullName!}. View, edit and create new customer memorials here`}
        dataSource={dataSource}
        filters={DEFAULT_SEARCH_FILTERS}
        excludeColumns={[
          'caseId',
          'photobookStatus',
          'bookmarkStatus',
          'thankyouCardStatus',
          'sidedCardStatus',
          'customerEmail',
        ]}
        loading={fetchingRecentCases}
        onCellClick={(ev) => {
          PortableTableHelper.onCellClick(ev, {
            dispatch,
            setActiveCaseByCaseId,
            showModalAction,
            onSelectedCaseId: setSelectedCaseId,
            openThemeDrawer,
          })
        }}
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
