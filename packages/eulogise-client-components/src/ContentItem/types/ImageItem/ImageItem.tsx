import {
  CardProductViewDisplayMode,
  IActionType,
  IBoundariesType,
  ICardProductImageRowData,
  ICardProductTheme,
  IFilestackImageEnhancePreset,
  IContentItemOnChangeEvent,
  PageActionPosition,
  EulogiseProduct,
  EulogiseImageSize,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
} from '@eulogise/core'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { ResizeWrapper } from '../../ResizeWrapper'
import { ImageHelper } from '@eulogise/helpers'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { ImageItemActionBar } from './ImageItemActionBar'
import { IChangeImageEvent } from '../ContentItem.types'
import { Tooltip } from '../../../Tooltip'
import { ButtonType } from '../../../Button'
import { SLIDESHOW_FILTERS } from '@eulogise/client-core'
import { PhotoFrameEffectsDrawer } from '../../../Drawer/PhotoFrameEffectsDrawer'

const { getImageUrl } = ImageHelper

interface IImageItemProps {
  product?: EulogiseProduct
  data?: ICardProductImageRowData
  actions?: Array<IActionType<ButtonType>>
  hideActions?: boolean
  boundaries?: IBoundariesType
  displayMode?: CardProductViewDisplayMode
  onChange?: (
    rowData: ICardProductImageRowData,
    events: IContentItemOnChangeEvent,
  ) => any
  maxImages?: number
  columnHeight?: number
  onCancel?: () => void
  onDelete?: () => void
  showDeleteIcon?: boolean
  maxWidth?: number
  isColumnItem?: boolean
  onToggleBorder?: (ev: IChangeImageEvent) => void
  onToggleFadeImage?: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  onChangeImage: (ev: IChangeImageEvent) => void
  onEditImage: (ev: IChangeImageEvent) => void
  onEnhanceImage?: (ev: IChangeImageEvent) => void
  onBgRemover?: (ev: IChangeImageEvent) => void
  isFocused?: boolean
  onFocus: () => void
  isRowHovered?: boolean
  productTheme: ICardProductTheme
  onDuplicate: () => void
  actionsPosition: PageActionPosition
  isAnyRowFocused: boolean
  imageColumnIndex: number
  onChangeLayout?: () => void
  onDragDisabled: (disabled: boolean) => void
}

const StyledImage = styled.img<{
  filterCss?: string
  width?: string
  height?: string
}>`
  ${({ filterCss }) => `
    ${filterCss}
  `}
  display: block;
  max-width: 100%;
  max-height: 100%;
  ${({ width, height }) =>
    `${width && `width: ${width};`}
     ${height && `height: ${height};`}
  `}
  transition: opacity 200ms linear, background-color 200ms linear;

  &.loading {
    opacity: 0;
    background-color: rgba(235, 235, 235, 0.5);
  }

  &.error {
    background-color: rgba(235, 235, 235, 0.5);
  }
`

const StyledErrorMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f5222d;
  text-align: center;
`

// @ts-ignore
const StyledExclamationCircleFilled = styled(ExclamationCircleFilled)`
  font-size: 2rem;
`

const StyledImageItemContainer = styled.div<{ enableBorder?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 50px;
  ${({ enableBorder }) => `
    ${
      enableBorder
        ? `
      border: 5px solid white;
      border-radius: 1%;`
        : `
      border: none;
      border-radius: 0;`
    }
  `}
`

