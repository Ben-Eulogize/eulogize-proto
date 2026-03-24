import React from 'react'

import { PhotobookCoverPagePreview } from './PhotobookCoverPagePreview'
import {
  CardProductPageSize,
  EulogiseCountry,
  EulogisePhotobookCoverType,
  MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
  MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT,
  MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY,
} from '@eulogise/core'
import { PhotobookCoverTypeSelector } from '../PhotobookCoverTypeSelector'

export default {
  title: 'Photobook/PhotobookCoverPagePreview',
  component: PhotobookCoverPagePreview,
  argTypes: {},
}

export const ClassicMediumImageOnly = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SAND,
  )
  const pageSize = CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY}
        coverType={coverType}
        pageSize={pageSize}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        pageSize={pageSize}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const ClassicMediumImageWithText = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SAND,
  )
  const pageSize = CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_MEDIUM
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_CLASSIC_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT}
        coverType={coverType}
        pageSize={pageSize}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        pageSize={pageSize}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const ClassicLargeImageOnly = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SAND,
  )
  const pageSize = CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY}
        coverType={coverType}
        pageSize={pageSize}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        pageSize={pageSize}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const ClassicLargeImageWithText = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SAND,
  )
  const pageSize = CardProductPageSize.PHOTOBOOK_MILK_CLASSIC_LARGE
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_CLASSIC_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT}
        coverType={coverType}
        pageSize={pageSize}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        pageSize={pageSize}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const PremiumMediumImageOnly = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SALT_LINEN,
  )
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_ONLY}
        coverType={coverType}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const PremiumMediumImageWithText = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SALT_LINEN,
  )
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_PREMIUM_MEDIUM_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT}
        coverType={coverType}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const PremiumLargeImageOnly = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SALT_LINEN,
  )
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_ONLY}
        coverType={coverType}
        pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}

export const PremiumLargeImageWithText = () => {
  const [coverType, setCoverType] = React.useState(
    EulogisePhotobookCoverType.SALT_LINEN,
  )
  return (
    <div>
      <PhotobookCoverPagePreview
        layout={MILK_PREMIUM_LARGE_COVER_PAGE_LANDSCAPE_IMAGE_AND_TEXT}
        coverType={coverType}
        pageSize={CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_LARGE}
      />
      <PhotobookCoverTypeSelector
        value={coverType}
        onChange={(ct) => {
          setCoverType(ct)
        }}
        country={EulogiseCountry.UNITED_STATES}
      />
    </div>
  )
}
