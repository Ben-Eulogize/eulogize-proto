import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../ui/components/Layout/Layout'
import {
  ADMIN_CREATE_A_NEW_CASE_TITLE,
  ADMIN_CREATE_A_NEW_CASE_SUBTITLE,
} from '@eulogise/core'
import { Text, TextSize, Title } from '@eulogise/client-components'
import AdminCreateCaseForm from '../../../ui/containers/Admin/CreateCase/AdminCreateCaseForm'

const StyledCaseAdd = styled(Layout)``

const StyledSubTitleText = styled(Text)``

const StyledSubTitleTextDiv = styled.div`
  text-align: center;
`

const AdminCreateCase: React.FunctionComponent<PageProps> = ({ location }) => {
  return (
    <StyledCaseAdd title="Create a new case" location={location}>
      <Title children={ADMIN_CREATE_A_NEW_CASE_TITLE} />
      <StyledSubTitleTextDiv>
        <StyledSubTitleText size={TextSize.SMALL}>
          {ADMIN_CREATE_A_NEW_CASE_SUBTITLE}
        </StyledSubTitleText>
      </StyledSubTitleTextDiv>
      <AdminCreateCaseForm initialData={null} caseId={null} />
    </StyledCaseAdd>
  )
}

export default AdminCreateCase
