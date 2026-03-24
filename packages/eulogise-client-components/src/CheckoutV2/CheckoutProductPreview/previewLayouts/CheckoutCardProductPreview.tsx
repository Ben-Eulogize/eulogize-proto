import React from 'react'
import styled from 'styled-components'
import { CheckoutBookletPreviewFrontAndLastWithInternal } from './CheckoutBookletPreviewFrontAndLastWithInternal'
import { CheckoutBookletPreviewFrontAndLast } from './CheckoutBookletPreviewFrontAndLast'
import { CheckoutProductPreviewSingleAndPairProps } from '../CheckoutProductPreview.types'
import { CheckoutProductPreviewType, EulogiseProduct } from '@eulogise/core'
import { CheckoutSidedCardPreview } from './CheckoutSidedCardPreview'
import { CheckoutBookletPreviewFrontAndThird } from './CheckoutBookletPreviewFrontAndThird'

const cardProductCheckoutStyle = ({ $scale }: { $scale: number }) => {
  return `
    transform-origin: top left;
    ${$scale !== undefined ? `transform: scale(${$scale});` : ''}
  `
}

const StyledCheckoutBookletPreviewFrontAndLast = styled(
  CheckoutBookletPreviewFrontAndLast,
)<{ $scale: number }>`
  ${cardProductCheckoutStyle}
`

const StyledCheckoutBookletPreviewFrontAndLastWithInternal = styled(
  CheckoutBookletPreviewFrontAndLastWithInternal,
)<{
  $scale: number
}>`
  ${cardProductCheckoutStyle}
`

const StyledCheckoutBookletPreviewFrontAndThird = styled(
  CheckoutBookletPreviewFrontAndThird,
)<{
  $scale: number
}>`
  ${cardProductCheckoutStyle}
`

const StyledCheckoutSidedCardPreview = styled(CheckoutSidedCardPreview)`
  ${cardProductCheckoutStyle}
`

type ICheckoutBookletPreviewProps = CheckoutProductPreviewSingleAndPairProps & {
  scale: number
}

export const CheckoutCardProductPreview = ({
  scale,
  ...itemProps
}: ICheckoutBookletPreviewProps) => {
  const product = itemProps.product
  const type = itemProps.type ?? CheckoutProductPreviewType.FRONT_AND_LAST
  switch (type) {
    case CheckoutProductPreviewType.FRONT_AND_LAST: {
      if (product === EulogiseProduct.BOOKLET) {
        return (
          <StyledCheckoutBookletPreviewFrontAndLast
            className={`checkout-booklet-preview-front-and-last`}
            {...itemProps}
            $scale={scale}
          />
        )
      } else if (product === EulogiseProduct.SIDED_CARD) {
        return (
          <StyledCheckoutSidedCardPreview
            className={`checkout-sided-card-preview`}
            {...itemProps}
            $scale={scale}
          />
        )
      }
    }
    case CheckoutProductPreviewType.FRONT_AND_LAST_WITH_INTERNALS: {
      if (product === EulogiseProduct.BOOKLET) {
        return (
          <StyledCheckoutBookletPreviewFrontAndLastWithInternal
            className={`checkout-booklet-preview-front-and-last-with-internal`}
            {...itemProps}
            $scale={scale}
          />
        )
      }
      throw new Error('Invalid preview type')
    }
    case CheckoutProductPreviewType.FRONT_AND_THIRD: {
      if (product === EulogiseProduct.BOOKLET) {
        return (
          <StyledCheckoutBookletPreviewFrontAndThird
            className={`checkout-booklet-preview-front-and-third`}
            {...itemProps}
            $scale={scale}
          />
        )
      }
      throw new Error('Invalid preview type')
    }
  }
  throw new Error('Invalid preview type')
}
