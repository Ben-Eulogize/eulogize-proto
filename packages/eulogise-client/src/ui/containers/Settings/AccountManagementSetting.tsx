import React from 'react'
import styled from 'styled-components'
import { Button, ButtonType, HeaderTextLG } from '@eulogise/client-components'

interface IAccountManagementSettingProps {
  isVisible: boolean
  isLoading: boolean
  onDeleteAccountClick: () => void
}

const StyledDeleteAccountButton = styled(Button)`
  margin: 0;
`

const AccountManagementSection = styled.div`
  margin-top: 4rem;
  padding-bottom: 2rem;
`

export const AccountManagementSetting: React.FC<
  IAccountManagementSettingProps
> = ({ isVisible, isLoading, onDeleteAccountClick }) => {
  if (!isVisible) {
    return null
  }

  return (
    <AccountManagementSection>
      <HeaderTextLG>Account management</HeaderTextLG>
      <StyledDeleteAccountButton
        className="account-settings-delete-account-button"
        disabled={false}
        loading={isLoading}
        noMarginLeft
        onClick={onDeleteAccountClick}
        buttonType={ButtonType.TRANSPARENT}
      >
        Delete account
      </StyledDeleteAccountButton>
    </AccountManagementSection>
  )
}