export const ImageItem = ({
  product,
  data,
  hideActions,
  onChangeLayout,
  displayMode,
  maxWidth,
  onChange,
  boundaries,
  columnHeight,
  onChangeImage,
  onEditImage,
  onEnhanceImage,
  onBgRemover,
  onDelete,
  onToggleBorder,
  onToggleFadeImage,
  onTransparencyChange,
  showDeleteIcon,
  isColumnItem = false,
  isFocused,
  isRowHovered,
  onFocus,
  productTheme,
  onDuplicate,
  actionsPosition,
  isAnyRowFocused,
  imageColumnIndex = 0,
  onDragDisabled,
}: IImageItemProps) => {
  const {
    width: containerWidth,
    height: containerHeight,
    filepath,
    filename,
    filestackHandle,
    url,
    enableBorder,
    preset,
  } = data!
  const isEnhanced = preset === IFilestackImageEnhancePreset.AUTO
  const [isPhotoFrameEffectsOpen, setIsPhotoFrameEffectsOpen] = useState(false)
  const hasSelectedImage = !!(
    filestackHandle && filestackHandle !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE
  )
  const [imageSize, setImageSize] = useState<EulogiseImageSize>({
    width: 0,
    height: 0,
  })
  const [error, setError] = useState<boolean>(false)
  const [, setResizing] = useState<boolean>(false)

  useEffect(() => {
    if (!isFocused) {
      setIsPhotoFrameEffectsOpen(false)
    }
  }, [isFocused])

  const updateImageItem = (newData: any) => {
    if (onChange) {
      onChange(
        {
          ...data,
          ...newData,
        },
        { event: 'resize' },
      )
    }
  }
  useEffect(() => {
    ImageHelper.getImageSize(data as any).then((iz: EulogiseImageSize) =>
      setImageSize(iz),
    )
  }, [data])

  const { width: adjustedWidth, height: adjustedHeight } =
    ImageHelper.determineWidthHeightByImageScale(
      imageSize.width,
      imageSize.height,
      containerWidth!,
      containerHeight!,
    )

  const isClientBrandImage = data?.isClientBrandImage ?? false

  return (
    <>
      <Tooltip
        title="Click to change"
        visible={isFocused ? false : isRowHovered}
      >
        <StyledImageItemContainer enableBorder={Boolean(enableBorder)}>
          {(url || filename || filepath || filestackHandle) && (
            <ResizeWrapper
              isFocused={isFocused!}
              onFocus={onFocus}
              isAnyRowFocused={isAnyRowFocused}
              width={containerWidth!}
              height={containerHeight!}
              onResizeHandleHover={(hover: boolean) => {
                onDragDisabled(hover)
              }}
              onResizeStart={() => setResizing(true)}
              isParentHovered={isRowHovered}
              onResizeEnd={({ width, height }: EulogiseImageSize) => {
                // Initial height for column items
                if (columnHeight && !height) {
                  setResizing(false)
                  return updateImageItem({
                    width,
                    columnHeight,
                  })
                }

                if (onChange) {
                  onChange(
                    {
                      ...data,
                      width,
                      height,
                    },
                    { event: 'resize' },
                  )
                }
                setResizing(false)
              }}
              onResize={({ width, height }: EulogiseImageSize) => {
                if (onChange) {
                  onChange(
                    {
                      ...data,
                      width,
                      height,
                    },
                    { event: 'resize-no-recording' },
                  )
                }
              }}
              maxWidth={maxWidth || boundaries?.width}
              maxHeight={boundaries?.height}
              disabled={displayMode !== CardProductViewDisplayMode.EDIT}
              lockAspectRatio
            >
              <StyledImage
                src={getImageUrl(data!, {
                  isFormatToJpg: true,
                })}
                filterCss={
                  productTheme.themeDefaultImageFilter
                    ? (SLIDESHOW_FILTERS as any)[
                        productTheme.themeDefaultImageFilter
                      ]
                    : ''
                }
                width={adjustedWidth}
                height={adjustedHeight}
                onLoad={() => setError(false)}
                onError={() => setError(true)}
                alt=""
                onMouseDown={() => {
                  onChangeImage({ filestackHandle })
                }}
              />
            </ResizeWrapper>
          )}
          {error && (
            <StyledErrorMessageContainer>
              <StyledExclamationCircleFilled />
              <p>Image could not be loaded</p>
            </StyledErrorMessageContainer>
          )}
        </StyledImageItemContainer>
      </Tooltip>
      {displayMode === CardProductViewDisplayMode.EDIT &&
        isFocused &&
        (() => {
          const portalTarget = document.getElementById(
            'editor-toolbar-sticky-target',
          )
          return portalTarget
            ? createPortal(
                <ImageItemActionBar
                  isColumnItem={isColumnItem}
                  onChangeLayout={() => {
                    if (onChangeLayout) {
                      onChangeLayout()
                    }
                  }}
                  onEditImage={() => {
                    onFocus()
                    onEditImage({ filestackHandle })
                  }}
                  onDelete={onDelete!}
                  showDeleteIcon={showDeleteIcon!}
                  onDuplicate={onDuplicate}
                  showDuplicateIcon={!isColumnItem}
                  actionsPosition={actionsPosition}
                  imageColumnIndex={imageColumnIndex}
                  itemMaxWidth={(maxWidth || boundaries?.width) ?? 0}
                  isClientBrandImage={isClientBrandImage}
                  isPortaled
                  onPhotoAndFrameEffects={() =>
                    setIsPhotoFrameEffectsOpen(true)
                  }
                />,
                portalTarget,
              )
            : null
        })()}
      <PhotoFrameEffectsDrawer
        isOpen={isPhotoFrameEffectsOpen}
        onClose={() => setIsPhotoFrameEffectsOpen(false)}
        onEditImage={() => {
          onEditImage({ filestackHandle })
        }}
        onEnhance={() => {
          if (onEnhanceImage) {
            onEnhanceImage({ filestackHandle })
          }
        }}
        isEnhanced={isEnhanced}
        onBgRemover={() => {
          if (onBgRemover) {
            onBgRemover({ filestackHandle })
          }
        }}
        onChangeLayout={() => {
          if (onChangeLayout) {
            onChangeLayout()
          }
        }}
        onToggleFadeImage={() => {
          if (onToggleFadeImage) {
            onToggleFadeImage({})
          }
        }}
        isFadeImageEnabled={!!data?.enableFadeImage}
        onFullWidthClick={() => {}}
        isFullWidth={false}
        onToggleBorder={() => {
          if (onToggleBorder) {
            onToggleBorder({ filestackHandle })
          }
        }}
        isBorderEnabled={!!enableBorder}
        hasSelectedImage={hasSelectedImage}
        hasGraphicFrame={false}
        disableFadeEdge={true}
        isDisabledFrameEffect
      />
    </>
  )
}
