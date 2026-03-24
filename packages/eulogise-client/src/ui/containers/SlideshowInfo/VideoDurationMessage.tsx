import React from 'react'
import { DateTimeHelper, SlideshowHelper } from '@eulogise/helpers'
import { ISlideshowData, ISlideshowTheme } from '@eulogise/core'

export const VideoDurationMessage = ({
  slideshowData,
  slideshowTheme,
  noTitle,
}: {
  slideshowData: ISlideshowData
  slideshowTheme: ISlideshowTheme
  noTitle: boolean
}) => {
  const { duration } = SlideshowHelper.getSlideshowDurations({
    slideshowData,
    slideshowTheme,
  })
  const hasImageSlides: boolean =
    SlideshowHelper.getTotalImageSlides(slideshowData!) > 0
  return (
    <div>
      {noTitle ? `` : `Video Duration: `}
      {hasImageSlides
        ? DateTimeHelper.formatWithMinsAndSecondsText(duration)
        : 'N/A'}
    </div>
  )
}
