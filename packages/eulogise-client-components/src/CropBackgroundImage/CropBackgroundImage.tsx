import React from 'react'
import styled from 'styled-components'
import { CropBackgroundImageHelper, ImageHelper } from '@eulogise/helpers'
import {
  BackgroundImageProperties,
  DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE,
  EulogiseImageSize,
  GetImageObject,
} from '@eulogise/core'

export type ICropBackgroundImageProps = BackgroundImageProperties & {
  image: GetImageObject
  imageSize: EulogiseImageSize
  isDebug?: boolean
  isTwoColumnsPages?: boolean
}

const StyledCropBackgroundImage = styled.div<{ $isDebug: boolean }>`
  ${({ $isDebug }) =>
    $isDebug &&
    `
    border: 3px solid black;
    margin-bottom: 10px;
  `}
`

const BackgroundImage = styled.img`
  position: absolute;
`

const DebugInfo = styled.div``

const BackgroundImageContainer = styled.div`
  overflow: hidden;
  position: relative;
`

const bleedSize = DEFAULT_BACKGROUND_IMAGE_BLEED_SIZE
export const CropBackgroundImage = ({
  type,
  image,
  width: containerWidth,
  height: containerHeight,
  alignment,
  imageSize,
  isRemoveSideBleed,
  isRemoveFullBleed,
  isTwoColumnsPages = false,
  isDebug = false,
}: ICropBackgroundImageProps) => {
  if (!imageSize) {
    return null
  }
  const imageUrl = ImageHelper.getImageUrl(image)

  // for non-bleed page to add bleedsize
  const virtualContainer = {
    width:
      containerWidth +
      (isRemoveSideBleed ? bleedSize : isRemoveFullBleed ? bleedSize * 2 : 0),
    height:
      containerHeight +
      (isRemoveSideBleed || isRemoveFullBleed ? bleedSize * 2 : 0),
  }
  console.log('virtual container', virtualContainer)
  console.log('container', { containerWidth, containerHeight })
  const cropImageProps = {
    actualImageSize: imageSize,
    containerSize: virtualContainer,
    isRemoveSideBleed,
    isRemoveFullBleed,
    isTwoColumnsPages,
    alignment,
  }

  const renderImageSizeAndPosition =
    CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition(
      cropImageProps,
    )
  return (
    <StyledCropBackgroundImage $isDebug={isDebug}>
      {isDebug && (
        <DebugInfo>
          <b>Type:</b> {type}
          <br />
          <b>Container Width:</b> {containerWidth}
          <br />
          <b>Container Height:</b> {containerHeight}
          <br />
          <b>Actual Image Width:</b> {imageSize.width}
          <br />
          <b>Actual Image Height:</b> {imageSize.height}
          <br />
          <b>Render Image Width:</b> {renderImageSizeAndPosition.width}
          <br />
          <b>Render Image Height:</b> {renderImageSizeAndPosition.height}
          <br />
          <b>Alignment:</b> {alignment}
        </DebugInfo>
      )}
      <BackgroundImageContainer
        style={{ width: containerWidth, height: containerHeight }}
      >
        <BackgroundImage src={imageUrl} style={renderImageSizeAndPosition} />
      </BackgroundImageContainer>
    </StyledCropBackgroundImage>
  )
}
