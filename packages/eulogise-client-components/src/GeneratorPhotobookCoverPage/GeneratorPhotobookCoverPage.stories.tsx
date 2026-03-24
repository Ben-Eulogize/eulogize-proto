import { GeneratorPhotobookCoverPage } from './GeneratorPhotobookCoverPage'
import {
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1,
  MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_WITH_TEXT_COVER,
} from '@eulogise/mock'
import { CardProductPageSize } from '@eulogise/core'

export default {
  title: 'Photobook/GeneratorPhotobookCoverPage',
  component: GeneratorPhotobookCoverPage,
  argTypes: {},
}

export const PremiumMediumWithImageOnly = () => {
  return (
    <GeneratorPhotobookCoverPage
      cardProduct={MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER}
    />
  )
}

export const PremiumMediumWithTextAndImage = () => {
  return (
    <GeneratorPhotobookCoverPage
      cardProduct={MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_WITH_TEXT_COVER}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM_COVER}
    />
  )
}
