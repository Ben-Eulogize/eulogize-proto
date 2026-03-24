import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageSize,
  EulogiseProduct,
  GetImageObject,
  PAGE_SIZES,
} from '@eulogise/core'
import { ProductThumbnail } from '../ProductThumbnail/ProductThumbnail'
import { ImageHelper } from '@eulogise/helpers'

const [width, height] = PAGE_SIZES.TV_WELCOME_SCREEN

const StyledSlideshowThumbnail = styled.div<{ backgroundImageUrl: string }>`
  width: ${width}px;
  height: ${height}px;
  background: url('${({ backgroundImageUrl }) => backgroundImageUrl}') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledImage = styled.img``

export const SlideshowThumbnail = ({
  backgroundImage,
  image,
}: {
  backgroundImage: GetImageObject
  image: GetImageObject
}) => {
  const backgroundImageUrl = ImageHelper.getImageUrl(backgroundImage)!
  const imageUrl = ImageHelper.getImageUrl(image)!
  return (
    <ProductThumbnail
      product={EulogiseProduct.SLIDESHOW}
      pageSize={CardProductPageSize.TV_WELCOME_SCREEN}
      transformOrigin="top left"
    >
      <StyledSlideshowThumbnail backgroundImageUrl={backgroundImageUrl}>
        <StyledImage src={imageUrl} />
      </StyledSlideshowThumbnail>
    </ProductThumbnail>
  )
}
