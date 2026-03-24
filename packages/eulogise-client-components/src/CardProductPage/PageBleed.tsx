import { BLEED, BleedPageMode } from '@eulogise/core'
import styled from 'styled-components'

const BLEED_PX = `${BLEED}px`

export const PageBleed = styled.div<{
  $bleedPageMode?: BleedPageMode
  $backgroundImage?: string
  $backgroundSize?: string
  $backgroundPosition?: string
  $width: number
  $height: number
}>`
  ${({
    $bleedPageMode,
    $backgroundImage,
    $backgroundSize,
    $backgroundPosition,
    $width,
    $height,
  }) => `
    ${
      $bleedPageMode === BleedPageMode.LEFT_SIDE_BLEED
        ? `padding: ${BLEED_PX} 0 ${BLEED_PX} ${BLEED_PX};`
        : $bleedPageMode === BleedPageMode.RIGHT_SIDE_BLEED
        ? `padding: ${BLEED_PX} ${BLEED_PX} ${BLEED_PX} 0;`
        : $bleedPageMode === BleedPageMode.FULL_BLEED
        ? `padding: ${BLEED_PX};`
        : ''
    }
    ${
      $bleedPageMode !== undefined
        ? `
      background-image: url('${$backgroundImage}');
      background-size: ${$backgroundSize ? $backgroundSize : 'contain'};
      background-position: ${
        $backgroundPosition ? $backgroundPosition : 'unset'
      };
      background-repeat: no-repeat;
    `
        : `
            && {
              width: ${$width}px;
              height: ${$height}px;
            }
        `
    }
  `}
`
