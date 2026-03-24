import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const BookletsPage = ({ location }: PageProps) => (
  <CardProductPageLayout
    product={EulogiseProduct.BOOKLET}
    location={location}
  />
)

export default BookletsPage
