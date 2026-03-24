import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../ui/components/Layout/Layout'
import { useAdminState, useEulogiseDispatch } from '../../ui/store/hooks'
import {
  IAdminState,
  PartialIUser,
  ADMIN_PORTAL_USERS_SEARCH_BAR_PLACEHOLDER,
  EulogiseUserRole,
  NO_REPLY_EULOGISE_EMAIL,
} from '@eulogise/core'
import { Table, Search, Notification, Tag } from '@eulogise/client-components'
import {
  fetchAllUsersWithAdmin,
  restoreInitialStateWhenChangePage,
} from '../../ui/store/AdminState/actions'
import {
  userDataTransferHelper,
  filterUsersNameBySearchWords,
  renderTagColorByRole,
  copyLoginLink,
} from '../../ui/helpers/AdminHelper'
import { IEulogiseUser } from '@eulogise/core'

const StyledAdminUserPage = styled(Layout)``

export const ADMIN_PORTAL_USERS_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a: IEulogiseUser, b: IEulogiseUser) =>
      a.email.localeCompare(b.email),
    render: (email: string) => {
      console.log('email', email)
      if (
        NO_REPLY_EULOGISE_EMAIL === email ||
        'noreply@eulogisememorials.com' === email
      ) {
        return ''
      }
      return email
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    sorter: (a: IEulogiseUser, b: IEulogiseUser) =>
      a.role.localeCompare(b.role),
    render: (role: EulogiseUserRole) => {
      return (
        <Tag color={renderTagColorByRole(role)} key={role}>
          {role}
        </Tag>
      )
    },
  },
  {
    title: 'Joined at',
    dataIndex: 'joinedAt',
    key: 'joinedAt',
    sorter: (a: any, b: any) => a.joinedAt.localeCompare(b.joinedAt),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (user: IEulogiseUser) => (
      <a onClick={() => copyLoginLink(user.id)}>Copy login link</a>
    ),
  },
]

const AdminUserPage: React.FunctionComponent<PageProps> = ({ location }) => {
  const onChange = (e: any) => {
    setSearchWords(e.target.value)
  }

  const onSearch = (value: string) => {
    setSearchWords(value)
  }

  const [searchWords, setSearchWords] = useState<string>('')
  const [extractedUsers, setExtractedUsers] = useState<
    Array<PartialIUser<IEulogiseUser>>
  >([])
  const dispatch = useEulogiseDispatch()
  const adminState: IAdminState = useAdminState()
  const {
    manageUsersPageState: { users, fetchingUsers },
  } = adminState

  useEffect(() => {
    dispatch(fetchAllUsersWithAdmin())
  }, [])

  useEffect((): (() => void) => {
    if (users?.length > 0 && !fetchingUsers) {
      setExtractedUsers(userDataTransferHelper(users))
      Notification.success('Users fetched successfully!')
    }
    return () => dispatch(restoreInitialStateWhenChangePage())
  }, [fetchingUsers])

  return (
    <StyledAdminUserPage title="Admin User Management" location={location}>
      <Search
        placeholder={ADMIN_PORTAL_USERS_SEARCH_BAR_PLACEHOLDER}
        onSearch={onSearch}
        onChange={onChange}
      />
      <Table
        dataSource={filterUsersNameBySearchWords(extractedUsers, searchWords)}
        columns={ADMIN_PORTAL_USERS_COLUMNS}
      />
    </StyledAdminUserPage>
  )
}

export default AdminUserPage
