import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'
import { ImageHelper } from '@eulogise/helpers'

interface IImageSizeProps {
  isAlignCenter?: boolean
  filestackHandle: string
  className?: string
}

const StyledImageSize = styled.div`
  font-size: ${STYLE.FONT_SIZE_SM};
  color: ${COLOR.DOVE_GREY};
  flex: 1;
  white-space: nowrap;
  ${({ $isAlignCenter }: { $isAlignCenter: boolean }) =>
    $isAlignCenter &&
    `
    text-align: center;
  `}
`

export const ImageSize: React.FC<IImageSizeProps> = ({
  isAlignCenter,
  className,
  filestackHandle,
}) => {
  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  }>()

  useEffect(() => {
    if (!filestackHandle) {
      return
    }
    ImageHelper.getImageSizeViaFilestack(filestackHandle).then((is) =>
      setImageSize(is),
    )
  }, [filestackHandle])

  const width = imageSize?.width
  const height = imageSize?.height

  return width && height ? (
    <StyledImageSize
      className={className}
      $isAlignCenter={isAlignCenter!}
    >{`${width} x ${height}`}</StyledImageSize>
  ) : null
}
