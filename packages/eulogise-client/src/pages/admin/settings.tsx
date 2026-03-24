import React from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../ui/components/Layout/Layout'
import AccountSettings from '../../ui/containers/Settings/AccountSettings'
import { useAuthState, useCaseState } from '../../ui/store/hooks'
import { IAuthState, EulogisePage, EulogiseUserRole } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'

const StyledAccountSettingsPage = styled(Layout)``

const AccountSettingsPage: React.FC<PageProps> = ({ location }) => {
  const { account }: IAuthState = useAuthState()
  const { activeItem: activeCase } = useCaseState()
  const hasActiveCase: boolean = !!activeCase
  const isClient: boolean = account?.role === EulogiseUserRole.CLIENT
  const showUpdatePasswordForm: boolean = !(isClient && hasActiveCase)

  return (
    <StyledAccountSettingsPage title="Account Settings" location={location}>
      <AccountSettings
        account={isClient ? activeCase?.customer : account}
        showUpdatePasswordForm={showUpdatePasswordForm}
        showUpdateCase
        onUpdated={() => NavigationHelper.navigate(EulogisePage.DASHBOARD)}
      />
    </StyledAccountSettingsPage>
  )
}

export default AccountSettingsPage
