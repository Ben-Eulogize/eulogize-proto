import React from 'react'
import {
  CardProductPreview,
  ICardProductPreviewProps,
} from '../CardProductPage'
import { CardProductViewDisplayMode } from '@eulogise/core'
import { ProductThumbnail } from '../ProductThumbnail/ProductThumbnail'

type ICardProductPageThumbnailProps = ICardProductPreviewProps

// Thumbnail size: 268 x 158
export const CardProductPageThumbnail = (
  props: ICardProductPageThumbnailProps,
) => (
  <ProductThumbnail
    product={props.product}
    pageSize={props.cardProduct.content.pageSize}
  >
    <CardProductPreview
      {...props}
      displayMode={CardProductViewDisplayMode.THUMBNAIL}
      bleed={false}
    />
  </ProductThumbnail>
)
