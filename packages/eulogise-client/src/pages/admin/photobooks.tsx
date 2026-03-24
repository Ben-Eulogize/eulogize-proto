import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const PhotobooksPage = ({ location }: PageProps) => (
  <CardProductPageLayout
    product={EulogiseProduct.PHOTOBOOK}
    location={location}
  />
)

export default PhotobooksPage
