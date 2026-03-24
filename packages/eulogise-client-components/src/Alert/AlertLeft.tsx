import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

export const AlertLeft = styled.div<{ $hasMarginTop?: boolean }>`
  flex: 1;
  align-items: center;
  display: flex;
  ${({ $hasMarginTop }) =>
    $hasMarginTop &&
    `
    margin-top: calc(${STYLE.GUTTER} / 2);
  `}
`
