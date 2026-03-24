import React from 'react'
import styled from 'styled-components'
import { Image as AntImagePreview } from 'antd'
import { LabelText } from '../Text'

interface IImagePreview {
  labelText?: string
  width?: number
  src?: string
}

// @ts-ignore
const StyledImagePreview = styled(AntImagePreview)`
  display: block;
`

const StyledImagePreviewField = styled.div`
  margin: 20px 0;
`

export const ImagePreview: React.FC<IImagePreview> = ({
  labelText,
  width,
  src,
}) => {
  return (
    <StyledImagePreviewField>
      {labelText && <LabelText>{labelText}</LabelText>}
      <StyledImagePreview width={width} src={src} />
    </StyledImagePreviewField>
  )
}
