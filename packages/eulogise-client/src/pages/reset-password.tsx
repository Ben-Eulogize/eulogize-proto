import React from 'react'
import { PageProps } from 'gatsby'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import { Title } from '@eulogise/client-components'
import ResetPasswordForm from '../ui/containers/Auth/ResetPassword/ResetPasswordForm'

const ResetPasswordPage = ({ location }: PageProps) => {
  return (
    <PreLoggedInLayout title="Reset password" location={location}>
      <Title>Reset password</Title>
      <ResetPasswordForm />
    </PreLoggedInLayout>
  )
}

export default ResetPasswordPage
