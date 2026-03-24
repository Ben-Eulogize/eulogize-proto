import React from 'react'
import styled from 'styled-components'
import { useAssetState } from '../../../store/hooks'
import { IAssetState, IImageAsset } from '@eulogise/core'
import { ImageHelper } from '@eulogise/helpers'
import { COLOR, STYLE } from '@eulogise/client-core'

interface IImageSelectorProps {
  onImageSelect: (image: IImageAsset) => void
}

const StyledImageSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ImageItemContainer = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: ${COLOR.SUPER_LITE_GREY};
  margin: calc(${STYLE.GUTTER} / 2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageItem = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const ImageSelector: React.FC<IImageSelectorProps> = ({ onImageSelect }) => {
  const { images }: IAssetState = useAssetState()
  if (!images) {
    return null
  }

  return (
    <StyledImageSelector>
      {images.map((image: IImageAsset) => {
        const imageSrc: string = ImageHelper.getImageUrl(image.content)
        return (
          <ImageItemContainer>
            <ImageItem
              key={imageSrc}
              src={imageSrc}
              onClick={() => onImageSelect(image)}
            />
          </ImageItemContainer>
        )
      })}
    </StyledImageSelector>
  )
}

export default ImageSelector
