import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const TvWelcomeScreenPage: React.FunctionComponent<PageProps> = ({
  location,
}) => (
  <CardProductPageLayout
    product={EulogiseProduct.TV_WELCOME_SCREEN}
    location={location}
  />
)

export default TvWelcomeScreenPage
