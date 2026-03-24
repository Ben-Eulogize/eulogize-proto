import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import {
  AlignmentType,
  CardProductViewDisplayMode,
  DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE,
  EulogiseImageSize,
  EulogiseProduct,
  IBoundariesType,
  ICardProductFadeEdgeType,
  ICardProductFrameContentItem,
  ICardProductFrameDisplayMode,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameImageContent,
  ICardProductFrameItem,
  ICardProductFrameLayout,
  ICardProductFrameRowData,
  IContentItemOnChangeEvent,
  IFilestackImageEnhancePreset,
  IPhotobookFrameSize,
  PageActionPosition,
} from '@eulogise/core'
import { ResizeWrapper } from '../../ResizeWrapper'
import { FrameItemActionBar } from './FrameItemActionBar'
import { CardProductFrame } from '../../../CardProductFrame/CardProductFrame'
import { IChangeImageEvent } from '../ContentItem.types'
import { CardProductFrameHelper } from '@eulogise/helpers'
import { PhotoFrameEffectsDrawer } from '../../../Drawer/PhotoFrameEffectsDrawer'

type IFrameItemProps = {
  maxPhotoSize?: EulogiseImageSize
  product?: EulogiseProduct
  isEnablePhotobookEdit: boolean
  isPhotobookTitlePageLayout: boolean
  data: ICardProductFrameRowData
  displayMode?: CardProductViewDisplayMode
  maxWidth?: number
  boundaries?: IBoundariesType
  isFocused?: boolean
  isRowHovered?: boolean
  onFocus: () => void
  isAnyRowFocused: boolean
  onChange: (
    rowData: ICardProductFrameRowData,
    events: IContentItemOnChangeEvent,
  ) => void
  onDelete: () => void
  onChangeLayoutClick: (layoutId?: string) => void
  onChangeFrameBackgroundClick: () => void
  onFullWidthClick: () => void
  actionsPosition: PageActionPosition
  onContentItemClick: (contentItem: ICardProductFrameContentItem) => void
  onContentItemChange: (
    event: ICardProductFrameImageChangeEvent,
    contentItem: ICardProductFrameContentItem,
  ) => void
  onDuplicate: () => void
  selectedContentItemId?: string
  containerRef: any
  alignment: AlignmentType
  onChangeAlignment: (alignment: AlignmentType) => void
  onEditImage?: (ev: IChangeImageEvent) => void
  onEnhanceImage?: (ev: IChangeImageEvent) => void
  onBgRemover?: (ev: IChangeImageEvent) => void
  onToggleBorder?: (ev: IChangeImageEvent) => void
  onToggleFadeImage?: (ev: IChangeImageEvent) => void
  onTransparencyChange?: (ev: IChangeImageEvent & { opacity: number }) => void
  onToggleText?: () => void
  isTextEnabled?: boolean
  onFrameSizeChange?: (frameSize: IPhotobookFrameSize) => void
  onDragDisabled?: (disabled: boolean) => void
}

// @ts-ignore
const StyledResizeWrapper = styled(ResizeWrapper)`
  margin-bottom: 0.25rem;
`

const MIN_FRAME_WIDTH = 100
const MIN_FRAME_HEIGHT = 100

