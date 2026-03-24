import React from 'react'
import styled from 'styled-components'
import { IImageAsset, IImageAssetContent } from '@eulogise/core'
import { List } from '../../List'
import { MultiImageThumbnail } from './MultiImageThumbnail'
import { STYLE } from '@eulogise/client-core'

enum ImageSelectorDisplayModeEnum {
  GRID = 'grid',
  LIST = 'list',
}

interface ImageSelectorProps {
  onSelect: (image: IImageAssetContent) => void
  onDeselect: (image: IImageAssetContent) => void
  selectedImages: Array<IImageAssetContent>
  maxImages: number
  disabled?: boolean
  isSelectable?: boolean
  isEditable?: boolean

  images: Array<IImageAsset>
  loading: boolean

  onEditImageClick: (image: IImageAsset) => void
  onDeleteImageClick: (imageId: string) => void
}

interface IStyledImagesListItemProps {
  mode: ImageSelectorDisplayModeEnum
  selected: boolean
  disabled: boolean
  $isSelectable: boolean
}

const ListItem = List.Item
const ListItemMeta = ListItem.Meta

const StyledImageSelectorLocaleContainer = styled.div`
  color: rgba(0, 0, 0, 0.6);
  ${STYLE.TEXT_MEDIUM}
`

// @ts-ignore
const StyledImagesList = styled(List)`
  .ant-list-item-meta-avatar {
    margin: 0 8px;
  }
  .ant-row {
    flex-wrap: wrap;
  }
`

// @ts-ignore
const StyledImagesListItem = styled(ListItem)<IStyledImagesListItemProps>`
  ${({ $isSelectable }: { $isSelectable: boolean }) =>
    $isSelectable &&
    `
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        transform: scale(1.1);
      }
    `}

  &.disabled {
    background-color: transparent;
  }

  ${({ selected, disabled }: IStyledImagesListItemProps) =>
    `
      margin: 0 auto;
      background-color: ${selected ? `transparent` : ``};
      transform: ${selected ? `scale(1.1)` : `scale(1.0)`};
      pointer-events: ${disabled ? 'none' : 'auto'};
      
      & > ${StyledImagesListItemMata} {
        opacity: ${disabled ? 0.5 : 1};
      }
   `}
`

// @ts-ignore
const StyledImagesListItemMata = styled(ListItemMeta)``

const imageSelectorLocaleObject = {
  emptyText: (
    <StyledImageSelectorLocaleContainer>
      <span>You don't have any pictures in your gallery.</span>
      <br />
      <span>Upload some in the side bar.</span>
    </StyledImageSelectorLocaleContainer>
  ),
}

export const MultiImageSelector: React.FC<ImageSelectorProps> = ({
  maxImages = 1,
  selectedImages,
  isSelectable = true,
  isEditable = true,
  disabled = true,
  onSelect,
  onDeselect,
  images: assetImages,
  loading,
  onEditImageClick,
  onDeleteImageClick,
}) => {
  const display = ImageSelectorDisplayModeEnum.GRID
  const maximumSelected: boolean = isSelectable
    ? selectedImages.length === maxImages && !!selectedImages[0].filestackHandle
    : false

  return (
    <StyledImagesList
      itemLayout="horizontal"
      dataSource={assetImages}
      loading={loading}
      grid={{ xs: 3, sm: 4, md: 5 }}
      locale={imageSelectorLocaleObject}
      renderItem={(image: IImageAsset) => {
        const imageContent = image?.content
        const selected =
          selectedImages.filter(
            (img: IImageAssetContent) =>
              img?.filestackHandle === imageContent?.filestackHandle,
          ).length === 1
        const index = selectedImages.findIndex(
          (img) => img?.filestackHandle === imageContent?.filestackHandle,
        )
        const selectedText = maxImages > 1 ? index + 1 : '\u2713'
        return (
          <StyledImagesListItem
            $isSelectable={isSelectable}
            onClick={() => {
              if (!isSelectable) {
                return
              }
              if (selected) {
                onDeselect(imageContent)
              } else {
                onSelect(imageContent)
              }
            }}
            mode={display}
            selected={selected}
            disabled={!!disabled && maximumSelected && !selected}
          >
            <StyledImagesListItemMata
              avatar={
                <MultiImageThumbnail
                  isEditable={isEditable}
                  image={image}
                  selected={selected}
                  selectedText={selectedText}
                  onEditImageClick={onEditImageClick}
                  onDeleteImageClick={onDeleteImageClick}
                />
              }
            />
          </StyledImagesListItem>
        )
      }}
    />
  )
}
