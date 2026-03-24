import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ResizeDirection } from 're-resizable'
import { GlobalHotKeys } from 'react-hotkeys'
import { useDetectClickOutside } from '@eulogise/client-core'
import CSS from 'csstype'
import {
  ICardProductFrameImageChangeEvent,
  ICardProductFrameImageContainerStyle,
  ICardProductFrameImageStyle,
  ICardProductFrameScaleProps,
} from '@eulogise/core'
import { getResizeWrapperNewPosition, ResizeWrapper } from '../../ContentItem'
import Draggable from 'react-draggable'
import { STYLE } from '@eulogise/client-core'
import { CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD } from '@eulogise/helpers/dist/cardProduct.constants'

const StyledCardProductFrameImageEditor = styled.div<{
  $imageContainerWidth?: string
  $imageContainerHeight?: string
  $imageContainerTransform?: string
}>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  ${({
    $imageContainerWidth,
    $imageContainerHeight,
    $imageContainerTransform,
  }) => `
    width: ${$imageContainerWidth};
    height: ${$imageContainerHeight};
    transform: ${$imageContainerTransform};
  `}
`

const Overlay = styled.div<{ ref: any }>`
  position: fixed;
  background-color: rgba(53, 71, 90, 0.2);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`

const ContainerOverlay = styled.div`
  position: absolute;
  background-color: transparent;
  z-index: 3;
  top: -1000px;
  left: -1000px;
  right: -1000px;
  bottom: -1000px;
`

export type ICardProductFrameImageEditorFields = {
  maskImageUrl?: string
  imageStyle?: ICardProductFrameImageStyle
  containerStyle?: ICardProductFrameImageContainerStyle
}

type ICardProductFrameImageEditorProps = ICardProductFrameImageEditorFields &
  ICardProductFrameScaleProps & {
    imageUrl?: string
    imageContainerWidth?: string
    imageContainerHeight?: string
    imageContainerTransform?: string
    isGraphicFrame?: boolean
    onConfirm: (data: ICardProductFrameImageChangeEvent) => void
    onCancel: () => void
    borderRadius?: CSS.Property.BorderRadius
    enableBorder?: boolean
    isCardProductEditor?: boolean
  }

const ImageContainer = styled.div`
  position: absolute;
  z-index: 3;
  width: 0;
  height: 0;
`

const DisplayImageOverlay = styled.div<{ $maskImageUrl?: string }>`
  position: absolute;
  z-index: 1;
  ${({ $maskImageUrl }) =>
    $maskImageUrl
      ? `
      mask-image: url(${$maskImageUrl});
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    `
      : ''}
`

const WholeImage = styled.img`
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-drag: none;
  opacity: 0.4;
