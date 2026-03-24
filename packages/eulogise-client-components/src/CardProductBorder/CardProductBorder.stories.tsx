import React from 'react'
import { CardProductOverlayAndBorder } from './CardProductOverlayAndBorder'
import styled from 'styled-components'
import {
  CardProductBorderThicknessType,
  CardProductBorderType,
  EulogiseProduct,
  EulogiseRegion,
} from '@eulogise/core'
import { CardProductHelper } from '@eulogise/helpers'

export default {
  title: 'CardProduct/CardProductOverlayAndBorder',
  component: CardProductOverlayAndBorder,
  argTypes: {},
}

const MockBookletContainer = styled.div<{ product: EulogiseProduct }>`
  ${({ product }) => {
    const { pageWidth, pageHeight } =
      CardProductHelper.getPageWidthAndHeightByProduct({ product })
    return `
      width: ${pageWidth}px;
      height: ${pageHeight}px;
    `
  }}
  background: url('https://media.eulogisememorials.com/backgroundImages/Fall_Flowers/AU/Fall_Flowers_THUMBNAIL.jpg');
  box-shadow: #9197a3 0 0 2px;
  position: relative;
`

export const BorderSingleSolid = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      region={EulogiseRegion.USA}
      product={EulogiseProduct.BOOKLET}
      editorScaledFactor={0}
      borderStyle={CardProductBorderType.SINGLE_SOLID}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
    />
  </MockBookletContainer>
)

export const BorderSingleDashed = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      region={EulogiseRegion.USA}
      product={EulogiseProduct.BOOKLET}
      editorScaledFactor={0}
      borderStyle={CardProductBorderType.SINGLE_DASHED}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
    />
  </MockBookletContainer>
)

export const BorderSingleDotted = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      region={EulogiseRegion.USA}
      product={EulogiseProduct.BOOKLET}
      editorScaledFactor={0}
      borderStyle={CardProductBorderType.SINGLE_DOTTED}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
    />
  </MockBookletContainer>
)

export const BorderDoubleSolid = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      product={EulogiseProduct.BOOKLET}
      region={EulogiseRegion.USA}
      borderStyle={CardProductBorderType.DOUBLE_SOLID}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
      editorScaledFactor={0}
    />
  </MockBookletContainer>
)

export const BorderDoubleDashed = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      region={EulogiseRegion.USA}
      product={EulogiseProduct.BOOKLET}
      editorScaledFactor={0}
      borderStyle={CardProductBorderType.DOUBLE_DASHED}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
    />
  </MockBookletContainer>
)

export const BorderDoubleDotted = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder
      hasBorder
      region={EulogiseRegion.USA}
      product={EulogiseProduct.BOOKLET}
      editorScaledFactor={0}
      borderStyle={CardProductBorderType.DOUBLE_DOTTED}
      color={'black'}
      thickness={CardProductBorderThicknessType.MEDIUM}
    />
  </MockBookletContainer>
)

export const OverlayBooklet = () => (
  <MockBookletContainer product={EulogiseProduct.BOOKLET}>
    <CardProductOverlayAndBorder hasOverlay product={EulogiseProduct.BOOKLET} />
  </MockBookletContainer>
)
