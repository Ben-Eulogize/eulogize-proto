import React from 'react'
import styled from 'styled-components'
import { ImageHelper } from '@eulogise/helpers'
import { IImageAsset, IImageAssetContent } from '@eulogise/core'
import { EulogiseClientConfig } from '@eulogise/client-core'
import { DeleteIcon, EditIcon, ClickableIcon } from '../../icons'
import { ImageSize } from '../../ImageSize'

interface IMultiImageThumbnailProps {
  image: IImageAsset
  isEditable: boolean
  selected: boolean
  selectedText: any
  onEditImageClick: (image: IImageAsset) => void
  onDeleteImageClick: (imageId: string) => void
}

const StyledMultiImageThumbnail = styled.div``

const StyledThumbImage = styled.img`
  object-fit: cover;
  height: 100%;
  border-radius: 5px;
`

const StyledThumbOverLay = styled.div`
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: rgba(7, 174, 183, 0.75);
  border-radius: 0 0 5px 5px;
  z-index: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const ThumbnailImageContainer = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
`

const ActionCell = styled.div`
  display: flex;
  align-items: center;
`

// @ts-ignore
const StyledClickableIcon = styled(ClickableIcon)`
  margin: 0 0.25rem;
`

export const MultiImageThumbnail: React.FC<IMultiImageThumbnailProps> = ({
  image,
  isEditable = true,
  selected,
  selectedText,
  onEditImageClick,
  onDeleteImageClick,
}) => {
  const imageContent: IImageAssetContent = image?.content
  const imageUrl: string = ImageHelper.getImageUrl(imageContent, {
    width: EulogiseClientConfig.THUMBNAIL_IMAGE_SIZE,
    height: EulogiseClientConfig.THUMBNAIL_IMAGE_SIZE,
  })!

  return (
    <StyledMultiImageThumbnail>
      <ThumbnailImageContainer>
        <StyledThumbImage src={imageUrl} alt="" />
        {selected && <StyledThumbOverLay>{selectedText}</StyledThumbOverLay>}
      </ThumbnailImageContainer>
      <ActionRow>
        <ImageSize
          isAlignCenter={!isEditable}
          filestackHandle={imageContent.filestackHandle}
        />
        {isEditable && (
          <ActionCell>
            <StyledClickableIcon
              tooltip="Edit image"
              onClick={() => onEditImageClick(image)}
            >
              <EditIcon />
            </StyledClickableIcon>
            <StyledClickableIcon
              tooltip="Delete photo"
              onClick={() => onDeleteImageClick(image.id)}
            >
              <DeleteIcon />
            </StyledClickableIcon>
          </ActionCell>
        )}
      </ActionRow>
    </StyledMultiImageThumbnail>
  )
}
