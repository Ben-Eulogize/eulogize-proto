import React from 'react'
import styled from 'styled-components'
import SossamonLetter from './graphics/SossamonLetter'
import SossamonA5 from './graphics/SossamonA5'
import SossamonBookmark from './graphics/SossamonBookmark'
import SossamonThankYouCard from './graphics/SossamonThankYouCard'
import SossamonTVWelcomeScreen from './graphics/SossamonTvWelcomeScreen'

import {
  BLEED,
  BleedPageMode,
  CardProductBorderType,
  EulogiseProduct,
  EulogiseRegion,
} from '@eulogise/core'

const StyledGraphicBorder = styled.div<{
  $color?: string
  $thickness: number
  $bleedPageMode?: BleedPageMode
}>`
  width: 100%;
  height: 100%;
  ${({ $bleedPageMode }) => `
    ${
      $bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED
        ? `
          margin-left: ${BLEED}px;
          width: calc(100% - ${BLEED}px);
        `
        : ''
    }
    ${
      $bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
        ? `
          margin-right: ${BLEED}px;
          width: calc(100% - ${BLEED}px);
        `
        : ''
    }
    ${
      $bleedPageMode === BleedPageMode.FULL_BLEED
        ? `width: calc(100% - ${BLEED * 2}px);
                  margin-left: ${BLEED}px;

        `
        : ''
    }
  `}

  svg {
    path {
      ${({ $color }) => `stroke: ${$color ?? 'currentColor'};`};
      ${({ $thickness }) =>
        $thickness
          ? `
        &:nth-of-type(1) {
          stroke-width: ${$thickness * 0.5}px;
        }
        &:nth-of-type(2) {
          stroke-width: ${$thickness * 1.5}px;
        }

    `
          : ''}
    }
  }
`

const getBorder = ({
  type,
  product,
  region,
}: {
  type: CardProductBorderType
  product: EulogiseProduct
  region: EulogiseRegion
}) => {
  switch (type) {
    case CardProductBorderType.SOSSAMON: {
      if (
        product === EulogiseProduct.BOOKLET ||
        product === EulogiseProduct.SIDED_CARD
      ) {
        if (region === EulogiseRegion.USA) {
          return SossamonLetter
        }
        return SossamonA5
      }
      if (product === EulogiseProduct.BOOKMARK) {
        return SossamonBookmark
      }
      if (product === EulogiseProduct.THANK_YOU_CARD) {
        return SossamonThankYouCard
      }
      if (product === EulogiseProduct.TV_WELCOME_SCREEN) {
        return SossamonTVWelcomeScreen
      }
      if (product === EulogiseProduct.GENERIC_CARD_PRODUCT) {
        return null
      }
    }
    default:
      throw new Error(`Invalid border type: ${type}`)
  }
}

export const GraphicBorder = ({
  type,
  color,
  thickness,
  region,
  bleedPageMode,
  product,
  ...props
}: {
  type: CardProductBorderType
  color?: string
  region: EulogiseRegion
  bleedPageMode?: BleedPageMode
  product: EulogiseProduct
  [key: string]: any
}) => {
  const Border = getBorder({ type, product, region })
  if (!Border) {
    return null
  }

  // @ts-ignore
  return (
    <StyledGraphicBorder
      $color={color}
      $thickness={thickness}
      $bleedPageMode={bleedPageMode}
    >
      <Border {...props} style={{ width: '100%', height: '100%' }} />
    </StyledGraphicBorder>
  )
}
