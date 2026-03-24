import React from 'react'
import styled from 'styled-components'
import { CardProductHelper } from '@eulogise/helpers'
import {
  BleedPageMode,
  ICardProductData,
  IGenericCardProductData,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import { PageBleed } from './PageBleed'
import { COLOR } from '@eulogise/client-core'

const StyledDummyCardProductPage = styled.div<{
  $width: string
  $height: string
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`

type IDummyCardProductPageProps = {
  cardProduct: ICardProductData
  genericProductMetadata?: IGenericCardProductMetadata
  editorScaledFactor: number
  bleed?: boolean
  bleedPageMode?: BleedPageMode
}

const StyledPageBleed = styled(PageBleed)`
  background-color: ${COLOR.WHITE};
`

export const DummyCardProductPage = ({
  cardProduct,
  editorScaledFactor,
  bleed,
  bleedPageMode,
}: IDummyCardProductPageProps) => {
  const pageSize = cardProduct?.content?.pageSize
  const pageOrientation = cardProduct.content.pageOrientation
  const { pageWidth, pageHeight } = CardProductHelper.getPageWidthAndHeight({
    genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
      ?.metadata,
    pageSize,
    pageOrientation,
  })

  const cardProductPageHeight = pageHeight * editorScaledFactor
  const cardProductPageWidth = pageWidth * editorScaledFactor

  return (
    <StyledPageBleed
      className={`page-bleed`}
      $bleedPageMode={bleedPageMode}
      $width={cardProductPageWidth}
      $height={cardProductPageHeight}
    >
      <StyledDummyCardProductPage
        $width={`${cardProductPageWidth}px`}
        $height={`${cardProductPageHeight}px`}
      />
    </StyledPageBleed>
  )
}
