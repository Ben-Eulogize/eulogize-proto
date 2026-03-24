import styled from 'styled-components'
import { SiderMenu } from '../SiderMenu/SiderMenu'

export const BaseSiderMenu = styled(SiderMenu)<{ $minHeight?: string }>`
  margin-bottom: 5rem;
  min-height: ${({ $minHeight }) => $minHeight};
`
