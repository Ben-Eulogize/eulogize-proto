import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CardProductViewDisplayMode,
  ICardProductFrameImageChangeDimensionEvent,
  ICardProductFrameImageChangeEvent,
  ICardProductFrameImageContent,
  ICardProductFrameImageStyle,
} from '@eulogise/core'
import {
  ImageHelper,
  UtilHelper,
  CardProductFrameHelper,
} from '@eulogise/helpers'
import { ICardProductFrameImageEditorFields } from '../editor/CardProductFrameImageEditor'
import { COLOR } from '@eulogise/client-core'
import { ChangeImageIcon } from '../../icons'
import { throttle } from 'lodash'

const StyledCardProductFrameImageItem = styled.div<{
  $width?: string
  $height?: string
  $transform?: string
  $backgroundColor: string
}>`
  user-select: none;
  ${({ $width, $height, $transform }) => `
    width: ${$width ?? '100%'};
    height: ${$height ?? '100%'};
    transform: ${$transform ?? 'none'};
  `}
  ${({ $backgroundColor }) =>
    $backgroundColor && `background-color: ${$backgroundColor};`}
`

const CardProductFrameImage = styled.img<{
  $isPositionFixed: boolean
}>`
  ${({ $isPositionFixed }) =>
    !$isPositionFixed
      ? `
      position: absolute;
      left: 50%;
      top: 50%;
  `
      : ''}
  user-select: none;
`

type ICardProductFrameImageContentProps = {
  contentId: string
  className?: string
  imageUrl: string
  imageAssetContent: ICardProductFrameImageContent
  isResizing?: boolean
  graphicFrameContainerWidth?: string
  graphicFrameContainerHeight?: string
  containerTransform?: string
  onDoubleClick: (props: ICardProductFrameImageEditorFields) => void
  onFrameImageChange: (imageEvent: ICardProductFrameImageChangeEvent) => void
  isBorderShowed: boolean
  isDummyImage: boolean
  cardProductDisplayMode: CardProductViewDisplayMode
}

let observeDiv: any

// @ts-ignore
const StyledChangeImageIcon = styled(ChangeImageIcon)`
  width: 100%;
  height: 100%;
  max-width: 30px;
  max-height: 30px;
`

const SpinContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DummyImageContainer = styled.div.attrs({
  children: <StyledChangeImageIcon />,
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR.DARK_BLUE};
`

// refer to ICardProductFrameImageChangeDimensionEvent
const isFrameImageChangeDimensionEvent = (eventType: string) => {
  switch (eventType) {
    case 'load':
    case 'resize':
    case 'edit-confirm':
    case 'not-set':
      return true
    default:
      return false
  }
}

export const CardProductFrameImageItem = ({
  contentId,
  imageUrl,
  isResizing,
  imageAssetContent,
  graphicFrameContainerWidth,
  graphicFrameContainerHeight,
  containerTransform,
  className,
  onDoubleClick,
  isBorderShowed = false,
  onFrameImageChange,
  isDummyImage,
  cardProductDisplayMode,
}: ICardProductFrameImageContentProps) => {
  const {
    renderImageWidth,
    renderImageHeight,
    transformY,
    transformX,
    isImagePositionFixed,
  } = imageAssetContent
  const shouldShowSpinIconWhileFetching = !(
    cardProductDisplayMode === CardProductViewDisplayMode.PRINT ||
    cardProductDisplayMode === CardProductViewDisplayMode.THUMBNAIL ||
    cardProductDisplayMode === CardProductViewDisplayMode.PREVIEW
  )
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isResizingReady, setIsResizingReady] = useState<boolean>(false)
  const newRectRef = useRef<ICardProductFrameImageChangeEvent | undefined>()
  const containerRef = useRef(null)
  const [defaultImageStyle, setDefaultImageStyle] =
    useState<ICardProductFrameImageStyle>()
  const isEditable =
    cardProductDisplayMode === CardProductViewDisplayMode.EDIT ||
    cardProductDisplayMode === CardProductViewDisplayMode.TEMPLATE
  /*
  const [
    {
      /!* isDragging *!/
    },
    drag,
  ] = useDrag(
    () => ({
      type: 'CARD_PRODUCT_FRAME_IMAGE',
      item: { filestackHandle, filepath, filename },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [filepath, filename, filestackHandle],
  )
  const [
    {
      /!*isOver*!/
    },
    drop,
  ] = useDrop(
    () => ({
      accept: 'CARD_PRODUCT_FRAME_IMAGE',
      drop: (item: IImageAssetContent) => {
        onFrameImageChange({
          eventType: 'change-image-asset',
          imageAssetContent: item,
        })
        return
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [filepath, filename, filestackHandle],
  )
*/

  useEffect(() => {
    if (!shouldShowSpinIconWhileFetching) {
      return
    }
    if (imageUrl) {
      setIsFetching(true)
      ImageHelper.preloadImage(imageUrl, () => {
        setIsFetching(false)
      })
    }
  }, [imageUrl])

  useEffect(() => {
    if (observeDiv) {
      observeDiv.unobserve(containerRef.current)
    }

    observeDiv = new ResizeObserver(
      throttle((entries) => {
        for (const entry of entries) {
          // Handle the resize event here
          const {
            width: existingContainerWidth,
            height: existingContainerHeight,
          } = entry.contentRect
          // fix: on resize blue frame background behind
          // https://trello.com/c/pHAJN6lf/1083-frames-dragged-to-different-ratios-often-dont-lock-image-to-minimum-size-revealing-some-of-the-blue-frame-background-behind-if-a
          const CONTAINER_MARGIN = 8
          const containerWidth = existingContainerWidth + CONTAINER_MARGIN
          const containerHeight = existingContainerHeight + CONTAINER_MARGIN
          const minTopY = -(containerHeight / 2)
          const minLeftX = -(containerWidth / 2)
          const minBottomY = containerHeight / 2
          // resize if render size is smaller than the container size
          if (
            renderImageWidth < containerWidth ||
            renderImageHeight < containerHeight
          ) {
            let newRenderImageWidth = renderImageWidth
            let newRenderImageHeight = renderImageHeight
            let newTransformX = transformX
            let newTransformY = transformY
            const exceedingHeightScale = containerHeight / renderImageHeight
            const exceedingWidthScale = containerWidth / renderImageWidth
            if (exceedingHeightScale <= exceedingWidthScale) {
              newRenderImageWidth = containerWidth
              newRenderImageHeight = exceedingWidthScale * renderImageHeight
            } else if (exceedingHeightScale > exceedingWidthScale) {
              newRenderImageHeight = containerHeight
              newRenderImageWidth = exceedingHeightScale * renderImageWidth
            }
            const widthDiff = newRenderImageWidth - renderImageWidth
            const heightDiff = newRenderImageHeight - renderImageHeight
            newTransformX = transformX - Math.abs(widthDiff / 2)
            newTransformY = transformY - Math.abs(heightDiff / 2)
            const newBottom = newTransformY + renderImageHeight
            if (minTopY < transformY) {
              newTransformY = minTopY
            } else if (minBottomY > newBottom) {
              newTransformY = minTopY
            }
            if (minLeftX < transformX) {
              newTransformX = minLeftX
            }
            const eventData = {
              size: {
                width: newRenderImageWidth,
                height: newRenderImageHeight,
              },
              position: {
                x: newTransformX,
                y: newTransformY,
              },
              imageUrl,
            }
            newRectRef.current = {
              eventType: 'not-set',
              ...eventData,
            }
          }
          // reposition if needed
          else {
            let newTransformY = transformY
            let newTransformX = transformX
            const newBottom = transformY + renderImageHeight
            if (minTopY < transformY) {
              newTransformY = minTopY
            } else if (minBottomY > newBottom) {
              newTransformY = minBottomY - renderImageHeight
            }
            if (minLeftX < transformX) {
              newTransformX = minLeftX
            }
            newRectRef.current = {
              eventType: 'not-set',
              size: {
                width: renderImageWidth,
                height: renderImageHeight,
              },
              position: {
                y: newTransformY,
                x: newTransformX,
              },
            }
          }
        }
      }, 100),
    )

    if (containerRef.current) {
      observeDiv.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observeDiv.unobserve(containerRef.current)
      }
    }
  }, [renderImageWidth, renderImageHeight, transformX, transformY, isResizing])

  useEffect(() => {
    if (isResizingReady === true && isResizing === false) {
      setTimeout(() => {
        if (isFrameImageChangeDimensionEvent(newRectRef?.current?.eventType!)) {
          const newRectRefCurrent =
            newRectRef.current as ICardProductFrameImageChangeDimensionEvent
          const newRectRefData = {
            size: newRectRefCurrent?.size,
            position: newRectRefCurrent?.position,
          }

          const existing = {
            size: {
              width: renderImageWidth,
              height: renderImageHeight,
            },
            position: {
              x: transformX,
              y: transformY,
            },
          }
          if (UtilHelper.equals(newRectRefData, existing)) {
            return
          }
          if (newRectRefCurrent) {
            onFrameImageChange({
              eventType: 'resize',
              size: {
                width: newRectRefCurrent.size.width,
                height: newRectRefCurrent.size.height,
              },
              position: {
                x: newRectRefCurrent.position.x,
                y: newRectRefCurrent.position.y,
              },
            })
            newRectRef.current = undefined
          }
        }
      }, 100)
    }
  }, [isResizing, isResizingReady])

  // calculate default backgroundSize
  useEffect(() => {
    // set default if not available
    if (!renderImageWidth || !renderImageHeight || !transformX || !transformY) {
      const clientWidth =
        (containerRef?.current as unknown as HTMLElement)?.clientWidth ?? 0
      const clientHeight =
        (containerRef?.current as unknown as HTMLElement)?.clientHeight ?? 0
      const updateDefaultImageSize = async () => {
        const {
          renderImageWidth: renderWidth,
          renderImageHeight: renderHeight,
          transformX: defaultTransformX,
          transformY: defaultTransformY,
        } = CardProductFrameHelper.adjustToDefaultImagePosition({
          imageAssetContent,
          containerSize: {
            width: clientWidth,
            height: clientHeight,
          },
        })

        /*
        const {
          renderWidth,
          renderHeight,
          transformX: defaultTransformX,
          transformY: defaultTransformY,
        } = await CardProductFrameHelper.calculateDefaultFrameImageSizeAndPositionPromise(
          {
            imageUrl,
            containerSize: {
              width: clientWidth,
              height: clientHeight,
            },
            isBorderShowed,
          },
        )
*/

        onFrameImageChange({
          eventType: 'load',
          size: {
            width: renderWidth!,
            height: renderHeight!,
          },
          position: {
            x: defaultTransformX!,
            y: defaultTransformY!,
          },
        })

        // for default images
        setDefaultImageStyle({
          transformX: defaultTransformX!,
          transformY: defaultTransformY!,
          width: renderWidth,
          height: renderHeight,
        })

        setIsResizingReady(true)
      }
      updateDefaultImageSize()
    }
  }, [renderImageWidth, renderImageHeight, transformX, transformY, imageUrl])

  const newDimensionRectRefCurrent =
    newRectRef.current as ICardProductFrameImageChangeDimensionEvent
  const imageStyle = {
    width:
      (isResizing ? newDimensionRectRefCurrent?.size?.width : undefined) ??
      renderImageWidth ??
      defaultImageStyle?.width,
    height:
      (isResizing ? newDimensionRectRefCurrent?.size?.height : undefined) ??
      renderImageHeight ??
      defaultImageStyle?.height,
    transformX:
      (isResizing ? newDimensionRectRefCurrent?.position.x : undefined) ??
      transformX ??
      defaultImageStyle?.transformX,
    transformY:
      (isResizing ? newDimensionRectRefCurrent?.position.y : undefined) ??
      transformY ??
      defaultImageStyle?.transformY,
  }

  /*
  const refHandler = (el: any) => {
    containerRef.current = el
    drag(el)
    drop(el)
  }
*/

  const isLoading =
    renderImageHeight === undefined ||
    renderImageWidth === undefined ||
    transformX === undefined ||
    transformY === undefined ||
    isFetching

  return (
    <StyledCardProductFrameImageItem
      $height={graphicFrameContainerHeight}
      $width={graphicFrameContainerWidth}
      $transform={containerTransform}
      className={`${className ?? ''} card-product-frame-image-item`}
      $backgroundColor={isDummyImage ? COLOR.PASTEL_BLUE : 'transparent'}
      ref={containerRef}
      onDoubleClick={() => {
        if (!isEditable) {
          return
        }
        const containerEl = containerRef.current as any
        onDoubleClick({
          imageStyle,
          containerStyle: {
            width: containerEl.clientWidth,
            height: containerEl.clientHeight,
            centerPositionX: containerEl.clientWidth / 2,
            centerPositionY: containerEl.clientHeight / 2,
          },
        })
      }}
    >
      {isDummyImage ? (
        <DummyImageContainer id={contentId} className={`dummy-icon`} />
      ) : isLoading ? (
        // have to fix this to fix image resize on changing image
        <SpinContainer />
      ) : (
        <CardProductFrameImage
          $isPositionFixed={!!isImagePositionFixed}
          className={`card-product-frame-image`}
          id={contentId}
          /*ref={(el) => refHandler}*/
          style={{
            width: imageStyle.width,
            height: imageStyle.height,
            transform: `translate3d(${imageStyle.transformX}px, ${imageStyle.transformY}px, 0)`,
          }}
          src={imageUrl}
          draggable={isEditable}
        />
      )}
    </StyledCardProductFrameImageItem>
  )
}
