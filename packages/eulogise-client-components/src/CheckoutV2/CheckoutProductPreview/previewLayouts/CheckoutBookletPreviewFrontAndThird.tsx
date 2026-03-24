import React from 'react'
import styled from 'styled-components'
import { CheckoutProductPreviewSingleAndPairProps } from '../CheckoutProductPreview.types'
import { CheckoutCardProductPreviewPage } from '../CheckoutProductPreviewPage'
import { CardProductPageSize } from '@eulogise/core'

const StyledCheckoutBookletPreviewFrontAndThird = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const CheckoutBookletPreviewPageSingleFront = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  transform-origin: 0 0;
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 97px;
      left: 86px;
      transform: scale(0.96);
    `
      : `
      top: 97px;
      left: 86px;
      transform: scale(0.95);
    `}
  z-index: 1;
`

const CheckoutBookletPreviewPageSingleThird = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  transform-origin: 0 0;
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      transform: rotateX(9.6deg) rotateY(-22deg) rotateZ(0deg) scale(.96);
      top: 97px;
      left: 86px;
    `
      : `
      transform: rotateX(7.6deg) rotateY(-24deg) rotateZ(0deg) scale(.95);
      top: 97px;
      left: 86px;
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

export const CheckoutBookletPreviewFrontAndThird = (
  props: CheckoutProductPreviewSingleAndPairProps,
) => {
  const firstPageIndex = 0
  const { className, ...restProps } = props
  const cardProductContent = props.cardProduct.content
  const lastPageIndex = cardProductContent.pages.length - 1
  const pageSize = cardProductContent.pageSize
  return (
    <StyledCheckoutBookletPreviewFrontAndThird
      className={`${className} checkout-booklet-preview-front-and-third`}
    >
      <CheckoutBookletPreviewPageSingleFront
        className={`checkout-booklet-preview-front`}
        pageIndex={firstPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutBookletPreviewPageSingleThird
        className={`checkout-booklet-preview-back`}
        pageIndex={lastPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
    </StyledCheckoutBookletPreviewFrontAndThird>
  )
}
