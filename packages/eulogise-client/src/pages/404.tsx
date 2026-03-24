import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { PreLoggedInLayout } from '../ui/components/Layout/PreLoggedInLayout'
import { HeaderTextXL } from '@eulogise/client-components'

const StyledNotFoundPage = styled(PreLoggedInLayout)`
  text-align: center;
`

const NotFoundPage: React.FunctionComponent<PageProps> = ({ location }) => (
  <StyledNotFoundPage title="Not found page" location={location}>
    <HeaderTextXL>Page not found</HeaderTextXL>
  </StyledNotFoundPage>
)

export default NotFoundPage
