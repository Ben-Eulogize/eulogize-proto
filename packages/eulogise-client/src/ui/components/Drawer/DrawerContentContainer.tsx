import styled from 'styled-components'
import { STYLE } from '@eulogise/client-core'

export const DrawerContentContainer = styled.div`
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`

export const DrawerContentItemContainer = styled.div`
  width: calc(50% - 20px);
`

export const DrawerTitle = styled.div`
  ${STYLE.HEADING_MEDIUM};
  margin-bottom: 1rem;
`
