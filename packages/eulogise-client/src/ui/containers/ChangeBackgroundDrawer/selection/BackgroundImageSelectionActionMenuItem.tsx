import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface IBackgroundImageSelectionActionMenuItemProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

const StyledBackgroundImageSelectionActionMenuItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    color: ${COLOR.DIANNE_BLUE};
  }
`

const BackgroundImageSelectionActionMenuItem: React.FC<
  IBackgroundImageSelectionActionMenuItemProps
> = ({ className, children, onClick }) => (
  <StyledBackgroundImageSelectionActionMenuItem
    className={className}
    onClick={onClick}
  >
    {children}
  </StyledBackgroundImageSelectionActionMenuItem>
)

export default BackgroundImageSelectionActionMenuItem
