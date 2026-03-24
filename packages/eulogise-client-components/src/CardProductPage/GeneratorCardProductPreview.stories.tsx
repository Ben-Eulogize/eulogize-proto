import { GeneratorCardProductPreview } from './GeneratorCardProductPreview'
import { MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1 } from '@eulogise/mock'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
  PHOTOBOOK_DEFAULT_THEME,
} from '@eulogise/core'

export default {
  title: 'CardProductPage/GeneratorCardProductPreview',
  component: GeneratorCardProductPreview,
  argTypes: {},
}

export const Default = () => {
  return (
    <GeneratorCardProductPreview
      cardProduct={MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1}
      product={EulogiseProduct.PHOTOBOOK}
      productTheme={PHOTOBOOK_DEFAULT_THEME}
      bleed
      displayMode={CardProductViewDisplayMode.PRINT}
    />
  )
}

export const SinglePage = () => {
  return (
    <GeneratorCardProductPreview
      cardProduct={MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1}
      product={EulogiseProduct.PHOTOBOOK}
      productTheme={PHOTOBOOK_DEFAULT_THEME}
      bleed
      displayMode={CardProductViewDisplayMode.PRINT}
      pageMode={CardProductPageMode.SINGLE_PAGE}
    />
  )
}
