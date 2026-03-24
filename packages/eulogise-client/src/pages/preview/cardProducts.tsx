import React from 'react'
import { PageProps } from 'gatsby'
import BaseCardProductInvitePreviewPage from '../../ui/containers/Preview/BaseCardProductInvitePreviewPage'
import { UrlHelper } from '@eulogise/helpers'
import { EulogisePage, EulogiseProduct } from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

const PreviewCardProductPage: React.FunctionComponent<PageProps> = ({
  location,
}) => {
  const { product } = UrlHelper.getParams(
    EulogisePage.PREVIEW_CARD_PRODUCT,
    location,
  )
  return (
    <BaseCardProductInvitePreviewPage
      location={location}
      product={
        CardProductHelper.isCardProduct(product)
          ? (product as EulogiseProduct)
          : EulogiseProduct.GENERIC_CARD_PRODUCT
      }
      slug={product as string}
    />
  )
}

export default PreviewCardProductPage
