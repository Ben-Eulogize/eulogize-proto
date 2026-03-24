import { CardProductOverlayAndBorder } from '../CardProductBorder/CardProductOverlayAndBorder'
import React from 'react'
import styled from 'styled-components'
import {
  CardProductPageSize,
  EulogiseProduct,
  EulogiseRegion,
  IBorderSettingFormFields,
  ICardProductTheme,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'
import { STYLE } from '@eulogise/client-core'

const StyledBorderPreview = styled.div`
  box-shadow: #9197a3 0 0 2px;
  position: relative;
  margin: 0 auto ${STYLE.GUTTER};
`

type IBorderFormPreviewProps = {
  product: EulogiseProduct
  genericProductMetadata?: IGenericCardProductMetadata
  productTheme: ICardProductTheme
  fields: IBorderSettingFormFields
  region: EulogiseRegion
  pageSize: CardProductPageSize
}

export const BorderFormPreview = ({
  product,
  genericProductMetadata,
  productTheme,
  fields,
  region,
  pageSize,
}: IBorderFormPreviewProps) => {
  const previewContainerHeight = 180 // in pixel
  const { width: newPreviewContainerWidth, height: newPreviewContainerHeight } =
    CardProductHelper.getCardProductWidthAndHeightInScale({
      product,
      genericProductMetadata,
      defaultThemeLayoutColumns: productTheme?.defaultThemeLayoutColumns,
      height: previewContainerHeight,
      pageSize,
      region,
    })

  return (
    <StyledBorderPreview
      style={{
        width: `${newPreviewContainerWidth}px`,
        height: `${newPreviewContainerHeight}px`,
      }}
    >
      <CardProductOverlayAndBorder
        hasBorder
        editorScaledFactor={1}
        product={product}
        borderStyle={fields.borderStyle}
        color={fields.color}
        thickness={fields.thickness}
        region={region}
      />
    </StyledBorderPreview>
  )
}
