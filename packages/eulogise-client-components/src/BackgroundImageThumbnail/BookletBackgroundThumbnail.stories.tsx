import React from 'react'
import { BookletBackgroundThumbnail } from './BookletBackgroundThumbnail'
import { BookmarkBackgroundThumbnail } from './BookmarkBackgroundThumbnail'
import { ThankYouCardBackgroundThumbnail } from './ThankYouCardBackgroundThumbnail'
import { TvWelcomeScreenBackgroundThumbnail } from './TvWelcomeScreenBackgroundThumbnail'
import { SlideshowBackgroundThumbnail } from './SlideshowBackgroundThumbnail'

export default {
  title: 'BackgroundImageThumbnail',
  component: BookletBackgroundThumbnail,
  argTypes: {},
}

export const DefaultBookletBackgroundThumbnail = () => (
  <BookletBackgroundThumbnail backgroundId="Fall_Flowers" />
)

export const DefaultBookmarkBackgroundThumbnail = () => (
  <BookmarkBackgroundThumbnail backgroundId="Fall_Flowers" />
)

export const DefaultThankYouCardBackgroundThumbnail = () => (
  <ThankYouCardBackgroundThumbnail backgroundId="Fall_Flowers" />
)
export const DefaultTvWelcomeScreenBackgroundThumbnail = () => (
  <TvWelcomeScreenBackgroundThumbnail backgroundId="Fall_Flowers" />
)

export const DefaultSlideshowScreenBackgroundThumbnail = () => (
  <SlideshowBackgroundThumbnail backgroundId="Botanical" />
)
