import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageSize,
  EulogiseProduct,
  ICardProductData,
  ICardProductOverlayUpdateOptions,
  ICardProductTheme,
  IGenericCardProductData,
  IGenericCardProductTypeData,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { CardProductOverlayAndBorder } from '../CardProductBorder/CardProductOverlayAndBorder'

const StyledOverlayPreview = styled.div<{ $backgroundImageUrl?: string }>`
  box-shadow: #9197a3 0 0 2px;
  position: relative;
  margin: 0 auto;
  ${({ $backgroundImageUrl }) =>
    $backgroundImageUrl
      ? `
    background: url(${$backgroundImageUrl}) no-repeat center center;
    background-size: cover;
  `
      : ''}
`

type IOverlayFormPreviewProps = {
  cardProduct: ICardProductData
  product: EulogiseProduct
  genericProductType?: IGenericCardProductTypeData
  productTheme: ICardProductTheme
  fields: ICardProductOverlayUpdateOptions
  pageSize: CardProductPageSize
}

export const OverlayFormPreview = ({
  product,
  cardProduct,
  productTheme,
  fields,
  pageSize,
}: IOverlayFormPreviewProps) => {
  const previewContainerHeight = 240 // in pixel
  const region = CardProductHelper.getRegionByPageSize(pageSize)
  const {
    width: newPreviewContainerWidth,
    height: newPreviewContainerHeight,
    scale: newPreviewContainerScale,
  } = CardProductHelper.getCardProductWidthAndHeightInScale({
    product,
    genericProductMetadata: (cardProduct as IGenericCardProductData)?.content
      ?.metadata,
    defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
    height: previewContainerHeight,
    pageSize,
  })

  const firstPageBackgroundImageUrl =
    CardProductHelper.getFirstPageBackgroundImageUrl({
      product,
      cardProduct,
      productTheme,
    })

  return (
    <StyledOverlayPreview
      $backgroundImageUrl={firstPageBackgroundImageUrl}
      style={{
        width: `${newPreviewContainerWidth}px`,
        height: `${newPreviewContainerHeight}px`,
      }}
    >
      <CardProductOverlayAndBorder
        hasOverlay
        product={product}
        overlayOpacity={fields.overlayOpacity}
        overlayBorderRadius={fields.borderRadius}
        overlayColor={fields.overlayColor}
        editorScaledFactor={newPreviewContainerScale}
        overlayEndPosition={fields.overlayEndPosition}
        overlayFadePosition={fields.overlayFadePosition}
        region={region}
        /*
        margin={{
          marginX: fields.margin[0],
          marginY: fields.margin[1],
        }}
*/
      />
    </StyledOverlayPreview>
  )
}
