import React from 'react'
import styled from 'styled-components'
import { CheckoutHelper } from '@eulogise/helpers'
import { CheckoutProductPreviewSingleAndPairProps } from './CheckoutProductPreview.types'
import { CheckoutCardProductPreview } from './previewLayouts/CheckoutCardProductPreview'

const StyledCheckoutProductPreview = styled.div<{
  $width: number
}>`
  ${({ $width }) => `width: ${$width}px;`}
  position: relative;
`

const ProductPreviewImage = styled.img`
  width: 100%;
`

export type ICheckoutProductPreviewProps =
  CheckoutProductPreviewSingleAndPairProps & {
    width?: number
  }

export const CheckoutProductPreview = (props: ICheckoutProductPreviewProps) => {
  const baseWidth = 600
  const { width = baseWidth, ...itemProps } = props
  const product = itemProps.product
  const cardProduct = itemProps.cardProduct
  const type = itemProps.type
  const pageSize = cardProduct.content.pageSize
  const scale = width / baseWidth

  return (
    <StyledCheckoutProductPreview
      $width={width}
      className={`checkout-product-preview`}
    >
      <CheckoutCardProductPreview {...itemProps} scale={scale} />
      <ProductPreviewImage
        className={`checkout-product-preview-image`}
        src={`${CheckoutHelper.getCheckoutPreviewBaseUrl({
          product,
          pageSize,
          type,
        })}`}
      />
    </StyledCheckoutProductPreview>
  )
}
