import React from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import {
  HeaderTextLG,
  Text,
  Button,
  ButtonType,
} from '@eulogise/client-components'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import { EulogisePage } from '@eulogise/core'
import { NavigationHelper } from '@eulogise/helpers'
import { useEulogiseDispatch } from '../ui/store/hooks'
import { logout } from '../ui/store/AuthState/actions'

const StyledAccountDeletedPage = styled(PreLoggedInLayout)`
  text-align: center;
`

const Content = styled.div`
  max-width: 560px;
  margin: 0 auto;
`

const Description = styled(Text)`
  display: block;
  margin-top: 1rem;
`

const SignInButton = styled(Button)`
  margin-top: 2rem;
`

const AccountDeletedPage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()

  return (
    <StyledAccountDeletedPage
      title="Account deleted"
      location={location}
      noRedirect
    >
      <Content>
        <HeaderTextLG>Your account has been deleted</HeaderTextLG>
        <Description>
          We&apos;re sorry to see you go. Your Eulogize account and any tributes
          you created have been removed. If you change your mind in the future,
          you can create a new account with the same email.
        </Description>
        <SignInButton
          buttonType={ButtonType.PRIMARY}
          onClick={() =>
            dispatch(
              logout({
                success: () => NavigationHelper.navigate(EulogisePage.SIGN_IN),
              }),
            )
          }
        >
          Back to sign in
        </SignInButton>
      </Content>
    </StyledAccountDeletedPage>
  )
}

export default AccountDeletedPage
