import React, { useEffect } from 'react'
import { FontHelper } from '@eulogise/helpers'
import {
  CardProductPreview,
  ICardProductPreviewProps,
} from '../CardProductPage'

export const CardProductPageThumbnailStory = (
  cardProductPageStoryProps: ICardProductPreviewProps,
) => {
  useEffect(() => {
    FontHelper.loadCardProductFonts()
  }, [])
  return (
    <CardProductPreview
      {...cardProductPageStoryProps}
      hasSkippedOrFilledMemorialDataPullForm={true}
    />
  )
}
