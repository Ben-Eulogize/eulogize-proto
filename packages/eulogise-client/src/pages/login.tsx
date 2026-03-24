import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import styled from 'styled-components'
import { UrlHelper } from '@eulogise/helpers'
import { login } from '../ui/store/AuthState/actions'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import { EulogisePage, EulogiseUserType } from '@eulogise/core'
import { HeaderTextXL } from '@eulogise/client-components'
import { useEulogiseDispatch } from '../ui/store/hooks'

const StyledLoginPage = styled(PreLoggedInLayout)`
  text-align: center;
`

const LoginPage: React.FC<PageProps> = ({ location }) => {
  const dispatch = useEulogiseDispatch()
  const token: string = UrlHelper.getQueryParam('token', location.search)
  const redirectTo: string = UrlHelper.getQueryParam(
    'redirectTo',
    location.search,
  )

  useEffect(() => {
    if (token) {
      dispatch(
        login({
          body: { type: EulogiseUserType.SHADOW, token },
          redirectTo: redirectTo as EulogisePage,
        }),
      )
    } else {
      window.location.href = '/'
    }
  }, [])

  return (
    <StyledLoginPage location={location} title="Login">
      <HeaderTextXL>Logging in. Please wait...</HeaderTextXL>
    </StyledLoginPage>
  )
}

export default LoginPage
