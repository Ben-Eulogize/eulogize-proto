import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const ThankYouCardsPage: React.FunctionComponent<PageProps> = ({
  location,
}) => (
  <CardProductPageLayout
    product={EulogiseProduct.THANK_YOU_CARD}
    location={location}
  />
)

export default ThankYouCardsPage
