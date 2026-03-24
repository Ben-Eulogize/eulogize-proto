import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

export const Badge = styled.div`
  background-color: ${COLOR.CORE_PURPLE};
  color: ${COLOR.WHITE};
  border-radius: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.65rem;
  line-height: initial;
  padding: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
