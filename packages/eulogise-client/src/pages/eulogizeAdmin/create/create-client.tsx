import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../ui/components/Layout/Layout'
import { Title } from '@eulogise/client-components'
import { ADMIN_CREATE_EDIT_CLIENT_PAGE_TITLE } from '@eulogise/core'
import CreateNewClientForm from '../../../ui/containers/Admin/CreateNewClient/CreateNewClientForm'

const StyledClientEditLayout = styled(Layout)``

const AdminCreateOrEditClientPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  return (
    <StyledClientEditLayout
      title={ADMIN_CREATE_EDIT_CLIENT_PAGE_TITLE}
      location={location}
    >
      <Title children={ADMIN_CREATE_EDIT_CLIENT_PAGE_TITLE} />
      <CreateNewClientForm />
    </StyledClientEditLayout>
  )
}

export default AdminCreateOrEditClientPage
