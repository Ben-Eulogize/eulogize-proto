import React from 'react'
import { PageProps } from 'gatsby'
import { ResponsiveLoginPage } from '../ui/containers/Auth/Login/ResponsiveLoginPage'

const LoginPage: React.FunctionComponent<PageProps> = ({ location }) => {
  return <ResponsiveLoginPage location={location} />
}

export default LoginPage
