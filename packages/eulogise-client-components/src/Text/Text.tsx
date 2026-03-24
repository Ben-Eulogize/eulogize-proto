import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

export enum TextSize {
  EXTRA_EXTRA_SMALL = 'EXTRA_EXTRA_SMALL',
  EXTRA_SMALL = 'EXTRA_SMALL',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  HEADING_EXTRA_SMALL = 'HEADING_EXTRA_SMALL',
  HEADING_SMALL = 'HEADING_SMALL',
  HEADING_MEDIUM = 'HEADING_MEDIUM',
  HEADING_LARGE = 'HEADING_LARGE',
}

const TextSizeStyle = {
  EXTRA_EXTRA_SMALL: STYLE.TEXT_EXTRA_EXTRA_SMALL,
  EXTRA_SMALL: STYLE.TEXT_EXTRA_SMALL,
  SMALL: STYLE.TEXT_SMALL,
  MEDIUM: STYLE.TEXT_MEDIUM,
  HEADING_EXTRA_SMALL: STYLE.HEADING_EXTRA_SMALL,
  HEADING_SMALL: STYLE.HEADING_SMALL,
  HEADING_MEDIUM: STYLE.HEADING_MEDIUM,
  HEADING_LARGE: STYLE.HEADING_LARGE,
}

export const Text = styled.span<{
  $size?: TextSize
  $color?: string
  $block?: boolean
}>`
  ${({ $size = TextSize.MEDIUM, $color, $block }) => `
    ${TextSizeStyle[$size]}
    ${$color ? `color: ${$color};` : ''}
    ${$block ? `display: block;` : ''}
  `}
`
