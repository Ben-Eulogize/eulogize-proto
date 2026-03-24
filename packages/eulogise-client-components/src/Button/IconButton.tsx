import styled from 'styled-components'
import { Button, IButtonProps } from './Button'
import { COLOR } from '@eulogise/client-core'

// @ts-ignore
export const IconButton = styled(Button)<IButtonProps>`
  border-radius: 4rem;
  && {
    color: ${COLOR.BLACK};
  }
`
