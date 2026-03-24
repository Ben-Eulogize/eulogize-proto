import React from 'react'
import styled from 'styled-components'
import { COLOR, STYLE } from '@eulogise/client-core'

interface IHintTextProps {
  children: React.ReactNode
}

const StyledHintText = styled.div`
  color: ${COLOR.HINT_TEXT_COLOR};
  font-size: ${STYLE.FONT_SIZE_XS};
`

export const HintText: React.FC<IHintTextProps> = ({ children }) => (
  <StyledHintText>{children}</StyledHintText>
)