export const FrameItem = ({
  maxPhotoSize,
  product,
  data,
  displayMode,
  isEnablePhotobookEdit,
  isPhotobookTitlePageLayout,
  maxWidth,
  boundaries,
  isFocused,
  isRowHovered,
  onFocus,
  isAnyRowFocused,
  onChange,
  onDelete,
  onChangeLayoutClick,
  onChangeFrameBackgroundClick,
  onFullWidthClick,
  onContentItemClick,
  onContentItemChange,
  onDuplicate,
  selectedContentItemId,
  actionsPosition,
  containerRef,
  alignment,
  onChangeAlignment,
  onEditImage,
  onEnhanceImage,
  onBgRemover,
  onToggleBorder,
  onToggleFadeImage,
  onTransparencyChange,
  onToggleText,
  isTextEnabled = false,
  onFrameSizeChange,
  onDragDisabled,
}: IFrameItemProps) => {
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [frameDisplayMode, setFrameDisplayMode] =
    useState<ICardProductFrameDisplayMode>(ICardProductFrameDisplayMode.VIEW)
  const isLockAspectRatio = useRef<boolean>(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const showToolbarTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [repositionContentItemId, setRepositionContentItemId] = useState<
    string | undefined
  >(undefined)
  const [isPhotoFrameEffectsOpen, setIsPhotoFrameEffectsOpen] = useState(false)

  useEffect(() => {
    if (isFocused && frameDisplayMode === ICardProductFrameDisplayMode.VIEW) {
      showToolbarTimerRef.current = setTimeout(() => setShowToolbar(true), 400)
    } else {
      setShowToolbar(false)
      setIsPhotoFrameEffectsOpen(false)
      if (showToolbarTimerRef.current) {
        clearTimeout(showToolbarTimerRef.current)
        showToolbarTimerRef.current = null
      }
    }
    return () => {
      if (showToolbarTimerRef.current) clearTimeout(showToolbarTimerRef.current)
    }
  }, [isFocused, frameDisplayMode])
  // const tmpContentRef = useRef<Array<ICardProductFrameContentItem>>([])
  const content = data?.content as ICardProductFrameLayout
  const width = content?.width ?? 0
  const height = content?.height ?? 0
  const isContentLockAspectRatio = content?.lockAspectRatio

  const isFullWidth = !!data?.isFullWidth

  const selectedFilestackHandle = selectedContentItemId
    ? CardProductFrameHelper.getFilestackHandleByContentId(
        content,
        selectedContentItemId,
      )
    : undefined
  const hasImageSelected = !!(
    selectedFilestackHandle &&
    selectedFilestackHandle !== DEFAULT_DUMMY_IMAGE_FILESTACK_HANDLE
  )
  const isEnhanced = (() => {
    if (!selectedContentItemId) return false
    const contentItem = CardProductFrameHelper.getFrameContentById(
      content,
      selectedContentItemId,
    )
    return (
      (contentItem?.content as ICardProductFrameImageContent)?.preset ===
      IFilestackImageEnhancePreset.AUTO
    )
  })()

  return (
    <>
      <StyledResizeWrapper
        className={`resize-wrapper`}
        lockAspectRatio={
          isContentLockAspectRatio || !!isLockAspectRatio.current
        }
        borderStyle="dotted"
        isFocused={
          isFocused! && frameDisplayMode === ICardProductFrameDisplayMode.VIEW
        }
        onFocus={onFocus}
        isAnyRowFocused={isAnyRowFocused}
        minWidth={MIN_FRAME_WIDTH}
        minHeight={MIN_FRAME_HEIGHT}
        width={width!}
        height={height!}
        onResizeHandleHover={(hover: boolean) => {
          // do not fire onDragDisabled event when the frameItem is in Edit mode (resize)
          if (frameDisplayMode === ICardProductFrameDisplayMode.EDIT) {
            return
          }
          if (onDragDisabled) {
            onDragDisabled(hover)
          }
        }}
        onResizeStart={(ev: any, dir: any) => {
          isLockAspectRatio.current =
            dir === 'topLeft' ||
            dir === 'topRight' ||
            dir === 'bottomLeft' ||
            dir === 'bottomRight'
          setIsResizing(true)
        }}
        isParentHovered={isRowHovered}
        onResize={({ width, height }: { width: number; height: number }) => {
          const containerSize = {
            width,
            height,
          }
          onChange(
            {
              ...data,
              width,
              height,
              content: CardProductFrameHelper.centeringFrameItemImages({
                frameItem: {
                  ...content,
                  ...containerSize,
                } as ICardProductFrameItem,
                containerSize,
              }),
            },
            { event: 'resize-no-recording' },
          )
        }}
        onResizeEnd={({ width, height }: { width: number; height: number }) => {
          setIsResizing(false)
          // Only trigger onChange if size actually changed
          const newWidth = data.width
          const newHeight = content.height
          if (width === newWidth && height === content.height) {
            return
          }
          const containerSize = {
            width: newWidth!,
            height: newHeight!,
          }
          onChange(
            {
              ...data,
              ...containerSize,
              content: CardProductFrameHelper.centeringFrameItemImages({
                frameItem: data.content as ICardProductFrameItem,
                containerSize: containerSize,
              }),
            },
            { event: 'resize-no-recording' },
          )
        }}
        maxWidth={maxWidth ?? isFullWidth ? data.width : boundaries?.width}
        maxHeight={boundaries?.height}
        disabled={
          isFullWidth ||
          displayMode !== CardProductViewDisplayMode.EDIT ||
          //          frameDisplayMode === ICardProductFrameDisplayMode.EDIT ||
          (!isEnablePhotobookEdit && product === EulogiseProduct.PHOTOBOOK)
        }
        enables={
          isFullWidth
            ? {
                top: true,
                bottom: true,
              }
            : {}
        }
      >
        <CardProductFrame
          maxPhotoSize={maxPhotoSize}
          enableBorder={data?.enableBorder}
          enableFadeImage={data?.enableFadeImage}
          opacity={data?.opacity}
          isFrameFocused={isFocused}
          layout={content as ICardProductFrameLayout}
          isResizing={isResizing}
          selectedContentItemId={selectedContentItemId}
          frameDisplayMode={frameDisplayMode}
          repositionContentItemId={repositionContentItemId}
          onDisplayModeChange={(newMode: ICardProductFrameDisplayMode) => {
            setFrameDisplayMode(newMode)
            // disable dragging when editing the frame image size and position
            if (onDragDisabled) {
              onDragDisabled(newMode === ICardProductFrameDisplayMode.EDIT)
            }
          }}
          onContentItemClick={(contentItem: ICardProductFrameContentItem) => {
            // dismiss photo frame effects drawer if user selected another content item
            if (contentItem.id !== selectedContentItemId) {
              setIsPhotoFrameEffectsOpen(false)
            }
            onContentItemClick(contentItem)
          }}
          onContentItemChange={(
            event: ICardProductFrameImageChangeEvent,
            contentItem: ICardProductFrameContentItem,
          ) => {
            setIsPhotoFrameEffectsOpen(false)
            onContentItemChange(event, contentItem)
          }}
          containerRef={containerRef}
          cardProductDisplayMode={displayMode}
        />
      </StyledResizeWrapper>
      {displayMode === CardProductViewDisplayMode.EDIT &&
        frameDisplayMode === ICardProductFrameDisplayMode.VIEW &&
        isFocused &&
        showToolbar &&
        (() => {
          const portalTarget = document.getElementById(
            'editor-toolbar-sticky-target',
          )
          return portalTarget
            ? createPortal(
                <FrameItemActionBar
                  isShowPhotobookTitlePageLayout={isPhotobookTitlePageLayout}
                  product={product}
                  hasSelectedImage={hasImageSelected}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onReposition={() => {
                    if (selectedContentItemId) {
                      setRepositionContentItemId(selectedContentItemId)
                      setTimeout(
                        () => setRepositionContentItemId(undefined),
                        100,
                      )
                    }
                  }}
                  onChangeLayout={() => {
                    onChangeLayoutClick(content.layoutId)
                  }}
                  actionsPosition={actionsPosition}
                  onToggleText={onToggleText}
                  isTextEnabled={isTextEnabled}
                  onPhotoAndFrameEffects={() =>
                    setIsPhotoFrameEffectsOpen(true)
                  }
                  isPortaled
                />,
                portalTarget,
              )
            : null
        })()}
      <PhotoFrameEffectsDrawer
        isOpen={isPhotoFrameEffectsOpen}
        onClose={() => setIsPhotoFrameEffectsOpen(false)}
        onEditImage={() => {
          if (onEditImage) {
            onEditImage({
              filestackHandle: selectedFilestackHandle,
              openImageLibrary: false,
            })
          }
        }}
        onEnhance={() => {
          if (onEnhanceImage) {
            onEnhanceImage({
              filestackHandle: selectedFilestackHandle,
            })
          }
        }}
        isEnhanced={isEnhanced}
        onBgRemover={() => {
          if (onBgRemover) {
            onBgRemover({ filestackHandle: selectedFilestackHandle })
          }
        }}
        onChangeLayout={() => {
          onChangeLayoutClick(content.layoutId)
        }}
        onToggleFadeImage={() => {
          if (onToggleFadeImage) {
            onToggleFadeImage({})
          }
        }}
        isFadeImageEnabled={!!data?.enableFadeImage}
        onFullWidthClick={() => {
          setIsResizing(true)
          onFullWidthClick()
          setTimeout(() => setIsResizing(false), 1)
        }}
        isFullWidth={isFullWidth}
        onToggleBorder={() => {
          if (onToggleBorder) {
            onToggleBorder({})
          }
        }}
        isBorderEnabled={!!data?.enableBorder}
        hasSelectedImage={hasImageSelected}
        hasGraphicFrame={!!data.content.graphicFrame}
        transparency={data?.opacity ?? 100}
        onTransparencyChange={(value: number) => {
          if (onTransparencyChange) {
            onTransparencyChange({ opacity: value })
          }
        }}
        disableFadeEdge={
          data.content.fadeEdge === undefined ||
          data.content.fadeEdge === ICardProductFadeEdgeType.NONE
        }
      />
    </>
  )
}
