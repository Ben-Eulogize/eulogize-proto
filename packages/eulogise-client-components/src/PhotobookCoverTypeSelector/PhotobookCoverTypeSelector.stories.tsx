import { PhotobookCoverTypeSelector } from './PhotobookCoverTypeSelector'
import { useState } from 'react'
import {
  CardProductPageSize,
  EulogiseCountry,
  EulogisePhotobookCoverType,
} from '@eulogise/core'

export default {
  title: 'Photobook/PhotobookCoverTypeSelector',
  component: PhotobookCoverTypeSelector,
  argTypes: {},
}

export const ClassicMedium = () => {
  const [coverType, setCoverType] = useState(
    EulogisePhotobookCoverType.BABY_BLUE,
  )
  return (
    <PhotobookCoverTypeSelector
      value={coverType}
      onChange={(ct) => setCoverType(ct)}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM}
      country={EulogiseCountry.UNITED_STATES}
    />
  )
}

export const ClassicLarge = () => {
  const [coverType, setCoverType] = useState(
    EulogisePhotobookCoverType.PALE_PINK,
  )
  return (
    <PhotobookCoverTypeSelector
      value={coverType}
      onChange={(ct) => setCoverType(ct)}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE}
      country={EulogiseCountry.UNITED_STATES}
    />
  )
}

export const PremiumMedium = () => {
  const [coverType, setCoverType] = useState(
    EulogisePhotobookCoverType.STONE_LINEN,
  )
  return (
    <PhotobookCoverTypeSelector
      value={coverType}
      onChange={(ct) => setCoverType(ct)}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM}
      country={EulogiseCountry.UNITED_STATES}
    />
  )
}

export const PremiumLarge = () => {
  const [coverType, setCoverType] = useState(
    EulogisePhotobookCoverType.BLUSH_LINEN,
  )
  return (
    <PhotobookCoverTypeSelector
      value={coverType}
      onChange={(ct) => setCoverType(ct)}
      pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE}
      country={EulogiseCountry.UNITED_STATES}
    />
  )
}
