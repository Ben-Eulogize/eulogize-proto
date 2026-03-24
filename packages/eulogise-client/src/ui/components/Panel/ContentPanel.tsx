import styled from 'styled-components'
import { COLOR, SCREEN_SIZE } from '@eulogise/client-core'

export const ContentPanel = styled.div<{
  $hasBorder?: boolean
  $noPaddingOnMobile?: boolean
}>`
  background-color: ${COLOR.WARM_GREY_WHITE_BG};
  border-radius: 0.5rem;
  border-color: ${COLOR.LIGHT_GREY};
  height: 100%;
  ${({ $hasBorder }) => $hasBorder && `border: 1px solid ${COLOR.LIGHT_GREY};`}
  ${({ $noPaddingOnMobile }) =>
    $noPaddingOnMobile ? `padding: 0;` : `padding: 1rem;`}
  ${SCREEN_SIZE.DESKTOP} {
    padding: 1rem;
  }
`
