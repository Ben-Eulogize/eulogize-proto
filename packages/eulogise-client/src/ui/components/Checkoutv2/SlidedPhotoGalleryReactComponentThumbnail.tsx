import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

type ISlidedPhotoGalleryReactComponentThumbnailProps = {
  children?: React.ReactNode
  size: number
  onClick: () => void
  isSelected: boolean
  fitterStyle: React.CSSProperties
  isLoading: boolean
  isAddThumbnailPadding?: boolean
}

const StyledSlidedPhotoGalleryReactComponentThumbnail = styled.div<{
  $size: number
  $isSelected: boolean
}>`
  position: relative;
  border-radius: 8px;
  ${({ $size }) => `
    ${$size !== undefined ? `width: ${$size}px; height: ${$size}px;` : ''}
  `}
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.ISABELLINE};
  ${({ $isSelected }) =>
    $isSelected && `border: 1px solid ${COLOR.CORE_PURPLE_80};`}
`

const ThumbnailFitter = styled.div<{ $scale?: number }>`
  ${({ $scale }) => `
    ${$scale !== undefined ? `transform: scale(${$scale});` : ''}
`}
`

export const SlidedPhotoGalleryReactComponentThumbnail = ({
  children,
  isLoading,
  size,
  onClick,
  isSelected,
  fitterStyle,
  isAddThumbnailPadding = true,
}: ISlidedPhotoGalleryReactComponentThumbnailProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [componentSize, setComponentSize] = React.useState<number>(size)
  useEffect(() => {
    if (ref.current?.firstChild?.clientWidth) {
      setComponentSize(ref.current?.firstChild?.clientWidth)
    }
  }, [ref.current?.firstChild, isLoading])
  const padding = isAddThumbnailPadding
    ? componentSize * 0.1 // 10% padding
    : 0
  const scale =
    componentSize !== undefined && size !== undefined
      ? size / (componentSize + padding) // 20 pixel for the padding
      : 1

  return (
    <StyledSlidedPhotoGalleryReactComponentThumbnail
      $size={size}
      ref={ref}
      onClick={onClick}
      $isSelected={isSelected}
    >
      <ThumbnailFitter $scale={scale} style={fitterStyle}>
        {children}
      </ThumbnailFitter>
    </StyledSlidedPhotoGalleryReactComponentThumbnail>
  )
}
