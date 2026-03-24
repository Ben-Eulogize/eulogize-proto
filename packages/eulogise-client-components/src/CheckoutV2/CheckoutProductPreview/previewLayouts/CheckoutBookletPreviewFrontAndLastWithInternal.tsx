import React from 'react'
import styled from 'styled-components'
import { CheckoutProductPreviewSingleAndPairProps } from '../CheckoutProductPreview.types'
import { CheckoutCardProductPreviewPage } from '../CheckoutProductPreviewPage'
import { CardProductPageSize } from '@eulogise/core'

const StyledCheckoutBookletPreviewFrontAndLastWithInternals = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const CheckoutBookletPreviewPagePairFront = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      transform: rotateX(21.6deg) rotateY(-48deg) rotateZ(0deg) scale(0.561);
      left: 61px;
      top: 6px;
    `
      : `
    transform: rotateX(21.6deg) rotateY(-48deg) rotateZ(0deg) scale(0.5);
    left: 46px;
    top: 11px;
    `}
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #33333315;
    z-index: 1;
  }
`

const CheckoutBookletPreviewPagePairBack = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 5px;
      left: -88px;
      transform: rotateX(-22deg) rotateY(-48deg) rotateZ(0deg) scale(0.565);
    `
      : `
    top: 11px;
    left: -96px;
    transform: rotateX(-22deg) rotateY(-47deg) rotateZ(0deg) scale(0.5);
    `}
`

const CheckoutBookletPreviewPageSecondPage = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
      top: 104px;
      left: 152px;
      transform: rotateX(21.6deg) rotateY(-54deg) rotateZ(0deg) scale(0.6);
    `
      : `
      top: 109px;
      left: 140px;
      transform: rotateX(21.6deg) rotateY(-53deg) rotateZ(0deg) scale(0.55);
    `}
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #33333325;
    z-index: 1;
  }
`

const CheckoutBookletPreviewPageSecondLast = styled(
  CheckoutCardProductPreviewPage,
)<{ $pageSize: CardProductPageSize }>`
  ${({ $pageSize }) =>
    $pageSize === CardProductPageSize.HALF_LETTER_A5
      ? `
    top: 104px;
    left: 293px;
    transform: rotateX(-22deg) rotateY(-53deg) rotateZ(0deg) scale(0.6);
    `
      : `
    top: 109px;
    left: 281px;
    transform: rotateX(-22deg) rotateY(-52deg) rotateZ(0deg) scale(0.55);
      `}
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #33333315;
    z-index: 1;
  }
`

export const CheckoutBookletPreviewFrontAndLastWithInternal = (
  props: CheckoutProductPreviewSingleAndPairProps,
) => {
  const { className, ...restProps } = props
  const firstPageIndex = 0
  const secondPageIndex = 1
  const cardProductContent = props.cardProduct.content
  const pageSize = cardProductContent.pageSize
  const pages = cardProductContent.pages
  const lastPageIndex = pages.length - 1
  const secondLastPageIndex = pages.length - 2
  return (
    <StyledCheckoutBookletPreviewFrontAndLastWithInternals
      className={`${className} checkout-booklet-preview-front-and-last-with-internals`}
    >
      <CheckoutBookletPreviewPagePairFront
        pageIndex={firstPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutBookletPreviewPagePairBack
        pageIndex={lastPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutBookletPreviewPageSecondPage
        pageIndex={secondPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
      <CheckoutBookletPreviewPageSecondLast
        pageIndex={secondLastPageIndex}
        {...restProps}
        $pageSize={pageSize}
      />
    </StyledCheckoutBookletPreviewFrontAndLastWithInternals>
  )
}
