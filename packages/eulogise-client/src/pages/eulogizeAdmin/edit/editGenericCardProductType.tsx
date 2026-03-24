import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../ui/components/Layout/Layout'
import { Title } from '@eulogise/client-components'
import EditGenericCardProductTypeForm from '../../../ui/containers/Admin/GenericCardProductType/EditGenericCardProductTypeForm'
import { EulogisePage } from '@eulogise/core'
import { UrlHelper } from '@eulogise/helpers'

const StyledLayout = styled(Layout)``

const AdminEditGenericCardProductTypePage: React.FunctionComponent<
  PageProps
> = ({ location }) => {
  const { genericCardProductTypeId }: { genericCardProductTypeId: string } =
    UrlHelper.getParams(
      EulogisePage.EULOGIZE_ADMIN_EDIT_GENERIC_CARD_PRODUCT_TYPE,
      location?.pathname,
    )

  if (!genericCardProductTypeId) {
    return (
      <StyledLayout title="Edit Generic Card Product Type" location={location}>
        <Title>Error: No Product Type ID provided</Title>
      </StyledLayout>
    )
  }

  return (
    <StyledLayout title="Edit Generic Card Product Type" location={location}>
      <Title>Edit Generic Card Product Type</Title>
      <EditGenericCardProductTypeForm
        genericCardProductTypeId={genericCardProductTypeId}
      />
    </StyledLayout>
  )
}

export default AdminEditGenericCardProductTypePage
