import React, { useState } from 'react'

import {
  BookletBackgroundEditor,
  BookletBackgroundEditorProps,
} from './BookletBackgroundEditor'
import { EulogiseRegion, IImageSizeAndPosition } from '@eulogise/core'

const PORTRAIT_IMAGE_FILESTACK_HANDLE = 'tMwKrE7oTvyau8Wj23Vs'
const LANDSCAPE_IMAGE_FILESTACK_HANDLE = 'H3qxks24SV2p4pDNsA02'

export default {
  title: 'BackgroundEditor/BookletBackgroundEditor',
  component: BookletBackgroundEditor,
  argTypes: {},
}

const Template = (props: Partial<BookletBackgroundEditorProps>) => {
  const [imageSizeAndPosition, setImageSizeAndPosition] =
    useState<IImageSizeAndPosition>()
  return (
    <BookletBackgroundEditor
      imageSizeAndPosition={imageSizeAndPosition}
      onImageSizeAndPositionChange={(sizeAndPosition) => {
        setImageSizeAndPosition(sizeAndPosition)
      }}
      {...props}
    />
  )
}

export const PortraitUSA = () => {
  return (
    <Template
      region={EulogiseRegion.USA}
      originalImage={{
        filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
      }}
    />
  )
}

export const PortraitUSAPreview = () => {
  return (
    <Template
      isPreview
      region={EulogiseRegion.USA}
      originalImage={{
        filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
      }}
    />
  )
}

export const PortraitUSAPreDefinedValues = () => {
  return (
    <Template
      region={EulogiseRegion.USA}
      originalImage={{
        filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
      }}
      imageSizeAndPosition={{
        left: -300,
        top: -800,
        height: 2400,
        width: 1400,
      }}
    />
  )
}

export const LandscapeUSA = () => (
  <Template
    region={EulogiseRegion.USA}
    originalImage={{
      filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
    }}
  />
)

export const PortraitAU = () => (
  <Template
    region={EulogiseRegion.AU}
    originalImage={{
      filestackHandle: PORTRAIT_IMAGE_FILESTACK_HANDLE,
    }}
  />
)

export const LandscapeAU = () => (
  <Template
    region={EulogiseRegion.AU}
    originalImage={{
      filestackHandle: LANDSCAPE_IMAGE_FILESTACK_HANDLE,
    }}
  />
)
