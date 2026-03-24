import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { COLOR, STYLE } from '@eulogise/client-core'

export const Link = styled(GatsbyLink)`
  color: ${COLOR.BLACK};
  font-size: ${STYLE.TEXT_FONT_SIZE_SMALL};
`
