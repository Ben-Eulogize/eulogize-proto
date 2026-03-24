import styled from 'styled-components'
import { BLEED_IN_MM_72_DPI } from '@eulogise/core'

export enum BleedBoxType {
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export const BleedBox = styled.div<{ type: BleedBoxType }>`
  width: ${BLEED_IN_MM_72_DPI * 2}mm;
  height: ${BLEED_IN_MM_72_DPI * 2}mm;
  z-index: -1;
  border: 0 solid black;
  ${({ type = BleedBoxType.TOP_LEFT }) => `
    ${
      type === BleedBoxType.TOP_LEFT
        ? `
      border-right-width: 1px;
      border-bottom-width: 1px;
    `
        : ''
    }
    ${
      type === BleedBoxType.TOP_RIGHT
        ? `
      border-left-width: 1px;
      border-bottom-width: 1px;
    `
        : ''
    }
    ${
      type === BleedBoxType.BOTTOM_LEFT
        ? `
      border-right-width: 1px;
      border-top-width: 1px;
    `
        : ''
    }
    ${
      type === BleedBoxType.BOTTOM_RIGHT
        ? `
      border-left-width: 1px;
      border-top-width: 1px;
    `
        : ''
    }
  `}
`
