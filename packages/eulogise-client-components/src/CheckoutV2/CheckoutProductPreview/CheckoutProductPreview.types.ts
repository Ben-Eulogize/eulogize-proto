import {
  CheckoutProductPreviewType,
  EulogiseProduct,
  ICardProductData,
  ICardProductTheme,
} from '@eulogise/core'

export type CheckoutProductPreviewSingleAndPairProps = {
  cardProduct: ICardProductData
  productTheme: ICardProductTheme
  product: EulogiseProduct
  type?: CheckoutProductPreviewType
  className?: string
  scale?: number
  isReverse?: boolean
}
