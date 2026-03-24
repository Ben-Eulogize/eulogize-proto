import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageSize,
  EulogiseProduct,
  PRODUCT_THUMBNAIL_SIZE,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { EulogiseClientConfig } from '@eulogise/client-core'

type ICardProductPageThumbnailProps = {
  pageSize: CardProductPageSize
  children: React.ReactNode
  product: EulogiseProduct
  transformOrigin?: string
}

const StyledProductThumbnail = styled.div``

// Thumbnail size: 268 x 158
export const ProductThumbnail = (props: ICardProductPageThumbnailProps) => {
  const { product, children, pageSize, transformOrigin = 'top center' } = props
  const padding =
    product === EulogiseProduct.THANK_YOU_CARD
      ? 50
      : product === EulogiseProduct.TV_WELCOME_SCREEN ||
        product === EulogiseProduct.SLIDESHOW
      ? 50
      : 10 // in pixel
  const [width, height] = PRODUCT_THUMBNAIL_SIZE
  const scale = CardProductHelper.getProductThumbnailScaleByPageSize(
    pageSize,
    padding,
  )
  return (
    <StyledProductThumbnail
      style={{
        width,
        height,
        background: `url(${`${EulogiseClientConfig.AWS_S3_URL}/thumbnails/eulogize-wood-background.jpg`}) no-repeat`,
        backgroundSize: 'cover',
        padding: `${padding}px`,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin,
          ...(product === EulogiseProduct.BOOKMARK
            ? {
                display: 'flex',
                justifyContent: 'space-evenly',
              }
            : {}),
        }}
      >
        {children}
      </div>
    </StyledProductThumbnail>
  )
}
