import styled from 'styled-components'
import { SCREEN_SIZE } from '@eulogise/client-core'
import { STYLE } from '@eulogise/client-core'

const TwoColumnFormView = styled.div`
  ${SCREEN_SIZE.TABLET} {
    display: flex;
    > * {
      flex: 1;
      &:first-child {
        padding-right: calc(${STYLE.GUTTER} / 2);
      }
      &:last-child {
        padding-left: calc(${STYLE.GUTTER} / 2);
      }
    }
  }
`

export default TwoColumnFormView
