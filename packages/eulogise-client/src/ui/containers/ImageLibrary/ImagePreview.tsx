import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SortableHandle } from '@eulogise/client-components'
import { Spin } from '@eulogise/client-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { ImageHelper } from '@eulogise/helpers'
import { IImageSize } from '@eulogise/core'

// @ts-ignore
const LibraryImage = styled.img<{ $isClickable: boolean }>`
  height: auto;
  width: ${STYLE.IMAGE_LIBRARY_ITEM_WIDTH}px;
  opacity: 1;
  display: block;
  ${({ $isClickable }: { $isClickable: boolean }) =>
    $isClickable ? `cursor: pointer;` : ''}
`

const LibraryImageLoading = styled.div`
  height: auto;
  width: ${STYLE.IMAGE_LIBRARY_ITEM_WIDTH}px;
`

const StyledImageOverlay = styled.div<{ $isClickable: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: ${COLOR.PRIMARY_BACKGROUND_COLOR}dd;
  ${({ $isClickable }) =>
    $isClickable &&
    `
  cursor: pointer;
`}
`

const StyledImageOverlayText = styled.div`
  color: ${COLOR.DARK_BLUE};
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const StyledImagePreviewContainer = styled.div`
  position: relative;
  &:hover {
    .library-image-overlay {
      opacity: 1;
    }
  }
`

const PreloadImageContainer = styled.div<{ $imageSize: IImageSize }>`
  ${({ $imageSize }) => `
    width: ${$imageSize.width}px;
    height: ${$imageSize.height}px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSpin = styled(Spin)`
  width: 1rem !important;
  height: 1rem !important;
`

interface IImagePreviewProps {
  src: string
  onClick?: (ev: any) => void
  showShowClickOverlay?: boolean
  isLoading?: boolean
  preLoadImageSize?: IImageSize
}

const ImagePreview = ({
  preLoadImageSize,
  src,
  onClick,
  showShowClickOverlay = false,
  isLoading = false,
}: IImagePreviewProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    ImageHelper.preloadImage(src, () => {
      setIsLoaded(true)
    })
  }, [])

  if (isLoading) {
    return (
      <LibraryImageLoading>
        <Spin />
      </LibraryImageLoading>
    )
  }

  if (!showShowClickOverlay) {
    return (
      <LibraryImage
        draggable="false"
        src={src}
        onClick={onClick}
        $isClickable={!!onClick}
      />
    )
  }

  return (
    <StyledImagePreviewContainer>
      {isLoaded ? (
        <LibraryImage
          className={'library-image'}
          draggable="false"
          src={src}
          onClick={onClick}
          $isClickable={!!onClick}
        />
      ) : preLoadImageSize ? (
        <PreloadImageContainer $imageSize={preLoadImageSize}>
          <StyledSpin />
        </PreloadImageContainer>
      ) : null}
      <StyledImageOverlay
        className={'library-image-overlay'}
        onClick={onClick}
        $isClickable={!!onClick}
      >
        <StyledImageOverlayText className="library-image-overlay-text">
          Click To Add Photo
        </StyledImageOverlayText>
      </StyledImageOverlay>
    </StyledImagePreviewContainer>
  )
}

export default SortableHandle(ImagePreview)
