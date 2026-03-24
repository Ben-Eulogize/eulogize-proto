import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../ui/components/Layout/Layout'
import { Title } from '@eulogise/client-components'
import CreateGenericCardProductTypeForm from '../../../ui/containers/Admin/GenericCardProductType/CreateGenericCardProductTypeForm'

const StyledLayout = styled(Layout)``

const AdminCreateGenericCardProductTypePage: React.FunctionComponent<
  PageProps
> = ({ location }) => {
  return (
    <StyledLayout title="Create Generic Print Product Type" location={location}>
      <Title>Create Generic Print Product Type</Title>
      <CreateGenericCardProductTypeForm />
    </StyledLayout>
  )
}

export default AdminCreateGenericCardProductTypePage
