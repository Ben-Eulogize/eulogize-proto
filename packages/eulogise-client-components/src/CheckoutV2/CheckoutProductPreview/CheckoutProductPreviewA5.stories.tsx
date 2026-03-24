import {
  CheckoutProductPreview,
  ICheckoutProductPreviewProps,
} from './CheckoutProductPreview'
import {
  BOOKLET_THEMES,
  CheckoutProductPreviewType,
  EulogiseProduct,
} from '@eulogise/core'
import { MOCK_BOOKLET_A5_WITH_OVERLAY } from '@eulogise/mock'
import { CheckoutProductPreviewTemplate } from './CheckoutProductPreviewTemplate'

export default {
  title: 'Checkout V2/CheckoutProductPreview/A5',
  component: CheckoutProductPreview,
  argTypes: {},
}

const A5Template = ({
  product,
  type,
  isReverse,
}: {
  product: EulogiseProduct
  type: CheckoutProductPreviewType
  isReverse?: boolean
}) => {
  const cardProduct = MOCK_BOOKLET_A5_WITH_OVERLAY
  const themeId = cardProduct.content.theme
  const productTheme = BOOKLET_THEMES.find((t) => t.id === themeId)!
  const previewProps: ICheckoutProductPreviewProps = {
    cardProduct,
    productTheme,
    product,
    type,
    isReverse,
  }
  return <CheckoutProductPreviewTemplate {...previewProps} />
}

export const SidedCardA5Preview = () => {
  return (
    <A5Template
      product={EulogiseProduct.SIDED_CARD}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
    />
  )
}

export const SidedCardA5PreviewReverse = () => {
  return (
    <A5Template
      product={EulogiseProduct.SIDED_CARD}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
      isReverse={true}
    />
  )
}

export const ProgramA5FrontAndBackPagesPreview = () => {
  return (
    <A5Template
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
    />
  )
}

export const ProgramA5InternalPagesPreview = () => {
  return (
    <A5Template
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_LAST_WITH_INTERNALS}
    />
  )
}

export const ProgramLetterFrontAndThirdPagesPreview = () => {
  return (
    <A5Template
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_THIRD}
    />
  )
}
