import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../ui/components/Layout/Layout'
import { Title } from '@eulogise/client-components'
import { ADMIN_EDIT_A_CLIENT_TITLE, EulogisePage } from '@eulogise/core'
import { EditClientFormNew } from '../../../ui/containers/Admin/EditClient/EditClientFormNew'
import { UrlHelper } from '@eulogise/helpers'

const StyledClientEdit = styled(Layout)``

const AdminEditClientNew: React.FunctionComponent<PageProps> = ({
  location,
  params,
}) => {
  const { clientId }: { clientId: string } = UrlHelper.getParams(
    EulogisePage.EULOGIZE_ADMIN_EDIT_CLIENT,
    location?.pathname,
  )
  return (
    <StyledClientEdit title={ADMIN_EDIT_A_CLIENT_TITLE} location={location}>
      <Title children={ADMIN_EDIT_A_CLIENT_TITLE} />
      <EditClientFormNew clientId={clientId} />
    </StyledClientEdit>
  )
}

export default AdminEditClientNew
