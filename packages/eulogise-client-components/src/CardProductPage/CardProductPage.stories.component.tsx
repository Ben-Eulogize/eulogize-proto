import React, { useEffect } from 'react'
import { FontHelper } from '@eulogise/helpers'
import {
  CardProductPreview,
  ICardProductPreviewProps,
} from './CardProductPreview'
import {
  CardProductPageMode,
  CardProductViewDisplayMode,
  EulogiseProduct,
} from '@eulogise/core'

export const CardProductPageStory = (
  cardProductPageStoryProps: ICardProductPreviewProps,
) => {
  useEffect(() => {
    FontHelper.loadCardProductFonts()
  }, [])
  return (
    <>
      <h1>Edit Mode (Default)</h1>
      <CardProductPreview
        {...cardProductPageStoryProps}
        hasSkippedOrFilledMemorialDataPullForm={true}
      />

      <h1>Preview Mode</h1>
      <CardProductPreview
        {...cardProductPageStoryProps}
        displayMode={CardProductViewDisplayMode.PREVIEW}
        hasSkippedOrFilledMemorialDataPullForm={true}
      />

      <h1>Print Mode</h1>
      <CardProductPreview
        {...cardProductPageStoryProps}
        displayMode={CardProductViewDisplayMode.PRINT}
        hasSkippedOrFilledMemorialDataPullForm={true}
      />

      <h1>Print Mode (Bleed)</h1>
      <CardProductPreview
        {...cardProductPageStoryProps}
        displayMode={CardProductViewDisplayMode.PRINT}
        bleed
        hasSkippedOrFilledMemorialDataPullForm={true}
      />

      {cardProductPageStoryProps.product === EulogiseProduct.PHOTOBOOK && (
        <>
          <h1>Print Mode (Single Page) - Photobook Only</h1>
          <CardProductPreview
            {...cardProductPageStoryProps}
            displayMode={CardProductViewDisplayMode.PRINT}
            hasSkippedOrFilledMemorialDataPullForm={true}
            pageMode={CardProductPageMode.SINGLE_PAGE}
            bleed
          />
        </>
      )}
    </>
  )
}
