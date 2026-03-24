import { MouseEvent } from 'react'
import styled from 'styled-components'
import { Button, ButtonType } from '../Button'

// @ts-ignore
export const EditorDropdownButton = styled(Button).attrs({
  noMarginLeft: true,
  noMarginRight: true,
  buttonType: ButtonType.WHITE,
  onMouseDown: (event: MouseEvent) => event.preventDefault(),
})`
  && {
    font-size: inherit;
  }
`
