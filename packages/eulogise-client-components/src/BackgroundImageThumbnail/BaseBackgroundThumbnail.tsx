import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'
import { ImageHelper } from '@eulogise/helpers'
import { Spin } from '../Spin'

export type IBaseBackgroundThumbnailProps = {
  isRegenerating: boolean
  children: React.ReactNode
  backgroundImagePaths: Array<string>
  loadingMessage: string
}

const SpinContainer = styled.div`
  width: 268px;
  height: 176px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledBaseBackgroundThumbnail = styled.div`
  width: 268px;
  height: 176px;
  transform: scale(0.5);
  transform-origin: 0 0;
  margin-top: ${STYLE.GUTTER};
`

export const BaseBackgroundThumbnail = ({
  isRegenerating,
  backgroundImagePaths,
  children,
  loadingMessage,
}: IBaseBackgroundThumbnailProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const backgroundImageUrls = backgroundImagePaths.map((filepath) =>
    ImageHelper.getImageUrl({
      filepath,
    }),
  )
  let intervalId: any
  useEffect(() => {
    // do not start loading images if it is updating (regenerating) background image
    if (isRegenerating) {
      return
    }
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = setInterval(async () => {
      try {
        await Promise.all(
          backgroundImageUrls.map((imageUrl) =>
            ImageHelper.checkImageAvailability(imageUrl!),
          ),
        )
        setIsLoading(false)
        clearInterval(intervalId) // Stop checking once image is available
      } catch (ex) {
        console.log('Image is not available')
      }
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [backgroundImageUrls, isRegenerating])

  return isLoading || isRegenerating ? (
    <SpinContainer>
      <Spin />
      &nbsp;{isRegenerating ? 'Regenerating' : loadingMessage}...
    </SpinContainer>
  ) : (
    <StyledBaseBackgroundThumbnail>{children}</StyledBaseBackgroundThumbnail>
  )
}
