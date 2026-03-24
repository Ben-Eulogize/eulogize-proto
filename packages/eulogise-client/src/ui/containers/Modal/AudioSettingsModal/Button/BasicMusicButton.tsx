import styled from 'styled-components'
import { Button, ButtonType } from '@eulogise/client-components'

const BasicMusicButton = styled(Button).attrs({
  buttonType: ButtonType.TRANSPARENT,
  noMarginRight: true,
})`
  svg {
    font-size: 1.4rem;
    line-height: 1.4rem;
    display: block;
  }
  padding: 0;
  border: none;
`

export default BasicMusicButton
