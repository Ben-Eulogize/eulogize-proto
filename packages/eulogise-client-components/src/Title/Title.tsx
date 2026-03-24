import React from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface ITitle {
  children: React.ReactNode
  className?: string
}

export const PRE_LOGGED_IN_TITLE_VERTICAL_PADDING = 4

const StyledTitle = styled.div`
  margin: 0 12px;
  text-align: center;
  padding: ${PRE_LOGGED_IN_TITLE_VERTICAL_PADDING}px 0;
  color: ${COLOR.BLACK};
  font-size: 24px;
  flex: 1;
`

export const Title: React.FC<ITitle> = ({ children, className }) => (
  <StyledTitle className={className}>{children}</StyledTitle>
)
