import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { Notification } from '@eulogise/client-components'
import { PreLoggedInLayout } from '../../ui/components/Layout/PreLoggedInLayout'
import { NavigationHelper, UrlHelper } from '@eulogise/helpers'
import { verifyEmail } from '../../ui/store/AuthState/actions'
import { useEulogiseDispatch } from '../../ui/store/hooks'
import { EulogisePage } from '@eulogise/core'

const StyledRegisterConfirmPage = styled(PreLoggedInLayout)`
  text-align: center;
`

const RegisterConfirmPage = ({ location }: PageProps) => {
  const dispatch = useEulogiseDispatch()
  const token: string = UrlHelper.getQueryParam('token', location.search)

  useEffect(() => {
    if (!token) {
      NavigationHelper.navigate(EulogisePage.SIGN_IN)
      return
    }
    dispatch(
      verifyEmail({
        token,
        onSuccess: () => {
          Notification.success('Your email has been verified successfully')
          NavigationHelper.navigate(EulogisePage.SIGN_IN)
        },
        onFailed: () => {
          Notification.error('Email verification Failed.')
          NavigationHelper.navigate(EulogisePage.SIGN_IN)
        },
      }),
    )
  }, [token, dispatch])

  if (!token) {
    return null
  }
  return (
    <StyledRegisterConfirmPage title="Register " location={location}>
      Verifying your email
    </StyledRegisterConfirmPage>
  )
}

export default RegisterConfirmPage
