import React from 'react'
import styled from 'styled-components'
import { CheckoutProductPreviewSingleAndPairProps } from '../CheckoutProductPreview.types'
import { CheckoutCardProductPreviewPage } from '../CheckoutProductPreviewPage'
import { CardProductPageSize } from '@eulogise/core'

const StyledCheckoutBookletPreviewFrontAndLast = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const CheckoutBookletPreviewPageFront = styled(CheckoutCardProductPreviewPage)<{
  $pageSize: CardProductPageSize
}>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      transform: rotateX(21.6deg) rotateY(-52deg) rotateZ(0deg) scale(0.75);
      left: 194px;
      top: 47px;
    `
      : `
    transform: rotateX(21.6deg) rotateY(-52deg) rotateZ(0deg) scale(0.71);
    left: 181px;
    top: 43px;
    `}
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #33333322;
    z-index: 1;
  }
`

const CheckoutBookletPreviewPageBack = styled(CheckoutCardProductPreviewPage)<{
  $pageSize: CardProductPageSize
}>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 47px;
      left: 10px;
      transform: rotateX(-22deg) rotateY(-51.4deg) rotateZ(0deg) scale(0.75);
    `
      : `
      top: 43px;
      left: -4px;
      transform: rotateX(-22deg) rotateY(-51.4deg) rotateZ(0deg) scale(0.71);
    `}
`

export const CheckoutBookletPreviewFrontAndLast = (
  props: CheckoutProductPreviewSingleAndPairProps,
) => {
  const firstPageIndex = 0
  const { className, ...restProps } = props
  const cardProductContent = props.cardProduct.content
  const lastPageIndex = cardProductContent.pages.length - 1
  const pageSize = cardProductContent.pageSize
  return (
    <StyledCheckoutBookletPreviewFrontAndLast
      className={`${className} checkout-booklet-preview-front-and-last`}
    >
      <CheckoutBookletPreviewPageFront
        className={`checkout-booklet-preview-front`}
        pageIndex={firstPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutBookletPreviewPageBack
        className={`checkout-booklet-preview-back`}
        pageIndex={lastPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
    </StyledCheckoutBookletPreviewFrontAndLast>
  )
}
