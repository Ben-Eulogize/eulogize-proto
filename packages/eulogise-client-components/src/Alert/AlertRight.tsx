import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

export const AlertRight = styled.div<{
  $hasMarginTop?: boolean
  $alignItems?: string
}>`
  display: flex;
  ${({ $hasMarginTop, $alignItems }) =>
    `
    ${$hasMarginTop ? `margin-top: calc(${STYLE.GUTTER} / 2);` : ''}
    ${$alignItems ? `align-items: ${$alignItems}` : ''}
  `}
`