`

const keyMap = {
  CONFIRM: 'enter',
  CANCEL: 'esc',
}

export const CardProductFrameImageEditor = ({
  onConfirm,
  onCancel,
  imageStyle,
  containerStyle,
  imageContainerWidth,
  imageContainerHeight,
  imageContainerTransform,
  maskImageUrl,
  isGraphicFrame,
  imageUrl,
  borderRadius,
  containerRef, // this is the EditorPanel in the CardProductPageWithPagination for overlay
  enableBorder,
  isCardProductEditor = true,
}: ICardProductFrameImageEditorProps) => {
  const enabledBorderWidth: number = enableBorder
    ? (STYLE.CARD_PRODUCT_BORDER_SIZE_M as number)
    : 0
  const isResizing = useRef(false)
  const { centerPositionX, centerPositionY } =
    containerStyle as ICardProductFrameImageContainerStyle

  const overlayRef = useRef()
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (isResizing.current) {
        return
      }
      confirm()
    },
  })

  const [position, setPosition] = useState({
    x: imageStyle?.transformX!,
    y: imageStyle?.transformY!,
  })
  const [tmpPosition, setTmpPosition] = useState<{ x: number; y: number }>({
    x: imageStyle?.transformX!,
    y: imageStyle?.transformY!,
  })
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>()
  const [resizableSize, setResizableSize] = useState({
    width: imageStyle?.width || 100,
    height: imageStyle?.height || 100,
  })
  const [initialResizableSize, setInitialResizableSize] =
    useState(resizableSize)
  const borderSize =
    isCardProductEditor && !isGraphicFrame
      ? (STYLE.CARD_PRODUCT_BORDER_SIZE as number)
      : 0

  const containerWidthWithBorder = containerStyle?.width! + borderSize * 2
  const containerHeightWithBorder = containerStyle?.height! + borderSize * 2
  const leftBound =
    -(resizableSize.width - containerWidthWithBorder / 2) +
    CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
  const topBound =
    -(resizableSize?.height - containerHeightWithBorder / 2) +
    CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
  const rightBound =
    -(containerWidthWithBorder / 2) - CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
  const bottomBound =
    -(containerHeightWithBorder / 2) -
    CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD

  const lowerCaseResizeDirection = resizeDirection?.toString().toLowerCase()
  const minHeight = lowerCaseResizeDirection?.includes('bottom')
    ? Math.abs(position.y) +
      containerHeightWithBorder / 2 +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : lowerCaseResizeDirection?.includes('top')
    ? initialResizableSize.height -
      (Math.abs(position.y) - containerHeightWithBorder / 2) +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : lowerCaseResizeDirection === 'right'
    ? Math.abs(position.y) +
      containerHeightWithBorder / 2 +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : ''

  const minWidth = lowerCaseResizeDirection?.includes('right')
    ? Math.abs(position.x) +
      containerWidthWithBorder / 2 +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : lowerCaseResizeDirection?.includes('left')
    ? initialResizableSize.width -
      (Math.abs(position.x) - containerWidthWithBorder / 2) +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : lowerCaseResizeDirection === 'bottom'
    ? Math.abs(position.x) +
      containerWidthWithBorder / 2 +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : lowerCaseResizeDirection === 'top'
    ? initialResizableSize.width -
      (Math.abs(position.x) - containerWidthWithBorder / 2) +
      CARD_PRODUCT_RESIZE_AND_DRAGGING_THRESHOLD
    : ''

  const removeOverlay = () => {
    const containerEl = containerRef.current
    const overlayEl = overlayRef.current
    if (containerEl?.contains(overlayEl)) {
      containerEl?.removeChild(overlayEl)
    }
  }

  const confirm = () => {
    removeOverlay()
    onConfirm({ eventType: 'edit-confirm', size: resizableSize, position })
  }

  const cancel = () => {
    removeOverlay()
    onCancel()
  }

  const handlers = {
    CONFIRM: () => confirm(),
    CANCEL: () => cancel(),
  }
  const displayPosition = {
    x: tmpPosition.x ?? position.x,
    y: tmpPosition.y ?? position.y,
  }
  useEffect(() => {
    if (containerRef) {
      containerRef.current.appendChild(overlayRef.current)
    }
  }, [containerRef])

  const bounds = {
    left: leftBound,
    top: topBound,
    right: rightBound,
    bottom: bottomBound,
  }
  return (
    /* @ts-ignore */
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <StyledCardProductFrameImageEditor
        className={`card-product-frame-image-editor`}
        $imageContainerWidth={imageContainerWidth}
        $imageContainerHeight={imageContainerHeight}
        $imageContainerTransform={imageContainerTransform}
      >
        <Overlay
          id={`body-overlay`}
          ref={overlayRef}
          onClick={() => confirm()}
        />
        <ContainerOverlay id={`container-overlay`} onClick={() => confirm()} />
        <DisplayImageOverlay
          style={{
            // top: (centerPositionY as number) - containerHeightWithBorder / 2,
            // left: (centerPositionX as number) - containerWidthWithBorder / 2,
            width: containerWidthWithBorder,
            height: containerHeightWithBorder,
            overflow: 'hidden',
            borderRadius,
            top: enabledBorderWidth,
            left: enabledBorderWidth,
          }}
          $maskImageUrl={maskImageUrl}
        >
          <WholeImage
            style={{
              width: resizableSize.width,
              height: resizableSize.height,
              transform: `translate3d(${
                displayPosition.x + containerWidthWithBorder / 2
              }px, ${displayPosition.y + containerHeightWithBorder / 2}px, 0)`,
              opacity: 1,
            }}
            className="display-image-actual-image"
            src={imageUrl}
          />
        </DisplayImageOverlay>
        <ImageContainer
          ref={ref}
          style={{
            top: (centerPositionY ?? 0) + borderSize + enabledBorderWidth,
            left: (centerPositionX ?? 0) + borderSize + enabledBorderWidth,
          }}
          className="editor-frame-image-container"
        >
          {/* @ts-ignore */}
          <Draggable
            bounds={bounds}
            position={displayPosition}
            onStart={(ev) => {
              console.log('drag start', ev)
            }}
            onDrag={(ev, data) => {
              setTmpPosition({ x: data.x, y: data.y })
              setPosition({ x: data.x, y: data.y })
            }}
            onStop={(ev, data) => {
              setPosition({ x: data.x, y: data.y })
            }}
          >
            <div>
              <ResizeWrapper
                onResizeStart={(ev, dir, ele) => {
                  ev.stopPropagation()
                  isResizing.current = true
                  setInitialResizableSize(resizableSize)
                  setResizeDirection(dir)
                }}
                minHeight={minHeight}
                minWidth={minWidth}
                width={resizableSize.width}
                height={resizableSize.height}
                disabled={false}
                isFocused={true}
                lockAspectRatio
                onFocus={() => {}}
                isAnyRowFocused={true}
                onResize={({ width, height, direction, delta }) => {
                  if (minWidth > width || minHeight > height) {
                    return
                  }
                  const resizeWrapperNewPosition = getResizeWrapperNewPosition({
                    currentPosition: {
                      top: position.y,
                      left: position.x,
                    },
                    direction,
                    delta,
                  })
                  setResizableSize({
                    width,
                    height,
                  })
                  setTmpPosition({
                    x: resizeWrapperNewPosition.left,
                    y: resizeWrapperNewPosition.top,
                  })
                }}
                onResizeEnd={() => {
                  setTimeout(() => {
                    isResizing.current = false
                  }, 100)
                  setInitialResizableSize(resizableSize)
                  setPosition(tmpPosition)
                }}

                // onResizeEnd={({ width, height }) => {
                //   if (width < minWidth || height < minHeight) {
                //     return
                //   }
                //   console.log('end', {
                //     width,
                //     height,
                //   })
                //   // setResizableSize({ width, height })
                // }}
              >
                <WholeImage
                  className="editor-frame-image-actual-image"
                  src={imageUrl}
                  style={{
                    width: resizableSize.width,
                    height: resizableSize.height,
                  }}
                />
              </ResizeWrapper>
            </div>
          </Draggable>
        </ImageContainer>
      </StyledCardProductFrameImageEditor>
    </GlobalHotKeys>
  )
}
