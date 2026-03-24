import React, { useEffect, useRef, useState } from 'react'
import CSS from 'csstype'
import styled from 'styled-components'
import {
  CardProductViewDisplayMode,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  ICardProductFrameContentItem,
  ICardProductFrameDisplayMode,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameImageContent,
  ICardProductFrameItemUiBaseProps,
  ICardProductFrameScaleProps,
  IFilestackImageEnhancePreset,
} from '@eulogise/core'
import { CardProductFrameImageItem } from './CardProductFrameImageItem'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  CardProductFrameImageEditor,
  ICardProductFrameImageEditorFields,
} from '../editor/CardProductFrameImageEditor'
import { GraphicFrameHelper, ImageHelper } from '@eulogise/helpers'
import { CardProductGraphicFrame } from '../CardProductGraphicFrame'
import { DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS } from '@eulogise/helpers/dist/cardProduct.constants'
import { Tooltip } from '../../Tooltip'
import { Spin } from '../../Spin'

const StyledCardProductFrameContent = styled.div<{
  $borderRadius?: CSS.Property.BorderRadius
  $isHighlight?: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  ${({ $borderRadius }) => `
    ${$borderRadius ? `border-radius: ${$borderRadius};` : ''}
  `}
  ${({ $isHighlight }) => `
    ${
      $isHighlight
        ? `
        border: ${STYLE.CARD_PRODUCT_BORDER_SIZE}px solid ${COLOR.CORE_PURPLE_60};
    `
        : ''
    }
  `}
`

const CardProductFrameContentBox = styled.div<{
  $width?: number
  $height?: number
  $borderRadius?: CSS.Property.BorderRadius
  $enableBorder?: boolean
  $maskImage?: string
}>`
  position: relative;
  ${({ $width }) => `
    ${$width ? `width: ${$width}px;` : 'width: 100%;'}
  `}
  ${({ $height }) => `
    ${$height ? `height: ${$height}px;` : 'height: 100%;'}
  `}
  ${({ $borderRadius }) => `
    ${$borderRadius ? `border-radius: ${$borderRadius};` : ''}
  `}
  overflow: hidden;
  ${({ $enableBorder }) => `
    ${
      $enableBorder
        ? `border: ${STYLE.CARD_PRODUCT_BORDER_SIZE_M}px solid white;`
        : ''
    }
  `}
  ${({ $maskImage }) =>
    $maskImage
      ? `
    mask-image: url(${$maskImage});
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
  `
      : null}
`

const LowResAlertIconWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
  color: orange;
  font-size: 20px;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: ${COLOR.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCardProductFrameImageItem = styled(CardProductFrameImageItem)<{
  $isVisible: boolean
}>`
  ${({ $isVisible }) => `
    ${$isVisible ? 'display: block;' : 'display: none;'}
  `}
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${STYLE.HALF_GUTTER};
  font-size: ${STYLE.TEXT_FONT_SIZE_EXTRA_SMALL};
`

type ICardProductFrameContentProps = ICardProductFrameContentItem &
  ICardProductFrameItemUiBaseProps &
  ICardProductFrameScaleProps

export const CardProductFrameContent = ({
  enableBorder,
  onContentItemClick,
  onContentItemChange,
  onDisplayModeChange,
  selectedContentItemId,
  isResizing,
  graphicFrame,
  content = {
    type: 'image',
    filestackHandle: DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  } as ICardProductFrameImageContent,
  containerRef,
  frameDisplayMode,
  isItemSelectable = true,
  cardProductDisplayMode = CardProductViewDisplayMode.EDIT,
  maxPhotoSize,
  repositionContentItemId,
  ...contentItemData
}: ICardProductFrameContentProps) => {
  const [displayMode, setDisplayMode] = useState<ICardProductFrameDisplayMode>(
    ICardProductFrameDisplayMode.VIEW,
  )
  const [editorFields, setEditorFields] =
    useState<ICardProductFrameImageEditorFields>()
  const contentRef = useRef<HTMLDivElement>(null)
  const prevRepositionIdRef = useRef<string | undefined>(undefined)

  const contentItem: ICardProductFrameContentItem = {
    ...contentItemData,
    type: 'content',
    content,
  }

  // Auto-trigger reposition (double-click) when requested from toolbar
  useEffect(() => {
    if (
      repositionContentItemId &&
      repositionContentItemId === contentItemData.id &&
      repositionContentItemId !== prevRepositionIdRef.current &&
      contentRef.current
    ) {
      const imageEl = contentRef.current.querySelector(
        '.card-product-frame-image-item',
      )
      if (imageEl) {
        imageEl.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
      }
    }
    prevRepositionIdRef.current = repositionContentItemId
  }, [repositionContentItemId, contentItemData.id])

  const displayContent = content as ICardProductFrameImageContent
  const isDummyImage =
    displayContent.filestackHandle === DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE

  const isImageEnhancedEnabled: boolean =
    !!displayContent?.preset &&
    displayContent?.preset !== IFilestackImageEnhancePreset.NULL

  if (displayContent.isShowLoading) {
    return (content as ICardProductFrameImageContent).renderImageWidth > 200 ? (
      <LoadingContainer>
        <div>
          <Spin />
        </div>{' '}
        {displayContent.loadingMessage}
      </LoadingContainer>
    ) : (
      <Spin />
    )
  }
  const imageUrl = ImageHelper.getImageUrl(
    {
      url: displayContent?.url,
      filepath: displayContent.filepath,
      filestackHandle: displayContent.filestackHandle,
      preset: isImageEnhancedEnabled
        ? displayContent?.preset
        : IFilestackImageEnhancePreset.NULL,
    },
    {
      ...DEFAULT_CARD_PRODUCT_IMAGE_OPTIONS,
      isFormatToJpg: !displayContent.isRemovedBackgroundImage,
    },
  )!
  const isFrameInEditMode =
    frameDisplayMode === ICardProductFrameDisplayMode.EDIT &&
    cardProductDisplayMode === CardProductViewDisplayMode.EDIT

  const isShowBorder =
    contentItemData.isFrameFocused &&
    selectedContentItemId &&
    !isFrameInEditMode
      ? selectedContentItemId === contentItem.id
      : false

  const imageChange = (event: ICardProductFrameImageChangeEvent) => {
    const content = contentItem.content
    switch (event.eventType) {
      case 'change-image-asset': {
        const {
          imageAssetContent: { filepath, filestackHandle, filename },
        } = event
        onContentItemChange(event, {
          ...contentItem,
          content: {
            ...content,
            filepath,
            filestackHandle,
            filename,
            // clear out the following values, we let the image component to work out the width and height
            transformY: undefined,
            transformX: undefined,
            renderImageHeight: undefined,
            renderImageWidth: undefined,
          } as unknown as ICardProductFrameImageContent,
        })
        return
      }
      default: {
        const { size, position } = event
        const newContentItem = {
          ...contentItem,
          content: {
            ...content,
            transformX: position.x,
            transformY: position.y,
            renderImageHeight: size.height,
            renderImageWidth: size.width,
          } as ICardProductFrameImageContent,
        }
        onContentItemChange(event, newContentItem)
      }
    }
  }

  const changeDisplayMode = (newMode: ICardProductFrameDisplayMode) => {
    setDisplayMode(newMode)
    onDisplayModeChange(newMode)
  }
  const graphicFrameDetails = graphicFrame
    ? GraphicFrameHelper.getGraphicFrameDetailsByName(graphicFrame!)
    : undefined

  const maskImageUrl = graphicFrameDetails?.maskImageUrl

  const isLowRes = !ImageHelper.check200DPIFromRenderedSize({
    renderedImageSize: {
      width: displayContent.renderImageWidth,
      height: displayContent.renderImageHeight,
    },
    actualImageSize: {
      width: displayContent.width!,
      height: displayContent.height!,
    },
  })

  return (
    <>
      {displayMode === ICardProductFrameDisplayMode.EDIT && (
        <CardProductFrameImageEditor
          {...editorFields}
          borderRadius={contentItem.borderRadius}
          imageUrl={imageUrl}
          imageContainerWidth={graphicFrame?.imageContainerWidth}
          imageContainerHeight={graphicFrame?.imageContainerHeight}
          imageContainerTransform={graphicFrame?.imageContainerTransform}
          maskImageUrl={graphicFrameDetails?.maskEditorImageUrl}
          isGraphicFrame={!!graphicFrame}
          onConfirm={(data: ICardProductFrameImageChangeEvent) => {
            imageChange(data)
            changeDisplayMode(ICardProductFrameDisplayMode.VIEW)
          }}
          onCancel={() => changeDisplayMode(ICardProductFrameDisplayMode.VIEW)}
          containerRef={containerRef}
          enableBorder={enableBorder}
        />
      )}
      <StyledCardProductFrameContent
        ref={contentRef}
        $borderRadius={contentItem.borderRadius}
        $isHighlight={graphicFrame ? false : isShowBorder}
        className={`card-product-frame-content`}
        onMouseDown={(ev) => {
          ev.stopPropagation()
          // do not trigger mouse down event if other content of the same frame is in Edit Mode
          if (isFrameInEditMode) {
            return
          }
        }}
        onClick={(ev) => {
          if (isItemSelectable) {
            ev.stopPropagation()
          }
          if (onContentItemClick) {
            onContentItemClick(contentItem)
          }
        }}
      >
        {graphicFrame && (
          <CardProductGraphicFrame graphicFrame={graphicFrame} />
        )}
        <CardProductFrameContentBox
          className="card-product-frame-content-box"
          $width={contentItem.width}
          $height={contentItem.height}
          $borderRadius={contentItem.borderRadius}
          $enableBorder={enableBorder}
          $maskImage={maskImageUrl}
        >
          {(cardProductDisplayMode === CardProductViewDisplayMode.EDIT ||
            cardProductDisplayMode ===
              CardProductViewDisplayMode.SPREAD_VIEW) &&
            isLowRes &&
            !isDummyImage && (
              <Tooltip title="Low resolution image" placement="top">
                <LowResAlertIconWrapper>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                </LowResAlertIconWrapper>
              </Tooltip>
            )}
          {content.type === 'image' && (
            <StyledCardProductFrameImageItem
              $isVisible={displayMode === ICardProductFrameDisplayMode.VIEW}
              contentId={contentItem.id!}
              graphicFrameContainerWidth={graphicFrame?.imageContainerWidth}
              graphicFrameContainerHeight={graphicFrame?.imageContainerHeight}
              containerTransform={graphicFrame?.imageContainerTransform}
              imageAssetContent={displayContent}
              isBorderShowed={isShowBorder}
              isResizing={isResizing}
              imageUrl={imageUrl}
              isDummyImage={isDummyImage}
              onDoubleClick={(fields: ICardProductFrameImageEditorFields) => {
                // do not trigger mouse down event if other content of the same frame is in Edit Mode
                if (isFrameInEditMode) {
                  return
                }
                if (
                  displayContent.filestackHandle ===
                  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE
                ) {
                  return
                }
                setEditorFields(fields)
                changeDisplayMode(ICardProductFrameDisplayMode.EDIT)
              }}
              onFrameImageChange={(
                imageDataEvent: ICardProductFrameImageChangeEvent,
              ) => {
                imageChange(imageDataEvent)
              }}
              cardProductDisplayMode={cardProductDisplayMode}
            />
          )}
        </CardProductFrameContentBox>
      </StyledCardProductFrameContent>
    </>
  )
}
