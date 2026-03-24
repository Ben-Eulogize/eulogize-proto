import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

const StyledExploringOnMyOwnTextButton = styled.div`
  text-decoration: underline;
  position: relative;
  right: 20px;
  color: ${COLOR.DARK_BLUE};
  padding-bottom: 4px;

  &:hover {
    cursor: pointer;
  }
`

type IExploringOnMyOwnTextButton = {
  className?: string
  onClick: () => void
}

export const ExploringOnMyOwnTextButton = ({
  onClick,
  className,
}: IExploringOnMyOwnTextButton) => (
  <StyledExploringOnMyOwnTextButton className={className} onClick={onClick}>
    I'm happy exploring on my own
  </StyledExploringOnMyOwnTextButton>
)
