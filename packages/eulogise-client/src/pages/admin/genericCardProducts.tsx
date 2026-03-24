import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'
import {
  useEulogiseDispatch,
  useGenericCardProductTypeByPathname,
} from '../../ui/store/hooks'
import { Spin } from '@eulogise/client-components'
import { fetchGenericCardProductTypes } from '../../ui/store/GenericCardProductTypeState'

const GenericCardProductPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const dispatch = useEulogiseDispatch()
  const { genericProductType, slug } = useGenericCardProductTypeByPathname(
    location.pathname,
  )

  if (!genericProductType) {
    return <Spin />
  }
  return (
    <CardProductPageLayout
      slug={slug}
      product={EulogiseProduct.GENERIC_CARD_PRODUCT}
      location={location}
      genericProductType={genericProductType}
    />
  )
}

export default GenericCardProductPage
