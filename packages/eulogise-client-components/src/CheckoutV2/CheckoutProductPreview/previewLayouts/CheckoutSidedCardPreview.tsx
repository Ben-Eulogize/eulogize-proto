import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageSize,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'
import { CheckoutCardProductPreviewPage } from '../CheckoutProductPreviewPage'

const StyledCheckoutSidedCardPreview = styled.div``

type CheckoutSidedCardPreviewProps = {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  className?: string
  scale?: number
  isReverse?: boolean
}

const CheckoutSidedCardPreviewPageFront = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 72px;
      left: 32px;
      transform: scale(0.71);
    `
      : `
      top: 80px;
      left: 19px;
      transform: scale(0.63);
    `}
  box-shadow: 72px 0 40px #66666622;
`

const CheckoutSidedCardPreviewPageBack = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 50px;
      left: 185px;
      transform: scale(0.71);
    `
      : `
      top: 62px;
      left: 178px;
      transform: scale(0.63);
    `}
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #aaaaaa22;
    z-index: 3;
  }
`
export const CheckoutSidedCardPreview = (
  props: CheckoutSidedCardPreviewProps,
) => {
  const firstPageIndex = 0
  const { className, isReverse, ...restProps } = props
  const cardProductContent = props.cardProduct.content
  const pageSize = cardProductContent.pageSize
  const lastPageIndex = cardProductContent.pages.length - 1
  return (
    <StyledCheckoutSidedCardPreview
      className={`${className} checkout-sided-card-preview-single`}
    >
      <CheckoutSidedCardPreviewPageBack
        className={`checkout-sided-card-preview-page-back`}
        pageIndex={isReverse ? firstPageIndex : lastPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutSidedCardPreviewPageFront
        className={`checkout-sided-card-preview-page-front`}
        pageIndex={isReverse ? lastPageIndex : firstPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
    </StyledCheckoutSidedCardPreview>
  )
}
