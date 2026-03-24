import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface ISectionActionMenuItemProps {
  children: React.ReactNode
  onClick: () => void
}

const StyledSectionActionMenuItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    color: ${COLOR.DIANNE_BLUE};
  }
`

const SectionActionMenuItem: React.FC<ISectionActionMenuItemProps> = ({
  children,
  onClick,
}) => (
  <StyledSectionActionMenuItem onClick={onClick}>
    {children}
  </StyledSectionActionMenuItem>
)

export default SectionActionMenuItem
