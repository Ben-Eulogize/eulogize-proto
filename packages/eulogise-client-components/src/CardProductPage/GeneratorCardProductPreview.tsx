import React from 'react'
import {
  CardProductPreview,
  ICardProductPreviewProps,
} from './CardProductPreview'
import styled from 'styled-components'

const StyledGeneratorCardProductPreview = styled.div``

export const GeneratorCardProductPreview = (
  cardProductPreviewProps: ICardProductPreviewProps,
) => {
  return (
    <StyledGeneratorCardProductPreview
      className={`generator-card-product-preview`}
    >
      <CardProductPreview
        {...cardProductPreviewProps}
        maxPhotoSize={{
          width: 1200,
          height: 1200,
        }}
      />
    </StyledGeneratorCardProductPreview>
  )
}
