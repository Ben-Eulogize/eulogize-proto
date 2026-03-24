import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const BookmarksPage: React.FunctionComponent<PageProps> = ({ location }) => (
  <CardProductPageLayout
    product={EulogiseProduct.BOOKMARK}
    location={location}
  />
)

export default BookmarksPage
