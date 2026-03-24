import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { COLOR } from '@eulogise/client-core'

interface ISubTitle {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

const StyledSubTitle = styled.div`
  margin: 0;
  text-align: left;
  padding: 4px 0;
  color: ${COLOR.BLACK};
  font-size: 18px;
  flex: 1;
`

export const SubTitle: React.FC<ISubTitle> = ({
  children,
  style,
  className,
}) => (
  <StyledSubTitle className={className} style={style}>
    {children}
  </StyledSubTitle>
)
