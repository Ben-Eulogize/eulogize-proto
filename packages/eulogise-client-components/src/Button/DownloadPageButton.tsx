import styled from 'styled-components'
import { Button } from './Button'
import { SCREEN_SIZE, STYLE } from '@eulogise/client-core'

export const DownloadPageButton = styled(Button)`
  display: block;
  width: 100%;
  margin-left: 0;
  margin-bottom: ${STYLE.HALF_GUTTER};
  ${SCREEN_SIZE.TABLET} {
    display: inline-block;
    width: auto;
    margin-left: ${STYLE.HALF_GUTTER};
    margin-bottom: 0;
  }
`
