import { MOCK_BOOKLET_HALF_LETTER_1 } from '@eulogise/mock'
import {
  BOOKLET_THEMES,
  CheckoutProductPreviewType,
  EulogiseProduct,
} from '@eulogise/core'
import {
  CheckoutProductPreview,
  ICheckoutProductPreviewProps,
} from './CheckoutProductPreview'
import { CheckoutProductPreviewTemplate } from './CheckoutProductPreviewTemplate'

export default {
  title: 'Checkout V2/CheckoutProductPreview/HalfLetter',
  component: CheckoutProductPreview,
  argTypes: {},
}

const HalfLetterTemplate = ({
  product,
  type,
  isReverse,
}: {
  product: EulogiseProduct
  type: CheckoutProductPreviewType
  isReverse?: boolean
}) => {
  const cardProduct = MOCK_BOOKLET_HALF_LETTER_1
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

export const SidedCardLetterPreview = () => {
  return (
    <HalfLetterTemplate
      product={EulogiseProduct.SIDED_CARD}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
    />
  )
}

export const SidedCardLetterPreviewReverse = () => {
  return (
    <HalfLetterTemplate
      product={EulogiseProduct.SIDED_CARD}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
      isReverse={true}
    />
  )
}

export const ProgramLetterFrontAndBackPagesPreview = () => {
  return (
    <HalfLetterTemplate
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_LAST}
    />
  )
}

export const ProgramLetterInternalPagesPreview = () => {
  return (
    <HalfLetterTemplate
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_LAST_WITH_INTERNALS}
    />
  )
}

export const ProgramLetterFrontAndThirdPagesPreview = () => {
  return (
    <HalfLetterTemplate
      product={EulogiseProduct.BOOKLET}
      type={CheckoutProductPreviewType.FRONT_AND_THIRD}
    />
  )
}
