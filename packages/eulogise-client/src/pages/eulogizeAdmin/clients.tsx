import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import moment from 'moment'
import Layout from '../../ui/components/Layout/Layout'
import { useAdminState, useEulogiseDispatch } from '../../ui/store/hooks'
import { Table, Search } from '@eulogise/client-components'
import {
  fetchAllClientsWithAdmin,
  fetchAllUsersWithAdmin,
  restoreInitialStateWhenChangePage,
} from '../../ui/store/AdminState/actions'
import {
  ADMIN_PORTAL_CLIENTS_SEARCH_BAR_PLACEHOLDER,
  IAdminState,
  EulogisePage,
  ModalId,
} from '@eulogise/core'
import {
  clientDataTransferHelper,
  filterClientsNameBySearchWords,
} from '../../ui/helpers/AdminHelper'
import { IEulogiseClient, IEulogiseUser, EulogiseCountry } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import { EULOGISE_COUNTRIES_REGIONS_OPTIONS } from '../../ui/components/CountryGlobalIcon/CountryGlobalIcon'
import { showModalAction } from '../../ui/store/ModalState/actions'

export const StyledActions = styled.a`
  display: block;
  min-width: 100px;
`

export const StyledCountryFlagContainer = styled.div`
  display: block;
  min-width: 100px;
`

export const ADMIN_PORTAL_CLIENT_COLUMNS = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    sorter: (a: any, b: any) => a.brand?.localeCompare(b.brand),
  },
  { title: 'Handle', dataIndex: 'handle', key: 'handle' },
  {
    title: 'Address',
    dataIndex: 'primaryAddress',
    key: 'primaryAddress',
    sorter: (a: IEulogiseClient, b: IEulogiseClient) =>
      (a?.primaryAddress ?? '')?.localeCompare(b?.primaryAddress ?? ''),
  },
  {
    title: 'Client created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a: IEulogiseClient, b: IEulogiseClient) =>
      a.createdAt.localeCompare(b.createdAt),
    render: (a: IEulogiseClient) => moment(a).format('ll'),
  },
  {
    title: 'Client Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: (a: IEulogiseClient, b: IEulogiseClient) =>
      a.country.localeCompare(b.country),
    render: (country: EulogiseCountry) => {
      const countryWithFlagComponent = EULOGISE_COUNTRIES_REGIONS_OPTIONS?.find(
        (c) => c.value === country,
      )?.label
      return (
        <StyledCountryFlagContainer>
          {countryWithFlagComponent}
        </StyledCountryFlagContainer>
      )
    },
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
    render: (users: Array<IEulogiseUser>) => {
      return users?.map((u) => u?.fullName).join(', ')
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (client: IEulogiseUser) => (
      <>
        <StyledActions
          onClick={() =>
            NavigationHelper.navigate(EulogisePage.EULOGIZE_ADMIN_EDIT_CLIENT, {
              clientId: client.id,
            })
          }
        >
          Edit Client
        </StyledActions>
      </>
    ),
  },
]

const StyledAdminClientPage = styled(Layout)``

const AdminClientPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const onClientChange = (e: any) => {
    setSearchWords(e.target.value)
  }

  const onClientSearch = (value: string) => {
    setSearchWords(value)
  }

  const [searchWords, setSearchWords] = useState<string>('')
  const [extractedClients, setExtractedClients] = useState<Array<any>>([])
  const dispatch = useEulogiseDispatch()
  const adminState: IAdminState = useAdminState()
  const {
    viewAllClientsPageState: { clients, fetchingClients },
    manageUsersPageState: { users: rawUsers, fetchingUsers },
  } = adminState

  useEffect(() => {
    dispatch(fetchAllClientsWithAdmin())
    dispatch(fetchAllUsersWithAdmin())
  }, [])

  useEffect((): (() => void) => {
    if (clients && rawUsers && !fetchingClients) {
      setExtractedClients(clientDataTransferHelper(clients, rawUsers))
    }
    return () => dispatch(restoreInitialStateWhenChangePage())
  }, [fetchingClients, fetchingUsers])

  return (
    <StyledAdminClientPage title="Admin Client Management" location={location}>
      <Search
        placeholder={ADMIN_PORTAL_CLIENTS_SEARCH_BAR_PLACEHOLDER}
        onSearch={onClientSearch}
        onChange={onClientChange}
      />
      <Table
        dataSource={filterClientsNameBySearchWords(
          extractedClients,
          searchWords,
        )}
        columns={ADMIN_PORTAL_CLIENT_COLUMNS}
      />
    </StyledAdminClientPage>
  )
}

export default AdminClientPage
