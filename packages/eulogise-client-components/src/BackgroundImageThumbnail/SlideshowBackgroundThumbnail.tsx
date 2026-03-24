import React from 'react'
import { SlideshowThumbnail } from '../SlideshowThumbnail/SlideshowThumbnail'
import { BackgroundImageHelper } from '@eulogise/helpers'
import { EulogiseRegion } from '@eulogise/core'
import { BaseBackgroundThumbnail } from './BaseBackgroundThumbnail'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { IProductThumbnailProps } from './IProductThumbnailProps'

export const SlideshowBackgroundThumbnail = ({
  isRegenerating,
  backgroundId,
  loadingMessage,
}: IProductThumbnailProps) => {
  const type = 'SLIDESHOW'
  const backgroundImagePath = BackgroundImageHelper.getBackgroundImageAssetKey(
    type,
    backgroundId,
    EulogiseRegion.AU,
  )
  return (
    <BaseBackgroundThumbnail
      isRegenerating={isRegenerating}
      backgroundImagePaths={[backgroundImagePath]}
      loadingMessage={loadingMessage}
    >
      <SlideshowThumbnail
        backgroundImage={{
          url: `${EulogiseClientConfig.AWS_S3_URL}/${backgroundImagePath}`,
        }}
        image={{
          url: `${EulogiseClientConfig.AWS_S3_URL}/primaryImages/srTL5xBtQvKmQ0fLYcUK.jpeg`,
        }}
      />
    </BaseBackgroundThumbnail>
  )
}
