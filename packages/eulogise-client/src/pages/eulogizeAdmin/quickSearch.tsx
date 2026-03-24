import React, { useMemo, useState } from 'react'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import {
  PortableTableHelper,
  PortalTable,
  Search,
  usePortalTableDataSource,
} from '@eulogise/client-components'
import { useAuthState, useEulogiseDispatch } from '../../ui/store/hooks'
import {
  adminSearchCases,
  updateProductByIdAction,
} from '../../ui/store/AdminState/actions'
import { setActiveCaseByCaseId } from '../../ui/store/CaseState/actions'
import { showModalAction } from '../../ui/store/ModalState/actions'
import { openThemeDrawer } from '../../ui/store/DrawerState/actions'
import { ClientPortalSettingDrawer } from '../../ui/components/Drawer/ClientPortalSettingDrawer'
import {
  EulogiseUserRole,
  IPortalCaseResponseItem,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'

const QuickSearch = ({ location }: PageProps) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>()
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const dispatch = useEulogiseDispatch()
  const [cases, setCases] = useState<Array<IPortalCaseResponseItem>>([])
  const dataSource = useMemo(
    () => PortableTableHelper.transformCaseToPortableItems(cases),
    [cases],
  )
  const ownerId = ''
  const { displayDataSource } = usePortalTableDataSource({
    dataSource,
    ownerId,
  })
  const { account } = useAuthState()
  const isAdmin = account?.role === EulogiseUserRole.ADMIN

  return (
    <Layout title="Admin Client Management" location={location}>
      <Search
        placeholder={'Email or Case Id'}
        onSearch={(value: string) => {
          console.log('searching for', value)
          setIsSearching(true)
          dispatch(
            adminSearchCases({
              query: value,
              onSuccess: (c) => {
                console.log('success', c)
                setIsSearching(false)
                setCases(c)
              },
            }),
          )
        }}
      />
      <PortalTable
        dataSource={displayDataSource}
        excludeColumns={[
          'caseId',
          'photobookStatus',
          'bookmarkStatus',
          'thankyouCardStatus',
          'sidedCardStatus',
          'customerEmail',
        ]}
        loading={isSearching}
        onCellClick={(ev) => {
          PortableTableHelper.onCellClick(ev, {
            dispatch,
            setActiveCaseByCaseId,
            showModalAction,
            onSelectedCaseId: setSelectedCaseId,
            openThemeDrawer,
          })
        }}
        isShowResetButton={isAdmin}
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

export default QuickSearch
