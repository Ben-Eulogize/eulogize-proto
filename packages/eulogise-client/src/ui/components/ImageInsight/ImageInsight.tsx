import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ImageHelper } from '@eulogise/helpers'

const StyledImageInsight = styled.div``

const ImageInsightPreview = styled.img`
  max-width: 220px;
  max-height: 220px;
`

type IImageInsightProps = {
  src: string
}

export const ImageInsight = ({ src }: IImageInsightProps) => {
  const [imageSize, setImageSize] = useState<
    { width: number; height: number } | undefined
  >(undefined)
  // const [fileSize, setFileSize] = useState()
  const [imagePath, setImagePath] = useState<string>()

  useEffect(() => {
    const isFullUrl = /^http/.test(src)
    setTimeout(async () => {
      const imageObj = isFullUrl
        ? {
            url: src,
          }
        : {
            filepath: src,
          }
      const size = await ImageHelper.getImageSize(imageObj)
      const absoluteImagePath = ImageHelper.getImageUrl(imageObj)
      /*
      const imageFileSize = await ImageHelper.getImageFileSize(
        absoluteImagePath,
      )

      setFileSize(imageFileSize)
*/
      setImagePath(absoluteImagePath)
      setImageSize(size)
    }, 0)
  }, [])

  return (
    <StyledImageInsight
      style={!imageSize ? { backgroundColor: 'red' } : undefined}
    >
      <ImageInsightPreview src={imagePath} />
      {imageSize && (
        <>
          <div>
            <b>Path:</b>
            <br />
            <div style={{ width: '220px' }}>{src}</div>
          </div>
          {/*
          <div>
            <b>File Size:</b> {fileSize}
          </div>
*/}
          <div>
            <b>Image Size:</b> {imageSize.width}x{imageSize.height}
          </div>
          <div>
            <b>Aspect Ratio:</b> {ImageHelper.calculateAspectRatio(imageSize)}
          </div>
        </>
      )}
    </StyledImageInsight>
  )
}
