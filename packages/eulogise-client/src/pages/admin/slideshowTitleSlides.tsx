import React from 'react'
import { PageProps } from 'gatsby'
import { EulogiseProduct } from '@eulogise/core'
import CardProductPageLayout from '../../ui/components/Layout/CardProductPageLayout'

const SlideshowTitleSlidePage: React.FunctionComponent<PageProps> = ({
  location,
}) => (
  <CardProductPageLayout
    product={EulogiseProduct.SLIDESHOW_TITLE_SLIDE}
    location={location}
  />
)

export default SlideshowTitleSlidePage
