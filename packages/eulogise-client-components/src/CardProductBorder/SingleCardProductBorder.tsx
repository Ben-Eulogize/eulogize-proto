import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'
import {
  BLEED,
  BleedPageMode,
  ICardProductBorderSize,
  ICardProductBorderStyle,
} from '@eulogise/core'

export type ISingleCardProductBorderProps = {
  borderStyle?: ICardProductBorderStyle
  size?: ICardProductBorderSize
  thickness?: string
  color?: string
  alignTo?: 'left' | 'center' | 'right'
  padding?: string
  bleedPageMode?: BleedPageMode
  style?: CSSProperties
}

const SingleCardProductBorderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`

const StyledSingleCardProductBorder = styled.div<{
  borderStyle?: ICardProductBorderStyle
  size: ICardProductBorderSize
  thickness: string
  color: string
  $bleedPageMode?: BleedPageMode
}>`
  ${({ borderStyle, size, thickness, color, $bleedPageMode }) =>
    `
    border-style: ${borderStyle};
    border-width: ${thickness};
    border-color: ${color};
    height: ${size.height};
    width: ${size.width};
    ${
      $bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED
        ? `margin-left: ${BLEED}px;`
        : ''
    }
    ${
      $bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
        ? `margin-right: ${BLEED}px;`
        : ''
    }
  `}
`

export const SingleCardProductBorder = ({
  borderStyle,
  size = {},
  thickness = '1px',
  color = COLOR.BLACK,
  alignTo = 'center',
  padding = '0',
  bleedPageMode,
  style,
}: ISingleCardProductBorderProps) => {
  const { width = '89%', height = '92%' } = size
  return (
    <SingleCardProductBorderContainer
      style={{
        justifyContent:
          alignTo === 'right' ? 'end' : alignTo === 'left' ? 'start' : 'center',
        padding,
      }}
    >
      <StyledSingleCardProductBorder
        borderStyle={borderStyle}
        size={{ width, height }}
        thickness={thickness}
        color={color}
        $bleedPageMode={bleedPageMode}
        style={style}
      />
    </SingleCardProductBorderContainer>
  )
}
