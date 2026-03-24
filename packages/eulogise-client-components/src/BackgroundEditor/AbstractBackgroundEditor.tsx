import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import {
  BackgroundImageAlignmentType,
  GetImageObject,
  ICardProductFrameImageChangeDimensionEvent,
  IImageSizeAndPosition,
} from '@eulogise/core'
import { CropBackgroundImageHelper, ImageHelper } from '@eulogise/helpers'
import { useGetImageSize } from '../hooks'
import {
  CardProductFrameImageEditor,
  ICardProductFrameImageEditorFields,
} from '../CardProductFrame/editor/CardProductFrameImageEditor'

const StyledAbstractBackgroundEditor = styled.div<{ $isPreview: boolean }>`
  ${({ $isPreview }) =>
    $isPreview
      ? ``
      : `box-shadow: ${STYLE.BOX_SHADOW_SIZE} ${COLOR.BOX_SHADOW_COLOR};`}
  transform: scale(1);
  transform-origin: center center;
`

const BackgroundEditorContent = styled.div`
  overflow: hidden;
`

const OriginalImage = styled.img<IImageSizeAndPosition>`
  user-select: none;
  display: block;
  position: relative;
  ${({ width, height, top, left }) => `
    ${width ? `width: ${width}px;` : ''}
    ${height ? `height: ${height}px;` : ''}
    ${left || top ? `transform: translate(${left ?? 0}px, ${top ?? 0}px);` : ''}
  `}
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export type AbstractBackgroundEditorProps = {
  isPreview?: boolean
  className?: string
  originalImage: GetImageObject
  width: number
  height: number
  containerRef?: React.RefObject<HTMLDivElement>
  imageSizeAndPosition?: IImageSizeAndPosition
  onImageSizeAndPositionChange: (data: IImageSizeAndPosition) => void
}

export const AbstractBackgroundEditor = ({
  width: containerWidth,
  height: containerHeight,
  originalImage,
  className,
  containerRef,
  imageSizeAndPosition,
  onImageSizeAndPositionChange,
  isPreview,
}: AbstractBackgroundEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorFields, setEditorFields] =
    useState<ICardProductFrameImageEditorFields>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const originalImageSize = useGetImageSize({ image: originalImage })
  const originalImageUrl = ImageHelper.getImageUrl(originalImage)

  useEffect(() => {
    if (originalImageSize && imageSizeAndPosition === undefined) {
      onImageSizeAndPositionChange(
        CropBackgroundImageHelper.getDefaultDisplayImageSizeAndPosition({
          containerSize: {
            width: containerWidth,
            height: containerHeight,
          },
          actualImageSize: originalImageSize,
          alignment: BackgroundImageAlignmentType.FULL,
          isTwoColumnsPages: false,
          isRemoveSideBleed: false,
          isRemoveFullBleed: false,
        }),
      )
    }
  }, [originalImageSize])

  if (!imageSizeAndPosition) {
    return null
  }

  return (
    <StyledAbstractBackgroundEditor
      className={`${className} abstract-background-editor`}
      $isPreview={!!isPreview}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <BackgroundEditorContent
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
        onDoubleClick={() => {
          const containerEl = editorRef.current as any
          const imageWidth = imageSizeAndPosition.width
          const imageHeight = imageSizeAndPosition.height
          const transformX =
            (imageSizeAndPosition.left ?? 0) +
            -(imageWidth / 2) +
            (imageWidth - containerEl.clientWidth) / 2
          const transformY =
            (imageSizeAndPosition.top ?? 0) +
            -imageHeight / 2 +
            (imageHeight - containerEl.clientHeight) / 2

          setEditorFields({
            // imageStyle - rendered width and height and transformX and transform
            imageStyle: {
              width: imageWidth,
              height: imageHeight,
              transformX,
              transformY,
            },
            containerStyle: {
              width: containerEl.clientWidth,
              height: containerEl.clientHeight,
              centerPositionX: containerEl.clientWidth / 2,
              centerPositionY: containerEl.clientHeight / 2,
            },
          })
          setIsEditing(true)
        }}
      >
        {isEditing && editorFields && (
          <CardProductFrameImageEditor
            {...editorFields}
            imageUrl={originalImageUrl}
            onConfirm={(data: ICardProductFrameImageChangeDimensionEvent) => {
              onImageSizeAndPositionChange({
                width: data.size.width,
                height: data.size.height,
                top: data.position.y + editorRef.current?.clientHeight! / 2,
                left: data.position.x + editorRef.current?.clientWidth! / 2,
              })
              setIsEditing(false)
            }}
            onCancel={() => {
              setEditorFields(undefined)
              setIsEditing(false)
            }}
            containerRef={containerRef}
            enableBorder={false}
            isCardProductEditor={false}
          />
        )}
        <ImageContainer ref={editorRef}>
          <OriginalImage {...imageSizeAndPosition} src={originalImageUrl} />
        </ImageContainer>
      </BackgroundEditorContent>
    </StyledAbstractBackgroundEditor>
  )
}
