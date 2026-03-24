import React from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../../ui/components/Layout/Layout'
import AccountSettings from '../../../ui/containers/Settings/AccountSettings'
import { useAuthState } from '../../../ui/store/hooks'
import { IAuthState, EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

const StyledAccountSettingsPage = styled(Layout)``

const ClientAccountSettingsPage: React.FC<PageProps> = ({ location }) => {
  const { account }: IAuthState = useAuthState()
  return (
    <StyledAccountSettingsPage
      isClientAdminSider
      title="Account Settings"
      location={location}
    >
      <AccountSettings
        showUpdatePasswordForm
        account={account!}
        onUpdated={() => {
          NavigationHelper.navigate(EulogisePage.CLIENT_ADMIN_CASES)
        }}
      />
    </StyledAccountSettingsPage>
  )
}

export default ClientAccountSettingsPage
