import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const SidedCardsPage: React.FunctionComponent<PageProps> = ({ location }) => (
  <CardProductPageLayout
    product={EulogiseProduct.SIDED_CARD}
    location={location}
  />
)

export default SidedCardsPage
