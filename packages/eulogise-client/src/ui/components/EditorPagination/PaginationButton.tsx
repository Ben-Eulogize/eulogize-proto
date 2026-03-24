import styled from 'styled-components'
import React from 'react'
import { STYLE } from '@eulogise/client-core'

interface PaginationButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  isDisabled?: boolean
  children: React.ReactNode
}

const StyledPaginationButton = styled.span<{ $isDisabled?: boolean }>`
  padding: 0 0.25rem;
  margin: 0 0.25rem;
  white-space: nowrap;
  display: inline-block;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  font-size: ${STYLE.TEXT_FONT_SIZE_MEDIUM};
  ${({ $isDisabled }) => $isDisabled && `opacity: .3;`}
`

export const PaginationButton = ({
  isDisabled = false,
  children,
  ...rest
}: PaginationButtonProps) => {
  return (
    <StyledPaginationButton $isDisabled={isDisabled} {...rest}>
      {children}
    </StyledPaginationButton>
  )
}
