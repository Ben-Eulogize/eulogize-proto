import {
  BLEED,
  BleedPageMode,
  CARD_PRODUCT_THICKNESS,
  CardProductBorderThicknessType,
  CardProductBorderType,
  EulogiseProduct,
  EulogiseRegion,
  ICardProductBorderSettings,
  ICardProductSingleBorder,
  IGenericCardProductMetadata,
} from '@eulogise/core'
import styled from 'styled-components'
import { SingleCardProductBorder } from './SingleCardProductBorder'
import React, { CSSProperties } from 'react'
import { CardProductHelper, CardProductOverlayHelper } from '@eulogise/helpers'
import { GraphicBorder } from '../BorderAsset/GraphicBorder'

const CardProductBordersContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`

type ICardProductOverlayAndBorderProps = ICardProductBorderSettings & {
  hasBorder?: boolean
  hasOverlay?: boolean

  // overlay & border props
  product: EulogiseProduct
  margin?: {
    marginX?: number
    marginY?: number
  }
  genericProductMetadata?: IGenericCardProductMetadata
  editorScaledFactor?: number
  bleedPageMode?: BleedPageMode
  region?: EulogiseRegion

  // overlay props
  overlayColor?: string
  overlayOpacity?: number
  overlayEndPosition?: {
    top: number
    bottom: number
  }
  overlayFadePosition?: {
    top: number
    bottom: number
  }
  overlayBorderRadius?: string
}

const replaceWithEnvironmentVariables = ({
  template,
  variables,
  bleedPageMode,
}: {
  template: string
  variables: {
    borderWidth: number | string
    borderHeight: number | string
    thickness: number | string
  }
  bleedPageMode?: BleedPageMode
}) => {
  const { borderWidth, borderHeight, thickness } = variables
  return template
    .replace(
      /\{\{\{\s*width\s*\}\}\}/g,
      `calc(${borderWidth}% - ${
        bleedPageMode
          ? bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED ||
            bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
            ? BLEED
            : BLEED * 2
          : 0
      }px)`,
    )
    .replace(
      /\{\{\{\s*height\s*\}\}\}/g,
      `calc(${borderHeight}% - ${bleedPageMode ? BLEED * 2 : 0}px)`,
    )
    .replace(/\{\{\{\s*thickness\s*\}\}\}/g, `${thickness}px`)
}

// similar to SingleCardProductBorderContainer
const CardProductOverlayContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`

// similar to StyledSingleCardProductBorder
const CardProductOverlayContent = styled.div<{
  $bleedPageMode?: BleedPageMode
}>`
  position: relative;
  ${({ $bleedPageMode }) =>
    $bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED
      ? `margin-left: ${BLEED}px;`
      : $bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
      ? `margin-right: ${BLEED}px;`
      : ''}
`

const StyledCardProductOverlay = styled.div`
  position: absolute;
  width: 100%;
`

export const CardProductOverlayAndBorder = ({
  hasBorder = false,
  hasOverlay = false,

  // border & overlay props
  product,
  region = EulogiseRegion.USA,
  bleedPageMode,
  editorScaledFactor = 1,
  margin,
  genericProductMetadata,

  // border props
  borderStyle = CardProductBorderType.SINGLE_SOLID,
  color = 'black',
  thickness = CardProductBorderThicknessType.THIN,

  // overlay props
  overlayColor = '#fff',
  overlayOpacity = 0.85,
  overlayBorderRadius,
  overlayFadePosition = {
    top: 0,
    bottom: 100,
  },
  overlayEndPosition = { top: 0, bottom: 100 },
}: ICardProductOverlayAndBorderProps) => {
  const borders: Array<ICardProductSingleBorder> = hasBorder
    ? CardProductHelper.getBorderStylesByType({
        borderType: borderStyle,
        editorScaledFactor,
      })
    : []

  const thicknessInPixel: number = CARD_PRODUCT_THICKNESS[thickness]
  const { marginX: defaultMarginX, marginY: defaultMarginY } =
    CardProductHelper.getDefaultBorderMargin({
      product,
      genericProductMetadata,
    })
  const marginX = margin?.marginX ?? defaultMarginX
  const marginY = margin?.marginY ?? defaultMarginY
  const { width: contentWidth, height: contentHeight } =
    CardProductHelper.getBorderAndOverlaySize({
      marginX,
      marginY,
    })!
  const bleedWidth = bleedPageMode
    ? bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED ||
      bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
      ? BLEED
      : BLEED * 2
    : 0
  const bleedHeight = bleedPageMode ? BLEED * 2 : 0
  const overlayBackground = CardProductOverlayHelper.getOverlayFadeBackground({
    color: overlayColor,
    overlayFadePosition,
    overlayEndPosition,
  })

  const overlayStyle: CSSProperties = hasOverlay
    ? {
        ...(overlayBackground ? { background: overlayBackground } : ''),
        ...(overlayOpacity ? { opacity: overlayOpacity } : {}),
        ...(overlayBorderRadius
          ? {
              borderRadius: `calc(${overlayBorderRadius} * ${editorScaledFactor})`,
            }
          : {}),
      }
    : {}

  return (
    <CardProductBordersContainer>
      {hasBorder && borders.length > 0
        ? borders.map((border, index) => {
            // Graphic borders
            if (border.isGraphic) {
              return (
                <GraphicBorder
                  type={borderStyle}
                  color={color}
                  thickness={thicknessInPixel}
                  region={region}
                  bleedPageMode={bleedPageMode}
                  product={product}
                />
              )
            }
            // CSS style borders
            else {
              const thicknessTemplate =
                border.thicknessTemplate || `{{{thickness}}}`

              const variables = {
                borderWidth: contentWidth,
                borderHeight: contentHeight,
                thickness: thicknessInPixel * editorScaledFactor,
              }
              const cssWidth = border.size?.width
                ? replaceWithEnvironmentVariables({
                    template: border.size?.width,
                    variables,
                    bleedPageMode,
                  })
                : undefined
              const cssHeight = border.size?.height
                ? replaceWithEnvironmentVariables({
                    template: border.size?.height,
                    variables,
                    bleedPageMode,
                  })
                : undefined

              return (
                <SingleCardProductBorder
                  key={index}
                  borderStyle={border.borderStyle}
                  size={{
                    width: cssWidth,
                    height: cssHeight,
                  }}
                  bleedPageMode={bleedPageMode}
                  thickness={replaceWithEnvironmentVariables({
                    template: thicknessTemplate,
                    variables,
                  })}
                  padding={
                    border.padding
                      ? replaceWithEnvironmentVariables({
                          template: border.padding,
                          variables,
                        })
                      : undefined
                  }
                  alignTo={border.alignTo}
                  color={color}
                />
              )
            }
          })
        : null}
      {hasOverlay && (
        <CardProductOverlayContentContainer>
          <CardProductOverlayContent
            $bleedPageMode={bleedPageMode}
            style={{
              width: contentWidth
                ? `calc(${contentWidth}% - ${bleedWidth}px)`
                : undefined,
              height: contentHeight
                ? `calc(${contentHeight}% - ${bleedHeight}px)`
                : undefined,
            }}
          >
            <StyledCardProductOverlay
              style={{
                ...overlayStyle,
                top: `${overlayEndPosition.top}%`,
                height: `${
                  overlayEndPosition.bottom - overlayEndPosition.top
                }%`,
              }}
            />
          </CardProductOverlayContent>
        </CardProductOverlayContentContainer>
      )}
    </CardProductBordersContainer>
  )
}
