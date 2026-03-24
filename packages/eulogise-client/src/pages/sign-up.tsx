import React from 'react'
import { PageProps } from 'gatsby'
import { ResponsiveSignUpPage } from '../ui/containers/Auth/SignUp/ResponsiveSignUpPage'

const SignUpPage: React.FunctionComponent<PageProps> = ({ location }) => {
  return <ResponsiveSignUpPage location={location} />
}

export default SignUpPage
